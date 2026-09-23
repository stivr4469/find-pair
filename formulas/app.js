/**
 * Spanish Trainer - 36 Formulas
 * App Controller: state management and game logic
 */

// ─── XP System (in-memory, resets on page close) ─────────────────────────────

var _xp = 0;

// ─── Naranjito mascot ─────────────────────────────────────────────────────────

var _nj = null;
var _njStreak = 0;

function _addXP(amount) {
  _xp += amount;
  var el = document.getElementById('xp-value');
  if (el) el.textContent = _xp;

  var counter = document.getElementById('xp-counter');
  if (counter) {
    counter.classList.remove('bump');
    // Force reflow to restart animation
    void counter.offsetWidth;
    counter.classList.add('bump');
    setTimeout(function() { counter.classList.remove('bump'); }, 350);
  }

  // Float "+10 XP" near the counter
  var badge = document.getElementById('xp-counter');
  if (badge) {
    var rect = badge.getBoundingClientRect();
    var float = document.createElement('div');
    float.className = 'xp-float';
    float.textContent = '+' + amount + ' XP';
    float.style.left = (rect.left + rect.width / 2 - 24) + 'px';
    float.style.top  = (rect.bottom + 4) + 'px';
    document.body.appendChild(float);
    setTimeout(function() { float.remove(); }, 950);
  }
}

const FormulasApp = {
  state: {
    currentView: 'list',       // 'list' | 'card' | 'quiz' | 'results'
    currentFormulaIndex: 0,
    quizMode: 'single',        // 'single' | 'all' | 'marathon'
    quizQuestions: [],          // flattened quiz items with formulaId attached
    currentQuestionIndex: 0,
    score: 0,
    totalAnswered: 0,
    isAnswered: false,
    // Marathon-specific
    marathonPool: [],           // remaining questions (answered wrong → pushed back)
    marathonTotal: 0,           // initial pool size (216)
  },

  // ─── Browse: list of all 20 formulas ───────────────────────────────────────

  _syncBackBtn: function() {
    var btn = document.getElementById('btn-back-to-list');
    if (btn) btn.style.display = (this.state.currentView === 'list') ? 'none' : 'inline-flex';
  },

  showList: function() {
    this.state.currentView = 'list';
    this._syncBackBtn();
    if (typeof FormulasUI !== 'undefined') {
      FormulasUI.renderFormulaList();
    }
  },

  // ─── Browse: single formula card ───────────────────────────────────────────

  showCard: function(index) {
    const safeIndex = Math.max(0, Math.min(index, FORMULAS_DATA.length - 1));
    this.state.currentFormulaIndex = safeIndex;
    this.state.currentView = 'card';
    this._syncBackBtn();
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

    // Build question pool, shuffle, pick 3 — so each retake feels different
    var pool = formula.quiz.map(function(q) {
      return Object.assign({}, q, {
        formulaId: formula.id,
        formulaName: formula.shortName,
        formulaEmoji: FORMULA_ICONS[(formula.id || 1) - 1].icon,
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
    this._syncBackBtn();
    _njStreak = 0;

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
          formulaEmoji: FORMULA_ICONS[(formula.id || 1) - 1].icon,
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
    this._syncBackBtn();
    _njStreak = 0;

    this._renderCurrentQuestion();
  },

  // ─── Quiz: marathon (cyclic) mode — all 36×6 = 216 questions ──────────────

  startMarathon: function() {
    var allQuestions = [];
    FORMULAS_DATA.forEach(function(formula) {
      formula.quiz.forEach(function(q) {
        allQuestions.push(Object.assign({}, q, {
          formulaId: formula.id,
          formulaName: formula.shortName,
          formulaEmoji: FORMULA_ICONS[(formula.id || 1) - 1].icon,
        }));
      });
    });

    var shuffled = (typeof shuffleArray === 'function')
      ? shuffleArray(allQuestions)
      : allQuestions;

    this.state.quizMode = 'marathon';
    this.state.marathonPool = shuffled.slice();   // mutable cyclic pool
    this.state.marathonTotal = shuffled.length;   // 216
    this.state.quizQuestions = [];
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.totalAnswered = 0;
    this.state.isAnswered = false;
    this.state.currentView = 'quiz';
    this._syncBackBtn();
    _njStreak = 0;

    this._renderMarathonQuestion();
  },

  // ─── Quiz: handle answer ────────────────────────────────────────────────────

  handleAnswer: function(selectedIndex) {
    if (this.state.isAnswered) return;
    this.state.isAnswered = true;

    var question;
    if (this.state.quizMode === 'marathon') {
      question = this.state.marathonPool[0];
    } else {
      question = this.state.quizQuestions[this.state.currentQuestionIndex];
    }

    var isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
      this.state.score += 1;
      _addXP(10);
      _njStreak++;
      if (_nj) _nj.correct(_njStreak);
      // Auto-TTS on correct answer
      if (typeof speakSpanish === 'function' && question.question) {
        speakSpanish(question.question);
      }
    } else {
      _njStreak = 0;
      if (_nj) {
        var formula = FORMULAS_DATA.find(function(f) { return f.id === question.formulaId; });
        var ruleEs = formula ? formula.rule : '';
        var ruleRu = formula ? formula.description : '';
        _nj.wrong(ruleEs, ruleRu);
      }
    }
    this.state.totalAnswered += 1;

    if (typeof FormulasUI !== 'undefined') {
      FormulasUI.showAnswerFeedback(selectedIndex, question.correct, question.hint);
    }

    // Marathon: remove correct answers, push wrong to end
    if (this.state.quizMode === 'marathon') {
      if (isCorrect) {
        this.state.marathonPool.shift();
      } else {
        var wrong = this.state.marathonPool.shift();
        this.state.marathonPool.push(wrong);
      }
    }
  },

  // ─── Quiz: next question ────────────────────────────────────────────────────

  nextQuestion: function() {
    if (this.state.quizMode === 'marathon') {
      if (this.state.marathonPool.length === 0) {
        this.showResults();
      } else {
        this.state.isAnswered = false;
        this._renderMarathonQuestion();
      }
      return;
    }

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
    this._syncBackBtn();
    if (typeof FormulasUI !== 'undefined') {
      var total = this.state.quizMode === 'marathon'
        ? this.state.totalAnswered
        : this.state.quizQuestions.length;
      FormulasUI.renderResults(
        this.state.score,
        total,
        this.state.quizMode
      );
    }
    if (_nj) {
      var pct = this.state.totalAnswered > 0
        ? Math.round(this.state.score / this.state.totalAnswered * 100)
        : 0;
      _nj.result(pct);
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
    var n = qIndex + 1;

    FormulasUI.renderQuiz(question, question.formulaName, question.formulaEmoji, qIndex, total, score, null);

    if (_nj) {
      if (n === Math.floor(total / 2)) {
        _nj.halfway();
      } else if (n === total) {
        _nj.last();
      } else {
        _nj.question(n, total);
      }
    }
  },

  _renderMarathonQuestion: function() {
    if (typeof FormulasUI === 'undefined') return;

    var question = this.state.marathonPool[0];
    var remaining = this.state.marathonPool.length;
    var score = this.state.score;
    var answered = this.state.totalAnswered;
    var total = this.state.marathonTotal;
    var n = answered + 1;

    FormulasUI.renderQuiz(question, question.formulaName, question.formulaEmoji, answered, total, score, remaining);

    if (_nj) {
      if (n === Math.floor(total / 2)) {
        _nj.halfway();
      } else if (remaining === 1) {
        _nj.last();
      } else {
        _nj.question(n, total);
      }
    }
  },

  // ─── Init ────────────────────────────────────────────────────────────────────

  init: function() {
    var buddy = document.getElementById('buddy');
    if (buddy && typeof Naranjito !== 'undefined') {
      _nj = Naranjito.mount(buddy);
      _nj.greet();
    }
    this.showList();
  },
};

// ─── Global exports for HTML onclick handlers ──────────────────────────────────

if (typeof window !== 'undefined') {
  window.FormulasApp = FormulasApp;
  window.formulaShowCard     = function(i) { FormulasApp.showCard(i); };
  window.formulaShowNext     = function()  { FormulasApp.showNextCard(); };
  window.formulaShowPrev     = function()  { FormulasApp.showPrevCard(); };
  window.formulaStartQuiz    = function(i) { FormulasApp.startSingleQuiz(i); };
  window.formulaStartAllQuiz = function()  { FormulasApp.startAllQuiz(); };
  window.formulaStartMarathon = function() { FormulasApp.startMarathon(); };
  window.formulaHandleAnswer = function(i) { FormulasApp.handleAnswer(i); };
  window.formulaNext         = function()  { FormulasApp.nextQuestion(); };
  window.formulaBackToList   = function()  { FormulasApp.backToList(); };
  window.formulaBackToCard   = function()  { FormulasApp.backToCard(); };
  window.formulaSpeakExample = function(text) {
    if (typeof speakSpanish === 'function') speakSpanish(text);
  };
}
