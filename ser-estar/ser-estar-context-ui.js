// spanish-trainer-app/ser-estar/ser-estar-context-ui.js
/**
 * Ser vs Estar Trainer - Context Mode: UI Functions
 * Функции отображения для режима "Контекст"
 */

function displayContextQuestionUI(question) {
    const contentArea = document.getElementById('ser-estar-context-area');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Вопрос ${contextModeState.currentQuestionIndex + 1} из ${contextModeState.totalQuestions}</div>
            <div class="translation-text">${question.translation}</div>
            <div class="question-text">${question.text.replace('___', '<span class="blank">___</span>')}</div>
            <div class="options-container" id="context-options">
                ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
            <div class="feedback" id="context-feedback"></div>
            <button class="next-button" id="context-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    contentArea.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!contextModeState.isAnswered) {
                checkContextAnswer(button.dataset.answer, question.correct, button, question.explanation);
            }
        });
    });

    document.getElementById('context-next-btn').addEventListener('click', handleNextContextQuestion);
}

function showContextResultsUI() {
    const contentArea = document.getElementById('ser-estar-context-area');
    if (!contentArea) return;

    const percentage = Math.round((contextModeState.score / contextModeState.totalQuestions) * 100);
    let message = "";
    if (percentage === 100) message = "🎉 ¡Excelente!";
    else if (percentage >= 80) message = "👏 ¡Muy bien!";
    else if (percentage >= 60) message = "👍 ¡Bien!";
    else message = "📚 Sigue practicando!";

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${contextModeState.score} из ${contextModeState.totalQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartContextMode()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

function updateContextScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = contextModeState.score;
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayContextQuestionUI = displayContextQuestionUI;
    window.showContextResultsUI = showContextResultsUI;
    window.updateContextScoreUI = updateContextScoreUI;
}
