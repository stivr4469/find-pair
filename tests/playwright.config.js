// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './smoke',
    timeout: 15000,
    expect: { timeout: 5000 },
    fullyParallel: true,
    retries: 1,
    reporter: 'line',
    use: {
        baseURL: 'http://localhost:3001',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'off',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    // Сервер должен быть запущен отдельно (run-smoke.sh)
    webServer: {
        command: 'python3 -m http.server 3001 --directory ..',
        url: 'http://localhost:3001',
        reuseExistingServer: true,
        timeout: 10000,
    },
});
