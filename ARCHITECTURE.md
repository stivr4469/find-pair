# Architecture: VamoS — Spanish Trainer App

> **Читай этот файл в начале каждой сессии.** Он — единственный источник правды об архитектуре.
> Обновляй при любом изменении версий скриптов, CSS-классов, глобальных имён.

---

## Что это за приложение

**VamoS** — тренажёр испанского языка. Шесть независимых игровых модулей: карточки глаголов, спряжение, ser vs estar, грамматические формулы, чтение со смешением языков, прошедшее время. Запускается как веб-страница; деплоится на Vercel.

---

## Стек и ограничения

| Что | Как |
|-----|-----|
| Язык | Vanilla JS — никаких `import`, никакого TypeScript |
| Шаблон | Plain HTML + Plain CSS — никакого React, Vue, Svelte |
| Сборка | **Нет** — `python3 -m http.server 3001` для локального запуска |
| npm | **Нет** — все зависимости через CDN `<script>` |
| Тесты | **Нет** — ручная проверка через Playwright или браузер |
| Деплой | `git push origin main` → Vercel auto-deploy (~30 с) |
| Репо | `git@github.com:stivr4469/find-pair.git` |
| Vercel проект | `find-pair-new` (НЕ `find-pair-seven` — тот дубль, надо удалить) |

### Cache-busting — обязательно

При изменении любого `.js` или `.css` файла нужно увеличить `?v=N` в `index.html` модуля.
Без этого браузер отдаст старую версию из кэша.

---

## Структура проекта

```
spanish-trainer-app/
├── index.html              ← Главное меню (карточки-ссылки на модули)
├── CLAUDE.md               ← Инструкции для AI-сессий
├── ARCHITECTURE.md         ← Этот файл
├── SUMMARY.MD              ← Журнал изменений
├── css/
│   ├── unified-styles.css  ← Единые стили всех модулей (v=20)
│   └── main.css            ← Стили только для root index.html
├── js/
│   ├── utils.js            ← Общие утилиты: shuffleArray, speakSpanish, toggleTheme,
│   │                          normalizeSpanish, ICON_VOL, ICON_MIC (v=21)
│   ├── naranjito.js        ← Маскот Naranjito — анимированный персонаж (v=2)
│   ├── orange-throw.js     ← Анимация броска апельсина в корзинку (v=4)
│   └── main.js             ← Root page JS (Telegram init, closeApp)
├── find-pair/              ← Модуль 1: Найди пару
├── tren/                   ← Модуль 2: Глаголы движения (ir/venir/llegar)
├── ser-estar/              ← Модуль 3: Ser vs Estar
├── formulas/               ← Модуль 4: 36 Формул испанского
├── mezcla/                 ← Модуль 5: Mezcla (смешанное чтение)
└── pasado/                 ← Модуль 6: Прошедшее время (4 времени)
```

---

## Канонический шаблон модуля (4 файла)

```
module/
├── index.html   ← HTML-оболочка; загружает скрипты через <script src="...?v=N">
├── data.js      ← Все данные в глобальном объекте MODULE_DATA
├── ui.js        ← Рендеринг: вставляет HTML в <main id="module-content">
└── app.js       ← Контроллер: обрабатывает клики, управляет состоянием
```

Все переменные — **глобальные** (`window.XXX`). Никаких ES-модулей.

---

## Версии файлов (актуально на 2026-09-24)

| Файл | Версия в HTML |
|------|--------------|
| `css/unified-styles.css` | v=24 |
| `js/utils.js` | v=21 |
| `js/naranjito.js` | v=2 |
| `js/orange-throw.js` | v=4 *(новый)* |
| `formulas/app.js` | v=18 |
| `formulas/ui.js` | v=24 |
| `formulas/data.js` | v=13 |
| `pasado/app.js` | v=7 |
| `pasado/ui.js` | v=13 |
| `pasado/data.js` | v=3 |
| `tren/app.js` | v=14 |
| `mezcla/app.js` | v=8 |
| `mezcla/ui.js` | v=10 |
| `ser-estar/ser-estar-app.js` | v=4 |
| `ser-estar/ser-estar-mode2.js` | v=6 |
| `ser-estar/ser-estar-context-ui.js` | v=6 |
| `ser-estar/classify-ui.js` | v=9 |
| `ser-estar/classify-mode.js` | v=4 |
| `find-pair/script.js` | v=3 |

---

## CSS — unified-styles.css (v=20) — дизайн-система «Валенсия»

### Токены (CSS-переменные)

```css
/* Светлая тема (default) */
--bg:           #FBF6EF   /* тёплый песочный фон */
--surface:      #FFFFFF   /* карточки, панели */
--text:         #1C1917
--muted:        #78716C   /* вспомогательный текст */
--faint:        #EDE8E0   /* очень слабый фон */
--border:       rgba(28,25,23,0.10)
--accent:       #F26B1D   /* оранжевый — главный акцент */
--accent-faint: rgba(242,107,29,0.10)
--accent-mid:   rgba(242,107,29,0.25)
--success:      #22c55e
--danger:       #ef4444
--shadow:       многослойный box-shadow
--radius:       14px
--font:         'Nunito', system-ui

/* Тёмная тема — [data-theme="dark"] */
--bg:      #14110F
--surface: #1F1B18
--text:    #F5EFE8
--muted:   #A8A29E
--faint:   #2A2420
--accent:  #FF7A2E
```

### Ключевые CSS-классы

```css
/* Шаблон макета */
.game-area          — основная игровая зона (max-width 760px, padding 16px)
.back-button-container — строка с кнопками "← Назад" и переключателем темы
.back-button        — стиль кнопки «←»
.mode-button        — кнопка выбора режима на главном экране модуля
.next-button        — кнопка «Дальше →»
.quiz-next-fixed    — position:fixed; bottom:20px — кнопка «Дальше» внизу экрана

/* Топбар */
.se-topbar          — компактный топбар с названием и статистикой
.se-topbar-title    — заголовок в топбаре
.se-stat-pill       — таблетка со значением в топбаре
.se-progress-bar-wrap / .se-progress-bar-track / .se-progress-fill — прогресс-бар

/* Цветные точки/квадраты (замена emoji) */
.dot                — inline-block, 9×9px, border-radius 50% (круг)
.dot-sq             — квадрат (border-radius 2px)
.dot-orange         — background: var(--accent)
.dot-blue           — #3b82f6
.dot-green          — #22c55e
.dot-purple         — #a855f7
.dot-red            — #ef4444
.dot-teal           — #14b8a6
.dot-yellow         — #eab308
.dot-pink           — #ec4899

/* Ser vs Estar: classify-зоны */
.classify-zones     — flex row, full-width
.classify-zone-ser  — indigo #6366F1
.classify-zone-estar — green #10B981
.zone-label / .zone-hint — текст внутри зоны
```

---

## Shared utilities — js/utils.js (v=21)

| Функция / константа | Описание |
|---------------------|----------|
| `shuffleArray(arr)` | Fisher-Yates, возвращает новый массив |
| `speakSpanish(text)` | **Отключён** — возвращает сразу. TTS не работает |
| `toggleTheme()` | Переключает `data-theme` на `<html>`, пишет в `localStorage('vamos:theme')` |
| `setTopbarStreak(n)` | Обновляет `#streak-value` в топбаре |
| `setTopbarScore(n)` | Обновляет `#score-value` в топбаре |
| `setTopbarProgress(pct)` | Обновляет `#se-progress-fill` (ширина в %) |
| `resetTopbar()` | Сбрасывает все значения топбара в 0 |
| `normalizeSpanish(str)` | Убирает `¿¡?!.`, trailing subject pronouns, пробелы → lowercase. Нужен для сравнения ответов без учёта пунктуации |
| `window.ICON_VOL` | Inline SVG строка: иконка "volume-2" (17×17px). Использовать внутри `<button>` |
| `window.ICON_MIC` | Inline SVG строка: иконка "microphone" (17×17px) |

### Почему ICON_VOL/ICON_MIC в utils.js

Lucide иконки требуют `lucide.createIcons()` после вставки `<i data-lucide>` в DOM. В секциях фидбека (`feedbackEl.innerHTML = '...'`) этот вызов не всегда происходит — иконки пропадают. Inline SVG решает проблему: работает сразу в любом `innerHTML`.

---

## Иконки: текущий подход

**Правило:** `<i data-lucide="...">` **запрещён** в JS-генерируемом HTML (ui.js).

| Назначение | Что использовать |
|-----------|-----------------|
| Цветовой маркер режима/категории | `<span class="dot dot-ЦВЕТ"></span>` |
| Кнопка TTS «Послушать» | `window.ICON_VOL` внутри `<button>` |
| Декоративный значок карточки | Цветной `<div>` с `border-radius` и `background: FORMULA_ICONS[i].bg` |
| Статичный HTML (index.html) | `<i data-lucide="...">` + `lucide.createIcons()` в конце `<body>` |

### Паттерн TTS-кнопки

```js
// Правильно — inline SVG, работает везде
'<button class="pasado-tts-btn" data-tts="' + text + '" onclick="speakSpanish(this.dataset.tts)">'
  + (window.ICON_VOL||'') + '</button>'

// Запрещено — после innerHTML lucide.createIcons() не вызывается
'<button><i data-lucide="volume-2"></i></button>'
```

### FORMULA_ICONS / PASADO_ICONS

Массивы хранят `{ icon, color, bg }`. Поле `icon` — имя Lucide иконки — **не используется** в рендеринге. Используются только `color` и `bg` для цветовых значков карточек:

```js
'<div style="width:28px;height:28px;border-radius:8px;background:' + FORMULA_ICONS[i].bg + ';"></div>'
```

---

## Двухуровневая навигация (все модули кроме find-pair)

```html
<!-- В index.html каждого модуля -->
<div class="back-button-container">
    <a href="../" class="back-button">← Главная</a>
    <button id="btn-back-to-XXX" class="back-button" style="display:none"
            onclick="ModuleApp.showXxx()">← Режимы</button>
    <button id="theme-toggle" onclick="toggleTheme()"></button>
</div>
```

| Модуль | ID кнопки | onclick |
|--------|-----------|---------|
| ser-estar | `btn-back-to-modes` | `SerEstarApp.showMainMenu()` |
| formulas | `btn-back-to-list` | `FormulasApp.backToList()` |
| pasado | `btn-back-to-list` | `PasadoApp.backToList()` |
| tren | `btn-back-to-modes` | `App.showMainMenu()` |

В `app.js` каждого модуля есть `_syncBackBtn()` — показывает/скрывает вторую кнопку в зависимости от `currentView`.

---

## Тёмная / светлая тема

- **Toggle:** кнопка `#theme-toggle` в каждом модуле, иконка через CSS `::after` (🌙/☀️)
- **Персистентность:** `localStorage('vamos:theme')` = `'light'` | `'dark'`
- **Anti-FOUC:** inline `<script>` в `<head>` читает localStorage до загрузки CSS:
  ```html
  <script>(function(){try{var t=localStorage.getItem('vamos:theme');if(t)document.documentElement.dataset.theme=t}catch(e){}}());</script>
  ```
- **Auto:** `@media (prefers-color-scheme: dark)` работает если пользователь не выбрал вручную
- **Механика:** `[data-theme="dark"]` на `<html>` переключает CSS-токены

---

## Нормализация ответов (normalizeSpanish)

Применяется в `formulas/app.js` и `pasado/app.js` как запасной сценарий: если выбранный индекс не совпадает с правильным, сравниваем нормализованные строки.

```js
var isCorrect = selectedIndex === question.correct;
if (!isCorrect && typeof normalizeSpanish === 'function') {
    var selNorm = normalizeSpanish(question.options[selectedIndex]);
    var crtNorm = normalizeSpanish(question.options[question.correct]);
    if (selNorm && selNorm === crtNorm) isCorrect = true;
}
```

Нормализует: убирает `¿¡?!.`, trailing subject pronoun (tú/yo/él/...), лишние пробелы, приводит к lowercase.

---

## Маскот Naranjito (naranjito.js v=2)

Анимированный персонаж над игровой карточкой. Подключён в **ser-estar, tren, formulas, pasado**.

### Монтирование

```js
// В DOMContentLoaded каждого app.js
var buddy = document.getElementById('buddy');
if (buddy && typeof Naranjito !== 'undefined') {
    _nj = Naranjito.mount(buddy);  // добавляет класс .nj на #buddy
    _nj.greet();
}
```

`Naranjito.mount()` добавляет класс `.nj` на контейнер `#buddy` — это CSS-хук для overflow-эффекта.

### API (window-алиасы)

| Алиас | Что делает |
|-------|-----------|
| `window.njCorrect(streak)` | Поощрение при правильном ответе (ser-estar, tren) |
| `window.njWrong(ruleEs, ruleRu)` | Подсказка при ошибке |
| `window.njResult(pct)` | Реакция на итоговый результат (0–100) |
| `window.njAddStreak()` | +1 к серии, возвращает текущее значение |
| `window.njResetStreak()` | Сброс серии |
| `window.njReset()` | Сброс bubble/анимации (без сброса серии) |

> formulas и pasado вызывают `_nj.correct()` / `_nj.wrong()` напрямую на экземпляре (не через window-алиасы).

### Событие 'vamos:correct' (v=2)

В `api.correct` добавлен dispatch:
```js
api.correct = async function(streak) {
    window.dispatchEvent(new CustomEvent('vamos:correct'));  // ← добавлено в v=2
    // ... остальная анимация
}
```
Это позволяет `orange-throw.js` перехватывать правильные ответы из **всех** модулей через один слушатель, не трогая каждый app.js отдельно.

### Overflow-into-card эффект

```css
/* unified-styles.css */
#buddy.nj { position: relative; z-index: 10; }
#buddy.nj ~ main.game-area:not(.hidden) {
    margin-top: -55px;   /* карточка заходит под ноги персонажа */
    padding-top: 72px;   /* контент не прячется под персонажем */
}
```

Для работы селектора `~ main.game-area` все `<main>` во всех модулях с Naranjito имеют класс `game-area`:
- ser-estar: `<main class="game-area hidden">` (несколько штук, toggle hidden)
- tren: `<main class="game-area hidden">`
- formulas: `<main class="formulas-main game-area">`
- pasado: `<main class="pasado-main game-area">`

---

## Orange throw — js/orange-throw.js (v=4)

Анимация броска апельсина в корзинку при правильном ответе. Подключён в ser-estar, tren, formulas, pasado (после последнего модульного скрипта, до `lucide.createIcons()`).

### Как работает

1. При загрузке страницы вставляет SVG-корзинку (`#orange-basket`) в `document.body`
2. Позиционирует её через JS: `position:fixed`, у правого края `#buddy`-контейнера, чуть выше персонажа
3. При скролле и resize пересчитывает позицию через `getBoundingClientRect()`
4. Слушает `window.addEventListener('vamos:correct', ...)` — при событии запускает анимацию

### Анимация броска

```js
orange.animate([
    { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)',     offset: 0    },
    { transform: 'translate(peakDx, peakDy) scale(1.18) rotate(155deg)', offset: 0.40 },
    { transform: 'translate(dx, dy) scale(0.42) rotate(310deg)',   offset: 1    }
], { duration: 1900, easing: 'linear', fill: 'forwards' });
```

Параметры: `peakDy = Math.min(dy * 0.25 - 75, -60)` — дуга всегда уходит вверх минимум на 60px.

### Корзинка SVG

70×66px, оранжевый цвет `#F26B1D`, rounded strokes — под стиль Naranjito:
- Ручка: дуга сверху
- Ободок: эллипс с заливкой `rgba(242,107,29,0.20)`
- Тело: path + заливка `rgba(242,107,29,0.10)`
- 3 вертикальных изогнутых прута + 3 горизонтальных дуги плетения

При попадании запускается `@keyframes basket-catch` (встряхивание + масштаб).

---

## Запрещённые паттерны

```js
// НЕЛЬЗЯ — сломается при спецсимволах в тексте
onclick="doSomething(${JSON.stringify(obj)})"
// Использовать: data-атрибуты + this.dataset.xxx

// НЕЛЬЗЯ — Lucide иконка в dynamic innerHTML (не будет отрисована)
feedbackEl.innerHTML = '<i data-lucide="volume-2"></i>';
// Использовать: (window.ICON_VOL||'')

// НЕЛЬЗЯ — inline style.display после анимации переопределяет CSS
element.style.display = 'block';
// Использовать: управление классами

// НЕЛЬЗЯ — TTS отключён, вызов бесполезен
speakSpanish(text);  // utils.js v=21 — функция есть, но ничего не делает

// НЕЛЬЗЯ — глобальная переменная window.* перезаписывается при переходах
window.currentItem = item;  // прочитается уже другой item
// Использовать: data-атрибуты или замыкание
```

---

## Модуль 1 — find-pair/

Игра на сопоставление пар (слово ↔ перевод). Нет под-режимов. Одноуровневая навигация.

```
find-pair/
├── index.html      ← utils.js?v=21, unified-styles.css?v=20, styles.css?v=3, script.js?v=3
├── script.js       ← основная логика
├── find-pair.js    ← вспомогательные функции
├── styles.css      ← модульные стили
└── find-pair.css
```

---

## Модуль 2 — tren/ (app.js v=14)

8 режимов (mode0–mode7) — спряжение и употребление ir/venir/llegar.

```
tren/
├── index.html          ← app.js?v=14, utils.js?v=21, naranjito.js?v=1
├── app.js              ← App.switchMode(), App.showMainMenu(), _syncBackBtn()
├── mode0-game.js       ← Базовое спряжение A1 (v=11)
├── mode0-options.js    ← Выбор глагола (v=10)
├── mode0-results.js    ← Результаты mode0 (v=12)
├── mode0-ui.js         ← Рендеринг mode0 (v=15)
├── mode1–7.js          ← Контроллеры режимов (v=12–13)
├── mode1–7-ui.js       ← Рендеринг режимов (v=14–16)
└── mode1–7-data.js     ← Данные режимов (v=10)
```

**Навигация:** `App.switchMode(id)` → показывает `#btn-back-to-modes`; `App.showMainMenu()` → скрывает.

---

## Модуль 3 — ser-estar/ (ser-estar-app.js v=3)

5 под-режимов: base, advanced, context, rules, classify.

```
ser-estar/
├── index.html                  ← ser-estar-app.js?v=3, utils.js?v=21, naranjito.js?v=1
├── ser-estar-app.js            ← SerEstarApp.switchMode(), .showMainMenu()
├── ser-estar-data.js           ← Данные спряжений
├── ser-estar-base-ui.js?v=3    ← Рендеринг базового режима
├── ser-estar-base-mode.js?v=2  ← Логика базового режима
├── ser-estar-mode2.js?v=6      ← Продвинутое спряжение A2
├── ser-estar-context-ui.js?v=6 ← Рендеринг контекстного режима
├── ser-estar-context-mode.js?v=2
├── ser-estar-rules-data.js?v=1 ← Данные для DOCTOR/PLACE правил
├── ser-estar-rules-ui.js?v=4
├── ser-estar-rules-mode.js
├── classify-data.js            ← Данные classify режима
├── classify-ui.js?v=8          ← Рендеринг classify
└── classify-mode.js?v=3        ← Логика classify
```

**Context mode:** вопрос показывается как карточка с CSS классами `.ctx-question-card`, `.ctx-question-text`, `.ctx-blank` (акцент + underline), `.ctx-translation`. Стили — inline `<style>` в `ser-estar/index.html`.

**Classify mode:** пользователь перетаскивает/нажимает SER или ESTAR зону. Ответ → `next-button` «Дальше →».

---

## Модуль 4 — formulas/ (app.js v=18, ui.js v=24)

36 грамматических формул, 6 вопросов MCQ к каждой.

```
formulas/
├── index.html    ← app.js?v=18, data.js?v=13, ui.js?v=24, utils.js?v=21
├── data.js       ← FORMULAS_DATA[36] — массив формул с id, name, rule, example, options
├── ui.js         ← FormulasUI + FORMULA_ICONS[36] (color/bg для значков)
└── app.js        ← FormulasApp, _syncBackBtn()
```

**Views:** `'list'` → `'card'` → `'quiz'` → `'results'`

**Режимы квиза:**
- `single` — 3 случайных вопроса из одной формулы
- `all` — все формулы по порядку
- `marathon` — 216 вопросов (36×6), циклически

**XP-система:** `_addXP(amount)` — в памяти, `#xp-counter` в HTML.

**State:**
```js
FormulasApp.state = {
    currentView: 'list',        // 'list' | 'card' | 'quiz' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',         // 'single' | 'all' | 'marathon'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
    marathonPool: [],
    marathonTotal: 0,
}
```

**Window aliases:** `formulaShowCard(i)`, `formulaStartQuiz(i)`, `formulaStartAllQuiz()`, `formulaStartMarathon()`, `formulaHandleAnswer(i)`, `formulaNext()`, `formulaBackToList()`, `formulaBackToCard()`, `formulaShowPrev()`, `formulaShowNext()`, `formulaSpeakExample(text)`

---

## Модуль 5 — mezcla/ (app.js v=8, ui.js v=10)

Смешанное чтение: регулируемый % испанских слов в тексте.

```
mezcla/
├── index.html    ← app.js?v=8, data.js?v=1, ui.js?v=10, utils.js?v=21
├── data.js       ← MEZCLA_DATA — встроенные тексты
├── ui.js         ← MezclaUI — рендеринг токенов, тултип с полным предложением
└── app.js        ← MezclaApp — токенизатор, Google Translate API
```

**Структура токена:**
```js
{ ru: "слово", es: "palabra", ruSent: "полное предложение RU", esSent: "oración completa ES" }
```

**Токенизация:** текст → разбивка по `.!?` → предложения → слова. `ruSent`/`esSent` нужны для тултипа (показывает полное предложение при тапе, а не только слово).

**Auto-translate:** один textarea для русского ввода → Google Translate unofficial API (`translate.googleapis.com`) → автозаполнение испанского.

**`_mClean(w)`:** срезает пунктуацию с краёв: `«"'¿¡(` и `»"'.,!?;:)`.

**Тултип:** `white-space: normal; max-width: 260px` — не вылезает за экран.

**Window aliases:** `mezclaSetPct(v)`, `mezclaReshuffle()`, `mezclaTapToken(i)`, `mezclaSubmitCustom()`

---

## Модуль 6 — pasado/ (app.js v=7, ui.js v=13)

4 прошедших времени, 16 формул × 6 вопросов = 96 вопросов.

```
pasado/
├── index.html    ← app.js?v=7, data.js?v=3, ui.js?v=13, utils.js?v=21
├── data.js       ← PASADO_DATA[16], PASADO_INLINE, PASADO_CLASSIFY
├── ui.js         ← PasadoUI + PASADO_ICONS[16] (color/bg), CSS инжектируется в <head>
└── app.js        ← PasadoApp, _syncBackBtn()
```

**Views:** `'list'` → `'card'` → `'quiz'` | `'inline'` | `'classify'` → `'results'`

**Режимы:**
- `single` — 6 вопросов по одной формуле
- `all` — циклическая очередь: неправильные ответы возвращаются в конец
- `inline` — вставить пропущенное слово в предложение
- `classify` — распределить глагол по временам

**State:**
```js
PasadoApp.state = {
    currentView: 'list',
    currentFormulaIndex: 0,
    quizMode: 'single',         // 'single' | 'all' | 'inline' | 'classify'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
    streak: 0,
    cyclicPool: [],
    cyclicCorrectCount: 0,
    cyclicTotal: 0,
}
```

**Группы формул:**

| Формулы | Время | Содержание |
|---------|-------|------------|
| F1–F4 | Pretérito Indefinido | -AR, -ER/-IR, ser/ir/hacer/tener, стеблевые |
| F5–F8 | Pretérito Imperfecto | -AR, -ER/-IR, ser/ir/ver, употребление |
| F9–F12 | Pretérito Perfecto Compuesto | haber, причастия, употребление |
| F13–F16 | Pluscuamperfecto | форма, употребление, нерег. причастия, сравнение 4 времён |

**Window aliases:** `pasadoShowCard(i)`, `pasadoStartQuiz(i)`, `pasadoStartAllQuiz()`, `pasadoHandleAnswer(i)`, `pasadoNext()`, `pasadoBackToList()`, `pasadoBackToCard()`, `pasadoShowPrev()`, `pasadoShowNext()`, `pasadoStartInline()`, `pasadoInlineAnswer(v)`, `pasadoStartClassify()`, `pasadoClassifyAnswer(k)`

---

## Именование глобалов

| Слой | Паттерн | Примеры |
|------|---------|---------|
| Данные | `UPPER_MODULE_DATA` | `FORMULAS_DATA`, `PASADO_DATA`, `MEZCLA_DATA` |
| Контроллер | `ModuleApp` | `FormulasApp`, `PasadoApp`, `MezclaApp`, `SerEstarApp`, `App` (tren) |
| Рендеринг | `ModuleUI` | `FormulasUI`, `PasadoUI`, `MezclaUI` |
| Window-алиасы | `moduleFunctionName` | `formulaStartQuiz`, `pasadoStartQuiz`, `mezclaSetPct` |
| Иконки-массивы | `MODULE_ICONS` | `FORMULA_ICONS[36]`, `PASADO_ICONS[16]` |

---

## Топбар — структура (все модули)

```html
<!-- В index.html каждого модуля -->
<header class="se-topbar">
    <h1 class="se-topbar-title"><b>Название</b></h1>
    <div class="se-topbar-stats">
        <div class="se-stat-pill">
            <span class="dot dot-orange"></span>
            <span id="streak-value">0</span>          <!-- стрик -->
        </div>
        <div class="se-stat-pill">
            <span id="score-value">0</span>
            <span class="se-stat-label">очк.</span>   <!-- очки -->
        </div>
    </div>
</header>
<div class="se-progress-bar-wrap">
    <div class="se-progress-bar-track">
        <div id="se-progress-fill" class="se-progress-fill"></div>
    </div>
</div>
```

Управляется через `setTopbarStreak()`, `setTopbarScore()`, `setTopbarProgress()` из utils.js.

---

## Главное меню — root index.html

| № | href | Название |
|---|------|---------|
| 1 | find-pair/ | Найди пару |
| 2 | tren/ | Tren Ir/Venir/Llegar |
| 3 | ser-estar/ | Ser vs Estar |
| 4 | formulas/ | 36 Формул |
| 5 | mezcla/ | Mezcla |
| 6 | pasado/ | Прошедшее время |

---

## Чеклист: добавить новый модуль

1. Создать `NEW_MODULE/` с `data.js`, `app.js`, `ui.js`, `index.html`
2. За образец взять `formulas/` — заменить все вхождения `Formulas`/`formulas`
3. В `index.html`:
   - Anti-FOUC скрипт в `<head>`
   - Google Fonts Nunito
   - Кнопка `#theme-toggle`
   - Двухуровневая навигация (`← Главная` + скрытый `← Список/Режимы`)
   - Все скрипты с `?v=1`
4. В `app.js` добавить `_syncBackBtn()`, вызывать при каждой смене `currentView`
5. Добавить карточку в root `index.html`
6. `git push origin main`

---

## Открытые задачи

- [ ] Удалить Vercel-проект `find-pair-seven` (дубль, лимит 100 деплоев/день)
- [ ] TTS — `speakSpanish()` отключён в utils.js — нужно решение (Web Speech API или ElevenLabs)
- [ ] Карточки повторения ошибок (localStorage)
- [ ] Оставшиеся `<i data-lucide>` в pasado/ui.js и formulas/ui.js — badge в quiz и результатах (не TTS, но также missed bulk-removal)

---

*Последнее обновление: 2026-09-24 (продолжение 3)*
