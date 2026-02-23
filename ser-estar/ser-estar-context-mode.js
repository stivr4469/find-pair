// spanish-trainer-app/ser-estar/ser-estar-context-mode.js
/**
 * Ser vs Estar Trainer - Context Mode: Game Logic
 * Основная логика режима "Контекст"
 */

let contextModeState = {
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 10,
    questions: [],
    isAnswered: false
};

// --- ЛОГИКА ИГРЫ ---

function initContextMode() {
    if (typeof MODE1_SENTENCES === 'undefined') {
        console.error("Данные для Контекстного режима (MODE1_SENTENCES) не загружены.");
        return;
    }

    contextModeState.currentQuestionIndex = 0;
    contextModeState.score = 0;
    contextModeState.isAnswered = false;
    contextModeState.questions = shuffleArray(MODE1_SENTENCES).slice(0, contextModeState.totalQuestions);
    contextModeState.totalQuestions = contextModeState.questions.length;

    updateContextScoreUI();
    displayContextQuestion();
}

function displayContextQuestion() {
    if (contextModeState.currentQuestionIndex >= contextModeState.totalQuestions) {
        showContextResultsUI();
        return;
    }
    const question = contextModeState.questions[contextModeState.currentQuestionIndex];
    contextModeState.isAnswered = false;
    displayContextQuestionUI(question);
}

function checkContextAnswer(selected, correct, buttonElement, explanation) {
    contextModeState.isAnswered = true;

    const feedback = document.getElementById('context-feedback');
    const allButtons = document.querySelectorAll('#context-options .option-btn');
    const nextButton = document.getElementById('context-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selected.toLowerCase() === correct.toLowerCase()) {
        feedback.textContent = `✅ ¡Correcto! ${explanation}`;
        feedback.className = "feedback correct";
        buttonElement.classList.add('correct');
        contextModeState.score++;
        updateContextScoreUI();
    } else {
        feedback.textContent = `❌ Incorrecto. ${explanation}`;
        feedback.className = "feedback incorrect";
        buttonElement.classList.add('incorrect');
        allButtons.forEach(btn => {
            if (btn.dataset.answer.toLowerCase() === correct.toLowerCase()) {
                btn.classList.add('correct');
            }
        });
    }
    nextButton.style.display = 'inline-block';
}

function handleNextContextQuestion() {
    contextModeState.currentQuestionIndex++;
    displayContextQuestion();
}

function restartContextMode() {
    initContextMode();
}

// --- ЭКСПОРТЫ ---
if (typeof window !== 'undefined') {
    window.initContextMode = initContextMode;
    window.restartContextMode = restartContextMode;
    window.checkContextAnswer = checkContextAnswer;
    window.handleNextContextQuestion = handleNextContextQuestion;
}
