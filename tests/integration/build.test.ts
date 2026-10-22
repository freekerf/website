// The full build with recorded releases (no network): every page exists in every
// locale, the download page lists the fixture's installers, and the design files
// committed here are the ones of the pinned design commit.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { LOCALES, localePath } from '../../src/lib/i18n';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const astro = join(root, 'node_modules', 'astro', 'bin', 'astro.mjs');
const PAGES = ['', 'download/'];

function build(fixture: string): string {
  const out = mkdtempSync(join(tmpdir(), 'fk-site-'));
  execFileSync(process.execPath, [astro, 'build', '--outDir', out, '--silent'], {
    cwd: root,
    env: { ...process.env, FK_RELEASES_FIXTURE: join(root, 'tests', 'fixtures', fixture), BASE_PATH: '/' },
    stdio: 'pipe',
  });
  return out;
}
const html = (out: string, path: string) => readFileSync(join(out, path, 'index.html'), 'utf8');

describe('build with releases', () => {
  let out = '';
  beforeAll(() => {
    out = build('releases.json');
  });
  afterAll(() => rmSync(out, { recursive: true, force: true }));

  it('has every page in every locale, with lang and hreflang', () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const doc = html(out, localePath(locale, page));
        expect(doc).toMatch(new RegExp(`<html lang="${locale === 'en' ? 'en' : 'pt-BR'}"`));
        for (const other of LOCALES) expect(doc).toContain(`href="https://freekerf.github.io${localePath(other, page)}"`);
      }
    }
    expect(existsSync(join(out, '404.html'))).toBe(true);
  });

  it('lists the latest stable release with its installers', () => {
    const doc = html(out, 'download/');
    expect(doc).toContain('Version 0.2.0');
    expect(doc).not.toContain('0.3.0-beta.1');
    for (const os of ['windows', 'macos', 'linux']) expect(doc).toContain(`data-os="${os}"`);
    expect(doc).toContain('FreeKerf_0.2.0_x64-setup.exe');
    expect(doc).not.toContain('.sig"');
    // two .dmg files: their architectures are shown
    expect(doc).toMatch(/arm64/);
    expect(doc).toContain('Privacy &amp; Security → Open Anyway');
    expect(html(out, 'pt-br/download/')).toContain('Publicada em 2 de novembro de 2026');
  });

  it('ships the screenshots as WebP in both themes', () => {
    const doc = html(out, '');
    expect(doc).toMatch(/media="\(prefers-color-scheme: light\)" srcset="[^"]+layers-light[^"]+\.webp/);
    expect(doc).toMatch(/<img src="[^"]+layers-dark[^"]+\.webp"/);
  });
});

describe('build without releases', () => {
  it('offers the source build instead', () => {
    const out = build('releases-empty.json');
    try {
      const doc = html(out, 'download/');
      expect(doc).toContain('data-testid="no-release"');
      expect(doc).toContain('cargo run --release -p freekerf-desktop');
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  });
});

// Needs a checkout of freekerf/design with the pinned commit (CI clones it).
const design = process.env.FREEKERF_DESIGN ?? resolve(root, '..', 'design');
describe.skipIf(!existsSync(join(design, '.git')))('design sync', () => {
  it('committed files equal the pinned design commit', () => {
    execFileSync(process.execPath, ['scripts/sync-design.mjs', '--check', '--design', design], {
      cwd: root,
      stdio: 'pipe',
    });
  });
});
