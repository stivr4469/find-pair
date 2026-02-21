/**
 * Tren Ir/Venir - Mode 2: Main Module
 *
 * Главный модуль режима спряжения испанских глаголов.
 * Объединяет все подмодули и экспортирует функции для глобального доступа.
 *
 * Подмодули:
 * - mode2-game.js - игровая логика
 * - mode2-options.js - генерация вариантов
 * - mode2-ui.js - отображение и ввод
 * - mode2-results.js - результаты и поток
 *
 * Функциональность:
 * - Генерация вопросов (глагол + время + лицо)
 * - 5 вариантов ответа (кнопки вместо input)
 * - Поддержка 4 времён: presente, indefinido, imperfecto, futuro
 * - Поддержка 6 лиц: yo, tú, él/ella, nosotros, vosotros, ellos/ellas
 * - Обратная связь (✅/❌)
 * - Подсчёт очков
 * - Кнопка "Дальше"
 */

// Состояние игры (глобальное для всех модулей)
let mode2State = {
  score: 0,
  questionCount: 0,
  maxQuestions: 10,
  currentQuestion: null,
  isAnswered: false
};

// Экспорт состояния для других модулей
if (typeof window !== 'undefined') {
  window.mode2State = mode2State;
}

// Экспорт для использования в Node.js (если потребуется для тестов)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mode2State,
    // Функции будут добавлены после загрузки скриптов
  };
}

/**
 * Инициализация Mode 2
 * Вызывается при переключении на режим спряжения
 */
function initMode2() {
  // Сброс состояния
  mode2State.score = 0;
  mode2State.questionCount = 0;
  mode2State.isAnswered = false;
  
  // Обновить счёт
  updateScoreMode2();
  
  // Сгенерировать и показать первый вопрос
  const question = generateQuestionMode2();
  displayQuestionMode2(question);
}

// Экспорт функции
if (typeof window !== 'undefined') {
  window.initMode2 = initMode2;
}