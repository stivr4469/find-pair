/**
 * Ser vs Estar - Main App Controller
 * Handles navigation between 4 modes
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
        document.querySelector('.score-display').classList.add('hidden');

        // Show selected mode
        const modeArea = document.getElementById('ser-estar-' + modeId + '-area');
        if (modeArea) {
            modeArea.classList.remove('hidden');
            this.currentMode = modeId;

            // Initialize mode
            if (modeId === 'mode1' && typeof initSerEstarMode1 === 'function') {
                initSerEstarMode1();
            } else if (modeId === 'mode2' && typeof initSerEstarMode2 === 'function') {
                initSerEstarMode2();
            } else if (modeId === 'mode3' && typeof initSerEstarMode3 === 'function') {
                initSerEstarMode3();
            } else if (modeId === 'mode4' && typeof initSerEstarMode4 === 'function') {
                initSerEstarMode4();
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

function restartSerEstarMode1() {
    if (typeof initSerEstarMode1 === 'function') initSerEstarMode1();
}

function restartSerEstarMode2() {
    if (typeof initSerEstarMode2 === 'function') initSerEstarMode2();
}

function restartSerEstarMode3() {
    if (typeof initSerEstarMode3 === 'function') initSerEstarMode3();
}

function restartSerEstarMode4() {
    if (typeof initSerEstarMode4 === 'function') initSerEstarMode4();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    SerEstarApp.init();
});
