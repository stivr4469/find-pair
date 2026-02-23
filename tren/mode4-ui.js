// spanish-trainer-app/tren/mode4-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 4: UI Functions
 * Функции отображения для режима "Перевод"
 */

function displayMode4QuestionUI(question) {
    const contentArea = document.getElementById('mode4-content');
    if (!contentArea) return;

    // Перемешиваем варианты ответов перед отображением
    const shuffledOptions = shuffleArray(question.options);

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Вопрос ${mode4State.currentQuestionIndex + 1} из ${mode4State.totalQuestions}</div>
            <div class="question-text">${question.russian}</div>
            <div class="options-container" id="mode4-options">
                ${shuffledOptions.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mode4-feedback"></div>
            <button class="next-button" id="mode4-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    contentArea.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!mode4State.isAnswered) {
                checkMode4Answer(button.dataset.answer, question.spanish, button);
            }
        });
    });

    document.getElementById('mode4-next-btn').addEventListener('click', handleNextMode4Question);
}

function showMode4ResultsUI() {
    const contentArea = document.getElementById('mode4-content');
    if (!contentArea) return;

    const percentage = Math.round((mode4State.score / mode4State.totalQuestions) * 100);
    let message = "";
    if (percentage === 100) message = "🎉 ¡Excelente!";
    else if (percentage >= 80) message = "👏 ¡Muy bien!";
    else if (percentage >= 60) message = "👍 ¡Bien!";
    else message = "📚 Sigue practicando!";

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${mode4State.score} из ${mode4State.totalQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode4()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

function updateMode4ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode4State.score;
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayMode4QuestionUI = displayMode4QuestionUI;
    window.showMode4ResultsUI = showMode4ResultsUI;
    window.updateMode4ScoreUI = updateMode4ScoreUI;
}
