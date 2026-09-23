// spanish-trainer-app/tren/mode3.js
/**
 * Tren Ir/Venir/Llegar - Mode 3: Game Logic
 * Основная логика режима "Предлоги (a/de/en)"
 */

let mode3State = {
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 10,
    questions: [],
    isAnswered: false
};

// --- ЛОГИКА ИГРЫ ---

function initMode3() {
    if (typeof MODE3_QUESTIONS_DATA === 'undefined') {
        console.error("Данные для Mode 3 не загружены.");
        return;
    }

    mode3State.currentQuestionIndex = 0;
    mode3State.score = 0;
    mode3State.isAnswered = false;
    mode3State.questions = shuffleArray(MODE3_QUESTIONS_DATA).slice(0, mode3State.totalQuestions);
    mode3State.totalQuestions = mode3State.questions.length;

    updateMode3ScoreUI();
    displayMode3Question();
}

function displayMode3Question() {
    if (mode3State.currentQuestionIndex >= mode3State.totalQuestions) {
        showMode3ResultsUI();
        return;
    }
    const question = mode3State.questions[mode3State.currentQuestionIndex];
    mode3State.isAnswered = false;
    displayMode3QuestionUI(question);
}

function checkMode3Answer(selected, correct, buttonElement, explanation) {
    mode3State.isAnswered = true;

    const feedback = document.getElementById('mode3-feedback');
    const allButtons = document.querySelectorAll('#mode3-options .option-btn');
    const nextButton = document.getElementById('mode3-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    // Заполняем пропуск правильным ответом
    const blank = document.getElementById('question-blank');
    if (blank) {
        blank.textContent = correct;
        blank.style.color = selected.toLowerCase() === correct.toLowerCase() ? '#27ae60' : '#e74c3c';
        blank.style.fontWeight = 'bold';
    }

    const explanationHtml = explanation
        ? `<div style="font-size: 0.9rem; margin-top: 8px; line-height: 1.4; opacity: 0.85;">${explanation}</div>`
        : '';

    if (selected.toLowerCase() === correct.toLowerCase()) {
        feedback.innerHTML = `<div style="font-weight: bold; color: #22c55e;">✓ ¡Correcto!</div>${explanationHtml}`;
        feedback.className = "feedback correct";
        feedback.style.flexDirection = 'column';
        feedback.style.alignItems = 'center';
        buttonElement.classList.add('correct');
        mode3State.score++;
        updateMode3ScoreUI();
        _njStreak++;
        window.njCorrect && window.njCorrect(_njStreak);
    } else {
        feedback.innerHTML = `<div style="font-weight: bold; color: #ef4444;">✗ Incorrecto. Правильно: ${correct}</div>${explanationHtml}`;
        feedback.className = "feedback incorrect";
        feedback.style.flexDirection = 'column';
        feedback.style.alignItems = 'center';
        buttonElement.classList.add('incorrect');
        window.njWrong && window.njWrong(null, null);
        allButtons.forEach(btn => {
            if (btn.dataset.answer.toLowerCase() === correct.toLowerCase()) {
                btn.classList.add('correct');
            }
        });
    }
    nextButton.style.display = 'inline-block';
}

function handleNextMode3Question() {
    mode3State.currentQuestionIndex++;
    displayMode3Question();
}

function restartMode3() {
    initMode3();
}

// --- ЭКСПОРТЫ ---
if (typeof window !== 'undefined') {
    window.initMode3 = initMode3;
    window.restartMode3 = restartMode3;
    window.checkMode3Answer = checkMode3Answer;
    window.handleNextMode3Question = handleNextMode3Question;
}
