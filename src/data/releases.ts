// The releases the download page is built with, read once per build.
// FK_RELEASES_FIXTURE=<file.json> reads a recorded GitHub answer instead of the
// network (tests); FK_RELEASES_OFFLINE=1 skips the network (offline builds);
// GITHUB_TOKEN, when set (CI), raises the API rate limit.

import { readFile } from 'node:fs/promises';

import { fetchReleases, parseReleases, type Release } from '../lib/releases';
import { APP_REPO } from '../site';

let cached: Promise<Release[] | null> | undefined;

async function load(): Promise<Release[] | null> {
  const fixture = process.env.FK_RELEASES_FIXTURE;
  if (fixture) return parseReleases(JSON.parse(await readFile(fixture, 'utf8')));
  if (process.env.FK_RELEASES_OFFLINE === '1') return null;
  return fetchReleases(APP_REPO, fetch, process.env.GITHUB_TOKEN);
}

/** The app's releases, newest first; null when they could not be read. */
export function releases(): Promise<Release[] | null> {
  cached ??= load();
  return cached;
}
