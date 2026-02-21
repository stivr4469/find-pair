/**
 * Tren Ir/Venir - Mode 2: Results & Game Flow
 *
 * Управление результатами и потоком игры.
 *
 * Функции:
 * - showMode2Results() - показывает результаты
 * - restartMode2() - перезапускает игру
 * - initMode2() - инициализирует режим 2
 * - handleNextQuestionMode2() - переход к следующему вопросу
 */

/**
 * Отображает результаты режима 2
 */
function showMode2Results() {
  const contentArea = document.getElementById('mode2-content');
  if (!contentArea) {
    console.error('Mode 2 content area not found');
    return;
  }

  // Вычисляем процент правильных ответов
  const percentage = Math.round((mode2State.score / mode2State.maxQuestions) * 100);

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
      <h3>🏁 Результаты режима "Спряжение"</h3>
      <div class="final-score">
        <span class="score-number">${mode2State.score}</span>
        <span class="score-total">из ${mode2State.maxQuestions}</span>
      </div>
      <div class="score-percentage">${percentage}%</div>
      <div class="final-message">
        <span class="result-emoji">${emoji}</span>
        <span class="result-text">${message}</span>
      </div>
      <div class="results-actions">
        <button onclick="restartMode2()" class="restart-button">
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
 * Перезапускает режим 2
 */
function restartMode2() {
  // Сбрасываем состояние
  mode2State = {
    score: 0,
    questionCount: 0,
    maxQuestions: 10,
    currentQuestion: null,
    isAnswered: false
  };

  // Обновляем отображение счёта
  updateScoreMode2();

  // Генерируем первый вопрос
  const firstQuestion = generateQuestionMode2();

  // Отображаем вопрос
  displayQuestionMode2(firstQuestion);
}

/**
 * Обработчик перехода к следующему вопросу
 */
function handleNextQuestionMode2() {
  // Проверяем, завершена ли игра
  if (mode2State.questionCount >= mode2State.maxQuestions) {
    showMode2Results();
    return;
  }

  // Генерируем новый вопрос
  const newQuestion = generateQuestionMode2();

  // Отображаем вопрос
  displayQuestionMode2(newQuestion);
}

/**
 * Инициализирует режим 2 (спряжение)
 */
function initMode2() {
  // Скрываем все игровые зоны
  document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));

  // Показываем зону режима 2
  const mode2Area = document.getElementById('mode2');
  if (mode2Area) {
    mode2Area.classList.remove('hidden');
  }

  // Сбрасываем состояние
  mode2State = {
    score: 0,
    questionCount: 0,
    maxQuestions: 10,
    currentQuestion: null,
    isAnswered: false
  };

  // Обновляем отображение счёта
  updateScoreMode2();

  // Сбрасываем индикатор прогресса
  const progressValue = document.getElementById('progress-value');
  if (progressValue) {
    progressValue.textContent = '0%';
  }

  // Генерируем первый вопрос
  const firstQuestion = generateQuestionMode2();

  // Отображаем вопрос
  displayQuestionMode2(firstQuestion);
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showMode2Results,
    restartMode2,
    handleNextQuestionMode2,
    initMode2
  };
}