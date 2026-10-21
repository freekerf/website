# Landing page

**Purpose:** the entry point to the app. Say what FreeKerf is, show it running, be honest
about its status, and lead to the download page and the source.

**Behaviour** (`src/views/Landing.astro`, at `/` and `/pt-br/`):

1. Hero: status badge (pre-alpha), title, one-paragraph pitch, *Download* and *View on
   GitHub*, and a screenshot of the Design mode.
2. *Three steps to the first burn*: Design, Check (the fire confirmation), Burn and watch,
   each with a screenshot. A short note says they come from the development version on
   its machine simulator.
3. The narrow layout (machine panel) with the phone-width screenshot.
4. The three values of the brand (precision, free and open, safety).
5. *Where we are*: the road of the app's milestones (`PLAN.md` of the monorepo), with a
   link to the full plan. Update it when a milestone of the app changes state.
6. *Get involved*: the repositories of the organization and a link to report a problem.

The footer credits the project FreeKerf is based on in one line, with the license,
trademark and privacy notes.

**Limits:** it does not document features; the user guide (milestone 3) does.

**Tests:** `tests/e2e/site.spec.ts` (headings, five screenshots, link to download, axe at
three widths and two themes), `tests/integration/build.test.ts` (both locales, hreflang,
WebP screenshots).
