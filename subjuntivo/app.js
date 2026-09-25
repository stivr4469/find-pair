/* subjuntivo/app.js v=1 */

(function () {
  var root = document.getElementById('sj-content');
  var _nj  = null;

  var state = {
    currentView: 'list',
    currentTopicIndex: 0,
    quizMode: 'single',      // 'single' | 'all'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
    streak: 0,
  };

  function _syncBackBtn() {
    var btn = document.getElementById('btn-back-to-list');
    if (btn) btn.style.display = (state.currentView !== 'list') ? '' : 'none';
  }

  /* ── Переходы ── */
  function showList() {
    state.currentView = 'list';
    _syncBackBtn();
    resetTopbar();
    root.innerHTML = SubjuntivoUI.renderList();
    if (_nj) _nj.reset();
  }

  function showCard(idx) {
    state.currentTopicIndex = idx;
    state.currentView = 'card';
    _syncBackBtn();
    root.innerHTML = SubjuntivoUI.renderCard(idx);
  }

  function startQuiz(idx) {
    var questions;
    if (idx === -1) {
      // Все темы: по 3 вопроса из каждой
      questions = [];
      SUBJUNTIVO_DATA.forEach(function (t) {
        questions = questions.concat(shuffleArray(t.questions).slice(0, 3));
      });
      questions = shuffleArray(questions);
      state.quizMode = 'all';
    } else {
      state.currentTopicIndex = idx;
      questions = shuffleArray(SUBJUNTIVO_DATA[idx].questions);
      state.quizMode = 'single';
    }
    state.quizQuestions = questions;
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.totalAnswered = 0;
    state.isAnswered = false;
    state.streak = 0;
    state.currentView = 'quiz';
    _syncBackBtn();
    resetTopbar();
    _renderQuestion();
  }

  function _renderQuestion() {
    var q   = state.quizQuestions[state.currentQuestionIndex];
    var num = state.currentQuestionIndex + 1;
    var tot = state.quizQuestions.length;
    setTopbarProgress(Math.round((state.currentQuestionIndex / tot) * 100));
    root.innerHTML = SubjuntivoUI.renderQuiz(q, num, tot);
    window.scrollTo(0, 0);
  }

  /* ── Ответ ── */
  function handleAnswer(optionIndex) {
    if (state.isAnswered) return;
    state.isAnswered = true;

    var q = state.quizQuestions[state.currentQuestionIndex];
    var isCorrect = (optionIndex === q.correct);

    if (q.type === 'fill') {
      _revealFill(optionIndex, q, isCorrect);
    } else {
      _revealMCQ(optionIndex, q, isCorrect);
    }

    if (isCorrect) {
      state.score++;
      state.streak++;
      setTopbarStreak(state.streak);
      setTopbarScore(state.score);
      if (_nj) _nj.correct(state.streak);
    } else {
      state.streak = 0;
      setTopbarStreak(0);
      if (_nj) _nj.wrong('', q.hint ? q.hint.split('\n')[0] : '');
    }
    state.totalAnswered++;

    var hintEl = document.getElementById('sj-hint');
    if (hintEl && q.hint) {
      hintEl.textContent = q.hint;
      hintEl.hidden = false;
    }
    var nextBtn = document.getElementById('sj-next');
    if (nextBtn) nextBtn.hidden = false;

    if (typeof VamoS !== 'undefined' && VamoS.save) {
      VamoS.save('subjuntivo', Math.round((state.score / state.quizQuestions.length) * 100));
    }
  }

  function _revealMCQ(selected, q, isCorrect) {
    document.querySelectorAll('.sj-option').forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.correct) {
        btn.classList.add('correct');
        if (typeof replayAnimation === 'function') replayAnimation(btn, 'anim-correct');
      } else if (i === selected && !isCorrect) {
        btn.classList.add('wrong');
        if (typeof replayAnimation === 'function') replayAnimation(btn, 'anim-wrong');
      }
    });
  }

  function _revealFill(selected, q, isCorrect) {
    document.querySelectorAll('.sj-tile').forEach(function (tile, i) {
      tile.disabled = true;
      if (i === q.correct) {
        tile.classList.add('correct');
        if (isCorrect && typeof replayAnimation === 'function') replayAnimation(tile, 'anim-correct');
      } else if (i === selected && !isCorrect) {
        tile.classList.add('wrong');
        if (typeof replayAnimation === 'function') replayAnimation(tile, 'anim-wrong');
      }
    });
    var blankEl = document.getElementById('sj-blank');
    if (blankEl) {
      blankEl.textContent = q.tiles[q.correct];
      blankEl.style.borderBottomColor = isCorrect ? '#22c55e' : '#ef4444';
      blankEl.style.color             = isCorrect ? '#22c55e' : '#ef4444';
    }
  }

  function next() {
    state.isAnswered = false;
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex >= state.quizQuestions.length) {
      _showResults();
    } else {
      _renderQuestion();
    }
  }

  function _showResults() {
    state.currentView = 'results';
    _syncBackBtn();
    var pct = Math.round((state.score / state.quizQuestions.length) * 100);
    setTopbarProgress(100);
    root.innerHTML = SubjuntivoUI.renderResults(
      state.score, state.quizQuestions.length, pct,
      state.currentTopicIndex, state.quizMode
    );
    if (_nj) _nj.result(pct);
    if (typeof VamoS !== 'undefined' && VamoS.save) {
      VamoS.save('subjuntivo', pct);
    }
  }

  function backToList()  { showList(); }
  function backToCard()  { showCard(state.currentTopicIndex); }
  function showPrev()    { showCard((state.currentTopicIndex - 1 + SUBJUNTIVO_DATA.length) % SUBJUNTIVO_DATA.length); }
  function showNext()    { showCard((state.currentTopicIndex + 1) % SUBJUNTIVO_DATA.length); }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var buddy = document.getElementById('buddy');
    if (buddy && typeof Naranjito !== 'undefined') {
      _nj = Naranjito.mount(buddy);
      _nj.greet();
    }
    showList();
  });

  /* ── Public ── */
  window.SubjuntivoApp = {
    state: state, showList: showList, showCard: showCard,
    startQuiz: startQuiz, handleAnswer: handleAnswer, next: next,
    backToList: backToList, backToCard: backToCard,
    showPrev: showPrev, showNext: showNext,
  };

  /* ── Window aliases ── */
  window.subjuntivoShowCard     = function (i) { showCard(i); };
  window.subjuntivoStartQuiz    = function (i) { startQuiz(i); };
  window.subjuntivoHandleAnswer = function (i) { handleAnswer(i); };
  window.subjuntivoSelectTile   = function (i) { handleAnswer(i); };
  window.subjuntivoNext         = function ()  { next(); };
  window.subjuntivoBackToList   = function ()  { backToList(); };
  window.subjuntivoBackToCard   = function ()  { backToCard(); };
  window.subjuntivoShowPrev     = function ()  { showPrev(); };
  window.subjuntivoShowNext     = function ()  { showNext(); };
  window.subjuntivoStartAll     = function ()  { startQuiz(-1); };
})();
