/**
 * SlovaPages.words — страница «Слова» с виртуальным списком.
 * Порт Cards/src/pages/WordsPage.tsx на Vanilla JS.
 */

(function () {
  var ROW_HEIGHT = 64;
  var OVERSCAN = 8;
  var CONTAINER_HEIGHT = 560;

  // ── POS / STATUS / SORT definitions ────────────────────────────────────────

  var POS_FILTERS = ['все', 'noun', 'verb', 'adj', 'adv', 'other'];
  var POS_LABELS = { 'все': 'все', noun: 'сущ.', verb: 'глаг.', adj: 'прил.', adv: 'нареч.', other: 'прочее' };

  var STATUS_FILTERS = ['новые', 'учу', 'знаю', 'пора'];
  var STATUS_LABELS  = { 'новые': 'новые', 'учу': 'учу', 'знаю': 'знаю', 'пора': 'пора повтор' };

  var SORT_KEYS   = ['rank', 'alpha', 'translation', 'status-new', 'status-known', 'next-review'];
  var SORT_LABELS = {
    'rank':         'по рангу',
    'alpha':        'по алфавиту',
    'translation':  'по переводу',
    'status-new':   'сначала новые',
    'status-known': 'сначала выученные',
    'next-review':  'по дате повтора',
  };

  // ── Module state ────────────────────────────────────────────────────────────

  var _state = {
    search:       '',
    posFilter:    'все',
    statusFilter: null,   // null = «все», string = active filter
    sortBy:       'rank',
    scrollTop:    0,
    rafPending:   false,
  };

  var _ctx = null;
  var _scrollContainer = null;

  // ── Helpers ─────────────────────────────────────────────────────────────────

  function _getPosGroup(pos) {
    return SlovaUI.getPosGroup(pos);
  }

  function _getWordStatus(prog) {
    // Returns: 'new', 'learning', 'known', 'excluded'
    return SlovaUI.getWordStatus(prog);
  }

  function _isDue(prog) {
    if (!prog) return false;
    return SlovaSRS.isDue(prog);
  }

  function _getProgress(wordId) {
    if (!_ctx) return undefined;
    return SlovaStore.getProgress(_ctx.state, wordId);
  }

  // ── Data pipeline ────────────────────────────────────────────────────────────

  function _computeFiltered() {
    var words = _ctx.topicWords;  // already topic-filtered

    // Attach progress + derived status
    var withStatus = words.map(function (w) {
      var prog  = _getProgress(w.id);
      var stat  = _getWordStatus(prog);
      var due   = stat === 'learning' && _isDue(prog);
      return { word: w, prog: prog, status: stat, due: due, posGroup: _getPosGroup(w.partOfSpeech) };
    });

    // Search filter
    var q = _state.search.trim().toLowerCase();
    if (q) {
      var isNum = /^\d+$/.test(q);
      withStatus = withStatus.filter(function (item) {
        if (item.word.word.toLowerCase().includes(q))        return true;
        if (item.word.translation.toLowerCase().includes(q)) return true;
        if (isNum && String(item.word.rank).includes(q))     return true;
        return false;
      });
    }

    // POS filter
    if (_state.posFilter !== 'все') {
      withStatus = withStatus.filter(function (item) {
        return item.posGroup === _state.posFilter;
      });
    }

    // Status filter
    if (_state.statusFilter) {
      var sf = _state.statusFilter;
      withStatus = withStatus.filter(function (item) {
        if (sf === 'новые')  return item.status === 'new';
        if (sf === 'учу')    return item.status === 'learning';
        if (sf === 'знаю')   return item.status === 'known' || item.status === 'excluded';
        if (sf === 'пора')   return item.due;
        return true;
      });
    }

    // Sort
    var sorted = withStatus.slice();
    switch (_state.sortBy) {
      case 'rank':
        sorted.sort(function (a, b) { return a.word.rank - b.word.rank; });
        break;
      case 'alpha':
        sorted.sort(function (a, b) { return a.word.word.localeCompare(b.word.word); });
        break;
      case 'translation':
        sorted.sort(function (a, b) { return a.word.translation.localeCompare(b.word.translation); });
        break;
      case 'status-new': {
        var order = { new: 0, learning: 1, known: 2, excluded: 3 };
        sorted.sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0); });
        break;
      }
      case 'status-known': {
        var orderK = { known: 0, excluded: 1, learning: 2, new: 3 };
        sorted.sort(function (a, b) { return (orderK[a.status] || 0) - (orderK[b.status] || 0); });
        break;
      }
      case 'next-review':
        sorted.sort(function (a, b) {
          var ta = a.prog ? a.prog.nextReview : Infinity;
          var tb = b.prog ? b.prog.nextReview : Infinity;
          if (!a.due) ta = Infinity;
          if (!b.due) tb = Infinity;
          return ta - tb;
        });
        break;
    }
    return sorted;
  }

  function _computeCounters(allTopicWords) {
    var newCount      = 0;
    var learningCount = 0;
    var knownCount    = 0;
    allTopicWords.forEach(function (w) {
      var prog = _getProgress(w.id);
      var s    = _getWordStatus(prog);
      if (s === 'new')                      newCount++;
      else if (s === 'learning')            learningCount++;
      else if (s === 'known' || s === 'excluded') knownCount++;
    });
    return { newCount: newCount, learningCount: learningCount, knownCount: knownCount };
  }

  // ── HTML builders ────────────────────────────────────────────────────────────

  function _buildStatusCell(item) {
    var status  = item.status;
    var due     = item.due;
    var prog    = item.prog;
    var badgeCls, badgeText;

    if (status === 'new') {
      badgeCls  = 'status-badge--new';
      badgeText = 'новое';
    } else if (status === 'excluded') {
      badgeCls  = 'status-badge--new';
      badgeText = 'исключено';
    } else if (status === 'known') {
      badgeCls  = 'status-badge--know';
      var days  = prog ? Math.round(prog.interval / 1440) : 0;
      badgeText = 'через ' + days + ' д.';
    } else {
      // learning
      badgeCls  = due ? 'status-badge--due' : 'status-badge--learning';
      badgeText = due ? 'пора повтор' : 'учится';
    }

    var sub = '';
    if (due) {
      sub = '<span class="status-sub">пора повтор</span>';
    } else if (status === 'known' && prog) {
      var daysLeft = Math.round(prog.interval / 1440);
      sub = '<span class="status-sub">через ' + daysLeft + ' д.</span>';
    }

    var actionBtns = '';
    if (item.word.custom) {
      var wordId  = SlovaUI.esc(item.word.id);
      actionBtns =
        '<button class="edit-word-btn"   data-action="edit"   data-word-id="' + wordId + '" title="Редактировать">&#9999;</button>' +
        '<button class="delete-word-btn" data-action="delete" data-word-id="' + wordId + '" title="Удалить">&times;</button>';
    }

    return '<span class="wt-col wt-col--status">' +
      '<span class="status-badge ' + badgeCls + '">' + SlovaUI.esc(badgeText) + '</span>' +
      sub + actionBtns +
    '</span>';
  }

  function _buildRow(item) {
    var word    = item.word;
    var rowCls  = 'words-row' +
      (item.status === 'new' ? ' words-row--new' : '') +
      (word.custom ? ' words-row--custom' : '');

    var phonetic = word.phonetic
      ? ' <span class="word-phonetic">(' + SlovaUI.esc(word.phonetic) + ')</span>'
      : '';
    var customBadge = word.custom
      ? '<span class="custom-badge">своё</span>'
      : '';

    return '<div class="' + rowCls + '" style="height:' + ROW_HEIGHT + 'px">' +
      '<span class="wt-col wt-col--rank"><span class="rank-num">' + SlovaUI.esc(String(word.rank)) + '</span></span>' +
      '<span class="wt-col wt-col--word"><span class="word-text">' + SlovaUI.esc(word.word) + '</span>' + phonetic + customBadge + '</span>' +
      '<span class="wt-col wt-col--pos">' + SlovaUI.esc(SlovaUI.getPosShort(word.partOfSpeech)) + '</span>' +
      '<span class="wt-col wt-col--translation wt-col--translation-main">' + SlovaUI.esc(word.translation) + '</span>' +
      _buildStatusCell(item) +
    '</div>';
  }

  function _buildFilterRow() {
    var html = '<div class="filter-row">';
    POS_FILTERS.forEach(function (f) {
      var cls = 'filter-chip' + (_state.posFilter === f ? ' filter-chip--active' : '');
      html += '<button class="' + cls + '" data-pos="' + f + '">' + POS_LABELS[f] + '</button>';
    });
    html += '<div class="filter-divider"></div>';
    STATUS_FILTERS.forEach(function (f) {
      var sfKey = f.replace(' ', '-');
      var active = _state.statusFilter === f ? ' filter-chip--active' : '';
      html += '<button class="filter-chip filter-chip--status filter-chip--status-' + sfKey + active + '" data-status="' + f + '">' + STATUS_LABELS[f] + '</button>';
    });
    html += '</div>';
    return html;
  }

  function _buildSortRow() {
    var html = '<div class="sort-row">';
    SORT_KEYS.forEach(function (s) {
      var cls = 'sort-chip' + (_state.sortBy === s ? ' sort-chip--active' : '');
      html += '<button class="' + cls + '" data-sort="' + s + '">' + SORT_LABELS[s] + '</button>';
    });
    html += '</div>';
    return html;
  }

  function _buildTopicBar() {
    var topics = window.SLOVA_TOPICS || [];
    var active = _ctx.activeTopic;
    var activeId = active ? active.id : null;

    var html = '<div class="topics-bar">';
    html += '<button class="topic-chip' + (!activeId ? ' topic-chip--active' : '') + '" data-topic-id="">все слова</button>';
    topics.forEach(function (t) {
      var cls = 'topic-chip' + (activeId === t.id ? ' topic-chip--active' : '');
      html += '<button class="' + cls + '" data-topic-id="' + SlovaUI.esc(t.id) + '">' + SlovaUI.esc(t.emoji) + ' ' + SlovaUI.esc(t.label) + '</button>';
    });
    html += '</div>';
    return html;
  }

  function _buildTopicLearnBar() {
    var active = _ctx.activeTopic;
    if (!active) return '';
    var count = _ctx.topicWords.length;
    return '<div class="topic-learn-bar">' +
      '<span class="topic-learn-info">' + SlovaUI.esc(active.emoji) + ' <b>' + SlovaUI.esc(active.label) + '</b> — ' + count + ' слов</span>' +
      '<button class="topic-learn-btn" data-action="learn-topic">Учить эту тему →</button>' +
    '</div>';
  }

  function _buildCountersHtml(filtered, allTopicWords) {
    var counters = _computeCounters(allTopicWords);
    return '<div class="words-stats-row" id="words-stats-row">' +
      '<span class="words-stat">найдено <b>' + filtered.length + '</b></span>' +
      '<span class="words-stat-sep">·</span>' +
      '<span class="words-stat">открыто <b>' + counters.learningCount + '</b></span>' +
      '<span class="words-stat-sep">·</span>' +
      '<span class="words-stat">знаю <b>' + counters.knownCount + '</b></span>' +
      '<span class="words-stat-sep">·</span>' +
      '<span class="words-stat">новые <b>' + counters.newCount + '</b></span>' +
    '</div>';
  }

  // ── Virtual list ─────────────────────────────────────────────────────────────

  function _getVisibleSlice(filtered, scrollTop) {
    var startIdx = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    var endIdx   = Math.min(
      filtered.length - 1,
      Math.ceil((scrollTop + CONTAINER_HEIGHT) / ROW_HEIGHT) + OVERSCAN
    );
    return { startIdx: startIdx, endIdx: endIdx };
  }

  function _renderVirtualInner(listEl, filtered, scrollTop) {
    if (filtered.length === 0) {
      listEl.innerHTML = '';
      return;
    }
    var totalH = filtered.length * ROW_HEIGHT;
    var slice  = _getVisibleSlice(filtered, scrollTop);
    var offsetTop = slice.startIdx * ROW_HEIGHT;

    var rowsHtml = '';
    for (var i = slice.startIdx; i <= slice.endIdx; i++) {
      rowsHtml += _buildRow(filtered[i]);
    }

    listEl.innerHTML =
      '<div style="height:' + totalH + 'px;position:relative">' +
        '<div style="position:absolute;top:' + offsetTop + 'px;left:0;right:0">' +
          rowsHtml +
        '</div>' +
      '</div>';
  }

  // ── Event delegation ─────────────────────────────────────────────────────────

  function _handleClick(e, root) {
    // topic chip
    var topicBtn = e.target.closest('[data-topic-id]');
    if (topicBtn) {
      var tid = topicBtn.dataset.topicId;
      if (!tid) {
        _ctx.clearTopic();
      } else {
        var active = _ctx.activeTopic;
        if (active && active.id === tid) {
          _ctx.clearTopic();
        } else {
          _ctx.setTopic(tid);
        }
      }
      return;
    }

    // learn topic button
    var learnBtn = e.target.closest('[data-action="learn-topic"]');
    if (learnBtn) {
      _ctx.goTo('learn');
      return;
    }

    // POS filter chip
    var posBtn = e.target.closest('[data-pos]');
    if (posBtn) {
      _state.posFilter = posBtn.dataset.pos;
      _partialUpdate(root);
      return;
    }

    // Status filter chip
    var statBtn = e.target.closest('[data-status]');
    if (statBtn) {
      var sf = statBtn.dataset.status;
      _state.statusFilter = (_state.statusFilter === sf) ? null : sf;
      _partialUpdate(root);
      return;
    }

    // Sort chip
    var sortBtn = e.target.closest('[data-sort]');
    if (sortBtn) {
      _state.sortBy = sortBtn.dataset.sort;
      _partialUpdate(root);
      return;
    }

    // Edit custom word
    var editBtn = e.target.closest('[data-action="edit"]');
    if (editBtn) {
      var editId = editBtn.dataset.wordId;
      var allWords = _ctx.words;
      var found = null;
      for (var i = 0; i < allWords.length; i++) {
        if (allWords[i].id === editId) { found = allWords[i]; break; }
      }
      if (found) _ctx.openWordModal(found);
      return;
    }

    // Delete custom word
    var delBtn = e.target.closest('[data-action="delete"]');
    if (delBtn) {
      _ctx.deleteCustomWord(delBtn.dataset.wordId);
      return;
    }

    // Add word button
    var addBtn = e.target.closest('[data-action="add-word"]');
    if (addBtn) {
      _ctx.openWordModal();
      return;
    }
  }

  // ── Partial update (filter/sort change, scroll) ───────────────────────────────

  function _partialUpdate(root) {
    var filtered = _computeFiltered();

    // Update filter chips
    var filterWrap = root.querySelector('.words-filters');
    if (filterWrap) {
      filterWrap.innerHTML = _buildFilterRow() + _buildSortRow();
    }

    // Update counters
    var statsRow = root.querySelector('#words-stats-row');
    if (statsRow) {
      statsRow.outerHTML = _buildCountersHtml(filtered, _ctx.topicWords);
    }

    // Update topic bar (topic-learn-bar may appear/disappear)
    var topicsBarEl = root.querySelector('.topics-bar');
    if (topicsBarEl) {
      topicsBarEl.outerHTML = _buildTopicBar();
      // Re-attach events handled by delegation (no need, delegation is on root)
    }

    // topic learn bar
    var learnBarEl = root.querySelector('.topic-learn-bar');
    var newLearnBarHtml = _buildTopicLearnBar();
    if (learnBarEl) {
      if (newLearnBarHtml) {
        learnBarEl.outerHTML = newLearnBarHtml;
      } else {
        learnBarEl.remove();
      }
    } else if (newLearnBarHtml) {
      // Insert after topics-bar
      var topicsBarNew = root.querySelector('.topics-bar');
      if (topicsBarNew && topicsBarNew.parentNode) {
        var div = document.createElement('div');
        div.innerHTML = newLearnBarHtml;
        topicsBarNew.parentNode.insertBefore(div.firstChild, topicsBarNew.nextSibling);
      }
    }

    // Reset scroll to top when filters change
    _state.scrollTop = 0;
    if (_scrollContainer) _scrollContainer.scrollTop = 0;

    // Update table
    var tableEl = root.querySelector('.words-table');
    if (tableEl) {
      tableEl.innerHTML = _buildTableHtml(filtered);
      _attachScroll(root, filtered);
    }
  }

  function _buildTableHtml(filtered) {
    var header =
      '<div class="words-table-header">' +
        '<span class="wt-col wt-col--rank">ранг</span>' +
        '<span class="wt-col wt-col--word">слово</span>' +
        '<span class="wt-col wt-col--pos">часть речи</span>' +
        '<span class="wt-col wt-col--translation">перевод</span>' +
        '<span class="wt-col wt-col--status">статус</span>' +
      '</div>';

    if (filtered.length === 0) {
      return header + '<div class="words-empty">Ничего не найдено</div>';
    }

    return header +
      '<div class="words-virtual-container" id="words-vscroll" style="height:' + CONTAINER_HEIGHT + 'px;overflow-y:auto">' +
        '<div id="words-vlist"></div>' +
      '</div>';
  }

  function _attachScroll(root, filtered) {
    _scrollContainer = root.querySelector('#words-vscroll');
    var listEl = root.querySelector('#words-vlist');
    if (!_scrollContainer || !listEl) return;

    // Initial render
    _renderVirtualInner(listEl, filtered, _state.scrollTop);

    _scrollContainer.addEventListener('scroll', function () {
      if (_state.rafPending) return;
      _state.rafPending = true;
      requestAnimationFrame(function () {
        _state.rafPending = false;
        _state.scrollTop = _scrollContainer.scrollTop;
        _renderVirtualInner(listEl, filtered, _state.scrollTop);
      });
    });
  }

  // ── Full render ──────────────────────────────────────────────────────────────

  function _fullRender(root, ctx) {
    _ctx = ctx;
    var words       = ctx.topicWords;
    var totalCount  = ctx.words.length;
    var filtered    = _computeFiltered();

    var topicBarHtml     = _buildTopicBar();
    var topicLearnHtml   = _buildTopicLearnBar();
    var countersHtml     = _buildCountersHtml(filtered, words);
    var filtersHtml      = _buildFilterRow() + _buildSortRow();
    var tableHtml        = _buildTableHtml(filtered);

    root.innerHTML =
      '<div class="words-page">' +
        '<div class="words-header-block">' +
          '<div class="words-header-top">' +
            '<h2 class="words-title">' + totalCount + ' ' + SlovaUI.pluralWords(totalCount) + '</h2>' +
            '<button class="btn-add-word" data-action="add-word">+ Добавить</button>' +
          '</div>' +
          countersHtml +
        '</div>' +
        '<div class="words-search-wrap">' +
          '<input class="words-search" type="text" placeholder="поиск по слову, переводу или рангу" value="" autocomplete="off">' +
        '</div>' +
        topicBarHtml +
        topicLearnHtml +
        '<div class="words-filters">' + filtersHtml + '</div>' +
        '<div class="words-table">' + tableHtml + '</div>' +
      '</div>';

    // Search input listener — does NOT recreate the input, only updates list
    var searchInput = root.querySelector('.words-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        _state.search = searchInput.value;
        _state.scrollTop = 0;
        _updateListAndCounters(root);
      });
    }

    // Delegated clicks
    root.addEventListener('click', function (e) {
      _handleClick(e, root);
    });

    _attachScroll(root, filtered);
  }

  // Lightweight update: only list + counters (search typing path)
  function _updateListAndCounters(root) {
    var filtered = _computeFiltered();

    // Counters
    var statsRow = root.querySelector('#words-stats-row');
    if (statsRow) {
      statsRow.outerHTML = _buildCountersHtml(filtered, _ctx.topicWords);
    }

    // Scroll to top
    if (_scrollContainer) _scrollContainer.scrollTop = 0;

    // Table
    var tableEl = root.querySelector('.words-table');
    if (tableEl) {
      tableEl.innerHTML = _buildTableHtml(filtered);
      _attachScroll(root, filtered);
    }
  }

  // ── Re-render (called by app.js setState) ────────────────────────────────────
  // Preserve search input focus & cursor position

  function _reRender(root, ctx) {
    _ctx = ctx;

    var searchInput = root.querySelector('.words-search');
    var hadFocus    = searchInput && document.activeElement === searchInput;
    var selStart    = searchInput ? searchInput.selectionStart : 0;
    var selEnd      = searchInput ? searchInput.selectionEnd   : 0;
    // Keep internal search state (user may be mid-type)
    // BUT sync from input value if it exists
    if (searchInput) {
      _state.search = searchInput.value;
    }

    var filtered = _computeFiltered();

    // Update counters
    var statsRow = root.querySelector('#words-stats-row');
    if (statsRow) {
      statsRow.outerHTML = _buildCountersHtml(filtered, ctx.topicWords);
    }

    // Update topic bar (topic may have changed externally)
    var topicsBarEl = root.querySelector('.topics-bar');
    if (topicsBarEl) {
      topicsBarEl.outerHTML = _buildTopicBar();
    }

    // topic learn bar
    var learnBarEl     = root.querySelector('.topic-learn-bar');
    var newLearnBarHtml = _buildTopicLearnBar();
    if (learnBarEl) {
      if (newLearnBarHtml) {
        learnBarEl.outerHTML = newLearnBarHtml;
      } else {
        learnBarEl.remove();
      }
    } else if (newLearnBarHtml) {
      var topicsBarNew = root.querySelector('.topics-bar');
      if (topicsBarNew && topicsBarNew.parentNode) {
        var div = document.createElement('div');
        div.innerHTML = newLearnBarHtml;
        topicsBarNew.parentNode.insertBefore(div.firstChild, topicsBarNew.nextSibling);
      }
    }

    // Update filter chips
    var filterWrap = root.querySelector('.words-filters');
    if (filterWrap) {
      filterWrap.innerHTML = _buildFilterRow() + _buildSortRow();
    }

    // Update table
    var tableEl = root.querySelector('.words-table');
    if (tableEl) {
      tableEl.innerHTML = _buildTableHtml(filtered);
      _attachScroll(root, filtered);
    }

    // Restore focus
    if (hadFocus) {
      var newInput = root.querySelector('.words-search');
      if (newInput) {
        newInput.focus();
        try { newInput.setSelectionRange(selStart, selEnd); } catch (ex) {}
      }
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  window.SlovaPages = window.SlovaPages || {};
  window.SlovaPages.words = {
    render: function (root, ctx) {
      // Check if already mounted to preserve search input focus
      var existingSearch = root.querySelector('.words-search');
      if (existingSearch) {
        _reRender(root, ctx);
      } else {
        // Reset local UI state on fresh mount (e.g. page switch)
        _state.search       = '';
        _state.posFilter    = 'все';
        _state.statusFilter = null;
        _state.sortBy       = 'rank';
        _state.scrollTop    = 0;
        _state.rafPending   = false;
        _scrollContainer    = null;
        _fullRender(root, ctx);
      }
    },

    destroy: function () {
      _scrollContainer = null;
      _ctx = null;
    },
  };
}());
