// ser-estar-base-ui.js
/**
 * Ser vs Estar - Base Mode (A1) UI Functions
 * Функции отображения для базового режима спряжения
 */

/**
 * Показывает экран выбора глагола (ser или estar)
 */
function displayBaseVerbSelection() {
    const contentArea = document.getElementById('ser-estar-base-area');
    if (!contentArea) {
        console.error('ser-estar-base-area not found');
        return;
    }

    contentArea.innerHTML = `
        <div class="verb-selection-container view-enter"> <h3>Выберите глагол для тренировки:</h3> <div class="verb-buttons"> <button class="verb-btn" onclick="startBasePractice('ser')">ser</button> <button class="verb-btn" onclick="startBasePractice('estar')">estar</button> </div> </div> `;
}

/**
 * Отображает вопрос: предложение с пропуском и фишки-формы
 */
function displayBaseQuestion(question) {
    const contentArea = document.getElementById('ser-estar-base-area');
    if (!contentArea) {
        console.error('ser-estar-base-area not found');
        return;
    }

    seRenderConjQuestion(contentArea, Object.assign({
        num: baseModeState.questionCount + 1,
        total: baseModeState.maxQuestions
    }, question), function(selected, btn) {
        checkBaseAnswer(selected, btn, question);
    });
}

/**
 * Обновляет отображение счёта
 */
function updateBaseScore() {
    const scoreValue = document.getElementById('score-value');
    if (scoreValue) {
        scoreValue.textContent = baseModeState.score;
    }
}

/**
 * Обновляет прогресс
 */
function updateBaseProgress() {
    const progressLabel = document.getElementById('progress-label');
    const progressValue = document.getElementById('progress-value');
    if (progressLabel && progressValue) {
        const percentage = Math.round((baseModeState.questionCount / baseModeState.maxQuestions) * 100);
        progressLabel.textContent = 'Прогресс:';
        progressValue.textContent = `${percentage}%`;
    }
    window.seSetProgress && window.seSetProgress((baseModeState.questionCount / baseModeState.maxQuestions) * 100);
}

// Экспорт
if (typeof window !== 'undefined') {
    window.displayBaseVerbSelection = displayBaseVerbSelection;
    window.displayBaseQuestion = displayBaseQuestion;
    window.updateBaseScore = updateBaseScore;
    window.updateBaseProgress = updateBaseProgress;
}
