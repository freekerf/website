# Design sync

**Purpose:** take the look of FreeKerf from `freekerf/design`, never copied by hand.

**Behaviour** (`scripts/sync-design.mjs`, `scripts/lib/design-sync.mjs`):

- `design.lock` pins a commit of `freekerf/design` (today `e284367`, the one the app uses).
- Each file in `FILES` is read with `git show <commit>:<path>` from a checkout of `design`
  (`../design`, `--design <dir>` or `FREEKERF_DESIGN`) and written byte for byte:

| Here | From `design` |
| --- | --- |
| `src/styles/fk-tokens.css` | `tokens/fk-tokens.css` |
| `public/fonts/*` | `assets/fonts/` (Inter, JetBrains Mono, Space Grotesk; OFL) |
| `public/favicon.svg`, `public/favicon.ico` | `brand/icon/` |
| `public/brand/freekerf-horizontal-{dark,light}.svg`, `freekerf-symbol-dark.svg` | `brand/logo/` |
| `public/brand/freekerf-512.png` | `brand/icon/png/` (Open Graph, touch icon) |

- `--check` writes nothing and fails when a file differs (CI). `.gitattributes` keeps these
  files out of line-ending conversion.

**Updating the design:** change the commit in `design.lock`, run `npm run sync:design`,
check the pages, commit both.

**Tests:** `tests/unit/design-sync.test.ts`; `tests/integration/build.test.ts` runs the
check when a `design` checkout is present; the CI job `design` runs it always.
