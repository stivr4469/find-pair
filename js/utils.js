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
    if (!text) return;

    const cleanText = text.replace(/_+/g, '').trim();

    // Web Speech API — работает без сети, без блокировок
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = 'es-ES';
        utter.rate = 0.88;
        utter.pitch = 1;

        // Предпочитаем испанский голос если доступен
        const voices = window.speechSynthesis.getVoices();
        const esVoice = voices.find(v => v.lang.startsWith('es'));
        if (esVoice) utter.voice = esVoice;

        window.speechSynthesis.speak(utter);
        return;
    }

    // Запасной вариант: Google TTS
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=es&client=tw-ob`;
    const audio = new Audio(url);
    audio.play().catch(err => console.error('TTS fallback failed:', err));
}

// Прогреваем список голосов заранее (асинхронная загрузка в Chrome)
if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
        window.speechSynthesis.getVoices();
    });
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.shuffleArray = shuffleArray;
    window.speakSpanish = speakSpanish;
}
