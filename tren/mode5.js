/**
 * Tren Ir/Venir/Llegar - Mode 5: Logic (Fixed & Synced)
 * Объединяет новую циклическую очередь с существующим UI
 */

// Константы
const MODE5_SESSION_LIMIT = 20;

// Состояние
let mode5State = {
    questionsQueue: [],
    score: 0,
    totalAnswered: 0,
    sessionLimit: MODE5_SESSION_LIMIT,
    isAnswered: false
};

/**
 * Инициализация
 */
function initMode5() {
    console.log('[Mode 5] Initializing logic...');
    
    // Используем MODE5_DATA из сгенерированного файла
    const sourceData = typeof MODE5_DATA !== 'undefined' ? MODE5_DATA : (typeof MODE5_SENTENCES !== 'undefined' ? MODE5_SENTENCES : []);
    
    if (sourceData.length === 0) {
        console.error('No data found for Mode 5! Check mode5-data.js');
        return;
    }

    mode5State.questionsQueue = shuffleArrayMode5([...sourceData]);
    mode5State.score = 0;
    mode5State.totalAnswered = 0;
    mode5State.sessionLimit = Math.min(MODE5_SESSION_LIMIT, sourceData.length);
    mode5State.isAnswered = false;

    // Скрыть меню, показать область игры
    document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
    document.querySelector('.main-menu').classList.add('hidden');
    document.getElementById('mode5-area').classList.remove('hidden');

    displayMode5Question();
}

/**
 * Отображение текущего вопроса
 */
function displayMode5Question() {
    if (mode5State.totalAnswered >= mode5State.sessionLimit) {
        showMode5ResultsUI();
        return;
    }

    mode5State.isAnswered = false;
    const currentQuestion = mode5State.questionsQueue[0];
    
    if (typeof displayMode5QuestionUI === 'function') {
        displayMode5QuestionUI(currentQuestion);
    }
}

/**
 * Проверка ответа (вызывается из UI)
 */
function checkMode5Answer(selected, correct, buttonElement, explanation) {
    mode5State.isAnswered = true;

    const feedback = document.getElementById('mode5-feedback');
    const allButtons = document.querySelectorAll('#mode5-options .option-btn');
    const nextButton = document.getElementById('mode5-next-btn');

    allButtons.forEach(btn => btn.disabled = true);

    // Умная нормализация
    const normalize = (str) => str.replace(/[¡!¿?]/g, '').trim().toLowerCase();
    const isCorrect = normalize(selected) === normalize(correct);

    // Заполняем пропуск правильным ответом
    const blankElement = document.getElementById('question-blank');
    if (blankElement) {
        blankElement.textContent = correct;
        blankElement.style.color = isCorrect ? '#27ae60' : '#e74c3c';
        blankElement.style.fontWeight = 'bold';
        blankElement.style.textDecoration = 'none';
    }

    feedback.style.display = 'block';

    if (isCorrect) {
        feedback.innerHTML = `
            <div style="color: #27ae60; font-weight: bold; margin-bottom: 8px;">✅ ¡Correcto!</div>
            <div style="color: #444; font-size: 0.95rem; line-height: 1.4;">${explanation}</div>
        `;
        feedback.style.borderLeft = '5px solid #27ae60';
        buttonElement.classList.add('correct');
        buttonElement.style.background = '#dcfce7';
        mode5State.score++;
        updateMode5ScoreUI();

        // Автоматическая озвучка правильного ответа
        if (typeof playCurrentMode5Phrase === 'function') {
            playCurrentMode5Phrase();
        }
    } else {
        feedback.innerHTML = `
            <div style="color: #e74c3c; font-weight: bold; margin-bottom: 8px;">❌ Incorrecto. Правильный ответ: ${correct}</div>
            <div style="color: #444; font-size: 0.95rem; line-height: 1.4;">${explanation}</div>
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

/**
 * Переход к следующему вопросу (Очередь)
 */
function handleNextMode5Question() {
    // Циклическая логика: берем первый, кидаем в конец
    const answered = mode5State.questionsQueue.shift();
    mode5State.questionsQueue.push(answered);
    
    mode5State.totalAnswered++;
    displayMode5Question();
}

/**
 * Перезапуск
 */
function restartMode5() {
    initMode5();
}

/**
 * Вспомогательная функция
 */
function shuffleArrayMode5(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Экспорт
window.initMode5 = initMode5;
window.restartMode5 = restartMode5;
window.checkMode5Answer = checkMode5Answer;
window.handleNextMode5Question = handleNextMode5Question;
