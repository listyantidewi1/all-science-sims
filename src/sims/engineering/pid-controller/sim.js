import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// First-order plant: dy/dt = (-y + Ku * u) / tau
// PID:  e = setpoint - y
//       u = Kp*e + Ki*∫e dt + Kd*de/dt
// Disturbance: a one-shot kick on y.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    Kp: 2.0,
    Ki: 0.5,
    Kd: 0.2,
    setpoint: 1.0,
    tau: 0.6,
    Ku: 1.0,
    running: true,
  };

  let y = 0, integ = 0, lastE = 0, t = 0;
  const history = []; // {t, y, u, sp}

  function step(dt) {
    if (!params.running) return;
    const sub = 0.005;
    let remaining = Math.min(0.05, dt);
    while (remaining > 0) {
      const h = Math.min(sub, remaining);
      const e = params.setpoint - y;
      integ += e * h;
      const dE = (e - lastE) / h;
      lastE = e;
      const u = params.Kp * e + params.Ki * integ + params.Kd * dE;
      // first-order plant
      y += h * (-y + params.Ku * u) / Math.max(0.05, params.tau);
      t += h;
      history.push({ t, y, u, sp: params.setpoint });
      if (history.length > 4000) history.shift();
      remaining -= h;
    }
  }

  function reset() { y = 0; integ = 0; lastE = 0; t = 0; history.length = 0; }

  let chartRect = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 60;
    chartRect = { x: padX, y: padY, w: gW, h: gH };

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, gW, gH);

    const tWindow = 10; // seconds visible
    const tNow = history.length > 0 ? history[history.length - 1].t : 0;
    const t0 = Math.max(0, tNow - tWindow);
    const yMin = -0.5, yMax = Math.max(2.0, params.setpoint * 1.6);
    const x2 = (tt) => padX + ((tt - t0) / tWindow) * gW;
    const y2 = (yy) => padY + gH - ((yy - yMin) / (yMax - yMin)) * gH;

    // Setpoint line
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(padX, y2(params.setpoint)); ctx.lineTo(padX + gW, y2(params.setpoint));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`setpoint = ${params.setpoint.toFixed(2)}`, padX + 6, y2(params.setpoint) - 4);

    // Plant output y
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const h of history) {
      if (h.t < t0) continue;
      const sx = x2(h.t), sy = y2(h.y);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Control effort u (light gray, secondary axis approx)
    ctx.strokeStyle = 'rgba(168,139,250,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    started = false;
    for (const h of history) {
      if (h.t < t0) continue;
      const sx = x2(h.t), sy = y2(h.u * 0.3);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(padX + 8, padY + 8, 240, 60);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(padX + 16, padY + 22, 16, 3);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('plant output  y(t)', padX + 38, padY + 26);
    ctx.fillStyle = 'rgba(168,139,250,0.7)';
    ctx.fillRect(padX + 16, padY + 38, 16, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('control u(t) (×0.3)', padX + 38, padY + 42);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(padX + 16, padY + 54, 16, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('setpoint', padX + 38, padY + 58);

    // Big readout
    const e = params.setpoint - y;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W - 230, padY + 8, 220, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`y = ${y.toFixed(3)}`, W - 218, padY + 28);
    ctx.fillText(`error = ${e.toFixed(3)}`, W - 218, padY + 46);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`t = ${t.toFixed(1)} s`, W - 218, padY + 60);

    // Axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('time (s) →', padX + gW - 60, padY + gH + 16);
    ctx.save(); ctx.translate(18, padY + gH / 2 + 10); ctx.rotate(-Math.PI / 2);
    ctx.fillText('y / u', 0, 0); ctx.restore();

    // Hover crosshair on the y trace.
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    if (history.length < 2) return null;
    const tNow = history[history.length - 1].t;
    const t0 = Math.max(0, tNow - 10);
    const tt = t0 + ((sx - x) / w) * 10;
    // find nearest history entry
    let lo = 0, hi = history.length - 1;
    while (lo < hi - 1) { const m = (lo + hi) >> 1; if (history[m].t <= tt) lo = m; else hi = m; }
    const a = history[lo], b = history[hi];
    const u = (tt - a.t) / Math.max(1e-6, b.t - a.t);
    const yv = a.y + (b.y - a.y) * u;
    const cv_ = a.u + (b.u - a.u) * u;
    return {
      x: sx, y: y + h - ((yv - (-0.5)) / (Math.max(2.0, params.setpoint * 1.6) - (-0.5))) * h,
      label: [`t = ${tt.toFixed(2)} s`, `y = ${yv.toFixed(3)}`, `u = ${cv_.toFixed(3)}`],
    };
  });

  // controls
  const KpS = slider({ label: 'Kp (proportional)', min: 0, max: 10, step: 0.05, value: params.Kp, format: (v) => v.toFixed(2),
    onInput: (v) => { params.Kp = v; } });
  const KiS = slider({ label: 'Ki (integral)', min: 0, max: 5, step: 0.01, value: params.Ki, format: (v) => v.toFixed(2),
    onInput: (v) => { params.Ki = v; } });
  const KdS = slider({ label: 'Kd (derivative)', min: 0, max: 2, step: 0.01, value: params.Kd, format: (v) => v.toFixed(2),
    onInput: (v) => { params.Kd = v; } });
  const spS = slider({ label: 'Setpoint', min: 0, max: 2, step: 0.05, value: params.setpoint, format: (v) => v.toFixed(2),
    onInput: (v) => { params.setpoint = v; } });
  const tauS = slider({ label: 'Plant time-constant τ (s)', min: 0.1, max: 2, step: 0.05, value: params.tau, format: (v) => v.toFixed(2),
    onInput: (v) => { params.tau = v; } });
  const runT = toggle({ label: 'Running', value: params.running, onChange: (v) => { params.running = v; } });
  const distB = button({ label: 'Disturbance kick', onClick: () => { y -= 0.5; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(KpS.el, KiS.el, KdS.el, spS.el, tauS.el, runT.el, row(distB, resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
