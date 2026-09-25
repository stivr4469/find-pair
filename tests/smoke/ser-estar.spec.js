// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('ser-estar — навигация и игровой флоу', () => {

    test('страница загружается, кнопки режимов видны, нет JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/ser-estar/');

        // Главное меню с 5 кнопками режимов
        await expect(page.locator('.main-menu')).toBeVisible();
        const modeBtns = page.locator('.mode-button');
        await expect(modeBtns).toHaveCount(5);

        // Проверяем, что все кнопки видимы
        for (let i = 0; i < 5; i++) {
            await expect(modeBtns.nth(i)).toBeVisible();
        }

        // Заголовок присутствует
        await expect(page.locator('.se-topbar-title')).toBeVisible();

        expect(errors).toHaveLength(0);
    });

    test('клик на "Базовое спряжение" → открывается выбор глагола', async ({ page }) => {
        await page.goto('/ser-estar/');
        await expect(page.locator('.main-menu')).toBeVisible();

        await page.click('[data-mode="base"]');

        // Меню должно скрыться
        await expect(page.locator('.main-menu')).toHaveClass(/hidden/);

        // Область режима должна стать видимой
        await expect(page.locator('#ser-estar-base-area')).not.toHaveClass(/hidden/);

        // Кнопки выбора глагола должны появиться
        await expect(page.locator('.verb-btn').first()).toBeVisible();

        // Кнопка "← Режимы" становится видимой
        await expect(page.locator('#btn-back-to-modes')).toBeVisible();
    });

    test('выбор глагола "ser" → рендерится вопрос с вариантами ответа', async ({ page }) => {
        await page.goto('/ser-estar/');
        await expect(page.locator('.main-menu')).toBeVisible();

        await page.click('[data-mode="base"]');
        await expect(page.locator('.verb-btn').first()).toBeVisible();

        // Нажимаем «ser»
        await page.click('.verb-btn:has-text("ser")');

        // Должен появиться вопрос
        await expect(page.locator('.question-text')).toBeVisible();

        // Должны появиться кнопки ответов
        const optionBtns = page.locator('.option-btn');
        await expect(optionBtns.first()).toBeVisible();
        const count = await optionBtns.count();
        expect(count).toBeGreaterThanOrEqual(4);
    });

    test('клик на вариант ответа → показывается фидбек', async ({ page }) => {
        await page.goto('/ser-estar/');
        await page.click('[data-mode="base"]');
        await expect(page.locator('.verb-btn').first()).toBeVisible();
        await page.click('.verb-btn:has-text("ser")');
        await expect(page.locator('.option-btn').first()).toBeVisible();

        // Кликаем первый вариант ответа
        await page.locator('.option-btn').first().click();

        // Должен появиться фидбек (корректный или неправильный)
        const feedback = page.locator('#ser-estar-base-area .feedback');
        await expect(feedback).toBeVisible();
        const feedbackText = await feedback.textContent();
        expect(feedbackText).toBeTruthy();

        // Кнопка «Дальше» должна появиться
        await expect(page.locator('#ser-estar-base-area .quiz-next-fixed')).toBeVisible();
    });

    test('кнопка "← Режимы" возвращает в главное меню', async ({ page }) => {
        await page.goto('/ser-estar/');
        await page.click('[data-mode="base"]');
        await expect(page.locator('#btn-back-to-modes')).toBeVisible();

        await page.click('#btn-back-to-modes');

        // Главное меню должно вернуться
        await expect(page.locator('.main-menu')).not.toHaveClass(/hidden/);
        await expect(page.locator('.mode-button').first()).toBeVisible();
    });

    test('режим "Продвинутое спряжение" открывается без ошибок', async ({ page }) => {
        const errors = [];
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/ser-estar/');
        await page.click('[data-mode="advanced"]');

        await expect(page.locator('#ser-estar-advanced-area')).not.toHaveClass(/hidden/);
        // initAdvancedMode рендерит экран настроек с кнопкой "Начать тренировку"
        await expect(page.locator('#ser-estar-advanced-area .start-button')).toBeVisible();

        expect(errors).toHaveLength(0);
    });

    test('режим "Классификация" открывается без ошибок', async ({ page }) => {
        const errors = [];
        page.on('pageerror', err => errors.push(err.message));

        await page.goto('/ser-estar/');
        await page.click('[data-mode="classify"]');

        await expect(page.locator('#ser-estar-classify-area')).not.toHaveClass(/hidden/);
        // Контент должен был срендериться
        await expect(page.locator('#ser-estar-classify-area')).not.toBeEmpty();

        expect(errors).toHaveLength(0);
    });

});
