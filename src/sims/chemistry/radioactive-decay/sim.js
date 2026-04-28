import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    N0: 200,
    halfLife: 4,    // seconds
    showTheoretical: true,
  };

  let atoms = [];   // {alive: bool}
  let history = []; // {t, alive}
  let t = 0;
  let chartRect = null;

  function reset() {
    atoms = [];
    for (let i = 0; i < params.N0; i++) atoms.push({ alive: true });
    history = [{ t: 0, alive: params.N0 }];
    t = 0;
  }
  reset();

  function step(dt) {
    // P(decay in dt) = 1 - exp(-ln2 * dt / halfLife)
    const p = 1 - Math.exp(-Math.LN2 * dt / params.halfLife);
    let alive = 0;
    for (const a of atoms) {
      if (a.alive) {
        if (Math.random() < p) a.alive = false;
        else alive++;
      }
    }
    t += dt;
    history.push({ t, alive });
    if (history.length > 1500) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // atoms grid on left
    const halfW = W * 0.42;
    const cols = Math.ceil(Math.sqrt(params.N0 * halfW / H));
    const rows = Math.ceil(params.N0 / cols);
    const cw = (halfW - 40) / cols;
    const ch = (H - 60) / rows;
    const r = Math.min(cw, ch) * 0.32;
    for (let i = 0; i < atoms.length; i++) {
      const cx = 30 + (i % cols) * cw + cw / 2;
      const cy = 40 + Math.floor(i / cols) * ch + ch / 2;
      ctx.fillStyle = atoms[i].alive ? '#fbbf24' : 'rgba(120,130,150,0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // decay curve
    const gx = halfW + 30, gy = 40, gw = W - gx - 30, gh = H - 80;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gx, gy, gw, gh);

    const maxT = Math.max(20, params.halfLife * 5);
    const x2 = (tt) => gx + (tt / maxT) * gw;
    const y2 = (n) => gy + gh - (n / params.N0) * gh;
    chartRect = { x: gx, y: gy, w: gw, h: gh, maxT, x2, y2, history };

    // half-life gridlines
    ctx.strokeStyle = 'rgba(245,158,11,0.3)';
    ctx.setLineDash([4, 4]);
    for (let k = 1; k <= 5; k++) {
      const ht = k * params.halfLife;
      if (ht > maxT) break;
      ctx.beginPath();
      ctx.moveTo(x2(ht), gy); ctx.lineTo(x2(ht), gy + gh);
      ctx.stroke();
      const yy = y2(params.N0 * Math.pow(0.5, k));
      ctx.fillStyle = 'rgba(245,158,11,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${k}T`, x2(ht) + 2, gy + 10);
      ctx.fillText(`N₀/${1 << k}`, gx + 4, yy + 4);
    }
    ctx.setLineDash([]);

    // theoretical curve
    if (params.showTheoretical) {
      ctx.strokeStyle = 'rgba(96,165,250,0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const tt = (i / 200) * maxT;
        const n = params.N0 * Math.pow(0.5, tt / params.halfLife);
        const sx = x2(tt), sy = y2(n);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // actual curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const h = history[i];
      const sx = x2(h.t), sy = y2(h.alive);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Atoms remaining', gx + 6, gy - 4);
    ctx.fillText('time (s) →', gx + gw - 60, gy + gh + 14);

    const alive = atoms.filter((a) => a.alive).length;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${alive}/${params.N0} alive    t=${t.toFixed(1)} s`, 16, 28);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: { x: gx, y: gy, w: gw, h: gh }, color: '#fbbf24', label: probe.label });
  }

  function interpHistory(tt) {
    if (!history.length) return params.N0;
    if (tt <= history[0].t) return history[0].alive;
    if (tt >= history[history.length - 1].t) return history[history.length - 1].alive;
    let lo = 0, hi = history.length - 1;
    while (lo < hi - 1) { const m = (lo + hi) >> 1; if (history[m].t <= tt) lo = m; else hi = m; }
    const a = history[lo], b = history[hi];
    const u = (tt - a.t) / Math.max(1e-9, b.t - a.t);
    return a.alive + (b.alive - a.alive) * u;
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h, maxT, x2, y2 } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const tt = ((sx - x) / w) * maxT;
    const theory = params.N0 * Math.pow(0.5, tt / params.halfLife);
    const actual = interpHistory(tt);
    return {
      x: sx,
      y: y2(theory),
      label: [
        `t = ${tt.toFixed(2)} s`,
        `theoretical: ${theory.toFixed(1)}`,
        `actual: ${actual.toFixed(0)}`,
      ],
    };
  });

  // controls
  const N0S = slider({ label: 'Starting atoms N₀', min: 20, max: 1000, step: 10, value: params.N0,
    onInput: (v) => { params.N0 = v; reset(); } });
  const hlS = slider({ label: 'Half-life T₁⁄₂ (s)', min: 0.5, max: 30, step: 0.1, value: params.halfLife, format: (v) => v.toFixed(1),
    onInput: (v) => { params.halfLife = v; } });
  const tT = toggle({ label: 'Show theoretical curve', value: params.showTheoretical, onChange: (v) => { params.showTheoretical = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(N0S.el, hlS.el, tT.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
