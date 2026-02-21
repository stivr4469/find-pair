/**
 * Ser vs Estar Trainer - Mode 2: Conjugation Practice
 *
 * Пользователь видит глагол + время + лицо и должен выбрать правильную форму из 5 вариантов.
 * ИСПОЛЬЗУЕТ МНОЖЕСТВЕННЫЙ ВЫБОР С 5 КНОПКАМИ.
 *
 * Модульная структура:
 * - ser-estar-mode2-data.js: данные и конфигурация
 * - ser-estar-mode2-utils.js: вспомогательные функции
 * - ser-estar-mode2-logic.js: игровая логика
 * - ser-estar-mode2-ui.js: функции отображения
 * - ser-estar-mode2.js: основной файл (инициализация)
 */

// ============================================
// STATE
// ============================================

/**
 * Состояние игры для режима спряжения Ser/Estar
 */
let serEstarMode2State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 12,
    questions: [],
    buttonsDisabled: false,
    isAnswered: false
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Инициализация Mode 2
 */
function initSerEstarMode2() {
    console.log('[SerEstar Mode2] Initializing...');

    // Скрываем меню и другие режимы
    const mainMenu = document.querySelector('.main-menu');
    if (mainMenu) {
        mainMenu.classList.add('hidden');
    }

    // Скрываем все game-area
    document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));

    // Показываем режим Ser/Estar Mode 2
    const mode2Area = document.getElementById('ser-estar-mode2-area');
    if (mode2Area) {
        mode2Area.classList.remove('hidden');
    }

    // Сброс состояния
    serEstarMode2State.currentQuestion = 0;
    serEstarMode2State.score = 0;
    serEstarMode2State.buttonsDisabled = false;
    serEstarMode2State.isAnswered = false;
    serEstarMode2State.questions = generateSerEstarConjugationQuestions().slice(0, serEstarMode2State.totalQuestions);

    // Обновить счет
    updateSerEstarMode2Score();

    // Показать первый вопрос
    const firstQuestion = serEstarMode2State.questions[0];
    showSerEstarMode2Question(firstQuestion);
}

/**
 * Перезапуск режима
 */
function restartSerEstarMode2() {
    const resultsEl = document.getElementById('ser-estar-mode2-results');
    if (resultsEl) {
        resultsEl.classList.add('hidden');
    }
    initSerEstarMode2();
}

// ============================================
// EXPORTS
// ============================================

if (typeof window !== 'undefined') {
    window.serEstarMode2State = serEstarMode2State;
    window.initSerEstarMode2 = initSerEstarMode2;
    window.restartSerEstarMode2 = restartSerEstarMode2;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        serEstarMode2State,
        initSerEstarMode2,
        restartSerEstarMode2
    };
}