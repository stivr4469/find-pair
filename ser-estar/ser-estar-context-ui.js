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
            
            <div class="translation-text">
                ${question.translation}
            </div>

            <div class="question-text">
                ${question.text ? question.text.replace('___', '<span class="blank" id="question-blank" style="color: #f59e0b;">___</span>') : ''}
            </div>

            <div class="options-container" id="context-options">
                ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>

            <div class="feedback" id="context-feedback"></div>

            <button class="next-button" id="context-next-btn" style="display:none;">
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
        <div class="results-container">
            <h2>Сессия завершена!</h2>
            <div class="final-score">${contextModeState.score} / ${contextModeState.sessionLimit}</div>
            <p>Вы прошли 20 вопросов по Ser и Estar. Вопросы перемещены в конец очереди.</p>
            <div class="results-buttons">
                <button class="restart-button" onclick="restartContextMode()">
                    <i data-lucide="rotate-ccw" style="width:16px;height:16px;stroke:currentColor;stroke-width:2"></i> Продолжить тренировку
                </button>
                <button class="menu-button" onclick="showMainMenu()">
                    <i data-lucide="list" style="width:16px;height:16px;stroke:currentColor;stroke-width:2"></i> В меню
                </button>
            </div>
        </div>
    `;
    lucide.createIcons();
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
