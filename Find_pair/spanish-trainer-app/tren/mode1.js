/**
 * Tren Ir/Venir/Llegar - Mode 1: Выбор глагола
 * Game logic for choosing the correct verb (ir/venir/llegar)
 * 
 * DEBUG VERSION: Visual debugging enabled
 */

// === DEBUG FUNCTIONS: Visual output to screen ===
/**
 * Write debug message to visible debug div
 * @param {string} msg - Message to display
 */
function debug(msg) {
    const debugDiv = document.getElementById('debug-output');
    if (debugDiv) {
        const time = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = 'debug-line';
        line.innerHTML = `<span class="debug-time">[${time}]</span> ${msg}`;
        debugDiv.appendChild(line);
        // Auto-scroll to bottom
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
    // Also log to console for developers
    console.log('[DEBUG]', msg);
}

/**
 * Update debug state display
 */
function updateDebugState() {
    const questionEl = document.getElementById('debug-current-question');
    const buttonsEl = document.getElementById('debug-buttons-disabled');
    const scoreEl = document.getElementById('debug-score');
    
    if (questionEl) {
        questionEl.textContent = `currentQuestion: ${mode1State.currentQuestion}`;
    }
    if (buttonsEl) {
        const buttons = document.querySelectorAll('.mode1-option');
        let disabledCount = 0;
        buttons.forEach(btn => {
            if (btn.disabled) disabledCount++;
        });
        buttonsEl.textContent = `buttonsDisabled: ${disabledCount}/${buttons.length}`;
    }
    if (scoreEl) {
        scoreEl.textContent = `score: ${mode1State.score}`;
    }
}

/**
 * Clear debug output
 */
function clearDebug() {
    const debugDiv = document.getElementById('debug-output');
    if (debugDiv) {
        debugDiv.innerHTML = '<div class="debug-line"><span class="debug-time">[DEBUG]</span> Debug cleared</div>';
    }
    debug('Debug cleared by user');
}

/**
 * Manual test function for showMode1Question
 */
function testShowMode1Question() {
    debug('=== MANUAL TEST: Calling showMode1Question() ===');
    showMode1Question();
}

// Sentences with blanks for Mode 1
const MODE1_SENTENCES = [
    {
        text: "Yo ___ a casa ahora.",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Я ___ домой сейчас."
    },
    {
        text: "¿Tú ___ de la escuela?",
        correct: "vienes",
        options: ["vas", "vienes", "llegas"],
        translation: "Ты ___ из школы?"
    },
    {
        text: "Él ___ a Madrid mañana.",
        correct: "llega",
        options: ["va", "viene", "llega"],
        translation: "Он ___ в Мадрид завтра."
    },
    {
        text: "Nosotros ___ al cine.",
        correct: "vamos",
        options: ["vamos", "venimos", "llegamos"],
        translation: "Мы ___ в кино."
    },
    {
        text: "Ellos ___ tarde.",
        correct: "llegan",
        options: ["van", "vienen", "llegan"],
        translation: "Они ___ поздно."
    },
    {
        text: "¿Vosotros ___ en tren?",
        correct: "venís",
        options: ["vais", "venís", "llegáis"],
        translation: "Вы ___ на поезде?"
    },
    {
        text: "Yo ___ a ser médico.",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Я ___ стать врачом."
    },
    {
        text: "Ella ___ de España.",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "Она ___ из Испании."
    },
    {
        text: "¿Cuándo ___ tú?",
        correct: "llegas",
        options: ["vas", "vienes", "llegas"],
        translation: "Когда ты ___?"
    },
    {
        text: "Nosotros ___ cansados.",
        correct: "llegamos",
        options: ["vamos", "venimos", "llegamos"],
        translation: "Мы ___ уставшими."
    }
];

// Game state
let mode1State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: MODE1_SENTENCES.length,
    shuffled: []
};

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Initialize Mode 1 game
 */
function initMode1() {
    debug('=== initMode1 called ===');
    mode1State.currentQuestion = 0;
    mode1State.score = 0;
    mode1State.shuffled = shuffleArray(MODE1_SENTENCES);
    debug('State reset: currentQuestion=0, score=0');

    // Hide main menu and other modes, show mode1
    document.querySelector('.main-menu').classList.add('hidden');
    document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
    document.getElementById('mode1-area').classList.remove('hidden');
    debug('UI: mode1-area shown');

    // Update score display
    updateScore();
    debug('Score updated');

    // Show first question
    debug('Calling showMode1Question()...');
    showMode1Question();
}

/**
 * Display current question
 */
function showMode1Question() {
    debug('--- showMode1Question called, question #' + (mode1State.currentQuestion + 1) + ' ---');
    updateDebugState();

    const question = mode1State.shuffled[mode1State.currentQuestion];
    debug('Question data loaded: "' + question.text + '"');

    document.getElementById('mode1-question').textContent = question.text;
    document.getElementById('mode1-translation').textContent = question.translation;
    document.getElementById('mode1-progress').textContent =
        `Вопрос ${mode1State.currentQuestion + 1} из ${mode1State.totalQuestions}`;
    debug('Question displayed on screen');

    // Shuffle options for buttons
    const shuffledOptions = shuffleArray(question.options);
    debug('Options shuffled: [' + shuffledOptions.join(', ') + ']');

    const buttons = document.querySelectorAll('.mode1-option');
    debug('Buttons found: ' + buttons.length);

    buttons.forEach((btn, index) => {
        btn.textContent = shuffledOptions[index];
        btn.disabled = false;  // Включаем кнопки для нового вопроса
        debug('Button enabled: "' + btn.textContent + '" disabled=' + btn.disabled);
        btn.onclick = () => checkMode1Answer(shuffledOptions[index], question.correct);
        debug('Button onclick handler assigned');
    });

    debug('showMode1Question completed');
    updateDebugState();
}

/**
 * Check answer and show feedback
 */
function checkMode1Answer(selected, correct) {
    debug('>>> checkMode1Answer called');
    debug('>>> selected: "' + selected + '", correct: "' + correct + '"');
    updateDebugState();

    const feedback = document.getElementById('mode1-feedback');

    if (selected === correct) {
        mode1State.score++;
        feedback.textContent = "✅ ¡Correcto! Правильно!";
        feedback.className = "feedback correct";
        updateScore();
        debug('Answer CORRECT! Score: ' + mode1State.score);
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${correct}`;
        feedback.className = "feedback incorrect";
        debug('Answer INCORRECT! Correct answer: ' + correct);
    }

    // Disable buttons temporarily
    const buttons = document.querySelectorAll('.mode1-option');
    debug('Disabling buttons, count: ' + buttons.length);
    buttons.forEach(btn => {
        btn.disabled = true;
        debug('Button disabled: "' + btn.textContent + '" disabled=' + btn.disabled);
    });
    debug('All buttons disabled');
    updateDebugState();

    // Next question after delay
    debug('Setting setTimeout for 1500ms...');
    setTimeout(() => {
        debug('>>> setTimeout callback fired <<<');
        mode1State.currentQuestion++;
        debug('currentQuestion incremented to: ' + mode1State.currentQuestion);
        feedback.textContent = "";
        updateDebugState();

        if (mode1State.currentQuestion >= mode1State.totalQuestions) {
            // Game over
            debug('Game over condition met (currentQuestion >= totalQuestions)');
            debug('Showing results...');
            showMode1Results();
        } else {
            debug('Next question: ' + (mode1State.currentQuestion + 1));
            debug('Calling showMode1Question()...');
            showMode1Question();
        }
    }, 1500);
    debug('setTimeout scheduled');
}

/**
 * Update score display
 */
function updateScore() {
    document.getElementById('score-value').textContent = mode1State.score;
    debug('Score display updated: ' + mode1State.score);
}

/**
 * Show results at end of game
 */
function showMode1Results() {
    debug('=== showMode1Results called ===');
    document.getElementById('mode1-area').classList.add('hidden');
    document.getElementById('mode1-results').classList.remove('hidden');
    debug('Results screen shown');

    const percentage = Math.round((mode1State.score / mode1State.totalQuestions) * 100);
    document.getElementById('mode1-final-score').textContent =
        `${mode1State.score} из ${mode1State.totalQuestions} (${percentage}%)`;

    let message = "";
    if (percentage === 100) {
        message = "🎉 ¡Excelente! Perfecto!";
    } else if (percentage >= 80) {
        message = "👏 ¡Muy bien! Очень хорошо!";
    } else if (percentage >= 60) {
        message = "👍 ¡Bien! Хорошо!";
    } else {
        message = "📚 Sigue practicando! Продолжай тренироваться!";
    }
    document.getElementById('mode1-message').textContent = message;
    debug('Final score: ' + mode1State.score + '/' + mode1State.totalQuestions + ' (' + percentage + '%)');
}

/**
 * Restart Mode 1
 */
function restartMode1() {
    debug('=== restartMode1 called ===');
    document.getElementById('mode1-results').classList.add('hidden');
    debug('Results screen hidden');
    initMode1();
}

// Export functions for global access
window.initMode1 = initMode1;
window.restartMode1 = restartMode1;
window.debug = debug;
window.clearDebug = clearDebug;
window.testShowMode1Question = testShowMode1Question;
window.updateDebugState = updateDebugState;