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

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.shuffleArray = shuffleArray;
    window.speakSpanish = speakSpanish;
    window.toggleTheme = toggleTheme;
}
