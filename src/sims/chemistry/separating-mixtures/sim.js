import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const WATER = 'rgba(96,165,250,0.55)';
const MIX = {
  'sand-water':    { en: 'Sand + water',        id: 'Pasir + air',           liquid: WATER, solid: '#d4a373', settles: true },
  'salt-water':    { en: 'Salt + water',        id: 'Garam + air',           liquid: WATER, solid: '#f8fafc', dissolved: true },
  'ink':           { en: 'Ink (mixed dyes)',    id: 'Tinta (campuran warna)', liquid: 'rgba(109,40,217,0.8)', dyes: ['#ef4444', '#3b82f6', '#eab308'] },
  'alcohol-water': { en: 'Alcohol + water',     id: 'Alkohol + air',         liquid: 'rgba(167,243,208,0.5)', twoLiquids: true },
  'iron-sand':     { en: 'Iron filings + sand', id: 'Serbuk besi + pasir',   solid: '#d4a373', magnetic: '#1f2937', dry: true },
  'sugar-water':   { en: 'Sugar + water',       id: 'Gula + air',            liquid: WATER, solid: '#fde68a', dissolved: true },
};
const METHODS = ['filtration', 'evaporation', 'distillation', 'chromatography', 'magnet', 'decanting'];
const METHOD_LABEL = {
  filtration: { en: 'Filtration', id: 'Penyaringan' }, evaporation: { en: 'Evaporation', id: 'Penguapan' },
  distillation: { en: 'Distillation', id: 'Distilasi' }, chromatography: { en: 'Chromatography', id: 'Kromatografi' },
  magnet: { en: 'Magnet', id: 'Magnet' }, decanting: { en: 'Decanting', id: 'Dekantasi (menuang)' },
};
// [worked, what you get (en), (id), why (en), (id)] in METHODS order.
const NO = 'nothing useful';
const RESULTS = {
  'sand-water': [
    [1, 'sand on the paper, clear water below', 'pasir di kertas, air jernih di bawah', 'Sand grains are too big to fit through the tiny holes in the paper. Water fits.', 'Butiran pasir terlalu besar untuk lolos lubang kecil kertas. Air bisa lolos.'],
    [1, 'dry sand (the water is lost as vapour)', 'pasir kering (airnya hilang jadi uap)', 'Heating turns the water into vapour. The sand stays behind.', 'Pemanasan mengubah air jadi uap. Pasir tertinggal.'],
    [1, 'pure water collected, sand left in the flask', 'air murni tertampung, pasir tersisa di labu', 'Water boils, the vapour cools back to liquid in the condenser. Sand cannot boil.', 'Air mendidih, uapnya mendingin lagi jadi cair di kondensor. Pasir tidak bisa mendidih.'],
    [0, NO, 'tidak ada', 'Chromatography only separates dissolved colours. Sand is not dissolved.', 'Kromatografi hanya memisahkan warna terlarut. Pasir tidak larut.'],
    [0, NO, 'tidak ada', 'Sand is not magnetic, so nothing is attracted.', 'Pasir tidak magnetis, jadi tidak ada yang tertarik.'],
    [1, 'most of the water poured off, sand stays (a little water remains)', 'sebagian besar air tertuang, pasir tetap (sedikit air tersisa)', 'Sand sinks and settles. Pour slowly and the water leaves first.', 'Pasir tenggelam dan mengendap. Tuang perlahan, air keluar lebih dulu.'],
  ],
  'salt-water': [
    [0, 'salt water again', 'air garam lagi', 'Dissolved salt is split into tiny particles that pass through the paper with the water.', 'Garam terlarut terurai jadi partikel sangat kecil yang lolos kertas bersama air.'],
    [1, 'salt crystals (the water is lost as vapour)', 'kristal garam (airnya hilang jadi uap)', 'Water turns into vapour and escapes. Salt does not evaporate, so it is left behind.', 'Air berubah jadi uap dan lepas. Garam tidak menguap, jadi tertinggal.'],
    [1, 'pure water collected, salt left in the flask', 'air murni tertampung, garam tersisa di labu', 'Only the water boils. Its vapour is cooled and collected as pure water.', 'Hanya air yang mendidih. Uapnya didinginkan dan ditampung sebagai air murni.'],
    [0, NO, 'tidak ada', 'Salt has no colour to spread out on the paper.', 'Garam tidak berwarna untuk menyebar di kertas.'],
    [0, NO, 'tidak ada', 'Salt and water are not magnetic.', 'Garam dan air tidak magnetis.'],
    [0, 'salt water again', 'air garam lagi', 'Dissolved salt does not settle, so it pours out with the water.', 'Garam terlarut tidak mengendap, jadi ikut tertuang bersama air.'],
  ],
  'ink': [
    [0, 'the same ink', 'tinta yang sama', 'The dyes are dissolved, so they pass through the paper together.', 'Zat warna terlarut, jadi lolos kertas bersama-sama.'],
    [0, 'a dark mixed smear', 'noda gelap bercampur', 'The water leaves but all the dyes stay mixed together.', 'Air hilang tetapi semua zat warna tetap tercampur.'],
    [0, 'water, but the dyes stay mixed', 'air, tetapi zat warna tetap tercampur', 'You get the water back, but the colours are still all together in the flask.', 'Airnya kembali, tetapi warna-warnanya masih tercampur di labu.'],
    [1, 'red, blue and yellow dyes as separate spots', 'zat warna merah, biru, dan kuning sebagai titik terpisah', 'Each dye sticks to the paper differently, so the rising water carries them different distances.', 'Setiap zat warna menempel di kertas secara berbeda, sehingga air yang naik membawanya ke jarak yang berbeda.'],
    [0, NO, 'tidak ada', 'Dyes are not magnetic.', 'Zat warna tidak magnetis.'],
    [0, 'the same ink', 'tinta yang sama', 'Nothing settles to the bottom, so everything pours together.', 'Tidak ada yang mengendap, jadi semuanya tertuang bersama.'],
  ],
  'alcohol-water': [
    [0, 'the same mixture', 'campuran yang sama', 'Both are liquids. Liquids pass through filter paper.', 'Keduanya cairan. Cairan lolos kertas saring.'],
    [0, 'an empty dish', 'cawan kosong', 'Both liquids evaporate, so nothing is left to keep.', 'Kedua cairan menguap, jadi tidak ada yang tersisa.'],
    [1, 'alcohol collected first (boils at 78 °C), water stays', 'alkohol tertampung lebih dulu (mendidih 78 °C), air tersisa', 'Alcohol boils at a lower temperature than water (100 °C), so it turns to vapour first.', 'Alkohol mendidih pada suhu lebih rendah daripada air (100 °C), jadi menguap lebih dulu.'],
    [0, NO, 'tidak ada', 'There are no coloured substances to separate.', 'Tidak ada zat berwarna yang bisa dipisahkan.'],
    [0, NO, 'tidak ada', 'Neither liquid is magnetic.', 'Tidak ada cairan yang magnetis.'],
    [0, 'the same mixture', 'campuran yang sama', 'The two liquids are fully mixed; neither sinks.', 'Kedua cairan tercampur sempurna; tidak ada yang tenggelam.'],
  ],
  'iron-sand': [
    [0, 'both solids on the paper', 'kedua padatan di kertas', 'Both are dry solids. Filtering needs a liquid to carry one part through.', 'Keduanya padatan kering. Penyaringan butuh cairan untuk membawa satu bagian lolos.'],
    [0, NO, 'tidak ada', 'There is no liquid to evaporate.', 'Tidak ada cairan yang bisa diuapkan.'],
    [0, NO, 'tidak ada', 'There is no liquid to boil.', 'Tidak ada cairan yang bisa dididihkan.'],
    [0, NO, 'tidak ada', 'Nothing dissolves or has colour to spread.', 'Tidak ada yang larut atau berwarna untuk menyebar.'],
    [1, 'iron filings on the magnet, sand left behind', 'serbuk besi menempel di magnet, pasir tertinggal', 'Iron is magnetic and sand is not, so only the iron jumps to the magnet.', 'Besi magnetis dan pasir tidak, jadi hanya besi yang melompat ke magnet.'],
    [0, NO, 'tidak ada', 'There is no liquid to pour off.', 'Tidak ada cairan yang bisa dituang.'],
  ],
  'sugar-water': [
    [0, 'sugar water again', 'air gula lagi', 'Dissolved sugar is split into tiny particles that pass through with the water.', 'Gula terlarut terurai jadi partikel sangat kecil yang lolos bersama air.'],
    [1, 'sugar crystals (heat gently or they burn!)', 'kristal gula (panaskan perlahan agar tidak gosong!)', 'Water evaporates and sugar is left behind.', 'Air menguap dan gula tertinggal.'],
    [1, 'pure water collected, sugar left in the flask', 'air murni tertampung, gula tersisa di labu', 'Only the water boils and is collected again.', 'Hanya air yang mendidih dan ditampung kembali.'],
    [0, NO, 'tidak ada', 'Sugar has no colour to spread out on the paper.', 'Gula tidak berwarna untuk menyebar di kertas.'],
    [0, NO, 'tidak ada', 'Sugar and water are not magnetic.', 'Gula dan air tidak magnetis.'],
    [0, 'sugar water again', 'air gula lagi', 'Dissolved sugar does not settle, so it pours out with the water.', 'Gula terlarut tidak mengendap, jadi ikut tertuang bersama air.'],
  ],
};

export function mount(rootEl) {
  const L = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { mix: 'sand-water', method: 'filtration' };
  let p = 0;            // animation progress 0..1
  let running = false;
  const result = () => RESULTS[params.mix][METHODS.indexOf(params.method)];
  const mix = () => MIX[params.mix];

  function beaker(ctx, x, y, w, h, level, color) {
    if (level > 0 && color) {
      ctx.fillStyle = color;
      ctx.fillRect(x + 2, y + h - h * level, w - 4, h * level - 2);
    }
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y); ctx.stroke();
  }
  function grains(ctx, x, y, w, n, color, seed) {
    ctx.fillStyle = color;
    for (let i = 0; i < n; i++) {
      const u = ((i * 7919 + seed) % 97) / 97, v = ((i * 104729 + seed) % 89) / 89;
      ctx.beginPath(); ctx.arc(x + u * w, y - v * 10, 2.2, 0, Math.PI * 2); ctx.fill();
    }
  }
  function flame(ctx, x, y, t) {
    ctx.fillStyle = '#f97316';
    ctx.beginPath(); ctx.ellipse(x, y, 8, 16 + Math.sin(t * 12) * 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde047';
    ctx.beginPath(); ctx.ellipse(x, y + 4, 4, 8, 0, 0, Math.PI * 2); ctx.fill();
  }
  function steam(ctx, x, y, t, n) {
    ctx.strokeStyle = 'rgba(226,232,240,0.5)'; ctx.lineWidth = 2;
    for (let i = 0; i < n; i++) {
      const yy = y - ((t * 30 + i * 18) % 50);
      ctx.beginPath(); ctx.moveTo(x - 14 + i * 10, yy); ctx.quadraticCurveTo(x - 8 + i * 10, yy - 8, x - 14 + i * 10, yy - 16); ctx.stroke();
    }
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

  function draw(t) {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W === 0 || H === 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const m = mix(), r = result(), ok = r[0] === 1;
    const font = (px, bold) => `${bold ? 'bold ' : ''}${px}px system-ui, -apple-system, Roboto, sans-serif`;
    const bw = W * 0.12, bh = H * 0.22;
    const baseY = H * 0.62;

    // Left: the starting mixture
    const lx = W * 0.08;
    const left = 1 - p * (m.dry ? 0 : 0.85);
    beaker(ctx, lx, baseY - bh, bw, bh, m.dry ? 0 : 0.7 * left, m.liquid);
    if (m.dry || m.settles) grains(ctx, lx + 6, baseY - 4, bw - 12, 30, m.solid, 3);
    if (m.magnetic) grains(ctx, lx + 6, baseY - 6, bw - 12, 18 * (1 - (params.method === 'magnet' ? p : 0)), m.magnetic, 11);
    if (m.dissolved) grains(ctx, lx + 6, baseY - 20 - bh * 0.3 * left, bw - 12, 8, 'rgba(255,255,255,0.35)', 5);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(13, true); ctx.textAlign = 'center';
    ctx.fillText(L(m.en, m.id), lx + bw / 2, baseY + 22);

    // Middle: the apparatus
    const cx = W * 0.47;
    const liq = m.liquid || 'rgba(0,0,0,0)';
    const pass = m.settles ? WATER : liq; // what passes a filter
    if (params.method === 'filtration') {
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - 40, H * 0.18); ctx.lineTo(cx, H * 0.34); ctx.lineTo(cx + 40, H * 0.18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, H * 0.34); ctx.lineTo(cx, H * 0.42); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath(); ctx.moveTo(cx - 34, H * 0.2); ctx.lineTo(cx, H * 0.33); ctx.lineTo(cx + 34, H * 0.2); ctx.fill();
      if (!m.dry && p > 0 && p < 1) { ctx.fillStyle = liq; ctx.beginPath(); ctx.moveTo(cx - 24 * (1 - p), H * 0.24); ctx.lineTo(cx, H * 0.33); ctx.lineTo(cx + 24 * (1 - p), H * 0.24); ctx.fill(); }
      if ((m.settles || m.dry) && p > 0.2) grains(ctx, cx - 14, H * 0.32, 28, 14 * Math.min(1, p), m.solid, 7);
      if (m.magnetic && p > 0.2) grains(ctx, cx - 14, H * 0.31, 28, 8, m.magnetic, 13);
      if (!m.dry && p > 0.05 && p < 1) { ctx.fillStyle = pass; ctx.beginPath(); ctx.arc(cx, H * 0.44 + ((t * 2) % 1) * (baseY - 10 - H * 0.44), 3, 0, Math.PI * 2); ctx.fill(); }
      beaker(ctx, cx - bw / 2, baseY - bh, bw, bh, m.dry ? 0 : 0.5 * p, pass);
    } else if (params.method === 'evaporation') {
      flame(ctx, cx, baseY - 20, t);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 50, baseY - 50); ctx.lineTo(cx + 50, baseY - 50); ctx.stroke();
      ctx.fillStyle = liq;
      if (!m.dry && p < 1) { ctx.beginPath(); ctx.ellipse(cx, baseY - 60, 44, 10 * (1 - p), 0, 0, Math.PI); ctx.fill(); }
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(cx, baseY - 62, 48, 14, 0, 0, Math.PI); ctx.stroke();
      if (!m.dry && p > 0 && p < 1) steam(ctx, cx, baseY - 70, t, 3);
      if (p > 0.6 && (m.solid || m.dyes) && !m.dry) grains(ctx, cx - 30, baseY - 56, 60, 20, m.dyes ? '#312e81' : m.solid, 9);
    } else if (params.method === 'distillation') {
      flame(ctx, cx - 60, baseY - 14, t);
      if (!m.dry) {
        const lvl = 0.5 * (1 - p) + 0.08;
        ctx.save(); ctx.beginPath(); ctx.arc(cx - 60, baseY - 60, 26, 0, Math.PI * 2); ctx.clip();
        ctx.fillStyle = liq; ctx.fillRect(cx - 86, baseY - 34 - 52 * lvl, 52, 52 * lvl);
        ctx.restore();
      }
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx - 60, baseY - 60, 28, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 60, baseY - 88); ctx.lineTo(cx - 60, H * 0.2); ctx.lineTo(cx + 60, H * 0.42); ctx.lineTo(cx + 60, baseY - bh - 10); ctx.stroke();
      ctx.strokeStyle = 'rgba(96,165,250,0.5)'; ctx.lineWidth = 12;
      ctx.beginPath(); ctx.moveTo(cx - 30, H * 0.26); ctx.lineTo(cx + 40, H * 0.38); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(10); ctx.fillText(L('cold water condenser', 'kondensor air dingin'), cx + 10, H * 0.2);
      if (!m.dry && p > 0 && p < 1) steam(ctx, cx - 60, baseY - 100, t, 2);
      if ((m.solid || m.dyes) && !m.dry && p > 0.5) grains(ctx, cx - 76, baseY - 40, 32, 12, m.dyes ? '#312e81' : m.solid, 17);
      const distil = m.twoLiquids ? 'rgba(236,254,255,0.6)' : WATER;
      beaker(ctx, cx + 60 - bw / 2, baseY - bh, bw, bh, m.dry ? 0 : 0.45 * p, distil);
    } else if (params.method === 'chromatography') {
      beaker(ctx, cx - bw / 2, baseY - bh, bw, bh, 0.12, WATER);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(cx - 14, H * 0.16, 28, baseY - 14 - H * 0.16);
      const front = baseY - 30 - p * (baseY - 30 - H * 0.2);
      ctx.fillStyle = 'rgba(96,165,250,0.25)';
      ctx.fillRect(cx - 14, front, 28, baseY - 14 - front);
      if (m.dyes) m.dyes.forEach((c, i) => {
        const yy = baseY - 30 - p * (baseY - 30 - H * 0.2) * (0.35 + i * 0.3);
        ctx.fillStyle = c; ctx.beginPath(); ctx.arc(cx, yy, 6, 0, Math.PI * 2); ctx.fill();
      });
      else if (m.liquid && !m.twoLiquids) { ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.beginPath(); ctx.arc(cx, baseY - 30, 6, 0, Math.PI * 2); ctx.fill(); }
    } else if (params.method === 'magnet') {
      const mx = cx - 50 + p * 100, my = baseY - 50 - (p > 0.7 ? (p - 0.7) * 150 : 0);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(cx - bw / 2, baseY - 8, bw, 8);
      grains(ctx, cx - bw / 2 + 6, baseY - 10, bw - 12, 30, m.solid || '#64748b', 21);
      if (m.magnetic) grains(ctx, cx - bw / 2 + 6, baseY - 12, bw - 12, 18 * Math.max(0, 1 - p * 1.6), m.magnetic, 23);
      if (!m.dry && m.liquid) beaker(ctx, cx - bw / 2, baseY - bh, bw, bh, 0.6, m.liquid);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(mx - 30, my - 10, 30, 20);
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(mx, my - 10, 30, 20);
      ctx.fillStyle = '#fff'; ctx.font = font(11, true); ctx.fillText('N', mx - 15, my + 4); ctx.fillText('S', mx + 15, my + 4);
      if (m.magnetic && p > 0.2) grains(ctx, mx - 28, my + 18, 56, 18 * Math.min(1, p * 1.6), m.magnetic, 23);
    } else {
      ctx.save();
      ctx.translate(cx - 30, baseY);
      ctx.rotate(-p * 0.9);
      beaker(ctx, -bw / 2, -bh, bw, bh, m.dry ? 0 : 0.7 * (1 - 0.8 * p), liq);
      if (m.settles || m.dry) grains(ctx, -bw / 2 + 6, -4, bw - 12, 30, m.solid, 3);
      ctx.restore();
      if (!m.dry && p > 0.3 && p < 1) { ctx.strokeStyle = liq; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 10, baseY - bh + 20); ctx.quadraticCurveTo(cx + 40, baseY - bh + 60, cx + 50, baseY - 10); ctx.stroke(); }
      beaker(ctx, cx + 50 - bw / 2, baseY - bh, bw, bh, m.dry ? 0 : 0.5 * p, m.settles ? WATER : liq);
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(13, true);
    ctx.fillText(L(METHOD_LABEL[params.method].en, METHOD_LABEL[params.method].id), cx, baseY + 22);

    // Progress bar
    ctx.fillStyle = '#334155'; ctx.fillRect(cx - 60, baseY + 32, 120, 6);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(cx - 60, baseY + 32, 120 * p, 6);

    // Right: result
    const rx = W * 0.68, ry = H * 0.12;
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(rx, ry, W * 0.3, H * 0.5);
    ctx.font = font(13, true);
    if (p >= 1) {
      ctx.fillStyle = ok ? '#10b981' : '#ef4444';
      ctx.fillText(ok ? L('It worked!', 'Berhasil!') : L('It did not separate.', 'Tidak terpisah.'), rx + 12, ry + 24);
      ctx.fillStyle = '#fff'; ctx.font = font(12, true);
      ctx.fillText(L('You get:', 'Kamu dapat:'), rx + 12, ry + 46);
      ctx.font = font(12); ctx.fillStyle = '#e2e8f0';
      let yy = wrap(ctx, L(r[1], r[2]), rx + 12, ry + 62, W * 0.27, 16);
      ctx.fillStyle = '#fbbf24'; ctx.font = font(12, true);
      ctx.fillText(L('Why?', 'Mengapa?'), rx + 12, yy + 8);
      ctx.font = font(12); ctx.fillStyle = '#e2e8f0';
      wrap(ctx, L(r[3], r[4]), rx + 12, yy + 24, W * 0.27, 16);
    } else {
      ctx.fillStyle = '#cbd5e1';
      wrap(ctx, running ? L('Separating…', 'Memisahkan…') : L('Pick a mixture and a method, then press Run.', 'Pilih campuran dan metode, lalu tekan Jalankan.'), rx + 12, ry + 24, W * 0.27, 16);
    }
  }

  const mixSel = select({ label: L('Mixture', 'Campuran'), key: 'mixture', value: params.mix,
    options: Object.keys(MIX).map((k) => ({ value: k, label: L(MIX[k].en, MIX[k].id) })),
    onChange: (v) => { params.mix = v; p = 0; running = false; } });
  const methodSel = select({ label: L('Method', 'Metode'), key: 'method', value: params.method,
    options: METHODS.map((k) => ({ value: k, label: L(METHOD_LABEL[k].en, METHOD_LABEL[k].id) })),
    onChange: (v) => { params.method = v; p = 0; running = false; } });
  const runBtn = button({ label: L('Run', 'Jalankan'), primary: true, onClick: () => { p = 0; running = true; } });
  const resetBtn = button({ label: L('Reset', 'Ulang'), onClick: () => { p = 0; running = false; } });
  ctrlPanel.append(mixSel.el, methodSel.el, row(runBtn, resetBtn));

  const lab = labPanel({
    title: L('Separation lab', 'Lab pemisahan'),
    filename: 'separating-mixtures-lab.csv',
    columns: [
      { key: 'mix', label: L('mixture', 'campuran') },
      { key: 'method', label: L('method', 'metode') },
      { key: 'worked', label: L('worked?', 'berhasil?') },
      { key: 'got', label: L('what was separated', 'apa yang terpisah') },
    ],
    procedure: [
      L('Choose sand + water. Try filtration, press Run, wait for the result, record.', 'Pilih pasir + air. Coba penyaringan, tekan Jalankan, tunggu hasilnya, catat.'),
      L('Keep sand + water. Try all the other methods. Record each one.', 'Tetap pasir + air. Coba semua metode lain. Catat masing-masing.'),
      L('Switch to salt + water and repeat. Which methods work now?', 'Ganti ke garam + air dan ulangi. Metode mana yang berhasil sekarang?'),
      L('Try ink and iron filings + sand. Find the one method that works for each.', 'Coba tinta dan serbuk besi + pasir. Temukan satu metode yang cocok untuk masing-masing.'),
      L('Look at your table: what do the mixtures that filtration works on have in common?', 'Lihat tabelmu: apa kesamaan campuran yang bisa dipisahkan dengan penyaringan?'),
    ],
    predict: L('Can filter paper separate salt from water? Write yes or no and why.', 'Bisakah kertas saring memisahkan garam dari air? Tulis ya atau tidak, dan alasannya.'),
    source: () => {
      if (p < 1) return null;
      const r = result();
      return { mix: L(mix().en, mix().id), method: L(METHOD_LABEL[params.method].en, METHOD_LABEL[params.method].id), worked: r[0] ? L('yes', 'ya') : L('no', 'tidak'), got: L(r[1], r[2]) };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => {
    if (running) { p = Math.min(1, p + dt / 4); if (p >= 1) running = false; }
    draw(t);
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
