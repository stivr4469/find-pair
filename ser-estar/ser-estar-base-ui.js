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
        <div class="verb-selection-container">
            <h3>Выберите глагол для тренировки:</h3>
            <div class="verb-buttons">
                <button class="verb-btn" onclick="startBasePractice('ser')">ser</button>
                <button class="verb-btn" onclick="startBasePractice('estar')">estar</button>
            </div>
        </div>
    `;
}

/**
 * Отображает вопрос и варианты ответа для базового режима
 */
function displayBaseQuestion(question, options) {
    const contentArea = document.getElementById('ser-estar-base-area');
    if (!contentArea) {
        console.error('ser-estar-base-area not found');
        return;
    }

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="question-number">
                Вопрос ${baseModeState.questionCount + 1} из ${baseModeState.maxQuestions}
            </div>
            <div class="question-text">
                Conjugación de '${question.verb}' en presente para '${question.person}'
            </div>
            <div class="options-container">
                ${options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button>
                `).join('')}
            </div>
            <div class="feedback"></div>
            <button class="next-button" style="display: none;">Дальше →</button>
        </div>
    `;

    // Добавляем обработчики на кнопки
    const optionButtons = contentArea.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.dataset.answer;
            checkBaseAnswer(selected, question.correctAnswer, btn);
        });
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
}

// Экспорт
if (typeof window !== 'undefined') {
    window.displayBaseVerbSelection = displayBaseVerbSelection;
    window.displayBaseQuestion = displayBaseQuestion;
    window.updateBaseScore = updateBaseScore;
    window.updateBaseProgress = updateBaseProgress;
}
