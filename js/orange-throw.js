/**
 * Orange Throw — анимация броска апельсина в корзинку
 * Слушает 'vamos:correct' из naranjito.js api.correct()
 */
(function () {
    var basket = null;
    var throwing = false;
    var BASKET_W = 70;

    var BASKET_SVG = [
        '<svg width="70" height="66" viewBox="0 0 70 66" fill="none"',
        ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
        /* Ручка */
        '<path d="M23 17 Q35 4 47 17"',
        ' stroke="#F26B1D" stroke-width="4"',
        ' stroke-linecap="round" fill="none"/>',
        /* Заливка тела */
        '<path d="M8 20 Q10 54 35 57 Q60 54 62 20 Z"',
        ' fill="rgba(242,107,29,0.10)"/>',
        /* Ободок */
        '<ellipse cx="35" cy="20" rx="27" ry="8.5"',
        ' stroke="#F26B1D" stroke-width="3.5"',
        ' fill="rgba(242,107,29,0.20)"/>',
        /* Контур тела */
        '<path d="M8 20 Q10 54 35 57 Q60 54 62 20"',
        ' stroke="#F26B1D" stroke-width="3.5" fill="none"',
        ' stroke-linecap="round" stroke-linejoin="round"/>',
        /* Вертикальные прутья (слегка изогнутые) */
        '<path d="M18 22 Q16 38 14.5 55"',
        ' stroke="#F26B1D" stroke-width="2.2" opacity="0.6"',
        ' stroke-linecap="round" fill="none"/>',
        '<line x1="35" y1="21" x2="35" y2="57"',
        ' stroke="#F26B1D" stroke-width="2.2" opacity="0.6"',
        ' stroke-linecap="round"/>',
        '<path d="M52 22 Q54 38 55.5 55"',
        ' stroke="#F26B1D" stroke-width="2.2" opacity="0.6"',
        ' stroke-linecap="round" fill="none"/>',
        /* Горизонтальные дуги плетения */
        '<path d="M9 31 Q35 36 61 31"',
        ' stroke="#F26B1D" stroke-width="2.5" opacity="0.55"',
        ' fill="none" stroke-linecap="round"/>',
        '<path d="M10 43 Q35 48 60 43"',
        ' stroke="#F26B1D" stroke-width="2.5" opacity="0.55"',
        ' fill="none" stroke-linecap="round"/>',
        '<path d="M12 53 Q35 57 58 53"',
        ' stroke="#F26B1D" stroke-width="2" opacity="0.40"',
        ' fill="none" stroke-linecap="round"/>',
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
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        /* position:absolute → координаты документа (скроллятся вместе со страницей) */
        el.style.top  = Math.max(60, rect.top + scrollY + 8) + 'px';
        el.style.left = (rect.right + scrollX - BASKET_W) + 'px';
        el.style.right = 'auto';
    }

    function doThrow() {
        if (throwing) return;
        if (!basket) return;

        var buddy = document.getElementById('buddy');
        if (!buddy || !buddy.classList.contains('nj')) return;

        var buddyRect = buddy.getBoundingClientRect();
        var basketRect = basket.getBoundingClientRect();

        /* Стартуем от правой руки Naranjito */
        var startX = buddyRect.left + buddyRect.width * 0.22;
        var startY = buddyRect.top  + buddyRect.height * 0.38;

        /* Финиш — ободок корзины */
        var endX = basketRect.left + basketRect.width  / 2;
        var endY = basketRect.top  + basketRect.height * 0.40;

        var orange = document.createElement('div');
        orange.className = 'flying-orange';
        orange.textContent = '🍊';
        orange.style.cssText = [
            'position:fixed',
            'left:' + startX + 'px',
            'top:'  + startY + 'px',
            'pointer-events:none',
            'z-index:9999',
            'transform:translate(-50%,-50%)',
            'will-change:transform',
            'font-size:24px',
            'line-height:1'
        ].join(';');

        document.body.appendChild(orange);
        throwing = true;

        var dx = endX - startX;
        var dy = endY - startY;

        /* Дуга: пик на 40% пути, всегда уходит вверх минимум на 60px */
        var peakDx = dx * 0.40;
        var peakDy = Math.min(dy * 0.20 - 70, -60);

        var anim = orange.animate([
            {
                transform: 'translate(-50%,-50%) scale(1) rotate(0deg)',
                offset: 0
            },
            {
                transform: 'translate(calc(-50% + ' + peakDx + 'px),' +
                           'calc(-50% + ' + peakDy + 'px)) scale(1.18) rotate(155deg)',
                offset: 0.40
            },
            {
                transform: 'translate(calc(-50% + ' + dx + 'px),' +
                           'calc(-50% + ' + dy + 'px)) scale(0.42) rotate(310deg)',
                offset: 1
            }
        ], {
            duration: 1900,
            easing: 'linear',
            fill: 'forwards'
        });

        anim.finished.then(function () {
            orange.remove();
            throwing = false;
            window.dispatchEvent(new CustomEvent('vamos:scored'));
            if (basket) {
                basket.classList.add('basket-catch');
                setTimeout(function () {
                    basket.classList.remove('basket-catch');
                }, 500);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            basket = injectBasket();
        }, 80);
        window.addEventListener('vamos:correct', doThrow);
    });
}());
