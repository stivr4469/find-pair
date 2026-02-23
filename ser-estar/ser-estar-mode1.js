/**
 * Ser vs Estar Trainer - Mode 1: Choose Correct Verb
 * 
 * Пользователь видит предложение с пропуском и выбирает SER или ESTAR.
 * После выбора показывается объяснение, почему нужен именно этот глагол.
 */

// Состояние игры
let serEstarMode1State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    shuffled: [],
    buttonsDisabled: false
};

/**
 * Перемешивание массива (Fisher-Yates)
 */
function shuffleSerEstarArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Инициализация Mode 1
 */
function initSerEstarMode1() {
    console.log('[SerEstar Mode1] Initializing...');
    
    // Сброс состояния
    serEstarMode1State.currentQuestion = 0;
    serEstarMode1State.score = 0;
    serEstarMode1State.buttonsDisabled = false;
    serEstarMode1State.shuffled = shuffleSerEstarArray(MODE1_SENTENCES).slice(0, 10);
    
    // Скрытие меню и других режимов
    document.querySelector('.main-menu').classList.add('hidden');
    document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
    
    // Показать режим Ser/Estar Mode 1
    const mode1Area = document.getElementById('ser-estar-mode1-area');
    if (mode1Area) {
        mode1Area.classList.remove('hidden');
    }
    
    // Обновить счет
    updateSerEstarScore();
    
    // Показать первый вопрос
    showSerEstarMode1Question();
}

/**
 * Показать текущий вопрос
 */
function showSerEstarMode1Question() {
    const question = serEstarMode1State.shuffled[serEstarMode1State.currentQuestion];
    
    // Обновить прогресс
    document.getElementById('ser-estar-mode1-progress').textContent = 
        `Вопрос ${serEstarMode1State.currentQuestion + 1} из ${serEstarMode1State.totalQuestions}`;
    
    // Показать предложение с пропуском
    document.getElementById('ser-estar-mode1-question').textContent = question.text;
    document.getElementById('ser-estar-mode1-translation').textContent = question.translation;
    
    // Очистить обратную связь
    document.getElementById('ser-estar-mode1-feedback').textContent = '';
    document.getElementById('ser-estar-mode1-feedback').className = 'feedback';
    
    // Настроить кнопки
    const buttons = document.querySelectorAll('.ser-estar-mode1-option');
    buttons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.disabled = false;
        btn.className = 'ser-estar-mode1-option button-option';
        btn.onclick = () => checkSerEstarMode1Answer(question.options[index], question);
    });
    
    serEstarMode1State.buttonsDisabled = false;
}

/**
 * Проверка ответа
 */
function checkSerEstarMode1Answer(selected, question) {
    if (serEstarMode1State.buttonsDisabled) return;
    serEstarMode1State.buttonsDisabled = true;
    
    const feedback = document.getElementById('ser-estar-mode1-feedback');
    const buttons = document.querySelectorAll('.ser-estar-mode1-option');
    
    // Отметить кнопки
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === question.correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && selected !== question.correct) {
            btn.classList.add('incorrect');
        }
    });

    // Нормализация строк для корректного сравнения Unicode
    const normalize = (str) => str.trim().normalize('NFC').toLowerCase();
    const normalizedSelected = normalize(selected);
    const normalizedCorrect = normalize(question.correct);

    // Проверка ответа
    if (normalizedSelected === normalizedCorrect) {
        serEstarMode1State.score++;
        feedback.textContent = `✅ ¡Correcto! ${question.explanation}`;
        feedback.className = 'feedback correct';
        updateSerEstarScore();
    } else {
        feedback.textContent = `❌ Incorrecto. ${question.explanation}`;
        feedback.className = 'feedback incorrect';
    }

    // Обновить счет
    updateSerEstarScore();

    // Показываем кнопку "Дальше"
    const nextButton = document.getElementById('ser-estar-mode1-next-btn');
    if (nextButton) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = () => {
            serEstarMode1State.currentQuestion++;
            feedback.textContent = '';

            if (serEstarMode1State.currentQuestion >= serEstarMode1State.totalQuestions) {
                showSerEstarMode1Results();
            } else {
                showSerEstarMode1Question();
            }
        };
    }
}

/**
 * Обновить отображение счета
 */
function updateSerEstarScore() {
    const scoreEl = document.getElementById('ser-estar-mode1-score');
    if (scoreEl) {
        scoreEl.textContent = serEstarMode1State.score;
    }
}

/**
 * Показать результаты
 */
function showSerEstarMode1Results() {
    document.getElementById('ser-estar-mode1-area').classList.add('hidden');
    document.getElementById('ser-estar-mode1-results').classList.remove('hidden');
    
    const percentage = Math.round((serEstarMode1State.score / serEstarMode1State.totalQuestions) * 100);
    document.getElementById('ser-estar-mode1-final-score').textContent = 
        `${serEstarMode1State.score} из ${serEstarMode1State.totalQuestions} (${percentage}%)`;
    
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
    document.getElementById('ser-estar-mode1-message').textContent = message;
}

/**
 * Перезапуск режима
 */
function restartSerEstarMode1() {
    document.getElementById('ser-estar-mode1-results').classList.add('hidden');
    initSerEstarMode1();
}

// Экспорт функций
window.initSerEstarMode1 = initSerEstarMode1;
window.restartSerEstarMode1 = restartSerEstarMode1;
window.showSerEstarMode1Question = showSerEstarMode1Question;
window.checkSerEstarMode1Answer = checkSerEstarMode1Answer;
window.updateSerEstarScore = updateSerEstarScore;
window.showSerEstarMode1Results = showSerEstarMode1Results;
window.serEstarMode1State = serEstarMode1State;
