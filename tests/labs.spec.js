import { test, expect } from '@playwright/test';
import { SIMS } from '../src/catalog/index.js';
import { trackErrors } from './helpers.js';

// Every sim flagged hasLab must render a lab panel whose Record button
// either adds a row or, for labs that need the student to run a trial
// first, shows the panel's inline "needs data" flash on the button.
for (const sim of SIMS.filter((s) => s.hasLab)) {
  test(`${sim.subject}/${sim.id} lab panel responds to Record`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(`/#/${sim.subject}/${sim.id}`);
    await page.locator('.sim-start__btn').click();
    const lab = page.locator('.lab-panel');
    await expect(lab).toBeVisible({ timeout: 10_000 });
    // Grab the element first: on a "needs data" flash its label changes.
    const record = await lab.getByRole('button', { name: /record/i }).first().elementHandle();
    await record.click();
    await expect
      .poll(async () => {
        const rows = await lab.locator('tbody tr').count();
        const empty = await lab.locator('tbody').innerText();
        const flashed = await record.evaluate((b) => b.classList.contains('btn--error'));
        return (rows === 1 && !/No measurements yet/.test(empty)) || flashed;
      }, { timeout: 5_000 })
      .toBe(true);
    // The panel reports a throwing source() via console.error by design.
    expect(errors.filter((e) => !e.includes('Lab source() threw'))).toEqual([]);
  });
}
