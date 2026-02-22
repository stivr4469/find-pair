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

        const modeArea = document.getElementById('ser-estar-' + modeId + '-area');
        if (modeArea) {
            modeArea.classList.remove('hidden');
            this.currentMode = modeId;

            // Initialize mode
            if (modeId === 'base' && typeof initBaseMode === 'function') {
                initBaseMode();
            } else if (modeId === 'advanced' && typeof initAdvancedMode === 'function') {
                initAdvancedMode();
            }
        }
    },

    showMainMenu: function() {
        document.querySelectorAll('.game-area').forEach(el => el.classList.add('hidden'));
        document.querySelector('.main-menu').classList.remove('hidden');
        document.querySelector('.score-display').classList.remove('hidden');
        this.currentMode = null;
    }
};

// Global functions for HTML onclick handlers
function showMainMenu() {
    SerEstarApp.showMainMenu();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    SerEstarApp.init();
});
