import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    V: 4,           // value of resource
    C: 6,           // cost of fighting
    pHawks: 0.5,    // initial fraction of hawks
    speed: 0.6,     // generations per second
    autoplay: true,
  };

  let p = 0.5;
  let history = [];
  let t = 0;

  function reset() {
    p = params.pHawks;
    history = [];
    t = 0;
  }
  reset();

  // Hawk-Dove payoff matrix:
  //   H vs H = (V - C) / 2
  //   H vs D = V
  //   D vs H = 0
  //   D vs D = V / 2
  function payoffH() {
    return p * (params.V - params.C) / 2 + (1 - p) * params.V;
  }
  function payoffD() {
    return p * 0 + (1 - p) * params.V / 2;
  }

  function step(dt) {
    if (!params.autoplay) return;
    const fH = payoffH();
    const fD = payoffD();
    const avg = p * fH + (1 - p) * fD;
    // replicator: dp/dt = p (fH - avg)
    p += p * (fH - avg) * dt * params.speed * 0.5;
    p = Math.max(0, Math.min(1, p));
    t += dt;
    history.push({ t, p });
    if (history.length > 600) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // population on left as colored circles
    const halfW = W * 0.4;
    const N = 100;
    const cols = 10, rows = 10;
    const cw = (halfW - 40) / cols;
    const ch = (H - 80) / rows;
    const r = Math.min(cw, ch) * 0.4;
    const hawks = Math.round(p * N);
    for (let i = 0; i < N; i++) {
      const cx = 30 + (i % cols) * cw + cw / 2;
      const cy = 40 + Math.floor(i / cols) * ch + ch / 2;
      ctx.fillStyle = i < hawks ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // ESS line
    const ess = params.C > params.V ? params.V / params.C : 1;
    ctx.fillStyle = 'rgba(245,158,11,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`ESS hawks ≈ ${(ess * 100).toFixed(0)}%`, 30, 24);

    // graph on right
    const gx = halfW + 30, gy = 40, gw = W - gx - 30, gh = H - 80;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(gx, gy, gw, gh);
    // ESS guide line
    const essY = gy + gh - ess * gh;
    ctx.strokeStyle = 'rgba(245,158,11,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(gx, essY); ctx.lineTo(gx + gw, essY);
    ctx.stroke();
    ctx.setLineDash([]);
    // hawks fraction over time
    if (history.length > 1) {
      ctx.strokeStyle = '#ef4444';
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
    // labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`Fraction hawks over time`, gx + 6, gy - 4);
    ctx.fillText('time →', gx + gw - 50, gy + gh + 14);

    // header
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`p_hawks = ${(p * 100).toFixed(1)}%    V=${params.V}, C=${params.C}`, 16, 26);
  }

  // controls
  const VS = slider({ label: 'Resource value V', min: 1, max: 10, step: 0.5, value: params.V, format: (v) => v.toFixed(1),
    onInput: (v) => { params.V = v; } });
  const CS = slider({ label: 'Fight cost C', min: 1, max: 15, step: 0.5, value: params.C, format: (v) => v.toFixed(1),
    onInput: (v) => { params.C = v; } });
  const pS = slider({ label: 'Starting % hawks', min: 0, max: 1, step: 0.01, value: params.pHawks, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.pHawks = v; } });
  const speedS = slider({ label: 'Speed', min: 0.1, max: 3, step: 0.1, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Auto-evolve', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(VS.el, CS.el, pS.el, speedS.el, playT.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
