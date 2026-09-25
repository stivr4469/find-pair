// @ts-check
// Smoke tests for unified motion system (TASK-motion-ui.md Stage 6)
const { test, expect } = require('@playwright/test');

test.describe('motion — CSS-токены и анимации', () => {

    test('CSS-токены --dur-fast, --dur-normal, --dur-slow заданы', async ({ page }) => {
        await page.goto('/formulas/');
        const tokens = await page.evaluate(() => {
            var s = getComputedStyle(document.documentElement);
            return {
                fast:   s.getPropertyValue('--dur-fast').trim(),
                normal: s.getPropertyValue('--dur-normal').trim(),
                slow:   s.getPropertyValue('--dur-slow').trim(),
            };
        });
        expect(tokens.fast).toBeTruthy();
        expect(tokens.normal).toBeTruthy();
        expect(tokens.slow).toBeTruthy();
    });

    test('CSS-токены --ease-out, --ease-in-out, --spring заданы', async ({ page }) => {
        await page.goto('/formulas/');
        const tokens = await page.evaluate(() => {
            var s = getComputedStyle(document.documentElement);
            return {
                easeOut:   s.getPropertyValue('--ease-out').trim(),
                easeInOut: s.getPropertyValue('--ease-in-out').trim(),
                spring:    s.getPropertyValue('--spring').trim(),
            };
        });
        expect(tokens.easeOut).toBeTruthy();
        expect(tokens.easeInOut).toBeTruthy();
        expect(tokens.spring).toBeTruthy();
    });

    test('keyframe vm-enter существует в документе', async ({ page }) => {
        await page.goto('/formulas/');
        const hasKeyframe = await page.evaluate(() => {
            for (var i = 0; i < document.styleSheets.length; i++) {
                try {
                    var rules = document.styleSheets[i].cssRules;
                    for (var j = 0; j < rules.length; j++) {
                        if (rules[j].name === 'vm-enter') return true;
                    }
                } catch(e) {}
            }
            return false;
        });
        expect(hasKeyframe).toBe(true);
    });

    test('keyframe vm-pop существует в документе', async ({ page }) => {
        await page.goto('/formulas/');
        const hasKeyframe = await page.evaluate(() => {
            for (var i = 0; i < document.styleSheets.length; i++) {
                try {
                    var rules = document.styleSheets[i].cssRules;
                    for (var j = 0; j < rules.length; j++) {
                        if (rules[j].name === 'vm-pop') return true;
                    }
                } catch(e) {}
            }
            return false;
        });
        expect(hasKeyframe).toBe(true);
    });

    test('keyframe vm-shake существует в документе', async ({ page }) => {
        await page.goto('/formulas/');
        const hasKeyframe = await page.evaluate(() => {
            for (var i = 0; i < document.styleSheets.length; i++) {
                try {
                    var rules = document.styleSheets[i].cssRules;
                    for (var j = 0; j < rules.length; j++) {
                        if (rules[j].name === 'vm-shake') return true;
                    }
                } catch(e) {}
            }
            return false;
        });
        expect(hasKeyframe).toBe(true);
    });

    test('глобальная функция replayAnimation доступна', async ({ page }) => {
        await page.goto('/formulas/');
        const exists = await page.evaluate(() => typeof window.replayAnimation === 'function');
        expect(exists).toBe(true);
    });

    test('глобальная функция animateCount доступна', async ({ page }) => {
        await page.goto('/formulas/');
        const exists = await page.evaluate(() => typeof window.animateCount === 'function');
        expect(exists).toBe(true);
    });

    test('глобальная функция prefersReducedMotion доступна', async ({ page }) => {
        await page.goto('/formulas/');
        const exists = await page.evaluate(() => typeof window.prefersReducedMotion === 'function');
        expect(exists).toBe(true);
    });

    test('find-pair: stagger-класс добавляется к колонкам при старте игры', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();
        const leftHasStagger  = await page.locator('#left-column').evaluate(el => el.classList.contains('stagger'));
        const rightHasStagger = await page.locator('#right-column').evaluate(el => el.classList.contains('stagger'));
        expect(leftHasStagger).toBe(true);
        expect(rightHasStagger).toBe(true);
    });

    test('find-pair: совпавшие слова получают класс matched', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        // Найти совпадающую пару
        const leftWords  = page.locator('#left-column .word');
        const rightWords = page.locator('#right-column .word');
        const leftCount  = await leftWords.count();

        var matched = false;
        for (var i = 0; i < leftCount && !matched; i++) {
            var leftText  = await leftWords.nth(i).getAttribute('data-match');
            var rightCount = await rightWords.count();
            for (var j = 0; j < rightCount; j++) {
                var rightText = await rightWords.nth(j).textContent();
                if (rightText && rightText.trim() === leftText) {
                    await leftWords.nth(i).click();
                    await rightWords.nth(j).click();
                    matched = true;
                    break;
                }
            }
        }
        expect(matched).toBe(true);

        // Дать время анимации начаться (matched добавляется сразу)
        await page.waitForTimeout(100);
        const matchedCount = await page.locator('.word.matched').count();
        expect(matchedCount).toBeGreaterThanOrEqual(2);
    });

    test('find-pair: неверная пара — слова снимают выделение через ~300ms', async ({ page }) => {
        await page.goto('/find-pair/');
        await expect(page.locator('#left-column .word').first()).toBeVisible();

        const leftWord  = page.locator('#left-column .word').first();
        const leftMatch = await leftWord.getAttribute('data-match');

        // Найти слово в правой колонке, которое НЕ является парой
        const rightWords = page.locator('#right-column .word');
        const rightCount = await rightWords.count();
        var wrongRight = null;
        for (var j = 0; j < rightCount; j++) {
            var txt = await rightWords.nth(j).textContent();
            if (txt && txt.trim() !== leftMatch) {
                wrongRight = rightWords.nth(j);
                break;
            }
        }

        if (!wrongRight) return; // нет неверной пары — пропуск

        await leftWord.click();
        await wrongRight.click();

        // Оба слова должны быть selected сразу
        await expect(leftWord).toHaveClass(/selected/);

        // После 400ms выделение должно сняться
        await page.waitForTimeout(400);
        const leftSelected = await leftWord.evaluate(el => el.classList.contains('selected'));
        expect(leftSelected).toBe(false);
    });

    test('mezcla: вид списка получает класс view-enter', async ({ page }) => {
        await page.goto('/mezcla/');
        await expect(page.locator('#mezcla-content .view-enter').first()).toBeVisible();
    });

    test('mezcla: вид чтения получает класс view-enter', async ({ page }) => {
        await page.goto('/mezcla/');
        await page.locator('[data-mezcla-open="0"]').first().click();
        await expect(page.locator('#mezcla-content .view-enter').first()).toBeVisible();
    });

    test('setTopbarProgress устанавливает transform вместо width', async ({ page }) => {
        await page.goto('/formulas/');
        // Вызываем setTopbarProgress(50) и проверяем что style использует transform
        const style = await page.evaluate(() => {
            if (typeof window.setTopbarProgress === 'function') {
                window.setTopbarProgress(50);
            }
            var el = document.getElementById('se-progress-fill');
            return el ? el.getAttribute('style') : null;
        });
        // setTopbarProgress должна устанавливать transform:scaleX(0.5)
        if (style) {
            expect(style).toContain('scaleX');
            expect(style).not.toMatch(/width:\s*\d+%/);
        }
    });
});
