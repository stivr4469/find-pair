# Architecture: Spanish Trainer App

> Read this file at the start of every session to skip codebase exploration.
> **Update this file whenever modules, data structures, or conventions change.**

---

## Tech stack

- **Vanilla JS** — no build step, no framework, no npm
- **Plain HTML + CSS** — script tags at bottom of `<body>`
- **Vercel** — auto-deploy on push to `main` (remote: `github.com:stivr4469/find-pair.git`)
- **Telegram WebApp SDK** — loaded in root `index.html` only

---

## Project root layout

```
spanish-trainer-app/
├── index.html              ← Main menu (lists all modules as cards)
├── css/
│   ├── unified-styles.css  ← Shared styles for all modules
│   └── main.css            ← Styles for root index.html only
├── js/
│   ├── utils.js            ← Shared utilities (shuffleArray, speakSpanish)
│   └── main.js             ← Root page JS (Telegram init, closeApp)
├── find-pair/              ← Module 1: Найди пару (vocabulary matching game)
├── tren/                   ← Module 2: Глаголы движения (ir/venir/llegar conjugation)
├── ser-estar/              ← Module 3: Ser vs Estar
├── formulas/               ← Module 4: 36 Формул (grammar formulas + quiz)
└── pasado/                 ← Module 5: Прошедшее время (PLANNED, not yet created)
```

---

## Module 4 template (formulas/) — canonical pattern for new modules

Every quiz module follows this exact 4-file structure:

```
formulas/
├── index.html   ← HTML shell, loads 4 scripts, defines layout
├── data.js      ← All content: formulas array with quiz questions
├── ui.js        ← All rendering: injects HTML into <main id="formulas-content">
└── app.js       ← State machine: handles user interaction, game logic
```

### index.html

```html
<link rel="stylesheet" href="../css/unified-styles.css?v=11">
<!-- module-local styles in <style> block -->
<div class="back-button-container">
  <a href="../" class="back-button">← Назад в меню</a>
</div>
<header class="app-header"><h1>📚 36 Формул испанского</h1></header>
<section id="score-area" class="score-display hidden">...</section>
<main id="formulas-content" class="formulas-main"></main>
<footer class="app-footer">...</footer>

<script src="../js/utils.js?v=12"></script>
<script src="data.js?v=12"></script>
<script src="ui.js?v=12"></script>
<script src="app.js?v=12"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof FormulasApp !== 'undefined') { FormulasApp.init(); }
  });
</script>
```

**Cache-busting protocol:** when any script changes, bump `?v=N` by 1 in ALL four `<script>` tags in the same module's `index.html`. Current version in formulas: **v=12**.

---

## data.js — formula data structure

```js
const FORMULAS_DATA = [
  {
    id: 1,                         // sequential integer starting at 1
    name: "Формула 1: Прилагательные",
    shortName: "Прилагательные",   // used in quiz badge
    emoji: "🎨",
    description: "...",
    rule: "sustantivo + adjetivo", // grammar rule in Spanish notation
    example: "El coche rojo",      // main example sentence
    exampleRu: "Красная машина",   // Russian translation of main example
    examples: [                    // 6–8 additional example pairs
      { es: "...", ru: "..." },
    ],
    quiz: [                        // 6 MCQ questions (3 shown per session, shuffled)
      {
        question: "Russian prompt",
        options: ["A", "B", "C", "D"],  // exactly 4 options
        correct: 0,                      // index 0–3
        hint: "Russian explanation"
      },
      // × 6 total
    ]
  },
  // × 36 total formulas
];
```

**Key rule:** 6 questions per formula, 3 shown per quiz session (randomly shuffled). Gives C(6,3)=20 possible question combinations per retake.

---

## app.js — state machine

```js
const FormulasApp = {
  state: {
    currentView: 'list',          // 'list' | 'card' | 'quiz' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',           // 'single' | 'all'
    quizQuestions: [],            // active question objects (3 for single, all for all-quiz)
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
  },
  // methods: init, showList, showCard, showNextCard, showPrevCard,
  //          startSingleQuiz, startAllQuiz, handleAnswer, nextQuestion, showResults
};

// Window aliases for HTML onclick handlers:
window.formulaShowCard    = function(i) { FormulasApp.showCard(i); };
window.formulaStartQuiz   = function(i) { FormulasApp.startSingleQuiz(i); };
window.formulaHandleAnswer= function(i) { FormulasApp.handleAnswer(i); };
window.formulaNext        = function()  { FormulasApp.nextQuestion(); };
window.formulaBackToList  = function()  { FormulasApp.showList(); };
window.formulaShowPrev    = function()  { FormulasApp.showPrevCard(); };
window.formulaShowNext    = function()  { FormulasApp.showNextCard(); };
window.formulaStartAllQuiz= function()  { FormulasApp.startAllQuiz(); };
```

**Shuffle logic** (in `startSingleQuiz`):
```js
var pool = formula.quiz.map(function(q) {
  return Object.assign({}, q, { formulaId: formula.id, ... });
});
var shuffled = (typeof shuffleArray === 'function') ? shuffleArray(pool) : pool;
var questions = shuffled.slice(0, 3);
```

---

## ui.js — rendering

- Exports a global `FormulasUI` object
- All output: HTML strings injected into `document.getElementById('formulas-content').innerHTML`
- Helper `_escHtml(str)` to escape user-visible strings
- Renders four views: `renderFormulaList()`, `renderFormulaCard()`, `renderQuizQuestion()`, `renderResults()`
- Uses `onclick="formulaXxx(...)"` (window aliases) in generated HTML — **never inline `FormulasApp.xxx`**

---

## Shared utilities — js/utils.js

Exposed as `window.*` globals:

| Function | Signature | Purpose |
|---|---|---|
| `shuffleArray(array)` | `Array → Array` | Fisher-Yates shuffle, returns new array |
| `speakSpanish(text)` | `string → void` | Google TTS playback via `<Audio>` |

---

## Root index.html — module menu

Add new modules here as `<a href="MODULE_DIR/" class="game-card">` blocks inside `<nav class="games-menu">`. Current modules (in menu order):

| # | href | icon | title | difficulty |
|---|------|------|-------|-----------|
| 1 | find-pair/ | 🎮 | Найди пару | easy |
| 2 | tren/ | 🚂 | Глаголы движения | medium |
| 3 | ser-estar/ | 🎭 | Ser vs Estar | medium |
| 4 | formulas/ | 📚 | 36 Формул | hard/Грамматика |
| 5 | mezcla/ | 🌀 | Mezcla | medium/Чтение |
| 6 | pasado/ | ⏪ | Прошедшее время | hard/Грамматика |

---

## Module 5 — mezcla/ (смешанное чтение)

**Идея:** тексты с регулируемой долей испанских слов (0–100%). Каждый токен — смысловая фраза `{ru, es}`.

```
mezcla/
├── index.html    ← <main id="mezcla-content">, scripts with ?v=1
├── data.js       ← const MEZCLA_DATA = [...]  (6 текстов, ~58–61 токен каждый)
├── ui.js         ← const MezclaUI = {...}
└── app.js        ← const MezclaApp = {...}
                     window aliases prefix: mezclaXxx
```

**Структура токена:**
```js
{ ru: "пошёл в магазин", es: "fui a la tienda" }
```

**Тексты:** 🛒 Магазин · 🍽️ Ресторан · ✈️ Аэропорт · 🌳 Парк · 🤝 Знакомство · 🌦️ Погода

**Ключевые функции:**
- `mezclaSetPct(v)` — устанавливает % и пересчитывает `tokenLangs`
- `mezclaReshuffle()` — тот же %, другие случайные токены
- `mezclaTapToken(i)` — показать/скрыть перевод токена (tooltip)
- `MezclaApp._assignTokens(count, pct)` — Fisher-Yates shuffle для выбора токенов

**Cache-busting:** текущая версия `data.js`, `ui.js`, `app.js` — `?v=1`

---

## Module 6 — pasado/ (Прошедшее время)

**Состав:** 16 формул × 6 вопросов = 96 вопросов.

```
pasado/
├── index.html    ← <main id="pasado-content">, scripts with ?v=1
├── data.js       ← const PASADO_DATA = [...]  (16 formula objects)
├── ui.js         ← const PasadoUI = {...}
└── app.js        ← const PasadoApp = {...}
                     window aliases prefix: pasadoXxx
```

**Группы формул:**

| Группа | Время | Формулы |
|---|---|---|
| F1–F4 | Pretérito Indefinido | -AR, -ER/-IR, ser/ir/hacer/tener, stem-changing |
| F5–F8 | Pretérito Imperfecto | -AR, -ER/-IR, ser/ir/ver, употребление |
| F9–F12 | Pretérito Perfecto Compuesto | haber, правильные и нестанд. причастия, употребление |
| F13–F16 | Pluscuamperfecto | форма, употребление, нестанд. причастия, сравнение 4 времён |

**Naming:**
- Data: `PASADO_DATA` · App: `PasadoApp` · UI: `PasadoUI`
- Window aliases: `pasadoShowCard(i)`, `pasadoStartQuiz(i)`, `pasadoHandleAnswer(i)`, `pasadoNext()`, `pasadoBackToList()`, `pasadoShowPrev()`, `pasadoShowNext()`, `pasadoStartAllQuiz()`
- Container id: `pasado-content`

---

## Naming conventions summary

| Concern | Pattern | Example |
|---|---|---|
| Data global | `UPPER_MODULE_DATA` | `FORMULAS_DATA`, `PASADO_DATA`, `MEZCLA_DATA` |
| App global | `ModuleApp` | `FormulasApp`, `PasadoApp`, `MezclaApp` |
| UI global | `ModuleUI` | `FormulasUI`, `PasadoUI`, `MezclaUI` |
| Window aliases | `moduleFunctionName` | `formulaStartQuiz`, `pasadoStartQuiz`, `mezclaSetPct` |
| Main container id | `module-content` | `formulas-content`, `pasado-content`, `mezcla-content` |
| Score area id | `score-area` | same across quiz modules (not used in mezcla) |

---

## Deployment

- Branch: `main`
- Remote: `git@github.com:stivr4469/find-pair.git`
- Deploy: `git push origin main` → Vercel auto-deploys within ~30 seconds
- No CI, no tests, no build step

---

## Quick-start checklist for adding a new module

1. Create `MODULE_DIR/` with `data.js`, `app.js`, `ui.js`, `index.html`
2. Copy structure from `formulas/` — rename all `Formulas`/`formulas` occurrences
3. Set script `?v=1` in the new module's `index.html`
4. Add `<a href="MODULE_DIR/" class="game-card">` to root `index.html`
5. Push to `main` — Vercel deploys automatically
