import { test, expect } from '@playwright/test';
import { SIMS } from '../src/catalog/index.js';
import { SUBJECTS } from '../src/catalog/subjects.js';
import { trackErrors } from './helpers.js';

const LEVELS = { primary: [1, 6], middle: [7, 9], high: [10, 12], university: [13, 13] };
const inLevel = (sim, [lo, hi]) => {
  const g = sim.grade || [];
  return g.length > 0 && Math.min(...g) <= hi && Math.max(...g) >= lo;
};

test('every sim has a grade band and shows a grade badge', async ({ page }) => {
  const missing = SIMS.filter((s) => !Array.isArray(s.grade) || s.grade.length === 0).map((s) => `${s.subject}/${s.id}`);
  expect(missing).toEqual([]);
  await page.goto('/#/physics');
  await expect(page.locator('.sim-card__grade').first()).toBeVisible();
});

test('level chips filter a subject page and persist across pages', async ({ page }) => {
  const errors = trackErrors(page);
  const subject = SUBJECTS[0].id;
  const all = SIMS.filter((s) => s.subject === subject);
  const high = all.filter((s) => inLevel(s, LEVELS.high));
  await page.goto(`/#/${subject}`);
  await expect(page.locator('.sim-card')).toHaveCount(all.length);
  await page.locator('.chip[data-level="high"]').click();
  await expect(page.locator('.sim-card')).toHaveCount(high.length);
  // Filter persists on the home page.
  await page.goto('/');
  await expect(page.locator('.chip[data-level="high"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.chip[data-level="all"]').click();
  await expect(page.locator('.subject-card')).toHaveCount(SUBJECTS.length);
  expect(errors).toEqual([]);
});

test('primary level has sims in several subjects', async ({ page }) => {
  await page.goto('/');
  await page.locator('.chip[data-level="primary"]').click();
  const n = await page.locator('.subject-card').count();
  expect(n).toBeGreaterThanOrEqual(3);
});
