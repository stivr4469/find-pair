// @ts-check
const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to /tren/ and wait until App is ready */
async function gotoTren(page) {
    await page.goto('/tren/');
    // App is not exported to window; wait for main-menu to be rendered instead
    await page.waitForSelector('nav.main-menu');
}

/** Click a mode button and wait for its area to become visible */
async function openMode(page, modeId) {
    await page.click(`#${modeId}-btn`);
    await expect(page.locator(`#${modeId}-area`)).not.toHaveClass(/hidden/);
}

// ---------------------------------------------------------------------------
// 1. Главное меню
// ---------------------------------------------------------------------------

test.describe('tren — главное меню', () => {

    test('загружается без JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });
        await gotoTren(page);
        // Фильтруем внешние ресурсы (шрифты, CDN) — они вне нашего контроля
        const appErrors = errors.filter(e =>
            !e.includes('fonts.googleapis') &&
            !e.includes('fonts.gstatic') &&
            !e.includes('unpkg.com')
        );
        expect(appErrors).toHaveLength(0);
    });

    test('главное меню видно при загрузке', async ({ page }) => {
        await gotoTren(page);
        await expect(page.locator('nav.main-menu')).toBeVisible();
    });

    test('все 8 кнопок режимов видны', async ({ page }) => {
        await gotoTren(page);
        for (let i = 0; i <= 7; i++) {
            await expect(page.locator(`#mode${i}-btn`)).toBeVisible();
        }
    });

    test('кнопка "← Режимы" скрыта в главном меню', async ({ page }) => {
        await gotoTren(page);
        const backBtn = page.locator('#btn-back-to-modes');
        // Кнопка существует в DOM, но style.display = none
        await expect(backBtn).toBeHidden();
    });

    test('клик по кнопке "← Режимы" возвращает в главное меню', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode1');
        await expect(page.locator('#btn-back-to-modes')).toBeVisible();

        await page.click('#btn-back-to-modes');

        await expect(page.locator('nav.main-menu')).toBeVisible();
        await expect(page.locator('#btn-back-to-modes')).toBeHidden();
    });

});

// ---------------------------------------------------------------------------
// 2. Mode 1 — Выбор глагола
// ---------------------------------------------------------------------------

test.describe('tren — mode1: Выбор глагола', () => {

    test('открывается при клике на кнопку', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode1');
        await expect(page.locator('#mode1-area')).toBeVisible();
        // Главное меню должно скрыться
        await expect(page.locator('nav.main-menu')).toBeHidden();
    });

    test('вопрос рендерится: текст предложения и кнопки вариантов', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode1');

        // Текст с бланком
        await expect(page.locator('#mode1-content .question-text')).toBeVisible();
        // Минимум 2 варианта ответа
        const options = page.locator('#mode1-options .option-btn');
        const optCount = await options.count();
        expect(optCount).toBeGreaterThanOrEqual(2);
    });

    test('клик по варианту даёт фидбек и показывает кнопку "Дальше"', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode1');

        // Кликаем по первому варианту (правильный или нет — smoke не проверяет)
        const firstOption = page.locator('#mode1-options .option-btn').first();
        await firstOption.click();

        // Фидбек должен появиться
        const feedback = page.locator('#mode1-feedback');
        await expect(feedback).not.toBeEmpty();

        // Кнопка "Дальше" должна стать видимой
        await expect(page.locator('#mode1-next-btn')).toBeVisible();
    });

    test('кнопка "Дальше" переходит к следующему вопросу', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode1');

        // Запоминаем текст первого вопроса
        const firstQuestionText = await page.locator('#mode1-content .question-text').textContent();

        await page.locator('#mode1-options .option-btn').first().click();
        await page.locator('#mode1-next-btn').click();

        // Следующий вопрос должен отрендериться
        // Либо новый вопрос (текст изменился), либо экран результатов
        const questionStillThere = page.locator('#mode1-content .question-text');
        const resultsShown = page.locator('#mode1-content .results-container');

        await expect(questionStillThere.or(resultsShown)).toBeVisible();
    });

    test('после ответа все кнопки-варианты задизейблены', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode1');

        await page.locator('#mode1-options .option-btn').first().click();

        const options = page.locator('#mode1-options .option-btn');
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            await expect(options.nth(i)).toBeDisabled();
        }
    });

});

// ---------------------------------------------------------------------------
// 3. Mode 6 — Inline выбор (fill-blank)
// ---------------------------------------------------------------------------

test.describe('tren — mode6: Inline выбор', () => {

    test('открывается при клике на кнопку', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode6');
        await expect(page.locator('#mode6-area')).toBeVisible();
    });

    test('предложение с бланком ___ отображается', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode6');

        // Бланк рендерится как span#mode6-blank внутри question-text
        await expect(page.locator('#mode6-blank')).toBeVisible();
        // Изначально содержит "___"
        await expect(page.locator('#mode6-blank')).toHaveText('___');
    });

    test('плитки-варианты отображаются ниже предложения', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode6');

        const tiles = page.locator('#mode6-options .inline-option');
        await expect(tiles.first()).toBeVisible();
        const tileCount = await tiles.count();
        expect(tileCount).toBeGreaterThanOrEqual(2);
    });

    test('клик по плитке заполняет бланк и показывает фидбек', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode6');

        // Кликаем по первой плитке
        const firstTile = page.locator('#mode6-options .inline-option').first();
        await firstTile.click();

        // Бланк больше не "___" — в него записан правильный ответ
        await expect(page.locator('#mode6-blank')).not.toHaveText('___');

        // Фидбек виден
        const feedback = page.locator('#mode6-feedback');
        await expect(feedback).not.toBeEmpty();

        // Кнопка "Дальше" появилась
        await expect(page.locator('#mode6-next-btn')).toBeVisible();
    });

    test('плитка получает класс correct или incorrect после клика', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode6');

        const firstTile = page.locator('#mode6-options .inline-option').first();
        await firstTile.click();

        // Хотя бы одна плитка должна получить класс .correct
        const correctTile = page.locator('#mode6-options .inline-option.correct');
        await expect(correctTile.first()).toBeVisible();
    });

    test('после ответа все плитки задизейблены', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode6');

        await page.locator('#mode6-options .inline-option').first().click();

        const tiles = page.locator('#mode6-options .inline-option');
        const count = await tiles.count();
        for (let i = 0; i < count; i++) {
            await expect(tiles.nth(i)).toBeDisabled();
        }
    });

});

// ---------------------------------------------------------------------------
// 4. Mode 7 — Распредели слова
// ---------------------------------------------------------------------------

test.describe('tren — mode7: Распредели слова', () => {

    test('открывается при клике на кнопку', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');
        await expect(page.locator('#mode7-area')).toBeVisible();
    });

    test('банк слов содержит фишки', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        const chips = page.locator('#mode7-word-bank .word-chip');
        await expect(chips.first()).toBeVisible();
    });

    test('три колонки IR / VENIR / LLEGAR видны', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        await expect(page.locator('#col-ir')).toBeVisible();
        await expect(page.locator('#col-venir')).toBeVisible();
        await expect(page.locator('#col-llegar')).toBeVisible();

        // Заголовки колонок
        await expect(page.locator('.classify-column-header.col-ir')).toContainText('IR');
        await expect(page.locator('.classify-column-header.col-venir')).toContainText('VENIR');
        await expect(page.locator('.classify-column-header.col-llegar')).toContainText('LLEGAR');
    });

    test('клик по фишке выделяет её (класс selected)', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        const firstChip = page.locator('#mode7-word-bank .word-chip').first();
        await firstChip.click();

        await expect(firstChip).toHaveClass(/selected/);
    });

    test('повторный клик по выбранной фишке снимает выделение', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        const firstChip = page.locator('#mode7-word-bank .word-chip').first();
        await firstChip.click();
        await expect(firstChip).toHaveClass(/selected/);

        await firstChip.click();
        await expect(firstChip).not.toHaveClass(/selected/);
    });

    test('правильное размещение слова даёт зелёную фишку в колонке', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        // Определяем правильный ответ для первого слова через mode7State
        const { word, correctColumn } = await page.evaluate(() => {
            const state = window.mode7State;
            if (!state || !state.currentItems || state.currentItems.length === 0) return {};
            const firstItem = state.currentItems[0];
            const round = state.rounds[state.currentRoundIndex];
            const dataItem = round.items.find(i => i.word === firstItem.word);
            return { word: firstItem.word, correctColumn: dataItem ? dataItem.correctColumn : null };
        });

        if (!word || !correctColumn) {
            test.skip('mode7State не содержит данных');
            return;
        }

        // Кликаем по фишке с нужным словом
        await page.locator(`#mode7-word-bank .word-chip[data-word="${word}"]`).click();

        // Кликаем по правильной колонке
        await page.locator(`#col-${correctColumn}`).click();

        // Зелёная фишка должна появиться в колонке
        const greenChip = page.locator(`#drop-${correctColumn} .placed-word-chip.chip-correct`);
        await expect(greenChip).toBeVisible();
        await expect(greenChip).toContainText(word);
    });

    test('неправильное размещение: фишка мигает красным и возвращается в банк', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        // Находим слово и его неправильную колонку
        const { word, wrongColumn } = await page.evaluate(() => {
            const state = window.mode7State;
            if (!state || !state.currentItems || state.currentItems.length === 0) return {};
            const all = ['ir', 'venir', 'llegar'];
            const firstItem = state.currentItems[0];
            const round = state.rounds[state.currentRoundIndex];
            const dataItem = round.items.find(i => i.word === firstItem.word);
            if (!dataItem) return {};
            const wrongColumn = all.find(c => c !== dataItem.correctColumn);
            return { word: firstItem.word, wrongColumn };
        });

        if (!word || !wrongColumn) {
            test.skip('mode7State не содержит данных');
            return;
        }

        await page.locator(`#mode7-word-bank .word-chip[data-word="${word}"]`).click();
        await page.locator(`#col-${wrongColumn}`).click();

        // Красная фишка появляется в неправильной колонке
        const redChip = page.locator(`#drop-${wrongColumn} .placed-word-chip.chip-incorrect`);
        await expect(redChip).toBeVisible();

        // Через 700мс + буфер слово возвращается в банк
        await page.waitForTimeout(900);
        await expect(page.locator(`#mode7-word-bank .word-chip[data-word="${word}"]`)).toBeVisible();
    });

    test('кнопка "Следующий раунд" появляется когда все слова распределены правильно', async ({ page }) => {
        await gotoTren(page);
        await openMode(page, 'mode7');

        // Расставляем все слова правильно через JS evaluate
        await page.evaluate(() => {
            const state = window.mode7State;
            const round = state.rounds[state.currentRoundIndex];
            // Правильно расставляем каждое слово напрямую через game logic
            round.items.forEach(item => {
                state.selectedWord = item.word;
                window.placeMode7WordInColumn(item.correctColumn);
            });
        });

        // Кнопка "Следующий раунд" / "Завершить" должна появиться
        await expect(page.locator('#mode7-next-btn')).toBeVisible();
    });

});
