# ADR 0002: GitHub Pages with Actions deployment

Status: accepted (2026-10-20)

## Context

The site is static, the project lives on GitHub, and the domain `freekerf.org` is not
registered yet (PLAN §1.1, milestone 2).

## Decision

Host on **GitHub Pages**, deployed by a workflow (`actions/deploy-pages`), not from a
branch. Until the domain exists the site lives at `https://freekerf.github.io/website/`.

## Consequences

- No server, no cost, HTTPS by default; the organization's Pages settings must use the
  "GitHub Actions" source (once, by an owner).
- The base path is not hard-coded: the workflow passes the one Pages reports
  (`BASE_PATH`, `SITE_URL`), so moving to the custom domain needs no code change.
- The custom domain (CNAME, organization domain verification) is milestone 2.
