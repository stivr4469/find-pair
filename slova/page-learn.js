/**
 * SlovaPages.learn — страница «Учить»
 * Порт Cards/src/pages/LearnPage.tsx + TrainingCard.tsx
 */

window.SlovaPages = window.SlovaPages || {};

window.SlovaPages.learn = (function () {
  // ---- module-level state (persists across re-renders) ----
  var _sessionTotal = null;   // fixed on first render of non-empty session
  var _revealed     = false;
  var _isSpeaking   = false;
  var _speakTimer   = null;
  var _timerInterval = null;
  var _timerSeconds = 0;
  var _keydownHandler = null;
  var _currentWordId = null;  // track word changes to reset revealed

  // ---- TTS ----
  function _getLang(language) {
    return language === 'en' ? 'en-US' : 'es-ES';
  }

  function _speak(text, language, onActive) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = _getLang(language);
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
    _isSpeaking = true;
    if (onActive) onActive(true);
    if (_speakTimer) clearTimeout(_speakTimer);
    var duration = Math.max(800, text.length * 80);
    _speakTimer = setTimeout(function () {
      _isSpeaking = false;
      if (onActive) onActive(false);
    }, duration);
  }

  // ---- Session queue ----
  function _buildQueue(ctx) {
    var words = ctx.topicWords;
    var state = ctx.state;
    var due = [];
    var newWords = [];

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var prog = SlovaStore.getProgress(state, word.id);
      if (!prog) {
        newWords.push(word);
      } else if (SlovaSRS.isDue(prog)) {
        due.push(word);
      }
    }

    due.sort(function (a, b) {
      var pa = state.progress[a.id];
      var pb = state.progress[b.id];
      return (pa ? pa.nextReview : 0) - (pb ? pb.nextReview : 0);
    });

    var usedToday = (state.newCardsToday && state.newCardsToday[state.selectedLanguage]) || 0;
    var availableNew = Math.max(0, state.maxNewPerDay - usedToday);
    var selectedNew = newWords.slice(0, availableNew);

    return due.concat(selectedNew);
  }

  // ---- Timer ----
  function _startTimer() {
    _stopTimer();
    _timerInterval = setInterval(function () {
      _timerSeconds++;
      var el = document.getElementById('learn-timer');
      if (el) el.textContent = _formatTime(_timerSeconds);
    }, 1000);
  }

  function _stopTimer() {
    if (_timerInterval) {
      clearInterval(_timerInterval);
      _timerInterval = null;
    }
  }

  function _formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // ---- Render helpers ----
  function _renderEmpty() {
    return '<div class="learn-empty view-enter">' +
      '<div class="learn-empty-icon">✓</div>' +
      '<h2 class="learn-empty-title">Всё выучено!</h2>' +
      '<p class="learn-empty-text">На сегодня карточек больше нет. Загляните позже — ' +
      'новые слова появятся когда придёт время повтора.</p>' +
      '</div>';
  }

  function _renderTopicBar(activeTopic, wordCount) {
    if (!activeTopic) return '';
    return '<div class="learn-topic-bar">' +
      '<span>' + SlovaUI.esc(activeTopic.emoji) + ' <b>' + SlovaUI.esc(activeTopic.label) + '</b> · ' +
      wordCount + ' ' + SlovaUI.pluralWords(wordCount) + ' в теме</span>' +
      '<button class="learn-topic-clear" id="learn-topic-clear-btn">× все слова</button>' +
      '</div>';
  }

  function _renderProgress(lang, remaining, total) {
    var pct = total > 0 ? (1 - remaining / total) : 1;
    var langLabel = lang === 'es' ? 'ES' : 'EN';
    return '<div class="learn-header">' +
      '<div class="progress-container">' +
        '<div class="progress-info">' +
          '<span class="progress-label">' + langLabel + ' · осталось ' + remaining + ' из ' + total + '</span>' +
        '</div>' +
        '<div class="progress-track slova-progress-wrap">' +
          '<div class="progress-fill slova-progress-fill" id="learn-progress-fill" ' +
               'style="transform: scaleX(' + pct + ')"></div>' +
        '</div>' +
      '</div>' +
      '<div class="timer" id="learn-timer">' + _formatTime(_timerSeconds) + '</div>' +
    '</div>';
  }

  function _renderCard(word, progress) {
    var isFirstEncounter = progress.repetitions === 0;
    var repCount = progress.repetitions > 0
      ? (progress.repetitions + 1) + '-й раз'
      : 'впервые';
    var rankLabel = SlovaSRS.getRankLabel(word.rank);
    var repLabel  = SlovaSRS.getRepetitionLabel(progress.repetitions);
    var exampleOrWord = (word.example && word.example.text) ? word.example.text : word.word;
    var forgotLabel = SlovaSRS.formatNextInterval(progress, 'forgot');
    var knowLabel   = SlovaSRS.formatNextInterval(progress, 'know');
    var speakingClass = _isSpeaking ? ' audio-btn--active' : '';

    var exampleHtml = '';
    if (word.example) {
      var translationHtml = _revealed
        ? '<div class="card-example-translation">' + SlovaUI.esc(word.example.translation) + '</div>'
        : '';
      exampleHtml =
        '<div class="card-example">' +
          '<div class="card-example-text">' +
            '<span>' + SlovaUI.esc(word.example.text) + '</span>' +
            '<button class="audio-btn' + speakingClass + '" id="learn-audio-example" ' +
                    'title="Воспроизвести (R)" aria-label="Воспроизвести произношение">🔊</button>' +
          '</div>' +
          translationHtml +
        '</div>';
    } else {
      exampleHtml =
        '<button class="audio-btn audio-btn--standalone' + speakingClass + '" id="learn-audio-word" ' +
                'title="Воспроизвести (R)" aria-label="Воспроизвести произношение">🔊</button>';
    }

    var revealedHtml = '';
    if (_revealed) {
      var detailsHtml = '';
      if (!isFirstEncounter) {
        if (word.collocations) {
          detailsHtml += '<div class="card-detail">' +
            '<span class="card-detail-label">управление: </span>' +
            SlovaUI.esc(word.collocations) + '</div>';
        }
        if (word.forms) {
          detailsHtml += '<div class="card-detail">' +
            '<span class="card-detail-label">формы: </span>' +
            SlovaUI.esc(word.forms) + '</div>';
        }
      }
      var firstHintHtml = '';
      if (isFirstEncounter && (word.collocations || word.forms)) {
        firstHintHtml = '<div class="card-first-hint">управление и формы появятся со следующего повтора</div>';
      }
      revealedHtml =
        '<div class="card-revealed">' +
          '<div class="card-translation">' + SlovaUI.esc(word.translation) + '</div>' +
          detailsHtml +
          firstHintHtml +
        '</div>';
    }

    var actionButtons = '';
    if (!_revealed) {
      actionButtons =
        '<button class="slova-btn slova-btn--primary learn-show-btn" id="learn-show-btn" style="width:100%">' +
          'Показать перевод' +
        '</button>';
    } else {
      actionButtons =
        '<div class="card-review-btns">' +
          '<button class="btn btn--forgot learn-review-btn" data-result="forgot">' +
            '<span class="btn-label">Забыл</span>' +
            '<span class="btn-interval">' + SlovaUI.esc(forgotLabel) + '</span>' +
          '</button>' +
          '<button class="btn btn--know learn-review-btn" data-result="know">' +
            '<span class="btn-label">Знаю</span>' +
            '<span class="btn-interval">' + SlovaUI.esc(knowLabel) + '</span>' +
          '</button>' +
        '</div>';
    }

    var keyboardHint = !_revealed
      ? 'Пробел — показать перевод &nbsp;·&nbsp; R — произнести'
      : '← Забыл &nbsp;·&nbsp; → Знаю &nbsp;·&nbsp; R — произнести';

    var posPhonetic = SlovaUI.esc(word.partOfSpeech || '');
    if (word.phonetic) {
      posPhonetic += '<span class="card-phonetic"> · ' + SlovaUI.esc(word.phonetic) + '</span>';
    }

    return '<div class="training-card">' +
      '<div class="card-meta">' +
        '<span class="card-rank">' + SlovaUI.esc(rankLabel) + ' · ' + SlovaUI.esc(repLabel) + '</span>' +
        '<span class="card-rep-count">' + SlovaUI.esc(repCount) + '</span>' +
      '</div>' +
      '<div class="card-word card-word--speakable" id="learn-word-speakable" ' +
           'role="button" tabindex="0" title="Нажми, чтобы услышать">' +
        SlovaUI.esc(word.word) +
      '</div>' +
      '<div class="card-pos-phonetic">' + posPhonetic + '</div>' +
      exampleHtml +
      revealedHtml +
      '<div class="card-actions-secondary">' +
        '<button class="card-link-btn" id="learn-skip-btn">пропустить</button>' +
        '<span class="card-link-sep">·</span>' +
        '<button class="card-link-btn" id="learn-postpone-btn">отложить</button>' +
        '<span class="card-link-sep">·</span>' +
        '<button class="card-link-btn card-link-btn--danger" id="learn-exclude-btn">исключить</button>' +
      '</div>' +
      actionButtons +
      '<div class="card-keyboard-hint">' + keyboardHint + '</div>' +
    '</div>';
  }

  // ---- Event binding ----
  function _bindEvents(root, word, progress, ctx) {
    var exampleOrWord = (word.example && word.example.text) ? word.example.text : word.word;

    // Word speakable click
    var wordEl = root.querySelector('#learn-word-speakable');
    if (wordEl) {
      wordEl.addEventListener('click', function () {
        _speak(word.word, ctx.state.selectedLanguage, function (active) {
          _isSpeaking = active;
          var btn = root.querySelector('#learn-audio-example') ||
                    root.querySelector('#learn-audio-word');
          if (btn) btn.classList.toggle('audio-btn--active', active);
          var el = root.querySelector('#learn-word-speakable');
          // no visual change on word itself needed beyond class
        });
      });
      wordEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          _speak(word.word, ctx.state.selectedLanguage, null);
        }
      });
    }

    // Audio buttons
    var audioExample = root.querySelector('#learn-audio-example');
    if (audioExample) {
      audioExample.addEventListener('click', function () {
        _speak(exampleOrWord, ctx.state.selectedLanguage, function (active) {
          _isSpeaking = active;
          audioExample.classList.toggle('audio-btn--active', active);
        });
      });
    }
    var audioWord = root.querySelector('#learn-audio-word');
    if (audioWord) {
      audioWord.addEventListener('click', function () {
        _speak(word.word, ctx.state.selectedLanguage, function (active) {
          _isSpeaking = active;
          audioWord.classList.toggle('audio-btn--active', active);
        });
      });
    }

    // Show translation
    var showBtn = root.querySelector('#learn-show-btn');
    if (showBtn) {
      showBtn.addEventListener('click', function () {
        _revealed = true;
        ctx.setState(ctx.state); // triggers re-render via app
      });
    }

    // Review buttons
    root.querySelectorAll('.learn-review-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        _handleReview(btn.dataset.result, word, progress, ctx);
      });
    });

    // Skip
    var skipBtn = root.querySelector('#learn-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        _handleSkip(word, progress, ctx);
      });
    }

    // Postpone
    var postponeBtn = root.querySelector('#learn-postpone-btn');
    if (postponeBtn) {
      postponeBtn.addEventListener('click', function () {
        _handlePostpone(word, progress, ctx);
      });
    }

    // Exclude
    var excludeBtn = root.querySelector('#learn-exclude-btn');
    if (excludeBtn) {
      excludeBtn.addEventListener('click', function () {
        _handleExclude(word, progress, ctx);
      });
    }

    // Topic clear
    var topicClear = root.querySelector('#learn-topic-clear-btn');
    if (topicClear) {
      topicClear.addEventListener('click', function () {
        ctx.clearTopic();
      });
    }

    // Keyboard shortcuts
    _removeKeydown();
    _keydownHandler = function (e) {
      _onKeydown(e, word, progress, ctx, exampleOrWord);
    };
    document.addEventListener('keydown', _keydownHandler);
  }

  function _onKeydown(e, word, progress, ctx, exampleOrWord) {
    if (e.key === ' ' || e.code === 'Space') {
      // Only show translation if not already revealed and not in an input
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      e.preventDefault();
      if (!_revealed) {
        _revealed = true;
        ctx.setState(ctx.state);
      }
    } else if (e.key === 'ArrowLeft') {
      if (_revealed) _handleReview('forgot', word, progress, ctx);
    } else if (e.key === 'ArrowRight') {
      if (_revealed) _handleReview('know', word, progress, ctx);
    } else if (e.key === 'r' || e.key === 'к') {
      _speak(exampleOrWord, ctx.state.selectedLanguage, function (active) {
        _isSpeaking = active;
        var btn = document.querySelector('#learn-audio-example') ||
                  document.querySelector('#learn-audio-word');
        if (btn) btn.classList.toggle('audio-btn--active', active);
      });
    }
  }

  function _removeKeydown() {
    if (_keydownHandler) {
      document.removeEventListener('keydown', _keydownHandler);
      _keydownHandler = null;
    }
  }

  // ---- Action handlers ----
  function _handleReview(result, word, progress, ctx) {
    var state = ctx.state;
    var wasNew = !SlovaStore.getProgress(state, word.id);
    var newProg = SlovaSRS.updateProgress(progress, result);
    var newState = SlovaStore.setProgress(state, newProg);
    newState = SlovaStore.recordReview(newState, result, wasNew, word.language);
    SlovaStore.saveState(newState);
    _revealed = false;
    _currentWordId = null;
    ctx.setState(newState);
  }

  function _handleSkip(word, progress, ctx) {
    var skipped = Object.assign({}, progress, { nextReview: Date.now() + 1 });
    var newState = SlovaStore.setProgress(ctx.state, skipped);
    SlovaStore.saveState(newState);
    _revealed = false;
    _currentWordId = null;
    ctx.setState(newState);
  }

  function _handlePostpone(word, progress, ctx) {
    var postponed = Object.assign({}, progress, { nextReview: Date.now() + 10 * 60 * 1000 });
    var newState = SlovaStore.setProgress(ctx.state, postponed);
    SlovaStore.saveState(newState);
    _revealed = false;
    _currentWordId = null;
    ctx.setState(newState);
  }

  function _handleExclude(word, progress, ctx) {
    var excluded = Object.assign({}, progress, {
      nextReview: Date.now() + 365 * 24 * 60 * 60 * 1000,
      repetitions: 999,
    });
    var newState = SlovaStore.setProgress(ctx.state, excluded);
    SlovaStore.saveState(newState);
    _revealed = false;
    _currentWordId = null;
    ctx.setState(newState);
  }

  // ---- Public API ----
  function render(root, ctx) {
    var session = _buildQueue(ctx);

    // Manage sessionTotal persistence across re-renders
    if (_sessionTotal === null && session.length > 0) {
      _sessionTotal = session.length;
      _timerSeconds = 0;
      _startTimer();
    } else if (session.length === 0) {
      _sessionTotal = null;
      _stopTimer();
    } else if (_timerInterval === null && session.length > 0) {
      // re-render after page switch — restart timer
      _startTimer();
    }

    var sessionTotal = _sessionTotal !== null ? _sessionTotal : session.length;

    if (session.length === 0) {
      _revealed = false;
      _currentWordId = null;
      _removeKeydown();
      root.innerHTML = _renderEmpty();
      return;
    }

    var word = session[0];
    var progress = SlovaStore.getProgress(ctx.state, word.id) ||
                   SlovaSRS.createInitialProgress(word.id);

    // Reset revealed when word changes
    if (_currentWordId !== word.id) {
      _revealed = false;
      _currentWordId = word.id;
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }

    var html =
      '<div class="learn-page view-enter">' +
        _renderTopicBar(ctx.activeTopic, ctx.topicWords.length) +
        _renderProgress(ctx.state.selectedLanguage, session.length, sessionTotal) +
        _renderCard(word, progress) +
      '</div>';

    root.innerHTML = html;
    _bindEvents(root, word, progress, ctx);
  }

  function destroy() {
    _removeKeydown();
    _stopTimer();
    if (_speakTimer) {
      clearTimeout(_speakTimer);
      _speakTimer = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    _revealed = false;
    _isSpeaking = false;
    _sessionTotal = null;
    _timerSeconds = 0;
    _currentWordId = null;
  }

  return { render: render, destroy: destroy };
}());
