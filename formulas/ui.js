/**
 * Spanish Trainer - 20 Formulas
 * UI Renderer: all views injected into #formulas-content
 */

// ─── Icon map (indexed by formula.id - 1) ─────────────────────────────────────
var FORMULA_ICONS = [
  { icon: 'type',             color: '#3B82F6', bg: 'rgba(59,130,246,0.15)'  }, // 1  Прилагательные
  { icon: 'zap',              color: '#EAB308', bg: 'rgba(234,179,8,0.15)'   }, // 2  Наречия
  { icon: 'help-circle',      color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)'  }, // 3  Вопросы
  { icon: 'file-text',        color: '#10B981', bg: 'rgba(16,185,129,0.15)'  }, // 4  Полные предложения
  { icon: 'user',             color: '#F59E0B', bg: 'rgba(245,158,11,0.15)'  }, // 5  Личное «a»
  { icon: 'repeat-2',         color: '#6366F1', bg: 'rgba(99,102,241,0.15)'  }, // 6  Дублирование le
  { icon: 'refresh-cw',       color: '#14B8A6', bg: 'rgba(20,184,166,0.15)'  }, // 7  Возвратные
  { icon: 'play',             color: '#F26B1D', bg: 'rgba(242,107,29,0.15)'  }, // 8  Инфинитив
  { icon: 'list-checks',      color: '#0EA5E9', bg: 'rgba(14,165,233,0.15)'  }, // 9  Hay que
  { icon: 'check-square',     color: '#22C55E', bg: 'rgba(34,197,94,0.15)'   }, // 10 Tener que
  { icon: 'clock',            color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)'  }, // 11 Perfecto
  { icon: 'activity',         color: '#EF4444', bg: 'rgba(239,68,68,0.15)'   }, // 12 Estar+gerundio
  { icon: 'timer',            color: '#F59E0B', bg: 'rgba(245,158,11,0.15)'  }, // 13 Llevar+gerundio
  { icon: 'compass',          color: '#0EA5E9', bg: 'rgba(14,165,233,0.15)'  }, // 14 Para/Por
  { icon: 'scale',            color: '#10B981', bg: 'rgba(16,185,129,0.15)'  }, // 15 Сравнение
  { icon: 'shuffle',          color: '#6366F1', bg: 'rgba(99,102,241,0.15)'  }, // 16 Местоимения OD
  { icon: 'chevrons-up',      color: '#F26B1D', bg: 'rgba(242,107,29,0.15)'  }, // 17 -ísimo
  { icon: 'arrow-left-right', color: '#14B8A6', bg: 'rgba(20,184,166,0.15)'  }, // 18 Замена OD+OI
  { icon: 'heart',            color: '#EF4444', bg: 'rgba(239,68,68,0.15)'   }, // 19 Gustar
  { icon: 'moon',             color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)'  }, // 20 Subjuntivo
  { icon: 'send',             color: '#3B82F6', bg: 'rgba(59,130,246,0.15)'  }, // 21 Будущее
  { icon: 'git-branch',       color: '#6366F1', bg: 'rgba(99,102,241,0.15)'  }, // 22 Condicional
  { icon: 'megaphone',        color: '#F26B1D', bg: 'rgba(242,107,29,0.15)'  }, // 23 Императив
  { icon: 'shield',           color: '#0EA5E9', bg: 'rgba(14,165,233,0.15)'  }, // 24 Poder/Deber
  { icon: 'clock-4',          color: '#22C55E', bg: 'rgba(34,197,94,0.15)'   }, // 25 Acabar de
  { icon: 'eye-off',          color: '#6366F1', bg: 'rgba(99,102,241,0.15)'  }, // 26 Пассивная se
  { icon: 'repeat',           color: '#14B8A6', bg: 'rgba(20,184,166,0.15)'  }, // 27 Перифразы
  { icon: 'alert-triangle',   color: '#F59E0B', bg: 'rgba(245,158,11,0.15)'  }, // 28 Se me/Se te
  { icon: 'history',          color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)'  }, // 29 Hace+tiempo
  { icon: 'ban',              color: '#EF4444', bg: 'rgba(239,68,68,0.15)'   }, // 30 Отрицание
  { icon: 'toggle-left',      color: '#10B981', bg: 'rgba(16,185,129,0.15)'  }, // 31 Ponerse/Quedarse
  { icon: 'arrow-right-left', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)'  }, // 32 Si+presente
  { icon: 'link',             color: '#6366F1', bg: 'rgba(99,102,241,0.15)'  }, // 33 Придаточные
  { icon: 'lightbulb',        color: '#EAB308', bg: 'rgba(234,179,8,0.15)'   }, // 34 Lo+adj
  { icon: 'target',           color: '#F26B1D', bg: 'rgba(242,107,29,0.15)'  }, // 35 Para que
  { icon: 'git-merge',        color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)'  }, // 36 Si+imperfecto
];

const FormulasUI = {

  // ─── Root element ────────────────────────────────────────────────────────────

  _root: function() {
    return document.getElementById('formulas-content');
  },

  // ─── View: list of all 20 formulas ───────────────────────────────────────────

  renderFormulaList: function() {
    var root = this._root();
    if (!root) return;

    var cardsHtml = FORMULAS_DATA.map(function(formula, index) {
      return [
        '<div class="formula-card-thumb" onclick="formulaShowCard(' + index + ')" style="',
          'background: var(--surface);',
          'border-radius: 12px;',
          'padding: 18px 16px;',
          'cursor: pointer;',
          'transition: transform 0.2s, box-shadow 0.2s;',
          'box-shadow: var(--shadow);',
          'border: 1px solid var(--border);',
          'display: flex;',
          'flex-direction: column;',
          'gap: 6px;',
        '">',
          '<div style="width:40px;height:40px;border-radius:10px;background:' + FORMULA_ICONS[index].color + ';opacity:0.82;margin-bottom:4px;flex-shrink:0;"></div>',
          '<div style="font-weight: 700; font-size: 0.85rem; color: var(--text);">' + formula.shortName + '</div>',
          '<div style="',
            'background: var(--accent-faint);',
            'color: var(--accent);',
            'font-size: 0.72rem;',
            'padding: 4px 8px;',
            'border-radius: 6px;',
            'font-family: monospace;',
            'line-height: 1.3;',
            'word-break: break-word;',
          '">' + _escHtml(formula.rule) + '</div>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 700px; margin: 0 auto; padding: 0 4px;">',


        // "Quiz all" + "Marathon" buttons
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">',
          '<button onclick="formulaStartAllQuiz()" style="',
            'display:flex;flex-direction:column;align-items:center;gap:4px;',
            'padding:14px 12px;border:1.5px solid var(--border);border-radius:14px;',
            'background:var(--surface);color:var(--text);cursor:pointer;',
            'transition:background 0.15s,transform 0.15s;text-align:center;box-shadow:var(--shadow);font-family:inherit;',
          '" onmouseover="this.style.borderColor=\'var(--accent)\';this.style.background=\'var(--accent-faint)\'" onmouseout="this.style.borderColor=\'var(--border)\';this.style.background=\'var(--surface)\'">',
            '<span style="display:inline-block;width:24px;height:24px;border-radius:6px;background:var(--muted);opacity:0.5;"></span>',
            '<span style="font-weight:700;font-size:0.95rem;">Полный тест</span>',
            '<span style="font-size:0.75rem;color:var(--muted);line-height:1.3;">216 вопросов · ошибки не повторяются</span>',
          '</button>',
          '<button onclick="formulaStartMarathon()" style="',
            'display:flex;flex-direction:column;align-items:center;gap:4px;',
            'padding:14px 12px;border:1.5px solid rgba(239,68,68,0.4);border-radius:14px;',
            'background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.15));',
            'color:var(--text);cursor:pointer;',
            'transition:opacity 0.15s,transform 0.15s;text-align:center;font-family:inherit;',
          '" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">',
            '<span style="display:inline-block;width:24px;height:24px;border-radius:6px;background:#ef4444;opacity:0.6;"></span>',
            '<span style="font-weight:700;font-size:0.95rem;">Марафон</span>',
            '<span style="font-size:0.75rem;color:var(--muted);line-height:1.3;">ошибки возвращаются · конец = всё верно</span>',
          '</button>',
        '</div>',

        // Grid
        '<div style="',
          'display: grid;',
          'grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));',
          'gap: 12px;',
        '">',
          cardsHtml,
        '</div>',

      '</div>',
    ].join('');

    root.innerHTML = html;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Hover effect via JS
    root.querySelectorAll('.formula-card-thumb').forEach(function(el) {
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

  // ─── View: single formula card ────────────────────────────────────────────────

  renderFormulaCard: function(formula, index) {
    var root = this._root();
    if (!root) return;

    var isFirst = index === 0;
    var isLast  = index === FORMULAS_DATA.length - 1;

    var extraExamples = formula.examples.map(function(ex) {
      return [
        '<div style="',
          'padding: 10px 14px;',
          'background: var(--faint);',
          'border-left: 3px solid var(--accent);',
          'border-radius: 0 8px 8px 0;',
          'margin-bottom: 8px;',
          'display: flex;',
          'align-items: center;',
          'gap: 10px;',
        '">',
          '<div style="flex: 1; min-width: 0;">',
            '<div style="font-size: 1rem; color: var(--text); font-weight: 600;">' + _escHtml(ex.es) + '</div>',
            '<div style="font-size: 0.85rem; color: var(--muted); margin-top: 2px;">' + _escHtml(ex.ru) + '</div>',
          '</div>',
          '<button class="formula-tts-ex-btn" data-tts="' + _escHtml(ex.es).replace(/"/g, '&quot;') + '" title="Послушать" style="',
            'flex-shrink: 0;',
            'width: 32px;',
            'height: 32px;',
            'border-radius: 50%;',
            'border: none;',
            'background: var(--accent-faint);',
            'color: var(--accent);',
            'cursor: pointer;',
            'display: inline-flex;',
            'align-items: center;',
            'justify-content: center;',
            'transition: background 0.2s, transform 0.15s;',
          '" onmouseover="this.style.background=\'var(--accent-mid)\';this.style.transform=\'scale(1.1)\'" onmouseout="this.style.background=\'var(--accent-faint)\';this.style.transform=\'\'">',
            (window.ICON_VOL||''),
          '</button>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;">',

        // ── Card container
        '<div class="game-area" style="padding: 24px 20px;">',

          // Badge: id / total
          '<div style="',
            'display: flex;',
            'justify-content: space-between;',
            'align-items: center;',
            'margin-bottom: 16px;',
          '">',
            '<span style="',
              'background: var(--accent);',
              'color: white;',
              'padding: 4px 14px;',
              'border-radius: 20px;',
              'font-size: 0.8rem;',
              'font-weight: 700;',
            '">Формула ' + formula.id + ' / 36</span>',
            '<div style="width:28px;height:28px;border-radius:8px;background:' + FORMULA_ICONS[index].bg + ';flex-shrink:0;"></div>',
          '</div>',

          // Name
          '<h2 style="color: var(--text); margin-bottom: 6px; font-size: 1.3rem;">' + _escHtml(formula.name) + '</h2>',
          '<p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 16px;">' + _escHtml(formula.description) + '</p>',

          // Rule box
          '<div style="',
            'background: var(--accent-faint);',
            'border: 1.5px solid var(--accent-mid);',
            'border-radius: 8px;',
            'padding: 12px 16px;',
            'margin-bottom: 20px;',
          '">',
            '<div style="font-size: 0.75rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Правило</div>',
            '<div style="font-family: monospace; font-size: 0.95rem; color: var(--text); font-weight: 600;">' + _escHtml(formula.rule) + '</div>',
          '</div>',

          // Main example
          '<div style="',
            'background: var(--faint);',
            'border-radius: 10px;',
            'padding: 16px;',
            'text-align: center;',
            'margin-bottom: 16px;',
            'position: relative;',
          '">',
            '<div style="font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 4px;">' + _escHtml(formula.example) + '</div>',
            '<div style="font-size: 0.9rem; color: var(--muted); font-style: italic; margin-bottom: 8px;">' + _escHtml(formula.exampleRu) + '</div>',
            '<button onclick="window.formulaSpeakExample(\'' + _escHtml(formula.example).replace(/'/g, "\\'") + '\')" title="Озвучить" style="',
              'background: var(--accent);',
              'border: none;',
              'border-radius: 20px;',
              'padding: 5px 14px;',
              'cursor: pointer;',
              'color: white;',
              'font-size: 0.82rem;',
              'display: inline-flex;',
              'align-items: center;',
              'gap: 5px;',
              'opacity: 0.9;',
              'transition: opacity 0.15s, transform 0.15s;',
            '" onmouseover="this.style.opacity=\'1\';this.style.transform=\'scale(1.06)\'" onmouseout="this.style.opacity=\'0.9\';this.style.transform=\'\'">',
              (window.ICON_VOL||'') + ' Послушать',
            '</button>',
          '</div>',

          // Extra examples
          '<div style="margin-bottom: 20px;">',
            '<div style="font-size: 0.78rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Ещё примеры</div>',
            extraExamples,
          '</div>',

          // Buttons row
          '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px;">',

            // ← Назад к списку
            '<button onclick="formulaBackToList()" class="menu-button" style="',
              'width: auto;',
              'padding: 10px 18px;',
              'font-size: 0.9rem;',
              'max-width: none;',
            '">← Все формулы</button>',

            // ← Предыдущая
            (!isFirst ? [
              '<button onclick="formulaShowPrev()" class="menu-button" style="',
                'width: auto;',
                'padding: 10px 18px;',
                'font-size: 0.9rem;',
                'max-width: none;',
                'background: var(--faint);',
              '">← Пред.</button>',
            ].join('') : ''),

            // Quiz this formula
            '<button onclick="formulaStartQuiz(' + index + ')" class="next-button" style="',
              'width: auto;',
              'padding: 10px 18px;',
              'font-size: 0.9rem;',
              'max-width: none;',
            '">Тест →</button>',

            // → Следующая
            (!isLast ? [
              '<button onclick="formulaShowNext()" class="menu-button" style="',
                'width: auto;',
                'padding: 10px 18px;',
                'font-size: 0.9rem;',
                'max-width: none;',
                'background: var(--accent);',
                'color: white;',
              '">След. →</button>',
            ].join('') : ''),

          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    root.querySelectorAll('.formula-tts-ex-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (typeof speakSpanish === 'function') speakSpanish(btn.dataset.tts);
      });
    });
  },

  // ─── View: quiz question ──────────────────────────────────────────────────────

  renderQuiz: function(question, formulaName, formulaEmoji, qIndex, total, score, marathonLeft) {
    var root = this._root();
    if (!root) return;

    var optionLabels = ['A', 'B', 'C', 'D'];

    var optionsHtml = question.options.map(function(option, i) {
      return [
        '<button',
          ' id="formula-opt-' + i + '"',
          ' onclick="formulaHandleAnswer(' + i + ')"',
          ' style="',
            'display: flex;',
            'align-items: center;',
            'gap: 12px;',
            'width: 100%;',
            'padding: 13px 16px;',
            'border: 2px solid var(--border);',
            'border-radius: 10px;',
            'background: var(--surface);',
            'cursor: pointer;',
            'transition: border-color 0.2s, background 0.2s;',
            'text-align: left;',
            'font-size: 0.97rem;',
            'font-family: inherit;',
            'color: var(--text);',
          '"',
        '>',
          '<span style="',
            'display: inline-flex;',
            'align-items: center;',
            'justify-content: center;',
            'width: 28px;',
            'height: 28px;',
            'border-radius: 50%;',
            'background: var(--accent-faint);',
            'color: var(--accent);',
            'font-weight: 700;',
            'font-size: 0.8rem;',
            'flex-shrink: 0;',
          '">' + optionLabels[i] + '</span>',
          '<span>' + _escHtml(option) + '</span>',
        '</button>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto; padding-bottom: 80px;">',
        '<div class="game-area" style="padding: 22px 20px;">',

          // Top row: formula badge + back
          '<div style="',
            'display: flex;',
            'justify-content: space-between;',
            'align-items: center;',
            'margin-bottom: 16px;',
          '">',
            '<span style="',
              'background: var(--accent);',
              'color: white;',
              'padding: 4px 14px;',
              'border-radius: 20px;',
              'font-size: 0.78rem;',
              'font-weight: 700;',
            '"><i data-lucide="' + formulaEmoji + '" style="width:14px;height:14px;stroke:#fff;stroke-width:2;vertical-align:middle;margin-right:5px;pointer-events:none"></i>' + _escHtml(formulaName) + '</span>',
            '<button onclick="formulaBackToList()" style="',
              'background: none;',
              'border: none;',
              'color: var(--muted);',
              'cursor: pointer;',
              'font-size: 1.2rem;',
              'padding: 4px;',
            '" title="К списку">✕</button>',
          '</div>',

          // Progress bar
          '<div style="',
            'height: 5px;',
            'background: var(--faint);',
            'border-radius: 3px;',
            'margin-bottom: 14px;',
            'overflow: hidden;',
          '">',
            '<div style="',
              'height: 100%;',
              'width: ' + Math.round(((qIndex) / total) * 100) + '%;',
              'background: var(--accent);',
              'border-radius: 3px;',
              'transition: width 0.3s;',
            '"></div>',
          '</div>',

          // Position label
          '<div style="margin-bottom: 4px; font-size: 0.85rem; color: var(--muted);">',
            (marathonLeft != null
              ? '<span style="background:#fff3cd;color:#856404;padding:2px 10px;border-radius:20px;font-weight:700;">Осталось: ' + marathonLeft + '</span>'
              : 'Вопрос ' + (qIndex + 1) + ' из ' + total
            ),
          '</div>',

          // Question text (Russian — no TTS)
          '<div style="text-align: center; margin-bottom: 8px;">',
            '<div style="',
              'font-size: 1.25rem;',
              'font-weight: 700;',
              'color: var(--text);',
              'line-height: 1.4;',
            '">' + _escHtml(question.question) + '</div>',
          '</div>',

          // Options
          '<div id="formula-options" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">',
            optionsHtml,
          '</div>',

          // Feedback area (hidden initially)
          '<div id="formula-feedback" style="display: none;"></div>',

          // Next button (hidden initially)
          '<div id="formula-next-wrap" style="display: none; text-align: center; margin-top: 14px;">',
            '<button onclick="formulaNext()" class="next-button quiz-next-fixed">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Add hover effect on option buttons
    root.querySelectorAll('[id^="formula-opt-"]').forEach(function(btn) {
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
  },

  // ─── Quiz feedback after answer ──────────────────────────────────────────────

  showAnswerFeedback: function(selectedIndex, correctIndex, hint) {
    var root = this._root();
    if (!root) return;

    var optionBtns = root.querySelectorAll('[id^="formula-opt-"]');

    // Disable all buttons
    optionBtns.forEach(function(btn) {
      btn.disabled = true;
      btn.style.cursor = 'default';
    });

    // Highlight correct
    var correctBtn = root.querySelector('#formula-opt-' + correctIndex);
    if (correctBtn) {
      correctBtn.style.borderColor = '#27ae60';
      correctBtn.style.background = '#d4edda';
      correctBtn.style.color = '#155724';
    }

    // Highlight wrong (if selected wrong)
    if (selectedIndex !== correctIndex) {
      var wrongBtn = root.querySelector('#formula-opt-' + selectedIndex);
      if (wrongBtn) {
        wrongBtn.style.borderColor = '#e74c3c';
        wrongBtn.style.background = '#f8d7da';
        wrongBtn.style.color = '#721c24';
      }
    }

    // Get correct Spanish text for TTS (from button span[1])
    var correctText = '';
    if (correctBtn) {
      var spans = correctBtn.querySelectorAll('span');
      if (spans[1]) correctText = spans[1].textContent;
    }

    // Show feedback box
    var isCorrect = selectedIndex === correctIndex;
    var feedbackEl = root.querySelector('#formula-feedback');
    if (feedbackEl) {
      var ttsBtn = '<button id="formula-feedback-tts" data-tts="' + correctText.replace(/&/g,'&amp;').replace(/"/g,'&quot;') + '" title="Послушать правильный ответ" style="' +
        'flex-shrink:0;width:32px;height:32px;border-radius:50%;border:none;' +
        'background:var(--accent-faint);color:var(--accent);cursor:pointer;' +
        'display:inline-flex;align-items:center;justify-content:center;' +
        'margin-left:8px;vertical-align:middle;transition:background 0.2s;">' +
        (window.ICON_VOL||'') +
        '</button>';

      feedbackEl.style.display = 'flex';
      feedbackEl.style.alignItems = 'flex-start';
      feedbackEl.style.gap = '8px';
      feedbackEl.style.padding = '12px 16px';
      feedbackEl.style.borderRadius = '8px';
      feedbackEl.style.marginTop = '8px';
      feedbackEl.style.fontSize = '0.9rem';
      feedbackEl.style.lineHeight = '1.5';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<div style="flex:1"><span style="color:#22c55e;font-weight:700;">Верно!</span> ' + _escHtml(hint) + '</div>' + ttsBtn;
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<div style="flex:1"><span style="color:#ef4444;font-weight:700;">Неверно.</span> ' + _escHtml(hint) + '</div>' + ttsBtn;
      }

      // Wire up TTS button
      if (typeof lucide !== 'undefined') lucide.createIcons();
      var ttsBtnEl = feedbackEl.querySelector('#formula-feedback-tts');
      if (ttsBtnEl) {
        ttsBtnEl.addEventListener('click', function() {
          if (typeof speakSpanish === 'function') speakSpanish(ttsBtnEl.dataset.tts);
        });
      }
    }

    // Show "Дальше" button
    var nextWrap = root.querySelector('#formula-next-wrap');
    if (nextWrap) {
      nextWrap.style.display = 'block';
    }
  },

  // ─── View: results ────────────────────────────────────────────────────────────

  renderResults: function(score, total, quizMode) {
    var root = this._root();
    if (!root) return;

    var pct = total > 0 ? Math.round((score / total) * 100) : 0;

    var reactionIcon, reactionText;
    if (pct === 100) {
      reactionIcon = 'trophy';    reactionText = 'Отлично! Все верно!';
    } else if (pct >= 75) {
      reactionIcon = 'award';     reactionText = 'Хорошо! Почти все верно!';
    } else if (pct >= 50) {
      reactionIcon = 'thumbs-up'; reactionText = 'Неплохо! Можно лучше';
    } else {
      reactionIcon = 'book-open'; reactionText = 'Нужно повторить материал';
    }

    var repeatAction = quizMode === 'all'
      ? 'formulaStartAllQuiz()'
      : quizMode === 'marathon'
        ? 'formulaStartMarathon()'
        : 'formulaStartQuiz(' + FormulasApp.state.currentFormulaIndex + ')';

    var html = [
      '<div style="max-width: 500px; margin: 0 auto;">',
        '<div class="game-area" style="text-align: center; padding: 32px 24px;">',

          '<div style="margin-bottom: 12px;"><i data-lucide="' + reactionIcon + '" style="width:56px;height:56px;stroke:var(--accent);stroke-width:1.5"></i></div>',

          '<h2 style="color: var(--text); margin-bottom: 8px; font-size: 1.4rem;">Результат</h2>',

          '<div style="',
            'font-size: 3rem;',
            'font-weight: 700;',
            'color: var(--accent);',
            'margin: 16px 0 8px;',
          '">' + score + ' / ' + total + '</div>',

          '<div style="',
            'font-size: 1.1rem;',
            'color: var(--muted);',
            'margin-bottom: 6px;',
          '">' + pct + '%</div>',

          // Progress bar
          '<div style="',
            'height: 8px;',
            'background: var(--faint);',
            'border-radius: 4px;',
            'margin: 12px auto 20px;',
            'max-width: 280px;',
            'overflow: hidden;',
          '">',
            '<div style="',
              'height: 100%;',
              'width: ' + pct + '%;',
              'background: linear-gradient(90deg, var(--accent), #27ae60);',
              'border-radius: 4px;',
            '"></div>',
          '</div>',

          '<p style="color: var(--text); font-size: 1rem; margin-bottom: 28px;">' + _escHtml(reactionText) + '</p>',

          '<div class="results-buttons">',
            '<button onclick="' + repeatAction + '" class="restart-button"> Повторить</button>',
            '<button onclick="formulaBackToList()" class="menu-button"> Все формулы</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },
};

// ─── Helper: escape HTML special chars ──────────────────────────────────────────

function _escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Global export ────────────────────────────────────────────────────────────────

if (typeof window !== 'undefined') {
  window.FormulasUI = FormulasUI;
}
