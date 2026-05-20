/**
 * Tren Ir/Venir - Mode 0: UI Functions
 *
 * Функции отображения и обработки пользовательского ввода.
 *
 * Функции:
 * - displayVerbSelectionMode0() - показывает выбор глагола
 * - displayQuestionMode0(question) - отображает вопрос
 * - checkMode0Answer(selected, correct, button) - проверка ответа кнопки
 * - updateScoreMode0() - обновление счёта
 * - updateProgressMode0() - обновление прогресса
 */

/**
 * Обновляет отображение счёта в UI
 */
function updateScoreMode0() {
  const scoreValue = document.getElementById('score-value');
  if (scoreValue) {
    scoreValue.textContent = mode0State.score;
  }
}

/**
 * Обновляет отображение прогресса
 */
function updateProgressMode0() {
  const progressLabel = document.getElementById('progress-label');
  const progressValue = document.getElementById('progress-value');

  if (progressLabel && progressValue) {
    const percentage = Math.round((mode0State.questionCount / mode0State.maxQuestions) * 100);
    progressLabel.textContent = 'Прогресс:';
    progressValue.textContent = `${percentage}%`;
  }
}

/**
 * Показывает интерфейс выбора глагола для mode0
 * Пользователь выбирает один из трёх глаголов: ir, venir, llegar
 */
function displayVerbSelectionMode0() {
  const contentArea = document.getElementById('mode0-content');
  if (!contentArea) {
    console.error('Mode 0 content area not found');
    return;
  }

  contentArea.innerHTML = `
    <div class="verb-selection-container">
      <h3>Выберите глагол для спряжения:</h3>
      <div class="verb-buttons">
        <button class="verb-btn" onclick="startMode0('ir')">ir</button>
        <button class="verb-btn" onclick="startMode0('venir')">venir</button>
        <button class="verb-btn" onclick="startMode0('llegar')">llegar</button>
      </div>
    </div>
  `;
}

/**
 * Отображает вопрос в игровой зоне
 * @param {Object} question - объект вопроса из generateQuestionMode0()
 */
function displayQuestionMode0(question) {
  const contentArea = document.getElementById('mode0-content');
  if (!contentArea) {
    console.error('Mode 0 content area not found');
    return;
  }

  // Генерируем 5 вариантов ответа
  const options = generateMode0Options(question.correctAnswer, question.verb, question.tense, question.person);

  // Обновляем текст вопроса
  contentArea.innerHTML = `
    <div class="question-container">
      <div class="question-number">
        Вопрос ${mode0State.questionCount + 1} из ${mode0State.maxQuestions}
      </div>
      <div class="question-text" id="mode0-question-text">
        ${question.questionText}
      </div>
      <div class="options-container" id="mode0-options">
        <!-- Кнопки будут созданы через JS -->
      </div>
      <div id="mode0-feedback" class="feedback"></div>
      <button
        id="mode0-next-btn"
        class="next-button"
        style="display: ${mode0State.isAnswered ? 'inline-block' : 'none'}"
      >
        Дальше →
      </button>
    </div>
  `;

  // Отрисовка кнопок с вариантами
  const optionsContainer = document.getElementById('mode0-options');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option;
      button.onclick = () => checkMode0Answer(option, question.correctAnswer, button);
      optionsContainer.appendChild(button);
    });
  }

  // Добавляем обработчики событий
  setupEventListenersMode0();
}

/**
 * Проверяет ответ при выборе кнопки
 * @param {string} selected - выбранный вариант
 * @param {string} correct - правильный ответ
 * @param {HTMLElement} buttonElement - элемент кнопки
 */
function checkMode0Answer(selected, correct, buttonElement) {
  // Блокируем все кнопки
  const allButtons = document.querySelectorAll('#mode0-options .option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  // Нормализация строк: убираем пробелы, приводим к нижнему регистру, унифицируем Unicode
  const normalize = (str) => str.trim().normalize('NFC').toLowerCase();

  // Проверяем ответ с нормализацией
  const isCorrect = normalize(selected) === normalize(correct);

  // Показываем обратную связь
  const feedback = document.getElementById('mode0-feedback');
  if (isCorrect) {
    feedback.textContent = '✅ ¡Correcto!';
    feedback.className = 'feedback correct';
    buttonElement.classList.add('correct');  // Подсветка правильной кнопки
    mode0State.score++;
  } else {
    feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${correct}`;
    feedback.className = 'feedback wrong';
    buttonElement.classList.add('incorrect');  // Подсветка неправильной кнопки

    // Подсветить правильную кнопку
    allButtons.forEach(btn => {
      if (normalize(btn.textContent) === normalize(correct)) {
        btn.classList.add('correct');
      }
    });
  }

  // Обновить счёт
  updateScoreMode0();

  // Показать кнопку "Дальше"
  const nextButton = document.getElementById('mode0-next-btn');
  if (nextButton) {
    nextButton.style.display = 'inline-block';
  }

  mode0State.isAnswered = true;
  mode0State.questionCount++;
}

/**
 * Настраивает обработчики событий для элементов управления
 */
function setupEventListenersMode0() {
  const nextButton = document.getElementById('mode0-next-btn');

  // Обработчик кнопки "Следующий вопрос"
  if (nextButton) {
    nextButton.addEventListener('click', handleNextQuestionMode0);
  }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    displayQuestionMode0,
    checkMode0Answer,
    updateScoreMode0,
    updateProgressMode0,
    setupEventListenersMode0,
    displayVerbSelectionMode0
  };
}
