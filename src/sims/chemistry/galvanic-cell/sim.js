import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const METALS = {
  Li: { name: 'Lithium', E: -3.04, color: '#fef3c7' },
  Mg: { name: 'Magnesium', E: -2.37, color: '#94a3b8' },
  Al: { name: 'Aluminium', E: -1.66, color: '#cbd5e1' },
  Zn: { name: 'Zinc', E: -0.76, color: '#a5b4fc' },
  Fe: { name: 'Iron', E: -0.44, color: '#a78bfa' },
  Pb: { name: 'Lead', E: -0.13, color: '#71717a' },
  Cu: { name: 'Copper', E: 0.34, color: '#fb923c' },
  Ag: { name: 'Silver', E: 0.80, color: '#e5e7eb' },
  Au: { name: 'Gold', E: 1.50, color: '#fbbf24' },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { left: 'Zn', right: 'Cu' };

  function voltage() {
    const Eleft = METALS[params.left].E;
    const Eright = METALS[params.right].E;
    return Math.abs(Eright - Eleft);
  }
  function anodeIsLeft() {
    // anode = lower E (gives up electrons)
    return METALS[params.left].E < METALS[params.right].E;
  }

  let t = 0;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cy = H / 2;
    const beakerW = 180, beakerH = 220;
    const leftX = W * 0.25 - beakerW / 2, rightX = W * 0.75 - beakerW / 2;
    const beakerY = cy - beakerH / 2 + 20;

    // Beakers
    function drawBeaker(x, metalKey, label) {
      const m = METALS[metalKey];
      ctx.strokeStyle = 'rgba(120,130,150,0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, beakerY);
      ctx.lineTo(x, beakerY + beakerH);
      ctx.lineTo(x + beakerW, beakerY + beakerH);
      ctx.lineTo(x + beakerW, beakerY);
      ctx.stroke();
      // solution
      ctx.fillStyle = m.color + '88';
      ctx.fillRect(x + 2, beakerY + 30, beakerW - 4, beakerH - 32);
      // electrode
      ctx.fillStyle = m.color;
      ctx.fillRect(x + beakerW / 2 - 10, beakerY + 10, 20, beakerH - 30);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + beakerW / 2 - 10, beakerY + 10, 20, beakerH - 30);
      // label
      ctx.fillStyle = 'rgba(120,130,150,0.95)';
      ctx.font = 'bold 13px var(--font-sans)';
      ctx.fillText(`${m.name} (${metalKey})`, x + 10, beakerY + beakerH + 18);
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`E° = ${m.E >= 0 ? '+' : ''}${m.E.toFixed(2)} V`, x + 10, beakerY + beakerH + 34);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(label, x + beakerW / 2 - 18, beakerY - 6);
    }
    const left = anodeIsLeft() ? '— Anode' : '+ Cathode';
    const right = anodeIsLeft() ? '+ Cathode' : '— Anode';
    drawBeaker(leftX, params.left, left);
    drawBeaker(rightX, params.right, right);

    // wires & LED
    const e1x = leftX + beakerW / 2, e1y = beakerY;
    const e2x = rightX + beakerW / 2, e2y = beakerY;
    const topY = beakerY - 60;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(e1x, e1y); ctx.lineTo(e1x, topY); ctx.lineTo(e2x, topY); ctx.lineTo(e2x, e2y);
    ctx.stroke();

    // LED in middle
    const ledX = (e1x + e2x) / 2, ledY = topY;
    const v = voltage();
    ctx.fillStyle = v > 0 ? `rgba(245,158,11,${Math.min(1, v / 2)})` : '#1f2937';
    ctx.beginPath();
    ctx.arc(ledX, ledY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // electron flow animation
    if (v > 0.01) {
      const electronSpeed = v * 60;
      const flowDir = anodeIsLeft() ? 1 : -1;  // electrons leave anode
      const dots = 12;
      // From anode up the wire, across the top, down to cathode
      for (let i = 0; i < dots; i++) {
        const u = ((i / dots) + (t * electronSpeed * 0.01) % 1) % 1;
        let x, y;
        if (u < 0.25) {
          // up wire from left anode (or right anode)
          const startX = anodeIsLeft() ? e1x : e2x;
          x = startX;
          y = e1y + (topY - e1y) * (u / 0.25);
        } else if (u < 0.75) {
          // across top
          const u2 = (u - 0.25) / 0.5;
          x = anodeIsLeft() ? e1x + (e2x - e1x) * u2 : e2x + (e1x - e2x) * u2;
          y = topY;
        } else {
          // down to cathode
          const u2 = (u - 0.75) / 0.25;
          const endX = anodeIsLeft() ? e2x : e1x;
          x = endX;
          y = topY + (e2y - topY) * u2;
        }
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // arrow direction label
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(`e⁻ →`, ledX + 22, topY - 8);
    }

    // salt bridge
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(leftX + beakerW, beakerY + 70);
    ctx.lineTo(rightX, beakerY + 70);
    ctx.stroke();
    ctx.fillStyle = '#a78bfa';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText('salt bridge', (leftX + beakerW + rightX) / 2 - 30, beakerY + 60);

    // Voltage display
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 240, 36);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px var(--font-mono)';
    ctx.fillText(`E°_cell = ${v.toFixed(2)} V`, 16, 32);
  }

  // controls
  const lSel = select({
    label: 'Left half-cell',
    options: Object.entries(METALS).map(([k, v]) => ({ value: k, label: `${v.name} (${k})` })),
    value: params.left,
    onChange: (v) => { params.left = v; },
  });
  const rSel = select({
    label: 'Right half-cell',
    options: Object.entries(METALS).map(([k, v]) => ({ value: k, label: `${v.name} (${k})` })),
    value: params.right,
    onChange: (v) => { params.right = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, l, r] of [['Daniell (Zn|Cu)', 'Zn', 'Cu'], ['Magnesium-silver', 'Mg', 'Ag'], ['Iron-copper', 'Fe', 'Cu'], ['Same metal', 'Cu', 'Cu']]) {
    const b = button({ label: name, onClick: () => { params.left = l; params.right = r; lSel.value = l; rSel.value = r; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(lSel.el, rSel.el, presetRow);

  // Lab — predict cell voltage E°_cell = E°_cathode − E°_anode for various pairs.
  const lab = labPanel({
    title: 'Galvanic cell lab — standard cell potentials',
    filename: 'galvanic-cell-lab.csv',
    columns: [
      { key: 'left',     label: 'left' },
      { key: 'leftE',    label: 'E°_L (V)', format: (v) => v.toFixed(2) },
      { key: 'right',    label: 'right' },
      { key: 'rightE',   label: 'E°_R (V)', format: (v) => v.toFixed(2) },
      { key: 'cellE',    label: 'E°_cell (V)', format: (v) => v.toFixed(3) },
      { key: 'spontaneous', label: 'spontaneous?' },
    ],
    procedure: [
      'Daniell cell: Zn (anode, −0.76) || Cu (cathode, +0.34). Predict E°_cell = 0.34 − (−0.76) = 1.10 V.',
      'Set Zn / Cu and verify. Record.',
      'Try Mg / Cu — E°_cell = 0.34 − (−2.37) = 2.71 V (a much more powerful cell).',
      'Try Ag / Cu (Ag at right) — E°_cell = 0.80 − 0.34 = 0.46 V.',
      'Try Cu / Zn (reversed) — E°_cell = −1.10 V (non-spontaneous; would need external power = electrolysis).',
    ],
    predict: 'You want a 2 V cell. Pick metals from the list and predict the pair.',
    source: () => {
      const E = METALS[params.right].E - METALS[params.left].E;
      return {
        left: METALS[params.left].name,
        leftE: METALS[params.left].E,
        right: METALS[params.right].name,
        rightE: METALS[params.right].E,
        cellE: E,
        spontaneous: E > 0 ? 'yes' : 'no (would need external V)',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { t += dt; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
