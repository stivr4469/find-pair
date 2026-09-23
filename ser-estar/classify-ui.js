/**
 * Ser vs Estar - Classify Mode UI
 * Рендерит игровой экран классификации в #ser-estar-classify-area
 */

/**
 * Рендерит основной игровой экран режима классификации
 */
function renderClassifyScreen() {
    const area = document.getElementById('ser-estar-classify-area');
    if (!area) return;

    area.innerHTML = `
        <div class="classify-wrapper">
            <!-- Прогресс и статистика -->
            <div class="classify-header">
                <div class="classify-progress-bar">
                    <div class="classify-progress-fill" id="classify-progress-fill"></div>
                </div>
                <div class="classify-stats">
                    <div class="classify-stat">
                        <span class="classify-stat-label">Счёт</span>
                        <span class="classify-stat-value" id="classify-score-display">0</span>
                    </div>
                    <div class="classify-stat">
                        <span class="classify-stat-label">Серия</span>
                        <span class="classify-stat-value streak-value" id="classify-streak-display">0 🔥</span>
                    </div>
                    <div class="classify-stat">
                        <span class="classify-stat-label">Вопрос</span>
                        <span class="classify-stat-value" id="classify-question-display">1/20</span>
                    </div>
                </div>
            </div>

            <!-- Зона карточки -->
            <div class="classify-card-zone" id="classify-card-zone">
                <div class="classify-card" id="classify-card">
                    <div class="classify-card-inner">
                        <div class="classify-sentence" id="classify-sentence"></div>
                        <button class="classify-tts-btn" id="classify-tts-btn" onclick="classifySpeak()" title="Прослушать">
                            🔊
                        </button>
                    </div>
                </div>
            </div>

            <!-- Блок обратной связи (правило) -->
            <div class="classify-feedback" id="classify-feedback">
                <div class="classify-feedback-inner" id="classify-feedback-inner"></div>
            </div>

            <!-- Зоны классификации -->
            <div class="classify-zones">
                <button class="classify-zone classify-zone-ser" id="zone-ser" data-choice="SER">
                    <span class="zone-label">SER</span>
                    <span class="zone-hint">постоянное</span>
                </button>
                <button class="classify-zone classify-zone-estar" id="zone-estar" data-choice="ESTAR">
                    <span class="zone-label">ESTAR</span>
                    <span class="zone-hint">временное</span>
                </button>
            </div>
        </div>
    `;

    // Вешаем обработчики на зоны
    document.getElementById('zone-ser').addEventListener('click', () => handleClassifyChoice('SER'));
    document.getElementById('zone-estar').addEventListener('click', () => handleClassifyChoice('ESTAR'));

    // Touch events
    document.getElementById('zone-ser').addEventListener('touchend', (e) => {
        e.preventDefault();
        handleClassifyChoice('SER');
    });
    document.getElementById('zone-estar').addEventListener('touchend', (e) => {
        e.preventDefault();
        handleClassifyChoice('ESTAR');
    });
}

/**
 * Показывает карточку с предложением
 * @param {Object} item - элемент из CLASSIFY_DATA
 * @param {number} current - текущий номер вопроса
 * @param {number} total - всего вопросов
 * @param {number} score - текущий счёт
 * @param {number} streak - текущая серия
 */
function showClassifyCard(item, current, total, score, streak) {
    const sentenceEl = document.getElementById('classify-sentence');
    const card = document.getElementById('classify-card');
    const progressFill = document.getElementById('classify-progress-fill');
    const scoreDisplay = document.getElementById('classify-score-display');
    const streakDisplay = document.getElementById('classify-streak-display');
    const questionDisplay = document.getElementById('classify-question-display');
    const feedback = document.getElementById('classify-feedback');

    if (!sentenceEl || !card) return;

    // Обновляем статистику
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (streakDisplay) streakDisplay.textContent = streak > 0 ? `${streak} 🔥` : '0';
    if (questionDisplay) questionDisplay.textContent = `${current + 1}/${total}`;
    if (progressFill) {
        const pct = total > 0 ? (current / total) * 100 : 0;
        progressFill.style.width = pct + '%';
    }

    // Скрываем feedback
    if (feedback) {
        feedback.classList.remove('visible');
    }

    // Включаем зоны
    enableClassifyZones();

    // Форматируем предложение: заменяем ___ на красивый пропуск
    const formatted = item.sentence.replace(
        '___',
        '<span class="classify-blank">___</span>'
    );
    sentenceEl.innerHTML = formatted;

    // Убираем старые анимации, добавляем slide-in
    card.className = 'classify-card card-enter';
    // Форс-рефлоу для перезапуска анимации
    void card.offsetWidth;
    card.classList.add('card-visible');
}

/**
 * Анимирует карточку при правильном ответе (улетает к зоне)
 * @param {string} chosenZone - "SER" или "ESTAR"
 */
function animateCardCorrect(chosenZone) {
    const card = document.getElementById('classify-card');
    const zone = document.getElementById(chosenZone === 'SER' ? 'zone-ser' : 'zone-estar');
    if (!card || !zone) return;

    const zoneRect = zone.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const dx = (zoneRect.left + zoneRect.width / 2) - (cardRect.left + cardRect.width / 2);
    const dy = (zoneRect.top + zoneRect.height / 2) - (cardRect.top + cardRect.height / 2);

    card.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease';
    card.style.transform = `translate(${dx}px, ${dy}px) scale(0.6)`;
    card.style.opacity = '0';

    // Зелёная вспышка на зоне
    zone.classList.add('zone-flash-correct');
    setTimeout(() => zone.classList.remove('zone-flash-correct'), 600);
}

/**
 * Анимирует карточку при неправильном ответе (трясётся)
 * @param {string} chosenZone - "SER" или "ESTAR"
 */
function animateCardWrong(chosenZone) {
    const card = document.getElementById('classify-card');
    const zone = document.getElementById(chosenZone === 'SER' ? 'zone-ser' : 'zone-estar');

    if (card) {
        card.classList.add('card-shake');
        setTimeout(() => card.classList.remove('card-shake'), 600);
    }

    if (zone) {
        zone.classList.add('zone-flash-wrong');
        setTimeout(() => zone.classList.remove('zone-flash-wrong'), 600);
    }
}

/**
 * Показывает объяснение правила после неправильного ответа
 * @param {Object} item - элемент из CLASSIFY_DATA
 */
function showClassifyFeedback(item) {
    const feedback = document.getElementById('classify-feedback');
    const inner = document.getElementById('classify-feedback-inner');
    if (!feedback || !inner) return;

    inner.innerHTML = `
        <div class="feedback-rule">
            <span class="feedback-icon">💡</span>
            <strong>${item.rule}</strong>
        </div>
        <div class="feedback-explanation">${item.explanation}</div>
        <div class="feedback-correct">Правильно: <em>${item.full}</em></div>
    `;

    feedback.classList.add('visible');
}

/**
 * Показывает финальный экран результатов
 * @param {number} score - итоговый счёт
 * @param {number} total - всего вопросов
 * @param {number} bestStreak - лучшая серия
 */
function showClassifyResults(score, total, bestStreak) {
    const area = document.getElementById('ser-estar-classify-area');
    if (!area) return;

    const pct = Math.round((score / total) * 100);
    let medal = '📚';
    let msg = 'Продолжай практиковать!';
    if (pct >= 95) { medal = '🏆'; msg = '¡Perfecto! Отличный результат!'; }
    else if (pct >= 80) { medal = '🥇'; msg = '¡Muy bien! Почти отлично!'; }
    else if (pct >= 60) { medal = '🥈'; msg = '¡Bien! Хороший результат!'; }
    else if (pct >= 40) { medal = '🥉'; msg = 'Неплохо, тренируйся дальше!'; }

    area.innerHTML = `
        <div class="classify-results">
            <div class="results-medal">${medal}</div>
            <h2 class="results-title">Сессия завершена!</h2>
            <div class="results-score">${score} / ${total}</div>
            <div class="results-pct">${pct}%</div>
            <div class="results-msg">${msg}</div>
            <div class="results-streak">Лучшая серия: ${bestStreak} 🔥</div>
            <div class="results-buttons">
                <button class="results-btn results-btn-primary" onclick="initClassifyMode()">
                    🔄 Ещё раз
                </button>
                <button class="results-btn results-btn-secondary" onclick="SerEstarApp.showMainMenu()">
                    📋 В меню
                </button>
            </div>
        </div>
    `;
}

/**
 * Блокирует зоны во время анимации / обратной связи
 */
function disableClassifyZones() {
    const serZone = document.getElementById('zone-ser');
    const estarZone = document.getElementById('zone-estar');
    if (serZone) serZone.disabled = true;
    if (estarZone) estarZone.disabled = true;
}

/**
 * Включает зоны для нового вопроса
 */
function enableClassifyZones() {
    const serZone = document.getElementById('zone-ser');
    const estarZone = document.getElementById('zone-estar');
    if (serZone) serZone.disabled = false;
    if (estarZone) estarZone.disabled = false;
}

// Экспорт
if (typeof window !== 'undefined') {
    window.renderClassifyScreen = renderClassifyScreen;
    window.showClassifyCard = showClassifyCard;
    window.animateCardCorrect = animateCardCorrect;
    window.animateCardWrong = animateCardWrong;
    window.showClassifyFeedback = showClassifyFeedback;
    window.showClassifyResults = showClassifyResults;
    window.disableClassifyZones = disableClassifyZones;
    window.enableClassifyZones = enableClassifyZones;
}
