/**
 * Tren Ir/Venir - Mode 2: UI Functions
 *
 * Функции отображения и обработки пользовательского ввода.
 *
 * Функции:
 * - displayQuestionMode2(question) - отображает вопрос
 * - checkMode2Answer(selected, correct, button) - проверка ответа кнопки
 * - updateScoreMode2() - обновление счёта
 * - updateProgressMode2() - обновление прогресса
 */

/**
 * Обновляет отображение счёта в UI
 */
function updateScoreMode2() {
  const scoreValue = document.getElementById('score-value');
  if (scoreValue) {
    scoreValue.textContent = mode2State.score;
  }
}

/**
 * Обновляет отображение прогресса
 */
function updateProgressMode2() {
  const progressLabel = document.getElementById('progress-label');
  const progressValue = document.getElementById('progress-value');

  if (progressLabel && progressValue) {
    const percentage = Math.round((mode2State.questionCount / mode2State.maxQuestions) * 100);
    progressLabel.textContent = 'Прогресс:';
    progressValue.textContent = `${percentage}%`;
  }
}

/**
 * Отображает вопрос в игровой зоне
 * @param {Object} question - объект вопроса из generateQuestionMode2()
 */
function displayQuestionMode2(question) {
  const contentArea = document.getElementById('mode2-content');
  if (!contentArea) {
    console.error('Mode 2 content area not found');
    return;
  }

  // Генерируем 5 вариантов ответа
  const options = generateMode2Options(question.correctAnswer, question.verb, question.tense, question.person);

  // Обновляем текст вопроса
  contentArea.innerHTML = `
    <div class="question-container">
      <div class="question-number">
        Вопрос ${mode2State.questionCount + 1} из ${mode2State.maxQuestions}
      </div>
      <div class="question-text" id="mode2-question-text">
        ${question.questionText}
      </div>
      <div class="options-container" id="mode2-options">
        <!-- Кнопки будут созданы через JS -->
      </div>
      <div id="mode2-feedback" class="feedback"></div>
      <button
        id="mode2-next-btn"
        class="next-button"
        style="display: ${mode2State.isAnswered ? 'inline-block' : 'none'}"
      >
        Дальше →
      </button>
    </div>
  `;

  // Отрисовка кнопок с вариантами
  const optionsContainer = document.getElementById('mode2-options');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option;
      button.onclick = () => checkMode2Answer(option, question.correctAnswer, button);
      optionsContainer.appendChild(button);
    });
  }

  // Добавляем обработчики событий
  setupEventListenersMode2();
}

/**
 * Проверяет ответ при выборе кнопки
 * @param {string} selected - выбранный вариант
 * @param {string} correct - правильный ответ
 * @param {HTMLElement} buttonElement - элемент кнопки
 */
function checkMode2Answer(selected, correct, buttonElement) {
  // Блокируем все кнопки
  const allButtons = document.querySelectorAll('#mode2-options .option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  // Нормализация строк: убираем пробелы, приводим к нижнему регистру, унифицируем Unicode
  const normalize = (str) => str.trim().normalize('NFC').toLowerCase();
  
  // Проверяем ответ с нормализацией
  const isCorrect = normalize(selected) === normalize(correct);

  // Показываем обратную связь
  const feedback = document.getElementById('mode2-feedback');
  if (isCorrect) {
    feedback.textContent = '✅ ¡Correcto!';
    feedback.className = 'feedback correct';
    mode2State.score++;
  } else {
    feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${correct}`;
    feedback.className = 'feedback wrong';

    // Подсветить правильную кнопку
    allButtons.forEach(btn => {
      if (normalize(btn.textContent) === normalize(correct)) {
        btn.classList.add('correct-answer');
      }
    });
  }

  // Обновить счёт
  updateScoreMode2();

  // Показать кнопку "Дальше"
  const nextButton = document.getElementById('mode2-next-btn');
  if (nextButton) {
    nextButton.style.display = 'inline-block';
  }

  mode2State.isAnswered = true;
  mode2State.questionCount++;
}

/**
 * Настраивает обработчики событий для элементов управления
 */
function setupEventListenersMode2() {
  const nextButton = document.getElementById('mode2-next-btn');

  // Обработчик кнопки "Следующий вопрос"
  if (nextButton) {
    nextButton.addEventListener('click', handleNextQuestionMode2);
  }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    displayQuestionMode2,
    checkMode2Answer,
    updateScoreMode2,
    updateProgressMode2,
    setupEventListenersMode2
  };
}