# FreeKerf Website: plan

Public website and user documentation for FreeKerf (intended domain: `freekerf.org`, not registered yet).

> **Status: planning.** License: GPL-3.0-or-later (see [NOTICE](NOTICE)). Once work starts, the maintenance guide is [`AGENTS.md`](AGENTS.md) (created in milestone 1) and §7 *Where each item lives* tracks progress.

## 1. What to build

### 1.1 Stack
- Static site generator with i18n and search: **Astro + Starlight** (recommended) or mdBook. Record the choice in `doc/adr/0001-site-generator.md`: en/pt-BR support, offline search, components for screenshots and tokens.
- Hosting on **GitHub Pages** with a custom domain (`CNAME`, domain verification on the organization, HTTPS enforced). Until the domain exists, `freekerf.github.io`.
- Look and feel from the `fk-` tokens and brand assets of [`design`](https://github.com/freekerf/design) (`tokens/fk-tokens.css`, `brand/`, OFL fonts), **synced by a script** (`npm run sync:design`, pinned to a `design` commit) and never copied by hand.

### 1.2 Content
- **Landing:** what FreeKerf is, who it is for, prototype screenshots and project status, making it clear the project is **pre-alpha**.
- **Download:** a page that reads GitHub releases of `freekerf/freekerf` and offers the right installer for the visitor's OS (Linux `.deb`/AppImage/Flatpak, Windows MSI, macOS DMG), with a fallback list.
- **User documentation:** first connection, migrating from LaserGRBL, the flows of `design/ux.md`, laser safety, Grbl configuration (`$$`), troubleshooting. English is the source language; pt-BR translation from the start.
- **For developers:** links to the monorepo `PLAN.md`, architecture, contributing and `conformance`.
- **Credits:** LaserGRBL and Diego Settimi, contributors, third-party licenses.
- **Trademark policy:** permitted use of the name and logo.

### 1.3 Privacy
No third-party trackers. If there are metrics, they are aggregated, cookie-less and self-hosted. No telemetry (project decision).

## 2. Repository layout

```
website/
├── AGENTS.md                 maintenance guide for people and agents
├── CLAUDE.md                 contains only "@AGENTS.md"
├── PLAN.md                   this file
├── src/content/docs/en/      user documentation (source language)
├── src/content/docs/pt-br/   translations
├── src/components/           site components (download picker, screenshots…)
├── src/styles/               generated from design tokens (do not edit by hand)
├── public/                   brand assets synced from `design`
├── scripts/                  sync-design, release fetcher
├── tests/                    unit, integration and end-to-end tests
└── doc/                      documentation about the site itself (§5)
```

## 3. Engineering practices

- Components are small and single-purpose; data fetching (GitHub releases) lives in one module behind an interface so tests can inject fixtures.
- The download picker works without JavaScript (server-rendered list) and enhances with JS.
- Accessibility first: semantic HTML, keyboard navigation, visible focus, contrast from the `fk-` tokens (already measured in `design/design-system.md`).
- Content pages contain no hard-coded version numbers or URLs that can be derived; they come from data files.

## 4. Testing

New code and new pages come with tests. CI fails when a gate below fails.

| Level | Where | What it proves | Tooling |
| --- | --- | --- | --- |
| **Unit** | `tests/unit/` | release parsing, OS detection, installer selection, helpers | Vitest |
| **Integration** | `tests/integration/` | the full build succeeds; every page in `en` has a `pt-br` counterpart or an explicit fallback; design sync produces the committed files (committed == generated) | Vitest + build output |
| **End to end** | `tests/e2e/` | landing, docs navigation, search, language switch and download picker in Chromium, Firefox and WebKit, at desktop, tablet and phone widths | Playwright |
| **Accessibility** | `tests/e2e/` | no axe violations on every page; Lighthouse accessibility ≥ 95 | `@axe-core/playwright`, Lighthouse CI |
| **Links and HTML** | CI job | no broken internal or external links; valid HTML | lychee, html-validate |
| **Visual regression** | `tests/e2e/` | key pages in light/dark themes match approved screenshots | Playwright screenshots |

Rules:
- Coverage of `src/` logic (non-content) **≥ 90 % lines**, same bar as `library`.
- The release fetcher is tested against recorded fixtures, never the live GitHub API in CI (a scheduled job checks the live API separately).
- No sleeps in end-to-end tests: wait on locators and network idle.

## 5. Documentation

All documentation is in **English** (`README.md`, `AGENTS.md`, `doc/`, commit messages, PR descriptions). User-facing content is authored in English and translated to pt-BR.

| File | Content |
| --- | --- |
| `AGENTS.md` | Overview, layout, commands, architecture on one screen, content rules (no hard-coded versions, translations, accessibility), living-documentation table, testing rules, conventions. `CLAUDE.md` contains only `@AGENTS.md`. |
| `doc/architecture.md` | Generator, content collections, design sync, release fetching, deployment (Mermaid diagram). |
| `doc/features/` | One page per feature (`download-picker.md`, `i18n.md`, `search.md`, `design-sync.md`, `deployment.md`) + `README.md` index. Each page: purpose, behaviour, configuration, limits, tests that cover it. |
| `doc/content-guide.md` | Writing style for user docs (voice and tone from `design/brand/brand.md`, safety wording, screenshots, translation workflow). |
| `doc/adr/` | Decision records (site generator, hosting, analytics or none). |
| `doc/roadmap.md` | What was postponed and open decisions. |

**Living documentation:** every change updates the docs in the same PR. `AGENTS.md` keeps this table:

| Changed… | Update |
| --- | --- |
| a component or script | the feature page in `doc/features/` |
| the design sync or the pinned `design` commit | `doc/features/design-sync.md` |
| user docs structure or translation flow | `doc/content-guide.md`, `doc/features/i18n.md` |
| deployment or domain | `doc/features/deployment.md` |
| a decision | a new ADR |
| something postponed | `doc/roadmap.md` |
| a milestone item | §7 of this file |

## 6. Milestones

1. **One-page landing on `freekerf.github.io`.** Stack ADR, `AGENTS.md` and `doc/` skeleton, design sync, CI with unit, build, links, axe and Lighthouse gates.
   **Acceptance:** CI green; landing passes accessibility gates in en and pt-BR.
2. **Custom domain** once `freekerf.org` is bought: DNS, HTTPS, organization domain verification.
   **Acceptance:** `doc/features/deployment.md` describes the setup; e2e smoke test against the deployed URL in a scheduled job.
3. **User documentation** following the desktop MVP (monorepo M4): getting started, LaserGRBL migration, the `design/ux.md` flows, safety.
   **Acceptance:** every page in en and pt-BR; e2e tests for navigation and search; screenshots generated from the app, not hand-made.
4. **Automatic download page** (monorepo M5).
   **Acceptance:** unit tests for OS and installer selection; integration test with recorded release fixtures; e2e on the three browser engines.

## 7. Where each item lives

Updated by every PR that delivers a milestone item (empty until milestone 1).

| Item | Implementation | Tests | Documentation |
| --- | --- | --- | --- |
| — | — | — | — |
