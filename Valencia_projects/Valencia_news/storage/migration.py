# storage/migration.py
"""Миграция: добавляет колонку channel в существующую БД."""
from __future__ import annotations
import logging
from sqlalchemy import text
from storage.database import engine

logger = logging.getLogger(__name__)


def run_migrations() -> None:
    """Добавляет channel и title_ru в существующую БД."""
    with engine.connect() as conn:
        for table, col, default in [
            ("articles", "channel", "'news'"),
            ("sources", "channel", "'news'"),
            ("articles", "title_ru", "NULL"),
        ]:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} TEXT DEFAULT {default}"))
                logger.info("Добавлена колонка %s.%s", table, col)
            except Exception:
                logger.debug("Колонка %s.%s уже существует", table, col)
        conn.commit()
    logger.info("Миграция завершена.")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_migrations()
