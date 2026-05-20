/**
 * Ser vs Estar Trainer - Mode 3: Usage Rule Quiz
 * 
 * Пользователь видит предложение и должен определить, какое правило
 * применяется (категория SER или ESTAR).
 */

// Состояние игры
let serEstarMode3State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    shuffled: [],
    buttonsDisabled: false
};

/**
 * Получить варианты ответов для правила
 */
function getSerEstarMode3Options(correctRule) {
    // Все правила SER
    const serRules = Object.keys(SER_RULES);
    // Все правила ESTAR
    const estarRules = Object.keys(ESTAR_RULES);
    
    // Собираем все правила
    const allRules = [
        ...serRules.map(r => ({ rule: r, verb: 'ser', name: SER_RULES[r].name })),
        ...estarRules.map(r => ({ rule: r, verb: 'estar', name: ESTAR_RULES[r].name }))
    ];
    
    // Находим правильное правило
    const correct = allRules.find(r => r.rule === correctRule);
    
    // Выбираем 2 случайных неправильных ответа
    const wrong = shuffleSerEstarArray(allRules.filter(r => r.rule !== correctRule)).slice(0, 2);
    
    // Перемешиваем варианты
    return shuffleSerEstarArray([correct, ...wrong]);
}

/**
 * Инициализация Mode 3
 */
function initSerEstarMode3() {
    console.log('[SerEstar Mode3] Initializing...');
    
    // Сброс состояния
    serEstarMode3State.currentQuestion = 0;
    serEstarMode3State.score = 0;
    serEstarMode3State.buttonsDisabled = false;
    serEstarMode3State.shuffled = shuffleSerEstarArray(MODE3_QUESTIONS);
    
    // Скрытие меню и других режимов
    document.querySelector('.main-menu').classList.add('hidden');
    document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
    
    // Показать режим Ser/Estar Mode 3
    const mode3Area = document.getElementById('ser-estar-mode3-area');
    if (mode3Area) {
        mode3Area.classList.remove('hidden');
    }
    
    // Обновить счет
    updateSerEstarMode3Score();
    
    // Показать первый вопрос
    showSerEstarMode3Question();
}

/**
 * Показать текущий вопрос
 */
function showSerEstarMode3Question() {
    const question = serEstarMode3State.shuffled[serEstarMode3State.currentQuestion];
    const options = getSerEstarMode3Options(question.correctRule);
    
    // Обновить прогресс
    document.getElementById('ser-estar-mode3-progress').textContent = 
        `Вопрос ${serEstarMode3State.currentQuestion + 1} из ${serEstarMode3State.totalQuestions}`;
    
    // Показать предложение
    document.getElementById('ser-estar-mode3-sentence').textContent = question.sentence;
    document.getElementById('ser-estar-mode3-translation').textContent = question.translation;
    
    // Очистить обратную связь
    document.getElementById('ser-estar-mode3-feedback').textContent = '';
    document.getElementById('ser-estar-mode3-feedback').className = 'feedback';
    
    // Настроить кнопки с вариантами
    const buttons = document.querySelectorAll('.ser-estar-mode3-option');
    buttons.forEach((btn, index) => {
        const option = options[index];
        const verbColor = option.verb === 'ser' ? 'ser' : 'estar';
        btn.textContent = `${option.rule} - ${option.name}`;
        btn.className = `ser-estar-mode3-option button-option ${verbColor}`;
        btn.disabled = false;
        btn.onclick = () => checkSerEstarMode3Answer(option.rule, question);
    });
    
    serEstarMode3State.buttonsDisabled = false;
}

/**
 * Проверка ответа
 */
function checkSerEstarMode3Answer(selected, question) {
    if (serEstarMode3State.buttonsDisabled) return;
    serEstarMode3State.buttonsDisabled = true;
    
    const feedback = document.getElementById('ser-estar-mode3-feedback');
    const buttons = document.querySelectorAll('.ser-estar-mode3-option');
    
    // Найти данные выбранного правила
    const allRules = {
        ...Object.keys(SER_RULES).reduce((acc, r) => { acc[r] = 'ser'; return acc; }, {}),
        ...Object.keys(ESTAR_RULES).reduce((acc, r) => { acc[r] = 'estar'; return acc; }, {})
    };
    
    // Отметить кнопки
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnRule = btn.textContent.split(' - ')[0];
        if (btnRule === question.correctRule) {
            btn.classList.add('correct');
        } else if (btnRule === selected && selected !== question.correctRule) {
            btn.classList.add('incorrect');
        }
    });

    // Нормализация строк для корректного сравнения Unicode
    const normalize = (str) => str.trim().normalize('NFC').toLowerCase();
    const normalizedSelected = normalize(selected);
    const normalizedCorrect = normalize(question.correctRule);

    // Проверка ответа
    if (normalizedSelected === normalizedCorrect) {
        serEstarMode3State.score++;
        const ruleName = question.verb === 'ser' ? SER_RULES[question.correctRule].name : ESTAR_RULES[question.correctRule].name;
        feedback.textContent = `✅ ¡Correcto! ${question.verb.toUpperCase()}: ${ruleName}`;
        feedback.className = 'feedback correct';
        updateSerEstarMode3Score();
    } else {
        const correctRuleName = question.verb === 'ser' ? SER_RULES[question.correctRule].name : ESTAR_RULES[question.correctRule].name;
        feedback.textContent = `❌ Incorrecto. Правильно: ${question.correctRule} - ${correctRuleName}`;
        feedback.className = 'feedback incorrect';
    }

    // Показываем кнопку "Дальше"
    const nextButton = document.getElementById('ser-estar-mode3-next-btn');
    if (nextButton) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = () => {
            serEstarMode3State.currentQuestion++;
            feedback.textContent = '';

            if (serEstarMode3State.currentQuestion >= serEstarMode3State.totalQuestions) {
                showSerEstarMode3Results();
            } else {
                showSerEstarMode3Question();
            }
        };
    }
}

/**
 * Обновить отображение счета
 */
function updateSerEstarMode3Score() {
    const scoreEl = document.getElementById('ser-estar-mode3-score');
    if (scoreEl) {
        scoreEl.textContent = serEstarMode3State.score;
    }
}

/**
 * Показать результаты
 */
function showSerEstarMode3Results() {
    document.getElementById('ser-estar-mode3-area').classList.add('hidden');
    document.getElementById('ser-estar-mode3-results').classList.remove('hidden');
    
    const percentage = Math.round((serEstarMode3State.score / serEstarMode3State.totalQuestions) * 100);
    document.getElementById('ser-estar-mode3-final-score').textContent = 
        `${serEstarMode3State.score} из ${serEstarMode3State.totalQuestions} (${percentage}%)`;
    
    let message = '';
    if (percentage === 100) {
        message = '🎉 ¡Excelente! Perfecto!';
    } else if (percentage >= 80) {
        message = '👏 ¡Muy bien! Очень хорошо!';
    } else if (percentage >= 60) {
        message = '👍 ¡Bien! Хорошо!';
    } else {
        message = '📚 Sigue practicando! Продолжай тренироваться!';
    }
    document.getElementById('ser-estar-mode3-message').textContent = message;
}

/**
 * Перезапуск режима
 */
function restartSerEstarMode3() {
    document.getElementById('ser-estar-mode3-results').classList.add('hidden');
    initSerEstarMode3();
}

// Экспорт функций
window.initSerEstarMode3 = initSerEstarMode3;
window.restartSerEstarMode3 = restartSerEstarMode3;
window.showSerEstarMode3Question = showSerEstarMode3Question;
window.checkSerEstarMode3Answer = checkSerEstarMode3Answer;
window.updateSerEstarMode3Score = updateSerEstarMode3Score;
window.showSerEstarMode3Results = showSerEstarMode3Results;
window.serEstarMode3State = serEstarMode3State;
window.getSerEstarMode3Options = getSerEstarMode3Options;
