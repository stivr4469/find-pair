/**
 * SlovaApp — контроллер модуля Слова.
 * Состояние, навбар, роутер, связь с VamoS.
 */

var SlovaApp = (function () {
  var _root = null;
  var _modalRoot = null;
  var _state = null;
  var _customWords = [];
  var _currentPage = 'learn';
  var _activeTopic = null;

  // ---------- VamoS integration ----------

  function _vamosSave() {
    try {
      // vamos:last
      localStorage.setItem('vamos:last', JSON.stringify('slova'));
      // vamos:progress: % выученных испанских слов (repetitions >= 3, не исключённые)
      var allEsWords = (window.SLOVA_WORDS_ES || []);
      var total = allEsWords.length;
      if (total === 0) return;
      var learned = 0;
      if (_state && _state.progress) {
        var prog = _state.progress;
        allEsWords.forEach(function (w) {
          var p = prog[w.id];
          if (p && p.repetitions >= 3 && p.repetitions !== 999) learned++;
        });
      }
      var pct = Math.round((learned / total) * 100);
      var all = {};
      try { all = JSON.parse(localStorage.getItem('vamos:progress')) || {}; } catch (e) {}
      all['slova'] = Math.max(0, Math.min(100, pct));
      localStorage.setItem('vamos:progress', JSON.stringify(all));
    } catch (e) { /* quota or unavailable */ }
  }

  // ---------- Words computation ----------

  function _getWords() {
    var lang = _state.selectedLanguage;
    var builtIn = lang === 'es' ? (window.SLOVA_WORDS_ES || []) : (window.SLOVA_WORDS_EN || []);
    var custom = _customWords.filter(function (w) { return w.language === lang; });
    return builtIn.concat(custom);
  }

  function _getTopicWords(words) {
    if (!_activeTopic) return words;
    var topics = window.SLOVA_TOPICS || [];
    var topic = topics.find(function (t) { return t.id === _activeTopic; });
    if (!topic) return words;
    var lang = _state.selectedLanguage;
    var topicSet = new Set((topic.words[lang] || []).map(function (w) { return w.toLowerCase(); }));
    return words.filter(function (w) { return topicSet.has(w.word.toLowerCase()); });
  }

  function _getActiveTopic() {
    if (!_activeTopic) return null;
    var topics = window.SLOVA_TOPICS || [];
    return topics.find(function (t) { return t.id === _activeTopic; }) || null;
  }

  // ---------- Context (passed to pages) ----------

  function _buildCtx() {
    var words = _getWords();
    var topicWords = _getTopicWords(words);
    return {
      state: _state,
      setState: function (next) {
        _state = next;
        SlovaStore.saveState(_state);
        _vamosSave();
        _renderCurrentPage();
      },
      words: words,
      topicWords: topicWords,
      activeTopic: _getActiveTopic(),
      setTopic: function (id) {
        _activeTopic = id;
        if (id) _goTo('words');
        else _renderCurrentPage();
      },
      clearTopic: function () {
        _activeTopic = null;
        _renderCurrentPage();
      },
      goTo: _goTo,
      setLanguage: function (lang) {
        var next = SlovaStore.setLanguage(_state, lang);
        _state = next;
        SlovaStore.saveState(_state);
        _activeTopic = null;
        _vamosSave();
        _renderCurrentPage();
      },
      setMaxNewPerDay: function (n) {
        var next = SlovaStore.setMaxNewPerDay(_state, n);
        _state = next;
        SlovaStore.saveState(_state);
        _renderCurrentPage();
      },
      openWordModal: function (word) {
        _openWordModal(word || null);
      },
      deleteCustomWord: function (id) {
        if (!confirm('Удалить это слово?')) return;
        _customWords = SlovaStore.deleteCustomWord(id);
        _renderCurrentPage();
      },
      allWords: {
        en: window.SLOVA_WORDS_EN || [],
        es: window.SLOVA_WORDS_ES || [],
      },
    };
  }

  // ---------- Page routing ----------

  function _goTo(page) {
    var pages = ['learn', 'words', 'diary', 'languages'];
    if (pages.indexOf(page) === -1) return;
    if (_currentPage !== page) {
      _destroyCurrentPage();
    }
    _currentPage = page;
    _renderNavbar();
    _renderCurrentPage();
  }

  function _destroyCurrentPage() {
    var pageObj = SlovaPages && SlovaPages[_currentPage];
    if (pageObj && typeof pageObj.destroy === 'function') {
      try { pageObj.destroy(); } catch (e) {}
    }
  }

  function _renderCurrentPage() {
    if (!_root) return;
    var ctx = _buildCtx();
    var pageObj = window.SlovaPages && window.SlovaPages[_currentPage];
    if (pageObj && typeof pageObj.render === 'function') {
      try {
        pageObj.render(_root, ctx);
      } catch (e) {
        console.error('SlovaApp: page render error:', e);
        _root.innerHTML = '<div style="padding:20px;color:var(--danger)">Ошибка загрузки страницы: ' + SlovaUI.esc(String(e)) + '</div>';
      }
    } else {
      // Stub
      var labels = { learn: 'Учить', words: 'Слова', diary: 'Дневник', languages: 'Языки' };
      _root.innerHTML = '<div class="slova-stub view-enter"><p>' + (labels[_currentPage] || _currentPage) + ' — в работе</p></div>';
    }
  }

  // ---------- Navbar ----------

  function _renderNavbar() {
    var nav = document.getElementById('slova-navbar');
    if (!nav) return;
    var lang = _state.selectedLanguage;
    var page = _currentPage;

    var tabs = [
      { id: 'languages', label: 'Языки' },
      { id: 'learn',     label: 'Учить' },
      { id: 'words',     label: 'Слова' },
      { id: 'diary',     label: 'Дневник' },
    ];

    var tabsHtml = tabs.map(function (t) {
      var cls = 'nav-link' + (page === t.id ? ' nav-link--active' : '');
      return '<button class="' + cls + '" data-page="' + t.id + '">' + t.label + '</button>';
    }).join('');

    nav.innerHTML =
      '<div class="navbar-inner">' +
        '<span class="navbar-logo">Slova.</span>' +
        '<div class="navbar-lang">' +
          '<select class="lang-select" id="slova-lang-select">' +
            '<option value="en"' + (lang === 'en' ? ' selected' : '') + '>EN Английский</option>' +
            '<option value="es"' + (lang === 'es' ? ' selected' : '') + '>ES Испанский</option>' +
          '</select>' +
          '<span class="lang-select-arrow">▼</span>' +
        '</div>' +
        '<div class="navbar-links">' + tabsHtml + '</div>' +
      '</div>';

    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-page]');
      if (btn) _goTo(btn.dataset.page);
    });

    var sel = document.getElementById('slova-lang-select');
    if (sel) {
      sel.addEventListener('change', function () {
        _buildCtx().setLanguage(sel.value);
        _renderNavbar();
      });
    }
  }

  // ---------- Modal ----------

  function _openWordModal(word) {
    if (!_modalRoot) return;
    var lang = _state.selectedLanguage;
    if (window.SlovaWordModal) {
      SlovaWordModal.open(_modalRoot, {
        defaultLanguage: lang,
        initialWord: word || undefined,
        onSave: function (savedWord) {
          var isEdit = _customWords.some(function (w) { return w.id === savedWord.id; });
          if (isEdit) {
            _customWords = SlovaStore.updateCustomWord(savedWord);
          } else {
            _customWords = SlovaStore.addCustomWord(savedWord);
          }
          SlovaWordModal.close();
          _renderCurrentPage();
        },
        onClose: function () {
          SlovaWordModal.close();
        },
      });
    }
  }

  // ---------- Init ----------

  function init() {
    _root = document.getElementById('slova-root');
    _modalRoot = document.getElementById('slova-modal-root');
    if (!_root) { console.error('SlovaApp: #slova-root not found'); return; }

    _state = SlovaStore.loadState();
    _customWords = SlovaStore.loadCustomWords();

    _vamosSave();
    _renderNavbar();
    _goTo('learn');
  }

  return { init: init };
}());

window.SlovaApp = SlovaApp;

// Stub SlovaPages — filled by page-*.js files
if (!window.SlovaPages) {
  window.SlovaPages = {};
}
