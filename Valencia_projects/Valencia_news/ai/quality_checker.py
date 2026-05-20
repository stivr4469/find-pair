"""
Проверка качества статей перед публикацией в Telegram.

Запускается после AI-обработки, до отправки в канал.
Отклонённые статьи не публикуются — причина записывается в лог.
"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass

from models import ProcessedArticle

logger = logging.getLogger(__name__)

# Тизерные фразы — статья не даёт смысла, заставляет переходить по ссылке
_TEASER_PATTERNS: list[re.Pattern] = [
    re.compile(p, re.IGNORECASE) for p in [
        r"читайте\s+(далее|подробнее|полностью|больше)",
        r"узнайте\s+(рецепт|больше|подробнее|как)",
        r"переходите\s+по\s+ссылке",
        r"рецепт\s+внутри",
        r"подробности\s+(по\s+ссылке|ниже|далее)",
        r"смотрите\s+(далее|полностью|по\s+ссылке)",
        r"полный\s+рецепт",
        r"полная\s+версия",
    ]
]

# Антитуристические темы — нетематический контент для канала tourism
_TOURISM_REJECT_PATTERNS: list[re.Pattern] = [
    re.compile(p, re.IGNORECASE) for p in [
        r"удалённ\w*\s+работ",
        r"удаленн\w*\s+работ",
        r"цифров\w+\s+кочевни",
        r"лучш\w+\s+(город\w*\s+)?(для\s+)?(удалённ|удаленн|жизни|переезда|эмиграции)",
        r"\bвнж\b",
        r"вид\w*\s+на\s+жительство",
        r"переезд\w*\s+в\s+испани",
        r"\bэмигра\w+\b",
        r"стоимость\s+жизни",
        r"аренд\w+\s+(жиль|кварт|апарт)",
        r"\bстудент\w+\b",
        r"лучш\w+\s+для\s+(работ|бизнес|учёб|учеб)",
        r"работ\w+\s+из\s+испани",
    ]
]

# Туристические ключевые слова — хотя бы одно должно быть в title+summary
_TOURISM_REQUIRED = re.compile(
    r"пляж|отел[ьи]|маршрут|достопримечательност|турист|путешеств|экскурси|"
    r"природ[аыу]|нацпарк|природный парк|замок|крепост|музей|курорт|"
    r"побережь|бухт|водопад|пещер|монастыр|скрытая жемчужина|"
    r"однодневн\w+\s+поездк|поездк\w+\s+(из|в)|вид\w+\s+на\s+море|"
    r"красивейш|живописн|лучш\w+\s+пляж|топ.{0,10}мест|скрытые места",
    re.IGNORECASE
)

# Фразы, указывающие что контент не об Испании
_NON_SPAIN_PATTERNS: list[re.Pattern] = [
    re.compile(p, re.IGNORECASE) for p in [
        r"\bпортугали[яи]\b",
        r"\bитали[яи]\b",
        r"\bфранци[яи]\b",
        r"\bмексик[еи]\b",
        r"\bалгарве\b",
        r"\bлиссабон\b",
        r"\bпорт[оу]\b(?!\s+[вВ]аленс)",  # порт Валенсии — ок, Порту — нет
    ]
]

MIN_SUMMARY_LENGTH = 80
MAX_SUMMARY_LENGTH = 1200


@dataclass
class CheckResult:
    passed: bool
    reason: str = "ok"


def check_article(article: ProcessedArticle, channel: str) -> CheckResult:
    """
    Проверяет статью перед публикацией.

    Args:
        article: Обработанная статья.
        channel: Канал назначения ('news', 'events', 'tourism', 'gastronomy').

    Returns:
        CheckResult(passed=True) если статья прошла проверку.
    """
    summary = (article.summary_ru or "").strip()
    title = (getattr(article, "title_ru", "") or article.title or "").strip()

    # 1. Пустой заголовок
    if not title:
        return CheckResult(False, "empty_title")

    # 2. Пустое резюме
    if not summary:
        return CheckResult(False, "empty_summary")

    # 3. Слишком короткое резюме
    if len(summary) < MIN_SUMMARY_LENGTH:
        return CheckResult(False, f"summary_too_short:{len(summary)}")

    # 4. Слишком длинное резюме (скорее всего AI вставил всю статью)
    if len(summary) > MAX_SUMMARY_LENGTH:
        return CheckResult(False, f"summary_too_long:{len(summary)}")

    # 5. Резюме начинается с пунктуации (обрезанный текст)
    if summary[0] in ".,;:!?—–-":
        return CheckResult(False, f"truncated_start:'{summary[0]}'")

    # 6. Тизерные фразы — статья не самодостаточна
    for pattern in _TEASER_PATTERNS:
        if pattern.search(summary):
            return CheckResult(False, f"teaser:{pattern.pattern}")

    # 7. Для tourism/gastronomy — контент должен быть об Испании
    if channel in ("tourism", "gastronomy"):
        for pattern in _NON_SPAIN_PATTERNS:
            if pattern.search(summary) or pattern.search(title):
                return CheckResult(False, f"non_spain:{pattern.pattern}")

    # 8. Для tourism — не публикуем местные события и спорт (это для канала events)
    if channel == "tourism" and article.category in ("культура", "спорт", "общество", "бизнес", "технологии", "образование"):
        return CheckResult(False, f"wrong_category_for_tourism:{article.category}")

    # 9. Для tourism — отклоняем антитуристические темы (удалёнка, эмиграция, студенты)
    if channel == "tourism":
        text_to_check = f"{title} {summary}"
        for pattern in _TOURISM_REJECT_PATTERNS:
            if pattern.search(text_to_check):
                return CheckResult(False, f"non_tourism_topic:{pattern.pattern[:40]}")

    # 10. Для tourism — требуем хотя бы одно туристическое слово
    if channel == "tourism":
        text_to_check = f"{title} {summary}"
        if not _TOURISM_REQUIRED.search(text_to_check):
            return CheckResult(False, "no_tourism_keywords")

    return CheckResult(True)


def filter_articles(
    articles: list[ProcessedArticle],
    channel: str,
) -> list[ProcessedArticle]:
    """
    Фильтрует список статей, оставляя только прошедшие проверку.
    Логирует отклонённые статьи с причиной.

    Args:
        articles: Список статей после AI-обработки.
        channel: Канал назначения.

    Returns:
        Список статей, прошедших все проверки.
    """
    passed: list[ProcessedArticle] = []
    rejected = 0

    for article in articles:
        result = check_article(article, channel)
        if result.passed:
            passed.append(article)
        else:
            rejected += 1
            title_preview = (getattr(article, "title_ru", "") or article.title or "")[:60]
            logger.warning(
                "[QualityChecker][%s] Отклонено (%s): %r",
                channel,
                result.reason,
                title_preview,
            )

    if rejected:
        logger.info(
            "[QualityChecker][%s] Прошло: %d / %d (отклонено: %d)",
            channel,
            len(passed),
            len(articles),
            rejected,
        )
    else:
        logger.info(
            "[QualityChecker][%s] Все %d статей прошли проверку",
            channel,
            len(passed),
        )

    return passed
