/**
 * Ser vs Estar Trainer - Context Mode: UI Functions
 * Улучшенный интерфейс с поддержкой объяснений и прогресса.
 */

function displayContextQuestionUI(question) {
    const contentArea = document.getElementById('ser-estar-context-area');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Выполнено ${contextModeState.totalAnswered} из ${contextModeState.sessionLimit}</div>
            
            <div class="translation-text" style="color: #666; margin-bottom: 10px; font-style: italic;">
                ${question.translation}
            </div>
            
            <div class="question-text" style="font-size: 1.4rem; font-weight: bold; margin-bottom: 20px;">
                ${question.text ? question.text.replace('___', '<span class="blank" style="color: #f59e0b;">___</span>') : ''}
            </div>

            <div class="options-container" id="context-options" style="display: grid; gap: 10px;">
                ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>

            <div class="feedback" id="context-feedback" style="min-height: 80px; padding: 15px; margin-top: 15px; background: #f8f9fa; border-radius: 8px; display: none; border-left: 5px solid #ccc;"></div>
            
            <button class="next-button" id="context-next-btn" style="display: none;">
                Дальше →
            </button>
        </div>
    `;

    // Обработчики
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

    const percentage = Math.round((contextModeState.score / contextModeState.sessionLimit) * 100);
    
    contentArea.innerHTML = `
        <div class="results-container" style="text-align: center; padding: 20px;">
            <h2>🏁 Сессия завершена!</h2>
            <div class="final-score" style="font-size: 3rem; font-weight: bold; margin: 20px 0;">${contextModeState.score} / ${contextModeState.sessionLimit}</div>
            <p style="margin-bottom: 30px; color: #666;">Вы прошли 20 вопросов по Ser и Estar. Вопросы перемещены в конец очереди.</p>
            <button class="restart-button" onclick="restartContextMode()">
                🔄 Продолжить тренировку
            </button>
            <button class="menu-button" onclick="showMainMenu()">
                📋 В меню
            </button>
        </div>
    `;
}

function updateContextScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = contextModeState.score;
    }
}

// Экспорт
window.displayContextQuestionUI = displayContextQuestionUI;
window.showContextResultsUI = showContextResultsUI;
window.updateContextScoreUI = updateContextScoreUI;
