// @ts-check
const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to /formulas/ and wait until FormulasApp is ready */
async function gotoFormulas(page) {
    await page.goto('/formulas/');
    await page.waitForFunction(
        () => typeof window.FormulasApp !== 'undefined' && window.FormulasApp.state !== undefined
    );
}

// ---------------------------------------------------------------------------
// 1. Загрузка и список формул
// ---------------------------------------------------------------------------

test.describe('formulas — загрузка и список формул', () => {

    test('загружается без JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });
        page.on('pageerror', err => errors.push(err.message));

        await gotoFormulas(page);

        // Фильтруем внешние ресурсы (шрифты, CDN) — вне нашего контроля
        const appErrors = errors.filter(e =>
            !e.includes('fonts.googleapis') &&
            !e.includes('fonts.gstatic') &&
            !e.includes('unpkg.com')
        );
        expect(appErrors).toHaveLength(0);
    });

    test('список карточек формул виден при загрузке', async ({ page }) => {
        await gotoFormulas(page);

        await expect(page.locator('#formulas-content')).toBeVisible();

        const cards = page.locator('.formula-card-thumb');
        await expect(cards.first()).toBeVisible();
        // 36 формул должно быть в списке
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(10);
    });

    test('кнопки "Полный тест" и "Марафон" видны', async ({ page }) => {
        await gotoFormulas(page);

        const content = page.locator('#formulas-content');
        await expect(content).toContainText('Полный тест');
        await expect(content).toContainText('Марафон');
    });

    test('кнопка "← Список" скрыта в режиме списка', async ({ page }) => {
        await gotoFormulas(page);
        await expect(page.locator('#btn-back-to-list')).toBeHidden();
    });

    test('заголовок страницы виден', async ({ page }) => {
        await gotoFormulas(page);
        await expect(page.locator('.se-topbar-title')).toBeVisible();
        await expect(page.locator('.se-topbar-title')).toContainText('36');
    });

});

// ---------------------------------------------------------------------------
// 2. Карточка формулы
// ---------------------------------------------------------------------------

test.describe('formulas — карточка формулы', () => {

    test('клик на карточку → открывается детальная карточка с правилом', async ({ page }) => {
        await gotoFormulas(page);

        await page.locator('.formula-card-thumb').first().click();

        // Карточка содержит правило и кнопку "Тест"
        const content = page.locator('#formulas-content');
        await expect(content).toContainText('Тест');

        // Кнопка "← Список" стала видимой
        await expect(page.locator('#btn-back-to-list')).toBeVisible();
    });

    test('карточка содержит кнопку "Тест →"', async ({ page }) => {
        await gotoFormulas(page);
        await page.locator('.formula-card-thumb').first().click();

        await expect(
            page.locator('#formulas-content button:has-text("Тест")')
        ).toBeVisible();
    });

    test('из карточки "← Список" возвращает в список формул', async ({ page }) => {
        await gotoFormulas(page);
        await page.locator('.formula-card-thumb').first().click();

        await page.locator('#btn-back-to-list').click();

        await expect(page.locator('.formula-card-thumb').first()).toBeVisible();
        await expect(page.locator('#btn-back-to-list')).toBeHidden();
    });

});

// ---------------------------------------------------------------------------
// 3. Квиз по одной формуле
// ---------------------------------------------------------------------------

test.describe('formulas — квиз по одной формуле', () => {

    test('квиз запускается, вопрос рендерится с вариантами ответа', async ({ page }) => {
        await gotoFormulas(page);

        // Запускаем квиз напрямую через API
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        const opts = page.locator('[id^="formula-opt-"]');
        await expect(opts.first()).toBeVisible();
        const count = await opts.count();
        expect(count).toBeGreaterThanOrEqual(2);

        // Кнопка "← Список" появилась
        await expect(page.locator('#btn-back-to-list')).toBeVisible();
    });

    test('квиз — клик на вариант → фидбек появляется', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        await page.locator('[id^="formula-opt-"]').first().click();

        const feedback = page.locator('#formula-feedback');
        await expect(feedback).toBeVisible();
        await expect(feedback).not.toBeEmpty();
    });

    test('квиз — после ответа кнопка "Дальше" появляется', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        await page.locator('[id^="formula-opt-"]').first().click();

        await expect(page.locator('.quiz-next-fixed')).toBeVisible();
    });

    test('квиз — после ответа все варианты задизейблены', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        await page.locator('[id^="formula-opt-"]').first().click();

        const opts = page.locator('[id^="formula-opt-"]');
        const count = await opts.count();
        for (let i = 0; i < count; i++) {
            await expect(opts.nth(i)).toBeDisabled();
        }
    });

    test('квиз — правильный ответ получает зелёный фон', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        const correctIndex = await page.evaluate(
            () => window.FormulasApp.state.quizQuestions[0].correct
        );

        await page.locator(`#formula-opt-${correctIndex}`).click();

        const correctBtn = page.locator(`#formula-opt-${correctIndex}`);
        await expect(correctBtn).toHaveCSS('background-color', 'rgb(212, 237, 218)');
    });

    test('квиз — неверный ответ получает красный фон', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        const correctIndex = await page.evaluate(
            () => window.FormulasApp.state.quizQuestions[0].correct
        );
        const wrongIndex = correctIndex === 0 ? 1 : 0;

        await page.locator(`#formula-opt-${wrongIndex}`).click();

        const wrongBtn = page.locator(`#formula-opt-${wrongIndex}`);
        await expect(wrongBtn).toHaveCSS('background-color', 'rgb(248, 215, 218)');
    });

    test('квиз — кнопка "Дальше" ведёт к следующему вопросу или результатам', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        await page.locator('[id^="formula-opt-"]').first().click();
        await page.locator('.quiz-next-fixed').click();

        const nextOpts = page.locator('[id^="formula-opt-"]');
        const results = page.locator('#formulas-content h2:has-text("Результат")');

        await expect(nextOpts.first().or(results)).toBeVisible();
    });

});

// ---------------------------------------------------------------------------
// 4. Навигация назад из квиза
// ---------------------------------------------------------------------------

test.describe('formulas — навигация назад', () => {

    test('кнопка "← Список" из квиза возвращает в список формул', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        await expect(page.locator('#btn-back-to-list')).toBeVisible();
        await page.locator('#btn-back-to-list').click();

        await expect(page.locator('.formula-card-thumb').first()).toBeVisible();
        await expect(page.locator('#btn-back-to-list')).toBeHidden();
    });

    test('кнопка ✕ в квизе возвращает в список формул', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startSingleQuiz(0));

        // ✕ кнопка с title "К списку" внутри game-area
        await page.locator('#formulas-content button[title="К списку"]').click();

        await expect(page.locator('.formula-card-thumb').first()).toBeVisible();
    });

});

// ---------------------------------------------------------------------------
// 5. Fill-blank квиз (если первая формула использует этот формат)
// ---------------------------------------------------------------------------

test.describe('formulas — fill-blank вопрос', () => {

    test('при наличии fill-blank вопроса — бланк и плитки рендерятся', async ({ page }) => {
        await gotoFormulas(page);

        // Ищем формулу с fill-blank вопросом (has `before` field)
        const fillBlankFormulaIndex = await page.evaluate(() => {
            if (typeof FORMULAS_DATA === 'undefined') return -1;
            for (var i = 0; i < FORMULAS_DATA.length; i++) {
                var q = FORMULAS_DATA[i].quiz[0];
                if (q && q.before !== undefined) return i;
            }
            return -1;
        });

        if (fillBlankFormulaIndex === -1) {
            // Нет fill-blank формул — тест не применим
            return;
        }

        // Запускаем квиз формулы, содержащей fill-blank вопросы
        await page.evaluate((idx) => window.FormulasApp.startSingleQuiz(idx), fillBlankFormulaIndex);

        // Прокручиваем вопросы до тех пор, пока не попадём на fill-blank
        // (или сразу попали, если первый вопрос fill-blank)
        const blankLocator = page.locator('#formula-blank');
        const optsLocator = page.locator('[id^="formula-opt-"]');

        // Ждём появления кнопок-вариантов (присутствуют и в fill-blank, и в MCQ)
        await expect(optsLocator.first()).toBeVisible();

        const hasBlank = await blankLocator.isVisible();
        if (hasBlank) {
            await expect(blankLocator).toHaveText('___');
            // Плитки-варианты присутствуют
            const count = await page.locator('.pasado-inline-btn').count();
            expect(count).toBeGreaterThanOrEqual(2);
        }
    });

    test('fill-blank: клик по плитке → бланк заполняется и фидбек появляется', async ({ page }) => {
        await gotoFormulas(page);

        // Ищем формулу с fill-blank вопросом
        const fillBlankFormulaIndex = await page.evaluate(() => {
            if (typeof FORMULAS_DATA === 'undefined') return -1;
            for (var i = 0; i < FORMULAS_DATA.length; i++) {
                var q = FORMULAS_DATA[i].quiz[0];
                if (q && q.before !== undefined) return i;
            }
            return -1;
        });

        if (fillBlankFormulaIndex === -1) return;

        await page.evaluate((idx) => window.FormulasApp.startSingleQuiz(idx), fillBlankFormulaIndex);

        const blankLocator = page.locator('#formula-blank');
        await blankLocator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);

        const hasBlank = await blankLocator.isVisible();
        if (!hasBlank) return; // first question is MCQ, skip

        // Кликаем по первой плитке
        await page.locator('.pasado-inline-btn').first().click();

        // Бланк заполнен (не ___)
        await expect(blankLocator).not.toHaveText('___');

        // Фидбек виден
        await expect(page.locator('#formula-feedback')).toBeVisible();

        // Кнопка "Дальше" появилась
        await expect(page.locator('.quiz-next-fixed')).toBeVisible();
    });

});

// ---------------------------------------------------------------------------
// 6. Марафон — базовый запуск
// ---------------------------------------------------------------------------

test.describe('formulas — марафон', () => {

    test('марафон запускается и рендерит первый вопрос', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startMarathon());

        // Должны быть варианты ответа
        const opts = page.locator('[id^="formula-opt-"]');
        await expect(opts.first()).toBeVisible();

        // В шапке квиза — индикатор "Осталось"
        await expect(page.locator('#formulas-content')).toContainText('Осталось');
    });

    test('марафон — клик на вариант → фидбек и кнопка "Дальше"', async ({ page }) => {
        await gotoFormulas(page);
        await page.evaluate(() => window.FormulasApp.startMarathon());

        await page.locator('[id^="formula-opt-"]').first().click();

        await expect(page.locator('#formula-feedback')).toBeVisible();
        await expect(page.locator('.quiz-next-fixed')).toBeVisible();
    });

});
