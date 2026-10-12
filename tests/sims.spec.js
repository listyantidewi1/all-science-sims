import { test, expect } from '@playwright/test';
import { SIMS } from '../src/catalog/index.js';
import { trackErrors } from './helpers.js';

// One test per catalog entry: open the sim page, press Start, let it run a
// few frames, and fail on any uncaught exception or console.error. This is
// the safety net for "I changed a shared helper and broke twelve sims".
for (const sim of SIMS) {
  test(`${sim.subject}/${sim.id} starts and runs without errors`, async ({ page }) => {
    const errors = trackErrors(page);

    await page.goto(`/#/${sim.subject}/${sim.id}`);
    await expect(page.locator('h1')).toContainText(sim.title.en);

    await page.locator('.sim-start__btn').click();

    const stage = page.locator('.sim-stage');
    await expect(stage.locator('canvas, svg, .sim-controls').first()).toBeVisible({ timeout: 10_000 });
    await expect(stage).not.toContainText('Failed to load');

    // Let the animation loop tick a few times so runtime errors surface.
    await page.waitForTimeout(600);

    expect(errors).toEqual([]);
  });
}
