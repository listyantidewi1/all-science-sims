import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const COL_A = '#38bdf8', COL_B = '#f59e0b', COL_C = '#a855f7';

function bigSlider(opts) {
  const s = slider(opts);
  s.el.style.fontSize = '1rem';
  const input = s.el.querySelector('input');
  if (input) { input.style.minHeight = '44px'; input.style.cursor = 'pointer'; }
  return s;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const ctx = cv.ctx;

  const p = { rows: 6, cols: 4, split: 2, mode: 'array' };
  let now = 0, changedAt = 0;
  const touched = () => { changedAt = now; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const font = (px, bold = true) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;

  // scale of dot number k (0-based, drawn in reading order) as it pops in
  function popScale(k, total) {
    const age = now - changedAt;
    const delay = Math.min(0.6, total > 0 ? 0.9 / total : 0) * k;
    const u = clamp((age - delay) / 0.18, 0, 1);
    return u < 1 ? 1.25 * u - 0.25 * u * u * 1 : 1;
  }

  // Draw an array of rows×cols dots filling box (x, y, w, h); colorFn(r, c) → color
  function drawArray(x, y, w, h, rows, cols, colorFn, pop = true, labelRows = false) {
    const gap = Math.min(w / cols, h / rows);
    const aw = gap * cols, ah = gap * rows;
    const ox = x + (w - aw) / 2, oy = y + (h - ah) / 2;
    const r = gap * 0.36;
    let k = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const s = pop ? popScale(k, rows * cols) : 1;
        k++;
        if (s <= 0) continue;
        ctx.fillStyle = colorFn ? colorFn(i, j) : COL_A;
        ctx.beginPath(); ctx.arc(ox + gap * (j + 0.5), oy + gap * (i + 0.5), r * s, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (labelRows && gap > 14) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = font(Math.max(9, gap * 0.4), false);
      ctx.textAlign = 'right';
      for (let i = 0; i < rows; i++) ctx.fillText(String(i + 1), ox - gap * 0.3, oy + gap * (i + 0.5) + gap * 0.14);
      ctx.textAlign = 'center';
    }
    return { ox, oy, gap, aw, ah };
  }

  function bracketText(x1, x2, y, text, color) {
    // horizontal brace-like line with a label above
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.moveTo(x1, y - 5); ctx.lineTo(x1, y + 5); ctx.moveTo(x2, y - 5); ctx.lineTo(x2, y + 5); ctx.stroke();
    ctx.fillStyle = color; ctx.textAlign = 'center';
    ctx.fillText(text, (x1 + x2) / 2, y - 8);
  }

  function lines(x, y, items, fs, lh = 1.5) {
    ctx.textAlign = 'left';
    let yy = y;
    for (const it of items) {
      ctx.fillStyle = it.color || '#e2e8f0';
      ctx.font = font(it.size || fs, it.bold !== false);
      ctx.fillText(it.text, x, yy);
      yy += (it.size || fs) * lh;
    }
    ctx.textAlign = 'center';
    return yy;
  }

  function draw() {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const { rows, cols } = p;
    const N = rows * cols;
    const fs = Math.max(12, Math.min(W * 0.034, H * 0.07));
    const small = Math.max(10, fs * 0.62);
    ctx.textAlign = 'center';

    if (p.mode === 'array') {
      const box = { x: W * 0.05, y: H * 0.12, w: W * 0.5, h: H * 0.8 };
      const g = drawArray(box.x, box.y, box.w, box.h, rows, cols, null, true, true);
      ctx.font = font(small, false);
      bracketText(g.ox, g.ox + g.aw, g.oy - H * 0.035, T(`${cols} columns`, `${cols} kolom`), COL_B);
      const adds = Array(rows).fill(String(cols)).join(' + ');
      lines(W * 0.6, H * 0.25, [
        { text: `${rows} × ${cols} = ${N}`, size: fs * 1.6, color: '#fff' },
        { text: T(`${rows} rows of ${cols} dots`, `${rows} baris berisi ${cols} titik`), size: small, color: '#94a3b8', bold: false },
        { text: '' },
        { text: T('Same thing, added:', 'Sama saja, dijumlahkan:'), size: small, color: '#94a3b8', bold: false },
        { text: adds.length > 34 ? `${cols} + ${cols} + … (${rows} ${T('times', 'kali')})` : adds, size: small, color: COL_B, bold: false },
        { text: `= ${N}`, size: fs, color: '#fff' },
      ], fs);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(small, false);
      ctx.textAlign = 'left';
      ctx.fillText(T(`${N} dots`, `${N} titik`), W * 0.6, H * 0.9);
    }

    if (p.mode === 'swap') {
      const half = W * 0.44;
      const g1 = drawArray(W * 0.03, H * 0.16, half, H * 0.62, rows, cols);
      const g2 = drawArray(W * 0.53, H * 0.16, half, H * 0.62, cols, rows, () => COL_B);
      ctx.fillStyle = '#fff'; ctx.font = font(fs);
      ctx.fillText(`${rows} × ${cols} = ${N}`, W * 0.25, H * 0.09);
      ctx.fillText(`${cols} × ${rows} = ${N}`, W * 0.75, H * 0.09);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(small, false);
      ctx.fillText(T(`${rows} rows of ${cols}`, `${rows} baris berisi ${cols}`), W * 0.25, H * 0.83);   // above the green badge
      ctx.fillText(T(`${cols} rows of ${rows}`, `${cols} baris berisi ${rows}`), W * 0.75, H * 0.83);
      // turn arrow in the middle
      ctx.fillStyle = '#facc15'; ctx.font = font(fs * 1.4);
      ctx.fillText('↻', W * 0.5, H * 0.5);
      ctx.font = font(small);
      ctx.fillText(T('turn it', 'putar'), W * 0.5, H * 0.58);
      // badge
      ctx.fillStyle = 'rgba(34,197,94,0.9)';
      const bw = Math.min(W * 0.5, fs * 14), bh = fs * 1.8;
      ctx.beginPath(); ctx.roundRect(W / 2 - bw / 2, H * 0.93 - bh / 2, bw, bh, 10); ctx.fill();
      ctx.fillStyle = '#052e16'; ctx.font = font(fs * 0.8);
      ctx.fillText(T(`Same dots! ${rows} × ${cols} = ${cols} × ${rows}`, `Titiknya sama! ${rows} × ${cols} = ${cols} × ${rows}`), W / 2, H * 0.93 + fs * 0.28);
      void g1; void g2;
    }

    if (p.mode === 'split') {
      const s = clamp(p.split, 1, Math.max(1, cols - 1));
      const g = drawArray(W * 0.05, H * 0.12, W * 0.5, H * 0.8, rows, cols, (i, j) => (j < s ? COL_B : COL_C), true, false);
      if (cols > 1) {
        const lx = g.ox + g.gap * s;
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
        ctx.beginPath(); ctx.moveTo(lx, g.oy - H * 0.02); ctx.lineTo(lx, g.oy + g.ah + H * 0.02); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = font(small, false);
        bracketText(g.ox, lx, g.oy - H * 0.035, `${s}`, COL_B);
        bracketText(lx, g.ox + g.aw, g.oy - H * 0.035, `${cols - s}`, COL_C);
      }
      const left = rows * s, right = rows * (cols - s);
      const x = W * 0.6;
      let y = H * 0.22;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fff'; ctx.font = font(fs * 1.3);
      ctx.fillText(`${rows} × ${cols}`, x, y); y += fs * 1.9;
      ctx.font = font(fs);
      ctx.fillStyle = '#e2e8f0'; ctx.fillText('= ', x, y);
      ctx.fillStyle = COL_B; ctx.fillText(`${rows} × ${s}`, x + fs * 1.1, y);
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(' + ', x + fs * 1.1 + ctx.measureText(`${rows} × ${s}`).width, y);
      const w1 = ctx.measureText(`${rows} × ${s}`).width + ctx.measureText(' + ').width;
      ctx.fillStyle = COL_C; ctx.fillText(`${rows} × ${cols - s}`, x + fs * 1.1 + w1, y); y += fs * 1.7;
      ctx.fillStyle = '#e2e8f0'; ctx.fillText('= ', x, y);
      ctx.fillStyle = COL_B; ctx.fillText(`${left}`, x + fs * 1.1, y);
      const w2 = ctx.measureText(`${left}`).width;
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(' + ', x + fs * 1.1 + w2, y);
      ctx.fillStyle = COL_C; ctx.fillText(`${right}`, x + fs * 1.1 + w2 + ctx.measureText(' + ').width, y); y += fs * 1.7;
      ctx.fillStyle = '#fff'; ctx.font = font(fs * 1.3); ctx.fillText(`= ${N}`, x, y); y += fs * 1.8;
      ctx.fillStyle = '#94a3b8'; ctx.font = font(small, false);
      ctx.fillText(T('Two small arrays are easier', 'Dua larik kecil lebih mudah'), x, y); y += small * 1.4;
      ctx.fillText(T('to count than one big one.', 'dihitung daripada satu larik besar.'), x, y);
      ctx.textAlign = 'center';
    }

    if (p.mode === 'share') {
      // N dots shared into `rows` equal rows → cols in each row. Rows fill one after another.
      const g = drawArray(W * 0.05, H * 0.12, W * 0.5, H * 0.8, rows, cols, (i) => (i % 2 ? COL_A : '#22c55e'), true, true);
      ctx.font = font(small, false);
      bracketText(g.ox, g.ox + g.aw, g.oy - H * 0.035, T(`${cols} in each row`, `${cols} tiap baris`), '#22c55e');
      lines(W * 0.6, H * 0.25, [
        { text: `${N} ÷ ${rows} = ${cols}`, size: fs * 1.6, color: '#fff' },
        { text: T(`${N} dots shared into ${rows} rows`, `${N} titik dibagikan ke ${rows} baris`), size: small, color: '#94a3b8', bold: false },
        { text: T(`Each row gets ${cols}.`, `Tiap baris mendapat ${cols}.`), size: small, color: '#22c55e', bold: false },
        { text: '' },
        { text: T('And the other way:', 'Dan sebaliknya:'), size: small, color: '#94a3b8', bold: false },
        { text: `${N} ÷ ${cols} = ${rows}`, size: fs, color: '#fff' },
        { text: T(`${cols} in a row → ${rows} rows`, `${cols} tiap baris → ${rows} baris`), size: small, color: '#94a3b8', bold: false },
      ], fs);
    }

    if (p.mode === 'factors') {
      const pairs = [];
      for (let a = 1; a * a <= N; a++) if (N % a === 0) pairs.push([a, N / a]);
      const facts = [...new Set(pairs.flat())].sort((u, v) => u - v);
      ctx.fillStyle = '#fff'; ctx.font = font(fs);
      ctx.fillText(T(`Every rectangle with ${N} dots`, `Semua persegi panjang dengan ${N} titik`), W / 2, H * 0.09);
      const n = pairs.length;
      const cellW = (W * 0.94) / n, top = H * 0.16, cellH = H * 0.55;
      pairs.forEach(([a, b], i) => {
        const x = W * 0.03 + i * cellW;
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath(); ctx.roundRect(x + 4, top, cellW - 8, cellH, 8); ctx.fill();
        const col = i % 3 === 0 ? COL_A : i % 3 === 1 ? COL_B : COL_C;
        drawArray(x + 10, top + 8, cellW - 20, cellH - small * 2.2, a, b, () => col, false, false);
        ctx.fillStyle = col; ctx.font = font(Math.min(fs, cellW * 0.22));
        ctx.textAlign = 'center';
        ctx.fillText(`${a} × ${b}`, x + cellW / 2, top + cellH - small * 0.6);
      });
      ctx.fillStyle = '#94a3b8'; ctx.font = font(small, false);
      ctx.fillText(T(`Factors of ${N}:`, `Faktor dari ${N}:`), W / 2, H * 0.80);
      ctx.fillStyle = '#facc15'; ctx.font = font(fs);
      ctx.fillText(facts.join(', '), W / 2, H * 0.88);
      if (facts.length === 2) {
        ctx.fillStyle = '#f472b6'; ctx.font = font(small);
        ctx.fillText(T(`${N} is a prime number: only one rectangle!`, `${N} adalah bilangan prima: hanya satu persegi panjang!`), W / 2, H * 0.96);
      } else if (pairs[pairs.length - 1][0] === pairs[pairs.length - 1][1]) {
        ctx.fillStyle = '#f472b6'; ctx.font = font(small);
        ctx.fillText(T(`${N} is a square number: ${pairs[pairs.length - 1][0]} × ${pairs[pairs.length - 1][0]}`, `${N} adalah bilangan kuadrat: ${pairs[pairs.length - 1][0]} × ${pairs[pairs.length - 1][0]}`), W / 2, H * 0.96);
      }
    }
    ctx.textAlign = 'left';
  }

  // ---- controls -------------------------------------------------------------
  const rowsS = bigSlider({ label: T('Rows', 'Baris'), key: 'rows', min: 1, max: 10, step: 1, value: p.rows, onInput: (v) => { p.rows = v; touched(); } });
  const colsS = bigSlider({ label: T('Columns', 'Kolom'), key: 'cols', min: 1, max: 10, step: 1, value: p.cols, onInput: (v) => { p.cols = v; p.split = clamp(p.split, 1, Math.max(1, v - 1)); splitS.value = p.split; touched(); } });
  const splitS = bigSlider({ label: T('Split after column', 'Pecah setelah kolom'), key: 'split', min: 1, max: 9, step: 1, value: p.split, onInput: (v) => { p.split = clamp(v, 1, Math.max(1, p.cols - 1)); splitS.value = p.split; touched(); } });
  const modeS = select({
    label: T('What to show', 'Yang ditampilkan'), key: 'mode',
    options: [
      { value: 'array', label: T('Array: rows × columns', 'Larik: baris × kolom') },
      { value: 'swap', label: T('Turn it round (6 × 4 = 4 × 6)', 'Putar (6 × 4 = 4 × 6)') },
      { value: 'split', label: T('Split it in two', 'Pecah menjadi dua') },
      { value: 'share', label: T('Share: division', 'Bagikan: pembagian') },
      { value: 'factors', label: T('Factors: all rectangles', 'Faktor: semua persegi panjang') },
    ],
    value: 'array',
    onChange: (v) => { p.mode = v; splitS.el.style.display = v === 'split' ? '' : 'none'; touched(); },
  });
  splitS.el.style.display = 'none';
  ctrlPanel.append(rowsS.el, colsS.el, modeS.el, splitS.el);

  const lab = labPanel({
    title: 'Arrays I built',
    filename: 'multiplication-arrays-data.csv',
    columns: [
      { key: 'rows', label: 'Rows' },
      { key: 'cols', label: 'Columns' },
      { key: 'product', label: 'Dots (product)' },
      { key: 'fact', label: 'Fact' },
    ],
    procedure: [
      'Set rows and columns, count the dots, then press Record.',
      'Swap the two numbers (rows ↔ columns) and record again. Compare the products.',
      'Record five arrays that all have 24 dots. How many did you find?',
      'Find a number of dots that only makes one rectangle.',
    ],
    predict: 'Will 7 rows of 3 have more dots, fewer dots, or the same as 3 rows of 7?',
    source: () => ({ rows: p.rows, cols: p.cols, product: p.rows * p.cols, fact: `${p.rows} × ${p.cols} = ${p.rows * p.cols}` }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
