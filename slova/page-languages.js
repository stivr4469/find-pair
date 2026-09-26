/**
 * SlovaPages.languages — Languages page
 * Ported from Cards/src/pages/LanguagesPage.tsx
 */

(function () {
  'use strict';

  // ---- Constants -------------------------------------------------------

  var LANGUAGES = [
    { code: 'en', name: 'Английский', flag: '🇬🇧' },
    { code: 'es', name: 'Испанский',  flag: '🇪🇸' },
  ];

  var PRESETS = [10, 20, 30, 50];

  // SVG graph dimensions (must match LanguagesPage.tsx)
  var SVG_W  = 320;
  var SVG_H  = 160;
  var PAD_L  = 32;
  var PAD_B  = 28;
  var PAD_T  = 12;
  var PAD_R  = 16;
  var GRAPH_W = SVG_W - PAD_L - PAD_R;
  var GRAPH_H = SVG_H - PAD_B - PAD_T;
  var MAX_X   = 10000;
  var MAX_Y   = 100;

  var COVERAGE_POINTS = [0, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000];

  // ---- Coverage math ---------------------------------------------------

  /**
   * Based on Nation's research: top 1000 = ~83%, top 3000 = ~95%
   * @param {number} n
   * @returns {number}
   */
  function coverageAtN(n) {
    if (n <= 0) return 0;
    if (n >= 10000) return 99;
    return Math.min(99, Math.round(100 * (1 - Math.pow(1 / (n + 1), 0.22))));
  }

  // ---- SVG helpers -----------------------------------------------------

  function toSvgX(x) { return PAD_L + (x / MAX_X) * GRAPH_W; }
  function toSvgY(y) { return PAD_T + GRAPH_H - (y / MAX_Y) * GRAPH_H; }

  function buildCoverageSvg() {
    var pts = COVERAGE_POINTS.map(function (n) {
      return { x: n, y: coverageAtN(n) };
    });

    var pathD = pts.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + ' ' + toSvgX(p.x).toFixed(1) + ' ' + toSvgY(p.y).toFixed(1);
    }).join(' ');

    var lastPt = pts[pts.length - 1];
    var areaD = pathD +
      ' L ' + toSvgX(MAX_X).toFixed(1) + ' ' + toSvgY(0).toFixed(1) +
      ' L ' + toSvgX(0).toFixed(1) + ' ' + toSvgY(0).toFixed(1) + ' Z';

    // Grid lines
    var gridLines = [25, 50, 75, 100].map(function (y) {
      var yPos = toSvgY(y).toFixed(1);
      return '<line x1="' + PAD_L + '" y1="' + yPos + '" x2="' + (SVG_W - PAD_R) + '" y2="' + yPos +
        '" stroke="currentColor" stroke-opacity="0.08" stroke-width="1"/>';
    }).join('');

    // Y-axis labels
    var yLabels = [0, 25, 50, 75, 100].map(function (y) {
      return '<text x="' + (PAD_L - 4) + '" y="' + (toSvgY(y) + 4).toFixed(1) +
        '" text-anchor="end" font-size="9" class="coverage-svg-label">' + y + '%</text>';
    }).join('');

    // X-axis labels
    var xLabels = [0, 1000, 5000, 10000].map(function (x) {
      var label = x === 0 ? '0' : (x >= 1000 ? (x / 1000) + 'к' : x);
      return '<text x="' + toSvgX(x).toFixed(1) + '" y="' + (SVG_H - 8) +
        '" text-anchor="middle" font-size="9" class="coverage-svg-label">' + label + '</text>';
    }).join('');

    return '<svg width="' + SVG_W + '" height="' + SVG_H + '" class="coverage-svg" ' +
      'viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '">' +
      gridLines +
      yLabels +
      xLabels +
      '<path d="' + areaD + '" class="coverage-svg-area"/>' +
      '<path d="' + pathD + '" fill="none" class="coverage-svg-line" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="' + (SVG_W - PAD_R - 2) + '" y="' + (PAD_T + 10) +
        '" font-size="9" class="coverage-svg-vip" text-anchor="end">VIP</text>' +
      '</svg>';
  }

  // ---- HTML builders ---------------------------------------------------

  function getLearnedCount(code, state) {
    var words = code === 'en'
      ? (window.SLOVA_WORDS_EN || [])
      : (window.SLOVA_WORDS_ES || []);
    var progress = state.progress || {};
    var count = 0;
    for (var i = 0; i < words.length; i++) {
      var p = progress[words[i].id];
      if (p && p.repetitions > 0) count++;
    }
    return count;
  }

  function getTotal(code) {
    var words = code === 'en'
      ? (window.SLOVA_WORDS_EN || [])
      : (window.SLOVA_WORDS_ES || []);
    return words.length;
  }

  function buildLanguageItem(code, name, flag, state) {
    var total   = getTotal(code);
    var learned = getLearnedCount(code, state);
    var isActive = state.selectedLanguage === code;
    var activeCls = isActive ? ' language-item--active' : '';

    var learnedHtml = learned > 0
      ? ' · <span class="lang-learned">изучено ' + SlovaUI.esc(String(learned)) + '</span>'
      : '';

    var btnHtml = isActive
      ? '<button class="lang-btn-primary" data-action="continue">Продолжить</button>'
      : '<button class="lang-btn-secondary" data-action="start" data-lang="' + SlovaUI.esc(code) + '">Начать</button>';

    return '<div class="language-item' + activeCls + '" data-lang-code="' + SlovaUI.esc(code) + '">' +
      '<div class="language-item-info">' +
        '<div class="language-item-name">' +
          '<span class="lang-flag">' + flag + '</span>' +
          SlovaUI.esc(name) +
        '</div>' +
        '<div class="language-item-sub">' +
          SlovaUI.esc(total.toLocaleString()) + ' слов' + learnedHtml +
        '</div>' +
      '</div>' +
      '<div class="language-item-btns">' + btnHtml + '</div>' +
    '</div>';
  }

  function buildCoverageLangStat(code, name, state) {
    var total   = getTotal(code);
    var learned = getLearnedCount(code, state);
    var coverage = coverageAtN(learned);
    var barPct = total > 0 ? Math.min(100, (learned / total) * 100) : 0;

    return '<div class="coverage-lang-stat">' +
      '<span class="coverage-lang-name">' + SlovaUI.esc(name) + '</span>' +
      '<span class="coverage-lang-num">' + SlovaUI.esc(String(learned)) + ' / ' + SlovaUI.esc(String(total)) + '</span>' +
      '<div class="coverage-bar">' +
        '<div class="coverage-bar-fill" style="width:' + barPct.toFixed(1) + '%"></div>' +
      '</div>' +
      '<span class="coverage-pct">≈' + SlovaUI.esc(String(coverage)) + '% текста</span>' +
    '</div>';
  }

  function buildSettingsBlock(state) {
    var n = state.maxNewPerDay;
    var stable = Math.round(n * 3);

    var presetBtns = PRESETS.map(function (v) {
      var activeCls = n === v ? ' lang-preset-btn--active' : '';
      return '<button class="lang-preset-btn' + activeCls + '" data-preset="' + v + '">' + v + '</button>';
    }).join('');

    return '<div class="lang-settings">' +
      '<div class="lang-settings-title">Настройки обучения</div>' +
      '<div class="lang-settings-row">' +
        '<span class="lang-settings-label">Новых слов в день</span>' +
        '<div class="lang-settings-control">' +
          '<button class="lang-step-btn" data-step="-1"' + (n <= 1 ? ' disabled' : '') + '>−</button>' +
          '<span class="lang-step-value">' + SlovaUI.esc(String(n)) + '</span>' +
          '<button class="lang-step-btn" data-step="1"' + (n >= 200 ? ' disabled' : '') + '>+</button>' +
        '</div>' +
      '</div>' +
      '<div class="lang-presets">' + presetBtns + '</div>' +
      '<p class="lang-settings-hint">При ' + SlovaUI.esc(String(n)) +
        ' новых/день очередь повторов стабилизируется примерно через ' +
        SlovaUI.esc(String(stable)) + ' карточек в сутки.</p>' +
    '</div>';
  }

  function buildPage(state) {
    var langItemsHtml = LANGUAGES.map(function (l) {
      return buildLanguageItem(l.code, l.name, l.flag, state);
    }).join('');

    var coverageStatsHtml = LANGUAGES.map(function (l) {
      return buildCoverageLangStat(l.code, l.name, state);
    }).join('');

    return '<div class="languages-page">' +
      '<div class="languages-two-col">' +
        '<div class="languages-list-col">' +
          '<h2 class="languages-title">Ваши языки</h2>' +
          '<p class="languages-subtitle">' +
            'По каждому языку — тренировка и список слов. Карточки можно начать с первого слова.' +
          '</p>' +
          '<div class="languages-list">' + langItemsHtml + '</div>' +
        '</div>' +
        '<div class="languages-graph-col">' +
          '<div class="coverage-card">' +
            '<div class="coverage-title">Покрытие текста частотным словарём</div>' +
            buildCoverageSvg() +
            '<p class="coverage-desc">' +
              'Первая тысяча слов покрывает ~83% текстов на этом языке. ' +
              'Зная 3000 слов, вы понимаете ~95% большинства текстов.' +
            '</p>' +
            coverageStatsHtml +
          '</div>' +
        '</div>' +
      '</div>' +
      buildSettingsBlock(state) +
    '</div>';
  }

  // ---- Event handling --------------------------------------------------

  function attachEvents(root, ctx) {
    root.addEventListener('click', function (e) {
      // Language buttons
      var btn = e.target.closest('[data-action]');
      if (btn) {
        var action = btn.dataset.action;
        if (action === 'continue') {
          ctx.goTo('learn');
        } else if (action === 'start') {
          var lang = btn.dataset.lang;
          ctx.setLanguage(lang);
          ctx.goTo('learn');
        }
        return;
      }

      // Preset buttons
      var presetBtn = e.target.closest('[data-preset]');
      if (presetBtn) {
        var val = parseInt(presetBtn.dataset.preset, 10);
        if (!isNaN(val)) ctx.setMaxNewPerDay(val);
        return;
      }

      // Step buttons (±1)
      var stepBtn = e.target.closest('[data-step]');
      if (stepBtn) {
        var step = parseInt(stepBtn.dataset.step, 10);
        if (!isNaN(step)) ctx.setMaxNewPerDay(ctx.state.maxNewPerDay + step);
      }
    });
  }

  // ---- Public API -------------------------------------------------------

  window.SlovaPages = window.SlovaPages || {};
  window.SlovaPages.languages = {
    render: function (root, ctx) {
      root.innerHTML = buildPage(ctx.state);
      attachEvents(root, ctx);
    },
    destroy: function () {}
  };

}());
