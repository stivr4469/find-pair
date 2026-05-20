"""
Главный оркестратор Valencia News Aggregator.

Связывает все модули в единый пайплайн:
  Источники → Парсинг → Дедупликация → AI-обработка → Ранжирование → Telegram
"""

from __future__ import annotations

import logging
import sys
from datetime import datetime, timedelta, timezone
from typing import Optional

from dotenv import load_dotenv

# Загружаем .env до импорта модулей, которые читают переменные окружения
load_dotenv()

from ai.deduplicator import Deduplicator
from ai.gemini_client import GeminiClient, GeminiError
from ai.processor import ArticleProcessor
from ai.ranker import Ranker
from config import config
from infra.logger import setup_logging
from models import ParsedArticle, ProcessedArticle
from parsers.base import ParsedArticle as ParserParsedArticle
from parsers.collector import NewsCollector
from sources.registry import get_all_sources
from storage.database import get_session, init_db
from storage.models import Article, PublishLog
from storage.repository import ArticleRepository, PublishLogRepository, SourceRepository
from notifier.formatter import MessageFormatter
from notifier.publisher import TelegramPublisher

# Инициализируем логирование при запуске модуля
setup_logging(config.log_level)
logger = logging.getLogger(__name__)


def _parser_article_to_model_article(art: ParserParsedArticle) -> ParsedArticle:
    """
    Приводит ParsedArticle из parsers.base к ParsedArticle из models.

    Оба датакласса содержат схожие поля, но parsers.base использует field 'text',
    а models — 'content'. Функция создаёт новый экземпляр models.ParsedArticle.
    """
    return ParsedArticle(
        url=art.url,
        title=art.title,
        source_name=art.source_name,
        region=art.region,
        published_at=art.published_at or datetime.now(timezone.utc),
        content=art.text,
        image_url=art.image_url,
        language="es",
    )


def _processed_to_storage_article(art: ProcessedArticle) -> Article:
    """
    Конвертирует ProcessedArticle (датакласс) в SQLAlchemy-модель Article.
    """
    return Article(
        url=art.url,
        title=art.title,
        original_text=art.content,
        summary_ru=art.summary_ru,
        category=art.category,
        importance_score=art.importance_score,
        source_name=art.source_name,
        source_url=None,
        region=art.region,
        published_at=art.published_at,
        is_published=False,
        image_url=art.image_url,
    )


class NewsOrchestrator:
    """
    Главный оркестратор новостного агрегатора.

    Инициализирует все компоненты из переменных окружения/конфига
    и управляет полным жизненным циклом каждого дайджеста.
    """

    def __init__(self) -> None:
        # Инициализируем схему БД (CREATE TABLE IF NOT EXISTS)
        init_db()
        logger.info("База данных инициализирована.")

        errors = config.validate()
        if errors:
            for e in errors:
                logger.error("Конфигурация: %s", e)
            raise RuntimeError(f"Ошибка конфигурации: {errors[0]}")

        # AI-клиент Gemini
        self._gemini = GeminiClient(
            api_key=config.gemini.api_key,
            model=config.gemini.model,
        )

        # Компоненты пайплайна
        self._collector = NewsCollector()
        self._processor = ArticleProcessor(client=self._gemini)
        self._deduplicator = Deduplicator()
        self._ranker = Ranker()
        self._formatter = MessageFormatter()
        self._publisher = TelegramPublisher(
            bot_token=config.telegram.bot_token,
            channel_id=config.telegram.channel_news,
        )

        logger.info("NewsOrchestrator инициализирован.")

    # -------------------------------------------------------------------
    # Публичный API
    # -------------------------------------------------------------------

    def run_digest(self, digest_type: str = "morning") -> None:
        """
        Полный цикл: сбор → обработка → публикация.

        Args:
            digest_type: 'morning' или 'evening'.
        """
        logger.info("=== Запуск дайджеста: %s ===", digest_type)
        start_time = datetime.now(timezone.utc)

        articles_fetched_count = 0
        articles_published_count = 0
        status = "success"
        error_message: Optional[str] = None

        try:
            # --- Шаг 1: Получаем активные источники из БД, заполняем если пусто ---
            sources_dicts = self._get_or_seed_sources()
            logger.info("Активных источников: %d", len(sources_dicts))

            if not sources_dicts:
                logger.warning("Нет активных источников для сбора новостей.")
                return

            # --- Шаг 2: Получаем уже известные URL (за 24 ч) для пропуска дубликатов ---
            known_urls = self._get_known_urls()
            logger.info("Известных URL (за 7 дней): %d", len(known_urls))

            # --- Шаг 3: Сбор статей через NewsCollector ---
            raw_articles: list[ParserParsedArticle] = self._collector.collect(
                sources=sources_dicts,
                known_urls=known_urls,
            )
            logger.info("Собрано статей: %d", len(raw_articles))

            # --- Шаг 4: Дедупликация ---
            model_articles: list[ParsedArticle] = [
                _parser_article_to_model_article(a) for a in raw_articles
            ]
            unique_articles: list[ParsedArticle] = self._deduplicator.deduplicate_batch(
                articles=model_articles,
                known_urls=known_urls,
            )
            logger.info("После дедупликации: %d статей", len(unique_articles))

            # --- Шаг 4.5: Фильтр устаревших статей ---
            # Публикуем только свежие новости: не старше max_article_age_hours
            cutoff_time = datetime.now(timezone.utc) - timedelta(
                hours=config.max_article_age_hours
            )
            fresh_articles = [
                a for a in unique_articles
                if a.published_at is None or a.published_at >= cutoff_time
            ]
            if len(fresh_articles) < len(unique_articles):
                logger.info(
                    "Отфильтровано устаревших статей: %d (старше %dч)",
                    len(unique_articles) - len(fresh_articles),
                    config.max_article_age_hours,
                )
            unique_articles = fresh_articles
            articles_fetched_count = len(unique_articles)

            if not unique_articles:
                logger.info("Нет новых уникальных статей — дайджест не формируется.")
                self._save_publish_log(
                    digest_type=digest_type,
                    fetched=0,
                    published=0,
                    status="success",
                )
                return

            # --- Шаг 5: AI-обработка — все свежие статьи, Валенсия без ограничений ---
            # Валенсия: все новые статьи (до 40 самых свежих)
            # Нац. новости: до 20 самых свежих
            # Итого до 60 статей за один запуск
            valencia_pool = [a for a in unique_articles if a.region.lower() == "valencia"]
            other_pool = [a for a in unique_articles if a.region.lower() != "valencia"]
            to_process = valencia_pool[:40] + other_pool[:20]
            logger.info(
                "Отправляем в Gemini: %d статей (%d валенсийских, %d прочих)",
                len(to_process),
                min(len(valencia_pool), 40),
                min(len(other_pool), 20),
            )

            processed_articles: list[ProcessedArticle] = []
            for article in to_process:
                try:
                    processed = self._processor.process_article(article)
                    processed_articles.append(processed)
                except Exception as exc:
                    logger.error(
                        "Ошибка обработки статьи '%s': %s", article.title[:60], exc
                    )

            logger.info("Обработано через Gemini: %d статей", len(processed_articles))

            # --- Шаг 5.5: Убираем прошедшие события (AI выставил importance=0.0) ---
            processed_articles = [a for a in processed_articles if a.importance_score > 0.05]
            logger.info("После фильтра прошедших событий: %d статей", len(processed_articles))

            # --- Шаг 5.6: Post-AI дедупликация по саммари (убирает дубли одной темы) ---
            processed_articles = self._deduplicator.deduplicate_by_summary(processed_articles)
            logger.info("После тематической дедупликации: %d статей", len(processed_articles))

            # --- Шаг 6: Ранжирование — топ-10 ---
            top_articles = self._ranker.rank(
                articles=processed_articles,
                max_count=config.max_articles_per_digest,
            )
            logger.info("Отобрано для публикации: %d статей", len(top_articles))

            if not top_articles:
                logger.warning("Ранжирование вернуло пустой список.")
                self._save_publish_log(
                    digest_type=digest_type,
                    fetched=articles_fetched_count,
                    published=0,
                    status="partial",
                )
                return

            # --- Шаг 7: Форматирование Telegram-сообщений ---
            messages = self._formatter.format_digest(
                articles=top_articles,
                digest_type=digest_type,
            )
            logger.info("Сформировано сообщений для Telegram: %d", len(messages))

            # --- Шаг 8: Публикация в Telegram ---
            sent_message_ids = self._publisher.publish_digest(
                messages=messages,
                articles=top_articles,
            )
            logger.info("Опубликовано сообщений: %d", len(sent_message_ids))

            # --- Шаг 9: Сохраняем статьи в БД и помечаем как опубликованные ---
            articles_published_count = self._save_articles(
                processed_articles=top_articles,
                message_id_hint=sent_message_ids[0] if sent_message_ids else None,
            )

            # --- Шаг 10: Запись в журнал публикаций ---
            self._save_publish_log(
                digest_type=digest_type,
                fetched=articles_fetched_count,
                published=articles_published_count,
                status="success",
            )

            elapsed = (datetime.now(timezone.utc) - start_time).total_seconds()
            logger.info(
                "=== Дайджест '%s' завершён за %.1f сек. Опубликовано: %d статей ===",
                digest_type,
                elapsed,
                articles_published_count,
            )

        except Exception as exc:
            status = "failed"
            error_message = str(exc)
            logger.error(
                "Критическая ошибка в run_digest('%s'): %s",
                digest_type,
                exc,
                exc_info=True,
            )
            self._save_publish_log(
                digest_type=digest_type,
                fetched=articles_fetched_count,
                published=articles_published_count,
                status=status,
                error_message=error_message,
            )

    def run_once(self) -> None:
        """Разовый запуск для отладки — запускает утренний дайджест."""
        logger.info("Запуск в режиме однократного выполнения (--once).")
        self.run_digest("morning")

    # Источники, которые считаются афишей (мероприятия, выставки, концерты)
    _EVENT_SOURCE_NAMES: frozenset[str] = frozenset([
        "Valencia.es Agenda",
        "CCCC Exposiciones",
        "IVAM",
    ])

    def run_events_digest(self, events_per_run: Optional[int] = None) -> None:
        """
        Собирает и публикует события из афишных источников.

        Каждое событие отправляется отдельным сообщением (не дайджестом).
        Использует 30-дневное окно known_urls — выставки идут неделями,
        поэтому стандартных 24 часов не хватает.

        Args:
            events_per_run: количество событий за один запуск.
                Если None — берётся из config.schedule.events_per_run.
        """
        n = events_per_run if events_per_run is not None else config.schedule.events_per_run
        logger.info("=== Запуск афиши: %d событий ===", n)
        start_time = datetime.now(timezone.utc)

        articles_published_count = 0

        try:
            # --- Шаг 1: Источники ---
            all_sources = self._get_or_seed_sources()
            event_sources = [s for s in all_sources if s["name"] in self._EVENT_SOURCE_NAMES]
            logger.info("Афишных источников: %d", len(event_sources))

            if not event_sources:
                logger.warning("Нет активных афишных источников.")
                return

            # --- Шаг 2: known_urls за 30 дней (выставки длятся недели) ---
            known_event_urls = self._get_known_event_urls()
            logger.info("Известных URL событий (за 30 дн): %d", len(known_event_urls))

            # --- Шаг 3: Сбор из афишных источников ---
            raw_articles: list[ParserParsedArticle] = self._collector.collect(
                sources=event_sources,
                known_urls=known_event_urls,
            )
            logger.info("Собрано событий из афишных источников: %d", len(raw_articles))

            if not raw_articles:
                logger.info("Нет новых событий для публикации в афишу.")
                self._save_publish_log("events", 0, 0, "success")
                return

            # --- Шаг 4: Конвертация и AI-обработка (все собранные события) ---
            model_articles: list[ParsedArticle] = [
                _parser_article_to_model_article(a) for a in raw_articles
            ]

            processed_articles: list[ProcessedArticle] = []
            for article in model_articles:
                try:
                    processed = self._processor.process_article(article)
                    processed_articles.append(processed)
                except Exception as exc:
                    logger.error("Ошибка обработки события '%s': %s", article.title[:60], exc)

            logger.info("Обработано через Gemini: %d событий", len(processed_articles))

            # --- Шаг 5: Фильтр прошедших событий и дедупликация ---
            processed_articles = [a for a in processed_articles if a.importance_score > 0.05]
            logger.info("После фильтра прошедших событий: %d", len(processed_articles))

            processed_articles = self._deduplicator.deduplicate_by_summary(processed_articles)
            logger.info("После тематической дедупликации: %d", len(processed_articles))

            # --- Шаг 6: Топ-N по importance ---
            top_events = sorted(processed_articles, key=lambda a: a.importance_score, reverse=True)[:n]
            logger.info("Отобрано для публикации в афишу: %d событий", len(top_events))

            if not top_events:
                logger.warning("Нет событий для публикации в афишу после фильтрации.")
                self._save_publish_log("events", len(raw_articles), 0, "partial")
                return

            # --- Шаг 7: Публикация каждого события отдельным сообщением ---
            from notifier.publisher import CAPTION_MAX_LENGTH
            import time as _time

            for event in top_events:
                try:
                    message_text = self._formatter.format_article(event)
                    msg_id: Optional[int] = None

                    if event.image_url:
                        caption = message_text[:CAPTION_MAX_LENGTH]
                        msg_id = self._publisher.send_photo(event.image_url, caption)

                    if msg_id is None:
                        msg_id = self._publisher.send_message(message_text)

                    if msg_id is not None:
                        articles_published_count += 1
                        self._save_articles([event], message_id_hint=msg_id)

                    _time.sleep(0.5)

                except Exception as exc:
                    logger.error("Ошибка публикации события '%s': %s", event.title[:60], exc)

            self._save_publish_log("events", len(raw_articles), articles_published_count, "success")

            elapsed = (datetime.now(timezone.utc) - start_time).total_seconds()
            logger.info(
                "=== Афиша завершена за %.1f сек. Опубликовано: %d событий ===",
                elapsed,
                articles_published_count,
            )

        except Exception as exc:
            logger.error("Критическая ошибка в run_events_digest: %s", exc, exc_info=True)
            self._save_publish_log("events", 0, articles_published_count, "failed", str(exc))

    # -------------------------------------------------------------------
    # Вспомогательные методы
    # -------------------------------------------------------------------

    def _get_or_seed_sources(self) -> list[dict]:
        """
        Возвращает активные источники из БД.

        Если таблица пустая — автоматически заполняет её из реестра sources/registry.py.
        Возвращает список словарей для совместимости с NewsCollector.
        """
        with get_session() as session:
            repo = SourceRepository(session)
            # Всегда добираем новые источники из реестра (seed пропускает уже существующие)
            all_sources_dicts = get_all_sources()
            added = repo.seed_sources(all_sources_dicts)
            if added:
                logger.info("Добавлено новых источников из реестра: %d", added)
            active_sources = repo.get_all_active()

            # Конвертируем ORM-объекты в словари для NewsCollector
            return [
                {
                    "name": s.name,
                    "feed_url": s.feed_url,
                    "site_url": s.site_url or "",
                    "region": s.region,
                }
                for s in active_sources
            ]

    def _get_known_urls(self) -> set[str]:
        """Возвращает множество URL статей из БД за последние 7 дней.
        Окно совпадает с max_article_age_hours — статьи не переиздаются повторно."""
        with get_session() as session:
            repo = ArticleRepository(session)
            return repo.get_recent_urls(hours=24 * 7)

    def _get_known_event_urls(self) -> set[str]:
        """Возвращает URL событий из БД за последние 30 дней (выставки длятся неделями)."""
        with get_session() as session:
            repo = ArticleRepository(session)
            return repo.get_recent_urls(hours=24 * 30)

    def _save_articles(
        self,
        processed_articles: list[ProcessedArticle],
        message_id_hint: Optional[int],
    ) -> int:
        """
        Сохраняет обработанные статьи в БД и помечает их как опубликованные.

        Args:
            processed_articles: Список статей после ранжирования и публикации.
            message_id_hint: ID первого Telegram-сообщения (для записи в БД).

        Returns:
            Число сохранённых статей.
        """
        saved_count = 0
        with get_session() as session:
            repo = ArticleRepository(session)
            for article in processed_articles:
                try:
                    db_article = _processed_to_storage_article(article)
                    saved = repo.save_article(db_article)
                    if saved.id is not None:
                        repo.mark_published(
                            article_id=saved.id,
                            telegram_message_id=message_id_hint,
                        )
                        saved_count += 1
                except Exception as exc:
                    logger.error(
                        "Ошибка сохранения статьи '%s': %s",
                        article.title[:60],
                        exc,
                    )

        logger.debug("Сохранено и помечено в БД: %d статей", saved_count)
        return saved_count

    def _save_publish_log(
        self,
        digest_type: str,
        fetched: int,
        published: int,
        status: str,
        error_message: Optional[str] = None,
    ) -> None:
        """Записывает итоги запуска в таблицу publish_logs."""
        try:
            with get_session() as session:
                repo = PublishLogRepository(session)
                repo.create_log(
                    digest_type=digest_type,
                    articles_fetched=fetched,
                    articles_published=published,
                    status=status,
                    error_message=error_message,
                )
        except Exception as exc:
            logger.error("Ошибка записи в журнал публикаций: %s", exc)


if __name__ == "__main__":
    args = sys.argv[1:]

    # -----------------------------------------------------------------------
    # Мультиканальный режим (рекомендуется)
    # -----------------------------------------------------------------------
    if "--all-channels" in args:
        from orchestrator.channel_orchestrator import ChannelOrchestrator
        from infra.scheduler import MultiChannelScheduler

        orch = ChannelOrchestrator()

        if "--channel" in args:
            # python main.py --all-channels --channel tourism --once
            idx = args.index("--channel")
            channel = args[idx + 1] if idx + 1 < len(args) else "news"
            digest_type = "evening" if "--evening" in args else "morning"
            orch.run_channel(channel, digest_type)
        elif "--once" in args:
            # Разовый запуск всех каналов
            digest_type = "evening" if "--evening" in args else "morning"
            orch.run_all_digests(digest_type)
        elif "--events" in args:
            orch.run_events_all()
        else:
            scheduler = MultiChannelScheduler(
                orchestrator=orch,
                morning_time=config.schedule.morning_time,
                evening_time=config.schedule.evening_time,
                events_interval_hours=config.schedule.events_interval_hours,
            )
            scheduler.start()

    # -----------------------------------------------------------------------
    # Однока нальный режим (backward compat, для одного канала news)
    # -----------------------------------------------------------------------
    elif "--migrate" in args:
        from storage.migration import run_migrations
        run_migrations()
        logger.info("Миграции выполнены.")

    elif "--once" in args:
        orchestrator = NewsOrchestrator()
        orchestrator.run_once()

    elif "--events" in args:
        orchestrator = NewsOrchestrator()
        orchestrator.run_events_digest()

    else:
        orchestrator = NewsOrchestrator()
        from infra.scheduler import NewsScheduler

        scheduler = NewsScheduler(
            run_fn=orchestrator.run_digest,
            events_fn=orchestrator.run_events_digest,
            morning_time=config.schedule.morning_time,
            evening_time=config.schedule.evening_time,
            events_interval_hours=config.schedule.events_interval_hours,
        )
        scheduler.start()
