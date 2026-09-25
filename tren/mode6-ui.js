// spanish-trainer-app/tren/mode6-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 6: UI Functions
 * Fill-blank формат: предложение с бланком ___ вверху, тайлы-варианты снизу.
 */

(function injectMode6Styles() {
    if (document.getElementById('mode6-inline-styles')) return;
    const style = document.createElement('style');
    style.id = 'mode6-inline-styles';
    style.textContent = `
        .m6-blank {
            display: inline-block;
            min-width: 72px;
            border-bottom: 2px solid var(--accent);
            color: var(--muted);
            padding: 0 6px;
            font-style: italic;
            text-align: center;
            transition: color 0.2s, border-bottom-color 0.2s;
        }
        .m6-tiles {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin: 20px 0 12px;
        }
        .inline-option {
            display: inline-block;
            padding: 6px 18px;
            border-radius: 20px;
            border: 2px solid var(--border);
            background: var(--surface);
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.18s ease;
            color: var(--text);
            line-height: 1.4;
            font-family: inherit;
        }
        .inline-option:hover:not(:disabled) {
            background: var(--accent-faint);
            border-color: var(--accent);
            color: var(--accent);
            transform: scale(1.06);
        }
        .inline-option:disabled { cursor: not-allowed; opacity: 0.7; }
        .inline-option.correct {
            background: #27ae60 !important;
            border-color: #27ae60 !important;
            color: white !important;
        }
        .inline-option.incorrect {
            background: #e74c3c !important;
            border-color: #e74c3c !important;
            color: white !important;
        }
        #mode6-content .question-text {
            line-height: 2.0;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            color: var(--text);
            margin: 14px 0 0;
        }
    `;
    document.head.appendChild(style);
})();

function _m6Esc(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function displayMode6QuestionUI(question) {
    const contentArea = document.getElementById('mode6-content');
    if (!contentArea) return;

    const shuffledOptions = (typeof shuffleArray === 'function')
        ? shuffleArray([...question.options])
        : [...question.options];

    // Split sentence at ___
    const parts = question.sentence.split('___');
    const before = (parts[0] || '').trimEnd();
    const after = (parts[1] || '').trimStart();

    const blankSpan = '<span id="mode6-blank" class="m6-blank">___</span>';
    const sentenceHtml = _m6Esc(before) + ' ' + blankSpan + (after ? ' ' + _m6Esc(after) : '');

    const tilesHtml = shuffledOptions
        .map(opt => `<button class="inline-option option-btn" data-answer="${_m6Esc(opt)}">${_m6Esc(opt)}</button>`)
        .join('');

    contentArea.innerHTML = `
        <div class="question-container view-enter" style="padding-bottom: 80px;">
            <div class="progress-text">Вопрос ${mode6State.currentQuestionIndex + 1} из ${mode6State.totalQuestions}</div>
            <div class="translation-text">${_m6Esc(question.translation)}</div>
            <div class="question-text">${sentenceHtml}</div>
            <div id="mode6-options" class="m6-tiles stagger">${tilesHtml}</div>
            <div class="feedback" id="mode6-feedback"></div>
            <button class="next-button quiz-next-fixed" id="mode6-next-btn" style="display: none;">Дальше →</button>
        </div>`;

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
    let message = percentage === 100 ? '¡Excelente!' : percentage >= 80 ? '¡Muy bien!' : percentage >= 60 ? '¡Bien!' : 'Sigue practicando!';

    contentArea.innerHTML = `
        <div class="results-container view-enter" style="text-align: center; padding: 20px;">
            <h3>Результаты</h3>
            <div class="final-score">${mode6State.score} из ${mode6State.totalQuestions} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode6()">Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">Меню</button>
        </div>`;
}

function updateMode6ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) scoreElement.textContent = mode6State.score;
    if (typeof setTopbarProgress === 'function' && mode6State.totalQuestions > 0) {
        setTopbarProgress(Math.round((mode6State.currentQuestionIndex / mode6State.totalQuestions) * 100));
    }
}

if (typeof window !== 'undefined') {
    window.displayMode6QuestionUI = displayMode6QuestionUI;
    window.showMode6ResultsUI = showMode6ResultsUI;
    window.updateMode6ScoreUI = updateMode6ScoreUI;
}
