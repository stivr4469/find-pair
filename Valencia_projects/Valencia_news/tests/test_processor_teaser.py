"""Тесты для генерации teaser_ru в ArticleProcessor."""
from unittest.mock import MagicMock

from ai.processor import ArticleProcessor
from models import ParsedArticle
from datetime import datetime, timezone


def _make_article() -> ParsedArticle:
    return ParsedArticle(
        url="https://example.com/1",
        title="Valencia lanza programa de verano",
        source_name="Las Provincias",
        region="valencia",
        published_at=datetime(2026, 5, 20, 10, 0, tzinfo=timezone.utc),
        content="Valencia lanza un programa de actividades de verano para niños.",
    )


def test_teaser_ru_populated_from_ai():
    """Processor должен заполнять teaser_ru из ответа AI."""
    mock_client = MagicMock()
    mock_client.generate.return_value = (
        '{"title_ru": "Тест", "teaser_ru": "Валенсия запускает летнюю программу.", '
        '"summary_ru": "Городской совет Валенсии запускает летнюю программу для детей.", '
        '"importance": 0.7, "category": "общество", "location": ""}'
    )
    processor = ArticleProcessor(client=mock_client)
    result = processor.process_article(_make_article())

    assert result.teaser_ru == "Валенсия запускает летнюю программу."


def test_teaser_ru_fallback_to_first_sentence_of_summary():
    """Если AI не вернул teaser_ru — берём первое предложение summary_ru."""
    mock_client = MagicMock()
    mock_client.generate.return_value = (
        '{"title_ru": "Тест", '
        '"summary_ru": "Городской совет запустил программу. Запись открыта.", '
        '"importance": 0.7, "category": "общество", "location": ""}'
    )
    processor = ArticleProcessor(client=mock_client)
    result = processor.process_article(_make_article())

    assert result.teaser_ru == "Городской совет запустил программу."


def test_teaser_ru_truncated_to_200_chars():
    """Слишком длинный teaser обрезается до 200 символов."""
    long_teaser = "А" * 250
    mock_client = MagicMock()
    mock_client.generate.return_value = (
        f'{{"title_ru": "Тест", "teaser_ru": "{long_teaser}", '
        f'"summary_ru": "Краткое описание.", '
        f'"importance": 0.5, "category": "другое", "location": ""}}'
    )
    processor = ArticleProcessor(client=mock_client)
    result = processor.process_article(_make_article())

    assert len(result.teaser_ru) <= 200
