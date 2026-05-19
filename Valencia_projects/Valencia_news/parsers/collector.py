"""
NewsCollector: оркестрирует сбор новостей из всех источников.

Алгоритм:
  1. Для каждого активного источника: парсит RSS → получает список статей.
  2. Фильтрует уже известные URL (переданные через known_urls).
  3. Дедуплицирует по URL внутри текущего батча.
  4. Параллельно (ThreadPoolExecutor) загружает полный текст каждой статьи.
  5. Обновляет ParsedArticle.text и image_url.
  6. Возвращает итоговый список.
"""

import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import replace

from .article_fetcher import ArticleFetcher
from .base import ParsedArticle
from .ivam_parser import IvamParser
from .lasprovincias_parser import LasProvinciasParser
from .lesarts_parser import LesArtsParser
from .museobellasartes_parser import MuseoBellasArtesParser
from .palauvalencia_parser import PalauValenciaParser
from .valenciaagenda_parser import ValenciaAgendaParser
from .rss_parser import RSSParser

# Домены с кастомными парсерами (не RSS)
_CUSTOM_PARSERS: dict[str, object] = {}


def _get_custom_parser(feed_url: str) -> object | None:
    """Возвращает кастомный парсер если домен требует особой обработки."""
    if "valencia.es" in feed_url:
        if "valencia.es" not in _CUSTOM_PARSERS:
            _CUSTOM_PARSERS["valencia.es"] = ValenciaAgendaParser()
        return _CUSTOM_PARSERS["valencia.es"]
    if "lasprovincias.es" in feed_url:
        if "lasprovincias.es" not in _CUSTOM_PARSERS:
            _CUSTOM_PARSERS["lasprovincias.es"] = LasProvinciasParser()
        return _CUSTOM_PARSERS["lasprovincias.es"]
    if "lesarts.com" in feed_url:
        if "lesarts.com" not in _CUSTOM_PARSERS:
            _CUSTOM_PARSERS["lesarts.com"] = LesArtsParser()
        return _CUSTOM_PARSERS["lesarts.com"]
    if "palauvalencia.com" in feed_url:
        if "palauvalencia.com" not in _CUSTOM_PARSERS:
            _CUSTOM_PARSERS["palauvalencia.com"] = PalauValenciaParser()
        return _CUSTOM_PARSERS["palauvalencia.com"]
    if "museobellasartesvalencia.gva.es" in feed_url:
        if "museobellasartesvalencia" not in _CUSTOM_PARSERS:
            _CUSTOM_PARSERS["museobellasartesvalencia"] = MuseoBellasArtesParser()
        return _CUSTOM_PARSERS["museobellasartesvalencia"]
    if "ivam.es" in feed_url:
        if "ivam.es" not in _CUSTOM_PARSERS:
            _CUSTOM_PARSERS["ivam.es"] = IvamParser()
        return _CUSTOM_PARSERS["ivam.es"]
    return None

logger = logging.getLogger(__name__)

# Количество параллельных потоков для загрузки статей
_MAX_WORKERS = 5


class NewsCollector:
    """
    Оркестратор сбора новостей.

    Использует RSSParser для чтения лент и ArticleFetcher для обогащения текстом.
    """

    def __init__(
        self,
        rss_parser: RSSParser | None = None,
        article_fetcher: ArticleFetcher | None = None,
        max_workers: int = _MAX_WORKERS,
    ) -> None:
        self._rss_parser = rss_parser or RSSParser()
        # Для events-источников: публикации могут быть старыми, событие — будущее
        self._events_rss_parser = RSSParser(max_age_hours=365 * 24)
        self._fetcher = article_fetcher or ArticleFetcher()
        self._max_workers = max_workers

    def collect(
        self,
        sources: list[dict],
        known_urls: set[str] | None = None,
    ) -> list[ParsedArticle]:
        """
        Собрать статьи из всех источников.

        Args:
            sources: список словарей источников (name, feed_url, site_url, region).
            known_urls: набор URL, уже сохранённых в БД — будут пропущены.

        Returns:
            Список новых ParsedArticle с полным текстом.
        """
        if known_urls is None:
            known_urls = set()

        # --- Шаг 1: Разобрать источники (RSS или кастомный парсер) ---
        raw_articles: list[ParsedArticle] = []
        for source in sources:
            source_name = source.get("name", "?")
            feed_url = source.get("feed_url", "")

            custom = _get_custom_parser(feed_url)
            if custom:
                logger.info("Парсим (HTML): %s", source_name)
                try:
                    # Парсеры с поддержкой known_urls
                    if isinstance(custom, (ValenciaAgendaParser, LasProvinciasParser, LesArtsParser, PalauValenciaParser, MuseoBellasArtesParser, IvamParser)):
                        articles = custom.parse(known_urls=known_urls)
                    else:
                        articles = custom.parse(source)  # type: ignore[attr-defined]
                    raw_articles.extend(articles)
                    logger.info("  %s → %d статей (HTML)", source_name, len(articles))
                except Exception as exc:
                    logger.error("Ошибка HTML-парсинга %s: %s", source_name, exc)
            else:
                logger.info("Парсим RSS: %s", source_name)
                try:
                    # Events-источники: не обрезать по дате публикации (событие может анонсироваться заранее)
                    rss_parser = (
                        self._events_rss_parser
                        if source.get("channel") == "events"
                        else self._rss_parser
                    )
                    articles = rss_parser.parse_feed(source)
                    raw_articles.extend(articles)
                    logger.info("  %s → %d статей из RSS", source_name, len(articles))
                except Exception as exc:
                    logger.error("Ошибка при парсинге %s: %s", source_name, exc)

        logger.info("Всего статей из всех источников: %d", len(raw_articles))

        # --- Шаг 2: Фильтрация известных URL ---
        new_articles = [a for a in raw_articles if a.url not in known_urls]
        logger.info(
            "После фильтрации по known_urls: %d (отфильтровано: %d)",
            len(new_articles),
            len(raw_articles) - len(new_articles),
        )

        # --- Шаг 3: Дедупликация по URL внутри батча ---
        seen_urls: set[str] = set()
        unique_articles: list[ParsedArticle] = []
        for article in new_articles:
            if article.url not in seen_urls:
                seen_urls.add(article.url)
                unique_articles.append(article)

        logger.info(
            "После дедупликации батча: %d (дубликатов: %d)",
            len(unique_articles),
            len(new_articles) - len(unique_articles),
        )

        if not unique_articles:
            logger.info("Нет новых статей для обработки.")
            return []

        # --- Шаг 4: Параллельная загрузка полного текста ---
        # Статьи с уже заполненным текстом (кастомные парсеры) не обогащаем
        need_enrich = [a for a in unique_articles if not a.text]
        already_enriched = [a for a in unique_articles if a.text]
        enriched_articles = self._enrich_articles(need_enrich) + already_enriched

        logger.info(
            "Сбор завершён. Итого статей с текстом: %d",
            sum(1 for a in enriched_articles if a.text),
        )

        return enriched_articles

    def _enrich_articles(self, articles: list[ParsedArticle]) -> list[ParsedArticle]:
        """
        Параллельно загрузить полный текст для каждой статьи.

        Сохраняет порядок статей. Не заменяет image_url, если fetcher вернул None,
        но оригинальное изображение из RSS уже присутствует.
        """
        total = len(articles)
        results: dict[int, ParsedArticle] = {}

        def _fetch_one(index: int, article: ParsedArticle) -> tuple[int, ParsedArticle]:
            """Загрузить статью и вернуть обогащённую копию."""
            try:
                text, image_url = self._fetcher.fetch_article(article.url)
            except Exception as exc:
                logger.error(
                    "Непредвиденная ошибка при загрузке %s: %s", article.url, exc
                )
                text, image_url = "", None

            # Используем replace() для создания нового датакласса (иммутабельность)
            updated_fields: dict = {}

            if text:
                updated_fields["text"] = text
            # Заменяем image только если нашли новое И оригинала нет
            if image_url and not article.image_url:
                updated_fields["image_url"] = image_url
            elif image_url:
                # Предпочитаем изображение из fetcher (обычно крупнее og:image)
                updated_fields["image_url"] = image_url

            if updated_fields:
                return (index, replace(article, **updated_fields))
            return (index, article)

        with ThreadPoolExecutor(max_workers=self._max_workers) as executor:
            futures = {
                executor.submit(_fetch_one, idx, art): idx
                for idx, art in enumerate(articles)
            }

            completed = 0
            for future in as_completed(futures):
                completed += 1
                try:
                    idx, enriched = future.result()
                    results[idx] = enriched
                except Exception as exc:
                    original_idx = futures[future]
                    logger.error(
                        "Future для статьи #%d завершился с ошибкой: %s",
                        original_idx,
                        exc,
                    )
                    results[original_idx] = articles[original_idx]

                if completed % 10 == 0 or completed == total:
                    logger.info(
                        "Загрузка статей: %d / %d (%.0f%%)",
                        completed,
                        total,
                        completed / total * 100,
                    )

        # Восстанавливаем исходный порядок
        return [results.get(i, articles[i]) for i in range(len(articles))]
