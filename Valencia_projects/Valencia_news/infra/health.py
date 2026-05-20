"""
Проверки работоспособности всех внешних сервисов.

HealthChecker проверяет подключение к БД, Gemini API и Telegram Bot API.
Используется при старте приложения и для мониторинга в рантайме.
"""

from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger(__name__)

# Строка для проверки Gemini — минимальный промпт чтобы не тратить токены
_GEMINI_TEST_PROMPT = "Ответь одним словом: ok"

# Таймаут HTTP-запросов при проверках работоспособности (секунды)
_CHECK_TIMEOUT = 10


def _make_check_result(status: str, message: str) -> dict[str, str]:
    """Вспомогательная функция для создания словаря результата проверки."""
    return {"status": status, "message": message}


class HealthChecker:
    """
    Проверяет работоспособность всех внешних зависимостей.

    Каждый метод check_* возвращает словарь вида:
        {"status": "ok" | "error", "message": "описание результата"}

    check_all() агрегирует результаты и выносит итоговый статус:
        "ok"       — все проверки прошли
        "degraded" — часть проверок провалилась
        "down"     — все проверки провалились
    """

    # -------------------------------------------------------------------
    # Проверка базы данных
    # -------------------------------------------------------------------

    def check_db(self, db_url: str) -> dict[str, str]:
        """
        Проверить подключение к базе данных.

        Создаёт временный движок, выполняет SELECT 1 и закрывает соединение.
        Не использует глобальный движок из database.py, чтобы не влиять на пул.

        Args:
            db_url: URL подключения к БД (например sqlite:///./data/news.db).

        Returns:
            {"status": "ok/error", "message": str}
        """
        try:
            from sqlalchemy import create_engine, text

            # Для SQLite отключаем проверку потоков в проверочном движке
            kwargs: dict[str, Any] = {}
            if db_url.startswith("sqlite"):
                kwargs["connect_args"] = {"check_same_thread": False}

            check_engine = create_engine(db_url, **kwargs)
            with check_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            check_engine.dispose()

            logger.debug("HealthCheck DB: OK (%s)", db_url)
            return _make_check_result("ok", f"Подключение к БД установлено: {db_url}")

        except Exception as exc:
            logger.warning("HealthCheck DB: ОШИБКА — %s", exc)
            return _make_check_result("error", f"Ошибка подключения к БД: {exc}")

    # -------------------------------------------------------------------
    # Проверка Gemini API
    # -------------------------------------------------------------------

    def check_gemini(self, api_key: str) -> dict[str, str]:
        """
        Проверить доступность Gemini API.

        Выполняет минимальный тестовый запрос (не тратит значимых токенов).

        Args:
            api_key: Ключ Gemini API.

        Returns:
            {"status": "ok/error", "message": str}
        """
        if not api_key:
            return _make_check_result("error", "GEMINI_API_KEY не задан")

        try:
            import google.generativeai as genai

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(
                _GEMINI_TEST_PROMPT,
                generation_config=genai.types.GenerationConfig(max_output_tokens=10),
            )

            # Проверяем, что ответ не пустой
            if not response.candidates:
                return _make_check_result("error", "Gemini вернул пустой ответ")

            logger.debug("HealthCheck Gemini: OK")
            return _make_check_result("ok", "Gemini API доступен")

        except Exception as exc:
            logger.warning("HealthCheck Gemini: ОШИБКА — %s", exc)
            return _make_check_result("error", f"Ошибка Gemini API: {exc}")

    # -------------------------------------------------------------------
    # Проверка Telegram Bot API
    # -------------------------------------------------------------------

    def check_telegram(self, bot_token: str) -> dict[str, str]:
        """
        Проверить работоспособность Telegram бота через getMe().

        Выполняет HTTP GET к Telegram Bot API без отправки сообщений.

        Args:
            bot_token: Токен Telegram бота.

        Returns:
            {"status": "ok/error", "message": str}
        """
        if not bot_token:
            return _make_check_result("error", "TELEGRAM_BOT_TOKEN не задан")

        try:
            import requests

            url = f"https://api.telegram.org/bot{bot_token}/getMe"
            response = requests.get(url, timeout=_CHECK_TIMEOUT)
            response.raise_for_status()
            data = response.json()

            if not data.get("ok"):
                error_desc = data.get("description", "неизвестная ошибка")
                return _make_check_result(
                    "error", f"Telegram API вернул ok=false: {error_desc}"
                )

            bot_name = data.get("result", {}).get("username", "unknown")
            logger.debug("HealthCheck Telegram: OK (@%s)", bot_name)
            return _make_check_result("ok", f"Telegram бот активен: @{bot_name}")

        except Exception as exc:
            # Никогда не логируем URL — он содержит bot token
            logger.warning("HealthCheck Telegram: ОШИБКА — %s", type(exc).__name__)
            return _make_check_result("error", f"Ошибка Telegram API: {type(exc).__name__}")

    # -------------------------------------------------------------------
    # Агрегированная проверка всех сервисов
    # -------------------------------------------------------------------

    def check_all(self) -> dict[str, Any]:
        """
        Запустить все проверки работоспособности и вернуть итоговый статус.

        Читает параметры из конфигурации приложения (config.py).

        Returns:
            Словарь вида:
            {
                "status": "ok" | "degraded" | "down",
                "checks": {
                    "db":       {"status": "ok/error", "message": "..."},
                    "gemini":   {"status": "ok/error", "message": "..."},
                    "telegram": {"status": "ok/error", "message": "..."},
                }
            }
        """
        from config import config

        checks: dict[str, dict[str, str]] = {}

        # Выполняем проверки последовательно — они независимы,
        # но параллельность через threads добавит сложности без значимого прироста
        checks["db"] = self.check_db(config.database.url)
        checks["gemini"] = self.check_gemini(config.gemini.api_key)
        checks["telegram"] = self.check_telegram(config.telegram.bot_token)

        # Считаем итоговый статус
        statuses = [c["status"] for c in checks.values()]
        ok_count = statuses.count("ok")
        total_count = len(statuses)

        if ok_count == total_count:
            overall = "ok"
        elif ok_count == 0:
            overall = "down"
        else:
            overall = "degraded"

        result: dict[str, Any] = {
            "status": overall,
            "checks": checks,
        }

        logger.info(
            "HealthCheck завершён: статус=%s (%d/%d проверок прошли)",
            overall,
            ok_count,
            total_count,
        )
        return result
