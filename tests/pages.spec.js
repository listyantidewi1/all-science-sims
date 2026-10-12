import { test, expect } from '@playwright/test';
import { SIMS } from '../src/catalog/index.js';
import { SUBJECTS } from '../src/catalog/subjects.js';
import { trackErrors } from './helpers.js';

test('home page lists every subject and the featured grid', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page.locator('.subject-card')).toHaveCount(SUBJECTS.length);
  await expect(page.locator('.sim-card').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('home search filters the catalog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('pendulum');
  const cards = page.locator('.grid:visible .sim-card');
  await expect(cards.first()).toBeVisible();
  const n = await cards.count();
  expect(n).toBeGreaterThan(0);
  expect(n).toBeLessThan(SIMS.length);
  await expect(cards.first()).toContainText(/pendulum/i);
});

for (const subject of SUBJECTS) {
  test(`subject page ${subject.id} lists all of its sims`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(`/#/${subject.id}`);
    const expected = SIMS.filter((s) => s.subject === subject.id).length;
    await expect(page.locator('.sim-card')).toHaveCount(expected);
    expect(errors).toEqual([]);
  });
}

test('language toggle switches the UI to Bahasa Indonesia and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'ID', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
  await expect(page.locator('.hero p')).toContainText('simulasi');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
});

test('about page renders', async ({ page }) => {
  await page.goto('/#/about');
  await expect(page.locator('main h1')).toBeVisible();
});

test('unknown sim shows a not-found message instead of crashing', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/physics/does-not-exist');
  await expect(page.locator('main')).toContainText(/not found/i);
  expect(errors).toEqual([]);
});
