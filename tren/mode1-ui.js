// spanish-trainer-app/tren/mode1-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 1: UI Functions
 * Функции отображения для режима "Выбор глагола"
 */

function displayMode1QuestionUI(question) {
    const contentArea = document.getElementById('mode1-content');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Вопрос ${mode1State.currentQuestionIndex + 1} из ${mode1State.totalQuestions}</div>
            <div class="translation-text">${question.translation}</div>
            <div class="question-text">${question.text.replace('___', '<span class="blank" id="question-blank">___</span>')}</div>
            <div class="options-container" id="mode1-options">
                ${shuffleArray(question.options).map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mode1-feedback"></div>
            <button class="next-button" id="mode1-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    contentArea.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!mode1State.isAnswered) {
                checkMode1Answer(button.dataset.answer, question.correct, button);
            }
        });
    });

    document.getElementById('mode1-next-btn').addEventListener('click', handleNextMode1Question);
}

function showMode1ResultsUI() {
    const contentArea = document.getElementById('mode1-content');
    if (!contentArea) return;

    const percentage = Math.round((mode1State.score / mode1State.totalQuestions) * 100);
    let message = "";
    if (percentage === 100) message = "🎉 ¡Excelente!";
    else if (percentage >= 80) message = "👏 ¡Muy bien!";
    else if (percentage >= 60) message = "👍 ¡Bien!";
    else message = "📚 Sigue practicando!";

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${mode1State.score} из ${mode1State.totalQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode1()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

function updateMode1ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode1State.score;
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayMode1QuestionUI = displayMode1QuestionUI;
    window.showMode1ResultsUI = showMode1ResultsUI;
    window.updateMode1ScoreUI = updateMode1ScoreUI;
}
