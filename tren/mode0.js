/**
 * Tren Ir/Venir - Mode 0: Main Module
 *
 * Главный модуль режима спряжения испанских глаголов.
 * Объединяет все подмодули и экспортирует функции для глобального доступа.
 *
 * Подмодули:
 * - mode0-game.js - игровая логика
 * - mode0-options.js - генерация вариантов
 * - mode0-ui.js - отображение и ввод
 * - mode0-results.js - результаты и поток
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
let mode0State = {
  score: 0,
  questionCount: 0,
  maxQuestions: 10,
  currentQuestion: null,
  isAnswered: false
};

// Экспорт состояния для других модулей
if (typeof window !== 'undefined') {
  window.mode0State = mode0State;
}

// Экспорт для использования в Node.js (если потребуется для тестов)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mode0State,
    // Функции будут добавлены после загрузки скриптов
  };
}

/**
 * Инициализация Mode 0
 * Вызывается при переключении на режим спряжения
 */
function initMode0() {
  // Сброс состояния
  mode0State.score = 0;
  mode0State.questionCount = 0;
  mode0State.selectedVerb = null;
  mode0State.isAnswered = false;

  // Обновить счёт
  updateScoreMode0();

  // Показываем выбор глагола (для начинающих)
  displayVerbSelectionMode0();
}

// Экспорт функции
if (typeof window !== 'undefined') {
  window.initMode0 = initMode0;
}
