/**
 * Tren Ir/Venir - Mode 2: Game Logic
 *
 * Основная игровая логика режима спряжения.
 *
 * Функции:
 * - generateQuestionMode2() - генерирует вопрос
 * - checkAnswerMode2(userAnswer, correct) - проверяет ответ
 *
 * Данные:
 * - VERBS_MODE2, TENSES_MODE2, PERSONS_MODE2 - списки для генерации
 * - PERSON_DISPLAY_MODE2, TENSE_DISPLAY_MODE2 - отображение
 */

// Списки для генерации вопросов
const VERBS_MODE2 = ['ir', 'venir', 'llegar'];
const TENSES_MODE2 = ['presente', 'indefinido', 'imperfecto', 'futuro'];
const PERSONS_MODE2 = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];

// Отображение лиц для вопросов (более читаемый формат)
const PERSON_DISPLAY_MODE2 = {
  'yo': 'yo',
  'tu': 'tú',
  'el/ella': 'él/ella',
  'nosotros': 'nosotros',
  'vosotros': 'vosotros',
  'ellos': 'ellos/ellas'
};

// Отображение времён для вопросов
const TENSE_DISPLAY_MODE2 = {
  'presente': 'presente',
  'indefinido': 'indefinido',
  'imperfecto': 'imperfecto',
  'futuro': 'futuro'
};

/**
 * Генерирует случайный элемент из массива
 * @param {Array} array - массив для выбора
 * @returns {*} Случайный элемент массива
 */
function getRandomElementMode2(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Генерирует новый вопрос для спряжения
 * @returns {Object} Объект вопроса с полями:
 *   - verb: глагол (ir, venir, llegar)
 *   - tense: время (presente, indefinido, imperfecto, futuro)
 *   - person: лицо (yo, tu, el/ella, nosotros, vosotros, ellos)
 *   - questionText: текст вопроса для отображения
 *   - correctAnswer: правильный ответ
 */
function generateQuestionMode2() {
  // Случайный выбор глагола, времени и лица
  const verb = getRandomElementMode2(VERBS_MODE2);
  const tense = getRandomElementMode2(TENSES_MODE2);
  const person = getRandomElementMode2(PERSONS_MODE2);

  // Получаем правильный ответ из таблицы спряжений
  const correctAnswer = CONJUGATIONS[verb][tense][person];

  // Формируем текст вопроса на испанском
  const questionText = `Conjuga '${verb}' en ${TENSE_DISPLAY_MODE2[tense]} para '${PERSON_DISPLAY_MODE2[person]}'`;

  // Создаём объект вопроса
  const question = {
    verb: verb,
    tense: tense,
    person: person,
    questionText: questionText,
    correctAnswer: correctAnswer
  };

  // Сохраняем текущий вопрос в состоянии
  mode2State.currentQuestion = question;
  mode2State.isAnswered = false;

  return question;
}

/**
 * Проверяет ответ пользователя
 * @param {string} userAnswer - ответ, введённый пользователем
 * @param {string} correct - правильный ответ
 * @returns {Object} Результат проверки:
 *   - isCorrect: true/false
 *   - message: сообщение обратной связи
 */
function checkAnswerMode2(userAnswer, correct) {
  // Функция нормализации: убирает пробелы, приводит к нижнему регистру, унифицирует Unicode
  const normalize = (str) => str.trim().normalize('NFC').toLowerCase();
  
  // Нормализуем ответы
  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correct);

  // Сравниваем
  const isCorrect = normalizedUser === normalizedCorrect;

  // Обновляем счёт
  if (isCorrect) {
    mode2State.score++;
  }

  // Увеличиваем счётчик вопросов
  mode2State.questionCount++;
  mode2State.isAnswered = true;

  // Возвращаем результат
  return {
    isCorrect: isCorrect,
    message: isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta correcta es: "${correct}"`
  };
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateQuestionMode2,
    checkAnswerMode2,
    getRandomElementMode2,
    VERBS_MODE2,
    TENSES_MODE2,
    PERSONS_MODE2,
    PERSON_DISPLAY_MODE2,
    TENSE_DISPLAY_MODE2
  };
}