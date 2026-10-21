import { describe, expect, it } from 'vitest';

import { FILES, pinnedCommit, plan } from '../../scripts/lib/design-sync.mjs';

const COMMIT = 'e284367854f6d57ab87aa20ebe306458ac4e0689';

describe('pinnedCommit', () => {
  it('reads the first line that is not a comment', () => {
    expect(pinnedCommit(`# comment\n\n${COMMIT}\n`)).toBe(COMMIT);
    expect(pinnedCommit(`# a\r\n${COMMIT}\r\n`)).toBe(COMMIT);
  });

  it('rejects a missing or short hash', () => {
    expect(() => pinnedCommit('# only comments\n')).toThrow(/40-character/);
    expect(() => pinnedCommit('e284367\n')).toThrow(/40-character/);
  });
});

describe('plan', () => {
  const files: [string, string][] = [
    ['a.css', 'tokens/a.css'],
    ['b.svg', 'brand/b.svg'],
    ['c.woff2', 'fonts/c.woff2'],
  ];
  const design: Record<string, string> = { 'tokens/a.css': 'A', 'brand/b.svg': 'B', 'fonts/c.woff2': 'C' };
  const readDesign = (commit: string, path: string) => {
    expect(commit).toBe(COMMIT);
    return Buffer.from(design[path]!);
  };

  it('lists the files that are missing or differ, with the design bytes', () => {
    const local: Record<string, string> = { 'a.css': 'A', 'b.svg': 'old' };
    const out = plan(COMMIT, readDesign, (p: string) => (p in local ? Buffer.from(local[p]!) : null), files);
    expect(out.map((s: { path: string; bytes: Buffer }) => [s.path, s.bytes.toString()])).toEqual([
      ['b.svg', 'B'],
      ['c.woff2', 'C'],
    ]);
  });

  it('is empty when everything is in sync', () => {
    expect(plan(COMMIT, readDesign, (p: string) => readDesign(COMMIT, files.find(([l]) => l === p)![1]), files)).toEqual(
      [],
    );
  });

  it('takes the tokens, the fonts and the logo', () => {
    const sources = FILES.map(([, s]) => s);
    expect(sources).toContain('tokens/fk-tokens.css');
    expect(sources.filter((s) => s.endsWith('.woff2')).length).toBeGreaterThanOrEqual(6);
    expect(sources).toContain('brand/icon/favicon.svg');
    expect(new Set(FILES.map(([l]) => l)).size).toBe(FILES.length);
  });
});
