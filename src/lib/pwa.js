// PWA glue: register the service worker (in production only) and capture
// the beforeinstallprompt event so the header can offer an Install button.

let deferredPrompt = null;
const promptListeners = new Set();

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  // Skip in dev — Vite's HMR + a caching SW make a mess of each other.
  if (import.meta.env && import.meta.env.DEV) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

export function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    promptListeners.forEach((fn) => { try { fn(true); } catch {} });
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    promptListeners.forEach((fn) => { try { fn(false); } catch {} });
  });
}

export function isInstallable() { return deferredPrompt != null; }

export function onInstallableChange(fn) {
  promptListeners.add(fn);
  return () => promptListeners.delete(fn);
}

export async function promptInstall() {
  if (!deferredPrompt) return false;
  const p = deferredPrompt;
  deferredPrompt = null;
  promptListeners.forEach((fn) => { try { fn(false); } catch {} });
  try {
    p.prompt();
    const choice = await p.userChoice;
    return choice && choice.outcome === 'accepted';
  } catch {
    return false;
  }
}
