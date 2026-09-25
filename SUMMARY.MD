# Spanish Trainer App — Журнал изменений

> Журнал накапливается, не перезаписывается. Новые записи — сверху.
> Для текущих версий файлов → смотри ARCHITECTURE.md (раздел «Версии файлов»).

---

## Сессия: 2026-09-25 (продолжение 12) — Анимации замедлены

**От пользователя:** «всё равно сильно всё быстро».
- Новые токены в `unified-styles.css` (v=31): `--dur-view: 750ms` (смена экрана, было 450), `--dur-rise: 600ms` (каскад, было 400), `--dur-react: 600ms` (pop/shake, было 400–500), `--stagger-step: 110ms` (было 70), `--ease-view: cubic-bezier(0.33,1,0.68,1)` — мягче `--ease-out`, движение не «выстреливает» в первой трети.
- `pasado/ui.js`: `.pasado-anim-in` на `--dur-view`/`--ease-view`.
- Тесты «кнопка «Дальше» видна» ждут 1.2с после появления экрана (как живой пользователь). Известное ограничение: если ответить быстрее, чем за 0.75с после появления вопроса, кнопка «Дальше» на долю секунды окажется ниже и встанет на место (fixed внутри анимируемого контейнера).
- Видео: `~/Видео/vamos-animacii-medlennee.webm`. Smoke 104/104.

---

## Сессия: 2026-09-25 (продолжение 11) — Анимации сделаны заметными

**Симптом (от пользователя):** «анимацию вообще не видно, как будто её нет».
**Диагностика:** на проде (find-pair-new.vercel.app) анимации подключены (`unified-styles.css?v=29` содержит `vm-enter`/`view-enter`); у пользователя Chrome, `enable-animations=true` — reduced-motion не включён. Вывод: анимации слишком слабые (сдвиг 8–16px за 0.25–0.4с).

**Сделано (`unified-styles.css` v=30):**
- Смена экрана: `vm-enter` — въезд справа на 56px + проявление, 450мс (`--dur-view`) — эффект перелистывания.
- Каскад (`.stagger`): новый `vm-rise` — подъём 18px + масштаб 0.96→1, шаг 70мс (было 40).
- Верный ответ `vm-pop`: 1.06 → 1.1 с отскоком; неверный `vm-shake`: ±6 → ±10px, 0.5с.
- Новый класс `.anim-rise`; фидбек в formulas использует его вместо `view-enter` (`formulas/ui.js` v=32).
- Видео: `~/Видео/vamos-animacii-NOVYE.webm`. Smoke 104/104.

---

## Сессия: 2026-09-25 (продолжение 10) — Ser/Estar переведён на общий дизайн «Валенсия»

**Симптом (от пользователя):** модуль Ser/Estar выглядит иначе, чем всё приложение.

**Причина:** `ser-estar/ser-estar.css?v=1` (1318 строк) грузится после `unified-styles.css` и перебивал общий дизайн старыми глобальными правилами: `body` — фиолетовый градиент `#667eea→#764ba2`, `.back-button` — фиолетовые кнопки, `.mode-button`/`.game-area` — `background: white` (не реагировали на тёмную тему), «vs» в заголовке терялся на фиолетовом. 146 захардкоженных цветов и 10 `var(--…)`. При редизайне 2026-09-23 файл не мигрировали.

**Сделано:**
- `ser-estar/ser-estar.css` переписан: 1318 → 449 строк. Удалены 61 мёртвый класс (`.ser-estar-*`, `.classify-stat*`, `.results-btn*` …) и все глобальные переопределения, уже покрытые `unified-styles.css`. Оставшееся (`.verb-info`, режим «Классификация») — на токенах темы.
- Зоны SER/ESTAR в классификации: SER синий, ESTAR **зелёный** (было оранжевый — путался с акцентом) — как `.ser-card`/`.estar-card`.
- `ser-estar/index.html`: `.ctx-tile.correct/.incorrect` на `--success`/`--danger` (как `.option-btn`), `ser-estar.css?v=2`.
- Проверено скриншотами до/после: меню, базовый, продвинутый, контекст, правила, классификация (+ неверный ответ) × светлая/тёмная. Smoke 104/104.

---

## Сессия: 2026-09-25 (продолжение 9) — Фикс: кнопка «Дальше» пропала после анимаций

**Симптом (от пользователя, скриншот formulas):** кнопка «Дальше →» (`.quiz-next-fixed`, `position: fixed; bottom: 20px`) не видна — раньше «всплывала» внизу экрана; переход экранов почти незаметен.

**Причина:** `.view-enter`, `:where(.stagger) > *` и `.pasado-anim-in` имели `animation-fill-mode: both` → после окончания анимация оставалась действующей (transform), а элемент с действующей transform-анимацией — containing block для `position: fixed` потомков. Кнопка позиционировалась от низа карточки (замер: top=980 при высоте окна 720). Затронуты все модули с кнопкой «Дальше» внутри экрана.

**Фикс:**
- `css/unified-styles.css` (v=29): `.view-enter` и `:where(.stagger) > *` → `backwards`; `vm-enter` сдвиг 8→16px, `.view-enter` длительность `--dur-slow` (400ms) — переход стал заметнее.
- `pasado/ui.js` (v=23): `.pasado-anim-in` и `pasadoFadeIn` → `backwards`.
- `tests/smoke/motion.spec.js`: +3 теста «кнопка «Дальше» в пределах экрана после ответа» (formulas, pasado, tren mode1 на 390px). Без фикса падают (top=980/860 при vh=720), с фиксом проходят.
- Smoke: 104/104. Скриншоты: кнопка у нижнего края экрана; кадр через 90мс после «Дальше» — новый вопрос полупрозрачный/сдвинут.
- ARCHITECTURE.md / CLAUDE.md: правило «анимации входа только backwards».

**Урок:** smoke-тесты проверяли наличие/тип анимаций, но не геометрию — добавлен тест на положение fixed-кнопки.

---

## Сессия: 2026-09-25 (продолжение 8) — Приёмка TASK-motion-ui + фикс перекрытия анимаций

**Приёмка (Opus):** 5 коммитов Sonnet (`20c5e2b`…`979f710`) проверены: smoke 98/98, повторный замер `document.getAnimations()` — переходы экранов теперь есть везде (formulas/pasado/tren/ser-estar/mezcla/find-pair: `vm-enter`, было 0), reduced-motion работает (апельсин не летит, длинных анимаций нет), маскот поверх карточки.

**Найден баг:** `.stagger > *` (специфичность 0,1,0, объявлен позже) перекрывал `.anim-correct`/`.anim-wrong` → в formulas тряска/«подпрыгивание» кнопки ответа **не проигрывались** (вместо них `vm-enter`); в pasado/tren анимации ответа шли с опозданием 40–240 мс (унаследованный `animation-delay` от `:nth-child`). Тест Sonnet проверял только наличие keyframe, поэтому не поймал.

**Фикс:** `css/unified-styles.css` — каскад переписан на нулевую специфичность: `:where(.stagger) > *` и `:where(.stagger > :nth-child(N))`. Любой класс анимации на ребёнке теперь перекрывает вход и его задержку независимо от порядка в CSS. Вход каскадом сохранён (0/40/80/120 мс).
- `tests/smoke/motion.spec.js` +3 регрессионных теста: formulas неверный → `vm-shake/0s`, верный → `vm-pop/0s`; tren mode1 — у кнопок ответа `animation-delay: 0s`. Проверено, что без фикса тест падает (`vm-enter` вместо `vm-shake`).
- `unified-styles.css` v=28 во всех модулях.
- `CLAUDE.md`: таблица версий приведена к фактическим; в «Запрещённые паттерны» добавлены `transition: all`, анимация `width/height/...`, числа вместо токенов, контейнерные анимации без `:where()`.
- Smoke: 101/101.

---

## Сессия: 2026-09-25 (продолжение 8) — Завершение TASK-motion-ui (Этапы 5–6)

**Коммит:** (pending)

### Этап 5.1 — find-pair анимации (`find-pair/script.js` v=5→6, `find-pair/styles.css` v=3→4)

- **Stagger при старте:** `displayWords()` добавляет `stagger` на `#left-column` и `#right-column` → карточки каскадно появляются
- **Правильная пара:** вместо мгновенного `visibility:hidden` — `anim-correct` (vm-pop 400ms) → `word-out` (vm-fade-out-scale 250ms) → `visibility:hidden`; `checkGameEnd()` вызывается после скрытия обоих слов
- **Неверная пара:** `replayAnimation(el, 'anim-wrong')` на обоих словах
- **`checkGameEnd()`** переключён с `querySelectorAll('.word:not([style*="visibility: hidden"])')` → `.word:not(.matched)` (надёжнее во время анимации)
- **`.word-out`** добавлен в `find-pair/styles.css`: `animation: vm-fade-out-scale var(--dur-normal) var(--ease-in-out) forwards`

### Этап 5.2 — mezcla (`mezcla/ui.js` v=10→11)

- `view-enter` на внешнем `<div>` всех трёх экранов: `renderList`, `renderCustomInput`, `renderText`
- `stagger` на списке карточек в `renderList` — каскадный вход

### Этап 5.3 — orange-throw (`js/orange-throw.js` v=6→7; bumped в 4 index.html v=6→7)

- `prefersReducedMotion()` check в начале `doThrow()` — при reduced-motion диспатчит `vamos:scored` сразу, без анимации
- Duration 1900ms → 1200ms
- Easing `'linear'` → `'cubic-bezier(0.25, 0.46, 0.45, 0.94)'`

### Этап 5.4 — Анимированный счёт результатов

- **`formulas/ui.js` v=30→31:** в `renderResults` — `<span id="fml-res-score">` и `<span id="fml-res-pct">` + `animateCount(el, val, 700)` после innerHTML
- **`pasado/ui.js` v=21→22:** аналогично — `<span id="pas-res-score">` / `<span id="pas-res-pct">` + `animateCount`

### Этап 6 — Тест движения + docs

- `tests/smoke/motion.spec.js` (новый файл, 14 тестов): CSS-токены, keyframes, глобальные хелперы, stagger, matched-класс, wrong-shake, view-enter, scaleX
- `ARCHITECTURE.md`: обновлена таблица версий; добавлен раздел «Unified Motion System» с CSS-классами, токенами, JS-хелперами, правилами reduced-motion
- `SUMMARY.MD`: эта запись
- Smoke: **98/98** зелёных (84 старых + 14 новых motion)
- `TASK-motion-ui.md` удалён (задача выполнена)

**Итоговые версии:** см. ARCHITECTURE.md → «Версии файлов»

---

## Сессия: 2026-09-25 (продолжение 7) — Русский перевод для fill-blank вопросов

**Коммит:** `4bd4154`

- **formulas/data.js v=16→v=17:** добавлено поле `ru:` ко всем 54 fill-blank вопросам (7 формул: возвратные, инфинитив, pretérito perfecto, estar+gerundio, llevar+gerundio, ir a+inf, condicional, acabar de, volver/seguir/dejar)
- **formulas/ui.js v=26→v=27:** fill-blank рендер теперь показывает `question.ru` курсивом под испанским предложением (если поле задано)
- **formulas/index.html:** версии обновлены (data v=17, ui v=27)
- Smoke: 84/84 зелёных
- **Причина бага:** fill-blank вопросы используют `before`/`after` без `ru`; MCQ-вопросы используют `question` = русский текст — он и был переводом. Fill-blank были без перевода изначально.

**Статус ветки:** main опережает origin/main на 6 коммитов (push не делался — нужно явное подтверждение)

---

## Сессия: 2026-09-25 (продолжение 6) — Доработка замечаний по ревью Stages 1–4

- **Иконки итогового экрана (formulas, pasado):** эмодзи 🏆🥇👍📖 заменены на inline SVG из нового `window.ICON_RESULT` в `js/utils.js` (trophy / award / thumbsUp / bookOpen, 56px, `color: var(--accent)`). Эмодзи противоречили дизайн-системе (точки/SVG вместо emoji).
- **tren mode7:** колонки IR/VENIR/LLEGAR были `<button>` с `<h4>`/`<div>` внутри (невалидный HTML). Теперь `div role="button" tabindex="0"` + `mode7ColumnKeydown(event, col)` — Enter/Space работают как клик.
- **ser-estar classify:** новый `stopClassifyMode()` отменяет отложенный переход к следующей карточке; вызывается из `initClassifyMode()`, `SerEstarApp.switchMode()` и `SerEstarApp.showMainMenu()`.
- Версии: utils.js v=23, formulas/ui.js v=27, pasado/ui.js v=19, tren/mode7-ui.js v=17, ser-estar-app.js v=6, classify-mode.js v=6.
- Проверка: smoke 84/84 + разовые Playwright-проверки (SVG на экране результатов formulas, Enter на колонке mode7, таймер classify не срабатывает после выхода в меню).
- Также в предыдущем коммите `d6fbc2a` из репозитория убраны `tests/node_modules` (190 файлов).

**Открыто:** отозвать ключ Firebase service account (утёк в истории git, коммит `a16dcd6`) — делает владелец в Google Cloud Console.

---

## Сессия: 2026-09-25 (продолжение 5) — Code Review: Stages 1–4

### Выполнено по TASK-code-review-fixes.md (4 этапа, 84/84 тестов зелёных после каждого)

#### Stage 1 — Качество данных (коммит `345d4e1`)
- `ser-estar/ser-estar-data.js`: удалены 56 дубликатов ключа `text:`, исправлена пунктуация в 6 строках, "Rafael и Хуан" → "Rafael y Juan"
- `ser-estar/ser-estar-rules-data.js?v=1→v=2`: исправлен комментарий (убрана ссылка на удалённый mode3.js)
- `js/utils.js?v=21→v=22`: добавлена `isEquivalentAnswer(a, b)` — нормализация без удаления `¿¡`; экспортирована как `window.isEquivalentAnswer`
- `formulas/app.js?v=19→v=20`: запасное сравнение через `isEquivalentAnswer` вместо `normalizeSpanish`
- `pasado/app.js?v=8→v=9`: то же в `handleAnswerCyclic` и `handleAnswer`

#### Stage 2 — Логические баги (коммит `073376b`)
- `tren/mode5-ui.js` и `mode6-ui.js`: сброс `wrongTimer`/`nextTimer` при инициализации нового вопроса
- `tren/mode6.js`, `tren/mode7.js`: guard `if (isAnswered) return` против двойного ответа
- Дубли `restartMode1()`/`restartMode2()` в `tren/app.js` удалены; оставлены только в mode*.js
- `mezcla/app.js?v=8→v=9`: AbortController для отмены висящего `translateText` при быстрых кликах

#### Stage 3 — Мёртвый код (коммит `69792bc`)
- Удалены файлы (git rm): `find-pair/find-pair.js`, `find-pair/find-pair.css`, `preview.html`, `ser-estar/ser-estar-mode3.js`, `ser-estar/ser-estar-mode4.js`, `ser-estar/ser-estar-mode2-data.js`, `ser-estar/ser-estar-mode2-logic.js`, `ser-estar/ser-estar-mode2-utils.js`
- `js/main.js?v=1→v=2`: убраны `initTelegram`, `applyTelegramTheme`, `setupNavigation`, `handleGameCardClick`, `getUrlParams`, `logTelegramInfo`, `showCloseButton`, все console.log; `closeApp()` обновлён
- `tren/app.js?v=15→v=16`: удалены `App.debug()` и 20+ вызовов, все console.log; switch → table lookup
- `find-pair/script.js?v=4→v=5`: удалены 4 console.log
- `ser-estar/ser-estar-app.js?v=4→v=5`, `ser-estar-context-mode.js?v=2→v=3`: удалены console.log
- `.gitignore`: добавлены `tren/Nginx+PHP/`, `.playwright-mcp/`, `*.zip`

#### Stage 4 — Доступность и чистота DOM (коммит `dbfd9c2`)
- `tren/mode7-ui.js?v=15→v=16`: classify columns `div` → `button[type=button]`; CSS `.classify-column` дополнен reset-свойствами; упрощён ternary с двумя одинаковыми ветками
- `formulas/ui.js?v=25→v=26`: `.formula-card-thumb` div → button; TTS главного примера переведена на `data-tts`/`speakSpanish(this.dataset.tts)` (убран `replace(/'/g, "\\'")` — сломался бы на апострофах); badge `<i data-lucide>` 14px убраны из renderQuiz (2 варианта); renderResults: lucide-иконка → эмодзи 🏆🥇👍📖
- `pasado/ui.js?v=17→v=18`: `.pasado-card-thumb` div → button; `.pasado-classify-zone` div → button; CSS `.pasado-classify-zone` добавлен reset; `<i data-lucide>` зон классификации → `<span>`-точки; renderResults: lucide-иконка → эмодзи

### Коммиты
- `345d4e1` fix: исправлены данные вопросов (ser-estar дубли text, пунктуация в формуле 3, дубль варианта)
- `073376b` fix: очистка таймеров при смене режима, guard двойного ответа, дубли функций tren, таймаут перевода mezcla
- `69792bc` chore: удалены неподключённые файлы, дубль инициализации Telegram, отладочные логи; .gitignore
- `dbfd9c2` fix: доступность карточек с клавиатуры, TTS через data-атрибут, убраны lucide из генерируемого HTML

### Открытые задачи
- [ ] Удалить Vercel-проект `find-pair-seven`
- [ ] TTS — speakSpanish() отключён
- [ ] Карточки повторения ошибок (localStorage)

---

## Сессия: 2026-09-25 — Smoke-тесты (84/84 зелёных маячков)

### Что сделано

#### Инфраструктура тестирования
- Добавлен `tests/` — Playwright smoke suite для всех 6 модулей
- `tests/playwright.config.js` — headless Chromium, baseURL localhost:3001, webServer python http.server
- `tests/package.json` — `@playwright/test ^1.49.0`
- `run-smoke.sh` — единая точка входа: `bash run-smoke.sh`
- `tests/.gitignore` — исключает node_modules и test-results

#### Smoke-спеки (84 теста, 2 skipped по данным)
- `find-pair.spec.js` — 5 тестов (загрузка, клики, пары, категория, рестарт)
- `formulas.spec.js` — 21 тест: список, карточка, квиз MCQ, fill-blank, марафон, навигация
- `pasado.spec.js` — 20 тестов: список, квиз, навигация, inline-режим
- `ser-estar.spec.js` — 6 тестов: меню, base-режим, advanced, classify
- `mezcla.spec.js` — 6 тестов: список, чтение, токены, навигация
- `tren.spec.js` — 26 тестов: меню, mode1, mode6 (fill-blank), mode7 (drag-to-column)

#### Исправления spec-файлов (все root-cause задокументированы)
1. `tren.spec.js` — `gotoTren()` ждал `window.App` (не экспортируется); заменено на `nav.main-menu`
2. Все спеки — `#xxx-next-wrap` имеет 0 высоту (дочерняя кнопка `position:fixed` не участвует в flow); заменено на `.quiz-next-fixed`
3. `formulas/pasado.spec.js` — `.or()` с многоэлементным локатором → strict mode violation; добавлен `.first()`
4. `tren.spec.js` — `toHaveCount({ minimum: N })` — невалидный Playwright API; заменено на `count()` + `toBeGreaterThanOrEqual`
5. `ser-estar.spec.js` — `.feedback` резолвится в 2 элемента; использован скоуп `#ser-estar-base-area .feedback`
6. `ser-estar.spec.js` — клик на advanced mode заменяет innerHTML с настройками; проверка на `.start-button`
7. `pasado.spec.js` — `#pasado-inline-next` — та же 0-высота проблема; заменено на `.quiz-next-fixed`

#### tren/mode7.js v=14→v=15
- Экспортирован `window.mode7State = mode7State` для доступа из тестов

### Коммиты
- `d9e9386` test: add smoke tests for all 6 modules (84/84 green)
- `3018ea0` chore: add .gitignore for tests/node_modules

### CLAUDE.md
Добавлен шаг `[6. SMOKE TEST] bash run-smoke.sh` в цикл разработки.

### Открытые задачи
- [ ] Удалить Vercel-проект `find-pair-seven`
- [ ] TTS — speakSpanish() отключён
- [ ] Карточки повторения ошибок (localStorage)

---

## Сессия: 2026-09-25 (продолжение 4) — tren mode6 blank-fill + pasado Контраст

### Что сделано

#### tren/mode6-ui.js v=15→v=16, tren/mode6.js v=12→v=13
Исправлен layout режима «Inline выбор»: варианты больше не вставляются inline внутри строки предложения.
Теперь: предложение отображается целиком с `___` пропуском (span.m6-blank), плитки-варианты — flex-row снизу.
При ответе пропуск заполняется словом и красится зелёным/красным. Коммит `9ceee1b`.

#### pasado/ — режим «Контраст» (Indefinido vs Imperfecto)
- `pasado/data.js` v=6→v=7: добавлен `PASADO_CONTRAST` — 15 контрастных пар (Indefinido / Imperfecto)
- `pasado/ui.js` v=16→v=17: кнопка «Контраст» в меню, `renderContrastDeck()` — 2-колоночные карточки (красный/синий), сигналы, навигация, прогресс-точки
- `pasado/app.js` v=7→v=8: `startContrast()`, `nextContrast()`, `prevContrast()`, window-алиасы
- `pasado/index.html`: версии bumped, footer обновлён

### Коммиты
- `9ceee1b` tren mode6 blank-fill layout
- (pasado Контраст коммит из предыдущей сессии)

### Открытые задачи
- [ ] Удалить Vercel-проект `find-pair-seven`
- [ ] TTS — speakSpanish() отключён
- [ ] Карточки повторения ошибок (localStorage)

---

## Сессия: 2026-09-25 (продолжение 3) — Fill-blank Q1-Q4 по всему приложению (4 агента параллельно)

### Что сделано

**Задача:** Конвертировать ВСЕ оставшиеся MCQ-вопросы Q1-Q4 в fill-blank формат (`before`/`after`) по всем модулям — pasado, formulas, tren, ser-estar.

**Стратегия:** 4 параллельных субагента, каждый работал с отдельным набором файлов без конфликтов.

#### pasado/data.js v=5→v=6
Все Q1-Q4 (64 вопроса) у 16 формул конвертированы из `{question: "..."}` в `{before: "...", after: "...", ...}`:
- Indefinido: сигналы "ayer"/"anoche"
- Imperfecto: сигналы "siempre"/"antes"  
- Perfecto: сигналы "hoy"/"esta semana"
- Pluscuamperfecto: паттерн "Cuando llegué, ya..."

#### formulas/data.js v=14→v=15
Q1-Q4 для 9 глагольных формул (F7,F8,F11,F12,F13,F21,F22,F25,F27) конвертированы в `before`/`after`:
- 36 дополнительных fill-blank вопросов
- Итого в formulas/data.js: 54 fill-blank вопроса (Q1-Q6)

#### ser-estar/ser-estar-context-ui.js v=6→v=7
`displayContextQuestionUI()` полностью переписан:
- Предложение с `<span id="question-blank" class="ctx-blank">___</span>`
- Тайлы-варианты (`.ctx-tile`) ниже предложения
- После ответа: blank заполняется правильным ответом, цвет — зелёный (верно) / красный (нет)
- Исправлен молчащий баг: `checkContextAnswer` в context-mode.js уже искал `#question-blank`, но старый UI не создавал этот ID

#### ser-estar/index.html
Добавлены CSS классы `.ctx-tiles`, `.ctx-tile`, `.ctx-blank`, `.ctx-tile.correct`, `.ctx-tile.incorrect`.
Версия ser-estar-context-ui.js: v=6→v=7

#### tren/ — без изменений
Агент провёл аудит и подтвердил: tren уже имеет 4 fill-blank режима (mode1/3/5/6).

#### Результат тестирования (Playwright)
- pasado Q1 (Indefinido -AR): "Yo ___ con ella ayer." → тайлы → blank заполняется зелёным ✅
- ser-estar context: "Las tiendas ___ cerradas los domingos." → тайлы → blank заполняется красным/зелёным ✅
- JS ошибок нет ✅

---

## Сессия: 2026-09-25 (продолжение) — Inline tiles для fill-blank вопросов

### Что сделано (коммит `d85e662`)

**Проблема:** Вопросы с реальным предложением и пропуском `___` отображались как абстрактные A/B/C/D MCQ — плохо воспринимаются.

**Решение:** Конвертированы 23 fill-blank вопроса в формат inline-тайлов (`before`/`after`).

#### pasado/data.js v=4→v=5
Преобразованы все `{question: "... _____ ..."}` в `{before: "...", after: "..."}` в:
- Ф1-Ф7 (Q5-Q6 каждой формулы) — 14 вопросов
- Ф8 Q5, Ф9-Ф10 Q5-Q6 — 5 вопросов
- Ф12 Q3, Ф14 Q2/Q4/Q6 — 4 вопроса
Итого: 23 вопроса

#### pasado/ui.js v=13→v=14
`renderQuiz()` теперь определяет `question.before !== undefined` и:
- При наличии `before` → рендерит тайлы прямо в предложении (`.pasado-inline-btn`)
- Иначе → стандартный MCQ A/B/C/D
Оба варианта используют `pasadoHandleAnswer(i)` (index-based) и `showAnswerFeedback()` — изменения в app.js не нужны.

#### Тест
- 0 JS ошибок в консоли
- Верный ответ → зелёный тайл + правильный hint в feedback
- Неверный ответ → красный тайл + зелёный правильный + hint
- Naranjito корректно реагирует в обоих случаях

---

## Сессия: 2026-09-25 — Пилот: обогащение контента pasado/

### Стратегия
Все модули механически достаточны, но данные (data.js) поверхностны —
hint-тексты объясняют «что», но не «почему». Пилот на pasado/ проверяет подход,
после чего тот же шаблон применяется ко всем остальным модулям и новому subjuntivo/.

### Аудит pasado/data.js (итог)
- **Формулы-эталоны**: Ф8, Ф12, Ф14, Ф16 — контекстные вопросы, сигнальные слова, тест выбора времени
- **Слабые формулы (11 из 16)**: Ф1-Ф7, Ф9-Ф10, Ф13, Ф15 — только морфология, нет «когда»
- **PASADO_INLINE и PASADO_CLASSIFY**: уже отличного качества, не трогали
- **Ключевой паттерн**: каждый hint должен содержать СИГНАЛ + ПРАВИЛО + ФОРМУ

### Что сделано в pasado/data.js (v=3→v=4)
Обогащены **9 слабых формул** (Ф1-Ф7, Ф9-Ф10):
1. **Все hints переписаны** в формат «СИГНАЛ → ПРАВИЛО → ФОРМА»:
   - Было: `"Indefinido yo (-AR): stem + é. hablar → habl + é = hablé"`
   - Стало: `"«Ayer/el lunes pasado» = сигнал Indefinido\nЗавершённое конкретное действие\nhablar + yo: habl + é = hablé"`
2. **Q5-Q6 заменены в каждой формуле** на контекстные вопросы выбора времени:
   - Ф1: `"Ayer mis amigos _____ en la fiesta..."` (bailaron vs bailaban vs han bailado)
   - Ф2: `"En 2019 ellos _____ juntos..."` (vivieron vs vivían)
   - Ф3: `"¿Qué _____ ayer?"` (hiciste vs hacías vs has hecho)
   - Ф4: `"Anteayer yo _____ la noticia"` (supe vs sabía — момент vs состояние)
   - Ф5: `"Cuando llegué, ella todavía _____ (cocinar)"` — классический фон+событие
   - Ф6: `"El perro _____ (dormir) cada noche"` (dormía vs durmió)
   - Ф7: `"De niña ella siempre _____ (ir) al parque"` (iba vs fue)
   - Ф9: `"Este mes ellos _____ (salir) tres veces"` (han salido vs salieron)
   - Ф10: `"Ellos nunca _____ (vivir) en España"` (han vivido vs vivieron)

### Файлы изменены
- `pasado/data.js` v=3→v=4 — обогащены hints + Q5-Q6 в 9 формулах
- `pasado/index.html` — bump версии data.js до v=4

### Проверено в браузере
- ✅ Полный тест (96 вопросов) загружается без ошибок
- ✅ Hints отображают сигнальные слова и контраст с другим временем
- ✅ Новые контекстные вопросы корректны (4 варианта, все времена)
- ✅ Консоль: 0 JS-ошибок

### Открытые задачи
- [ ] Добавить fill-вопросы (type:'fill') в pasado/data.js + рендер в ui.js
- [ ] Добавить contrasts[] и режим «Контраст» в pasado
- [ ] Применить тот же подход ко всем модулям: tren/, formulas/, ser-estar/, mezcla/
- [ ] Построить subjuntivo/ как новый полноценный модуль
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
