import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Factors and Multiples (FPB & KPK), grades 5-6.
// Top: a 1-120 strip with the multiples of a and b; common multiples glow, the LCM is ringed.
// Bottom-left: factor tiles with common factors highlighted and the GCD ringed.
// Bottom-right: prime factor trees for a and b.
const T = (en, id) => (getLocale() === 'id' ? id : en);
const STRIP_MAX = 120, COLS = 20, ROWS = 6;
const COL_A = '#38bdf8', COL_B = '#fb923c', COL_BOTH = '#34d399', COL_MARK = '#facc15';

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
function factorsOf(n) { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; }
function primeFactors(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
  if (m > 1) out.push(m);
  return out;
}
// comb-shaped factor tree: [value, primeChild, restChild] or [prime]
function tree(n) {
  if (n < 2) return [n];
  const pf = primeFactors(n);
  if (pf.length === 1) return [n];
  return [n, [pf[0]], tree(n / pf[0])];
}

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const nums = { a: 6, b: 8 };
  const state = { now: 0, reveal: 0, key: '' };
  const font = (s, bold = false) => `${bold ? 'bold ' : ''}${Math.max(8, Math.round(s))}px system-ui, -apple-system, Roboto, sans-serif`;

  function compute() {
    const { a, b } = nums;
    return { a, b, g: gcd(a, b), l: lcm(a, b), fa: factorsOf(a), fb: factorsOf(b), pa: primeFactors(a), pb: primeFactors(b) };
  }

  function drawStrip(ctx, W, H, m) {
    const { a, b, l } = m;
    const mx = W * 0.02;
    const cell = Math.min((W - 2 * mx) / COLS, (H * 0.4) / ROWS);
    const sx = (W - COLS * cell) / 2, sy = H * 0.09;
    const pulse = 0.55 + 0.45 * Math.sin(state.now * 4);
    // title + legend
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    const ts = Math.min(H * 0.04, W * 0.022);
    ctx.font = font(ts, true);
    let x = sx;
    const y = H * 0.05;
    const legend = (color, txt) => {
      ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x, y - ts * 0.4, ts * 0.8, ts * 0.8, 3); ctx.fill();
      x += ts * 1.1;
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(txt, x, y);
      x += ctx.measureText(txt).width + ts * 1.4;
    };
    legend(COL_A, T(`multiples of ${a}`, `kelipatan ${a}`));
    legend(COL_B, T(`multiples of ${b}`, `kelipatan ${b}`));
    legend(COL_BOTH, T('both', 'keduanya'));
    ctx.textAlign = 'center';
    ctx.font = font(cell * 0.42, true);
    const shown = Math.floor(state.reveal);
    for (let n = 1; n <= STRIP_MAX; n++) {
      const c = (n - 1) % COLS, r = Math.floor((n - 1) / COLS);
      const cx = sx + c * cell, cy = sy + r * cell;
      const isA = n % a === 0, isB = n % b === 0;
      const lit = n <= shown;
      let fill = '#111c33', text = '#94a3b8';
      if (lit && isA && isB) { fill = COL_BOTH; text = '#052e16'; }
      else if (lit && isA) { fill = COL_A; text = '#0c4a6e'; }
      else if (lit && isB) { fill = COL_B; text = '#7c2d12'; }
      ctx.fillStyle = fill;
      ctx.beginPath(); ctx.roundRect(cx + 1, cy + 1, cell - 2, cell - 2, 3); ctx.fill();
      if (lit && isA && isB) {
        ctx.strokeStyle = `rgba(110,231,183,${pulse})`; ctx.lineWidth = Math.max(2, cell * 0.12);
        ctx.beginPath(); ctx.roundRect(cx + 1, cy + 1, cell - 2, cell - 2, 3); ctx.stroke();
      }
      ctx.fillStyle = text;
      ctx.fillText(String(n), cx + cell / 2, cy + cell / 2);
      if (lit && n === l) {
        ctx.strokeStyle = COL_MARK; ctx.lineWidth = Math.max(3, cell * 0.14);
        ctx.beginPath(); ctx.roundRect(cx - 1, cy - 1, cell + 2, cell + 2, 4); ctx.stroke();
      }
    }
    // LCM caption under the strip
    const by = sy + ROWS * cell + H * 0.035;
    ctx.font = font(ts, true); ctx.textAlign = 'center';
    if (l <= STRIP_MAX) {
      ctx.fillStyle = COL_MARK;
      ctx.fillText(T(`First number in both colours: ${l} = LCM (KPK)`, `Bilangan pertama dengan dua warna: ${l} = KPK`), W / 2, by);
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(T(`No common multiple up to 120. The LCM is ${l}, further along the strip.`, `Tidak ada kelipatan persekutuan sampai 120. KPK-nya ${l}, jauh di luar pita.`), W / 2, by);
    }
    return sy + ROWS * cell + H * 0.07;
  }

  function drawFactors(ctx, W, H, m, top) {
    const { a, b, g, fa, fb } = m;
    const x0 = W * 0.03, areaW = W * 0.52;
    const bottom = H * 0.98;
    const rowH = (bottom - top) / 4;
    const ts = Math.min(rowH * 0.32, W * 0.02);
    const tile = Math.min(areaW / 12.6, rowH * 0.62);
    const common = new Set(fa.filter((f) => fb.includes(f)));
    const drawRow = (label, list, color, y) => {
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = color; ctx.font = font(ts, true);
      ctx.fillText(label, x0, y - rowH * 0.3);
      ctx.font = font(tile * 0.42, true); ctx.textAlign = 'center';
      list.forEach((f, i) => {
        const tx = x0 + i * (tile * 1.05), ty = y + rowH * 0.05;
        const isCommon = common.has(f);
        ctx.fillStyle = isCommon ? COL_BOTH : 'rgba(255,255,255,0.08)';
        ctx.beginPath(); ctx.roundRect(tx, ty - tile * 0.35, tile, tile * 0.7, 5); ctx.fill();
        if (!isCommon) { ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke(); }
        if (f === g) { ctx.strokeStyle = COL_MARK; ctx.lineWidth = Math.max(2.5, tile * 0.09); ctx.stroke(); }
        ctx.fillStyle = isCommon ? '#052e16' : '#e2e8f0';
        ctx.fillText(String(f), tx + tile / 2, ty);
      });
    };
    drawRow(T(`Factors of ${a}`, `Faktor dari ${a}`), fa, COL_A, top + rowH * 0.55);
    drawRow(T(`Factors of ${b}`, `Faktor dari ${b}`), fb, COL_B, top + rowH * 1.6);
    // GCD / LCM readout
    const ry = top + rowH * 2.75;
    const bs = Math.min(rowH * 0.7, W * 0.035);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#94a3b8'; ctx.font = font(ts);
    ctx.fillText(T('Biggest shared factor', 'Faktor persekutuan terbesar'), x0, ry - bs * 0.75);
    ctx.fillStyle = COL_MARK; ctx.font = font(bs, true);
    const gTxt = T(`GCD (FPB) = ${g}`, `FPB = ${g}`);
    ctx.fillText(gTxt, x0, ry + bs * 0.15);
    const lx = x0 + Math.max(ctx.measureText(gTxt).width + bs * 0.9, areaW * 0.5);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(ts);
    ctx.fillText(T('Smallest shared multiple', 'Kelipatan persekutuan terkecil'), lx, ry - bs * 0.75);
    ctx.fillStyle = COL_BOTH; ctx.font = font(bs, true);
    ctx.fillText(T(`LCM (KPK) = ${m.l}`, `KPK = ${m.l}`), lx, ry + bs * 0.15);
    ctx.fillStyle = '#64748b'; ctx.font = font(ts * 0.85);
    ctx.fillText(T(`check: ${a} × ${b} = ${a * b} = ${g} × ${m.l}`, `cek: ${a} × ${b} = ${a * b} = ${g} × ${m.l}`), x0, ry + bs * 1.05);
  }

  function drawTree(ctx, root, x, y, dx, dy, r, color, depthLeft) {
    const [val, prime, rest] = root;
    const leaf = !prime;
    if (!leaf && depthLeft > 0) {
      ctx.strokeStyle = 'rgba(203,213,225,0.6)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - dx, y + dy); ctx.moveTo(x, y); ctx.lineTo(x + dx, y + dy); ctx.stroke();
      drawTree(ctx, prime, x - dx, y + dy, dx, dy, r, color, depthLeft - 1);
      drawTree(ctx, rest, x + dx, y + dy, dx, dy, r, color, depthLeft - 1);
    }
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    if (leaf) { ctx.fillStyle = color; ctx.fill(); ctx.fillStyle = '#0b1220'; }
    else { ctx.fillStyle = '#0b1220'; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#e2e8f0'; }
    ctx.font = font(r * (val >= 10 ? 0.95 : 1.15), true);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(val), x, y);
  }

  function drawTrees(ctx, W, H, m, top) {
    const { a, b, pa, pb } = m;
    const x0 = W * 0.58, areaW = W * 0.40;
    const bottom = H * 0.98;
    const ts = Math.min((bottom - top) * 0.09, W * 0.02);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(ts, true);
    ctx.fillText(T('Prime factor trees', 'Pohon faktor prima'), x0, top + ts * 0.6);
    const treeTop = top + ts * 2.2, treeH = bottom - treeTop - ts * 2.2;
    const half = areaW / 2;
    const draw = (n, root, color, cx, pf) => {
      const depth = Math.max(1, pf.length - 1);
      const levels = depth + 1;
      const dy = treeH / levels;
      const dx = Math.min(half / (levels + 1.5), dy * 0.9);
      const r = Math.min(dy * 0.36, dx * 0.75, ts * 1.1);
      const rootX = cx - (depth - 1) * dx / 2;
      drawTree(ctx, root, rootX, treeTop + r, dx, dy, r, color, depth);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = color; ctx.font = font(ts, true);
      const txt = pf.length > 1 ? `${n} = ${pf.join(' × ')}` : T(`${n} is prime`, `${n} bilangan prima`);
      ctx.fillText(txt, cx, bottom - ts * 0.8);
    };
    draw(a, tree(a), COL_A, x0 + half * 0.5, pa);
    draw(b, tree(b), COL_B, x0 + half * 1.5, pb);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const m = compute();
    const key = `${m.a},${m.b}`;
    if (key !== state.key) { state.key = key; state.reveal = 0; }
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const top = drawStrip(ctx, W, H, m);
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W * 0.03, top - H * 0.015); ctx.lineTo(W * 0.97, top - H * 0.015); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W * 0.555, top); ctx.lineTo(W * 0.555, H * 0.97); ctx.stroke();
    drawFactors(ctx, W, H, m, top);
    drawTrees(ctx, W, H, m, top);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ---- controls ---------------------------------------------------------------
  const mk = (label, key) => {
    const s = slider({ label, key, min: 2, max: 60, step: 1, value: nums[key], onInput: (v) => { nums[key] = v; } });
    s.el.querySelector('input').style.minHeight = '44px';
    return s;
  };
  const sa = mk(T('First number', 'Bilangan pertama'), 'a');
  const sb = mk(T('Second number', 'Bilangan kedua'), 'b');
  const rnd = bigBtn(T('Surprise me', 'Acak'), () => {
    sa.apply(2 + Math.floor(Math.random() * 23));
    sb.apply(2 + Math.floor(Math.random() * 23));
  }, true);
  const swap = bigBtn(T('Swap', 'Tukar'), () => { const a = nums.a; sa.apply(nums.b); sb.apply(a); });
  ctrlPanel.append(sa.el, sb.el, row(rnd, swap));

  const lab = labPanel({
    title: 'GCD and LCM table',
    filename: 'factors-multiples-data.csv',
    columns: [
      { key: 'a', label: 'First number' },
      { key: 'b', label: 'Second number' },
      { key: 'gcd', label: 'GCD (FPB)' },
      { key: 'lcm', label: 'LCM (KPK)' },
    ],
    procedure: [
      'Set the numbers to 6 and 8. Find the first green number on the strip, then press Record.',
      'Try 4 and 12. Which one is the LCM? Which one is the GCD? Record.',
      'Try two prime numbers, like 5 and 7. Record. What do you notice about the GCD and the LCM?',
      'Try 12 and 18. Record. Check that first number × second number = GCD × LCM.',
    ],
    predict: 'If two numbers share no factor except 1, what will their LCM be?',
    source: () => { const m = compute(); return { a: m.a, b: m.b, gcd: m.g, lcm: m.l }; },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => {
    state.now = t;
    if (state.reveal < STRIP_MAX) state.reveal = Math.min(STRIP_MAX, state.reveal + 90 * dt);
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
