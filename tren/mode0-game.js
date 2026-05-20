/**
 * Tren Ir/Venir - Mode 0: Game Logic
 *
 * Основная игровая логика режима спряжения.
 *
 * Функции:
 * - generateQuestionMode0() - генерирует вопрос
 * - checkAnswerMode0(userAnswer, correct) - проверяет ответ
 *
 * Данные:
 * - VERBS_MODE0, TENSES_MODE0, PERSONS_MODE0 - списки для генерации
 * - PERSON_DISPLAY_MODE0, TENSE_DISPLAY_MODE0 - отображение
 */

// Списки для генерации вопросов
const VERBS_MODE0 = ['ir', 'venir', 'llegar'];
const TENSES_MODE0 = ['presente'];
const PERSONS_MODE0 = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];

// Отображение лиц для вопросов (более читаемый формат)
const PERSON_DISPLAY_MODE0 = {
  'yo': 'yo',
  'tu': 'tú',
  'el/ella': 'él/ella',
  'nosotros': 'nosotros',
  'vosotros': 'vosotros',
  'ellos': 'ellos/ellas'
};

// Отображение времён для вопросов
const TENSE_DISPLAY_MODE0 = {
  'presente': 'presente'
};

/**
 * Генерирует случайный элемент из массива
 * @param {Array} array - массив для выбора
 * @returns {*} Случайный элемент массива
 */
function getRandomElementMode0(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Запускает игру mode0 с выбранным глаголом
 * @param {string} verb - выбранный глагол (ir, venir, llegar)
 */
function startMode0(verb) {
  // Сохраняем выбранный глагол
  mode0State.selectedVerb = verb;
  mode0State.questionCount = 0;
  mode0State.score = 0;
  mode0State.isAnswered = false;

  // Обновляем счёт
  updateScoreMode0();

  // Генерируем и показываем первый вопрос
  const question = generateQuestionMode0();
  displayQuestionMode0(question);
}

// Экспорт функции
if (typeof window !== 'undefined') {
  window.startMode0 = startMode0;
}

/**
 * Генерирует новый вопрос для спряжения
 * @returns {Object} Объект вопроса с полями:
 *   - verb: глагол (ir, venir, llegar)
 *   - tense: время (presente)
 *   - person: лицо (yo, tu, el/ella, nosotros, vosotros, ellos)
 *   - questionText: текст вопроса для отображения
 *   - correctAnswer: правильный ответ
 */
function generateQuestionMode0() {
  // Для mode0 используем выбранный глагол или случайный
  const verb = mode0State.selectedVerb || getRandomElementMode0(VERBS_MODE0);
  // Для mode0 используем только presente
  const tense = 'presente';
  // Для mode0 используем последовательный перебор лиц
  const personIndex = mode0State.questionCount % 6;
  const person = PERSONS_MODE0[personIndex];

  // Получаем правильный ответ из таблицы спряжений
  const correctAnswer = CONJUGATIONS[verb][tense][person];

  // Формируем текст вопроса на испанском
  const questionText = `Conjuga '${verb}' en ${TENSE_DISPLAY_MODE0[tense]} para '${PERSON_DISPLAY_MODE0[person]}'`;

  // Создаём объект вопроса
  const question = {
    verb: verb,
    tense: tense,
    person: person,
    questionText: questionText,
    correctAnswer: correctAnswer
  };

  // Сохраняем текущий вопрос в состоянии
  mode0State.currentQuestion = question;
  mode0State.isAnswered = false;

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
function checkAnswerMode0(userAnswer, correct) {
  // Функция нормализации: убирает пробелы, приводит к нижнему регистру, унифицирует Unicode
  const normalize = (str) => str.trim().normalize('NFC').toLowerCase();

  // Нормализуем ответы
  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correct);

  // Сравниваем
  const isCorrect = normalizedUser === normalizedCorrect;

  // Обновляем счёт
  if (isCorrect) {
    mode0State.score++;
  }

  // Увеличиваем счётчик вопросов
  mode0State.questionCount++;
  mode0State.isAnswered = true;

  // Возвращаем результат
  return {
    isCorrect: isCorrect,
    message: isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta correcta es: "${correct}"`
  };
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateQuestionMode0,
    checkAnswerMode0,
    getRandomElementMode0,
    VERBS_MODE0,
    TENSES_MODE0,
    PERSONS_MODE0,
    PERSON_DISPLAY_MODE0,
    TENSE_DISPLAY_MODE0
  };
}
