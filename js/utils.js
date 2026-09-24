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

// Inline SVG icons for TTS buttons (no dependency on lucide.createIcons)
function _svgIcon(paths, size) {
    var s = size || 17;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="pointer-events:none;display:inline-block;vertical-align:middle;">' + paths + '</svg>';
}
window.ICON_VOL = _svgIcon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>');
window.ICON_MIC = _svgIcon('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>');

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
}
