import { test, expect } from '@playwright/test';
import { trackErrors } from './helpers.js';

test('embed route shows only the stage and a credit bar', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/embed/physics/pendulum');
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(page.locator('.sim-aside')).toHaveCount(0);
  await expect(page.locator('.sim-stage')).toBeVisible();
  const full = page.locator('.embed-bar__link');
  await expect(full).toHaveAttribute('href', /#\/physics\/pendulum$/);
  await page.locator('.sim-start__btn').click();
  await expect(page.locator('.sim-stage canvas').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('autostart=1 skips the start gate', async ({ page }) => {
  await page.goto('/#/embed/physics/pendulum?autostart=1');
  await expect(page.locator('.sim-stage canvas').first()).toBeVisible();
  await expect(page.locator('.sim-start__btn')).toHaveCount(0);
});

test('deep link presets a slider by its label slug', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/mathematics/pi-polygons?polygon-sides-n=24');
  await page.locator('.sim-start__btn').click();
  const slider = page.getByRole('slider', { name: 'Polygon sides n' });
  await expect(slider).toHaveValue('24');
  expect(errors).toEqual([]);
});

test('share link reflects the current control values', async ({ page }) => {
  await page.goto('/#/mathematics/pi-polygons');
  await page.locator('.sim-start__btn').click();
  const slider = page.getByRole('slider', { name: 'Polygon sides n' });
  await slider.fill('48');
  const link = page.locator('.share input');
  await expect(link).toHaveValue(/#\/mathematics\/pi-polygons\?polygon-sides-n=48$/);
  const embed = page.locator('.share textarea');
  await expect(embed).toHaveValue(/<iframe src=".*#\/embed\/mathematics\/pi-polygons\?polygon-sides-n=48"/);
});

test('lang=id in the URL switches the interface language', async ({ page }) => {
  await page.goto('/#/physics/pendulum?lang=id');
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
  await expect(page.locator('.sim-start__hint')).toContainText('Klik');
});
