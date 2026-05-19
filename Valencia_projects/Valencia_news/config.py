"""
Конфигурация приложения Valencia News Aggregator.
Загружает настройки из .env файла через python-dotenv.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv

# Загружаем .env из корня проекта
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

# Базовый путь проекта
BASE_DIR = Path(__file__).parent


@dataclass(frozen=True)
class ScheduleConfig:
    """Настройки расписания публикаций."""

    morning_time: str = "08:00"   # Утренний дайджест
    evening_time: str = "18:00"   # Вечерний дайджест
    fetch_interval_hours: int = field(default_factory=lambda: int(os.getenv("FETCH_INTERVAL_HOURS", "12")))
    events_interval_hours: int = field(default_factory=lambda: int(os.getenv("EVENTS_INTERVAL_HOURS", "5")))
    events_per_run: int = field(default_factory=lambda: int(os.getenv("EVENTS_PER_RUN", "15")))


@dataclass(frozen=True)
class RetryConfig:
    """Настройки повторных попыток при ошибках сети/API."""

    max_attempts: int = 3          # Максимум попыток
    wait_min_seconds: float = 1.0  # Минимальная пауза между попытками
    wait_max_seconds: float = 10.0 # Максимальная пауза между попытками
    stop_after_seconds: float = 30.0  # Общий таймаут на все попытки


@dataclass(frozen=True)
class GeminiConfig:
    """Настройки LLM через OpenRouter."""

    api_key: str = field(default_factory=lambda: os.getenv("OPENROUTER_API_KEY", ""))
    model: str = field(default_factory=lambda: os.getenv("OPENROUTER_MODEL", "google/gemini-2.5-flash-preview"))
    temperature: float = 0.3
    max_output_tokens: int = 2048
    timeout_seconds: int = 60


@dataclass(frozen=True)
class TelegramConfig:
    """Настройки Telegram бота."""

    bot_token: str = field(default_factory=lambda: os.getenv("TELEGRAM_BOT_TOKEN", ""))
    parse_mode: str = "HTML"            # Формат разметки сообщений
    disable_web_page_preview: bool = False  # Показывать превью ссылок
    send_timeout_seconds: int = 30      # Таймаут отправки

    # Мультиканальные ID (TELEGRAM_CHANNEL_ID используется как fallback для news)
    channel_news: str = field(
        default_factory=lambda: os.getenv("TELEGRAM_CHANNEL_NEWS", os.getenv("TELEGRAM_CHANNEL_ID", ""))
    )
    channel_events: str = field(default_factory=lambda: os.getenv("TELEGRAM_CHANNEL_EVENTS", ""))
    channel_tourism: str = field(default_factory=lambda: os.getenv("TELEGRAM_CHANNEL_TOURISM", ""))
    channel_gastronomy: str = field(default_factory=lambda: os.getenv("TELEGRAM_CHANNEL_GASTRONOMY", ""))


@dataclass(frozen=True)
class DatabaseConfig:
    """Настройки базы данных."""

    url: str = field(
        default_factory=lambda: os.getenv(
            "DATABASE_URL", f"sqlite:///{BASE_DIR}/data/news.db"
        )
    )
    echo_sql: bool = False   # Логировать SQL запросы (включить для отладки)
    pool_size: int = 5       # Размер пула соединений
    max_overflow: int = 10   # Дополнительные соединения сверх пула


@dataclass(frozen=True)
class AppConfig:
    """Главная конфигурация приложения."""

    # Ключевые настройки
    log_level: str = field(default_factory=lambda: os.getenv("LOG_LEVEL", "INFO"))
    max_articles_per_digest: int = field(
        default_factory=lambda: int(os.getenv("MAX_ARTICLES_PER_DIGEST", "10"))
    )

    # Регионы для фильтрации новостей
    regions: tuple[str, ...] = ("spain", "valencia")

    # Категории новостей
    categories: tuple[str, ...] = (
        "política",      # Политика
        "economía",      # Экономика
        "sociedad",      # Общество
        "cultura",       # Культура
        "deportes",      # Спорт
        "tecnología",    # Технологии
        "turismo",       # Туризм
        "inmobiliaria",  # Недвижимость
        "internacional", # Международные новости
        "sucesos",       # Происшествия
    )

    # Минимальный балл важности для включения в дайджест (0.0–1.0)
    min_importance_score: float = 0.3

    # Максимальный возраст статьи для включения в дайджест (часов)
    # 7 дней — городские программы, анонсы, социальные инициативы публикуются заранее
    max_article_age_hours: int = field(
        default_factory=lambda: int(os.getenv("MAX_ARTICLE_AGE_HOURS", "168"))
    )

    # Задержка между запросами к источникам (секунды), чтобы не перегружать серверы
    fetch_delay_seconds: float = 1.5

    # Максимальное число неудачных попыток для источника перед отключением
    max_source_fail_count: int = 5

    # Вложенные конфиги
    schedule: ScheduleConfig = field(default_factory=ScheduleConfig)
    retry: RetryConfig = field(default_factory=RetryConfig)
    gemini: GeminiConfig = field(default_factory=GeminiConfig)
    telegram: TelegramConfig = field(default_factory=TelegramConfig)
    database: DatabaseConfig = field(default_factory=DatabaseConfig)

    # Экспорт данных на сайт после каждого дайджеста (требует WEBSITE_EXPORT_ENABLED=true в .env)
    website_export_enabled: bool = field(
        default_factory=lambda: os.getenv("WEBSITE_EXPORT_ENABLED", "false").lower() == "true"
    )

    # Пути
    base_dir: Path = BASE_DIR
    data_dir: Path = field(default_factory=lambda: BASE_DIR / "data")
    logs_dir: Path = field(default_factory=lambda: BASE_DIR / "logs")

    def validate(self) -> list[str]:
        """
        Проверяет обязательные настройки.
        Возвращает список ошибок (пустой — всё ок).
        """
        errors: list[str] = []

        if not self.gemini.api_key:
            errors.append("OPENROUTER_API_KEY не задан в .env")
        if not self.telegram.bot_token:
            errors.append("TELEGRAM_BOT_TOKEN не задан в .env")
        if not self.telegram.channel_news:
            errors.append(
                "TELEGRAM_CHANNEL_NEWS (или TELEGRAM_CHANNEL_ID) не задан в .env"
            )

        return errors


# Единственный экземпляр конфига для всего приложения
config = AppConfig()
