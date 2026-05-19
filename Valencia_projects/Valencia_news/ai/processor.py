"""
Основной пайплайн AI-обработки статей через Gemini.

Один вызов API на статью выполняет три задачи одновременно:
  1. Резюме на русском языке (2-3 предложения)
  2. Оценка важности (0.0–1.0)
  3. Определение категории
"""

from __future__ import annotations

import json
import logging
import re
from datetime import datetime, timezone
from typing import Any

from ai.gemini_client import GeminiClient, GeminiError
from ai.social_filter import check_summary
from models import ParsedArticle, ProcessedArticle

logger = logging.getLogger(__name__)

# Допустимые категории — строго фиксированный список
VALID_CATEGORIES: frozenset[str] = frozenset(
    [
        "политика",
        "экономика",
        "общество",
        "происшествия",
        "спорт",
        "культура",
        "технологии",
        "погода",
        "другое",
    ]
)

# Паттерн для извлечения даты закрытия из текста текущих выставок
_RUNNING_END_DATE_RE = re.compile(r"Продолжается до (\d{2}\.\d{2}\.\d{4})")

# Персона по умолчанию — используется если persona_prompt не передан
_DEFAULT_PERSONA = """\
Ты — главный редактор Telegram-канала для русскоязычных жителей Валенсии и Испании.
Твоя аудитория: русскоязычные эмигранты, живущие в Валенсии и регионе CV (Comunitat Valenciana).
Они хотят знать: что происходит в их городе, что можно посетить, на что записаться, что изменилось.\
"""

# Шаблон промпта — вынесен в константу для удобства тестирования
_PROMPT_TEMPLATE = """\
{persona}

Сегодня: {today}
{event_date_line}
СТАТЬЯ:
Заголовок: {title}
Источник: {source} (регион: {region})
Текст: {content}

---

ТВОЯ ЗАДАЧА — обработать статью и вернуть ТОЛЬКО валидный JSON. Никакого markdown, никаких пояснений.

=== 1. title_ru ===
Переведи заголовок на русский. Точно, коротко, сохраняй смысл.

=== 2. summary_ru ===
Напиши как журналист для своих читателей — живых людей, которые живут в Валенсии.
Спроси себя: "Это полезно знать моему читателю? Он может что-то сделать с этой информацией?"

Стиль: не переводчик и не пресс-релиз. Живой, конкретный, как сообщение от знакомого в чате.
Начинай сразу с факта: «Валенсия запускает...», «С июня можно...», «Городской совет решил...»
НЕЛЬЗЯ начинать с: «В статье», «Материал посвящён», «Рассматривается», «Речь идёт», «Обзор».

Длина зависит от типа материала:
• Обычная новость (что случилось): 2-3 предложения, 150-250 символов.
• Городская программа / запись / субсидия (что можно сделать жителю): 3-5 предложений,
  до 400 символов. Обязательно: кто может участвовать, как записаться, даты, стоимость.
• Мероприятие / выставка / концерт / фестиваль: 3-5 предложений, до 450 символов.
  Обязательно: дата, время, адрес, цена, что особенного.
• Туристическое место / маршрут / идея на выходные: 5-7 предложений, до 600 символов.
  Обязательно: что за место, чем примечательно, расстояние от Валенсии, часы и цены если есть.

=== 3. importance ===
Думай как редактор: насколько эта новость нужна моему читателю прямо сейчас?

ВЫСОКАЯ (0.7–1.0):
- Серьёзные происшествия, стихийные бедствия, политика, экономика — когда это касается жизни людей
- Городские программы мэрии с открытой записью: летние лагеря, курсы, молодёжные программы,
  спортивные секции, субсидии — то, на что можно записаться и это изменит жизнь читателя
- Важные городские изменения: новые маршруты транспорта, закрытие/открытие объектов

СРЕДНЯЯ (0.4–0.6):
- Культурные события, выставки, концерты, фестивали с конкретными датами в будущем
- Местные новости общества, технологий, интересные истории из жизни города
- Туристические материалы про место рядом с Валенсией

НИЗКАЯ (0.1–0.3):
- Спорт (если не чрезвычайно важный матч), погода, лёгкие развлечения
- Общенациональные новости без связи с CV (даже если источник валенсийский)

НОЛЬ (0.0) — только в двух случаях:
1. Событие/мероприятие/концерт УЖЕ ПРОШЛО (дата проведения раньше {today}).
   ВНИМАНИЕ: дата регистрации или анонса в прошлом — это НЕ повод ставить 0.
   Программа на июнь-август актуальна даже если анонс был в мае.
2. Статья полностью не о Валенсии/CV — про Мадрид, Барселону, другие страны, Трампа и т.п.
   (попала в валенсийский источник случайно).

Месяцы для проверки дат: enero=янв, febrero=фев, marzo=мар, abril=апр, mayo=май, junio=июн,
julio=июл, agosto=авг, septiembre=сен, octubre=окт, noviembre=ноя, diciembre=дек.

=== 4. category ===
Одна из: политика, экономика, общество, происшествия, спорт, культура, технологии, погода, другое.

=== 5. location ===
Конкретное место из текста — для кнопки «показать на карте».
Формат: "Название, Город" или "Улица Номер, Город".
Для туристических материалов: название объекта (монастырь, замок, пляж) даже без адреса.
Если место не упоминается или новость не локальная — верни "".

=== 6. teaser_ru ===
Одно предложение для Telegram-анонса, максимум 120 символов.
Начни с главного факта: «Валенсия...», «С июня...», «Городской совет...»
Читатель должен захотеть перейти на сайт. Без вводных слов, без воды.

ОТВЕТ — строго JSON:
{{"title_ru": "...", "teaser_ru": "...", "summary_ru": "...", "importance": 0.0, "category": "...", "location": "..."}}
"""


class ArticleProcessor:
    """
    Обрабатывает статьи через Gemini: перевод, важность, категория.

    Принцип: один вызов API = одна статья = три задачи одновременно.
    Это минимизирует расход API-квоты и ускоряет обработку.
    """

    def __init__(self, client: GeminiClient) -> None:
        self._client = client

    def process_article(
        self,
        article: ParsedArticle,
        persona_prompt: str | None = None,
    ) -> ProcessedArticle:
        """
        Запускает полный цикл AI-обработки статьи.

        Args:
            article: Статья от парсера.
            persona_prompt: Текст роли редактора. Если None — используется _DEFAULT_PERSONA.

        Returns:
            ProcessedArticle с заполненными summary_ru, importance_score, category.
            При ошибке API — возвращает статью с дефолтными значениями, не бросает.
        """
        prompt = self._build_prompt(article, persona_prompt=persona_prompt)

        try:
            raw_response = self._client.generate(prompt, max_tokens=1024)
            parsed = self._parse_response(raw_response)
        except GeminiError as exc:
            logger.warning(
                "Ошибка Gemini для статьи '%s': %s. Используем дефолтные значения.",
                article.title[:60],
                exc,
            )
            parsed = {}
        except Exception as exc:
            logger.error(
                "Неожиданная ошибка при обработке статьи '%s': %s",
                article.title[:60],
                exc,
            )
            parsed = {}

        return self._build_processed_article(article, parsed)

    def _build_prompt(
        self,
        article: ParsedArticle,
        persona_prompt: str | None = None,
    ) -> str:
        """
        Формирует промпт для одновременного выполнения трёх задач.

        Текст статьи обрезается до 3000 символов — достаточно для качественного резюме,
        не перегружает контекстное окно модели.
        """
        content_truncated = (article.content or article.title)[:3000]
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        persona = (persona_prompt or _DEFAULT_PERSONA).strip()

        # Вычисляем строку с датой для AI.
        # Для текущих выставок ("Сейчас идёт") published_at = today (техническое значение) —
        # используем дату окончания из текста, чтобы не запутать AI.
        event_date_line = ""
        content_text = article.content or article.title
        _running_match = _RUNNING_END_DATE_RE.search(content_text) if "Сейчас идёт" in content_text else None
        if _running_match:
            event_date_line = (
                f"Выставка работает до: {_running_match.group(1)}\n"
                "Выставка уже открылась. Единственная релевантная дата — дата закрытия выше.\n"
            )
        elif article.published_at:
            _DAYS_RU = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
            weekday_ru = _DAYS_RU[article.published_at.weekday()]
            event_date_line = (
                f"Дата события: {article.published_at.strftime('%Y-%m-%d')} ({weekday_ru})\n"
                "ВАЖНО: используй только эту дату и день недели — не изобретай свои.\n"
            )

        return _PROMPT_TEMPLATE.format(
            persona=persona,
            today=today,
            event_date_line=event_date_line,
            title=article.title,
            source=article.source_name,
            region=article.region,
            content=content_truncated,
        )

    def _parse_response(self, response: str) -> dict[str, Any]:
        """
        Парсит JSON из ответа Gemini.

        Gemini иногда оборачивает JSON в ```json ... ```, поэтому чистим перед парсингом.
        При невалидном JSON — возвращает пустой dict, вызывающий код использует дефолты.
        """
        # Убираем markdown-обёртки типа ```json ... ``` или ``` ... ```
        cleaned = re.sub(r"```(?:json)?\s*", "", response).strip().rstrip("`").strip()

        # Извлекаем первый JSON-объект из текста (на случай лишних символов)
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if not match:
            logger.warning("Не найден JSON в ответе Gemini: %r", response[:200])
            return {}

        try:
            data: dict[str, Any] = json.loads(match.group())
        except json.JSONDecodeError as exc:
            logger.warning("Ошибка декодирования JSON от Gemini: %s | Ответ: %r", exc, response[:200])
            return {}

        return data

    def _build_processed_article(
        self,
        article: ParsedArticle,
        ai_data: dict[str, Any],
    ) -> ProcessedArticle:
        # Перевод заголовка
        title_ru: str = str(ai_data.get("title_ru", "")).strip()
        if not title_ru:
            title_ru = article.title

        # Резюме для сайта
        summary_ru: str = str(ai_data.get("summary_ru", "")).strip()
        is_clean, reason = check_summary(summary_ru)
        if not is_clean:
            logger.warning("Резюме отклонено SocialFilter (%s): %r", reason, summary_ru[:80])
            summary_ru = ""
        _fallback_summary = not summary_ru
        if not summary_ru:
            summary_ru = f"{title_ru}. Подробнее по ссылке."

        # Тизер для Telegram (1 предложение)
        teaser_ru: str = str(ai_data.get("teaser_ru", "")).strip()
        if not teaser_ru and summary_ru:
            first_dot = summary_ru.find(".")
            teaser_ru = summary_ru[:first_dot + 1] if first_dot != -1 else summary_ru[:120]
        teaser_ru = teaser_ru[:200]

        # Важность
        try:
            importance = float(ai_data.get("importance", 0.3))
            importance = max(0.0, min(1.0, importance))
        except (TypeError, ValueError):
            importance = 0.3
        if _fallback_summary:
            importance = 0.0

        # Категория
        raw_category = str(ai_data.get("category", "другое")).strip().lower()
        category = raw_category if raw_category in VALID_CATEGORIES else "другое"

        # Место
        location: str = str(ai_data.get("location", "")).strip()

        return ProcessedArticle(
            url=article.url,
            title=article.title,
            source_name=article.source_name,
            region=article.region,
            published_at=article.published_at,
            content=article.content,
            image_url=article.image_url,
            language=article.language,
            title_ru=title_ru,
            teaser_ru=teaser_ru,
            summary_ru=summary_ru,
            importance_score=importance,
            category=category,
            location=location,
        )
