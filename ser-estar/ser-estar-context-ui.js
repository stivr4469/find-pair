/**
 * Ser vs Estar Trainer - Context Mode: UI Functions
 * Fill-blank формат: предложение с пропуском и тайлы-варианты.
 */

/**
 * Разбивает text по ___ на части before и after.
 * @param {string} text
 * @returns {{ before: string, after: string }}
 */
function _ctxParseSentence(text) {
    if (!text) return { before: '', after: '' };
    var parts = text.split('___');
    return {
        before: (parts[0] || '').trimEnd(),
        after:  (parts[1] || '').trimStart()
    };
}

/**
 * Экранирование HTML-спецсимволов для безопасной вставки в атрибуты/текст.
 * @param {string} str
 * @returns {string}
 */
function _ctxEsc(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function displayContextQuestionUI(question) {
    var contentArea = document.getElementById('ser-estar-context-area');
    if (!contentArea) return;

    var qNum   = contextModeState.totalAnswered + 1;
    var qTotal = contextModeState.sessionLimit;
    window.seSetProgress && window.seSetProgress((contextModeState.totalAnswered / qTotal) * 100);

    // Строим предложение с blank-пропуском
    var parts   = _ctxParseSentence(question.text);
    var blankEl = '<span id="question-blank" class="ctx-blank">___</span>';
    var sentenceHtml = _ctxEsc(parts.before) + ' ' + blankEl
        + (parts.after ? ' ' + _ctxEsc(parts.after) : '');

    // Тайлы вариантов
    var tilesHtml = question.options.map(function(opt) {
        return '<button class="ctx-tile option-btn" data-answer="' + _ctxEsc(opt) + '">'
            + _ctxEsc(opt) + '</button>';
    }).join('');

    contentArea.innerHTML = '<div class="ctx-question-card">'
        + '<div class="ctx-progress-label">ВОПРОС ' + qNum + ' ИЗ ' + qTotal
        + ' &middot; ВСТАВЬ SER ИЛИ ESTAR</div>'
        + '<div class="ctx-question-text ctx-sentence">' + sentenceHtml + '</div>'
        + '<div class="ctx-translation">' + _ctxEsc(question.translation) + '</div>'
        + '<div class="ctx-tiles" id="context-options">' + tilesHtml + '</div>'
        + '<div class="feedback" id="context-feedback"></div>'
        + '<button class="next-button" id="context-next-btn" style="display:none;">Дальше →</button>'
        + '</div>';

    // Обработчики
    contentArea.querySelectorAll('.option-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            if (!contextModeState.isAnswered) {
                checkContextAnswer(button.dataset.answer, question.correct, button, question.explanation);
            }
        });
    });

    document.getElementById('context-next-btn').addEventListener('click', handleNextContextQuestion);
}

function showContextResultsUI() {
    const contentArea = document.getElementById('ser-estar-context-area');
    if (!contentArea) return;

    const percentage = Math.round((contextModeState.score / contextModeState.sessionLimit) * 100);
    window.njResult && window.njResult(percentage);
    
    contentArea.innerHTML = `
        <div class="results-container view-enter"> <h2>Сессия завершена!</h2> <div class="final-score">${contextModeState.score} / ${contextModeState.sessionLimit}</div> <p>Вы прошли 20 вопросов по Ser и Estar. Вопросы перемещены в конец очереди.</p> <div class="results-buttons"> <button class="restart-button" onclick="restartContextMode()"> Продолжить тренировку
                </button> <button class="menu-button" onclick="showMainMenu()"> В меню
                </button> </div> </div> `;
    lucide.createIcons();
}

function updateContextScoreUI() {
    window.seUpdateScore ? window.seUpdateScore(contextModeState.score) : (function() {
        var el = document.getElementById('score-value');
        if (el) el.textContent = contextModeState.score;
    })();
}

// Экспорт
window.displayContextQuestionUI = displayContextQuestionUI;
window.showContextResultsUI = showContextResultsUI;
window.updateContextScoreUI = updateContextScoreUI;
