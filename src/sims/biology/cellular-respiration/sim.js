import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const STAGES = [
  {
    key: 'glycolysis',
    name: 'Glycolysis (cytoplasm)',
    inputs: 'Glucose + 2 NAD⁺ + 2 ADP',
    outputs: '2 Pyruvate + 2 NADH + 2 ATP',
    deltaATP: 2, deltaNADH: 2, deltaFADH: 0, deltaCO2: 0, deltaO2: 0,
  },
  {
    key: 'pyruvate',
    name: 'Pyruvate oxidation (mitochondrion)',
    inputs: '2 Pyruvate + 2 NAD⁺ + 2 CoA',
    outputs: '2 Acetyl-CoA + 2 NADH + 2 CO₂',
    deltaATP: 0, deltaNADH: 2, deltaFADH: 0, deltaCO2: 2, deltaO2: 0,
  },
  {
    key: 'krebs',
    name: 'Krebs cycle (mitochondrion)',
    inputs: '2 Acetyl-CoA + 6 NAD⁺ + 2 FAD + 2 ADP',
    outputs: '4 CO₂ + 6 NADH + 2 FADH₂ + 2 ATP',
    deltaATP: 2, deltaNADH: 6, deltaFADH: 2, deltaCO2: 4, deltaO2: 0,
  },
  {
    key: 'etc',
    name: 'Electron transport chain + ATP synthase',
    inputs: '10 NADH + 2 FADH₂ + 6 O₂',
    outputs: '6 H₂O + ~26-28 ATP',
    deltaATP: 26, deltaNADH: -10, deltaFADH: -2, deltaCO2: 0, deltaO2: -6,
  },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { stage: 0 };

  function totals() {
    let atp = 0, nadh = 0, fadh = 0, co2 = 0, o2 = 0;
    for (let i = 0; i <= params.stage; i++) {
      const s = STAGES[i];
      atp += s.deltaATP;
      nadh += s.deltaNADH;
      fadh += s.deltaFADH;
      co2 += s.deltaCO2;
      o2 += s.deltaO2;
    }
    return { atp, nadh, fadh, co2, o2 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Stage progress horizontal layout
    const padX = 30, padY = 60;
    const sw = (W - padX * 2) / STAGES.length;
    for (let i = 0; i < STAGES.length; i++) {
      const x = padX + i * sw;
      const active = i <= params.stage;
      ctx.fillStyle = active ? `hsl(${130 + i * 25} 60% 35%)` : 'rgba(60,60,80,0.5)';
      ctx.fillRect(x + 8, padY, sw - 16, 56);
      ctx.strokeStyle = active ? '#fff' : 'rgba(120,130,150,0.5)';
      ctx.lineWidth = active && i === params.stage ? 3 : 1;
      ctx.strokeRect(x + 8, padY, sw - 16, 56);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(STAGES[i].name.split(' (')[0], x + 16, padY + 22);
      ctx.font = '10px var(--font-mono)';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(STAGES[i].name.split(' (')[1] ? '(' + STAGES[i].name.split(' (')[1] : '', x + 16, padY + 38);
      // arrow
      if (i < STAGES.length - 1) {
        ctx.strokeStyle = active && i < params.stage ? '#fbbf24' : 'rgba(120,130,150,0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + sw - 8, padY + 28);
        ctx.lineTo(x + sw + 4, padY + 28);
        ctx.stroke();
      }
    }

    // Current stage details
    const cur = STAGES[params.stage];
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(padX, padY + 80, W - padX * 2, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(cur.name, padX + 16, padY + 102);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(`In:  ${cur.inputs}`, padX + 16, padY + 120);
    ctx.fillText(`Out: ${cur.outputs}`, padX + 16, padY + 136);

    // Cumulative totals
    const t = totals();
    const tY = padY + 170;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(padX, tY, W - padX * 2, 80);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 22px var(--font-mono)';
    ctx.fillText(`${t.atp} ATP`, padX + 20, tY + 32);
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`${t.nadh} NADH`, padX + 200, tY + 28);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText(`${t.fadh} FADH₂`, padX + 320, tY + 28);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`${t.co2} CO₂`, padX + 200, tY + 50);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`${t.o2} O₂ used`, padX + 320, tY + 50);

    // glucose icon at top
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText('Glucose → → → → → → →', padX, 30);
  }

  // controls
  const sS = slider({ label: 'Stage', min: 0, max: STAGES.length - 1, step: 1, value: params.stage,
    onInput: (v) => { params.stage = v; } });
  const stepB = button({ label: 'Next stage', primary: true, onClick: () => {
    params.stage = (params.stage + 1) % STAGES.length;
    sS.value = params.stage;
  } });
  const resetB = button({ label: 'Reset', onClick: () => { params.stage = 0; sS.value = 0; } });
  ctrlPanel.append(sS.el, row(stepB, resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
