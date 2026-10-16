import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MIN = -20, MAX = 20;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmtInt = (v) => (v < 0 ? '−' + Math.abs(v) : String(v));
// Wrap a negative operand in brackets, as textbooks do: 5 − (−3)
const fmtOperand = (v) => (v < 0 ? '(' + fmtInt(v) + ')' : String(v));

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // ---- state ---------------------------------------------------------------
  const params = { mode: 'addsub', view: 'line', a: 3, op: 'sub', b: -5, ma: 3, mb: -2 };
  const walker = { pos: 3, face: 1, hop: 0, backward: false, turning: 0 };
  // Animation phases: { type: 'turn' } | { type: 'move', d, backward } | { type: 'jump', d }
  const anim = { phases: [], i: -1, t: 0, dur: 0.45, from: 0, running: false, done: false };
  const trail = []; // positions visited (for drawing the hops)
  const quiz = { q: null, choices: [], picked: null, correct: 0, total: 0, feedback: '' };
  let now = 0;

  function operands() {
    if (params.mode === 'multiply') return { a: params.ma, b: params.mb, op: 'mul' };
    if (params.mode === 'quiz' && quiz.q) return quiz.q;
    return { a: params.a, b: params.b, op: params.op };
  }
  function result(o) {
    if (o.op === 'add') return o.a + o.b;
    if (o.op === 'sub') return o.a - o.b;
    return o.a * o.b;
  }
  function opSymbol(op) { return op === 'add' ? '+' : op === 'sub' ? '−' : '×'; }
  function equationText(o, withResult) {
    const lhs = `${fmtInt(o.a)} ${opSymbol(o.op)} ${fmtOperand(o.b)}`;
    return withResult ? `${lhs} = ${fmtInt(result(o))}` : `${lhs} = ?`;
  }

  // Build the walk for the current operands and start it.
  function go() {
    const o = operands();
    if (!o) return;
    const phases = [];
    walker.pos = clamp(o.a, MIN, MAX);
    walker.face = 1;
    walker.backward = false;
    trail.length = 0;
    trail.push(walker.pos);
    if (o.op === 'mul') {
      // |b| jumps of size |a|. a < 0: jumps go left. b < 0: turn around first (reverse direction).
      walker.pos = 0;
      trail[0] = 0;
      if (o.b < 0) phases.push({ type: 'turn' });
      const dir = Math.sign(o.a) * (o.b < 0 ? -1 : 1);
      for (let k = 0; k < Math.abs(o.b); k++) phases.push({ type: 'jump', d: dir * Math.abs(o.a) });
    } else {
      if (o.op === 'sub') phases.push({ type: 'turn' });
      const backward = o.b < 0;
      const faceAfter = o.op === 'sub' ? -1 : 1;
      const d = faceAfter * (backward ? -1 : 1);
      for (let k = 0; k < Math.abs(o.b); k++) phases.push({ type: 'move', d, backward });
    }
    anim.phases = phases;
    anim.i = -1;
    anim.t = 0;
    anim.running = true;
    anim.done = phases.length === 0;
    if (anim.done) anim.running = false;
    nextPhase();
  }
  function nextPhase() {
    anim.i++;
    anim.t = 0;
    if (anim.i >= anim.phases.length) { anim.running = false; anim.done = true; walker.hop = 0; walker.backward = false; return; }
    const p = anim.phases[anim.i];
    anim.from = walker.pos;
    anim.dur = p.type === 'turn' ? 0.6 : p.type === 'jump' ? 0.7 : 0.4;
    walker.backward = p.type === 'move' && p.backward;
  }
  function reset() {
    anim.phases = []; anim.i = -1; anim.running = false; anim.done = false;
    const o = operands();
    walker.pos = o ? clamp(o.op === 'mul' ? 0 : o.a, MIN, MAX) : 0;
    walker.face = 1; walker.hop = 0; walker.backward = false; walker.turning = 0;
    trail.length = 0;
  }

  function step(dt) {
    if (!anim.running) return;
    const p = anim.phases[anim.i];
    if (!p) return;
    anim.t += dt;
    const u = clamp(anim.t / anim.dur, 0, 1);
    if (p.type === 'turn') {
      walker.turning = Math.sin(u * Math.PI);
      if (u >= 1) { walker.face = -walker.face; walker.turning = 0; nextPhase(); }
    } else {
      const target = clamp(anim.from + p.d, MIN, MAX);
      walker.pos = anim.from + (target - anim.from) * u;
      walker.hop = Math.sin(u * Math.PI) * (p.type === 'jump' ? 1 : 0.4);
      if (u >= 1) { walker.pos = target; trail.push(target); nextPhase(); }
    }
  }

  // ---- quiz ----------------------------------------------------------------
  function newQuestion() {
    const r = Math.random();
    let q;
    if (r < 0.35) q = { a: rnd(-12, 12), b: rnd(-12, 12), op: 'add' };
    else if (r < 0.7) q = { a: rnd(-12, 12), b: rnd(-12, 12), op: 'sub' };
    else q = { a: rnd(-4, 4) || 2, b: rnd(-4, 4) || -3, op: 'mul' };
    const ans = result(q);
    const pool = new Set([ans]);
    const wrong = [q.a + Math.abs(q.b), q.a - Math.abs(q.b), -ans, ans + 1, ans - 1, Math.abs(ans), q.a * -q.b, q.a + q.b];
    for (const w of wrong) { if (pool.size >= 4) break; if (Number.isFinite(w) && !pool.has(w)) pool.add(w); }
    let guard = 0;
    while (pool.size < 4 && guard++ < 50) pool.add(ans + rnd(-6, 6));
    quiz.q = q;
    quiz.choices = shuffle([...pool]);
    quiz.picked = null;
    quiz.feedback = '';
    choiceBtns.forEach((b, i) => { b.el.textContent = fmtInt(quiz.choices[i]); b.el.disabled = false; b.el.style.opacity = '1'; });
    reset();
  }
  function pick(i) {
    if (!quiz.q || quiz.picked != null) return;
    quiz.picked = i;
    quiz.total++;
    const ok = quiz.choices[i] === result(quiz.q);
    if (ok) quiz.correct++;
    quiz.feedback = ok ? T('Correct!', 'Benar!') : T('Not quite — watch the walker.', 'Belum tepat — perhatikan si pejalan.');
    choiceBtns.forEach((b) => { b.el.disabled = true; b.el.style.opacity = '0.6'; });
    go();
  }
  function rnd(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

  // ---- drawing -------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function lineGeom() {
    const W = cv.width, H = cv.height;
    const x0 = W * 0.06, x1 = W * 0.94;
    return { x0, x1, y: H * 0.78, unit: (x1 - x0) / (MAX - MIN), toX: (v) => x0 + (v - MIN) * (x1 - x0) / (MAX - MIN) };
  }

  function drawNumberLine(ctx) {
    const W = cv.width, H = cv.height;
    const g = lineGeom();
    const every = W < 560 ? 5 : W < 900 ? 2 : 1;
    // Negative half tinted blue, positive half tinted amber.
    ctx.fillStyle = 'rgba(59,130,246,0.10)';
    ctx.fillRect(g.x0, g.y - H * 0.16, g.toX(0) - g.x0, H * 0.24);
    ctx.fillStyle = 'rgba(245,158,11,0.10)';
    ctx.fillRect(g.toX(0), g.y - H * 0.16, g.x1 - g.toX(0), H * 0.24);
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(g.x0 - 10, g.y); ctx.lineTo(g.x1 + 10, g.y); ctx.stroke();
    // arrowheads
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath(); ctx.moveTo(g.x1 + 16, g.y); ctx.lineTo(g.x1 + 6, g.y - 5); ctx.lineTo(g.x1 + 6, g.y + 5); ctx.fill();
    ctx.beginPath(); ctx.moveTo(g.x0 - 16, g.y); ctx.lineTo(g.x0 - 6, g.y - 5); ctx.lineTo(g.x0 - 6, g.y + 5); ctx.fill();
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let v = MIN; v <= MAX; v++) {
      const x = g.toX(v);
      const major = v % 5 === 0;
      ctx.strokeStyle = v === 0 ? '#f8fafc' : '#94a3b8';
      ctx.lineWidth = v === 0 ? 3 : 1.5;
      const h = major ? H * 0.035 : H * 0.02;
      ctx.beginPath(); ctx.moveTo(x, g.y - h); ctx.lineTo(x, g.y + h); ctx.stroke();
      if (v % every === 0 || v === 0) {
        ctx.fillStyle = v < 0 ? '#93c5fd' : v > 0 ? '#fcd34d' : '#f8fafc';
        ctx.font = font(H * (major ? 0.04 : 0.032), major);
        ctx.fillText(fmtInt(v), x, g.y + H * 0.045);
      }
    }
    // Hop arcs for the visited positions
    if (trail.length > 1) {
      ctx.strokeStyle = 'rgba(52,211,153,0.9)'; ctx.lineWidth = 2;
      for (let i = 1; i < trail.length; i++) {
        const xa = g.toX(trail[i - 1]), xb = g.toX(trail[i]);
        const r = Math.abs(xb - xa) / 2;
        if (r < 0.5) continue;
        ctx.beginPath();
        ctx.arc((xa + xb) / 2, g.y - H * 0.02, r, Math.PI, 0, false);
        ctx.stroke();
      }
    }
    // Live hop arc for the current move
    if (anim.running && anim.phases[anim.i] && anim.phases[anim.i].type !== 'turn') {
      const xa = g.toX(anim.from), xb = g.toX(walker.pos);
      const r = Math.abs(xb - xa) / 2;
      if (r > 0.5) {
        ctx.strokeStyle = 'rgba(52,211,153,0.5)'; ctx.lineWidth = 2;
        ctx.beginPath();
        if (xb > xa) ctx.arc((xa + xb) / 2, g.y - H * 0.02, r, Math.PI, 2 * Math.PI, false);
        else ctx.arc((xa + xb) / 2, g.y - H * 0.02, r, 0, -Math.PI, true);
        ctx.stroke();
      }
    }
    drawWalker(ctx, g.toX(walker.pos), g.y - H * 0.03 - walker.hop * H * 0.12, H * 0.11);
  }

  function drawWalker(ctx, x, yFeet, h) {
    const face = walker.face;
    const squash = walker.turning > 0 ? 1 - 0.8 * walker.turning : 1; // flattens while turning around
    ctx.save();
    ctx.translate(x, yFeet);
    ctx.scale(face * Math.max(0.15, squash), 1);
    ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2, h * 0.08);
    ctx.strokeStyle = walker.backward ? '#f472b6' : '#34d399';
    // legs
    const legSwing = anim.running ? Math.sin(now * 18) * h * 0.18 : 0;
    ctx.beginPath(); ctx.moveTo(0, -h * 0.42); ctx.lineTo(-h * 0.14 + legSwing, 0); ctx.moveTo(0, -h * 0.42); ctx.lineTo(h * 0.14 - legSwing, 0); ctx.stroke();
    // body
    ctx.beginPath(); ctx.moveTo(0, -h * 0.42); ctx.lineTo(0, -h * 0.75); ctx.stroke();
    // arms (pointing in the facing direction)
    ctx.beginPath(); ctx.moveTo(0, -h * 0.66); ctx.lineTo(h * 0.26, -h * 0.58); ctx.moveTo(0, -h * 0.66); ctx.lineTo(-h * 0.14, -h * 0.5); ctx.stroke();
    // head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath(); ctx.arc(0, -h * 0.87, h * 0.13, 0, Math.PI * 2); ctx.fill();
    // nose shows the facing direction
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(h * 0.12, -h * 0.87, h * 0.04, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // facing arrow above the head
    ctx.fillStyle = '#e2e8f0';
    ctx.font = font(h * 0.26, true); ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText(face > 0 ? '→' : '←', x, yFeet - h * 1.05);
  }

  function drawThermometer(ctx, X, Y, W, H) {
    // vertical tube: MIN at bottom, MAX at top
    const tubeW = Math.max(14, W * 0.08);
    const cx = X + W * 0.5;
    const top = Y + H * 0.08, bottom = Y + H * 0.9;
    const toY = (v) => bottom - (v - MIN) / (MAX - MIN) * (bottom - top);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.roundRect(cx - tubeW / 2, top - tubeW / 2, tubeW, bottom - top + tubeW, tubeW / 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, bottom + tubeW * 0.9, tubeW * 1.1, 0, Math.PI * 2); ctx.fill();
    const v = clamp(walker.pos, MIN, MAX);
    const yv = toY(v), y0 = toY(0);
    // mercury: fill from the bulb up to the reading. Below zero it is blue, above red.
    ctx.fillStyle = v >= 0 ? '#ef4444' : '#3b82f6';
    ctx.fillRect(cx - tubeW * 0.3, yv, tubeW * 0.6, bottom + tubeW * 0.9 - yv);
    ctx.beginPath(); ctx.arc(cx, bottom + tubeW * 0.9, tubeW * 0.8, 0, Math.PI * 2); ctx.fill();
    // zero line
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - tubeW, y0); ctx.lineTo(cx + tubeW, y0); ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(H * 0.07); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    for (let t = MIN; t <= MAX; t += 10) {
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx + tubeW * 0.6, toY(t)); ctx.lineTo(cx + tubeW * 0.9, toY(t)); ctx.stroke();
      ctx.fillText(fmtInt(t) + '°', cx + tubeW * 1.05, toY(t));
    }
    // reading
    ctx.fillStyle = v >= 0 ? '#fca5a5' : '#93c5fd';
    ctx.font = font(H * 0.12, true); ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(fmtInt(Math.round(v)) + ' °C', cx - tubeW * 1.2, yv);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.065); ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(v < 0 ? T('below freezing', 'di bawah titik beku') : v > 0 ? T('above freezing', 'di atas titik beku') : T('freezing point', 'titik beku'), cx, Y + H * 0.93);
  }

  function drawBank(ctx, X, Y, W, H) {
    const v = Math.round(clamp(walker.pos, MIN, MAX));
    const n = Math.abs(v);
    const r = Math.max(5, Math.min(W / 24, H * 0.09));
    const cols = 10;
    const startX = X + W * 0.5 - (cols - 1) * r * 1.1;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(H * 0.11, true);
    ctx.fillText(T('Balance', 'Saldo') + ': ' + fmtInt(v) + ' ' + T('coins', 'koin'), X + W / 2, Y + H * 0.06);
    ctx.font = font(H * 0.075); ctx.fillStyle = v < 0 ? '#fca5a5' : '#86efac';
    ctx.fillText(v < 0 ? T(`You owe ${n} coins (debt).`, `Kamu berutang ${n} koin.`) : v > 0 ? T(`You have ${n} coins.`, `Kamu punya ${n} koin.`) : T('Nothing owned, nothing owed.', 'Tidak punya, tidak berutang.'), X + W / 2, Y + H * 0.2);
    // ledger line
    const yMid = Y + H * 0.42;
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X + W * 0.1, yMid); ctx.lineTo(X + W * 0.9, yMid); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.06); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
    ctx.fillText(T('coins owned', 'koin dimiliki'), X + W * 0.1, yMid - 3);
    ctx.textBaseline = 'top';
    ctx.fillText(T('coins owed (debt)', 'koin terutang (utang)'), X + W * 0.1, yMid + 3);
    for (let i = 0; i < n; i++) {
      const col = i % cols, rowI = Math.floor(i / cols);
      const cx = startX + col * r * 2.2;
      const cy = v > 0 ? yMid - r * 1.6 - rowI * r * 2.3 - H * 0.08 : yMid + r * 1.6 + rowI * r * 2.3 + H * 0.08;
      if (v > 0) {
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.roundRect(cx - r, cy - r * 0.7, r * 2, r * 1.4, 3); ctx.fill();
        ctx.strokeStyle = '#fca5a5'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(cx - r, cy - r * 0.7, r * 2, r * 1.4, 3); ctx.stroke();
        ctx.fillStyle = '#fecaca'; ctx.font = font(r * 0.9, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('−1', cx, cy);
      }
    }
  }

  function storyLines(o) {
    // Explain the walk rule in words, step by step.
    if (!o) return [];
    const lines = [];
    if (o.op === 'mul') {
      const left = o.a < 0 ? T(' to the left (a is negative)', ' ke kiri (a negatif)') : '';
      lines.push(T(`Start at 0. Jump size ${Math.abs(o.a)}${left}.`, `Mulai dari 0. Panjang lompatan ${Math.abs(o.a)}${left}.`));
      lines.push(o.b < 0
        ? T(`b is negative: turn around, then jump ${Math.abs(o.b)} times.`, `b negatif: berbalik arah, lalu lompat ${Math.abs(o.b)} kali.`)
        : T(`Jump ${Math.abs(o.b)} times.`, `Lompat ${Math.abs(o.b)} kali.`));
      const sameSign = (o.a < 0) === (o.b < 0);
      if (o.a !== 0 && o.b !== 0) lines.push(sameSign ? T('Same signs → positive answer.', 'Tanda sama → hasil positif.') : T('Different signs → negative answer.', 'Tanda berbeda → hasil negatif.'));
    } else {
      lines.push(T(`Start at ${fmtInt(o.a)}, facing right.`, `Mulai di ${fmtInt(o.a)}, menghadap kanan.`));
      lines.push(o.op === 'sub' ? T('Subtract: turn around.', 'Kurangi: berbalik arah.') : T('Add: keep facing right.', 'Tambah: tetap menghadap kanan.'));
      lines.push(o.b < 0
        ? T(`${fmtInt(o.b)} is negative: walk ${Math.abs(o.b)} steps backwards.`, `${fmtInt(o.b)} negatif: mundur ${Math.abs(o.b)} langkah.`)
        : T(`${o.b} is positive: walk ${o.b} steps forwards.`, `${o.b} positif: maju ${o.b} langkah.`));
    }
    return lines;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const o = operands();

    // Top panel: equation + story (left) and model view (right)
    const panelH = H * 0.6;
    const modelW = params.view === 'line' ? 0 : W * 0.34;
    const textW = W - modelW;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    if (o) {
      const showAns = anim.done;
      ctx.fillStyle = '#f8fafc'; ctx.font = font(Math.min(H * 0.11, textW * 0.09), true);
      ctx.fillText(equationText(o, showAns), W * 0.04, H * 0.05);
      ctx.font = font(Math.min(H * 0.05, textW * 0.045));
      let y = H * 0.21;
      const lines = params.mode === 'quiz' && quiz.picked == null ? [T('Pick an answer below.', 'Pilih jawaban di bawah.')] : storyLines(o);
      for (const ln of lines) {
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(ln, W * 0.04, y);
        y += H * 0.07;
      }
      if (anim.done) {
        ctx.fillStyle = '#34d399'; ctx.font = font(Math.min(H * 0.06, textW * 0.05), true);
        ctx.fillText(T(`Finish at ${fmtInt(result(o))}.`, `Berakhir di ${fmtInt(result(o))}.`), W * 0.04, y + H * 0.01);
        y += H * 0.08;
      }
      if (params.mode === 'quiz') {
        ctx.fillStyle = quiz.feedback.startsWith(T('Correct', 'Benar')) ? '#86efac' : '#fca5a5';
        ctx.font = font(Math.min(H * 0.055, textW * 0.05), true);
        if (quiz.feedback) ctx.fillText(quiz.feedback, W * 0.04, y + H * 0.01);
        ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.045);
        ctx.textAlign = 'right';
        ctx.fillText(T('Score', 'Skor') + `: ${quiz.correct}/${quiz.total}`, W - modelW - W * 0.03, H * 0.05);
        ctx.textAlign = 'left';
      }
    }
    if (params.view === 'thermo') drawThermometer(ctx, W - modelW, H * 0.02, modelW, panelH);
    else if (params.view === 'bank') drawBank(ctx, W - modelW, H * 0.02, modelW, panelH);
    drawNumberLine(ctx);
    // legend
    ctx.fillStyle = '#64748b'; ctx.font = font(H * 0.035); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
    ctx.fillText(T('Negative numbers are to the left of 0; the arrow shows which way the walker faces. Pink = walking backwards.', 'Bilangan negatif ada di kiri 0; panah menunjukkan arah hadap si pejalan. Merah muda = berjalan mundur.'), W * 0.03, H * 0.985);
  }

  // ---- controls ------------------------------------------------------------
  const modeSel = select({
    label: T('Mode', 'Mode'), key: 'mode', value: 'addsub',
    options: [
      { value: 'addsub', label: T('Add / subtract', 'Tambah / kurang') },
      { value: 'multiply', label: T('Multiply', 'Kali') },
      { value: 'quiz', label: T('Quiz', 'Kuis') },
    ],
    onChange: (v) => { params.mode = v; syncVisibility(); if (v === 'quiz') newQuestion(); else reset(); },
  });
  const viewSel = select({
    label: T('View', 'Tampilan'), key: 'view', value: 'line',
    options: [
      { value: 'line', label: T('Number line only', 'Garis bilangan saja') },
      { value: 'thermo', label: T('Thermometer (°C)', 'Termometer (°C)') },
      { value: 'bank', label: T('Bank balance', 'Saldo bank') },
    ],
    onChange: (v) => { params.view = v; },
  });
  const aSl = slider({ label: T('Start a', 'Awal a'), key: 'a', min: MIN, max: MAX, step: 1, value: params.a, format: fmtInt, onInput: (v) => { params.a = v; reset(); } });
  const opSel = select({
    label: T('Operation', 'Operasi'), key: 'op', value: 'sub',
    options: [{ value: 'add', label: '+  ' + T('add', 'tambah') }, { value: 'sub', label: '−  ' + T('subtract', 'kurang') }],
    onChange: (v) => { params.op = v; reset(); },
  });
  const bSl = slider({ label: T('Number b', 'Bilangan b'), key: 'b', min: MIN, max: MAX, step: 1, value: params.b, format: fmtInt, onInput: (v) => { params.b = v; reset(); } });
  const maSl = slider({ label: T('a (jump size)', 'a (panjang lompatan)'), key: 'ma', min: -4, max: 4, step: 1, value: params.ma, format: fmtInt, onInput: (v) => { params.ma = v; reset(); } });
  const mbSl = slider({ label: T('b (how many jumps)', 'b (berapa lompatan)'), key: 'mb', min: -4, max: 4, step: 1, value: params.mb, format: fmtInt, onInput: (v) => { params.mb = v; reset(); } });
  const goBtn = button({ label: T('Go!', 'Jalan!'), primary: true, onClick: () => go() });
  const resetBtn = button({ label: T('Reset', 'Atur ulang'), onClick: () => reset() });
  const newQBtn = button({ label: T('New question', 'Soal baru'), primary: true, onClick: () => newQuestion() });
  const choiceBtns = [0, 1, 2, 3].map((i) => {
    const b = button({ label: '?', onClick: () => pick(i) });
    b.el.style.minWidth = '64px'; b.el.style.fontSize = '1.05rem';
    return b;
  });

  const addRow = row(aSl, opSel, bSl);
  const mulRow = row(maSl, mbSl);
  const walkRow = row(goBtn, resetBtn);
  const quizRow = row(...choiceBtns, newQBtn);
  ctrlPanel.append(row(modeSel, viewSel), addRow, mulRow, walkRow, quizRow);

  function syncVisibility() {
    addRow.style.display = params.mode === 'addsub' ? '' : 'none';
    mulRow.style.display = params.mode === 'multiply' ? '' : 'none';
    walkRow.style.display = params.mode === 'quiz' ? 'none' : '';
    quizRow.style.display = params.mode === 'quiz' ? '' : 'none';
  }
  syncVisibility();
  reset();

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
