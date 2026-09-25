/**
 * Ser vs Estar - Classify Mode Logic
 * Логика режима "Классификация" (tap-to-classify)
 */

const CLASSIFY_SESSION_LIMIT = 20;

let classifyState = {
    queue: [],
    current: null,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalAnswered: 0,
    sessionLimit: CLASSIFY_SESSION_LIMIT,
    isAnswered: false,
    pendingNext: false,
    nextTimer: null
};

/**
 * Останавливает отложенный переход к следующей карточке (выход из режима / перезапуск)
 */
function stopClassifyMode() {
    if (classifyState.nextTimer) {
        clearTimeout(classifyState.nextTimer);
        classifyState.nextTimer = null;
    }
    classifyState.pendingNext = false;
}

/**
 * Инициализирует режим классификации
 */
function initClassifyMode() {
    if (typeof CLASSIFY_DATA === 'undefined') {
        console.error('[Classify] CLASSIFY_DATA не загружен');
        return;
    }

    stopClassifyMode();

    classifyState.queue = shuffleArray([...CLASSIFY_DATA]);
    classifyState.score = 0;
    classifyState.streak = 0;
    classifyState.bestStreak = 0;
    classifyState.totalAnswered = 0;
    classifyState.sessionLimit = Math.min(CLASSIFY_SESSION_LIMIT, CLASSIFY_DATA.length);
    classifyState.isAnswered = false;
    classifyState.pendingNext = false;
    classifyState.current = null;

    renderClassifyScreen();
    showNextClassifyQuestion();
}

/**
 * Показывает следующий вопрос
 */
function showNextClassifyQuestion() {
    if (classifyState.totalAnswered >= classifyState.sessionLimit) {
        showClassifyResults(
            classifyState.score,
            classifyState.sessionLimit,
            classifyState.bestStreak
        );
        return;
    }

    classifyState.isAnswered = false;
    classifyState.pendingNext = false;

    // Сбрасываем bubble Naranjito от предыдущего вопроса
    window.njReset && window.njReset();

    // Берём следующий из очереди (циклически)
    if (classifyState.queue.length === 0) {
        classifyState.queue = shuffleArray([...CLASSIFY_DATA]);
    }

    classifyState.current = classifyState.queue.shift();
    classifyState.queue.push(classifyState.current); // кидаем в конец для цикличности

    showClassifyCard(
        classifyState.current,
        classifyState.totalAnswered,
        classifyState.sessionLimit,
        classifyState.score,
        classifyState.streak
    );
}

/**
 * Обрабатывает выбор пользователя (SER или ESTAR)
 * @param {string} choice - "SER" или "ESTAR"
 */
function handleClassifyChoice(choice) {
    if (classifyState.isAnswered || classifyState.pendingNext) return;
    if (!classifyState.current) return;

    classifyState.isAnswered = true;
    disableClassifyZones();
    showClassifyTtsButton();

    const isCorrect = choice === classifyState.current.answer;

    if (isCorrect) {
        classifyState.score++;
        classifyState.streak++;
        if (classifyState.streak > classifyState.bestStreak) {
            classifyState.bestStreak = classifyState.streak;
        }

        // Обновляем счётчик в шапке
        updateClassifyGlobalScore();
        window.njAddStreak && window.njCorrect(window.njAddStreak());

        // Анимация: карточка летит к зоне
        animateCardCorrect(choice);

        // Через 500ms — следующая карточка
        classifyState.pendingNext = true;
        classifyState.nextTimer = setTimeout(() => {
            classifyState.nextTimer = null;
            classifyState.totalAnswered++;
            showNextClassifyQuestion();
        }, 550);

    } else {
        classifyState.streak = 0;
        window.njWrong && window.njWrong(null, (classifyState.current && classifyState.current.explanation) || null);

        // Анимация: карточка трясётся
        animateCardWrong(choice);

        // Показываем правило + кнопку «Дальше»
        showClassifyFeedback(classifyState.current);
        showClassifyNextButton();
    }
}

/**
 * TTS: озвучивает текущее предложение по нажатию кнопки
 */
function classifySpeak() {
    if (classifyState.current && typeof speakSpanish === 'function') {
        speakSpanish(classifyState.current.full);
    }
}

/**
 * Обновляет глобальный счётчик в заголовке страницы
 */
function updateClassifyGlobalScore() {
    const scoreValue = document.getElementById('score-value');
    if (scoreValue) {
        scoreValue.textContent = classifyState.score;
    }
}

/**
 * Показывает кнопку «Дальше →» после неправильного ответа
 */
function showClassifyNextButton() {
    const feedback = document.getElementById('classify-feedback');
    if (!feedback) return;

    // Удаляем старую кнопку если осталась от предыдущего вопроса
    feedback.querySelectorAll('.next-button').forEach(function(b) { b.remove(); });

    const btn = document.createElement('button');
    btn.className = 'next-button quiz-next-fixed';
    btn.textContent = 'Дальше →';
    btn.onclick = function() {
        classifyState.totalAnswered++;
        showNextClassifyQuestion();
    };
    feedback.appendChild(btn);
}

// Экспорт
if (typeof window !== 'undefined') {
    window.classifyState = classifyState;
    window.initClassifyMode = initClassifyMode;
    window.handleClassifyChoice = handleClassifyChoice;
    window.classifySpeak = classifySpeak;
}
