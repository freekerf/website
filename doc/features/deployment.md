# Deployment

**Purpose:** publish `main` on GitHub Pages ([ADR 0002](../adr/0002-hosting.md)).

**Behaviour** (`.github/workflows/deploy.yml`):

- Runs on every push to `main`, daily at 06:00 UTC (so a new app release reaches the
  download page) and by hand (`workflow_dispatch`).
- `actions/configure-pages` reports the Pages URL; the build gets it as `SITE_URL` and
  `BASE_PATH` (`astro.config.mjs`), then `actions/deploy-pages` publishes `dist/`.
- The build reads the releases with the workflow's `GITHUB_TOKEN`.

**One-time setup (an organization owner):** *Settings → Pages → Source: GitHub Actions* in
`freekerf/website`.

**Address:** `https://freekerf.github.io/website/` until the custom domain (milestone 2):
then add `public/CNAME`, verify the domain for the organization, enforce HTTPS, and the
base path becomes `/` with no code change.

**Checks:** `.github/workflows/ci.yml` on every PR (below); `.github/workflows/scheduled.yml`
weekly: external links and the live releases API.

| CI job | Runs |
| --- | --- |
| `test` | `astro check`, unit + integration tests with coverage (≥ 90 % lines), build, html-validate, internal links (lychee, offline) |
| `design` | `npm run sync:design -- --check` against a clone of `freekerf/design` |
| `e2e` | Playwright on Chromium, Firefox and WebKit, axe at three widths and two themes |
