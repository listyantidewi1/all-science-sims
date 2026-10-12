import { test, expect } from '@playwright/test';
import { trackErrors } from './helpers.js';

// Drag handles expose an invisible focusable button each; arrow keys nudge.
test('a drag handle can be moved with the keyboard', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/mathematics/quadratic');
  await page.locator('.sim-start__btn').click();

  const handle = page.getByRole('button', { name: 'Parabola vertex' });
  await expect(handle).toBeAttached();

  const bSlider = page.getByRole('slider', { name: 'b', exact: true });
  const before = Number(await bSlider.inputValue());

  await handle.focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Shift+ArrowRight');

  const after = Number(await bSlider.inputValue());
  expect(after).not.toBe(before);
  expect(errors).toEqual([]);
});
