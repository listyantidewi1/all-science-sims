import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 7 });

  const params = { width: 8, value: 0n };
  let bitRects = [];

  function setWidth(w) {
    params.width = w;
    const max = (1n << BigInt(w)) - 1n;
    if (params.value > max) params.value = max;
  }
  function bitOn(i) { return (params.value >> BigInt(i)) & 1n; }
  function toggleBit(i) {
    const mask = 1n << BigInt(i);
    params.value ^= mask;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30;
    const cellW = (W - padX * 2) / params.width;
    const bitsY = H * 0.4;
    const bitsH = Math.min(80, cellW * 0.8);
    bitRects = [];

    // Place-value labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = `bold ${Math.max(9, Math.min(14, cellW * 0.2))}px var(--font-mono)`;
    ctx.textAlign = 'center';
    for (let i = 0; i < params.width; i++) {
      const idx = params.width - 1 - i;
      const x = padX + i * cellW + cellW / 2;
      const placeVal = 1n << BigInt(idx);
      ctx.fillText(`2^${idx}`, x, bitsY - 36);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(placeVal.toString(), x, bitsY - 18);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
    }
    ctx.textAlign = 'left';

    // Bit cells
    for (let i = 0; i < params.width; i++) {
      const idx = params.width - 1 - i;
      const x = padX + i * cellW;
      const r = { x: x + 6, y: bitsY, w: cellW - 12, h: bitsH, idx };
      bitRects.push(r);
      const on = bitOn(idx);
      ctx.fillStyle = on ? '#10b981' : 'rgba(120,130,150,0.18)';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = on ? '#fff' : 'rgba(120,130,150,0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.min(36, cellW * 0.5)}px var(--font-mono)`;
      ctx.textAlign = 'center';
      ctx.fillText(String(on), r.x + r.w / 2, r.y + r.h / 2 + 12);
      ctx.textAlign = 'left';
    }

    // Decimal + hex display
    const dec = params.value.toString();
    const hex = params.value.toString(16).toUpperCase().padStart(Math.ceil(params.width / 4), '0');
    const bin = params.value.toString(2).padStart(params.width, '0');

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Decimal:    ${dec}`, 16, 28);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Hex:        0x${hex}`, 16, 48);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`Binary:     ${bin}`, 16, 66);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click any bit to toggle it · max value = 2^N − 1', padX, H - 12);
  }

  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    for (const r of bitRects) {
      if (sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h) {
        toggleBit(r.idx);
        return;
      }
    }
  });

  // controls
  const widthSel = select({
    label: 'Bit width',
    options: [{ value: '4', label: '4-bit (nibble)' }, { value: '8', label: '8-bit (byte)' }, { value: '16', label: '16-bit' }, { value: '32', label: '32-bit' }],
    value: String(params.width),
    onChange: (v) => { setWidth(Number(v)); },
  });
  const decInput = document.createElement('input');
  decInput.type = 'number';
  decInput.placeholder = 'enter decimal';
  decInput.style.cssText = 'padding: 8px 12px; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-surface-2); color: var(--color-fg); font-family: var(--font-mono);';
  decInput.addEventListener('input', () => {
    const n = BigInt(decInput.value || '0');
    const max = (1n << BigInt(params.width)) - 1n;
    params.value = n < 0n ? 0n : (n > max ? max : n);
  });
  const allOnB = button({ label: 'All 1s', onClick: () => { params.value = (1n << BigInt(params.width)) - 1n; } });
  const allOffB = button({ label: 'Clear', onClick: () => { params.value = 0n; } });
  const incB = button({ label: '+1', primary: true, onClick: () => {
    const max = (1n << BigInt(params.width)) - 1n;
    params.value = params.value === max ? 0n : params.value + 1n;
  } });

  ctrlPanel.append(widthSel.el, decInput, row(allOnB, allOffB, incB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
