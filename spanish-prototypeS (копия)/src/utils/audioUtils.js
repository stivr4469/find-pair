// src/utils/audioUtils.js

/**
 * Произносит текст на испанском языке.
 * @param {string} text - Текст для озвучивания.
 */
export const speakSpanish = (text) => {
  if (!('speechSynthesis' in window) || !text) {
    return;
  }
  
  // Отменяем предыдущее воспроизведение, если оно есть
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(v => v.lang === 'es-ES') || voices.find(v => v.lang.startsWith('es-'));

  utterance.voice = spanishVoice;
  utterance.lang = 'es-ES';
  utterance.rate = 0.9;
  
  speechSynthesis.speak(utterance);
};

/**
 * Воспроизводит звук ошибки.
 */
export const playSound = (soundFile) => {
  try {
    const audio = new Audio(soundFile);
    audio.play();
  } catch (error) {
    console.error("Не удалось воспроизвести звук:", error);
  }
};
