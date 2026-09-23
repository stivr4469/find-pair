# Spanish Trainer App — Журнал изменений

---

## Сессия: 2026-09-23

### Двухуровневая навигация (formulas, pasado, tren)

**Задача:** из под-режима возвращать к меню модуля, а не на главную страницу.

**Что сделано:**
- `formulas/index.html` — добавлена кнопка `← Список` (hidden, `id="btn-back-to-list"`) → `FormulasApp.backToList()`
- `pasado/index.html` — то же самое
- `tren/index.html` — добавлена кнопка `← Режимы` (hidden, `id="btn-back-to-modes"`) → `App.showMainMenu()`
- `formulas/app.js?v=14` — добавлен `_syncBackBtn()`, вызывается в `showList`, `showCard`, `startSingleQuiz`, `startAllQuiz`, `startMarathon`, `showResults`
- `pasado/app.js?v=3` — то же, плюс `startInline`, `startClassify`
- `tren/app.js?v=11` — `switchMode()` показывает кнопку, `showMainMenu()` скрывает

**Коммит:** `4966b61`

---

## Сессия: до 2026-09-23 (из SUMMARY предыдущей сессии)

### ser-estar — двухуровневая навигация

- `ser-estar/index.html` — добавлена кнопка `← Режимы` → `SerEstarApp.showMainMenu()`
- `ser-estar-app.js` — `switchMode()` показывает кнопку, `showMainMenu()` скрывает
- Все модули: кнопка `← Назад в меню` переименована в `← Главная`

**Коммит:** `9950ce4`

### CSS — unified-styles.css (v=13)

- `.option-btn`, `.button-option` — indigo/purple стиль вместо серого
- Добавлены классы `.classify-zones`, `.classify-zone`, `.classify-zone-ser` (indigo), `.classify-zone-estar` (green), `.zone-label`, `.zone-hint`

### ser-estar/classify-mode.js (v=3)

- Кнопка «Дальше →» теперь использует класс `next-button` (был `classify-next-btn`)

### mezcla/ — word-level токенизация (app.js?v=6, ui.js?v=6)

- Токены на уровне слов, не строк/предложений
- Авто-разбивка по `.!?` перед отправкой в Google Translate
- Поле `ruSent`/`esSent` — полное предложение для tooltip
- `_mClean(w)` — обрезает пунктуацию с краёв слова
- Tooltip: `white-space: normal`, `max-width: 260px` — не вылезает за экран
- Один textarea для Russian input → автоперевод через Google Translate API

---

## Сессия: 25 февраля 2026

### tren/ — Mode 5 (Контекст)

- База расширена до 80 упражнений
- Дейктическая логика, мастер предлогов, идиомы
- Визуальная замена прочерков после ответа
- TTS через Web Speech API

### Архитектурные улучшения

- Cyclic queue (`shift → push`) — бесконечный режим без повторов
- Smart Hints — лингвистическое объяснение к каждому вопросу
- Нормализация ввода — игнорирует `¡!¿?` и лишние пробелы

---

## Открытые задачи

- [ ] Удалить Vercel-проект `find-pair-seven` (дубль, лимит 100 деплоев/день)
- [ ] TTS — в `js/utils.js` `speakSpanish()` отключён (возвращает сразу) — нужно решить
- [ ] Карточки повторения для ошибок (localStorage)
- [ ] Игрофикация: уровни и достижения за серии
