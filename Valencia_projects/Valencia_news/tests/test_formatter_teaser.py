"""Тесты для форматирования Telegram-сообщений с teaser_ru."""
from datetime import datetime, timezone
from models import ProcessedArticle
from notifier.formatter import MessageFormatter


def _make_article(**kwargs) -> ProcessedArticle:
    defaults = dict(
        url="https://example.com/1",
        title="Valencia lanza programa",
        source_name="Las Provincias",
        region="valencia",
        published_at=datetime(2026, 5, 20, 10, 0, tzinfo=timezone.utc),
        content="...",
        title_ru="Валенсия запускает программу",
        teaser_ru="Валенсия запускает летнюю программу для детей.",
        summary_ru="Городской совет Валенсии запустил большую летнюю программу. Запись открыта с мая.",
        importance_score=0.7,
        category="общество",
        location="",
    )
    defaults.update(kwargs)
    return ProcessedArticle(**defaults)


def test_format_article_uses_teaser_not_summary():
    """В Telegram-блоке используется teaser_ru, а не summary_ru."""
    formatter = MessageFormatter()
    article = _make_article()
    block = formatter.format_article(article)

    assert "Валенсия запускает летнюю программу для детей" in block
    assert "Городской совет Валенсии запустил большую летнюю программу" not in block


def test_format_article_contains_website_link():
    """Блок содержит ссылку на сайт."""
    formatter = MessageFormatter()
    article = _make_article()
    block = formatter.format_article(article)

    assert "valencia-news.vercel.app" in block


def test_format_article_fallback_to_summary_when_teaser_empty():
    """Если teaser_ru пустой — используем summary_ru."""
    formatter = MessageFormatter()
    article = _make_article(teaser_ru="")
    block = formatter.format_article(article)

    assert "Городской совет Валенсии запустил большую" in block


def test_format_article_website_link_is_valid_markdownv2():
    """Ссылка на сайт — корректный MarkdownV2 inline-link."""
    formatter = MessageFormatter()
    article = _make_article()
    block = formatter.format_article(article)

    # MarkdownV2 inline link: [text](url) — URL не экранируется (только ')' и '\')
    assert "[Подробнее →](https://valencia-news.vercel.app)" in block
