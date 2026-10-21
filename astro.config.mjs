// Astro configuration (doc/architecture.md, ADR 0001).
// SITE_URL and BASE_PATH come from the Pages deployment (doc/features/deployment.md);
// the defaults are the GitHub Pages address of this repository.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://freekerf.github.io',
  base: process.env.BASE_PATH ?? '/website',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
