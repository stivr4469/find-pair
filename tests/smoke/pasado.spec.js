// @ts-check
const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to /pasado/ and wait until PasadoApp is ready */
async function gotoPasado(page) {
    await page.goto('/pasado/');
    await page.waitForFunction(
        () => typeof window.PasadoApp !== 'undefined' && window.PasadoApp.state !== undefined
    );
}

// ---------------------------------------------------------------------------
// 1. Загрузка и список времён
// ---------------------------------------------------------------------------

test.describe('pasado — загрузка и список времён', () => {

    test('загружается без JS-ошибок', async ({ page }) => {
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') errors.push(msg.text());
        });
        page.on('pageerror', err => errors.push(err.message));

        await gotoPasado(page);

        // Фильтруем внешние ресурсы (шрифты, CDN) — вне нашего контроля
        const appErrors = errors.filter(e =>
            !e.includes('fonts.googleapis') &&
            !e.includes('fonts.gstatic') &&
            !e.includes('unpkg.com')
        );
        expect(appErrors).toHaveLength(0);
    });

    test('список формул виден при загрузке', async ({ page }) => {
        await gotoPasado(page);

        // Контейнер с контентом рендерится
        await expect(page.locator('#pasado-content')).toBeVisible();

        // Карточки формул присутствуют
        const cards = page.locator('.pasado-card-thumb');
        await expect(cards.first()).toBeVisible();
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(4);
    });

    test('видны все 4 группы времён', async ({ page }) => {
        await gotoPasado(page);

        const content = page.locator('#pasado-content');
        await expect(content).toContainText('Indefinido');
        await expect(content).toContainText('Imperfecto');
        await expect(content).toContainText('Perfecto');
        await expect(content).toContainText('Pluscuamperfecto');
    });

    test('кнопка "← Список" скрыта в режиме списка', async ({ page }) => {
        await gotoPasado(page);
        await expect(page.locator('#btn-back-to-list')).toBeHidden();
    });

    test('кнопки специальных режимов видны', async ({ page }) => {
        await gotoPasado(page);

        const content = page.locator('#pasado-content');
        await expect(content).toContainText('Полный тест');
        await expect(content).toContainText('Inline режим');
        await expect(content).toContainText('Классификация');
        await expect(content).toContainText('Контраст');
    });

});

// ---------------------------------------------------------------------------
// 2. Карточка формулы и квиз
// ---------------------------------------------------------------------------

test.describe('pasado — квиз по одной формуле', () => {

    test('клик на карточку формулы → открывается карточка с правилом', async ({ page }) => {
        await gotoPasado(page);

        // Кликаем по первой карточке Indefinido
        await page.locator('.pasado-card-thumb').first().click();

        // Вид сменился на карточку формулы
        await expect(page.locator('#pasado-content')).toContainText('Формула');

        // Кнопка "← Список" стала видимой
        await expect(page.locator('#btn-back-to-list')).toBeVisible();
    });

    test('в карточке формулы есть кнопка "Тест →"', async ({ page }) => {
        await gotoPasado(page);
        await page.locator('.pasado-card-thumb').first().click();

        await expect(page.locator('#pasado-content button:has-text("Тест")')).toBeVisible();
    });

    test('клик "Тест →" → квиз запускается, вопрос рендерится', async ({ page }) => {
        await gotoPasado(page);
        await page.locator('.pasado-card-thumb').first().click();
        await page.locator('#pasado-content button:has-text("Тест")').click();

        // В квизе должны быть кнопки-варианты ответа
        const opts = page.locator('[id^="pasado-opt-"]');
        await expect(opts.first()).toBeVisible();
        const count = await opts.count();
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test('квиз — клик на вариант → фидбек появляется', async ({ page }) => {
        await gotoPasado(page);

        // Запускаем квиз напрямую через API (не зависит от рандома в карточке)
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        const opts = page.locator('[id^="pasado-opt-"]');
        await expect(opts.first()).toBeVisible();

        await opts.first().click();

        // Фидбек должен стать видимым
        const feedback = page.locator('#pasado-feedback');
        await expect(feedback).toBeVisible();
        await expect(feedback).not.toBeEmpty();
    });

    test('квиз — после ответа кнопка "Дальше" появляется', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        await page.locator('[id^="pasado-opt-"]').first().click();

        await expect(page.locator('.quiz-next-fixed')).toBeVisible();
    });

    test('квиз — после ответа все варианты задизейблены', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        await page.locator('[id^="pasado-opt-"]').first().click();

        const opts = page.locator('[id^="pasado-opt-"]');
        const count = await opts.count();
        for (let i = 0; i < count; i++) {
            await expect(opts.nth(i)).toBeDisabled();
        }
    });

    test('квиз — правильный ответ получает зелёный фон', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        // Узнаём правильный индекс из state
        const correctIndex = await page.evaluate(
            () => window.PasadoApp.state.quizQuestions[0].correct
        );

        await page.locator(`#pasado-opt-${correctIndex}`).click();

        // Кнопка правильного ответа — зелёный фон
        const correctBtn = page.locator(`#pasado-opt-${correctIndex}`);
        await expect(correctBtn).toHaveCSS('background-color', 'rgb(212, 237, 218)');
    });

    test('квиз — неверный ответ получает красный фон', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        const correctIndex = await page.evaluate(
            () => window.PasadoApp.state.quizQuestions[0].correct
        );
        // Кликаем по первому неправильному варианту
        const wrongIndex = correctIndex === 0 ? 1 : 0;

        await page.locator(`#pasado-opt-${wrongIndex}`).click();

        const wrongBtn = page.locator(`#pasado-opt-${wrongIndex}`);
        await expect(wrongBtn).toHaveCSS('background-color', 'rgb(248, 215, 218)');
    });

    test('квиз — кнопка "Дальше" переходит к следующему вопросу или результатам', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        await page.locator('[id^="pasado-opt-"]').first().click();
        await page.locator('.quiz-next-fixed').click();

        // После перехода либо новый вопрос, либо экран результатов
        const nextQuestion = page.locator('[id^="pasado-opt-"]');
        const results = page.locator('#pasado-content .results-buttons');

        await expect(nextQuestion.first().or(results)).toBeVisible();
    });

});

// ---------------------------------------------------------------------------
// 3. Кнопка "← Список" возвращает в список
// ---------------------------------------------------------------------------

test.describe('pasado — навигация назад', () => {

    test('кнопка "← Список" из квиза возвращает в список формул', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        await expect(page.locator('#btn-back-to-list')).toBeVisible();
        await page.locator('#btn-back-to-list').click();

        // Снова видны карточки формул
        await expect(page.locator('.pasado-card-thumb').first()).toBeVisible();
        await expect(page.locator('#btn-back-to-list')).toBeHidden();
    });

    test('кнопка ✕ в квизе возвращает в список формул', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startSingleQuiz(0));

        // ✕ кнопка внутри game-area
        await page.locator('#pasado-content button[title="К списку"]').click();

        await expect(page.locator('.pasado-card-thumb').first()).toBeVisible();
    });

    test('кнопка "← Список" из карточки формулы возвращает в список', async ({ page }) => {
        await gotoPasado(page);
        await page.locator('.pasado-card-thumb').first().click();

        await page.locator('#btn-back-to-list').click();

        await expect(page.locator('.pasado-card-thumb').first()).toBeVisible();
        await expect(page.locator('#btn-back-to-list')).toBeHidden();
    });

});

// ---------------------------------------------------------------------------
// 4. Inline режим
// ---------------------------------------------------------------------------

test.describe('pasado — inline режим', () => {

    test('запускается и рендерит предложение с бланком', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startInline());

        // Бланк ___ виден
        await expect(page.locator('#pasado-inline-blank')).toBeVisible();
        await expect(page.locator('#pasado-inline-blank')).toHaveText('___');

        // Плитки-варианты присутствуют
        const tiles = page.locator('.pasado-inline-btn');
        await expect(tiles.first()).toBeVisible();
        const count = await tiles.count();
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test('клик по плитке → бланк заполняется, фидбек появляется', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startInline());

        await page.locator('.pasado-inline-btn').first().click();

        // Бланк больше не ___
        await expect(page.locator('#pasado-inline-blank')).not.toHaveText('___');

        // Фидбек виден
        await expect(page.locator('#pasado-inline-feedback')).toBeVisible();

        // Кнопка "Дальше" появилась
        await expect(page.locator('.quiz-next-fixed')).toBeVisible();
    });

    test('правильная плитка получает класс pib-correct', async ({ page }) => {
        await gotoPasado(page);
        await page.evaluate(() => window.PasadoApp.startInline());

        // Узнаём правильный вариант из state
        const correctVal = await page.evaluate(() => {
            const item = window.PasadoApp.state.quizQuestions[0];
            return item.options[item.correct];
        });

        await page.locator(`.pasado-inline-btn[data-val="${correctVal}"]`).click();

        await expect(
            page.locator(`.pasado-inline-btn.pib-correct`)
        ).toHaveCount(1);
    });

});
