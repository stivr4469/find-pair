// ser-estar-base-mode.js
/**
 * Ser vs Estar - Base Mode (A1) Game Logic
 * Основная игровая логика базового режима спряжения
 */

// Состояние игры
let baseModeState = {
    selectedVerb: null,
    questionCount: 0,
    score: 0,
    maxQuestions: 12, // 2 круга по 6 лиц
    persons: ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'],
    isAnswered: false
};

/**
 * Инициализация базового режима
 */
function initBaseMode() {
    baseModeState.selectedVerb = null;
    baseModeState.questionCount = 0;
    baseModeState.score = 0;
    baseModeState.isAnswered = false;
    
    // Показываем экран выбора глагола
    displayBaseVerbSelection();
}

/**
 * Запуск тренировки после выбора глагола
 * @param {string} verb - выбранный глагол (ser или estar)
 */
function startBasePractice(verb) {
    baseModeState.selectedVerb = verb;
    baseModeState.questionCount = 0;
    baseModeState.score = 0;
    baseModeState.isAnswered = false;
    
    // Обновляем счёт
    updateBaseScore();
    
    // Генерируем и показываем первый вопрос
    generateAndShowBaseQuestion();
}

/**
 * Генерирует и показывает вопрос: предложение с пропуском, лица по кругу
 */
function generateAndShowBaseQuestion() {
    if (baseModeState.questionCount >= baseModeState.maxQuestions) {
        showBaseResults();
        return;
    }

    const round = Math.floor(baseModeState.questionCount / baseModeState.persons.length);
    const person = baseModeState.persons[baseModeState.questionCount % baseModeState.persons.length];
    const verb = baseModeState.selectedVerb;
    const question = {
        verb, tense: 'presente', person,
        sentence: seConjSentence(verb, 'presente', person, round),
        options: seConjOptions(verb, 'presente', person)
    };

    displayBaseQuestion(question);
    updateBaseProgress();
}

/**
 * Проверка ответа
 */
function checkBaseAnswer(selected, buttonElement, question) {
    if (baseModeState.isAnswered) return;
    baseModeState.isAnswered = true;

    const area = document.getElementById('ser-estar-base-area');
    const isCorrect = seRevealConjAnswer(area, selected, buttonElement, question, nextBaseQuestion);
    if (isCorrect) {
        baseModeState.score++;
        updateBaseScore();
        window.njAddStreak && window.njCorrect(window.njAddStreak());
    } else {
        window.njWrong && window.njWrong(null, null);
    }
}

/**
 * Переход к следующему вопросу
 */
function nextBaseQuestion() {
    baseModeState.questionCount++;
    baseModeState.isAnswered = false;
    generateAndShowBaseQuestion();
}

/**
 * Показ результатов
 */
function showBaseResults() {
    const contentArea = document.getElementById('ser-estar-base-area');
    if (!contentArea) return;
    
    const percentage = Math.round((baseModeState.score / baseModeState.maxQuestions) * 100);
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
        <div class="results-container view-enter"> <h3>Результаты</h3> <div class="final-score">${baseModeState.score} из ${baseModeState.maxQuestions} (${percentage}%)</div> <div class="final-message">${message}</div> <div class="results-buttons"> <button class="restart-button" onclick="initBaseMode()"> Ещё раз
                </button> <button class="menu-button" onclick="SerEstarApp.showMainMenu()"> Меню
                </button> </div> </div> `;
    lucide.createIcons();
}

// Экспорт
if (typeof window !== 'undefined') {
    window.baseModeState = baseModeState;
    window.initBaseMode = initBaseMode;
    window.startBasePractice = startBasePractice;
    window.checkBaseAnswer = checkBaseAnswer;
    window.nextBaseQuestion = nextBaseQuestion;
}
