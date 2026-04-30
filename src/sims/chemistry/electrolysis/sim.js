import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const F = 96485; // Faraday's constant, C/mol
const Vm = 22.4; // molar volume of ideal gas at STP, L/mol

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    current: 1.0,    // A
    running: true,
  };

  let state = { t: 0, qH2: 0, qO2: 0, bubbles: [] }; // mol per gas
  function reset() { state = { t: 0, qH2: 0, qO2: 0, bubbles: [] }; }

  function step(dt) {
    if (!params.running) return;
    state.t += dt;
    // Cathode: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻ (z=2)
    // Anode:   2 H₂O → O₂ + 4 H⁺ + 4 e⁻      (z=4)
    const dQ = params.current * dt; // charge in C
    state.qH2 += dQ / (2 * F);
    state.qO2 += dQ / (4 * F);

    // Spawn bubbles
    if (Math.random() < params.current * dt * 4) state.bubbles.push({ side: 'cathode', x: 0, y: 0, age: 0 });
    if (Math.random() < params.current * dt * 2) state.bubbles.push({ side: 'anode',   x: 0, y: 0, age: 0 });
    state.bubbles = state.bubbles.filter((b) => b.age < 3);
    for (const b of state.bubbles) b.age += dt;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Cell layout
    const cellY = 70, cellH = H - cellY - 80;
    const cellX = 80, cellW = W - 160;

    // Tank
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cellX, cellY);
    ctx.lineTo(cellX, cellY + cellH);
    ctx.lineTo(cellX + cellW, cellY + cellH);
    ctx.lineTo(cellX + cellW, cellY);
    ctx.stroke();
    // Water fill
    ctx.fillStyle = 'rgba(59,130,246,0.18)';
    ctx.fillRect(cellX, cellY + 30, cellW, cellH - 30);

    // Test tubes (gas collection) atop each electrode
    const tubeW = 60, tubeH = cellH * 0.7;
    const cathodeX = cellX + cellW * 0.25 - tubeW / 2;
    const anodeX   = cellX + cellW * 0.75 - tubeW / 2;
    const tubeTopY = cellY + 30 - 30;
    drawTestTube(ctx, cathodeX, tubeTopY, tubeW, tubeH, '#0ea5e9', 'H₂', state.qH2);
    drawTestTube(ctx, anodeX,   tubeTopY, tubeW, tubeH, '#fbbf24', 'O₂', state.qO2);

    // Electrodes
    ctx.fillStyle = '#475569';
    ctx.fillRect(cathodeX + tubeW / 2 - 4, tubeTopY + tubeH, 8, cellY + cellH - (tubeTopY + tubeH));
    ctx.fillRect(anodeX + tubeW / 2 - 4, tubeTopY + tubeH, 8, cellY + cellH - (tubeTopY + tubeH));
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText('cathode (−)', cathodeX + tubeW / 2, cellY + cellH + 18);
    ctx.fillText('anode (+)',   anodeX + tubeW / 2, cellY + cellH + 18);
    ctx.textAlign = 'left';

    // Battery + wires
    const batY = 30, batW = 120, batX = (W - batW) / 2;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(batX, batY); ctx.lineTo(cathodeX + tubeW / 2, batY); ctx.lineTo(cathodeX + tubeW / 2, tubeTopY + tubeH);
    ctx.moveTo(batX + batW, batY); ctx.lineTo(anodeX + tubeW / 2, batY); ctx.lineTo(anodeX + tubeW / 2, tubeTopY + tubeH);
    ctx.stroke();
    // Battery body
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(batX + batW / 2 - 10, batY - 12); ctx.lineTo(batX + batW / 2 - 10, batY + 12);
    ctx.moveTo(batX + batW / 2 + 10, batY - 6); ctx.lineTo(batX + batW / 2 + 10, batY + 6);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`${params.current.toFixed(2)} A`, batX + batW / 2 - 14, batY - 18);

    // Bubbles climbing the electrodes
    for (const b of state.bubbles) {
      const baseX = b.side === 'cathode' ? cathodeX + tubeW / 2 : anodeX + tubeW / 2;
      const baseY = cellY + cellH - 20;
      const yy = baseY - (b.age / 3) * (baseY - (tubeTopY + 30));
      ctx.fillStyle = b.side === 'cathode' ? 'rgba(14,165,233,0.7)' : 'rgba(251,191,36,0.7)';
      ctx.beginPath();
      ctx.arc(baseX + (b.age * 4 - 2), yy, 3 + b.age * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Readouts
    const litersH2 = state.qH2 * Vm * 1000; // mL
    const litersO2 = state.qO2 * Vm * 1000;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`I = ${params.current.toFixed(2)} A    t = ${state.t.toFixed(1)} s    Q = ${(params.current * state.t).toFixed(1)} C`, 16, 28);
    ctx.fillStyle = '#0ea5e9';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`H₂: ${(state.qH2 * 1000).toFixed(2)} mmol = ${litersH2.toFixed(2)} mL @ STP`, 16, 46);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`O₂: ${(state.qO2 * 1000).toFixed(2)} mmol = ${litersO2.toFixed(2)} mL  (ratio ${(state.qH2 / Math.max(1e-9, state.qO2)).toFixed(2)} : 1)`, 16, 62);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻      Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻', 16, H - 12);
  }

  function drawTestTube(ctx, x, y, w, h, color, label, mol) {
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.arc(x + w / 2, y + h, w / 2, Math.PI, 0, true);
    ctx.lineTo(x + w, y);
    ctx.stroke();

    // Gas fills from top down (displaces water).
    const ml = mol * Vm * 1000;
    const fillFrac = Math.min(1, ml / 50); // up to 50 mL fills the tube
    const gasH = fillFrac * (h - 10);
    ctx.fillStyle = color + '99';
    ctx.fillRect(x + 1, y + 1, w - 2, gasH);

    ctx.fillStyle = color;
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + w / 2, y - 4);
    ctx.fillStyle = '#fff';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`${ml.toFixed(2)} mL`, x + w / 2, y + 14);
    ctx.textAlign = 'left';
  }

  // controls
  const iS = slider({ label: 'Current I (A)', min: 0, max: 5, step: 0.05, value: params.current, format: (v) => v.toFixed(2),
    onInput: (v) => { params.current = v; } });
  const runT = toggle({ label: 'Running', value: params.running, onChange: (v) => { params.running = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(iS.el, runT.el, row(resetB));

  // Lab — verify Faraday's law and the 2:1 H₂:O₂ ratio.
  const lab = labPanel({
    title: "Electrolysis lab — Faraday's laws and the 2:1 ratio",
    filename: 'electrolysis-lab.csv',
    columns: [
      { key: 'I',      label: 'I (A)',         format: (v) => v.toFixed(2) },
      { key: 't',      label: 't (s)',         format: (v) => v.toFixed(1) },
      { key: 'Q',      label: 'Q = I·t (C)',   format: (v) => v.toFixed(2) },
      { key: 'molH2',  label: 'mol H₂',        format: (v) => v.toExponential(2) },
      { key: 'molO2',  label: 'mol O₂',        format: (v) => v.toExponential(2) },
      { key: 'mlH2',   label: 'V H₂ (mL STP)', format: (v) => v.toFixed(2) },
      { key: 'mlO2',   label: 'V O₂ (mL STP)', format: (v) => v.toFixed(2) },
      { key: 'ratio',  label: 'H₂/O₂',         format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Set I = 1 A. Reset. Run for 30 seconds; click Record.',
      'Reset, run for 60 s. Record. Then 90 s. Verify mol H₂ doubles and triples.',
      'Now set I = 2 A. Run 30 s. Same charge as 1 A × 60 s — same gas amount.',
      'Across all rows: H₂ : O₂ should be exactly 2 : 1 (because water is H₂O).',
      'Compute: predicted mol H₂ = Q / (2F). Compare to your data.',
    ],
    predict: 'Predict the mol H₂ produced for I = 1.5 A running for 100 s. Use n = It / (zF), z = 2.',
    source: () => {
      const ml1 = state.qH2 * Vm * 1000;
      const ml2 = state.qO2 * Vm * 1000;
      return {
        I: params.current,
        t: state.t,
        Q: params.current * state.t,
        molH2: state.qH2,
        molO2: state.qO2,
        mlH2: ml1,
        mlO2: ml2,
        ratio: state.qO2 > 1e-9 ? state.qH2 / state.qO2 : NaN,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
