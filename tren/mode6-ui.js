// spanish-trainer-app/tren/mode6-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 6: UI Functions
 * Функции отображения для режима "Выбор в предложении" (InlineChoice)
 *
 * Ключевое отличие: варианты ответа встроены ПРЯМО В ПРЕДЛОЖЕНИЕ,
 * заменяя ___ на кнопки внутри строки текста.
 */

// Добавляем стили для inline-кнопок один раз при первой загрузке
(function injectInlineOptionStyles() {
    if (document.getElementById('mode6-inline-styles')) return;
    const style = document.createElement('style');
    style.id = 'mode6-inline-styles';
    style.textContent = `
        .inline-options {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            vertical-align: middle;
        }

        .inline-option {
            display: inline-block;
            margin: 0 3px;
            padding: 4px 12px;
            border-radius: 16px;
            border: 2px solid var(--border);
            background: var(--surface);
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            vertical-align: middle;
            transition: all 0.2s ease;
            color: var(--text);
            line-height: 1.4;
        }

        .inline-option:hover:not(:disabled) {
            background: var(--accent-faint);
            border-color: var(--accent);
            color: var(--accent);
            transform: scale(1.05);
        }

        .inline-option:disabled {
            cursor: not-allowed;
            opacity: 0.75;
        }

        .inline-option.correct {
            background: #27ae60 !important;
            border-color: #27ae60 !important;
            color: white !important;
            animation: pulse 0.5s ease;
        }

        .inline-option.incorrect {
            background: #e74c3c !important;
            border-color: #e74c3c !important;
            color: white !important;
            animation: shake 0.3s ease;
        }

        #mode6-content .question-text {
            line-height: 2.2;
        }
    `;
    document.head.appendChild(style);
})();

function displayMode6QuestionUI(question) {
    const contentArea = document.getElementById('mode6-content');
    if (!contentArea) return;

    // Перемешиваем варианты для каждого вопроса, чтобы правильный не был всегда первым
    const shuffledOptions = shuffleArray([...question.options]);

    // Строим кнопки для вставки внутрь предложения
    const optionButtonsHtml = shuffledOptions.map(option =>
        `<button class="option-btn inline-option" data-answer="${option}">${option}</button>`
    ).join('');

    // Заменяем ___ на span с кнопками внутри предложения
    const questionHtml = question.sentence.replace(
        '___',
        `<span class="inline-options" id="mode6-options">${optionButtonsHtml}</span>`
    );

    contentArea.innerHTML = `
        <div class="question-container" style="padding-bottom: 80px;">
            <div class="progress-text">Вопрос ${mode6State.currentQuestionIndex + 1} из ${mode6State.totalQuestions}</div>
            <div class="translation-text">${question.translation}</div>
            <div class="question-text">${questionHtml}</div>
            <div class="feedback" id="mode6-feedback"></div>
            <button class="next-button quiz-next-fixed" id="mode6-next-btn" style="display: none;">Дальше →</button>
        </div>
    `;

    // Навешиваем обработчики на inline-кнопки
    contentArea.querySelectorAll('.inline-option').forEach(button => {
        button.addEventListener('click', () => {
            if (!mode6State.isAnswered) {
                checkMode6Answer(button.dataset.answer, question.correct, button, question.explanation);
            }
        });
    });

    document.getElementById('mode6-next-btn').addEventListener('click', handleNextMode6Question);
}

function showMode6ResultsUI() {
    const contentArea = document.getElementById('mode6-content');
    if (!contentArea) return;

    const percentage = Math.round((mode6State.score / mode6State.totalQuestions) * 100);
    let message = "";
    if (percentage === 100) message = "🎉 ¡Excelente!";
    else if (percentage >= 80) message = "👏 ¡Muy bien!";
    else if (percentage >= 60) message = "👍 ¡Bien!";
    else message = "📚 Sigue practicando!";

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${mode6State.score} из ${mode6State.totalQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode6()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

function updateMode6ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) scoreElement.textContent = mode6State.score;
    if (typeof setTopbarProgress === 'function' && mode6State.totalQuestions > 0) {
        setTopbarProgress(Math.round((mode6State.currentQuestionIndex / mode6State.totalQuestions) * 100));
    }
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayMode6QuestionUI = displayMode6QuestionUI;
    window.showMode6ResultsUI = showMode6ResultsUI;
    window.updateMode6ScoreUI = updateMode6ScoreUI;
}
