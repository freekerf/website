# ADR 0003: no analytics

Status: accepted (2026-10-20)

## Context

PLAN §1.3: no third-party trackers; metrics, if any, aggregated, cookie-less and
self-hosted. The app itself has no telemetry.

## Decision

**No analytics** for now. The pages set no cookies, load nothing from other hosts (fonts
and images are served with the site) and keep no browser storage.

## Consequences

- No consent banner is needed.
- Download counts, when installers exist, come from the GitHub releases API.
- Revisit only for a self-hosted, cookie-less tool, in a new ADR.
