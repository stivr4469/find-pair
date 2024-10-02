// Асинхронная функция для загрузки JSON файла
async function loadWords() {
    try {
        const response = await fetch('../../words.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке слов:', error);
    }
}

// Функция для инициализации игры с загруженными словами
async function initGame() {
    const words = await loadWords();

    // Получаем выбранную категорию из выпадающего списка
    const selectedCategoryValue = document.getElementById('category-select').value;

    // Выбираем слова из выбранной категории
    const selectedCategory = words[selectedCategoryValue];

    // Получаем выбранное количество пар из выпадающего списка
    const pairCount = parseInt(document.getElementById('pair-count').value);

    console.log(`Выбрано количество пар: ${pairCount}`);
    console.log(`Выбрана категория: ${selectedCategoryValue}`);

    // Создаем массив пар (ру-ис)
    let pairs = selectedCategory.map(word => ({
        ru: word.ru,
        es: word.es
    }));

    // Перемешиваем и выбираем нужное количество пар
    pairs = pairs.sort(() => Math.random() - 0.5).slice(0, pairCount);

    // Проверяем количество пар после обрезки
    console.log(`Количество пар после обрезки: ${pairs.length}`);

    // Очищаем старые элементы на странице
    clearColumns();

    // Отображаем новые слова
    displayWords(pairs);
}

// Функция для очистки предыдущих слов на странице
function clearColumns() {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');

    leftColumn.innerHTML = '';  // Полностью очищаем левую колонку
    rightColumn.innerHTML = ''; // Полностью очищаем правую колонку
}

// Функция для отображения пар слов
function displayWords(pairs) {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');

    // Перемешиваем только правую колонку отдельно от левой
    const rightWords = pairs.map(pair => pair.es).sort(() => Math.random() - 0.5);

    // Отображаем слова в левой и правой колонках
    pairs.forEach((pair, index) => {
        // Добавляем русские слова в левую колонку
        const leftWordElement = document.createElement('div');
        leftWordElement.className = 'word';
        leftWordElement.textContent = pair.ru;
        leftWordElement.dataset.match = pair.es;  // Сохраняем соответствующее испанское слово
        leftColumn.appendChild(leftWordElement);

        // Добавляем испанские слова в правую колонку
        const rightWordElement = document.createElement('div');
        rightWordElement.className = 'word';
        rightWordElement.textContent = rightWords[index];  // Перемешанные испанские слова
        rightWordElement.dataset.match = pair.ru;  // Сохраняем соответствующее русское слово
        rightColumn.appendChild(rightWordElement);
    });

    // Проверяем отображение количества пар
    console.log(`Отображено пар: ${pairs.length}`);

    // Добавляем обработчики для проверки соответствия
    addEventListeners();
}

// Функция для добавления обработчиков кликов
function addEventListeners() {
    const leftWords = document.querySelectorAll('#left-column .word');
    const rightWords = document.querySelectorAll('#right-column .word');

    leftWords.forEach(word => {
        word.addEventListener('click', handleClick);
    });

    rightWords.forEach(word => {
        word.addEventListener('click', handleClick);
    });
}

// Переменные для отслеживания выбранных слов
let selectedLeftWord = null;
let selectedRightWord = null;

// Обработчик кликов по словам
function handleClick(event) {
    const word = event.target;

    // Определяем, из какой колонки слово
    if (word.parentNode.id === 'left-column') {
        selectedLeftWord = word;
        word.classList.add('selected');
    } else {
        selectedRightWord = word;
        word.classList.add('selected');
    }

    // Проверяем, выбраны ли оба слова
    if (selectedLeftWord && selectedRightWord) {
        checkMatch();
    }
}

// Функция для проверки соответствия выбранных слов
function checkMatch() {
    if (selectedLeftWord.dataset.match === selectedRightWord.textContent) {
        // Если пара совпадает, скрываем слова
        selectedLeftWord.style.visibility = 'hidden';
        selectedRightWord.style.visibility = 'hidden';
    } else {
        // Если пара не совпадает, снимаем выделение
        selectedLeftWord.classList.remove('selected');
        selectedRightWord.classList.remove('selected');
    }

    // Сбрасываем выбор
    selectedLeftWord = null;
    selectedRightWord = null;

    // Проверяем окончание игры
    checkGameEnd();
}

// Функция для проверки завершения игры
function checkGameEnd() {
    const remainingWords = document.querySelectorAll('.word:not([style*="visibility: hidden"])');

    if (remainingWords.length === 0) {
        alert('Поздравляем! Вы нашли все пары!');
        initGame();  // Перезапуск игры
    }
}

// Запуск игры при загрузке страницы
window.onload = initGame;

