/**
 * Tren Ir/Venir - Mode 0: Results & Game Flow
 *
 * Управление результатами и потоком игры.
 *
 * Функции:
 * - showMode0Results() - показывает результаты
 * - restartMode0() - перезапускает игру
 * - initMode0() - инициализирует режим 0
 * - handleNextQuestionMode0() - переход к следующему вопросу
 */

/**
 * Отображает результаты режима 0
 */
function showMode0Results() {
  const contentArea = document.getElementById('mode0-content');
  if (!contentArea) {
    console.error('Mode 0 content area not found');
    return;
  }

  // Вычисляем процент правильных ответов
  const percentage = Math.round((mode0State.score / mode0State.maxQuestions) * 100);

  // Определяем сообщение в зависимости от результата
  let message = '';
  let emoji = '';

  if (percentage === 100) {
    emoji = '🏆';
    message = '¡Excelente! ¡Perfecto!';
  } else if (percentage >= 80) {
    emoji = '🎉';
    message = '¡Muy bien! ¡Sigue así!';
  } else if (percentage >= 60) {
    emoji = '👍';
    message = '¡Bien! Pero puedes mejorar.';
  } else if (percentage >= 40) {
    emoji = '📚';
    message = 'Necesitas practicar más.';
  } else {
    emoji = '💪';
    message = '¡No te rindes! Sigue practicando.';
  }

  // Отображаем результаты
  contentArea.innerHTML = `
    <div class="results-container">
      <h3>🏁 Результаты режима "Базовое спряжение (A1)"</h3>
      <div class="final-score">
        <span class="score-number">${mode0State.score}</span>
        <span class="score-total">из ${mode0State.maxQuestions}</span>
      </div>
      <div class="score-percentage">${percentage}%</div>
      <div class="final-message">
        <span class="result-emoji">${emoji}</span>
        <span class="result-text">${message}</span>
      </div>
      <div class="results-actions">
        <button onclick="restartMode0()" class="restart-button">
          🔄 Ещё раз
        </button>
        <button onclick="showMainMenu()" class="menu-button">
          📋 Меню
        </button>
      </div>
    </div>
  `;
}

/**
 * Перезапускает режим 0
 */
function restartMode0() {
  // Сбрасываем состояние
  mode0State = {
    score: 0,
    questionCount: 0,
    maxQuestions: 10,
    currentQuestion: null,
    isAnswered: false,
    selectedVerb: null
  };

  // Обновляем отображение счёта
  updateScoreMode0();

  // Показываем выбор глагола
  displayVerbSelectionMode0();
}

/**
 * Обработчик перехода к следующему вопросу
 */
function handleNextQuestionMode0() {
  // Проверяем, завершена ли игра
  if (mode0State.questionCount >= mode0State.maxQuestions) {
    showMode0Results();
    return;
  }

  // Генерируем новый вопрос
  const newQuestion = generateQuestionMode0();

  // Отображаем вопрос
  displayQuestionMode0(newQuestion);
}

/**
 * Инициализирует режим 0 (базовое спряжение A1)
 */
function initMode0() {
  // Скрываем все игровые зоны
  document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));

  // Показываем зону режима 0
  const mode0Area = document.getElementById('mode0-area');
  if (mode0Area) {
    mode0Area.classList.remove('hidden');
  }

  // Сбрасываем состояние
  mode0State = {
    score: 0,
    questionCount: 0,
    maxQuestions: 10,
    currentQuestion: null,
    isAnswered: false,
    selectedVerb: null
  };

  // Обновляем отображение счёта
  updateScoreMode0();

  // Сбрасываем индикатор прогресса
  const progressValue = document.getElementById('progress-value');
  if (progressValue) {
    progressValue.textContent = '0%';
  }

  // Показываем выбор глагола
  displayVerbSelectionMode0();
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showMode0Results,
    restartMode0,
    handleNextQuestionMode0,
    initMode0
  };
}
