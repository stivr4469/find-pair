/**
 * Spanish Trainer — Прошедшее время
 * App Controller: state management and game logic
 */

const PasadoApp = {
  state: {
    currentView: 'list',        // 'list' | 'card' | 'quiz' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',         // 'single' | 'all'
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
  },

  showList: function() {
    this.state.currentView = 'list';
    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.renderFormulaList();
    }
  },

  showCard: function(index) {
    var safeIndex = Math.max(0, Math.min(index, PASADO_DATA.length - 1));
    this.state.currentFormulaIndex = safeIndex;
    this.state.currentView = 'card';
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
    this.state.currentView = 'quiz';

    this._renderCurrentQuestion();
  },

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
    this.state.quizQuestions = shuffled;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.totalAnswered = 0;
    this.state.isAnswered = false;
    this.state.currentView = 'quiz';

    this._renderCurrentQuestion();
  },

  handleAnswer: function(selectedIndex) {
    if (this.state.isAnswered) return;
    this.state.isAnswered = true;

    var question = this.state.quizQuestions[this.state.currentQuestionIndex];
    var isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
      this.state.score += 1;
    }
    this.state.totalAnswered += 1;

    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.showAnswerFeedback(selectedIndex, question.correct, question.hint);
    }
  },

  nextQuestion: function() {
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
    if (typeof PasadoUI !== 'undefined') {
      PasadoUI.renderResults(
        this.state.score,
        this.state.quizQuestions.length,
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
      this.state.score
    );
  },

  init: function() {
    this.showList();
  },
};

// ─── Global exports for HTML onclick handlers ──────────────────────────────────

if (typeof window !== 'undefined') {
  window.PasadoApp = PasadoApp;
  window.pasadoShowCard      = function(i) { PasadoApp.showCard(i); };
  window.pasadoShowNext      = function()  { PasadoApp.showNextCard(); };
  window.pasadoShowPrev      = function()  { PasadoApp.showPrevCard(); };
  window.pasadoStartQuiz     = function(i) { PasadoApp.startSingleQuiz(i); };
  window.pasadoStartAllQuiz  = function()  { PasadoApp.startAllQuiz(); };
  window.pasadoHandleAnswer  = function(i) { PasadoApp.handleAnswer(i); };
  window.pasadoNext          = function()  { PasadoApp.nextQuestion(); };
  window.pasadoBackToList    = function()  { PasadoApp.backToList(); };
  window.pasadoBackToCard    = function()  { PasadoApp.backToCard(); };
}
