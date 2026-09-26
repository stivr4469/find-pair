/**
 * SlovaWordModal — AddWordModal
 * Ported from Cards/src/components/AddWordModal.tsx
 */

var SlovaWordModal = (function () {
  'use strict';

  var POS_OPTIONS = [
    'noun', 'verb', 'adjective', 'adverb',
    'pronoun', 'preposition', 'conjunction', 'interjection', 'other'
  ];

  // Active modal root reference (for close)
  var _root = null;
  var _opts = null;

  // Form state (plain object, re-read from DOM on submit)
  function _getFormData(container) {
    return {
      language:           _val(container, '#mw-language'),
      word:               _val(container, '#mw-word'),
      partOfSpeech:       _val(container, '#mw-pos'),
      phonetic:           _val(container, '#mw-phonetic'),
      translation:        _val(container, '#mw-translation'),
      exampleText:        _val(container, '#mw-example'),
      exampleTranslation: _val(container, '#mw-example-tr'),
      collocations:       _val(container, '#mw-collocations'),
      forms:              _val(container, '#mw-forms'),
      rank:               parseInt(_val(container, '#mw-rank') || '3', 10) || 3,
    };
  }

  function _val(container, selector) {
    var el = container.querySelector(selector);
    return el ? el.value : '';
  }

  // ---- HTML builders ---------------------------------------------------

  function _posOptions(selected) {
    return POS_OPTIONS.map(function (p) {
      return '<option value="' + SlovaUI.esc(p) + '"' + (p === selected ? ' selected' : '') + '>' +
        SlovaUI.esc(p) + '</option>';
    }).join('');
  }

  function _rankButtons(selected) {
    var btns = [1, 2, 3, 4, 5].map(function (r) {
      var activeCls = r === selected ? ' rank-pick--active' : '';
      return '<button type="button" class="rank-pick' + activeCls + '" data-rank="' + r + '">' + r + '</button>';
    }).join('');
    // Hidden input stores current rank value
    return '<input type="hidden" id="mw-rank" value="' + selected + '">' + btns;
  }

  function _buildModal(opts) {
    var isEdit  = !!opts.initialWord;
    var w       = opts.initialWord || {};
    var lang    = w.language || opts.defaultLanguage || 'es';
    var pos     = w.partOfSpeech || 'noun';
    var rank    = w.rank || 3;
    var disAttr = isEdit ? ' disabled' : '';

    var enActiveCls = lang === 'en' ? ' lang-btn--active' : '';
    var esActiveCls = lang === 'es' ? ' lang-btn--active' : '';
    var disabledCls = isEdit ? ' lang-btn--disabled' : '';

    // Phonetic field is always rendered; visibility toggled in JS
    var phoneticDisplay = lang === 'en' ? '' : ' style="display:none"';

    // Show example translation only when there is an example or existing translation
    var hasExampleTr = !!(w.example && w.example.translation);
    var exampleTrDisplay = hasExampleTr ? '' : ' style="display:none"';

    return '<div class="modal-backdrop" id="mw-backdrop">' +
      '<div class="modal" id="mw-modal">' +
        '<div class="modal-header">' +
          '<h3 class="modal-title">' + (isEdit ? 'Редактировать слово' : 'Добавить слово') + '</h3>' +
          '<button class="modal-close" id="mw-close" aria-label="Закрыть" type="button">×</button>' +
        '</div>' +
        '<form class="modal-form" id="mw-form" novalidate>' +
          '<input type="hidden" id="mw-language" value="' + SlovaUI.esc(lang) + '">' +
          '<div class="form-row">' +
            '<label class="form-label">Язык</label>' +
            '<div class="lang-toggle">' +
              '<button type="button" class="lang-btn' + enActiveCls + disabledCls + '" ' +
                'data-lang-pick="en"' + disAttr + '>🇬🇧 Английский</button>' +
              '<button type="button" class="lang-btn' + esActiveCls + disabledCls + '" ' +
                'data-lang-pick="es"' + disAttr + '>🇪🇸 Испанский</button>' +
            '</div>' +
          '</div>' +

          '<div class="form-row form-row--split">' +
            '<div class="form-field mw-word-field" style="flex:2">' +
              '<label class="form-label" for="mw-word">Слово <span class="required">*</span></label>' +
              '<input class="form-input" id="mw-word" value="' + SlovaUI.esc(w.word || '') + '" ' +
                'placeholder="' + (lang === 'en' ? 'make' : 'hacer') + '" autocomplete="off">' +
              '<span class="form-error mw-err-word" style="display:none">Введите слово</span>' +
            '</div>' +
            '<div class="form-field">' +
              '<label class="form-label" for="mw-pos">Часть речи</label>' +
              '<select class="form-select" id="mw-pos">' + _posOptions(pos) + '</select>' +
            '</div>' +
          '</div>' +

          '<div class="form-field mw-phonetic-field"' + phoneticDisplay + '>' +
            '<label class="form-label" for="mw-phonetic">Транскрипция</label>' +
            '<input class="form-input" id="mw-phonetic" value="' + SlovaUI.esc(w.phonetic || '') + '" placeholder="[meɪk]">' +
          '</div>' +

          '<div class="form-field">' +
            '<label class="form-label" for="mw-translation">Перевод (рус.) <span class="required">*</span></label>' +
            '<input class="form-input" id="mw-translation" value="' + SlovaUI.esc(w.translation || '') + '" ' +
              'placeholder="делать, создавать">' +
            '<span class="form-error mw-err-translation" style="display:none">Введите перевод</span>' +
          '</div>' +

          '<div class="form-field">' +
            '<label class="form-label" for="mw-example">Пример</label>' +
            '<input class="form-input" id="mw-example" value="' + SlovaUI.esc((w.example && w.example.text) || '') + '" ' +
              'placeholder="' + (lang === 'en' ? 'She makes great coffee.' : 'Ella hace café bueno.') + '">' +
          '</div>' +

          '<div class="form-field mw-example-tr-field"' + exampleTrDisplay + '>' +
            '<label class="form-label" for="mw-example-tr">Перевод примера</label>' +
            '<input class="form-input" id="mw-example-tr" value="' + SlovaUI.esc((w.example && w.example.translation) || '') + '" ' +
              'placeholder="Она делает отличный кофе.">' +
          '</div>' +

          '<div class="form-field">' +
            '<label class="form-label" for="mw-collocations">Управление / словосочетания</label>' +
            '<textarea class="form-input form-textarea" id="mw-collocations" rows="2" ' +
              'placeholder="' + (lang === 'en' ? 'make a decision, make sense' : 'hacer ejercicio, hacer daño, hacer caso') + '">' +
              SlovaUI.esc(w.collocations || '') + '</textarea>' +
          '</div>' +

          '<div class="form-field">' +
            '<label class="form-label" for="mw-forms">Формы</label>' +
            '<textarea class="form-input form-textarea" id="mw-forms" rows="2" ' +
              'placeholder="' + (lang === 'en' ? 'make — made — made' : 'hago, haces, hace, hacemos, hacéis, hacen') + '">' +
              SlovaUI.esc(w.forms || '') + '</textarea>' +
          '</div>' +

          '<div class="form-field">' +
            '<label class="form-label">Ранг (1 = очень частое, 5 = редкое)</label>' +
            '<div class="rank-selector">' + _rankButtons(rank) + '</div>' +
          '</div>' +

          '<div class="modal-actions">' +
            '<button type="button" class="btn-cancel" id="mw-cancel">Отмена</button>' +
            '<button type="submit" class="btn-add">' + (isEdit ? 'Сохранить' : 'Добавить слово') + '</button>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>';
  }

  // ---- Validation ------------------------------------------------------

  function _validate(container) {
    var wordEl        = container.querySelector('#mw-word');
    var translationEl = container.querySelector('#mw-translation');
    var errWord       = container.querySelector('.mw-err-word');
    var errTr         = container.querySelector('.mw-err-translation');
    var valid = true;

    if (!wordEl.value.trim()) {
      errWord.style.display = '';
      wordEl.classList.add('form-input--error');
      valid = false;
    } else {
      errWord.style.display = 'none';
      wordEl.classList.remove('form-input--error');
    }

    if (!translationEl.value.trim()) {
      errTr.style.display = '';
      translationEl.classList.add('form-input--error');
      valid = false;
    } else {
      errTr.style.display = 'none';
      translationEl.classList.remove('form-input--error');
    }

    return valid;
  }

  // ---- Language switching inside modal ---------------------------------

  function _switchLang(container, lang) {
    container.querySelector('#mw-language').value = lang;

    var buttons = container.querySelectorAll('[data-lang-pick]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.dataset.langPick === lang) {
        btn.classList.add('lang-btn--active');
      } else {
        btn.classList.remove('lang-btn--active');
      }
    }

    var phoneticField = container.querySelector('.mw-phonetic-field');
    if (phoneticField) {
      phoneticField.style.display = lang === 'en' ? '' : 'none';
    }

    var wordInput = container.querySelector('#mw-word');
    var exampleInput = container.querySelector('#mw-example');
    var collInput = container.querySelector('#mw-collocations');
    var formsInput = container.querySelector('#mw-forms');

    if (wordInput && !wordInput.value) {
      wordInput.placeholder = lang === 'en' ? 'make' : 'hacer';
    }
    if (exampleInput && !exampleInput.value) {
      exampleInput.placeholder = lang === 'en' ? 'She makes great coffee.' : 'Ella hace café bueno.';
    }
    if (collInput && !collInput.value) {
      collInput.placeholder = lang === 'en' ? 'make a decision, make sense' : 'hacer ejercicio, hacer daño, hacer caso';
    }
    if (formsInput && !formsInput.value) {
      formsInput.placeholder = lang === 'en' ? 'make — made — made' : 'hago, haces, hace, hacemos, hacéis, hacen';
    }
  }

  // ---- Build Word object from form -------------------------------------

  function _buildWord(container, opts) {
    var isEdit = !!opts.initialWord;
    var d = _getFormData(container);
    var exampleText = d.exampleText.trim();

    return {
      id: isEdit
        ? opts.initialWord.id
        : 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      language:     d.language,
      word:         d.word.trim(),
      partOfSpeech: d.partOfSpeech,
      phonetic:     d.phonetic.trim() || undefined,
      translation:  d.translation.trim(),
      example:      exampleText
        ? { text: exampleText, translation: d.exampleTranslation.trim() }
        : undefined,
      collocations: d.collocations.trim() || undefined,
      forms:        d.forms.trim() || undefined,
      rank:         d.rank,
      custom:       true,
    };
  }

  // ---- Event wiring ----------------------------------------------------

  function _attachEvents(container, opts) {
    // Backdrop click → close (but not modal content click)
    var backdrop = container.querySelector('#mw-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          if (opts.onClose) opts.onClose();
        }
      });
    }

    // Close button
    var closeBtn = container.querySelector('#mw-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        if (opts.onClose) opts.onClose();
      });
    }

    // Cancel button
    var cancelBtn = container.querySelector('#mw-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        if (opts.onClose) opts.onClose();
      });
    }

    // Language pick (only when not editing)
    if (!opts.initialWord) {
      container.addEventListener('click', function (e) {
        var langBtn = e.target.closest('[data-lang-pick]');
        if (langBtn) {
          _switchLang(container, langBtn.dataset.langPick);
        }
      });
    }

    // Rank pick
    container.addEventListener('click', function (e) {
      var rankBtn = e.target.closest('[data-rank]');
      if (rankBtn) {
        var val = parseInt(rankBtn.dataset.rank, 10);
        var rankHidden = container.querySelector('#mw-rank');
        if (rankHidden) rankHidden.value = val;
        var rankBtns = container.querySelectorAll('[data-rank]');
        for (var i = 0; i < rankBtns.length; i++) {
          rankBtns[i].classList.remove('rank-pick--active');
        }
        rankBtn.classList.add('rank-pick--active');
      }
    });

    // Show example translation field when user starts typing example
    var exampleInput = container.querySelector('#mw-example');
    var exTrField = container.querySelector('.mw-example-tr-field');
    if (exampleInput && exTrField) {
      exampleInput.addEventListener('input', function () {
        exTrField.style.display = exampleInput.value ? '' : 'none';
      });
    }

    // Form submit
    var form = container.querySelector('#mw-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!_validate(container)) return;
        var word = _buildWord(container, opts);
        if (opts.onSave) opts.onSave(word);
      });
    }
  }

  // ---- Public API -------------------------------------------------------

  function open(root, opts) {
    _root = root;
    _opts = opts;
    root.innerHTML = _buildModal(opts);
    _attachEvents(root, opts);

    // Auto-focus word input
    var wordInput = root.querySelector('#mw-word');
    if (wordInput) {
      setTimeout(function () { wordInput.focus(); }, 50);
    }
  }

  function close() {
    if (_root) {
      _root.innerHTML = '';
      _root = null;
      _opts = null;
    }
  }

  return { open: open, close: close };
}());

window.SlovaWordModal = SlovaWordModal;
