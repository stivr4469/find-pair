/**
 * Spanish Verbs - Main Menu Script
 * Главное меню приложения "Испанские глаголы"
 * 
 * Интеграция с Telegram WebApp
 * Автоматическое определение темы
 */

// Глобальный объект Telegram WebApp
let tg = null;

/**
 * Инициализация приложения
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('[MAIN MENU] Приложение загружено');
    
    // Инициализация Telegram WebApp
    initTelegram();
    
    // Настройка навигации
    setupNavigation();
    
    // Анимация появления
    animateEntrance();
});

/**
 * Инициализация Telegram WebApp SDK
 */
function initTelegram() {
    // Проверяем наличие Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        console.log('[TELEGRAM] WebApp SDK найден');
        
        // Готовность к работе
        tg.ready();
        
        // Развернуть на весь экран
        tg.expand();
        
        // Применяем тему Telegram
        applyTelegramTheme();
        
        // Показываем кнопку "Закрыть"
        showCloseButton();
        
        // Настройка цветов хедера
        tg.setHeaderColor(getComputedStyle(document.documentElement)
            .getPropertyValue('--tg-theme-bg-color').trim());
        
        // Логирование информации о Telegram
        logTelegramInfo();
    } else {
        console.log('[TELEGRAM] Запуск вне Telegram WebApp');
    }
}

/**
 * Применение темы Telegram к приложению
 */
function applyTelegramTheme() {
    if (!tg) return;
    
    const root = document.documentElement;
    const theme = tg.themeParams;
    
    // Применяем цвета темы Telegram
    if (theme.bgColor) {
        root.style.setProperty('--tg-theme-bg-color', theme.bgColor);
    }
    if (theme.textColor) {
        root.style.setProperty('--tg-theme-text-color', theme.textColor);
    }
    if (theme.hintColor) {
        root.style.setProperty('--tg-theme-hint-color', theme.hintColor);
    }
    if (theme.linkColor) {
        root.style.setProperty('--tg-theme-link-color', theme.linkColor);
    }
    if (theme.buttonColor) {
        root.style.setProperty('--tg-theme-button-color', theme.buttonColor);
    }
    if (theme.buttonTextColor) {
        root.style.setProperty('--tg-theme-button-text-color', theme.buttonTextColor);
    }
    if (theme.secondaryBgColor) {
        root.style.setProperty('--tg-theme-secondary-bg-color', theme.secondaryBgColor);
    }
    
    console.log('[TELEGRAM] Тема применена');
}

/**
 * Показать кнопку "Закрыть" только в Telegram
 */
function showCloseButton() {
    const closeBtn = document.getElementById('close-btn');
    if (closeBtn && tg) {
        closeBtn.classList.remove('hidden');
    }
}

/**
 * Закрыть приложение (только для Telegram)
 */
function closeApp() {
    if (tg) {
        tg.close();
    } else {
        // Если не в Telegram, пробуем закрыть окно
        window.close();
        // Или показываем сообщение
        alert('Приложение запущено вне Telegram. Закройте вкладку браузера.');
    }
}

/**
 * Логирование информации о Telegram
 */
function logTelegramInfo() {
    console.log('[TELEGRAM] Информация:');
    console.log('  - Platform:', tg.platform);
    console.log('  - Version:', tg.version);
    console.log('  - Color scheme:', tg.colorScheme);
    console.log('  - Theme params:', tg.themeParams);
    
    // Информация о пользователе (если доступна)
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        console.log('[TELEGRAM] Пользователь:', user.first_name, user.last_name || '');
    }
}

/**
 * Настройка навигации по карточкам игр
 */
function setupNavigation() {
    const findPairCard = document.getElementById('find-pair-card');
    const trenCard = document.getElementById('tren-card');
    
    // Обработка кликов с тактильной отдачей в Telegram
    if (findPairCard) {
        findPairCard.addEventListener('click', function(e) {
            handleGameCardClick(e, 'find-pair');
        });
    }
    
    if (trenCard) {
        trenCard.addEventListener('click', function(e) {
            handleGameCardClick(e, 'tren');
        });
    }
}

/**
 * Обработка клика по карточке игры
 * @param {Event} e - событие клика
 * @param {string} gameType - тип игры
 */
function handleGameCardClick(e, gameType) {
    console.log('[NAVIGATION] Выбор игры:', gameType);

    // Тактильная отдача в Telegram
    if (tg) {
        tg.HapticFeedback.impactOccurred('light');
    }

    // РАЗБЛОКИРОВКА ЗВУКА ДЛЯ TELEGRAM
    if ('speechSynthesis' in window) {
        const silent = new SpeechSynthesisUtterance('');
        silent.volume = 0;
        window.speechSynthesis.speak(silent);
    }

    // Переход осуществляется через href ссылки
    // Дополнительная логика может быть добавлена здесь
}

/**
 * Анимация появления элементов
 */
function animateEntrance() {
    const header = document.querySelector('.app-header');
    const cards = document.querySelectorAll('.game-card');
    const footer = document.querySelector('.app-footer');
    
    // Начальные стили для анимации
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transitionDelay = (index * 0.1) + 's';
    });
    
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    
    // Запуск анимации
    requestAnimationFrame(() => {
        header.style.transition = 'all 0.5s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
        
        cards.forEach(card => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        footer.style.transition = 'all 0.5s ease 0.3s';
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
    });
}

/**
 * Утилита для получения параметров URL
 * @returns {Object} Параметры URL
 */
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    params.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}

/**
 * Экспорт функций для глобального доступа
 */
window.closeApp = closeApp;
window.tg = tg;

console.log('[MAIN MENU] Скрипт инициализирован');
