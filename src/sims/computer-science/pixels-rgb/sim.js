import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const DEPTHS = {
  '1': { bits: 1, name: { en: '1-bit (black & white)', id: '1-bit (hitam & putih)' }, colours: 2 },
  '8': { bits: 8, name: { en: '8-bit greyscale', id: 'Abu-abu 8-bit' }, colours: 256 },
  '24': { bits: 24, name: { en: '24-bit colour', id: 'Warna 24-bit' }, colours: 16777216 },
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const hex2 = (v) => v.toString(16).toUpperCase().padStart(2, '0');
const bin8 = (v) => v.toString(2).padStart(8, '0');
const lum = (r, g, b) => Math.round(0.299 * r + 0.587 * g + 0.114 * b);

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';

  const state = {
    n: 16,
    img: null,          // Uint8Array n*n*3, always stored as RGB
    depth: '24',
    r: 255, g: 215, b: 0,
    pick: false,
    hover: null,        // {x, y} pixel under pointer / last painted
    painting: false,
    bg: [20, 28, 46],
  };

  function newImage(n, fill = state.bg) {
    const a = new Uint8Array(n * n * 3);
    for (let i = 0; i < n * n; i++) { a[i * 3] = fill[0]; a[i * 3 + 1] = fill[1]; a[i * 3 + 2] = fill[2]; }
    return a;
  }
  function resample(src, from, to) {
    const out = new Uint8Array(to * to * 3);
    for (let y = 0; y < to; y++) for (let x = 0; x < to; x++) {
      const sx = Math.floor(x * from / to), sy = Math.floor(y * from / to);
      const si = (sy * from + sx) * 3, di = (y * to + x) * 3;
      out[di] = src[si]; out[di + 1] = src[si + 1]; out[di + 2] = src[si + 2];
    }
    return out;
  }
  function setPixel(x, y, r, g, b) {
    if (x < 0 || y < 0 || x >= state.n || y >= state.n) return;
    const i = (y * state.n + x) * 3;
    state.img[i] = r; state.img[i + 1] = g; state.img[i + 2] = b;
  }
  function getPixel(img, n, x, y) {
    const i = (y * n + x) * 3;
    return [img[i], img[i + 1], img[i + 2]];
  }
  // How a stored RGB pixel is shown at the chosen bit depth.
  function shown(r, g, b, depth = state.depth) {
    if (depth === '24') return [r, g, b];
    const L = lum(r, g, b);
    if (depth === '8') return [L, L, L];
    const v = L > 127 ? 255 : 0;
    return [v, v, v];
  }
  const css = ([r, g, b]) => `rgb(${r},${g},${b})`;

  function presetSmiley() {
    const n = state.n;
    state.img = newImage(n, state.bg);
    const c = (n - 1) / 2, R = n * 0.42;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const d = Math.hypot(x - c, y - c);
      if (d <= R) setPixel(x, y, 255, 215, 0);
      // eyes
      const ex = n * 0.18, ey = n * 0.12, er = Math.max(0.6, n * 0.06);
      if (Math.hypot(x - (c - ex), y - (c - ey)) <= er || Math.hypot(x - (c + ex), y - (c - ey)) <= er) setPixel(x, y, 20, 24, 40);
      // mouth: lower arc
      const ang = Math.atan2(y - c, x - c);
      if (Math.abs(d - R * 0.6) <= Math.max(0.5, n * 0.04) && ang > 0.45 && ang < Math.PI - 0.45) setPixel(x, y, 200, 40, 40);
    }
  }
  function presetGradient() {
    const n = state.n;
    state.img = newImage(n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      setPixel(x, y, Math.round(255 * x / (n - 1)), Math.round(255 * y / (n - 1)), Math.round(255 * (1 - x / (n - 1)) * (1 - y / (n - 1))));
    }
  }

  // ---------- layout ----------
  function layout() {
    const W = cv.width, H = cv.height;
    const pad = W * 0.02;
    const gs = Math.min(H * 0.84, W * 0.5);
    const gx = pad, gy = H * 0.09;
    const px = gx + gs + pad * 1.5, pw = W - px - pad;
    return { W, H, pad, gs, gx, gy, px, pw, cell: gs / state.n };
  }

  // ---------- drawing ----------
  function draw() {
    const ctx = cv.ctx;
    const g = layout();
    const { W, H } = g;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const fs = clamp(W * 0.0155, 8, 15);
    const mono = `${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    const sans = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textBaseline = 'middle';

    // title over grid
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${fs}px system-ui, sans-serif`;
    const n = state.n;
    ctx.fillText(`${T('Canvas', 'Kanvas')} ${n}×${n} = ${n * n} ${T('pixels', 'piksel')}  ·  ${T(DEPTHS[state.depth].name.en, DEPTHS[state.depth].name.id)}`, g.gx, g.gy * 0.5);

    // grid
    const c = g.cell;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const [r, gg, b] = getPixel(state.img, n, x, y);
      ctx.fillStyle = css(shown(r, gg, b));
      ctx.fillRect(g.gx + x * c, g.gy + y * c, c, c);
    }
    if (c >= 10) {
      ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        ctx.moveTo(g.gx + i * c, g.gy); ctx.lineTo(g.gx + i * c, g.gy + g.gs);
        ctx.moveTo(g.gx, g.gy + i * c); ctx.lineTo(g.gx + g.gs, g.gy + i * c);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.strokeRect(g.gx, g.gy, g.gs, g.gs);
    if (state.hover) {
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
      ctx.strokeRect(g.gx + state.hover.x * c, g.gy + state.hover.y * c, c, c);
    }
    ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(state.pick ? T('Tap a pixel to read its colour', 'Sentuh piksel untuk membaca warnanya') : T('Drag to paint with the mixed colour', 'Seret untuk melukis dengan warna campuran'), g.gx, g.gy + g.gs + fs * 1.1);

    // ---------- right panel ----------
    const px = g.px, pw = g.pw;
    let y = g.gy * 0.5;
    const lh = fs * 1.5;
    const section = (label) => { ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${fs}px system-ui, sans-serif`; ctx.textAlign = 'left'; ctx.fillText(label, px, y); y += lh; };

    // Colour mixer
    section(T('Colour mixer: one pixel = three numbers', 'Pencampur warna: satu piksel = tiga angka'));
    const sw = fs * 3.4;
    ctx.fillStyle = css([state.r, state.g, state.b]);
    ctx.fillRect(px, y - lh * 0.1, sw, lh * 3.1);
    ctx.strokeStyle = '#f1f5f9'; ctx.lineWidth = 1.5; ctx.strokeRect(px, y - lh * 0.1, sw, lh * 3.1);
    const bx = px + sw + fs * 0.8, barW = Math.max(20, pw - sw - fs * 0.8 - fs * 15.5);
    const chans = [['R', state.r, '#ef4444'], ['G', state.g, '#22c55e'], ['B', state.b, '#3b82f6']];
    chans.forEach(([k, v, col], i) => {
      const yy = y + i * lh;
      ctx.fillStyle = 'rgba(148,163,184,0.15)'; ctx.fillRect(bx, yy - lh * 0.3, barW, lh * 0.6);
      ctx.fillStyle = col; ctx.fillRect(bx, yy - lh * 0.3, barW * v / 255, lh * 0.6);
      ctx.fillStyle = '#e2e8f0'; ctx.font = mono; ctx.textAlign = 'left';
      ctx.fillText(`${k} ${String(v).padStart(3, ' ')}  ${hex2(v)}  ${bin8(v)}`, bx + barW + fs * 0.6, yy);
    });
    y += lh * 3.3;
    ctx.fillStyle = '#fde68a'; ctx.font = `700 ${fs * 1.05}px ui-monospace, monospace`;
    ctx.fillText(`#${hex2(state.r)}${hex2(state.g)}${hex2(state.b)}`, px, y);
    ctx.fillStyle = '#cbd5e1'; ctx.font = mono;
    ctx.fillText(`= rgb(${state.r}, ${state.g}, ${state.b})  ·  24 bit`, px + fs * 5.2, y);
    y += lh * 1.3;

    // Zoom: selected pixel as stored at this bit depth
    const hv = state.hover || { x: Math.floor(n / 2), y: Math.floor(n / 2) };
    const [pr, pg, pb] = getPixel(state.img, n, hv.x, hv.y);
    section(`${T('Zoom: pixel', 'Perbesar: piksel')} (${hv.x}, ${hv.y}) ${T('as stored at', 'seperti disimpan pada')} ${DEPTHS[state.depth].bits} bit`);
    const zs = lh * 2.3;
    ctx.fillStyle = css(shown(pr, pg, pb));
    ctx.fillRect(px, y - lh * 0.1, zs, zs);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.strokeRect(px, y - lh * 0.1, zs, zs);
    ctx.font = mono; ctx.textAlign = 'left';
    const zx = px + zs + fs * 0.8;
    if (state.depth === '24') {
      ctx.fillStyle = '#fca5a5'; ctx.fillText(`R ${String(pr).padStart(3, ' ')} = ${bin8(pr)}`, zx, y + lh * 0.2);
      ctx.fillStyle = '#86efac'; ctx.fillText(`G ${String(pg).padStart(3, ' ')} = ${bin8(pg)}`, zx, y + lh * 1.0);
      ctx.fillStyle = '#93c5fd'; ctx.fillText(`B ${String(pb).padStart(3, ' ')} = ${bin8(pb)}`, zx, y + lh * 1.8);
    } else if (state.depth === '8') {
      const L = lum(pr, pg, pb);
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(`${T('grey', 'abu-abu')} ${L} = ${bin8(L)}`, zx, y + lh * 0.5);
      ctx.fillStyle = '#94a3b8'; ctx.fillText(T('1 byte: 256 shades', '1 byte: 256 tingkat'), zx, y + lh * 1.4);
    } else {
      const bit = lum(pr, pg, pb) > 127 ? 1 : 0;
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(`${T('bit', 'bit')} = ${bit}  (${bit ? T('white', 'putih') : T('black', 'hitam')})`, zx, y + lh * 0.5);
      ctx.fillStyle = '#94a3b8'; ctx.fillText(T('1 bit: only 2 values', '1 bit: hanya 2 nilai'), zx, y + lh * 1.4);
    }
    y += zs + lh * 0.6;

    // File size
    const bits = n * n * DEPTHS[state.depth].bits, bytes = bits / 8;
    section(T('Raw file size', 'Ukuran berkas mentah'));
    ctx.fillStyle = '#e2e8f0'; ctx.font = mono;
    ctx.fillText(`${n} × ${n} × ${DEPTHS[state.depth].bits} bit = ${bits.toLocaleString()} bit = ${bytes.toLocaleString()} ${T('bytes', 'byte')}${bytes >= 1024 ? ` = ${(bytes / 1024).toFixed(1)} KB` : ''}`, px, y);
    y += lh;
    ctx.fillStyle = '#94a3b8'; ctx.font = sans;
    ctx.fillText(`${T('Possible colours', 'Warna yang mungkin')}: ${DEPTHS[state.depth].colours.toLocaleString()}  ·  Full HD 1920×1080 @ ${DEPTHS[state.depth].bits} bit = ${(1920 * 1080 * DEPTHS[state.depth].bits / 8 / 1e6).toFixed(1)} MB`, px, y);
    y += lh * 1.3;

    // Resolution comparison: the same picture at 8 / 16 / 32
    section(T('Same picture, three resolutions', 'Gambar sama, tiga resolusi'));
    const sizes = [8, 16, 32];
    const thumb = Math.min((pw - fs * 2) / 3, H - y - lh * 2.2, lh * 4.5);
    if (thumb > 12) {
      sizes.forEach((s, i) => {
        const tx = px + i * (thumb + fs);
        const im = s === n ? state.img : resample(state.img, n, s);
        const tc = thumb / s;
        for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) {
          const [r, gg, b] = getPixel(im, s, xx, yy);
          ctx.fillStyle = css(shown(r, gg, b));
          ctx.fillRect(tx + xx * tc, y + yy * tc, tc + 0.5, tc + 0.5);
        }
        ctx.strokeStyle = s === n ? '#fbbf24' : '#475569'; ctx.lineWidth = s === n ? 2 : 1;
        ctx.strokeRect(tx, y, thumb, thumb);
        ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs * 0.85}px ui-monospace, monospace`; ctx.textAlign = 'center';
        ctx.fillText(`${s}×${s} · ${(s * s * DEPTHS[state.depth].bits / 8).toLocaleString()} B`, tx + thumb / 2, y + thumb + fs * 0.8);
      });
    }
    ctx.textAlign = 'left';
  }

  // ---------- pointer painting ----------
  function pixelAt(e) {
    const r = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) * (cv.width / r.width), y = (e.clientY - r.top) * (cv.height / r.height);
    const g = layout();
    const px = Math.floor((x - g.gx) / g.cell), py = Math.floor((y - g.gy) / g.cell);
    if (px < 0 || py < 0 || px >= state.n || py >= state.n) return null;
    return { x: px, y: py };
  }
  function apply(p) {
    if (!p) return;
    state.hover = p;
    if (state.pick) {
      const [r, g, b] = getPixel(state.img, state.n, p.x, p.y);
      rS.value = r; gS.value = g; bS.value = b;
      state.r = r; state.g = g; state.b = b;
    } else setPixel(p.x, p.y, state.r, state.g, state.b);
  }
  const onDown = (e) => { const p = pixelAt(e); if (!p) return; e.preventDefault(); state.painting = true; try { cv.canvas.setPointerCapture(e.pointerId); } catch {} apply(p); };
  const onMove = (e) => { const p = pixelAt(e); if (state.painting) { if (p && !state.pick) apply(p); } else if (p) state.hover = p; };
  const onUp = () => { state.painting = false; };
  cv.canvas.addEventListener('pointerdown', onDown);
  cv.canvas.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  cv.canvas.style.cursor = 'crosshair';

  // Keyboard access: arrow keys move the highlighted pixel, Enter/Space paints or picks.
  cv.canvas.tabIndex = 0;
  cv.canvas.setAttribute('role', 'application');
  cv.canvas.setAttribute('aria-label', 'Pixel canvas: arrow keys move, Enter paints');
  const onKey = (e) => {
    const h = state.hover || { x: 0, y: 0 };
    let dx = 0, dy = 0;
    if (e.key === 'ArrowLeft') dx = -1; else if (e.key === 'ArrowRight') dx = 1;
    else if (e.key === 'ArrowUp') dy = -1; else if (e.key === 'ArrowDown') dy = 1;
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); apply(h); return; }
    else return;
    e.preventDefault();
    state.hover = { x: clamp(h.x + dx, 0, state.n - 1), y: clamp(h.y + dy, 0, state.n - 1) };
  };
  cv.canvas.addEventListener('keydown', onKey);

  // ---------- controls ----------
  const sizeSel = select({
    label: 'Canvas size', key: 'size',
    options: [{ value: '8', label: '8 × 8' }, { value: '16', label: '16 × 16' }, { value: '32', label: '32 × 32' }],
    value: String(state.n),
    onChange: (v) => { const n = Number(v); state.img = resample(state.img, state.n, n); state.n = n; state.hover = null; },
  });
  const depthSel = select({
    label: 'Bit depth', key: 'depth',
    options: Object.entries(DEPTHS).map(([k, d]) => ({ value: k, label: d.name.en })),
    value: state.depth,
    onChange: (v) => { state.depth = v; },
  });
  const fmt = (v) => `${v}  (${hex2(v)} · ${bin8(v)})`;
  const rS = slider({ label: 'Red', key: 'r', min: 0, max: 255, step: 1, value: state.r, format: fmt, onInput: (v) => { state.r = v; } });
  const gS = slider({ label: 'Green', key: 'g', min: 0, max: 255, step: 1, value: state.g, format: fmt, onInput: (v) => { state.g = v; } });
  const bS = slider({ label: 'Blue', key: 'b', min: 0, max: 255, step: 1, value: state.b, format: fmt, onInput: (v) => { state.b = v; } });
  const pickT = toggle({ label: 'Pick colour from pixel', key: 'pick', value: false, onChange: (v) => { state.pick = v; cv.canvas.style.cursor = v ? 'copy' : 'crosshair'; } });
  const fillB = button({ label: 'Fill all', onClick: () => { for (let i = 0; i < state.n * state.n; i++) setPixel(i % state.n, Math.floor(i / state.n), state.r, state.g, state.b); } });
  const clearB = button({ label: 'Clear', onClick: () => { state.img = newImage(state.n); } });
  const smileB = button({ label: 'Smiley', onClick: presetSmiley });
  const gradB = button({ label: 'Gradient', onClick: presetGradient });
  ctrlPanel.append(sizeSel.el, depthSel.el, rS.el, gS.el, bS.el, row(pickT, fillB, clearB), row(smileB, gradB));

  const lab = labPanel({
    title: 'Image size lab',
    filename: 'pixels-rgb-data.csv',
    columns: [
      { key: 'size', label: 'Size' },
      { key: 'pixels', label: 'Pixels' },
      { key: 'depth', label: 'Bit depth' },
      { key: 'bits', label: 'Bits' },
      { key: 'bytes', label: 'Bytes' },
      { key: 'colours', label: 'Colours possible' },
    ],
    procedure: [
      'Set 8 × 8 and 24-bit. Record. Then 16 × 16 and 32 × 32 at 24-bit. Record each.',
      'Keep 32 × 32 and record at 8-bit grey and at 1-bit.',
      'Compare rows: what happens to bytes when the side doubles? When bit depth drops from 24 to 8?',
      'Paint a picture, switch to 1-bit and describe what was lost.',
    ],
    predict: 'If 8 × 8 at 24-bit is 192 bytes, how many bytes will 32 × 32 at 24-bit be?',
    source: () => {
      const d = DEPTHS[state.depth];
      const pixels = state.n * state.n;
      return { size: `${state.n}×${state.n}`, pixels, depth: `${d.bits}-bit`, bits: pixels * d.bits, bytes: pixels * d.bits / 8, colours: d.colours };
    },
  });
  ctrlPanel.appendChild(lab.el);

  state.img = newImage(state.n);
  presetSmiley();

  const animator = loop(() => draw());
  animator.start();
  return () => {
    animator.stop();
    cv.canvas.removeEventListener('pointerdown', onDown);
    cv.canvas.removeEventListener('pointermove', onMove);
    cv.canvas.removeEventListener('keydown', onKey);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    cv.destroy();
  };
}
