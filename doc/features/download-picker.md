# Download picker

**Purpose:** offer the right installer of the latest release for the visitor's system.

**Behaviour** (`src/views/Download.astro`, `src/lib/releases.ts`, `src/data/releases.ts`):

- At build time, the releases of `freekerf/freekerf` are read from
  `GET /repos/freekerf/freekerf/releases` (with `GITHUB_TOKEN` when set).
- Drafts are skipped. The release offered is the newest **stable** one, else the newest
  pre-release (marked as such).
- Assets are classified by file name: `.exe`, `.msi` (Windows), `.dmg` (macOS),
  `.AppImage`, `.deb`, `.rpm`, `.flatpak`/`.flatpakref` (Linux); the architecture from
  `x64`/`x86_64`/`amd64`, `aarch64`/`arm64`, `universal`. Signatures, checksums and
  updater files are ignored.
- Per system, the recommended kind comes first (Windows: `.exe`, then `.msi`; Linux:
  AppImage, `.deb`, `.rpm`, Flatpak), x64 before arm64. The architecture is shown when a
  system has two installers of the same kind.
- **Without JavaScript** every system is listed. With it, `detectOs(navigator.userAgent)`
  moves the visitor's system first and marks it *For your system*; phones and unknown
  systems get the plain list.
- **No release yet:** a card says so, and the page shows how to build from source.
- **Releases unreadable** (offline, rate limit): the card links to the releases page.
- Every case shows the laser safety note.

**Configuration:** `FK_RELEASES_FIXTURE=<file>` (recorded answer), `FK_RELEASES_OFFLINE=1`
(no network), `GITHUB_TOKEN`.

**Limits:** a new release appears at the next deployment (push to `main` or the daily
scheduled run). No checksums are shown yet ([roadmap](../roadmap.md)).

**Tests:** `tests/unit/releases.test.ts` (classification, parsing, selection, OS detection,
fetch errors), `tests/integration/build.test.ts` (builds with `releases.json` and
`releases-empty.json`), `tests/e2e/site.spec.ts` (Windows, macOS, Linux and phone user
agents; without JavaScript).
