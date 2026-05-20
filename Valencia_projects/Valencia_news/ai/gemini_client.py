"""
LLM-клиент через Gemini CLI (OAuth, без API-ключа).

Fallback: если GEMINI_CLI_DISABLED=true или CLI недоступен — использует OpenRouter.
Интерфейс GeminiClient/GeminiError сохранён для совместимости с processor.py.
"""

from __future__ import annotations

import logging
import os
import shutil
import subprocess
import time

import requests
from tenacity import (
    before_sleep_log,
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

logger = logging.getLogger(__name__)

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
_GEMINI_CLI_PATH = shutil.which("gemini")


class GeminiError(Exception):
    """Ошибка при работе с LLM API."""

    def __init__(self, message: str, original: Exception | None = None) -> None:
        super().__init__(message)
        self.original = original


class GeminiClient:
    """
    LLM-клиент: сначала пробует Gemini CLI (OAuth, бесплатно),
    при ошибке fallback на OpenRouter.
    """

    def __init__(
        self,
        api_key: str = "",
        model: str = "google/gemini-2.5-flash",
    ) -> None:
        self._api_key = api_key
        self._model_name = model
        self._use_cli = bool(_GEMINI_CLI_PATH) and os.environ.get("GEMINI_CLI_DISABLED", "").lower() != "true"
        self._headers: dict | None = None

        if api_key:
            self._headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://github.com/valencia-news-bot",
                "X-Title": "Valencia News Bot",
            }

        if self._use_cli:
            logger.info("LLM клиент: Gemini CLI (OAuth), путь: %s", _GEMINI_CLI_PATH)
        elif self._headers:
            logger.info("LLM клиент: OpenRouter, модель: %s", model)
        else:
            raise GeminiError("Нет ни Gemini CLI, ни OPENROUTER_API_KEY")

    # ------------------------------------------------------------------
    # Gemini CLI
    # ------------------------------------------------------------------

    def _generate_via_cli(self, prompt: str) -> str:
        """Вызов через gemini CLI subprocess (OAuth)."""
        try:
            result = subprocess.run(
                [_GEMINI_CLI_PATH, "-p", prompt],
                stdin=subprocess.DEVNULL,
                capture_output=True,
                text=True,
                timeout=180,
            )
        except subprocess.TimeoutExpired as exc:
            raise GeminiError("Gemini CLI: timeout 180s", original=exc) from exc
        except OSError as exc:
            raise GeminiError(f"Gemini CLI: ошибка запуска: {exc}", original=exc) from exc

        if result.returncode != 0:
            stderr_hint = result.stderr.strip()[:200] if result.stderr else ""
            raise GeminiError(f"Gemini CLI вернул код {result.returncode}: {stderr_hint}")

        text = result.stdout.strip()
        if not text:
            raise GeminiError("Gemini CLI вернул пустой ответ")

        return text

    # ------------------------------------------------------------------
    # OpenRouter fallback
    # ------------------------------------------------------------------

    @retry(
        retry=retry_if_exception_type((requests.RequestException, GeminiError)),
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=2, min=5, max=30),
        before_sleep=before_sleep_log(logger, logging.WARNING),
        reraise=True,
    )
    def _generate_via_openrouter(self, prompt: str, max_tokens: int) -> str:
        """Вызов OpenRouter API."""
        if not self._headers:
            raise GeminiError("OpenRouter API ключ не задан")

        payload = {
            "model": self._model_name,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.3,
        }

        try:
            resp = requests.post(OPENROUTER_URL, headers=self._headers, json=payload, timeout=60)
        except requests.RequestException as exc:
            raise GeminiError(f"Сетевая ошибка OpenRouter: {exc}", original=exc) from exc

        if resp.status_code == 429:
            retry_after = resp.headers.get("Retry-After", "")
            wait_secs = int(retry_after) if retry_after.isdigit() else 30
            logger.warning("OpenRouter 429, ждём %d сек...", wait_secs)
            time.sleep(wait_secs)
            raise GeminiError("Rate limit 429, retry")

        if resp.status_code != 200:
            raise GeminiError(f"OpenRouter HTTP {resp.status_code}: {resp.text[:200]}")

        choices = resp.json().get("choices", [])
        if not choices:
            raise GeminiError("OpenRouter вернул пустой choices")

        text: str = choices[0].get("message", {}).get("content", "").strip()
        if not text:
            raise GeminiError("OpenRouter вернул пустой текст")

        return text

    # ------------------------------------------------------------------
    # Публичный метод
    # ------------------------------------------------------------------

    def generate(self, prompt: str, max_tokens: int = 1024) -> str:
        """
        Генерирует текст. Приоритет: Gemini CLI → OpenRouter.

        Raises:
            GeminiError: если оба источника недоступны.
        """
        if self._use_cli:
            try:
                result = self._generate_via_cli(prompt)
                logger.debug("Gemini CLI: ответ %d символов", len(result))
                return result
            except GeminiError as exc:
                logger.warning("Gemini CLI недоступен (%s), пробуем OpenRouter...", exc)
                if not self._headers:
                    raise GeminiError(f"Gemini CLI недоступен и нет OpenRouter API ключа: {exc}") from exc

        return self._generate_via_openrouter(prompt, max_tokens)
