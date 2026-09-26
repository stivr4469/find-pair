/**
 * SlovaPages.diary — DiaryPage
 * Порт Cards/src/pages/DiaryPage.tsx
 */

(function () {

  var MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  var MONTHS_LONG  = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  var MONTHS_PREP  = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];
  var DOW_RU       = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  // ── Helpers ──────────────────────────────────────────────────────────────

  function formatTodayFull(d) {
    var dow = DOW_RU[d.getDay()];
    return dow + ', ' + d.getDate() + ' ' + MONTHS_LONG[d.getMonth()];
  }

  function getActivityLevel(reviewed) {
    if (reviewed === 0) return 0;
    if (reviewed <= 4)  return 1;
    if (reviewed <= 14) return 2;
    if (reviewed <= 29) return 3;
    return 4;
  }

  function pluralStreak(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'дней подряд';
    if (mod10 === 1)  return 'день подряд';
    if (mod10 >= 2 && mod10 <= 4) return 'дня подряд';
    return 'дней подряд';
  }

  // ── Calendar builder ─────────────────────────────────────────────────────

  function buildYearCalendar(year, statsMap) {
    var months = [];
    for (var m = 0; m < 12; m++) {
      var weeks = [];
      var week  = [];
      var firstDay = new Date(year, m, 1);
      var lastDate = new Date(year, m + 1, 0).getDate();
      var startDow = (firstDay.getDay() + 6) % 7; // Mon = 0

      for (var i = 0; i < startDow; i++) {
        week.push(null);
      }

      for (var d = 1; d <= lastDate; d++) {
        var mm = String(m + 1).length === 1 ? '0' + String(m + 1) : String(m + 1);
        var dd = String(d).length === 1 ? '0' + String(d) : String(d);
        var dateStr = year + '-' + mm + '-' + dd;
        var reviewed = statsMap[dateStr] || 0;
        week.push({ date: dateStr, day: d, reviewed: reviewed, level: getActivityLevel(reviewed) });
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }

      if (week.length > 0) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
      }

      months.push({ month: m, weeks: weeks });
    }
    return months;
  }

  // ── Section builders ─────────────────────────────────────────────────────

  function buildYearHeader(year, streak, today) {
    var streakStr = streak + ' ' + pluralStreak(streak);
    var monthPrep = MONTHS_PREP[today.getMonth()];
    return (
      '<div class="diary-year-header">' +
        '<span class="diary-year-nav">◀</span>' +
        '<span class="diary-year-title">' + year + '</span>' +
        '<span class="diary-year-nav">▶</span>' +
        '<span class="diary-year-sub" id="diary-year-sub-lang">' +
          SlovaUI.esc(streakStr) + ' · в ' + SlovaUI.esc(monthPrep) + ' · <span id="diary-lang-label"></span>' +
        '</span>' +
      '</div>'
    );
  }

  function buildCalendar(calendar, statsMap) {
    var html = '<div class="diary-calendar"><div class="diary-months">';
    for (var mi = 0; mi < calendar.length; mi++) {
      var mo = calendar[mi];
      html += '<div class="diary-month">';
      html += '<div class="diary-month-label">' + MONTHS_SHORT[mo.month] + '</div>';
      html += '<div class="diary-month-grid">';
      for (var wi = 0; wi < mo.weeks.length; wi++) {
        html += '<div class="diary-week">';
        var week = mo.weeks[wi];
        for (var di = 0; di < week.length; di++) {
          var cell = week[di];
          if (cell) {
            var titleText = cell.date + ': ' + cell.reviewed + ' повторений';
            html += '<div class="diary-cell diary-cell--' + cell.level + '" title="' + SlovaUI.esc(titleText) + '"></div>';
          } else {
            html += '<div class="diary-cell diary-cell--empty"></div>';
          }
        }
        html += '</div>';
      }
      html += '</div></div>';
    }
    html += '</div></div>';
    return html;
  }

  function buildTodaySection(todayStats, dueCount, today) {
    var dateFull = SlovaUI.esc(formatTodayFull(today));
    var dueHtml = '';
    if (dueCount > 0) {
      dueHtml =
        '<span class="diary-today-sep"> · </span>' +
        '<span class="diary-today-due">' + dueCount + ' на повтор</span>';
    }
    return (
      '<div class="diary-today">' +
        '<div class="diary-today-label">Сегодня</div>' +
        '<div class="diary-today-date">' + dateFull + '</div>' +
        '<div class="diary-today-stats">' +
          '<span class="diary-today-stat-num">' + todayStats.reviewed + '</span>' +
          '<span class="diary-today-stat-label"> повторений</span>' +
          '<span class="diary-today-sep"> · </span>' +
          '<span class="diary-today-stat-num">' + todayStats.learned + '</span>' +
          '<span class="diary-today-stat-label"> выучено</span>' +
          dueHtml +
        '</div>' +
        '<div class="diary-today-hint">' +
          'Карточки считаются сами. Запишите сюда другие активности — чтение, сериал, урок.' +
        '</div>' +
        '<div class="diary-activity-btns">' +
          '<button class="activity-btn">+ чтение</button>' +
          '<button class="activity-btn">+ сериал</button>' +
          '<button class="activity-btn">+ урок</button>' +
          '<button class="activity-btn">+ разговор</button>' +
        '</div>' +
      '</div>'
    );
  }

  function buildVocabSection(enLearned, enTotal, esLearned, esTotal) {
    var enPct = enTotal > 0 ? Math.min(100, (enLearned / enTotal) * 100) : 0;
    var esPct = esTotal > 0 ? Math.min(100, (esLearned / esTotal) * 100) : 0;
    return (
      '<div class="diary-vocab">' +
        '<div class="diary-vocab-title">Словарный запас</div>' +
        '<div class="diary-vocab-list">' +
          '<div class="diary-vocab-item">' +
            '<div class="diary-vocab-row">' +
              '<span class="diary-vocab-lang">EN</span>' +
              '<span class="diary-vocab-count">' + enLearned + ' / ' + enTotal + '</span>' +
            '</div>' +
            '<div class="diary-vocab-bar">' +
              '<div class="diary-vocab-fill" style="transform:scaleX(' + (enPct / 100).toFixed(4) + ')"></div>' +
            '</div>' +
          '</div>' +
          '<div class="diary-vocab-item">' +
            '<div class="diary-vocab-row">' +
              '<span class="diary-vocab-lang">ES</span>' +
              '<span class="diary-vocab-count">' + esLearned + ' / ' + esTotal + '</span>' +
            '</div>' +
            '<div class="diary-vocab-bar">' +
              '<div class="diary-vocab-fill" style="transform:scaleX(' + (esPct / 100).toFixed(4) + ')"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function buildStatCards(totalLearned, streak, reviewedToday) {
    var streakLabel = pluralStreak(streak);
    return (
      '<div class="diary-stats-grid">' +
        '<div class="diary-stat-card">' +
          '<div class="diary-stat-num">' + totalLearned + '</div>' +
          '<div class="diary-stat-label">слов в изучении</div>' +
        '</div>' +
        '<div class="diary-stat-card diary-stat-card--accent">' +
          '<div class="diary-stat-num">' + streak + '</div>' +
          '<div class="diary-stat-label">' + streakLabel + '</div>' +
        '</div>' +
        '<div class="diary-stat-card">' +
          '<div class="diary-stat-num">' + reviewedToday + '</div>' +
          '<div class="diary-stat-label">повторений сегодня</div>' +
        '</div>' +
      '</div>'
    );
  }

  // ── Data computations ────────────────────────────────────────────────────

  function buildStatsMap(dailyStats) {
    var map = {};
    for (var i = 0; i < dailyStats.length; i++) {
      var s = dailyStats[i];
      map[s.date] = (map[s.date] || 0) + s.reviewed;
    }
    return map;
  }

  function countLearned(words, progress) {
    var count = 0;
    for (var i = 0; i < words.length; i++) {
      var p = progress[words[i].id];
      if (p && p.repetitions > 0 && p.interval >= 1440) count++;
    }
    return count;
  }

  function countTotalLearned(progress) {
    var count = 0;
    var keys = Object.keys(progress);
    for (var i = 0; i < keys.length; i++) {
      var p = progress[keys[i]];
      if (p && p.repetitions > 0 && p.repetitions !== 999) count++;
    }
    return count;
  }

  function countDue(words, progress) {
    var now = Date.now();
    var count = 0;
    for (var i = 0; i < words.length; i++) {
      var p = progress[words[i].id];
      if (p && p.repetitions > 0 && now >= p.nextReview) count++;
    }
    return count;
  }

  // ── Render ───────────────────────────────────────────────────────────────

  function render(root, ctx) {
    var state    = ctx.state;
    var allWords = ctx.allWords;
    var progress = state.progress || {};

    var today      = new Date();
    var year       = today.getFullYear();
    var statsMap   = buildStatsMap(state.dailyStats || []);
    var todayStats = SlovaStore.getTodayStats(state);
    var streak     = SlovaStore.getStreak(state);
    var calendar   = buildYearCalendar(year, statsMap);

    var enWords = allWords.en || [];
    var esWords = allWords.es || [];

    // Due count from current language words
    var langWords = state.selectedLanguage === 'es' ? esWords : enWords;
    var dueCount     = countDue(langWords, progress);
    var totalLearned = countTotalLearned(progress);
    var enLearned    = countLearned(enWords, progress);
    var esLearned    = countLearned(esWords, progress);

    var langLabel = state.selectedLanguage === 'en' ? 'английский' : 'испанский';

    var html =
      '<div class="diary-page view-enter">' +
        buildYearHeader(year, streak, today) +
        buildCalendar(calendar, statsMap) +
        '<div class="diary-two-col">' +
          buildTodaySection(todayStats, dueCount, today) +
          buildVocabSection(enLearned, enWords.length, esLearned, esWords.length) +
        '</div>' +
        buildStatCards(totalLearned, streak, todayStats.reviewed) +
      '</div>';

    root.innerHTML = html;

    // Patch lang label (no escaping issue — known safe value)
    var langEl = root.querySelector('#diary-lang-label');
    if (langEl) langEl.textContent = langLabel;
  }

  // ── Page contract ────────────────────────────────────────────────────────

  window.SlovaPages = window.SlovaPages || {};
  window.SlovaPages.diary = {
    render: render,
    destroy: function () {}
  };

}());
