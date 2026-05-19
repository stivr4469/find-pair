"""
Парсер Museo de Bellas Artes de Valencia (museobellasartesvalencia.gva.es).

Сайт на Liferay CMS, RSS отсутствует.
Парсит текущие выставки через requests + BeautifulSoup.
"""

from __future__ import annotations

import logging
import re
import time
from datetime import datetime, timezone
from typing import Optional
from urllib.parse import urlsplit, urlunsplit

import requests
from bs4 import BeautifulSoup

from parsers.base import ParsedArticle

logger = logging.getLogger(__name__)

BASE_URL = "https://museobellasartesvalencia.gva.es"
EXPOSICIONES_URL = f"{BASE_URL}/es/exposiciones"

_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "es-ES,es;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# Формат даты "10.03.2026"
_DATE_PATTERN = re.compile(
    r"Del\s+(\d{2})\.(\d{2})\.(\d{4})\s+al\s+(\d{2})\.(\d{2})\.(\d{4})",
    re.IGNORECASE,
)
_BG_IMAGE_RE = re.compile(r"url\(([^)]+)\)")


class MuseoBellasArtesParser:
    """
    Парсит текущие выставки Museo de Bellas Artes de Valencia.

    Стратегия:
    1. Загружает страницу выставок через requests
    2. Парсит карточки из портлета «Exposiciones actuales»
    3. Для каждой выставки загружает детальную страницу с описанием
    4. Пропускает прошедшие выставки (end_date < today)
    """

    def __init__(self) -> None:
        self._session = requests.Session()
        self._session.headers.update(_HEADERS)

    def parse(self, known_urls: Optional[set] = None) -> list[ParsedArticle]:
        known_urls = known_urls or set()

        html = self._fetch(EXPOSICIONES_URL)
        if not html:
            logger.error("MuseoBellasArtes: не удалось загрузить страницу выставок")
            return []

        articles = _parse_listings(html, known_urls, self._session)
        logger.info("MuseoBellasArtes: %d выставок", len(articles))
        return articles

    def _fetch(self, url: str) -> Optional[str]:
        try:
            resp = self._session.get(url, timeout=20)
            resp.raise_for_status()
            return resp.text
        except Exception as exc:
            logger.error("MuseoBellasArtes: ошибка загрузки %s: %s", url, exc)
            return None


# ---------------------------------------------------------------------------
# Вспомогательные функции
# ---------------------------------------------------------------------------

def _parse_listings(
    html: str,
    known_urls: set,
    session: requests.Session,
) -> list[ParsedArticle]:
    soup = BeautifulSoup(html, "html.parser")
    now = datetime.now(timezone.utc)
    articles: list[ParsedArticle] = []
    seen_urls: set[str] = set()

    # Ищем все портлеты и берём карточки из "actuales" и "pasadas"
    # (фильтрацию по дате делаем сами)
    portlets = soup.find_all("div", class_=re.compile(r"portlet-boundary"))
    for portlet in portlets:
        h2 = portlet.find("h2", class_="portlet-title-text")
        if not h2:
            continue
        section = h2.get_text(strip=True).lower()
        if "exposicion" not in section:
            continue

        cards = portlet.find_all(
            "div",
            class_=lambda c: c and "asset-item" in c and "asset-abstract" in c,
        )
        for card in cards:
            try:
                article = _parse_card(card, known_urls, seen_urls, now, session)
                if article:
                    articles.append(article)
            except Exception as exc:
                logger.debug("MuseoBellasArtes: ошибка карточки: %s", exc)

    return articles


def _parse_card(
    card,
    known_urls: set,
    seen_urls: set,
    now: datetime,
    session: requests.Session,
) -> Optional[ParsedArticle]:
    # Заголовок и URL
    title_div = card.find("div", class_="asset-title")
    if not title_div:
        return None
    link_el = title_div.find("a", href=True)
    if not link_el:
        return None

    title = link_el.get_text(strip=True)
    if not title:
        return None

    # Чистый URL (без Liferay redirect-параметров)
    raw_url = link_el["href"]
    url = _clean_liferay_url(raw_url)
    if not url:
        return None

    if url in seen_urls or url in known_urls:
        return None

    # Диапазон дат
    summary_div = card.find("div", class_="asset-summary")
    date_text = summary_div.get_text(strip=True) if summary_div else ""
    start_dt, end_dt = _parse_date_range(date_text)

    # Пропускаем если дата не распарсилась (нестандартный формат = старая выставка)
    if end_dt is None:
        return None

    # Пропускаем прошедшие выставки
    if end_dt < now:
        return None

    # Изображение из background-image
    thumb_div = card.find("div", class_="thumbmas")
    image_url: Optional[str] = None
    if thumb_div:
        style = thumb_div.get("style", "")
        m = _BG_IMAGE_RE.search(style)
        if m:
            image_url = m.group(1).strip("'\"")

    # Описание — загружаем детальную страницу
    description = _fetch_description(title, url, session)
    time.sleep(0.5)

    # Различаем: выставка уже идёт vs ещё не открылась
    is_running = start_dt is not None and start_dt < now

    # Формируем текст для AI
    parts = [title]
    if description:
        parts.append(description)
    if is_running:
        # Выставка уже открылась — AI не должен писать "открывается"
        end_str = end_dt.strftime("%d.%m.%Y")
        parts.append(f"Сейчас идёт. Продолжается до {end_str}.")
    elif date_text:
        parts.append(f"Exposición: {date_text}.")
    parts.append("Museo de Bellas Artes de Valencia (San Pío V). Entrada gratuita.")

    # Для текущих выставок published_at = now, чтобы пройти фильтры агрегатора
    effective_published_at = now if is_running else (start_dt or now)

    seen_urls.add(url)
    return ParsedArticle(
        url=url,
        title=title,
        text=" | ".join(parts),
        image_url=image_url,
        published_at=effective_published_at,
        source_name="Museo Bellas Artes Valencia",
        source_url=BASE_URL,
        region="valencia",
    )


def _clean_liferay_url(raw_url: str) -> str:
    """Убирает query-параметры Liferay, оставляя только путь."""
    parts = urlsplit(raw_url)
    clean = urlunsplit((parts.scheme, parts.netloc, parts.path, "", ""))
    return clean


def _parse_date_range(
    text: str,
) -> tuple[Optional[datetime], Optional[datetime]]:
    """Парсит 'Del DD.MM.YYYY al DD.MM.YYYY' → (start_dt, end_dt) UTC."""
    m = _DATE_PATTERN.search(text)
    if not m:
        return None, None
    try:
        d1, mo1, y1, d2, mo2, y2 = (int(g) for g in m.groups())
        start_dt = datetime(y1, mo1, d1, 10, 0, tzinfo=timezone.utc)
        end_dt = datetime(y2, mo2, d2, 22, 0, tzinfo=timezone.utc)
        return start_dt, end_dt
    except Exception:
        return None, None


def _fetch_description(title: str, url: str, session: requests.Session) -> str:
    """Загружает детальную страницу выставки и возвращает первый абзац описания."""
    try:
        resp = session.get(url, timeout=20)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        for p in soup.find_all("p"):
            text = p.get_text(strip=True)
            # Убираем артефакт: Liferay склеивает заголовок с текстом без пробела
            if text.startswith(title):
                text = text[len(title):].lstrip()
            # Берём первый содержательный абзац (>80 символов, не служебный)
            if len(text) > 80 and not _is_boilerplate(text):
                return text[:400]
    except Exception as exc:
        logger.debug("MuseoBellasArtes: не удалось загрузить описание %s: %s", url, exc)
    return ""


def _is_boilerplate(text: str) -> bool:
    """Возвращает True для служебных строк (copyright, cookie и т.п.)."""
    keywords = ("cookie", "©", "generalitat", "esta página web", "conselleria")
    lower = text.lower()
    return any(kw in lower for kw in keywords)
