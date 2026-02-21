/**
 * Tren Ir/Venir/Llegar - Mode 4: Translation (Russian → Spanish)
 * Логика игры на перевод с русского на испанский
 *
 * Функциональность:
 * - generateQuestion() - показывает русское предложение
 * - Multiple choice с 3-4 вариантами на испанском
 * - checkAnswer(selected, correct) - проверка ответа
 * - Предложения с ir, venir, llegar в различных временах
 * - Обратная связь (✅/❌)
 * - Подсчёт очков
 * - Кнопка следующего вопроса
 *
 * Пример вопроса:
 * "Я иду домой"
 * Варианты: ["Voy a casa", "Vengo a casa", "Llego a casa"]
 * Правильный: "Voy a casa"
 */

// База предложений для перевода (20+ пар)
// ВАЖНО: Все опции должны точно совпадать с полем spanish (полное предложение)
const MODE4_TRANSLATIONS = [
    // IR - настоящее время (presente)
    {
        russian: "Я иду домой сейчас.",
        spanish: "Voy a casa ahora.",
        options: ["Voy a casa ahora.", "Vengo a casa ahora.", "Llego a casa ahora.", "Fui a casa ahora."],
        verb: "ir",
        tense: "presente",
        person: "yo"
    },
    {
        russian: "Ты идёшь в школу.",
        spanish: "Vas a la escuela.",
        options: ["Vas a la escuela.", "Vienes de la escuela.", "Llegas a la escuela.", "Fuiste a la escuela."],
        verb: "ir",
        tense: "presente",
        person: "tu"
    },
    {
        russian: "Он идёт в Мадрид завтра.",
        spanish: "Va a Madrid mañana.",
        options: ["Va a Madrid mañana.", "Viene de Madrid mañana.", "Llega a Madrid mañana.", "Fue a Madrid mañana."],
        verb: "ir",
        tense: "presente",
        person: "el/ella"
    },
    {
        russian: "Мы идём в кино.",
        spanish: "Vamos al cine.",
        options: ["Vamos al cine.", "Venimos del cine.", "Llegamos al cine.", "Fuimos al cine."],
        verb: "ir",
        tense: "presente",
        person: "nosotros"
    },
    {
        russian: "Они идут на вечеринку.",
        spanish: "Van a la fiesta.",
        options: ["Van a la fiesta.", "Vienen de la fiesta.", "Llegan a la fiesta.", "Fueron a la fiesta."],
        verb: "ir",
        tense: "presente",
        person: "ellos"
    },

    // IR - прошедшее время (indefinido)
    {
        russian: "Я пошёл домой вчера.",
        spanish: "Fui a casa ayer.",
        options: ["Fui a casa ayer.", "Vine a casa ayer.", "Llegué a casa ayer.", "Voy a casa ayer."],
        verb: "ir",
        tense: "indefinido",
        person: "yo"
    },
    {
        russian: "Ты пошёл на работу.",
        spanish: "Fuiste al trabajo.",
        options: ["Fuiste al trabajo.", "Viniste del trabajo.", "Llegaste al trabajo.", "Vas al trabajo."],
        verb: "ir",
        tense: "indefinido",
        person: "tu"
    },
    {
        russian: "Она пошла в библиотеку.",
        spanish: "Fue a la biblioteca.",
        options: ["Fue a la biblioteca.", "Vino de la biblioteca.", "Llegó a la biblioteca.", "Va a la biblioteca."],
        verb: "ir",
        tense: "indefinido",
        person: "el/ella"
    },

    // VENIR - настоящее время (presente)
    {
        russian: "Я прихожу из школы.",
        spanish: "Vengo de la escuela.",
        options: ["Vengo de la escuela.", "Voy a la escuela.", "Llego de la escuela.", "Vine de la escuela."],
        verb: "venir",
        tense: "presente",
        person: "yo"
    },
    {
        russian: "Ты приходишь с работы.",
        spanish: "Vienes del trabajo.",
        options: ["Vienes del trabajo.", "Vas al trabajo.", "Llegas del trabajo.", "Viniste del trabajo."],
        verb: "venir",
        tense: "presente",
        person: "tu"
    },
    {
        russian: "Она приходит из Испании.",
        spanish: "Viene de España.",
        options: ["Viene de España.", "Va a España.", "Llega de España.", "Vino de España."],
        verb: "venir",
        tense: "presente",
        person: "el/ella"
    },
    {
        russian: "Мы приходим из библиотеки.",
        spanish: "Venimos de la biblioteca.",
        options: ["Venimos de la biblioteca.", "Vamos a la biblioteca.", "Llegamos de la biblioteca.", "Vinimos de la biblioteca."],
        verb: "venir",
        tense: "presente",
        person: "nosotros"
    },
    {
        russian: "Они приходят с вечеринки.",
        spanish: "Vienen de la fiesta.",
        options: ["Vienen de la fiesta.", "Van a la fiesta.", "Llegan de la fiesta.", "Vinieron de la fiesta."],
        verb: "venir",
        tense: "presente",
        person: "ellos"
    },

    // VENIR - прошедшее время (indefinido)
    {
        russian: "Я пришёл домой поздно.",
        spanish: "Vine a casa tarde.",
        options: ["Vine a casa tarde.", "Fui a casa tarde.", "Llegué a casa tarde.", "Vengo a casa tarde."],
        verb: "venir",
        tense: "indefinido",
        person: "yo"
    },
    {
        russian: "Ты пришёл с работы уставшим.",
        spanish: "Viniste del trabajo cansado.",
        options: ["Viniste del trabajo cansado.", "Fuiste al trabajo cansado.", "Llegaste del trabajo cansado.", "Vienes del trabajo cansado."],
        verb: "venir",
        tense: "indefinido",
        person: "tu"
    },
    {
        russian: "Она пришла из школы рано.",
        spanish: "Vino de la escuela temprano.",
        options: ["Vino de la escuela temprano.", "Fue a la escuela temprano.", "Llegó de la escuela temprano.", "Viene de la escuela temprano."],
        verb: "venir",
        tense: "indefinido",
        person: "el/ella"
    },

    // LLEGAR - настоящее время (presente)
    {
        russian: "Я прибываю на поезде.",
        spanish: "Llego en tren.",
        options: ["Llego en tren.", "Voy en tren.", "Vengo en tren.", "Llegué en tren."],
        verb: "llegar",
        tense: "presente",
        person: "yo"
    },
    {
        russian: "Ты прибываешь на станцию.",
        spanish: "Llegas a la estación.",
        options: ["Llegas a la estación.", "Vas a la estación.", "Vienes de la estación.", "Llegaste a la estación."],
        verb: "llegar",
        tense: "presente",
        person: "tu"
    },
    {
        russian: "Она прибывает на самолёте.",
        spanish: "Llega en avión.",
        options: ["Llega en avión.", "Va en avión.", "Viene en avión.", "Llegó en avión."],
        verb: "llegar",
        tense: "presente",
        person: "el/ella"
    },
    {
        russian: "Мы прибываем вовремя.",
        spanish: "Llegamos a tiempo.",
        options: ["Llegamos a tiempo.", "Vamos a tiempo.", "Venimos a tiempo.", "Llegamos a tiempo."],
        verb: "llegar",
        tense: "presente",
        person: "nosotros"
    },
    {
        russian: "Они прибывают на автобусе.",
        spanish: "Llegan en autobús.",
        options: ["Llegan en autobús.", "Van en autobús.", "Vienen en autobús.", "Llegaron en autobús."],
        verb: "llegar",
        tense: "presente",
        person: "ellos"
    },

    // LLEGAR - прошедшее время (indefinido)
    {
        russian: "Я прибыл домой поздно.",
        spanish: "Llegué a casa tarde.",
        options: ["Llegué a casa tarde.", "Fui a casa tarde.", "Vine a casa tarde.", "Llego a casa tarde."],
        verb: "llegar",
        tense: "indefinido",
        person: "yo"
    },
    {
        russian: "Ты прибыл на работу вовремя.",
        spanish: "Llegaste al trabajo a tiempo.",
        options: ["Llegaste al trabajo a tiempo.", "Fuiste al trabajo a tiempo.", "Viniste del trabajo a tiempo.", "Llegas al trabajo a tiempo."],
        verb: "llegar",
        tense: "indefinido",
        person: "tu"
    },
    {
        russian: "Она прибыла в Мадрид вчера.",
        spanish: "Llegó a Madrid ayer.",
        options: ["Llegó a Madrid ayer.", "Fue a Madrid ayer.", "Vino de Madrid ayer.", "Llega a Madrid ayer."],
        verb: "llegar",
        tense: "indefinido",
        person: "el/ella"
    },

    // Смешанные времена
    {
        russian: "Я пойду домой завтра.",
        spanish: "Iré a casa mañana.",
        options: ["Iré a casa mañana.", "Vendré a casa mañana.", "Llegaré a casa mañana.", "Voy a casa mañana."],
        verb: "ir",
        tense: "futuro",
        person: "yo"
    },
    {
        russian: "Ты придёшь с работы поздно.",
        spanish: "Vendrás del trabajo tarde.",
        options: ["Vendrás del trabajo tarde.", "Irás al trabajo tarde.", "Llegarás del trabajo tarde.", "Vienes del trabajo tarde."],
        verb: "venir",
        tense: "futuro",
        person: "tu"
    },
    {
        russian: "Она придёт на самолёте.",
        spanish: "Llegará en avión.",
        options: ["Llegará en avión.", "Irá en avión.", "Vendrá en avión.", "Llega en avión."],
        verb: "llegar",
        tense: "futuro",
        person: "el/ella"
    },
    {
        russian: "Я шёл домой, когда встретил друга. (imperfecto)",
        spanish: "Iba a casa cuando encontré a un amigo.",
        options: ["Iba a casa cuando encontré a un amigo.", "Venía a casa cuando encontré a un amigo.", "Llegaba a casa cuando encontré a un amigo.", "Fui a casa cuando encontré a un amigo."],
        verb: "ir",
        tense: "imperfecto",
        person: "yo"
    },
    {
        russian: "Ты приходил с работы уставшим. (imperfecto)",
        spanish: "Venías del trabajo cansado.",
        options: ["Venías del trabajo cansado.", "Ibas al trabajo cansado.", "Llegabas del trabajo cansado.", "Viniste del trabajo cansado."],
        verb: "venir",
        tense: "imperfecto",
        person: "tu"
    },
    {
        russian: "Она прибывала на поезде каждый день. (imperfecto)",
        spanish: "Llegaba en tren cada día.",
        options: ["Llegaba en tren cada día.", "Iba en tren cada día.", "Venía en tren cada día.", "Llegó en tren cada día."],
        verb: "llegar",
        tense: "imperfecto",
        person: "el/ella"
    }
];

// Состояние игры
let mode4State = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 0,
    shuffled: [],
    isGameOver: false,
    maxQuestions: 15 // Максимальное количество вопросов за игру
};

/**
 * Перемешивание массива (алгоритм Фишера-Йетса)
 * @param {Array} array - массив для перемешивания
 * @returns {Array} перемешанный массив
 */
function shuffleArrayMode4(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Перемешивание вариантов ответа
 * @param {Array} options - массив вариантов ответа
 * @returns {Array} перемешанный массив вариантов
 */
function shuffleOptions(options) {
    return shuffleArrayMode4(options);
}

/**
 * Нормализация строки для сравнения - удаляет конечные знаки препинания
 * @param {string} str - строка для нормализации
 * @returns {string} нормализованная строка
 */
function normalizeText(str) {
    return str.replace(/[.!?]$/, '').trim();
}

/**
 * Инициализация Mode 4 - запуск игры на перевод
 */
function initMode4() {
    mode4State.currentQuestion = 0;
    mode4State.score = 0;
    mode4State.isGameOver = false;

    // Перемешиваем все вопросы и берём первые maxQuestions
    const allShuffled = shuffleArrayMode4(MODE4_TRANSLATIONS);
    mode4State.shuffled = allShuffled.slice(0, mode4State.maxQuestions);
    mode4State.totalQuestions = mode4State.shuffled.length;

    // Скрыть главное меню, показать mode4-area
    const mainMenu = document.querySelector('.main-menu');
    if (mainMenu) {
        mainMenu.classList.add('hidden');
    }
    
    // Скрыть все game-area кроме mode4-area
    document.querySelectorAll('.game-area').forEach(el => {
        el.classList.add('hidden');
    });
    
    const mode4Element = document.getElementById('mode4-area');
    if (mode4Element) {
        mode4Element.classList.remove('hidden');
    } else {
        console.error('mode4-area not found!');
    }

    // Обновить счёт
    updateScoreMode4();

    // Показать первый вопрос
    generateQuestion();
}

/**
 * Генерация вопроса - показывает русское предложение
 * Функция generateQuestion() по требованию задачи
 */
function generateQuestion() {
    if (mode4State.isGameOver) {
        showMode4Results();
        return;
    }

    const question = mode4State.shuffled[mode4State.currentQuestion];

    // Обновить текст вопроса (русское предложение)
    const questionElement = document.getElementById('mode4-question');
    if (questionElement) {
        questionElement.textContent = question.russian;
    }

    // Обновить подсказку о глаголе и времени (опционально)
    const hintElement = document.getElementById('mode4-hint');
    if (hintElement) {
        hintElement.textContent = `Глагол: ${question.verb} | Время: ${question.tense}`;
    }

    // Обновить прогресс
    const progressElement = document.getElementById('mode4-progress');
    if (progressElement) {
        progressElement.textContent = `Вопрос ${mode4State.currentQuestion + 1} из ${mode4State.totalQuestions}`;
    }

    // Перемешать варианты ответов
    const shuffledOptions = shuffleOptions([...question.options]);

    // Настроить кнопки с вариантами
    const buttons = document.querySelectorAll('.mode4-option');
    buttons.forEach((btn, index) => {
        if (index < shuffledOptions.length) {
            btn.textContent = shuffledOptions[index];
            btn.disabled = false;
            // Передаём normalized значения для сравнения
            btn.onclick = () => checkAnswer(shuffledOptions[index], question.spanish);
        } else {
            // Скрыть лишние кнопки, если вариантов меньше 4
            btn.style.display = 'none';
        }
    });
}

/**
 * Проверка ответа - функция checkAnswer(selected, correct) по требованию задачи
 * @param {string} selected - выбранный пользователем вариант
 * @param {string} correct - правильный вариант
 */
function checkAnswer(selected, correct) {
    const feedback = document.getElementById('mode4-feedback');
    if (!feedback) return;

    // Блокируем кнопки
    document.querySelectorAll('.mode4-option').forEach(btn => {
        btn.disabled = true;
    });

    // Нормализация строк для сравнения (игнорирование конечных знаков препинания)
    const normalizedSelected = normalizeText(selected);
    const normalizedCorrect = normalizeText(correct);

    // Проверка ответа
    if (normalizedSelected === normalizedCorrect) {
        mode4State.score++;
        feedback.textContent = "✅ ¡Correcto! Правильно!";
        feedback.className = "feedback correct";
        updateScoreMode4();
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${correct}`;
        feedback.className = "feedback incorrect";
    }

    // Кнопка "Дальше" становится активной
    const nextButton = document.getElementById('mode4-next');
    if (nextButton) {
        nextButton.disabled = false;
        nextButton.onclick = nextMode4Question;
    }
}

/**
 * Обновление счёта - функция updateScore() по требованию задачи
 */
function updateScoreMode4() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode4State.score;
    }
}

/**
 * Переход к следующему вопросу
 */
function nextMode4Question() {
    mode4State.currentQuestion++;

    // Сбросить обратную связь
    const feedback = document.getElementById('mode4-feedback');
    if (feedback) {
        feedback.textContent = "";
        feedback.className = "feedback";
    }

    // Сбросить кнопку "Дальше"
    const nextButton = document.getElementById('mode4-next');
    if (nextButton) {
        nextButton.disabled = true;
    }

    // Показать все кнопки вариантов
    document.querySelectorAll('.mode4-option').forEach(btn => {
        btn.style.display = 'inline-block';
    });

    // Проверка на конец игры
    if (mode4State.currentQuestion >= mode4State.totalQuestions) {
        mode4State.isGameOver = true;
        showMode4Results();
    } else {
        generateQuestion();
    }
}

/**
 * Показ результатов в конце игры
 */
function showMode4Results() {
    document.getElementById('mode4').classList.add('hidden');
    document.getElementById('mode4-results').classList.remove('hidden');

    const percentage = Math.round((mode4State.score / mode4State.totalQuestions) * 100);

    const finalScoreElement = document.getElementById('mode4-final-score');
    if (finalScoreElement) {
        finalScoreElement.textContent = `${mode4State.score} из ${mode4State.totalQuestions} (${percentage}%)`;
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

    const messageElement = document.getElementById('mode4-message');
    if (messageElement) {
        messageElement.textContent = message;
    }
}

/**
 * Перезапуск Mode 4 - функция restartMode4() по требованию задачи
 */
function restartMode4() {
    document.getElementById('mode4-results').classList.add('hidden');
    initMode4();
}

// Экспорт функций для глобального доступа
window.initMode4 = initMode4;
window.restartMode4 = restartMode4;
window.generateQuestion = generateQuestion;
window.checkAnswer = checkAnswer;
window.updateScoreMode4 = updateScoreMode4;