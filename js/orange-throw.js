/**
 * Orange Throw — анимация броска апельсина в корзинку
 * Слушает событие 'vamos:correct', которое naranjito.js диспатчит в api.correct()
 */
(function () {
    var basket = null;
    var throwing = false;

    function injectBasket() {
        var stats = document.querySelector('.se-topbar-stats');
        if (!stats) return null;

        var el = document.createElement('div');
        el.id = 'orange-basket';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML = [
            '<svg width="26" height="26" viewBox="0 0 26 26" fill="none"',
            ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
            '<ellipse cx="13" cy="9" rx="9" ry="2.8"',
            ' stroke="currentColor" stroke-width="1.8"/>',
            '<path d="M4 9 Q4.5 20 13 21.5 Q21.5 20 22 9"',
            ' stroke="currentColor" stroke-width="1.8" fill="none"/>',
            '<line x1="8.5" y1="9.5" x2="7.5" y2="21"',
            ' stroke="currentColor" stroke-width="1" opacity="0.55"/>',
            '<line x1="13" y1="9.5" x2="13" y2="21.5"',
            ' stroke="currentColor" stroke-width="1" opacity="0.55"/>',
            '<line x1="17.5" y1="9.5" x2="18.5" y2="21"',
            ' stroke="currentColor" stroke-width="1" opacity="0.55"/>',
            '<path d="M4.5 13 Q13 14.5 21.5 13"',
            ' stroke="currentColor" stroke-width="1" opacity="0.4" fill="none"/>',
            '<path d="M5.5 17 Q13 18.5 20.5 17"',
            ' stroke="currentColor" stroke-width="1" opacity="0.4" fill="none"/>',
            '</svg>'
        ].join('');

        stats.appendChild(el);
        return el;
    }

    function doThrow() {
        if (throwing) return;
        if (!basket) return;

        var buddy = document.getElementById('buddy');
        if (!buddy || !buddy.classList.contains('nj')) return;

        var buddyRect = buddy.getBoundingClientRect();
        var basketRect = basket.getBoundingClientRect();

        var startX = buddyRect.left + buddyRect.width * 0.58;
        var startY = buddyRect.top + buddyRect.height * 0.32;

        var endX = basketRect.left + basketRect.width / 2;
        var endY = basketRect.top + basketRect.height * 0.6;

        var orange = document.createElement('div');
        orange.className = 'flying-orange';
        orange.textContent = '🍊';
        orange.style.cssText = [
            'position:fixed',
            'left:' + startX + 'px',
            'top:' + startY + 'px',
            'pointer-events:none',
            'z-index:9999',
            'transform:translate(-50%,-50%)',
            'will-change:transform',
            'font-size:20px',
            'line-height:1'
        ].join(';');

        document.body.appendChild(orange);
        throwing = true;

        var dx = endX - startX;
        var dy = endY - startY;

        var peakDx = dx * 0.42;
        var peakDy = dy * 0.25 - 88;

        var anim = orange.animate([
            {
                transform: 'translate(-50%,-50%) scale(1)',
                offset: 0
            },
            {
                transform: 'translate(calc(-50% + ' + peakDx + 'px),' +
                           ' calc(-50% + ' + peakDy + 'px)) scale(1.12)',
                offset: 0.42
            },
            {
                transform: 'translate(calc(-50% + ' + dx + 'px),' +
                           ' calc(-50% + ' + dy + 'px)) scale(0.4)',
                offset: 1
            }
        ], {
            duration: 620,
            easing: 'linear',
            fill: 'forwards'
        });

        anim.finished.then(function () {
            orange.remove();
            throwing = false;
            if (basket) {
                basket.classList.add('basket-catch');
                setTimeout(function () {
                    basket.classList.remove('basket-catch');
                }, 500);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        basket = injectBasket();
        window.addEventListener('vamos:correct', doThrow);
    });
}());
