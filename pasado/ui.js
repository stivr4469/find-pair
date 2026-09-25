/**
 * Spanish Trainer — Прошедшее время
 * UI Renderer: all views injected into #pasado-content
 */

// ─── Inject shared styles (animations, inline options) ───────────────────────

(function injectPasadoStyles() {
  if (document.getElementById('pasado-ui-styles')) return;
  var style = document.createElement('style');
  style.id = 'pasado-ui-styles';
  style.textContent = [
    '@keyframes pasadoShake {',
    '  0%,100%{transform:translateX(0)}',
    '  20%{transform:translateX(-8px)}',
    '  40%{transform:translateX(8px)}',
    '  60%{transform:translateX(-6px)}',
    '  80%{transform:translateX(6px)}',
    '}',
    '@keyframes pasadoBounce {',
    '  0%{transform:scale(1)}',
    '  30%{transform:scale(1.12)}',
    '  60%{transform:scale(0.96)}',
    '  100%{transform:scale(1)}',
    '}',
    '@keyframes pasadoFadeIn {',
    '  from{opacity:0;transform:translateY(18px)}',
    '  to{opacity:1;transform:translateY(0)}',
    '}',
    '@keyframes pasadoPulse {',
    '  0%{box-shadow:0 0 0 0 rgba(39,174,96,0.5)}',
    '  70%{box-shadow:0 0 0 10px rgba(39,174,96,0)}',
    '  100%{box-shadow:0 0 0 0 rgba(39,174,96,0)}',
    '}',
    '.pasado-anim-in{animation:vm-enter var(--dur-normal) var(--ease-out) both}',
    '.pasado-shake{animation:pasadoShake 0.35s ease}',
    '.pasado-bounce{animation:pasadoBounce 0.4s ease}',
    '.pasado-pulse{animation:pasadoPulse 0.5s ease}',

    // TTS button
    '.pasado-tts-btn{',
    '  display:inline-flex;align-items:center;justify-content:center;',
    '  width:34px;height:34px;border-radius:50%;border:none;',
    '  background:var(--accent-faint);color:var(--accent);',
    '  cursor:pointer;font-size:1.1rem;transition:background 0.2s,transform 0.15s;',
    '  flex-shrink:0;vertical-align:middle;',
    '}',
    '.pasado-tts-btn:hover{background:var(--accent-mid);transform:scale(1.1)}',
    '.pasado-tts-btn:active{transform:scale(0.95)}',

    // Inline options
    '.pasado-inline-opts{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;flex-wrap:wrap;}',
    '.pasado-inline-btn{',
    '  display:inline-block;padding:4px 13px;border-radius:16px;',
    '  border:2px solid var(--border);background:var(--surface);cursor:pointer;',
    '  font-size:0.95rem;font-weight:600;vertical-align:middle;',
    '  transition:background-color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);color:var(--text);line-height:1.4;',
    '  font-family:inherit;',
    '}',
    '.pasado-inline-btn:hover:not(:disabled){background:var(--accent-faint);border-color:var(--accent);color:var(--accent);transform:scale(1.06)}',
    '.pasado-inline-btn:disabled{cursor:not-allowed;opacity:0.7}',
    '.pasado-inline-btn.pib-correct{background:#27ae60!important;border-color:#27ae60!important;color:white!important}',
    '.pasado-inline-btn.pib-wrong{background:#e74c3c!important;border-color:#e74c3c!important;color:white!important}',
    '.inline-question-text{line-height:2.4;font-size:1.15rem;font-weight:600;color:var(--text);text-align:center;}',

    // Classify zones
    '.pasado-classify-zone{',
    '  padding:14px 8px;border-radius:12px;border:2.5px solid transparent;',
    '  cursor:pointer;transition:background-color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);',
    '  font-size:0.82rem;font-weight:700;text-align:center;',
    '  text-transform:uppercase;letter-spacing:0.05em;',
    '  user-select:none;-webkit-user-select:none;',
    '  font-family:inherit;color:inherit;background:transparent;',
    '}',
    '.pasado-classify-zone:hover{transform:translateY(-3px);filter:brightness(1.06)}',
    '.pasado-classify-zone:active{transform:scale(0.97)}',
    '.pcz-indefinido{background:rgba(231,76,60,0.13);color:#e74c3c;border-color:#e74c3c}',
    '.pcz-imperfecto{background:rgba(52,152,219,0.13);color:#3498db;border-color:#3498db}',
    '.pcz-perfecto{background:rgba(39,174,96,0.13);color:#27ae60;border-color:#27ae60}',
    '.pcz-pluscuamperfecto{background:rgba(155,89,182,0.13);color:#9b59b6;border-color:#9b59b6}',
    '.pcz-indefinido:hover{background:rgba(231,76,60,0.22)}',
    '.pcz-imperfecto:hover{background:rgba(52,152,219,0.22)}',
    '.pcz-perfecto:hover{background:rgba(39,174,96,0.22)}',
    '.pcz-pluscuamperfecto:hover{background:rgba(155,89,182,0.22)}',
    '.pcz-correct{filter:brightness(0.95);transform:scale(1.04)!important}',
    '.pcz-wrong{opacity:0.5}',

    // Streak badge
    '.pasado-streak{',
    '  display:inline-flex;align-items:center;gap:5px;',
    '  background:linear-gradient(135deg,#ff6b35,#f7c59f);',
    '  color:white;padding:4px 12px;border-radius:20px;',
    '  font-size:0.82rem;font-weight:700;',
    '}',

    // Progress bar
    '.pasado-prog-bar{height:6px;background:var(--faint);border-radius:3px;overflow:hidden;margin-bottom:14px;}',
    '.pasado-prog-fill{height:100%;width:100%;border-radius:0;transform:scaleX(0);transform-origin:left center;transition:transform var(--dur-slow) var(--ease-out);background:var(--accent)}',

    // Card thumb hover
    '.pasado-card-thumb{transition:transform 0.2s,box-shadow 0.2s;}',

    // Contrast mode
    '.pct-card{background:var(--surface);border-radius:16px;box-shadow:var(--shadow);',
    '  border:1px solid var(--border);padding:20px 20px 16px;margin-bottom:16px;animation:pasadoFadeIn 0.3s ease both}',
    '.pct-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}',
    '@media(max-width:500px){.pct-pair{grid-template-columns:1fr}}',
    '.pct-half{border-radius:12px;padding:14px 14px 12px;}',
    '.pct-half-indef{background:rgba(231,76,60,0.09);border:1.5px solid rgba(231,76,60,0.35)}',
    '.pct-half-imp{background:rgba(52,152,219,0.09);border:1.5px solid rgba(52,152,219,0.35)}',
    '.pct-badge{display:inline-block;font-size:0.65rem;font-weight:700;letter-spacing:0.08em;',
    '  text-transform:uppercase;padding:2px 8px;border-radius:6px;margin-bottom:8px;}',
    '.pct-badge-indef{background:rgba(231,76,60,0.18);color:#c0392b}',
    '.pct-badge-imp{background:rgba(52,152,219,0.18);color:#1a78c2}',
    '.pct-es{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:5px;line-height:1.4}',
    '.pct-ru{font-size:0.82rem;color:var(--muted);font-style:italic;line-height:1.4}',
    '.pct-signal{background:rgba(234,179,8,0.13);border:1px solid rgba(234,179,8,0.4);border-radius:8px;',
    '  padding:8px 12px;margin-bottom:10px;font-size:0.82rem;color:var(--text);}',
    '.pct-signal-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;',
    '  color:rgba(161,125,0,0.85);margin-bottom:3px;}',
    '.pct-signal-val{font-family:monospace;font-weight:600;word-break:break-word;}',
    '.pct-rule{font-size:0.82rem;color:var(--muted);line-height:1.5}',
    '.pct-nav{display:flex;align-items:center;justify-content:space-between;margin-top:14px;gap:8px}',
    '.pct-nav-btn{background:var(--faint);border:1.5px solid var(--border);border-radius:10px;',
    '  padding:9px 18px;font-size:0.9rem;font-weight:700;cursor:pointer;color:var(--text);',
    '  transition:background 0.15s,border-color 0.15s;font-family:inherit}',
    '.pct-nav-btn:hover{background:var(--accent-faint);border-color:var(--accent);color:var(--accent)}',
    '.pct-nav-btn:disabled{opacity:0.35;cursor:default}',
    '.pct-counter{font-size:0.82rem;color:var(--muted);font-weight:600}'
  ].join('\n');
  document.head.appendChild(style);
})();

var PASADO_ICONS = [
  { icon: 'list',            color: '#e74c3c', bg: 'rgba(231,76,60,0.15)'   }, // 1  Indefinido -AR
  { icon: 'list-plus',       color: '#c0392b', bg: 'rgba(192,57,43,0.15)'   }, // 2  Indefinido -ER/-IR
  { icon: 'zap',             color: '#e74c3c', bg: 'rgba(231,76,60,0.15)'   }, // 3  Indefinido нерег.
  { icon: 'git-merge',       color: '#c0392b', bg: 'rgba(192,57,43,0.15)'   }, // 4  Indefinido stem
  { icon: 'repeat-2',        color: '#3498db', bg: 'rgba(52,152,219,0.15)'  }, // 5  Imperfecto -AR
  { icon: 'droplets',        color: '#1a78c2', bg: 'rgba(26,120,194,0.15)'  }, // 6  Imperfecto -ER/-IR
  { icon: 'eye',             color: '#3498db', bg: 'rgba(52,152,219,0.15)'  }, // 7  Imperfecto нерег.
  { icon: 'help-circle',     color: '#1a78c2', bg: 'rgba(26,120,194,0.15)'  }, // 8  Когда Imperfecto?
  { icon: 'key',             color: '#27ae60', bg: 'rgba(39,174,96,0.15)'   }, // 9  Perfecto haber
  { icon: 'file-text',       color: '#1e8449', bg: 'rgba(30,132,73,0.15)'   }, // 10 Perfecto причастия
  { icon: 'alert-circle',    color: '#27ae60', bg: 'rgba(39,174,96,0.15)'   }, // 11 Perfecto нестанд.
  { icon: 'calendar-check',  color: '#1e8449', bg: 'rgba(30,132,73,0.15)'   }, // 12 Когда Perfecto?
  { icon: 'layers',          color: '#9b59b6', bg: 'rgba(155,89,182,0.15)'  }, // 13 Pluscuam. образование
  { icon: 'skip-back',       color: '#7d3c98', bg: 'rgba(125,60,152,0.15)'  }, // 14 Pluscuam. употребление
  { icon: 'link-2',          color: '#9b59b6', bg: 'rgba(155,89,182,0.15)'  }, // 15 Pluscuam. нестанд.
  { icon: 'bar-chart-2',     color: '#7d3c98', bg: 'rgba(125,60,152,0.15)'  }, // 16 Сравнение 4 времён
];

const PasadoUI = {

  _root: function() {
    return document.getElementById('pasado-content');
  },

  // ─── View: list ──────────────────────────────────────────────────────────────

  renderFormulaList: function() {
    var root = this._root();
    if (!root) return;

    var groups = [
      { label: 'Indefinido',         icon: 'check-circle-2', color: '#e74c3c', bg: 'rgba(231,76,60,0.18)',  from: 0,  to: 3  },
      { label: 'Imperfecto',          icon: 'repeat-2',       color: '#3498db', bg: 'rgba(52,152,219,0.18)', from: 4,  to: 7  },
      { label: 'Perfecto Compuesto',  icon: 'calendar-check', color: '#27ae60', bg: 'rgba(39,174,96,0.18)',  from: 8,  to: 11 },
      { label: 'Pluscuamperfecto',    icon: 'history',        color: '#9b59b6', bg: 'rgba(155,89,182,0.18)', from: 12, to: 15 },
    ];

    var sectionsHtml = groups.map(function(g) {
      var cardsHtml = '';
      for (var i = g.from; i <= g.to; i++) {
        var formula = PASADO_DATA[i];
        var ico = PASADO_ICONS[i];
        cardsHtml += [
          '<button type="button" class="pasado-card-thumb" onclick="pasadoShowCard(' + i + ')" style="',
            'background:var(--surface);border-radius:12px;padding:16px 14px;cursor:pointer;',
            'box-shadow:var(--shadow);border:1px solid var(--border);',
            'display:flex;flex-direction:column;gap:6px;',
            'font-family:inherit;color:inherit;text-align:left;',
          '">',
            '<div style="width:40px;height:40px;border-radius:10px;background:' + ico.color + ';opacity:0.82;margin-bottom:2px;flex-shrink:0;"></div>',
            '<div style="font-weight:700;font-size:0.82rem;color:var(--text);">' + _escHtmlP(formula.shortName) + '</div>',
            '<div style="background:var(--accent-faint);color:var(--accent);font-size:0.7rem;padding:3px 7px;',
              'border-radius:5px;font-family:monospace;line-height:1.3;word-break:break-word;">',
              _escHtmlP(formula.rule.split('|')[0].trim()),
            '</div>',
          '</button>',
        ].join('');
      }

      return [
        '<div style="margin-bottom:24px;">',
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">',
            '<span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:' + g.color + ';opacity:0.85;flex-shrink:0;"></span>',
            '<span style="font-size:0.82rem;font-weight:700;text-transform:uppercase;',
              'letter-spacing:0.08em;color:var(--text);">' + g.label + '</span>',
          '</div>',
          '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;">',
            cardsHtml,
          '</div>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width:700px;margin:0 auto;padding:0 4px;" class="pasado-anim-in view-enter">',


        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">',
          '<button onclick="pasadoStartAllQuiz()" style="',
            'display:flex;flex-direction:column;align-items:center;gap:4px;',
            'padding:12px 8px;border:1.5px solid var(--border);border-radius:12px;',
            'background:var(--surface);color:var(--text);cursor:pointer;text-align:center;',
            'box-shadow:var(--shadow);transition:background 0.15s,border-color 0.15s;" ',
            'onmouseover="this.style.background=\'var(--accent-faint)\';this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.background=\'var(--surface)\';this.style.borderColor=\'var(--border)\'">',
            '<span style="font-weight:700;font-size:0.82rem;">Полный тест</span>',
            '<span style="font-size:0.7rem;opacity:0.7;">96 вопросов</span>',
          '</button>',
          '<button onclick="pasadoStartInline()" style="',
            'display:flex;flex-direction:column;align-items:center;gap:4px;',
            'padding:12px 8px;border:1.5px solid var(--border);border-radius:12px;',
            'background:var(--surface);color:var(--text);cursor:pointer;text-align:center;',
            'box-shadow:var(--shadow);transition:background 0.15s,border-color 0.15s;" ',
            'onmouseover="this.style.background=\'var(--accent-faint)\';this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.background=\'var(--surface)\';this.style.borderColor=\'var(--border)\'">',
            '<span style="font-weight:700;font-size:0.82rem;">Inline режим</span>',
            '<span style="font-size:0.7rem;color:var(--muted);">28 предложений</span>',
          '</button>',
        '</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;">',
          '<button onclick="pasadoStartClassify()" style="',
            'display:flex;flex-direction:column;align-items:center;gap:4px;',
            'padding:12px 8px;border:1.5px solid var(--border);border-radius:12px;',
            'background:var(--surface);color:var(--text);cursor:pointer;text-align:center;',
            'box-shadow:var(--shadow);transition:background 0.15s,border-color 0.15s;" ',
            'onmouseover="this.style.background=\'var(--accent-faint)\';this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.background=\'var(--surface)\';this.style.borderColor=\'var(--border)\'">',
            '<span style="font-weight:700;font-size:0.82rem;">Классификация</span>',
            '<span style="font-size:0.7rem;color:var(--muted);">48 примеров</span>',
          '</button>',
          '<button onclick="pasadoStartContrast()" style="',
            'display:flex;flex-direction:column;align-items:center;gap:4px;',
            'padding:12px 8px;border:1.5px solid var(--border);border-radius:12px;',
            'background:var(--surface);color:var(--text);cursor:pointer;text-align:center;',
            'box-shadow:var(--shadow);transition:background 0.15s,border-color 0.15s;" ',
            'onmouseover="this.style.background=\'var(--accent-faint)\';this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.background=\'var(--surface)\';this.style.borderColor=\'var(--border)\'">',
            '<span style="font-weight:700;font-size:0.82rem;">Контраст</span>',
            '<span style="font-size:0.7rem;color:var(--muted);">Indef. vs Imp. · 15 пар</span>',
          '</button>',
        '</div>',

        sectionsHtml,

      '</div>',
    ].join('');

    root.innerHTML = html;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    root.querySelectorAll('.pasado-card-thumb').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.transform = 'translateY(-4px)';
        el.style.borderColor = 'var(--accent)';
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
        el.style.borderColor = 'var(--border)';
        el.style.boxShadow = 'var(--shadow)';
      });
    });
  },

  // ─── View: formula card ──────────────────────────────────────────────────────

  renderFormulaCard: function(formula, index) {
    var root = this._root();
    if (!root) return;

    var isFirst = index === 0;
    var isLast  = index === PASADO_DATA.length - 1;

    var extraExamples = formula.examples.map(function(ex) {
      return [
        '<div style="',
          'padding: 10px 14px;',
          'background: var(--faint);',
          'border-left: 3px solid var(--accent);',
          'border-radius: 0 8px 8px 0;',
          'margin-bottom: 8px;',
          'display: flex; align-items: flex-start; gap: 8px;',
        '">',
          '<div style="flex: 1;">',
            '<div style="font-size: 1rem; color: var(--text); font-weight: 600;">' + _escHtmlP(ex.es) + '</div>',
            '<div style="font-size: 0.85rem; color: var(--muted); margin-top: 2px;">' + _escHtmlP(ex.ru) + '</div>',
          '</div>',
          '<button class="pasado-tts-btn" data-tts="' + _escHtmlP(ex.es) + '" onclick="speakSpanish(this.dataset.tts)" title="Прослушать">' + (window.ICON_VOL||'') + '</button>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;" class="pasado-anim-in view-enter">',
        '<div class="game-area" style="padding: 24px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">',
            '<span style="',
              'background: var(--accent);',
              'color: white; padding: 4px 14px; border-radius: 20px;',
              'font-size: 0.8rem; font-weight: 700;',
            '">Формула ' + formula.id + ' / 16</span>',
            '<div style="width:28px;height:28px;border-radius:8px;background:' + PASADO_ICONS[index].bg + ';flex-shrink:0;"></div>',
          '</div>',

          '<h2 style="color: var(--text); margin-bottom: 6px; font-size: 1.3rem;">' + _escHtmlP(formula.name) + '</h2>',
          '<p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 16px;">' + _escHtmlP(formula.description) + '</p>',

          '<div style="',
            'background: var(--accent-faint); border: 1.5px solid var(--accent-mid);',
            'border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;',
          '">',
            '<div style="font-size: 0.75rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Правило</div>',
            '<div style="font-family: monospace; font-size: 0.9rem; color: var(--text); font-weight: 600; white-space: pre-wrap; word-break: break-word;">' + _escHtmlP(formula.rule) + '</div>',
          '</div>',

          '<div style="',
            'background: var(--faint);',
            'border-radius: 10px; padding: 16px; text-align: center; margin-bottom: 16px;',
            'display: flex; align-items: center; justify-content: center; gap: 10px;',
          '">',
            '<div>',
              '<div style="font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 4px;">' + _escHtmlP(formula.example) + '</div>',
              '<div style="font-size: 0.9rem; color: var(--muted); font-style: italic;">' + _escHtmlP(formula.exampleRu) + '</div>',
            '</div>',
            '<button class="pasado-tts-btn" data-tts="' + _escHtmlP(formula.example) + '" onclick="speakSpanish(this.dataset.tts)" title="Прослушать пример" style="background:rgba(52,152,219,0.18);">' + (window.ICON_VOL||'') + '</button>',
          '</div>',

          '<div style="margin-bottom: 20px;">',
            '<div style="font-size: 0.78rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Примеры</div>',
            extraExamples,
          '</div>',

          '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px;">',

            '<button onclick="pasadoBackToList()" class="menu-button" style="width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;">',
              '← Все темы',
            '</button>',

            (!isFirst ? [
              '<button onclick="pasadoShowPrev()" class="menu-button" style="',
                'width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;',
                'background: var(--faint);',
              '">← Пред.</button>',
            ].join('') : ''),

            '<button onclick="pasadoStartQuiz(' + index + ')" class="next-button" style="width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;">',
              'Тест →',
            '</button>',

            (!isLast ? [
              '<button onclick="pasadoShowNext()" class="menu-button" style="',
                'width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;',
                'background: var(--accent); color: white;',
              '">След. →</button>',
            ].join('') : ''),

          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // ─── View: quiz question ─────────────────────────────────────────────────────

  renderQuiz: function(question, formulaName, formulaEmoji, qIndex, total, score, progressLabel) {
    var root = this._root();
    if (!root) return;

    var ttsSpanish = question.ttsText || '';
    var questionBodyHtml;

    if (question.before !== undefined) {
      var optBtnsHtml = question.options.map(function(opt, i) {
        return '<button class="pasado-inline-btn" id="pasado-opt-' + i + '" onclick="pasadoHandleAnswer(' + i + ')">' + _escHtmlP(opt) + '</button>';
      }).join('');
      var blankHtml = '<span id="pasado-blank" style="display:inline-block;min-width:72px;border-bottom:2px solid var(--accent);color:var(--muted);padding:0 4px;text-align:center;">___</span>';
      var sentenceHtml = _escHtmlP(question.before) + ' ' + blankHtml +
        (question.after ? ' ' + _escHtmlP(question.after) : '');
      questionBodyHtml = [
        '<div style="background:var(--faint);border-radius:10px;padding:18px 16px;text-align:center;margin-bottom:16px;">',
          '<div style="font-size:0.82rem;color:var(--accent);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">Выбери правильную форму</div>',
          '<div class="inline-question-text" style="margin-bottom:18px;">' + sentenceHtml + '</div>',
          '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;" id="pasado-inline-opts" class="stagger">' + optBtnsHtml + '</div>',
        '</div>',
      ].join('');
    } else {
      var optionLabels = ['A', 'B', 'C', 'D'];
      var optionsHtml = question.options.map(function(option, i) {
        return [
          '<button',
            ' id="pasado-opt-' + i + '"',
            ' onclick="pasadoHandleAnswer(' + i + ')"',
            ' style="',
              'display: flex; align-items: center; gap: 12px;',
              'width: 100%; padding: 13px 16px;',
              'border: 2px solid var(--border); border-radius: 10px;',
              'background: var(--surface); cursor: pointer;',
              'transition: border-color 0.2s, background 0.2s;',
              'text-align: left; font-size: 0.95rem; font-family: inherit; color: var(--text);',
            '"',
          '>',
            '<span style="',
              'display: inline-flex; align-items: center; justify-content: center;',
              'width: 28px; height: 28px; border-radius: 50%;',
              'background: var(--accent-faint); color: var(--accent);',
              'font-weight: 700; font-size: 0.8rem; flex-shrink: 0;',
            '">' + optionLabels[i] + '</span>',
            '<span>' + _escHtmlP(option) + '</span>',
          '</button>',
        ].join('');
      }).join('');
      questionBodyHtml = [
        '<div style="',
          'font-size: 1.15rem; font-weight: 700; color: var(--text);',
          'text-align: center; margin-bottom: 8px; line-height: 1.5;',
          'display: flex; align-items: center; justify-content: center; gap: 8px;',
        '">',
          '<span>' + _escHtmlP(question.question) + '</span>',
          (ttsSpanish ? '<button class="pasado-tts-btn" data-tts="' + _escHtmlP(ttsSpanish) + '" onclick="speakSpanish(this.dataset.tts)" title="Прослушать">' + (window.ICON_VOL||'') + '</button>' : ''),
        '</div>',
        '<div id="pasado-options" class="stagger" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">',
          optionsHtml,
        '</div>',
      ].join('');
    }

    var html = [
      '<div style="max-width: 600px; margin: 0 auto; padding-bottom: 80px;" class="pasado-anim-in view-enter">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">',
            '<span style="',
              'background: var(--accent);',
              'color: white; padding: 4px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;',
            '">' + _escHtmlP(formulaName) + '</span>',
            '<button onclick="pasadoBackToList()" style="background: none; border: none; color: var(--muted); cursor: pointer; font-size: 1.2rem; padding: 4px;" title="К списку">✕</button>',
          '</div>',

          '<div style="margin-bottom: 4px; font-size: 0.85rem; color: var(--muted);">',
            (progressLabel || ('Вопрос ' + (qIndex + 1) + ' из ' + total)),
          '</div>',

          questionBodyHtml,

          '<div id="pasado-feedback" style="display: none;"></div>',

          '<div id="pasado-next-wrap" style="display: none; text-align: center; margin-top: 14px;">',
            '<button onclick="pasadoNext()" class="next-button quiz-next-fixed">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;

    if (question.before === undefined) {
      root.querySelectorAll('[id^="pasado-opt-"]').forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
          if (!btn.disabled) {
            btn.style.borderColor = 'var(--accent)';
            btn.style.background = 'var(--accent-faint)';
          }
        });
        btn.addEventListener('mouseleave', function() {
          if (!btn.disabled && !btn.classList.contains('correct') && !btn.classList.contains('incorrect')) {
            btn.style.borderColor = 'var(--border)';
            btn.style.background = 'var(--surface)';
          }
        });
      });
    }
  },

  // ─── Quiz feedback ───────────────────────────────────────────────────────────

  showAnswerFeedback: function(selectedIndex, correctIndex, hint, correctText) {
    var root = this._root();
    if (!root) return;

    var optionBtns = root.querySelectorAll('[id^="pasado-opt-"]');
    optionBtns.forEach(function(btn) {
      btn.disabled = true;
      btn.style.cursor = 'default';
    });

    var correctBtn = root.querySelector('#pasado-opt-' + correctIndex);
    if (correctBtn) {
      correctBtn.style.borderColor = '#27ae60';
      correctBtn.style.background = '#d4edda';
      correctBtn.style.color = '#155724';
      correctBtn.classList.add('pasado-bounce');
    }

    var isCorrect = selectedIndex === correctIndex;

    if (!isCorrect) {
      var wrongBtn = root.querySelector('#pasado-opt-' + selectedIndex);
      if (wrongBtn) {
        wrongBtn.style.borderColor = '#e74c3c';
        wrongBtn.style.background = '#f8d7da';
        wrongBtn.style.color = '#721c24';
        wrongBtn.classList.add('pasado-shake');
      }
    }

    var feedbackEl = root.querySelector('#pasado-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.style.padding = '12px 16px';
      feedbackEl.style.borderRadius = '8px';
      feedbackEl.style.marginTop = '8px';
      feedbackEl.style.fontSize = '0.9rem';
      feedbackEl.style.lineHeight = '1.5';

      var ttsBtn = correctText
        ? ' <button class="pasado-tts-btn" data-tts="' + _escHtmlP(correctText) + '" onclick="speakSpanish(this.dataset.tts)" title="Прослушать" style="margin-left:6px;">' + (window.ICON_VOL||'') + '</button>'
        : '';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<span style="color:#22c55e;font-weight:700;">Верно!</span> ' + _escHtmlP(hint) + ttsBtn;
        if (correctText && typeof speakSpanish === 'function') {
          speakSpanish(correctText);
        }
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<span style="color:#ef4444;font-weight:700;">Неверно.</span> ' + _escHtmlP(hint) + ttsBtn;
        if (correctText && typeof speakSpanish === 'function') {
          setTimeout(function() { speakSpanish(correctText); }, 600);
        }
      }
    }

    var blankEl = root.querySelector('#pasado-blank');
    if (blankEl && correctText) {
      blankEl.textContent = correctText;
      blankEl.style.borderBottomColor = '#27ae60';
      blankEl.style.color = '#27ae60';
      blankEl.style.fontWeight = '700';
    }

    var nextWrap = root.querySelector('#pasado-next-wrap');
    if (nextWrap) nextWrap.style.display = 'block';
  },

  // ─── View: Inline fill-in-the-blank ──────────────────────────────────────────

  renderInlineQuestion: function(item, qIndex, total, score, streak) {
    var root = this._root();
    if (!root) return;

    var shuffled = (typeof shuffleArray === 'function') ? shuffleArray(item.options.slice()) : item.options.slice();
    var pct = total > 0 ? Math.round((qIndex / total) * 100) : 0;

    var optBtnsHtml = shuffled.map(function(opt) {
      return '<button class="pasado-inline-btn" data-val="' + _escHtmlP(opt) + '" onclick="window.pasadoInlineAnswer(this.dataset.val)">' + _escHtmlP(opt) + '</button>';
    }).join('');

    var blankHtml = '<span id="pasado-inline-blank" style="display:inline-block;min-width:72px;border-bottom:2px solid var(--accent);color:var(--muted);padding:0 4px;text-align:center;">___</span>';
    var sentenceHtml = _escHtmlP(item.before) + ' ' + blankHtml +
      (item.after ? ' ' + _escHtmlP(item.after) : '');

    var html = [
      '<div style="max-width: 620px; margin: 0 auto; padding-bottom: 80px;" class="pasado-anim-in view-enter">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">',
            '<span style="background:var(--accent);color:white;padding:4px 14px;border-radius:20px;font-size:0.78rem;font-weight:700;display:inline-flex;align-items:center;">Inline режим</span>',
            '<button onclick="pasadoBackToList()" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.2rem;padding:4px;" title="К списку">✕</button>',
          '</div>',

          '<div style="margin-bottom:4px;font-size:0.85rem;color:var(--muted);">Вопрос ' + (qIndex + 1) + ' из ' + total + '</div>',

          '<div style="background:var(--faint);border-radius:10px;padding:18px 16px;text-align:center;margin-bottom:18px;">',
            '<div style="font-size:0.82rem;color:var(--accent);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">Выбери правильную форму</div>',
            '<div class="inline-question-text" style="margin-bottom:18px;">' + sentenceHtml + '</div>',
            '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;" id="pasado-inline-opts" class="stagger">' + optBtnsHtml + '</div>',
          '</div>',

          '<div id="pasado-inline-feedback" style="display:none;"></div>',

          '<div id="pasado-inline-next" style="display:none;text-align:center;margin-top:14px;">',
            '<button onclick="pasadoNext()" class="next-button quiz-next-fixed">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  showInlineFeedback: function(selectedVal, correctVal, hint, tts) {
    var root = this._root();
    if (!root) return;

    // Disable all inline buttons and mark them
    var btns = root.querySelectorAll('.pasado-inline-btn');
    btns.forEach(function(btn) {
      btn.disabled = true;
      if (btn.getAttribute('data-val') === correctVal) {
        btn.classList.add('pib-correct', 'pasado-bounce');
      } else if (btn.getAttribute('data-val') === selectedVal && selectedVal !== correctVal) {
        btn.classList.add('pib-wrong', 'pasado-shake');
      }
    });

    var isCorrect = selectedVal === correctVal;
    var feedbackEl = root.querySelector('#pasado-inline-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.style.padding = '12px 16px';
      feedbackEl.style.borderRadius = '8px';
      feedbackEl.style.marginTop = '4px';
      feedbackEl.style.fontSize = '0.9rem';
      feedbackEl.style.lineHeight = '1.5';

      var ttsBtn = tts ? ' <button class="pasado-tts-btn" data-tts="' + _escHtmlP(tts) + '" onclick="speakSpanish(this.dataset.tts)" title="Прослушать">' + (window.ICON_VOL||'') + '</button>' : '';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<span style="color:#22c55e;font-weight:700;">Верно!</span> ' + _escHtmlP(hint) + ttsBtn;
        if (tts && typeof speakSpanish === 'function') speakSpanish(tts);
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<span style="color:#ef4444;font-weight:700;">Неверно.</span> Правильно: <strong>' + _escHtmlP(correctVal) + '</strong>. ' + _escHtmlP(hint) + ttsBtn;
        if (tts && typeof speakSpanish === 'function') setTimeout(function() { speakSpanish(tts); }, 600);
      }
    }

    var inlineBlankEl = root.querySelector('#pasado-inline-blank');
    if (inlineBlankEl) {
      inlineBlankEl.textContent = correctVal;
      inlineBlankEl.style.borderBottomColor = '#27ae60';
      inlineBlankEl.style.color = '#27ae60';
      inlineBlankEl.style.fontWeight = '700';
    }

    var nextEl = root.querySelector('#pasado-inline-next');
    if (nextEl) nextEl.style.display = 'block';
  },

  // ─── View: Classify ──────────────────────────────────────────────────────────

  renderClassifyQuestion: function(item, qIndex, total, score, streak) {
    var root = this._root();
    if (!root) return;

    var zones = [
      { key: 'indefinido',       label: 'Indefinido',       cls: 'pcz-indefinido',       iconName: 'check-circle-2', iconColor: '#e74c3c', iconBg: '#fff0f0' },
      { key: 'imperfecto',       label: 'Imperfecto',       cls: 'pcz-imperfecto',       iconName: 'repeat-2',       iconColor: '#3498db', iconBg: '#eff5ff' },
      { key: 'perfecto',         label: 'Perfecto Comp.',   cls: 'pcz-perfecto',         iconName: 'calendar-check', iconColor: '#27ae60', iconBg: '#f0fff4' },
      { key: 'pluscuamperfecto', label: 'Pluscuamperf.',    cls: 'pcz-pluscuamperfecto', iconName: 'history',        iconColor: '#9b59b6', iconBg: '#f5f0ff' },
    ];

    var zonesHtml = zones.map(function(z) {
      return [
        '<button type="button" class="pasado-classify-zone ' + z.cls + '" id="pclz-' + z.key + '" data-key="' + z.key + '"',
        ' onclick="window.pasadoClassifyAnswer(this.dataset.key)">',
        '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;background:' + z.iconBg + ';margin-bottom:4px;">',
        '<span style="width:12px;height:12px;border-radius:50%;background:' + z.iconColor + ';flex-shrink:0;"></span>',
        '</span><br>' + z.label,
        '</button>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto; padding-bottom: 80px;" class="pasado-anim-in view-enter">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">',
            '<span style="background:var(--accent);color:white;padding:4px 14px;border-radius:20px;font-size:0.78rem;font-weight:700;display:inline-flex;align-items:center;">Классификация</span>',
            '<button onclick="pasadoBackToList()" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.2rem;padding:4px;" title="К списку">✕</button>',
          '</div>',

          '<div style="margin-bottom:4px;font-size:0.85rem;color:var(--muted);">Вопрос ' + (qIndex + 1) + ' из ' + total + '</div>',

          '<div style="text-align:center;margin-bottom:24px;">',
            '<div style="font-size:0.82rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">К какому времени относится?</div>',
            '<div id="pasado-classify-card" style="',
              'background:var(--faint);',
              'border:2px solid var(--accent);border-radius:14px;',
              'padding:22px 20px;font-size:1.4rem;font-weight:700;',
              'color:var(--text);min-height:64px;display:flex;',
              'align-items:center;justify-content:center;',
              'box-shadow:var(--shadow);',
            '">' + _escHtmlP(item.text) + '</div>',
          '</div>',

          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;" id="pasado-classify-zones" class="stagger">',
            zonesHtml,
          '</div>',

          '<div id="pasado-classify-feedback" style="display:none;"></div>',

          '<div id="pasado-classify-next" style="display:none;text-align:center;margin-top:14px;">',
            '<button onclick="pasadoNext()" class="next-button quiz-next-fixed">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  showClassifyFeedback: function(selectedKey, correctKey, hint) {
    var root = this._root();
    if (!root) return;

    // Disable all zones
    var zones = root.querySelectorAll('.pasado-classify-zone');
    zones.forEach(function(z) {
      z.style.pointerEvents = 'none';
    });

    var correctZone = root.querySelector('#pclz-' + correctKey);
    var selectedZone = root.querySelector('#pclz-' + selectedKey);
    var isCorrect = selectedKey === correctKey;

    if (correctZone) correctZone.classList.add('pcz-correct', 'pasado-bounce');

    if (!isCorrect && selectedZone) {
      selectedZone.classList.add('pcz-wrong', 'pasado-shake');
    }

    // Dim non-relevant zones
    zones.forEach(function(z) {
      if (z.id !== 'pclz-' + correctKey && z.id !== 'pclz-' + selectedKey) {
        z.classList.add('pcz-wrong');
      }
    });

    var feedbackEl = root.querySelector('#pasado-classify-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.style.padding = '12px 16px';
      feedbackEl.style.borderRadius = '8px';
      feedbackEl.style.marginTop = '4px';
      feedbackEl.style.fontSize = '0.9rem';
      feedbackEl.style.lineHeight = '1.5';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<span style="color:#22c55e;font-weight:700;">Верно!</span> ' + _escHtmlP(hint);
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<span style="color:#ef4444;font-weight:700;">Неверно.</span> ' + _escHtmlP(hint);
      }
    }

    var nextEl = root.querySelector('#pasado-classify-next');
    if (nextEl) nextEl.style.display = 'block';
  },

  // ─── View: results ───────────────────────────────────────────────────────────

  renderResults: function(score, total, quizMode) {
    var root = this._root();
    if (!root) return;

    var pct = total > 0 ? Math.round((score / total) * 100) : 0;

    var reactionIcon, reactionText;
    if (pct === 100)      { reactionIcon = 'trophy'; reactionText = 'Отлично! Все верно!'; }
    else if (pct >= 75)   { reactionIcon = 'award'; reactionText = 'Хорошо! Почти всё верно!'; }
    else if (pct >= 50)   { reactionIcon = 'thumbsUp'; reactionText = 'Неплохо! Можно лучше'; }
    else                  { reactionIcon = 'bookOpen'; reactionText = 'Нужно повторить материал'; }

    var repeatAction;
    if (quizMode === 'all') {
      repeatAction = 'pasadoStartAllQuiz()';
    } else if (quizMode === 'inline') {
      repeatAction = 'pasadoStartInline()';
    } else if (quizMode === 'classify') {
      repeatAction = 'pasadoStartClassify()';
    } else {
      repeatAction = 'pasadoStartQuiz(' + PasadoApp.state.currentFormulaIndex + ')';
    }

    var html = [
      '<div style="max-width: 500px; margin: 0 auto;" class="pasado-anim-in view-enter">',
        '<div class="game-area" style="text-align: center; padding: 32px 24px;">',

          '<div style="margin-bottom: 12px; color: var(--accent); line-height: 1;">' + ((window.ICON_RESULT && window.ICON_RESULT[reactionIcon]) || '') + '</div>',
          '<h2 style="color: var(--text); margin-bottom: 8px; font-size: 1.4rem;">Результат</h2>',

          '<div style="font-size: 3rem; font-weight: 700; color: var(--accent); margin: 16px 0 8px;">',
            score + ' / ' + total,
          '</div>',
          '<div style="font-size: 1.1rem; color: var(--muted); margin-bottom: 6px;">' + pct + '%</div>',

          '<div style="height: 8px; background: var(--faint); border-radius: 4px; margin: 12px auto 20px; max-width: 280px; overflow: hidden;">',
            '<div style="height: 100%; width: ' + pct + '%; background: linear-gradient(90deg, var(--accent), #27ae60); border-radius: 4px;"></div>',
          '</div>',

          '<p style="color: var(--text); font-size: 1rem; margin-bottom: 28px;">' + _escHtmlP(reactionText) + '</p>',

          '<div class="results-buttons">',
            '<button onclick="' + repeatAction + '" class="restart-button"> Ещё раз</button>',
            '<button onclick="pasadoBackToList()" class="menu-button"> К темам</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // ─── View: contrast deck ─────────────────────────────────────────────────────

  renderContrastDeck: function(index) {
    var root = this._root();
    if (!root) return;
    var data = (typeof PASADO_CONTRAST !== 'undefined') ? PASADO_CONTRAST : [];
    var total = data.length;
    if (!total) return;
    var i = Math.max(0, Math.min(index, total - 1));
    var pair = data[i];

    var html = [
      '<div style="max-width:700px;margin:0 auto;padding:0 4px;" class="pasado-anim-in view-enter">',

        // header
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">',
          '<span style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--muted);">Контраст: Indefinido vs Imperfecto</span>',
          '<span style="font-size:0.78rem;color:var(--muted);">' + (i + 1) + ' / ' + total + '</span>',
        '</div>',

        // card
        '<div class="pct-card">',

          // pair columns
          '<div class="pct-pair">',

            '<div class="pct-half pct-half-indef">',
              '<span class="pct-badge pct-badge-indef">Indefinido</span>',
              '<div class="pct-es">' + _escHtmlP(pair.indef.es) + '</div>',
              '<div class="pct-ru">' + _escHtmlP(pair.indef.ru) + '</div>',
            '</div>',

            '<div class="pct-half pct-half-imp">',
              '<span class="pct-badge pct-badge-imp">Imperfecto</span>',
              '<div class="pct-es">' + _escHtmlP(pair.imp.es) + '</div>',
              '<div class="pct-ru">' + _escHtmlP(pair.imp.ru) + '</div>',
            '</div>',

          '</div>',

          // signal
          '<div class="pct-signal">',
            '<div class="pct-signal-label">Ключевой сигнал</div>',
            '<div class="pct-signal-val">' + _escHtmlP(pair.signal) + '</div>',
          '</div>',

          // rule
          '<div class="pct-rule">' + _escHtmlP(pair.rule) + '</div>',

          // navigation
          '<div class="pct-nav">',
            '<button class="pct-nav-btn" onclick="pasadoPrevContrast()" ' + (i === 0 ? 'disabled' : '') + '>← Пред.</button>',
            '<button class="pct-nav-btn" onclick="pasadoBackToList()" style="font-size:0.78rem;padding:8px 12px;">✕ Закрыть</button>',
            '<button class="pct-nav-btn" onclick="pasadoNextContrast()" ' + (i === total - 1 ? 'disabled' : '') + '>След. →</button>',
          '</div>',

        '</div>',

        // progress dots
        '<div style="display:flex;justify-content:center;gap:6px;margin-top:14px;flex-wrap:wrap;">',
          data.map(function(_, j) {
            return '<span style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:' +
              (j === i ? 'var(--accent)' : 'var(--border)') + ';display:inline-block;"></span>';
          }).join(''),
        '</div>',

      '</div>',
    ].join('');

    root.innerHTML = html;
  },

};

// ─── Helper ───────────────────────────────────────────────────────────────────

function _escHtmlP(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

if (typeof window !== 'undefined') {
  window.PasadoUI = PasadoUI;
}
