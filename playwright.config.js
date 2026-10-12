import { defineConfig } from '@playwright/test';

// Smoke tests run against the production build served by `vite preview`.
// `npm test` builds first (see the `pretest` script); CI builds explicitly.
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173/',
    browserName: 'chromium',
    viewport: { width: 1280, height: 800 },
    locale: 'en-US',
    // The service worker would otherwise cache assets across tests.
    serviceWorkers: 'block',
    // Point at an existing Chromium instead of the version Playwright downloads
    // (useful in sandboxes that pre-install a browser).
    ...(process.env.PW_CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
      : {}),
  },
  webServer: {
    command: 'npx vite preview --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
