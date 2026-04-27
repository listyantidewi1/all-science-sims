import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Schematic phase diagram for water (P in atm, T in °C, log axes for clarity).
// Triple point: 0.01 °C, 0.006 atm. Critical point: 374 °C, 218 atm.
// Lines (illustrative — qualitative shapes):
//   melting (solid-liquid): nearly vertical at 0 °C, slightly negative slope
//   sublimation (solid-gas): from low T to triple point
//   vaporization (liquid-gas): from triple to critical point

const T_MIN = -50, T_MAX = 450;
const LOG_P_MIN = -3, LOG_P_MAX = 3;  // 10^x atm: 0.001 to 1000

function phase(T, P) {
  // P in atm
  const triple = { T: 0.01, P: 0.006 };
  const critical = { T: 374, P: 218 };
  const meltCurveT = (Pa) => 0 - 0.0001 * (Pa - 1);  // negative-slope hint
  // sublimation curve: log P_sub = -A/T_K + B (illustrative)
  const subPressure = (Tc) => Math.exp(0.05 * (Tc + 50)) * 0.0005;
  // vaporization curve: Clausius-Clapeyron-ish
  const vapPressure = (Tc) => {
    if (Tc < triple.T) return null;
    if (Tc > critical.T) return null;
    // log10 P = a − b/(T+273)
    const Tk = Tc + 273.15;
    return Math.pow(10, 5.4 - 1500 / Tk);
  };

  if (T > critical.T && P > critical.P) return 'supercritical';
  if (T < triple.T) {
    // below triple: solid below sub curve, gas above? No: at low T,
    // higher pressure → solid; lower pressure → gas.
    if (P > subPressure(T)) return 'solid';
    return 'gas';
  }
  // T >= triple.T
  // Below liquid-vapor curve → gas, above → liquid; if T > critical it's supercritical or gas.
  const vp = vapPressure(T);
  if (T < meltCurveT(P)) return 'solid'; // unusual: only relevant if very cold and high P
  // melting line: solid if P > some threshold and T < ~0
  if (T < 0.0 + 0.0001 * (P - 1)) return 'solid';
  if (vp == null) {
    // T > critical
    return P > critical.P ? 'supercritical' : 'gas';
  }
  return P > vp ? 'liquid' : 'gas';
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
    ctx.font = '10px var(--font-mono)';
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
    drawCurve((T) => T < 0.01 ? Math.exp(0.05 * (T + 50)) * 0.0005 : null, '#cbd5e1');
    // vaporization
    drawCurve((T) => {
      if (T < 0.01 || T > 374) return null;
      return Math.pow(10, 5.4 - 1500 / (T + 273.15));
    }, '#cbd5e1');
    // melting (vertical near 0 °C, draw as a tilted line)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x2(0.01, W), y2(0.006, H));
    ctx.lineTo(x2(-2, W), y2(1000, H));
    ctx.stroke();

    // triple and critical points
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(x2(0.01, W), y2(0.006, H), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a855f7';
    ctx.beginPath(); ctx.arc(x2(374, W), y2(218, H), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '10px var(--font-sans)';
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
    ctx.font = 'bold 12px var(--font-sans)';
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
    ctx.font = 'bold 18px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText(ph.toUpperCase(), rx + 90, 56);
    ctx.textAlign = 'left';

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '12px var(--font-sans)';
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
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the red dot on the diagram', 12, H - 12);
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    drag = true;
    const p = localPos(e);
    params.T = Math.max(T_MIN, Math.min(T_MAX, s2T(p.x, cv.width)));
    params.P = Math.max(1e-4, Math.min(1000, s2P(p.y, cv.height)));
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    params.T = Math.max(T_MIN, Math.min(T_MAX, s2T(p.x, cv.width)));
    params.P = Math.max(1e-4, Math.min(1000, s2P(p.y, cv.height)));
  });
  window.addEventListener('mouseup', () => { drag = false; });

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
