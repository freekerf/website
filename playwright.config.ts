// End-to-end tests on the built site with recorded releases (no network):
// Chromium, Firefox and WebKit in CI; locally the Playwright Chromium, or the
// browser at PW_CHROMIUM, or Microsoft Edge on Windows (PW_CHANNEL=msedge).
import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;
const local = process.env.PW_CHROMIUM
  ? { launchOptions: { executablePath: process.env.PW_CHROMIUM } }
  : process.env.PW_CHANNEL
    ? { channel: process.env.PW_CHANNEL }
    : {};

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: process.env.CI
    ? [
        { name: 'chromium', use: devices['Desktop Chrome'] },
        { name: 'firefox', use: devices['Desktop Firefox'] },
        { name: 'webkit', use: devices['Desktop Safari'] },
      ]
    : [{ name: 'chromium', use: { ...devices['Desktop Chrome'], ...local } }],
  webServer: {
    command: `npx astro build --outDir dist-e2e && npx astro preview --outDir dist-e2e --port ${PORT}`,
    url: `http://localhost:${PORT}/`,
    env: { FK_RELEASES_FIXTURE: 'tests/fixtures/releases.json', BASE_PATH: '/' },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
