/**
 * Ser vs Estar Trainer - Mode 2: Game Logic
 *
 * Основная игровая логика для режима спряжения.
 */

// ============================================
// GAME LOGIC
// ============================================

/**
 * Генерация вопросов для спряжения
 * @returns {Array} Массив вопросов для игры
 */
function generateSerEstarConjugationQuestions() {
    const questions = [];
    const verbs = ['ser', 'estar'];

    // Генерируем вопросы для каждого глагола
    verbs.forEach(verb => {
        SER_ESTAR_MODE2_TENSES.forEach(tense => {
            // Выбираем 3 случайных лица для каждого времени
            const shuffledPersons = shuffleSerEstarArray([...SER_ESTAR_MODE2_PERSONS]).slice(0, 3);

            shuffledPersons.forEach(person => {
                const conjugations = verb === 'ser' ? SER_CONJUGATIONS[tense.key] : ESTAR_CONJUGATIONS[tense.key];
                const correctAnswer = conjugations[person.key];

                // Генерируем 5 вариантов ответа
                const options = generateSerEstarOptions(correctAnswer, verb, tense.key);

                questions.push({
                    verb: verb,
                    tense: tense.key,
                    tenseLabel: tense.label,
                    person: person.key,
                    personLabel: person.label,
                    correct: correctAnswer,
                    options: options,
                    questionText: `Conjuga '${verb}' en ${tense.label} para '${person.label}'`
                });
            });
        });
    });

    return shuffleSerEstarArray(questions);
}

// ============================================
// EXPORTS
// ============================================

if (typeof window !== 'undefined') {
    window.generateSerEstarConjugationQuestions = generateSerEstarConjugationQuestions;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSerEstarConjugationQuestions
    };
}