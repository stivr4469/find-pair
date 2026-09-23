/**
 * Ser vs Estar - Main App Controller
 * Handles navigation between base (A1) and advanced (A2) modes
 */

const SerEstarApp = {
    currentMode: null,

    init: function() {
        console.log('[SerEstar] App initialized');
        this.setupNavigation();
    },

    setupNavigation: function() {
        const self = this;
        document.querySelectorAll('.mode-button').forEach(btn => {
            btn.addEventListener('click', function() {
                const mode = this.dataset.mode;
                self.switchMode(mode);
            });
        });
    },

    switchMode: function(modeId) {
        // Hide all areas
        document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
        document.querySelector('.main-menu').classList.add('hidden');
        document.querySelector('.score-display').classList.remove('hidden');
        var backBtn = document.getElementById('btn-back-to-modes');
        if (backBtn) backBtn.style.display = 'inline-flex';

        const modeArea = document.getElementById('ser-estar-' + modeId + '-area');
        if (modeArea) {
            modeArea.classList.remove('hidden');
            this.currentMode = modeId;

            // Initialize mode
            if (modeId === 'base' && typeof initBaseMode === 'function') {
                initBaseMode();
            } else if (modeId === 'advanced' && typeof initAdvancedMode === 'function') {
                initAdvancedMode();
            } else if (modeId === 'context' && typeof initContextMode === 'function') {
                initContextMode();
            } else if (modeId === 'rules' && typeof initRulesMode === 'function') {
                initRulesMode();
            } else if (modeId === 'classify' && typeof initClassifyMode === 'function') {
                initClassifyMode();
            }
        }
    },

    showMainMenu: function() {
        document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
        document.querySelector('.main-menu').classList.remove('hidden');
        document.querySelector('.score-display').classList.remove('hidden');
        var backBtn = document.getElementById('btn-back-to-modes');
        if (backBtn) backBtn.style.display = 'none';
        this.currentMode = null;
        window.njResetStreak && window.njResetStreak();
    }
};

// Global functions for HTML onclick handlers
function showMainMenu() {
    SerEstarApp.showMainMenu();
}

// Naranjito mascot
var _nj = null;
var _njStreak = 0;

document.addEventListener('DOMContentLoaded', function() {
    SerEstarApp.init();

    var buddy = document.getElementById('buddy');
    if (buddy && typeof Naranjito !== 'undefined') {
        _nj = Naranjito.mount(buddy);
        _nj.greet();
    }
});

window.njCorrect = function(streak) { if (_nj) _nj.correct(streak || _njStreak); };
window.njWrong = function(ruleEs, ruleRu) { _njStreak = 0; if (_nj) _nj.wrong(ruleEs, ruleRu); };
window.njResult = function(pct) { if (_nj) _nj.result(pct); };
window.njGetStreak = function() { return _njStreak; };
window.njAddStreak = function() { _njStreak++; return _njStreak; };
window.njResetStreak = function() { _njStreak = 0; };
