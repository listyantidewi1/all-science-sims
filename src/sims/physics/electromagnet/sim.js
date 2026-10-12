import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const CORES = {
  air:   { factor: 1,  color: null,      label: { en: 'Air (hollow)', id: 'Udara (kosong)' } },
  steel: { factor: 5,  color: '#94a3b8', label: { en: 'Steel',        id: 'Baja' } },
  iron:  { factor: 10, color: '#475569', label: { en: 'Iron',         id: 'Besi' } },
};
const MAX_CLIPS = 20;

export function mount(rootEl) {
  const L = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { turns: 20, cells: 2, core: 'iron', on: false };
  // Clips: each has a current drawn position (lerped) and a slot in the pile.
  const clips = Array.from({ length: MAX_CLIPS }, (_, i) => ({ i, x: 0, y: 0, lifted: false, init: false }));
  let needle = -Math.PI / 2;  // compass needle angle, up = north
  let flow = 0;               // current animation phase

  function strength() {
    return params.on ? params.turns * params.cells * CORES[params.core].factor : 0;
  }
  function clipsLifted() {
    return Math.min(MAX_CLIPS, Math.floor(strength() / 100));
  }

  function step(dt) {
    const W = cv.width, H = cv.height;
    if (W === 0 || H === 0) return;
    const S = strength();
    if (params.on) flow += dt * (0.3 + params.cells * 0.3);

    // Compass: swings from north toward the coil as the field grows.
    const pull = Math.min(1, S / 400);
    const target = -Math.PI / 2 + pull * (-Math.PI / 2); // up -> left
    needle += (target - needle) * Math.min(1, dt * 4);

    // Clips: pile slots at the bottom, lifted ones hang under the core.
    const n = clipsLifted();
    const coreX = W * 0.5, coreBottom = H * 0.36 + H * 0.045;
    const pileY = H * 0.88;
    for (const c of clips) {
      c.lifted = c.i < n;
      let tx, ty;
      if (c.lifted) {
        const rowI = Math.floor(c.i / 5), col = c.i % 5;
        tx = coreX + (col - 2) * W * 0.035;
        ty = coreBottom + 14 + rowI * 18;
      } else {
        const rowI = Math.floor(c.i / 10), col = c.i % 10;
        tx = coreX + (col - 4.5) * W * 0.03;
        ty = pileY - rowI * 10;
      }
      if (!c.init) { c.x = tx; c.y = ty; c.init = true; }
      const k = c.lifted ? 6 : 10; // lifting is slower than falling
      c.x += (tx - c.x) * Math.min(1, dt * k);
      c.y += (ty - c.y) * Math.min(1, dt * k);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W === 0 || H === 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const S = strength();
    const font = (px, bold) => `${bold ? 'bold ' : ''}${px}px system-ui, -apple-system, Roboto, sans-serif`;

    // Geometry
    const coreX = W * 0.5, coreY = H * 0.36, coreLen = W * 0.28, coreH = H * 0.09;
    const batX = W * 0.06, batY = H * 0.12, cellW = W * 0.03, cellH = H * 0.1;
    const swX = W * 0.3, swY = batY + cellH / 2;
    const wireY = H * 0.6;

    // Wire loop: battery(+) -> switch -> coil left -> (coil) -> coil right -> down -> back to battery(-)
    const path = [
      [batX + params.cells * cellW, swY], [swX - 22, swY], [swX + 22, swY], [coreX - coreLen / 2, swY],
      [coreX - coreLen / 2, coreY - coreH / 2 - 6], [coreX + coreLen / 2, coreY + coreH / 2 + 6],
      [coreX + coreLen / 2, wireY], [batX, wireY], [batX, swY],
    ];
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 3;
    ctx.beginPath();
    path.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();
    // Switch blade: closed when on, lifted when off
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(swX - 22, swY);
    ctx.lineTo(swX + 22, params.on ? swY : swY - 20);
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    for (const dx of [-22, 22]) { ctx.beginPath(); ctx.arc(swX + dx, swY, 4, 0, Math.PI * 2); ctx.fill(); }
    ctx.font = font(11);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(params.on ? L('switch ON', 'sakelar NYALA') : L('switch OFF', 'sakelar MATI'), swX, swY + 26);

    // Moving charge dots when current flows
    if (params.on) {
      const segs = [];
      let total = 0;
      for (let i = 0; i < path.length - 1; i++) {
        const d = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
        segs.push(d); total += d;
      }
      const nDots = 12 + params.cells * 6;
      ctx.fillStyle = '#fbbf24';
      for (let k = 0; k < nDots; k++) {
        let dist = ((k / nDots + flow) % 1) * total;
        for (let i = 0; i < segs.length; i++) {
          if (dist <= segs[i]) {
            const u = dist / segs[i];
            const x = path[i][0] + (path[i + 1][0] - path[i][0]) * u;
            const y = path[i][1] + (path[i + 1][1] - path[i][1]) * u;
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
            break;
          }
          dist -= segs[i];
        }
      }
    }

    // Battery pack
    for (let i = 0; i < params.cells; i++) {
      const x = batX + i * cellW;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x, batY, cellW - 3, cellH);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x, batY, cellW - 3, cellH * 0.3);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + (cellW - 3) / 2 - 4, batY - 4, 8, 4);
    }
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`${params.cells} ${L(params.cells === 1 ? 'cell' : 'cells', 'sel')}`, batX + params.cells * cellW / 2, batY + cellH + 16);

    // Field lines around the coil (more, brighter lines as strength grows)
    if (S > 0) {
      const nLines = Math.min(6, 1 + Math.floor(S / 300));
      for (let i = 1; i <= nLines; i++) {
        ctx.strokeStyle = `rgba(56,189,248,${0.15 + 0.5 * Math.min(1, S / 1500)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(coreX, coreY, coreLen * 0.55 + i * W * 0.03, coreH * 0.8 + i * H * 0.055, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = '#38bdf8';
      ctx.font = font(13, true);
      ctx.fillText('N', coreX - coreLen / 2 - 18, coreY + 5);
      ctx.fillText('S', coreX + coreLen / 2 + 18, coreY + 5);
    }

    // Core
    const core = CORES[params.core];
    if (core.color) {
      ctx.fillStyle = core.color;
      ctx.fillRect(coreX - coreLen / 2, coreY - coreH / 2, coreLen, coreH);
    } else {
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(148,163,184,0.5)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(coreX - coreLen / 2, coreY - coreH / 2, coreLen, coreH);
      ctx.setLineDash([]);
    }
    // Coil turns
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.2;
    for (let i = 0; i < params.turns; i++) {
      const x = coreX - coreLen / 2 + 10 + (i + 0.5) * ((coreLen - 20) / params.turns);
      ctx.beginPath();
      ctx.ellipse(x, coreY, 5, coreH / 2 + 6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = '#cbd5e1';
    ctx.font = font(12);
    ctx.fillText(`${params.turns} ${L('turns', 'lilitan')} · ${L('core', 'inti')}: ${L(core.label.en, core.label.id)}`, coreX, coreY - coreH / 2 - 14);

    // Compass
    const cpx = W * 0.86, cpy = H * 0.36, cpr = Math.min(W, H) * 0.08;
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.arc(cpx, cpy, cpr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = font(11, true);
    ctx.fillText('N', cpx, cpy - cpr + 14);
    ctx.save();
    ctx.translate(cpx, cpy);
    ctx.rotate(needle + Math.PI / 2);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.moveTo(0, -cpr * 0.8); ctx.lineTo(-5, 0); ctx.lineTo(5, 0); ctx.fill();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.moveTo(0, cpr * 0.8); ctx.lineTo(-5, 0); ctx.lineTo(5, 0); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#cbd5e1';
    ctx.font = font(12);
    ctx.fillText(L('compass', 'kompas'), cpx, cpy + cpr + 16);

    // Paper clips (tray + clips)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(coreX - W * 0.17, H * 0.9, W * 0.34, 8);
    for (const c of clips) {
      ctx.strokeStyle = c.lifted ? '#e2e8f0' : '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(c.x - 5, c.y - 8, 10, 16, 5);
      ctx.stroke();
    }
    ctx.fillStyle = '#cbd5e1';
    ctx.font = font(12);
    ctx.fillText(L('paper clips', 'klip kertas'), coreX, H * 0.9 + 22);

    // Readout
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W * 0.68, H * 0.62, W * 0.3, H * 0.3);
    ctx.fillStyle = '#fff';
    ctx.font = font(13, true);
    ctx.fillText(L('Magnet strength', 'Kekuatan magnet'), W * 0.7, H * 0.68);
    ctx.fillStyle = '#334155';
    ctx.fillRect(W * 0.7, H * 0.71, W * 0.26, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(W * 0.7, H * 0.71, W * 0.26 * Math.min(1, S / 2000), 10);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = font(12);
    ctx.fillText(`${params.on ? params.turns : 0} × ${params.on ? params.cells : 0} × ${CORES[params.core].factor} = ${S}`, W * 0.7, H * 0.78);
    ctx.fillText(L('turns × cells × core', 'lilitan × sel × inti'), W * 0.7, H * 0.83);
    ctx.fillStyle = '#fbbf24';
    ctx.font = font(14, true);
    ctx.fillText(`${clipsLifted()} ${L('clips lifted', 'klip terangkat')}`, W * 0.7, H * 0.895);
  }

  // Controls
  const turnsS = slider({ label: L('Turns of wire', 'Jumlah lilitan'), key: 'turns', min: 5, max: 50, step: 5, value: params.turns,
    onInput: (v) => { params.turns = v; } });
  const cellsS = slider({ label: L('Battery cells (current)', 'Sel baterai (arus)'), key: 'cells', min: 1, max: 4, step: 1, value: params.cells,
    onInput: (v) => { params.cells = v; } });
  const coreSel = select({ label: L('Core material', 'Bahan inti'), key: 'core', value: params.core,
    options: Object.keys(CORES).map((k) => ({ value: k, label: L(CORES[k].label.en, CORES[k].label.id) })),
    onChange: (v) => { params.core = v; } });
  const sw = toggle({ label: L('Switch on', 'Nyalakan sakelar'), key: 'on', value: params.on, onChange: (v) => { params.on = v; } });
  ctrlPanel.append(turnsS.el, cellsS.el, coreSel.el, row(sw));

  const lab = labPanel({
    title: L('Electromagnet lab', 'Lab elektromagnet'),
    filename: 'electromagnet-lab.csv',
    columns: [
      { key: 'turns', label: L('turns', 'lilitan') },
      { key: 'cells', label: L('cells', 'sel') },
      { key: 'core',  label: L('core', 'inti') },
      { key: 'clips', label: L('clips lifted', 'klip terangkat') },
    ],
    procedure: [
      L('Turn the switch on. Set 1 cell, air core, 10 turns. Record.', 'Nyalakan sakelar. Atur 1 sel, inti udara, 10 lilitan. Catat.'),
      L('Change only the turns: 20, 30, 40, 50. Record each time.', 'Ubah hanya lilitan: 20, 30, 40, 50. Catat setiap kali.'),
      L('Go back to 20 turns. Change only the cells: 1, 2, 3, 4. Record.', 'Kembali ke 20 lilitan. Ubah hanya sel: 1, 2, 3, 4. Catat.'),
      L('Keep 20 turns and 2 cells. Try air, steel and iron cores. Record.', 'Tetap 20 lilitan dan 2 sel. Coba inti udara, baja, dan besi. Catat.'),
      L('Which change made the biggest difference? Look at your table.', 'Perubahan mana yang paling berpengaruh? Lihat tabelmu.'),
    ],
    predict: L('If you double the number of turns, will the magnet lift about twice as many clips, or more, or fewer?',
      'Jika jumlah lilitan digandakan, apakah klip yang terangkat jadi dua kali lipat, lebih, atau kurang?'),
    source: () => ({ turns: params.turns, cells: params.cells, core: L(CORES[params.core].label.en, CORES[params.core].label.id), clips: clipsLifted() }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
