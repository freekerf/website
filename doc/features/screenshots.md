# App screenshots

**Purpose:** show the real app, generated from it and never edited by hand (PLAN §6).

**How they are made** (`scripts/screenshots.mjs`): Playwright opens the app's web front
end on its development fake service (`ui/web/dev.html` in `freekerf/freekerf`, the same
harness as the app's browser tests), drives it through `window.fkFake` (actions such as
`document.import_data`, `view.set_mode`, `fire.request`) and saves one PNG per scene and
theme in `src/assets/screenshots/<scene>-<theme>.png`.

| Scene | Size | What it shows | Used in |
| --- | --- | --- | --- |
| `layers` | 1440 × 900 | Design mode, the engraving layer open with its settings | hero |
| `design` | 1440 × 900 | Design mode, the star selected with its handles | step 1 |
| `fire` | 1440 × 900 | the fire confirmation (checklist, countdown) | step 2 |
| `produce` | 1440 × 900 | Produce mode, a job at 57 % with the remaining time | step 3 |
| `phone` | 390 × 844 | the narrow layout (machine panel) during the same job | narrow section |

The sample job is a coaster (cut circle, engraved K) and a tag with a star, on three
layers (Cut, Engrave, Score), drawn with the SVG shapes the fake service imports.

**Regenerate** after a visible change of the app:

```bash
cd <freekerf>/ui/web && npm ci && npx vite --port 5174 --strictPort   # leave running
npm run screenshots                     # here; or `npm run screenshots -- design` for one scene
```

`FREEKERF_UI` overrides the URL of `dev.html`; `PW_CHROMIUM` the browser (default: the
Playwright Chromium, or Microsoft Edge on Windows). Take them from the app's `main`.

**Limits:** the fake service draws text as boxes and has no fill preview, so the scenes use
outlines only; the produce scene sets the machine state by hand (the fake has no job runner).

**Tests:** `tests/integration/build.test.ts` (WebP in both themes), `tests/e2e/site.spec.ts`
(five screenshots with `alt` on the landing; axe checks `alt`).
