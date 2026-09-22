/**
 * Spanish Trainer — Mezcla
 * App Controller: percentage logic, token assignment, state
 */

const MezclaApp = {
  state: {
    view: 'list',           // 'list' | 'text'
    currentTextIndex: 0,
    percentage: 50,         // 0-100: % of tokens shown in Spanish
    tokenLangs: [],         // array of 'ru' | 'es' for each token position
    activeTooltip: -1,      // index of token showing tooltip (-1 = none)
  },

  // ─── Generate token language assignment ─────────────────────────────────────

  _assignTokens: function(tokenCount, pct) {
    var spanishCount = Math.round(tokenCount * pct / 100);
    var indices = [];
    for (var i = 0; i < tokenCount; i++) indices.push(i);

    var shuffled = (typeof shuffleArray === 'function') ? shuffleArray(indices) : indices;
    var spanishSet = {};
    for (var j = 0; j < spanishCount; j++) {
      spanishSet[shuffled[j]] = true;
    }

    var langs = [];
    for (var k = 0; k < tokenCount; k++) {
      langs.push(spanishSet[k] ? 'es' : 'ru');
    }
    return langs;
  },

  // ─── Navigate to text ───────────────────────────────────────────────────────

  openText: function(index) {
    var text = MEZCLA_DATA[index];
    if (!text) return;
    this.state.currentTextIndex = index;
    this.state.view = 'text';
    this.state.activeTooltip = -1;
    this.state.tokenLangs = this._assignTokens(text.tokens.length, this.state.percentage);
    MezclaUI.renderText();
  },

  backToList: function() {
    this.state.view = 'list';
    this.state.activeTooltip = -1;
    MezclaUI.renderList();
  },

  // ─── Percentage change ──────────────────────────────────────────────────────

  setPercentage: function(pct) {
    this.state.percentage = Math.max(0, Math.min(100, parseInt(pct, 10)));
    var text = MEZCLA_DATA[this.state.currentTextIndex];
    if (text) {
      this.state.tokenLangs = this._assignTokens(text.tokens.length, this.state.percentage);
    }
    this.state.activeTooltip = -1;
    MezclaUI.renderText();
  },

  // ─── Re-shuffle (same %, different random distribution) ─────────────────────

  reshuffle: function() {
    var text = MEZCLA_DATA[this.state.currentTextIndex];
    if (!text) return;
    this.state.tokenLangs = this._assignTokens(text.tokens.length, this.state.percentage);
    this.state.activeTooltip = -1;
    MezclaUI.renderText();
  },

  // ─── Token tap: show/hide tooltip ───────────────────────────────────────────

  tapToken: function(index) {
    if (this.state.activeTooltip === index) {
      this.state.activeTooltip = -1;
    } else {
      this.state.activeTooltip = index;
    }
    MezclaUI.updateTokens();
  },

  // ─── Init ────────────────────────────────────────────────────────────────────

  init: function() {
    MezclaUI.renderList();
  },
};

// ─── Global exports ───────────────────────────────────────────────────────────

if (typeof window !== 'undefined') {
  window.MezclaApp = MezclaApp;
  window.mezclaOpenText    = function(i) { MezclaApp.openText(i); };
  window.mezclaBackToList  = function()  { MezclaApp.backToList(); };
  window.mezclaSetPct      = function(v) { MezclaApp.setPercentage(v); };
  window.mezclaReshuffle   = function()  { MezclaApp.reshuffle(); };
  window.mezclaTapToken    = function(i) { MezclaApp.tapToken(i); };
}
