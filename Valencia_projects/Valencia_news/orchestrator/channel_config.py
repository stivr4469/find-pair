"""
Конфигурация отдельного Telegram-канала в мультиканальной системе.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from config import AppConfig

# Порядок каналов и их метаданные — единственное место, где это определено
_CHANNEL_META: list[dict] = [
    {
        "channel": "news",
        "display_name": "Новости Валенсии",
        "env_key": "TELEGRAM_CHANNEL_NEWS",
    },
    {
        "channel": "events",
        "display_name": "Афиша Валенсии",
        "env_key": "TELEGRAM_CHANNEL_EVENTS",
    },
    {
        "channel": "tourism",
        "display_name": "Отдых в Испании",
        "env_key": "TELEGRAM_CHANNEL_TOURISM",
    },
    {
        "channel": "gastronomy",
        "display_name": "Гастрономия Испании",
        "env_key": "TELEGRAM_CHANNEL_GASTRONOMY",
    },
]


@dataclass(frozen=True)
class ChannelConfig:
    """Конфигурация одного Telegram-канала."""

    channel: str          # Ключ: "news" | "events" | "tourism" | "gastronomy"
    chat_id: str          # ID или @username канала в Telegram
    display_name: str     # Название для логов и дайджестов
    persona_file: Path    # Путь к файлу с промптом редакторской персоны
    # Кэшированный текст персоны — читается один раз при построении конфига
    persona_prompt: str = ""


def build_channel_configs(cfg: AppConfig) -> list[ChannelConfig]:
    """
    Строит список конфигов активных каналов из AppConfig.
    Канал включается только если задан его chat_id.
    """
    personas_dir = cfg.base_dir / "ai" / "personas"
    channels: list[ChannelConfig] = []

    for meta in _CHANNEL_META:
        key = meta["channel"]
        chat_id: str = getattr(cfg.telegram, f"channel_{key}", "")
        if not chat_id:
            continue
        persona_file = personas_dir / f"{key}.txt"
        persona_text = persona_file.read_text(encoding="utf-8").strip() if persona_file.exists() else ""
        channels.append(
            ChannelConfig(
                channel=key,
                chat_id=chat_id,
                display_name=meta["display_name"],
                persona_file=persona_file,
                persona_prompt=persona_text,
            )
        )

    return channels
