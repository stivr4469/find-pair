/**
 * Spanish Verbs - Main Menu Script
 * Главное меню приложения VamoS
 */

document.addEventListener('DOMContentLoaded', function() {
    animateEntrance();
});

function closeApp() {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg) {
        tg.close();
    } else {
        history.back();
    }
}

function animateEntrance() {
    /* Cards are handled by the deck→spread animation in index.html.
       Header entrance uses CSS @keyframes headerReveal. */
    var footer = document.querySelector('.app-footer');
    if (footer) {
        footer.style.opacity = '0';
        requestAnimationFrame(function () {
            footer.style.transition = 'opacity 0.5s ease 1.8s';
            footer.style.opacity = '1';
        });
    }
}

window.closeApp = closeApp;
