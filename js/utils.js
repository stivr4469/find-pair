// spanish-trainer-app/js/utils.js
/**
 * Spanish Trainer - Utility Functions
 * Общие утилиты для всех модулей
 */

/**
 * Перемешивание массива (Fisher-Yates)
 * @param {Array} array - массив для перемешивания
 * @returns {Array} перемешанный массив
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Озвучка испанского текста.
 * Приоритет: Web Speech API (встроен в браузер, без внешних запросов)
 * Запасной вариант: Google TTS
 */
function speakSpanish(text) {
    // TTS временно отключён — неправильное произношение слов с -acha/-cha
    // TODO: вернуться к TTS позже (подобрать голос / скорость / язык)
    return;

    /* eslint-disable no-unreachable */
    if (!text || !window.speechSynthesis) return;

    const cleanText = text.replace(/_+/g, '').trim();
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = 'es-ES';
    utter.rate = 0.85;

    window.speechSynthesis.speak(utter);
    /* eslint-enable no-unreachable */
}

/**
 * Переключение темы (свет/тёмная)
 * Читает/пишет localStorage('vamos:theme'), устанавливает data-theme на <html>.
 */
function toggleTheme() {
    var html = document.documentElement;
    var isDark = html.dataset.theme === 'dark' ||
        (!html.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    html.dataset.theme = isDark ? 'light' : 'dark';
    try { localStorage.setItem('vamos:theme', html.dataset.theme); } catch(e) {}
}

// ─── Topbar counters ──────────────────────────────────────────────────────────

function setTopbarStreak(val) {
    var el = document.getElementById('streak-value');
    if (el) el.textContent = val;
}
function setTopbarScore(val) {
    var el = document.getElementById('score-value');
    if (el) el.textContent = val;
}
function setTopbarProgress(pct) {
    var el = document.getElementById('se-progress-fill');
    if (el) el.style.width = Math.min(100, Math.max(0, pct)) + '%';
}
function resetTopbar() {
    setTopbarStreak(0);
    setTopbarScore(0);
    setTopbarProgress(0);
}

// Нормализация испанского текста для сравнения ответов:
// убирает знаки ¿¡?!., опциональные подлежащие в конце, лишние пробелы
function normalizeSpanish(str) {
    return (str || '')
        .replace(/[¿¡]/g, '')
        .replace(/[?!.]/g, '')
        .replace(/\s+(tú|tu|yo|él|el|ella|nosotros|vosotros|ellos|ellas|usted|ustedes)\s*$/i, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

// Сравнение ответов с учётом опциональных подлежащих и точки в конце
function isEquivalentAnswer(a, b) {
    var norm = function(s) {
        return (s || '')
            .replace(/\.\s*$/, '')
            .replace(/\s+(tú|tu|yo|él|el|ella|nosotros|vosotros|ellos|ellas|usted|ustedes)(\s*[?!])?\s*$/i, '$2')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    };
    return norm(a) !== '' && norm(a) === norm(b);
}

// Inline SVG icons for TTS buttons (no dependency on lucide.createIcons)
function _svgIcon(paths, size) {
    var s = size || 17;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="pointer-events:none;display:inline-block;vertical-align:middle;">' + paths + '</svg>';
}
window.ICON_VOL = _svgIcon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>');
// Иконки итогового экрана квиза (formulas, pasado) — 56px, цвет через currentColor
window.ICON_RESULT = {
    trophy:   _svgIcon('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', 56),
    award:    _svgIcon('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>', 56),
    thumbsUp: _svgIcon('<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>', 56),
    bookOpen: _svgIcon('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>', 56)
};
window.ICON_MIC = _svgIcon('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>');

// ─── Animation helpers ────────────────────────────────────────────────────────

// true, если пользователь просит меньше движения
function prefersReducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e) { return false; }
}

// Перезапуск CSS-анимации класса на элементе (для повторного .anim-correct/.anim-wrong)
function replayAnimation(el, className) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth; // reflow — иначе анимация не перезапустится
    el.classList.add(className);
}

// Анимированный счёт числа (экран результатов). При reduced-motion — сразу финальное значение.
function animateCount(el, to, ms, suffix) {
    if (!el) return;
    var sfx = suffix || '';
    if (prefersReducedMotion() || !ms) { el.textContent = to + sfx; return; }
    var t0 = performance.now();
    (function step(now) {
        var p = Math.min(1, (now - t0) / ms);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased) + sfx;
        if (p < 1) requestAnimationFrame(step);
    })(t0);
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.shuffleArray = shuffleArray;
    window.speakSpanish = speakSpanish;
    window.toggleTheme = toggleTheme;
    window.setTopbarStreak = setTopbarStreak;
    window.setTopbarScore = setTopbarScore;
    window.setTopbarProgress = setTopbarProgress;
    window.resetTopbar = resetTopbar;
    window.normalizeSpanish = normalizeSpanish;
    window.isEquivalentAnswer = isEquivalentAnswer;
    window.prefersReducedMotion = prefersReducedMotion;
    window.replayAnimation = replayAnimation;
    window.animateCount = animateCount;
}
