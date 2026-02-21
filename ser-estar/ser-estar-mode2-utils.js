/**
 * Ser vs Estar Trainer - Mode 2: Utility Functions
 *
 * Вспомогательные функции для режима спряжения.
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Перемешивание массива (Fisher-Yates)
 * @param {Array} array - массив для перемешивания
 * @returns {Array} Перемешанный массив
 */
function shuffleSerEstarArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Случайный выбор элемента из массива
 * @param {Array} array - массив для выбора
 * @returns {*} Случайный элемент
 */
function getRandomElementSerEstar(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Генерирует 5 вариантов ответа для множественного выбора
 * @param {string} correctAnswer - правильный ответ
 * @param {string} verb - глагол (ser/estar)
 * @param {string} tense - время
 * @returns {Array<string>} Массив из 5 вариантов ответа
 */
function generateSerEstarOptions(correctAnswer, verb, tense) {
    const options = new Set();
    options.add(correctAnswer);

    // Получаем все возможные спряжения для этого глагола и времени
    const conjugations = verb === 'ser' ? SER_CONJUGATIONS : ESTAR_CONJUGATIONS;
    const allConjugations = conjugations[tense];
    const allValues = Object.values(allConjugations);

    // Добавляем неправильные варианты из того же глагола и времени
    allValues.forEach(value => {
        if (value !== correctAnswer && options.size < 5) {
            options.add(value);
        }
    });

    // Если нужно больше вариантов, берём из других времён того же глагола
    if (options.size < 5) {
        SER_ESTAR_MODE2_TENSES.forEach(t => {
            if (t.key !== tense && options.size < 5) {
                const otherConjugations = conjugations[t.key];
                Object.values(otherConjugations).forEach(value => {
                    if (value !== correctAnswer && options.size < 5) {
                        options.add(value);
                    }
                });
            }
        });
    }

    // Если всё ещё мало, берём из другого глагола
    if (options.size < 5) {
        const otherVerb = verb === 'ser' ? 'estar' : 'ser';
        const otherVerbConjugations = otherVerb === 'ser' ? SER_CONJUGATIONS : ESTAR_CONJUGATIONS;

        SER_ESTAR_MODE2_TENSES.forEach(t => {
            if (options.size < 5) {
                const otherTenseConjugations = otherVerbConjugations[t.key];
                Object.values(otherTenseConjugations).forEach(value => {
                    if (value !== correctAnswer && options.size < 5) {
                        options.add(value);
                    }
                });
            }
        });
    }

    // Преобразуем Set в массив и перемешиваем
    const optionsArray = shuffleSerEstarArray(Array.from(options));
    return optionsArray;
}

// ============================================
// EXPORTS
// ============================================

if (typeof window !== 'undefined') {
    window.shuffleSerEstarArray = shuffleSerEstarArray;
    window.getRandomElementSerEstar = getRandomElementSerEstar;
    window.generateSerEstarOptions = generateSerEstarOptions;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        shuffleSerEstarArray,
        getRandomElementSerEstar,
        generateSerEstarOptions
    };
}