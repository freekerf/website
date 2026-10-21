// The landing, the language switch, the download picker and accessibility, at
// desktop, tablet and phone widths, in the dark and light themes.
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const PAGES = ['/', '/download/', '/pt-br/', '/pt-br/download/', '/404.html'];
const WIDTHS = { desktop: [1366, 900], tablet: [820, 1180], phone: [375, 812] } as const;

const UA = {
  windows: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
  macos: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  linux: 'Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0',
  phone: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
};

async function noSideScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test('the landing leads to the download page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('From drawing to cut, in one free app.');
  await expect(page.locator('img[data-scene]')).toHaveCount(5);
  await page.getByTestId('hero-download').click();
  await expect(page).toHaveURL(/\/download\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Download FreeKerf');
});

test('the language switch keeps the page', async ({ page }) => {
  await page.goto('/download/');
  await page.getByTestId('lang-pt-br').click();
  await expect(page).toHaveURL(/\/pt-br\/download\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Baixar o FreeKerf');
  await page.getByTestId('lang-en').click();
  await expect(page).toHaveURL(/\/download\/$/);
});

test('the theme follows the system', async ({ browser }) => {
  for (const colorScheme of ['dark', 'light'] as const) {
    const page = await browser.newPage({ colorScheme });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await page.close();
  }
});

for (const [os, ua] of Object.entries(UA)) {
  test(`the download picker for ${os}`, async ({ browser }) => {
    const page = await browser.newPage({ userAgent: ua });
    await page.goto('/download/');
    const cards = page.locator('.os-card');
    await expect(cards).toHaveCount(3);
    if (os === 'phone') {
      await expect(page.locator('.os-card.is-recommended')).toHaveCount(0);
    } else {
      const first = cards.first();
      await expect(first).toHaveAttribute('data-os', os);
      await expect(first).toHaveClass(/is-recommended/);
      await expect(first.getByText('For your system')).toBeVisible();
      await expect(first.locator('a.btn-primary')).toHaveAttribute('href', /FreeKerf_0\.2\.0/);
    }
    await page.close();
  });
}

test('without JavaScript every system is listed, none recommended', async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, userAgent: UA.windows });
  await page.goto('/download/');
  await expect(page.locator('.os-card')).toHaveCount(3);
  await expect(page.locator('.os-card').first()).toHaveAttribute('data-os', 'windows');
  await expect(page.locator('.recommended').first()).toBeHidden();
  await page.close();
});

for (const [name, [width, height]] of Object.entries(WIDTHS)) {
  for (const colorScheme of ['dark', 'light'] as const) {
    test.describe(`${name} ${colorScheme}`, () => {
      test.use({ viewport: { width, height }, colorScheme });

      for (const path of PAGES) {
        test(`${path}: no accessibility violations, no sideways scroll`, async ({ page }) => {
          await page.goto(path);
          await noSideScroll(page);
          const { violations } = await new AxeBuilder({ page }).analyze();
          expect(violations.map((v) => `${v.id} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`)).toEqual(
            [],
          );
        });
      }
    });
  }
}
