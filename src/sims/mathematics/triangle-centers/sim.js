import { createCanvas, loop } from '../../../lib/canvas.js';
import { toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    A: { x: 0.3, y: 0.7 },
    B: { x: 0.7, y: 0.7 },
    C: { x: 0.5, y: 0.25 },
    showCentroid: true,
    showCircumcenter: true,
    showIncenter: true,
    showOrthocenter: true,
    showEulerLine: true,
  };
  let drag = null;

  function w2s(p, W, H) { return { x: p.x * W, y: p.y * H }; }
  function s2w(sx, sy, W, H) { return { x: sx / W, y: sy / H }; }

  function centroid(A, B, C) { return { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 }; }
  function circumcenter(A, B, C) {
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (Math.abs(D) < 1e-9) return null;
    const ux = ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y)) / D;
    const uy = ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x)) / D;
    return { x: ux, y: uy };
  }
  function incenter(A, B, C) {
    const a = Math.hypot(B.x - C.x, B.y - C.y);
    const b = Math.hypot(A.x - C.x, A.y - C.y);
    const c = Math.hypot(A.x - B.x, A.y - B.y);
    const sum = a + b + c;
    return { x: (a * A.x + b * B.x + c * C.x) / sum, y: (a * A.y + b * B.y + c * C.y) / sum };
  }
  function orthocenter(A, B, C) {
    // Use: H = A + B + C − 2 O, where O is circumcenter, in any triangle (Euler relation)
    const O = circumcenter(A, B, C);
    if (!O) return null;
    return { x: A.x + B.x + C.x - 2 * O.x, y: A.y + B.y + C.y - 2 * O.y };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const Aa = w2s(params.A, W, H), Bb = w2s(params.B, W, H), Cc = w2s(params.C, W, H);

    // Triangle
    ctx.fillStyle = 'rgba(14,165,233,0.18)';
    ctx.beginPath();
    ctx.moveTo(Aa.x, Aa.y); ctx.lineTo(Bb.x, Bb.y); ctx.lineTo(Cc.x, Cc.y); ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Vertex labels + drag handles
    for (const [name, p] of [['A', Aa], ['B', Bb], ['C', Cc]]) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(name, p.x + 12, p.y - 8);
    }

    // Centers
    const G = centroid(params.A, params.B, params.C);
    const O = circumcenter(params.A, params.B, params.C);
    const I = incenter(params.A, params.B, params.C);
    const Hp = orthocenter(params.A, params.B, params.C);

    function drawCenter(p, color, label, show) {
      if (!show || !p) return;
      const s = w2s(p, W, H);
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(s.x, s.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(label, s.x + 8, s.y - 6);
    }
    drawCenter(G, '#10b981', 'G centroid', params.showCentroid);
    drawCenter(O, '#fbbf24', 'O circum', params.showCircumcenter);
    drawCenter(I, '#a78bfa', 'I incenter', params.showIncenter);
    drawCenter(Hp, '#ec4899', 'H ortho', params.showOrthocenter);

    // Circumcircle
    if (O && params.showCircumcenter) {
      const Os = w2s(O, W, H);
      const r = Math.hypot(Aa.x - Os.x, Aa.y - Os.y);
      ctx.strokeStyle = 'rgba(251,191,36,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(Os.x, Os.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Incircle
    if (params.showIncenter) {
      const Is = w2s(I, W, H);
      // distance from I to side AB
      const dx = Bb.x - Aa.x, dy = Bb.y - Aa.y;
      const len = Math.hypot(dx, dy);
      const r = Math.abs((Is.x - Aa.x) * (-dy / len) + (Is.y - Aa.y) * (dx / len));
      ctx.strokeStyle = 'rgba(167,139,250,0.4)';
      ctx.beginPath();
      ctx.arc(Is.x, Is.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Euler line
    if (params.showEulerLine && O && Hp) {
      const Os = w2s(O, W, H), Hs = w2s(Hp, W, H);
      const dx = Hs.x - Os.x, dy = Hs.y - Os.y;
      const len = Math.hypot(dx, dy) + 0.001;
      const nx = dx / len, ny = dy / len;
      const f = 1000;
      ctx.strokeStyle = 'rgba(251,191,36,0.6)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Os.x - nx * f, Os.y - ny * f);
      ctx.lineTo(Os.x + nx * f, Os.y + ny * f);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the red dots A, B, C', 12, H - 12);
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    for (const k of ['A', 'B', 'C']) {
      const s = w2s(params[k], cv.width, cv.height);
      if (Math.hypot(p.x - s.x, p.y - s.y) < 18) { drag = k; return; }
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    const w = s2w(p.x, p.y, cv.width, cv.height);
    params[drag] = { x: Math.max(0.05, Math.min(0.95, w.x)), y: Math.max(0.05, Math.min(0.95, w.y)) };
  });
  window.addEventListener('mouseup', () => { drag = null; });

  // controls
  const cT = toggle({ label: 'Centroid (G, green)', value: params.showCentroid, onChange: (v) => { params.showCentroid = v; } });
  const oT = toggle({ label: 'Circumcenter (O, yellow)', value: params.showCircumcenter, onChange: (v) => { params.showCircumcenter = v; } });
  const iT = toggle({ label: 'Incenter (I, purple)', value: params.showIncenter, onChange: (v) => { params.showIncenter = v; } });
  const hT = toggle({ label: 'Orthocenter (H, pink)', value: params.showOrthocenter, onChange: (v) => { params.showOrthocenter = v; } });
  const eT = toggle({ label: 'Euler line', value: params.showEulerLine, onChange: (v) => { params.showEulerLine = v; } });
  ctrlPanel.append(cT.el, oT.el, iT.el, hT.el, eT.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
