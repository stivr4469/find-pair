/**
 * Spanish Trainer — Mezcla
 * App Controller: percentage logic, token assignment, state
 */

const MezclaApp = {
  state: {
    view: 'list',           // 'list' | 'text' | 'custom-input'
    currentTextIndex: 0,
    percentage: 50,         // 0-100: % of tokens shown in Spanish
    tokenLangs: [],         // array of 'ru' | 'es' for each token position
    activeTooltip: -1,      // index of token showing tooltip (-1 = none)
    customTexts: [],        // array of user-created text objects
  },

  // ─── Get current text (built-in or custom) ───────────────────────────────────

  _getCurrentText: function() {
    var i = this.state.currentTextIndex;
    if (i < MEZCLA_DATA.length) {
      return MEZCLA_DATA[i];
    }
    return this.state.customTexts[i - MEZCLA_DATA.length] || null;
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
    var text;
    if (index < MEZCLA_DATA.length) {
      text = MEZCLA_DATA[index];
    } else {
      text = this.state.customTexts[index - MEZCLA_DATA.length];
    }
    if (!text) return;
    this.state.currentTextIndex = index;
    this.state.view = 'text';
    this.state.activeTooltip = -1;
    this.state.tokenLangs = this._assignTokens(text.tokens.length, this.state.percentage);
    MezclaUI.renderText();
    MezclaUI._attachTokenListeners();
  },

  backToList: function() {
    this.state.view = 'list';
    this.state.activeTooltip = -1;
    MezclaUI.renderList();
  },

  // ─── Percentage change ──────────────────────────────────────────────────────

  setPercentage: function(pct) {
    this.state.percentage = Math.max(0, Math.min(100, parseInt(pct, 10)));
    var text = this._getCurrentText();
    if (text) {
      this.state.tokenLangs = this._assignTokens(text.tokens.length, this.state.percentage);
    }
    this.state.activeTooltip = -1;
    MezclaUI.renderText();
    MezclaUI._attachTokenListeners();
  },

  // ─── Re-shuffle (same %, different random distribution) ─────────────────────

  reshuffle: function() {
    var text = this._getCurrentText();
    if (!text) return;
    this.state.tokenLangs = this._assignTokens(text.tokens.length, this.state.percentage);
    this.state.activeTooltip = -1;
    MezclaUI.renderText();
    MezclaUI._attachTokenListeners();
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

  // ─── Custom text input view ──────────────────────────────────────────────────

  openCustomInput: function() {
    this.state.view = 'custom-input';
    MezclaUI.renderCustomInput();
  },

  // ─── Language detection helper ───────────────────────────────────────────────

  _detectLang: function(text) {
    var cyrillicCount = (text.match(/[а-яёА-ЯЁ]/g) || []).length;
    var latinCount    = (text.match(/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g) || []).length;
    return cyrillicCount >= latinCount ? 'ru' : 'es';
  },

  // ─── Read form, validate, save ───────────────────────────────────────────────

  saveCustomTextFromForm: function() {
    var titleInput = document.getElementById('mezcla-custom-title');
    var ruTextarea = document.getElementById('mezcla-custom-ru');
    var esTextarea = document.getElementById('mezcla-custom-es');
    var errorEl    = document.getElementById('mezcla-custom-error');

    if (!ruTextarea || !esTextarea) return;

    var titleVal = titleInput ? titleInput.value.trim() : '';

    var rawRu = ruTextarea.value;
    var rawEs = esTextarea.value;

    // Split and filter empty lines
    var ruLines = rawRu.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 0; });
    var esLines = rawEs.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 0; });

    function showError(msg) {
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
      }
    }

    function hideError() {
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
    }

    hideError();

    if (ruLines.length === 0 && esLines.length === 0) {
      showError('Оба поля пустые. Введи текст.');
      return;
    }

    if (ruLines.length === 0) {
      showError('Первое поле пустое. Введи текст.');
      return;
    }

    if (esLines.length === 0) {
      showError('Второе поле пустое. Введи текст.');
      return;
    }

    // Auto-detect languages
    var leftLang  = this._detectLang(rawRu);
    var rightLang = this._detectLang(rawEs);

    // Both same language?
    if (leftLang === rightLang) {
      showError('Похоже, в обоих полях один язык. Проверь текст.');
      return;
    }

    // Auto-swap if needed: left field should be Russian, right should be Spanish
    var finalRu, finalEs;
    if (leftLang === 'ru' && rightLang === 'es') {
      finalRu = ruLines;
      finalEs = esLines;
    } else {
      // Silently swap
      finalRu = esLines;
      finalEs = ruLines;
    }

    // Line count mismatch: warn but proceed with min
    var minLen = Math.min(finalRu.length, finalEs.length);
    if (finalRu.length !== finalEs.length) {
      // We show a temporary warning but proceed
      showError(
        'Количество строк не совпадает (' + finalRu.length + ' рус. / ' + finalEs.length + ' исп.). ' +
        'Берём первые ' + minLen + ' пар.'
      );
      // Don't return — proceed anyway
    }

    this.saveCustomText(titleVal, finalRu.slice(0, minLen), finalEs.slice(0, minLen));
  },

  saveCustomText: function(titleVal, ruLines, esLines) {
    var tokens = ruLines.map(function(ru, i) {
      return { ru: ru, es: esLines[i] };
    });

    var textObj = {
      id: 'custom-' + Date.now(),
      emoji: '📝',
      title: titleVal || 'Мой текст',
      titleEs: 'Mi texto',
      tokens: tokens,
      isCustom: true,
    };

    this.state.customTexts.push(textObj);
    var newIndex = MEZCLA_DATA.length + this.state.customTexts.length - 1;
    this.openText(newIndex);
  },

  // ─── Init ────────────────────────────────────────────────────────────────────

  init: function() {
    MezclaUI.renderList();
  },
};

// ─── Global exports ───────────────────────────────────────────────────────────

if (typeof window !== 'undefined') {
  window.MezclaApp = MezclaApp;
  window.mezclaOpenText        = function(i) { MezclaApp.openText(i); };
  window.mezclaBackToList      = function()  { MezclaApp.backToList(); };
  window.mezclaSetPct          = function(v) { MezclaApp.setPercentage(v); };
  window.mezclaReshuffle       = function()  { MezclaApp.reshuffle(); };
  window.mezclaTapToken        = function(i) { MezclaApp.tapToken(i); };
  window.mezclaOpenCustomInput = function()  { MezclaApp.openCustomInput(); };
  window.mezclaSaveCustomText  = function()  { MezclaApp.saveCustomTextFromForm(); };
}
