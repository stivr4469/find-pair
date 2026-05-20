"""
Тесты AI-компонентов: обработка Gemini, дедупликация, ранжирование.

Покрывает:
  - Парсинг корректного JSON-ответа Gemini
  - Обработку некорректного/сломанного JSON (fallback)
  - Дедупликацию по URL и заголовкам
  - Определение похожести заголовков
  - Ранжирование по importance_score
  - Обеспечение квоты для валенсийских новостей
"""

from __future__ import annotations

import sys
import os
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ai.deduplicator import Deduplicator, _normalize_title, _cosine_similarity, _trigrams
from ai.gemini_client import GeminiClient
from ai.processor import ArticleProcessor, VALID_CATEGORIES
from ai.ranker import Ranker
from models import ParsedArticle, ProcessedArticle


# ---------------------------------------------------------------------------
# Фикстуры
# ---------------------------------------------------------------------------

def _make_parsed_article(
    url: str = "https://example.com/article",
    title: str = "Тестовая статья",
    region: str = "spain",
    published_at: datetime | None = None,
    content: str = "Полный текст статьи о событии в Испании.",
) -> ParsedArticle:
    """Создаёт ParsedArticle с заданными полями для тестов."""
    return ParsedArticle(
        url=url,
        title=title,
        source_name="El País",
        region=region,
        published_at=published_at or datetime.now(timezone.utc),
        content=content,
        image_url=None,
    )


def _make_processed_article(
    url: str = "https://example.com/article",
    title: str = "Тестовая статья",
    region: str = "spain",
    importance_score: float = 0.5,
    category: str = "политика",
) -> ProcessedArticle:
    """Создаёт ProcessedArticle с заданными полями для тестов."""
    return ProcessedArticle(
        url=url,
        title=title,
        source_name="El País",
        region=region,
        published_at=datetime.now(timezone.utc),
        content="Текст",
        summary_ru="Краткое содержание на русском.",
        importance_score=importance_score,
        category=category,
    )


@pytest.fixture
def mock_gemini_client() -> MagicMock:
    """Мок GeminiClient — не делает реальных API-вызовов."""
    return MagicMock(spec=GeminiClient)


@pytest.fixture
def processor(mock_gemini_client: MagicMock) -> ArticleProcessor:
    """ArticleProcessor с мок-клиентом Gemini."""
    return ArticleProcessor(client=mock_gemini_client)


@pytest.fixture
def deduplicator() -> Deduplicator:
    return Deduplicator()


@pytest.fixture
def ranker() -> Ranker:
    return Ranker()


# ---------------------------------------------------------------------------
# test_gemini_response_parsing
# ---------------------------------------------------------------------------

class TestGeminiResponseParsing:
    """Тесты парсинга ответа от Gemini API."""

    def test_gemini_response_parsing(self, processor: ArticleProcessor) -> None:
        """
        Корректный JSON-ответ Gemini правильно парсится в поля ProcessedArticle.
        """
        valid_json_response = (
            '{"summary_ru": "Премьер-министр Испании объявил о новых мерах поддержки.", '
            '"importance": 0.85, "category": "политика"}'
        )
        result = processor._parse_response(valid_json_response)

        assert result["summary_ru"] == "Премьер-министр Испании объявил о новых мерах поддержки."
        assert result["importance"] == 0.85
        assert result["category"] == "политика"

    def test_gemini_response_with_markdown_wrapper(
        self, processor: ArticleProcessor
    ) -> None:
        """
        Gemini часто оборачивает JSON в ```json ... ```.
        Парсер должен убирать обёртку перед декодированием.
        """
        wrapped_response = (
            "```json\n"
            '{"summary_ru": "Краткое содержание.", "importance": 0.6, "category": "экономика"}\n'
            "```"
        )
        result = processor._parse_response(wrapped_response)

        assert result["summary_ru"] == "Краткое содержание."
        assert result["importance"] == 0.6
        assert result["category"] == "экономика"

    def test_full_process_article_uses_gemini_response(
        self, processor: ArticleProcessor, mock_gemini_client: MagicMock
    ) -> None:
        """
        process_article() передаёт результат Gemini в ProcessedArticle.
        """
        mock_gemini_client.generate.return_value = (
            '{"summary_ru": "Мэр Валенсии открыл новый парк.", "importance": 0.55, "category": "общество"}'
        )

        article = _make_parsed_article(title="Новый парк в Валенсии", region="valencia")
        processed = processor.process_article(article)

        assert processed.summary_ru == "Мэр Валенсии открыл новый парк."
        assert processed.importance_score == 0.55
        assert processed.category == "общество"
        assert processed.url == article.url
        assert processed.region == "valencia"


# ---------------------------------------------------------------------------
# test_gemini_response_malformed
# ---------------------------------------------------------------------------

class TestGeminiResponseMalformed:
    """Тесты поведения при некорректном ответе Gemini."""

    def test_gemini_response_malformed(self, processor: ArticleProcessor) -> None:
        """
        При невалидном JSON _parse_response возвращает пустой dict.
        """
        malformed = "Это не JSON вообще, просто текст от модели."
        result = processor._parse_response(malformed)
        assert result == {}

    def test_gemini_response_empty_json(self, processor: ArticleProcessor) -> None:
        """Пустой объект JSON обрабатывается без ошибок."""
        result = processor._parse_response("{}")
        assert result == {}

    def test_process_article_fallback_on_gemini_error(
        self, processor: ArticleProcessor, mock_gemini_client: MagicMock
    ) -> None:
        """
        При ошибке GeminiError process_article() не падает,
        а возвращает статью с дефолтными значениями.
        """
        from ai.gemini_client import GeminiError

        mock_gemini_client.generate.side_effect = GeminiError("API timeout")

        article = _make_parsed_article(title="Статья без AI-обработки")
        processed = processor.process_article(article)

        # Не должен выбросить исключение
        assert processed is not None
        assert processed.url == article.url
        assert processed.title == article.title
        # Дефолтные значения при ошибке
        assert 0.0 <= processed.importance_score <= 1.0
        assert processed.category in VALID_CATEGORIES

    def test_process_article_fallback_with_title_as_summary(
        self, processor: ArticleProcessor, mock_gemini_client: MagicMock
    ) -> None:
        """
        При пустом ответе Gemini summary_ru формируется из заголовка статьи.
        """
        mock_gemini_client.generate.return_value = "{}"  # Пустой объект

        article = _make_parsed_article(title="Важный заголовок новости")
        processed = processor.process_article(article)

        assert "Важный заголовок новости" in processed.summary_ru


# ---------------------------------------------------------------------------
# test_deduplicator_removes_duplicates
# ---------------------------------------------------------------------------

class TestDeduplicator:
    """Тесты дедупликации статей."""

    def test_deduplicator_removes_duplicates(self, deduplicator: Deduplicator) -> None:
        """
        Две статьи с одинаковым URL — остаётся только одна.
        """
        article_a = _make_parsed_article(url="https://example.com/same", title="Статья А")
        article_b = _make_parsed_article(url="https://example.com/same", title="Статья А (копия)")

        result = deduplicator.deduplicate_batch(
            articles=[article_a, article_b],
            known_urls=set(),
        )

        assert len(result) == 1
        assert result[0].url == "https://example.com/same"

    def test_deduplicator_filters_known_urls(self, deduplicator: Deduplicator) -> None:
        """
        Статья с URL из known_urls отфильтровывается.
        """
        article = _make_parsed_article(url="https://example.com/known")
        known_urls = {"https://example.com/known"}

        result = deduplicator.deduplicate_batch(
            articles=[article],
            known_urls=known_urls,
        )

        assert len(result) == 0

    def test_deduplicator_keeps_different_urls(self, deduplicator: Deduplicator) -> None:
        """Статьи с разными URL и разными заголовками не удаляются."""
        distinct_titles = [
            "Землетрясение на Канарских островах",
            "Бармен из Валенсии выиграл конкурс паэльи",
            "Правительство Испании обсуждает бюджет",
            "Туристический сезон в Коста Бланке",
            "Выборы мэра Барселоны",
        ]
        articles = [
            _make_parsed_article(
                url=f"https://example.com/article/{i}",
                title=title,
                content=f"Уникальный текст статьи о событии номер {i} в разных городах.",
            )
            for i, title in enumerate(distinct_titles)
        ]

        result = deduplicator.deduplicate_batch(articles=articles, known_urls=set())

        assert len(result) == 5

    def test_deduplicator_same_title_removed(self, deduplicator: Deduplicator) -> None:
        """
        Статьи с одинаковыми заголовками (но разными URL) удаляются при дедупликации.
        """
        article_a = _make_parsed_article(
            url="https://source1.com/news",
            title="Землетрясение в Валенсии",
        )
        article_b = _make_parsed_article(
            url="https://source2.com/news",  # Разный URL
            title="Землетрясение в Валенсии",  # Тот же заголовок
        )

        result = deduplicator.deduplicate_batch(
            articles=[article_a, article_b],
            known_urls=set(),
        )

        assert len(result) == 1


# ---------------------------------------------------------------------------
# test_title_similarity
# ---------------------------------------------------------------------------

class TestTitleSimilarity:
    """Тесты определения похожести заголовков."""

    def test_title_similarity_identical(self, deduplicator: Deduplicator) -> None:
        """Идентичные заголовки имеют сходство 1.0."""
        similarity = deduplicator._title_similarity(
            "Кризис в испанской экономике",
            "Кризис в испанской экономике",
        )
        assert similarity == pytest.approx(1.0, abs=0.01)

    def test_title_similarity_similar(self, deduplicator: Deduplicator) -> None:
        """
        Почти одинаковые заголовки имеют высокое сходство (> 0.8).
        """
        similarity = deduplicator._title_similarity(
            "Кризис в испанской экономике 2024",
            "Кризис в испанской экономике: обзор",
        )
        assert similarity > 0.7

    def test_title_similarity_different(self, deduplicator: Deduplicator) -> None:
        """Совершенно разные заголовки имеют низкое сходство (< 0.3)."""
        similarity = deduplicator._title_similarity(
            "Землетрясение на Канарских островах",
            "Бармен из Валенсии выиграл конкурс паэльи",
        )
        assert similarity < 0.4

    def test_normalize_title(self) -> None:
        """_normalize_title убирает пунктуацию и приводит к нижнему регистру."""
        normalized = _normalize_title("КРИЗИС! В Испании — ЭкономиКА")
        assert normalized == normalized.lower()
        assert "!" not in normalized
        assert "—" not in normalized


# ---------------------------------------------------------------------------
# test_ranker_importance_order
# ---------------------------------------------------------------------------

class TestRanker:
    """Тесты ранжировщика статей."""

    def test_ranker_importance_order(self, ranker: Ranker) -> None:
        """
        Статьи ранжируются по убыванию importance_score.
        Используем valencia — нет фильтра по важности и категории.
        """
        articles = [
            _make_processed_article(url="https://a.com/1", importance_score=0.3, region="valencia"),
            _make_processed_article(url="https://a.com/2", importance_score=0.9, region="valencia"),
            _make_processed_article(url="https://a.com/3", importance_score=0.6, region="valencia"),
        ]

        result = ranker.rank(articles, max_count=3)

        assert result[0].importance_score == 0.9
        assert result[1].importance_score == 0.6
        assert result[2].importance_score == 0.3

    def test_ranker_respects_max_count(self, ranker: Ranker) -> None:
        """rank() возвращает не более max_count статей.
        Используем valencia — нет фильтра по важности и категории.
        """
        articles = [
            _make_processed_article(
                url=f"https://a.com/{i}",
                importance_score=float(i) / 10,
                region="valencia",
            )
            for i in range(20)
        ]

        result = ranker.rank(articles, max_count=5)
        assert len(result) == 5

    def test_ranker_empty_list(self, ranker: Ranker) -> None:
        """Пустой список на входе → пустой список на выходе."""
        result = ranker.rank([], max_count=10)
        assert result == []

    def test_ranker_fewer_articles_than_max(self, ranker: Ranker) -> None:
        """Если статей меньше max_count — возвращаются все."""
        articles = [
            _make_processed_article(url=f"https://a.com/{i}", importance_score=0.5)
            for i in range(3)
        ]
        result = ranker.rank(articles, max_count=10)
        assert len(result) == 3


# ---------------------------------------------------------------------------
# test_ranker_ensures_valencia_diversity
# ---------------------------------------------------------------------------

class TestRankerValenciaDiversity:
    """Тесты обеспечения регионального баланса в ранжировании."""

    def test_ranker_ensures_valencia_diversity(self, ranker: Ranker) -> None:
        """
        При наличии валенсийских статей ранжировщик включает минимум 2 из них,
        даже если их importance_score ниже, чем у общенациональных.
        """
        # Много общенациональных с высоким баллом
        national = [
            _make_processed_article(
                url=f"https://national.com/{i}",
                region="spain",
                importance_score=0.9,
            )
            for i in range(8)
        ]
        # Валенсийские с более низким баллом
        valencian = [
            _make_processed_article(
                url=f"https://valencia.com/{i}",
                region="valencia",
                importance_score=0.3,
            )
            for i in range(3)
        ]

        result = ranker.rank(national + valencian, max_count=10)

        # Подсчитываем валенсийские в результате
        valencia_count = sum(1 for a in result if a.region == "valencia")
        assert valencia_count >= 2, (
            f"Ожидалось минимум 2 валенсийских статьи, получено {valencia_count}"
        )

    def test_ranker_no_valencia_articles(self, ranker: Ranker) -> None:
        """Если валенсийских статей нет — ранжировщик работает корректно."""
        national = [
            _make_processed_article(
                url=f"https://national.com/{i}",
                region="spain",
                importance_score=0.7,
            )
            for i in range(5)
        ]

        result = ranker.rank(national, max_count=3)
        assert len(result) == 3
        assert all(a.region == "spain" for a in result)
