// spanish-trainer-app/tren/mode2.js (НОВАЯ ВЕРСИЯ)

let advancedModeState_tren = {
    score: 0,
    questionCount: 0,
    maxQuestions: 10,
    isAnswered: false,
    settings: {
        verbs: ['ir', 'venir', 'llegar'],
        tenses: ['presente', 'indefinido', 'imperfecto', 'futuro']
    }
};

function initMode2() {
    advancedModeState_tren.questionCount = 0;
    advancedModeState_tren.score = 0;
    advancedModeState_tren.isAnswered = false;
    displayAdvancedSettings_tren();
}

function startAdvancedPractice_tren() {
    const selectedVerbs = Array.from(document.querySelectorAll('#verbs-settings-tren input:checked')).map(cb => cb.value);
    const selectedTenses = Array.from(document.querySelectorAll('#tenses-settings-tren input:checked')).map(cb => cb.value);

    if (selectedVerbs.length === 0 || selectedTenses.length === 0) {
        alert('Выберите хотя бы один глагол и одно время для тренировки.');
        return;
    }

    advancedModeState_tren.settings.verbs = selectedVerbs;
    advancedModeState_tren.settings.tenses = selectedTenses;

    advancedModeState_tren.questionCount = 0;
    advancedModeState_tren.score = 0;
    advancedModeState_tren.isAnswered = false;

    updateAdvancedScore_tren();
    generateAndShowAdvancedQuestion_tren();
}

function generateAndShowAdvancedQuestion_tren() {
    if (advancedModeState_tren.questionCount >= advancedModeState_tren.maxQuestions) {
        showAdvancedResults_tren();
        return;
    }

    const verb = advancedModeState_tren.settings.verbs[Math.floor(Math.random() * advancedModeState_tren.settings.verbs.length)];
    const tense = advancedModeState_tren.settings.tenses[Math.floor(Math.random() * advancedModeState_tren.settings.tenses.length)];
    const persons = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];
    const person = persons[Math.floor(Math.random() * persons.length)];
    const correctAnswer = CONJUGATIONS[verb][tense][person];
    const question = { verb, tense, person, correctAnswer, questionText: `Conjuga '${verb}' en ${tense} para '${person}'` };

    const options = new Set([correctAnswer]);
    while (options.size < 5) {
        const randomVerb = CONJUGATIONS[Object.keys(CONJUGATIONS)[Math.floor(Math.random() * Object.keys(CONJUGATIONS).length)]];
        const randomTense = randomVerb[Object.keys(randomVerb)[Math.floor(Math.random() * Object.keys(randomVerb).length)]];
        const randomForm = randomTense[Object.keys(randomTense)[Math.floor(Math.random() * Object.keys(randomTense).length)]];
        options.add(randomForm);
    }

    displayAdvancedQuestion_tren(question, shuffleArray(Array.from(options)));
}

function checkAdvancedAnswer_tren(selected, correct, buttonElement) {
    advancedModeState_tren.isAnswered = true;
    const allButtons = document.querySelectorAll('#mode2-options .option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    const feedback = document.getElementById('mode2-feedback');
    const isCorrect = selected.toLowerCase() === correct.toLowerCase();

    if (isCorrect) {
        feedback.textContent = '✅ ¡Correcto!';
        feedback.className = 'feedback correct';
        buttonElement.classList.add('correct');
        advancedModeState_tren.score++;
        updateAdvancedScore_tren();
    } else {
        feedback.textContent = `❌ Incorrecto. Правильно: ${correct}`;
        feedback.className = 'feedback incorrect';
        buttonElement.classList.add('incorrect');
        allButtons.forEach(btn => {
            if (btn.dataset.answer.toLowerCase() === correct.toLowerCase()) {
                btn.classList.add('correct');
            }
        });
    }
    document.getElementById('mode2-next-btn').style.display = 'inline-block';
}

function handleNextAdvancedQuestion_tren() {
    advancedModeState_tren.questionCount++;
    advancedModeState_tren.isAnswered = false;
    generateAndShowAdvancedQuestion_tren();
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.initMode2 = initMode2;
    window.startAdvancedPractice_tren = startAdvancedPractice_tren;
    window.generateAndShowAdvancedQuestion_tren = generateAndShowAdvancedQuestion_tren;
    window.checkAdvancedAnswer_tren = checkAdvancedAnswer_tren;
    window.handleNextAdvancedQuestion_tren = handleNextAdvancedQuestion_tren;
}
