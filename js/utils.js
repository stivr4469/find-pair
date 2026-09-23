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

    if (!window.speechSynthesis) return;

    const ss = window.speechSynthesis;

    function _doSpeak() {
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = 'es-ES';
        utter.rate = 0.88;

        // Ищем испанский голос
        const voices = ss.getVoices();
        const esVoice = voices.find(v => v.lang.startsWith('es'));
        if (esVoice) utter.voice = esVoice;

        // Chrome Android: cancel() + немедленный speak() теряется — нужна пауза
        ss.cancel();
        setTimeout(() => ss.speak(utter), 50);
    }

    // Если голоса ещё не загружены — ждём voiceschanged (первая загрузка)
    const voices = ss.getVoices();
    if (voices.length === 0) {
        ss.addEventListener('voiceschanged', _doSpeak, { once: true });
    } else {
        _doSpeak();
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.shuffleArray = shuffleArray;
    window.speakSpanish = speakSpanish;
}
