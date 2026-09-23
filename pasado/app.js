/**
 * Spanish Trainer — Прошедшее время
 * App Controller: state management and game logic
 */

const PasadoApp = {
  state: {
    currentView: 'list',           // 'list' | 'card' | 'quiz' | 'inline' | 'classify' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',            // 'single' | 'all' | 'inline' | 'classify'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
    streak: 0,

    // Cyclic queue for 'all' mode
    cyclicPool: [],                // remaining questions (wrong ones go back here)
    cyclicCorrectCount: 0,         // how many unique questions answered correctly
    cyclicTotal: 0,                // total unique questions (96)
  },

  _syncBackBtn: function() {
    var btn = document.getElementById('btn-back-to-list');
    if (btn) btn.style.display = (this.state.currentView === 'list') ? 'none' : 'inline-flex';
  },

  showList: function() {
    this.state.currentView = 'list';
    this._syncBackBtn();
    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.renderFormulaList();
    }
  },

  showCard: function(index) {
    var safeIndex = Math.max(0, Math.min(index, PASADO_DATA.length - 1));
    this.state.currentFormulaIndex = safeIndex;
    this.state.currentView = 'card';
    this._syncBackBtn();
    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.renderFormulaCard(PASADO_DATA[safeIndex], safeIndex);
    }
  },

  showNextCard: function() {
    var next = (this.state.currentFormulaIndex + 1) % PASADO_DATA.length;
    this.showCard(next);
  },

  showPrevCard: function() {
    var prev = (this.state.currentFormulaIndex - 1 + PASADO_DATA.length) % PASADO_DATA.length;
    this.showCard(prev);
  },

  startSingleQuiz: function(formulaIndex) {
    var formula = PASADO_DATA[formulaIndex];
    if (!formula) return;

    var pool = formula.quiz.map(function(q) {
      return Object.assign({}, q, {
        formulaId: formula.id,
        formulaName: formula.shortName,
        formulaEmoji: formula.emoji,
      });
    });
    var shuffled = (typeof shuffleArray === 'function') ? shuffleArray(pool) : pool;
    var questions = shuffled.slice(0, 3);

    this.state.currentFormulaIndex = formulaIndex;
    this.state.quizMode = 'single';
    this.state.quizQuestions = questions;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.totalAnswered = 0;
    this.state.isAnswered = false;
    this.state.streak = 0;
    this.state.currentView = 'quiz';
    this._syncBackBtn();

    this._renderCurrentQuestion();
  },

  // ─── All-quiz: cyclic queue ──────────────────────────────────────────────────
  // Wrong answers go back to the queue end. Ends when all 96 correct.
  startAllQuiz: function() {
    var allQuestions = [];
    PASADO_DATA.forEach(function(formula) {
      formula.quiz.forEach(function(q) {
        allQuestions.push(Object.assign({}, q, {
          formulaId: formula.id,
          formulaName: formula.shortName,
          formulaEmoji: formula.emoji,
        }));
      });
    });

    var shuffled = (typeof shuffleArray === 'function')
      ? shuffleArray(allQuestions)
      : allQuestions;

    this.state.quizMode = 'all';
    this.state.cyclicPool = shuffled.slice();       // mutable working queue
    this.state.cyclicTotal = shuffled.length;       // 96
    this.state.cyclicCorrectCount = 0;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.totalAnswered = 0;
    this.state.isAnswered = false;
    this.state.streak = 0;
    this.state.currentView = 'quiz';
    this._syncBackBtn();

    // Also keep quizQuestions pointing to cyclicPool for compatibility
    this.state.quizQuestions = this.state.cyclicPool;

    this._renderCurrentQuestionCyclic();
  },

  _renderCurrentQuestionCyclic: function() {
    if (typeof PasadoUI === 'undefined') return;
    var pool = this.state.cyclicPool;
    if (pool.length === 0) {
      this.showResults();
      return;
    }
    var question = pool[0];
    var progressLabel = '✓ ' + this.state.cyclicCorrectCount + ' / ' + this.state.cyclicTotal;
    PasadoUI.renderQuiz(
      question,
      question.formulaName,
      question.formulaEmoji,
      this.state.totalAnswered,
      this.state.cyclicTotal,
      this.state.score,
      progressLabel
    );
  },

  handleAnswerCyclic: function(selectedIndex) {
    if (this.state.isAnswered) return;
    this.state.isAnswered = true;

    var pool = this.state.cyclicPool;
    var question = pool[0];
    var isCorrect = selectedIndex === question.correct;

    var correctText = question.options[question.correct] || null;

    if (isCorrect) {
      this.state.score += 1;
      this.state.cyclicCorrectCount += 1;
      this.state.streak += 1;
      // Remove from pool (correct = done)
      pool.splice(0, 1);
    } else {
      this.state.streak = 0;
      // Move to end of pool (wrong = retry)
      var wrongQ = pool.splice(0, 1)[0];
      pool.push(wrongQ);
    }
    this.state.totalAnswered += 1;

    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.showAnswerFeedback(selectedIndex, question.correct, question.hint, correctText);
    }
  },

  nextQuestionCyclic: function() {
    this.state.isAnswered = false;
    if (this.state.cyclicCorrectCount >= this.state.cyclicTotal || this.state.cyclicPool.length === 0) {
      this.showResults();
    } else {
      this._renderCurrentQuestionCyclic();
    }
  },

  // ─── Single quiz answer/next ─────────────────────────────────────────────────

  handleAnswer: function(selectedIndex) {
    if (this.state.isAnswered) return;

    if (this.state.quizMode === 'all') {
      this.handleAnswerCyclic(selectedIndex);
      return;
    }

    this.state.isAnswered = true;
    var question = this.state.quizQuestions[this.state.currentQuestionIndex];
    var isCorrect = selectedIndex === question.correct;
    var correctText = question.options[question.correct] || null;

    if (isCorrect) {
      this.state.score += 1;
      this.state.streak += 1;
    } else {
      this.state.streak = 0;
    }
    this.state.totalAnswered += 1;

    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.showAnswerFeedback(selectedIndex, question.correct, question.hint, correctText);
    }
  },

  nextQuestion: function() {
    if (this.state.quizMode === 'all') {
      this.nextQuestionCyclic();
      return;
    }
    if (this.state.quizMode === 'inline') {
      this.nextInlineQuestion();
      return;
    }
    if (this.state.quizMode === 'classify') {
      this.nextClassifyQuestion();
      return;
    }
    // single
    var next = this.state.currentQuestionIndex + 1;
    if (next >= this.state.quizQuestions.length) {
      this.showResults();
    } else {
      this.state.currentQuestionIndex = next;
      this.state.isAnswered = false;
      this._renderCurrentQuestion();
    }
  },

  showResults: function() {
    this.state.currentView = 'results';
    this._syncBackBtn();
    if (typeof PasadoUI !== 'undefined') {
      var total = this.state.quizMode === 'all'
        ? this.state.cyclicTotal
        : (this.state.quizMode === 'inline' || this.state.quizMode === 'classify'
          ? this.state.quizQuestions.length
          : this.state.quizQuestions.length);
      PasadoUI.renderResults(
        this.state.score,
        total,
        this.state.quizMode
      );
    }
  },

  backToList: function() {
    this.showList();
  },

  backToCard: function() {
    this.showCard(this.state.currentFormulaIndex);
  },

  _renderCurrentQuestion: function() {
    if (typeof PasadoUI === 'undefined') return;
    var question = this.state.quizQuestions[this.state.currentQuestionIndex];
    PasadoUI.renderQuiz(
      question,
      question.formulaName,
      question.formulaEmoji,
      this.state.currentQuestionIndex,
      this.state.quizQuestions.length,
      this.state.score,
      null
    );
  },

  // ─── Inline fill-in-the-blank mode ──────────────────────────────────────────

  startInline: function() {
    var questions = (typeof PASADO_INLINE !== 'undefined') ? PASADO_INLINE.slice() : [];
    var shuffled = (typeof shuffleArray === 'function') ? shuffleArray(questions) : questions;

    this.state.quizMode = 'inline';
    this.state.quizQuestions = shuffled;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.totalAnswered = 0;
    this.state.isAnswered = false;
    this.state.streak = 0;
    this.state.currentView = 'inline';
    this._syncBackBtn();

    this._renderCurrentInline();
  },

  _renderCurrentInline: function() {
    if (typeof PasadoUI === 'undefined') return;
    var item = this.state.quizQuestions[this.state.currentQuestionIndex];
    PasadoUI.renderInlineQuestion(
      item,
      this.state.currentQuestionIndex,
      this.state.quizQuestions.length,
      this.state.score,
      this.state.streak
    );
  },

  handleInlineAnswer: function(selectedVal) {
    if (this.state.isAnswered) return;
    this.state.isAnswered = true;

    var item = this.state.quizQuestions[this.state.currentQuestionIndex];
    var correctVal = item.options[item.correct];
    var isCorrect = selectedVal === correctVal;

    if (isCorrect) {
      this.state.score += 1;
      this.state.streak += 1;
    } else {
      this.state.streak = 0;
    }
    this.state.totalAnswered += 1;

    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.showInlineFeedback(selectedVal, correctVal, item.hint, item.tts);
    }
  },

  nextInlineQuestion: function() {
    var next = this.state.currentQuestionIndex + 1;
    if (next >= this.state.quizQuestions.length) {
      this.showResults();
    } else {
      this.state.currentQuestionIndex = next;
      this.state.isAnswered = false;
      this._renderCurrentInline();
    }
  },

  // ─── Classify mode ───────────────────────────────────────────────────────────

  startClassify: function() {
    var questions = (typeof PASADO_CLASSIFY !== 'undefined') ? PASADO_CLASSIFY.slice() : [];
    var shuffled = (typeof shuffleArray === 'function') ? shuffleArray(questions) : questions;

    this.state.quizMode = 'classify';
    this.state.quizQuestions = shuffled;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.totalAnswered = 0;
    this.state.isAnswered = false;
    this.state.streak = 0;
    this.state.currentView = 'classify';
    this._syncBackBtn();

    this._renderCurrentClassify();
  },

  _renderCurrentClassify: function() {
    if (typeof PasadoUI === 'undefined') return;
    var item = this.state.quizQuestions[this.state.currentQuestionIndex];
    PasadoUI.renderClassifyQuestion(
      item,
      this.state.currentQuestionIndex,
      this.state.quizQuestions.length,
      this.state.score,
      this.state.streak
    );
  },

  handleClassifyAnswer: function(selectedKey) {
    if (this.state.isAnswered) return;
    this.state.isAnswered = true;

    var item = this.state.quizQuestions[this.state.currentQuestionIndex];
    var isCorrect = selectedKey === item.answer;

    if (isCorrect) {
      this.state.score += 1;
      this.state.streak += 1;
    } else {
      this.state.streak = 0;
    }
    this.state.totalAnswered += 1;

    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.showClassifyFeedback(selectedKey, item.answer, item.hint);
    }
  },

  nextClassifyQuestion: function() {
    var next = this.state.currentQuestionIndex + 1;
    if (next >= this.state.quizQuestions.length) {
      this.showResults();
    } else {
      this.state.currentQuestionIndex = next;
      this.state.isAnswered = false;
      this._renderCurrentClassify();
    }
  },

  init: function() {
    this.showList();
  },
};

// ─── Global exports for HTML onclick handlers ──────────────────────────────────

if (typeof window !== 'undefined') {
  window.PasadoApp = PasadoApp;
  window.pasadoShowCard        = function(i) { PasadoApp.showCard(i); };
  window.pasadoShowNext        = function()  { PasadoApp.showNextCard(); };
  window.pasadoShowPrev        = function()  { PasadoApp.showPrevCard(); };
  window.pasadoStartQuiz       = function(i) { PasadoApp.startSingleQuiz(i); };
  window.pasadoStartAllQuiz    = function()  { PasadoApp.startAllQuiz(); };
  window.pasadoHandleAnswer    = function(i) { PasadoApp.handleAnswer(i); };
  window.pasadoNext            = function()  { PasadoApp.nextQuestion(); };
  window.pasadoBackToList      = function()  { PasadoApp.backToList(); };
  window.pasadoBackToCard      = function()  { PasadoApp.backToCard(); };
  window.pasadoStartInline     = function()  { PasadoApp.startInline(); };
  window.pasadoInlineAnswer    = function(v) { PasadoApp.handleInlineAnswer(v); };
  window.pasadoStartClassify   = function()  { PasadoApp.startClassify(); };
  window.pasadoClassifyAnswer  = function(k) { PasadoApp.handleClassifyAnswer(k); };
}
