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
    '.pasado-anim-in{animation:pasadoFadeIn 0.35s ease both}',
    '.pasado-shake{animation:pasadoShake 0.35s ease}',
    '.pasado-bounce{animation:pasadoBounce 0.4s ease}',
    '.pasado-pulse{animation:pasadoPulse 0.5s ease}',

    // TTS button
    '.pasado-tts-btn{',
    '  display:inline-flex;align-items:center;justify-content:center;',
    '  width:34px;height:34px;border-radius:50%;border:none;',
    '  background:rgba(52,152,219,0.12);color:#3498db;',
    '  cursor:pointer;font-size:1.1rem;transition:background 0.2s,transform 0.15s;',
    '  flex-shrink:0;vertical-align:middle;',
    '}',
    '.pasado-tts-btn:hover{background:rgba(52,152,219,0.22);transform:scale(1.1)}',
    '.pasado-tts-btn:active{transform:scale(0.95)}',

    // Inline options
    '.pasado-inline-opts{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;flex-wrap:wrap;}',
    '.pasado-inline-btn{',
    '  display:inline-block;padding:4px 13px;border-radius:16px;',
    '  border:2px solid #3498db;background:white;cursor:pointer;',
    '  font-size:0.95rem;font-weight:600;vertical-align:middle;',
    '  transition:all 0.18s ease;color:#2c3e50;line-height:1.4;',
    '  font-family:inherit;',
    '}',
    '.pasado-inline-btn:hover:not(:disabled){background:#e8f4fd;border-color:#1a6ea8;color:#1a6ea8;transform:scale(1.06)}',
    '.pasado-inline-btn:disabled{cursor:not-allowed;opacity:0.7}',
    '.pasado-inline-btn.pib-correct{background:#27ae60!important;border-color:#27ae60!important;color:white!important}',
    '.pasado-inline-btn.pib-wrong{background:#e74c3c!important;border-color:#e74c3c!important;color:white!important}',
    '.inline-question-text{line-height:2.4;font-size:1.15rem;font-weight:600;color:#2c3e50;text-align:center;}',

    // Classify zones
    '.pasado-classify-zone{',
    '  padding:14px 8px;border-radius:12px;border:2.5px solid transparent;',
    '  cursor:pointer;transition:all 0.18s ease;',
    '  font-size:0.82rem;font-weight:700;text-align:center;',
    '  text-transform:uppercase;letter-spacing:0.05em;',
    '  user-select:none;-webkit-user-select:none;',
    '}',
    '.pasado-classify-zone:hover{transform:translateY(-3px);filter:brightness(1.06)}',
    '.pasado-classify-zone:active{transform:scale(0.97)}',
    '.pcz-indefinido{background:#fff0f0;color:#c0392b;border-color:#e74c3c}',
    '.pcz-imperfecto{background:#eff5ff;color:#1a5aab;border-color:#3498db}',
    '.pcz-perfecto{background:#f0fff4;color:#1e7e34;border-color:#27ae60}',
    '.pcz-pluscuamperfecto{background:#f5f0ff;color:#6c3483;border-color:#9b59b6}',
    '.pcz-indefinido:hover{background:#fde8e8}',
    '.pcz-imperfecto:hover{background:#ddeeff}',
    '.pcz-perfecto:hover{background:#d4f5de}',
    '.pcz-pluscuamperfecto:hover{background:#ead6f5}',
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
    '.pasado-prog-bar{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:14px;}',
    '.pasado-prog-fill{height:100%;border-radius:3px;transition:width 0.4s ease;background:linear-gradient(90deg,#3498db,#27ae60)}',

    // Card thumb hover
    '.pasado-card-thumb{transition:transform 0.2s,box-shadow 0.2s;}'
  ].join('\n');
  document.head.appendChild(style);
})();

const PasadoUI = {

  _root: function() {
    return document.getElementById('pasado-content');
  },

  // ─── View: list ──────────────────────────────────────────────────────────────

  renderFormulaList: function() {
    var root = this._root();
    if (!root) return;

    var groups = [
      { label: '🔵 Indefinido', from: 0, to: 3 },
      { label: '🌊 Imperfecto', from: 4, to: 7 },
      { label: '📅 Perfecto Compuesto', from: 8, to: 11 },
      { label: '🏛️ Pluscuamperfecto', from: 12, to: 15 },
    ];

    var sectionsHtml = groups.map(function(g) {
      var cardsHtml = '';
      for (var i = g.from; i <= g.to; i++) {
        var formula = PASADO_DATA[i];
        cardsHtml += [
          '<div class="pasado-card-thumb" onclick="pasadoShowCard(' + i + ')" style="',
            'background: white;',
            'border-radius: 12px;',
            'padding: 16px 14px;',
            'cursor: pointer;',
            'box-shadow: 0 3px 12px rgba(0,0,0,0.15);',
            'display: flex;',
            'flex-direction: column;',
            'gap: 6px;',
          '">',
            '<div style="font-size: 1.8rem; line-height: 1;">' + formula.emoji + '</div>',
            '<div style="font-weight: 700; font-size: 0.82rem; color: #2c3e50;">' + _escHtmlP(formula.shortName) + '</div>',
            '<div style="',
              'background: #e8f4fd;',
              'color: #1a6ea8;',
              'font-size: 0.7rem;',
              'padding: 3px 7px;',
              'border-radius: 5px;',
              'font-family: monospace;',
              'line-height: 1.3;',
              'word-break: break-word;',
            '">' + _escHtmlP(formula.rule.split('|')[0].trim()) + '</div>',
          '</div>',
        ].join('');
      }

      return [
        '<div style="margin-bottom: 24px;">',
          '<div style="',
            'font-size: 0.8rem;',
            'font-weight: 700;',
            'text-transform: uppercase;',
            'letter-spacing: 0.08em;',
            'color: rgba(255,255,255,0.75);',
            'margin-bottom: 10px;',
          '">' + g.label + '</div>',
          '<div style="',
            'display: grid;',
            'grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));',
            'gap: 10px;',
          '">',
            cardsHtml,
          '</div>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 700px; margin: 0 auto; padding: 0 4px;" class="pasado-anim-in">',

        '<div style="text-align: center; margin-bottom: 20px;">',
          '<h2 style="color: white; font-size: 1.5rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.4);">',
            'Прошедшее время',
          '</h2>',
          '<p style="color: rgba(255,255,255,0.8); margin-top: 6px; font-size: 0.9rem;">',
            '4 времени · 16 формул · нажми чтобы изучить',
          '</p>',
        '</div>',

        '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 24px;">',
          '<button onclick="pasadoStartAllQuiz()" class="next-button" style="',
            'display: inline-block; width: auto; padding: 11px 24px; font-size: 0.95rem;',
          '">',
            '🎯 Тест: все 96 вопросов',
          '</button>',
          '<button onclick="pasadoStartInline()" class="menu-button" style="',
            'display: inline-block; width: auto; padding: 11px 24px; font-size: 0.95rem; max-width: none;',
            'background: linear-gradient(135deg, #9b59b6, #6c3483); color: white;',
          '">',
            '✏️ Inline режим',
          '</button>',
          '<button onclick="pasadoStartClassify()" class="menu-button" style="',
            'display: inline-block; width: auto; padding: 11px 24px; font-size: 0.95rem; max-width: none;',
            'background: linear-gradient(135deg, #e67e22, #d35400); color: white;',
          '">',
            '🎨 Классификация',
          '</button>',
        '</div>',

        sectionsHtml,

      '</div>',
    ].join('');

    root.innerHTML = html;

    root.querySelectorAll('.pasado-card-thumb').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 8px 24px rgba(52,152,219,0.4)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
        el.style.boxShadow = '0 3px 12px rgba(0,0,0,0.15)';
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
          'background: #fafafa;',
          'border-left: 3px solid #3498db;',
          'border-radius: 0 8px 8px 0;',
          'margin-bottom: 8px;',
          'display: flex; align-items: flex-start; gap: 8px;',
        '">',
          '<div style="flex: 1;">',
            '<div style="font-size: 1rem; color: #2c3e50; font-weight: 600;">' + _escHtmlP(ex.es) + '</div>',
            '<div style="font-size: 0.85rem; color: #7f8c8d; margin-top: 2px;">' + _escHtmlP(ex.ru) + '</div>',
          '</div>',
          '<button class="pasado-tts-btn" onclick="speakSpanish(' + JSON.stringify(ex.es) + ')" title="Прослушать">🔊</button>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;" class="pasado-anim-in">',
        '<div class="game-area" style="padding: 24px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">',
            '<span style="',
              'background: linear-gradient(135deg, #3498db, #1a6ea8);',
              'color: white; padding: 4px 14px; border-radius: 20px;',
              'font-size: 0.8rem; font-weight: 700;',
            '">Формула ' + formula.id + ' / 16</span>',
            '<span style="color: #aaa; font-size: 0.85rem;">' + formula.emoji + '</span>',
          '</div>',

          '<h2 style="color: #2c3e50; margin-bottom: 6px; font-size: 1.3rem;">' + _escHtmlP(formula.name) + '</h2>',
          '<p style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 16px;">' + _escHtmlP(formula.description) + '</p>',

          '<div style="',
            'background: #e8f4fd; border: 1.5px solid #a8d4f0;',
            'border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;',
          '">',
            '<div style="font-size: 0.75rem; color: #1a6ea8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Правило</div>',
            '<div style="font-family: monospace; font-size: 0.9rem; color: #0d4d80; font-weight: 600; white-space: pre-wrap; word-break: break-word;">' + _escHtmlP(formula.rule) + '</div>',
          '</div>',

          '<div style="',
            'background: linear-gradient(135deg, #3498db12, #1a6ea812);',
            'border-radius: 10px; padding: 16px; text-align: center; margin-bottom: 16px;',
            'display: flex; align-items: center; justify-content: center; gap: 10px;',
          '">',
            '<div>',
              '<div style="font-size: 1.4rem; font-weight: 700; color: #2c3e50; margin-bottom: 4px;">' + _escHtmlP(formula.example) + '</div>',
              '<div style="font-size: 0.9rem; color: #7f8c8d; font-style: italic;">' + _escHtmlP(formula.exampleRu) + '</div>',
            '</div>',
            '<button class="pasado-tts-btn" onclick="speakSpanish(' + JSON.stringify(formula.example) + ')" title="Прослушать пример" style="background:rgba(52,152,219,0.18);">🔊</button>',
          '</div>',

          '<div style="margin-bottom: 20px;">',
            '<div style="font-size: 0.78rem; color: #aaa; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Примеры</div>',
            extraExamples,
          '</div>',

          '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px;">',

            '<button onclick="pasadoBackToList()" class="menu-button" style="width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;">',
              '← Все темы',
            '</button>',

            (!isFirst ? [
              '<button onclick="pasadoShowPrev()" class="menu-button" style="',
                'width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;',
                'background: linear-gradient(135deg, #95a5a6, #7f8c8d);',
              '">← Пред.</button>',
            ].join('') : ''),

            '<button onclick="pasadoStartQuiz(' + index + ')" class="next-button" style="width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;">',
              'Тест →',
            '</button>',

            (!isLast ? [
              '<button onclick="pasadoShowNext()" class="menu-button" style="',
                'width: auto; padding: 10px 18px; font-size: 0.9rem; max-width: none;',
                'background: linear-gradient(135deg, #3498db, #1a6ea8); color: white;',
              '">След. →</button>',
            ].join('') : ''),

          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
  },

  // ─── View: quiz question ─────────────────────────────────────────────────────

  renderQuiz: function(question, formulaName, formulaEmoji, qIndex, total, score, progressLabel) {
    var root = this._root();
    if (!root) return;

    var optionLabels = ['A', 'B', 'C', 'D'];
    var pct = total > 0 ? Math.round((qIndex / total) * 100) : 0;

    var optionsHtml = question.options.map(function(option, i) {
      return [
        '<button',
          ' id="pasado-opt-' + i + '"',
          ' onclick="pasadoHandleAnswer(' + i + ')"',
          ' style="',
            'display: flex; align-items: center; gap: 12px;',
            'width: 100%; padding: 13px 16px;',
            'border: 2px solid #e2e8f0; border-radius: 10px;',
            'background: white; cursor: pointer;',
            'transition: border-color 0.2s, background 0.2s;',
            'text-align: left; font-size: 0.95rem; font-family: inherit; color: #2c3e50;',
          '"',
        '>',
          '<span style="',
            'display: inline-flex; align-items: center; justify-content: center;',
            'width: 28px; height: 28px; border-radius: 50%;',
            'background: #e8f4fd; color: #1a6ea8;',
            'font-weight: 700; font-size: 0.8rem; flex-shrink: 0;',
          '">' + optionLabels[i] + '</span>',
          '<span>' + _escHtmlP(option) + '</span>',
        '</button>',
      ].join('');
    }).join('');

    var scoreLabel = progressLabel || ('✅ ' + score + ' / ' + qIndex);
    var ttsSpanish = question.ttsText || '';

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;" class="pasado-anim-in">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">',
            '<span style="',
              'background: linear-gradient(135deg, #3498db, #1a6ea8);',
              'color: white; padding: 4px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;',
            '">' + formulaEmoji + ' ' + _escHtmlP(formulaName) + '</span>',
            '<button onclick="pasadoBackToList()" style="background: none; border: none; color: #aaa; cursor: pointer; font-size: 1.2rem; padding: 4px;" title="К списку">✕</button>',
          '</div>',

          '<div class="pasado-prog-bar">',
            '<div class="pasado-prog-fill" style="width:' + pct + '%"></div>',
          '</div>',

          '<div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 0.85rem; color: #7f8c8d;">',
            '<span>Вопрос ' + (qIndex + 1) + ' из ' + total + '</span>',
            '<span>' + scoreLabel + '</span>',
          '</div>',

          '<div style="',
            'font-size: 1.15rem; font-weight: 700; color: #2c3e50;',
            'text-align: center; margin-bottom: 22px; line-height: 1.5;',
            'display: flex; align-items: center; justify-content: center; gap: 8px;',
          '">',
            '<span>' + _escHtmlP(question.question) + '</span>',
            (ttsSpanish ? '<button class="pasado-tts-btn" onclick="speakSpanish(' + JSON.stringify(ttsSpanish) + ')" title="Прослушать">🔊</button>' : ''),
          '</div>',

          '<div id="pasado-options" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">',
            optionsHtml,
          '</div>',

          '<div id="pasado-feedback" style="display: none;"></div>',

          '<div id="pasado-next-wrap" style="display: none; text-align: center; margin-top: 14px;">',
            '<button onclick="pasadoNext()" class="next-button" style="width: auto; display: inline-block; padding: 12px 36px;">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;

    root.querySelectorAll('[id^="pasado-opt-"]').forEach(function(btn) {
      btn.addEventListener('mouseenter', function() {
        if (!btn.disabled) {
          btn.style.borderColor = '#3498db';
          btn.style.background = '#f0f8ff';
        }
      });
      btn.addEventListener('mouseleave', function() {
        if (!btn.disabled && !btn.classList.contains('correct') && !btn.classList.contains('incorrect')) {
          btn.style.borderColor = '#e2e8f0';
          btn.style.background = 'white';
        }
      });
    });
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
        ? ' <button class="pasado-tts-btn" onclick="speakSpanish(' + JSON.stringify(correctText) + ')" title="Прослушать" style="margin-left:6px;">🔊</button>'
        : '';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<strong>✅ Верно!</strong> ' + _escHtmlP(hint) + ttsBtn;
        if (correctText && typeof speakSpanish === 'function') {
          speakSpanish(correctText);
        }
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<strong>❌ Неверно.</strong> ' + _escHtmlP(hint) + ttsBtn;
        if (correctText && typeof speakSpanish === 'function') {
          setTimeout(function() { speakSpanish(correctText); }, 600);
        }
      }
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

    var sentenceHtml = _escHtmlP(item.before) +
      ' <span class="pasado-inline-opts" id="pasado-inline-opts">' + optBtnsHtml + '</span> ' +
      _escHtmlP(item.after);

    var streakHtml = streak > 1
      ? '<span class="pasado-streak">🔥 ' + streak + '</span>'
      : '';

    var html = [
      '<div style="max-width: 620px; margin: 0 auto;" class="pasado-anim-in">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">',
            '<span style="background:linear-gradient(135deg,#9b59b6,#6c3483);color:white;padding:4px 14px;border-radius:20px;font-size:0.78rem;font-weight:700;">✏️ Inline режим</span>',
            '<div style="display:flex;align-items:center;gap:8px;">',
              streakHtml,
              '<button onclick="pasadoBackToList()" style="background:none;border:none;color:#aaa;cursor:pointer;font-size:1.2rem;padding:4px;" title="К списку">✕</button>',
            '</div>',
          '</div>',

          '<div class="pasado-prog-bar"><div class="pasado-prog-fill" style="width:' + pct + '%"></div></div>',

          '<div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:0.85rem;color:#7f8c8d;">',
            '<span>Вопрос ' + (qIndex + 1) + ' из ' + total + '</span>',
            '<span>✅ ' + score + ' / ' + qIndex + '</span>',
          '</div>',

          '<div style="background:#f7f8fc;border-radius:10px;padding:18px 16px;text-align:center;margin-bottom:18px;">',
            '<div style="font-size:0.82rem;color:#9b59b6;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Выбери правильную форму</div>',
            '<div class="inline-question-text">' + sentenceHtml + '</div>',
            '<div style="font-size:0.85rem;color:#7f8c8d;margin-top:10px;font-style:italic;">' + _escHtmlP(item.hint) + '</div>',
          '</div>',

          '<div id="pasado-inline-feedback" style="display:none;"></div>',

          '<div id="pasado-inline-next" style="display:none;text-align:center;margin-top:14px;">',
            '<button onclick="pasadoNext()" class="next-button" style="width:auto;display:inline-block;padding:12px 36px;">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
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

      var ttsBtn = tts ? ' <button class="pasado-tts-btn" onclick="speakSpanish(' + JSON.stringify(tts) + ')" title="Прослушать">🔊</button>' : '';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<strong>✅ Верно!</strong> ' + _escHtmlP(hint) + ttsBtn;
        if (tts && typeof speakSpanish === 'function') speakSpanish(tts);
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<strong>❌ Неверно.</strong> Правильно: <strong>' + _escHtmlP(correctVal) + '</strong>. ' + _escHtmlP(hint) + ttsBtn;
        if (tts && typeof speakSpanish === 'function') setTimeout(function() { speakSpanish(tts); }, 600);
      }
    }

    var nextEl = root.querySelector('#pasado-inline-next');
    if (nextEl) nextEl.style.display = 'block';
  },

  // ─── View: Classify ──────────────────────────────────────────────────────────

  renderClassifyQuestion: function(item, qIndex, total, score, streak) {
    var root = this._root();
    if (!root) return;

    var pct = total > 0 ? Math.round((qIndex / total) * 100) : 0;
    var streakHtml = streak > 1 ? '<span class="pasado-streak">🔥 ' + streak + '</span>' : '';

    var zones = [
      { key: 'indefinido',       label: 'Indefinido',       cls: 'pcz-indefinido',       icon: '🔵' },
      { key: 'imperfecto',       label: 'Imperfecto',       cls: 'pcz-imperfecto',       icon: '🌊' },
      { key: 'perfecto',         label: 'Perfecto Comp.',   cls: 'pcz-perfecto',         icon: '📅' },
      { key: 'pluscuamperfecto', label: 'Pluscuamperf.',    cls: 'pcz-pluscuamperfecto', icon: '🏛️' },
    ];

    var zonesHtml = zones.map(function(z) {
      return [
        '<div class="pasado-classify-zone ' + z.cls + '" id="pclz-' + z.key + '" data-key="' + z.key + '"',
        ' onclick="window.pasadoClassifyAnswer(this.dataset.key)">',
        z.icon + '<br>' + z.label,
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;" class="pasado-anim-in">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">',
            '<span style="background:linear-gradient(135deg,#e67e22,#d35400);color:white;padding:4px 14px;border-radius:20px;font-size:0.78rem;font-weight:700;">🎨 Классификация</span>',
            '<div style="display:flex;align-items:center;gap:8px;">',
              streakHtml,
              '<button onclick="pasadoBackToList()" style="background:none;border:none;color:#aaa;cursor:pointer;font-size:1.2rem;padding:4px;" title="К списку">✕</button>',
            '</div>',
          '</div>',

          '<div class="pasado-prog-bar"><div class="pasado-prog-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#e67e22,#f39c12);"></div></div>',

          '<div style="display:flex;justify-content:space-between;margin-bottom:18px;font-size:0.85rem;color:#7f8c8d;">',
            '<span>Вопрос ' + (qIndex + 1) + ' из ' + total + '</span>',
            '<span>✅ ' + score + ' / ' + qIndex + '</span>',
          '</div>',

          '<div style="text-align:center;margin-bottom:24px;">',
            '<div style="font-size:0.82rem;color:#e67e22;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">К какому времени относится?</div>',
            '<div id="pasado-classify-card" style="',
              'background:linear-gradient(135deg,#fff8f0,#fff);',
              'border:2px solid #e67e22;border-radius:14px;',
              'padding:22px 20px;font-size:1.4rem;font-weight:700;',
              'color:#2c3e50;min-height:64px;display:flex;',
              'align-items:center;justify-content:center;',
              'box-shadow:0 4px 16px rgba(230,126,34,0.2);',
            '">' + _escHtmlP(item.text) + '</div>',
          '</div>',

          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;" id="pasado-classify-zones">',
            zonesHtml,
          '</div>',

          '<div id="pasado-classify-feedback" style="display:none;"></div>',

          '<div id="pasado-classify-next" style="display:none;text-align:center;margin-top:14px;">',
            '<button onclick="pasadoNext()" class="next-button" style="width:auto;display:inline-block;padding:12px 36px;">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
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
        feedbackEl.innerHTML = '<strong>✅ Верно!</strong> ' + _escHtmlP(hint);
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<strong>❌ Неверно.</strong> ' + _escHtmlP(hint);
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

    var reaction;
    if (pct === 100)      { reaction = '🎉 Отлично! Все верно!'; }
    else if (pct >= 75)   { reaction = '👏 Хорошо! Почти всё верно!'; }
    else if (pct >= 50)   { reaction = '👍 Неплохо! Можно лучше'; }
    else                  { reaction = '📚 Нужно повторить материал'; }

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
      '<div style="max-width: 500px; margin: 0 auto;" class="pasado-anim-in">',
        '<div class="game-area" style="text-align: center; padding: 32px 24px;">',

          '<div style="font-size: 3rem; margin-bottom: 12px;">' + reaction.split(' ')[0] + '</div>',
          '<h2 style="color: #2c3e50; margin-bottom: 8px; font-size: 1.4rem;">Результат</h2>',

          '<div style="font-size: 3rem; font-weight: 700; color: #3498db; margin: 16px 0 8px;">',
            score + ' / ' + total,
          '</div>',
          '<div style="font-size: 1.1rem; color: #7f8c8d; margin-bottom: 6px;">' + pct + '%</div>',

          '<div style="height: 8px; background: #e2e8f0; border-radius: 4px; margin: 12px auto 20px; max-width: 280px; overflow: hidden;">',
            '<div style="height: 100%; width: ' + pct + '%; background: linear-gradient(90deg, #3498db, #27ae60); border-radius: 4px;"></div>',
          '</div>',

          '<p style="color: #555; font-size: 1rem; margin-bottom: 28px;">' + _escHtmlP(reaction.substring(reaction.indexOf(' ') + 1)) + '</p>',

          '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">',
            '<button onclick="' + repeatAction + '" class="next-button" style="width: auto; display: inline-block; padding: 12px 28px;">🔁 Повторить</button>',
            '<button onclick="pasadoBackToList()" class="menu-button" style="width: auto; display: inline-block; padding: 12px 28px;">⏪ Все темы</button>',
          '</div>',

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
