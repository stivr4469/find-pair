// spanish-trainer-app/tren/mode7.js
/**
 * Tren Ir/Venir/Llegar - Mode 7: Game Logic
 * Режим "Распределить по колонкам"
 * Неверные слова мигают красным 700мс и возвращаются в банк.
 * Раунд завершается только когда все слова стоят правильно.
 */

let mode7State = {
    currentRoundIndex: 0,
    score: 0,           // правильные с первой попытки (все раунды)
    maxScore: 0,        // всего слов во всех раундах
    rounds: [],
    isRoundComplete: false,
    currentItems: [],
    assignments: {},    // word -> columnId
    results: {},        // word -> true (правильно) | false (временно, красный флеш)
    firstTryWrong: {},  // word -> true, если была хотя бы одна ошибка
    selectedWord: null
};

// --- ЛОГИКА ИГРЫ ---

function initMode7() {
    if (typeof MODE7_ROUNDS === 'undefined') {
        console.error("Данные для Mode 7 (MODE7_ROUNDS) не загружены.");
        return;
    }

    mode7State.currentRoundIndex = 0;
    mode7State.score = 0;
    mode7State.isRoundComplete = false;
    mode7State.rounds = MODE7_ROUNDS;
    mode7State.maxScore = MODE7_ROUNDS.reduce(function(s, r) { return s + r.items.length; }, 0);

    updateMode7ScoreUI();
    displayMode7Round();
}

function displayMode7Round() {
    if (mode7State.currentRoundIndex >= mode7State.rounds.length) {
        showMode7ResultsUI();
        return;
    }

    const round = mode7State.rounds[mode7State.currentRoundIndex];

    mode7State.currentItems = shuffleArray([...round.items]);
    mode7State.assignments = {};
    mode7State.results = {};
    mode7State.firstTryWrong = {};
    mode7State.selectedWord = null;
    mode7State.isRoundComplete = false;

    displayMode7RoundUI(round, mode7State.currentRoundIndex, mode7State.rounds.length);
}

function selectMode7Word(word) {
    if (mode7State.results[word] === true) return; // уже правильно размещено

    if (mode7State.selectedWord === word) {
        mode7State.selectedWord = null;
    } else {
        mode7State.selectedWord = word;
    }

    refreshMode7WordBank();
}

function placeMode7WordInColumn(columnId) {
    if (!mode7State.selectedWord) return;

    const word = mode7State.selectedWord;
    mode7State.selectedWord = null;

    mode7State.assignments[word] = columnId;
    checkMode7Item(word, columnId);
}

function checkMode7Item(word, targetColumn) {
    const round = mode7State.rounds[mode7State.currentRoundIndex];
    const item = round.items.find(function(i) { return i.word === word; });
    if (!item) return;

    const isCorrect = item.correctColumn === targetColumn;

    if (isCorrect) {
        mode7State.results[word] = true;
        if (!mode7State.firstTryWrong[word]) {
            mode7State.score++;
            if (typeof window.njCorrect === 'function') window.njCorrect(1);
        }
        updateMode7ScoreUI();
        refreshMode7WordBank();
        refreshMode7Columns();

        const allDone = round.items.every(function(i) { return mode7State.results[i.word] === true; });
        if (allDone) {
            mode7State.isRoundComplete = true;
            showMode7RoundComplete();
        }
    } else {
        // Ошибка: кратко красный → вернуть в банк
        mode7State.firstTryWrong[word] = true;
        mode7State.results[word] = false;
        if (typeof window.njWrong === 'function') window.njWrong(null, null);
        refreshMode7Columns();

        setTimeout(function() {
            delete mode7State.assignments[word];
            delete mode7State.results[word];
            refreshMode7WordBank();
            refreshMode7Columns();
        }, 700);
    }
}

function handleNextMode7Round() {
    mode7State.currentRoundIndex++;
    displayMode7Round();
}

function restartMode7() {
    initMode7();
}

// --- ЧАСТИЧНОЕ ОБНОВЛЕНИЕ UI ---

function refreshMode7WordBank() {
    const bank = document.getElementById('mode7-word-bank');
    if (!bank) return;

    // В банке — слова без assignments (ещё не размещены или возвращены после ошибки)
    const remaining = mode7State.currentItems.filter(
        function(item) { return mode7State.assignments[item.word] === undefined; }
    );

    bank.innerHTML = remaining.map(function(item) {
        const isSelected = mode7State.selectedWord === item.word;
        return '<button class="word-chip' + (isSelected ? ' selected' : '') + '"' +
            ' onclick="selectMode7Word(\'' + escapeHtml(item.word) + '\')"' +
            ' data-word="' + escapeHtml(item.word) + '">' +
            escapeHtml(item.word) + '</button>';
    }).join('');

    if (remaining.length === 0) {
        bank.innerHTML = '<span style="color:var(--muted); font-style:italic; font-size:0.85rem;">Все слова распределены</span>';
    }
}

function refreshMode7Columns() {
    const columns = ['ir', 'venir', 'llegar'];
    columns.forEach(function(colId) {
        const dropZone = document.getElementById('drop-' + colId);
        if (!dropZone) return;

        const round = mode7State.rounds[mode7State.currentRoundIndex];
        const placedItems = round.items.filter(
            function(item) { return mode7State.assignments[item.word] === colId; }
        );

        dropZone.innerHTML = placedItems.map(function(item) {
            const result = mode7State.results[item.word];

            if (result === true) {
                return '<div class="placed-word-chip chip-correct">' + escapeHtml(item.word) + '</div>';
            } else if (result === false) {
                // Временный красный флеш — показываем куда надо
                const hint = ' <span style="font-size:0.75rem; font-weight:normal;">(→ ' +
                    item.correctColumn.toUpperCase() + ')</span>';
                return '<div class="placed-word-chip chip-incorrect">' + escapeHtml(item.word) + hint + '</div>';
            }
            return '<div class="placed-word-chip">' + escapeHtml(item.word) + '</div>';
        }).join('');
    });
}

function showMode7RoundComplete() {
    const feedback = document.getElementById('mode7-feedback');
    const nextBtn = document.getElementById('mode7-next-btn');
    if (!feedback || !nextBtn) return;

    const round = mode7State.rounds[mode7State.currentRoundIndex];
    const roundTotal = round.items.length;
    // Правильных с первой попытки в этом раунде
    const roundCorrect = round.items.filter(function(item) {
        return !mode7State.firstTryWrong[item.word];
    }).length;
    const percentage = Math.round((roundCorrect / roundTotal) * 100);

    feedback.innerHTML = 'Раунд завершён: ' + roundCorrect + ' из ' + roundTotal + ' с первой попытки (' + percentage + '%)';
    feedback.className = roundCorrect === roundTotal ? 'feedback correct' : 'feedback warning';

    const isLast = mode7State.currentRoundIndex >= mode7State.rounds.length - 1;
    nextBtn.textContent = isLast ? 'Завершить →' : 'Следующий раунд →';
    nextBtn.style.display = 'inline-block';
}

// --- РЕЗУЛЬТАТЫ ---

function showMode7ResultsUI() {
    const contentArea = document.getElementById('mode7-content');
    if (!contentArea) return;

    const correct = mode7State.score;
    const total = mode7State.maxScore;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    let message = '';
    if (percentage === 100) message = '¡Excelente! Все формы знаешь!';
    else if (percentage >= 80) message = '¡Muy bien! Отлично справился!';
    else if (percentage >= 60) message = '¡Bien! Есть куда расти.';
    else message = 'Sigue practicando! Повтори формы.';

    contentArea.innerHTML =
        '<div class="results-container">' +
        '<h3>Результаты</h3>' +
        '<div class="final-score">' + correct + ' из ' + total + ' (' + percentage + '%)</div>' +
        '<div class="final-message">' + message + '</div>' +
        '<button class="restart-button" onclick="restartMode7()">Ещё раз</button>' +
        '<button class="menu-button" onclick="showMainMenu()">Меню</button>' +
        '</div>';
}

// --- СЧЁТ ---

function updateMode7ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) scoreElement.textContent = mode7State.score;
    if (typeof setTopbarProgress === 'function' && mode7State.rounds && mode7State.rounds.length > 0) {
        setTopbarProgress(Math.round((mode7State.currentRoundIndex / mode7State.rounds.length) * 100));
    }
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
