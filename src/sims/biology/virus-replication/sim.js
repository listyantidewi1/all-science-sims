import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Stage ids. The lysogenic route shares attach/inject, then integrate → divide → induce,
// and finally joins the lytic route at replicate.
const LYTIC = ['attach', 'inject', 'replicate', 'assemble', 'lyse'];
const LYSOGENIC = ['attach', 'inject', 'integrate', 'divide', 'induce', 'replicate', 'assemble', 'lyse'];
// Fraction of the latent period each lytic stage takes (sums to 1).
const FRAC = { attach: 0.1, inject: 0.1, replicate: 0.4, assemble: 0.25, lyse: 0.15, integrate: 0.2, induce: 0.1 };
const DOUBLING = 30;      // min, host generation time
const K_CARRY = 300;      // carrying capacity of the culture (cells)
const K_ADS = 0.0006;     // adsorption rate, per virion per cell per min
const INDUCE_RATE = 0.004; // per lysogen per min
const DECAY = 0.002;      // free-virion decay per min

const STAGE_NAME = {
  attach: ['Attachment', 'Pelekatan'], inject: ['Injection', 'Penyuntikan'], replicate: ['Replication', 'Replikasi'],
  assemble: ['Assembly', 'Perakitan'], lyse: ['Lysis & release', 'Lisis & pelepasan'], integrate: ['Integration (prophage)', 'Integrasi (profag)'],
  divide: ['Host division', 'Pembelahan inang'], induce: ['Induction (UV)', 'Induksi (UV)'],
};
// One-word pill labels for the stage strip.
const STAGE_SHORT = {
  attach: ['Attachment', 'Pelekatan'], inject: ['Injection', 'Penyuntikan'], replicate: ['Replication', 'Replikasi'],
  assemble: ['Assembly', 'Perakitan'], lyse: ['Lysis', 'Lisis'], integrate: ['Integration', 'Integrasi'],
  divide: ['Division', 'Pembelahan'], induce: ['Induction', 'Induksi'],
};
const STAGE_DESC = {
  attach: ['Tail fibres bind receptors on the cell wall', 'Serabut ekor mengikat reseptor di dinding sel'],
  inject: ['Viral DNA is pushed through the tail into the cell', 'DNA virus didorong lewat ekor ke dalam sel'],
  replicate: ['Host enzymes copy the viral genome; host DNA is degraded', 'Enzim inang menyalin genom virus; DNA inang dirombak'],
  assemble: ['Capsids self-assemble around new genomes', 'Kapsid merakit diri di sekitar genom baru'],
  lyse: ['Lysozyme breaks the wall: burst of B virions', 'Lisozim memecah dinding: ledakan B virion'],
  integrate: ['Viral DNA inserts into the host chromosome', 'DNA virus menyisip ke kromosom inang'],
  divide: ['Cell divides; each daughter inherits the prophage', 'Sel membelah; tiap sel anak mewarisi profag'],
  induce: ['UV damage: prophage excises, lytic genes switch on', 'Kerusakan UV: profag keluar, gen litik menyala'],
};
const DRUG_NAME = {
  none: ['none', 'tidak ada'], attach: ['entry inhibitor (e.g. maraviroc)', 'penghambat masuk (mis. maraviroc)'],
  inject: ['uncoating/entry blocker (e.g. amantadine)', 'penghambat masuk (mis. amantadin)'],
  replicate: ['nucleoside analogue (e.g. acyclovir)', 'analog nukleosida (mis. asiklovir)'],
  assemble: ['protease inhibitor (e.g. ritonavir)', 'penghambat protease (mis. ritonavir)'],
  lyse: ['release inhibitor (e.g. oseltamivir)', 'penghambat pelepasan (mis. oseltamivir)'],
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { cycle: 'lytic', burst: 100, latent: 25, drug: 'none', auto: true, speed: 2 };
  const state = {
    stageIdx: 0, progress: 0, t: 0, cycles: 0, blockedFlash: 0,
    H: 100, Lg: 0, V: 10, infected: [], hist: [], lastHist: -1,
  };
  const fixed = []; // scattered phage directions for the lysis drawing (no per-frame allocation)
  for (let i = 0; i < 14; i++) fixed.push({ a: (i / 14) * Math.PI * 2 + 0.3, r: 0.6 + ((i * 37) % 10) / 20 });

  const stages = () => (params.cycle === 'lytic' ? LYTIC : LYSOGENIC);
  const stageId = () => stages()[state.stageIdx];
  const stageDur = (id) => (id === 'divide' ? DOUBLING : FRAC[id] * params.latent);
  const blocked = () => params.drug !== 'none' && params.drug === stageId();

  function reset() {
    state.stageIdx = 0; state.progress = 0; state.t = 0; state.cycles = 0;
    state.H = 100; state.Lg = 0; state.V = 10; state.infected = []; state.hist = []; state.lastHist = -1;
    pushHist();
  }
  function pushHist() {
    state.hist.push({ t: state.t, hosts: state.H + state.Lg, V: state.V });
    if (state.hist.length > 900) state.hist.shift();
    state.lastHist = state.t;
  }

  // Population model, integrated in sim minutes.
  function popStep(dm) {
    const { drug } = params;
    const r = Math.LN2 / DOUBLING;
    let infCount = 0;
    for (const q of state.infected) infCount += q.n;
    const total = state.H + state.Lg + infCount;
    const growth = r * (1 - total / K_CARRY);
    state.H += growth * state.H * dm;
    state.Lg += growth * state.Lg * dm;
    // adsorption → infection
    let newInf = (drug === 'attach' || drug === 'inject') ? 0 : K_ADS * state.H * state.V * dm;
    newInf = Math.min(newInf, state.H, state.V);
    if (newInf > 0) {
      state.H -= newInf; state.V -= newInf;
      if (params.cycle === 'lytic') state.infected.push({ tl: state.t + params.latent, n: newInf });
      else state.Lg += newInf;
    }
    // induction of lysogens
    if (params.cycle === 'lysogenic' && state.Lg > 0) {
      const ind = Math.min(state.Lg, INDUCE_RATE * state.Lg * dm);
      state.Lg -= ind;
      if (ind > 0) state.infected.push({ tl: state.t + params.latent * 0.9, n: ind });
    }
    // lysis of infected cells whose latent period has elapsed
    if (drug !== 'lyse') {
      const keep = [];
      for (const q of state.infected) {
        if (q.tl <= state.t) {
          const b = (drug === 'replicate' || drug === 'assemble') ? 0 : params.burst;
          state.V += q.n * b;
        } else keep.push(q);
      }
      state.infected = keep;
    }
    state.V -= DECAY * state.V * dm;
    if (state.H < 0.01) state.H = 0;
    if (state.Lg < 0.01) state.Lg = 0;
    if (state.V < 0) state.V = 0;
    if (!Number.isFinite(state.V)) state.V = 0;
  }

  function advance(dm) {
    // sub-step for accuracy when Step jumps many minutes at once
    const n = Math.max(1, Math.ceil(dm / 0.25));
    const h = dm / n;
    for (let i = 0; i < n; i++) {
      state.t += h;
      popStep(h);
      if (state.t - state.lastHist >= 0.5) pushHist();
    }
  }

  function nextStage() {
    const list = stages();
    state.stageIdx++;
    state.progress = 0;
    if (state.stageIdx >= list.length) { state.stageIdx = 0; state.cycles++; }
  }

  function step(dt) {
    if (!params.auto) return;
    const dm = dt * params.speed;
    advance(dm);
    // Stall the animation before the blocked step completes (lysis: before the burst is drawn).
    if (blocked()) { state.progress = Math.min(state.progress, stageId() === 'lyse' ? 0.3 : 0.55); return; }
    state.progress += dm / stageDur(stageId());
    if (state.progress >= 1) nextStage();
    if (state.blockedFlash > 0) state.blockedFlash -= dt;
  }

  function doStep() {
    if (blocked()) { state.blockedFlash = 1.2; return; }
    const remain = (1 - state.progress) * stageDur(stageId());
    advance(remain);
    nextStage();
  }

  // ---------- drawing ----------
  function hexagon(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      const px = x + r * Math.cos(a), py = y + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }
  // Phage pointing "down" (tail toward +y). s = head radius.
  function drawPhage(ctx, x, y, s, ang = 0, full = true, alpha = 1) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha = alpha;
    ctx.fillStyle = '#a78bfa'; ctx.strokeStyle = '#6d28d9'; ctx.lineWidth = Math.max(1, s * 0.12);
    hexagon(ctx, 0, 0, s); ctx.fill(); ctx.stroke();
    if (full) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(0, 0, s * 0.45, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(-s * 0.22, s * 0.8, s * 0.44, s * 1.6);
    ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = Math.max(1, s * 0.1);
    for (const d of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(d * s * 0.2, s * 2.4); ctx.lineTo(d * s * 0.9, s * 2.9); ctx.lineTo(d * s * 1.1, s * 3.4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(d * s * 0.2, s * 2.4); ctx.lineTo(d * s * 0.5, s * 3.1); ctx.lineTo(d * s * 0.6, s * 3.5); ctx.stroke();
    }
    ctx.restore();
  }
  function chromosome(ctx, cx, cy, w, h, alpha, prophage) {
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#34d399'; ctx.lineWidth = Math.max(1.5, w * 0.03);
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.33, h * 0.26, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.2, h * 0.14, 0.6, 0, Math.PI * 2);
    ctx.stroke();
    if (prophage) {
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(3, w * 0.05);
      ctx.beginPath(); ctx.ellipse(cx, cy, w * 0.33, h * 0.26, 0, -0.5, 0.5); ctx.stroke();
    }
    ctx.restore();
  }
  function roundCell(ctx, cx, cy, w, h, broken) {
    ctx.save();
    ctx.lineWidth = Math.max(2, w * 0.02);
    ctx.fillStyle = 'rgba(56,189,248,0.10)';
    ctx.strokeStyle = '#38bdf8';
    if (!broken) {
      ctx.beginPath(); ctx.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2); ctx.fill(); ctx.stroke();
    } else {
      ctx.setLineDash([w * 0.06, w * 0.05]);
      ctx.beginPath(); ctx.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2); ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  function drawCellPanel(ctx, x0, y0, w, h) {
    const id = stageId(), p = clamp(state.progress, 0, 1);
    const cx = x0 + w / 2, cy = y0 + h * 0.56;
    const cw = w * 0.62, ch = h * 0.34;
    const s = Math.max(6, cw * 0.05);
    const lysogen = params.cycle === 'lysogenic';
    const prophage = lysogen && (id === 'integrate' ? p > 0.6 : id === 'divide' || (id === 'induce' && p < 0.5));
    const topY = cy - ch / 2;

    if (id === 'divide') {
      // cell elongates then pinches into two
      const grow = 1 + 0.5 * Math.min(1, p / 0.6);
      const sep = p > 0.6 ? (p - 0.6) / 0.4 : 0;
      const W2 = cw * grow;
      if (sep === 0) {
        roundCell(ctx, cx, cy, W2, ch, false);
        chromosome(ctx, cx - W2 * 0.22 * Math.min(1, p / 0.6), cy, cw * 0.8, ch, 1, true);
        chromosome(ctx, cx + W2 * 0.22 * Math.min(1, p / 0.6), cy, cw * 0.8, ch, Math.min(1, p / 0.4), true);
      } else {
        const off = W2 / 4 + sep * cw * 0.12;
        roundCell(ctx, cx - off, cy, W2 / 2 - sep * cw * 0.03, ch, false);
        roundCell(ctx, cx + off, cy, W2 / 2 - sep * cw * 0.03, ch, false);
        chromosome(ctx, cx - off, cy, cw * 0.7, ch, 1, true);
        chromosome(ctx, cx + off, cy, cw * 0.7, ch, 1, true);
      }
    } else {
      roundCell(ctx, cx, cy, cw, ch, id === 'lyse' && p > 0.4);
      // host chromosome fades during replication (degraded by phage nucleases)
      const hostAlpha = id === 'replicate' ? Math.max(0.1, 1 - p) : (id === 'assemble' || id === 'lyse') ? 0.1 : 1;
      if (!(id === 'lyse' && p > 0.4)) chromosome(ctx, cx, cy, cw, ch, hostAlpha, prophage);
    }

    // phage on the surface
    if (id === 'attach') {
      const y = y0 + h * 0.12 + (topY - s * 3.6 - (y0 + h * 0.12)) * p;
      drawPhage(ctx, cx, y, s, 0, true);
    } else if (id === 'inject') {
      drawPhage(ctx, cx, topY - s * 3.6, s, 0, p < 0.3);
      // DNA thread travelling down the tail into the cell
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(2, s * 0.25);
      const yStart = topY - s * 3.6, yEnd = cy;
      const y1 = yStart + (yEnd - yStart) * Math.min(1, p * 1.2);
      ctx.beginPath(); ctx.moveTo(cx, yStart + s * 0.5); ctx.lineTo(cx, y1); ctx.stroke();
    } else if (id === 'integrate' || id === 'induce' || id === 'replicate' || id === 'assemble') {
      drawPhage(ctx, cx, topY - s * 3.6, s, 0, false, 0.45); // empty capsid stays on the wall
    }
    // viral DNA inside the cell
    const dnaCount = id === 'replicate' ? Math.max(1, Math.round(1 + 11 * p)) : (id === 'assemble' || (id === 'lyse' && p < 0.4)) ? 12 : 0;
    if (id === 'integrate' && p <= 0.6) {
      // free viral DNA drifting toward the chromosome
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(2, s * 0.25);
      const yy = cy - ch * 0.1 - (ch * 0.26 - ch * 0.1) * (1 - p / 0.6);
      ctx.beginPath(); ctx.moveTo(cx - s * 1.2, yy); ctx.quadraticCurveTo(cx, yy - s * 0.8, cx + s * 1.2, yy); ctx.stroke();
    }
    if (id === 'induce' && p >= 0.5) {
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(2, s * 0.25);
      const yy = cy - ch * 0.26 + (p - 0.5) * ch * 0.3;
      ctx.beginPath(); ctx.moveTo(cx - s * 1.2, yy); ctx.quadraticCurveTo(cx, yy - s * 0.8, cx + s * 1.2, yy); ctx.stroke();
    }
    if (id === 'induce') {
      // UV flash
      ctx.strokeStyle = `rgba(251,191,36,${0.9 - 0.6 * p})`; ctx.lineWidth = 3;
      for (let i = -1; i <= 1; i++) {
        const bx = cx + i * cw * 0.25;
        ctx.beginPath(); ctx.moveTo(bx, y0 + h * 0.06); ctx.lineTo(bx - s * 0.6, y0 + h * 0.14); ctx.lineTo(bx + s * 0.3, y0 + h * 0.14); ctx.lineTo(bx - s * 0.4, topY - s * 0.5); ctx.stroke();
      }
      ctx.fillStyle = '#fbbf24'; ctx.font = `bold ${Math.round(s * 1.6)}px system-ui, sans-serif`; ctx.textAlign = 'center';
      ctx.fillText('UV', cx, y0 + h * 0.05);
    }
    for (let i = 0; i < dnaCount; i++) {
      const col = i % 4, rw = Math.floor(i / 4);
      const dx = cx - cw * 0.3 + (col + 0.5) * cw * 0.15, dy = cy - ch * 0.25 + (rw + 0.5) * ch * 0.17;
      const assembled = id === 'assemble' ? (i < Math.round(12 * p)) : id === 'lyse';
      if (assembled) drawPhage(ctx, dx, dy - s * 0.9, s * 0.55, 0.3 * ((i % 3) - 1), true);
      else {
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(1.5, s * 0.2);
        ctx.beginPath(); ctx.moveTo(dx - s * 0.9, dy); ctx.quadraticCurveTo(dx, dy - s * 0.7, dx + s * 0.9, dy); ctx.stroke();
      }
    }
    if (id === 'lyse' && p >= 0.4) {
      const q = (p - 0.4) / 0.6;
      const b = params.drug === 'replicate' || params.drug === 'assemble' ? 0 : params.burst;
      for (let i = 0; i < fixed.length; i++) {
        const f = fixed[i];
        const r = (cw * 0.1) + q * f.r * Math.min(w, h) * 0.45;
        drawPhage(ctx, cx + Math.cos(f.a) * r * 1.3, cy + Math.sin(f.a) * r, s * 0.55, f.a + Math.PI / 2, true, 1 - q * 0.6);
      }
      ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'center';
      ctx.font = `bold ${Math.round(s * 1.5)}px system-ui, sans-serif`;
      ctx.fillText(`+${b} ${T('virions', 'virion')}`, cx, cy + ch * 0.9);
    }

    // stage header + progress bar + stage pills
    const list = stages();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.round(Math.max(12, w * 0.035))}px system-ui, sans-serif`;
    const name = STAGE_NAME[id];
    ctx.fillText(`${state.stageIdx + 1}/${list.length}  ${T(name[0], name[1])}`, x0 + w * 0.03, y0 + h * 0.08);
    ctx.fillStyle = '#94a3b8';
    ctx.font = `${Math.round(Math.max(10, w * 0.026))}px system-ui, sans-serif`;
    const d = STAGE_DESC[id];
    ctx.fillText(T(d[0], d[1]), x0 + w * 0.03, y0 + h * 0.14);
    // pills along the bottom
    const pw = (w * 0.94) / list.length, py = y0 + h * 0.86, ph = Math.max(14, h * 0.06);
    ctx.font = `${Math.round(Math.max(8, Math.min(pw * 0.14, 12)))}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    list.forEach((sid, i) => {
      const px = x0 + w * 0.03 + i * pw;
      const isCur = i === state.stageIdx, isDrug = params.drug === sid;
      ctx.fillStyle = isCur ? (isDrug ? '#ef4444' : '#8b5cf6') : 'rgba(148,163,184,0.18)';
      ctx.beginPath(); ctx.roundRect(px + 2, py, pw - 4, ph, 6); ctx.fill();
      if (isCur) {
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath(); ctx.roundRect(px + 2, py, (pw - 4) * clamp(state.progress, 0, 1), ph, 6); ctx.fill();
      }
      ctx.fillStyle = isCur ? '#fff' : '#cbd5e1';
      const lbl = T(STAGE_SHORT[sid][0], STAGE_SHORT[sid][1]);
      ctx.fillText(lbl, px + pw / 2, py + ph * 0.7);
      if (isDrug) {
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(px + pw / 2 - 6, py - 12); ctx.lineTo(px + pw / 2 + 6, py - 2); ctx.moveTo(px + pw / 2 + 6, py - 12); ctx.lineTo(px + pw / 2 - 6, py - 2); ctx.stroke();
      }
    });
    if (blocked()) {
      ctx.fillStyle = '#ef4444';
      ctx.font = `bold ${Math.round(Math.max(12, w * 0.04))}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(T('BLOCKED by antiviral', 'DIHAMBAT antivirus'), cx, y0 + h * 0.97);
      ctx.strokeStyle = 'rgba(239,68,68,0.9)'; ctx.lineWidth = Math.max(3, s * 0.4);
      ctx.beginPath(); ctx.arc(cx, cy, Math.max(cw, ch) * 0.55, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - Math.max(cw, ch) * 0.39, cy - Math.max(cw, ch) * 0.39); ctx.lineTo(cx + Math.max(cw, ch) * 0.39, cy + Math.max(cw, ch) * 0.39); ctx.stroke();
    }
    ctx.textAlign = 'left';
  }

  function drawChart(ctx, x0, y0, w, h) {
    const padL = Math.max(28, w * 0.12), padR = Math.max(30, w * 0.13), padT = h * 0.16, padB = h * 0.16;
    const gx = x0 + padL, gy = y0 + padT, gw = w - padL - padR, gh = h - padT - padB;
    ctx.fillStyle = 'rgba(148,163,184,0.06)';
    ctx.fillRect(gx, gy, gw, gh);
    const hist = state.hist;
    const tMax = Math.max(60, Math.ceil(state.t / 30) * 30);
    const vMaxLog = 6; // up to 10^6 virions
    const xOf = (t) => gx + (t / tMax) * gw;
    const yHost = (n) => gy + gh - clamp(n / K_CARRY, 0, 1) * gh;
    const yVir = (v) => gy + gh - clamp(Math.log10(Math.max(1, v)) / vMaxLog, 0, 1) * gh;
    // grid
    ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.lineWidth = 1;
    ctx.font = `${Math.round(Math.max(9, w * 0.03))}px system-ui, sans-serif`;
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i <= 3; i++) {
      const y = gy + gh - (i / 3) * gh;
      ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx + gw, y); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillStyle = '#38bdf8';
      ctx.fillText(String(Math.round((i / 3) * K_CARRY)), gx - 4, y + 4);
      ctx.textAlign = 'left'; ctx.fillStyle = '#a78bfa';
      ctx.fillText(`10${['⁰', '²', '⁴', '⁶'][i]}`, gx + gw + 4, y + 4);
    }
    ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8';
    for (let tt = 0; tt <= tMax; tt += tMax / 4) ctx.fillText(`${Math.round(tt)}`, xOf(tt), gy + gh + 14);
    ctx.fillText(T('time (min)', 'waktu (menit)'), gx + gw / 2, gy + gh + 28);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8'; ctx.fillText(T('host cells', 'sel inang'), x0 + 4, y0 + 12);
    ctx.fillStyle = '#a78bfa'; ctx.textAlign = 'right'; ctx.fillText(T('free virus (log)', 'virus bebas (log)'), x0 + w - 4, y0 + 12);
    ctx.textAlign = 'left';
    if (hist.length > 1) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#38bdf8'; ctx.beginPath();
      for (let i = 0; i < hist.length; i++) { const p = hist[i]; if (i === 0) ctx.moveTo(xOf(p.t), yHost(p.hosts)); else ctx.lineTo(xOf(p.t), yHost(p.hosts)); }
      ctx.stroke();
      ctx.strokeStyle = '#a78bfa'; ctx.beginPath();
      for (let i = 0; i < hist.length; i++) { const p = hist[i]; if (i === 0) ctx.moveTo(xOf(p.t), yVir(p.V)); else ctx.lineTo(xOf(p.t), yVir(p.V)); }
      ctx.stroke();
    }
    // readouts (wrapped onto more lines when the panel is narrow)
    const fs = Math.round(Math.max(9, Math.min(13, w * 0.034)));
    ctx.font = `${fs}px system-ui, sans-serif`;
    let infCount = 0; for (const q of state.infected) infCount += q.n;
    const narrow = w < 330;
    const lines = [
      [`t = ${state.t.toFixed(1)} min   ${T('cycles', 'siklus')}: ${state.cycles}`, '#e2e8f0'],
    ];
    if (narrow) {
      lines.push([`${T('uninfected', 'belum terinfeksi')}: ${Math.round(state.H)}   ${T('lysogens', 'lisogen')}: ${Math.round(state.Lg)}`, '#38bdf8']);
      lines.push([`${T('infected', 'terinfeksi')}: ${Math.round(infCount)}`, '#38bdf8']);
    } else {
      lines.push([`${T('uninfected', 'belum terinfeksi')}: ${Math.round(state.H)}   ${T('lysogens', 'lisogen')}: ${Math.round(state.Lg)}   ${T('infected', 'terinfeksi')}: ${Math.round(infCount)}`, '#38bdf8']);
    }
    lines.push([`${T('free virions', 'virion bebas')}: ${state.V >= 1e4 ? state.V.toExponential(2) : Math.round(state.V)}`, '#a78bfa']);
    if (narrow) {
      lines.push([`B = ${params.burst}, ${T('latent period', 'periode laten')} = ${params.latent} min`, '#94a3b8']);
    } else {
      lines.push([`${T('burst size', 'ukuran ledakan')} B = ${params.burst}, ${T('latent period', 'periode laten')} = ${params.latent} min`, '#94a3b8']);
    }
    let ly = gy + gh + 44;
    for (const [txt, col] of lines) { ctx.fillStyle = col; ctx.fillText(txt, x0 + 4, ly); ly += fs + 4; }
    if (params.drug !== 'none') {
      ctx.fillStyle = '#ef4444';
      const dn = DRUG_NAME[params.drug];
      ctx.fillText(`${T('drug', 'obat')}: ${T(dn[0], dn[1])}`, x0 + 4, ly);
      ly += fs + 4;
    }
    return ly;
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const split = W * 0.56;
    drawCellPanel(ctx, 0, 0, split, H);
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.beginPath(); ctx.moveTo(split, H * 0.04); ctx.lineTo(split, H * 0.96); ctx.stroke();
    const endY = drawChart(ctx, split + W * 0.01, 0, W - split - W * 0.02, H * 0.72);
    if (endY < H - 8) {
      // scale note only when the readouts leave room for it
      ctx.fillStyle = '#64748b';
      ctx.font = `${Math.round(Math.max(9, W * 0.016))}px system-ui, sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(T('Not to scale: T4 ≈ 200 nm, E. coli ≈ 2 µm', 'Tidak berskala: T4 ≈ 200 nm, E. coli ≈ 2 µm'), W - 8, H - 6);
      ctx.textAlign = 'left';
    }
  }

  // ---------- controls ----------
  const cycleSel = select({
    label: 'Cycle', key: 'cycle', value: params.cycle,
    options: [{ value: 'lytic', label: 'Lytic (litik)' }, { value: 'lysogenic', label: 'Lysogenic (lisogenik)' }],
    onChange: (v) => { params.cycle = v; reset(); },
  });
  const drugSel = select({
    label: 'Antiviral blocks', key: 'drug', value: params.drug,
    options: [
      { value: 'none', label: 'none' }, { value: 'attach', label: 'Attachment (entry inhibitor)' },
      { value: 'inject', label: 'Injection / uncoating' }, { value: 'replicate', label: 'Replication (nucleoside analogue)' },
      { value: 'assemble', label: 'Assembly (protease inhibitor)' }, { value: 'lyse', label: 'Lysis / release (neuraminidase inhibitor)' },
    ],
    onChange: (v) => { params.drug = v; },
  });
  const burstS = slider({ label: 'Burst size B (virions/cell)', key: 'burst', min: 10, max: 300, step: 10, value: params.burst, onInput: (v) => { params.burst = v; } });
  const latentS = slider({ label: 'Time to lysis (min)', key: 'latent', min: 10, max: 60, step: 1, value: params.latent, onInput: (v) => { params.latent = v; } });
  const speedS = slider({ label: 'Speed (sim min per s)', key: 'speed', min: 0.5, max: 10, step: 0.5, value: params.speed, format: (v) => v.toFixed(1), onInput: (v) => { params.speed = v; } });
  const autoT = toggle({ label: 'Auto play', key: 'auto', value: params.auto, onChange: (v) => { params.auto = v; } });
  const stepB = button({ label: 'Step →', primary: true, onClick: doStep });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(cycleSel.el, drugSel.el, burstS.el, latentS.el, speedS.el, row(autoT, stepB, resetB));

  const lab = labPanel({
    title: 'Phage growth lab',
    filename: 'virus-replication-data.csv',
    columns: [
      { key: 'cycle', label: 'Cycle' },
      { key: 'burst', label: 'Burst size' },
      { key: 'latent', label: 'Time to lysis (min)' },
      { key: 'drug', label: 'Antiviral blocks' },
      { key: 't', label: 't (min)', format: (v) => v.toFixed(1) },
      { key: 'cycles', label: 'Cycles done' },
      { key: 'hosts', label: 'Host cells remaining', format: (v) => v.toFixed(0) },
      { key: 'virus', label: 'Free virions', format: (v) => (v >= 1e4 ? v.toExponential(2) : v.toFixed(0)) },
    ],
    procedure: [
      'Lytic cycle, burst 100, time to lysis 25 min, no drug. Press Reset, let Auto run to t ≈ 60 min and Record.',
      'Repeat with burst 200. Record at t ≈ 60 min. How much earlier did the hosts crash?',
      'Repeat with time to lysis 50 min (burst 100). Record at t ≈ 60 min.',
      'Switch to Lysogenic, Reset, run to t ≈ 60 min and Record. Compare host cells remaining.',
      'Back to Lytic. Choose each antiviral in turn, Reset, run to t ≈ 60 min and Record. Which drug keeps the most host cells alive?',
    ],
    predict: 'If the burst size doubles, will the host population crash in half the time? Write your prediction with a reason.',
    source: () => ({
      cycle: params.cycle, burst: params.burst, latent: params.latent, drug: params.drug,
      t: state.t, cycles: state.cycles, hosts: state.H + state.Lg, virus: state.V,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  reset();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
