// spanish-trainer-app/tren/mode5-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 5: UI Functions
 * Исправленная версия для поддержки циклической очереди и 80 вопросов
 */

function displayMode5QuestionUI(question) {
    const contentArea = document.getElementById('mode5-content');
    if (!contentArea) return;

    // В новых данных текст вопроса в поле .question, а не .text
    const questionText = question.question || question.text || "";
    const contextText = question.context || "";

    contentArea.innerHTML = `
        <div class="question-container" style="padding-bottom: 80px;"> <div class="progress-text">Выполнено ${mode5State.totalAnswered} из ${mode5State.sessionLimit}</div> <div class="context-box" style="background: var(--accent-faint); padding: 10px; border-radius: 5px; margin-bottom: 10px; font-style: italic; color: var(--accent); border: 1px solid var(--accent-mid);"> <strong>Контекст:</strong> ${contextText}
            </div> <div class="translation-text" style="color: var(--muted); margin-bottom: 10px;">${question.translation}</div> <div class="question-text" style="font-size: 1.4rem; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center;"> ${questionText.replace(/_____|___/g, '<span class="blank" id="question-blank" style="color: var(--accent); text-decoration: underline;">_____</span>')}
                <button id="speak-btn" style="background: none; border: none; cursor: pointer; margin-left: 10px; display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:var(--faint);color:var(--text);" title="Озвучить" onclick="playCurrentMode5Phrase()"></button> </div> <div class="options-container" id="mode5-options" style="display: grid; gap: 10px;"> ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">${option}</button> `).join('')}
            </div> <div class="feedback" id="mode5-feedback" style="min-height: 100px; padding: 15px; margin-top: 15px; background: var(--surface); border-radius: 8px; display: none; border-left: 5px solid var(--border);"></div> <button class="next-button quiz-next-fixed" id="mode5-next-btn" style="display: none;"> Дальше →
            </button> </div> `;

    lucide.createIcons();

    // Обработчики
    contentArea.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!mode5State.isAnswered) {
                // В новых данных правильный ответ в .correct, а не .correctForm
                const correct = question.correct || question.correctForm;
                checkMode5Answer(button.dataset.answer, correct, button, question.explanation);
            }
        });
    });

    document.getElementById('mode5-next-btn').addEventListener('click', handleNextMode5Question);
}

function showMode5ResultsUI() {
    const contentArea = document.getElementById('mode5-content');
    if (!contentArea) return;

    const percentage = Math.round((mode5State.score / mode5State.sessionLimit) * 100);
    window.njResult && window.njResult(percentage);
    
    contentArea.innerHTML = `
        <div class="results-container" style="text-align: center; padding: 20px;"> <h2 style="font-size: 2rem;">Сессия завершена!</h2> <div class="final-score" style="font-size: 3rem; font-weight: bold; margin: 20px 0;">${mode5State.score} / ${mode5State.sessionLimit}</div> <div class="percentage" style="font-size: 1.5rem; color: var(--accent); margin-bottom: 20px;">Успешность: ${percentage}%</div> <p style="margin-bottom: 30px; color: var(--muted);">Вы прошли 20 вопросов. Вопросы перемещены в конец очереди и скоро встретятся вам снова!</p> <button class="restart-button" onclick="restartMode5()" style="width: 100%; padding: 15px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 10px;"> Продолжить тренировку
            </button> <button class="menu-button" onclick="showMainMenu()" style="width: 100%; padding: 15px; background: #6b7280; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;"> В главное меню
            </button> </div> `;
}

function updateMode5ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) scoreElement.textContent = mode5State.score;
    if (typeof setTopbarProgress === 'function' && mode5State.sessionLimit > 0) {
        setTopbarProgress(Math.round((mode5State.totalAnswered / mode5State.sessionLimit) * 100));
    }
}

window.displayMode5QuestionUI = displayMode5QuestionUI;
window.showMode5ResultsUI = showMode5ResultsUI;
window.updateMode5ScoreUI = updateMode5ScoreUI;

function playCurrentMode5Phrase() {
    // Берем актуальный вопрос из состояния
    const currentQuestion = mode5State.questionsQueue[0];
    const text = currentQuestion.question || currentQuestion.text || "";
    const correct = currentQuestion.correct || currentQuestion.correctForm;

    // Заменяем прочерк на правильный ответ
    const fullPhrase = text.replace(/_+/g, correct);

    // Вызываем глобальную функцию из utils.js
    if (typeof speakSpanish === 'function') {
        speakSpanish(fullPhrase);
    }
}

// Добавляем экспорт в конец файла
window.playCurrentMode5Phrase = playCurrentMode5Phrase;
