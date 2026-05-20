// spanish-trainer-app/tren/mode3-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 3: UI Functions
 * Функции отображения для режима "Предлоги (a/de/en)"
 */

function displayMode3QuestionUI(question) {
    const contentArea = document.getElementById('mode3-content');
    if (!contentArea) return;

    const options = ['a', 'de', 'en'];

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Вопрос ${mode3State.currentQuestionIndex + 1} из ${mode3State.totalQuestions}</div>
            <div class="translation-text">${question.translation}</div>
            <div class="question-text">${question.text.replace('___', '<span class="blank" id="question-blank">___</span>')}</div>
            <div class="options-container" id="mode3-options">
                ${options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mode3-feedback"></div>
            <button class="next-button" id="mode3-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    contentArea.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!mode3State.isAnswered) {
                checkMode3Answer(button.dataset.answer, question.correct, button);
            }
        });
    });

    document.getElementById('mode3-next-btn').addEventListener('click', handleNextMode3Question);
}

function showMode3ResultsUI() {
    const contentArea = document.getElementById('mode3-content');
    if (!contentArea) return;

    const percentage = Math.round((mode3State.score / mode3State.totalQuestions) * 100);
    let message = "";
    if (percentage === 100) message = "🎉 ¡Excelente!";
    else if (percentage >= 80) message = "👏 ¡Muy bien!";
    else if (percentage >= 60) message = "👍 ¡Bien!";
    else message = "📚 Sigue practicando!";

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${mode3State.score} из ${mode3State.totalQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode3()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

function updateMode3ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode3State.score;
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayMode3QuestionUI = displayMode3QuestionUI;
    window.showMode3ResultsUI = showMode3ResultsUI;
    window.updateMode3ScoreUI = updateMode3ScoreUI;
}
