import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const DIST = new URL('../dist/', import.meta.url).pathname;

// Routes are read from the build
function routes(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return routes(join(dir, entry.name));
    if (entry.name !== 'index.html') return [];
    const rel = relative(DIST, dir);
    return ['/' + (rel ? rel.split(sep).join('/') + '/' : '')];
  });
}

test.beforeEach(async ({ page }) => {
  // Keep test traffic out of Google Analytics.
  await page.route(/googletagmanager\.com/, (route) => route.abort());
});

for (const route of routes()) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Compare on id + help so a failure prints the rule, not a wall of JSON.
    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}
