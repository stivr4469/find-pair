// spanish-trainer-app/tren/mode4.js
/**
 * Tren Ir/Venir/Llegar - Mode 4: Game Logic
 * Основная логика режима "Перевод"
 */

let mode4State = {
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 15,
    questions: [],
    isAnswered: false
};

// --- ЛОГИКА ИГРЫ ---

function initMode4() {
    if (typeof MODE4_TRANSLATIONS === 'undefined') {
        console.error("Данные для Mode 4 не загружены.");
        return;
    }

    mode4State.currentQuestionIndex = 0;
    mode4State.score = 0;
    mode4State.isAnswered = false;
    mode4State.questions = shuffleArray(MODE4_TRANSLATIONS).slice(0, mode4State.totalQuestions);
    mode4State.totalQuestions = mode4State.questions.length;

    updateMode4ScoreUI();
    displayMode4Question();
}

function displayMode4Question() {
    if (mode4State.currentQuestionIndex >= mode4State.totalQuestions) {
        showMode4ResultsUI();
        return;
    }
    const question = mode4State.questions[mode4State.currentQuestionIndex];
    mode4State.isAnswered = false;
    displayMode4QuestionUI(question);
}

function checkMode4Answer(selected, correct, buttonElement) {
    mode4State.isAnswered = true;

    const feedback = document.getElementById('mode4-feedback');
    const allButtons = document.querySelectorAll('#mode4-options .option-btn');
    const nextButton = document.getElementById('mode4-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selected.toLowerCase() === correct.toLowerCase()) {
        feedback.textContent = "✅ ¡Correcto!";
        feedback.className = "feedback correct";
        buttonElement.classList.add('correct');
        mode4State.score++;
        updateMode4ScoreUI();
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

function handleNextMode4Question() {
    mode4State.currentQuestionIndex++;
    displayMode4Question();
}

function restartMode4() {
    initMode4();
}

// --- ЭКСПОРТЫ ---
if (typeof window !== 'undefined') {
    window.initMode4 = initMode4;
    window.restartMode4 = restartMode4;
    window.checkMode4Answer = checkMode4Answer;
    window.handleNextMode4Question = handleNextMode4Question;
}
