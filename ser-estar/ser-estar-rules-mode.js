// spanish-trainer-app/ser-estar/ser-estar-rules-mode.js
/**
 * Ser vs Estar Trainer - Rules Mode Logic
 * Логика для страницы правил (DOCTOR/PLACE)
 */

function initRulesMode() {
    // Просто отображаем UI с правилами
    displayRulesUI();
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.initRulesMode = initRulesMode;
}
