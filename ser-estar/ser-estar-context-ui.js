/**
 * Ser vs Estar Trainer - Context Mode: UI Functions
 * Улучшенный интерфейс с поддержкой объяснений и прогресса.
 */

function displayContextQuestionUI(question) {
    const contentArea = document.getElementById('ser-estar-context-area');
    if (!contentArea) return;

    var qNum = contextModeState.totalAnswered + 1;
    var qTotal = contextModeState.sessionLimit;
    window.seSetProgress && window.seSetProgress((contextModeState.totalAnswered / qTotal) * 100);
    var blankHtml = question.text
        ? question.text.replace('___', '<span class="ctx-blank">___</span>')
        : '';

    contentArea.innerHTML = `
        <div class="ctx-question-card">
            <div class="ctx-progress-label">ВОПРОС ${qNum} ИЗ ${qTotal} &middot; ВСТАВЬ SER ИЛИ ESTAR</div>

            <div class="ctx-question-text">${blankHtml}</div>

            <div class="ctx-translation">${question.translation}</div>

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
    window.njResult && window.njResult(percentage);
    
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
    window.seUpdateScore ? window.seUpdateScore(contextModeState.score) : (function() {
        var el = document.getElementById('score-value');
        if (el) el.textContent = contextModeState.score;
    })();
}

// Экспорт
window.displayContextQuestionUI = displayContextQuestionUI;
window.showContextResultsUI = showContextResultsUI;
window.updateContextScoreUI = updateContextScoreUI;
