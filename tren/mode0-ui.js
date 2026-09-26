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
  if (scoreValue) scoreValue.textContent = mode0State.score;
  if (typeof setTopbarProgress === 'function' && mode0State.maxQuestions > 0) {
    setTopbarProgress(Math.round((mode0State.questionCount / mode0State.maxQuestions) * 100));
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
    <div class="verb-selection-container view-enter"> <h3>Выберите глагол для спряжения:</h3> <div class="verb-buttons"> <button class="verb-btn" onclick="startMode0('ir')">ir</button> <button class="verb-btn" onclick="startMode0('venir')">venir</button> <button class="verb-btn" onclick="startMode0('llegar')">llegar</button> </div> </div> `;
}

/**
 * Отображает вопрос в игровой зоне (fill-blank формат с тайлами)
 * @param {Object} question - объект вопроса из generateQuestionMode0()
 */
function displayQuestionMode0(question) {
  const contentArea = document.getElementById('mode0-content');
  if (!contentArea) return;

  const options = generateMode0Options(question.correctAnswer, question.verb, question.tense, question.person);
  const parts = (question.sentence || '___').split('___');
  const before = parts[0] || '';
  const after  = parts[1] || '';

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  const sentHtml = esc(before) +
    '<span id="mode0-blank" class="m6-blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
    esc(after);

  const tilesHtml = options.map(function(opt, i) {
    return '<button class="inline-option" onclick="checkMode0Answer(' + i + ')">' + esc(opt) + '</button>';
  }).join('');

  contentArea.innerHTML =
    '<div class="question-container view-enter" style="padding-bottom:80px">' +
      '<div class="question-number">Вопрос ' + (mode0State.questionCount + 1) + ' из ' + mode0State.maxQuestions + '</div>' +
      '<div class="question-text" style="font-size:1.05rem;font-weight:600;line-height:1.7">' + sentHtml + '</div>' +
      '<div id="mode0-options" class="m6-tiles stagger">' + tilesHtml + '</div>' +
      '<div id="mode0-feedback" class="feedback"></div>' +
      '<button id="mode0-next-btn" class="next-button quiz-next-fixed" style="display:none">Дальше →</button>' +
    '</div>';

  // Сохраняем текущие опции для checkMode0Answer
  contentArea._currentOptions = options;

  setupEventListenersMode0();
}

/**
 * Проверяет ответ при выборе тайла
 * @param {number} idx - индекс выбранного тайла
 */
function checkMode0Answer(idx) {
  if (mode0State.isAnswered) return;

  const contentArea = document.getElementById('mode0-content');
  const options = contentArea && contentArea._currentOptions;
  if (!options) return;

  const correct  = mode0State.currentQuestion && mode0State.currentQuestion.correctAnswer;
  const selected = options[idx];

  const allTiles = document.querySelectorAll('#mode0-options .inline-option');
  allTiles.forEach(function(t) { t.disabled = true; });

  const normalize = function(s) { return s.trim().normalize('NFC').toLowerCase(); };
  const isCorrect = normalize(selected) === normalize(correct);

  // Обновляем blank
  const blank = document.getElementById('mode0-blank');
  if (blank) {
    blank.textContent = correct;
    blank.style.color = isCorrect ? '#22c55e' : '#ef4444';
    blank.style.borderBottomColor = isCorrect ? '#22c55e' : '#ef4444';
    blank.style.fontWeight = '700';
    blank.style.fontStyle = 'normal';
  }

  // Подсвечиваем тайлы
  allTiles.forEach(function(t, i) {
    if (normalize(t.textContent) === normalize(correct)) {
      t.classList.add('correct');
    } else if (i === idx && !isCorrect) {
      t.classList.add('incorrect');
    }
  });

  // Naranjito
  if (isCorrect) {
    mode0State.score++;
    _njStreak++;
    window.njCorrect && window.njCorrect(_njStreak);
  } else {
    _njStreak = 0;
    window.njWrong && window.njWrong(null, null);
  }

  updateScoreMode0();

  var nextButton = document.getElementById('mode0-next-btn');
  if (nextButton) nextButton.style.display = '';

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
