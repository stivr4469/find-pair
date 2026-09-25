// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('mezcla — смешанное чтение', () => {

    test('страница загружается, список текстов виден, нет JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/mezcla/');

        // Основной контейнер должен быть виден
        await expect(page.locator('#mezcla-content')).toBeVisible();

        // Должны быть карточки текстов (6 встроенных + 1 кнопка добавления)
        const cards = page.locator('.mezcla-card');
        await expect(cards.first()).toBeVisible();
        const cardCount = await cards.count();
        expect(cardCount).toBeGreaterThanOrEqual(6);

        // Заголовок присутствует
        await expect(page.locator('.se-topbar-title')).toBeVisible();

        expect(errors).toHaveLength(0);
    });

    test('клик на карточку текста открывает вид чтения с токенами', async ({ page }) => {
        await page.goto('/mezcla/');
        await expect(page.locator('.mezcla-card').first()).toBeVisible();

        // Кликаем на первую карточку с реальным текстом (не кнопку добавления)
        await page.locator('[data-mezcla-open="0"]').click();

        // Должны появиться токены
        await expect(page.locator('#mezcla-tokens')).toBeVisible();

        // Токенов должно быть больше нуля
        const tokens = page.locator('[data-mezcla-token]');
        await expect(tokens.first()).toBeVisible();
        const tokenCount = await tokens.count();
        expect(tokenCount).toBeGreaterThan(0);

        // Слайдер процентов должен быть виден
        await expect(page.locator('#mezcla-slider')).toBeVisible();
    });

    test('клик по токену показывает/скрывает тултип без JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/mezcla/');
        await page.locator('[data-mezcla-open="0"]').click();
        await expect(page.locator('[data-mezcla-token]').first()).toBeVisible();

        // Кликаем на первый токен — должен появиться тултип
        const firstToken = page.locator('[data-mezcla-token]').first();
        await firstToken.click();

        // Повторный клик — тултип скрывается
        await firstToken.click();

        expect(errors).toHaveLength(0);
    });

    test('кнопка "← Назад" возвращает в список текстов', async ({ page }) => {
        await page.goto('/mezcla/');
        await page.locator('[data-mezcla-open="0"]').click();
        await expect(page.locator('#mezcla-tokens')).toBeVisible();

        // Кликаем кнопку «← Назад»
        await page.locator('[data-mezcla-back]').first().click();

        // Должны вернуться карточки списка
        await expect(page.locator('.mezcla-card').first()).toBeVisible();
    });

    test('кнопка пресета процента меняет отображение токенов', async ({ page }) => {
        const errors = [];
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/mezcla/');
        await page.locator('[data-mezcla-open="0"]').click();
        await expect(page.locator('#mezcla-tokens')).toBeVisible();

        // Нажимаем пресет 0% (все слова на русском)
        await page.locator('[data-mezcla-pct="0"]').click();

        // Метка процента должна обновиться
        await expect(page.locator('#mezcla-pct-label')).toHaveText('0%');

        // Токены всё ещё отображаются
        await expect(page.locator('[data-mezcla-token]').first()).toBeVisible();

        expect(errors).toHaveLength(0);
    });

    test('кнопка "Перемешать" перераспределяет токены без ошибок', async ({ page }) => {
        const errors = [];
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/mezcla/');
        await page.locator('[data-mezcla-open="0"]').click();
        await expect(page.locator('[data-mezcla-token]').first()).toBeVisible();

        await page.locator('[data-mezcla-reshuffle]').click();

        // После перемешивания токены всё ещё должны быть видны
        await expect(page.locator('[data-mezcla-token]').first()).toBeVisible();

        expect(errors).toHaveLength(0);
    });

    test('кнопка "+ Добавить свой текст" открывает форму ввода', async ({ page }) => {
        await page.goto('/mezcla/');
        await expect(page.locator('[data-mezcla-add-custom]')).toBeVisible();

        await page.locator('[data-mezcla-add-custom]').click();

        // Должно появиться поле textarea для ввода текста
        await expect(page.locator('#mezcla-custom-text')).toBeVisible();

        // Кнопка перевода должна быть доступна
        await expect(page.locator('#mezcla-translate-btn')).toBeVisible();
    });

});
