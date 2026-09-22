/**
 * Spanish Trainer — Mezcla
 * UI Renderer: all views injected into #mezcla-content
 */

const MezclaUI = {

  _root: function() {
    return document.getElementById('mezcla-content');
  },

  // ─── View: text list ─────────────────────────────────────────────────────────

  renderList: function() {
    var root = this._root();
    if (!root) return;

    var cardsHtml = MEZCLA_DATA.map(function(text, i) {
      return [
        '<div onclick="mezclaOpenText(' + i + ')" style="',
          'background: white; border-radius: 14px; padding: 20px 18px;',
          'cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;',
          'box-shadow: 0 3px 14px rgba(0,0,0,0.13);',
          'display: flex; align-items: center; gap: 16px;',
        '" class="mezcla-card">',
          '<div style="font-size: 2.2rem; flex-shrink: 0;">' + text.emoji + '</div>',
          '<div style="flex: 1; min-width: 0;">',
            '<div style="font-weight: 700; font-size: 1rem; color: #2c3e50;">' + _escHtmlM(text.title) + '</div>',
            '<div style="font-size: 0.82rem; color: #999; margin-top: 2px; font-style: italic;">' + _escHtmlM(text.titleEs) + '</div>',
            '<div style="font-size: 0.78rem; color: #aaa; margin-top: 4px;">' + text.tokens.length + ' блоков</div>',
          '</div>',
          '<div style="color: #3498db; font-size: 1.3rem; flex-shrink: 0;">›</div>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto; padding: 0 4px;">',

        '<div style="text-align: center; margin-bottom: 24px;">',
          '<h2 style="color: white; font-size: 1.5rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.4);">',
            '🌀 Mezcla — смешанное чтение',
          '</h2>',
          '<p style="color: rgba(255,255,255,0.8); margin-top: 6px; font-size: 0.9rem;">',
            'Читай текст с русско-испанской смесью. Регулируй процент сам.',
          '</p>',
        '</div>',

        '<div style="display: flex; flex-direction: column; gap: 12px;">',
          cardsHtml,
        '</div>',

      '</div>',
    ].join('');

    root.innerHTML = html;

    root.querySelectorAll('.mezcla-card').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = '0 8px 24px rgba(52,152,219,0.3)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
        el.style.boxShadow = '0 3px 14px rgba(0,0,0,0.13)';
      });
    });
  },

  // ─── View: text reading ──────────────────────────────────────────────────────

  renderText: function() {
    var root = this._root();
    if (!root) return;

    var state = MezclaApp.state;
    var text = MEZCLA_DATA[state.currentTextIndex];
    if (!text) return;

    var pct = state.percentage;
    var esCount = state.tokenLangs.filter(function(l) { return l === 'es'; }).length;

    var html = [
      '<div style="max-width: 620px; margin: 0 auto;">',

        // ── Header
        '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">',
          '<button onclick="mezclaBackToList()" style="',
            'background: rgba(255,255,255,0.15); border: none; color: white;',
            'font-size: 1rem; cursor: pointer; padding: 8px 12px; border-radius: 8px;',
          '">← Назад</button>',
          '<div>',
            '<div style="color: white; font-weight: 700; font-size: 1.1rem;">' + text.emoji + ' ' + _escHtmlM(text.title) + '</div>',
            '<div style="color: rgba(255,255,255,0.65); font-size: 0.8rem; font-style: italic;">' + _escHtmlM(text.titleEs) + '</div>',
          '</div>',
        '</div>',

        // ── Percentage control card
        '<div class="game-area" style="padding: 18px 20px; margin-bottom: 16px;">',

          '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">',
            '<span style="font-size: 0.85rem; color: #7f8c8d;">Испанских слов:</span>',
            '<span id="mezcla-pct-label" style="',
              'font-size: 1.3rem; font-weight: 700;',
              'color: ' + (pct === 0 ? '#95a5a6' : pct === 100 ? '#27ae60' : '#3498db') + ';',
            '">' + pct + '%</span>',
          '</div>',

          // Slider
          '<input type="range" id="mezcla-slider"',
            ' min="0" max="100" step="5" value="' + pct + '"',
            ' oninput="mezclaSetPct(this.value)"',
            ' style="',
              'width: 100%; -webkit-appearance: none; height: 6px;',
              'background: linear-gradient(90deg, #3498db ' + pct + '%, #e2e8f0 ' + pct + '%);',
              'border-radius: 3px; outline: none; cursor: pointer;',
              'margin-bottom: 12px;',
            '"',
          '>',

          // Preset buttons
          '<div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 10px;">',
            [0, 25, 50, 75, 100].map(function(v) {
              var isActive = pct === v;
              return [
                '<button onclick="mezclaSetPct(' + v + ')" style="',
                  'padding: 5px 12px; border-radius: 16px; font-size: 0.8rem; font-weight: 600; cursor: pointer;',
                  'border: 2px solid ' + (isActive ? '#3498db' : '#e2e8f0') + ';',
                  'background: ' + (isActive ? '#3498db' : 'white') + ';',
                  'color: ' + (isActive ? 'white' : '#7f8c8d') + ';',
                  'transition: all 0.15s;',
                '">' + v + '%</button>',
              ].join('');
            }).join(''),
          '</div>',

          '<div style="display: flex; justify-content: space-between; align-items: center;">',
            '<span style="font-size: 0.78rem; color: #aaa;">',
              esCount + ' исп. · ' + (text.tokens.length - esCount) + ' рус. · ' + text.tokens.length + ' всего',
            '</span>',
            '<button onclick="mezclaReshuffle()" style="',
              'background: #f0f7ff; border: 1px solid #a8d4f0; color: #3498db;',
              'border-radius: 8px; padding: 6px 14px; font-size: 0.82rem; cursor: pointer;',
              'font-weight: 600;',
            '">🔀 Перемешать</button>',
          '</div>',

        '</div>',

        // ── Text body
        '<div class="game-area" style="padding: 20px 22px; line-height: 2.2; font-size: 1.05rem;">',
          '<div id="mezcla-tokens">',
            this._buildTokensHtml(text, state.tokenLangs, state.activeTooltip),
          '</div>',
        '</div>',

        // ── Legend
        '<div style="',
          'display: flex; gap: 16px; justify-content: center; margin-top: 12px;',
          'font-size: 0.8rem; color: rgba(255,255,255,0.7);',
        '">',
          '<span>',
            '<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#3498db;vertical-align:middle;margin-right:4px;"></span>',
            'Испанский',
          '</span>',
          '<span>',
            '<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#e8e8e8;vertical-align:middle;margin-right:4px;"></span>',
            'Русский',
          '</span>',
          '<span style="opacity:0.6;">· нажми чтобы увидеть перевод</span>',
        '</div>',

      '</div>',
    ].join('');

    root.innerHTML = html;
    this._attachSliderStyle();
  },

  // ─── Build token HTML ────────────────────────────────────────────────────────

  _buildTokensHtml: function(text, tokenLangs, activeTooltip) {
    return text.tokens.map(function(token, i) {
      var lang = tokenLangs[i];
      var isEs = lang === 'es';
      var displayText = token[lang];
      var otherLang = isEs ? 'ru' : 'es';
      var tooltipText = token[otherLang];
      var showTooltip = activeTooltip === i;

      var tokenStyle = [
        'display: inline-block;',
        'position: relative;',
        'padding: 2px 5px;',
        'border-radius: 5px;',
        'cursor: pointer;',
        'transition: background 0.15s;',
        'margin: 1px 0;',
        isEs
          ? 'background: #dbeeff; color: #0d4d80; font-weight: 600; border-bottom: 2px solid #3498db;'
          : 'background: #f2f2f2; color: #444; border-bottom: 2px solid transparent;',
      ].join(' ');

      var tooltipHtml = showTooltip ? [
        '<span style="',
          'position: absolute;',
          'bottom: calc(100% + 6px);',
          'left: 50%; transform: translateX(-50%);',
          'background: #2c3e50;',
          'color: white;',
          'font-size: 0.78rem;',
          'padding: 5px 10px;',
          'border-radius: 6px;',
          'white-space: nowrap;',
          'z-index: 10;',
          'font-weight: 400;',
          'pointer-events: none;',
          'box-shadow: 0 2px 8px rgba(0,0,0,0.3);',
        '">',
          (isEs ? '🇷🇺 ' : '🇪🇸 ') + _escHtmlM(tooltipText),
        '</span>',
      ].join('') : '';

      return [
        '<span',
          ' onclick="mezclaTapToken(' + i + ')"',
          ' style="' + tokenStyle + '"',
        '>',
          tooltipHtml,
          _escHtmlM(displayText),
        '</span>',
        ' ',
      ].join('');
    }).join('');
  },

  // ─── Update only tokens (after tooltip tap, no full re-render) ───────────────

  updateTokens: function() {
    var state = MezclaApp.state;
    var text = MEZCLA_DATA[state.currentTextIndex];
    if (!text) return;

    var container = document.getElementById('mezcla-tokens');
    if (!container) return;

    container.innerHTML = this._buildTokensHtml(text, state.tokenLangs, state.activeTooltip);
  },

  // ─── Slider background gradient fix ─────────────────────────────────────────

  _attachSliderStyle: function() {
    if (document.getElementById('mezcla-slider-css')) return;
    var style = document.createElement('style');
    style.id = 'mezcla-slider-css';
    style.textContent = [
      '#mezcla-slider::-webkit-slider-thumb{',
        '-webkit-appearance:none;width:20px;height:20px;',
        'border-radius:50%;background:#3498db;cursor:pointer;',
        'box-shadow:0 1px 4px rgba(0,0,0,0.2);',
      '}',
      '#mezcla-slider::-moz-range-thumb{',
        'width:20px;height:20px;border-radius:50%;',
        'background:#3498db;cursor:pointer;border:none;',
      '}',
    ].join('');
    document.head.appendChild(style);
  },

};

// ─── Helper ───────────────────────────────────────────────────────────────────

function _escHtmlM(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

if (typeof window !== 'undefined') {
  window.MezclaUI = MezclaUI;
}
