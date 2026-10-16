import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

const SURVEYS = {
  fruit: {
    title: { en: 'Our favourite fruit', id: 'Buah kesukaan kita' },
    items: [
      { id: 'apple', icon: '🍎', color: '#ef4444', en: 'Apple', id: 'Apel' },
      { id: 'banana', icon: '🍌', color: '#facc15', en: 'Banana', id: 'Pisang' },
      { id: 'orange', icon: '🍊', color: '#f97316', en: 'Orange', id: 'Jeruk' },
      { id: 'mango', icon: '🥭', color: '#22c55e', en: 'Mango', id: 'Mangga' },
    ],
  },
  pets: {
    title: { en: 'Our favourite pets', id: 'Hewan peliharaan kesukaan kita' },
    items: [
      { id: 'cat', icon: '🐱', color: '#f59e0b', en: 'Cat', id: 'Kucing' },
      { id: 'dog', icon: '🐶', color: '#a78bfa', en: 'Dog', id: 'Anjing' },
      { id: 'fish', icon: '🐟', color: '#38bdf8', en: 'Fish', id: 'Ikan' },
      { id: 'bird', icon: '🐦', color: '#4ade80', en: 'Bird', id: 'Burung' },
    ],
  },
  transport: {
    title: { en: 'How we get to school', id: 'Cara kita ke sekolah' },
    items: [
      { id: 'walk', icon: '🚶', color: '#4ade80', en: 'Walk', id: 'Jalan kaki' },
      { id: 'bike', icon: '🚲', color: '#38bdf8', en: 'Bicycle', id: 'Sepeda' },
      { id: 'moto', icon: '🛵', color: '#f472b6', en: 'Motorbike', id: 'Motor' },
      { id: 'car', icon: '🚗', color: '#f59e0b', en: 'Car', id: 'Mobil' },
    ],
  },
};
const MAX_VOTES = 20;

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const ctx = cv.ctx;
  cv.canvas.style.touchAction = 'none';

  const state = {
    survey: 'fruit',
    votes: [3, 5, 1, 2],
    shown: [3, 5, 1, 2],     // animated bar heights
    perIcon: 1,
    history: [],
    last: -1,
    lastAt: -10,
    quiz: null,              // { kind, text, options:[{label, ok}], done, correct }
  };
  let now = 0;
  const items = () => SURVEYS[state.survey].items;
  const name = (it) => T(it.en, it.id);
  const font = (px, bold = true) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  const emojiFont = (px) => `${Math.round(px)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", system-ui, sans-serif`;

  function vote(i, d = 1) {
    const v = state.votes[i] + d;
    if (v < 0 || v > MAX_VOTES) return;
    state.votes[i] = v;
    if (d > 0) { state.history.push(i); state.last = i; state.lastAt = now; }
    refreshVoteButtons();
  }
  function undo() {
    const i = state.history.pop();
    if (i == null) return;
    if (state.votes[i] > 0) state.votes[i] -= 1;
    refreshVoteButtons();
  }

  function step(dt) {
    for (let i = 0; i < 4; i++) {
      const k = 1 - Math.exp(-10 * dt);
      state.shown[i] += (state.votes[i] - state.shown[i]) * k;
      if (Math.abs(state.votes[i] - state.shown[i]) < 0.01) state.shown[i] = state.votes[i];
    }
  }

  // ---- drawing --------------------------------------------------------------
  function drawTally(x, y, w, h) {
    const its = items();
    const rowH = h / 4;
    const fs = Math.max(9, Math.min(w * 0.09, rowH * 0.3));
    ctx.textAlign = 'left';
    for (let i = 0; i < 4; i++) {
      const it = its[i], cy = y + rowH * (i + 0.5);
      if (i === state.last && now - state.lastAt < 0.6) {
        ctx.fillStyle = 'rgba(250,204,21,0.12)';
        ctx.fillRect(x, cy - rowH / 2, w, rowH);
      }
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, false);
      ctx.fillText(name(it), x, cy - rowH * 0.18);
      // strokes in groups of five
      const n = state.votes[i];
      const sx = x, sy = cy + rowH * 0.02;
      const sh = Math.min(rowH * 0.42, fs * 1.6);
      const gapS = sh * 0.3, gapG = sh * 0.55;
      let px = sx;
      ctx.strokeStyle = it.color; ctx.lineWidth = Math.max(1.5, sh * 0.12); ctx.lineCap = 'round';
      ctx.beginPath();
      for (let k = 0; k < n; k++) {
        const inGroup = k % 5;
        if (inGroup === 4) {
          ctx.moveTo(px - gapS * 3.4, sy + sh); ctx.lineTo(px + gapS * 0.4, sy);
          px += gapG;
        } else {
          ctx.moveTo(px, sy); ctx.lineTo(px, sy + sh);
          px += gapS;
        }
        if (px > x + w - fs * 1.5) { // wrap very long tallies into a second line
          px = sx; ctx.stroke(); ctx.beginPath();
        }
      }
      ctx.stroke();
      ctx.lineCap = 'butt';
      ctx.fillStyle = '#fff'; ctx.font = font(fs * 1.2);
      ctx.textAlign = 'right';
      ctx.fillText(String(n), x + w, cy + rowH * 0.25);
      ctx.textAlign = 'left';
    }
  }

  function drawPictogram(x, y, w, h) {
    const its = items();
    const rowH = h / 4;
    const fs = Math.max(9, Math.min(w * 0.08, rowH * 0.28));
    const icon = Math.min(rowH * 0.5, w / 11);
    const gap = icon * 1.1;
    ctx.textAlign = 'left';
    for (let i = 0; i < 4; i++) {
      const it = its[i], cy = y + rowH * (i + 0.5);
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, false);
      ctx.fillText(name(it), x, cy - rowH * 0.22);
      const n = state.votes[i];
      const full = Math.floor(n / state.perIcon), half = n % state.perIcon;
      ctx.font = emojiFont(icon);
      ctx.textBaseline = 'middle';
      let px = x;
      const iy = cy + rowH * 0.15;
      for (let k = 0; k < full; k++) {
        let s = 1;
        if (i === state.last && k === full - 1 && now - state.lastAt < 0.3) s = 1 + 0.5 * Math.sin((now - state.lastAt) / 0.3 * Math.PI);
        ctx.font = emojiFont(icon * s);
        ctx.fillText(it.icon, px, iy);
        px += gap;
        if (px > x + w - gap) { px = x; }
      }
      if (half) {
        ctx.save();
        ctx.beginPath(); ctx.rect(px, iy - icon, icon * 0.55, icon * 2); ctx.clip();
        ctx.font = emojiFont(icon);
        ctx.fillText(it.icon, px, iy);
        ctx.restore();
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(px + icon * 0.55, iy - icon * 0.5); ctx.lineTo(px + icon * 0.55, iy + icon * 0.5); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.textBaseline = 'alphabetic';
    }
    // key
    ctx.font = emojiFont(fs * 1.3); ctx.textBaseline = 'middle';
    ctx.fillText(its[0].icon, x, y + h + fs * 1.2);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#facc15'; ctx.font = font(fs);
    ctx.fillText(T(`= ${state.perIcon} vote${state.perIcon > 1 ? 's' : ''}`, `= ${state.perIcon} suara`), x + fs * 2, y + h + fs * 1.55);
    if (state.perIcon === 2) {
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85, false);
      ctx.fillText(T('half a picture = 1 vote', 'setengah gambar = 1 suara'), x + fs * 2, y + h + fs * 2.7);
    }
  }

  function drawBars(x, y, w, h) {
    const its = items();
    const maxV = Math.max(5, Math.ceil(Math.max(...state.votes) / 5) * 5);
    const fs = Math.max(9, Math.min(w * 0.075, h * 0.07));
    const axisX = x + fs * 1.8, baseY = y + h - fs * 1.8, top = y + fs * 0.5;
    const plotH = baseY - top, plotW = x + w - axisX;
    // gridlines and axis numbers
    ctx.textAlign = 'right';
    ctx.font = font(fs * 0.9, false);
    const stepV = maxV <= 10 ? 1 : maxV <= 20 ? 2 : 5;
    for (let v = 0; v <= maxV; v += stepV) {
      const yy = baseY - (v / maxV) * plotH;
      ctx.strokeStyle = v % 5 === 0 ? 'rgba(226,232,240,0.35)' : 'rgba(226,232,240,0.12)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(axisX, yy); ctx.lineTo(x + w, yy); ctx.stroke();
      if (v % (stepV * (maxV > 10 ? 1 : 1)) === 0 && (maxV <= 10 || v % 5 === 0 || stepV >= 5)) {
        ctx.fillStyle = '#94a3b8'; ctx.fillText(String(v), axisX - 4, yy + fs * 0.35);
      }
    }
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(axisX, top); ctx.lineTo(axisX, baseY); ctx.lineTo(x + w, baseY); ctx.stroke();
    // bars
    const slot = plotW / 4, bw = slot * 0.62;
    ctx.textAlign = 'center';
    for (let i = 0; i < 4; i++) {
      const it = its[i];
      const bx = axisX + slot * i + (slot - bw) / 2;
      const bh = (state.shown[i] / maxV) * plotH;
      ctx.fillStyle = it.color;
      ctx.beginPath(); ctx.roundRect(bx, baseY - bh, bw, bh, [4, 4, 0, 0]); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = font(fs);
      if (state.votes[i] > 0) ctx.fillText(String(state.votes[i]), bx + bw / 2, baseY - bh - fs * 0.3);
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.85, false);
      const label = name(it);
      ctx.fillText(label.length > 7 && slot < 70 ? label.slice(0, 6) + '.' : label, bx + bw / 2, baseY + fs * 1.1);
    }
    bars.hit = { axisX, slot, baseY, top };
  }
  const bars = { hit: null };

  function draw() {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const total = state.votes.reduce((a, b) => a + b, 0);
    const titleFs = Math.max(12, Math.min(W * 0.03, H * 0.065));
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff'; ctx.font = font(titleFs);
    ctx.fillText(T(SURVEYS[state.survey].title.en, SURVEYS[state.survey].title.id), W / 2, H * 0.09);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(titleFs * 0.65, false);
    ctx.fillText(T(`${total} children answered`, `${total} anak menjawab`), W / 2, H * 0.15);

    const panelTop = H * 0.27, panelH = H * 0.56;
    const heads = [T('Tally', 'Turus'), T('Pictogram', 'Piktogram'), T('Bar chart', 'Diagram batang')];
    const xs = [W * 0.03, W * 0.33, W * 0.66], ws = [W * 0.26, W * 0.29, W * 0.31];
    ctx.font = font(titleFs * 0.75);
    for (let k = 0; k < 3; k++) {
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.beginPath(); ctx.roundRect(xs[k] - 6, panelTop - titleFs * 1.4, ws[k] + 12, panelH + titleFs * 3.2, 10); ctx.fill();
      ctx.fillStyle = '#facc15'; ctx.textAlign = 'left';
      ctx.fillText(heads[k], xs[k], panelTop - titleFs * 0.4);
    }
    drawTally(xs[0], panelTop, ws[0], panelH);
    drawPictogram(xs[1], panelTop, ws[1], panelH);
    drawBars(xs[2], panelTop, ws[2], panelH);
    ctx.textAlign = 'left';
  }

  // ---- tapping the canvas adds a vote ------------------------------------------
  let downAt = null;
  const local = (e) => {
    const r = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / r.width), y: (e.clientY - r.top) * (cv.height / r.height) };
  };
  const onDown = (e) => { downAt = local(e); };
  const onUp = (e) => {
    if (!downAt) return;
    const pt = local(e);
    const moved = Math.hypot(pt.x - downAt.x, pt.y - downAt.y);
    downAt = null;
    if (moved > 12) return;
    const W = cv.width, H = cv.height;
    const panelTop = H * 0.27, panelH = H * 0.56;
    if (pt.y < panelTop - 10 || pt.y > panelTop + panelH + 10) return;
    if (pt.x < W * 0.64) {            // tally or pictogram: rows
      const i = Math.floor((pt.y - panelTop) / (panelH / 4));
      if (i >= 0 && i < 4) vote(i, 1);
    } else if (bars.hit) {            // bar chart: columns
      const i = Math.floor((pt.x - bars.hit.axisX) / bars.hit.slot);
      if (i >= 0 && i < 4) vote(i, 1);
    }
  };
  cv.canvas.addEventListener('pointerdown', onDown);
  cv.canvas.addEventListener('pointerup', onUp);

  // ---- controls -------------------------------------------------------------------
  const voteBtns = items().map((_, i) => bigBtn('', () => vote(i, 1), true));
  function refreshVoteButtons() {
    items().forEach((it, i) => {
      voteBtns[i].label = `${it.icon} ${name(it)} (${state.votes[i]})`;
      voteBtns[i].el.style.borderColor = it.color;
    });
  }
  refreshVoteButtons();
  const undoB = bigBtn(T('Undo', 'Batalkan'), undo);
  const clearB = bigBtn(T('Start again', 'Mulai lagi'), () => { state.votes = [0, 0, 0, 0]; state.history = []; state.last = -1; clearQuiz(); refreshVoteButtons(); });
  const surveyS = select({
    label: T('Survey question', 'Pertanyaan survei'), key: 'survey',
    options: [
      { value: 'fruit', label: T('Favourite fruit', 'Buah kesukaan') },
      { value: 'pets', label: T('Favourite pet', 'Hewan peliharaan kesukaan') },
      { value: 'transport', label: T('How we get to school', 'Cara ke sekolah') },
    ],
    value: 'fruit',
    onChange: (v) => { if (!SURVEYS[v]) return; state.survey = v; state.votes = [0, 0, 0, 0]; state.shown = [0, 0, 0, 0]; state.history = []; state.last = -1; clearQuiz(); refreshVoteButtons(); },
  });
  const scaleT = toggle({ label: T('1 picture = 2 votes', '1 gambar = 2 suara'), key: 'two', value: false, onChange: (v) => { state.perIcon = v ? 2 : 1; } });
  ctrlPanel.append(row(...voteBtns), row(undoB, clearB, scaleT), surveyS.el);

  // ---- reading questions ---------------------------------------------------------
  const quizBox = document.createElement('div');
  quizBox.className = 'ctrl';
  quizBox.style.display = 'grid';
  quizBox.style.gap = '8px';
  const qText = document.createElement('div');
  qText.style.fontSize = '1.05rem';
  qText.style.fontWeight = '600';
  const qAnswers = document.createElement('div');
  qAnswers.className = 'ctrl-row';
  const qFeedback = document.createElement('div');
  qFeedback.style.fontSize = '1rem';
  qFeedback.style.minHeight = '1.4em';
  qFeedback.setAttribute('role', 'status');
  const askB = bigBtn(T('Ask me a question', 'Beri aku pertanyaan'), askQuestion, true);
  quizBox.append(askB.el, qText, qAnswers, qFeedback);
  ctrlPanel.appendChild(quizBox);

  function clearQuiz() { state.quiz = null; qText.textContent = ''; qAnswers.innerHTML = ''; qFeedback.textContent = ''; }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function askQuestion() {
    const its = items(), v = state.votes;
    const total = v.reduce((a, b) => a + b, 0);
    qFeedback.textContent = '';
    if (total === 0) { qText.textContent = T('Add some votes first!', 'Tambahkan beberapa suara dahulu!'); qAnswers.innerHTML = ''; return; }
    const kinds = [];
    const maxV = Math.max(...v), minV = Math.min(...v);
    if (v.filter((x) => x === maxV).length === 1) kinds.push('most');
    if (v.filter((x) => x === minV).length === 1) kinds.push('least');
    const pairs = [];
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (a !== b && v[a] > v[b]) pairs.push([a, b]);
    if (pairs.length) kinds.push('more');
    if (!kinds.length) { qText.textContent = T('Every group has the same number. Add a vote to make a question possible.', 'Semua kelompok sama banyak. Tambahkan satu suara agar ada pertanyaan.'); qAnswers.innerHTML = ''; return; }
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    let text, options;
    if (kind === 'most') {
      const i = v.indexOf(maxV);
      text = T('Which one did the most children choose?', 'Mana yang dipilih paling banyak anak?');
      options = its.map((it, k) => ({ label: `${it.icon} ${name(it)}`, ok: k === i }));
    } else if (kind === 'least') {
      const i = v.indexOf(minV);
      text = T('Which one did the fewest children choose?', 'Mana yang dipilih paling sedikit anak?');
      options = its.map((it, k) => ({ label: `${it.icon} ${name(it)}`, ok: k === i }));
    } else {
      const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
      const ans = v[a] - v[b];
      text = T(`How many more children chose ${name(its[a])} than ${name(its[b])}?`, `Berapa lebih banyak anak yang memilih ${name(its[a])} daripada ${name(its[b])}?`);
      const set = new Set([ans]);
      const cands = [v[a], v[b], v[a] + v[b], ans + 1, ans - 1, ans + 2].filter((x) => x >= 0 && x !== ans);
      for (const c of cands) { if (set.size >= 4) break; set.add(c); }
      let k = ans + 3;
      while (set.size < 4) set.add(k++);
      options = shuffle([...set]).map((n) => ({ label: String(n), ok: n === ans }));
    }
    state.quiz = { kind, text, options, done: false };
    qText.textContent = text;
    qAnswers.innerHTML = '';
    options.forEach((o) => {
      const b = bigBtn(o.label, () => {
        if (!state.quiz || state.quiz.done) return;
        if (o.ok) {
          state.quiz.done = true;
          qFeedback.textContent = T('Correct! Well done.', 'Benar! Hebat.');
          qFeedback.style.color = '#22c55e';
          b.el.style.background = '#22c55e'; b.el.style.color = '#052e16';
        } else {
          qFeedback.textContent = T('Not quite. Look at the bar chart and try again.', 'Belum tepat. Lihat diagram batangnya dan coba lagi.');
          qFeedback.style.color = '#f97316';
          b.el.style.opacity = '0.45';
        }
      });
      qAnswers.appendChild(b.el);
    });
  }

  const lab = labPanel({
    title: 'Survey results',
    filename: 'bar-charts-data.csv',
    columns: [
      { key: 'group', label: 'Group' },
      { key: 'tally', label: 'Tally' },
      { key: 'votes', label: 'Votes' },
    ],
    procedure: [
      'Ask your classmates the survey question and tap one vote for each answer.',
      'Tap a group button, then press Record to save that group\'s count. Do this for every group.',
      'Which group has the most votes? Which has the fewest? How many more does the top group have?',
    ],
    predict: 'Which answer do you think will get the most votes in your class?',
    source: () => {
      const i = state.last;
      if (i < 0) return null;
      const n = state.votes[i];
      const tally = Array(Math.floor(n / 5)).fill('IIII/').concat(['I'.repeat(n % 5)]).join(' ').trim();
      return { group: items()[i].en, tally, votes: n };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => {
    animator.stop();
    cv.canvas.removeEventListener('pointerdown', onDown);
    cv.canvas.removeEventListener('pointerup', onUp);
    cv.destroy();
  };
}
