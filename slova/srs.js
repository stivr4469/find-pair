/**
 * SlovaSRS — порт Cards/src/lib/srs.ts (1:1)
 * Алгоритм интервального повторения (SM2-подобный).
 */

var SlovaSRS = (function () {
  var MIN_EASE = 1.3;
  var MAX_EASE = 3.0;
  var MAX_INTERVAL_DAYS = 90;

  function pluralizeMinutes(n) {
    if (n === 1) return 'минуту';
    if (n >= 2 && n <= 4) return 'минуты';
    return 'минут';
  }

  function pluralizeDays(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'дней';
    if (mod10 === 1) return 'день';
    if (mod10 >= 2 && mod10 <= 4) return 'дня';
    return 'дней';
  }

  function createInitialProgress(wordId) {
    return {
      wordId: wordId,
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
      nextReview: Date.now(),
      lastReview: 0,
      totalReviews: 0,
    };
  }

  function updateProgress(progress, result) {
    var now = Date.now();

    if (result === 'forgot') {
      return Object.assign({}, progress, {
        interval: 1,
        repetitions: 0,
        easeFactor: Math.max(MIN_EASE, progress.easeFactor - 0.2),
        nextReview: now + 1 * 60 * 1000,
        lastReview: now,
        totalReviews: progress.totalReviews + 1,
      });
    }

    // result === 'know'
    var rep = progress.repetitions;
    var newInterval;
    var nextReviewMs;

    if (rep === 0) {
      newInterval = 10; // minutes
      nextReviewMs = now + 10 * 60 * 1000;
    } else if (rep === 1) {
      newInterval = 1440; // 1 day in minutes
      nextReviewMs = now + 24 * 60 * 60 * 1000;
    } else if (rep === 2) {
      newInterval = 3 * 1440; // 3 days in minutes
      nextReviewMs = now + 3 * 24 * 60 * 60 * 1000;
    } else {
      var prevDays = progress.interval / 1440;
      var newDays = Math.min(
        Math.round(prevDays * progress.easeFactor),
        MAX_INTERVAL_DAYS
      );
      newInterval = newDays * 1440;
      nextReviewMs = now + newDays * 24 * 60 * 60 * 1000;
    }

    var newEase = Math.min(MAX_EASE, progress.easeFactor + 0.1);

    return Object.assign({}, progress, {
      interval: newInterval,
      repetitions: progress.repetitions + 1,
      easeFactor: newEase,
      nextReview: nextReviewMs,
      lastReview: now,
      totalReviews: progress.totalReviews + 1,
    });
  }

  function isDue(progress) {
    return Date.now() >= progress.nextReview;
  }

  function formatNextInterval(progress, result) {
    var simulated = updateProgress(progress, result);
    var intervalMin = simulated.interval;

    if (intervalMin < 60) {
      return 'через ' + intervalMin + ' ' + pluralizeMinutes(intervalMin);
    }

    var days = Math.round(intervalMin / 1440);
    if (days === 1) {
      return 'через 1 день';
    }
    return 'через ' + days + ' ' + pluralizeDays(days);
  }

  function getRankLabel(rank) {
    return 'ранг ' + rank;
  }

  function getRepetitionLabel(repetitions) {
    if (repetitions === 0) return 'новое';
    if (repetitions === 1) return '1-й повтор';
    return repetitions + '-й повтор';
  }

  function getStatusLabel(progress) {
    if (progress.repetitions === 0) return 'новое';
    if (progress.interval < 1440) return 'учится';
    var days = Math.round(progress.interval / 1440);
    if (days === 1) return 'через 1 день';
    return 'через ' + days + ' ' + pluralizeDays(days);
  }

  return {
    createInitialProgress: createInitialProgress,
    updateProgress: updateProgress,
    isDue: isDue,
    formatNextInterval: formatNextInterval,
    getRankLabel: getRankLabel,
    getRepetitionLabel: getRepetitionLabel,
    getStatusLabel: getStatusLabel,
  };
}());

window.SlovaSRS = SlovaSRS;
