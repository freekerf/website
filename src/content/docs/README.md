# User documentation (draft)

Drafted with the desktop MVP (monorepo milestone M4b), before the site exists:
Markdown with Starlight frontmatter (`title`, `description`), English in `en/` (the
source) and the pt-BR translation in `pt-br/`, page for page. The site generator
and its checks come with milestone 1 (`PLAN.md` §6); screenshots generated from the
app come with milestone 3.

Labels in the pages are the app's own strings (`ui/i18n/<locale>/freekerf.ftl` in
the monorepo); keep them in step when the app changes.

| Page | Covers (`design/ux.md`) |
| --- | --- |
| `index.md` | what FreeKerf is, the two modes, where to start |
| `getting-started.md` | flow 1: first run, the welcome, connecting, jog, keyboard |
| `migrate-from-lasergrbl.md` | flow 2 |
| `design-a-job.md` | flows 3 and 5: import, colour layers, tools, booleans, array |
| `images.md` | flow 4 |
| `material-test.md` | flow 6 |
| `run-a-job.md` | flows 3 and 7: job start and anchor, frame, fire, pause, STOP, recovery |
| `safety.md` | STOP, the fire confirmation, laser mode |
| `automation.md` | scripts, MCP agents, permissions |
| `troubleshooting.md` | connection, alarm, placement, laser mode, reporting |
