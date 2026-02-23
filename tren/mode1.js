// spanish-trainer-app/tren/mode1.js
/**
 * Tren Ir/Venir/Llegar - Mode 1: Game Logic
 * Основная логика режима "Выбор глагола"
 */

let mode1State = {
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 0,
    questions: [],
    isAnswered: false
};

// --- ЛОГИКА ИГРЫ ---

function initMode1() {
    // Проверяем, доступны ли данные
    if (typeof MODE1_SENTENCES === 'undefined') {
        console.error("Данные для Mode 1 (MODE1_SENTENCES) не загружены. Проверьте подключение mode1-data.js");
        return;
    }

    mode1State.currentQuestionIndex = 0;
    mode1State.score = 0;
    mode1State.isAnswered = false;
    mode1State.questions = shuffleArray(MODE1_SENTENCES);
    mode1State.totalQuestions = mode1State.questions.length;

    updateMode1ScoreUI();
    displayMode1Question();
}

function displayMode1Question() {
    if (mode1State.currentQuestionIndex >= mode1State.totalQuestions) {
        showMode1ResultsUI();
        return;
    }
    const question = mode1State.questions[mode1State.currentQuestionIndex];
    mode1State.isAnswered = false;
    displayMode1QuestionUI(question);
}

function checkMode1Answer(selected, correct, buttonElement) {
    mode1State.isAnswered = true;

    const feedback = document.getElementById('mode1-feedback');
    const allButtons = document.querySelectorAll('#mode1-options .option-btn');
    const nextButton = document.getElementById('mode1-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selected.toLowerCase() === correct.toLowerCase()) {
        feedback.textContent = "✅ ¡Correcto!";
        feedback.className = "feedback correct";
        buttonElement.classList.add('correct');
        mode1State.score++;
        updateMode1ScoreUI();
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${correct}`;
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

function handleNextMode1Question() {
    mode1State.currentQuestionIndex++;
    displayMode1Question();
}

function restartMode1() {
    initMode1();
}

// --- ЭКСПОРТЫ ---
if (typeof window !== 'undefined') {
    window.initMode1 = initMode1;
    window.restartMode1 = restartMode1;
    window.checkMode1Answer = checkMode1Answer;
    window.handleNextMode1Question = handleNextMode1Question;
}
