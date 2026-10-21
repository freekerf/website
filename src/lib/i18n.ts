// Locales, strings and localized paths (doc/features/i18n.md). English lives at
// the root, other locales under their prefix: /download/ and /pt-br/download/.

import { en, type Key, type Strings } from '../i18n/en';
import { ptBr } from '../i18n/pt-br';

export const LOCALES = ['en', 'pt-br'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const STRINGS: Record<Locale, Strings> = { en, 'pt-br': ptBr };

/** BCP 47 tag for `<html lang>`, hreflang and date formats. */
export const LANG_TAG: Record<Locale, string> = { en: 'en', 'pt-br': 'pt-BR' };
/** The name of each language, in that language. */
export const LANG_NAME: Record<Locale, string> = { en: 'English', 'pt-br': 'Português (Brasil)' };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** The string `key` in `locale`, with `{name}` placeholders filled. */
export function t(locale: Locale, key: Key, vars: Record<string, string> = {}): string {
  return STRINGS[locale][key].replace(/\{(\w+)\}/g, (m, name: string) => vars[name] ?? m);
}

/** A translator bound to one locale. */
export function translator(locale: Locale) {
  return (key: Key, vars?: Record<string, string>) => t(locale, key, vars);
}

const trim = (s: string) => s.replace(/^\/+|\/+$/g, '');

/**
 * The path of `page` (e.g. "download/", "" for the home page) in `locale`, under
 * the site base (e.g. "/website/"). Always ends with a slash.
 */
export function localePath(locale: Locale, page: string, base = '/'): string {
  const parts = [trim(base), locale === DEFAULT_LOCALE ? '' : locale, trim(page)].filter(Boolean);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

/** The locale and the page of a path built by `localePath`. */
export function splitPath(pathname: string, base = '/'): { locale: Locale; page: string } {
  let rest = trim(pathname);
  const b = trim(base);
  if (b && (rest === b || rest.startsWith(`${b}/`))) rest = trim(rest.slice(b.length));
  const [first, ...others] = rest.split('/');
  if (isLocale(first) && first !== DEFAULT_LOCALE) return { locale: first, page: others.join('/') };
  return { locale: DEFAULT_LOCALE, page: rest };
}

/** A date in the locale's format ("October 20, 2026" / "20 de outubro de 2026"). */
export function formatDate(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(LANG_TAG[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}
