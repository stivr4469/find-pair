"""
Экспортер данных из SQLite в JSON для сайта-агрегатора.

Вызывается из channel_orchestrator.py после каждого дайджеста.
"""
from __future__ import annotations

import json
import logging
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from storage.database import get_session
from storage.models import Article
from storage.repository import ArticleRepository

logger = logging.getLogger(__name__)

CHANNELS = ["news", "events", "tourism", "gastronomy"]
DATA_DIR = Path(__file__).parent / "website" / "public" / "data"


def export_to_website() -> None:
    """Читает из SQLite, пишет JSON в website/public/data/."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).isoformat()

    with get_session() as session:
        repo = ArticleRepository(session)
        for channel in CHANNELS:
            articles = repo.get_latest_for_export(channel=channel, limit=50)
            data = {
                "updated_at": now,
                "channel": channel,
                "articles": [_to_dict(a) for a in articles],
            }
            out = DATA_DIR / f"{channel}.json"
            out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            logger.info("Экспорт %s: %d статей → %s", channel, len(articles), out)


def git_push_website(commit_message: str = "data: обновление данных сайта") -> None:
    """git add + commit + push для обновления Vercel."""
    subprocess.run(["git", "add", "website/public/data/"], check=True)
    # Пропускаем commit если нет изменений
    result = subprocess.run(["git", "diff", "--cached", "--quiet"], capture_output=True)
    if result.returncode == 0:
        logger.info("Нет изменений в данных сайта — git push пропущен")
        return
    subprocess.run(["git", "commit", "-m", commit_message], check=True)
    subprocess.run(["git", "push"], check=True)
    logger.info("Данные сайта обновлены и запушены на Vercel")


def _to_dict(a: Article) -> dict:
    return {
        "id": a.id,
        "title_ru": a.title_ru or a.title,
        "summary_ru": a.summary_ru or "",
        "source_name": a.source_name or "",
        "url": a.url,
        "image_url": a.image_url,
        "category": a.category or "другое",
        "published_at": a.published_at.isoformat() if a.published_at else "",
        "channel": a.channel,
    }
