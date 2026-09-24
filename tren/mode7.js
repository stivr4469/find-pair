// spanish-trainer-app/tren/mode7.js
/**
 * Tren Ir/Venir/Llegar - Mode 7: Game Logic
 * Основная логика режима "Распределить по колонкам"
 */

let mode7State = {
    currentRoundIndex: 0,
    score: 0,         // правильных ответов за всё упражнение
    totalScore: 0,    // всего слов за всё упражнение
    rounds: [],
    isRoundComplete: false,
    // состояние текущего раунда
    currentItems: [],         // перемешанные слова текущего раунда
    assignments: {},          // word -> columnId (куда положил пользователь)
    results: {},              // word -> true/false (проверено или нет)
    selectedWord: null        // выбранное слово (ожидает клика по колонке)
};

// --- ЛОГИКА ИГРЫ ---

function initMode7() {
    if (typeof MODE7_ROUNDS === 'undefined') {
        console.error("Данные для Mode 7 (MODE7_ROUNDS) не загружены. Проверьте подключение mode7-data.js");
        return;
    }

    mode7State.currentRoundIndex = 0;
    mode7State.score = 0;
    mode7State.totalScore = 0;
    mode7State.isRoundComplete = false;
    mode7State.rounds = MODE7_ROUNDS;

    updateMode7ScoreUI();
    displayMode7Round();
}

function displayMode7Round() {
    if (mode7State.currentRoundIndex >= mode7State.rounds.length) {
        showMode7ResultsUI();
        return;
    }

    const round = mode7State.rounds[mode7State.currentRoundIndex];

    // Сбрасываем состояние раунда
    mode7State.currentItems = shuffleArray([...round.items]);
    mode7State.assignments = {};
    mode7State.results = {};
    mode7State.selectedWord = null;
    mode7State.isRoundComplete = false;

    displayMode7RoundUI(round, mode7State.currentRoundIndex, mode7State.rounds.length);
}

/**
 * Вызывается при клике по слову в банке слов.
 * Выделяет слово или снимает выделение.
 */
function selectMode7Word(word) {
    // Если слово уже проверено — нельзя выбрать
    if (mode7State.results[word] !== undefined) return;

    if (mode7State.selectedWord === word) {
        // Повторный клик — снять выделение
        mode7State.selectedWord = null;
    } else {
        mode7State.selectedWord = word;
    }

    refreshMode7WordBank();
}

/**
 * Вызывается при клике по колонке.
 * Перемещает выбранное слово в колонку и сразу проверяет.
 */
function placeMode7WordInColumn(columnId) {
    if (!mode7State.selectedWord) return;

    const word = mode7State.selectedWord;
    mode7State.selectedWord = null;

    // Назначаем слово в колонку
    mode7State.assignments[word] = columnId;

    // Сразу проверяем
    checkMode7Item(word, columnId);
}

/**
 * Проверяет правильность размещения слова.
 */
function checkMode7Item(word, targetColumn) {
    const round = mode7State.rounds[mode7State.currentRoundIndex];
    const item = round.items.find(i => i.word === word);
    if (!item) return;

    const isCorrect = item.correctColumn === targetColumn;
    mode7State.results[word] = isCorrect;

    if (isCorrect) {
        mode7State.score++;
    }
    mode7State.totalScore++;

    updateMode7ScoreUI();

    // Обновляем отображение
    refreshMode7WordBank();
    refreshMode7Columns();

    // Проверяем, все ли слова распределены
    const allDone = round.items.every(i => mode7State.results[i.word] !== undefined);
    if (allDone) {
        mode7State.isRoundComplete = true;
        showMode7RoundComplete();
    }
}

function handleNextMode7Round() {
    mode7State.currentRoundIndex++;
    displayMode7Round();
}

function restartMode7() {
    initMode7();
}

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ЧАСТИЧНОГО ОБНОВЛЕНИЯ UI ---

/**
 * Перерисовывает только банк слов (без пересоздания всего layout).
 */
function refreshMode7WordBank() {
    const bank = document.getElementById('mode7-word-bank');
    if (!bank) return;

    const round = mode7State.rounds[mode7State.currentRoundIndex];
    // Показываем только слова, которые ещё не размещены в колонках
    const remaining = mode7State.currentItems.filter(
        item => mode7State.assignments[item.word] === undefined
    );

    bank.innerHTML = remaining.map(item => {
        const isSelected = mode7State.selectedWord === item.word;
        return `<button
            class="word-chip${isSelected ? ' selected' : ''}"
            onclick="selectMode7Word('${escapeHtml(item.word)}')"
            data-word="${escapeHtml(item.word)}"
        >${escapeHtml(item.word)}</button>`;
    }).join('');

    if (remaining.length === 0) {
        bank.innerHTML = '<span style="color:var(--muted); font-style:italic; font-size:0.85rem;">Все слова распределены</span>';
    }
}

/**
 * Перерисовывает содержимое всех трёх колонок.
 */
function refreshMode7Columns() {
    const columns = ['ir', 'venir', 'llegar'];
    columns.forEach(colId => {
        const dropZone = document.getElementById('drop-' + colId);
        if (!dropZone) return;

        const round = mode7State.rounds[mode7State.currentRoundIndex];
        const placedItems = round.items.filter(
            item => mode7State.assignments[item.word] === colId
        );

        dropZone.innerHTML = placedItems.map(item => {
            const isChecked = mode7State.results[item.word] !== undefined;
            const isCorrect = mode7State.results[item.word];

            let chipClass = 'placed-word-chip';
            let hint = '';

            if (isChecked) {
                if (isCorrect) {
                    chipClass += ' chip-correct';
                } else {
                    chipClass += ' chip-incorrect';
                    hint = ` <span style="font-size:0.75rem; font-weight:normal;">(→ ${item.correctColumn.toUpperCase()})</span>`;
                }
            }

            return `<div class="${chipClass}"> ${escapeHtml(item.word)}${hint}
            </div>`;
        }).join('');
    });
}

/**
 * Показывает результат раунда и кнопку перехода.
 */
function showMode7RoundComplete() {
    const feedback = document.getElementById('mode7-feedback');
    const nextBtn = document.getElementById('mode7-next-btn');

    if (!feedback || !nextBtn) return;

    const round = mode7State.rounds[mode7State.currentRoundIndex];
    const roundTotal = round.items.length;
    // Считаем правильных только в этом раунде
    const roundCorrect = round.items.filter(
        item => mode7State.results[item.word] === true
    ).length;
    const percentage = Math.round((roundCorrect / roundTotal) * 100);

    let emoji = '';
    if (percentage === 100) emoji = '';
    else if (percentage >= 75) emoji = '';
    else if (percentage >= 50) emoji = '';
    else emoji = '';

    feedback.innerHTML = `${emoji} Раунд завершён: ${roundCorrect} из ${roundTotal} (${percentage}%)`;
    feedback.className = roundCorrect === roundTotal ? 'feedback correct' : 'feedback warning';

    const isLast = mode7State.currentRoundIndex >= mode7State.rounds.length - 1;
    nextBtn.textContent = isLast ? 'Завершить →' : 'Следующий раунд →';
    nextBtn.style.display = 'inline-block';
}

// --- УТИЛИТА ---
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// --- ЭКСПОРТЫ ---
if (typeof window !== 'undefined') {
    window.initMode7 = initMode7;
    window.restartMode7 = restartMode7;
    window.handleNextMode7Round = handleNextMode7Round;
    window.selectMode7Word = selectMode7Word;
    window.placeMode7WordInColumn = placeMode7WordInColumn;
    window.escapeHtml = escapeHtml;
}
