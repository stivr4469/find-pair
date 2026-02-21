/**
 * Ser vs Estar Trainer - Mode 4: Translation Practice
 *
 * Пользователь видит русский перевод и должен выбрать правильную
 * испанскую форму с SER или ESTAR из нескольких вариантов.
 */

// Состояние игры
let serEstarMode4State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 15,
    shuffled: [],
    buttonsDisabled: false
};

/**
 * Инициализация Mode 4 (Перевод)
 */
function initSerEstarMode4() {
    console.log('[SerEstar Mode4] Initializing...');

    // Сброс состояния
    serEstarMode4State.currentQuestion = 0;
    serEstarMode4State.score = 0;
    serEstarMode4State.buttonsDisabled = false;
    serEstarMode4State.shuffled = shuffleSerEstarArray(MODE4_TRANSLATIONS).slice(0, 15);

    // Скрытие меню и других режимов
    document.querySelector('.main-menu').classList.add('hidden');
    document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));

    // Показать режим Ser/Estar Mode 4
    const mode4Area = document.getElementById('ser-estar-mode4-area');
    if (mode4Area) {
        mode4Area.classList.remove('hidden');
    }

    // Обновить счет
    updateSerEstarMode4Score();

    // Показать первый вопрос
    showSerEstarMode4Question();
}

/**
 * Получить варианты ответов для перевода
 * @param {string} correctForm - правильная форма
 * @param {string} verb - глагол (ser/estar)
 * @returns {Array} массив вариантов
 */
function getSerEstarMode4Options(correctForm, verb) {
    // Все формы SER
    const serForms = Object.values(SER_CONJUGATIONS.presente);
    // Все формы ESTAR
    const estarForms = Object.values(ESTAR_CONJUGATIONS.presente);

    // Собираем все формы
    const allForms = [...serForms, ...estarForms];

    // Фильтруем уникальные формы
    const uniqueForms = [...new Set(allForms)];

    // Находим правильную форму
    const correct = correctForm;

    // Выбираем 3 случайных неправильных ответа
    const wrong = shuffleSerEstarArray(uniqueForms.filter(f => f !== correct)).slice(0, 3);

    // Перемешиваем варианты
    return shuffleSerEstarArray([correct, ...wrong]);
}

/**
 * Показать текущий вопрос
 */
function showSerEstarMode4Question() {
    const question = serEstarMode4State.shuffled[serEstarMode4State.currentQuestion];

    // Обновить прогресс
    document.getElementById('ser-estar-mode4-progress').textContent =
        `Вопрос ${serEstarMode4State.currentQuestion + 1} из ${serEstarMode4State.totalQuestions}`;

    // Показать русский текст для перевода
    document.getElementById('ser-estar-mode4-russian').textContent = question.ru;

    // Очистить обратную связь
    document.getElementById('ser-estar-mode4-feedback').textContent = '';
    document.getElementById('ser-estar-mode4-feedback').className = 'feedback';

    // Используем options из вопроса или генерируем по умолчанию
    const options = question.options || [question.form, question.verb === 'ser' ? 'está' : 'es', 'son'];

    // Настроить кнопки с вариантами
    const buttons = document.querySelectorAll('.ser-estar-mode4-option');
    buttons.forEach((btn, index) => {
        if (index < options.length) {
            btn.textContent = options[index];
            btn.disabled = false;
            btn.className = 'ser-estar-mode4-option button-option';
            btn.onclick = () => checkSerEstarMode4Answer(options[index], question);
        } else {
            btn.style.display = 'none';
        }
    });

    serEstarMode4State.buttonsDisabled = false;
}

/**
 * Проверка ответа
 * @param {string} selected - выбранный ответ
 * @param {Object} question - объект вопроса
 */
function checkSerEstarMode4Answer(selected, question) {
    if (serEstarMode4State.buttonsDisabled) return;
    serEstarMode4State.buttonsDisabled = true;

    const feedback = document.getElementById('ser-estar-mode4-feedback');
    const buttons = document.querySelectorAll('.ser-estar-mode4-option');

    // Отметить кнопки
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === question.form) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && selected !== question.form) {
            btn.classList.add('incorrect');
        }
    });

    // Проверка ответа
    if (selected === question.form) {
        serEstarMode4State.score++;
        feedback.textContent = `✅ ¡Correcto! ${question.es}`;
        feedback.className = 'feedback correct';
        updateSerEstarMode4Score();
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${question.es}`;
        feedback.className = 'feedback incorrect';
    }

    // Обновить счет
    updateSerEstarMode4Score();

    // Следующий вопрос через 2 секунды
    setTimeout(() => {
        serEstarMode4State.currentQuestion++;

        if (serEstarMode4State.currentQuestion >= serEstarMode4State.totalQuestions) {
            showSerEstarMode4Results();
        } else {
            showSerEstarMode4Question();
        }
    }, 2000);
}

/**
 * Обновить отображение счета
 */
function updateSerEstarMode4Score() {
    const scoreEl = document.getElementById('ser-estar-mode4-score');
    if (scoreEl) {
        scoreEl.textContent = serEstarMode4State.score;
    }
}

/**
 * Показать результаты
 */
function showSerEstarMode4Results() {
    document.getElementById('ser-estar-mode4-area').classList.add('hidden');
    document.getElementById('ser-estar-mode4-results').classList.remove('hidden');

    const percentage = Math.round((serEstarMode4State.score / serEstarMode4State.totalQuestions) * 100);
    document.getElementById('ser-estar-mode4-final-score').textContent =
        `${serEstarMode4State.score} из ${serEstarMode4State.totalQuestions} (${percentage}%)`;

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
    document.getElementById('ser-estar-mode4-message').textContent = message;
}

/**
 * Перезапуск режима
 */
function restartSerEstarMode4() {
    document.getElementById('ser-estar-mode4-results').classList.add('hidden');
    initSerEstarMode4();
}

// Экспорт функций
window.initSerEstarMode4 = initSerEstarMode4;
window.restartSerEstarMode4 = restartSerEstarMode4;
window.showSerEstarMode4Question = showSerEstarMode4Question;
window.checkSerEstarMode4Answer = checkSerEstarMode4Answer;
window.updateSerEstarMode4Score = updateSerEstarMode4Score;
window.showSerEstarMode4Results = showSerEstarMode4Results;
window.serEstarMode4State = serEstarMode4State;
window.getSerEstarMode4Options = getSerEstarMode4Options;