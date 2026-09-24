# Spanish Trainer App — Журнал изменений

> Журнал накапливается, не перезаписывается. Новые записи — сверху.
> Для текущих версий файлов → смотри ARCHITECTURE.md (раздел «Версии файлов»).

---

## Сессия: 2026-09-25 — Пилот: обогащение контента pasado/

### Стратегия
Все модули механически достаточны, но данные (data.js) поверхностны —
hint-тексты объясняют «что», но не «почему». Пилот на pasado/ проверяет подход,
после чего тот же шаблон применяется ко всем остальным модулям и новому subjuntivo/.

### Новые типы вопросов (единая схема для всех модулей)

**type:'fill'** — fill-in-the-blank без клавиатуры:
- Предложение с пропуском `___`
- 4 кликабельные плитки с формами глагола
- Пользователь нажимает → форма встаёт в пропуск → проверка
- Поля: `sentence`, `sentenceRu`, `verb`, `tiles[]`, `correct`, `hint`

**contrasts[]** — карточки контраста двух времён:
- Режим просмотра (не квиз): Indefinido vs Imperfecto на одном экране
- Поля: `indefinido`, `indefinidoRu`, `imperfecto`, `imperfectoRu`, `signal`, `rule`

**Обогащённый hint** — формат «СИГНАЛ → ПРАВИЛО → ФОРМА»:
- Было: "Indefinido yo (-AR): stem + é"
- Стало: "«Ayer» = маркер однократного прошлого (Indefinido)\nЗавершённое действие\nhablar + yo → hablé"

### Файлы к изменению
- `pasado/data.js` v=3→v=4: новая схема, fill-вопросы, contrasts[], улучшенные hints
- `pasado/ui.js` v=13→v=15: рендер fill-карточки, режим Контраст
- `pasado/app.js` v=7→v=8: логика selectTile(), режим Контраст

### Открытые задачи после пилота
- [ ] Применить fill+contrast+hint ко всем модулям: tren/, formulas/, ser-estar/, mezcla/
- [ ] Построить subjuntivo/ как новый полноценный модуль на обогащённом шаблоне
- [ ] Удалить Vercel-проект find-pair-seven

---

## Сессия: 2026-09-24 (продолжение 3)

### 1. Classify mode — исправление двух багов

**Баг 1:** при нескольких неправильных ответах подряд кнопка «Дальше →» накапливалась (N штук в DOM).
- `ser-estar/classify-mode.js?v=3→v=4`: `showClassifyNextButton()` теперь сначала удаляет старые `.next-button` через `querySelectorAll().forEach(b => b.remove())`
- `ser-estar/classify-ui.js?v=8→v=9`: `showClassifyCard()` тоже чистит `.next-button` при переходе к следующему вопросу

**Баг 2:** bubble Naranjito от предыдущего вопроса был виден поверх следующей карточки.
- `ser-estar/classify-mode.js?v=4`: в `showNextClassifyQuestion()` добавлен вызов `window.njReset && window.njReset()`
- `ser-estar/ser-estar-app.js?v=3→v=4`: добавлен отсутствующий `window.njReset = function() { if (_nj) _nj.reset(); }` — метод `reset()` в naranjito.js существовал, но экспортирован не был

**Коммит:** несколько коммитов, итог: `classify-ui.js v=9`, `classify-mode.js v=4`, `ser-estar-app.js v=4`

---

### 2. Naranjito overflow-into-card эффект

**Задача:** персонаж визуально «вылезает» за нижний край своего контейнера и нависает над карточкой.

**Решение:** CSS sibling-селектор — срабатывает только когда Naranjito смонтирован (`.nj` добавляется `mount()`) и `<main>` виден:

```css
#buddy.nj { position: relative; z-index: 10; }
#buddy.nj ~ main.game-area:not(.hidden) {
    margin-top: -55px;
    padding-top: 72px;
}
```

- `css/unified-styles.css?v=20→v=21`: добавлен блок overflow-эффекта
- Все 6 `index.html`: `unified-styles.css?v=20→v=21`

**Унификация `game-area`:** ранее formulas и pasado использовали классы `.formulas-main`/`.pasado-main` вместо `.game-area`, поэтому CSS-селектор их не захватывал:
- `formulas/index.html`: `<main class="formulas-main">` → `<main class="formulas-main game-area">`
- `pasado/index.html`: `<main class="pasado-main">` → `<main class="pasado-main game-area">`
- mezcla пропущена намеренно (Naranjito там не используется)

**Коммиты:** `02566e2`, `44749ca`

---

### 3. Orange throw — бросок апельсина в корзинку при правильном ответе

**Идея:** при каждом правильном ответе Naranjito бросает апельсин 🍊 в корзинку сбоку.

**Архитектура:**
- `naranjito.js?v=1→v=2`: в начало `api.correct` добавлен `window.dispatchEvent(new CustomEvent('vamos:correct'))` — единая точка уведомления для всех модулей
- `js/orange-throw.js?v=4` (новый файл): слушает `'vamos:correct'`, вставляет SVG-корзинку в DOM, анимирует апельсин через `Web Animations API`
- `css/unified-styles.css?v=21→v=24`: стили `#orange-basket`, анимация `basket-catch`, класс `.flying-orange`

**Позиция корзинки:** `position: fixed`, top/left вычисляются JS через `getBoundingClientRect()` от `#buddy` — правый край buddy-контейнера (= правый конец карточки), чуть выше персонажа. При скролле пересчитывается через `scroll`-листенер.

**Анимация броска:** 3 keyframe-а, 1900ms, траектория — парабола вправо и вверх, апельсин вращается (0°→310°), при попадании корзинка встряхивается (`basket-catch @keyframes`).

**SVG корзинки:** 70×66px, оранжевый (#F26B1D), ручка сверху, заливка тела `rgba(242,107,29,0.10)`, 3 вертикальных прута + 3 горизонтальных дуги плетения. Стиль под Naranjito: `stroke-linecap="round"`, толстые штрихи.

**Подключена в:** `ser-estar/index.html`, `tren/index.html`, `formulas/index.html`, `pasado/index.html`

**Итоговые версии:** `naranjito.js v=2`, `orange-throw.js v=4`, `unified-styles.css v=24`

**Коммиты:** `ee72da0`, `fd7c4d8`, `5b49957`, `22ffe50`

---

## Открытые задачи (обновлено 2026-09-24)

- [ ] Удалить Vercel-проект `find-pair-seven` (дубль, лимит 100 деплоев/день)
- [ ] TTS — `speakSpanish()` отключён в utils.js — нужно решение (Web Speech API или ElevenLabs)
- [ ] Карточки повторения ошибок (localStorage)
- [ ] Оставшиеся `<i data-lucide>` в pasado/ui.js и formulas/ui.js (quiz badge/результаты — не TTS, пропущены при bulk-удалении)

---

## Сессия: 2026-09-24 (продолжение 2)

### TTS-иконки: восстановление speaker-кнопок после случайного удаления

**Задача:** предыдущий bulk-скрипт удалил все `<i data-lucide>` включая функциональные кнопки TTS «Послушать». Восстановить их с современными иконками.

**Решение:** добавить `window.ICON_VOL` и `window.ICON_MIC` как inline SVG строки в `utils.js`. Inline SVG работает в любом `innerHTML` без вызова `lucide.createIcons()`.

**Что сделано:**
- `js/utils.js?v=20→v21`:
  - Добавлена вспомогательная `_svgIcon(paths, size)` → строит SVG-строку
  - `window.ICON_VOL` = Lucide volume-2 SVG (17px) — для кнопок «Послушать»
  - `window.ICON_MIC` = Lucide mic SVG (17px) — для будущих кнопок записи
- `formulas/ui.js?v=23→v24`:
  - Добавлен `(window.ICON_VOL||'')` в 3 TTS-кнопки (`.formula-tts-ex-btn`, «Послушать», `#formula-feedback-tts`)
  - Заменён `<i data-lucide>` в значке карточки формулы → `<div>` с `background: FORMULA_ICONS[i].bg`
- `pasado/ui.js?v=12→v13`:
  - Добавлен `(window.ICON_VOL||'')` в 5 TTS-кнопок (в detail card, main example, quiz question, quiz feedback × 2)
  - Заменён `<i data-lucide>` в значке карточки формулы → аналогично formulas
- Все 6 `index.html` модулей: `utils.js?v=20 → v21`

**Коммит:** `d04403a`

---

## Сессия: 2026-09-24 (продолжение 1)

### Глобальный редизайн: шрифт Nunito + компактный топбар + фиксированная кнопка «Дальше»

**Задача:** привести все модули к единому Duolingo-стилю.

**Что сделано:**
- `css/unified-styles.css?v=16`:
  - Шрифт `--font` изменён с `'Inter'` на `'Nunito'`
  - Добавлены классы: `.se-topbar`, `.se-topbar-title`, `.se-vs`, `.se-topbar-stats`, `.se-stat-pill`, `.se-stat-label`, `.se-progress-bar-wrap`, `.se-progress-bar-track`, `.se-progress-fill`
  - Добавлен `.quiz-next-fixed` — `position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%)` для кнопок «Дальше»
- Все `index.html` (ser-estar, formulas, pasado, tren, mezcla, find-pair):
  - Подключён `Nunito:wght@400;500;600;700;800;900` через Google Fonts
  - CSS обновлён до `v=16`
  - Убраны `<header class="app-header">` и `<section class="score-display">`
  - Добавлен компактный топбар с `.se-topbar` + прогресс-бар
- `formulas/ui.js?v=20`: убран дублирующий h2 "36 Формул Испанского"; кнопка «Дальше» получила `.quiz-next-fixed`
- `pasado/ui.js?v=8`: убран дублирующий h2 "Прошедшее время"; 3 кнопки «Дальше» получили `.quiz-next-fixed`
- `tren/mode0-7-ui.js` (все bumped): кнопки «Дальше» + `padding-bottom: 80px`
- `ser-estar-base-ui.js?v=2`, `ser-estar-mode2.js?v=5`: кнопки «Дальше» + `.quiz-next-fixed`
- `ser-estar-app.js?v=2`: добавлены `seUpdateStreak`, `seUpdateScore`, `seSetProgress`, `window.njAddStreak`, `window.njResetStreak`

**Коммит:** `607dee8`

---

## Сессия: 2026-09-24 (начало — совпадает с датой)

### Удаление всех emoji → CSS цветные точки; удаление всех Lucide иконок из кнопок и карточек

**Контекст:** три изменения шли последовательно в одной сессии.

#### 1. Толерантность к пунктуации в проверке ответов

**Задача:** ответ "Cómo te llamas?" помечался неверным, если правильный был "¿Cómo te llamas tú?" (разные знаки препинания).

- `js/utils.js?v=19→v20`: добавлена `normalizeSpanish(str)` — убирает `¿¡?!.`, trailing pronoun, нормализует пробелы
- `formulas/app.js?v=17→v18`: запасное сравнение через `normalizeSpanish` после провала индексного
- `pasado/app.js?v=6→v7`: то же в `handleAnswerCyclic` и `handleAnswer`
- **Коммит:** `ab0cc1c`

#### 2. Замена emoji на CSS цветные точки/квадраты

**Задача:** полностью убрать все emoji из интерфейса (🔥 стрик, ✅❌ ответы, режимы с 🎨⚡ и т.д.).

- `css/unified-styles.css?v=19→v20`: добавлены `.dot`, `.dot-sq`, `.dot-tri`, `.dot-orange/blue/green/purple/red/teal/yellow/pink`
- `ser-estar/index.html`: кнопки режимов — `<span class="dot dot-ЦВЕТ">` вместо emoji; стрик-пилюля — `<span class="dot dot-orange">`
- `mezcla/ui.js?v=9→v10`: карточки — цветные квадраты по индексу (6 цветов) вместо emoji
- Все `tren/mode*-ui.js` + `mode*.js`: убраны emoji-префиксы из строк результатов/фидбека
- **Коммит:** `0c572cb`

#### 3. Удаление всех Lucide иконок из JS-генерируемого HTML

**Задача:** Lucide иконки в карточках и кнопках мешали дизайну. Убрать все из `data.js`, `ui.js`, `app.js`.

**Принцип:** `<i data-lucide>` работает только при статичном HTML + `lucide.createIcons()`. В `innerHTML` фидбека не работает — поэтому перешли на inline SVG (`window.ICON_VOL`).

- Bulk-удаление regex `<i\s+data-lucide=["\'][^"\']+["\'][^>]*>(?:.*?</i>|</i>)` из 20 JS-файлов через Python
- `formulas/ui.js?v=22→v23`: значки карточек формул → цветные `<div>` с `FORMULA_ICONS[i].bg`; кнопки режимов → без иконок
- `pasado/ui.js?v=11→v12`: то же + значки групп → цветные квадраты
- **Побочный эффект:** случайно удалены TTS-кнопки `volume-2` (исправлено в следующей записи ↑)
- **Коммит:** `3ac570b`

---

## Сессия: 2026-09-23 (продолжение 3)

### ser-estar / Context mode — улучшение отображения вопроса

**Задача:** вопросная карточка выглядела скромно (мелкий текст 1.3rem, прочерк просто `___`, перевод сверху). Привести к стилю демо-скриншота.

**Что сделано:**
- `ser-estar/ser-estar-context-ui.js?v=3→v4`:
  - Порядок элементов: счётчик → вопрос → перевод → кнопки (был: счётчик → перевод → вопрос)
  - Счётчик: "ВОПРОС N ИЗ M · ВСТАВЬ SER ИЛИ ESTAR" в uppercase с letter-spacing
  - Новые CSS-классы: `.ctx-question-card`, `.ctx-progress-label`, `.ctx-question-text`, `.ctx-blank`, `.ctx-translation`
- `ser-estar/index.html`:
  - Добавлен `<style>` блок: `.ctx-question-card` (surface card, `var(--shadow)`), `.ctx-question-text` (2rem, 700), `.ctx-blank` (var(--accent) + underline), `.ctx-translation` (var(--muted), italic)
  - Версия bumped: `ser-estar-context-ui.js?v=4`

**Коммит:** `362f11e` (приблизительно, тот же день)

---

## Сессия: 2026-09-23 (продолжение 2)

### Замена всех emoji на Lucide SVG иконки

**Задача:** убрать все emoji (🎨⚡❓✅❌🔊🔥) из всего приложения — заменить на Lucide SVG иконки.
> Примечание: это промежуточный шаг. В следующей сессии Lucide тоже были убраны — итоговое состояние: inline SVG + CSS dots.

**Что сделано:**
- `formulas/ui.js?v=18`: добавлен `FORMULA_ICONS[36]` (module-level array: icon name + color + bg); `renderFormulaList`, `renderFormulaCard`, `renderQuiz`, `showAnswerFeedback`, `renderResults` — все emoji → `<i data-lucide="...">` Lucide-иконки
- `formulas/app.js?v=14→v15`: `formulaEmoji: formula.emoji` → `formulaEmoji: FORMULA_ICONS[(formula.id||1)-1].icon` (3 места)
- `pasado/ui.js?v=6`: добавлен `PASADO_ICONS[16]` (module-level); все виды — 🔊→`volume-2`, 🔥→`flame`, ✅→`check-circle-2`, ❌→`x-circle`; `lucide.createIcons()` вызывается после каждого `innerHTML`
- `pasado/app.js?v=3→v4`: то же что formulas — `formulaEmoji` передаёт имя иконки
- `tren/mode0-6*.js?v=10→v11`: ✅/❌ → `✓`/`✗` (textContent-места); 🔊 → Lucide `volume-2` в `mode5-ui.js`
- `ser-estar/ser-estar-base-mode.js?→v1`, `ser-estar-mode2.js?v=3→v4`, `ser-estar-mode3.js`, `ser-estar-mode4.js`: ✅/❌ → `✓`/`✗`
- `ser-estar/classify-ui.js?v=5→v6`: 🔊 → Lucide `volume-2`; добавлен `lucide.createIcons()`

**Версии в index.html обновлены:** formulas/app.js v15, pasado/app.js v4, tren modes v11, classify-ui.js v6, ser-estar-base-mode.js v1, ser-estar-mode2.js v4

**Коммит:** `9e4ed1d`

---

## Сессия: 2026-09-23 (продолжение)

### Финальная правка цветов: formulas/ui.js и pasado/ui.js

**Задача:** убрать все оставшиеся жёсткие цвета (`#667eea`, `#2c3e50`, `white` и т.д.) из JS-генерируемого HTML в обоих модулях — чтобы тёмная тема работала везде без исключений.

**Что сделано:**
- `formulas/ui.js?v=17→v18`:
  - `renderFormulaCard` — badge, rule box, main example, Послушать кнопка, "Ещё примеры" label, Пред./След. кнопки
  - `renderQuiz` — option buttons, option letter badges, formula badge, progress bar, counter text, вопрос
  - `showAnswerFeedback` — TTS кнопка в feedback box
  - `renderResults` — иконка, h2, score, pct, progress bar, текст
- `pasado/ui.js?v=5→v6`:
  - Инжектируемые CSS стили (`pasado-tts-btn`, `pasado-inline-btn`, `inline-question-text`, `pasado-prog-bar/fill`)
  - `renderFormulaList` — card thumbs, секционные лейблы, кнопки режимов (Полный тест / Inline / Классификация), заголовок
  - `renderFormulaCard` — badge, h2/p, rule box, main example, extra examples, Пред./След. кнопки
  - `renderQuiz` — options, option letters, badge, close btn, counter, question text, hover handlers
  - `renderInlineQuestion` — badge, close btn, counter, sentence box, label
  - `renderClassifyQuestion` — badge, close btn, counter, classify card
  - `renderResults` — иконка, h2, score, pct, progress bar, текст

**Коммит:** `9052f27`

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

### Адаптация всех модулей под стиль «Валенсия» + тёмная тема

**Задача:** привести все модули к единому стилю главной страницы, добавить переключатель тема день/ночь.

**Что сделано:**
- `css/unified-styles.css?v=14` — полная перепись:
  - Добавлен блок CSS-токенов (`--bg`, `--surface`, `--text`, `--muted`, `--faint`, `--border`, `--accent`, `--accent-faint`, `--shadow`, `--radius`, `--font`)
  - Светлая тема: тёплый песочный фон `#FBF6EF`, белые карточки, оранжевый акцент `#F26B1D`
  - Тёмная тема `[data-theme="dark"]` + `@media (prefers-color-scheme: dark)`: фон `#14110F`, карточки `#1F1B18`, акцент `#FF7A2E`
  - Паттерн точек + оранжевое свечение сверху (body::before)
  - Все жёсткие цвета (#667eea, #764ba2, white) заменены на CSS-переменные
  - Добавлены стили `#theme-toggle` (иконка из CSS: 🌙/☀️ через `::after`)
  - `score-area`, `progress` — теперь используют `var(--faint)` и `var(--border)`
- `js/utils.js?v=18` — добавлена функция `toggleTheme()`: читает/пишет `localStorage('vamos:theme')`, переключает `document.documentElement.dataset.theme`
- Все 6 модулей (`formulas`, `pasado`, `tren`, `ser-estar`, `mezcla`, `find-pair`):
  - Добавлена anti-FOUC инлайн-скрипт в `<head>` (читает `localStorage` до загрузки CSS)
  - Добавлен шрифт Inter (Google Fonts)
  - Добавлена кнопка `<button id="theme-toggle">` в `.back-button-container`
  - Версия CSS обновлена до `?v=14`, utils.js до `?v=18`
- `formulas/index.html` — все инлайн-стили обновлены под CSS-переменные (`.formula-card`, `.formula-detail`, `.quiz-option`, `.btn-primary`, `.btn-secondary`, `.all-quiz-btn`, `#xp-counter`)

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
