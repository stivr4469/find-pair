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
 * Генерирует и показывает вопрос
 */
function generateAndShowBaseQuestion() {
    if (baseModeState.questionCount >= baseModeState.maxQuestions) {
        showBaseResults();
        return;
    }
    
    // Последовательный перебор лиц
    const personIndex = baseModeState.questionCount % 6;
    const person = baseModeState.persons[personIndex];
    const verb = baseModeState.selectedVerb;
    const correctAnswer = CONJUGATIONS[verb]['presente'][person];
    
    const question = { verb, person, correctAnswer };
    
    // Генерируем варианты ответов (правильный + 4 неправильных)
    const options = generateBaseOptions(correctAnswer, verb);
    
    // Отображаем вопрос
    displayBaseQuestion(question, options);
    updateBaseProgress();
}

/**
 * Генерирует варианты ответов для вопроса
 */
function generateBaseOptions(correctAnswer, verb) {
    const options = new Set();
    options.add(correctAnswer);
    
    // Добавляем другие формы этого же глагола
    const tenses = ['presente', 'indefinido', 'imperfecto', 'futuro'];
    const persons = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];
    
    for (const tense of tenses) {
        for (const person of persons) {
            if (CONJUGATIONS[verb][tense][person] !== correctAnswer) {
                options.add(CONJUGATIONS[verb][tense][person]);
            }
            if (options.size >= 5) break;
        }
        if (options.size >= 5) break;
    }
    
    // Если мало вариантов, добавляем формы другого глагола
    const otherVerb = verb === 'ser' ? 'estar' : 'ser';
    if (options.size < 5) {
        for (const tense of ['presente']) {
            for (const person of persons) {
                options.add(CONJUGATIONS[otherVerb][tense][person]);
                if (options.size >= 5) break;
            }
            if (options.size >= 5) break;
        }
    }
    
    // Перемешиваем и берём 5
    const optionsArray = Array.from(options);
    for (let i = optionsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }
    
    return optionsArray.slice(0, 5);
}

/**
 * Проверка ответа
 */
function checkBaseAnswer(selected, correct, buttonElement) {
    // Блокируем все кнопки
    const allButtons = document.querySelectorAll('#ser-estar-base-area .option-btn');
    allButtons.forEach(btn => btn.disabled = true);
    
    // Нормализация строк
    const normalize = (str) => str.trim().normalize('NFC').toLowerCase();
    const isCorrect = normalize(selected) === normalize(correct);
    
    // Показываем обратную связь
    const feedback = document.getElementById('ser-estar-base-area').querySelector('.feedback');
    if (feedback) {
        if (isCorrect) {
            feedback.textContent = '✅ ¡Correcto!';
            feedback.className = 'feedback correct';
            buttonElement.classList.add('correct');
            baseModeState.score++;
            updateBaseScore();
        } else {
            feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${correct}`;
            feedback.className = 'feedback wrong';
            buttonElement.classList.add('incorrect');
            
            // Подсветить правильную кнопку
            allButtons.forEach(btn => {
                if (normalize(btn.dataset.answer) === normalize(correct)) {
                    btn.classList.add('correct');
                }
            });
        }
    }
    
    // Показать кнопку "Дальше"
    const nextButton = document.getElementById('ser-estar-base-area').querySelector('.next-button');
    if (nextButton) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = nextBaseQuestion;
    }
    
    baseModeState.isAnswered = true;
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
            <div class="final-score">${baseModeState.score} из ${baseModeState.maxQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="initBaseMode()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="SerEstarApp.showMainMenu()">📋 Меню</button>
        </div>
    `;
}

// Экспорт
if (typeof window !== 'undefined') {
    window.baseModeState = baseModeState;
    window.initBaseMode = initBaseMode;
    window.startBasePractice = startBasePractice;
    window.checkBaseAnswer = checkBaseAnswer;
    window.nextBaseQuestion = nextBaseQuestion;
}
