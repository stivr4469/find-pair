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

    var allTexts = MEZCLA_DATA.concat(MezclaApp.state.customTexts);

    var cardsHtml = allTexts.map(function(text, i) {
      return [
        '<div data-mezcla-open="' + i + '" style="',
          'background: var(--surface); border-radius: 14px; padding: 20px 18px;',
          'cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;',
          'box-shadow: var(--shadow);',
          'display: flex; align-items: center; gap: 16px;',
          'border: 1px solid var(--border);',
        '" class="mezcla-card">',
          '<div style="width:44px;height:44px;border-radius:12px;flex-shrink:0;background:' + ['#3b82f6','#22c55e','#f59e0b','#a855f7','#ef4444','#14b8a6'][i % 6] + ';opacity:0.85;"></div>',
          '<div style="flex: 1; min-width: 0;">',
            '<div style="font-weight: 700; font-size: 1rem; color: var(--text);">' + _escHtmlM(text.title) + '</div>',
            '<div style="font-size: 0.82rem; color: var(--muted); margin-top: 2px; font-style: italic;">' + _escHtmlM(text.titleEs) + '</div>',
            '<div style="font-size: 0.78rem; color: var(--muted); margin-top: 4px;">' + text.tokens.length + ' слов</div>',
          '</div>',
          '<div style="color: var(--accent); font-size: 1.3rem; flex-shrink: 0;">›</div>',
        '</div>',
      ].join('');
    }).join('');

    // "+" card for custom text input
    var addCardHtml = [
      '<div data-mezcla-add-custom style="',
        'background: var(--surface); border-radius: 14px; padding: 20px 18px;',
        'cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;',
        'box-shadow: var(--shadow);',
        'display: flex; align-items: center; gap: 16px;',
        'border: 2px dashed var(--border);',
      '" class="mezcla-card mezcla-card-add">',
        '<div style="font-size: 2rem; flex-shrink: 0;"><i data-lucide="file-plus-2" style="stroke:var(--accent);width:32px;height:32px;"></i></div>',
        '<div style="flex: 1; min-width: 0;">',
          '<div style="font-weight: 700; font-size: 1rem; color: var(--accent);">+ Добавить свой текст</div>',
          '<div style="font-size: 0.82rem; color: var(--muted); margin-top: 2px;">Вставь свой параллельный текст</div>',
        '</div>',
        '<div style="color: var(--accent); font-size: 1.3rem; flex-shrink: 0;">›</div>',
      '</div>',
    ].join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto; padding: 0 4px;">',

        '<div style="display: flex; flex-direction: column; gap: 12px;">',
          cardsHtml,
          addCardHtml,
        '</div>',

      '</div>',
    ].join('');

    root.innerHTML = html;
    lucide.createIcons();

    root.querySelectorAll('.mezcla-card').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.transform = 'translateY(-3px)';
        if (el.classList.contains('mezcla-card-add')) {
          el.style.boxShadow = '0 8px 24px rgba(90,127,168,0.25)';
        } else {
          el.style.boxShadow = '0 8px 24px rgba(52,152,219,0.3)';
        }
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
        el.style.boxShadow = el.classList.contains('mezcla-card-add')
          ? '0 3px 14px rgba(0,0,0,0.08)'
          : '0 3px 14px rgba(0,0,0,0.13)';
      });

      if (el.hasAttribute('data-mezcla-open')) {
        var idx = parseInt(el.getAttribute('data-mezcla-open'), 10);
        el.addEventListener('click', function() {
          MezclaApp.openText(idx);
        });
      }

      if (el.hasAttribute('data-mezcla-add-custom')) {
        el.addEventListener('click', function() {
          MezclaApp.openCustomInput();
        });
      }
    });
  },

  // ─── View: custom text input form ────────────────────────────────────────────

  renderCustomInput: function() {
    var root = this._root();
    if (!root) return;

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;">',

        '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">',
          '<button data-mezcla-back style="',
            'background: var(--faint); border: 1px solid var(--border); color: var(--text);',
            'font-size: 1rem; cursor: pointer; padding: 8px 12px; border-radius: 8px;',
          '">← Назад</button>',
          '<div style="color: var(--text); font-weight: 700; font-size: 1.1rem;"><i data-lucide="file-plus-2" style="width:18px;height:18px;vertical-align:middle;stroke:var(--accent);margin-right:6px;"></i>Свой текст</div>',
        '</div>',

        '<div class="game-area" style="padding: 20px 22px;">',

          '<div style="margin-bottom: 16px;">',
            '<input id="mezcla-custom-title" type="text"',
              ' placeholder="Название (необязательно)"',
              ' style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:8px;',
                'border:1px solid var(--border);font-size:0.95rem;outline:none;',
                'background:var(--surface);color:var(--text);font-family:inherit;"',
            '>',
          '</div>',

          '<div style="margin-bottom: 6px; font-size: 0.82rem; color: var(--muted);">',
            'Вставь текст на русском <em>или</em> испанском — переведём автоматически',
          '</div>',

          '<textarea id="mezcla-custom-text"',
            ' placeholder="Вставь текст сюда...\n\nКаждый абзац или предложение на новой строке — это один блок."',
            ' rows="12"',
            ' style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:8px;',
              'border:1px solid var(--border);font-size:0.92rem;resize:vertical;outline:none;',
              'background:var(--surface);font-family:inherit;color:var(--text);line-height:1.7;margin-bottom:14px;"',
          '></textarea>',

          '<div id="mezcla-custom-error" style="',
            'display:none;font-size:0.85rem;color:var(--danger,#e74c3c);',
            'background:rgba(220,38,38,0.1);border:1px solid var(--danger,#e74c3c);',
            'border-radius:8px;padding:10px 14px;margin-bottom:14px;',
          '"></div>',

          '<div id="mezcla-translate-progress" style="',
            'display:none;font-size:0.88rem;color:var(--accent);',
            'padding:10px 0;text-align:center;margin-bottom:10px;',
          '">Переводим... ⏳</div>',

          '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">',
            '<button data-mezcla-back style="',
              'background:var(--faint);border:1px solid var(--border);color:var(--text);',
              'font-size:0.95rem;cursor:pointer;padding:10px 20px;',
              'border-radius:10px;font-family:inherit;font-weight:600;',
            '">← Назад</button>',
            '<button id="mezcla-translate-btn" style="',
              'border:none;color:white;cursor:pointer;',
              'padding:10px 22px;border-radius:10px;',
              'font-size:0.95rem;font-family:inherit;font-weight:600;',
              'background:var(--accent);',
              'box-shadow:0 3px 12px var(--accent-faint);',
            '">Перевести и создать →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
    lucide.createIcons();

    root.querySelectorAll('[data-mezcla-back]').forEach(function(btn) {
      btn.addEventListener('click', function() { MezclaApp.backToList(); });
    });

    var translateBtn = root.querySelector('#mezcla-translate-btn');
    if (translateBtn) {
      translateBtn.addEventListener('click', function() {
        MezclaApp.translateAndCreate();
      });
    }
  },

  // ─── View: text reading ──────────────────────────────────────────────────────

  renderText: function() {
    var root = this._root();
    if (!root) return;

    var state = MezclaApp.state;
    var text = MezclaApp._getCurrentText();
    if (!text) return;

    var pct = state.percentage;
    var tokens = state.expandedTokens;
    var esCount = state.tokenLangs.filter(function(l) { return l === 'es'; }).length;

    var html = [
      '<div style="max-width: 620px; margin: 0 auto;">',

        // ── Header
        '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">',
          '<button data-mezcla-back style="',
            'background: var(--faint); border: 1px solid var(--border); color: var(--text);',
            'font-size: 1rem; cursor: pointer; padding: 8px 12px; border-radius: 8px;',
          '">← Назад</button>',
          '<div>',
            '<div style="color: var(--text); font-weight: 700; font-size: 1.1rem;">' + _escHtmlM(text.title) + '</div>',
            '<div style="color: var(--muted); font-size: 0.8rem; font-style: italic;">' + _escHtmlM(text.titleEs) + '</div>',
          '</div>',
        '</div>',

        // ── Percentage control card
        '<div class="game-area" style="padding: 18px 20px; margin-bottom: 16px;">',

          '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">',
            '<span style="font-size: 0.85rem; color: var(--muted);">Испанских слов:</span>',
            '<span id="mezcla-pct-label" style="',
              'font-size: 1.3rem; font-weight: 700;',
              'color: ' + (pct === 0 ? 'var(--muted)' : pct === 100 ? '#27ae60' : 'var(--accent)') + ';',
            '">' + pct + '%</span>',
          '</div>',

          // Slider
          '<input type="range" id="mezcla-slider"',
            ' min="0" max="100" step="5" value="' + pct + '"',
            ' style="',
              'width: 100%; -webkit-appearance: none; height: 6px;',
              'background: linear-gradient(90deg, var(--accent) ' + pct + '%, var(--faint) ' + pct + '%);',
              'border-radius: 3px; outline: none; cursor: pointer;',
              'margin-bottom: 12px;',
            '"',
          '>',

          // Preset buttons
          '<div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 10px;">',
            [0, 25, 50, 75, 100].map(function(v) {
              var isActive = pct === v;
              return [
                '<button data-mezcla-pct="' + v + '" style="',
                  'padding: 5px 12px; border-radius: 16px; font-size: 0.8rem; font-weight: 600; cursor: pointer;',
                  'border: 2px solid ' + (isActive ? 'var(--accent)' : 'var(--border)') + ';',
                  'background: ' + (isActive ? 'var(--accent)' : 'var(--surface)') + ';',
                  'color: ' + (isActive ? 'white' : 'var(--muted)') + ';',
                  'transition: all 0.15s;',
                '">' + v + '%</button>',
              ].join('');
            }).join(''),
          '</div>',

          '<div style="display: flex; justify-content: space-between; align-items: center;">',
            '<span style="font-size: 0.78rem; color: var(--muted);">',
              esCount + ' исп. · ' + (tokens.length - esCount) + ' рус. · ' + tokens.length + ' всего',
            '</span>',
            '<button data-mezcla-reshuffle style="',
              'background: var(--accent-faint); border: 1px solid var(--border); color: var(--accent);',
              'border-radius: 8px; padding: 6px 14px; font-size: 0.82rem; cursor: pointer;',
              'font-weight: 600;',
            '"><i data-lucide="shuffle" style="width:13px;height:13px;vertical-align:middle;stroke:var(--accent);margin-right:4px;"></i>Перемешать</button>',
          '</div>',

        '</div>',

        // ── Text body
        '<div class="game-area" style="padding: 20px 22px; line-height: 2.2; font-size: 1.05rem;">',
          '<div id="mezcla-tokens">',
            this._buildTokensHtml(tokens, state.tokenLangs, state.activeTooltip),
          '</div>',
        '</div>',

        // ── Legend
        '<div style="',
          'display: flex; gap: 16px; justify-content: center; margin-top: 12px;',
          'font-size: 0.8rem; color: var(--muted);',
        '">',
          '<span>',
            '<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#3498db;vertical-align:middle;margin-right:4px;"></span>',
            'Испанский',
          '</span>',
          '<span>',
            '<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--faint);vertical-align:middle;margin-right:4px;"></span>',
            'Русский',
          '</span>',
          '<span style="opacity:0.6;">· нажми чтобы увидеть перевод</span>',
        '</div>',

      '</div>',
    ].join('');

    root.innerHTML = html;
    lucide.createIcons();
    this._attachSliderStyle();

    // Attach event listeners (no inline onclick)
    var backBtn = root.querySelector('[data-mezcla-back]');
    if (backBtn) {
      backBtn.addEventListener('click', function() { MezclaApp.backToList(); });
    }

    var reshuffleBtn = root.querySelector('[data-mezcla-reshuffle]');
    if (reshuffleBtn) {
      reshuffleBtn.addEventListener('click', function() { MezclaApp.reshuffle(); });
    }

    root.querySelectorAll('[data-mezcla-pct]').forEach(function(btn) {
      var val = parseInt(btn.getAttribute('data-mezcla-pct'), 10);
      btn.addEventListener('click', function() { MezclaApp.setPercentage(val); });
    });

    var slider = document.getElementById('mezcla-slider');
    if (slider) {
      slider.addEventListener('input', function() { MezclaApp.setPercentage(this.value); });
    }
  },

  // ─── Build token HTML ────────────────────────────────────────────────────────

  _buildTokensHtml: function(tokens, tokenLangs, activeTooltip) {
    return tokens.map(function(token, i) {
      var lang = tokenLangs[i];
      var isEs = lang === 'es';
      var displayText = token[lang];
      var otherLang = isEs ? 'ru' : 'es';
      var tooltipText = (isEs ? token.ruSent : token.esSent) || token[otherLang];
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
          ? 'background: var(--accent-faint); color: var(--accent); font-weight: 600; border-bottom: 2px solid var(--accent);'
          : 'background: var(--faint); color: var(--text); border-bottom: 2px solid transparent;',
      ].join(' ');

      var tooltipHtml = showTooltip ? [
        '<span style="',
          'position: absolute;',
          'bottom: calc(100% + 6px);',
          'left: 50%; transform: translateX(-50%);',
          'background: var(--text);',
          'color: var(--bg);',
          'font-size: 0.78rem;',
          'padding: 6px 10px;',
          'border-radius: 6px;',
          'white-space: normal;',
          'max-width: 260px;',
          'width: max-content;',
          'z-index: 10;',
          'font-weight: 400;',
          'pointer-events: none;',
          'box-shadow: 0 2px 8px rgba(0,0,0,0.3);',
          'line-height: 1.4;',
          'text-align: left;',
        '">',
          (isEs ? 'RU: ' : 'ES: ') + _escHtmlM(tooltipText),
        '</span>',
      ].join('') : '';

      return [
        '<span',
          ' data-mezcla-token="' + i + '"',
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
    var tokens = state.expandedTokens;
    if (!tokens || tokens.length === 0) return;

    var container = document.getElementById('mezcla-tokens');
    if (!container) return;

    container.innerHTML = this._buildTokensHtml(tokens, state.tokenLangs, state.activeTooltip);

    // Re-attach token click listeners
    container.querySelectorAll('[data-mezcla-token]').forEach(function(el) {
      var idx = parseInt(el.getAttribute('data-mezcla-token'), 10);
      el.addEventListener('click', function() { MezclaApp.tapToken(idx); });
    });
  },

  // ─── Attach token listeners (called after renderText) ───────────────────────

  _attachTokenListeners: function() {
    var container = document.getElementById('mezcla-tokens');
    if (!container) return;
    container.querySelectorAll('[data-mezcla-token]').forEach(function(el) {
      var idx = parseInt(el.getAttribute('data-mezcla-token'), 10);
      el.addEventListener('click', function() { MezclaApp.tapToken(idx); });
    });
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
      // Responsive: stack textareas on small screens
      '@media (max-width: 499px) {',
        '#mezcla-custom-areas { flex-direction: column !important; }',
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
