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

  // ─── Language detection ──────────────────────────────────────────────────────

  _detectLang: function(text) {
    var cyrillicCount = (text.match(/[а-яёА-ЯЁ]/g) || []).length;
    var latinCount    = (text.match(/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g) || []).length;
    return cyrillicCount >= latinCount ? 'ru' : 'es';
  },

  // ─── Translate lines via Google Translate (unofficial, no key) ───────────────

  _translateLines: function(lines, fromLang, toLang) {
    // Join with a rare delimiter preserved by GT, translate in one request
    var DELIM = ' \n ';
    var joined = lines.join(DELIM);
    var url = 'https://translate.googleapis.com/translate_a/single'
      + '?client=gtx&sl=' + fromLang + '&tl=' + toLang + '&dt=t'
      + '&q=' + encodeURIComponent(joined);

    return fetch(url)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        // data[0] = array of [translatedChunk, originalChunk, ...]
        var translated = data[0].map(function(item) { return item[0]; }).join('');
        var result = translated.split(DELIM.trim()).map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
        // fallback: if split didn't produce same count, split by newline
        if (result.length !== lines.length) {
          result = translated.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
        }
        return result;
      });
  },

  // ─── Read form, translate, save ──────────────────────────────────────────────

  translateAndCreate: function() {
    var self = this;
    var titleInput = document.getElementById('mezcla-custom-title');
    var textArea   = document.getElementById('mezcla-custom-text');
    var errorEl    = document.getElementById('mezcla-custom-error');
    var progressEl = document.getElementById('mezcla-translate-progress');
    var btn        = document.getElementById('mezcla-translate-btn');

    if (!textArea) return;

    var titleVal = titleInput ? titleInput.value.trim() : '';
    var raw = textArea.value;
    // Split into sentences (by .!? and newlines)
    var lines = raw
      .replace(/([.!?])\s+/g, '$1\n')
      .split('\n')
      .map(function(l) { return l.trim(); })
      .filter(function(l) { return l.length > 0; });

    function showError(msg) {
      if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; }
    }
    function hideError() {
      if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }
    }

    hideError();

    if (lines.length === 0) {
      showError('Поле пустое. Вставь текст.');
      return;
    }

    var srcLang = this._detectLang(raw);
    var tgtLang = srcLang === 'ru' ? 'es' : 'ru';

    // Show loading
    if (progressEl) progressEl.style.display = 'block';
    if (btn) { btn.disabled = true; btn.textContent = 'Переводим...'; }

    this._translateLines(lines, srcLang, tgtLang)
      .then(function(translated) {
        var minLen = Math.min(lines.length, translated.length);
        var ruLines = srcLang === 'ru' ? lines.slice(0, minLen) : translated.slice(0, minLen);
        var esLines = srcLang === 'es' ? lines.slice(0, minLen) : translated.slice(0, minLen);
        self.saveCustomText(titleVal, ruLines, esLines);
      })
      .catch(function(err) {
        if (progressEl) progressEl.style.display = 'none';
        if (btn) { btn.disabled = false; btn.textContent = 'Перевести и создать →'; }
        showError('Ошибка перевода. Проверь интернет и попробуй снова. (' + err.message + ')');
      });
  },

  saveCustomText: function(titleVal, ruLines, esLines) {
    var tokens = [];
    var sentLen = Math.min(ruLines.length, esLines.length);

    for (var i = 0; i < sentLen; i++) {
      var ruWords = ruLines[i].split(/\s+/).map(_mClean).filter(Boolean);
      var esWords = esLines[i].split(/\s+/).map(_mClean).filter(Boolean);
      var pairLen = Math.min(ruWords.length, esWords.length);

      for (var j = 0; j < pairLen; j++) {
        tokens.push({ ru: ruWords[j], es: esWords[j] });
      }
      // Extra words from longer language paired with last matched word of shorter
      for (var j = pairLen; j < ruWords.length; j++) {
        tokens.push({ ru: ruWords[j], es: esWords[pairLen - 1] || ruWords[j] });
      }
      for (var j = pairLen; j < esWords.length; j++) {
        tokens.push({ ru: ruWords[pairLen - 1] || esWords[j], es: esWords[j] });
      }
    }

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

// ─── Helper: strip punctuation from word edges ───────────────────────────────

function _mClean(w) {
  return w.replace(/^[«"'¿¡(„\-]+|[»"'.,!?;:)„\-]+$/g, '').trim();
}

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
