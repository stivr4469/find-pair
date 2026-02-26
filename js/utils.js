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

// Глобальный синтезатор речи (Spanish)
let ttsUnlocked = false;

function speakSpanish(text) {
    if (!('speechSynthesis' in window)) return;

    // Останавливаем текущую речь (критично для WebView Telegram)
    window.speechSynthesis.cancel();

    // Очищаем текст от прочерков перед озвучкой
    const cleanText = text.replace(/_+/g, 'algo');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.volume = 1.0; // Гарантируем громкость

    // Ловим ошибку для отладки
    utterance.onerror = (event) => {
        console.error('TTS Error:', event);
    };

    // Помечаем как разблокированный после первого вызова
    ttsUnlocked = true;

    window.speechSynthesis.speak(utterance);
}

// Загрузка голосов (решает проблему первой задержки в Chrome)
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.shuffleArray = shuffleArray;
    window.speakSpanish = speakSpanish;
}
