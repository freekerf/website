# ADR 0001: Astro as the site generator

Status: accepted (2026-10-20)

## Context

PLAN §1.1 asks for a static generator with en/pt-BR support, offline search for the
user guide, and components for screenshots and design tokens. Candidates: Astro (with
Starlight for documentation) and mdBook.

## Decision

**Astro**, without a client framework. Milestone 1 (landing and download) uses plain Astro
pages; milestone 3 adds the **Starlight** integration for the user guide, whose drafts in
`src/content/docs/` already use its frontmatter.

## Reasons

- i18n routing built in; one view per page rendered for every locale.
- `astro:assets` turns the PNG screenshots into responsive WebP at build time.
- Build-time data (the GitHub releases) in the page frontmatter, with no runtime requests.
- Starlight is an Astro integration: the guide joins the same build, styles and header
  later, with Pagefind offline search, instead of a second generator.
- mdBook is excellent for books but has no i18n routing, no image pipeline and would
  need a separate landing.

## Consequences

- Node is needed to build (CI uses Node 24, like the app's front end).
- Pages are `.astro` components; logic stays in `src/lib/` (TypeScript, unit tested).
