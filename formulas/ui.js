/**
 * Spanish Trainer - 20 Formulas
 * UI Renderer: all views injected into #formulas-content
 */

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
          'background: white;',
          'border-radius: 12px;',
          'padding: 18px 16px;',
          'cursor: pointer;',
          'transition: transform 0.2s, box-shadow 0.2s;',
          'box-shadow: 0 3px 12px rgba(0,0,0,0.15);',
          'display: flex;',
          'flex-direction: column;',
          'gap: 6px;',
        '">',
          '<div style="font-size: 2rem; line-height: 1;">' + formula.emoji + '</div>',
          '<div style="font-weight: 700; font-size: 0.85rem; color: #2c3e50;">' + formula.shortName + '</div>',
          '<div style="',
            'background: #f0ecff;',
            'color: #5a3fa5;',
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

        // Header
        '<div style="text-align: center; margin-bottom: 24px;">',
          '<h2 style="color: white; font-size: 1.6rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.4);">',
            '36 Формул Испанского',
          '</h2>',
          '<p style="color: rgba(255,255,255,0.85); margin-top: 6px;">',
            'Нажми на формулу, чтобы изучить',
          '</p>',
        '</div>',

        // "Quiz all" + "Marathon" buttons
        '<div style="text-align: center; margin-bottom: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">',
          '<button onclick="formulaStartAllQuiz()" class="next-button" style="',
            'display: inline-block;',
            'width: auto;',
            'padding: 12px 28px;',
            'font-size: 1rem;',
          '">',
            '🎯 Тест: все 216 вопросов',
          '</button>',
          '<button onclick="formulaStartMarathon()" style="',
            'display: inline-block;',
            'width: auto;',
            'padding: 12px 28px;',
            'font-size: 1rem;',
            'font-weight: 700;',
            'border: none;',
            'border-radius: 8px;',
            'cursor: pointer;',
            'background: linear-gradient(135deg, #f59e0b, #ef4444);',
            'color: white;',
            'box-shadow: 0 3px 12px rgba(239,68,68,0.35);',
            'transition: opacity 0.15s;',
          '" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">',
            '🔥 Марафон',
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

    // Hover effect via JS (no separate CSS needed)
    root.querySelectorAll('.formula-card-thumb').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 8px 24px rgba(102,126,234,0.4)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
        el.style.boxShadow = '0 3px 12px rgba(0,0,0,0.15)';
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
          'background: #fafafa;',
          'border-left: 3px solid #667eea;',
          'border-radius: 0 8px 8px 0;',
          'margin-bottom: 8px;',
        '">',
          '<div style="font-size: 1rem; color: #2c3e50; font-weight: 600;">' + _escHtml(ex.es) + '</div>',
          '<div style="font-size: 0.85rem; color: #7f8c8d; margin-top: 2px;">' + _escHtml(ex.ru) + '</div>',
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
              'background: linear-gradient(135deg, #667eea, #764ba2);',
              'color: white;',
              'padding: 4px 14px;',
              'border-radius: 20px;',
              'font-size: 0.8rem;',
              'font-weight: 700;',
            '">Формула ' + formula.id + ' / 20</span>',
            '<span style="color: #aaa; font-size: 0.85rem;">' + formula.emoji + '</span>',
          '</div>',

          // Name
          '<h2 style="color: #2c3e50; margin-bottom: 6px; font-size: 1.3rem;">' + _escHtml(formula.name) + '</h2>',
          '<p style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 16px;">' + _escHtml(formula.description) + '</p>',

          // Rule box
          '<div style="',
            'background: #f0ecff;',
            'border: 1.5px solid #c4b5f7;',
            'border-radius: 8px;',
            'padding: 12px 16px;',
            'margin-bottom: 20px;',
          '">',
            '<div style="font-size: 0.75rem; color: #7c5cbf; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Правило</div>',
            '<div style="font-family: monospace; font-size: 0.95rem; color: #4a2fa0; font-weight: 600;">' + _escHtml(formula.rule) + '</div>',
          '</div>',

          // Main example
          '<div style="',
            'background: linear-gradient(135deg, #667eea12, #764ba212);',
            'border-radius: 10px;',
            'padding: 16px;',
            'text-align: center;',
            'margin-bottom: 16px;',
            'position: relative;',
          '">',
            '<div style="font-size: 1.4rem; font-weight: 700; color: #2c3e50; margin-bottom: 4px;">' + _escHtml(formula.example) + '</div>',
            '<div style="font-size: 0.9rem; color: #7f8c8d; font-style: italic; margin-bottom: 8px;">' + _escHtml(formula.exampleRu) + '</div>',
            '<button onclick="window.formulaSpeakExample(\'' + _escHtml(formula.example).replace(/'/g, "\\'") + '\')" title="Озвучить" style="',
              'background: linear-gradient(135deg, #667eea, #764ba2);',
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
              '🔊 Послушать',
            '</button>',
          '</div>',

          // Extra examples
          '<div style="margin-bottom: 20px;">',
            '<div style="font-size: 0.78rem; color: #aaa; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Ещё примеры</div>',
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
                'background: linear-gradient(135deg, #95a5a6, #7f8c8d);',
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
                'background: linear-gradient(135deg, #667eea, #764ba2);',
                'color: white;',
              '">След. →</button>',
            ].join('') : ''),

          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
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
            'border: 2px solid #e2e8f0;',
            'border-radius: 10px;',
            'background: white;',
            'cursor: pointer;',
            'transition: border-color 0.2s, background 0.2s;',
            'text-align: left;',
            'font-size: 0.97rem;',
            'font-family: inherit;',
            'color: #2c3e50;',
          '"',
        '>',
          '<span style="',
            'display: inline-flex;',
            'align-items: center;',
            'justify-content: center;',
            'width: 28px;',
            'height: 28px;',
            'border-radius: 50%;',
            'background: #f0ecff;',
            'color: #5a3fa5;',
            'font-weight: 700;',
            'font-size: 0.8rem;',
            'flex-shrink: 0;',
          '">' + optionLabels[i] + '</span>',
          '<span>' + _escHtml(option) + '</span>',
        '</button>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;">',
        '<div class="game-area" style="padding: 22px 20px;">',

          // Top row: formula badge + back
          '<div style="',
            'display: flex;',
            'justify-content: space-between;',
            'align-items: center;',
            'margin-bottom: 16px;',
          '">',
            '<span style="',
              'background: linear-gradient(135deg, #667eea, #764ba2);',
              'color: white;',
              'padding: 4px 14px;',
              'border-radius: 20px;',
              'font-size: 0.78rem;',
              'font-weight: 700;',
            '">' + formulaEmoji + ' ' + _escHtml(formulaName) + '</span>',
            '<button onclick="formulaBackToList()" style="',
              'background: none;',
              'border: none;',
              'color: #aaa;',
              'cursor: pointer;',
              'font-size: 1.2rem;',
              'padding: 4px;',
            '" title="К списку">✕</button>',
          '</div>',

          // Progress bar
          '<div style="',
            'height: 5px;',
            'background: #e2e8f0;',
            'border-radius: 3px;',
            'margin-bottom: 14px;',
            'overflow: hidden;',
          '">',
            '<div style="',
              'height: 100%;',
              'width: ' + Math.round(((qIndex) / total) * 100) + '%;',
              'background: linear-gradient(90deg, #667eea, #764ba2);',
              'border-radius: 3px;',
              'transition: width 0.3s;',
            '"></div>',
          '</div>',

          // Counter + score (+ marathon remaining)
          '<div style="',
            'display: flex;',
            'justify-content: space-between;',
            'align-items: center;',
            'margin-bottom: 18px;',
            'font-size: 0.85rem;',
            'color: #7f8c8d;',
            'flex-wrap: wrap;',
            'gap: 6px;',
          '">',
            (marathonLeft != null
              ? '<span style="background:#fff3cd;color:#856404;padding:2px 10px;border-radius:20px;font-weight:700;">🔥 Осталось: ' + marathonLeft + '</span>'
              : '<span>Вопрос ' + (qIndex + 1) + ' из ' + total + '</span>'
            ),
            '<span>✅ ' + score + ' / ' + qIndex + '</span>',
          '</div>',

          // Question text
          '<div style="',
            'font-size: 1.25rem;',
            'font-weight: 700;',
            'color: #2c3e50;',
            'text-align: center;',
            'margin-bottom: 22px;',
            'line-height: 1.4;',
          '">' + _escHtml(question.question) + '</div>',

          // Options
          '<div id="formula-options" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">',
            optionsHtml,
          '</div>',

          // Feedback area (hidden initially)
          '<div id="formula-feedback" style="display: none;"></div>',

          // Next button (hidden initially)
          '<div id="formula-next-wrap" style="display: none; text-align: center; margin-top: 14px;">',
            '<button onclick="formulaNext()" class="next-button" style="',
              'width: auto;',
              'display: inline-block;',
              'padding: 12px 36px;',
            '">Дальше →</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;

    // Add hover effect on option buttons
    root.querySelectorAll('[id^="formula-opt-"]').forEach(function(btn) {
      btn.addEventListener('mouseenter', function() {
        if (!btn.disabled) {
          btn.style.borderColor = '#667eea';
          btn.style.background = '#f8f6ff';
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

    // Show feedback box
    var isCorrect = selectedIndex === correctIndex;
    var feedbackEl = root.querySelector('#formula-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.style.padding = '12px 16px';
      feedbackEl.style.borderRadius = '8px';
      feedbackEl.style.marginTop = '8px';
      feedbackEl.style.fontSize = '0.9rem';
      feedbackEl.style.lineHeight = '1.5';

      if (isCorrect) {
        feedbackEl.style.background = '#d4edda';
        feedbackEl.style.color = '#155724';
        feedbackEl.style.border = '1px solid #c3e6cb';
        feedbackEl.innerHTML = '<strong>✅ Верно!</strong> ' + _escHtml(hint);
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<strong>❌ Неверно.</strong> ' + _escHtml(hint);
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

    var reaction;
    if (pct === 100) {
      reaction = '🎉 Отлично! Все верно!';
    } else if (pct >= 75) {
      reaction = '👏 Хорошо! Почти все верно!';
    } else if (pct >= 50) {
      reaction = '👍 Неплохо! Можно лучше';
    } else {
      reaction = '📚 Нужно повторить материал';
    }

    var repeatAction = quizMode === 'all'
      ? 'formulaStartAllQuiz()'
      : quizMode === 'marathon'
        ? 'formulaStartMarathon()'
        : 'formulaStartQuiz(' + FormulasApp.state.currentFormulaIndex + ')';

    var html = [
      '<div style="max-width: 500px; margin: 0 auto;">',
        '<div class="game-area" style="text-align: center; padding: 32px 24px;">',

          '<div style="font-size: 3rem; margin-bottom: 12px;">' + reaction.split(' ')[0] + '</div>',

          '<h2 style="color: #2c3e50; margin-bottom: 8px; font-size: 1.4rem;">Результат</h2>',

          '<div style="',
            'font-size: 3rem;',
            'font-weight: 700;',
            'color: #667eea;',
            'margin: 16px 0 8px;',
          '">' + score + ' / ' + total + '</div>',

          '<div style="',
            'font-size: 1.1rem;',
            'color: #7f8c8d;',
            'margin-bottom: 6px;',
          '">' + pct + '%</div>',

          // Progress bar
          '<div style="',
            'height: 8px;',
            'background: #e2e8f0;',
            'border-radius: 4px;',
            'margin: 12px auto 20px;',
            'max-width: 280px;',
            'overflow: hidden;',
          '">',
            '<div style="',
              'height: 100%;',
              'width: ' + pct + '%;',
              'background: linear-gradient(90deg, #667eea, #27ae60);',
              'border-radius: 4px;',
            '"></div>',
          '</div>',

          '<p style="color: #555; font-size: 1rem; margin-bottom: 28px;">' + _escHtml(reaction.substring(reaction.indexOf(' ') + 1)) + '</p>',

          '<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">',
            '<button onclick="' + repeatAction + '" class="next-button" style="',
              'width: auto;',
              'display: inline-block;',
              'padding: 12px 28px;',
            '">🔁 Повторить</button>',
            '<button onclick="formulaBackToList()" class="menu-button" style="',
              'width: auto;',
              'display: inline-block;',
              'padding: 12px 28px;',
            '">📚 Все формулы</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    root.innerHTML = html;
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
