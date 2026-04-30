import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    m1: 1, v1: 4,
    m2: 1, v2: -2,
    e: 1.0,    // restitution coefficient
  };

  let s1 = { x: 0, v: 0, m: 1, r: 30 };
  let s2 = { x: 0, v: 0, m: 1, r: 30 };
  let collided = false;
  let initialKE = 0;

  function reset() {
    s1 = { x: 100, v: params.v1 * 30, m: params.m1, r: 20 + params.m1 * 6 };
    s2 = { x: cv.width - 100, v: params.v2 * 30, m: params.m2, r: 20 + params.m2 * 6 };
    collided = false;
    initialKE = 0.5 * (s1.m * (s1.v / 30) ** 2 + s2.m * (s2.v / 30) ** 2);
  }
  reset();

  function step(dt) {
    s1.x += s1.v * dt;
    s2.x += s2.v * dt;
    // collision
    if (s2.x - s1.x < s1.r + s2.r && !collided) {
      const e = params.e;
      const u1 = s1.v, u2 = s2.v, m1 = s1.m, m2 = s2.m;
      const v1 = (m1 * u1 + m2 * u2 + m2 * e * (u2 - u1)) / (m1 + m2);
      const v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / (m1 + m2);
      s1.v = v1;
      s2.v = v2;
      collided = true;
      // separate slightly
      s1.x -= 1; s2.x += 1;
    }
    if (s2.x - s1.x > s1.r + s2.r + 5) collided = false;
    // wall bounces (light)
    if (s1.x < s1.r) { s1.x = s1.r; s1.v = -s1.v; }
    if (s2.x > cv.width - s2.r) { s2.x = cv.width - s2.r; s2.v = -s2.v; }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // track
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.6); ctx.lineTo(W, H * 0.6);
    ctx.stroke();

    // balls
    function drawBall(s, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(s.x, H * 0.6 - s.r, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // velocity arrow
      const v = s.v;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(s.x, H * 0.6 - s.r);
      ctx.lineTo(s.x + v * 0.5, H * 0.6 - s.r);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`${s.m}kg ${(v/30).toFixed(2)}m/s`, s.x - 30, H * 0.6 + 16);
    }
    drawBall(s1, '#0ea5e9');
    drawBall(s2, '#ec4899');

    // momentum + KE
    const p = s1.m * s1.v / 30 + s2.m * s2.v / 30;
    const ke = 0.5 * (s1.m * (s1.v / 30) ** 2 + s2.m * (s2.v / 30) ** 2);
    const lost = initialKE - ke;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Total momentum: ${p.toFixed(2)} kg·m/s`, 16, 26);
    ctx.fillText(`Total KE: ${ke.toFixed(2)} J  (initial: ${initialKE.toFixed(2)} J)`, 16, 44);
    if (Math.abs(lost) > 0.01) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`KE lost to heat: ${lost.toFixed(2)} J`, 16, 62);
    } else {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Elastic — KE conserved`, 16, 62);
    }
  }

  // controls
  const m1S = slider({ label: 'm₁ (kg)', min: 0.5, max: 10, step: 0.1, value: params.m1, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m1 = v; reset(); } });
  const v1S = slider({ label: 'v₁ initial (m/s)', min: -8, max: 8, step: 0.1, value: params.v1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.v1 = v; reset(); } });
  const m2S = slider({ label: 'm₂ (kg)', min: 0.5, max: 10, step: 0.1, value: params.m2, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m2 = v; reset(); } });
  const v2S = slider({ label: 'v₂ initial (m/s)', min: -8, max: 8, step: 0.1, value: params.v2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.v2 = v; reset(); } });
  const eS = slider({ label: 'Restitution e (1=elastic, 0=stick)', min: 0, max: 1, step: 0.05, value: params.e, format: (v) => v.toFixed(2),
    onInput: (v) => { params.e = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(m1S.el, v1S.el, m2S.el, v2S.el, eS.el, row(resetB));

  // Lab — verify momentum conservation; KE conservation only when e = 1.
  function postCollisionV() {
    const { m1, m2, v1, v2, e } = params;
    const v1f = (m1 * v1 + m2 * v2 - m2 * e * (v1 - v2)) / (m1 + m2);
    const v2f = (m1 * v1 + m2 * v2 + m1 * e * (v1 - v2)) / (m1 + m2);
    return { v1f, v2f };
  }
  const lab = labPanel({
    title: '1D collisions lab — momentum & KE conservation',
    filename: 'collisions-1d-lab.csv',
    columns: [
      { key: 'm1', label: 'm₁ (kg)', format: (v) => v.toFixed(2) },
      { key: 'm2', label: 'm₂ (kg)', format: (v) => v.toFixed(2) },
      { key: 'v1', label: 'v₁ before', format: (v) => v.toFixed(2) },
      { key: 'v2', label: 'v₂ before', format: (v) => v.toFixed(2) },
      { key: 'e',  label: 'restitution e', format: (v) => v.toFixed(2) },
      { key: 'p_before', label: 'p before', format: (v) => v.toFixed(3) },
      { key: 'p_after',  label: 'p after',  format: (v) => v.toFixed(3) },
      { key: 'KE_before', label: 'KE before', format: (v) => v.toFixed(3) },
      { key: 'KE_after',  label: 'KE after',  format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Equal masses (1 kg each), v₁ = 4, v₂ = −2, e = 1 (elastic). Record.',
      'After elastic collision, equal-mass pairs swap velocities. Verify p and KE are conserved.',
      'Set e = 0 (perfectly inelastic). Both end at the same velocity. Verify p still conserved, KE not.',
      'Try a heavy ball into a stationary light one (e = 1). The light one shoots off fast.',
      'For each row, momentum (p) should match before/after; KE only when e = 1.',
    ],
    predict: 'Two equal masses, v₁ = 5, v₂ = 0, fully elastic. What are the final velocities?',
    source: () => {
      const { v1f, v2f } = postCollisionV();
      const p_before = params.m1 * params.v1 + params.m2 * params.v2;
      const p_after = params.m1 * v1f + params.m2 * v2f;
      const KE_before = 0.5 * params.m1 * params.v1 ** 2 + 0.5 * params.m2 * params.v2 ** 2;
      const KE_after = 0.5 * params.m1 * v1f ** 2 + 0.5 * params.m2 * v2f ** 2;
      return {
        m1: params.m1, m2: params.m2, v1: params.v1, v2: params.v2, e: params.e,
        p_before, p_after, KE_before, KE_after,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
