/**
 * Tren Ir/Venir - Mode 2: Option Generation
 *
 * Генерация вариантов ответов для режима спряжения.
 *
 * Функции:
 * - generateMode2Options(correct, verb, tense, person) - создаёт 5 вариантов ответа
 *
 * КРИТИЧНО: Правильный ответ ВСЕГДА должен быть среди вариантов!
 */

/**
 * Генерирует 5 вариантов ответа для вопроса
 * @param {string} correct - правильный ответ
 * @param {string} verb - глагол (ir/venir/llegar)
 * @param {string} tense - время (presente/indefinido/imperfecto/futuro)
 * @param {string} person - лицо (yo/tu/el/ella/nosotros/vosotros/ellos)
 * @returns {Array<string>} Массив из 5 вариантов
 */
function generateMode2Options(correct, verb, tense, person) {
  // Получаем CONJUGATIONS из глобальной области (для браузера) или импортируем (для Node.js)
  const conjugations = typeof CONJUGATIONS !== 'undefined' ? CONJUGATIONS : require('./data.js').CONJUGATIONS;

  // 1. Сначала собираем ВСЕ возможные варианты в Set (для уникальности)
  const allOptions = new Set();

  // 2. Обязательно добавляем правильный ответ ПЕРВЫМ
  allOptions.add(correct);

  // 3. Другие глаголы в том же времени и лице
  ['ir', 'venir', 'llegar']
    .filter(v => v !== verb)
    .forEach(v => {
      if (conjugations[v]?.[tense]?.[person]) {
        allOptions.add(conjugations[v][tense][person]);
      }
    });

  // 4. Другие времена того же глагола и лица
  ['presente', 'indefinido', 'imperfecto', 'futuro']
    .filter(t => t !== tense)
    .forEach(t => {
      if (conjugations[verb]?.[t]?.[person]) {
        allOptions.add(conjugations[verb][t][person]);
      }
    });

  // 5. Если мало — другие лица того же времени
  if (allOptions.size < 5) {
    ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos']
      .filter(p => p !== person)
      .forEach(p => {
        if (conjugations[verb]?.[tense]?.[p]) {
          allOptions.add(conjugations[verb][tense][p]);
        }
      });
  }

  // 6. Перемешиваем ВСЕ варианты (алгоритм Фишера-Йетса)
  const optionsArray = Array.from(allOptions);
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }

  // 7. Берём первые 5 вариантов
  const result = optionsArray.slice(0, 5);

  // 8. КРИТИЧНО: Проверяем что правильный ответ есть в первых 5
  // Если правильного нет — заменяем последний на правильный
  if (!result.includes(correct)) {
    result[4] = correct;
  }

  return result;
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMode2Options };
}