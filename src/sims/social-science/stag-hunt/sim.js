import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

// Payoff matrix
//   Stag-Stag = a (big)
//   Stag-Hare = b (zero)
//   Hare-Stag = c (small)
//   Hare-Hare = d (small)
// Standard: a > c >= d > b

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    a: 4,    // SS
    b: 0,    // SH
    c: 2,    // HS
    d: 2,    // HH
    p0: 0.5, // initial fraction of stag-hunters
    speed: 0.6,
    autoplay: true,
  };

  let p = 0.5;
  let history = [];
  let t = 0;

  function reset() { p = params.p0; history = []; t = 0; }
  reset();

  function fStag(p) { return p * params.a + (1 - p) * params.b; }
  function fHare(p) { return p * params.c + (1 - p) * params.d; }

  function step(dt) {
    if (!params.autoplay) return;
    const fS = fStag(p), fH = fHare(p);
    const avg = p * fS + (1 - p) * fH;
    p += p * (fS - avg) * dt * params.speed;
    p = Math.max(0, Math.min(1, p));
    t += dt;
    history.push({ t, p });
    if (history.length > 600) history.shift();
  }

  function unstableEq() {
    // p* such that fS = fH:
    //   p a + (1-p) b = p c + (1-p) d
    //   p (a - b - c + d) = d - b
    const denom = params.a - params.b - params.c + params.d;
    if (Math.abs(denom) < 1e-9) return 0.5;
    return (params.d - params.b) / denom;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Population on left as field of stags and hares
    const halfW = W * 0.4;
    const N = 100;
    const cols = 10, rows = 10;
    const cw = (halfW - 40) / cols;
    const ch = (H - 80) / rows;
    const stags = Math.round(p * N);
    for (let i = 0; i < N; i++) {
      const cx = 30 + (i % cols) * cw + cw / 2;
      const cy = 40 + Math.floor(i / cols) * ch + ch / 2;
      const r = Math.min(cw, ch) * 0.36;
      if (i < stags) {
        // stag — purple
        ctx.fillStyle = '#a78bfa';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // hare — green
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Graph
    const gx = halfW + 30, gy = 40, gw = W - gx - 30, gh = H - 80;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gx, gy, gw, gh);

    const eq = unstableEq();
    if (eq >= 0 && eq <= 1) {
      const eqY = gy + gh - eq * gh;
      ctx.strokeStyle = 'rgba(245,158,11,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(gx, eqY); ctx.lineTo(gx + gw, eqY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(245,158,11,0.85)';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(`Unstable equilibrium ≈ ${(eq * 100).toFixed(0)}%`, gx + 6, eqY - 4);
    }

    // history
    if (history.length > 1) {
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const tEnd = history[history.length - 1].t;
      const tWindow = Math.max(20, tEnd);
      for (let i = 0; i < history.length; i++) {
        const x = gx + (history[i].t / tWindow) * gw;
        const y = gy + gh - history[i].p * gh;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Stag fraction over time', gx + 6, gy - 4);

    // header
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Stag: ${(p*100).toFixed(1)}%   payoffs S=${fStag(p).toFixed(2)}  H=${fHare(p).toFixed(2)}`, 16, 28);
  }

  // controls
  const aS = slider({ label: 'Stag-Stag payoff (a)', min: 0, max: 8, step: 0.1, value: params.a, format: (v) => v.toFixed(1),
    onInput: (v) => { params.a = v; } });
  const bS = slider({ label: 'Stag-Hare payoff (b)', min: 0, max: 5, step: 0.1, value: params.b, format: (v) => v.toFixed(1),
    onInput: (v) => { params.b = v; } });
  const cS = slider({ label: 'Hare-Stag payoff (c)', min: 0, max: 5, step: 0.1, value: params.c, format: (v) => v.toFixed(1),
    onInput: (v) => { params.c = v; } });
  const dS = slider({ label: 'Hare-Hare payoff (d)', min: 0, max: 5, step: 0.1, value: params.d, format: (v) => v.toFixed(1),
    onInput: (v) => { params.d = v; } });
  const pS = slider({ label: 'Initial % stag', min: 0, max: 1, step: 0.01, value: params.p0, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.p0 = v; } });
  const playT = toggle({ label: 'Auto-evolve', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(aS.el, bS.el, cS.el, dS.el, pS.el, playT.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
