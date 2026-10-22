// English strings (the source language). Every key here must exist in the other
// locales (checked by the type of `Strings` and by tests/unit/i18n.test.ts).
// Voice and tone: design/brand/brand.md (direct, calm, precise).

export const en = {
  'meta.title': 'FreeKerf: free software for laser cutters and engravers',
  'meta.description':
    'FreeKerf designs laser jobs and drives the machine. Free software under GPL-3.0-or-later, for Linux, Windows and macOS.',
  'meta.download.title': 'Download FreeKerf',
  'meta.download.description': 'Get FreeKerf for Windows, macOS or Linux.',
  'meta.notfound.title': 'Page not found · FreeKerf',

  'skip': 'Skip to content',
  'nav.label': 'Main',
  'nav.download': 'Download',
  'nav.status': 'Status',
  'nav.community': 'Get involved',
  'nav.source': 'Source code',
  'nav.language': 'Language',
  'nav.home': 'FreeKerf home',

  'hero.badge': 'Pre-alpha · in active development',
  'hero.title': 'From drawing to cut, in one free app.',
  'hero.lead':
    'FreeKerf designs your laser jobs and drives the machine: Grbl, grblHAL and more. Free software for Linux, Windows and macOS, with no licence keys and no “Pro” tier.',
  'hero.download': 'Download',
  'hero.source': 'View on GitHub',
  'hero.shot': 'FreeKerf in Design mode: a coaster and a tag on the work area, with their colour layers.',

  'steps.title': 'Three steps to the first burn',
  'steps.lead': 'One workspace, two modes: Design to prepare the job, Produce to run it.',
  'steps.design.title': 'Design',
  'steps.design.text':
    'Draw, or bring your SVG, DXF and image files. Every colour is a layer with its own speed, power and passes.',
  'steps.design.shot': 'Design mode: shapes on colour layers, with the selected star and its handles.',
  'steps.check.title': 'Check',
  'steps.check.text':
    'Before the laser turns on, a short bench checklist and a countdown. STOP is always on screen, even over dialogs.',
  'steps.check.shot': 'The confirmation before burning: glasses, exhaust, material and fire checklist.',
  'steps.run.title': 'Burn and watch',
  'steps.run.text':
    'Follow the head, the progress and the remaining time. Pause, stop the job or adjust speed and power while it runs.',
  'steps.run.shot': 'Produce mode: a job running at 57 %, with the remaining time and the head position.',
  'steps.note': 'Screenshots of the development version, taken from the app itself on its built-in machine simulator.',

  'narrow.title': 'A machine panel on narrow screens',
  'narrow.text':
    'Make the window narrow and FreeKerf turns into a control panel: state, progress and STOP within thumb reach.',
  'narrow.shot': 'FreeKerf in a narrow window: the job preview, the machine panel and the STOP button.',

  'values.title': 'What guides FreeKerf',
  'values.precision.title': 'Precision',
  'values.precision.text':
    'Tenth-of-a-millimetre geometry, numbers with units, rulers. A machine core tested step by step against an executable specification.',
  'values.free.title': 'Free and open',
  'values.free.text':
    'GPL-3.0-or-later. No licence keys, no dongle, nothing behind a paywall. Open file formats you can read and keep.',
  'values.safety.title': 'Safety first',
  'values.safety.text':
    'Machine state always visible, STOP always reachable, and calm messages that say what happened and what to do next.',

  'status.title': 'Where we are',
  'status.lead':
    'FreeKerf is pre-alpha: it works on the bench and changes every week. Development releases come with installers for Linux, Windows and macOS. Here is the road.',
  'status.done': 'Done',
  'status.now': 'In progress',
  'status.next': 'Next',
  'status.later': 'Later',
  'status.core': 'Machine core: Grbl protocol, G-code, simulator and command line',
  'status.import': 'Importers and planner: SVG, DXF, images, layers, G-code output',
  'status.desktop': 'Desktop app: Design and Produce modes, automation with scripts and AI agents',
  'status.v1': 'Version 1: installers for Linux, Windows and macOS, material library, more firmwares',
  'status.remote': 'Tablet and remote control over the local network',
  'status.plan': 'Read the full plan',

  'community.title': 'Get involved',
  'community.lead':
    'FreeKerf is built in the open by its community. Try the development version, report what you find, or help with code, design and translations.',
  'community.app': 'The app: Rust core, Tauri desktop app and web interface.',
  'community.conformance': 'Executable specification and protocol tests for the machine core.',
  'community.design': 'Research, brand and design system.',
  'community.library': 'Open material settings and machine profiles.',
  'community.website': 'This website and the user guide.',
  'community.issue': 'Report a problem',

  'download.title': 'Download FreeKerf',
  'download.lead': 'Free for everyone, on Linux, Windows and macOS.',
  'download.for': 'For your system',
  'download.all': 'All downloads',
  'download.version': 'Version {version}',
  'download.prerelease': 'Pre-release',
  'download.published': 'Published on {date}',
  'download.notes': 'Release notes',
  'download.none.title': 'No installers yet',
  'download.none.text':
    'FreeKerf is pre-alpha and has no published release right now. You can build the development version from source.',
  'download.macos.first':
    'The app is not signed yet. The first time, macOS refuses to open it: choose Done, then System Settings → Privacy & Security → Open Anyway, and confirm with an administrator password.',
  'download.offline.text': 'The list of releases could not be read right now. They are all on GitHub.',
  'download.releases': 'See the releases on GitHub',
  'download.source.title': 'Build from source',
  'download.source.text':
    'You need Git, Rust (rustup), Node.js 24 and, on Linux, WebKitGTK 4.1. Then, in a terminal:',
  'download.source.more': 'The repository guide lists every command and the dependencies per system.',
  'download.safety':
    'A laser can burn, blind and start fires. Wear the right glasses, keep the exhaust on and never leave a running machine alone. The STOP button in the app does not replace the physical emergency stop.',
  'os.windows': 'Windows',
  'os.macos': 'macOS',
  'os.linux': 'Linux',
  'kind.exe': 'Installer (.exe)',
  'kind.msi': 'Installer (.msi)',
  'kind.dmg': 'Disk image (.dmg)',
  'kind.appimage': 'AppImage',
  'kind.deb': 'Debian, Ubuntu (.deb)',
  'kind.rpm': 'Fedora, openSUSE (.rpm)',
  'kind.flatpak': 'Flatpak',

  'notfound.title': 'Page not found',
  'notfound.text': 'This page does not exist, or it moved.',
  'notfound.home': 'Go to the home page',

  'footer.license': 'Free software under the GPL-3.0-or-later.',
  'footer.heritage': 'Based on LaserGRBL by Diego Settimi.',
  'footer.trademark': '“FreeKerf” and the FreeKerf logo are names of the FreeKerf project.',
  'footer.privacy': 'No cookies, no trackers.',
} as const;

export type Key = keyof typeof en;
export type Strings = Record<Key, string>;
