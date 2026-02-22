/**
 * Tren Ir/Venir/Llegar - Main Application Controller
 * Integrates all game modes and manages application state
 *
 * DEBUG VERSION: Enhanced logging for all mode switches
 */

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
        console.log('🚂 Tren Ir/Venir/Llegar - Application initialized');

        // Загрузка прогресса из localStorage
        this.loadProgress();

        // Обновление отображения счета
        this.updateStats();

        // Настройка навигации по меню
        this.setupNavigation();

        // Инициализация всех режимов
        this.initModes();

        // Debug log
        this.debug('Application initialization complete');
    },

    /**
     * Debug helper - writes to visible debug panel
     */
    debug: function(msg) {
        const debugDiv = document.getElementById('debug-output');
        if (debugDiv) {
            const time = new Date().toLocaleTimeString();
            const line = document.createElement('div');
            line.className = 'debug-line';
            line.innerHTML = `<span class="debug-time">[${time}]</span> [APP] ${msg}`;
            debugDiv.appendChild(line);
            debugDiv.scrollTop = debugDiv.scrollHeight;
        }
        console.log('[APP DEBUG]', msg);
    },

    /**
     * Инициализация всех игровых режимов
     */
    initModes: function() {
        // Mode 1 уже имеет initMode1() в mode1.js
        // Mode 2-4 будут инициализированы при переключении
        this.debug('All modes initialized');
    },

    /**
     * Настройка навигации по меню
     */
    setupNavigation: function() {
        // Навигация теперь через onclick атрибуты в HTML
        this.debug('Navigation setup complete (using inline onclick)');
    },

    /**
     * Переключение между режимами
     * @param {string} modeId - идентификатор режима (mode1, mode2, etc.)
     */
    switchMode: function(modeId) {
        const self = this;

        this.debug('>>> switchMode called: ' + modeId);

        // Скрытие всех игровых зон
        document.querySelectorAll('.game-area').forEach(el => {
            el.classList.add('hidden');
        });

        // Скрытие главного меню
        document.querySelector('.main-menu').classList.add('hidden');

        this.debug('All game areas and main menu hidden');

        // Показать выбранную игровую зону
        const modeElement = document.getElementById(modeId + '-area') || document.getElementById(modeId);
        if (modeElement) {
            modeElement.classList.remove('hidden');
            this.debug('Mode element shown: ' + modeId);
        } else {
            this.debug('ERROR: Mode element not found: ' + modeId);
        }

        // Сохранение текущего режима
        this.state.currentMode = modeId;
        this.state.modeHistory.push(modeId);

        // Инициализация конкретного режима
        console.log('Switched to mode: ' + modeId);
        this.debug('Initializing mode: ' + modeId);

        switch(modeId) {
            case 'mode0':
                if (typeof initMode0 === 'function') {
                    initMode0();
                    this.debug('initMode0() called successfully');
                } else {
                    this.debug('ERROR: initMode0 is not a function');
                }
                break;
            case 'mode1':
                if (typeof initMode1 === 'function') {
                    initMode1();
                    this.debug('initMode1() called successfully');
                } else {
                    this.debug('ERROR: initMode1 is not a function');
                }
                break;
            case 'mode2':
                if (typeof initMode2 === 'function') {
                    initMode2();
                    this.debug('initMode2() called successfully');
                } else {
                    this.debug('ERROR: initMode2 is not a function');
                }
                break;
            case 'mode3':
                if (typeof initMode3 === 'function') {
                    initMode3();
                    this.debug('initMode3() called successfully');
                } else {
                    this.debug('ERROR: initMode3 is not a function');
                }
                break;
            case 'mode4':
                if (typeof initMode4 === 'function') {
                    initMode4();
                    this.debug('initMode4() called successfully');
                } else {
                    this.debug('ERROR: initMode4 is not a function');
                }
                break;
            case 'mode5':
                if (typeof initMode5 === 'function') {
                    initMode5();
                    this.debug('initMode5() called successfully');
                } else {
                    this.debug('ERROR: initMode5 is not a function');
                }
                break;
            default:
                this.debug('WARNING: Unknown mode: ' + modeId);
        }

        this.debug('<<< switchMode complete: ' + modeId);
    },

    /**
     * Обновление отображения статистики
     */
    updateStats: function() {
        // Обновление счета
        const scoreElement = document.getElementById('score-value');
        if (scoreElement) {
            scoreElement.textContent = this.state.totalScore;
        }

        // Обновление прогресса
        const progressElement = document.getElementById('progress-value');
        if (progressElement) {
            const progress = Math.min(100, Math.floor((this.state.gamesPlayed % 10) * 10));
            progressElement.textContent = progress + '%';
        }

        this.debug('Stats updated: score=' + this.state.totalScore + ', games=' + this.state.gamesPlayed);
    },

    /**
     * Добавление очков к счету
     * @param {number} points - количество очков
     */
    addScore: function(points) {
        this.state.totalScore += points;
        this.updateStats();
        this.saveProgress();
        this.debug('Score added: +' + points + ', total=' + this.state.totalScore);
    },

    /**
     * Завершение игры (увеличение счетчика игр)
     */
    completeGame: function() {
        this.state.gamesPlayed++;
        this.saveProgress();
        this.debug('Game completed, total games: ' + this.state.gamesPlayed);
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
            console.log('Progress saved:', progress);
            this.debug('Progress saved');
        } catch (e) {
            console.warn('Failed to save progress:', e);
            this.debug('WARNING: Failed to save progress: ' + e.message);
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
                console.log('Progress loaded:', progress);
                this.debug('Progress loaded: score=' + progress.totalScore + ', games=' + progress.gamesPlayed);
            }
        } catch (e) {
            console.warn('Failed to load progress:', e);
            this.debug('WARNING: Failed to load progress: ' + e.message);
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
            this.debug('Progress reset');
        }
    },

    /**
     * Возврат в главное меню
     */
    showMainMenu: function() {
        this.debug('>>> showMainMenu called');

        // Скрытие всех игровых зон
        document.querySelectorAll('.game-area').forEach(el => {
            el.classList.add('hidden');
        });

        // Показ главного меню
        document.querySelector('.main-menu').classList.remove('hidden');

        // Сброс текущего режима
        this.state.currentMode = null;

        this.debug('Main menu shown, state reset');
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

function restartMode1() {
    if (typeof initMode1 === 'function') {
        initMode1();
    }
}

function restartMode2() {
    if (typeof initMode2 === 'function') {
        initMode2();
    }
}

function restartMode3() {
    if (typeof initMode3 === 'function') {
        initMode3();
    }
}

function restartMode4() {
    if (typeof initMode4 === 'function') {
        initMode4();
    }
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});