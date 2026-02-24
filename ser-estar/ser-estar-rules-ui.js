// spanish-trainer-app/ser-estar/ser-estar-rules-ui.js
/**
 * Ser vs Estar Trainer - Rules UI Functions
 * Функции отображения для страницы правил (DOCTOR/PLACE)
 */

function displayRulesUI() {
    const contentArea = document.getElementById('ser-estar-rules-area');
    if (!contentArea) return;

    // Генерация HTML для правил SER (DOCTOR)
    const serRulesHtml = Object.keys(SER_RULES).map(key => `
        <li>
            <strong>${key}</strong>: ${SER_RULES[key].description}
            <ul>
                ${SER_RULES[key].examples.map(ex => `<li>${ex.es} - ${ex.ru}</li>`).join('')}
            </ul>
        </li>
    `).join('');

    // Генерация HTML для правил ESTAR (PLACE)
    const estarRulesHtml = Object.keys(ESTAR_RULES).map(key => `
        <li>
            <strong>${key}</strong>: ${ESTAR_RULES[key].description}
            <ul>
                ${ESTAR_RULES[key].examples.map(ex => `<li>${ex.es} - ${ex.ru}</li>`).join('')}
            </ul>
        </li>
    `).join('');

    contentArea.innerHTML = `
        <div class="rules-page-container">
            <div class="rules-intro">
                <p>Используйте акронимы <strong>DOCTOR</strong> для SER и <strong>PLACE</strong> для ESTAR, чтобы запомнить основные правила.</p>
            </div>
            <div class="rules-cards-container">
                <div class="rule-card ser-card">
                    <h3>🟦 SER (DOCTOR)</h3>
                    <ul>${serRulesHtml}</ul>
                </div>
                <div class="rule-card estar-card">
                    <h3>🟩 ESTAR (PLACE)</h3>
                    <ul>${estarRulesHtml}</ul>
                </div>
            </div>
            <button class="menu-button" onclick="showMainMenu()">📋 Вернуться в меню</button>
        </div>
    `;
}

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.displayRulesUI = displayRulesUI;
}
