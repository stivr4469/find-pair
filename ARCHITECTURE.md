# Architecture: VamoS — Spanish Trainer App

> Read this file at the start of every session to skip codebase exploration.
> **Update this file whenever modules, data structures, or conventions change.**

---

## Tech stack

- **Vanilla JS** — no build step, no framework, no npm
- **Plain HTML + CSS** — script tags at bottom of `<body>`
- **Vercel** — auto-deploy on push to `main` (remote: `github.com:stivr4469/find-pair.git`, project: `find-pair-new`)
- **Telegram WebApp SDK** — loaded in root `index.html` only

---

## Project root layout

```
spanish-trainer-app/
├── index.html              ← Main menu (lists all modules as cards)
├── css/
│   ├── unified-styles.css  ← Shared styles for all modules (current: v=14)
│   └── main.css            ← Styles for root index.html only
├── js/
│   ├── utils.js            ← Shared utilities: shuffleArray, speakSpanish, toggleTheme (v=18)
│   └── main.js             ← Root page JS (Telegram init, closeApp)
├── find-pair/              ← Module 1: Найди пару (vocabulary matching game)
├── tren/                   ← Module 2: Глаголы движения (ir/venir/llegar conjugation)
├── ser-estar/              ← Module 3: Ser vs Estar
├── formulas/               ← Module 4: 36 Формул (grammar formulas + quiz)
├── mezcla/                 ← Module 5: Mezcla (mixed reading, word-level)
└── pasado/                 ← Module 6: Прошедшее время (4 past tenses)
```

---

## Two-level back navigation (all modules except find-pair)

Every module that has sub-views (card/quiz/modes) has **two** back buttons in `back-button-container`:

```html
<div class="back-button-container">
    <a href="../" class="back-button">← Главная</a>
    <button id="btn-back-to-XXX" class="back-button" style="display:none"
            onclick="ModuleApp.showXxx()">← Список / Режимы</button>
</div>
```

| Module | Button label | onclick | Show when |
|---|---|---|---|
| ser-estar | ← Режимы | `SerEstarApp.showMainMenu()` | any sub-mode active |
| formulas | ← Список | `FormulasApp.backToList()` | currentView ≠ 'list' |
| pasado | ← Список | `PasadoApp.backToList()` | currentView ≠ 'list' |
| tren | ← Режимы | `App.showMainMenu()` | any mode active |

Each app controller has `_syncBackBtn()` (formulas, pasado) or inline logic (ser-estar, tren) to show/hide the button.

---

## Dark / Light theme

All modules support dark mode via `[data-theme="dark"]` on `<html>`.

- **Toggle**: `#theme-toggle` button in `.back-button-container` of every module
- **Persistence**: `localStorage('vamos:theme')` (`'light'` | `'dark'`)
- **Anti-FOUC**: inline `<script>` in `<head>` reads localStorage before CSS loads
- **Auto**: `@media (prefers-color-scheme: dark)` activates dark tokens when no manual choice is stored
- **Toggle function**: `toggleTheme()` in `js/utils.js?v=18`
- **CSS icon**: `#theme-toggle::after { content: '🌙' }` / `[data-theme="dark"] #theme-toggle::after { content: '☀️' }`

---

## CSS — unified-styles.css (v=14) — Valencia Design System

CSS token block (`:root`):
```css
--bg           #FBF6EF (warm sandy)  →  dark: #14110F
--surface      #FFFFFF               →  dark: #1F1B18
--text         #1C1917               →  dark: #F5EFE8
--muted        #78716C               →  dark: #A8A29E
--faint        #EDE8E0               →  dark: #2A2420
--border       rgba(28,25,23,0.10)   →  dark: rgba(255,255,255,0.09)
--accent       #F26B1D               →  dark: #FF7A2E
--accent-faint rgba(242,107,29,0.10) →  dark: rgba(255,122,46,0.13)
--shadow       layered box-shadow
--radius       14px
--font         'Inter', system-ui
```

Key classes:

```css
/* Option buttons — use tokens */
.option-btn, .button-option {
    background: var(--surface);
    border: 1.5px solid var(--border);
    color: var(--text);
}

/* SER/ESTAR classify zones */
.classify-zones         — flex row, full-width container
.classify-zone          — base zone style
.classify-zone-ser      — indigo (SER), color: #6366F1 (works both themes)
.classify-zone-estar    — green (ESTAR), color: #10B981
.zone-label             — large label inside zone
.zone-hint              — subtitle inside zone
```

---

## Module structure (canonical 4-file pattern)

Every quiz module follows this structure:

```
module/
├── index.html   ← HTML shell, loads scripts with ?v=N
├── data.js      ← All content data
├── ui.js        ← Rendering: injects HTML into <main id="module-content">
└── app.js       ← State machine: handles interaction, game logic
```

---

## Module 1 — find-pair/

Simple matching game. No sub-modes. Single-level navigation (← Главная only).

```
find-pair/
├── index.html   ← loads script.js?v=3, unified-styles.css?v=13
├── script.js
├── find-pair.js
├── styles.css
└── find-pair.css
```

---

## Module 2 — tren/ (app.js?v=11)

8 modes (mode0–mode7), each in separate `modeN.js` + `modeN-ui.js` + `modeN-data.js`.

```
tren/
├── index.html        ← app.js?v=11, utils.js?v=16
├── app.js            ← App.switchMode(), App.showMainMenu(), _syncBackBtn inline
├── mode0–7-data.js
├── mode0–7-ui.js
└── mode0–7.js
```

**Navigation:** `App.switchMode(modeId)` shows `#btn-back-to-modes`; `App.showMainMenu()` hides it.

---

## Module 3 — ser-estar/

5 sub-modes: base, advanced, context, rules, classify.

```
ser-estar/
├── index.html              ← ser-estar-app.js (no ?v)
├── ser-estar-app.js        ← SerEstarApp.switchMode(), .showMainMenu()
├── ser-estar-data.js
├── ser-estar-base-ui.js / ser-estar-base-mode.js
├── ser-estar-mode2.js?v=3  ← advanced mode
├── ser-estar-context-ui.js?v=3 / ser-estar-context-mode.js?v=2
├── ser-estar-rules-ui.js?v=2 / ser-estar-rules-mode.js
├── classify-data.js
├── classify-ui.js?v=5
└── classify-mode.js?v=3    ← handleClassifyChoice(), uses 'next-button' CSS class
```

**Classify mode:** tap SER or ESTAR zone. Wrong answer shows feedback + `next-button` styled "Дальше →". `updateClassifyGlobalScore()` updates `#score-value`.

---

## Module 4 — formulas/ (app.js?v=14)

36 grammar formulas, 6 MCQ questions each, 3 shown per session.

```
formulas/
├── index.html    ← app.js?v=15, data.js?v=13, ui.js?v=18
├── data.js       ← FORMULAS_DATA (36 items)
├── ui.js         ← FormulasUI + FORMULA_ICONS[36] (Lucide icon map)
└── app.js        ← FormulasApp, has _syncBackBtn()
```

**Views:** `'list'` | `'card'` | `'quiz'` | `'results'`

**Modes:** `single` (3 random from 1 formula) | `all` (all formulas shuffled) | `marathon` (216 questions, cyclic)

**XP system:** `_addXP(amount)` — in-memory counter, `#xp-counter` widget in HTML.

**State:**
```js
state: {
    currentView: 'list',       // 'list' | 'card' | 'quiz' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',        // 'single' | 'all' | 'marathon'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0, totalAnswered: 0, isAnswered: false,
    marathonPool: [], marathonTotal: 0,
}
```

**Window aliases:** `formulaShowCard(i)`, `formulaStartQuiz(i)`, `formulaStartAllQuiz()`, `formulaStartMarathon()`, `formulaHandleAnswer(i)`, `formulaNext()`, `formulaBackToList()`, `formulaBackToCard()`, `formulaShowPrev()`, `formulaShowNext()`, `formulaSpeakExample(text)`

---

## Module 5 — mezcla/ (app.js?v=6, ui.js?v=6)

Mixed reading: adjustable % of Spanish words. Word-level tokenization.

```
mezcla/
├── index.html    ← data.js?v=1, ui.js?v=6, app.js?v=6
├── data.js       ← MEZCLA_DATA (built-in texts)
├── ui.js         ← MezclaUI, tooltip shows full sentence
└── app.js        ← MezclaApp, word-level tokenizer, Google Translate API
```

**Token structure:**
```js
{ ru: "слово", es: "palabra", ruSent: "полное предложение RU", esSent: "oración completa ES" }
```

**Word-level tokenization:** input split by `.!?` → sentences → words. `ruSent`/`esSent` stored for tooltip (full sentence shown on tap, not just the word pair).

**Auto-translate:** single textarea for Russian input → Google Translate unofficial API (`translate.googleapis.com`) → ES sentences auto-filled.

**`_mClean(w)`:** strips leading/trailing punctuation from words (`«"'¿¡(` and `»"'.,!?;:)`).

**Tooltip:** `white-space: normal; max-width: 260px; line-height: 1.4` — wraps to avoid overflow.

**Window aliases:** `mezclaSetPct(v)`, `mezclaReshuffle()`, `mezclaTapToken(i)`, `mezclaSubmitCustom()`

---

## Module 6 — pasado/ (app.js?v=4)

4 past tenses, 16 formulas × 6 questions = 96 questions total.

```
pasado/
├── index.html    ← app.js?v=4, data.js?v=2, ui.js?v=6
├── data.js       ← PASADO_DATA (16 items), PASADO_INLINE, PASADO_CLASSIFY
├── ui.js         ← PasadoUI + PASADO_ICONS[16] (Lucide icon map)
└── app.js        ← PasadoApp, has _syncBackBtn()
```

**Views:** `'list'` | `'card'` | `'quiz'` | `'inline'` | `'classify'` | `'results'`

**Modes:** `single` | `all` (cyclic — wrong answers go back to queue) | `inline` | `classify`

**State:**
```js
state: {
    currentView: 'list',
    currentFormulaIndex: 0,
    quizMode: 'single',        // 'single' | 'all' | 'inline' | 'classify'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0, totalAnswered: 0, isAnswered: false, streak: 0,
    cyclicPool: [], cyclicCorrectCount: 0, cyclicTotal: 0,
}
```

**Timing groups:**
| Group | Tense | Formulas |
|---|---|---|
| F1–F4 | Pretérito Indefinido | -AR, -ER/-IR, ser/ir/hacer/tener, stem-changing |
| F5–F8 | Pretérito Imperfecto | -AR, -ER/-IR, ser/ir/ver, usage |
| F9–F12 | Pretérito Perfecto Compuesto | haber, regular/irregular participles, usage |
| F13–F16 | Pluscuamperfecto | form, usage, irregular participles, 4-tense comparison |

**Window aliases:** `pasadoShowCard(i)`, `pasadoStartQuiz(i)`, `pasadoStartAllQuiz()`, `pasadoHandleAnswer(i)`, `pasadoNext()`, `pasadoBackToList()`, `pasadoBackToCard()`, `pasadoShowPrev()`, `pasadoShowNext()`, `pasadoStartInline()`, `pasadoInlineAnswer(v)`, `pasadoStartClassify()`, `pasadoClassifyAnswer(k)`

---

## Shared utilities — js/utils.js (v=17)

| Function | Signature | Notes |
|---|---|---|
| `shuffleArray(array)` | `Array → Array` | Fisher-Yates, returns new array |
| `speakSpanish(text)` | `string → void` | **Currently disabled** (returns immediately) |

---

## Naming conventions

| Concern | Pattern | Example |
|---|---|---|
| Data global | `UPPER_MODULE_DATA` | `FORMULAS_DATA`, `PASADO_DATA`, `MEZCLA_DATA` |
| App global | `ModuleApp` | `FormulasApp`, `PasadoApp`, `MezclaApp` |
| UI global | `ModuleUI` | `FormulasUI`, `PasadoUI`, `MezclaUI` |
| Window aliases | `moduleFunctionName` | `formulaStartQuiz`, `pasadoStartQuiz`, `mezclaSetPct` |
| Main container id | `module-content` | `formulas-content`, `pasado-content`, `mezcla-content` |
| Score area id | `score-area` or `score-display` | varies by module |

---

## Root index.html — module menu

| # | href | title |
|---|------|-------|
| 1 | find-pair/ | Найди пару |
| 2 | tren/ | Tren Ir/Venir/Llegar |
| 3 | ser-estar/ | Ser vs Estar |
| 4 | formulas/ | 36 Формул |
| 5 | mezcla/ | Mezcla |
| 6 | pasado/ | Прошедшее время |

---

## Deployment

- Branch: `main`
- Remote: `git@github.com:stivr4469/find-pair.git`
- Vercel project: `find-pair-new` (keep this one; `find-pair-seven` is a duplicate to delete)
- Deploy: `git push origin main` → auto-deploys in ~30s
- No CI, no tests, no build step

---

## Quick-start checklist for adding a new module

1. Create `MODULE_DIR/` with `data.js`, `app.js`, `ui.js`, `index.html`
2. Copy structure from `formulas/` — rename all `Formulas`/`formulas` occurrences
3. Add two-level back navigation: `← Главная` + hidden `← Список` button wired to `backToList()`
4. Add `_syncBackBtn()` to app.js and call it in every view-switching method
5. Set script `?v=1` in the new module's `index.html`
6. Add `<a href="MODULE_DIR/" class="game-card">` to root `index.html`
7. Push to `main` — Vercel deploys automatically
