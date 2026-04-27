/**
 * createCanvas — DPR-aware canvas with auto-resize.
 * Returns { canvas, ctx, width, height, destroy }.
 * width/height are CSS pixels; the underlying buffer is scaled by devicePixelRatio.
 * Pass `aspect` (e.g. 16/9) to maintain a ratio inside the parent.
 */
export function createCanvas(parent, { aspect = null } = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.display = 'block';
  parent.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const state = { canvas, ctx, width: 0, height: 0, destroy: null };

  const resize = () => {
    const cssW = parent.clientWidth || 600;
    const cssH = aspect ? Math.round(cssW / aspect) : (parent.clientHeight || Math.round(cssW * 0.6));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.width = cssW;
    state.height = cssH;
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  state.destroy = () => {
    ro.disconnect();
    canvas.remove();
  };
  return state;
}

/**
 * loop — requestAnimationFrame loop with delta-time, pause/resume, and reduced-motion respect.
 * step(dt, t) is called every frame with seconds since last frame and seconds since start.
 */
export function loop(step) {
  let raf = 0;
  let last = 0;
  let start = 0;
  let running = false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const frame = (ts) => {
    if (!running) return;
    if (!last) { last = ts; start = ts; }
    const dt = Math.min(0.05, (ts - last) / 1000);
    const t = (ts - start) / 1000;
    last = ts;
    step(dt, t);
    raf = requestAnimationFrame(frame);
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      last = 0;
    },
    isRunning() { return running; },
    reduceMotion: reduce,
  };
}
