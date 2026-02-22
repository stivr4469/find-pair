// spanish-trainer-app/tren/mode5-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 5: UI Functions
 * Функции отображения для режима "Контекст"
 */

/**
 * Отображает текущий вопрос режима Mode 5
 * @param {object} question - Объект текущего вопроса
 */
function displayMode5QuestionUI(question) {
    const contentArea = document.getElementById('mode5-content');
    if (!contentArea) {
        console.error('Mode 5 content area not found');
        return;
    }

    // Обновляем UI
    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Вопрос ${mode5State.currentQuestionIndex + 1} из ${mode5State.maxQuestions}</div>
            <div class="translation-text">${question.translation}</div>
            <div class="question-text">${question.text.replace('___', '<span class="blank">___</span>')}</div>
            <div class="options-container" id="mode5-options">
                ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mode5-feedback"></div>
            <button class="next-button" id="mode5-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    // Добавляем обработчики кнопок
    const optionButtons = contentArea.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!mode5State.isAnswered) { // Проверяем, не ответил ли уже пользователь
                checkMode5Answer(button.dataset.answer, question.correctForm, button);
            }
        });
    });

    // Обработчик кнопки "Дальше"
    document.getElementById('mode5-next-btn').addEventListener('click', handleNextMode5Question);
}

/**
 * Отображает результаты игры
 */
function showMode5ResultsUI() {
    const contentArea = document.getElementById('mode5-content');
    if (!contentArea) {
        console.error('Mode 5 content area not found');
        return;
    }

    const percentage = Math.round((mode5State.score / mode5State.maxQuestions) * 100);
    let message = "";
    if (percentage === 100) {
        message = "🎉 ¡Excelente! Perfecto!";
    } else if (percentage >= 80) {
        message = "👏 ¡Muy bien! Очень хорошо!";
    } else if (percentage >= 60) {
        message = "👍 ¡Bien! Хорошо!";
    } else {
        message = "📚 Sigue practicando! Продолжай тренироваться!";
    }

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${mode5State.score} из ${mode5State.maxQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode5()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

/**
 * Обновляет отображение текущего счета
 */
function updateMode5ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode5State.score;
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayMode5QuestionUI = displayMode5QuestionUI;
    window.showMode5ResultsUI = showMode5ResultsUI;
    window.updateMode5ScoreUI = updateMode5ScoreUI;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        displayMode5QuestionUI,
        showMode5ResultsUI,
        updateMode5ScoreUI
    };
}
