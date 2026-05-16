# storage/migration.py
"""Миграция: добавляет колонку channel в существующую БД."""
from __future__ import annotations
import logging
from sqlalchemy import text
from storage.database import engine

logger = logging.getLogger(__name__)


def run_migrations() -> None:
    """Добавляет channel в articles и sources, если колонок нет."""
    with engine.connect() as conn:
        for table, col in [("articles", "channel"), ("sources", "channel")]:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} TEXT DEFAULT 'news'"))
                logger.info("Добавлена колонка %s.%s", table, col)
            except Exception:
                logger.debug("Колонка %s.%s уже существует", table, col)
        conn.commit()
    logger.info("Миграция завершена.")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_migrations()
