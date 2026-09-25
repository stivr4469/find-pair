/* subjuntivo/ui.js v=1 */

var SUBJUNTIVO_ICONS = [
  '#16A34A', '#2563EB', '#EA580C', '#DC2626',
  '#9333EA', '#0891B2', '#B45309', '#DB2777',
  '#7C3AED', '#0D9488', '#D97706', '#DC2626',
];

var SubjuntivoUI = (function () {

  function _esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Список тем ── */
  function renderList() {
    var cards = SUBJUNTIVO_DATA.map(function (t, i) {
      var c = SUBJUNTIVO_ICONS[i];
      return '<div class="sj-card" onclick="subjuntivoShowCard(' + i + ')" role="button" tabindex="0">' +
        '<div class="sj-tag" style="color:' + c + ';background:' + c + '1a">' + _esc(t.tag) + '</div>' +
        '<div class="sj-card-name">' + _esc(t.name) + '</div>' +
        '<div class="sj-card-count">' + t.questions.length + ' вопросов</div>' +
        '</div>';
    }).join('');

    var total = SUBJUNTIVO_DATA.reduce(function (s, t) { return s + Math.min(3, t.questions.length); }, 0);

    return '<div class="view-enter">' +
      '<p class="sj-subtitle">Presente de Subjuntivo — наклонение параллельной реальности</p>' +
      '<button class="sj-all-btn" onclick="subjuntivoStartAll()">Тест по всем темам (' + total + ' вопросов)</button>' +
      '<div class="sj-grid stagger">' + cards + '</div>' +
      '</div>';
  }

  /* ── Карточка темы ── */
  function renderCard(idx) {
    var t = SUBJUNTIVO_DATA[idx];
    var c = SUBJUNTIVO_ICONS[idx];
    var examples = (t.examples || []).map(function (ex) {
      return '<div class="sj-example">' + _esc(ex) + '</div>';
    }).join('');

    return '<div class="view-enter">' +
      '<div class="sj-card-nav">' +
        '<button class="back-button" onclick="subjuntivoBackToList()">← Темы</button>' +
        '<span class="sj-card-nav-num">' + (idx + 1) + ' / ' + SUBJUNTIVO_DATA.length + '</span>' +
        '<div style="display:flex;gap:6px">' +
          '<button class="back-button" onclick="subjuntivoShowPrev()">‹</button>' +
          '<button class="back-button" onclick="subjuntivoShowNext()">›</button>' +
        '</div>' +
      '</div>' +
      '<div class="sj-tag" style="color:' + c + ';background:' + c + '1a">' + _esc(t.tag) + '</div>' +
      '<h2 class="sj-card-title">' + _esc(t.name) + '</h2>' +
      '<div class="sj-rule">' + _esc(t.rule) + '</div>' +
      (examples ? '<div class="sj-examples">' + examples + '</div>' : '') +
      '<button class="next-button" onclick="subjuntivoStartQuiz(' + idx + ')">Начать тест →</button>' +
      '</div>';
  }

  /* ── Вопрос квиза ── */
  function _isFill(q) {
    return q.type === 'fill' || (q.question && q.question.indexOf('___') !== -1);
  }

  function renderQuiz(q, num, total) {
    var body = _isFill(q) ? _renderFill(q, num, total) : _renderMCQ(q, num, total);
    return '<div class="view-enter">' +
      body +
      '<div id="sj-hint" class="sj-hint" hidden></div>' +
      '<button id="sj-next" class="next-button quiz-next-fixed" style="display:none" onclick="subjuntivoNext()">Дальше →</button>' +
      '</div>';
  }

  function _renderMCQ(q, num, total) {
    var opts = q.options.map(function (o, i) {
      return '<button class="option-btn sj-option" onclick="subjuntivoHandleAnswer(' + i + ')">' + _esc(o) + '</button>';
    }).join('');
    return '<p class="sj-qnum">' + num + ' / ' + total + '</p>' +
      '<p class="sj-question">' + _esc(q.question) + '</p>' +
      (q.questionRu ? '<p class="sj-sent-ru">' + _esc(q.questionRu) + '</p>' : '') +
      '<div class="sj-options stagger">' + opts + '</div>';
  }

  function _renderFill(q, num, total) {
    var sentence = q.sentence || q.question || '';
    var sentRu   = q.sentenceRu || q.questionRu;
    var tilesList = q.tiles || q.options || [];
    var parts = sentence.split('___');
    var sentHtml = _esc(parts[0]) +
      '<span id="sj-blank" class="sj-blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
      _esc(parts[1] || '');
    var tiles = tilesList.map(function (tile, i) {
      return '<button class="sj-tile" onclick="subjuntivoSelectTile(' + i + ')">' + _esc(tile) + '</button>';
    }).join('');
    return '<p class="sj-qnum">' + num + ' / ' + total + '</p>' +
      '<div class="sj-fill-box">' + sentHtml + '</div>' +
      (sentRu ? '<p class="sj-sent-ru">' + _esc(sentRu) + '</p>' : '') +
      (q.verb ? '<p class="sj-verb-label">' + _esc(q.verb) + '</p>' : '') +
      '<div class="sj-tiles stagger">' + tiles + '</div>';
  }

  /* ── Результаты ── */
  function renderResults(score, total, pct, topicIdx, mode) {
    var icon = window.ICON_RESULT
      ? (pct >= 80 ? window.ICON_RESULT.trophy : pct >= 50 ? window.ICON_RESULT.award : window.ICON_RESULT.bookOpen)
      : (pct >= 80 ? '🏆' : pct >= 50 ? '🎯' : '📖');
    var label = pct >= 80 ? 'Отлично! Subjuntivo под контролем 💜'
              : pct >= 50 ? 'Хорошо! Ещё немного практики.'
              : 'Не сдавайся — повтори тему!';
    var retryFn = (mode === 'all') ? 'subjuntivoStartAll()' : 'subjuntivoStartQuiz(' + topicIdx + ')';

    return '<div class="view-enter sj-results">' +
      '<div class="sj-res-icon" style="color:var(--sj)">' + icon + '</div>' +
      '<div class="sj-res-score">' + score + ' / ' + total + '</div>' +
      '<div class="sj-res-label">' + _esc(label) + '</div>' +
      '<button class="next-button" onclick="' + retryFn + '" style="margin-bottom:10px">Повторить →</button>' +
      '<button class="back-button" onclick="subjuntivoBackToList()" style="display:block;width:100%;margin-top:6px">← К темам</button>' +
      '</div>';
  }

  return { renderList: renderList, renderCard: renderCard, renderQuiz: renderQuiz, renderResults: renderResults, isFill: _isFill };
})();
