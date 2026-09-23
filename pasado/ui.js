/**
 * Spanish Trainer — Прошедшее время
 * UI Renderer: all views injected into #pasado-content
 */

const PasadoUI = {

  _root: function() {
    return document.getElementById('pasado-content');
  },

  // ─── View: list ──────────────────────────────────────────────────────────────

  renderFormulaList: function() {
    var root = this._root();
    if (!root) return;

    // Group labels
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
            'transition: transform 0.2s, box-shadow 0.2s;',
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
      '<div style="max-width: 700px; margin: 0 auto; padding: 0 4px;">',

        '<div style="text-align: center; margin-bottom: 20px;">',
          '<h2 style="color: white; font-size: 1.5rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.4);">',
            'Прошедшее время',
          '</h2>',
          '<p style="color: rgba(255,255,255,0.8); margin-top: 6px; font-size: 0.9rem;">',
            '4 времени · 16 формул · нажми чтобы изучить',
          '</p>',
        '</div>',

        '<div style="text-align: center; margin-bottom: 20px;">',
          '<button onclick="pasadoStartAllQuiz()" class="next-button" style="',
            'display: inline-block; width: auto; padding: 12px 32px; font-size: 1rem;',
          '">',
            '🎯 Тест: все 96 вопросов',
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
        '">',
          '<div style="font-size: 1rem; color: #2c3e50; font-weight: 600;">' + _escHtmlP(ex.es) + '</div>',
          '<div style="font-size: 0.85rem; color: #7f8c8d; margin-top: 2px;">' + _escHtmlP(ex.ru) + '</div>',
        '</div>',
      ].join('');
    }).join('');

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;">',
        '<div class="game-area" style="padding: 24px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">',
            '<span style="',
              'background: linear-gradient(135deg, #3498db, #1a6ea8);',
              'color: white;',
              'padding: 4px 14px;',
              'border-radius: 20px;',
              'font-size: 0.8rem;',
              'font-weight: 700;',
            '">Формула ' + formula.id + ' / 16</span>',
            '<span style="color: #aaa; font-size: 0.85rem;">' + formula.emoji + '</span>',
          '</div>',

          '<h2 style="color: #2c3e50; margin-bottom: 6px; font-size: 1.3rem;">' + _escHtmlP(formula.name) + '</h2>',
          '<p style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 16px;">' + _escHtmlP(formula.description) + '</p>',

          '<div style="',
            'background: #e8f4fd;',
            'border: 1.5px solid #a8d4f0;',
            'border-radius: 8px;',
            'padding: 12px 16px;',
            'margin-bottom: 20px;',
          '">',
            '<div style="font-size: 0.75rem; color: #1a6ea8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Правило</div>',
            '<div style="font-family: monospace; font-size: 0.9rem; color: #0d4d80; font-weight: 600; white-space: pre-wrap; word-break: break-word;">' + _escHtmlP(formula.rule) + '</div>',
          '</div>',

          '<div style="',
            'background: linear-gradient(135deg, #3498db12, #1a6ea812);',
            'border-radius: 10px;',
            'padding: 16px;',
            'text-align: center;',
            'margin-bottom: 16px;',
          '">',
            '<div style="font-size: 1.4rem; font-weight: 700; color: #2c3e50; margin-bottom: 4px;">' + _escHtmlP(formula.example) + '</div>',
            '<div style="font-size: 0.9rem; color: #7f8c8d; font-style: italic;">' + _escHtmlP(formula.exampleRu) + '</div>',
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

  renderQuiz: function(question, formulaName, formulaEmoji, qIndex, total, score) {
    var root = this._root();
    if (!root) return;

    var optionLabels = ['A', 'B', 'C', 'D'];

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

    var html = [
      '<div style="max-width: 600px; margin: 0 auto;">',
        '<div class="game-area" style="padding: 22px 20px;">',

          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">',
            '<span style="',
              'background: linear-gradient(135deg, #3498db, #1a6ea8);',
              'color: white; padding: 4px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;',
            '">' + formulaEmoji + ' ' + _escHtmlP(formulaName) + '</span>',
            '<button onclick="pasadoBackToList()" style="background: none; border: none; color: #aaa; cursor: pointer; font-size: 1.2rem; padding: 4px;" title="К списку">✕</button>',
          '</div>',

          '<div style="height: 5px; background: #e2e8f0; border-radius: 3px; margin-bottom: 14px; overflow: hidden;">',
            '<div style="',
              'height: 100%; width: ' + Math.round((qIndex / total) * 100) + '%;',
              'background: linear-gradient(90deg, #3498db, #1a6ea8);',
              'border-radius: 3px; transition: width 0.3s;',
            '"></div>',
          '</div>',

          '<div style="display: flex; justify-content: space-between; margin-bottom: 18px; font-size: 0.85rem; color: #7f8c8d;">',
            '<span>Вопрос ' + (qIndex + 1) + ' из ' + total + '</span>',
            '<span>✅ ' + score + ' / ' + qIndex + '</span>',
          '</div>',

          '<div style="',
            'font-size: 1.2rem; font-weight: 700; color: #2c3e50;',
            'text-align: center; margin-bottom: 22px; line-height: 1.4;',
          '">' + _escHtmlP(question.question) + '</div>',

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

  showAnswerFeedback: function(selectedIndex, correctIndex, hint) {
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
    }

    if (selectedIndex !== correctIndex) {
      var wrongBtn = root.querySelector('#pasado-opt-' + selectedIndex);
      if (wrongBtn) {
        wrongBtn.style.borderColor = '#e74c3c';
        wrongBtn.style.background = '#f8d7da';
        wrongBtn.style.color = '#721c24';
      }
    }

    var isCorrect = selectedIndex === correctIndex;
    var feedbackEl = root.querySelector('#pasado-feedback');
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
        feedbackEl.innerHTML = '<strong>✅ Верно!</strong> ' + _escHtmlP(hint);
      } else {
        feedbackEl.style.background = '#f8d7da';
        feedbackEl.style.color = '#721c24';
        feedbackEl.style.border = '1px solid #f5c6cb';
        feedbackEl.innerHTML = '<strong>❌ Неверно.</strong> ' + _escHtmlP(hint);
      }
    }

    var nextWrap = root.querySelector('#pasado-next-wrap');
    if (nextWrap) {
      nextWrap.style.display = 'block';
    }
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

    var repeatAction = quizMode === 'all'
      ? 'pasadoStartAllQuiz()'
      : 'pasadoStartQuiz(' + PasadoApp.state.currentFormulaIndex + ')';

    var html = [
      '<div style="max-width: 500px; margin: 0 auto;">',
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
