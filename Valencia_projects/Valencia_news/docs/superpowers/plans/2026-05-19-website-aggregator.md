# Website Aggregator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать статический сайт-агрегатор на Next.js 14 с Python-экспортером, который пишет JSON из SQLite и пушит в git → Vercel автоматически пересобирает сайт.

**Architecture:** Python-бот экспортирует последние 50 статей на канал в `website/public/data/*.json`, делает `git commit + push`. Vercel детектирует push и запускает `next build`, который читает JSON из диска и генерирует статический HTML. Никакой базы данных и API на фронтенде — только статические JSON-файлы.

**Tech Stack:** Python 3.12 / SQLAlchemy / SQLite | Next.js 14 App Router / TypeScript / Tailwind CSS / Vercel

---

## Структура файлов

```
Valencia_news/
├── exporter.py                         # NEW — Python JSON-экспортер
├── tests/
│   └── test_exporter.py                # NEW — тесты экспортера
├── storage/
│   ├── models.py                       # MODIFY — добавить title_ru
│   ├── migration.py                    # MODIFY — ALTER TABLE для title_ru
│   └── repository.py                   # MODIFY — get_latest_for_export
├── orchestrator/
│   ├── news_aggregator.py              # MODIFY — сохранять title_ru
│   └── channel_orchestrator.py        # MODIFY — вызывать exporter
├── config.py                           # MODIFY — WEBSITE_EXPORT_ENABLED
└── website/                            # NEW — весь Next.js проект
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── public/
    │   └── data/
    │       ├── news.json               # seed (пустой массив)
    │       ├── events.json
    │       ├── tourism.json
    │       └── gastronomy.json
    └── src/
        ├── types.ts
        └── app/
            ├── globals.css
            ├── layout.tsx
            ├── page.tsx
            └── components/
                ├── Header.tsx
                ├── TabBar.tsx
                ├── ArticleCard.tsx
                ├── Feed.tsx
                └── Footer.tsx
```

---

## Task 1: Добавить title_ru в модель Article + миграция

**Files:**
- Modify: `storage/models.py`
- Modify: `storage/migration.py`
- Modify: `orchestrator/news_aggregator.py` (метод `_processed_to_storage_article`)

- [ ] **Step 1: Добавить поле `title_ru` в `storage/models.py`**

Вставить после строки `title: Mapped[str] = mapped_column(...)`:

```python
# Заголовок на русском языке (генерируется AI)
title_ru: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
```

- [ ] **Step 2: Добавить миграцию в `storage/migration.py`**

```python
def run_migrations() -> None:
    """Добавляет channel и title_ru в существующую БД."""
    with engine.connect() as conn:
        for table, col, default in [
            ("articles", "channel", "'news'"),
            ("sources", "channel", "'news'"),
            ("articles", "title_ru", "NULL"),
        ]:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} TEXT DEFAULT {default}"))
                logger.info("Добавлена колонка %s.%s", table, col)
            except Exception:
                logger.debug("Колонка %s.%s уже существует", table, col)
        conn.commit()
    logger.info("Миграция завершена.")
```

- [ ] **Step 3: Обновить `_processed_to_storage_article` в `orchestrator/news_aggregator.py`**

Добавить `title_ru=art.title_ru,` к конструктору `Article(...)`:

```python
def _processed_to_storage_article(self, art: ProcessedArticle) -> Article:
    return Article(
        url=art.url,
        title=art.title,
        title_ru=art.title_ru,        # ← добавить эту строку
        original_text=art.content,
        summary_ru=art.summary_ru,
        category=art.category,
        importance_score=art.importance_score,
        source_name=art.source_name,
        source_url=None,
        region=art.region,
        published_at=art.published_at,
        is_published=False,
        image_url=art.image_url,
        channel=self._cfg.channel,
    )
```

- [ ] **Step 4: Запустить миграцию**

```bash
.venv/bin/python -c "from storage.migration import run_migrations; run_migrations()"
```

Ожидаемый вывод: `Добавлена колонка articles.title_ru` или `уже существует`.

- [ ] **Step 5: Убедиться что модель применилась**

```bash
.venv/bin/python -c "
from storage.database import get_session
from storage.models import Article
with get_session() as s:
    a = s.query(Article).first()
    print('title_ru field:', a.title_ru if a else 'no articles yet')
print('OK')
"
```

Ожидаемый вывод: `title_ru field: ...` без ошибок.

- [ ] **Step 6: Commit**

```bash
git add storage/models.py storage/migration.py orchestrator/news_aggregator.py
git commit -m "feat: добавить title_ru в модель Article + миграция + сохранение из AI"
```

---

## Task 2: Python-экспортер + тесты

**Files:**
- Create: `exporter.py`
- Create: `tests/test_exporter.py`
- Modify: `storage/repository.py` (новый метод `get_latest_for_export`)

- [ ] **Step 1: Добавить `get_latest_for_export` в `storage/repository.py`**

Вставить после метода `get_recent_urls_for_sources`:

```python
def get_latest_for_export(self, channel: str, limit: int = 50) -> list[Article]:
    """Последние N статей канала с непустым summary_ru, для JSON-экспорта."""
    stmt = (
        select(Article)
        .where(
            Article.channel == channel,
            Article.summary_ru.isnot(None),
            Article.summary_ru != "",
        )
        .order_by(Article.published_at.desc())
        .limit(limit)
    )
    return list(self._session.scalars(stmt).all())
```

- [ ] **Step 2: Написать тесты в `tests/test_exporter.py`**

```python
"""Тесты для exporter.py."""
import json
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest


def _make_article(channel: str = "news") -> object:
    """Создаёт минимальный мок статьи для тестов."""
    a = MagicMock()
    a.id = 1
    a.title = "Test"
    a.title_ru = "Тест"
    a.summary_ru = "Краткое описание."
    a.source_name = "El País"
    a.url = "https://example.com/1"
    a.image_url = None
    a.category = "культура"
    a.published_at = datetime(2026, 5, 19, 10, 0, tzinfo=timezone.utc)
    a.channel = channel
    return a


def test_to_dict_all_fields():
    """_to_dict включает все поля нужные для JSON-экспорта."""
    from exporter import _to_dict

    art = _make_article("news")
    d = _to_dict(art)

    assert d["id"] == 1
    assert d["title_ru"] == "Тест"
    assert d["summary_ru"] == "Краткое описание."
    assert d["source_name"] == "El País"
    assert d["url"] == "https://example.com/1"
    assert d["image_url"] is None
    assert d["category"] == "культура"
    assert d["channel"] == "news"
    assert "2026-05-19" in d["published_at"]


def test_to_dict_fallback_title_ru():
    """_to_dict использует title если title_ru пустой."""
    from exporter import _to_dict

    art = _make_article()
    art.title_ru = None
    art.title = "Испанский заголовок"
    d = _to_dict(art)

    assert d["title_ru"] == "Испанский заголовок"


def test_export_to_website_creates_four_json_files(tmp_path):
    """export_to_website создаёт по одному JSON на каждый из 4 каналов."""
    from exporter import CHANNELS

    mock_repo = MagicMock()
    mock_repo.get_latest_for_export.return_value = [_make_article()]

    mock_session_ctx = MagicMock()
    mock_session_ctx.__enter__ = MagicMock(return_value=MagicMock())
    mock_session_ctx.__exit__ = MagicMock(return_value=False)

    with patch("exporter.DATA_DIR", tmp_path), \
         patch("exporter.ArticleRepository", return_value=mock_repo), \
         patch("exporter.get_session", return_value=mock_session_ctx):
        from exporter import export_to_website
        export_to_website()

    for channel in CHANNELS:
        f = tmp_path / f"{channel}.json"
        assert f.exists(), f"Нет файла {channel}.json"
        data = json.loads(f.read_text())
        assert data["channel"] == channel
        assert "updated_at" in data
        assert isinstance(data["articles"], list)


def test_export_json_valid_structure(tmp_path):
    """JSON содержит правильную структуру ExportFile."""
    mock_repo = MagicMock()
    mock_repo.get_latest_for_export.return_value = [_make_article("news")]

    mock_session_ctx = MagicMock()
    mock_session_ctx.__enter__ = MagicMock(return_value=MagicMock())
    mock_session_ctx.__exit__ = MagicMock(return_value=False)

    with patch("exporter.DATA_DIR", tmp_path), \
         patch("exporter.ArticleRepository", return_value=mock_repo), \
         patch("exporter.get_session", return_value=mock_session_ctx):
        from exporter import export_to_website
        export_to_website()

    data = json.loads((tmp_path / "news.json").read_text())
    article = data["articles"][0]
    required = {"id", "title_ru", "summary_ru", "source_name", "url", "image_url",
                "category", "published_at", "channel"}
    assert required.issubset(article.keys())
```

- [ ] **Step 3: Запустить тесты — убедиться что они ПАДАЮТ (нет exporter.py)**

```bash
.venv/bin/python -m pytest tests/test_exporter.py -v 2>&1 | head -30
```

Ожидаемый вывод: `ImportError: No module named 'exporter'` или `ModuleNotFoundError`.

- [ ] **Step 4: Создать `exporter.py`**

```python
"""
Экспортер данных из SQLite в JSON для сайта-агрегатора.

Вызывается из channel_orchestrator.py после каждого дайджеста.
"""
from __future__ import annotations

import json
import logging
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from storage.database import get_session
from storage.models import Article
from storage.repository import ArticleRepository

logger = logging.getLogger(__name__)

CHANNELS = ["news", "events", "tourism", "gastronomy"]
DATA_DIR = Path(__file__).parent / "website" / "public" / "data"


def export_to_website() -> None:
    """Читает из SQLite, пишет JSON в website/public/data/."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).isoformat()

    with get_session() as session:
        repo = ArticleRepository(session)
        for channel in CHANNELS:
            articles = repo.get_latest_for_export(channel=channel, limit=50)
            data = {
                "updated_at": now,
                "channel": channel,
                "articles": [_to_dict(a) for a in articles],
            }
            out = DATA_DIR / f"{channel}.json"
            out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            logger.info("Экспорт %s: %d статей → %s", channel, len(articles), out)


def git_push_website(commit_message: str = "data: обновление данных сайта") -> None:
    """git add + commit + push для обновления Vercel."""
    subprocess.run(["git", "add", "website/public/data/"], check=True)
    # Пропускаем commit если нет изменений
    result = subprocess.run(["git", "diff", "--cached", "--quiet"], capture_output=True)
    if result.returncode == 0:
        logger.info("Нет изменений в данных сайта — git push пропущен")
        return
    subprocess.run(["git", "commit", "-m", commit_message], check=True)
    subprocess.run(["git", "push"], check=True)
    logger.info("Данные сайта обновлены и запушены на Vercel")


def _to_dict(a: Article) -> dict:
    return {
        "id": a.id,
        "title_ru": a.title_ru or a.title,
        "summary_ru": a.summary_ru or "",
        "source_name": a.source_name or "",
        "url": a.url,
        "image_url": a.image_url,
        "category": a.category or "другое",
        "published_at": a.published_at.isoformat() if a.published_at else "",
        "channel": a.channel,
    }
```

- [ ] **Step 5: Запустить тесты — убедиться что они ПРОХОДЯТ**

```bash
.venv/bin/python -m pytest tests/test_exporter.py -v
```

Ожидаемый вывод: `4 passed`.

- [ ] **Step 6: Commit**

```bash
git add exporter.py storage/repository.py tests/test_exporter.py
git commit -m "feat: exporter.py — JSON-экспорт из SQLite для сайта-агрегатора"
```

---

## Task 3: Интеграция экспортера в оркестратор

**Files:**
- Modify: `config.py`
- Modify: `orchestrator/channel_orchestrator.py`

- [ ] **Step 1: Добавить флаг `WEBSITE_EXPORT_ENABLED` в `config.py`**

Найти `class AppConfig` и добавить поле:

```python
# Автоматический экспорт данных на сайт после каждого дайджеста
website_export_enabled: bool = field(
    default_factory=lambda: os.getenv("WEBSITE_EXPORT_ENABLED", "false").lower() == "true"
)
```

- [ ] **Step 2: Вызвать экспортер из `run_all_digests` в `channel_orchestrator.py`**

```python
from exporter import export_to_website, git_push_website

# В конце метода run_all_digests, после цикла:
def run_all_digests(self, digest_type: str = "morning") -> None:
    """Запускает дайджест последовательно по всем каналам."""
    for channel, aggregator in self._aggregators.items():
        if channel == "events":
            aggregator.run_events_digest()
        else:
            aggregator.run_digest(digest_type=digest_type)

    if config.website_export_enabled:
        try:
            export_to_website()
            git_push_website()
        except Exception as exc:
            logger.error("Ошибка экспорта на сайт: %s", exc)
```

- [ ] **Step 3: Убедиться что импорт работает**

```bash
.venv/bin/python -c "from orchestrator.channel_orchestrator import ChannelOrchestrator; print('OK')"
```

Ожидаемый вывод: `OK`.

- [ ] **Step 4: Commit**

```bash
git add config.py orchestrator/channel_orchestrator.py
git commit -m "feat: вызывать exporter после дайджеста если WEBSITE_EXPORT_ENABLED=true"
```

---

## Task 4: Scaffold Next.js проекта

**Files:**
- Create: `website/.gitignore`
- Create: `website/package.json`
- Create: `website/tsconfig.json`
- Create: `website/next.config.ts`
- Create: `website/tailwind.config.ts`
- Create: `website/postcss.config.mjs`

- [ ] **Step 1: Создать `website/.gitignore`**

```
node_modules/
.next/
out/
```

- [ ] **Step 2: Создать `website/package.json`**

```json
{
  "name": "valencia-news-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.29",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.20",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 3: Создать `website/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Создать `website/next.config.ts`**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',           // статическая генерация — идеально для Vercel
  images: { unoptimized: true },  // нужно при output: 'export'
}

export default nextConfig
```

- [ ] **Step 5: Создать `website/tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Создать `website/postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

- [ ] **Step 7: Установить зависимости**

```bash
cd website && npm install
```

Ожидаемый вывод: `added NNN packages` без ошибок.

- [ ] **Step 8: Commit**

```bash
git add website/.gitignore website/package.json website/tsconfig.json \
        website/next.config.ts website/tailwind.config.ts website/postcss.config.mjs \
        website/package-lock.json
git commit -m "feat: scaffold Next.js 14 проекта для сайта-агрегатора"
```

---

## Task 5: Типы TypeScript + seed JSON

**Files:**
- Create: `website/src/types.ts`
- Create: `website/public/data/news.json`
- Create: `website/public/data/events.json`
- Create: `website/public/data/tourism.json`
- Create: `website/public/data/gastronomy.json`

- [ ] **Step 1: Создать директории**

```bash
mkdir -p website/src/app/components website/public/data
```

- [ ] **Step 2: Создать `website/src/types.ts`**

```typescript
export interface Article {
  id: number
  title_ru: string
  summary_ru: string
  source_name: string
  url: string
  image_url: string | null
  category: string
  published_at: string   // ISO 8601
  channel: string
}

export interface ExportFile {
  updated_at: string     // ISO 8601
  channel: string
  articles: Article[]
}
```

- [ ] **Step 3: Создать seed JSON для каждого канала**

`website/public/data/news.json`:
```json
{
  "updated_at": "2026-05-19T00:00:00+00:00",
  "channel": "news",
  "articles": []
}
```

Повторить с `channel: "events"`, `"tourism"`, `"gastronomy"` для остальных трёх файлов.

- [ ] **Step 4: Commit**

```bash
git add website/src/types.ts website/public/data/
git commit -m "feat: типы TypeScript + seed JSON для всех 4 каналов"
```

---

## Task 6: Глобальные стили и layout

**Files:**
- Create: `website/src/app/globals.css`
- Create: `website/src/app/layout.tsx`

- [ ] **Step 1: Создать `website/src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Скрыть scrollbar у TabBar на мобиле */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 2: Создать `website/src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Валенсия — новости и события',
  description: 'Новости, афиша, туризм и гастрономия Валенсии для русскоязычных',
  openGraph: {
    title: '🌊 Валенсия — новости и события',
    description: 'Свежие новости, афиша и гастрономия Валенсии',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Проверить TypeScript**

```bash
cd website && npx tsc --noEmit 2>&1 | head -20
```

Ожидаемый вывод: нет ошибок (пустой вывод или только warnings про missing next-env.d.ts).

- [ ] **Step 4: Commit**

```bash
git add website/src/app/globals.css website/src/app/layout.tsx
git commit -m "feat: globals.css + layout с метаданными"
```

---

## Task 7: Компоненты Header, TabBar, Footer

**Files:**
- Create: `website/src/app/components/Header.tsx`
- Create: `website/src/app/components/TabBar.tsx`
- Create: `website/src/app/components/Footer.tsx`

- [ ] **Step 1: Создать `website/src/app/components/Header.tsx`**

```tsx
'use client'
import { useEffect, useState } from 'react'

const TG_CHANNELS = [
  { emoji: '📰', label: 'Новости', href: 'https://t.me/Esp_Valencia_news' },
  { emoji: '🎭', label: 'Афиша', href: 'https://t.me/Esp_Valencia_events' },
  { emoji: '🏖️', label: 'Туризм', href: 'https://t.me/Esp_Spain_travel' },
  { emoji: '🍷', label: 'Гастрономия', href: 'https://t.me/Esp_Spain_food' },
]

export default function Header() {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    fetch('https://wttr.in/Valencia?format=%t+%C&lang=ru')
      .then(r => r.text())
      .then(t => setWeather(t.trim()))
      .catch(() => {})
  }, [])

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-black text-lg tracking-wide whitespace-nowrap">
            🌊 ВАЛЕНСИЯ
          </span>
          {weather && (
            <span className="text-white/60 text-sm truncate">{weather}</span>
          )}
        </div>
        <nav className="flex gap-1.5 flex-shrink-0">
          {TG_CHANNELS.map(ch => (
            <a
              key={ch.href}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              title={ch.label}
              className="text-white/80 hover:text-white text-base bg-white/10 hover:bg-white/20
                         rounded-full w-8 h-8 flex items-center justify-center transition-all"
            >
              {ch.emoji}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Создать `website/src/app/components/TabBar.tsx`**

```tsx
'use client'

const TABS = [
  { value: 'all',        label: 'Всё' },
  { value: 'news',       label: '📰 Новости' },
  { value: 'events',     label: '🎭 Афиша' },
  { value: 'tourism',    label: '🏖️ Туризм' },
  { value: 'gastronomy', label: '🍷 Гастрономия' },
]

interface TabBarProps {
  active: string
  onChange: (value: string) => void
}

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={[
            'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            active === tab.value
              ? 'bg-white text-teal-700 shadow-md'
              : 'bg-white/10 text-white hover:bg-white/20',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Создать `website/src/app/components/Footer.tsx`**

```tsx
const CHANNELS = [
  { label: '📰 Новости',     href: 'https://t.me/Esp_Valencia_news' },
  { label: '🎭 Афиша',       href: 'https://t.me/Esp_Valencia_events' },
  { label: '🏖️ Туризм',     href: 'https://t.me/Esp_Spain_travel' },
  { label: '🍷 Гастрономия', href: 'https://t.me/Esp_Spain_food' },
]

export default function Footer() {
  return (
    <footer className="mt-12 pb-10 px-4">
      <div
        className="max-w-4xl mx-auto rounded-2xl p-6 text-center border border-white/20"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-white font-semibold mb-1">Подписывайся на наши Telegram-каналы</p>
        <p className="text-white/60 text-sm mb-4">
          Новости, афиша, туризм и гастрономия Валенсии прямо в мессенджере
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {CHANNELS.map(ch => (
            <a
              key={ch.href}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white rounded-full
                         px-5 py-2 text-sm font-medium transition-all border border-white/20"
            >
              {ch.label}
            </a>
          ))}
        </div>
      </div>
      <p className="text-white/25 text-xs text-center mt-6">
        Valencia News © 2026
      </p>
    </footer>
  )
}
```

- [ ] **Step 4: Проверить TypeScript**

```bash
cd website && npx tsc --noEmit 2>&1 | head -20
```

Ожидаемый вывод: нет ошибок.

- [ ] **Step 5: Commit**

```bash
git add website/src/app/components/Header.tsx \
        website/src/app/components/TabBar.tsx \
        website/src/app/components/Footer.tsx
git commit -m "feat: компоненты Header (погода + Telegram), TabBar, Footer"
```

---

## Task 8: Компоненты ArticleCard и Feed

**Files:**
- Create: `website/src/app/components/ArticleCard.tsx`
- Create: `website/src/app/components/Feed.tsx`

- [ ] **Step 1: Создать `website/src/app/components/ArticleCard.tsx`**

```tsx
import type { Article } from '@/types'

const CHANNEL_EMOJI: Record<string, string> = {
  news: '📰',
  events: '🎭',
  tourism: '🏖️',
  gastronomy: '🍷',
}

function formatRelativeTime(iso: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3_600_000)
  if (h < 1) return 'только что'
  if (h < 24) return `${h}ч назад`
  const d = Math.floor(h / 24)
  if (d < 8) return `${d}д назад`
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      className="rounded-2xl border border-white/20 overflow-hidden flex flex-col"
      style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
    >
      {article.image_url && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={article.image_url}
          alt={article.title_ru}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
          <span>{CHANNEL_EMOJI[article.channel] ?? '📄'}</span>
          <span className="truncate">{article.source_name}</span>
          <span>·</span>
          <span className="whitespace-nowrap">{formatRelativeTime(article.published_at)}</span>
        </div>

        <h2 className="text-white font-semibold text-[15px] leading-snug mb-2">
          {article.title_ru}
        </h2>

        <p
          className="text-sm leading-relaxed mb-3 flex-1"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {article.summary_ru}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium transition-colors mt-auto"
          style={{ color: '#ccfbf1' }}
          onMouseOver={e => (e.currentTarget.style.color = '#ffffff')}
          onMouseOut={e => (e.currentTarget.style.color = '#ccfbf1')}
        >
          Читать оригинал →
        </a>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Создать `website/src/app/components/Feed.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { Article, ExportFile } from '@/types'
import TabBar from './TabBar'
import ArticleCard from './ArticleCard'

interface FeedProps {
  data: ExportFile[]
}

export default function Feed({ data }: FeedProps) {
  const [activeTab, setActiveTab] = useState('all')

  const all: Article[] = data.flatMap(f => f.articles)

  const filtered = activeTab === 'all'
    ? all
    : all.filter(a => a.channel === activeTab)

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  )

  return (
    <>
      <div
        className="sticky z-40 px-4 py-3"
        style={{ top: '56px', background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-4xl mx-auto">
          <TabBar active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {sorted.length === 0 ? (
          <p className="text-center py-16" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Нет материалов в этом разделе
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {sorted.map(a => (
              <ArticleCard key={`${a.channel}-${a.id}`} article={a} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
```

- [ ] **Step 3: Проверить TypeScript**

```bash
cd website && npx tsc --noEmit 2>&1 | head -30
```

Ожидаемый вывод: нет ошибок.

- [ ] **Step 4: Commit**

```bash
git add website/src/app/components/ArticleCard.tsx \
        website/src/app/components/Feed.tsx
git commit -m "feat: компоненты ArticleCard (glassmorphism) и Feed (фильтрация по каналу)"
```

---

## Task 9: Главная страница + финальная сборка

**Files:**
- Create: `website/src/app/page.tsx`

- [ ] **Step 1: Создать `website/src/app/page.tsx`**

```tsx
import { readFile } from 'fs/promises'
import path from 'path'
import type { ExportFile } from '@/types'
import Header from './components/Header'
import Feed from './components/Feed'
import Footer from './components/Footer'

const CHANNELS = ['news', 'events', 'tourism', 'gastronomy']

async function loadData(): Promise<ExportFile[]> {
  const dataDir = path.join(process.cwd(), 'public', 'data')
  const results: ExportFile[] = []

  for (const channel of CHANNELS) {
    try {
      const raw = await readFile(path.join(dataDir, `${channel}.json`), 'utf-8')
      results.push(JSON.parse(raw) as ExportFile)
    } catch {
      // JSON ещё не создан экспортером — используем пустышку
      results.push({ updated_at: '', channel, articles: [] })
    }
  }

  return results
}

export default async function HomePage() {
  const data = await loadData()

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #1d4ed8 100%)' }}
    >
      <Header />
      <Feed data={data} />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Запустить `next build` — убедиться что сборка проходит**

```bash
cd website && npm run build 2>&1 | tail -20
```

Ожидаемый вывод:
```
Route (app)          Size     First Load JS
┌ ○ /                ...      ...
└ ○ _not-found       ...      ...
✓ Compiled successfully
```

Если ошибки — исправить TypeScript/import проблемы и повторить.

- [ ] **Step 3: Проверить статическую генерацию локально**

```bash
cd website && npx serve out -p 3000 &
# Открыть http://localhost:3000 в браузере
# Убедиться что страница открывается, отображаются табы, карточки (пустые при seed JSON)
```

- [ ] **Step 4: Commit**

```bash
git add website/src/app/page.tsx
git commit -m "feat: главная страница — сервер-компонент читает JSON, рендерит Feed"
```

---

## Task 10: Деплой на Vercel

Этот таск выполняет человек, не агент.

- [ ] **Step 1: Убедиться что `website/public/data/*.json` committed в git**

```bash
git status website/public/data/
# Все 4 JSON-файла должны быть tracked (не в .gitignore)
```

- [ ] **Step 2: Создать аккаунт на vercel.com** (если нет)

Зайти на `vercel.com` → Sign up with GitHub.

- [ ] **Step 3: Подключить репозиторий**

1. New Project → Import Git Repository → выбрать `Valencia_news`
2. **Root Directory:** `website`
3. **Framework Preset:** Next.js (определится автоматически)
4. **Build Command:** `next build` (по умолчанию)
5. Deploy

- [ ] **Step 4: После первого деплоя — получить URL сайта**

Vercel даст URL вида `valencia-news-XXXX.vercel.app`.

- [ ] **Step 5: Проверить что данные появляются**

Запустить вручную:
```bash
WEBSITE_EXPORT_ENABLED=true .venv/bin/python -c "
from exporter import export_to_website, git_push_website
export_to_website()
git_push_website()
"
```

Vercel должен задетектировать push и пересобрать сайт (~30 сек).

---

## Spec Coverage Check

| Требование из спецификации | Таск |
|---|---|
| Next.js 14, App Router, TypeScript | Task 4 |
| Tailwind CSS | Task 4 |
| Статические JSON в `website/public/data/` | Task 2, 5 |
| Градиент `#0d9488 → #0891b2 → #1d4ed8` | Task 9 (page.tsx) |
| Glassmorphism карточки | Task 8 (ArticleCard) |
| Header с логотипом + погода wttr.in + иконки Telegram | Task 7 |
| Фильтр по каналам (TabBar) — без перезагрузки страницы | Task 7, 8 |
| Лента 2 колонки на десктопе, 1 на мобиле | Task 8 (Feed grid) |
| Карточка: фото, бейдж, источник, время, заголовок RU, саммари RU, ссылка | Task 8 (ArticleCard) |
| Footer с кнопками на все 4 Telegram-канала | Task 7 |
| Последние 50 статей на канал, только с summary_ru | Task 2 (repository) |
| Сортировка по published_at DESC | Task 8 (Feed sort) |
| exporter.py вызывается после дайджеста | Task 3 |
| git commit + push → Vercel auto-rebuild | Task 3 (git_push_website) |
| title_ru сохраняется в БД | Task 1 |
