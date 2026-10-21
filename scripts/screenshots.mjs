// Screenshots of the FreeKerf app for the website, generated from the app itself
// (PLAN §6: "screenshots generated from the app, not hand-made").
//
// The app's web front end runs in a browser on its development fake service
// (`ui/web/dev.html` in freekerf/freekerf). Start it there, then run this script:
//
//   cd <freekerf>/ui/web && npx vite --port 5174 --strictPort
//   npm run screenshots                       # in this repository
//
// FREEKERF_UI overrides the URL of dev.html; PW_CHROMIUM the browser executable
// (defaults to the Playwright Chromium, or Microsoft Edge on Windows).
// Output: src/assets/screenshots/<scene>-<theme>.png (doc/features/screenshots.md).

import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const APP_URL = process.env.FREEKERF_UI ?? 'http://localhost:5174/dev.html';
const OUT = fileURLToPath(new URL('../src/assets/screenshots/', import.meta.url));

/** The sample job, in mm on a 400 × 400 mm work area: a coaster (cut outline,
 * engraved K) and a tag with a star. The fake service imports basic SVG shapes. */
const S = 2.2;
const pts = (list, dx, dy) => list.map(([x, y]) => `${dx + x * S},${dy + y * S}`).join(' ');
const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <circle cx="115" cy="200" r="${46 * S}" stroke="#4C8DFF" fill="none"/>
  <circle cx="115" cy="200" r="${40 * S}" stroke="#E8622C" fill="none"/>
  <polygon points="${pts([[-18, -24], [-9, -24], [-9, 24], [-18, 24]], 115, 200)}" stroke="#E8622C" fill="none"/>
  <polygon points="${pts([[10, -24], [24, -24], [6.5, 0], [24, 24], [10, 24], [-7.5, 0]], 115, 200)}" stroke="#E8622C" fill="none"/>
  <rect x="${300 - 38 * S}" y="${200 - 42 * S}" width="${76 * S}" height="${84 * S}" stroke="#4C8DFF" fill="none"/>
  <polygon points="${pts([[0, -30], [8, -8], [30, -8], [12, 6], [19, 28], [0, 14], [-19, 28], [-12, 6], [-30, -8], [-8, -8]], 300, 200)}" stroke="#10A37F" fill="none"/>
</svg>`;

const SCENES = {
  /** Design mode with the sample job. */
  design: { size: [1440, 900], setup: design },
  /** Design mode, the engraving layer open with its settings (the landing's hero). */
  layers: { size: [1440, 900], setup: layers },
  /** Produce mode, a job running on the (simulated) machine. */
  produce: { size: [1440, 900], setup: produce },
  /** The fire confirmation before the laser turns on. */
  fire: { size: [1440, 900], setup: fire },
  /** A phone watching the job. */
  phone: { size: [390, 844], setup: produce },
};

async function open(page, theme) {
  await page.goto(APP_URL);
  await page.getByTestId('state-chip').waitFor();
  await fake(page, (f, t) => f.setUserSetting('ui.theme', t), theme);
  await page.locator(`html[data-theme="${theme}"]`).waitFor();
}

/** Runs `fn(fkFake, arg)` in the page. */
function fake(page, fn, arg) {
  return page.evaluate(([src, a]) => new Function('f', 'a', `return (${src})(f, a)`)(window.fkFake, a), [
    fn.toString(),
    arg,
  ]);
}

async function loadSample(page) {
  await fake(
    page,
    async (f, svg) => {
      await f.dispatch('document.import_data', { format: 'svg', text: svg, name: 'coaster.svg' });
      // the cut outlines last, the K engraved as a fill
      const { document } = await f.dispatch('session.snapshot', {});
      const layer = (c) => document.layers.find((l) => l.color === c);
      await f.dispatch('document.update_layer', { id: layer('#4C8DFF').id, name: 'Cut', mode: 'cut', speed_mm_min: 400, power: 1000, passes: 2 });
      await f.dispatch('document.update_layer', { id: layer('#E8622C').id, name: 'Engrave', mode: 'fill', speed_mm_min: 3000, power: 400 });
      await f.dispatch('document.update_layer', { id: layer('#10A37F').id, name: 'Score', speed_mm_min: 1500, power: 250 });
      await f.dispatch('document.clear_selection', {});
    },
    SAMPLE,
  );
}

async function design(page) {
  await page.getByTestId('mode-design').click();
  await page.locator('html[data-mode="design"]').waitFor();
  await loadSample(page);
  await fake(page, async (f) => {
    const s = await f.dispatch('session.snapshot', {});
    await f.dispatch('document.select', { ids: [s.document.objects.at(-1).id] });
  });
  await page.waitForTimeout(300);
}

async function layers(page) {
  await design(page);
  await fake(page, (f) => f.dispatch('document.clear_selection', {}));
  await page.locator('.layer .exp').nth(1).click();
  await page.waitForTimeout(300);
}

async function produce(page) {
  await loadSample(page);
  await fake(page, (f) => f.dispatch('view.set_mode', { mode: 'produce' }));
  await page.getByTestId('connect').click();
  await page.getByTestId('state-chip').filter({ hasText: /ready|idle/i }).waitFor();
  await fake(page, async (f) => {
    await f.dispatch('job.from_document', {});
    const m = f.state.machine;
    const n = f.state.program.lines;
    Object.assign(m, {
      status: 'Run',
      in_program: true,
      job_target: n,
      job_sent: Math.round(n * 0.62),
      job_executed: Math.round(n * 0.58),
      job_time_ms: 74_000,
      program_estimated_ms: 128_000,
      projected_ms: 128_000,
      feed: 3000,
      power: 450,
      work_position: { x: 115, y: 301.2, z: 0 },
      machine_position: { x: 115, y: 301.2, z: 0 },
    });
    // after the reads that `program_loaded` started (the UI coalesces them)
    await new Promise((r) => setTimeout(r, 200));
    f.emit({ event: 'host', data: { StatusChanged: { old: 'Idle', new: 'Run' } } });
    for (let i = 0; i < 5; i++) {
      f.emitHead(115, 301.2, m.job_executed, n, true);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForTimeout(500);
}

async function fire(page) {
  await loadSample(page);
  await page.getByTestId('connect').click();
  await fake(page, async (f) => {
    await f.dispatch('job.from_document', {});
    await f.dispatch('fire.request', { action: 'job.run', params: {} });
  });
  await page.getByRole('dialog').waitFor();
  await page.waitForTimeout(300);
}

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM,
  channel: process.env.PW_CHROMIUM || process.platform !== 'win32' ? undefined : 'msedge',
});
await mkdir(OUT, { recursive: true });
const only = process.argv.slice(2);
for (const [name, scene] of Object.entries(SCENES)) {
  if (only.length && !only.includes(name)) continue;
  for (const theme of ['dark', 'light']) {
    const page = await browser.newPage({
      viewport: { width: scene.size[0], height: scene.size[1] },
      deviceScaleFactor: 1,
      colorScheme: theme,
    });
    await open(page, theme);
    await scene.setup(page);
    const file = `${OUT}${name}-${theme}.png`;
    await page.screenshot({ path: file, animations: 'disabled' });
    console.log(`wrote ${file}`);
    await page.close();
  }
}
await browser.close();
