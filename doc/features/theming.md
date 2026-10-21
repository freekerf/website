# Light and dark themes

**Purpose:** follow the visitor's system theme with the app's own palette.

**Behaviour:**

- Colours are the `--fk-*` tokens of `src/styles/fk-tokens.css` (synced from `design`):
  dark on `:root`, light under `[data-theme="light"]`.
- An inline script in `src/layouts/Base.astro` sets `data-theme` from
  `prefers-color-scheme` and follows its changes. Without JavaScript the page stays dark,
  the brand default.
- Screenshots use `<picture>` with a `(prefers-color-scheme: light)` source, so the image
  matches the page. The logo switches between its dark- and light-background versions.
- There is no manual switch: it would make the page and the screenshots disagree.

**Tests:** `tests/e2e/site.spec.ts` (`data-theme` follows the emulated colour scheme; axe in
both themes at three widths).
