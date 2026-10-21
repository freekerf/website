# Content guide

How to write for the site. The voice is the one of `design/brand/brand.md`: an
experienced workshop colleague, direct, calm, precise.

## Style

- Short sentences. Verbs, not slogans. No exclamation marks.
- Numbers with units (`3000 mm/min`, `45 %`), the decimal separator of the language.
- The name is always **FreeKerf** (never Freekerf, Free Kerf, FREEKERF, FK in text).
- Be honest about the status: pre-alpha until there are installers; say what does not
  exist yet instead of hinting at it.
- Present FreeKerf on its own terms. The project it is based on is credited once, in the
  footer, and in the credits of the user guide.
- The landing introduces; it does not document features. Details belong to the user guide.

## Safety wording

Remind, do not scare: what the risk is, what to do, without alarmism or legal tone. Say
once that STOP in the app does not replace the physical emergency stop (download page).

## Screenshots

Only from the app, with `npm run screenshots` ([features/screenshots.md](features/screenshots.md)),
in both themes. Every screenshot has an `alt` text that says what it shows, in each locale.

## Translation workflow

1. Write or change the English string in `src/i18n/en.ts`.
2. Translate it in every locale file in the same PR (`src/i18n/pt-br.ts`); keep the
   `{placeholders}`.
3. Prefer the app's own terms (its `ui/i18n/<locale>/freekerf.ftl`): *Projetar*, *Produzir*,
   *PARAR*.
4. `npm test` checks keys, placeholders and the name.
