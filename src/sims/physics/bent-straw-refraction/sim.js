import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const N_WATER = 1.33;
const DEG = 180 / Math.PI;
const GLASS_CM = 12;   // the glass is 12 cm tall; used to turn pixels into cm for the lab

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

// Snell: sin(theta_w) = sin(theta_a) / n. Angles in radians from the normal.
function waterAngle(thetaAir) {
  const s = Math.sin(thetaAir) / N_WATER;
  return Math.asin(Math.max(-1, Math.min(1, s)));
}
// Apparent-depth factor: a point at depth d is seen at depth d*k when the eye
// looks down at angle thetaAir from the vertical. k -> 1/n for a straight-down view.
function liftFactor(thetaAir) {
  if (Math.abs(thetaAir) < 0.01) return 1 / N_WATER;
  const tw = Math.tan(waterAngle(thetaAir)), ta = Math.tan(thetaAir);
  if (!Number.isFinite(tw) || !Number.isFinite(ta) || Math.abs(ta) < 1e-6) return 1 / N_WATER;
  return Math.max(0.05, Math.min(1, tw / ta));
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = { scene: 'straw', level: 70, angle: 40, liftCm: 0, depthCm: 0, coinSeen: false, coinFrac: 0 };
  let now = 0;

  const font = (px, bold = true) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;

  function drawEye(ctx, x, y, size) {
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.ellipse(x, y, size, size * 0.6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath(); ctx.arc(x, y, size * 0.45, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.beginPath(); ctx.arc(x, y, size * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y, size, size * 0.6, 0, 0, Math.PI * 2); ctx.stroke();
  }

  function drawStrawScene(ctx, W, H) {
    const gx0 = W * 0.18, gx1 = W * 0.42, gyT = H * 0.2, gyB = H * 0.86;
    const pxPerCm = (gyB - gyT) / GLASS_CM;
    const yW = gyB - (state.level / 100) * (gyB - gyT);
    const hasWater = state.level > 0.5;
    const thA = state.angle / DEG;
    const thW = waterAngle(thA);
    const k = liftFactor(thA);

    // glass
    ctx.fillStyle = 'rgba(148,163,184,0.12)';
    ctx.beginPath(); ctx.roundRect(gx0, gyT, gx1 - gx0, gyB - gyT, [4, 4, 18, 18]); ctx.fill();
    if (hasWater) {
      ctx.fillStyle = 'rgba(56,189,248,0.35)';
      ctx.beginPath(); ctx.roundRect(gx0, yW, gx1 - gx0, gyB - yW, [0, 0, 18, 18]); ctx.fill();
      ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(gx0, yW); ctx.lineTo(gx1, yW); ctx.stroke();
      // the surface continues as a thin dashed line so the eye can see the "border"
      ctx.setLineDash([6, 6]); ctx.strokeStyle = 'rgba(125,211,252,0.5)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(gx1, yW); ctx.lineTo(W * 0.95, yW); ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(gx0, gyT, gx1 - gx0, gyB - gyT, [4, 4, 18, 18]); ctx.stroke();

    // straw: real line from P0 (bottom) to P1 (top)
    const P0 = { x: gx0 + (gx1 - gx0) * 0.25, y: gyB - 6 };
    const P1 = { x: gx1 - 4, y: H * 0.08 };
    const sw = Math.max(6, W * 0.016);
    const strawSeg = (a, b, alpha, dashed) => {
      ctx.save();
      if (dashed) ctx.setLineDash([sw, sw * 0.8]);
      ctx.lineCap = 'butt';
      ctx.strokeStyle = `rgba(239,68,68,${alpha})`; ctx.lineWidth = sw;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = sw * 0.35;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.restore();
    };
    const slopeX = (P1.x - P0.x) / (P1.y - P0.y);          // dx per dy along the real straw
    const xAt = (y) => P0.x + (y - P0.y) * slopeX;
    const apparent = (p) => ({ x: p.x, y: yW + (p.y - yW) * k }); // raised, same x

    if (hasWater && yW > P1.y) {
      const S = { x: xAt(yW), y: yW };
      // real submerged part as a ghost
      strawSeg(P0, S, 0.3, true);
      // what you see: above-water part + raised submerged part
      strawSeg(S, P1, 1, false);
      strawSeg(apparent(P0), S, 1, false);
      state.depthCm = (P0.y - yW) / pxPerCm;
      state.liftCm = state.depthCm * (1 - k);
    } else {
      strawSeg(P0, P1, 1, false);
      state.depthCm = 0; state.liftCm = 0;
    }

    // light ray from the real straw bottom to the eye
    const eyeSize = Math.max(10, W * 0.022);
    let eye;
    if (hasWater && yW > P1.y) {
      const d = P0.y - yW;
      const Sx = P0.x + d * Math.tan(thW);
      let he = H * 0.3;
      const maxHe = (W * 0.93 - Sx) / Math.max(0.05, Math.tan(thA));
      he = Math.min(he, maxHe, yW - H * 0.06);
      eye = { x: Sx + he * Math.tan(thA), y: yW - he };
      // normal at S
      ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(Sx, yW - H * 0.12); ctx.lineTo(Sx, yW + H * 0.12); ctx.stroke();
      ctx.setLineDash([]);
      // ray in water and in air
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#fde047'; ctx.lineWidth = Math.max(3, W * 0.005);
      ctx.beginPath(); ctx.moveTo(P0.x, P0.y); ctx.lineTo(Sx, yW); ctx.lineTo(eye.x, eye.y); ctx.stroke();
      // the eye's straight-line guess back to the apparent bottom
      const A = apparent(P0);
      ctx.setLineDash([6, 6]); ctx.strokeStyle = 'rgba(253,224,71,0.7)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(Sx, yW); ctx.lineTo(A.x, A.y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineCap = 'butt';
      // labels
      ctx.font = font(Math.max(11, W * 0.02), false);
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fde047';
      ctx.fillText(T('light bends here', 'cahaya membelok di sini'), Sx + 10, yW + H * 0.07);
      ctx.fillStyle = 'rgba(248,113,113,0.9)';
      ctx.textAlign = 'right';
      ctx.fillText(T('real', 'asli'), P0.x - sw, P0.y - 4);
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(T('what you see', 'yang terlihat'), A.x - sw, A.y);
      ctx.textAlign = 'left';
    } else {
      // no water: straight ray from the straw bottom to the eye
      let he = H * 0.5;
      const maxHe = (W * 0.93 - P0.x) / Math.max(0.05, Math.tan(thA));
      he = Math.min(he, maxHe);
      eye = { x: P0.x + he * Math.tan(thA), y: P0.y - he };
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#fde047'; ctx.lineWidth = Math.max(3, W * 0.005);
      ctx.beginPath(); ctx.moveTo(P0.x, P0.y); ctx.lineTo(eye.x, eye.y); ctx.stroke();
      ctx.lineCap = 'butt';
    }
    drawEye(ctx, eye.x, eye.y, eyeSize);

    // headline
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = font(Math.max(14, W * 0.032));
    if (hasWater) {
      ctx.fillStyle = '#fde047';
      ctx.fillText(T('The straw looks bent!', 'Sedotan tampak bengkok!'), W * 0.68, H * 0.12);
      ctx.font = font(Math.max(11, W * 0.02), false);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T(`The bottom looks ${state.liftCm.toFixed(1)} cm higher than it is`, `Ujung bawah tampak ${state.liftCm.toFixed(1).replace('.', ',')} cm lebih tinggi dari aslinya`), W * 0.68, H * 0.18);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T('No water: the straw looks straight', 'Tanpa air: sedotan tampak lurus'), W * 0.68, H * 0.12);
    }
    // ruler on the left
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.fillStyle = '#94a3b8';
    ctx.font = font(Math.max(9, W * 0.014), false); ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (let c = 0; c <= GLASS_CM; c += 2) {
      const y = gyB - c * pxPerCm;
      ctx.beginPath(); ctx.moveTo(gx0 - 14, y); ctx.lineTo(gx0 - 6, y); ctx.stroke();
      ctx.fillText(`${c}`, gx0 - 18, y);
    }
    ctx.textAlign = 'left';
    ctx.fillText('cm', gx0 - 30, gyT - 14);
  }

  function drawCoinScene(ctx, W, H) {
    const rimL = W * 0.3, rimR = W * 0.7, yRim = H * 0.34, yBot = H * 0.84;
    const botL = W * 0.36, botR = W * 0.64;
    const yW = yBot - (state.level / 100) * (yBot - yRim);
    const hasWater = state.level > 0.5;
    const thA = state.angle / DEG;
    const thW = waterAngle(thA);
    const coin = { x: W * 0.49, r: Math.max(10, W * 0.04) };
    const pxPerCm = (yBot - yRim) / 8; // the bowl is 8 cm deep

    // bowl interior (behind water)
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.moveTo(rimL, yRim); ctx.lineTo(botL, yBot); ctx.lineTo(botR, yBot); ctx.lineTo(rimR, yRim); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath(); ctx.moveTo(rimL, yRim); ctx.lineTo(botL, yBot); ctx.lineTo(botR, yBot); ctx.lineTo(rimR, yRim); ctx.closePath();
    ctx.lineWidth = Math.max(6, W * 0.012); ctx.strokeStyle = '#94a3b8'; ctx.stroke();

    // where the grazing line of sight lands on the bottom
    let xLand;
    if (hasWater && yW < yRim + 1) {
      xLand = rimL + (yBot - yRim) * Math.tan(thW);
    } else if (hasWater) {
      const Sx = rimL + (yW - yRim) * Math.tan(thA);
      xLand = Sx + (yBot - yW) * Math.tan(thW);
    } else {
      xLand = rimL + (yBot - yRim) * Math.tan(thA);
    }
    // visible fraction of the coin: the part to the right of xLand
    const left = coin.x - coin.r, right = coin.x + coin.r;
    const frac = Math.max(0, Math.min(1, (right - xLand) / (2 * coin.r)));
    state.coinFrac = frac; state.coinSeen = frac > 0.15;

    // coin (flat on the bottom, seen from the side as a thick ellipse)
    const coinH = Math.max(5, coin.r * 0.35);
    ctx.save();
    ctx.beginPath(); ctx.rect(xLand, yBot - coinH * 3, W, coinH * 4); ctx.clip();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.ellipse(coin.x, yBot - coinH / 2, coin.r, coinH, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(coin.x, yBot - coinH / 2, coin.r * 0.7, coinH * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    // hidden part of the coin shown as a faint ghost
    if (frac < 1) {
      ctx.save();
      ctx.beginPath(); ctx.rect(0, yBot - coinH * 3, Math.max(0, xLand), coinH * 4); ctx.clip();
      ctx.strokeStyle = 'rgba(245,158,11,0.35)'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.ellipse(coin.x, yBot - coinH / 2, coin.r, coinH, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }

    // water
    if (hasWater) {
      const t = (yW - yRim) / (yBot - yRim);
      const wl = rimL + (botL - rimL) * t, wr = rimR + (botR - rimR) * t;
      ctx.fillStyle = 'rgba(56,189,248,0.4)';
      ctx.beginPath(); ctx.moveTo(wl, yW); ctx.lineTo(botL, yBot); ctx.lineTo(botR, yBot); ctx.lineTo(wr, yW); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(wl, yW); ctx.lineTo(wr, yW); ctx.stroke();
    }
    // shadow region on the bottom that the eye cannot see
    ctx.fillStyle = 'rgba(15,23,42,0.45)';
    ctx.beginPath(); ctx.moveTo(rimL, yRim); ctx.lineTo(botL, yBot); ctx.lineTo(Math.min(botR, Math.max(botL, xLand)), yBot); ctx.closePath(); ctx.fill();

    // eye and line of sight
    const he = Math.min(H * 0.26, (rimL - W * 0.05) / Math.max(0.05, Math.tan(thA)));
    const eye = { x: rimL - he * Math.tan(thA), y: yRim - he };
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fde047'; ctx.lineWidth = Math.max(3, W * 0.005);
    ctx.beginPath(); ctx.moveTo(eye.x, eye.y); ctx.lineTo(rimL, yRim);
    if (hasWater && yW > yRim + 1) {
      const Sx = rimL + (yW - yRim) * Math.tan(thA);
      ctx.lineTo(Sx, yW);
    }
    ctx.lineTo(Math.min(xLand, W), yBot); ctx.stroke();
    ctx.lineCap = 'butt';
    drawEye(ctx, eye.x, eye.y, Math.max(10, W * 0.022));

    // headline
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = font(Math.max(14, W * 0.032));
    if (state.coinSeen) {
      ctx.fillStyle = '#fde047';
      ctx.fillText(T(frac > 0.95 ? 'I can see the coin!' : 'I can see part of the coin!', frac > 0.95 ? 'Aku bisa melihat koinnya!' : 'Aku bisa melihat sebagian koin!'), W * 0.5, H * 0.12);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T('The coin is hidden behind the rim', 'Koin tersembunyi di balik bibir mangkuk'), W * 0.5, H * 0.12);
    }
    ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(hasWater ? T('Light from the coin bends at the surface and climbs over the rim', 'Cahaya dari koin membelok di permukaan dan melewati bibir mangkuk')
      : T('Add water to make the coin appear', 'Tambahkan air agar koin muncul'), W * 0.5, H * 0.18);
    ctx.fillStyle = '#94a3b8';
    ctx.font = font(Math.max(10, W * 0.016), false);
    ctx.fillText(T('shaded = the eye cannot see this part of the bottom', 'bagian gelap = tidak terlihat oleh mata'), W * 0.5, H * 0.94);
    state.depthCm = hasWater ? (yBot - yW) / pxPerCm : 0;
    state.liftCm = state.depthCm * (1 - liftFactor(thA));
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    if (state.scene === 'straw') drawStrawScene(ctx, W, H); else drawCoinScene(ctx, W, H);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // controls
  const strawBtn = bigBtn(T('Straw in a glass', 'Sedotan di gelas'), () => setScene('straw'));
  const coinBtn = bigBtn(T('Coin in a bowl', 'Koin di mangkuk'), () => setScene('coin'));
  function setScene(s) {
    state.scene = s;
    strawBtn.el.classList.toggle('btn--primary', s === 'straw');
    coinBtn.el.classList.toggle('btn--primary', s === 'coin');
  }
  setScene('straw');
  const levelS = slider({
    label: T('Water level (%)', 'Tinggi air (%)'), key: 'water', min: 0, max: 100, step: 1, value: state.level,
    format: (v) => `${v}%`, onInput: (v) => { state.level = v; },
  });
  const angleS = slider({
    label: T('Viewing angle (°)', 'Sudut pandang (°)'), key: 'angle', min: 5, max: 65, step: 1, value: state.angle,
    format: (v) => `${v}°`, onInput: (v) => { state.angle = v; },
  });
  ctrlPanel.append(row(strawBtn, coinBtn), levelS.el, angleS.el);

  const lab = labPanel({
    title: 'How much does the water trick your eye?',
    filename: 'bent-straw-data.csv',
    columns: [
      { key: 'scene', label: 'Scene' },
      { key: 'level', label: 'Water level (%)' },
      { key: 'angle', label: 'Viewing angle (°)' },
      { key: 'depth', label: 'Real depth (cm)', format: (v) => v.toFixed(1) },
      { key: 'lift', label: 'Looks higher by (cm)', format: (v) => v.toFixed(1) },
      { key: 'coin', label: 'Coin seen?' },
    ],
    procedure: [
      'Choose the straw. Set the viewing angle to 30°.',
      'Set the water level to 20%, read "looks higher by", press Record.',
      'Repeat for 40%, 60%, 80% and 100%.',
      'Now keep the water at 100% and change the angle: 10°, 30°, 50°, 65°. Record each.',
      'Switch to the coin. Find the smallest water level where the coin is seen and record it.',
    ],
    predict: 'With more water, will the straw bottom look more lifted, less lifted, or the same?',
    source: () => ({
      scene: state.scene === 'straw' ? 'straw' : 'coin',
      level: state.level,
      angle: state.angle,
      depth: state.depthCm,
      lift: state.liftCm,
      coin: state.scene === 'coin' ? (state.coinSeen ? 'yes' : 'no') : '-',
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
