import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { tr } from '../../../i18n/index.js';

const L = (en, id) => tr({ en, id });
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const WATER0 = 50; // cm³ of water in the cylinder before a block goes in
const LIQUIDS = [
  { name: { en: 'oil', id: 'minyak' },   rho: 0.90, color: 'rgba(250,204,21,0.45)',  frac: 0.32 },
  { name: { en: 'water', id: 'air' },    rho: 1.00, color: 'rgba(56,189,248,0.45)',  frac: 0.36 },
  { name: { en: 'honey', id: 'madu' },   rho: 1.42, color: 'rgba(217,119,6,0.65)',   frac: 0.32 },
];
const MYSTERIES = [
  { name: { en: 'copper', id: 'tembaga' }, rho: 8.96 },
  { name: { en: 'glass', id: 'kaca' },     rho: 2.50 },
  { name: { en: 'rubber', id: 'karet' },   rho: 1.10 },
  { name: { en: 'wax', id: 'lilin' },      rho: 0.95 },
];

function makeBlocks() {
  const m = MYSTERIES[Math.floor(Math.random() * MYSTERIES.length)];
  const list = [
    { name: { en: 'cork', id: 'gabus' },           rho: 0.24, V: 40, color: '#d4a373' },
    { name: { en: 'wood', id: 'kayu' },            rho: 0.50, V: 30, color: '#a16207' },
    { name: { en: 'ice', id: 'es' },               rho: 0.92, V: 50, color: '#bae6fd' },
    { name: { en: 'plastic', id: 'plastik' },      rho: 1.20, V: 25, color: '#f472b6' },
    { name: { en: 'aluminium', id: 'aluminium' },  rho: 2.70, V: 20, color: '#cbd5e1' },
    { name: { en: 'iron', id: 'besi' },            rho: 7.90, V: 20, color: '#64748b' },
    { name: { en: 'gold', id: 'emas' },            rho: 19.3, V: 10, color: '#facc15' },
    { name: { en: 'mystery', id: 'misteri' },      rho: m.rho, V: 30, color: '#a78bfa', mystery: m },
  ];
  return list.map((b, i) => ({ ...b, id: i, mass: Math.round(b.rho * b.V * 10) / 10,
    x: 0, y: 0, zone: 'shelf', mKnown: false, vKnown: false }));
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  let blocks = makeBlocks();
  let order = blocks.map((b) => b.id); // draw order, last = on top
  let focus = null;
  let revealed = false;
  let waterLevel = WATER0;
  let placed = false;

  const sizeOf = (b, W) => 0.016 * W * Math.cbrt(b.V);
  const nameOf = (b) => (b.mystery && !revealed ? L('mystery ?', 'misteri ?')
    : b.mystery ? `${L('mystery', 'misteri')} = ${tr(b.mystery.name)}` : tr(b.name));

  function geom() {
    const W = cv.width, H = cv.height;
    return {
      W, H,
      shelf: { x: 0.03 * W, y: 0.06 * H, w: 0.55 * W, h: 0.16 * H },
      balance: { x: 0.04 * W, y: 0.62 * H, w: 0.2 * W, h: 0.3 * H },
      cyl: { x: 0.37 * W, y: 0.3 * H, w: 0.1 * W, h: 0.62 * H },
      col: { x: 0.66 * W, y: 0.3 * H, w: 0.18 * W, h: 0.62 * H },
    };
  }

  function targetOf(b, g) {
    const s = sizeOf(b, g.W);
    if (b.zone === 'shelf') {
      const slot = g.shelf.w / blocks.length;
      return { x: g.shelf.x + slot * (b.id + 0.5), y: g.shelf.y + g.shelf.h - s / 2 - 4 };
    }
    if (b.zone === 'balance') return { x: g.balance.x + g.balance.w / 2, y: g.balance.y + 0.42 * g.balance.h - s / 2 };
    if (b.zone === 'cylinder') return { x: g.cyl.x + g.cyl.w / 2, y: g.cyl.y + g.cyl.h - s / 2 - 3 };
    // column: settle at the right layer
    const inCol = blocks.filter((o) => o.zone === 'column');
    const k = inCol.indexOf(b);
    const x = g.col.x + g.col.w * ((k + 1) / (inCol.length + 1));
    let top = g.col.y;
    let above = 0; // density of the liquid above the current boundary (0 = air)
    for (const liq of LIQUIDS) {
      if (b.rho < liq.rho) {
        const f = (b.rho - above) / (liq.rho - above); // fraction inside this liquid
        return { x, y: top + s * (f - 0.5) };
      }
      top += liq.frac * g.col.h;
      above = liq.rho;
    }
    return { x, y: g.col.y + g.col.h - s / 2 - 3 };
  }

  const inRect = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;

  function draw(dt) {
    const g = geom();
    const { W, H } = g;
    if (W < 10 || H < 10) return;
    const ctx = cv.ctx;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'left';

    // Move blocks toward their targets and the water toward its level
    const k = 1 - Math.exp(-dt * 8);
    for (const b of blocks) {
      if (b.zone === 'drag') continue;
      const t = targetOf(b, g);
      if (!placed) { b.x = t.x; b.y = t.y; continue; }
      b.x += (t.x - b.x) * k; b.y += (t.y - b.y) * k;
    }
    placed = true;
    const inCyl = blocks.find((b) => b.zone === 'cylinder');
    waterLevel += ((WATER0 + (inCyl ? inCyl.V : 0)) - waterLevel) * k;

    // Shelf
    ctx.fillStyle = 'rgba(148,163,184,0.15)';
    ctx.fillRect(g.shelf.x, g.shelf.y + g.shelf.h, g.shelf.w, 6);
    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.font = `bold 12px ${MONO}`;
    ctx.fillText(L('Drag a block onto the balance, then into the cylinder', 'Seret balok ke timbangan, lalu ke gelas ukur'), g.shelf.x, g.shelf.y - 6);

    drawBalance(ctx, g);
    drawCylinder(ctx, g);
    drawColumn(ctx, g);

    for (const id of order) {
      const b = blocks[id];
      const s = sizeOf(b, W);
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x - s / 2, b.y - s / 2, s, s);
      ctx.strokeStyle = b === focus ? '#fff' : 'rgba(0,0,0,0.5)';
      ctx.lineWidth = b === focus ? 2.5 : 1;
      ctx.strokeRect(b.x - s / 2, b.y - s / 2, s, s);
      if (b.zone === 'cylinder' && b.rho < 1) { // thin rod holds floaters under water
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(b.x, g.cyl.y - 10); ctx.lineTo(b.x, b.y - s / 2); ctx.stroke();
      }
      ctx.fillStyle = '#e2e8f0';
      ctx.font = `10px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.fillText(b.mystery && !revealed ? '?' : tr(b.name), b.x, b.y - s / 2 - 4);
      ctx.textAlign = 'left';
    }
    drawReadout(ctx, g);
  }

  function drawBalance(ctx, g) {
    const r = g.balance;
    const cx = r.x + r.w / 2;
    ctx.fillStyle = '#334155';
    ctx.fillRect(r.x, r.y + 0.42 * r.h, r.w, 0.06 * r.h); // pan
    ctx.fillRect(cx - 10, r.y + 0.48 * r.h, 20, 0.1 * r.h); // stem
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(r.x + 10, r.y + 0.58 * r.h, r.w - 20, 0.4 * r.h); // body
    ctx.fillStyle = '#052e16';
    ctx.fillRect(r.x + 24, r.y + 0.66 * r.h, r.w - 48, 0.2 * r.h); // display
    const on = blocks.find((b) => b.zone === 'balance');
    ctx.fillStyle = '#4ade80';
    ctx.font = `bold 16px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillText(on ? `${on.mass.toFixed(1)} g` : '0.0 g', cx, r.y + 0.8 * r.h);
    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.font = `11px ${MONO}`;
    ctx.fillText(L('balance (g)', 'timbangan (g)'), cx, r.y + r.h + 12);
    ctx.textAlign = 'left';
  }

  function drawCylinder(ctx, g) {
    const r = g.cyl;
    const yOf = (v) => r.y + r.h - (v / 150) * r.h;
    ctx.fillStyle = 'rgba(56,189,248,0.4)';
    ctx.fillRect(r.x, yOf(waterLevel), r.w, r.y + r.h - yOf(waterLevel));
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x, r.y + r.h); ctx.lineTo(r.x + r.w, r.y + r.h); ctx.lineTo(r.x + r.w, r.y); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.font = `9px ${MONO}`;
    for (let v = 0; v <= 150; v += 10) {
      const y = yOf(v);
      ctx.strokeStyle = 'rgba(226,232,240,0.6)';
      ctx.beginPath(); ctx.moveTo(r.x + r.w, y); ctx.lineTo(r.x + r.w - (v % 50 === 0 ? 14 : 7), y); ctx.stroke();
      if (v % 50 === 0) { ctx.fillStyle = '#e2e8f0'; ctx.fillText(`${v}`, r.x + r.w + 4, y + 3); }
    }
    ctx.fillStyle = '#38bdf8';
    ctx.font = `bold 11px ${MONO}`;
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(waterLevel)} cm³`, r.x - 6, yOf(waterLevel) + 4);
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.font = `11px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillText(L('measuring cylinder', 'gelas ukur'), r.x + r.w / 2, r.y + r.h + 12);
    ctx.textAlign = 'left';
  }

  function drawColumn(ctx, g) {
    const r = g.col;
    let y = r.y;
    ctx.font = `10px ${MONO}`;
    for (const liq of LIQUIDS) {
      const h = liq.frac * r.h;
      ctx.fillStyle = liq.color;
      ctx.fillRect(r.x, y, r.w, h);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`${tr(liq.name)} ${liq.rho.toFixed(2)} g/cm³`, r.x + r.w + 6, y + 14);
      y += h;
    }
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x, r.y + r.h); ctx.lineTo(r.x + r.w, r.y + r.h); ctx.lineTo(r.x + r.w, r.y); ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.font = `11px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillText(L('density column', 'kolom massa jenis'), r.x + r.w / 2, r.y + r.h + 12);
    ctx.textAlign = 'left';
  }

  function drawReadout(ctx, g) {
    const x = 0.62 * g.W, y = 0.03 * g.H, w = 0.36 * g.W;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x, y, w, 0.22 * g.H);
    ctx.font = `bold 12px ${MONO}`;
    ctx.fillStyle = '#fff';
    const lh = 0.04 * g.H;
    if (!focus) {
      ctx.fillText(L('Pick up a block to start', 'Ambil sebuah balok untuk mulai'), x + 10, y + lh);
      return;
    }
    const b = focus;
    ctx.fillStyle = b.color;
    ctx.fillText(nameOf(b), x + 10, y + lh);
    ctx.fillStyle = '#fff';
    ctx.font = `11px ${MONO}`;
    const mTxt = b.mKnown ? `${b.mass.toFixed(1)} g` : L('? (use the balance)', '? (pakai timbangan)');
    const vTxt = b.vKnown ? `${WATER0 + b.V} − ${WATER0} = ${b.V} cm³` : L('? (use the cylinder)', '? (pakai gelas ukur)');
    ctx.fillText(`${L('mass', 'massa')} = ${mTxt}`, x + 10, y + 2 * lh);
    ctx.fillText(`${L('volume', 'volume')} = ${vTxt}`, x + 10, y + 3 * lh);
    if (b.mKnown && b.vKnown) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`${L('density', 'massa jenis')} = ${b.mass.toFixed(1)} ÷ ${b.V} = ${b.rho.toFixed(2)} g/cm³`, x + 10, y + 4 * lh);
      ctx.fillStyle = b.rho < 1 ? '#4ade80' : '#f87171';
      ctx.fillText(b.rho < 1 ? L('floats in water (less than 1.00)', 'terapung di air (kurang dari 1,00)')
        : L('sinks in water (more than 1.00)', 'tenggelam di air (lebih dari 1,00)'), x + 10, y + 5 * lh);
    } else {
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.fillText(`${L('density', 'massa jenis')} = ${L('mass ÷ volume', 'massa ÷ volume')}`, x + 10, y + 4 * lh);
    }
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      const W = cv.width;
      for (let i = order.length - 1; i >= 0; i--) {
        const b = blocks[order[i]];
        const s = sizeOf(b, W) / 2 + 4;
        if (Math.abs(sx - b.x) <= s && Math.abs(sy - b.y) <= s) return b.id;
      }
      return null;
    },
    onStart(id) {
      const b = blocks[id];
      b.zone = 'drag';
      focus = b;
      order = order.filter((o) => o !== id).concat(id);
    },
    onDrag(id, sx, sy) { blocks[id].x = sx; blocks[id].y = sy; },
    onEnd(id) {
      const b = blocks[id];
      const g = geom();
      let zone = 'shelf';
      if (inRect(g.balance, b.x, b.y)) zone = 'balance';
      else if (inRect(g.cyl, b.x, b.y)) zone = 'cylinder';
      else if (inRect(g.col, b.x, b.y)) zone = 'column';
      if (zone === 'balance' || zone === 'cylinder') {
        for (const o of blocks) if (o !== b && o.zone === zone) o.zone = 'shelf';
      }
      if (zone === 'balance') b.mKnown = true;
      if (zone === 'cylinder') b.vKnown = true;
      b.zone = zone;
    },
    handles: () => blocks.map((b) => ({ id: b.id, x: b.x, y: b.y, label: `${nameOf(b)} ${L('block', 'balok')}` })),
    cursor: 'default',
    hoverCursor: 'grab',
  });

  const resetBtn = button({ label: L('Reset blocks', 'Atur ulang balok'), onClick: () => {
    blocks = makeBlocks(); order = blocks.map((b) => b.id); focus = null; revealed = false; placed = false;
  } });
  const revealBtn = button({ label: L('Reveal mystery block', 'Ungkap balok misteri'), onClick: () => { revealed = !revealed; } });
  ctrlPanel.appendChild(row(resetBtn, revealBtn));

  const lab = labPanel({
    title: L('Density lab — density = mass ÷ volume', 'Lab massa jenis — massa jenis = massa ÷ volume'),
    filename: 'density-lab.csv',
    columns: [
      { key: 'material', label: L('material', 'bahan') },
      { key: 'm', label: L('mass (g)', 'massa (g)'), format: (v) => v.toFixed(1) },
      { key: 'V', label: L('volume (cm³)', 'volume (cm³)') },
      { key: 'rho', label: L('density (g/cm³)', 'massa jenis (g/cm³)'), format: (v) => v.toFixed(2) },
      { key: 'floats', label: L('floats in water?', 'terapung di air?') },
    ],
    procedure: [
      L('Drag the wood block onto the balance. Read its mass in grams.', 'Seret balok kayu ke timbangan. Baca massanya dalam gram.'),
      L('Drag the same block into the cylinder. Volume = new level − 50 cm³.', 'Seret balok yang sama ke gelas ukur. Volume = tinggi baru − 50 cm³.'),
      L('Divide mass by volume. Check the density shown, then press Record.', 'Bagi massa dengan volume. Cek massa jenis yang tampil, lalu tekan Rekam.'),
      L('Repeat for iron, ice, plastic and the mystery block.', 'Ulangi untuk besi, es, plastik dan balok misteri.'),
      L('Drop every block into the column. Does the layer match the density?', 'Jatuhkan semua balok ke kolom. Apakah lapisannya cocok dengan massa jenisnya?'),
    ],
    predict: L('Iron and aluminium blocks have the same volume. Which one is heavier? Will any block float on oil?',
      'Balok besi dan aluminium volumenya sama. Mana yang lebih berat? Apakah ada balok yang terapung di minyak?'),
    source: () => {
      const b = focus;
      if (!b || !b.mKnown || !b.vKnown) return null;
      return { material: nameOf(b), m: b.mass, V: b.V, rho: b.rho, floats: b.rho < 1 ? L('yes', 'ya') : L('no', 'tidak') };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => draw(dt));
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
