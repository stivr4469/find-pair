// spanish-trainer-app/tren/mode5.js
/**
 * Tren Ir/Venir/Llegar - Mode 5: Context Game Logic
 * Основная игровая логика режима "Контекст"
 */

// Состояние игры
let mode5State = {
    currentQuestionIndex: 0,
    score: 0,
    questions: [],
    maxQuestions: 10,
    isAnswered: false // Флаг, показывающий, ответил ли пользователь
};

/**
 * Инициализация режима Mode 5
 */
function initMode5() {
    mode5State.currentQuestionIndex = 0;
    mode5State.score = 0;
    mode5State.isAnswered = false; // Сброс флага
    mode5State.questions = shuffleArray(MODE5_SENTENCES).slice(0, mode5State.maxQuestions);

    // Обновляем счет в UI (если функция доступна)
    if (typeof updateMode5ScoreUI === 'function') {
        updateMode5ScoreUI();
    }
    
    displayMode5Question(); // Отображаем первый вопрос через UI
}

/**
 * Отображает текущий вопрос и варианты ответов (вызывает UI-функцию)
 */
function displayMode5Question() {
    if (mode5State.currentQuestionIndex >= mode5State.maxQuestions) {
        // Показываем результаты, если вопросы закончились
        if (typeof showMode5ResultsUI === 'function') {
            showMode5ResultsUI();
        } else {
            console.error('showMode5ResultsUI is not defined');
        }
        return;
    }

    const question = mode5State.questions[mode5State.currentQuestionIndex];
    mode5State.isAnswered = false; // Сбрасываем флаг для нового вопроса
    
    // Проверяем что UI функция доступна
    if (typeof displayMode5QuestionUI === 'function') {
        displayMode5QuestionUI(question);
    } else {
        console.error('displayMode5QuestionUI is not defined');
    }
}

/**
 * Проверяет ответ пользователя
 * @param {string} selected - Выбранный пользователем ответ
 * @param {string} correct - Правильный ответ
 * @param {HTMLElement} buttonElement - Нажатая кнопка
 */
function checkMode5Answer(selected, correct, buttonElement) {
    mode5State.isAnswered = true; // Пользователь ответил

    const feedback = document.getElementById('mode5-feedback');
    const allButtons = document.querySelectorAll('#mode5-options .option-btn');
    const nextButton = document.getElementById('mode5-next-btn');

    allButtons.forEach(btn => btn.disabled = true); // Блокируем все кнопки

    if (selected.toLowerCase() === correct.toLowerCase()) {
        feedback.textContent = "✅ ¡Correcto! Правильно!";
        feedback.className = "feedback correct";
        buttonElement.classList.add('correct');
        mode5State.score++;
        updateMode5ScoreUI(); // Обновляем счет в UI
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${correct}`;
        feedback.className = "feedback incorrect";
        buttonElement.classList.add('incorrect');
        // Подсветить правильный ответ
        allButtons.forEach(btn => {
            if (btn.dataset.answer.toLowerCase() === correct.toLowerCase()) {
                btn.classList.add('correct');
            }
        });
    }
    nextButton.style.display = 'inline-block'; // Показываем кнопку "Дальше"
}

/**
 * Обработчик кнопки "Дальше"
 */
function handleNextMode5Question() {
    mode5State.currentQuestionIndex++;
    displayMode5Question(); // Отображаем следующий вопрос
}

/**
 * Вспомогательная функция для перемешивания массива
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
 * Глобальная функция для перезапуска режима
 */
function restartMode5() {
    if (typeof initMode5 === 'function') {
        initMode5();
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.initMode5 = initMode5;
    window.mode5State = mode5State;
    window.shuffleArray = shuffleArray;
    window.restartMode5 = restartMode5;
    window.checkMode5Answer = checkMode5Answer;
    window.handleNextMode5Question = handleNextMode5Question;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMode5,
        mode5State,
        shuffleArray,
        restartMode5,
        checkMode5Answer,
        handleNextMode5Question
    };
}
