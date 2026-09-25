/**
 * Ser vs Estar — спряжение в предложении (общий UI для Базового и Продвинутого режимов).
 * Вопрос: предложение с пропуском ___ из CONJ_SENTENCES и фишки-формы, как в режиме «Контекст».
 * Разметку предложения берёт из ser-estar-context-ui.js (_ctxParseSentence, _ctxEsc).
 */

var SE_PERSONS = ['yo', 'tu', 'el/ella', 'nosotros', 'vosotros', 'ellos'];
var SE_TENSES  = ['presente', 'indefinido', 'imperfecto', 'futuro'];
var SE_CONJ_OPTION_COUNT = 4;
var SE_PERSON_LABELS = {
    'yo': 'yo', 'tu': 'tú', 'el/ella': 'él/ella',
    'nosotros': 'nosotros', 'vosotros': 'vosotros', 'ellos': 'ellos/ellas'
};

/**
 * Предложение для комбинации. index — детерминированный выбор (Базовый режим),
 * без index — случайное, по возможности не из usedTexts.
 */
function seConjSentence(verb, tense, person, index, usedTexts) {
    var list = CONJ_SENTENCES[verb][tense][person];
    if (typeof index === 'number') return list[index % list.length];
    var fresh = usedTexts ? list.filter(function(s) { return !usedTexts.has(s.text); }) : list;
    var pool = fresh.length ? fresh : list;
    return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Варианты: правильная форма, та же форма в другом времени (ловушка по времени)
 * и формы других лиц того же времени (ловушка по лицу).
 */
function seConjOptions(verb, tense, person) {
    var table = CONJUGATIONS[verb];
    var correct = table[tense][person];
    var otherTense = shuffleArray(SE_TENSES.filter(function(t) { return t !== tense; }))
        .map(function(t) { return table[t][person]; });
    var otherPerson = shuffleArray(SE_PERSONS).map(function(p) { return table[tense][p]; });

    var picked = [correct];
    function add(form) {
        if (picked.length < SE_CONJ_OPTION_COUNT && picked.indexOf(form) === -1) picked.push(form);
    }
    add(otherTense[0]);
    otherPerson.forEach(add);
    otherTense.forEach(add);
    return shuffleArray(picked);
}

/**
 * Рисует вопрос.
 * @param {HTMLElement} area
 * @param {{num:number, total:number, verb:string, tense:string, person:string,
 *          sentence:{text:string, ru:string}, options:string[], headerHtml?:string}} q
 * @param {function(string, HTMLElement)} onAnswer
 */
function seRenderConjQuestion(area, q, onAnswer) {
    var parts = _ctxParseSentence(q.sentence.text);
    var sentenceHtml = _ctxEsc(parts.before) + ' <span class="ctx-blank">___</span>'
        + (parts.after ? ' ' + _ctxEsc(parts.after) : '');
    var tilesHtml = q.options.map(function(opt) {
        return '<button class="ctx-tile option-btn" data-answer="' + _ctxEsc(opt) + '">' + _ctxEsc(opt) + '</button>';
    }).join('');

    area.innerHTML = '<div class="ctx-question-card conj-card view-enter">'
        + (q.headerHtml || '')
        + '<div class="ctx-progress-label">Вопрос ' + q.num + ' из ' + q.total
        + ' &middot; ' + _ctxEsc(q.verb) + ' &middot; ' + _ctxEsc(q.tense) + '</div>'
        + '<div class="ctx-question-text ctx-sentence">' + sentenceHtml + '</div>'
        + '<div class="ctx-translation">' + _ctxEsc(q.sentence.ru) + '</div>'
        + '<div class="ctx-tiles stagger">' + tilesHtml + '</div>'
        + '<div class="feedback"></div>'
        + '<button class="next-button quiz-next-fixed" hidden>Дальше →</button>'
        + '</div>';

    area.querySelectorAll('.ctx-tile').forEach(function(btn) {
        btn.addEventListener('click', function() { onAnswer(btn.dataset.answer, btn); });
    });
}

/**
 * Показывает результат: форма встаёт в пропуск, фишки подсвечиваются, появляется «Дальше».
 * @returns {boolean} верен ли ответ
 */
function seRevealConjAnswer(area, selected, btn, q, onNext) {
    var correct = CONJUGATIONS[q.verb][q.tense][q.person];
    var isCorrect = selected === correct;
    var tiles = area.querySelectorAll('.ctx-tile');
    tiles.forEach(function(t) { t.disabled = true; });

    var blank = area.querySelector('.ctx-blank');
    blank.textContent = correct;
    blank.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
    replayAnimation(blank, 'anim-correct');

    btn.classList.add(isCorrect ? 'correct' : 'incorrect');
    replayAnimation(btn, isCorrect ? 'anim-correct' : 'anim-wrong');
    if (!isCorrect) {
        tiles.forEach(function(t) { if (t.dataset.answer === correct) t.classList.add('correct'); });
    }

    var feedback = area.querySelector('.feedback');
    feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'wrong');
    feedback.innerHTML = isCorrect
        ? '<strong>¡Correcto!</strong>'
        : '<strong>Правильно: ' + _ctxEsc(correct) + '</strong>'
          + '<div class="conj-hint">' + _ctxEsc(SE_PERSON_LABELS[q.person]) + ' · ' + _ctxEsc(q.verb)
          + ' · ' + _ctxEsc(q.tense) + '</div>';

    var next = area.querySelector('.next-button');
    next.hidden = false;
    next.onclick = onNext;
    return isCorrect;
}

if (typeof window !== 'undefined') {
    window.seConjSentence = seConjSentence;
    window.seConjOptions = seConjOptions;
    window.seRenderConjQuestion = seRenderConjQuestion;
    window.seRevealConjAnswer = seRevealConjAnswer;
}
