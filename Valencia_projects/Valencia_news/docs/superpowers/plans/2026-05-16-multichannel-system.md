# Мультиканальная Telegram-сеть — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить один канал новостей в сеть из 4 каналов (новости, афиша, туризм, гастрономия), каждый со своей AI-персоной, источниками и расписанием — без переписывания существующего кода.

**Architecture:** Добавляем поле `channel` в БД (`articles`, `sources`), параметризуем `NewsAggregator(channel=...)`, создаём `ChannelOrchestrator` как тонкую обёртку над 4 экземплярами агрегатора. Статический контент для туризма и гастрономии — JSON-базы в `data/`, поступающие в тот же AI-пайплайн как обычные `ParsedArticle`.

**Tech Stack:** Python 3.12, SQLAlchemy 2.0, feedparser, python-telegram-bot, OpenRouter API (gemini-2.5-flash), schedule library

**Out of scope:** @ValenciaGuideBot — отдельный план (Phase 2).

---

## Карта файлов

| Действие | Файл | Ответственность |
|----------|------|-----------------|
| Изменить | `storage/models.py` | добавить `channel` в `Article` и `Source` |
| Создать | `storage/migration.py` | ALTER TABLE для существующей БД |
| Изменить | `storage/repository.py` | фильтрация по `channel` в двух методах |
| Изменить | `sources/registry.py` | поле `channel` в SourceDict, новые источники |
| Создать | `ai/personas/news.txt` | промпт-персона Алексея |
| Создать | `ai/personas/events.txt` | промпт-персона Кати |
| Создать | `ai/personas/tourism.txt` | промпт-персона Сергея |
| Создать | `ai/personas/gastronomy.txt` | промпт-персона Наташи |
| Изменить | `ai/processor.py` | принимать `persona_prompt` в `__init__` |
| Создать | `data/places_spain.json` | база достопримечательностей |
| Создать | `data/restaurants_valencia.json` | база ресторанов |
| Создать | `data/dishes_spain.json` | база блюд |
| Создать | `sources/static_content.py` | читать JSON → `ParsedArticle` |
| Создать | `orchestrator/__init__.py` | пустой |
| Создать | `orchestrator/channel_config.py` | `ChannelConfig` dataclass |
| Изменить | `config.py` | 4 channel_id из `.env` |
| Изменить | `main.py` | `NewsAggregator(channel=...)`, `_processed_to_storage_article` |
| Создать | `orchestrator/channel_orchestrator.py` | 4 агрегатора |
| Изменить | `infra/scheduler.py` | 4-канальное расписание |
| Изменить | `.env.example` | новые переменные |

---

## Task 1: Добавить `channel` в SQLAlchemy-модели

**Files:**
- Modify: `storage/models.py`
- Create: `storage/migration.py`
- Test: `tests/test_channel_column.py`

- [ ] **Шаг 1: Написать падающий тест**

```python
# tests/test_channel_column.py
from storage.models import Article, Source

def test_article_has_channel_field():
    a = Article(url="http://test.com", title="Test", channel="tourism")
    assert a.channel == "tourism"

def test_source_has_channel_field():
    s = Source(name="Test Source", feed_url="http://test.com/rss", region="spain", channel="tourism")
    assert s.channel == "tourism"

def test_article_default_channel_is_news():
    a = Article(url="http://test2.com", title="Test2")
    assert a.channel == "news"
```

- [ ] **Шаг 2: Запустить — должен упасть**

```bash
cd /home/zastone/study/Valencia_projects/Valencia_news
python -m pytest tests/test_channel_column.py -v
```

Ожидаем: `AttributeError: channel`

- [ ] **Шаг 3: Добавить `channel` в `Article` и `Source`**

В `storage/models.py` после строки `image_url: Mapped[Optional[str]] = ...` в классе `Article` добавить:

```python
    # Канал публикации: "news" | "events" | "tourism" | "gastronomy"
    channel: Mapped[str] = mapped_column(
        String(32), nullable=False, default="news", server_default="news", index=True
    )
```

В классе `Source` после строки `fail_count: Mapped[int] = ...` добавить:

```python
    # Канал которому принадлежит источник: "news" | "events" | "tourism" | "gastronomy"
    channel: Mapped[str] = mapped_column(
        String(32), nullable=False, default="news", server_default="news"
    )
```

- [ ] **Шаг 4: Создать скрипт миграции**

```python
# storage/migration.py
"""Миграция: добавляет колонку channel в существующую БД."""
from __future__ import annotations
import logging
from sqlalchemy import text
from storage.database import engine

logger = logging.getLogger(__name__)


def run_migrations() -> None:
    """Добавляет channel в articles и sources, если колонок нет."""
    with engine.connect() as conn:
        for table, col in [("articles", "channel"), ("sources", "channel")]:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} TEXT DEFAULT 'news'"))
                logger.info("Добавлена колонка %s.%s", table, col)
            except Exception:
                logger.debug("Колонка %s.%s уже существует", table, col)
        conn.commit()
    logger.info("Миграция завершена.")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_migrations()
```

- [ ] **Шаг 5: Запустить тесты — должны пройти**

```bash
python -m pytest tests/test_channel_column.py -v
```

Ожидаем: 3 PASSED

- [ ] **Шаг 6: Запустить миграцию на существующей БД**

```bash
python -m storage.migration
```

Ожидаем: `Добавлена колонка articles.channel` / `Добавлена колонка sources.channel`

- [ ] **Шаг 7: Коммит**

```bash
git add storage/models.py storage/migration.py tests/test_channel_column.py
git commit -m "feat: добавить поле channel в модели Article и Source"
```

---

## Task 2: Обновить репозиторий — фильтрация по channel

**Files:**
- Modify: `storage/repository.py`
- Test: `tests/test_repository_channel.py`

- [ ] **Шаг 1: Написать падающий тест**

```python
# tests/test_repository_channel.py
import pytest
from datetime import datetime, timezone
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from storage.models import Base, Article, Source
from storage.repository import ArticleRepository, SourceRepository


@pytest.fixture
def session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    with Session(engine) as s:
        yield s


def test_get_recent_urls_filters_by_channel(session):
    now = datetime.now(timezone.utc)
    session.add(Article(url="http://a.com", title="A", channel="news", fetched_at=now))
    session.add(Article(url="http://b.com", title="B", channel="tourism", fetched_at=now))
    session.commit()

    repo = ArticleRepository(session)
    news_urls = repo.get_recent_urls(hours=24, channel="news")
    tourism_urls = repo.get_recent_urls(hours=24, channel="tourism")

    assert "http://a.com" in news_urls
    assert "http://b.com" not in news_urls
    assert "http://b.com" in tourism_urls


def test_get_all_active_filters_by_channel(session):
    session.add(Source(name="News Src", feed_url="http://n.com/rss", region="spain", channel="news"))
    session.add(Source(name="Tour Src", feed_url="http://t.com/rss", region="spain", channel="tourism"))
    session.commit()

    repo = SourceRepository(session)
    news = repo.get_all_active(channel="news")
    tourism = repo.get_all_active(channel="tourism")

    assert len(news) == 1 and news[0].name == "News Src"
    assert len(tourism) == 1 and tourism[0].name == "Tour Src"
```

- [ ] **Шаг 2: Запустить — должен упасть**

```bash
python -m pytest tests/test_repository_channel.py -v
```

Ожидаем: `TypeError: get_recent_urls() got unexpected keyword argument 'channel'`

- [ ] **Шаг 3: Обновить `get_recent_urls` в `ArticleRepository`**

Найти метод `get_recent_urls` в `storage/repository.py` и заменить:

```python
    def get_recent_urls(self, hours: int = 24, channel: str | None = None) -> set[str]:
        """Возвращает URL статей за последние N часов, опционально фильтруя по каналу."""
        since = datetime.now(timezone.utc) - timedelta(hours=hours)
        stmt = select(Article.url).where(Article.fetched_at >= since)
        if channel is not None:
            stmt = stmt.where(Article.channel == channel)
        rows = self._session.scalars(stmt).all()
        return set(rows)
```

- [ ] **Шаг 4: Обновить `get_all_active` в `SourceRepository`**

Найти метод `get_all_active` и заменить:

```python
    def get_all_active(self, channel: str | None = None) -> list[Source]:
        """Возвращает активные источники, опционально фильтруя по каналу."""
        stmt = select(Source).where(Source.is_active.is_(True))
        if channel is not None:
            stmt = stmt.where(Source.channel == channel)
        return list(self._session.scalars(stmt.order_by(Source.name)).all())
```

- [ ] **Шаг 5: Обновить `seed_sources` — сохранять `channel`**

В методе `seed_sources` найти место где создаётся `Source(...)` и добавить `channel`:

```python
            new_source = Source(
                name=data["name"],
                feed_url=feed_url,
                site_url=data.get("site_url", ""),
                region=data.get("region", "spain"),
                channel=data.get("channel", "news"),
            )
```

- [ ] **Шаг 6: Запустить тесты**

```bash
python -m pytest tests/test_repository_channel.py -v
```

Ожидаем: 2 PASSED

- [ ] **Шаг 7: Коммит**

```bash
git add storage/repository.py tests/test_repository_channel.py
git commit -m "feat: фильтрация источников и статей по каналу в репозитории"
```

---

## Task 3: Обновить реестр источников — добавить `channel`

**Files:**
- Modify: `sources/registry.py`

- [ ] **Шаг 1: Добавить `channel` в `SourceDict`**

В начале `sources/registry.py` заменить `SourceDict`:

```python
class SourceDict(TypedDict):
    name: str
    feed_url: str
    site_url: str
    region: str
    channel: str  # "news" | "events" | "tourism" | "gastronomy"
```

- [ ] **Шаг 2: Добавить `"channel": "news"` во все существующие испанские источники**

В `_SPAIN_SOURCES` добавить `"channel": "news"` к каждому элементу. Пример:

```python
    {
        "name": "El País",
        "feed_url": "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada",
        "site_url": "https://elpais.com",
        "region": "spain",
        "channel": "news",
    },
```

Применить ко всем 7 источникам в `_SPAIN_SOURCES`.

- [ ] **Шаг 3: Добавить `"channel": "news"` или `"events"` к валенсийским источникам**

В `_VALENCIA_SOURCES`:
- `Valencia.es Agenda` → `"channel": "events"`
- `IVAM` → `"channel": "events"`
- `CCCC Exposiciones` → `"channel": "events"`
- Все остальные → `"channel": "news"`

- [ ] **Шаг 4: Добавить туристические источники**

После `_VALENCIA_SOURCES` добавить:

```python
_TOURISM_SOURCES: list[SourceDict] = [
    {
        "name": "El País Viajes",
        "feed_url": "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/viajes/portada",
        "site_url": "https://elpais.com/viajes/",
        "region": "spain",
        "channel": "tourism",
    },
    {
        "name": "National Geographic España",
        "feed_url": "https://www.nationalgeographic.com.es/rss/todos-los-contenidos",
        "site_url": "https://www.nationalgeographic.com.es",
        "region": "spain",
        "channel": "tourism",
    },
    {
        "name": "Traveler.es",
        "feed_url": "https://www.traveler.es/rss/",
        "site_url": "https://www.traveler.es",
        "region": "spain",
        "channel": "tourism",
    },
    {
        "name": "Turismo Comunitat Valenciana",
        "feed_url": "https://www.comunitatvalenciana.com/rss",
        "site_url": "https://www.comunitatvalenciana.com",
        "region": "valencia",
        "channel": "tourism",
    },
]
```

- [ ] **Шаг 5: Добавить гастрономические источники**

```python
_GASTRONOMY_SOURCES: list[SourceDict] = [
    {
        "name": "Directo al Paladar",
        "feed_url": "https://www.directoalpaladar.com/rss/index.xml",
        "site_url": "https://www.directoalpaladar.com",
        "region": "spain",
        "channel": "gastronomy",
    },
    {
        "name": "El Comidista",
        "feed_url": "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/el-comidista/portada",
        "site_url": "https://elpais.com/gastronomia/el-comidista/",
        "region": "spain",
        "channel": "gastronomy",
    },
    {
        "name": "Gastronosfera",
        "feed_url": "https://www.gastronosfera.com/feed",
        "site_url": "https://www.gastronosfera.com",
        "region": "spain",
        "channel": "gastronomy",
    },
    {
        "name": "Guía Repsol",
        "feed_url": "https://www.guiarepsol.com/es/rss.xml",
        "site_url": "https://www.guiarepsol.com",
        "region": "spain",
        "channel": "gastronomy",
    },
]
```

- [ ] **Шаг 6: Обновить `SOURCES` и добавить хелпер**

```python
SOURCES: list[SourceDict] = (
    _SPAIN_SOURCES + _VALENCIA_SOURCES + _TOURISM_SOURCES + _GASTRONOMY_SOURCES
)


def get_all_sources() -> list[SourceDict]:
    return list(SOURCES)


def get_sources_by_region(region: str) -> list[SourceDict]:
    return [s for s in SOURCES if s["region"] == region]


def get_sources_by_channel(channel: str) -> list[SourceDict]:
    """Вернуть источники для заданного канала."""
    return [s for s in SOURCES if s["channel"] == channel]
```

- [ ] **Шаг 7: Проверить**

```bash
python -c "from sources.registry import get_sources_by_channel; print(len(get_sources_by_channel('tourism')), 'tourism sources')"
```

Ожидаем: `4 tourism sources`

- [ ] **Шаг 8: Коммит**

```bash
git add sources/registry.py
git commit -m "feat: добавить channel в реестр источников, новые туризм и гастрономия"
```

---

## Task 4: AI-персоны — 4 промпт-файла

**Files:**
- Create: `ai/personas/news.txt`
- Create: `ai/personas/events.txt`
- Create: `ai/personas/tourism.txt`
- Create: `ai/personas/gastronomy.txt`
- Modify: `ai/processor.py`

- [ ] **Шаг 1: Создать директорию и файл персоны новостей**

```bash
mkdir -p /home/zastone/study/Valencia_projects/Valencia_news/ai/personas
```

Создать `ai/personas/news.txt` с текущим содержимым `_PROMPT_TEMPLATE` из `ai/processor.py` (скопировать один в один — это базовый промпт, ничего не менять).

- [ ] **Шаг 2: Создать `ai/personas/events.txt`**

```
Ты — Катя, культурный обозреватель Telegram-канала для русскоязычных жителей Валенсии.
Твоя аудитория: русскоязычные эмигранты и туристы, которые хотят знать что происходит в городе, куда сходить на этих выходных.
Стиль: живой, с настроением, как подруга которая знает все интересные места. «Идите, это стоит» не «рекомендуется посетить».

Сегодня: {today}

СТАТЬЯ:
Заголовок: {title}
Источник: {source} (регион: {region})
Текст: {content}

---

ТВОЯ ЗАДАЧА — обработать статью и вернуть ТОЛЬКО валидный JSON. Никакого markdown, никаких пояснений.

=== 1. title_ru ===
Переведи заголовок на русский. Коротко, точно.

=== 2. summary_ru ===
Пиши как будто сообщаешь подруге о классном мероприятии.
Начинай с факта: «В эти выходные в Валенсии...», «До конца июня можно посетить...», «Бесплатный концерт в...»
Обязательно: дата, время, адрес, цена (или «вход свободный»), что особенного.
Длина: 3-5 предложений, до 450 символов.

=== 3. importance ===
ВЫСОКАЯ (0.7–1.0): фестивали, уникальные выставки, бесплатные события, события на этих выходных
СРЕДНЯЯ (0.4–0.6): концерты, регулярные выставки, культурные программы
НИЗКАЯ (0.1–0.3): мелкие местные события, повторяющиеся форматы
НОЛЬ (0.0): событие уже прошло (дата проведения раньше {today}) ИЛИ событие не в Валенсии/CV

Месяцы: enero=янв, febrero=фев, marzo=мар, abril=апр, mayo=май, junio=июн, julio=июл, agosto=авг, septiembre=сен, octubre=окт, noviembre=ноя, diciembre=дек.

=== 4. category ===
Одна из: культура, спорт, другое.

=== 5. location ===
Название места и адрес из текста. Формат: "Название, Адрес, Валенсия". Если нет — "".

ОТВЕТ — строго JSON:
{{"title_ru": "...", "summary_ru": "...", "importance": 0.0, "category": "...", "location": "..."}}
```

- [ ] **Шаг 3: Создать `ai/personas/tourism.txt`**

```
Ты — Сергей, путешественник-практик, который объездил всю Испанию и живёт в Валенсии.
Ты пишешь для русскоязычных туристов и жителей: куда поехать, что посмотреть, как добраться.
Стиль: конкретный и вдохновляющий. «Езжай» не «рекомендуется». Настоящий опыт, не рекламный текст.

Сегодня: {today}

СТАТЬЯ:
Заголовок: {title}
Источник: {source} (регион: {region})
Текст: {content}

---

ТВОЯ ЗАДАЧА — обработать статью и вернуть ТОЛЬКО валидный JSON. Никакого markdown, никаких пояснений.

=== 1. title_ru ===
Переведи заголовок на русский. Название места сохраняй как есть если оно известное.

=== 2. summary_ru ===
Пиши как путеводитель для живого человека.
Начинай с главного: «Всего 40 минут от Валенсии...», «Один из лучших пляжей побережья...», «Обязательная точка маршрута...»
Обязательно: что за место, чем примечательно, расстояние от Валенсии (если применимо), часы работы и цены (если есть).
Длина: 5-7 предложений, до 600 символов.

=== 3. importance ===
ВЫСОКАЯ (0.7–1.0): маршруты, пляжи, природные парки, исторические места, уникальные места Испании
СРЕДНЯЯ (0.4–0.6): города, деревни, менее известные достопримечательности, сезонные советы
НИЗКАЯ (0.1–0.3): общие советы по туризму без конкретного места, новости о туристической индустрии
НОЛЬ (0.0): статья не о конкретном месте для посещения, или место за пределами Испании

=== 4. category ===
Всегда: "туризм"

=== 5. location ===
Название места. Формат: "Название, Провинция/Регион". Если нет конкретного места — "".

ОТВЕТ — строго JSON:
{{"title_ru": "...", "summary_ru": "...", "importance": 0.0, "category": "туризм", "location": "..."}}
```

- [ ] **Шаг 4: Создать `ai/personas/gastronomy.txt`**

```
Ты — Наташа, гастрономический критик которая живёт в Валенсии и знает лучшие места.
Ты пишешь для русскоязычных жителей и туристов: где поесть, что попробовать, зачем идти именно сюда.
Стиль: чувственный, конкретный, с деталями вкуса. «Паэлья которую стоит попробовать» не «популярное блюдо».

Сегодня: {today}

СТАТЬЯ:
Заголовок: {title}
Источник: {source} (регион: {region})
Текст: {content}

---

ТВОЯ ЗАДАЧА — обработать статью и вернуть ТОЛЬКО валидный JSON. Никакого markdown, никаких пояснений.

=== 1. title_ru ===
Переведи заголовок на русский. Названия блюд и ресторанов сохраняй как есть.

=== 2. summary_ru ===
Пиши как рекомендация от знающего человека.
Начинай с аппетитного факта: «Лучшая паэлья Валенсии готовится в...», «Этот рецепт существует 300 лет...», «На рынке Центральном сейчас сезон...»
Для ресторана: название, адрес, специализация, ценовой диапазон, фирменное блюдо.
Для рецепта: главный ингредиент, особенность, с чем подавать.
Длина: 4-6 предложений, до 500 символов.

=== 3. importance ===
ВЫСОКАЯ (0.7–1.0): рестораны Валенсии, рецепты валенсийской кухни, гастрофестивали, сезонные продукты
СРЕДНЯЯ (0.4–0.6): рестораны других регионов Испании, общеиспанские блюда, гастрономические тренды
НИЗКАЯ (0.1–0.3): новости ресторанной индустрии без конкретного места, общие кулинарные советы
НОЛЬ (0.0): тема не связана с едой, местами питания или гастрономией

=== 4. category ===
Всегда: "культура"

=== 5. location ===
Название ресторана и адрес если есть. Формат: "Ресторан, Адрес, Город". Если нет — "".

ОТВЕТ — строго JSON:
{{"title_ru": "...", "summary_ru": "...", "importance": 0.0, "category": "культура", "location": "..."}}
```

- [ ] **Шаг 5: Обновить `ArticleProcessor` — принимать `persona_prompt`**

В `ai/processor.py` заменить `__init__`:

```python
    def __init__(self, client: GeminiClient, persona_prompt: str | None = None) -> None:
        self._client = client
        self._prompt_template = persona_prompt if persona_prompt else _PROMPT_TEMPLATE
```

И в `_build_prompt` заменить использование `_PROMPT_TEMPLATE` на `self._prompt_template`:

```python
    def _build_prompt(self, article: ParsedArticle) -> str:
        content_truncated = (article.content or article.title)[:3000]
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        return self._prompt_template.format(
            today=today,
            title=article.title,
            source=article.source_name,
            region=article.region,
            content=content_truncated,
        )
```

- [ ] **Шаг 6: Написать тест персоны**

```python
# tests/test_persona.py
from unittest.mock import MagicMock
from ai.processor import ArticleProcessor
from models import ParsedArticle
from datetime import datetime, timezone


def test_processor_uses_custom_persona():
    client = MagicMock()
    client.generate.return_value = '{"title_ru": "Тест", "summary_ru": "Резюме", "importance": 0.7, "category": "туризм", "location": ""}'

    custom_persona = "Ты — Сергей.\n\nСегодня: {today}\n\nСТАТЬЯ:\nЗаголовок: {title}\nИсточник: {source} (регион: {region})\nТекст: {content}\n\nОТВЕТ — строго JSON:\n{{\"title_ru\": \"...\", \"summary_ru\": \"...\", \"importance\": 0.0, \"category\": \"...\", \"location\": \"\"}}"
    processor = ArticleProcessor(client=client, persona_prompt=custom_persona)

    article = ParsedArticle(
        url="http://test.com",
        title="Test Place",
        source_name="Test",
        region="spain",
        published_at=datetime.now(timezone.utc),
    )
    result = processor.process_article(article)

    prompt_used = client.generate.call_args[0][0]
    assert "Сергей" in prompt_used
    assert result.title_ru == "Тест"
```

- [ ] **Шаг 7: Запустить тесты**

```bash
python -m pytest tests/test_persona.py -v
```

Ожидаем: PASSED

- [ ] **Шаг 8: Коммит**

```bash
git add ai/personas/ ai/processor.py tests/test_persona.py
git commit -m "feat: AI-персоны для 4 каналов, processor принимает persona_prompt"
```

---

## Task 5: Channel config и обновление config.py

**Files:**
- Create: `orchestrator/__init__.py`
- Create: `orchestrator/channel_config.py`
- Modify: `config.py`

- [ ] **Шаг 1: Создать `orchestrator/__init__.py`** (пустой файл)

```bash
touch /home/zastone/study/Valencia_projects/Valencia_news/orchestrator/__init__.py
```

- [ ] **Шаг 2: Создать `orchestrator/channel_config.py`**

```python
# orchestrator/channel_config.py
"""Конфигурация одного канала публикации."""
from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent


@dataclass(frozen=True)
class ChannelConfig:
    name: str           # "news" | "events" | "tourism" | "gastronomy"
    chat_id: str        # @channel_name или -100...
    morning_time: str   # "08:00"
    evening_time: str   # "19:00"
    persona_file: Path  # Путь к файлу промпта-персоны

    @property
    def persona_prompt(self) -> str:
        """Читает промпт-персону из файла."""
        if self.persona_file.exists():
            return self.persona_file.read_text(encoding="utf-8")
        raise FileNotFoundError(f"Файл персоны не найден: {self.persona_file}")


def make_channel_configs(
    news_id: str,
    events_id: str,
    tourism_id: str,
    gastro_id: str,
) -> dict[str, ChannelConfig]:
    """Создаёт конфиги для всех 4 каналов."""
    personas_dir = BASE_DIR / "ai" / "personas"
    return {
        "news": ChannelConfig(
            name="news",
            chat_id=news_id,
            morning_time="08:00",
            evening_time="19:00",
            persona_file=personas_dir / "news.txt",
        ),
        "events": ChannelConfig(
            name="events",
            chat_id=events_id,
            morning_time="08:00",
            evening_time="20:00",
            persona_file=personas_dir / "events.txt",
        ),
        "tourism": ChannelConfig(
            name="tourism",
            chat_id=tourism_id,
            morning_time="10:00",
            evening_time="18:00",
            persona_file=personas_dir / "tourism.txt",
        ),
        "gastronomy": ChannelConfig(
            name="gastronomy",
            chat_id=gastro_id,
            morning_time="11:00",
            evening_time="20:00",
            persona_file=personas_dir / "gastronomy.txt",
        ),
    }
```

- [ ] **Шаг 3: Добавить channel IDs в `config.py`**

В классе `AppConfig` после поля `logs_dir` добавить:

```python
    # Telegram IDs для каждого канала
    channel_news_id: str = field(
        default_factory=lambda: os.getenv("CHANNEL_NEWS_CHAT_ID", os.getenv("TELEGRAM_CHANNEL_ID", ""))
    )
    channel_events_id: str = field(
        default_factory=lambda: os.getenv("CHANNEL_EVENTS_CHAT_ID", "")
    )
    channel_tourism_id: str = field(
        default_factory=lambda: os.getenv("CHANNEL_TOURISM_CHAT_ID", "")
    )
    channel_gastro_id: str = field(
        default_factory=lambda: os.getenv("CHANNEL_GASTRO_CHAT_ID", "")
    )
```

- [ ] **Шаг 4: Проверить импорт**

```bash
python -c "from orchestrator.channel_config import make_channel_configs; print('OK')"
```

- [ ] **Шаг 5: Коммит**

```bash
git add orchestrator/ config.py
git commit -m "feat: ChannelConfig dataclass и channel IDs в AppConfig"
```

---

## Task 6: Статический контент — JSON-базы и StaticContentSource

**Files:**
- Create: `data/places_spain.json`
- Create: `data/restaurants_valencia.json`
- Create: `data/dishes_spain.json`
- Create: `sources/static_content.py`
- Test: `tests/test_static_content.py`

- [ ] **Шаг 1: Создать `data/places_spain.json`**

```json
[
  {
    "id": "sagunto_castle",
    "name": "Замок Сагунто",
    "description": "Один из старейших замков Испании на холме над городом Сагунто. Основан ещё иберами, расширен римлянами и маврами. С вершины открывается вид на море и апельсиновые рощи. Внутри — хорошо сохранившийся Римский театр II века. Вход бесплатный. Добраться: 35 км от Валенсии, поезд Cercanías C-6 за 40 минут.",
    "location": "Sagunto, Comunitat Valenciana",
    "tags": ["история", "дети", "бесплатно", "день поездки"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "xativa_castle",
    "name": "Замок Шатива",
    "description": "Двойной замок на горном хребте над городом Шатива — один из самых впечатляющих в Испании. Здесь родился папа Александр VI. Смотровая площадка с панорамой на 360°. Внутри — небольшой музей и живописные сады. Вход: 2,40€, пенсионеры бесплатно. Добраться: 65 км от Валенсии, поезд за 50 минут.",
    "location": "Xàtiva, Comunitat Valenciana",
    "tags": ["история", "вид", "день поездки"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "albufera_natural_park",
    "name": "Природный парк Альбуфера",
    "description": "Пресноводное озеро и рисовые поля в 15 км от Валенсии — родина настоящей паэльи. Лучшее время — закат: небо над озером становится оранжевым. Прогулки на лодке от 4€ с человека. В El Palmar — рестораны с паэльей прямо у воды. На велосипеде из Валенсии через El Saler за 45 минут.",
    "location": "Parque Natural de la Albufera, Valencia",
    "tags": ["природа", "велосипед", "паэлья", "закат"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "peniscola",
    "name": "Пеньискола — средневековый замок у моря",
    "description": "Маленький город на скале посреди Средиземного моря — декорации к «Игре престолов». Замок тамплиеров XIV века нависает прямо над пляжем. Старый город — лабиринт узких улочек и белых домиков. Пляж у подножия скалы — один из лучших на Costa del Azahar. Добраться: 140 км от Валенсии, автобус Alsa за 1,5 часа.",
    "location": "Peñíscola, Castellón",
    "tags": ["пляж", "история", "фото", "день поездки"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "cuenca_hanging_houses",
    "name": "Куэнка — висячие дома над пропастью",
    "description": "Средневековый город над ущельем рек Хукар и Уэкар — объект ЮНЕСКО. Главная достопримечательность — «висячие дома» XIV века, буквально нависающие над пропастью. Один из них сейчас — Музей испанского абстрактного искусства. Ущелье Хукар можно пройти пешком по нижней тропе. Добраться: 300 км от Валенсии, автобус за 2,5 часа.",
    "location": "Cuenca, Castilla-La Mancha",
    "tags": ["ЮНЕСКО", "архитектура", "уикенд"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  }
]
```

- [ ] **Шаг 2: Создать `data/restaurants_valencia.json`**

```json
[
  {
    "id": "la_pepica",
    "name": "La Pepica — легендарный ресторан паэльи",
    "description": "Ресторан у пляжа Малварроса с историей с 1898 года. Хемингуэй бывал здесь регулярно, его фото до сих пор на стене. Паэлья valenciana готовится строго по классическому рецепту: курица, кролик, зелёная фасоль, без морепродуктов. Минимальный заказ на 2 человека от 16€ с человека. Reserva рекомендуется на выходных.",
    "location": "La Pepica, Paseo Neptuno 6, Valencia",
    "tags": ["паэлья", "пляж", "история", "классика"],
    "price_range": "€€€",
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "mercado_central_valencia",
    "name": "Центральный рынок Валенсии",
    "description": "Один из крупнейших рынков Европы под модернистским куполом 1928 года — 8000 кв.м. свежих продуктов. Здесь покупают продукты настоящие валенсийцы: апельсины с ближайших рощ, рыба из Средиземного моря, хурма и артишоки. В баре Mercado Central подают хорхату с фарtons — местный завтрак. Работает пн-сб 7:30–15:00.",
    "location": "Mercat Central, Plaça de la Ciutat de Bruges, Valencia",
    "tags": ["рынок", "продукты", "завтрак", "архитектура"],
    "price_range": "€",
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "placeholder_restaurant_001",
    "name": "Ресторан недели",
    "description": "🍽 Это место пока свободно.\nХотите, чтобы ваш ресторан появился здесь? → @contact",
    "location": "",
    "tags": [],
    "price_range": "",
    "image_url": null,
    "last_published": null,
    "is_placeholder": true
  }
]
```

- [ ] **Шаг 3: Создать `data/dishes_spain.json`**

```json
[
  {
    "id": "paella_valenciana",
    "name": "Паэлья валенсийская — оригинальный рецепт",
    "description": "Настоящая паэлья готовится не с морепродуктами, а с курицей и кроликом. Это блюдо крестьян, которые варили рис с тем, что было в полях: мясо, зелёная стручковая фасоль, белая фасоль, томаты, паприка, шафран. Обязательно готовится на дровах в широкой мелкой сковороде — паэлье. Рис должен дать «socarrat» — поджаристую корочку снизу. В Валенсии паэлью едят только в обед, никогда на ужин.",
    "tags": ["валенсия", "классика", "рис"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  },
  {
    "id": "horchata_fartons",
    "name": "Хорхата с фарtons — валенсийский завтрак",
    "description": "Хорхата (orxata) — холодный напиток из земляного ореха чуфа, выращиваемого только в деревне Альборайя под Валенсией. Белый, чуть сладкий, с ореховым вкусом — ни на что не похожий. Подаётся с фарtons — мягкими длинными булочками покрытыми сахарной глазурью для макания. Летом хорхату пьют замёрзшей (granisada). Попробовать: Granja Ribes или Horchatería Santa Catalina в Валенсии.",
    "tags": ["напиток", "завтрак", "валенсия", "уникальное"],
    "image_url": null,
    "last_published": null,
    "is_placeholder": false
  }
]
```

- [ ] **Шаг 4: Написать падающий тест для StaticContentSource**

```python
# tests/test_static_content.py
import json
import pytest
from pathlib import Path
from sources.static_content import StaticContentSource


@pytest.fixture
def tmp_json(tmp_path):
    data = [
        {
            "id": "test_place",
            "name": "Тестовое место",
            "description": "Описание тестового места.",
            "location": "Test, Spain",
            "tags": ["тест"],
            "image_url": None,
            "last_published": None,
            "is_placeholder": False,
        },
        {
            "id": "placeholder_001",
            "name": "Заглушка",
            "description": "Место свободно",
            "is_placeholder": True,
            "last_published": None,
        },
    ]
    path = tmp_path / "test.json"
    path.write_text(json.dumps(data, ensure_ascii=False))
    return path


def test_fetch_next_batch_skips_placeholders(tmp_json):
    source = StaticContentSource(tmp_json, source_name="Test", channel="tourism")
    articles = source.fetch_next_batch(n=10)
    assert len(articles) == 1
    assert articles[0].title == "Тестовое место"


def test_fetch_next_batch_respects_cooldown(tmp_json):
    from datetime import datetime, timezone, timedelta
    data = json.loads(tmp_json.read_text())
    data[0]["last_published"] = (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
    tmp_json.write_text(json.dumps(data, ensure_ascii=False))

    source = StaticContentSource(tmp_json, source_name="Test", channel="tourism")
    articles = source.fetch_next_batch(n=10, cooldown_days=60)
    assert len(articles) == 0


def test_article_url_is_unique_static_prefix(tmp_json):
    source = StaticContentSource(tmp_json, source_name="Test", channel="tourism")
    articles = source.fetch_next_batch(n=10)
    assert articles[0].url.startswith("static://tourism/")
```

- [ ] **Шаг 5: Запустить — должен упасть**

```bash
python -m pytest tests/test_static_content.py -v
```

Ожидаем: `ModuleNotFoundError: No module named 'sources.static_content'`

- [ ] **Шаг 6: Создать `sources/static_content.py`**

```python
# sources/static_content.py
"""Читает статический JSON-контент (места, рестораны, блюда) и возвращает ParsedArticle."""
from __future__ import annotations

import json
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path

from models import ParsedArticle

logger = logging.getLogger(__name__)


class StaticContentSource:
    """Источник контента из статического JSON-файла."""

    def __init__(self, json_path: Path, source_name: str, channel: str) -> None:
        self._path = json_path
        self._source_name = source_name
        self._channel = channel
        self._entries: list[dict] = []
        self._load()

    def _load(self) -> None:
        if self._path.exists():
            self._entries = json.loads(self._path.read_text(encoding="utf-8"))
        else:
            logger.warning("Файл базы не найден: %s", self._path)

    def fetch_next_batch(self, n: int, cooldown_days: int = 60) -> list[ParsedArticle]:
        """Возвращает до n записей, не публиковавшихся последние cooldown_days дней."""
        now = datetime.now(timezone.utc)
        result: list[ParsedArticle] = []

        for entry in self._entries:
            if entry.get("is_placeholder"):
                continue
            last_str = entry.get("last_published")
            if last_str:
                last = datetime.fromisoformat(last_str)
                if last.tzinfo is None:
                    last = last.replace(tzinfo=timezone.utc)
                if (now - last).days < cooldown_days:
                    continue
            result.append(self._to_article(entry))
            if len(result) >= n:
                break

        return result

    def mark_published(self, entry_id: str) -> None:
        """Обновляет last_published для записи и сохраняет файл."""
        for entry in self._entries:
            if entry.get("id") == entry_id:
                entry["last_published"] = datetime.now(timezone.utc).isoformat()
        self._path.write_text(
            json.dumps(self._entries, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    def _to_article(self, entry: dict) -> ParsedArticle:
        return ParsedArticle(
            url=f"static://{self._channel}/{entry['id']}",
            title=entry["name"],
            source_name=self._source_name,
            region="spain" if self._channel == "tourism" else "valencia",
            published_at=datetime.now(timezone.utc),
            content=entry.get("description", ""),
            image_url=entry.get("image_url"),
        )
```

- [ ] **Шаг 7: Запустить тесты**

```bash
python -m pytest tests/test_static_content.py -v
```

Ожидаем: 3 PASSED

- [ ] **Шаг 8: Коммит**

```bash
git add data/ sources/static_content.py tests/test_static_content.py
git commit -m "feat: JSON-базы мест/ресторанов/блюд и StaticContentSource"
```

---

## Task 7: Параметризовать NewsAggregator по каналу

**Files:**
- Modify: `main.py`

- [ ] **Шаг 1: Обновить `NewsAggregator.__init__` — принять `channel`**

Найти `def __init__(self) -> None:` и заменить на:

```python
    def __init__(self, channel: str = "news", chat_id: str | None = None, persona_prompt: str | None = None) -> None:
        init_db()
        logger.info("База данных инициализирована.")

        self._channel = channel
        self._chat_id = chat_id or config.telegram.channel_id

        self._gemini = GeminiClient(
            api_key=config.gemini.api_key,
            model=config.gemini.model,
        )

        self._collector = NewsCollector()
        self._processor = ArticleProcessor(client=self._gemini, persona_prompt=persona_prompt)
        self._deduplicator = Deduplicator()
        self._ranker = Ranker()
        self._formatter = MessageFormatter()
        self._publisher = TelegramPublisher(
            bot_token=config.telegram.bot_token,
            channel_id=self._chat_id,
        )

        logger.info("NewsAggregator[%s] инициализирован.", self._channel)
```

- [ ] **Шаг 2: Обновить `_get_or_seed_sources` — фильтровать по каналу**

Найти метод `_get_or_seed_sources` и добавить фильтрацию:

```python
    def _get_or_seed_sources(self) -> list[dict]:
        with get_session() as session:
            repo = SourceRepository(session)
            all_sources_dicts = get_all_sources()
            added = repo.seed_sources(all_sources_dicts)
            if added:
                logger.info("Добавлено новых источников: %d", added)
            active_sources = repo.get_all_active(channel=self._channel)

            return [
                {
                    "name": s.name,
                    "feed_url": s.feed_url,
                    "site_url": s.site_url or "",
                    "region": s.region,
                    "channel": s.channel,
                }
                for s in active_sources
            ]
```

- [ ] **Шаг 3: Обновить `_get_known_urls` — фильтровать по каналу**

```python
    def _get_known_urls(self) -> set[str]:
        with get_session() as session:
            repo = ArticleRepository(session)
            return repo.get_recent_urls(hours=24 * 7, channel=self._channel)

    def _get_known_event_urls(self) -> set[str]:
        with get_session() as session:
            repo = ArticleRepository(session)
            return repo.get_recent_urls(hours=24 * 30, channel=self._channel)
```

- [ ] **Шаг 4: Обновить `_processed_to_storage_article` — сохранять channel**

Найти функцию `_processed_to_storage_article` (или место где создаётся `Article` из `ProcessedArticle`) и добавить `channel`. Найти в конце `main.py`:

```python
def _processed_to_storage_article(article: ProcessedArticle, channel: str = "news") -> Article:
```

И добавить в тело функции при создании `Article(...)`:
```python
    channel=channel,
```

Затем в `_save_articles` передавать `channel=self._channel`:
```python
    db_article = _processed_to_storage_article(article, channel=self._channel)
```

- [ ] **Шаг 5: Проверить запуск с явным каналом**

```bash
python main.py --digest morning --channel news
```

Ожидаем: запуск без ошибок, логи `NewsAggregator[news]`

- [ ] **Шаг 6: Коммит**

```bash
git add main.py
git commit -m "feat: NewsAggregator принимает channel, chat_id, persona_prompt"
```

---

## Task 8: ChannelOrchestrator

**Files:**
- Create: `orchestrator/channel_orchestrator.py`
- Test: `tests/test_channel_orchestrator.py`

- [ ] **Шаг 1: Написать падающий тест**

```python
# tests/test_channel_orchestrator.py
from unittest.mock import MagicMock, patch


def test_orchestrator_creates_four_aggregators():
    from orchestrator.channel_config import ChannelConfig
    from pathlib import Path

    configs = {
        "news": MagicMock(spec=ChannelConfig, name="news", chat_id="@news", persona_prompt="persona news"),
        "events": MagicMock(spec=ChannelConfig, name="events", chat_id="@events", persona_prompt="persona events"),
        "tourism": MagicMock(spec=ChannelConfig, name="tourism", chat_id="@tourism", persona_prompt="persona tourism"),
        "gastronomy": MagicMock(spec=ChannelConfig, name="gastronomy", chat_id="@gastro", persona_prompt="persona gastro"),
    }
    for k, v in configs.items():
        v.name = k

    with patch("orchestrator.channel_orchestrator.NewsAggregator") as MockAgg:
        from orchestrator.channel_orchestrator import ChannelOrchestrator
        orchestrator = ChannelOrchestrator(configs)
        assert MockAgg.call_count == 4
```

- [ ] **Шаг 2: Запустить — должен упасть**

```bash
python -m pytest tests/test_channel_orchestrator.py -v
```

- [ ] **Шаг 3: Создать `orchestrator/channel_orchestrator.py`**

```python
# orchestrator/channel_orchestrator.py
"""Управляет 4 экземплярами NewsAggregator — по одному на канал."""
from __future__ import annotations

import logging
from orchestrator.channel_config import ChannelConfig
from main import NewsAggregator

logger = logging.getLogger(__name__)


class ChannelOrchestrator:
    """Тонкая обёртка: создаёт NewsAggregator для каждого канала."""

    def __init__(self, channel_configs: dict[str, ChannelConfig]) -> None:
        self._aggregators: dict[str, NewsAggregator] = {}
        for name, cfg in channel_configs.items():
            self._aggregators[name] = NewsAggregator(
                channel=cfg.name,
                chat_id=cfg.chat_id,
                persona_prompt=cfg.persona_prompt,
            )
            logger.info("Агрегатор канала [%s] → %s", name, cfg.chat_id)

    def run_digest(self, channel: str, digest_type: str) -> None:
        """Запускает дайджест для конкретного канала."""
        agg = self._aggregators.get(channel)
        if agg is None:
            logger.error("Канал не найден: %s", channel)
            return
        try:
            agg.run_digest(digest_type)
        except Exception as exc:
            logger.error("Ошибка дайджеста [%s/%s]: %s", channel, digest_type, exc)

    def run_events(self, channel: str = "events", events_per_run: int | None = None) -> None:
        """Запускает публикацию афиши."""
        agg = self._aggregators.get(channel)
        if agg is None:
            logger.error("Канал не найден: %s", channel)
            return
        try:
            agg.run_events_digest(events_per_run=events_per_run)
        except Exception as exc:
            logger.error("Ошибка афиши [%s]: %s", channel, exc)
```

- [ ] **Шаг 4: Запустить тесты**

```bash
python -m pytest tests/test_channel_orchestrator.py -v
```

Ожидаем: PASSED

- [ ] **Шаг 5: Коммит**

```bash
git add orchestrator/channel_orchestrator.py tests/test_channel_orchestrator.py
git commit -m "feat: ChannelOrchestrator — 4 агрегатора в одном процессе"
```

---

## Task 9: Обновить scheduler для 4 каналов

**Files:**
- Modify: `infra/scheduler.py`

- [ ] **Шаг 1: Прочитать текущий `infra/scheduler.py`**

```bash
cat -n infra/scheduler.py
```

- [ ] **Шаг 2: Обновить `NewsScheduler` — поддержать orchestrator**

Найти класс `NewsScheduler` и добавить поддержку оркестратора. Заменить `__init__` и `start`:

```python
class NewsScheduler:
    def __init__(
        self,
        digest_fn=None,
        events_fn=None,
        events_interval_hours: int = 5,
        orchestrator=None,
        channel_configs: dict | None = None,
    ) -> None:
        self._digest_fn = digest_fn
        self._events_fn = events_fn
        self._events_interval_hours = events_interval_hours
        self._orchestrator = orchestrator
        self._channel_configs = channel_configs or {}

    def start(self) -> None:
        if self._orchestrator and self._channel_configs:
            self._start_multichannel()
        else:
            self._start_single_channel()
        logger.info("Планировщик запущен. Ожидание задач...")
        while True:
            schedule.run_pending()
            time.sleep(30)

    def _start_multichannel(self) -> None:
        """Регистрирует расписание для 4 каналов."""
        from orchestrator.channel_config import ChannelConfig
        orch = self._orchestrator
        cfgs: dict[str, ChannelConfig] = self._channel_configs

        for channel_name, cfg in cfgs.items():
            if channel_name == "events":
                schedule.every(self._events_interval_hours).hours.do(
                    lambda ch=channel_name: orch.run_events(ch)
                )
                logger.info("Афиша [%s]: каждые %dч", channel_name, self._events_interval_hours)
            else:
                schedule.every().day.at(cfg.morning_time).do(
                    lambda ch=channel_name: orch.run_digest(ch, "morning")
                )
                schedule.every().day.at(cfg.evening_time).do(
                    lambda ch=channel_name: orch.run_digest(ch, "evening")
                )
                logger.info(
                    "Дайджест [%s]: утро %s, вечер %s",
                    channel_name, cfg.morning_time, cfg.evening_time,
                )

    def _start_single_channel(self) -> None:
        """Обратная совместимость — одноканальный режим."""
        morning = config.schedule.morning_time
        evening = config.schedule.evening_time
        schedule.every().day.at(morning).do(lambda: self._digest_fn("morning"))
        schedule.every().day.at(evening).do(lambda: self._digest_fn("evening"))
        if self._events_fn:
            schedule.every(self._events_interval_hours).hours.do(self._events_fn)
```

- [ ] **Шаг 3: Проверить импорт**

```bash
python -c "from infra.scheduler import NewsScheduler; print('OK')"
```

- [ ] **Шаг 4: Коммит**

```bash
git add infra/scheduler.py
git commit -m "feat: планировщик поддерживает 4-канальный режим через ChannelOrchestrator"
```

---

## Task 10: Обновить `main.py` entry point + `.env.example`

**Files:**
- Modify: `main.py` — добавить `--all-channels` режим
- Modify: `.env.example`

- [ ] **Шаг 1: Обновить блок `if __name__ == "__main__"`**

Найти блок запуска и добавить режим `--all-channels`:

```python
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Valencia News Aggregator")
    parser.add_argument("--digest", choices=["morning", "evening"], help="Запустить дайджест")
    parser.add_argument("--events", action="store_true", help="Запустить афишу")
    parser.add_argument("--channel", default="news", help="Канал (news/events/tourism/gastronomy)")
    parser.add_argument("--all-channels", action="store_true", help="Запустить планировщик для всех каналов")
    parser.add_argument("--migrate", action="store_true", help="Запустить миграцию БД")
    args = parser.parse_args()

    if args.migrate:
        from storage.migration import run_migrations
        run_migrations()

    elif args.all_channels:
        from orchestrator.channel_config import make_channel_configs
        from orchestrator.channel_orchestrator import ChannelOrchestrator
        from infra.scheduler import NewsScheduler

        channel_configs = make_channel_configs(
            news_id=config.channel_news_id,
            events_id=config.channel_events_id,
            tourism_id=config.channel_tourism_id,
            gastro_id=config.channel_gastro_id,
        )
        orchestrator = ChannelOrchestrator(channel_configs)
        scheduler = NewsScheduler(
            orchestrator=orchestrator,
            channel_configs=channel_configs,
            events_interval_hours=config.schedule.events_interval_hours,
        )
        scheduler.start()

    elif args.digest:
        agg = NewsAggregator(channel=args.channel)
        agg.run_digest(args.digest)

    elif args.events:
        agg = NewsAggregator(channel=args.channel)
        agg.run_events_digest()

    else:
        parser.print_help()
```

- [ ] **Шаг 2: Обновить `.env.example`**

Добавить в `.env.example`:

```
# Мультиканальный режим
CHANNEL_NEWS_CHAT_ID=@Esp_Valencia_news
CHANNEL_EVENTS_CHAT_ID=@Valencia_Afisha_Bot
CHANNEL_TOURISM_CHAT_ID=@Spain_Travel_Ru
CHANNEL_GASTRO_CHAT_ID=@Spain_Food_Ru
```

- [ ] **Шаг 3: Добавить переменные в `.env`** (реальные значения)

Открыть `.env` и добавить реальные channel IDs для всех 4 каналов.

- [ ] **Шаг 4: Запустить миграцию**

```bash
python main.py --migrate
```

Ожидаем: `Миграция завершена.`

- [ ] **Шаг 5: Тест — один канал**

```bash
python main.py --digest morning --channel tourism
```

Ожидаем: запуск без ошибок, логи туристического агрегатора.

- [ ] **Шаг 6: Финальный коммит**

```bash
git add main.py .env.example
git commit -m "feat: --all-channels режим, запуск мультиканальной сети"
```

---

## Порядок выполнения задач

```
Task 1 (DB models)
    ↓
Task 2 (Repository)
    ↓
Task 3 (Registry + новые источники)
    ↓
Task 4 (AI personas + processor)
    ↓
Task 5 (Channel config)
    ↓
Task 6 (Static content)
    ↓
Task 7 (NewsAggregator параметризация)
    ↓
Task 8 (ChannelOrchestrator)
    ↓
Task 9 (Scheduler)
    ↓
Task 10 (Entry point + .env)
```

Каждая задача деплоится независимо. После Task 7 уже можно запускать один канал с нужной персоной.

---

## Что не входит в этот план (Phase 2)

- **@ValenciaGuideBot** — интерактивный бот-гид. Отдельный план, отдельный процесс.
- **Монетизационные заглушки в расписании** — JSON-файлы уже содержат `is_placeholder: true` записи, публикация активируется вручную.
- **Перекрёстные промо-посты** — добавить отдельной задачей после запуска всех 4 каналов.
