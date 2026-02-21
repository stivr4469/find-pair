/**
 * Find Pair Game Script
 * Игра "Найди пару" - Испанские глаголы
 * 
 * Механика: сопоставление испанских глаголов с их переводом
 */

// ============================================
// ДАННЫЕ ИГРЫ - Испанские глаголы
// ============================================
const VERB_PAIRS = [
    { spanish: 'hablar', russian: 'говорить' },
    { spanish: 'comer', russian: 'есть' },
    { spanish: 'vivir', russian: 'жить' },
    { spanish: 'trabajar', russian: 'работать' },
    { spanish: 'estudiar', russian: 'учить' },
    { spanish: 'jugar', russian: 'играть' },
    { spanish: 'leer', russian: 'читать' },
    { spanish: 'escribir', russian: 'писать' },
    { spanish: 'correr', russian: 'бежать' },
    { spanish: 'dormir', russian: 'спать' },
    { spanish: 'caminar', russian: 'гулять' },
    { spanish: 'beber', russian: 'пить' }
];

// ============================================
// СОСТОЯНИЕ ИГРЫ
// ============================================
let gameState = {
    cards: [],           // Массив карточек
    flippedCards: [],    // Перевернутые карточки
    matchedPairs: [],    // Найденные пары
    score: 0,            // Текущий счёт
    isLocked: false      // Блокировка действий (во время анимации)
};

// Telegram WebApp объект
let tg = null;

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('[FIND PAIR] Игра загружена');
    
    // Инициализация Telegram
    initTelegram();
    
    // Начало игры
    startGame();
});

/**
 * Инициализация Telegram WebApp
 */
function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        applyTelegramTheme();
        showCloseButton();
    }
}

/**
 * Применение темы Telegram
 */
function applyTelegramTheme() {
    if (!tg) return;
    
    const root = document.documentElement;
    const theme = tg.themeParams;
    
    if (theme.bgColor) root.style.setProperty('--tg-theme-bg-color', theme.bgColor);
    if (theme.textColor) root.style.setProperty('--tg-theme-text-color', theme.textColor);
    if (theme.hintColor) root.style.setProperty('--tg-theme-hint-color', theme.hintColor);
    if (theme.buttonColor) root.style.setProperty('--tg-theme-button-color', theme.buttonColor);
    if (theme.buttonTextColor) root.style.setProperty('--tg-theme-button-text-color', theme.buttonTextColor);
    if (theme.secondaryBgColor) root.style.setProperty('--tg-theme-secondary-bg-color', theme.secondaryBgColor);
}

/**
 * Показать кнопку "Закрыть" для Telegram
 */
function showCloseButton() {
    const closeBtn = document.getElementById('close-btn');
    if (closeBtn && tg) {
        closeBtn.classList.remove('hidden');
    }
}

/**
 * Закрыть приложение
 */
function closeApp() {
    if (tg) {
        tg.close();
    } else {
        window.close();
    }
}

/**
 * Вернуться в главное меню
 */
function goBack() {
    if (tg) {
        tg.HapticFeedback.impactOccurred('light');
    }
    window.location.href = '../index.html';
}

// ============================================
// ЛОГИКА ИГРЫ
// ============================================

/**
 * Начало новой игры
 */
function startGame() {
    console.log('[FIND PAIR] Начало игры');
    
    // Сброс состояния
    gameState = {
        cards: [],
        flippedCards: [],
        matchedPairs: [],
        score: 0,
        isLocked: false
    };
    
    // Создание и перемешивание карточек
    createCards();
    shuffleCards();
    
    // Отрисовка игрового поля
    renderBoard();
    
    // Обновление UI
    updateUI();
    
    // Скрытие модального окна
    hideWinModal();
}

/**
 * Создание карточек из пар глаголов
 */
function createCards() {
    // Выбираем 6 пар для игры (24 карточки = 4x6 сетка)
    const selectedPairs = VERB_PAIRS.slice(0, 6);
    
    selectedPairs.forEach((pair, index) => {
        // Карточка с испанским словом
        gameState.cards.push({
            id: `spanish-${index}`,
            pairId: index,
            text: pair.spanish,
            type: 'spanish',
            isFlipped: false,
            isMatched: false
        });
        
        // Карточка с русским переводом
        gameState.cards.push({
            id: `russian-${index}`,
            pairId: index,
            text: pair.russian,
            type: 'russian',
            isFlipped: false,
            isMatched: false
        });
    });
}

/**
 * Перемешивание карточек (алгоритм Фишера-Йетса)
 */
function shuffleCards() {
    for (let i = gameState.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.cards[i], gameState.cards[j]] = [gameState.cards[j], gameState.cards[i]];
    }
    console.log('[FIND PAIR] Карточки перемешаны');
}

/**
 * Отрисовка игрового поля
 */
function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
    gameState.cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        board.appendChild(cardElement);
    });
}

/**
 * Создание элемента карточки
 * @param {Object} card - данные карточки
 * @param {number} index - индекс карточки
 * @returns {HTMLElement}
 */
function createCardElement(card, index) {
    const cardEl = document.createElement('div');
    cardEl.className = 'game-card';
    cardEl.dataset.index = index;
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('tabindex', '0');
    cardEl.setAttribute('aria-label', `Карточка ${index + 1}`);
    
    // Контент карточки
    const content = document.createElement('div');
    content.className = 'card-content';
    
    const text = document.createElement('span');
    text.className = `card-text ${card.type}`;
    text.textContent = card.text;
    
    content.appendChild(text);
    cardEl.appendChild(content);
    
    // Обработчик клика
    cardEl.addEventListener('click', () => handleCardClick(index));
    
    // Обработчик клавиатуры
    cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(index);
        }
    });
    
    return cardEl;
}

/**
 * Обработка клика по карточке
 * @param {number} index - индекс карточки
 */
function handleCardClick(index) {
    // Проверка блокировки
    if (gameState.isLocked) return;
    
    const card = gameState.cards[index];
    
    // Проверка: карточка уже перевернута или найдена
    if (card.isFlipped || card.isMatched) return;
    
    // Тактильная отдача
    if (tg) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Переворот карточки
    flipCard(index);
    gameState.flippedCards.push(index);
    
    // Проверка пары
    if (gameState.flippedCards.length === 2) {
        checkMatch();
    }
}

/**
 * Переворот карточки
 * @param {number} index - индекс карточки
 */
function flipCard(index) {
    const card = gameState.cards[index];
    card.isFlipped = true;
    
    const cardEl = document.querySelector(`[data-index="${index}"]`);
    cardEl.classList.add('flipped');
}

/**
 * Проверка совпадения двух карточек
 */
function checkMatch() {
    gameState.isLocked = true;
    
    const [index1, index2] = gameState.flippedCards;
    const card1 = gameState.cards[index1];
    const card2 = gameState.cards[index2];
    
    console.log('[FIND PAIR] Проверка пары:', card1.text, card2.text);
    
    // Проверка на совпадение pairId
    if (card1.pairId === card2.pairId) {
        // Пара найдена
        handleMatch(index1, index2);
    } else {
        // Пара не найдена
        handleMismatch(index1, index2);
    }
}

/**
 * Обработка найденной пары
 * @param {number} index1 - индекс первой карточки
 * @param {number} index2 - индекс второй карточки
 */
function handleMatch(index1, index2) {
    console.log('[FIND PAIR] Пара найдена!');
    
    // Тактильная отдача успеха
    if (tg) {
        tg.HapticFeedback.notificationOccurred('success');
    }
    
    // Помечаем карточки как найденные
    gameState.cards[index1].isMatched = true;
    gameState.cards[index2].isMatched = true;
    gameState.matchedPairs.push({ index1, index2 });
    
    // Визуальный эффект
    const card1El = document.querySelector(`[data-index="${index1}"]`);
    const card2El = document.querySelector(`[data-index="${index2}"]`);
    
    setTimeout(() => {
        card1El.classList.add('matched');
        card2El.classList.add('matched');
    }, 300);
    
    // Увеличение счёта
    gameState.score += 10;
    
    // Сброс
    gameState.flippedCards = [];
    gameState.isLocked = false;
    
    // Обновление UI
    updateUI();
    
    // Проверка победы
    checkWin();
}

/**
 * Обработка неправильной пары
 * @param {number} index1 - индекс первой карточки
 * @param {number} index2 - индекс второй карточки
 */
function handleMismatch(index1, index2) {
    console.log('[FIND PAIR] Пара не найдена');
    
    // Тактильная отдача ошибки
    if (tg) {
        tg.HapticFeedback.notificationOccurred('error');
    }
    
    // Визуальный эффект ошибки
    const card1El = document.querySelector(`[data-index="${index1}"]`);
    const card2El = document.querySelector(`[data-index="${index2}"]`);
    
    card1El.classList.add('incorrect');
    card2El.classList.add('incorrect');
    
    // Возврат карточек через 1 секунду
    setTimeout(() => {
        unflipCard(index1);
        unflipCard(index2);
        
        card1El.classList.remove('incorrect');
        card2El.classList.remove('incorrect');
        
        gameState.flippedCards = [];
        gameState.isLocked = false;
    }, 1000);
}

/**
 * Возврат карточки в исходное положение
 * @param {number} index - индекс карточки
 */
function unflipCard(index) {
    const card = gameState.cards[index];
    card.isFlipped = false;
    
    const cardEl = document.querySelector(`[data-index="${index}"]`);
    cardEl.classList.remove('flipped');
}

/**
 * Проверка условия победы
 */
function checkWin() {
    const totalPairs = VERB_PAIRS.slice(0, 6).length;
    
    if (gameState.matchedPairs.length === totalPairs) {
        console.log('[FIND PAIR] Победа!');
        
        // Тактильная отдача победы
        if (tg) {
            tg.HapticFeedback.notificationOccurred('success');
        }
        
        // Показ модального окна
        setTimeout(() => {
            showWinModal();
        }, 500);
    }
}

/**
 * Обновление пользовательского интерфейса
 */
function updateUI() {
    const scoreEl = document.getElementById('score');
    const remainingEl = document.getElementById('remaining');
    
    const totalPairs = VERB_PAIRS.slice(0, 6).length;
    const remaining = totalPairs - gameState.matchedPairs.length;
    
    scoreEl.textContent = gameState.score;
    remainingEl.textContent = remaining;
}

/**
 * Показ модального окна победы
 */
function showWinModal() {
    const modal = document.getElementById('win-modal');
    const finalScoreEl = document.getElementById('final-score');
    
    finalScoreEl.textContent = gameState.score;
    modal.classList.remove('hidden');
}

/**
 * Скрытие модального окна победы
 */
function hideWinModal() {
    const modal = document.getElementById('win-modal');
    modal.classList.add('hidden');
}

/**
 * Перезапуск игры
 */
function restartGame() {
    if (tg) {
        tg.HapticFeedback.impactOccurred('light');
    }
    startGame();
}

// ============================================
// ЭКСПОРТ ФУНКЦИЙ
// ============================================
window.goBack = goBack;
window.closeApp = closeApp;
window.restartGame = restartGame;
window.tg = tg;

console.log('[FIND PAIR] Скрипт инициализирован');
