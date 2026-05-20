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
 * Озвучка через Google TTS (Cloud-based)
 * Самый стабильный вариант для Telegram WebApp
 */
function speakSpanish(text) {
    if (!text) return;

    // Очищаем текст от прочерков
    const cleanText = text.replace(/_+/g, '...').trim();

    // Формируем URL для Google TTS (Испанский язык)
    // tl=es (испанский), client=tw-ob (публичный клиент)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=es&client=tw-ob`;

    // Создаем аудио-объект
    const audio = new Audio(url);

    // Пытаемся воспроизвести
    audio.play().catch(error => {
        console.error("TTS Playback failed:", error);
        // Если заблокировано политикой браузера, звук сработает только по ПРЯМОМУ клику (кнопка 🔊)
    });
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.shuffleArray = shuffleArray;
    window.speakSpanish = speakSpanish;
}
