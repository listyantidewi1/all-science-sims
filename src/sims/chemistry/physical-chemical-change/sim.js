import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const SIGNS = {
  gas:    { en: 'gas given off', id: 'gas keluar' },
  colour: { en: 'colour change', id: 'perubahan warna' },
  heat:   { en: 'heat or light', id: 'panas atau cahaya' },
  new:    { en: 'new substance', id: 'zat baru' },
};
// pb/pa: particle colours before/after; ab/aa: arrangement before/after.
const CARDS = [
  { key: 'ice', en: 'Ice melting', id: 'Es mencair', chem: false, signs: [], pb: ['#93c5fd'], pa: ['#93c5fd'], ab: 'solid', aa: 'liquid',
    why: { en: 'Solid water becomes liquid water. Same particles, just moving more freely. Freeze it and you get ice back.', id: 'Air padat menjadi air cair. Partikelnya sama, hanya bergerak lebih bebas. Bekukan lagi dan es kembali.' } },
  { key: 'paper', en: 'Paper burning', id: 'Kertas terbakar', chem: true, signs: ['gas', 'colour', 'heat', 'new'], pb: ['#d4a373', '#bfdbfe'], pa: ['#64748b', '#e2e8f0', '#1f2937'], ab: 'liquid', aa: 'gas',
    why: { en: 'Paper and oxygen turn into ash, smoke and water vapour: new substances. You cannot un-burn paper.', id: 'Kertas dan oksigen berubah jadi abu, asap, dan uap air: zat baru. Kertas tidak bisa dikembalikan.' } },
  { key: 'rust', en: 'Iron rusting', id: 'Besi berkarat', chem: true, signs: ['colour', 'new'], pb: ['#94a3b8', '#bfdbfe'], pa: ['#b45309'], ab: 'solid', aa: 'solid',
    why: { en: 'Iron joins with oxygen from the air to make rust, a new orange-brown substance.', id: 'Besi bergabung dengan oksigen dari udara membentuk karat, zat baru berwarna cokelat oranye.' } },
  { key: 'sugar', en: 'Sugar dissolving', id: 'Gula melarut', chem: false, signs: [], pb: ['#fde68a', '#60a5fa'], pa: ['#fde68a', '#60a5fa'], ab: 'split', aa: 'liquid',
    why: { en: 'Sugar particles spread out between water particles. Evaporate the water and the sugar is back.', id: 'Partikel gula menyebar di antara partikel air. Uapkan airnya dan gula kembali.' } },
  { key: 'cake', en: 'Cake baking', id: 'Kue dipanggang', chem: true, signs: ['gas', 'colour', 'heat', 'new'], pb: ['#fde68a', '#f8fafc', '#fcd34d'], pa: ['#b45309', '#92400e'], ab: 'liquid', aa: 'solid',
    why: { en: 'Heat makes flour, eggs and sugar react into something new: spongy cake with a brown crust and gas bubbles inside.', id: 'Panas membuat tepung, telur, dan gula bereaksi jadi sesuatu yang baru: kue empuk dengan kerak cokelat dan gelembung gas di dalamnya.' } },
  { key: 'glass', en: 'Glass breaking', id: 'Kaca pecah', chem: false, signs: [], pb: ['#a5f3fc'], pa: ['#a5f3fc'], ab: 'solid', aa: 'split',
    why: { en: 'The pieces are still glass. The shape changed, the particles did not.', id: 'Pecahannya masih kaca. Bentuknya berubah, partikelnya tidak.' } },
  { key: 'milk', en: 'Milk souring', id: 'Susu basi', chem: true, signs: ['new'], pb: ['#f8fafc'], pa: ['#fef3c7', '#a3e635'], ab: 'liquid', aa: 'liquid',
    why: { en: 'Bacteria change milk sugar into lactic acid, a new substance. That is why it smells and tastes sour.', id: 'Bakteri mengubah gula susu menjadi asam laktat, zat baru. Itu sebabnya baunya dan rasanya asam.' } },
  { key: 'boil', en: 'Water boiling', id: 'Air mendidih', chem: false, signs: [], pb: ['#60a5fa'], pa: ['#60a5fa'], ab: 'liquid', aa: 'gas',
    why: { en: 'The bubbles are water vapour, still water particles. Cool the steam and it is liquid water again.', id: 'Gelembungnya uap air, masih partikel air. Dinginkan uapnya dan jadi air cair lagi.' } },
  { key: 'wood', en: 'Wood cutting', id: 'Kayu dipotong', chem: false, signs: [], pb: ['#a16207'], pa: ['#a16207'], ab: 'solid', aa: 'split',
    why: { en: 'Two pieces of wood are still wood. Only the size and shape changed.', id: 'Dua potong kayu tetap kayu. Hanya ukuran dan bentuknya berubah.' } },
  { key: 'fire', en: 'Fireworks exploding', id: 'Kembang api meledak', chem: true, signs: ['gas', 'colour', 'heat', 'new'], pb: ['#1f2937', '#f87171'], pa: ['#fde047', '#f472b6', '#94a3b8'], ab: 'solid', aa: 'gas',
    why: { en: 'Gunpowder and metal salts burn into hot gases and coloured light. New substances, lots of heat and light.', id: 'Bubuk mesiu dan garam logam terbakar jadi gas panas dan cahaya berwarna. Zat baru, banyak panas dan cahaya.' } },
];

export function mount(rootEl) {
  const L = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  let idx = 0;
  const answers = {};   // key -> 'physical' | 'chemical'
  let anim = 0;         // 0..1, loops
  const card = () => CARDS[idx];
  const ease = (u) => u * u * (3 - 2 * u);
  const font = (px, bold) => `${bold ? 'bold ' : ''}${px}px system-ui, -apple-system, Roboto, sans-serif`;

  function scene(ctx, key, x, y, w, h, p, t) {
    const cx = x + w / 2, cy = y + h / 2;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    if (key === 'ice') {
      ctx.fillStyle = 'rgba(96,165,250,0.6)';
      ctx.beginPath(); ctx.ellipse(cx, cy + 28, 10 + p * w * 0.3, 4 + p * 8, 0, 0, Math.PI * 2); ctx.fill();
      const s = 50 * (1 - p * 0.85);
      ctx.fillStyle = '#bfdbfe'; ctx.fillRect(cx - s / 2, cy + 28 - s, s, s);
    } else if (key === 'paper') {
      const ph = 60 * (1 - p);
      ctx.fillStyle = '#f5f5f4'; ctx.fillRect(cx - 24, cy + 30 - ph, 48, ph);
      if (p < 1) { ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(cx, cy + 30 - ph - 8, 20, 12 + Math.sin(t * 15) * 3, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.ellipse(cx, cy + 32, 10 + p * 24, 3 + p * 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      for (let i = 0; i < 4; i++) ctx.beginPath(), ctx.arc(cx - 20 + i * 14 + Math.sin(t + i) * 4, cy - 10 - ((t * 25 + i * 15) % 50) * p, 5, 0, Math.PI * 2), ctx.fill();
    } else if (key === 'rust') {
      ctx.fillStyle = '#94a3b8'; ctx.fillRect(cx - 50, cy - 12, 100, 24);
      ctx.fillStyle = '#b45309';
      for (let i = 0; i < Math.floor(p * 14); i++) ctx.beginPath(), ctx.arc(cx - 44 + (i * 37) % 90, cy - 8 + (i * 13) % 18, 4 + (i % 3), 0, Math.PI * 2), ctx.fill();
    } else if (key === 'sugar' || key === 'milk') {
      ctx.fillStyle = key === 'sugar' ? 'rgba(96,165,250,0.5)' : `rgb(${250}, ${250 - p * 15}, ${240 - p * 60})`;
      ctx.fillRect(cx - 28, cy - 30, 56, 64);
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.strokeRect(cx - 30, cy - 34, 60, 70);
      if (key === 'sugar') { const s = 14 * (1 - p); ctx.fillStyle = '#fde68a'; ctx.fillRect(cx - 7, cy - 34 + p * 60 - s, s, s); ctx.fillRect(cx + 8 - s, cy - 20 + p * 46 - s, s, s); }
      else { ctx.fillStyle = '#fde68a'; for (let i = 0; i < Math.floor(p * 8); i++) ctx.beginPath(), ctx.arc(cx - 18 + (i * 23) % 40, cy - 14 + (i * 17) % 40, 5, 0, Math.PI * 2), ctx.fill(); }
    } else if (key === 'cake') {
      ctx.fillStyle = '#64748b'; ctx.fillRect(cx - 40, cy + 10, 80, 24);
      ctx.fillStyle = `rgb(${253 - p * 70}, ${230 - p * 110}, ${138 - p * 100})`;
      ctx.beginPath(); ctx.roundRect(cx - 36, cy + 12 - p * 34, 72, 20 + p * 34, 8); ctx.fill();
      if (p > 0.3) { ctx.strokeStyle = 'rgba(226,232,240,0.6)'; for (let i = 0; i < 3; i++) ctx.beginPath(), ctx.moveTo(cx - 20 + i * 20, cy - 30), ctx.quadraticCurveTo(cx - 14 + i * 20, cy - 40, cx - 20 + i * 20, cy - 50 - Math.sin(t * 2 + i) * 4), ctx.stroke(); }
    } else if (key === 'glass') {
      const d = p * 14;
      ctx.fillStyle = 'rgba(165,243,252,0.5)';
      ctx.beginPath(); ctx.moveTo(cx - 40 - d, cy - 40 - d); ctx.lineTo(cx, cy - 40 - d); ctx.lineTo(cx - 6, cy + 6); ctx.lineTo(cx - 40 - d, cy + 40 + d); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx + 4 + d, cy - 40); ctx.lineTo(cx + 40 + d, cy - 40); ctx.lineTo(cx + 40 + d, cy + 40 + d); ctx.lineTo(cx + 4 + d, cy + 12 + d); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx - 36, cy + 44 + d * 2); ctx.lineTo(cx + 2, cy + 14 + d); ctx.lineTo(cx + 38, cy + 44 + d * 2); ctx.fill();
    } else if (key === 'boil') {
      ctx.fillStyle = '#334155'; ctx.fillRect(cx - 40, cy - 10, 80, 44);
      ctx.fillStyle = 'rgba(96,165,250,0.6)'; ctx.fillRect(cx - 38, cy - 8 + p * 8, 76, 40 - p * 8);
      ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(cx, cy + 44, 24, 8 + Math.sin(t * 10) * 2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      for (let i = 0; i < Math.ceil(p * 6); i++) ctx.beginPath(), ctx.arc(cx - 25 + i * 10, cy + 30 - ((t * 40 + i * 9) % 36), 3, 0, Math.PI * 2), ctx.stroke();
      if (p > 0.5) { ctx.strokeStyle = 'rgba(226,232,240,0.5)'; for (let i = 0; i < 3; i++) ctx.beginPath(), ctx.moveTo(cx - 20 + i * 20, cy - 14), ctx.quadraticCurveTo(cx - 12 + i * 20, cy - 26, cx - 20 + i * 20, cy - 40 - ((t * 20 + i * 10) % 14)), ctx.stroke(); }
    } else if (key === 'wood') {
      const d = p * 22;
      ctx.fillStyle = '#a16207'; ctx.fillRect(cx - 50 - d, cy - 14, 50, 28); ctx.fillRect(cx + d, cy - 14, 50, 28);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
      for (const sx of [cx - 50 - d, cx + d]) { ctx.beginPath(); ctx.moveTo(sx + 4, cy - 6); ctx.lineTo(sx + 46, cy - 6); ctx.moveTo(sx + 4, cy + 6); ctx.lineTo(sx + 46, cy + 6); ctx.stroke(); }
    } else if (key === 'fire') {
      if (p < 0.4) { ctx.fillStyle = '#f87171'; ctx.fillRect(cx - 4, cy + 40 - p * 200, 8, 20); }
      else {
        const u = (p - 0.4) / 0.6;
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2, r = 10 + u * 50;
          ctx.strokeStyle = ['#fde047', '#f472b6', '#38bdf8'][i % 3]; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * 0.5, cy - 20 + Math.sin(a) * r * 0.5); ctx.lineTo(cx + Math.cos(a) * r, cy - 20 + Math.sin(a) * r); ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  function particlePos(type, i, bx, by, bw, bh, t) {
    const cx = bx + bw / 2, cy = by + bh / 2;
    if (type === 'gas') return { x: cx + Math.sin(t * 0.7 + i * 1.3) * bw * 0.42, y: cy + Math.cos(t * 0.9 + i * 0.7) * bh * 0.38 };
    const sp = type === 'liquid' ? 24 : 19, j = type === 'liquid' ? Math.sin(t * 3 + i) * 3 : 0;
    const col = i % 4, rowI = Math.floor(i / 4);
    let x = cx + (col - 1.5) * sp + j, y = cy + (rowI - 1) * sp + j;
    if (type === 'split') x += i < 6 ? -22 : 22;
    return { x, y };
  }

  function draw(t) {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W === 0 || H === 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const c = card(), p = ease(Math.min(1, anim * 1.3));
    const boxW = W * 0.26, boxH = H * 0.4, topY = H * 0.1;
    const ans = answers[c.key];

    ctx.fillStyle = '#e2e8f0'; ctx.font = font(16, true); ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}/${CARDS.length}  ${L(c.en, c.id)}`, W * 0.33, H * 0.065);

    // Before / after scene boxes
    for (const [i, lab] of [[0, L('Before', 'Sebelum')], [1, L('After', 'Sesudah')]]) {
      const bx = W * 0.04 + i * (boxW + W * 0.06);
      ctx.fillStyle = '#111c33'; ctx.fillRect(bx, topY, boxW, boxH);
      scene(ctx, c.key, bx, topY, boxW, boxH, i === 0 ? 0 : p, t);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(12, true);
      ctx.fillText(lab, bx + boxW / 2, topY + boxH + 16);
    }
    ctx.fillStyle = '#fbbf24'; ctx.font = font(26, true);
    ctx.fillText('→', W * 0.33, topY + boxH / 2 + 10);

    // Particle view
    const py = H * 0.6, ph = H * 0.33;
    ctx.fillStyle = '#111c33'; ctx.fillRect(W * 0.04, py, W * 0.58, ph);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(12, true); ctx.textAlign = 'left';
    ctx.fillText(L('Particle view', 'Tampilan partikel'), W * 0.05, py + 16);
    const pbW = W * 0.26;
    for (let i = 0; i < 12; i++) {
      const a = particlePos(c.ab, i, W * 0.05, py + 20, pbW, ph - 24, t);
      const b = particlePos(c.aa, i, W * 0.36, py + 20, pbW, ph - 24, t);
      for (const [pos, k] of [[a, 0], [b, p]]) {
        ctx.fillStyle = c.pb[i % c.pb.length];
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 7, 0, Math.PI * 2); ctx.fill();
        if (c.chem && k > 0) { ctx.globalAlpha = k; ctx.fillStyle = c.pa[i % c.pa.length]; ctx.fill(); ctx.globalAlpha = 1; }
      }
    }
    ctx.fillStyle = '#fbbf24'; ctx.font = font(22, true); ctx.textAlign = 'center';
    ctx.fillText('→', W * 0.33, py + ph / 2 + 8);
    if (ans) {
      ctx.fillStyle = c.chem ? '#f472b6' : '#38bdf8'; ctx.font = font(12, true);
      ctx.fillText(c.chem ? L('new particles are made', 'partikel baru terbentuk') : L('same particles, new arrangement', 'partikel sama, susunan baru'), W * 0.49, py + ph - 8);
    }

    // Feedback panel
    const fx = W * 0.66, fw = W * 0.31;
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(fx, topY, fw, H * 0.83);
    ctx.textAlign = 'left'; ctx.font = font(13, true);
    if (!ans) {
      ctx.fillStyle = '#cbd5e1';
      wrap(ctx, L('Watch the change. Is it physical or chemical? Press a button below.', 'Lihat perubahannya. Fisika atau kimia? Tekan tombol di bawah.'), fx + 12, topY + 24, fw - 24, 18);
    } else {
      const right = (ans === 'chemical') === c.chem;
      ctx.fillStyle = right ? '#10b981' : '#ef4444';
      ctx.fillText(right ? L('Correct!', 'Benar!') : L('Not quite.', 'Belum tepat.'), fx + 12, topY + 24);
      ctx.fillStyle = '#fff';
      ctx.fillText(c.chem ? L('Chemical change', 'Perubahan kimia') : L('Physical change', 'Perubahan fisika'), fx + 12, topY + 46);
      ctx.font = font(12); ctx.fillStyle = '#e2e8f0';
      let yy = wrap(ctx, L(c.why.en, c.why.id), fx + 12, topY + 66, fw - 24, 17);
      ctx.fillStyle = '#fbbf24'; ctx.font = font(12, true);
      ctx.fillText(L('Signs of chemical change:', 'Tanda perubahan kimia:'), fx + 12, yy + 10);
      ctx.font = font(12);
      Object.keys(SIGNS).forEach((s, i) => {
        const seen = c.signs.includes(s);
        ctx.fillStyle = seen ? '#10b981' : '#64748b';
        ctx.fillText(`${seen ? '✓' : '–'} ${L(SIGNS[s].en, SIGNS[s].id)}`, fx + 16, yy + 32 + i * 18);
      });
      if (c.signs.length === 0) { ctx.fillStyle = '#94a3b8'; ctx.fillText(L('none, so it is physical', 'tidak ada, jadi ini fisika'), fx + 16, yy + 32 + 4 * 18); }
    }
    const done = CARDS.filter((k) => answers[k.key]).length;
    const score = CARDS.filter((k) => answers[k.key] && (answers[k.key] === 'chemical') === k.chem).length;
    ctx.fillStyle = '#94a3b8'; ctx.font = font(12);
    ctx.fillText(`${L('Score', 'Skor')}: ${score} / ${done}  (${CARDS.length} ${L('cards', 'kartu')})`, fx + 12, topY + H * 0.83 - 12);
  }
  function wrap(ctx, text, x, y, maxW, lh) {
    let line = '';
    for (const word of text.split(' ')) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = word; }
      else line = test;
    }
    ctx.fillText(line, x, y);
    return y + lh;
  }

  const cardSel = select({ label: L('Change', 'Perubahan'), key: 'card', value: CARDS[0].key,
    options: CARDS.map((c) => ({ value: c.key, label: L(c.en, c.id) })),
    onChange: (v) => { idx = Math.max(0, CARDS.findIndex((c) => c.key === v)); anim = 0; } });
  const go = (d) => { idx = (idx + d + CARDS.length) % CARDS.length; anim = 0; cardSel.value = card().key; };
  const prev = button({ label: L('← Previous', '← Sebelumnya'), onClick: () => go(-1) });
  const next = button({ label: L('Next →', 'Berikutnya →'), onClick: () => go(1) });
  const phys = button({ label: L('Physical change', 'Perubahan fisika'), primary: true, onClick: () => { answers[card().key] = 'physical'; } });
  const chem = button({ label: L('Chemical change', 'Perubahan kimia'), primary: true, onClick: () => { answers[card().key] = 'chemical'; } });
  const reset = button({ label: L('Clear answers', 'Hapus jawaban'), onClick: () => { for (const k of Object.keys(answers)) delete answers[k]; } });
  ctrlPanel.append(cardSel.el, row(phys, chem), row(prev, next, reset));

  const lab = labPanel({
    title: L('Sorting lab', 'Lab pemilahan'),
    filename: 'physical-chemical-change-lab.csv',
    columns: [
      { key: 'change', label: L('change', 'perubahan') },
      { key: 'mine', label: L('my sort', 'pilihanku') },
      { key: 'correct', label: L('correct?', 'benar?') },
      { key: 'signs', label: L('signs seen', 'tanda yang terlihat') },
    ],
    procedure: [
      L('Watch the first card. Decide: physical or chemical? Press your answer, then Record.', 'Lihat kartu pertama. Putuskan: fisika atau kimia? Tekan jawabanmu, lalu Catat.'),
      L('Press Next and repeat for all ten cards.', 'Tekan Berikutnya dan ulangi untuk sepuluh kartu.'),
      L('Look at the particle view for the ones you got wrong. What was different?', 'Lihat tampilan partikel untuk yang kamu jawab salah. Apa yang berbeda?'),
      L('Count how many chemical changes had at least one sign. Did any have none?', 'Hitung berapa perubahan kimia yang punya setidaknya satu tanda. Adakah yang tidak punya?'),
      L('Which signs appeared in a physical change too (hint: bubbles)? Why is that tricky?', 'Tanda mana yang juga muncul pada perubahan fisika (petunjuk: gelembung)? Kenapa itu menjebak?'),
    ],
    predict: L('Before you start, guess how many of the ten cards are chemical changes.', 'Sebelum mulai, tebak berapa dari sepuluh kartu yang merupakan perubahan kimia.'),
    source: () => {
      const c = card(), a = answers[c.key];
      if (!a) return null;
      const signs = c.signs.map((s) => L(SIGNS[s].en, SIGNS[s].id)).join(', ') || L('none', 'tidak ada');
      return { change: L(c.en, c.id), mine: a === 'chemical' ? L('chemical', 'kimia') : L('physical', 'fisika'), correct: (a === 'chemical') === c.chem ? L('yes', 'ya') : L('no', 'tidak'), signs };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { anim = (anim + dt / 4) % 1; draw(t); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
