// ser-estar-mode2.js
/**
 * Ser vs Estar - Advanced Mode (A2)
 * Продвинутый режим с настройками выбора глаголов и времён
 */

// Состояние игры
let advancedModeState = {
    score: 0,
    questionCount: 0,
    maxQuestions: 10,
    isGameStarted: false,
    isAnswered: false,
    usedTexts: new Set(),
    settings: {
        verbs: ['ser', 'estar'],
        tenses: ['presente', 'indefinido', 'imperfecto', 'futuro']
    }
};

/**
 * Инициализация продвинутого режима
 */
function initAdvancedMode() {
    advancedModeState.isGameStarted = false;
    advancedModeState.isAnswered = false;
    advancedModeState.score = 0;
    advancedModeState.questionCount = 0;
    
    // Показываем экран настроек
    displayAdvancedSettings();
}

/**
 * Показывает экран настроек
 */
function displayAdvancedSettings() {
    const contentArea = document.getElementById('ser-estar-advanced-area');
    if (!contentArea) {
        console.error('ser-estar-advanced-area not found');
        return;
    }

    const verbs = ['ser', 'estar'];
    const tenses = {
        'presente': 'Presente',
        'indefinido': 'Indefinido',
        'imperfecto': 'Imperfecto',
        'futuro': 'Futuro'
    };

    contentArea.innerHTML = `
        <div class="settings-container view-enter"> <h3>Настройки тренировки (A2)</h3> <div class="setting-group"> <h4>Глаголы:</h4> <div id="verbs-settings"> ${verbs.map(verb => `
                        <label> <input type="checkbox" name="verb" value="${verb}" checked> ${verb}
                        </label> `).join('')}
                </div> </div> <div class="setting-group"> <h4>Времена:</h4> <div id="tenses-settings"> ${Object.keys(tenses).map(tense => `
                        <label> <input type="checkbox" name="tense" value="${tense}" checked> ${tenses[tense]}
                        </label> `).join('')}
                </div> </div> <button class="start-button" onclick="startAdvancedPractice()">Начать тренировку</button> </div> `;
}

/**
 * Запуск тренировки после настроек
 */
function startAdvancedPractice() {
    // Собираем выбранные настройки
    const selectedVerbs = Array.from(document.querySelectorAll('#verbs-settings input:checked'))
        .map(cb => cb.value);
    const selectedTenses = Array.from(document.querySelectorAll('#tenses-settings input:checked'))
        .map(cb => cb.value);

    // Валидация
    if (selectedVerbs.length === 0 || selectedTenses.length === 0) {
        alert('Выберите хотя бы один глагол и одно время для тренировки.');
        return;
    }

    // Сохраняем настройки
    advancedModeState.settings.verbs = selectedVerbs;
    advancedModeState.settings.tenses = selectedTenses;
    advancedModeState.isGameStarted = true;
    advancedModeState.score = 0;
    advancedModeState.questionCount = 0;
    advancedModeState.isAnswered = false;
    advancedModeState.usedTexts = new Set();

    // Обновляем счёт
    updateAdvancedScore();

    // Генерируем и показываем первый вопрос
    generateAndShowAdvancedQuestion();
}

/**
 * Генерирует и показывает вопрос: случайные глагол/время/лицо из настроек, предложение с пропуском
 */
function generateAndShowAdvancedQuestion() {
    if (advancedModeState.questionCount >= advancedModeState.maxQuestions) {
        showAdvancedResults();
        return;
    }

    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const verb = pick(advancedModeState.settings.verbs);
    const tense = pick(advancedModeState.settings.tenses);
    const person = pick(SE_PERSONS);
    const sentence = seConjSentence(verb, tense, person, undefined, advancedModeState.usedTexts);
    advancedModeState.usedTexts.add(sentence.text);

    const question = { verb, tense, person, sentence, options: seConjOptions(verb, tense, person) };
    displayAdvancedQuestion(question);
    updateAdvancedProgress();
}

/**
 * Отображает вопрос
 */
function displayAdvancedQuestion(question) {
    const contentArea = document.getElementById('ser-estar-advanced-area');
    if (!contentArea) return;

    seRenderConjQuestion(contentArea, Object.assign({
        num: advancedModeState.questionCount + 1,
        total: advancedModeState.maxQuestions,
        headerHtml: '<button class="back-to-settings-button" onclick="initAdvancedMode()">К настройкам</button>'
    }, question), function(selected, btn) {
        checkAdvancedAnswer(selected, btn, question);
    });
}

/**
 * Проверка ответа
 */
function checkAdvancedAnswer(selected, buttonElement, question) {
    if (advancedModeState.isAnswered) return;
    advancedModeState.isAnswered = true;

    const area = document.getElementById('ser-estar-advanced-area');
    const isCorrect = seRevealConjAnswer(area, selected, buttonElement, question, nextAdvancedQuestion);
    if (isCorrect) {
        advancedModeState.score++;
        updateAdvancedScore();
        window.njAddStreak && window.njCorrect(window.njAddStreak());
    } else {
        window.njWrong && window.njWrong(null, null);
    }
}

/**
 * Переход к следующему вопросу
 */
function nextAdvancedQuestion() {
    advancedModeState.questionCount++;
    advancedModeState.isAnswered = false;
    generateAndShowAdvancedQuestion();
}

/**
 * Обновление счёта
 */
function updateAdvancedScore() {
    const scoreValue = document.getElementById('score-value');
    if (scoreValue) {
        scoreValue.textContent = advancedModeState.score;
    }
}

/**
 * Обновление прогресса
 */
function updateAdvancedProgress() {
    const progressLabel = document.getElementById('progress-label');
    const progressValue = document.getElementById('progress-value');
    if (progressLabel && progressValue) {
        const percentage = Math.round((advancedModeState.questionCount / advancedModeState.maxQuestions) * 100);
        progressLabel.textContent = 'Прогресс:';
        progressValue.textContent = `${percentage}%`;
    }
    window.seSetProgress && window.seSetProgress((advancedModeState.questionCount / advancedModeState.maxQuestions) * 100);
}

/**
 * Показ результатов
 */
function showAdvancedResults() {
    const contentArea = document.getElementById('ser-estar-advanced-area');
    if (!contentArea) return;

    const percentage = Math.round((advancedModeState.score / advancedModeState.maxQuestions) * 100);
    window.njResult && window.njResult(percentage);

    let message = '';
    if (percentage === 100) {
        message = '¡Excelente! Perfecto!';
    } else if (percentage >= 80) {
        message = '¡Muy bien!';
    } else if (percentage >= 60) {
        message = '¡Bien!';
    } else {
        message = 'Sigue practicando!';
    }

    contentArea.innerHTML = `
        <div class="results-container view-enter"> <h3>Результаты</h3> <div class="final-score">${advancedModeState.score} из ${advancedModeState.maxQuestions} (${percentage}%)</div> <div class="final-message">${message}</div> <div class="results-buttons"> <button class="restart-button" onclick="initAdvancedMode()"> Ещё раз
                </button> <button class="menu-button" onclick="SerEstarApp.showMainMenu()"> Меню
                </button> </div> </div> `;
    lucide.createIcons();
}

// Экспорт
if (typeof window !== 'undefined') {
    window.advancedModeState = advancedModeState;
    window.initAdvancedMode = initAdvancedMode;
    window.startAdvancedPractice = startAdvancedPractice;
    window.displayAdvancedSettings = displayAdvancedSettings;
}
