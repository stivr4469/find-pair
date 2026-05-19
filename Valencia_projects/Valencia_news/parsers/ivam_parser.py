"""
Парсер IVAM — Institut Valencià d'Art Modern (ivam.es).

RSS не работает с 2022 года. Используем requests + BeautifulSoup.
Парсит текущие и будущие выставки.
"""

from __future__ import annotations

import logging
import re
from datetime import datetime, timezone
from typing import Optional

import requests
from bs4 import BeautifulSoup

from parsers.base import ParsedArticle

logger = logging.getLogger(__name__)

BASE_URL = "https://ivam.es"
EXPOSICIONES_URL = f"{BASE_URL}/es/exposiciones/"

_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "es-ES,es;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# "29 abr. 2026 – 20 sep. 2026"
_DATE_RE = re.compile(
    r"(\d{1,2})\s+(\w+)\.?\s+(\d{4})\s*[–-]\s*(\d{1,2})\s+(\w+)\.?\s+(\d{4})",
    re.IGNORECASE,
)
_MONTH_MAP = {
    "ene": 1, "feb": 2, "mar": 3, "abr": 4,
    "may": 5, "jun": 6, "jul": 7, "ago": 8,
    "sep": 9, "oct": 10, "nov": 11, "dic": 12,
}


class IvamParser:
    """
    Парсит текущие и будущие выставки IVAM.

    Стратегия:
    1. Загружает страницу выставок через requests
    2. Берёт карточки из секций «actuales» и «futuras»
    3. Пропускает прошедшие выставки (end_date < today)
    """

    def __init__(self) -> None:
        self._session = requests.Session()
        self._session.headers.update(_HEADERS)

    def parse(self, known_urls: Optional[set] = None) -> list[ParsedArticle]:
        known_urls = known_urls or set()

        html = self._fetch(EXPOSICIONES_URL)
        if not html:
            logger.error("IVAM: не удалось загрузить страницу выставок")
            return []

        articles = _parse_html(html, known_urls)
        logger.info("IVAM: %d выставок", len(articles))
        return articles

    def _fetch(self, url: str) -> Optional[str]:
        try:
            resp = self._session.get(url, timeout=20)
            resp.raise_for_status()
            return resp.text
        except Exception as exc:
            logger.error("IVAM: ошибка загрузки %s: %s", url, exc)
            return None


# ---------------------------------------------------------------------------
# Вспомогательные функции
# ---------------------------------------------------------------------------

def _parse_html(html: str, known_urls: set) -> list[ParsedArticle]:
    soup = BeautifulSoup(html, "html.parser")
    now = datetime.now(timezone.utc)
    articles: list[ParsedArticle] = []
    seen_urls: set[str] = set()

    # Находим секцию "pasadas" как границу — берём только до неё
    pasadas_h2 = soup.find("h2", string=re.compile("pasada", re.I))

    # Собираем все карточки до секции "pasadas"
    all_cards = soup.find_all("div", class_=re.compile(r"ivam-post-card"))
    cards_to_process: list = []

    for card in all_cards:
        # Проверяем: карточка находится ДО секции "pasadas"
        if pasadas_h2 and _element_before(card, pasadas_h2):
            cards_to_process.append(card)
        elif not pasadas_h2:
            cards_to_process.append(card)

    for card in cards_to_process:
        try:
            article = _parse_card(card, known_urls, seen_urls, now)
            if article:
                articles.append(article)
        except Exception as exc:
            logger.debug("IVAM: ошибка карточки: %s", exc)

    return articles


def _element_before(element, boundary) -> bool:
    """Проверяет, что element встречается в HTML раньше boundary."""
    # boundary.find_all_previous() содержит все элементы ДО boundary
    return element in set(boundary.find_all_previous())


def _parse_card(
    card,
    known_urls: set,
    seen_urls: set,
    now: datetime,
) -> Optional[ParsedArticle]:
    # Пропускаем маленькие вспомогательные карточки (нет заголовка)
    title_el = card.find("h4", class_=re.compile(r"ivam-post-card__title"))
    if not title_el:
        return None

    title = title_el.get_text(strip=True)
    if not title:
        return None

    # URL
    link_el = card.find("a", href=re.compile(r"/exposicion"))
    if not link_el:
        return None
    url = link_el["href"]
    if not url.startswith("http"):
        url = BASE_URL + url

    if url in seen_urls or url in known_urls:
        return None

    # Изображение
    img = card.find("img", class_=re.compile(r"ivam-post-card__img"))
    image_url: Optional[str] = None
    if img and img.get("src"):
        image_url = img["src"]
        if not image_url.startswith("http"):
            image_url = BASE_URL + image_url

    # Дата
    date_el = card.find("p", class_="date")
    date_text = date_el.get_text(strip=True) if date_el else ""
    start_dt, end_dt = _parse_date_range(date_text)

    # Пропускаем если нет дат (неопределённость) или уже завершилась
    if end_dt is None:
        return None
    if end_dt < now:
        return None

    # Категория / место
    categories = card.find("div", class_="categories")
    venue = ""
    if categories:
        spans = [s.get_text(strip=True) for s in categories.find_all("span")]
        # Второй span обычно — название зала
        venue = spans[1] if len(spans) > 1 else ""

    # Различаем: выставка уже идёт vs ещё не открылась
    is_running = start_dt is not None and start_dt < now

    # Формируем текст для AI
    parts = [title]
    if is_running:
        # Выставка уже открылась — AI не должен писать "открывается"
        end_str = end_dt.strftime("%d.%m.%Y")
        parts.append(f"Сейчас идёт. Продолжается до {end_str}.")
    elif date_text:
        parts.append(f"Fechas: {date_text}.")
    if venue:
        parts.append(f"Lugar: {venue}.")
    parts.append("IVAM — Institut Valencià d'Art Modern, Valencia.")

    # Для текущих выставок published_at = now, чтобы пройти фильтры агрегатора
    effective_published_at = now if is_running else (start_dt or now)

    seen_urls.add(url)
    return ParsedArticle(
        url=url,
        title=title,
        text=" | ".join(parts),
        image_url=image_url,
        published_at=effective_published_at,
        source_name="IVAM",
        source_url=BASE_URL,
        region="valencia",
    )


def _parse_date_range(
    text: str,
) -> tuple[Optional[datetime], Optional[datetime]]:
    """Парсит 'DD mes. YYYY – DD mes. YYYY' → (start_dt, end_dt) UTC."""
    m = _DATE_RE.search(text)
    if not m:
        return None, None
    try:
        d1, mo1_str, y1, d2, mo2_str, y2 = m.groups()
        mo1 = _MONTH_MAP.get(mo1_str[:3].lower())
        mo2 = _MONTH_MAP.get(mo2_str[:3].lower())
        if not mo1 or not mo2:
            return None, None
        start_dt = datetime(int(y1), mo1, int(d1), 10, 0, tzinfo=timezone.utc)
        end_dt = datetime(int(y2), mo2, int(d2), 22, 0, tzinfo=timezone.utc)
        return start_dt, end_dt
    except Exception:
        return None, None
