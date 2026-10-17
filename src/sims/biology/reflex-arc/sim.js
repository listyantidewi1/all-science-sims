import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const SYNAPSE_MS = 0.7;   // chemical synaptic delay
const NMJ_MS = 1.0;       // neuromuscular junction + start of muscle activation

// Real-world path lengths (m) used for the timing; drawing is schematic.
const SCENES = {
  knee: {
    name: { en: 'Knee-jerk reflex', id: 'Refleks lutut' },
    sensoryLen: 0.6, motorLen: 0.6, cordToBrain: 0.7, synapses: 1,
    stimulus: { en: 'Hammer taps the patellar tendon', id: 'Palu mengetuk tendon patela' },
    receptor: { en: 'Receptor: muscle spindle (stretch)', id: 'Reseptor: gelendong otot (regangan)' },
    effector: { en: 'Effector: quadriceps (kick)', id: 'Efektor: kuadriseps (tendangan)' },
  },
  hand: {
    name: { en: 'Hot-plate withdrawal', id: 'Tarik tangan dari pelat panas' },
    sensoryLen: 0.8, motorLen: 0.8, cordToBrain: 0.3, synapses: 2,
    stimulus: { en: 'Fingertip touches the hot plate', id: 'Ujung jari menyentuh pelat panas' },
    receptor: { en: 'Receptor: heat/pain nerve ending', id: 'Reseptor: ujung saraf panas/nyeri' },
    effector: { en: 'Effector: biceps (arm flexes)', id: 'Efektor: bisep (lengan menekuk)' },
  },
};

const C = {
  bg: '#0b1220', panel: 'rgba(255,255,255,0.05)', text: '#e5e7eb', dim: '#94a3b8',
  sensory: '#f59e0b', motor: '#22d3ee', inter: '#a78bfa', brain: '#f9a8d4', cord: '#64748b',
  skin: '#fcd9a8', ok: '#22c55e', warn: '#ef4444',
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const tr = (o) => (getLocale() === 'id' ? o.id : o.en);

  const params = { scene: 'knee', vSens: 80, vMotor: 80, brainMs: 150, slowmo: 50, showBrain: true };
  const state = {
    active: false,        // a stimulus has been fired and the sim clock is running
    simMs: 0,             // simulated time since the stimulus (ms)
    clockStop: null,      // simMs at which the stopwatch froze
    reflex: null, conscious: null,
    effectorT: null,      // simMs when the muscle was activated
    awareAt: null,        // simMs when the brain received the signal
    results: { reflex: null, conscious: null, reaction: null },
    rt: { phase: 'idle', goAt: 0, goTime: 0, result: null, early: false, msg: '' },
    labRow: 'reflex',
  };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const safe = (v) => (Number.isFinite(v) ? v : 0);

  // Effector contraction level 0..1 (sim time). Knee: a twitch; hand: stays withdrawn.
  function effectorLevel() {
    if (state.effectorT == null) return 0;
    const t = state.simMs - state.effectorT;
    if (t < 0) return 0;
    if (params.scene === 'hand') return clamp(t / 60, 0, 1);
    if (t < 40) return t / 40;
    if (t < 140) return 1;
    return clamp(1 - (t - 140) / 200, 0, 1);
  }

  // Geometry in canvas CSS px, recomputed every frame so the canvas can resize.
  function geo() {
    const W = cv.width, H = cv.height;
    const cx = W * 0.16;
    const g = { W, H, cx, brain: { x: cx, y: H * 0.12, rx: W * 0.06, ry: H * 0.095 }, cordTop: H * 0.22, cordBot: H * 0.97 };
    const lvl = effectorLevel();
    if (params.scene === 'knee') {
      g.seg = { x: cx, y: H * 0.58 };
      g.hip = { x: W * 0.33, y: H * 0.40 };
      g.knee = { x: W * 0.45, y: H * 0.60 };
      const ang = Math.PI / 2 - lvl * 0.95;
      const shin = H * 0.28;
      g.ankle = { x: g.knee.x + Math.cos(ang) * shin, y: g.knee.y + Math.sin(ang) * shin };
      g.receptor = { x: W * 0.39, y: H * 0.475 };
      g.effector = { x: W * 0.375, y: H * 0.53 };
      g.synapse = { x: cx + W * 0.012, y: H * 0.57 };
      g.motorCell = g.synapse;
      g.sensory = [g.receptor, { x: W * 0.285, y: H * 0.47 }, { x: cx + W * 0.055, y: H * 0.545 }, g.synapse];
      g.inter = null;
      g.motor = [g.motorCell, { x: cx + W * 0.055, y: H * 0.605 }, { x: W * 0.285, y: H * 0.555 }, g.effector];
      g.hammer = { x: W * 0.50, y: H * 0.635 };
    } else {
      g.seg = { x: cx, y: H * 0.36 };
      g.shoulder = { x: W * 0.33, y: H * 0.33 };
      g.elbow = { x: W * 0.41, y: H * 0.50 };
      const ang = 0.9 - lvl * 2.0;
      const fore = H * 0.19;
      g.hand = { x: g.elbow.x + Math.cos(ang) * fore, y: g.elbow.y + Math.sin(ang) * fore };
      g.plate = { x: W * 0.50, y: H * 0.70, w: W * 0.14, h: H * 0.045 };
      g.receptor = g.hand;
      g.effector = { x: W * 0.37, y: H * 0.405 };
      g.synapse = { x: cx + W * 0.012, y: H * 0.34 };
      g.motorCell = { x: cx + W * 0.012, y: H * 0.385 };
      g.sensory = [g.receptor, { x: g.elbow.x + W * 0.012, y: g.elbow.y - H * 0.03 }, { x: W * 0.34, y: H * 0.315 }, { x: cx + W * 0.055, y: H * 0.325 }, g.synapse];
      g.inter = [g.synapse, g.motorCell];
      g.motor = [g.motorCell, { x: cx + W * 0.055, y: H * 0.40 }, { x: W * 0.33, y: H * 0.36 }, g.effector];
    }
    const brainIn = { x: cx, y: g.brain.y + g.brain.ry * 0.4 };
    g.brainIn = brainIn;
    g.ascend = [g.synapse, { x: cx, y: g.seg.y - H * 0.03 }, { x: cx, y: g.cordTop }, brainIn];
    g.descend = [brainIn, { x: cx, y: g.cordTop }, { x: cx, y: g.seg.y + H * 0.03 }, g.motorCell];
    return g;
  }

  function alongPath(pts, f) {
    let total = 0; const segs = [];
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); segs.push(d); total += d; }
    if (!(total > 0)) return pts[0];
    let target = clamp(f, 0, 1) * total;
    for (let i = 0; i < segs.length; i++) {
      if (target <= segs[i] || i === segs.length - 1) {
        const u = segs[i] > 0 ? clamp(target / segs[i], 0, 1) : 0;
        return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * u, y: pts[i].y + (pts[i + 1].y - pts[i].y) * u };
      }
      target -= segs[i];
    }
    return pts[pts.length - 1];
  }

  // Build the timed stage list for one pulse. Speeds are frozen at firing time.
  function buildStages(viaBrain) {
    const sc = SCENES[params.scene];
    const vs = Math.max(0.1, params.vSens), vm = Math.max(0.1, params.vMotor);
    const sMs = sc.sensoryLen / vs * 1000, mMs = sc.motorLen / vm * 1000;
    const upMs = sc.cordToBrain / vs * 1000, downMs = sc.cordToBrain / vm * 1000;
    const st = [];
    st.push({ kind: 'travel', path: 'sensory', dur: sMs, label: ['Sensory neuron', 'Neuron sensorik'], color: C.sensory, d: sc.sensoryLen, v: vs });
    if (viaBrain) {
      st.push({ kind: 'wait', at: 'synapse', dur: SYNAPSE_MS, label: ['Synapse (relay)', 'Sinapsis (relai)'], color: C.inter });
      st.push({ kind: 'travel', path: 'ascend', dur: upMs, label: ['Up the spinal cord', 'Naik sumsum tulang belakang'], color: C.inter, d: sc.cordToBrain, v: vs });
      st.push({ kind: 'wait', at: 'brainIn', dur: params.brainMs, label: ['Brain processing', 'Pemrosesan otak'], color: C.brain, aware: true });
      st.push({ kind: 'travel', path: 'descend', dur: downMs, label: ['Down the spinal cord', 'Turun sumsum tulang belakang'], color: C.inter, d: sc.cordToBrain, v: vm });
      st.push({ kind: 'wait', at: 'motorCell', dur: SYNAPSE_MS, label: ['Synapse on motor neuron', 'Sinapsis ke neuron motorik'], color: C.inter });
    } else if (sc.synapses === 1) {
      st.push({ kind: 'wait', at: 'synapse', dur: SYNAPSE_MS, label: ['Synapse', 'Sinapsis'], color: C.inter });
    } else {
      st.push({ kind: 'wait', at: 'synapse', dur: SYNAPSE_MS, label: ['Synapse 1', 'Sinapsis 1'], color: C.inter });
      st.push({ kind: 'travel', path: 'inter', dur: 0.3, label: ['Interneuron', 'Interneuron'], color: C.inter });
      st.push({ kind: 'wait', at: 'motorCell', dur: SYNAPSE_MS, label: ['Synapse 2', 'Sinapsis 2'], color: C.inter });
    }
    st.push({ kind: 'travel', path: 'motor', dur: mMs, label: ['Motor neuron', 'Neuron motorik'], color: C.motor, d: sc.motorLen, v: vm });
    st.push({ kind: 'wait', at: 'effector', dur: NMJ_MS, label: ['Neuromuscular junction', 'Sambungan neuromuskular'], color: C.ok });
    let t = 0; let awareAt = null;
    for (const s of st) { s.start = t; t += s.dur; if (s.aware) awareAt = s.start; }
    const dist = st.reduce((a, s) => a + (s.d || 0), 0);
    return { stages: st, total: t, done: false, awareAt, dist, synapses: st.filter((s) => s.kind === 'wait' && s.color === C.inter).length };
  }

  function pulsePos(p, g) {
    const t = state.simMs;
    for (const s of p.stages) {
      if (t >= s.start && t < s.start + s.dur) {
        if (s.kind === 'travel') return { ...alongPath(g[s.path], safe((t - s.start) / s.dur)), stage: s };
        return { ...g[s.at], stage: s, waiting: true };
      }
    }
    return null;
  }

  function reset() {
    state.active = false; state.simMs = 0; state.clockStop = null;
    state.reflex = null; state.conscious = null; state.effectorT = null; state.awareAt = null;
    state.results.reflex = null; state.results.conscious = null;
  }
  function fire() {
    reset();
    state.active = true;
    state.reflex = buildStages(false);
    state.conscious = params.showBrain ? buildStages(true) : null;
  }

  function step(dt) {
    if (state.active) {
      state.simMs += dt * 1000 / Math.max(1, params.slowmo);
      const r = state.reflex, c = state.conscious, sc = SCENES[params.scene];
      if (r && !r.done && state.simMs >= r.total) {
        r.done = true; state.effectorT = r.total;
        state.results.reflex = { pathway: 'Reflex arc', scene: tr(sc.name), dist: r.dist, vs: params.vSens, vm: params.vMotor, syn: r.synapses, time: r.total };
      }
      if (c) {
        if (state.awareAt == null && state.simMs >= c.awareAt) state.awareAt = c.awareAt;
        if (!c.done && state.simMs >= c.total) {
          c.done = true;
          state.results.conscious = { pathway: 'Via brain (conscious)', scene: tr(sc.name), dist: c.dist, vs: params.vSens, vm: params.vMotor, syn: c.synapses, time: c.total };
        }
      }
      if (state.clockStop == null && r && r.done && (!c || c.done)) state.clockStop = c ? c.total : r.total;
    }
    // Reaction-time test runs in real time.
    const rt = state.rt;
    if (rt.phase === 'waiting' && now >= rt.goAt) { rt.phase = 'go'; rt.goTime = now; }
    if (rt.phase === 'go' && now - rt.goTime > 3) { rt.phase = 'idle'; rt.msg = T('Too slow! Try again.', 'Terlalu lambat! Coba lagi.'); }
  }

  function react() {
    const rt = state.rt;
    if (rt.phase === 'go') {
      rt.result = (now - rt.goTime) * 1000; rt.phase = 'done'; rt.msg = '';
      state.results.reaction = { pathway: 'Reaction test (you)', scene: '-', dist: null, vs: null, vm: null, syn: null, time: rt.result };
    } else if (rt.phase === 'waiting') {
      rt.phase = 'idle'; rt.early = true; rt.msg = T('Too early! Wait for green.', 'Terlalu cepat! Tunggu hijau.');
    }
  }
  function startTest() {
    const rt = state.rt;
    rt.phase = 'waiting'; rt.goAt = now + 1 + Math.random() * 2.5; rt.msg = ''; rt.early = false;
  }

  // ---------- drawing ----------
  function font(px, bold) { return `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`; }
  function mono(px, bold) { return `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px ui-monospace, SFMono-Regular, Menlo, monospace`; }
  function poly(ctx, pts, color, w, dash) {
    ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.setLineDash(dash || []);
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
    ctx.setLineDash([]);
  }
  function dot(ctx, p, r, color, glow) {
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = r * 2.5; }
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  }
  function limb(ctx, a, b, w) {
    ctx.strokeStyle = C.skin; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }

  function drawScene(ctx, g) {
    const { W, H, cx } = g;
    const fs = clamp(W * 0.015, 9, 14);
    // Brain and spinal cord
    ctx.fillStyle = C.cord;
    ctx.beginPath(); ctx.roundRect(cx - W * 0.012, g.cordTop, W * 0.024, g.cordBot - g.cordTop, 6); ctx.fill();
    ctx.fillStyle = C.brain;
    ctx.beginPath(); ctx.ellipse(g.brain.x, g.brain.y, g.brain.rx, g.brain.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1.5;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath(); ctx.moveTo(g.brain.x + i * g.brain.rx * 0.35, g.brain.y - g.brain.ry * 0.7);
      ctx.quadraticCurveTo(g.brain.x + i * g.brain.rx * 0.5, g.brain.y, g.brain.x + i * g.brain.rx * 0.3, g.brain.y + g.brain.ry * 0.7); ctx.stroke();
    }
    if (state.awareAt != null) { ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(g.brain.x, g.brain.y, g.brain.rx + 4, g.brain.ry + 4, 0, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = C.text; ctx.font = font(fs, true); ctx.textAlign = 'center';
    ctx.fillText(T('Brain', 'Otak'), g.brain.x, g.brain.y - g.brain.ry - 6);
    ctx.save(); ctx.translate(cx - W * 0.022, (g.cordTop + g.cordBot) / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = C.dim; ctx.font = font(fs); ctx.fillText(T('Spinal cord', 'Sumsum tulang belakang'), 0, 0); ctx.restore();
    // Segment cross-section with grey matter
    const sx = g.seg.x, sy = g.seg.y, rx = W * 0.045, ry = H * 0.06;
    ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(sx, sy, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#7c8ba1';
    ctx.beginPath(); ctx.ellipse(sx - rx * 0.35, sy - ry * 0.3, rx * 0.25, ry * 0.35, 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(sx + rx * 0.35, sy - ry * 0.3, rx * 0.25, ry * 0.35, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(sx - rx * 0.35, sy + ry * 0.35, rx * 0.3, ry * 0.38, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(sx + rx * 0.35, sy + ry * 0.35, rx * 0.3, ry * 0.38, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(sx - rx * 0.4, sy - ry * 0.25, rx * 0.8, ry * 0.5);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    ctx.fillText(T('dorsal root', 'akar dorsal'), sx + rx + 4, sy - ry * 0.55);
    ctx.fillText(T('ventral root', 'akar ventral'), sx + rx + 4, sy + ry * 0.9);

    // Body part
    const sc = SCENES[params.scene];
    if (params.scene === 'knee') {
      limb(ctx, g.hip, g.knee, W * 0.05);
      limb(ctx, g.knee, g.ankle, W * 0.04);
      const foot = { x: g.ankle.x + (g.ankle.x - g.knee.x) * 0.0 + W * 0.04 * Math.cos(Math.atan2(g.ankle.y - g.knee.y, g.ankle.x - g.knee.x) - Math.PI / 2), y: g.ankle.y + W * 0.04 * Math.sin(Math.atan2(g.ankle.y - g.knee.y, g.ankle.x - g.knee.x) - Math.PI / 2) };
      limb(ctx, g.ankle, foot, W * 0.03);
      // hammer
      const swing = state.active && state.simMs < 12 ? 1 - state.simMs / 12 : (state.active ? 0 : 0.6);
      const hx = g.hammer.x + swing * W * 0.05, hy = g.hammer.y + swing * H * 0.08;
      ctx.strokeStyle = '#a16207'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + W * 0.05, hy + H * 0.09); ctx.stroke();
      ctx.fillStyle = '#374151'; ctx.save(); ctx.translate(hx, hy); ctx.rotate(-0.5); ctx.fillRect(-W * 0.012, -H * 0.03, W * 0.024, H * 0.06); ctx.restore();
    } else {
      // hot plate
      ctx.fillStyle = '#7f1d1d'; ctx.fillRect(g.plate.x - g.plate.w / 2, g.plate.y, g.plate.w, g.plate.h);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(g.plate.x - g.plate.w / 2 + 3, g.plate.y + 3, g.plate.w - 6, g.plate.h * 0.4);
      ctx.strokeStyle = 'rgba(248,113,113,0.7)'; ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i++) {
        const x = g.plate.x + i * g.plate.w * 0.28, wob = Math.sin(now * 4 + i) * 3;
        ctx.beginPath(); ctx.moveTo(x, g.plate.y - 4); ctx.quadraticCurveTo(x + 5 + wob, g.plate.y - H * 0.03, x, g.plate.y - H * 0.055); ctx.stroke();
      }
      limb(ctx, g.shoulder, g.elbow, W * 0.045);
      limb(ctx, g.elbow, g.hand, W * 0.035);
      dot(ctx, g.hand, W * 0.02, C.skin, false);
    }
    // Neurons
    if (params.showBrain) { poly(ctx, g.ascend, 'rgba(167,139,250,0.55)', 3, [6, 5]); }
    poly(ctx, g.sensory, C.sensory, 3.5);
    if (g.inter) poly(ctx, g.inter, C.inter, 3.5);
    poly(ctx, g.motor, C.motor, 3.5);
    // cell bodies
    dot(ctx, g.sensory[g.sensory.length - 2], 6, C.sensory, false);
    dot(ctx, g.motorCell, 6, C.motor, false);
    if (g.inter) dot(ctx, g.synapse, 5, C.inter, false);
    // receptor and effector markers
    ctx.strokeStyle = C.sensory; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.receptor.x, g.receptor.y, 9, 0, Math.PI * 2); ctx.stroke();
    const lvl = effectorLevel();
    ctx.fillStyle = `rgba(34,197,94,${0.25 + 0.6 * lvl})`;
    ctx.beginPath(); ctx.ellipse(g.effector.x, g.effector.y, W * 0.03 * (1 - 0.25 * lvl), H * 0.03 * (1 + 0.4 * lvl), params.scene === 'knee' ? 1.0 : 1.1, 0, Math.PI * 2); ctx.fill();
    ctx.font = font(fs); ctx.textAlign = 'left'; ctx.fillStyle = C.sensory;
    ctx.fillText(tr(sc.receptor), W * 0.30, H * 0.94);
    ctx.fillStyle = C.motor; ctx.fillText(tr(sc.effector), W * 0.30, H * 0.94 + fs * 1.4);
    ctx.fillStyle = C.dim; ctx.fillText(tr(sc.stimulus), W * 0.30, H * 0.94 - fs * 1.4);
    // Legend
    const lx = W * 0.30, ly = H * 0.06;
    [[C.sensory, T('sensory', 'sensorik')], [C.inter, T('interneuron / to brain', 'interneuron / ke otak')], [C.motor, T('motor', 'motorik')]].forEach(([col, lab], i) => {
      ctx.fillStyle = col; ctx.fillRect(lx, ly + i * fs * 1.5 - fs * 0.6, fs * 1.6, fs * 0.5);
      ctx.fillStyle = C.dim; ctx.fillText(lab, lx + fs * 2.1, ly + i * fs * 1.5);
    });

    // Pulses
    if (state.active) {
      const pr = state.reflex && pulsePos(state.reflex, g);
      if (pr) {
        const r = pr.waiting ? 7 + 3 * Math.sin(now * 12) : 7;
        dot(ctx, pr, r, '#fff7ed', true);
        ctx.fillStyle = C.text; ctx.font = font(fs); ctx.textAlign = 'left';
        ctx.fillText(T(...pr.stage.label), pr.x + 12, pr.y - 10);
      }
      const pc = state.conscious && pulsePos(state.conscious, g);
      if (pc) {
        const r = pc.waiting ? 6 + 2 * Math.sin(now * 8) : 6;
        dot(ctx, pc, r, C.inter, true);
        if (pc.stage.aware) {
          ctx.fillStyle = C.text; ctx.font = font(fs); ctx.textAlign = 'left';
          ctx.fillText(T(...pc.stage.label) + ` ${Math.round(state.simMs - pc.stage.start)}/${Math.round(pc.stage.dur)} ms`, g.brain.x + g.brain.rx + 8, g.brain.y);
        }
      }
      if (state.conscious && state.conscious.done) {
        ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 1.3, true); ctx.textAlign = 'left';
        ctx.fillText(T('"Ouch!" (felt)', '"Aduh!" (terasa)'), g.brain.x + g.brain.rx + 8, g.brain.y + fs * 0.5);
      }
    }
    ctx.textAlign = 'left';
  }

  function drawPanel(ctx, g) {
    const { W, H } = g;
    const x0 = W * 0.60, pw = W * 0.38, fs = clamp(W * 0.015, 9, 14);
    ctx.fillStyle = C.panel; ctx.beginPath(); ctx.roundRect(x0, H * 0.03, pw, H * 0.94, 10); ctx.fill();
    let y = H * 0.03 + fs * 1.8;
    const px = x0 + fs;
    // Stopwatch
    ctx.fillStyle = C.dim; ctx.font = font(fs); ctx.textAlign = 'left';
    ctx.fillText(T('Stopwatch (since stimulus)', 'Stopwatch (sejak rangsangan)'), px, y);
    y += fs * 2.4;
    const shown = state.clockStop != null ? state.clockStop : state.simMs;
    ctx.fillStyle = C.text; ctx.font = mono(fs * 2.4, true);
    ctx.fillText(state.active ? `${shown.toFixed(1)} ms` : '--.- ms', px, y);
    ctx.font = font(fs * 0.9); ctx.fillStyle = C.dim;
    ctx.fillText(T(`slow motion ×${params.slowmo}`, `gerak lambat ×${params.slowmo}`), px, y + fs * 1.3);
    y += fs * 3.2;
    // Bars: reflex vs conscious
    const r = state.reflex, c = state.conscious;
    const maxT = Math.max(1, r ? r.total : 1, c ? c.total : 1);
    const barW = pw - fs * 2;
    const bar = (label, pulse, color) => {
      ctx.fillStyle = C.dim; ctx.font = font(fs); ctx.fillText(label, px, y);
      const res = pulse ? (pulse.done ? pulse.total : Math.min(state.simMs, pulse.total)) : 0;
      ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(px, y + fs * 0.4, barW, fs * 0.9);
      if (pulse) {
        ctx.fillStyle = color; ctx.fillRect(px, y + fs * 0.4, barW * safe(res / maxT), fs * 0.9);
        ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.strokeRect(px, y + fs * 0.4, barW * safe(pulse.total / maxT), fs * 0.9);
        ctx.fillStyle = C.text; ctx.textAlign = 'right';
        ctx.fillText(pulse.done ? `${pulse.total.toFixed(1)} ms` : `${res.toFixed(1)} / ${pulse.total.toFixed(1)} ms`, px + barW, y);
        ctx.textAlign = 'left';
      }
      y += fs * 2.4;
    };
    bar(T('Reflex arc (spinal cord)', 'Lengkung refleks (sumsum)'), r, C.ok);
    bar(T('Conscious route (via brain)', 'Jalur sadar (lewat otak)'), c, C.inter);
    if (r && c && r.done && c.done) {
      ctx.fillStyle = '#fde68a'; ctx.font = font(fs, true);
      ctx.fillText(T(`Conscious route is ${(c.total / Math.max(0.1, r.total)).toFixed(1)}× slower`, `Jalur sadar ${(c.total / Math.max(0.1, r.total)).toFixed(1)}× lebih lambat`), px, y);
      y += fs * 1.8;
    }
    // Stage breakdown of the reflex
    ctx.fillStyle = C.dim; ctx.font = font(fs); ctx.fillText(T('Reflex time budget', 'Rincian waktu refleks'), px, y); y += fs * 1.4;
    const sc = SCENES[params.scene];
    const stages = r ? r.stages : buildStages(false).stages;
    ctx.font = mono(fs * 0.9);
    for (const s of stages) {
      ctx.fillStyle = s.color; ctx.fillRect(px, y - fs * 0.7, fs * 0.6, fs * 0.6);
      ctx.fillStyle = C.text;
      const detail = s.kind === 'travel' && s.d ? `${s.d} m / ${s.v} m/s` : '';
      ctx.fillText(T(...s.label), px + fs, y);
      ctx.textAlign = 'right'; ctx.fillText(`${detail}  ${s.dur.toFixed(1)} ms`, px + barW, y); ctx.textAlign = 'left';
      y += fs * 1.3;
    }
    ctx.fillStyle = C.text; ctx.font = mono(fs * 0.95, true);
    ctx.fillText(T('Total', 'Total'), px + fs, y); ctx.textAlign = 'right';
    ctx.fillText(`${stages.reduce((a, s) => a + s.dur, 0).toFixed(1)} ms`, px + barW, y); ctx.textAlign = 'left';
    y += fs * 2.2;
    // Reaction test
    const rt = state.rt;
    ctx.fillStyle = C.dim; ctx.font = font(fs); ctx.fillText(T('Reaction-time test (you)', 'Tes waktu reaksi (kamu)'), px, y); y += fs * 0.6;
    const boxH = Math.max(fs * 3.5, H * 0.97 - y - fs * 0.5);
    const col = rt.phase === 'go' ? C.ok : rt.phase === 'waiting' ? C.warn : 'rgba(255,255,255,0.12)';
    ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(px, y, barW, boxH, 8); ctx.fill();
    ctx.fillStyle = rt.phase === 'idle' || rt.phase === 'done' ? C.text : '#0b1220'; ctx.font = font(fs * 1.1, true); ctx.textAlign = 'center';
    const cy = y + boxH / 2;
    if (rt.phase === 'waiting') ctx.fillText(T('Wait for green…', 'Tunggu hijau…'), px + barW / 2, cy);
    else if (rt.phase === 'go') ctx.fillText(T('GO! Click here or press React!', 'MULAI! Klik di sini atau tekan Reaksi!'), px + barW / 2, cy);
    else if (rt.phase === 'done') {
      ctx.fillText(`${Math.round(rt.result)} ms`, px + barW / 2, cy - fs * 0.3);
      ctx.font = font(fs * 0.9); ctx.fillStyle = C.dim;
      ctx.fillText(T('typical: 200–250 ms', 'tipikal: 200–250 ms'), px + barW / 2, cy + fs * 1.1);
    } else {
      ctx.font = font(fs); ctx.fillText(rt.msg || T('Press "Start reaction test"', 'Tekan "Mulai tes reaksi"'), px + barW / 2, cy);
    }
    ctx.textAlign = 'left';
    state.rtBox = { x: px, y, w: barW, h: boxH };
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const g = geo();
    drawScene(ctx, g);
    drawPanel(ctx, g);
  }

  // Pointer: clicking anywhere on the canvas counts as a reaction when the light is green.
  cv.canvas.style.touchAction = 'none';
  const onDown = () => { if (state.rt.phase === 'go' || state.rt.phase === 'waiting') react(); };
  cv.canvas.addEventListener('pointerdown', onDown);

  // ---------- controls ----------
  const sceneSel = select({
    label: 'Scene', key: 'scene', value: 'knee',
    options: [{ value: 'knee', label: 'Knee-jerk (hammer tap)' }, { value: 'hand', label: 'Hot plate (hand withdrawal)' }],
    onChange: (v) => { params.scene = v; reset(); },
  });
  const vsS = slider({ label: 'Sensory neuron speed (m/s)', key: 'vs', min: 1, max: 120, step: 1, value: params.vSens, onInput: (v) => { params.vSens = v; } });
  const vmS = slider({ label: 'Motor neuron speed (m/s)', key: 'vm', min: 1, max: 120, step: 1, value: params.vMotor, onInput: (v) => { params.vMotor = v; } });
  const myel = button({ label: 'Myelinated (80 m/s)', onClick: () => { vsS.apply(80); vmS.apply(80); } });
  const unmyel = button({ label: 'Unmyelinated (2 m/s)', onClick: () => { vsS.apply(2); vmS.apply(2); } });
  const brainS = slider({ label: 'Brain processing (ms)', key: 'brain', min: 50, max: 400, step: 10, value: params.brainMs, onInput: (v) => { params.brainMs = v; } });
  const slowS = slider({ label: 'Slow motion (×)', key: 'slowmo', min: 1, max: 200, step: 1, value: params.slowmo, onInput: (v) => { params.slowmo = v; } });
  const brainT = toggle({ label: 'Show conscious route via brain', key: 'via-brain', value: true, onChange: (v) => { params.showBrain = v; if (state.active && !v) { state.conscious = null; if (state.reflex && state.reflex.done) state.clockStop = state.reflex.total; } } });
  const fireB = button({ label: 'Stimulus!', primary: true, onClick: fire });
  const resetB = button({ label: 'Reset', onClick: reset });
  const startRT = button({ label: 'Start reaction test', onClick: startTest });
  const reactB = button({ label: 'React!', onClick: react });
  const labSel = select({
    label: 'Lab row to record', key: 'lab-row', value: 'reflex',
    options: [{ value: 'reflex', label: 'Reflex arc result' }, { value: 'conscious', label: 'Conscious route result' }, { value: 'reaction', label: 'Reaction test result' }],
    onChange: (v) => { state.labRow = v; },
  });
  ctrlPanel.append(sceneSel.el, row(fireB, resetB), vsS.el, vmS.el, row(myel, unmyel), brainS.el, slowS.el, brainT.el, row(startRT, reactB), labSel.el);

  const lab = labPanel({
    title: 'Reflex lab — pathway, distance, speed, time',
    filename: 'reflex-arc-data.csv',
    columns: [
      { key: 'pathway', label: 'Pathway' },
      { key: 'scene', label: 'Scene' },
      { key: 'dist', label: 'Distance (m)', format: (v) => v.toFixed(1) },
      { key: 'vs', label: 'v sensory (m/s)' },
      { key: 'vm', label: 'v motor (m/s)' },
      { key: 'syn', label: 'Synapses' },
      { key: 'time', label: 'Time (ms)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Knee-jerk scene, both speeds 80 m/s. Press Stimulus, wait for the muscle to twitch, record the Reflex arc row.',
      'Switch "Lab row" to Conscious route; wait for "Ouch!" and record.',
      'Press Unmyelinated (2 m/s), fire again and record the reflex. Check: time = distance / speed × 1000 + synaptic delays.',
      'Set sensory 20 m/s and motor 80 m/s (pain fibres are slower). Record and compare.',
      'Switch to the hot-plate scene and record the reflex. How much does the extra synapse add?',
      'Run the reaction test 5 times; record your best. Compare it with the conscious-route time.',
    ],
    predict: 'How many times longer will the conscious route be than the reflex arc? Will halving the conduction speed double the reflex time exactly? Why or why not?',
    source: () => state.results[state.labRow] || null,
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
