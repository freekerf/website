// Releases of the app (freekerf/freekerf on GitHub) for the download page
// (doc/features/download-picker.md). Parsing and selection are pure; the network
// is behind `fetchReleases`, which tests replace with recorded fixtures.

export type Os = 'windows' | 'macos' | 'linux';
export type Arch = 'x64' | 'arm64' | 'universal';
export type Kind = 'exe' | 'msi' | 'dmg' | 'appimage' | 'deb' | 'rpm' | 'flatpak';

export const OSES: readonly Os[] = ['windows', 'macos', 'linux'];

export interface Installer {
  os: Os;
  arch: Arch | null;
  kind: Kind;
  name: string;
  url: string;
  size: number;
}

export interface Release {
  tag: string;
  version: string;
  name: string;
  url: string;
  publishedAt: string;
  prerelease: boolean;
  installers: Installer[];
}

/** Installer kinds per system, the recommended one first. */
const PREFERENCE: Record<Os, readonly Kind[]> = {
  windows: ['exe', 'msi'],
  macos: ['dmg'],
  linux: ['appimage', 'deb', 'rpm', 'flatpak'],
};

const KINDS: readonly [RegExp, Os, Kind][] = [
  [/\.msi$/i, 'windows', 'msi'],
  [/\.exe$/i, 'windows', 'exe'],
  [/\.dmg$/i, 'macos', 'dmg'],
  [/\.appimage$/i, 'linux', 'appimage'],
  [/\.deb$/i, 'linux', 'deb'],
  [/\.rpm$/i, 'linux', 'rpm'],
  [/\.flatpak(ref)?$/i, 'linux', 'flatpak'],
];

/** What an asset file name is an installer for (null: not an installer, e.g. a signature). */
export function classifyAsset(name: string): { os: Os; arch: Arch | null; kind: Kind } | null {
  const hit = KINDS.find(([re]) => re.test(name));
  if (!hit) return null;
  const [, os, kind] = hit;
  let arch: Arch | null = null;
  if (/universal/i.test(name)) arch = 'universal';
  else if (/(aarch64|arm64)/i.test(name)) arch = 'arm64';
  else if (/(x64|x86_64|amd64)/i.test(name)) arch = 'x64';
  return { os, arch, kind };
}

interface GhAsset {
  name?: unknown;
  browser_download_url?: unknown;
  size?: unknown;
}
interface GhRelease {
  tag_name?: unknown;
  name?: unknown;
  html_url?: unknown;
  published_at?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  assets?: unknown;
}

const str = (v: unknown): string => (typeof v === 'string' ? v : '');

/** The GitHub `GET /repos/{repo}/releases` answer → published releases, newest first. */
export function parseReleases(json: unknown): Release[] {
  if (!Array.isArray(json)) throw new Error('releases: expected an array');
  const out: Release[] = [];
  for (const r of json as GhRelease[]) {
    if (r.draft === true || !str(r.tag_name) || !str(r.published_at)) continue;
    const installers: Installer[] = [];
    for (const a of Array.isArray(r.assets) ? (r.assets as GhAsset[]) : []) {
      const c = classifyAsset(str(a.name));
      if (!c || !str(a.browser_download_url)) continue;
      installers.push({
        ...c,
        name: str(a.name),
        url: str(a.browser_download_url),
        size: typeof a.size === 'number' ? a.size : 0,
      });
    }
    const tag = str(r.tag_name);
    out.push({
      tag,
      version: tag.replace(/^v/, ''),
      name: str(r.name) || tag,
      url: str(r.html_url),
      publishedAt: str(r.published_at),
      prerelease: r.prerelease === true,
      installers,
    });
  }
  return out.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** The release to offer: the newest stable one, else the newest pre-release. */
export function latest(releases: readonly Release[]): Release | null {
  return releases.find((r) => !r.prerelease) ?? releases[0] ?? null;
}

/** The installers of `release` for `os`, the recommended one first (x64 before arm64). */
export function installersFor(release: Release, os: Os): Installer[] {
  const order = PREFERENCE[os];
  const archRank = (a: Arch | null) => (a === 'x64' || a === 'universal' ? 0 : a === null ? 1 : 2);
  return release.installers
    .filter((i) => i.os === os)
    .sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind) || archRank(a.arch) - archRank(b.arch));
}

/** The visitor's system from the user agent (null: unknown, e.g. a phone). */
export function detectOs(userAgent: string): Os | null {
  if (/android|iphone|ipad|ipod/i.test(userAgent)) return null;
  if (/windows/i.test(userAgent)) return 'windows';
  if (/mac os x|macintosh/i.test(userAgent)) return 'macos';
  if (/linux|x11|cros/i.test(userAgent)) return 'linux';
  return null;
}

/** "12.3 MB". */
export function formatSize(bytes: number): string {
  if (bytes <= 0) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

type Fetch = (url: string, init?: { headers?: Record<string, string> }) => Promise<{
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}>;

/**
 * Reads the releases of `repo` from the GitHub API. Returns null when they cannot
 * be read (offline, rate limit): the page then links to the releases page instead.
 */
export async function fetchReleases(
  repo: string,
  fetchImpl: Fetch,
  token?: string,
): Promise<Release[] | null> {
  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json',
    'user-agent': 'freekerf-website',
  };
  if (token) headers.authorization = `Bearer ${token}`;
  try {
    const res = await fetchImpl(`https://api.github.com/repos/${repo}/releases?per_page=20`, { headers });
    if (!res.ok) return null;
    return parseReleases(await res.json());
  } catch {
    return null;
  }
}
