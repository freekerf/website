import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    testTimeout: 120_000,
    hookTimeout: 180_000,
    coverage: {
      provider: 'v8',
      include: ['src/lib/**', 'scripts/lib/**'],
      reporter: ['text', 'json-summary'],
      thresholds: { lines: 90 },
    },
  },
});
