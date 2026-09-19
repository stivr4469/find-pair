/**
 * Spanish Trainer - 20 Formulas
 * App Controller: state management and game logic
 */

const FormulasApp = {
  state: {
    currentView: 'list',       // 'list' | 'card' | 'quiz' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',        // 'single' | 'all'
    quizQuestions: [],          // flattened quiz items with formulaId attached
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
  },

  // ─── Browse: list of all 20 formulas ───────────────────────────────────────

  showList: function() {
    this.state.currentView = 'list';
    if (typeof FormulasUI !== 'undefined') {
      FormulasUI.renderFormulaList();
    }
  },

  // ─── Browse: single formula card ───────────────────────────────────────────

  showCard: function(index) {
    const safeIndex = Math.max(0, Math.min(index, FORMULAS_DATA.length - 1));
    this.state.currentFormulaIndex = safeIndex;
    this.state.currentView = 'card';
    if (typeof FormulasUI !== 'undefined') {
      FormulasUI.renderFormulaCard(FORMULAS_DATA[safeIndex], safeIndex);
    }
  },

  showNextCard: function() {
    const next = (this.state.currentFormulaIndex + 1) % FORMULAS_DATA.length;
    this.showCard(next);
  },

  showPrevCard: function() {
    const prev = (this.state.currentFormulaIndex - 1 + FORMULAS_DATA.length) % FORMULAS_DATA.length;
    this.showCard(prev);
  },

  // ─── Quiz: single formula (3 questions) ────────────────────────────────────

  startSingleQuiz: function(formulaIndex) {
    const formula = FORMULAS_DATA[formulaIndex];
    if (!formula) return;

    // Build question list with formulaId and formulaName attached
    const questions = formula.quiz.map(function(q) {
      return Object.assign({}, q, {
        formulaId: formula.id,
        formulaName: formula.shortName,
        formulaEmoji: formula.emoji,
      });
    });

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

  // ─── Quiz: all 20 formulas (60 questions, shuffled) ────────────────────────

  startAllQuiz: function() {
    // Collect all questions from all formulas, attach meta
    var allQuestions = [];
    FORMULAS_DATA.forEach(function(formula) {
      formula.quiz.forEach(function(q) {
        allQuestions.push(Object.assign({}, q, {
          formulaId: formula.id,
          formulaName: formula.shortName,
          formulaEmoji: formula.emoji,
        }));
      });
    });

    // Shuffle using global shuffleArray from utils.js
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

  // ─── Quiz: handle answer ────────────────────────────────────────────────────

  handleAnswer: function(selectedIndex) {
    if (this.state.isAnswered) return;
    this.state.isAnswered = true;

    var question = this.state.quizQuestions[this.state.currentQuestionIndex];
    var isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
      this.state.score += 1;
    }
    this.state.totalAnswered += 1;

    if (typeof FormulasUI !== 'undefined') {
      FormulasUI.showAnswerFeedback(selectedIndex, question.correct, question.hint);
    }
  },

  // ─── Quiz: next question ────────────────────────────────────────────────────

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

  // ─── Results ────────────────────────────────────────────────────────────────

  showResults: function() {
    this.state.currentView = 'results';
    if (typeof FormulasUI !== 'undefined') {
      FormulasUI.renderResults(
        this.state.score,
        this.state.quizQuestions.length,
        this.state.quizMode
      );
    }
  },

  // ─── Navigation ─────────────────────────────────────────────────────────────

  backToList: function() {
    this.showList();
  },

  backToCard: function() {
    this.showCard(this.state.currentFormulaIndex);
  },

  // ─── Internal helpers ───────────────────────────────────────────────────────

  _renderCurrentQuestion: function() {
    if (typeof FormulasUI === 'undefined') return;

    var question = this.state.quizQuestions[this.state.currentQuestionIndex];
    var qIndex = this.state.currentQuestionIndex;
    var total = this.state.quizQuestions.length;
    var score = this.state.score;

    FormulasUI.renderQuiz(question, question.formulaName, question.formulaEmoji, qIndex, total, score);
  },

  // ─── Init ────────────────────────────────────────────────────────────────────

  init: function() {
    this.showList();
  },
};

// ─── Global exports for HTML onclick handlers ──────────────────────────────────

if (typeof window !== 'undefined') {
  window.FormulasApp = FormulasApp;
  window.formulaShowCard    = function(i) { FormulasApp.showCard(i); };
  window.formulaShowNext    = function()  { FormulasApp.showNextCard(); };
  window.formulaShowPrev    = function()  { FormulasApp.showPrevCard(); };
  window.formulaStartQuiz   = function(i) { FormulasApp.startSingleQuiz(i); };
  window.formulaStartAllQuiz = function() { FormulasApp.startAllQuiz(); };
  window.formulaHandleAnswer = function(i) { FormulasApp.handleAnswer(i); };
  window.formulaNext        = function()  { FormulasApp.nextQuestion(); };
  window.formulaBackToList  = function()  { FormulasApp.backToList(); };
  window.formulaBackToCard  = function()  { FormulasApp.backToCard(); };
}
