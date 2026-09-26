/**
 * SlovaStore — порт Cards/src/lib/storage.ts (1:1)
 * + SlovaBackend — абстракция хранилища (сейчас localStorage).
 *
 * Изменение от оригинала: defaultState().selectedLanguage = 'es'
 */

/** Бэкенд хранилища. Сейчас — localStorage; позже можно подменить, не трогая остальной код. */
var SlovaBackend = {
  get: function (key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* quota */ }
  }
};

var SlovaStore = (function () {
  var CUSTOM_WORDS_KEY = 'slova_custom_words';
  var STORAGE_KEY = 'slova_app_state';

  function today() {
    return new Date().toISOString().split('T')[0];
  }

  function defaultState() {
    return {
      selectedLanguage: 'es',
      progress: {},
      dailyStats: [],
      newCardsToday: {},
      newCardsTodayDate: today(),
      maxNewPerDay: 20,
    };
  }

  // ---------- custom words ----------

  function loadCustomWords() {
    try {
      var raw = SlovaBackend.get(CUSTOM_WORDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomWords(words) {
    try {
      SlovaBackend.set(CUSTOM_WORDS_KEY, JSON.stringify(words));
    } catch (e) { /* quota */ }
  }

  function addCustomWord(word) {
    var words = loadCustomWords();
    var updated = words.concat([word]);
    saveCustomWords(updated);
    return updated;
  }

  function deleteCustomWord(id) {
    var words = loadCustomWords().filter(function (w) { return w.id !== id; });
    saveCustomWords(words);
    return words;
  }

  function updateCustomWord(updated) {
    var words = loadCustomWords().map(function (w) {
      return w.id === updated.id ? updated : w;
    });
    saveCustomWords(words);
    return words;
  }

  // ---------- app state ----------

  function loadState() {
    try {
      var raw = SlovaBackend.get(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      // Reset daily new-card counter if day changed
      if (parsed.newCardsTodayDate !== today()) {
        parsed.newCardsToday = {};
        parsed.newCardsTodayDate = today();
      }
      // Migrate old format (single number → per-language object)
      if (typeof parsed.newCardsToday === 'number') {
        parsed.newCardsToday = {};
      }
      if (!parsed.maxNewPerDay) {
        parsed.maxNewPerDay = 20;
      }
      return parsed;
    } catch (e) {
      return defaultState();
    }
  }

  function saveState(state) {
    try {
      SlovaBackend.set(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // quota exceeded or unavailable — silently fail
    }
  }

  function getProgress(state, wordId) {
    return state.progress[wordId];
  }

  function setProgress(state, progress) {
    var newProgress = Object.assign({}, state.progress);
    newProgress[progress.wordId] = progress;
    return Object.assign({}, state, { progress: newProgress });
  }

  function setLanguage(state, lang) {
    return Object.assign({}, state, { selectedLanguage: lang });
  }

  function setMaxNewPerDay(state, value) {
    return Object.assign({}, state, { maxNewPerDay: Math.max(1, Math.min(200, value)) });
  }

  function getTodayStats(state) {
    var d = today();
    var found = state.dailyStats.find(function (s) { return s.date === d; });
    return found || { date: d, reviewed: 0, learned: 0, forgot: 0 };
  }

  function recordReview(state, result, wasNew, language) {
    var d = today();
    var existing = state.dailyStats.find(function (s) { return s.date === d; });
    var updated = existing
      ? Object.assign({}, existing, {
          reviewed: existing.reviewed + 1,
          learned: existing.learned + (result === 'know' ? 1 : 0),
          forgot: existing.forgot + (result === 'forgot' ? 1 : 0),
        })
      : {
          date: d,
          reviewed: 1,
          learned: result === 'know' ? 1 : 0,
          forgot: result === 'forgot' ? 1 : 0,
        };

    var stats = existing
      ? state.dailyStats.map(function (s) { return s.date === d ? updated : s; })
      : state.dailyStats.concat([updated]);

    var newCardsToday = wasNew
      ? Object.assign({}, state.newCardsToday, {
          [language]: (state.newCardsToday[language] || 0) + 1
        })
      : state.newCardsToday;

    return Object.assign({}, state, {
      dailyStats: stats,
      newCardsToday: newCardsToday,
    });
  }

  function getStreak(state) {
    if (state.dailyStats.length === 0) return 0;
    var sorted = state.dailyStats
      .filter(function (s) { return s.reviewed > 0; })
      .slice()
      .sort(function (a, b) { return b.date.localeCompare(a.date); });

    if (sorted.length === 0) return 0;

    var streak = 0;
    var d = new Date();

    for (var i = 0; i < sorted.length; i++) {
      var expected = d.toISOString().split('T')[0];
      if (sorted[i].date === expected) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  return {
    loadCustomWords: loadCustomWords,
    saveCustomWords: saveCustomWords,
    addCustomWord: addCustomWord,
    deleteCustomWord: deleteCustomWord,
    updateCustomWord: updateCustomWord,
    loadState: loadState,
    saveState: saveState,
    getProgress: getProgress,
    setProgress: setProgress,
    setLanguage: setLanguage,
    setMaxNewPerDay: setMaxNewPerDay,
    getTodayStats: getTodayStats,
    recordReview: recordReview,
    getStreak: getStreak,
  };
}());

window.SlovaBackend = SlovaBackend;
window.SlovaStore = SlovaStore;
