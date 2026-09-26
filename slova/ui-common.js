/**
 * SlovaUI — общие хелперы разметки и локализации
 */

var SlovaUI = (function () {

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // plural for Russian words
  function pluralWords(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'слов';
    if (mod10 === 1) return 'слово';
    if (mod10 >= 2 && mod10 <= 4) return 'слова';
    return 'слов';
  }

  function pluralDays(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'дней';
    if (mod10 === 1) return 'день';
    if (mod10 >= 2 && mod10 <= 4) return 'дня';
    return 'дней';
  }

  function pluralReviews(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'повторений';
    if (mod10 === 1) return 'повторение';
    if (mod10 >= 2 && mod10 <= 4) return 'повторения';
    return 'повторений';
  }

  function pluralStreak(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'дней';
    if (mod10 === 1) return 'день';
    if (mod10 >= 2 && mod10 <= 4) return 'дня';
    return 'дней';
  }

  // Part-of-speech grouping (for filter chips)
  var POS_GROUPS = {
    noun: ['noun', 'proper noun'],
    verb: ['verb', 'auxiliary verb', 'modal verb'],
    adjective: ['adjective'],
    adverb: ['adverb'],
  };

  function getPosGroup(pos) {
    if (!pos) return 'other';
    var lower = pos.toLowerCase();
    for (var group in POS_GROUPS) {
      if (POS_GROUPS[group].some(function (p) { return lower.includes(p); })) {
        return group;
      }
    }
    return 'other';
  }

  function getPosShort(pos) {
    if (!pos) return '';
    var lower = pos.toLowerCase();
    if (lower.includes('noun')) return 'сущ.';
    if (lower.includes('verb')) return 'глаг.';
    if (lower.includes('adjective')) return 'прил.';
    if (lower.includes('adverb')) return 'нареч.';
    if (lower.includes('pronoun')) return 'мест.';
    if (lower.includes('preposition')) return 'предл.';
    if (lower.includes('conjunction')) return 'союз';
    if (lower.includes('interjection')) return 'межд.';
    if (lower.includes('article')) return 'арт.';
    return pos;
  }

  // Word status for display
  function getWordStatus(progress) {
    if (!progress || progress.repetitions === 0) return 'new';
    if (progress.repetitions === 999) return 'excluded';
    if (progress.interval >= 1440) return 'known';
    return 'learning';
  }

  return {
    esc: esc,
    pluralWords: pluralWords,
    pluralDays: pluralDays,
    pluralReviews: pluralReviews,
    pluralStreak: pluralStreak,
    getPosGroup: getPosGroup,
    getPosShort: getPosShort,
    getWordStatus: getWordStatus,
  };
}());

window.SlovaUI = SlovaUI;
