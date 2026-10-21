// The files this site takes from freekerf/design, read at the commit pinned in
// `design.lock` (doc/features/design-sync.md). Pure functions: the CLI in
// `scripts/sync-design.mjs` gives them a reader (`git show`) and the file system.

/** Published path in this repository ← path in freekerf/design. */
export const FILES = [
  ['src/styles/fk-tokens.css', 'tokens/fk-tokens.css'],
  ['public/fonts/fonts.css', 'assets/fonts/fonts.css'],
  ['public/fonts/OFL.txt', 'assets/fonts/OFL.txt'],
  ['public/fonts/Inter-Regular.woff2', 'assets/fonts/Inter-Regular.woff2'],
  ['public/fonts/Inter-Medium.woff2', 'assets/fonts/Inter-Medium.woff2'],
  ['public/fonts/Inter-SemiBold.woff2', 'assets/fonts/Inter-SemiBold.woff2'],
  ['public/fonts/Inter-Bold.woff2', 'assets/fonts/Inter-Bold.woff2'],
  ['public/fonts/JetBrainsMono-Regular.woff2', 'assets/fonts/JetBrainsMono-Regular.woff2'],
  ['public/fonts/JetBrainsMono-SemiBold.woff2', 'assets/fonts/JetBrainsMono-SemiBold.woff2'],
  ['public/fonts/SpaceGrotesk-Bold.woff2', 'assets/fonts/SpaceGrotesk-Bold.woff2'],
  ['public/favicon.svg', 'brand/icon/favicon.svg'],
  ['public/favicon.ico', 'brand/icon/favicon.ico'],
  ['public/brand/freekerf-horizontal-dark.svg', 'brand/logo/freekerf-horizontal-dark.svg'],
  ['public/brand/freekerf-horizontal-light.svg', 'brand/logo/freekerf-horizontal-light.svg'],
  ['public/brand/freekerf-symbol-dark.svg', 'brand/logo/freekerf-symbol-dark.svg'],
  ['public/brand/freekerf-512.png', 'brand/icon/png/freekerf-512.png'],
];

/** The pinned commit: the first line of `design.lock` that is not a comment. */
export function pinnedCommit(lock) {
  const line = lock
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith('#'));
  if (!line || !/^[0-9a-f]{40}$/.test(line)) {
    throw new Error('design.lock must contain a full 40-character commit hash');
  }
  return line;
}

/**
 * Compares the committed files with the design files at `commit`.
 * `readDesign(commit, path)` and `readLocal(path)` return a Buffer (`readLocal`
 * returns null for a missing file). Returns the files that differ, with their bytes.
 */
export function plan(commit, readDesign, readLocal, files = FILES) {
  const stale = [];
  for (const [local, source] of files) {
    const bytes = readDesign(commit, source);
    const current = readLocal(local);
    if (!current || !current.equals(bytes)) stale.push({ path: local, bytes });
  }
  return stale;
}
