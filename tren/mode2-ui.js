// spanish-trainer-app/tren/mode2-ui.js (НОВАЯ ВЕРСИЯ)

function displayAdvancedSettings_tren() {
    const contentArea = document.getElementById('mode2-content');
    if (!contentArea) return;

    const verbs = ['ir', 'venir', 'llegar'];
    const tenses = { 'presente': 'Presente', 'indefinido': 'Indefinido', 'imperfecto': 'Imperfecto', 'futuro': 'Futuro' };

    contentArea.innerHTML = `
        <div class="settings-container">
            <h3>Настройки тренировки (A2)</h3>
            <div class="setting-group">
                <h4>Глаголы:</h4>
                <div id="verbs-settings-tren">
                    ${verbs.map(verb => `<label><input type="checkbox" name="verb" value="${verb}" checked> ${verb}</label>`).join('')}
                </div>
            </div>
            <div class="setting-group">
                <h4>Времена:</h4>
                <div id="tenses-settings-tren">
                    ${Object.keys(tenses).map(tense => `<label><input type="checkbox" name="tense" value="${tense}" checked> ${tenses[tense]}</label>`).join('')}
                </div>
            </div>
            <button class="start-button" id="start-tren-mode2-btn">Начать тренировку</button>
        </div>
    `;

    document.getElementById('start-tren-mode2-btn').addEventListener('click', startAdvancedPractice_tren);
}

function displayAdvancedQuestion_tren(question, options) {
    const contentArea = document.getElementById('mode2-content');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Вопрос ${advancedModeState_tren.questionCount + 1} из ${advancedModeState_tren.maxQuestions}</div>
            <button class="back-to-settings-button" onclick="initMode2()">К настройкам</button>
            <div class="question-text">${question.questionText}</div>
            <div class="options-container" id="mode2-options">
                ${options.map(option => `<button class="option-btn" data-answer="${option}">${option}</button>`).join('')}
            </div>
            <div class="feedback" id="mode2-feedback"></div>
            <button class="next-button" id="mode2-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    contentArea.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!advancedModeState_tren.isAnswered) {
                checkAdvancedAnswer_tren(button.dataset.answer, question.correctAnswer, button);
            }
        });
    });

    document.getElementById('mode2-next-btn').addEventListener('click', handleNextAdvancedQuestion_tren);
}

function showAdvancedResults_tren() {
    const contentArea = document.getElementById('mode2-content');
    if (!contentArea) return;

    const percentage = Math.round((advancedModeState_tren.score / advancedModeState_tren.maxQuestions) * 100);
    let message = (percentage === 100) ? "🎉 ¡Excelente!" : (percentage >= 80) ? "👏 ¡Muy bien!" : "📚 Sigue practicando!";

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${advancedModeState_tren.score} из ${advancedModeState_tren.maxQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="initMode2()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

function updateAdvancedScore_tren() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) scoreElement.textContent = advancedModeState_tren.score;
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayAdvancedSettings_tren = displayAdvancedSettings_tren;
    window.displayAdvancedQuestion_tren = displayAdvancedQuestion_tren;
    window.showAdvancedResults_tren = showAdvancedResults_tren;
    window.updateAdvancedScore_tren = updateAdvancedScore_tren;
}
