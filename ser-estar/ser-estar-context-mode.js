/**
 * Ser vs Estar Trainer - Context Mode: Game Logic
 * Внедрена циклическая очередь и поддержка 80 вопросов.
 */

const SER_ESTAR_SESSION_LIMIT = 20;

let contextModeState = {
    questionsQueue: [],
    score: 0,
    totalAnswered: 0,
    sessionLimit: SER_ESTAR_SESSION_LIMIT,
    isAnswered: false
};

function initContextMode() {
    console.log('[SerEstar] Initializing logic...');
    
    if (typeof MODE1_SENTENCES === 'undefined') {
        console.error("Данные Ser/Estar не загружены!");
        return;
    }

    // Инициализируем очередь
    contextModeState.questionsQueue = shuffleArray([...MODE1_SENTENCES]);
    contextModeState.score = 0;
    contextModeState.totalAnswered = 0;
    contextModeState.sessionLimit = Math.min(SER_ESTAR_SESSION_LIMIT, MODE1_SENTENCES.length);
    contextModeState.isAnswered = false;

    updateContextScoreUI();
    displayContextQuestion();
}

function displayContextQuestion() {
    if (contextModeState.totalAnswered >= contextModeState.sessionLimit) {
        showContextResultsUI();
        return;
    }

    contextModeState.isAnswered = false;
    const currentQuestion = contextModeState.questionsQueue[0]; 
    displayContextQuestionUI(currentQuestion);
}

function checkContextAnswer(selected, correct, buttonElement, explanation) {
    contextModeState.isAnswered = true;

    const feedback = document.getElementById('context-feedback');
    const allButtons = document.querySelectorAll('#context-options .option-btn');
    const nextButton = document.getElementById('context-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    const normalize = (str) => str.replace(/[¡!¿?]/g, '').trim().toLowerCase();
    const isCorrect = normalize(selected) === normalize(correct);

    // Заполняем пропуск правильным ответом
    const blank = document.getElementById('question-blank');
    if (blank) {
        blank.textContent = correct;
        blank.style.color = isCorrect ? '#27ae60' : '#e74c3c';
        blank.style.fontWeight = 'bold';
    }

    feedback.style.display = 'block';

    if (isCorrect) {
        feedback.innerHTML = `
            <div style="color: #27ae60; font-weight: bold; margin-bottom: 5px;">✅ ¡Correcto!</div>
            <div style="color: #444; font-size: 0.95rem;">${explanation}</div>
        `;
        feedback.style.borderLeft = '5px solid #27ae60';
        buttonElement.classList.add('correct');
        buttonElement.style.background = '#dcfce7';
        contextModeState.score++;
        updateContextScoreUI();
    } else {
        feedback.innerHTML = `
            <div style="color: #e74c3c; font-weight: bold; margin-bottom: 5px;">❌ Incorrecto. Ответ: ${correct}</div>
            <div style="color: #444; font-size: 0.95rem;">${explanation}</div>
        `;
        feedback.style.borderLeft = '5px solid #e74c3c';
        buttonElement.classList.add('incorrect');
        buttonElement.style.background = '#fee2e2';

        allButtons.forEach(btn => {
            if (normalize(btn.dataset.answer) === normalize(correct)) {
                btn.classList.add('correct');
                btn.style.background = '#dcfce7';
            }
        });
    }
    nextButton.style.display = 'block';
}

function handleNextContextQuestion() {
    // Циклическая логика: берем первый, кидаем в конец
    const answered = contextModeState.questionsQueue.shift();
    contextModeState.questionsQueue.push(answered);
    
    contextModeState.totalAnswered++;
    displayContextQuestion();
}

function restartContextMode() {
    initContextMode();
}

// Экспорт
window.initContextMode = initContextMode;
window.restartContextMode = restartContextMode;
window.checkContextAnswer = checkContextAnswer;
window.handleNextContextQuestion = handleNextContextQuestion;
