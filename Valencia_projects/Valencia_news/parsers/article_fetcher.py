"""
ArticleFetcher: загружает полный текст статьи и URL изображения по ссылке.

Стратегии (в порядке приоритета):
  1. newspaper3k — быстро и надёжно для большинства новостных сайтов.
  2. BeautifulSoup + requests — fallback при сбое newspaper3k.
  3. Playwright (sync) — тяжёлый fallback для JS-рендеримых страниц.

Tenacity обеспечивает retry с экспоненциальным ожиданием (до 3 попыток).
"""

import logging
from typing import Final

import requests
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential

from .html_parser import extract_image, extract_text_blocks

logger = logging.getLogger(__name__)

# Таймауты
_REQUESTS_TIMEOUT: Final[int] = 30   # секунд для requests
_PLAYWRIGHT_TIMEOUT: Final[int] = 60  # секунд для playwright (в мс внутри вызова)

_USER_AGENT: Final[str] = (
    "Mozilla/5.0 (compatible; ValenciaNewsBot/1.0; +https://valencianews.app)"
)

import threading as _threading

_thread_local = _threading.local()


def _get_session() -> requests.Session:
    """Возвращает thread-local Session, создаёт при первом обращении из потока."""
    if not hasattr(_thread_local, "session"):
        s = requests.Session()
        s.headers.update({"User-Agent": _USER_AGENT})
        _thread_local.session = s
    return _thread_local.session


class ArticleFetcher:
    """
    Загружает полный текст статьи по URL.

    Использует три стратегии в порядке убывания предпочтения.
    Никогда не падает с исключением: возвращает ('', None) при полном сбое.
    """

    def fetch_article(self, url: str) -> tuple[str, str | None]:
        """
        Получить (full_text, image_url) для статьи по URL.

        Args:
            url: адрес страницы статьи.

        Returns:
            Кортеж (текст статьи, URL изображения или None).
        """
        url = url.strip()
        if not url:
            return ("", None)

        # Стратегия 1: newspaper3k
        text, image = self._fetch_with_newspaper(url)
        if text:
            logger.debug("newspaper3k успешно обработал: %s", url)
            return (text, image)

        # Стратегия 2: BeautifulSoup
        text, image = self._fetch_with_bs4(url)
        if text:
            logger.debug("BeautifulSoup успешно обработал: %s", url)
            return (text, image)

        # Стратегия 3: Playwright (только если обе выше провалились)
        text, image = self._fetch_with_playwright(url)
        if text:
            logger.debug("Playwright успешно обработал: %s", url)
            return (text, image)

        logger.warning("Все стратегии не смогли извлечь текст: %s", url)
        return ("", None)

    # ------------------------------------------------------------------
    # Стратегия 1: newspaper3k
    # ------------------------------------------------------------------

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(min=1, max=10),
        reraise=False,
    )
    def _fetch_with_newspaper(self, url: str) -> tuple[str, str | None]:
        """Использует newspaper3k для извлечения текста и изображения."""
        try:
            from newspaper import Article  # type: ignore[import-untyped]

            article = Article(url, language="es", fetch_images=True)
            article.download()
            article.parse()

            text: str = (article.text or "").strip()
            image: str | None = article.top_image or None

            if not text:
                return ("", None)

            return (text, image)

        except Exception as exc:
            logger.debug("newspaper3k ошибка для %s: %s", url, exc)
            return ("", None)

    # ------------------------------------------------------------------
    # Стратегия 2: BeautifulSoup + requests
    # ------------------------------------------------------------------

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(min=1, max=10),
        reraise=False,
    )
    def _fetch_with_bs4(self, url: str) -> tuple[str, str | None]:
        """Использует requests + BeautifulSoup для извлечения текста."""
        try:
            response = _get_session().get(url, timeout=_REQUESTS_TIMEOUT, allow_redirects=True)
            response.raise_for_status()

            # Определяем кодировку
            content_type = response.headers.get("content-type", "")
            if "charset=" in content_type:
                encoding = content_type.split("charset=")[-1].split(";")[0].strip()
            else:
                encoding = response.apparent_encoding or "utf-8"

            html = response.content.decode(encoding, errors="replace")
            soup = BeautifulSoup(html, "lxml")

            text = extract_text_blocks(soup)
            image = extract_image(soup, url)

            if not text:
                return ("", None)

            return (text, image)

        except requests.RequestException as exc:
            logger.debug("requests ошибка для %s: %s", url, exc)
            return ("", None)
        except Exception as exc:
            logger.debug("BeautifulSoup ошибка для %s: %s", url, exc)
            return ("", None)

    # ------------------------------------------------------------------
    # Стратегия 3: Playwright (тяжёлый fallback)
    # ------------------------------------------------------------------

    def _fetch_with_playwright(self, url: str) -> tuple[str, str | None]:
        """
        Использует sync Playwright для рендеринга JS-страниц.
        Запускается только если обе лёгкие стратегии не дали результата.
        """
        try:
            from playwright.sync_api import sync_playwright  # type: ignore[import-untyped]

            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                context = browser.new_context(
                    user_agent=_USER_AGENT,
                    java_script_enabled=True,
                )
                page = context.new_page()

                # Блокируем медиа-ресурсы для ускорения
                page.route(
                    "**/*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,mp4,mp3}",
                    lambda route: route.abort(),
                )

                page.goto(url, timeout=_PLAYWRIGHT_TIMEOUT * 1000, wait_until="domcontentloaded")

                # Ждём появления контентного блока
                try:
                    page.wait_for_selector("article, main, .article-body", timeout=10_000)
                except Exception:
                    pass  # Продолжаем даже если не нашли селектор

                html = page.content()
                context.close()
                browser.close()

            soup = BeautifulSoup(html, "lxml")
            text = extract_text_blocks(soup)
            image = extract_image(soup, url)

            return (text or "", image)

        except ImportError:
            logger.debug("playwright не установлен, стратегия 3 недоступна.")
            return ("", None)
        except Exception as exc:
            logger.debug("Playwright ошибка для %s: %s", url, exc)
            return ("", None)
