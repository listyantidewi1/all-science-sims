import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function lcm(a, b) { return a * b / gcd(a, b); }

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    f1: { num: 1, den: 2 },
    f2: { num: 1, den: 3 },
    op: 'compare',  // compare | add | subtract
  };

  function simplify(f) {
    const g = gcd(Math.abs(f.num), f.den);
    return { num: f.num / g, den: f.den / g };
  }
  function asMixed(f) {
    const whole = Math.trunc(f.num / f.den);
    const rem = Math.abs(f.num - whole * f.den);
    return { whole, num: rem, den: f.den };
  }
  function combine() {
    const lcd = lcm(params.f1.den, params.f2.den);
    const a = params.f1.num * (lcd / params.f1.den);
    const b = params.f2.num * (lcd / params.f2.den);
    let result;
    if (params.op === 'add') result = { num: a + b, den: lcd };
    else if (params.op === 'subtract') result = { num: a - b, den: lcd };
    else result = null;
    return { lcd, aOverLcd: { num: a, den: lcd }, bOverLcd: { num: b, den: lcd }, result };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Three rows of visualizations: pie, bar, number line
    drawFractionRow(ctx, 30, 50, W * 0.55 - 50, 130, params.f1, '#0ea5e9', 'Fraction 1');
    drawFractionRow(ctx, 30, 200, W * 0.55 - 50, 130, params.f2, '#a855f7', 'Fraction 2');

    // Operation result
    const c = combine();
    drawNumberLine(ctx, 30, 360, W * 0.55 - 50, 80, [params.f1, params.f2]);

    // Right column: math + computed values
    const rx = W * 0.55 + 10;
    const rw = W - rx - 30;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(rx, 50, rw, H - 100);
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(rx, 50, rw, H - 100);

    let yy = 80;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText('Common-denominator view:', rx + 16, yy); yy += 22;
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 18px var(--font-mono)';
    ctx.fillText(`${c.aOverLcd.num}/${c.aOverLcd.den}`, rx + 16, yy);
    ctx.fillStyle = '#fff';
    const opSym = params.op === 'add' ? '+' : params.op === 'subtract' ? '−' : (params.f1.num * params.f2.den < params.f2.num * params.f1.den ? '<' : params.f1.num * params.f2.den > params.f2.num * params.f1.den ? '>' : '=');
    ctx.fillText(`  ${opSym}  `, rx + 80, yy);
    ctx.fillStyle = '#a855f7';
    ctx.fillText(`${c.bOverLcd.num}/${c.bOverLcd.den}`, rx + 130, yy);
    yy += 30;

    if (c.result) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px var(--font-mono)';
      ctx.fillText('Result:', rx + 16, yy); yy += 26;
      const simp = simplify(c.result);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 22px var(--font-mono)';
      ctx.fillText(`${c.result.num}/${c.result.den}`, rx + 16, yy); yy += 24;
      ctx.fillStyle = '#fbbf24';
      ctx.font = '13px var(--font-mono)';
      ctx.fillText(`= ${simp.num}/${simp.den} (simplified)`, rx + 16, yy); yy += 20;
      const m = asMixed(simp);
      if (m.whole !== 0 && m.num > 0) {
        ctx.fillText(`= ${m.whole} ${m.num}/${m.den} (mixed)`, rx + 16, yy); yy += 20;
      }
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.fillText(`= ${(simp.num / simp.den).toFixed(4)} (decimal)`, rx + 16, yy); yy += 20;
    } else {
      // compare mode
      const a = params.f1.num / params.f1.den;
      const b = params.f2.num / params.f2.den;
      const cmp = a < b ? '<' : a > b ? '>' : '=';
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 16px var(--font-mono)';
      ctx.fillText(`${params.f1.num}/${params.f1.den} ${cmp} ${params.f2.num}/${params.f2.den}`, rx + 16, yy); yy += 28;
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '12px var(--font-mono)';
      ctx.fillText(`${params.f1.num}/${params.f1.den} = ${a.toFixed(4)}`, rx + 16, yy); yy += 18;
      ctx.fillText(`${params.f2.num}/${params.f2.den} = ${b.toFixed(4)}`, rx + 16, yy);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Adjust the four sliders below; the LCD and simplification update automatically.', 16, H - 12);
  }

  function drawFractionRow(ctx, x, y, w, h, f, color, title) {
    // Pie | Bar | Mini number line
    const partW = w / 3;

    // Pie
    const cx = x + partW / 2;
    const cy = y + h / 2 + 10;
    const R = Math.min(partW, h) * 0.42;
    ctx.fillStyle = 'rgba(120,130,150,0.15)';
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    const slice = Math.PI * 2 / f.den;
    for (let i = 0; i < f.num; i++) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, -Math.PI / 2 + i * slice, -Math.PI / 2 + (i + 1) * slice);
      ctx.closePath();
      ctx.fill();
    }
    for (let i = 0; i < f.den; i++) {
      const a = -Math.PI / 2 + i * slice;
      ctx.strokeStyle = '#0b1220';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.stroke();
    }
    ctx.strokeStyle = '#fff';
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

    // Bar
    const bx = x + partW + 10, by = y + 30, bw = partW - 20, bh = h - 50;
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(bx, by, bw, bh);
    const cellW = bw / f.den;
    for (let i = 0; i < f.den; i++) {
      ctx.fillStyle = i < f.num ? color : 'rgba(120,130,150,0.15)';
      ctx.fillRect(bx + i * cellW + 1, by + 1, cellW - 2, bh - 2);
      ctx.strokeStyle = '#0b1220';
      ctx.beginPath(); ctx.moveTo(bx + i * cellW, by); ctx.lineTo(bx + i * cellW, by + bh); ctx.stroke();
    }

    // Mini number line
    const lx = x + partW * 2 + 10, ly = y + h / 2;
    const lw = partW - 30;
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + lw, ly); ctx.stroke();
    for (let i = 0; i <= f.den; i++) {
      const px = lx + (i / f.den) * lw;
      ctx.beginPath(); ctx.moveTo(px, ly - 6); ctx.lineTo(px, ly + 6); ctx.stroke();
    }
    const px = lx + (f.num / f.den) * lw;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(px, ly, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('0', lx - 4, ly + 22);
    ctx.fillText('1', lx + lw - 4, ly + 22);

    // Header
    ctx.fillStyle = color;
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`${title}:  ${f.num}/${f.den}`, x, y - 8);
  }

  function drawNumberLine(ctx, x, y, w, h, fs) {
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Number line', x, y - 8);
    const lx = x + 30, ly = y + h / 2;
    const lw = w - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + lw, ly); ctx.stroke();
    for (let i = 0; i <= 4; i++) {
      const px = lx + (i / 4) * lw;
      ctx.beginPath(); ctx.moveTo(px, ly - 6); ctx.lineTo(px, ly + 6); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${i}`, px - 4, ly + 22);
    }
    const colors = ['#0ea5e9', '#a855f7'];
    for (let i = 0; i < fs.length; i++) {
      const f = fs[i];
      const px = lx + (f.num / f.den / 4) * lw;
      ctx.fillStyle = colors[i];
      ctx.beginPath(); ctx.arc(px, ly, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px var(--font-mono)';
      ctx.fillText(`${f.num}/${f.den}`, px - 12, ly - 12);
    }
  }

  // controls
  function fSliders(label, key) {
    const wrap = document.createElement('div');
    const numS = slider({ label: `${label} numerator`, min: 0, max: 20, step: 1, value: params[key].num,
      onInput: (v) => { params[key].num = v; } });
    const denS = slider({ label: `${label} denominator`, min: 1, max: 20, step: 1, value: params[key].den,
      onInput: (v) => { params[key].den = Math.max(1, v); } });
    wrap.appendChild(numS.el);
    wrap.appendChild(denS.el);
    return wrap;
  }
  ctrlPanel.appendChild(fSliders('Fraction 1', 'f1'));
  ctrlPanel.appendChild(fSliders('Fraction 2', 'f2'));
  const opSel = select({
    label: 'Operation',
    options: [
      { value: 'compare',  label: 'Compare' },
      { value: 'add',      label: 'Add' },
      { value: 'subtract', label: 'Subtract' },
    ],
    value: params.op,
    onChange: (v) => { params.op = v; },
  });
  ctrlPanel.appendChild(opSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
