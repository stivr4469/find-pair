"""
Оркестратор всех Telegram-каналов.

Создаёт и хранит по одному NewsAggregator на каждый активный канал.
Используется как точка входа для мультиканального запуска.
"""

from __future__ import annotations

import logging

from ai.gemini_client import GeminiClient
from config import config
from orchestrator.channel_config import ChannelConfig, build_channel_configs
from orchestrator.news_aggregator import NewsAggregator
from storage.database import init_db

logger = logging.getLogger(__name__)


class ChannelOrchestrator:
    """
    Управляет мультиканальной системой публикации.

    Один GeminiClient делится между всеми агрегаторами — нет смысла
    создавать отдельный HTTP-клиент на каждый канал.
    """

    def __init__(self) -> None:
        init_db()
        logger.info("База данных инициализирована.")

        errors = config.validate()
        if errors:
            for e in errors:
                logger.error("Конфигурация: %s", e)
            raise RuntimeError(f"Ошибка конфигурации: {errors[0]}")

        self._gemini = GeminiClient(
            api_key=config.gemini.api_key,
            model=config.gemini.model,
        )

        channel_configs = build_channel_configs(config)
        if not channel_configs:
            logger.warning(
                "Нет активных каналов — проверьте TELEGRAM_CHANNEL_* в .env"
            )

        self._aggregators: dict[str, NewsAggregator] = {
            cfg.channel: NewsAggregator(channel_cfg=cfg, gemini_client=self._gemini)
            for cfg in channel_configs
        }

        logger.info(
            "ChannelOrchestrator готов. Активные каналы: %s",
            list(self._aggregators.keys()),
        )

    # -------------------------------------------------------------------
    # Публичный API
    # -------------------------------------------------------------------

    def run_all_digests(self, digest_type: str = "morning") -> None:
        """Запускает дайджест последовательно по всем каналам."""
        for channel, aggregator in self._aggregators.items():
            if channel == "events":
                aggregator.run_events_digest()
            else:
                aggregator.run_digest(digest_type=digest_type)

        if config.website_export_enabled:
            try:
                from exporter import export_to_website, git_push_website
                export_to_website()
                git_push_website()
            except Exception as exc:
                logger.error("Ошибка экспорта на сайт: %s", exc)

    def run_channel(self, channel: str, digest_type: str = "morning") -> None:
        """Запускает дайджест для одного конкретного канала."""
        aggregator = self._aggregators.get(channel)
        if aggregator is None:
            logger.error(
                "Канал '%s' не найден или не настроен. Доступные: %s",
                channel,
                list(self._aggregators.keys()),
            )
            return
        if channel == "events":
            aggregator.run_events_digest()
        else:
            aggregator.run_digest(digest_type=digest_type)

    def run_events_all(self) -> None:
        """Запускает афишу — только канал events."""
        aggregator = self._aggregators.get("events")
        if aggregator:
            aggregator.run_events_digest()
        else:
            logger.info("Канал 'events' не настроен — пропускаем.")

    @property
    def active_channels(self) -> list[str]:
        return list(self._aggregators.keys())
