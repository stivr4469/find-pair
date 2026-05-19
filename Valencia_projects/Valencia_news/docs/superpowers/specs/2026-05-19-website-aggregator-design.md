# Сайт-агрегатор Valencia News — Спецификация

## Цель

Современный публичный сайт-агрегатор новостей и событий Валенсии для русскоязычной аудитории. Читает данные из существующей системы Valencia News Bot и публикуется автоматически на Vercel при каждом обновлении.

## Архитектура

**Подход:** Next.js статический сайт + JSON-экспорт из Python бота.

```
[Python бот] ──exporter.py──▶ [website/public/data/*.json] ──git push──▶ [Vercel]
     │
 SQLite БД (articles, summary_ru, image_url, channel...)
```

После каждого дайджеста (2 раза в день) бот:
1. Вызывает `exporter.py` → пишет JSON в `website/public/data/`
2. Делает `git commit + push`
3. Vercel автоматически пересобирает сайт (~30 сек)

**Стек:**
- Next.js 14, App Router, TypeScript
- Tailwind CSS
- Без базы данных и API на фронтенде — только статические JSON

## Структура репозитория

```
Valencia_news/
├── website/                    ← Next.js проект (новый)
│   ├── public/
│   │   └── data/
│   │       ├── news.json
│   │       ├── events.json
│   │       ├── tourism.json
│   │       └── gastronomy.json
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx        ← главная страница
│   │       ├── layout.tsx      ← общий layout
│   │       └── components/
│   │           ├── Header.tsx
│   │           ├── TabBar.tsx
│   │           ├── ArticleCard.tsx
│   │           ├── Feed.tsx
│   │           └── Footer.tsx
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── exporter.py                 ← новый модуль экспорта (новый)
└── ... (остальное без изменений)
```

## Страницы

Одна главная страница `/` — весь контент на ней.

### Шапка (Header)
- Логотип: `🌊 ВАЛЕНСИЯ` (белый текст на градиенте)
- Погода Валенсии: виджет через `wttr.in` (бесплатно, без API-ключа)
- Иконки-ссылки на Telegram-каналы

### Фильтры (TabBar)
Таблетки-кнопки: `[Всё] [📰 Новости] [🎭 Афиша] [🏖️ Туризм] [🍷 Гастрономия]`
- Активный таб — белый фон
- Фильтрация работает на клиенте через React state, без перезагрузки страницы

### Лента статей (Feed)
Вертикальный список карточек. На мобиле — 1 колонка, на десктопе — 2 колонки.

**Карточка (ArticleCard):**
- Фото статьи (если есть в `image_url`)
- Бейдж канала + название источника + время публикации
- Заголовок на русском (`title_ru`)
- Саммари на русском (`summary_ru`, 2–3 предложения)
- Кнопка «Читать оригинал →» — ссылка на `url`

**Стиль:** glassmorphism — `background: rgba(255,255,255,0.12)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.2)`, `border-radius: 16px`

### Подвал (Footer)
- Текст «Подписывайся на наши Telegram-каналы»
- Кнопки на все 4 канала (Новости / Афиша / Туризм / Гастрономия)

## Дизайн

**Фон страницы:**
```css
background: linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #1d4ed8 100%);
min-height: 100vh;
```

**Цвета:**
- Основной фон: тёмный бирюзово-синий градиент
- Карточки: полупрозрачный glassmorphism
- Текст заголовков: белый (`#ffffff`)
- Текст саммари: `rgba(255,255,255,0.85)`
- Мета-информация: `rgba(255,255,255,0.55)`
- Активный таб: белый фон + тёмный текст
- Акцент / ссылки: `#ccfbf1` (светло-бирюзовый)

**Шрифт:** системный (`system-ui, -apple-system, sans-serif`)

## Формат JSON-экспорта

```typescript
// Один файл на канал: news.json, events.json, tourism.json, gastronomy.json
interface ExportFile {
  updated_at: string;       // ISO 8601
  channel: string;          // "news" | "events" | "tourism" | "gastronomy"
  articles: Article[];
}

interface Article {
  id: number;
  title_ru: string;
  summary_ru: string;
  source_name: string;
  url: string;
  image_url: string | null;
  category: string;
  published_at: string;     // ISO 8601
  channel: string;
}
```

**Параметры экспорта:**
- Последние 50 статей на канал (всего 200 статей)
- Только статьи с `summary_ru` — пустые пропускаются
- Сортировка: `published_at DESC`

## Модуль exporter.py

```python
# Интерфейс (не реализация)
def export_to_website() -> None:
    """Читает из SQLite, пишет JSON в website/public/data/."""

def git_push_website(commit_message: str) -> None:
    """git add + commit + push для обновления Vercel."""
```

Вызывается из `orchestrator/channel_orchestrator.py` после каждого успешного дайджеста.

## Деплой

1. Создать аккаунт на Vercel (бесплатно)
2. Подключить git-репозиторий
3. Указать `Root Directory: website`
4. Vercel автоматически определяет Next.js и настраивает сборку
5. После первого деплоя — каждый `git push` пересобирает сайт

## Погода

Используем `wttr.in` — бесплатный сервис без API-ключа:
```
https://wttr.in/Valencia?format=%t+%C&lang=ru
```
Запрос делается с клиента при загрузке страницы (`useEffect`).

## Что не входит в скоп

- Поиск по тексту статей (можно добавить позже)
- Страницы отдельных статей (только карточки на главной)
- Пагинация (показываем последние 50 на канал)
- Авторизация / личный кабинет
- Комментарии
