/**
 * Ser vs Estar Trainer - Mode 2: UI Functions
 *
 * Функции отображения для режима спряжения.
 */

// ============================================
// UI FUNCTIONS
// ============================================

/**
 * Обновить отображение счета
 */
function updateSerEstarMode2Score() {
    const scoreEl = document.getElementById('score-value');
    if (scoreEl) {
        scoreEl.textContent = serEstarMode2State.score;
    }
}

/**
 * Обновить отображение прогресса
 */
function updateSerEstarMode2Progress() {
    const progressEl = document.getElementById('ser-estar-mode2-progress');
    if (progressEl) {
        progressEl.textContent = serEstarMode2State.currentQuestion + 1;
    }
}

/**
 * Отображает вопрос в игровой зоне с 5 кнопками вариантов ответа
 * @param {Object} question - объект вопроса
 */
function showSerEstarMode2Question(question) {
    // Обновляем прогресс
    updateSerEstarMode2Progress();

    // Показываем информацию о глаголе
    const verbInfoEl = document.getElementById('ser-estar-mode2-verb-info');
    if (verbInfoEl) {
        verbInfoEl.textContent = `${question.questionText}`;
    }

    // Получаем контейнер кнопок
    const optionsContainer = document.getElementById('ser-estar-mode2-options');
    if (!optionsContainer) {
        console.error('ser-estar-mode2-options container not found');
        return;
    }

    // Очищаем контейнер
    optionsContainer.innerHTML = '';

    // Создаём кнопки с вариантами ответов
    if (question.options) {
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.disabled = serEstarMode2State.buttonsDisabled;
            button.onclick = () => handleSerEstarOptionClickUI(option, question.correct);
            optionsContainer.appendChild(button);
        });
    }

    // Очищаем обратную связь
    const feedbackEl = document.getElementById('ser-estar-mode2-feedback');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
    }
}

/**
 * Обработчик клика по кнопке с вариантом ответа (UI версия)
 * @param {string} selected - выбранный вариант
 * @param {string} correct - правильный ответ
 */
function handleSerEstarOptionClickUI(selected, correct) {
    if (serEstarMode2State.buttonsDisabled || serEstarMode2State.isAnswered) {
        return;
    }

    const feedbackEl = document.getElementById('ser-estar-mode2-feedback');
    const buttons = document.querySelectorAll('#ser-estar-mode2-options .option-btn');

    if (!feedbackEl) {
        console.error('Feedback element not found');
        return;
    }

    // Проверяем ответ
    const isCorrect = selected.trim().toLowerCase() === correct.trim().toLowerCase();

    // Обновляем счёт если правильно
    if (isCorrect) {
        serEstarMode2State.score++;
        updateSerEstarMode2Score();
    }

    // Обновляем состояние
    serEstarMode2State.isAnswered = true;
    serEstarMode2State.buttonsDisabled = true;

    // Отображаем обратную связь
    feedbackEl.textContent = isCorrect
        ? `✅ ¡Correcto!`
        : `❌ Incorrecto. La respuesta correcta es: "${correct}"`;
    feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    // Отмечаем кнопки
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Показываем кнопку "Дальше"
    const nextButton = document.getElementById('ser-estar-mode2-next-btn');
    if (nextButton) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = () => {
            serEstarMode2State.isAnswered = false;
            serEstarMode2State.buttonsDisabled = false;
            feedbackEl.textContent = '';
            handleSerEstarNextQuestionUI();
        };
    }
}

/**
 * Обработчик перехода к следующему вопросу (UI версия)
 */
function handleSerEstarNextQuestionUI() {
    serEstarMode2State.currentQuestion++;

    // Проверяем, завершена ли игра
    if (serEstarMode2State.currentQuestion >= serEstarMode2State.totalQuestions) {
        showSerEstarMode2Results();
        return;
    }

    // Сбрасываем состояние для нового вопроса
    serEstarMode2State.isAnswered = false;
    serEstarMode2State.buttonsDisabled = false;

    // Отображаем следующий вопрос
    showSerEstarMode2Question(serEstarMode2State.questions[serEstarMode2State.currentQuestion]);
}

/**
 * Показать результаты режима
 */
function showSerEstarMode2Results() {
    // Скрываем игровую зону
    document.getElementById('ser-estar-mode2-area').classList.add('hidden');
    
    // Показываем результаты
    const resultsEl = document.getElementById('ser-estar-mode2-results');
    if (!resultsEl) {
        console.error('ser-estar-mode2-results not found');
        return;
    }
    resultsEl.classList.remove('hidden');

    const percentage = Math.round((serEstarMode2State.score / serEstarMode2State.totalQuestions) * 100);

    let message = '';
    let emoji = '';

    if (percentage === 100) {
        emoji = '🏆';
        message = '¡Excelente! ¡Perfecto!';
    } else if (percentage >= 80) {
        emoji = '🎉';
        message = '¡Muy bien! Очень хорошо!';
    } else if (percentage >= 60) {
        emoji = '👍';
        message = '¡Bien! Хорошо!';
    } else {
        emoji = '📚';
        message = 'Sigue practicando! Продолжай тренироваться!';
    }

    // Обновляем финальный счет
    const finalScoreEl = document.getElementById('ser-estar-mode2-final-score');
    if (finalScoreEl) {
        finalScoreEl.textContent = `${serEstarMode2State.score} из ${serEstarMode2State.totalQuestions} (${percentage}%)`;
    }

    // Обновляем сообщение
    const messageEl = document.getElementById('ser-estar-mode2-message');
    if (messageEl) {
        messageEl.textContent = `${emoji} ${message}`;
    }
}

// ============================================
// EXPORTS
// ============================================

if (typeof window !== 'undefined') {
    window.updateSerEstarMode2Score = updateSerEstarMode2Score;
    window.updateSerEstarMode2Progress = updateSerEstarMode2Progress;
    window.showSerEstarMode2Question = showSerEstarMode2Question;
    window.handleSerEstarOptionClickUI = handleSerEstarOptionClickUI;
    window.handleSerEstarNextQuestionUI = handleSerEstarNextQuestionUI;
    window.showSerEstarMode2Results = showSerEstarMode2Results;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateSerEstarMode2Score,
        updateSerEstarMode2Progress,
        showSerEstarMode2Question,
        handleSerEstarOptionClickUI,
        handleSerEstarNextQuestionUI,
        showSerEstarMode2Results
    };
}