// spanish-trainer-app/tren/mode6.js
/**
 * Tren Ir/Venir/Llegar - Mode 6: Game Logic
 * Основная логика режима "Выбор в предложении" (InlineChoice)
 */

let mode6State = {
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 15,
    questions: [],
    isAnswered: false
};

// --- ЛОГИКА ИГРЫ ---

function initMode6() {
    if (typeof MODE6_SENTENCES === 'undefined') {
        console.error("Данные для Mode 6 (MODE6_SENTENCES) не загружены. Проверьте подключение mode6-data.js");
        return;
    }

    mode6State.currentQuestionIndex = 0;
    mode6State.score = 0;
    mode6State.isAnswered = false;
    mode6State.questions = shuffleArray(MODE6_SENTENCES).slice(0, mode6State.totalQuestions);
    mode6State.totalQuestions = mode6State.questions.length;

    updateMode6ScoreUI();
    displayMode6Question();
}

function displayMode6Question() {
    if (mode6State.currentQuestionIndex >= mode6State.totalQuestions) {
        showMode6ResultsUI();
        return;
    }
    const question = mode6State.questions[mode6State.currentQuestionIndex];
    mode6State.isAnswered = false;
    displayMode6QuestionUI(question);
}

function checkMode6Answer(selected, correct, buttonElement, explanation) {
    if (mode6State.isAnswered) return;
    mode6State.isAnswered = true;

    const feedback = document.getElementById('mode6-feedback');
    const allButtons = document.querySelectorAll('#mode6-options .inline-option');
    const nextButton = document.getElementById('mode6-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    const explanationHtml = explanation
        ? `<div style="font-size: 0.9rem; margin-top: 8px; line-height: 1.4; opacity: 0.85;">${explanation}</div>`
        : '';

    if (selected.toLowerCase() === correct.toLowerCase()) {
        feedback.innerHTML = `<div style="font-weight: bold;">✅ ¡Correcto!</div>${explanationHtml}`;
        feedback.className = "feedback correct";
        feedback.style.flexDirection = 'column';
        feedback.style.alignItems = 'center';
        buttonElement.classList.add('correct');
        mode6State.score++;
        updateMode6ScoreUI();
    } else {
        feedback.innerHTML = `<div style="font-weight: bold;">❌ Incorrecto. Правильно: ${correct}</div>${explanationHtml}`;
        feedback.className = "feedback incorrect";
        feedback.style.flexDirection = 'column';
        feedback.style.alignItems = 'center';
        buttonElement.classList.add('incorrect');
        allButtons.forEach(btn => {
            if (btn.dataset.answer.toLowerCase() === correct.toLowerCase()) {
                btn.classList.add('correct');
            }
        });
    }

    nextButton.style.display = 'inline-block';
}

function handleNextMode6Question() {
    mode6State.currentQuestionIndex++;
    displayMode6Question();
}

function restartMode6() {
    initMode6();
}

// --- ЭКСПОРТЫ ---
if (typeof window !== 'undefined') {
    window.initMode6 = initMode6;
    window.restartMode6 = restartMode6;
    window.checkMode6Answer = checkMode6Answer;
    window.handleNextMode6Question = handleNextMode6Question;
}
