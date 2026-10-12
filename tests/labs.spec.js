import { test, expect } from '@playwright/test';
import { SIMS } from '../src/catalog/index.js';
import { trackErrors } from './helpers.js';

// Every sim flagged hasLab must actually render a lab panel whose Record
// button adds a row, and no sim without the flag may render one.
for (const sim of SIMS.filter((s) => s.hasLab)) {
  test(`${sim.subject}/${sim.id} lab panel records a row`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(`/#/${sim.subject}/${sim.id}`);
    await page.locator('.sim-start__btn').click();
    const lab = page.locator('.lab-panel');
    await expect(lab).toBeVisible({ timeout: 10_000 });
    await lab.getByRole('button', { name: /record/i }).first().click();
    await expect(lab.locator('tbody')).not.toContainText('No measurements yet');
    await expect(lab.locator('tbody tr')).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}
