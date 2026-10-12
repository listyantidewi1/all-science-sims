/**
 * Collect uncaught exceptions and console.error output for a page so a test
 * can assert the sim ran clean. Returns the (live) array of messages.
 */
export function trackErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}
