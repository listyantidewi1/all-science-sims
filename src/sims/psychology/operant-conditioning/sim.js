import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const SCHEDULES = {
  FR: 'Fixed ratio (FR)',
  VR: 'Variable ratio (VR)',
  FI: 'Fixed interval (FI)',
  VI: 'Variable interval (VI)',
};
const WINDOW = 60; // seconds of record shown

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { schedule: 'FR', ratio: 10, interval: 10, subject: true, speed: 2 };
  const state = {
    t: 0,              // simulated seconds
    count: 0,          // presses since last reinforcer
    sinceReinf: 0,     // seconds since last reinforcer
    required: 10,      // VR target
    intervalReq: 10,   // VI target
    cum: 0,
    reinforcers: 0,
    events: [],        // { t, cum, r }
    lever: 0, pellet: 0, light: 0,
    ratX: 0.6,         // 0 = at lever, 1 = far wall
  };

  const isRatio = () => params.schedule === 'FR' || params.schedule === 'VR';
  const paramValue = () => (isRatio() ? params.ratio : params.interval);
  const newVR = () => Math.max(1, Math.round(1 + (params.ratio - 1) * 2 * Math.random()));
  const newVI = () => Math.max(0.5, -Math.log(1 - Math.random()) * params.interval);

  function resetSchedule() {
    state.count = 0;
    state.sinceReinf = 0;
    state.required = newVR();
    state.intervalReq = newVI();
  }

  function reinforce() {
    state.reinforcers++;
    state.count = 0;
    state.sinceReinf = 0;
    state.required = newVR();
    state.intervalReq = newVI();
    state.pellet = 1;
    state.light = 1;
  }

  function press() {
    state.count++;
    state.cum++;
    state.lever = 1;
    let r = false;
    switch (params.schedule) {
      case 'FR': r = state.count >= params.ratio; break;
      case 'VR': r = state.count >= state.required; break;
      case 'FI': r = state.sinceReinf >= params.interval; break;
      case 'VI': r = state.sinceReinf >= state.intervalReq; break;
    }
    if (r) reinforce();
    state.events.push({ t: state.t, cum: state.cum, r });
    if (state.events.length > 4000) state.events.splice(0, 1000);
  }

  // Simulated rat: response rate (per second) as a function of the schedule.
  function ratRate() {
    const s = state.sinceReinf;
    switch (params.schedule) {
      case 'FR': return s < 0.12 * params.ratio ? 0.05 : 4;             // pause, then run
      case 'VR': return s < 0.3 ? 0.3 : 4;                               // steady, high
      case 'FI': { const u = Math.min(1, s / params.interval); return 0.05 + 3.5 * u * u * u; } // scallop
      case 'VI': return 1.5;                                             // steady, moderate
    }
    return 0;
  }

  function step(dt) {
    const sdt = dt * params.speed;
    state.t += sdt;
    state.sinceReinf += sdt;
    if (params.subject && Math.random() < ratRate() * sdt) press();
    state.lever = Math.max(0, state.lever - dt * 6);
    state.pellet = Math.max(0, state.pellet - dt * 1.2);
    state.light = Math.max(0, state.light - dt * 2);
    const target = state.pellet > 0.3 ? 0.35 : (ratRate() > 1 || state.lever > 0 ? 0.08 : 0.7);
    state.ratX += (target - state.ratX) * Math.min(1, dt * 4);
  }

  function responsesPerMinute() {
    const from = state.t - 60;
    const n = state.events.filter((e) => e.t >= from).length;
    const span = Math.min(60, state.t);
    return span > 1 ? (n * 60) / span : 0;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    drawBox(ctx, 20, 20, W * 0.42 - 30, H - 40);
    drawRecord(ctx, W * 0.42 + 50, 40, W * 0.58 - 80, H - 100);
  }

  function drawBox(ctx, x, y, w, h) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
    ctx.lineWidth = 1;
    const floorY = y + h - 30;
    ctx.fillStyle = '#334155';
    ctx.fillRect(x, floorY, w, 30);
    // Light
    ctx.fillStyle = state.light > 0 ? `rgba(251,191,36,${0.3 + 0.7 * state.light})` : '#475569';
    ctx.beginPath(); ctx.arc(x + w - 30, y + 30, 10, 0, Math.PI * 2); ctx.fill();
    // Lever
    const lx = x + 10, ly = y + h * 0.5;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + 48, ly + state.lever * 14);
    ctx.stroke();
    ctx.lineWidth = 1;
    // Food cup + pellet
    ctx.fillStyle = '#64748b';
    ctx.fillRect(lx, floorY - 22, 36, 22);
    if (state.pellet > 0) {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(lx + 18, floorY - 10, 6, 0, Math.PI * 2); ctx.fill();
    }
    // Rat
    const rx = x + 70 + state.ratX * (w - 150), ry = floorY - 22;
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.ellipse(rx, ry, 36, 20, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rx - 36, ry - 4, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f9a8d4';
    ctx.beginPath(); ctx.arc(rx - 40, ry - 16, 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rx - 28, ry - 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.beginPath(); ctx.arc(rx - 44, ry - 6, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f9a8d4';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(rx + 34, ry); ctx.quadraticCurveTo(rx + 60, ry - 10, rx + 70, ry + 10); ctx.stroke();
    ctx.lineWidth = 1;
    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + 8, 250, 66);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillText(`${params.schedule} ${paramValue()}${isRatio() ? '' : ' s'}`, x + 16, y + 28);
    ctx.fillStyle = '#fff';
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillText(`responses: ${state.cum}   reinforcers: ${state.reinforcers}`, x + 16, y + 46);
    ctx.fillText(`rate: ${responsesPerMinute().toFixed(0)} / min   t = ${state.t.toFixed(0)} s`, x + 16, y + 64);
  }

  function drawRecord(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('Cumulative record (last 60 s) — slope = response rate, ticks = reinforcers', x, y - 8);
    const t0 = Math.max(0, state.t - WINDOW);
    let base = 0;
    for (const e of state.events) { if (e.t < t0) base = e.cum; else break; }
    const yMax = Math.max(base + 30, state.cum);
    const x2 = (t) => x + ((t - t0) / WINDOW) * w;
    const y2 = (c) => y + h - ((c - base) / (yMax - base)) * (h - 10);
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    for (let i = 0; i <= 6; i++) {
      const t = t0 + (i / 6) * WINDOW;
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x2(t), y); ctx.lineTo(x2(t), y + h); ctx.stroke();
      ctx.fillText(`${t.toFixed(0)}s`, x2(t) - 10, y + h + 14);
    }
    ctx.fillText(`${yMax}`, x - 30, y + 12);
    ctx.fillText(`${base}`, x - 30, y + h);
    // Step line
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let prevC = base;
    ctx.moveTo(x2(t0), y2(base));
    for (const e of state.events) {
      if (e.t < t0) continue;
      ctx.lineTo(x2(e.t), y2(prevC));
      ctx.lineTo(x2(e.t), y2(e.cum));
      prevC = e.cum;
    }
    ctx.lineTo(x2(state.t), y2(prevC));
    ctx.stroke();
    ctx.lineWidth = 1;
    // Reinforcer ticks
    ctx.strokeStyle = '#fbbf24';
    for (const e of state.events) {
      if (e.t < t0 || !e.r) continue;
      ctx.beginPath(); ctx.moveTo(x2(e.t), y2(e.cum)); ctx.lineTo(x2(e.t) + 6, y2(e.cum) + 10); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px system-ui, sans-serif';
    const hint = { FR: 'pause after food, then a run', VR: 'steady high rate, no pauses', FI: 'scallop: slow after food, fast before', VI: 'steady moderate rate' };
    ctx.fillText(`Expected ${params.schedule} pattern: ${hint[params.schedule]}`, x, y + h + 32);
  }

  // Controls
  const schedSel = select({
    label: 'Schedule',
    options: Object.entries(SCHEDULES).map(([value, label]) => ({ value, label })),
    value: params.schedule,
    onChange: (v) => { params.schedule = v; resetSchedule(); },
  });
  const ratioS = slider({ label: 'Ratio (presses per reinforcer)', min: 1, max: 30, step: 1, value: params.ratio,
    onInput: (v) => { params.ratio = v; state.required = newVR(); } });
  const intS = slider({ label: 'Interval (s)', min: 1, max: 30, step: 1, value: params.interval,
    onInput: (v) => { params.interval = v; state.intervalReq = newVI(); } });
  const speedS = slider({ label: 'Time speed', min: 1, max: 8, step: 1, value: params.speed, format: (v) => `${v}×`,
    onInput: (v) => { params.speed = v; } });
  const subjT = toggle({ label: 'Simulated rat', value: params.subject, onChange: (v) => { params.subject = v; } });
  const pressB = button({ label: 'Press lever', primary: true, onClick: press });
  const resetB = button({ label: 'Reset record', onClick: () => {
    state.t = 0; state.cum = 0; state.reinforcers = 0; state.events = []; resetSchedule();
  } });
  ctrlPanel.append(schedSel.el, ratioS.el, intS.el, speedS.el, row(pressB, subjT, resetB));

  const lab = labPanel({
    title: 'Reinforcement schedule lab',
    filename: 'operant-conditioning-lab.csv',
    columns: [
      { key: 'schedule', label: 'schedule' },
      { key: 'param',    label: 'parameter' },
      { key: 'rpm',      label: 'responses / min', format: (v) => v.toFixed(0) },
      { key: 'reinf',    label: 'reinforcers' },
    ],
    procedure: [
      'Pick FR 10, reset the record, let the rat work for 60 s, record.',
      'Repeat for VR 10, FI 10 s and VI 10 s. Which gives the highest rate?',
      'Double the parameter on FR and FI. How does the pause or scallop change?',
    ],
    predict: 'Which schedule will produce the most presses per minute? Which produces pauses?',
    source: () => ({ schedule: params.schedule, param: paramValue(), rpm: responsesPerMinute(), reinf: state.reinforcers }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
