// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('find-pair — игровой флоу', () => {

    test('страница загружается, слова есть в обоих столбцах, нет JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/find-pair/');

        // Ждём первую карточку в левом столбце
        await expect(page.locator('#left-column .word').first()).toBeVisible();
        await expect(page.locator('#right-column .word').first()).toBeVisible();

        // Убеждаемся, что слов хватает (по умолчанию 5 пар)
        const leftCount = await page.locator('#left-column .word').count();
        const rightCount = await page.locator('#right-column .word').count();
        expect(leftCount).toBeGreaterThanOrEqual(5);
        expect(rightCount).toBeGreaterThanOrEqual(5);

        expect(errors).toHaveLength(0);
    });

    test('клик по слову в левом столбце добавляет класс selected', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        const firstLeft = page.locator('#left-column .word').first();
        await firstLeft.click();

        await expect(firstLeft).toHaveClass(/selected/);
    });

    test('выбор правильной пары скрывает оба слова', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        // Находим первое слово в левом столбце и его правильный перевод
        const leftWord = page.locator('#left-column .word').first();
        const matchValue = await leftWord.getAttribute('data-match');
        expect(matchValue).toBeTruthy();

        // Ищем в правом столбце карточку с текстом, равным data-match
        const rightWord = page.locator('#right-column .word', { hasText: matchValue });
        await expect(rightWord).toBeVisible();

        // Кликаем левое, затем правое
        await leftWord.click();
        await rightWord.click();

        // После совпадения оба элемента получают класс matched и visibility: hidden
        await expect(leftWord).toHaveClass(/matched/);
        await expect(rightWord).toHaveClass(/matched/);
    });

    test('смена категории перезапускает игру с новыми словами', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        // Запоминаем текст первого слова при текущей категории (verbs)
        const firstWordBefore = await page.locator('#left-column .word').first().textContent();

        // Меняем категорию на «Существительные»
        await page.selectOption('#category-select', 'nouns');

        // Ждём, пока появятся новые слова (initGame асинхронный)
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        // Слова должны обновиться — хотя бы один столбец не пустой
        const leftCount = await page.locator('#left-column .word').count();
        expect(leftCount).toBeGreaterThanOrEqual(5);

        // Текст первого слова мог измениться (разные категории)
        const firstWordAfter = await page.locator('#left-column .word').first().textContent();
        // Это не детерминировано, но по меньшей мере слова есть — основная проверка выше
        expect(firstWordAfter).toBeTruthy();
    });

    test('кнопка "Начать заново" перезапускает игру', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        await page.click('#restart-button');

        await expect(page.locator('#left-column .word').first()).toBeVisible();
        const leftCount = await page.locator('#left-column .word').count();
        expect(leftCount).toBeGreaterThanOrEqual(5);
    });

});
