import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { getLocale } from '../../../i18n/index.js';

// Each stimulus: which organ notices it, how it is drawn, and what the game says.
const STIMULI = [
  { key: 'flash', organ: 'eye', name: { en: 'a flash of light', id: 'kilatan cahaya' },
    yes: { en: 'Yes! Your eyes see the flash.', id: 'Benar! Matamu melihat kilatan cahaya.' },
    hint: { en: 'Hmm. A flash is light. Which part sees light?', id: 'Hmm. Kilatan itu cahaya. Bagian mana yang melihat cahaya?' } },
  { key: 'rainbow', organ: 'eye', name: { en: 'a rainbow', id: 'pelangi' },
    yes: { en: 'Yes! Your eyes see the colours.', id: 'Benar! Matamu melihat warna-warnanya.' },
    hint: { en: 'A rainbow is made of colours. Which part sees colours?', id: 'Pelangi terbuat dari warna. Bagian mana yang melihat warna?' } },
  { key: 'bell', organ: 'ear', name: { en: 'a ringing bell', id: 'bel berbunyi' },
    yes: { en: 'Yes! Your ears hear the bell.', id: 'Benar! Telingamu mendengar bel.' },
    hint: { en: 'A bell makes a sound. Which part hears sounds?', id: 'Bel membuat bunyi. Bagian mana yang mendengar bunyi?' } },
  { key: 'drum', organ: 'ear', name: { en: 'a banging drum', id: 'gendang dipukul' },
    yes: { en: 'Yes! Your ears hear the drum.', id: 'Benar! Telingamu mendengar gendang.' },
    hint: { en: 'Boom, boom! That is a sound. Which part hears?', id: 'Dum, dum! Itu bunyi. Bagian mana yang mendengar?' } },
  { key: 'flower', organ: 'nose', name: { en: 'a sweet-smelling flower', id: 'bunga yang harum' },
    yes: { en: 'Yes! Your nose smells the flower.', id: 'Benar! Hidungmu mencium bau bunga.' },
    hint: { en: 'The flower gives off a smell. Which part smells?', id: 'Bunga mengeluarkan bau. Bagian mana yang mencium bau?' } },
  { key: 'soup', organ: 'nose', name: { en: 'hot soup', id: 'sup panas' },
    yes: { en: 'Yes! Your nose smells the soup.', id: 'Benar! Hidungmu mencium bau sup.' },
    hint: { en: 'Mmm, the steam carries a smell. Which part smells?', id: 'Mmm, uapnya membawa bau. Bagian mana yang mencium bau?' } },
  { key: 'lemon', organ: 'tongue', name: { en: 'a sour lemon', id: 'lemon yang asam' },
    yes: { en: 'Yes! Your tongue tastes sour.', id: 'Benar! Lidahmu mengecap rasa asam.' },
    hint: { en: 'Sour is a taste. Which part tastes?', id: 'Asam itu rasa. Bagian mana yang mengecap rasa?' } },
  { key: 'candy', organ: 'tongue', name: { en: 'a sweet lollipop', id: 'permen yang manis' },
    yes: { en: 'Yes! Your tongue tastes sweet.', id: 'Benar! Lidahmu mengecap rasa manis.' },
    hint: { en: 'Sweet is a taste. Which part tastes?', id: 'Manis itu rasa. Bagian mana yang mengecap rasa?' } },
  { key: 'feather', organ: 'skin', name: { en: 'a tickly feather', id: 'bulu yang menggelitik' },
    yes: { en: 'Yes! Your skin feels the feather.', id: 'Benar! Kulitmu merasakan bulu itu.' },
    hint: { en: 'The feather touches you. Which part feels touch?', id: 'Bulu itu menyentuhmu. Bagian mana yang merasakan sentuhan?' } },
  { key: 'ice', organ: 'skin', name: { en: 'a cold ice cube', id: 'es batu yang dingin' },
    yes: { en: 'Yes! Your skin feels the cold.', id: 'Benar! Kulitmu merasakan dingin.' },
    hint: { en: 'Brr, cold! Which part feels hot and cold?', id: 'Brr, dingin! Bagian mana yang merasakan panas dan dingin?' } },
];
const ORGANS = ['eye', 'ear', 'nose', 'tongue', 'skin'];
const ORGAN_NAME = {
  eye: { en: 'Eye', id: 'Mata' }, ear: { en: 'Ear', id: 'Telinga' }, nose: { en: 'Nose', id: 'Hidung' },
  tongue: { en: 'Tongue', id: 'Lidah' }, skin: { en: 'Skin', id: 'Kulit' },
};
const ORGAN_JOB = {
  eye: { en: 'sees light and colour', id: 'melihat cahaya dan warna' },
  ear: { en: 'hears sounds', id: 'mendengar bunyi' },
  nose: { en: 'smells', id: 'mencium bau' },
  tongue: { en: 'tastes', id: 'mengecap rasa' },
  skin: { en: 'feels touch, heat and cold', id: 'merasakan sentuhan, panas, dan dingin' },
};

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const tx = (o) => (getLocale() === 'id' ? o.id : o.en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';

  const state = {
    mode: 'play',            // 'play' | 'explore'
    idx: 0, order: [], pos: 0,
    phase: 'ask',            // 'ask' | 'right'
    msg: null, msgColor: '#e2e8f0', msgAt: -10,
    firstTry: true, right: 0, total: 0, streak: 0,
    tapped: null, tappedAt: -10,
    organ: 'eye',            // explore mode selection
  };
  let now = 0;
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function shuffle() {
    const a = STIMULI.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    // avoid showing the same stimulus twice in a row
    if (state.order.length && a[0] === state.order[state.order.length - 1]) [a[0], a[1]] = [a[1], a[0]];
    state.order = a; state.pos = 0;
  }
  function next() {
    if (!state.order.length || state.pos >= state.order.length - 1) shuffle(); else state.pos++;
    state.idx = state.order[state.pos];
    state.phase = 'ask'; state.firstTry = true; state.msg = null;
  }
  shuffle(); state.idx = state.order[0];

  function answer(organ) {
    state.tapped = organ; state.tappedAt = now;
    if (state.mode === 'explore') { state.organ = organ; return; }
    if (state.phase !== 'ask') return;
    const s = STIMULI[state.idx];
    if (organ === s.organ) {
      if (state.firstTry) { state.right++; state.streak++; } else state.streak = 0;
      state.total++;
      state.phase = 'right'; state.msg = tx(s.yes); state.msgColor = '#4ade80'; state.msgAt = now;
    } else {
      state.firstTry = false; state.streak = 0;
      state.msg = tx(s.hint); state.msgColor = '#fbbf24'; state.msgAt = now;
    }
  }

  // ---- layout helpers ------------------------------------------------
  const face = () => {
    const H = cv.height, W = cv.width;
    const R = Math.min(H * 0.24, W * 0.14);
    return { fx: W * 0.72, fy: H * 0.46, R };
  };
  const hand = () => {
    const H = cv.height, W = cv.width; const { R } = face();
    return { hx: W * 0.52, hy: H * 0.80, s: R * 0.9 };
  };
  function organHits() {
    const { fx, fy, R } = face(); const { hx, hy, s } = hand();
    return [
      { id: 'eye', x: fx - R * 0.38, y: fy - R * 0.2, r: R * 0.3 },
      { id: 'eye', x: fx + R * 0.38, y: fy - R * 0.2, r: R * 0.3 },
      { id: 'ear', x: fx - R * 1.05, y: fy, r: R * 0.32 },
      { id: 'ear', x: fx + R * 1.05, y: fy, r: R * 0.32 },
      { id: 'nose', x: fx, y: fy + R * 0.15, r: R * 0.22 },
      { id: 'tongue', x: fx, y: fy + R * 0.55, r: R * 0.3 },
      { id: 'skin', x: hx, y: hy, r: s * 0.6 },
    ];
  }

  // ---- drawing: stimulus scene ----------------------------------------
  function soundArcs(ctx, x, y, r0, t, color) {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      const ph = ((t * 1.2 + i / 3) % 1);
      ctx.globalAlpha = 1 - ph;
      const r = r0 + ph * r0 * 1.6;
      ctx.beginPath(); ctx.arc(x, y, r, -0.5, 0.5); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, r, Math.PI - 0.5, Math.PI + 0.5); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function smellWaves(ctx, x, y, w, t, color) {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) {
      const ph = ((t * 0.5 + (i + 1) / 3) % 1);
      ctx.globalAlpha = 0.9 - ph * 0.9;
      const bx = x + i * w * 0.35, by = y - ph * w * 1.2;
      ctx.beginPath();
      ctx.moveTo(bx, by + w * 0.5);
      ctx.bezierCurveTo(bx - w * 0.2, by + w * 0.35, bx + w * 0.2, by + w * 0.15, bx, by);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function drawStimulus(ctx, s, x, y, w, h, t) {
    const cx = x + w / 2, cy = y + h / 2, u = Math.min(w, h);
    ctx.save();
    ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.clip();
    ctx.fillStyle = '#1e293b'; ctx.fillRect(x, y, w, h);
    if (s.key === 'flash') {
      const k = 0.6 + 0.4 * Math.abs(Math.sin(t * 4));
      const g = ctx.createRadialGradient(cx, cy, u * 0.05, cx, cy, u * 0.5 * k);
      g.addColorStop(0, 'rgba(254,249,195,1)'); g.addColorStop(0.4, 'rgba(250,204,21,0.8)'); g.addColorStop(1, 'rgba(250,204,21,0)');
      ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(cx, cy - u * 0.05, u * 0.16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#94a3b8'; ctx.fillRect(cx - u * 0.07, cy + u * 0.1, u * 0.14, u * 0.12);
      ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4;
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 + t;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * u * 0.22, cy - u * 0.05 + Math.sin(a) * u * 0.22);
        ctx.lineTo(cx + Math.cos(a) * u * (0.3 + 0.05 * k), cy - u * 0.05 + Math.sin(a) * u * (0.3 + 0.05 * k)); ctx.stroke();
      }
    } else if (s.key === 'rainbow') {
      const cols = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'];
      ctx.lineWidth = u * 0.045;
      cols.forEach((c, i) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(cx, cy + u * 0.25, u * 0.42 - i * u * 0.045, Math.PI, 0); ctx.stroke(); });
      ctx.fillStyle = '#e2e8f0';
      [[-0.3, 0.3], [0.3, 0.3]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(cx + dx * u, cy + dy * u, u * 0.1, 0, Math.PI * 2); ctx.arc(cx + dx * u + u * 0.1, cy + dy * u + u * 0.03, u * 0.08, 0, Math.PI * 2); ctx.fill(); });
    } else if (s.key === 'bell') {
      const sw = Math.sin(t * 6) * 0.25;
      ctx.save(); ctx.translate(cx, cy - u * 0.3); ctx.rotate(sw);
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.moveTo(-u * 0.22, u * 0.3); ctx.quadraticCurveTo(-u * 0.22, -u * 0.05, 0, -u * 0.05); ctx.quadraticCurveTo(u * 0.22, -u * 0.05, u * 0.22, u * 0.3); ctx.closePath(); ctx.fill();
      ctx.fillRect(-u * 0.27, u * 0.3, u * 0.54, u * 0.05);
      ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.arc(0, u * 0.38, u * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      soundArcs(ctx, cx, cy, u * 0.32, t, '#f8fafc');
    } else if (s.key === 'drum') {
      ctx.fillStyle = '#dc2626'; ctx.fillRect(cx - u * 0.25, cy - u * 0.05, u * 0.5, u * 0.28);
      ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.ellipse(cx, cy - u * 0.05, u * 0.25, u * 0.08, 0, 0, Math.PI * 2); ctx.fill();
      const hit = Math.abs(Math.sin(t * 5));
      ctx.strokeStyle = '#d6d3d1'; ctx.lineWidth = 4; ctx.lineCap = 'round';
      [[-1, 0], [1, 1.5]].forEach(([sgn, ph]) => {
        const lift = Math.abs(Math.sin(t * 5 + ph)) * u * 0.15;
        ctx.beginPath(); ctx.moveTo(cx + sgn * u * 0.3, cy - u * 0.35 - lift); ctx.lineTo(cx + sgn * u * 0.08, cy - u * 0.1 - lift); ctx.stroke();
      });
      if (hit > 0.8) soundArcs(ctx, cx, cy, u * 0.3, t, '#f8fafc');
    } else if (s.key === 'flower') {
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = u * 0.03; ctx.beginPath(); ctx.moveTo(cx, cy + u * 0.45); ctx.lineTo(cx, cy + u * 0.05); ctx.stroke();
      ctx.fillStyle = '#f472b6';
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * u * 0.11, cy + Math.sin(a) * u * 0.11, u * 0.1, u * 0.06, a, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(cx, cy, u * 0.07, 0, Math.PI * 2); ctx.fill();
      smellWaves(ctx, cx, cy - u * 0.25, u * 0.25, t, '#c4b5fd');
    } else if (s.key === 'soup') {
      ctx.fillStyle = '#fb923c'; ctx.beginPath(); ctx.ellipse(cx, cy + u * 0.1, u * 0.3, u * 0.08, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(cx - u * 0.3, cy + u * 0.1); ctx.quadraticCurveTo(cx, cy + u * 0.5, cx + u * 0.3, cy + u * 0.1); ctx.closePath(); ctx.fill();
      smellWaves(ctx, cx, cy - u * 0.1, u * 0.3, t, '#e2e8f0');
    } else if (s.key === 'lemon') {
      ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(cx, cy, u * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fef9c3'; ctx.beginPath(); ctx.arc(cx, cy, u * 0.25, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3;
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * u * 0.24, cy + Math.sin(a) * u * 0.24); ctx.stroke(); }
      const wob = Math.sin(t * 8) * u * 0.02;
      ctx.fillStyle = '#f8fafc'; ctx.font = font(u * 0.12, true); ctx.textAlign = 'center';
      ctx.fillText(T('sour!', 'asam!'), cx + wob, cy - u * 0.36);
    } else if (s.key === 'candy') {
      ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = u * 0.03; ctx.beginPath(); ctx.moveTo(cx, cy + u * 0.05); ctx.lineTo(cx, cy + u * 0.45); ctx.stroke();
      ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(cx, cy - u * 0.1, u * 0.22, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fbcfe8'; ctx.lineWidth = u * 0.035; ctx.beginPath();
      for (let a = 0; a < Math.PI * 6; a += 0.1) { const r = a / (Math.PI * 6) * u * 0.18; ctx.lineTo(cx + Math.cos(a + t) * r, cy - u * 0.1 + Math.sin(a + t) * r); }
      ctx.stroke();
      ctx.fillStyle = '#f8fafc'; ctx.font = font(u * 0.12, true); ctx.textAlign = 'center';
      ctx.fillText(T('sweet!', 'manis!'), cx, cy - u * 0.4);
    } else if (s.key === 'feather') {
      const dx = Math.sin(t * 1.5) * u * 0.15, dy = Math.sin(t * 3) * u * 0.06;
      ctx.save(); ctx.translate(cx + dx, cy + dy); ctx.rotate(-0.6 + Math.sin(t * 1.5) * 0.3);
      ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.ellipse(0, 0, u * 0.1, u * 0.32, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -u * 0.32); ctx.lineTo(0, u * 0.42); ctx.stroke();
      for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(0, i * u * 0.05); ctx.lineTo(u * 0.09 * (i % 2 ? 1 : -1), i * u * 0.05 - u * 0.04); ctx.stroke(); }
      ctx.restore();
    } else if (s.key === 'ice') {
      ctx.fillStyle = 'rgba(165,243,252,0.85)'; ctx.beginPath(); ctx.roundRect(cx - u * 0.22, cy - u * 0.18, u * 0.44, u * 0.4, 10); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(cx - u * 0.17, cy - u * 0.13, u * 0.08, u * 0.18);
      ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3 + Math.PI / 6, r0 = u * 0.3, r1 = r0 + u * 0.07 * (1 + Math.sin(t * 3 + i));
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke();
      }
      ctx.fillStyle = '#f8fafc'; ctx.font = font(u * 0.12, true); ctx.textAlign = 'center';
      ctx.fillText(T('brr, cold!', 'brr, dingin!'), cx, cy - u * 0.33);
    }
    ctx.restore();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.stroke();
  }

  // ---- drawing: face and hand -----------------------------------------
  function drawFace(ctx, highlight) {
    const { fx, fy, R } = face();
    ctx.lineWidth = 2;
    // ears
    [-1, 1].forEach((sgn) => {
      ctx.fillStyle = highlight === 'ear' ? '#fde68a' : '#fcd9b6';
      ctx.beginPath(); ctx.ellipse(fx + sgn * R * 1.02, fy, R * 0.18, R * 0.3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(fx + sgn * R * 1.02, fy, R * 0.08, R * 0.16, 0, 0, Math.PI * 2); ctx.stroke();
    });
    // head
    ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(fx, fy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(fx, fy - R * 0.25, R * 0.95, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
    // eyes
    [-1, 1].forEach((sgn) => {
      const ex = fx + sgn * R * 0.38, ey = fy - R * 0.2;
      ctx.fillStyle = highlight === 'eye' ? '#fef9c3' : '#ffffff';
      ctx.beginPath(); ctx.ellipse(ex, ey, R * 0.22, R * 0.14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(ex, ey, R * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(ex, ey, R * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(ex, ey, R * 0.22, R * 0.14, 0, 0, Math.PI * 2); ctx.stroke();
    });
    // nose
    ctx.fillStyle = highlight === 'nose' ? '#fde68a' : '#f4b183';
    ctx.beginPath(); ctx.moveTo(fx, fy - R * 0.02); ctx.lineTo(fx - R * 0.14, fy + R * 0.26); ctx.quadraticCurveTo(fx, fy + R * 0.34, fx + R * 0.14, fy + R * 0.26); ctx.closePath(); ctx.fill();
    // mouth + tongue
    ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.ellipse(fx, fy + R * 0.55, R * 0.3, R * 0.18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = highlight === 'tongue' ? '#fb7185' : '#ef4444';
    ctx.beginPath(); ctx.ellipse(fx, fy + R * 0.62, R * 0.2, R * 0.12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.fillRect(fx - R * 0.3, fy + R * 0.4, R * 0.6, R * 0.07);
    // hand
    const { hx, hy, s } = hand();
    ctx.fillStyle = highlight === 'skin' ? '#fde68a' : '#fcd9b6';
    ctx.beginPath(); ctx.roundRect(hx - s * 0.35, hy - s * 0.2, s * 0.7, s * 0.65, s * 0.15); ctx.fill();
    for (let i = 0; i < 4; i++) {
      const fxg = hx - s * 0.28 + i * s * 0.19, len = s * (i === 0 || i === 3 ? 0.42 : 0.52);
      ctx.beginPath(); ctx.roundRect(fxg - s * 0.075, hy - s * 0.2 - len, s * 0.15, len + s * 0.1, s * 0.07); ctx.fill();
    }
    ctx.beginPath(); ctx.roundRect(hx + s * 0.3, hy - s * 0.1, s * 0.3, s * 0.15, s * 0.07); ctx.fill();
    // labels
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(R * 0.17); ctx.textAlign = 'center';
    ctx.fillText(tx(ORGAN_NAME.skin), hx, hy + s * 0.65);
    ctx.fillText(T('tap a body part', 'ketuk bagian tubuh'), fx, fy + R * 1.3);
    // tap ring
    if (state.tapped && now - state.tappedAt < 0.8) {
      const h = organHits().find((o) => o.id === state.tapped);
      if (h) {
        const ph = (now - state.tappedAt) / 0.8;
        ctx.strokeStyle = `rgba(250,204,21,${1 - ph})`; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(h.x, h.y, h.r * (1 + ph * 0.6), 0, Math.PI * 2); ctx.stroke();
      }
    }
  }

  // ---- drawing: explore diagrams --------------------------------------
  let labelBox = null;   // the explore box; label text is kept inside it so the clip never cuts words
  function label(ctx, text, x, y, tx2, ty, color = '#e2e8f0') {
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx2, ty); ctx.stroke();
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    const tw = ctx.measureText(text).width;
    let sx = tx2 < x ? tx2 - 4 - tw : tx2 + 4;
    if (labelBox) sx = Math.max(labelBox.x + 6, Math.min(labelBox.x + labelBox.w - 6 - tw, sx));
    ctx.textAlign = 'left';
    ctx.fillText(text, sx, ty + 4);
  }
  function drawExplore(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2, u = Math.min(w, h), o = state.organ;
    labelBox = { x, w };
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.clip();
    ctx.fillStyle = '#1e293b'; ctx.fillRect(x, y, w, h);
    ctx.font = font(u * 0.05);
    if (o === 'eye') {
      ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(cx, cy, u * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fb923c'; ctx.beginPath(); ctx.arc(cx, cy, u * 0.26, Math.PI * 0.6, Math.PI * 1.4, true); ctx.arc(cx, cy, u * 0.23, Math.PI * 1.4, Math.PI * 0.6); ctx.fill();   // retina at the back
      ctx.fillStyle = '#bae6fd'; ctx.beginPath(); ctx.ellipse(cx - u * 0.28, cy, u * 0.07, u * 0.2, 0, 0, Math.PI * 2); ctx.fill();   // cornea
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(cx - u * 0.2, cy - u * 0.2, u * 0.03, u * 0.12); ctx.fillRect(cx - u * 0.2, cy + u * 0.08, u * 0.03, u * 0.12);   // iris
      ctx.fillStyle = '#a5f3fc'; ctx.beginPath(); ctx.ellipse(cx - u * 0.14, cy, u * 0.04, u * 0.1, 0, 0, Math.PI * 2); ctx.fill();   // lens
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(x + u * 0.02, cy - u * 0.14); ctx.lineTo(cx - u * 0.19, cy - u * 0.07); ctx.lineTo(cx - u * 0.19, cy + u * 0.07); ctx.lineTo(x + u * 0.02, cy + u * 0.14); ctx.closePath(); ctx.globalAlpha = 0.35; ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#fde68a'; ctx.fillRect(cx + u * 0.27, cy - u * 0.03, u * 0.2, u * 0.06);   // optic nerve
      label(ctx, T('pupil (light goes in)', 'pupil (cahaya masuk)'), cx - u * 0.19, cy, cx - u * 0.3, y + u * 0.08);
      label(ctx, T('lens', 'lensa'), cx - u * 0.14, cy - u * 0.1, cx - u * 0.05, y + u * 0.16);
      label(ctx, T('iris (colour part)', 'iris (bagian berwarna)'), cx - u * 0.19, cy + u * 0.16, cx - u * 0.3, y + h - u * 0.1);
      label(ctx, T('retina (makes nerve messages)', 'retina (membuat pesan saraf)'), cx + u * 0.24, cy + u * 0.1, cx + u * 0.05, y + h - u * 0.18);
      label(ctx, T('nerve to brain', 'saraf ke otak'), cx + u * 0.4, cy - u * 0.03, cx + u * 0.3, y + u * 0.08);
    } else if (o === 'ear') {
      ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.ellipse(x + u * 0.22, cy, u * 0.14, u * 0.26, 0, 0, Math.PI * 2); ctx.fill();   // outer ear
      ctx.fillStyle = '#f4b183'; ctx.fillRect(x + u * 0.3, cy - u * 0.05, u * 0.3, u * 0.1);   // canal
      const sh = Math.sin(now * 20) * u * 0.006;
      ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x + u * 0.6 + sh, cy - u * 0.1, u * 0.02, u * 0.2);   // eardrum
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(x + u * 0.63, cy - u * 0.02, u * 0.12, u * 0.04);   // tiny bones
      ctx.strokeStyle = '#c084fc'; ctx.lineWidth = u * 0.03; ctx.beginPath();   // cochlea spiral
      for (let a = 0; a < Math.PI * 4.5; a += 0.1) { const r = u * 0.02 + a / (Math.PI * 4.5) * u * 0.1; ctx.lineTo(x + u * 0.86 + Math.cos(a) * r, cy + u * 0.04 + Math.sin(a) * r); }
      ctx.stroke();
      ctx.fillStyle = '#fde68a'; ctx.fillRect(x + u * 0.86, cy - u * 0.25, u * 0.04, u * 0.15);
      label(ctx, T('outer ear catches sound', 'daun telinga menangkap bunyi'), x + u * 0.22, cy - u * 0.2, x + u * 0.3, y + u * 0.08);
      label(ctx, T('ear canal', 'liang telinga'), x + u * 0.45, cy + u * 0.05, x + u * 0.4, y + h - u * 0.1);
      label(ctx, T('eardrum shakes', 'gendang telinga bergetar'), x + u * 0.61, cy - u * 0.1, x + u * 0.56, y + u * 0.16);
      label(ctx, T('cochlea (snail) makes messages', 'koklea (rumah siput) membuat pesan'), x + u * 0.86, cy + u * 0.16, x + u * 0.75, y + h - u * 0.18);
      label(ctx, T('nerve to brain', 'saraf ke otak'), x + u * 0.88, cy - u * 0.25, x + u * 0.8, y + u * 0.08 + u * 0.16);
    } else if (o === 'nose') {
      ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.moveTo(cx - u * 0.1, y + u * 0.05); ctx.lineTo(cx - u * 0.3, cy + u * 0.1); ctx.quadraticCurveTo(cx - u * 0.3, cy + u * 0.3, cx - u * 0.05, cy + u * 0.3); ctx.lineTo(cx + u * 0.3, cy + u * 0.3); ctx.lineTo(cx + u * 0.3, y + u * 0.05); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.moveTo(cx - u * 0.2, cy + u * 0.3); ctx.lineTo(cx - u * 0.05, cy - u * 0.05); ctx.lineTo(cx + u * 0.2, cy - u * 0.1); ctx.lineTo(cx + u * 0.25, cy + u * 0.2); ctx.lineTo(cx + u * 0.15, cy + u * 0.3); ctx.closePath(); ctx.fill();   // nasal cavity
      ctx.fillStyle = '#facc15';
      for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(cx - u * 0.02 + i * u * 0.035, cy - u * 0.06 - i * u * 0.006, u * 0.012, 0, Math.PI * 2); ctx.fill(); }   // smell cells
      ctx.fillStyle = '#fde68a'; ctx.fillRect(cx + u * 0.05, cy - u * 0.2, u * 0.04, u * 0.12);
      smellWaves(ctx, cx - u * 0.3, cy + u * 0.5, u * 0.12, now, '#c4b5fd');
      label(ctx, T('nostril (air goes in)', 'lubang hidung (udara masuk)'), cx - u * 0.18, cy + u * 0.28, cx - u * 0.3, y + h - u * 0.08);
      label(ctx, T('smell cells high inside', 'sel pembau jauh di dalam'), cx + u * 0.08, cy - u * 0.07, cx + u * 0.15, y + u * 0.3 + u * 0.25);
      label(ctx, T('nerve to brain', 'saraf ke otak'), cx + u * 0.07, cy - u * 0.2, cx + u * 0.2, y + u * 0.1);
    } else if (o === 'tongue') {
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(cx - u * 0.22, y + u * 0.1); ctx.lineTo(cx - u * 0.25, cy + u * 0.1); ctx.quadraticCurveTo(cx, cy + u * 0.45, cx + u * 0.25, cy + u * 0.1); ctx.lineTo(cx + u * 0.22, y + u * 0.1); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, y + u * 0.15); ctx.lineTo(cx, cy + u * 0.3); ctx.stroke();
      ctx.fillStyle = '#fca5a5';
      for (let i = 0; i < 40; i++) { const a = i * 2.39996, r = u * 0.03 + (i / 40) * u * 0.19; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 1.3, u * 0.012, 0, Math.PI * 2); ctx.fill(); }   // papillae
      // zoom circle: one bump with taste buds
      const zx = x + w - u * 0.22, zy = y + u * 0.26;
      ctx.fillStyle = '#0b1220'; ctx.beginPath(); ctx.arc(zx, zy, u * 0.16, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(zx, zy, u * 0.16, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#fca5a5'; ctx.beginPath(); ctx.arc(zx, zy + u * 0.06, u * 0.1, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#fde047'; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.ellipse(zx + i * u * 0.06, zy + u * 0.03, u * 0.018, u * 0.03, 0, 0, Math.PI * 2); ctx.fill(); }
      label(ctx, T('tiny bumps (papillae)', 'tonjolan kecil (papila)'), cx - u * 0.18, cy - u * 0.05, x + u * 0.06, y + u * 0.08);
      label(ctx, T('taste buds inside each bump', 'kuncup pengecap di dalam tonjolan'), zx, zy + u * 0.03, zx - u * 0.1, y + h - u * 0.1);
      ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left';
      ctx.fillText(T('5 tastes: sweet, salty, sour, bitter, savoury', '5 rasa: manis, asin, asam, pahit, gurih'), x + u * 0.06, y + h - u * 0.22);
    } else {
      // skin cross-section
      ctx.fillStyle = '#f4b183'; ctx.fillRect(x, y + h * 0.3, w, h * 0.12);   // epidermis
      ctx.fillStyle = '#fb7185'; ctx.fillRect(x, y + h * 0.42, w, h * 0.38);   // dermis
      ctx.fillStyle = '#fde68a'; ctx.fillRect(x, y + h * 0.8, w, h * 0.2);     // fat
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = u * 0.02; ctx.beginPath(); ctx.moveTo(x + w * 0.25, y + h * 0.7); ctx.quadraticCurveTo(x + w * 0.22, y + h * 0.4, x + w * 0.3, y + h * 0.12); ctx.stroke();   // hair
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3; ctx.beginPath();   // sweat gland
      for (let a = 0; a < Math.PI * 6; a += 0.2) ctx.lineTo(x + w * 0.6 + Math.cos(a) * u * 0.04, y + h * 0.66 + Math.sin(a) * u * 0.03 + (a / (Math.PI * 6)) * u * 0.08);
      ctx.lineTo(x + w * 0.62, y + h * 0.42); ctx.lineTo(x + w * 0.63, y + h * 0.3); ctx.stroke();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2;   // nerve endings
      [0.42, 0.8].forEach((fx2) => { ctx.beginPath(); ctx.moveTo(x + w * fx2, y + h * 0.9); ctx.lineTo(x + w * fx2, y + h * 0.5); ctx.lineTo(x + w * fx2 - u * 0.04, y + h * 0.42); ctx.moveTo(x + w * fx2, y + h * 0.5); ctx.lineTo(x + w * fx2 + u * 0.04, y + h * 0.42); ctx.stroke(); });
      ctx.fillStyle = '#e2e8f0';
      label(ctx, T('top layer (epidermis)', 'lapisan luar (epidermis)'), x + w * 0.1, y + h * 0.36, x + w * 0.08, y + h * 0.1);
      label(ctx, T('hair', 'rambut'), x + w * 0.29, y + h * 0.16, x + w * 0.36, y + h * 0.06);
      // these two labels sit on the pale yellow fat layer, so draw them dark for contrast
      label(ctx, T('nerve endings: touch, heat, cold', 'ujung saraf: sentuhan, panas, dingin'), x + w * 0.42, y + h * 0.5, x + w * 0.1, y + h * 0.95, '#0f172a');
      label(ctx, T('sweat gland', 'kelenjar keringat'), x + w * 0.6, y + h * 0.7, x + w * 0.7, y + h * 0.95, '#0f172a');
      label(ctx, T('fat keeps you warm', 'lemak menjaga hangat'), x + w * 0.9, y + h * 0.85, x + w * 0.75, y + h * 0.2);
    }
    ctx.restore();
    labelBox = null;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.stroke();
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const bx = W * 0.03, by = H * 0.14, bw = W * 0.42, bh = H * 0.62;
    const s = STIMULI[state.idx];
    ctx.textAlign = 'left'; ctx.fillStyle = '#f8fafc'; ctx.font = font(H * 0.05, true);
    if (state.mode === 'play') {
      ctx.fillText(T('What is happening? Tap the body part that notices it.', 'Apa yang terjadi? Ketuk bagian tubuh yang merasakannya.'), bx, H * 0.09);
      drawStimulus(ctx, s, bx, by, bw, bh, now);
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(H * 0.045, true); ctx.textAlign = 'center';
      ctx.fillText(tx(s.name), bx + bw / 2, by + bh + H * 0.07);
      // score
      ctx.textAlign = 'right'; ctx.fillStyle = '#fbbf24'; ctx.font = font(H * 0.045, true);
      ctx.fillText(`${T('Score', 'Skor')}: ${state.right} / ${state.total}`, W * 0.97, H * 0.09);
      if (state.streak >= 3) { ctx.fillStyle = '#4ade80'; ctx.font = font(H * 0.035); ctx.fillText(`${state.streak} ${T('in a row!', 'berturut-turut!')}`, W * 0.97, H * 0.14); }
      drawFace(ctx, state.phase === 'right' ? s.organ : null);
      // feedback
      if (state.msg) {
        ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.beginPath(); ctx.roundRect(W * 0.03, H * 0.86, W * 0.94, H * 0.11, 12); ctx.fill();
        ctx.fillStyle = state.msgColor; ctx.font = font(H * 0.05, true); ctx.textAlign = 'center';
        ctx.fillText(state.msg, W * 0.5, H * 0.93);
      }
      if (state.phase === 'right' && now - state.msgAt > 1.8) next();
    } else {
      ctx.fillText(`${tx(ORGAN_NAME[state.organ])}: ${tx(ORGAN_JOB[state.organ])}`, bx, H * 0.09);
      drawExplore(ctx, bx, by, W * 0.44, bh);   // narrower than 0.5 W so the hand never covers the diagram
      ctx.fillStyle = '#cbd5e1'; ctx.font = font(H * 0.04); ctx.textAlign = 'left';
      ctx.fillText(T('Tap another body part to look inside it.', 'Ketuk bagian tubuh lain untuk melihat bagian dalamnya.'), bx, H * 0.93);
      drawFace(ctx, state.organ);
    }
    ctx.textAlign = 'left';
  }

  // ---- input -----------------------------------------------------------
  function localPos(e) {
    const r = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / Math.max(1, r.width)), y: (e.clientY - r.top) * (cv.height / Math.max(1, r.height)) };
  }
  const onDown = (e) => {
    const p = localPos(e);
    for (const h of organHits()) if (Math.hypot(p.x - h.x, p.y - h.y) < h.r) { answer(h.id); e.preventDefault(); return; }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // ---- controls --------------------------------------------------------
  const modeSel = select({
    label: T('Mode', 'Mode'), key: 'mode',
    options: [{ value: 'play', label: T('Play the game', 'Main tebak indra') }, { value: 'explore', label: T('Explore the parts', 'Jelajah bagian alat indra') }],
    value: 'play',
    onChange: (v) => { state.mode = v; state.msg = null; },
  });
  modeSel.el.querySelector('select').style.minHeight = '44px';
  const organBtns = ORGANS.map((o) => bigBtn(tx(ORGAN_NAME[o]), () => answer(o)));
  const nextB = bigBtn(T('Next one', 'Berikutnya'), () => { if (state.mode === 'play') next(); });
  const resetB = bigBtn(T('Reset score', 'Ulang skor'), () => { state.right = 0; state.total = 0; state.streak = 0; next(); });
  ctrlPanel.append(modeSel.el, row(...organBtns), row(nextB, resetB));

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
