import { createCanvas } from '../../../lib/canvas.js';
import { slider, button, row, select } from '../../../lib/controls.js';

const W = 200;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    rule: 30,
    initial: 'single',  // 'single' | 'random'
  };

  let rows = [];

  function reset() {
    rows = [];
    const first = new Uint8Array(W);
    if (params.initial === 'single') first[Math.floor(W / 2)] = 1;
    else for (let i = 0; i < W; i++) first[i] = Math.random() < 0.5 ? 1 : 0;
    rows.push(first);
    runUntilFull();
  }
  function runUntilFull() {
    const target = Math.floor(cv.height);
    while (rows.length < target) {
      const cur = rows[rows.length - 1];
      const next = new Uint8Array(W);
      for (let i = 0; i < W; i++) {
        const left = cur[(i - 1 + W) % W];
        const center = cur[i];
        const right = cur[(i + 1) % W];
        const idx = (left << 2) | (center << 1) | right;
        next[i] = (params.rule >> idx) & 1;
      }
      rows.push(next);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const cw = cv.width / W;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, cv.width, cv.height);
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      for (let i = 0; i < W; i++) {
        if (row[i]) {
          ctx.fillStyle = '#a78bfa';
          ctx.fillRect(i * cw, r, cw + 1, 1);
        }
      }
    }
    // Bit-pattern visualization for current rule
    drawRuleHeader(ctx);
  }

  function drawRuleHeader(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(8, 8, cv.width - 16, 26);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Rule ${params.rule}`, 16, 26);
    // 8 mini patterns
    const startX = 90;
    const cellSize = 4;
    for (let pat = 7; pat >= 0; pat--) {
      const left = (pat >> 2) & 1;
      const center = (pat >> 1) & 1;
      const right = pat & 1;
      const out = (params.rule >> pat) & 1;
      const px = startX + (7 - pat) * 60;
      // top row of 3 cells
      ctx.fillStyle = left ? '#a78bfa' : '#1f2937';
      ctx.fillRect(px, 12, cellSize * 2, cellSize * 2);
      ctx.fillStyle = center ? '#a78bfa' : '#1f2937';
      ctx.fillRect(px + cellSize * 2, 12, cellSize * 2, cellSize * 2);
      ctx.fillStyle = right ? '#a78bfa' : '#1f2937';
      ctx.fillRect(px + cellSize * 4, 12, cellSize * 2, cellSize * 2);
      // output cell
      ctx.fillStyle = out ? '#10b981' : '#475569';
      ctx.fillRect(px + cellSize * 2, 22, cellSize * 2, cellSize * 2);
    }
  }

  // controls
  const ruleS = slider({
    label: 'Rule (0-255)', min: 0, max: 255, step: 1, value: params.rule,
    onInput: (v) => { params.rule = v; reset(); draw(); },
  });
  const initSel = select({
    label: 'Initial row',
    options: [{ value: 'single', label: 'Single ON cell' }, { value: 'random', label: 'Random' }],
    value: params.initial,
    onChange: (v) => { params.initial = v; reset(); draw(); },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const r of [30, 54, 60, 90, 110, 150, 184]) {
    const b = button({ label: `Rule ${r}`, onClick: () => { params.rule = r; ruleS.value = r; reset(); draw(); } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(ruleS.el, initSel.el, presetRow);

  reset();
  draw();

  // Redraw periodically so canvas resizes are handled (cheap — just paints from cached rows).
  let raf = 0;
  let lastH = cv.height;
  const tick = () => {
    if (cv.height !== lastH) { lastH = cv.height; reset(); }
    draw();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
