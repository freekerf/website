// `npm run sync:design [-- --check] [-- --design <checkout>]`: copies the design
// tokens, fonts and brand files of freekerf/design at the commit pinned in
// `design.lock` (doc/features/design-sync.md). Files are read with
// `git show <commit>:<path>`, so the state of the checkout does not matter as long
// as it contains the commit. `--check` fails when a committed file differs (CI).
// The checkout defaults to ../design, or FREEKERF_DESIGN.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pinnedCommit, plan } from './lib/design-sync.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const at = args.indexOf('--design');
const design = resolve(root, at >= 0 ? args[at + 1] : (process.env.FREEKERF_DESIGN ?? '../design'));

const commit = pinnedCommit(readFileSync(resolve(root, 'design.lock'), 'utf8'));
const readDesign = (c, path) =>
  execFileSync('git', ['-C', design, 'show', `${c}:${path}`], { maxBuffer: 64 << 20 });
const readLocal = (path) => {
  try {
    return readFileSync(resolve(root, path));
  } catch {
    return null;
  }
};

const stale = plan(commit, readDesign, readLocal);
if (check) {
  if (stale.length) {
    console.error(`files differ from design ${commit} (run \`npm run sync:design\`):`);
    for (const s of stale) console.error(`  ${s.path}`);
    process.exit(1);
  }
} else {
  for (const s of stale) {
    const path = resolve(root, s.path);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, s.bytes);
    console.log(`wrote ${s.path}`);
  }
}
console.log(`design ${commit}: in sync`);
