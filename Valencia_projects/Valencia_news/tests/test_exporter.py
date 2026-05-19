"""Тесты для exporter.py."""
import json
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest


def _make_article(channel: str = "news") -> object:
    """Создаёт минимальный мок статьи для тестов."""
    a = MagicMock()
    a.id = 1
    a.title = "Test"
    a.title_ru = "Тест"
    a.summary_ru = "Краткое описание."
    a.source_name = "El País"
    a.url = "https://example.com/1"
    a.image_url = None
    a.category = "культура"
    a.published_at = datetime(2026, 5, 19, 10, 0, tzinfo=timezone.utc)
    a.channel = channel
    return a


def test_to_dict_all_fields():
    """_to_dict включает все поля нужные для JSON-экспорта."""
    from exporter import _to_dict

    art = _make_article("news")
    d = _to_dict(art)

    assert d["id"] == 1
    assert d["title_ru"] == "Тест"
    assert d["summary_ru"] == "Краткое описание."
    assert d["source_name"] == "El País"
    assert d["url"] == "https://example.com/1"
    assert d["image_url"] is None
    assert d["category"] == "культура"
    assert d["channel"] == "news"
    assert "2026-05-19" in d["published_at"]


def test_to_dict_fallback_title_ru():
    """_to_dict использует title если title_ru пустой."""
    from exporter import _to_dict

    art = _make_article()
    art.title_ru = None
    art.title = "Испанский заголовок"
    d = _to_dict(art)

    assert d["title_ru"] == "Испанский заголовок"


def test_export_to_website_creates_four_json_files(tmp_path):
    """export_to_website создаёт по одному JSON на каждый из 4 каналов."""
    from exporter import CHANNELS

    mock_repo = MagicMock()
    mock_repo.get_latest_for_export.return_value = [_make_article()]

    with patch("exporter.DATA_DIR", tmp_path), \
         patch("exporter.get_session") as mock_get_session, \
         patch("exporter.ArticleRepository", return_value=mock_repo):
        mock_get_session.return_value.__enter__ = MagicMock(return_value=MagicMock())
        mock_get_session.return_value.__exit__ = MagicMock(return_value=False)
        from exporter import export_to_website
        export_to_website()

    for channel in CHANNELS:
        f = tmp_path / f"{channel}.json"
        assert f.exists(), f"Нет файла {channel}.json"
        data = json.loads(f.read_text())
        assert data["channel"] == channel
        assert "updated_at" in data
        assert isinstance(data["articles"], list)


def test_export_json_valid_structure(tmp_path):
    """JSON содержит правильную структуру ExportFile."""
    mock_repo = MagicMock()
    mock_repo.get_latest_for_export.return_value = [_make_article("news")]

    with patch("exporter.DATA_DIR", tmp_path), \
         patch("exporter.get_session") as mock_get_session, \
         patch("exporter.ArticleRepository", return_value=mock_repo):
        mock_get_session.return_value.__enter__ = MagicMock(return_value=MagicMock())
        mock_get_session.return_value.__exit__ = MagicMock(return_value=False)
        from exporter import export_to_website
        export_to_website()

    data = json.loads((tmp_path / "news.json").read_text())
    article = data["articles"][0]
    required = {"id", "title_ru", "summary_ru", "source_name", "url", "image_url",
                "category", "published_at", "channel"}
    assert required.issubset(article.keys())


def test_git_push_website_commits_and_pushes(tmp_path):
    """git_push_website делает commit и push если есть изменения."""
    from unittest.mock import call

    calls = []

    def fake_run(cmd, **kwargs):
        result = MagicMock()
        calls.append(cmd)
        # diff --cached --quiet: returncode=1 означает "есть изменения"
        result.returncode = 1 if cmd[1:3] == ["diff", "--cached"] else 0
        return result

    with patch("exporter.subprocess.run", side_effect=fake_run):
        from exporter import git_push_website
        git_push_website("data: тест")

    assert ["git", "add", "website/public/data/"] in calls
    assert ["git", "commit", "-m", "data: тест"] in calls
    assert ["git", "push"] in calls


def test_git_push_website_skips_when_no_changes():
    """git_push_website не делает commit если нет изменений."""
    calls = []

    def fake_run(cmd, **kwargs):
        result = MagicMock()
        calls.append(cmd)
        result.returncode = 0  # no changes
        return result

    with patch("exporter.subprocess.run", side_effect=fake_run):
        from exporter import git_push_website
        git_push_website()

    assert ["git", "push"] not in calls
    assert not any(c[0] == "git" and c[1] == "commit" for c in calls)
