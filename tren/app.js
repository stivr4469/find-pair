/**
 * Tren Ir/Venir/Llegar - Main Application Controller
 * Integrates all game modes and manages application state
 */

// Naranjito mascot instance and streak counter
var _nj = null;
var _njStreak = 0;

const App = {
    // Глобальное состояние
    state: {
        currentMode: null,
        totalScore: 0,
        gamesPlayed: 0,
        modeHistory: []
    },

    /**
     * Инициализация приложения
     */
    init: function() {
        // Загрузка прогресса из localStorage
        this.loadProgress();

        // Обновление отображения счета
        this.updateStats();

        // Настройка навигации по меню
        this.setupNavigation();

        // Инициализация всех режимов
        this.initModes();
    },

    /**
     * Инициализация всех игровых режимов
     */
    initModes: function() {
        // Режимы инициализируются при переключении через switchMode
    },

    /**
     * Настройка навигации по меню
     */
    setupNavigation: function() {
        // Навигация через onclick атрибуты в HTML
    },

    /**
     * Переключение между режимами
     * @param {string} modeId - идентификатор режима (mode1, mode2, etc.)
     */
    switchMode: function(modeId) {
        // Скрытие всех игровых зон
        document.querySelectorAll('.game-area').forEach(el => {
            el.classList.add('hidden');
        });

        // Скрытие главного меню
        document.querySelector('.main-menu').classList.add('hidden');

        var backBtn = document.getElementById('btn-back-to-modes');
        if (backBtn) backBtn.style.display = 'inline-flex';

        // Показать выбранную игровую зону
        const modeElement = document.getElementById(modeId + '-area') || document.getElementById(modeId);
        if (modeElement) {
            modeElement.classList.remove('hidden');
        }

        // Сохранение текущего режима
        this.state.currentMode = modeId;
        this.state.modeHistory.push(modeId);

        // Сброс серии Naranjito и топбара при смене режима
        _njStreak = 0;
        if (typeof resetTopbar === 'function') resetTopbar();

        // Инициализация конкретного режима
        var inits = {
            mode0: initMode0, mode1: initMode1, mode2: initMode2, mode3: initMode3,
            mode4: initMode4, mode5: initMode5, mode6: initMode6, mode7: initMode7
        };
        var fn = inits[modeId];
        if (typeof fn === 'function') fn();
    },

    /**
     * Обновление отображения статистики
     */
    updateStats: function() {
        const scoreElement = document.getElementById('score-value');
        if (scoreElement) {
            scoreElement.textContent = this.state.totalScore;
        }

        const progressElement = document.getElementById('progress-value');
        if (progressElement) {
            const progress = Math.min(100, Math.floor((this.state.gamesPlayed % 10) * 10));
            progressElement.textContent = progress + '%';
        }
    },

    /**
     * Добавление очков к счету
     * @param {number} points - количество очков
     */
    addScore: function(points) {
        this.state.totalScore += points;
        this.updateStats();
        this.saveProgress();
    },

    /**
     * Завершение игры (увеличение счетчика игр)
     */
    completeGame: function() {
        this.state.gamesPlayed++;
        this.saveProgress();
    },

    /**
     * Сохранение прогресса в localStorage
     */
    saveProgress: function() {
        try {
            const progress = {
                totalScore: this.state.totalScore,
                gamesPlayed: this.state.gamesPlayed,
                lastPlayed: new Date().toISOString()
            };
            localStorage.setItem('trenIrVenirProgress', JSON.stringify(progress));
        } catch (e) {
            console.warn('Failed to save progress:', e);
        }
    },

    /**
     * Загрузка прогресса из localStorage
     */
    loadProgress: function() {
        try {
            const saved = localStorage.getItem('trenIrVenirProgress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.state.totalScore = progress.totalScore || 0;
                this.state.gamesPlayed = progress.gamesPlayed || 0;
            }
        } catch (e) {
            console.warn('Failed to load progress:', e);
        }
    },

    /**
     * Сброс прогресса
     */
    resetProgress: function() {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
            this.state.totalScore = 0;
            this.state.gamesPlayed = 0;
            this.state.modeHistory = [];
            localStorage.removeItem('trenIrVenirProgress');
            this.updateStats();
        }
    },

    /**
     * Возврат в главное меню
     */
    showMainMenu: function() {
        // Скрытие всех игровых зон
        document.querySelectorAll('.game-area').forEach(el => {
            el.classList.add('hidden');
        });

        // Показ главного меню
        document.querySelector('.main-menu').classList.remove('hidden');

        var backBtn = document.getElementById('btn-back-to-modes');
        if (backBtn) backBtn.style.display = 'none';

        // Сброс текущего режима
        this.state.currentMode = null;
    }
};

// Глобальные функции для доступа из HTML
function showMainMenu() {
    App.showMainMenu();
}

function restartMode0() {
    if (typeof initMode0 === 'function') {
        initMode0();
    }
}

function restartMode2() {
    if (typeof initMode2 === 'function') {
        initMode2();
    }
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    App.init();

    // Инициализация маскота Naranjito
    var buddy = document.getElementById('buddy');
    if (buddy && typeof Naranjito !== 'undefined') {
        _nj = Naranjito.mount(buddy);
        _nj.greet();
    }
});

// Глобальные хелперы для вызова Naranjito из файлов режимов
window.njCorrect = function(streak) { if (_nj) _nj.correct(streak || _njStreak); };
window.njWrong = function(ruleEs, ruleRu) { _njStreak = 0; if (_nj) _nj.wrong(ruleEs, ruleRu); };
window.njResult = function(pct) { if (_nj) _nj.result(pct); };
