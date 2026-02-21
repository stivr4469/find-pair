/**
 * Tren Ir/Venir/Llegar - Mode 3: Preposition Choice (a/de/en)
 * Логика игры на выбор правильного предлога
 *
 * Предлоги:
 * - a (направление, цель)
 * - de (происхождение, источник)
 * - en (способ транспорта, местонахождение)
 *
 * Примеры:
 * - ir a casa (идти домой)
 * - venir de la escuela (приходить из школы)
 * - llegar en avión (прибывать на самолёте)
 *
 * FIX: Full Russian translations added for all questions
 */

// === DEBUG FUNCTIONS: Visual output to screen ===
/**
 * Write debug message to visible debug div
 * @param {string} msg - Message to display
 */
function debugMode3(msg) {
    const debugDiv = document.getElementById('debug-output');
    if (debugDiv) {
        const time = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = 'debug-line';
        line.innerHTML = `<span class="debug-time">[${time}]</span> [MODE3] ${msg}`;
        debugDiv.appendChild(line);
        // Auto-scroll to bottom
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
    // Also log to console for developers
    console.log('[MODE3 DEBUG]', msg);
}

/**
 * Update debug state display for Mode 3
 */
function updateDebugStateMode3() {
    // Placeholder for future debug state display
}

// База вопросов для Mode 3
// FIX: Full Russian translations with complete sentence meaning
const MODE3_QUESTIONS_DATA = [
    // IR A (направление)
    {
        text: "Voy ___ casa.",
        correct: "a",
        translation: "Я иду ___ домой.",
        verb: "ir",
    },
    {
        text: "Vamos ___ la escuela.",
        correct: "a",
        translation: "Мы идём ___ в школу.",
        verb: "ir",
    },
    {
        text: "¿Vas ___ el cine?",
        correct: "a",
        translation: "Ты идёшь ___ в кино?",
        verb: "ir",
    },
    {
        text: "Ellos van ___ Madrid.",
        correct: "a",
        translation: "Они едут ___ в Мадрид.",
        verb: "ir",
    },
    {
        text: "Voy ___ ser médico.",
        correct: "a",
        translation: "Я собираюсь ___ стать врачом.",
        verb: "ir",
    },
    {
        text: "¿Vais ___ la fiesta?",
        correct: "a",
        translation: "Вы идёте ___ на вечеринку?",
        verb: "ir",
    },

    // VENIR DE (происхождение)
    {
        text: "Vengo ___ la escuela.",
        correct: "de",
        translation: "Я прихожу ___ из школы.",
        verb: "venir",
    },
    {
        text: "¿Vienes ___ casa?",
        correct: "de",
        translation: "Ты приходишь ___ из дома?",
        verb: "venir",
    },
    {
        text: "Ella viene ___ España.",
        correct: "de",
        translation: "Она приезжает ___ из Испании.",
        verb: "venir",
    },
    {
        text: "Venimos ___ el trabajo.",
        correct: "de",
        translation: "Мы приходим ___ с работы.",
        verb: "venir",
    },
    {
        text: "¿Ellos vienen ___ la biblioteca?",
        correct: "de",
        translation: "Они приходят ___ из библиотеки?",
        verb: "venir",
    },
    {
        text: "Vengo ___ estudiar.",
        correct: "de",
        translation: "Я прихожу ___ после учёбы (только что учился).",
        verb: "venir",
    },

    // LLEGAR EN (транспорт)
    {
        text: "Llego ___ avión.",
        correct: "en",
        translation: "Я прибываю ___ на самолёте.",
        verb: "llegar",
    },
    {
        text: "¿Llegas ___ tren?",
        correct: "en",
        translation: "Ты прибываешь ___ на поезде?",
        verb: "llegar",
    },
    {
        text: "Ella llega ___ autobús.",
        correct: "en",
        translation: "Она прибывает ___ на автобусе.",
        verb: "llegar",
    },
    {
        text: "Llegamos ___ coche.",
        correct: "en",
        translation: "Мы прибываем ___ на машине.",
        verb: "llegar",
    },
    {
        text: "Ellos llegan ___ metro.",
        correct: "en",
        translation: "Они прибывают ___ на метро.",
        verb: "llegar",
    },
    {
        text: "¿Llegáis ___ bicicleta?",
        correct: "en",
        translation: "Вы прибываете ___ на велосипеде?",
        verb: "llegar",
    },

    // LLEGAR A (место назначения)
    {
        text: "Llego ___ casa tarde.",
        correct: "a",
        translation: "Я прибываю ___ домой поздно.",
        verb: "llegar",
    },
    {
        text: "¿Llegas ___ la estación?",
        correct: "a",
        translation: "Ты прибываешь ___ на станцию?",
        verb: "llegar",
    },
    {
        text: "Ella llega ___ Madrid mañana.",
        correct: "a",
        translation: "Она прибывает ___ в Мадрид завтра.",
        verb: "llegar",
    },
    {
        text: "Llegamos ___ tiempo.",
        correct: "a",
        translation: "Мы прибываем ___ вовремя.",
        verb: "llegar",
    },

    // Смешанные вопросы
    {
        text: "Voy ___ pie.",
        correct: "a",
        translation: "Я иду ___ пешком.",
        verb: "ir",
    },
    {
        text: "Vengo ___ correr.",
        correct: "de",
        translation: "Я прихожу ___ после пробежки.",
        verb: "venir",
    },
    {
        text: "Llego ___ taxi.",
        correct: "en",
        translation: "Я прибываю ___ на такси.",
        verb: "llegar",
    }
];

// Состояние игры
let mode3State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 0,
    shuffled: [],
    isGameOver: false
};

/**
 * Перемешивание массива (алгоритм Фишера-Йетса)
 * @param {Array} array - массив для перемешивания
 * @returns {Array} перемешанный массив
 */
function shuffleArrayMode3(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Инициализация Mode 3 - запуск игры с предлогами
 */
function initMode3() {

    mode3State.currentQuestion = 0;
    mode3State.score = 0;
    mode3State.isGameOver = false;
    // Берём все вопросы и перемешиваем
    mode3State.shuffled = shuffleArrayMode3(MODE3_QUESTIONS_DATA);
    mode3State.totalQuestions = mode3State.shuffled.length;

    // Скрыть главное меню, показать mode3
    const mainMenu = document.querySelector('.main-menu');
    if (mainMenu) {
        mainMenu.classList.add('hidden');
    }
    
    // Скрыть все game-area кроме mode3-area
    document.querySelectorAll('.game-area').forEach(el => {
        el.classList.add('hidden');
    });

    const mode3Element = document.getElementById('mode3-area');
    if (mode3Element) {
        mode3Element.classList.remove('hidden');
    } else {
        console.error('mode3-area not found!');
    }

    // Обновить счёт
    updateScoreMode3();

    // Показать первый вопрос
    generateQuestionMode3();
}

/**
 * Генерация вопроса - отображение предложения с пропуском для предлога
 * Функция generateQuestionMode3() по требованию задачи
 */
function generateQuestionMode3() {

    if (mode3State.isGameOver) {
        showMode3Results();
        return;
    }

    const question = mode3State.shuffled[mode3State.currentQuestion];

    // Обновить текст вопроса
    const questionElement = document.getElementById('mode3-question');
    if (questionElement) {
        questionElement.textContent = question.text;
    } else {
    }

    // Обновить перевод
    const translationElement = document.getElementById('mode3-translation');
    if (translationElement) {
        translationElement.textContent = question.translation;
    }

    // Обновить прогресс
    const progressElement = document.getElementById('mode3-progress');
    if (progressElement) {
        progressElement.textContent = `Вопрос ${mode3State.currentQuestion + 1} из ${mode3State.totalQuestions}`;
    }

    // Настроить кнопки с предлогами
    const prepositions = ['a', 'de', 'en'];
    const buttons = document.querySelectorAll('.mode3-preposition');


    buttons.forEach((btn, index) => {
        btn.textContent = prepositions[index];
        btn.disabled = false;
        btn.onclick = () => checkAnswerMode3(prepositions[index], question.correct);
    });

}

/**
 * Проверка ответа - функция checkAnswerMode3(selected, correct) по требованию задачи
 * @param {string} selected - выбранный пользователем предлог
 * @param {string} correct - правильный предлог
 */
function checkAnswerMode3(selected, correct) {

    const feedback = document.getElementById('mode3-feedback');
    if (!feedback) {
        return;
    }

    // Блокируем кнопки
    document.querySelectorAll('.mode3-preposition').forEach(btn => {
        btn.disabled = true;
    });

    // Проверка ответа
    if (selected === correct) {
        mode3State.score++;
        feedback.textContent = "✅ ¡Correcto! Правильно!";
        feedback.className = "feedback correct";
        updateScoreMode3();
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${correct}`;
        feedback.className = "feedback incorrect";
    }


    // Кнопка "Дальше" становится активной
    const nextButton = document.getElementById('mode3-next');
    if (nextButton) {
        nextButton.disabled = false;
        nextButton.onclick = nextMode3Question;
    } else {
    }
}

/**
 * Обновление счёта - функция updateScoreMode3() по требованию задачи
 */
function updateScoreMode3() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode3State.score;
    }
}

/**
 * Переход к следующему вопросу
 */
function nextMode3Question() {

    mode3State.currentQuestion++;

    // Сбросить обратную связь
    const feedback = document.getElementById('mode3-feedback');
    if (feedback) {
        feedback.textContent = "";
        feedback.className = "feedback";
    }

    // Сбросить кнопку "Дальше"
    const nextButton = document.getElementById('mode3-next');
    if (nextButton) {
        nextButton.disabled = true;
    }

    // Проверка на конец игры
    if (mode3State.currentQuestion >= mode3State.totalQuestions) {
        mode3State.isGameOver = true;
        showMode3Results();
    } else {
        generateQuestionMode3();
    }
}

/**
 * Показ результатов в конце игры
 */
function showMode3Results() {

    const mode3Element = document.getElementById('mode3');
    const resultsElement = document.getElementById('mode3-results');

    if (mode3Element) {
        mode3Element.classList.add('hidden');
    }

    if (resultsElement) {
        resultsElement.classList.remove('hidden');
    } else {
        return;
    }

    const percentage = Math.round((mode3State.score / mode3State.totalQuestions) * 100);

    const finalScoreElement = document.getElementById('mode3-final-score');
    if (finalScoreElement) {
        finalScoreElement.textContent = `${mode3State.score} из ${mode3State.totalQuestions} (${percentage}%)`;
    }

    // Сообщение в зависимости от результата
    let message = "";
    if (percentage === 100) {
        message = "🎉 ¡Excelente! Perfecto! Идеально!";
    } else if (percentage >= 80) {
        message = "👏 ¡Muy bien! Очень хорошо!";
    } else if (percentage >= 60) {
        message = "👍 ¡Bien! Хорошо!";
    } else {
        message = "📚 Sigue practicando! Продолжай тренироваться!";
    }

    const messageElement = document.getElementById('mode3-message');
    if (messageElement) {
        messageElement.textContent = message;
    }

}

/**
 * Перезапуск Mode 3 - функция restartMode3() по требованию задачи
 */
function restartMode3() {

    const resultsElement = document.getElementById('mode3-results');
    if (resultsElement) {
        resultsElement.classList.add('hidden');
    }

    initMode3();
}

// Экспорт функций для глобального доступа
window.initMode3 = initMode3;
window.restartMode3 = restartMode3;
window.generateQuestionMode3 = generateQuestionMode3;
window.checkAnswerMode3 = checkAnswerMode3;
window.updateScoreMode3 = updateScoreMode3;
