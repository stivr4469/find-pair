// spanish-trainer-app/tren/mode7-ui.js
/**
 * Tren Ir/Venir/Llegar - Mode 7: UI Functions
 * Функции отображения для режима "Распределить по колонкам"
 */

// --- ИНЖЕКТ СТИЛЕЙ (однократно) ---

function injectMode7Styles() {
    if (document.getElementById('mode7-styles')) return;

    document.head.insertAdjacentHTML('beforeend', `
<style id="mode7-styles">
/* === MODE 7: Classify Items === */

.mode7-word-bank {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 52px;
    border: 1.5px dashed #bbb;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 16px;
    background: #fafafa;
    align-items: center;
}

.word-chip {
    padding: 6px 16px;
    border-radius: 20px;
    border: 2px solid #6c757d;
    background: white;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    color: #2c3e50;
    transition: all 0.15s ease;
    user-select: none;
    line-height: 1.4;
}

.word-chip:hover {
    border-color: #667eea;
    background: #f0f2ff;
    transform: translateY(-1px);
}

.word-chip.selected {
    border-color: #007bff;
    background: #e7f1ff;
    color: #004085;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.15);
}

.mode7-columns-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 8px;
}

.classify-column {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 10px;
    min-height: 130px;
    cursor: pointer;
    background: #fafafa;
    transition: border-color 0.15s, background 0.15s;
    display: flex;
    flex-direction: column;
}

.classify-column:hover {
    border-color: #aaa;
    background: #f4f4f4;
}

.classify-column.has-selection {
    border-color: #007bff;
    background: #f0f6ff;
}

.classify-column-header {
    text-align: center;
    margin: 0 0 8px;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.classify-column-header.col-ir    { color: #e74c3c; }
.classify-column-header.col-venir  { color: #2980b9; }
.classify-column-header.col-llegar { color: #27ae60; }

.column-drop-zone {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.placed-word-chip {
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 0.88rem;
    font-weight: 600;
    border: 1.5px solid transparent;
    text-align: center;
    word-break: break-word;
}

.mode7-instruction {
    font-size: 0.83rem;
    color: #888;
    text-align: center;
    margin-bottom: 14px;
    font-style: italic;
}

@media (max-width: 480px) {
    .mode7-columns-grid {
        gap: 6px;
    }

    .classify-column {
        padding: 7px 6px;
        min-height: 100px;
    }

    .classify-column-header {
        font-size: 0.82rem;
    }

    .word-chip {
        font-size: 0.82rem;
        padding: 5px 11px;
    }

    .placed-word-chip {
        font-size: 0.78rem;
        padding: 4px 6px;
    }
}
</style>
    `);
}

// --- ГЛАВНАЯ ФУНКЦИЯ ОТОБРАЖЕНИЯ РАУНДА ---

function displayMode7RoundUI(round, roundIndex, totalRounds) {
    injectMode7Styles();

    const contentArea = document.getElementById('mode7-content');
    if (!contentArea) return;

    const isLast = roundIndex >= totalRounds - 1;

    contentArea.innerHTML = `
        <div class="question-container">
            <div class="progress-text">Раунд ${roundIndex + 1} из ${totalRounds}</div>
            <h3 id="mode7-title" style="text-align:center; margin-bottom:6px; font-size:1.05rem; color:#2c3e50;">${escapeHtml(round.title)}</h3>
            <p class="mode7-instruction" id="mode7-instruction">${escapeHtml(round.instruction || 'Нажми слово → нажми колонку')}</p>

            <!-- Банк слов -->
            <div id="mode7-word-bank" class="mode7-word-bank"></div>

            <!-- Три колонки -->
            <div id="mode7-columns" class="mode7-columns-grid">

                <div class="classify-column" id="col-ir" onclick="placeMode7WordInColumn('ir')">
                    <h4 class="classify-column-header col-ir">IR</h4>
                    <div class="column-drop-zone" id="drop-ir"></div>
                </div>

                <div class="classify-column" id="col-venir" onclick="placeMode7WordInColumn('venir')">
                    <h4 class="classify-column-header col-venir">VENIR</h4>
                    <div class="column-drop-zone" id="drop-venir"></div>
                </div>

                <div class="classify-column" id="col-llegar" onclick="placeMode7WordInColumn('llegar')">
                    <h4 class="classify-column-header col-llegar">LLEGAR</h4>
                    <div class="column-drop-zone" id="drop-llegar"></div>
                </div>

            </div>

            <div class="feedback" id="mode7-feedback" style="margin-top:14px; min-height:40px;"></div>
            <button class="next-button" id="mode7-next-btn" style="display:none;" onclick="${isLast ? 'handleNextMode7Round()' : 'handleNextMode7Round()'}">
                ${isLast ? 'Завершить →' : 'Следующий раунд →'}
            </button>
        </div>
    `;

    // Первичное заполнение банка и колонок
    refreshMode7WordBank();
    refreshMode7Columns();

    // Подсвечиваем колонки при выбранном слове
    _attachMode7ColumnHighlight();
}

/**
 * Подсвечивает колонки, когда есть выбранное слово.
 * Используем MutationObserver, чтобы не переусложнять логику.
 * Вместо этого — простой делегированный клик на весь контент-блок.
 */
function _attachMode7ColumnHighlight() {
    // При любом изменении selectedWord обновляем классы колонок
    // Это вызывается через refreshMode7WordBank → который уже рендерит банк
    // Мы добавляем обёртку: при клике по слову также обновляем колонки
    const cols = ['ir', 'venir', 'llegar'];
    cols.forEach(colId => {
        const col = document.getElementById('col-' + colId);
        if (!col) return;
        // Убираем старый listener, добавляем флаг через data
        col.addEventListener('mouseenter', () => {
            if (mode7State.selectedWord) {
                cols.forEach(c => {
                    const el = document.getElementById('col-' + c);
                    if (el) el.classList.remove('has-selection');
                });
                col.classList.add('has-selection');
            }
        });
        col.addEventListener('mouseleave', () => {
            col.classList.remove('has-selection');
        });
    });
}

// --- РЕЗУЛЬТАТЫ ВСЕЙ ИГРЫ ---

function showMode7ResultsUI() {
    const contentArea = document.getElementById('mode7-content');
    if (!contentArea) return;

    const total = mode7State.totalScore;
    const correct = mode7State.score;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    let message = '';
    if (percentage === 100) message = '🎉 ¡Excelente! Все формы знаешь!';
    else if (percentage >= 80) message = '👏 ¡Muy bien! Отлично справился!';
    else if (percentage >= 60) message = '👍 ¡Bien! Есть куда расти.';
    else message = '📚 Sigue practicando! Повтори формы.';

    contentArea.innerHTML = `
        <div class="results-container">
            <h3>🏁 Результаты</h3>
            <div class="final-score">${correct} из ${total} (${percentage}%)</div>
            <div class="final-message">${message}</div>
            <button class="restart-button" onclick="restartMode7()">🔄 Ещё раз</button>
            <button class="menu-button" onclick="showMainMenu()">📋 Меню</button>
        </div>
    `;
}

// --- СЧЁТ ---

function updateMode7ScoreUI() {
    const scoreElement = document.getElementById('score-value');
    if (scoreElement) {
        scoreElement.textContent = mode7State.score;
    }
}

// --- ЭКСПОРТ ---
if (typeof window !== 'undefined') {
    window.displayMode7RoundUI = displayMode7RoundUI;
    window.showMode7ResultsUI = showMode7ResultsUI;
    window.updateMode7ScoreUI = updateMode7ScoreUI;
}
