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
        <div class="settings-container">
            <h3>Настройки тренировки (A2)</h3>

            <div class="setting-group">
                <h4>Глаголы:</h4>
                <div id="verbs-settings">
                    ${verbs.map(verb => `
                        <label>
                            <input type="checkbox" name="verb" value="${verb}" checked>
                            ${verb}
                        </label>
                    `).join('')}
                </div>
            </div>

            <div class="setting-group">
                <h4>Времена:</h4>
                <div id="tenses-settings">
                    ${Object.keys(tenses).map(tense => `
                        <label>
                            <input type="checkbox" name="tense" value="${tense}" checked>
                            ${tenses[tense]}
                        </label>
                    `).join('')}
                </div>
            </div>

            <button class="start-button" onclick="startAdvancedPractice()">Начать тренировку</button>
        </div>
    `;
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

    // Обновляем счёт
    updateAdvancedScore();

    // Генерируем и показываем первый вопрос
    generateAndShowAdvancedQuestion();
}

/**
 * Генерирует и показывает вопрос
 */
function generateAndShowAdvancedQuestion() {
    if (advancedModeState.questionCount >= advancedModeState.maxQuestions) {
        showAdvancedResults();
        return;
    }

    // Случайный выбор из настроек
    const verb = advancedModeState.settings.verbs[
        Math.floor(Math.random() * advancedModeState.settings.verbs.length)
    ];
    const tense = advancedModeState.settings.tenses[
        Math.floor(Math.random() * advancedModeState.settings.tenses.length)
    ];
    const persons = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];
    const person = persons[Math.floor(Math.random() * persons.length)];

    const correctAnswer = CONJUGATIONS[verb][tense][person];
    const question = { verb, tense, person, correctAnswer };

    // Генерируем варианты ответов
    const options = generateAdvancedOptions(correctAnswer, verb, tense);

    // Отображаем вопрос
    displayAdvancedQuestion(question, options);
    updateAdvancedProgress();
}

/**
 * Генерирует варианты ответов
 */
function generateAdvancedOptions(correctAnswer, verb, tense) {
    const options = new Set();
    options.add(correctAnswer);

    const persons = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];
    const tenses = ['presente', 'indefinido', 'imperfecto', 'futuro'];

    // Другие времена того же глагола
    for (const t of tenses) {
        if (t !== tense) {
            for (const p of persons) {
                options.add(CONJUGATIONS[verb][t][p]);
                if (options.size >= 5) break;
            }
        }
        if (options.size >= 5) break;
    }

    // Другой глагол
    if (options.size < 5) {
        const otherVerb = verb === 'ser' ? 'estar' : 'ser';
        for (const t of ['presente']) {
            for (const p of persons) {
                options.add(CONJUGATIONS[otherVerb][t][p]);
                if (options.size >= 5) break;
            }
            if (options.size >= 5) break;
        }
    }

    // Перемешиваем
    const optionsArray = Array.from(options);
    for (let i = optionsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }

    return optionsArray.slice(0, 5);
}

/**
 * Отображает вопрос
 */
function displayAdvancedQuestion(question, options) {
    const contentArea = document.getElementById('ser-estar-advanced-area');
    if (!contentArea) return;

    const tenseNames = {
        'presente': 'presente',
        'indefinido': 'indefinido',
        'imperfecto': 'imperfecto',
        'futuro': 'futuro'
    };

    const personNames = {
        'yo': 'yo',
        'tu': 'tú',
        'el/ella': 'él/ella',
        'nosotros': 'nosotros',
        'vosotros': 'vosotros',
        'ellos': 'ellos/ellas'
    };

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="question-number">
                Вопрос ${advancedModeState.questionCount + 1} из ${advancedModeState.maxQuestions}
            </div>
            <button class="back-to-settings-button" onclick="initAdvancedMode()">К настройкам</button>
            <div class="question-text">
                Conjugación de '${question.verb}' en ${tenseNames[question.tense]} para '${personNames[question.person]}'
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

    // Обработчики на кнопки
    const optionButtons = contentArea.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.dataset.answer;
            checkAdvancedAnswer(selected, question.correctAnswer, btn);
        });
    });
}

/**
 * Проверка ответа
 */
function checkAdvancedAnswer(selected, correct, buttonElement) {
    const allButtons = document.querySelectorAll('#ser-estar-advanced-area .option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    const normalize = (str) => str.trim().normalize('NFC').toLowerCase();
    const isCorrect = normalize(selected) === normalize(correct);

    const feedback = document.getElementById('ser-estar-advanced-area').querySelector('.feedback');
    if (feedback) {
        if (isCorrect) {
            feedback.textContent = '✅ ¡Correcto!';
            feedback.className = 'feedback correct';
            buttonElement.classList.add('correct');
            advancedModeState.score++;
            updateAdvancedScore();
        } else {
            feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${correct}`;
            feedback.className = 'feedback wrong';
            buttonElement.classList.add('incorrect');

            allButtons.forEach(btn => {
                if (normalize(btn.dataset.answer) === normalize(correct)) {
                    btn.classList.add('correct');
                }
            });
        }
    }

    const nextButton = document.getElementById('ser-estar-advanced-area').querySelector('.next-button');
    if (nextButton) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = nextAdvancedQuestion;
    }

    advancedModeState.isAnswered = true;
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
}

/**
 * Показ результатов
 */
function showAdvancedResults() {
    const contentArea = document.getElementById('ser-estar-advanced-area');
    if (!contentArea) return;

    const percentage = Math.round((advancedModeState.score / advancedModeState.maxQuestions) * 100);

    let message = '';
    if (percentage === 100) {
        message = '🎉 ¡Excelente! Perfecto!';
    } else if (percentage >= 80) {
        message = '👏 ¡Muy bien!';
    } else if (percentage >= 60) {
        message = '👍 ¡Bien!';
    } else {
        message = '📚 Sigue practicando!';
    }

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${advancedModeState.score} из ${advancedModeState.maxQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="initAdvancedMode()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="SerEstarApp.showMainMenu()">📋 Меню</button>
        </div>
    `;
}

// Экспорт
if (typeof window !== 'undefined') {
    window.advancedModeState = advancedModeState;
    window.initAdvancedMode = initAdvancedMode;
    window.startAdvancedPractice = startAdvancedPractice;
    window.displayAdvancedSettings = displayAdvancedSettings;
}
