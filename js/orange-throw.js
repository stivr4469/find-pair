/**
 * Orange Throw — анимация броска апельсина в корзинку
 * Слушает 'vamos:correct' из naranjito.js api.correct()
 */
(function () {
    var basket = null;
    var throwing = false;

    var BASKET_SVG = [
        '<svg width="54" height="54" viewBox="0 0 54 54" fill="none"',
        ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
        /* Ручка */
        '<path d="M18 15 Q27 3 36 15"',
        ' stroke="#F26B1D" stroke-width="3.5"',
        ' stroke-linecap="round" fill="none"/>',
        /* Ободок */
        '<ellipse cx="27" cy="17" rx="21" ry="6.5"',
        ' stroke="#F26B1D" stroke-width="3"',
        ' fill="rgba(242,107,29,0.15)"/>',
        /* Тело корзины */
        '<path d="M6 17 Q7 42 27 44 Q47 42 48 17"',
        ' stroke="#F26B1D" stroke-width="3"',
        ' fill="rgba(242,107,29,0.10)"',
        ' stroke-linecap="round" stroke-linejoin="round"/>',
        /* Вертикальные прутья */
        '<line x1="15" y1="18" x2="12" y2="43"',
        ' stroke="#F26B1D" stroke-width="2" opacity="0.6" stroke-linecap="round"/>',
        '<line x1="27" y1="17.5" x2="27" y2="44"',
        ' stroke="#F26B1D" stroke-width="2" opacity="0.6" stroke-linecap="round"/>',
        '<line x1="39" y1="18" x2="42" y2="43"',
        ' stroke="#F26B1D" stroke-width="2" opacity="0.6" stroke-linecap="round"/>',
        /* Горизонтальные дуги плетения */
        '<path d="M7 26 Q27 29 47 26"',
        ' stroke="#F26B1D" stroke-width="2" opacity="0.5" fill="none" stroke-linecap="round"/>',
        '<path d="M8 35 Q27 38 46 35"',
        ' stroke="#F26B1D" stroke-width="2" opacity="0.5" fill="none" stroke-linecap="round"/>',
        '</svg>'
    ].join('');

    function injectBasket() {
        var el = document.createElement('div');
        el.id = 'orange-basket';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML = BASKET_SVG;
        document.body.appendChild(el);
        repositionBasket(el);
        window.addEventListener('resize', function () { repositionBasket(el); });
        return el;
    }

    function repositionBasket(el) {
        var buddy = document.getElementById('buddy');
        if (!buddy) return;
        var rect = buddy.getBoundingClientRect();
        /* Правее buddy, на уровне его верхней трети */
        var top = Math.max(70, rect.top + rect.height * 0.12);
        el.style.top = top + 'px';
    }

    function doThrow() {
        if (throwing) return;
        if (!basket) return;

        var buddy = document.getElementById('buddy');
        if (!buddy || !buddy.classList.contains('nj')) return;

        var buddyRect = buddy.getBoundingClientRect();
        var basketRect = basket.getBoundingClientRect();

        /* Стартуем от правой руки персонажа */
        var startX = buddyRect.left + buddyRect.width * 0.62;
        var startY = buddyRect.top + buddyRect.height * 0.30;

        /* Финиш — центр ободка корзины */
        var endX = basketRect.left + basketRect.width / 2;
        var endY = basketRect.top + basketRect.height * 0.42;

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
            'font-size:22px',
            'line-height:1'
        ].join(';');

        document.body.appendChild(orange);
        throwing = true;

        var dx = endX - startX;
        var dy = endY - startY;

        /* Пик дуги — выше и чуть раньше середины, апельсин всегда летит вверх */
        var peakDx = dx * 0.40;
        var peakDy = Math.min(dy * 0.25 - 75, -40);

        var anim = orange.animate([
            {
                transform: 'translate(-50%,-50%) scale(1) rotate(0deg)',
                offset: 0
            },
            {
                transform: 'translate(calc(-50% + ' + peakDx + 'px),' +
                           'calc(-50% + ' + peakDy + 'px)) scale(1.15) rotate(150deg)',
                offset: 0.40
            },
            {
                transform: 'translate(calc(-50% + ' + dx + 'px),' +
                           'calc(-50% + ' + dy + 'px)) scale(0.45) rotate(300deg)',
                offset: 1
            }
        ], {
            duration: 950,
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
        /* Небольшая задержка: Naranjito монтируется в своём DOMContentLoaded */
        setTimeout(function () {
            basket = injectBasket();
        }, 80);
        window.addEventListener('vamos:correct', doThrow);
    });
}());
