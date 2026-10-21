import { describe, expect, it } from 'vitest';

import { en } from '../../src/i18n/en';
import {
  DEFAULT_LOCALE,
  formatDate,
  isLocale,
  LOCALES,
  localePath,
  splitPath,
  STRINGS,
  t,
  translator,
} from '../../src/lib/i18n';

describe('strings', () => {
  it('every locale has exactly the English keys, none empty', () => {
    for (const locale of LOCALES) {
      expect(Object.keys(STRINGS[locale]).sort(), locale).toEqual(Object.keys(en).sort());
      for (const [key, value] of Object.entries(STRINGS[locale])) expect(value.trim(), `${locale} ${key}`).not.toBe('');
    }
  });

  it('every locale keeps the placeholders of English', () => {
    const holes = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(en)) {
        expect(holes(STRINGS[locale][key as keyof typeof en]), `${locale} ${key}`).toEqual(holes(value));
      }
    }
  });

  it('writes the name as FreeKerf (design/brand/brand.md)', () => {
    for (const locale of LOCALES) {
      for (const value of Object.values(STRINGS[locale])) {
        expect(value).not.toMatch(/Freekerf|Free Kerf|FREEKERF|Free-Kerf/);
      }
    }
  });
});

describe('t', () => {
  it('fills placeholders and leaves unknown ones', () => {
    expect(t('en', 'download.version', { version: '1.2.3' })).toBe('Version 1.2.3');
    expect(t('pt-br', 'download.version')).toBe('Versão {version}');
    expect(translator('pt-br')('nav.download')).toBe('Baixar');
  });
});

describe('paths', () => {
  it('puts English at the root and other locales under their prefix', () => {
    expect(localePath('en', '')).toBe('/');
    expect(localePath('en', 'download/')).toBe('/download/');
    expect(localePath('pt-br', '')).toBe('/pt-br/');
    expect(localePath('pt-br', '/download')).toBe('/pt-br/download/');
    expect(localePath('pt-br', 'download/', '/website/')).toBe('/website/pt-br/download/');
    expect(localePath('en', '', '/website')).toBe('/website/');
  });

  it('splits paths back into locale and page', () => {
    expect(splitPath('/')).toEqual({ locale: DEFAULT_LOCALE, page: '' });
    expect(splitPath('/download/')).toEqual({ locale: 'en', page: 'download' });
    expect(splitPath('/website/pt-br/download/', '/website/')).toEqual({ locale: 'pt-br', page: 'download' });
    expect(splitPath('/website/', '/website/')).toEqual({ locale: 'en', page: '' });
    expect(splitPath('/en/x/')).toEqual({ locale: 'en', page: 'en/x' });
  });

  it('round-trips every locale', () => {
    for (const locale of LOCALES) {
      expect(splitPath(localePath(locale, 'download/', '/b/'), '/b/')).toEqual({ locale, page: 'download' });
    }
  });

  it('recognizes locales', () => {
    expect(isLocale('pt-br')).toBe(true);
    expect(isLocale('pt-BR')).toBe(false);
    expect(isLocale(3)).toBe(false);
  });
});

describe('formatDate', () => {
  it('uses the format of the locale, in UTC', () => {
    expect(formatDate('en', '2026-11-02T23:30:00Z')).toBe('November 2, 2026');
    expect(formatDate('pt-br', '2026-11-02T23:30:00Z')).toBe('2 de novembro de 2026');
  });
});
