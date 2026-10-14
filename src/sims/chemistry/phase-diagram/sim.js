import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Phase diagram for water (P in atm, T in °C, log pressure axis).
// Triple point: 0.01 °C, 0.006 atm. Critical point: 374 °C, 218 atm.
// Boundary curves (Clausius–Clapeyron form log10 P = A − B/T_K):
//   vaporization (liquid-gas): two segments fitted exactly through the triple
//     point, the normal boiling point (100 °C, 1 atm) and the critical point;
//     within ~5 % of steam-table values (0.030 atm at 25 °C, 0.29 atm at 70 °C).
//   sublimation (solid-gas): ΔH_sub ≈ 51 kJ/mol, pinned at the triple point.
//   melting (solid-liquid): dT/dP ≈ −0.0074 °C/atm — leans to LOWER T at
//     higher P (ice is less dense than water), so ~−7 °C at 1000 atm.

const T_MIN = -50, T_MAX = 450;
const LOG_P_MIN = -3, LOG_P_MAX = 3;  // 10^x atm: 0.001 to 1000

const TRIPLE = { T: 0.01, P: 0.006 };
const CRITICAL = { T: 374, P: 218 };
const T0 = 273.15;
const NBP = 100; // normal boiling point, °C, at 1 atm
// vaporization segment 1: triple → normal boiling point
const B1 = Math.log10(1 / TRIPLE.P) / (1 / (TRIPLE.T + T0) - 1 / (NBP + T0));
const A1 = B1 / (NBP + T0);
// vaporization segment 2: normal boiling point → critical point
const B2 = Math.log10(CRITICAL.P) / (1 / (NBP + T0) - 1 / (CRITICAL.T + T0));
const A2 = B2 / (NBP + T0);
// sublimation: B = ΔH_sub / (R ln 10)
const B3 = 51000 / (Math.LN10 * 8.314);
const A3 = Math.log10(TRIPLE.P) + B3 / (TRIPLE.T + T0);
const MELT_SLOPE = -0.0074; // °C per atm

/** Liquid–vapour equilibrium pressure (atm) at Tc °C. */
function vapPressure(Tc) {
  const Tk = Tc + T0;
  return Tc <= NBP ? Math.pow(10, A1 - B1 / Tk) : Math.pow(10, A2 - B2 / Tk);
}
/** Solid–vapour equilibrium pressure (atm) at Tc °C. */
function subPressure(Tc) {
  return Math.pow(10, A3 - B3 / (Tc + T0));
}
/** Melting temperature (°C) at pressure P (atm). */
function meltT(P) {
  return TRIPLE.T + MELT_SLOPE * (P - TRIPLE.P);
}

function phase(T, P) {
  // P in atm, T in °C
  if (T >= CRITICAL.T) return P >= CRITICAL.P ? 'supercritical' : 'gas';
  if (P <= TRIPLE.P) {
    // below the triple-point pressure there is no liquid: solid or gas only
    if (T < TRIPLE.T) return P > subPressure(T) ? 'solid' : 'gas';
    return P > vapPressure(T) ? 'liquid' : 'gas';
  }
  // above the triple-point pressure: left of the melting line is solid
  if (T < meltT(P)) return 'solid';
  return P > vapPressure(T) ? 'liquid' : 'gas';
}

const COLORS = {
  solid: '#3b82f6',
  liquid: '#10b981',
  gas: '#fbbf24',
  supercritical: '#a855f7',
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    T: 25,        // °C
    P: 1,         // atm
  };
  let drag = false;

  function x2(T, W) {
    const padX = 60;
    return padX + ((T - T_MIN) / (T_MAX - T_MIN)) * (W - padX - 30);
  }
  function y2(P, H) {
    const padY = 30, padBot = 50;
    const logP = Math.log10(Math.max(1e-4, P));
    return H - padBot - ((logP - LOG_P_MIN) / (LOG_P_MAX - LOG_P_MIN)) * (H - padY - padBot);
  }
  function s2T(sx, W) {
    const padX = 60;
    return T_MIN + ((sx - padX) / (W - padX - 30)) * (T_MAX - T_MIN);
  }
  function s2P(sy, H) {
    const padY = 30, padBot = 50;
    const f = 1 - (sy - padY) / (H - padY - padBot);
    const logP = LOG_P_MIN + f * (LOG_P_MAX - LOG_P_MIN);
    return Math.pow(10, logP);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // diagram on left 2/3
    const diagW = W * 0.65;

    // axes box
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 30, diagW - 90, H - 80);

    // gridlines
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
    for (let lp = LOG_P_MIN; lp <= LOG_P_MAX; lp++) {
      const yy = y2(Math.pow(10, lp), H);
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(60, yy); ctx.lineTo(diagW - 30, yy); ctx.stroke();
      ctx.fillText(`10^${lp}`, 22, yy + 3);
    }
    for (let tt = T_MIN; tt <= T_MAX; tt += 100) {
      const xx = x2(tt, W);
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(xx, 30); ctx.lineTo(xx, H - 50); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${tt}°`, xx - 10, H - 36);
    }

    // Color background by phase (sample grid)
    const step = 6;
    for (let sy = 30; sy < H - 50; sy += step) {
      for (let sx = 60; sx < diagW - 30; sx += step) {
        const T = s2T(sx, W);
        const P = s2P(sy, H);
        ctx.fillStyle = COLORS[phase(T, P)] + '22';
        ctx.fillRect(sx, sy, step, step);
      }
    }

    // Phase boundary curves (drawn as samples)
    function drawCurve(fn, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (let T = T_MIN; T <= T_MAX; T += 1) {
        const Pv = fn(T);
        if (Pv == null) continue;
        const sx = x2(T, W);
        const sy = y2(Pv, H);
        if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    // sublimation
    drawCurve((T) => T < TRIPLE.T ? subPressure(T) : null, '#cbd5e1');
    // vaporization
    drawCurve((T) => (T < TRIPLE.T || T > CRITICAL.T) ? null : vapPressure(T), '#cbd5e1');
    // melting: same meltT(P) used by phase(), sampled in log P from the triple point upward
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x2(TRIPLE.T, W), y2(TRIPLE.P, H));
    for (let lp = Math.log10(TRIPLE.P); lp <= LOG_P_MAX + 0.01; lp += 0.05) {
      const Pm = Math.pow(10, Math.min(lp, LOG_P_MAX));
      ctx.lineTo(x2(meltT(Pm), W), y2(Pm, H));
    }
    ctx.stroke();

    // triple and critical points
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(x2(0.01, W), y2(0.006, H), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a855f7';
    ctx.beginPath(); ctx.arc(x2(374, W), y2(218, H), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '10px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('triple', x2(0.01, W) + 8, y2(0.006, H) - 4);
    ctx.fillText('critical', x2(374, W) - 50, y2(218, H) - 4);

    // current marker
    const markerX = x2(params.T, W);
    const markerY = y2(params.P, H);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(markerX, markerY, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(markerX, markerY, 4, 0, Math.PI * 2); ctx.fill();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('T (°C)', diagW - 60, H - 16);
    ctx.save(); ctx.translate(20, 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('P (atm, log)', -100, 0);
    ctx.restore();

    // Right panel: phase status + sample beaker
    const rx = diagW + 30;
    const ph = phase(params.T, params.P);
    ctx.fillStyle = COLORS[ph];
    ctx.fillRect(rx, 30, 180, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, -apple-system, Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ph.toUpperCase(), rx + 90, 56);
    ctx.textAlign = 'left';

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`T = ${params.T.toFixed(1)} °C`, rx, 90);
    ctx.fillText(`P = ${params.P.toExponential(2)} atm`, rx, 108);

    // Particle visualization: dots
    ctx.fillStyle = COLORS[ph];
    if (ph === 'solid') {
      // ordered grid
      for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) {
        ctx.beginPath();
        ctx.arc(rx + 10 + i * 20, 140 + j * 18, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (ph === 'liquid') {
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(rx + 10 + Math.random() * 160, 140 + Math.random() * 90, 4 + Math.random(), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (ph === 'gas') {
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.arc(rx + 10 + Math.random() * 160, 140 + Math.random() * 110, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(rx + 10 + Math.random() * 160, 140 + Math.random() * 110, 2 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Drag the red dot on the diagram', 12, H - 12);
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.style.touchAction = 'none'; // let touch drags reach the canvas instead of scrolling
  cv.canvas.addEventListener('pointerdown', (e) => {
    drag = true;
    const p = localPos(e);
    params.T = Math.max(T_MIN, Math.min(T_MAX, s2T(p.x, cv.width)));
    params.P = Math.max(1e-4, Math.min(1000, s2P(p.y, cv.height)));
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    params.T = Math.max(T_MIN, Math.min(T_MAX, s2T(p.x, cv.width)));
    params.P = Math.max(1e-4, Math.min(1000, s2P(p.y, cv.height)));
  });
  window.addEventListener('pointerup', () => { drag = false; });

  // controls (presets)
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, T, P] of [
    ['Room', 25, 1], ['Boiling at sea', 100, 1], ['Mt Everest', 70, 0.3],
    ['Triple', 0.01, 0.006], ['Critical', 374, 218], ['Mariana trench', 4, 1100],
  ]) {
    const b = button({ label: name, onClick: () => { params.T = T; params.P = P; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
