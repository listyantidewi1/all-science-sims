import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

const STATES = ['magma', 'igneous', 'sediment', 'sedimentary', 'metamorphic'];
const COLORS = {
  magma:        '#ef4444',
  igneous:      '#1e293b',
  sediment:     '#fbbf24',
  sedimentary:  '#a16207',
  metamorphic:  '#7c3aed',
};
const POSITIONS = {
  magma:       { x: 0.20, y: 0.80 },
  igneous:     { x: 0.20, y: 0.30 },
  sediment:    { x: 0.55, y: 0.50 },
  sedimentary: { x: 0.78, y: 0.30 },
  metamorphic: { x: 0.78, y: 0.78 },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    cooling: 0.50,        // magma → igneous
    weathering: 0.30,     // any rock → sediment
    lithification: 0.40,  // sediment → sedimentary
    metamorphism: 0.20,   // any rock → metamorphic
    melting: 0.15,        // any rock → magma
    speed: 1.0,
  };

  // Particles flow through the cycle. Each is a position (x, y) and a state.
  let particles = [];
  function reset() {
    particles = [];
    const N = 80;
    for (let i = 0; i < N; i++) {
      const s = STATES[Math.floor(Math.random() * STATES.length)];
      particles.push({ s, x: 0, y: 0, jitter: { x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 60 } });
    }
  }
  reset();

  function step(dt) {
    dt *= params.speed;
    for (const p of particles) {
      const r = Math.random();
      const transitions = {
        magma:        [{ to: 'igneous',     rate: params.cooling }],
        igneous:      [{ to: 'sediment',    rate: params.weathering },
                       { to: 'metamorphic', rate: params.metamorphism },
                       { to: 'magma',       rate: params.melting }],
        sediment:     [{ to: 'sedimentary', rate: params.lithification }],
        sedimentary:  [{ to: 'sediment',    rate: params.weathering * 0.5 },
                       { to: 'metamorphic', rate: params.metamorphism },
                       { to: 'magma',       rate: params.melting * 0.5 }],
        metamorphic:  [{ to: 'sediment',    rate: params.weathering * 0.4 },
                       { to: 'magma',       rate: params.melting }],
      };
      const opts = transitions[p.s] || [];
      let cum = 0;
      for (const o of opts) {
        cum += o.rate * dt;
        if (r < cum) { p.s = o.to; break; }
      }
    }
  }

  function targetPos(p) {
    const W = cv.width, H = cv.height;
    const c = POSITIONS[p.s];
    return { x: c.x * W + p.jitter.x, y: c.y * H + p.jitter.y };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Draw nodes (rock-type "buckets") with counts
    const counts = {};
    for (const s of STATES) counts[s] = 0;
    for (const p of particles) counts[p.s]++;

    for (const s of STATES) {
      const c = POSITIONS[s];
      const cx = c.x * W, cy = c.y * H;
      ctx.fillStyle = COLORS[s] + '22';
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = COLORS[s];
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(s.toUpperCase(), cx, cy - 100);
      ctx.fillStyle = COLORS[s];
      ctx.font = 'bold 24px var(--font-mono)';
      ctx.fillText(`${counts[s]}`, cx, cy + 8);
      ctx.textAlign = 'left';
    }

    // Process labels (between nodes)
    const PROC_EDGES = [
      ['magma', 'igneous', `cooling ${params.cooling.toFixed(2)}`],
      ['igneous', 'sediment', `weathering ${params.weathering.toFixed(2)}`],
      ['sediment', 'sedimentary', `lithification ${params.lithification.toFixed(2)}`],
      ['sedimentary', 'metamorphic', `metamorphism ${params.metamorphism.toFixed(2)}`],
      ['metamorphic', 'magma', `melting ${params.melting.toFixed(2)}`],
      ['sedimentary', 'sediment', `weather`],
    ];
    for (const [a, b, label] of PROC_EDGES) {
      const ax = POSITIONS[a].x * W, ay = POSITIONS[a].y * H;
      const bx = POSITIONS[b].x * W, by = POSITIONS[b].y * H;
      const dx = bx - ax, dy = by - ay;
      const L = Math.hypot(dx, dy);
      const ux = dx / L, uy = dy / L;
      const sx = ax + ux * 92, sy = ay + uy * 92;
      const ex = bx - ux * 92, ey = by - uy * 92;
      ctx.strokeStyle = 'rgba(120,130,150,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      // arrowhead
      const ang = Math.atan2(uy, ux);
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 8 * Math.cos(ang - 0.4), ey - 8 * Math.sin(ang - 0.4));
      ctx.lineTo(ex - 8 * Math.cos(ang + 0.4), ey - 8 * Math.sin(ang + 0.4));
      ctx.closePath();
      ctx.fill();
      // label
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(label, (sx + ex) / 2 - 30, (sy + ey) / 2);
    }

    // Particles
    for (const p of particles) {
      const t = targetPos(p);
      ctx.fillStyle = COLORS[p.s];
      ctx.beginPath();
      ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 30);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText('The Rock Cycle — particles flowing between rock types', 16, 28);
  }

  // controls
  const cs = slider({ label: 'Cooling rate', min: 0, max: 1, step: 0.01, value: params.cooling, format: (v) => v.toFixed(2),
    onInput: (v) => { params.cooling = v; } });
  const ws = slider({ label: 'Weathering rate', min: 0, max: 1, step: 0.01, value: params.weathering, format: (v) => v.toFixed(2),
    onInput: (v) => { params.weathering = v; } });
  const ls = slider({ label: 'Lithification rate', min: 0, max: 1, step: 0.01, value: params.lithification, format: (v) => v.toFixed(2),
    onInput: (v) => { params.lithification = v; } });
  const ms = slider({ label: 'Metamorphism rate', min: 0, max: 1, step: 0.01, value: params.metamorphism, format: (v) => v.toFixed(2),
    onInput: (v) => { params.metamorphism = v; } });
  const mes = slider({ label: 'Melting rate', min: 0, max: 1, step: 0.01, value: params.melting, format: (v) => v.toFixed(2),
    onInput: (v) => { params.melting = v; } });
  const sps = slider({ label: 'Sim speed', min: 0.2, max: 5, step: 0.1, value: params.speed, format: (v) => v.toFixed(1),
    onInput: (v) => { params.speed = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(cs.el, ws.el, ls.el, ms.el, mes.el, sps.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.1, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
