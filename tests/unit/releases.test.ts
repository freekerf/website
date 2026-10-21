import { readFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import {
  classifyAsset,
  detectOs,
  fetchReleases,
  formatSize,
  installersFor,
  latest,
  parseReleases,
} from '../../src/lib/releases';

const fixture = JSON.parse(readFileSync(new URL('../fixtures/releases.json', import.meta.url), 'utf8'));

describe('classifyAsset', () => {
  it.each([
    ['FreeKerf_0.2.0_x64-setup.exe', 'windows', 'x64', 'exe'],
    ['FreeKerf_0.2.0_x64_en-US.msi', 'windows', 'x64', 'msi'],
    ['FreeKerf_0.2.0_aarch64.dmg', 'macos', 'arm64', 'dmg'],
    ['FreeKerf_0.2.0_universal.dmg', 'macos', 'universal', 'dmg'],
    ['FreeKerf_0.2.0_amd64.AppImage', 'linux', 'x64', 'appimage'],
    ['FreeKerf_0.2.0_arm64.deb', 'linux', 'arm64', 'deb'],
    ['FreeKerf-0.2.0-1.x86_64.rpm', 'linux', 'x64', 'rpm'],
    ['io.github.freekerf.FreeKerf.flatpakref', 'linux', null, 'flatpak'],
  ])('%s', (name, os, arch, kind) => {
    expect(classifyAsset(name)).toEqual({ os, arch, kind });
  });

  it('ignores signatures, checksums and updater files', () => {
    for (const name of ['a.msi.sig', 'SHA256SUMS', 'latest.json', 'FreeKerf.app.tar.gz']) {
      expect(classifyAsset(name)).toBeNull();
    }
  });
});

describe('parseReleases', () => {
  const releases = parseReleases(fixture);

  it('skips drafts and sorts newest first', () => {
    expect(releases.map((r) => r.tag)).toEqual(['v0.3.0-beta.1', 'v0.2.0']);
  });

  it('keeps installers only, with their version without "v"', () => {
    const r = releases[1]!;
    expect(r.version).toBe('0.2.0');
    expect(r.installers).toHaveLength(7);
    expect(r.installers.every((i) => i.url.startsWith('https://github.com/'))).toBe(true);
  });

  it('uses the tag when the release has no name', () => {
    const [r] = parseReleases([{ tag_name: 'v1.0.0', published_at: '2027-01-01T00:00:00Z', assets: 'x' }]);
    expect(r).toMatchObject({ name: 'v1.0.0', prerelease: false, installers: [], url: '' });
  });

  it('drops entries without tag or date and assets without URL', () => {
    const out = parseReleases([
      { tag_name: '', published_at: '2027-01-01T00:00:00Z' },
      { tag_name: 'v1', published_at: '' },
      { tag_name: 'v2', published_at: '2027-01-01T00:00:00Z', assets: [{ name: 'a.msi', size: 'big' }] },
      { tag_name: 'v3', published_at: '2027-01-02T00:00:00Z', assets: [{ name: 'a.msi', browser_download_url: 'u' }] },
    ]);
    expect(out.map((r) => r.tag)).toEqual(['v3', 'v2']);
    expect(out[0]!.installers[0]!.size).toBe(0);
    expect(out[1]!.installers).toEqual([]);
  });

  it('rejects an answer that is not a list', () => {
    expect(() => parseReleases({ message: 'Not Found' })).toThrow(/array/);
  });
});

describe('latest and installersFor', () => {
  const releases = parseReleases(fixture);

  it('prefers the newest stable release over a newer pre-release', () => {
    expect(latest(releases)?.tag).toBe('v0.2.0');
  });

  it('falls back to a pre-release, or nothing', () => {
    expect(latest(releases.filter((r) => r.prerelease))?.tag).toBe('v0.3.0-beta.1');
    expect(latest([])).toBeNull();
  });

  it('orders installers: recommended kind first, then x64 before arm64', () => {
    const r = latest(releases)!;
    expect(installersFor(r, 'windows').map((i) => i.kind)).toEqual(['exe', 'msi']);
    expect(installersFor(r, 'macos').map((i) => i.arch)).toEqual(['x64', 'arm64']);
    expect(installersFor(r, 'linux').map((i) => i.kind)).toEqual(['appimage', 'deb', 'rpm']);
  });

  it('puts installers without a known architecture between x64 and arm64', () => {
    const r = parseReleases([
      {
        tag_name: 'v1',
        published_at: '2027-01-01T00:00:00Z',
        assets: ['a_arm64.deb', 'a.deb', 'a_amd64.deb'].map((name) => ({ name, browser_download_url: name })),
      },
    ])[0]!;
    expect(installersFor(r, 'linux').map((i) => i.name)).toEqual(['a_amd64.deb', 'a.deb', 'a_arm64.deb']);
  });
});

describe('detectOs', () => {
  it.each([
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/141.0 Safari/537.36', 'windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15', 'macos'],
    ['Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0', 'linux'],
    ['Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36', 'linux'],
    ['Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Mobile Safari/537.36', null],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15', null],
    ['curl/8.0', null],
  ])('%s', (ua, os) => {
    expect(detectOs(ua)).toBe(os);
  });
});

describe('formatSize', () => {
  it('shows MB, KB, or nothing for an unknown size', () => {
    expect(formatSize(9961472)).toBe('9.5 MB');
    expect(formatSize(420)).toBe('1 KB');
    expect(formatSize(300 * 1024)).toBe('300 KB');
    expect(formatSize(0)).toBe('');
  });
});

describe('fetchReleases', () => {
  it('reads the releases API, with the token when given', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, status: 200, json: async () => fixture }));
    const out = await fetchReleases('freekerf/freekerf', fetchImpl, 'secret');
    expect(out?.map((r) => r.tag)).toEqual(['v0.3.0-beta.1', 'v0.2.0']);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, { headers: Record<string, string> }];
    expect(url).toBe('https://api.github.com/repos/freekerf/freekerf/releases?per_page=20');
    expect(init.headers.authorization).toBe('Bearer secret');
  });

  it('sends no token by default', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, status: 200, json: async () => [] }));
    expect(await fetchReleases('freekerf/freekerf', fetchImpl)).toEqual([]);
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, { headers: Record<string, string> }];
    expect(init.headers.authorization).toBeUndefined();
  });

  it('returns null on an HTTP error, a network error or a bad answer', async () => {
    const limited = async () => ({ ok: false, status: 403, json: async () => ({}) });
    const offline = async () => {
      throw new Error('offline');
    };
    const bad = async () => ({ ok: true, status: 200, json: async () => ({}) });
    for (const f of [limited, offline, bad]) expect(await fetchReleases('a/b', f)).toBeNull();
  });
});
