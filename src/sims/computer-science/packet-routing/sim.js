import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const B = (en, id) => ({ en, id });
// Positions are fractions of the graph area.
const NODES = [
  { id: 'H', kind: 'host', name: B('Home PC', 'PC rumah'), ip: '192.168.1.10', x: 0.07, y: 0.28 },
  { id: 'S', kind: 'host', name: B('School PC', 'PC sekolah'), ip: '172.16.0.20', x: 0.07, y: 0.78 },
  { id: 'R1', kind: 'router', name: B('Home router', 'Router rumah'), ip: '10.0.0.1', x: 0.22, y: 0.28 },
  { id: 'R2', kind: 'router', name: B('ISP A', 'ISP A'), ip: '10.0.1.1', x: 0.38, y: 0.16 },
  { id: 'R3', kind: 'router', name: B('School router', 'Router sekolah'), ip: '10.0.2.1', x: 0.24, y: 0.78 },
  { id: 'R4', kind: 'router', name: B('Core 1', 'Inti 1'), ip: '10.1.0.1', x: 0.50, y: 0.48 },
  { id: 'R5', kind: 'router', name: B('Core 2', 'Inti 2'), ip: '10.1.1.1', x: 0.50, y: 0.86 },
  { id: 'R6', kind: 'router', name: B('Core 3', 'Inti 3'), ip: '10.1.2.1', x: 0.66, y: 0.16 },
  { id: 'R7', kind: 'router', name: B('Edge router', 'Router tepi'), ip: '10.2.0.1', x: 0.78, y: 0.56 },
  { id: 'W', kind: 'host', name: B('Web server', 'Server web'), ip: '203.0.113.5', x: 0.93, y: 0.22 },
  { id: 'V', kind: 'host', name: B('Video server', 'Server video'), ip: '198.51.100.7', x: 0.93, y: 0.82 },
];
const LINK_DEFS = [
  ['H', 'R1', 1], ['S', 'R3', 1], ['R1', 'R2', 2], ['R1', 'R4', 5], ['R3', 'R4', 3], ['R3', 'R5', 2],
  ['R2', 'R4', 2], ['R2', 'R6', 4], ['R4', 'R6', 3], ['R4', 'R7', 4], ['R4', 'R5', 2], ['R5', 'R7', 3],
  ['R6', 'W', 2], ['R6', 'R7', 2], ['R7', 'W', 3], ['R7', 'V', 2], ['R5', 'V', 6],
];
const NODE = Object.fromEntries(NODES.map((n) => [n.id, n]));
const MS_PER_COST = 8;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const links = LINK_DEFS.map(([a, b, cost], i) => ({ i, a, b, cost, down: false }));
  const state = {
    src: 'H', dst: 'W', selected: 'R4',
    nPackets: 6, lossPct: 0, retransmit: true, speed: 1,
    packets: [], retxQueue: [], launchQueue: [],
    seqDone: [], message: '', msgId: 0,
    sent: 0, lost: 0, retx: 0, delivered: 0,
    traceroute: null,      // path of the first packet that reached the destination
    tables: {},
    now: 0, flashLink: -1, flashT: 0,
  };

  // ---------- routing ----------
  function dijkstra(srcId) {
    const dist = {}, prev = {};
    for (const n of NODES) dist[n.id] = Infinity;
    dist[srcId] = 0;
    const seen = new Set();
    for (;;) {
      let u = null, best = Infinity;
      for (const n of NODES) if (!seen.has(n.id) && dist[n.id] < best) { best = dist[n.id]; u = n.id; }
      if (u === null) break;
      seen.add(u);
      if (NODE[u].kind === 'host' && u !== srcId) continue;   // hosts do not forward
      for (const l of links) {
        if (l.down) continue;
        const v = l.a === u ? l.b : l.b === u ? l.a : null;
        if (!v) continue;
        const nd = dist[u] + l.cost;
        if (nd < dist[v]) { dist[v] = nd; prev[v] = u; }
      }
    }
    return { dist, prev };
  }
  const table = (id) => (state.tables[id] ||= dijkstra(id));
  function pathFrom(srcId, dstId) {
    const t = table(srcId);
    if (!Number.isFinite(t.dist[dstId])) return null;
    const path = [dstId];
    let guard = 0;
    while (path[0] !== srcId && guard++ < 50) path.unshift(t.prev[path[0]]);
    return path;
  }
  const nextHop = (at, dstId) => { const p = pathFrom(at, dstId); return p && p.length > 1 ? p[1] : null; };
  const linkBetween = (a, b) => links.find((l) => !l.down && ((l.a === a && l.b === b) || (l.a === b && l.b === a)));
  const invalidate = () => { state.tables = {}; };

  // ---------- packets ----------
  function spawn(seq) {
    state.packets.push({ seq, at: state.src, link: null, to: null, t: 0, lost: false, done: false, path: [state.src], cost: 0, waitSince: null, msgId: state.msgId });
    state.sent++;
  }
  function sendMessage() {
    state.msgId++;
    state.message = T('HELLO, INTERNET!', 'HALO, INTERNET!');
    state.packets = []; state.retxQueue = []; state.launchQueue = [];
    state.seqDone = new Array(state.nPackets).fill(false);
    state.sent = 0; state.lost = 0; state.retx = 0; state.delivered = 0;
    state.traceroute = null;
    for (let s = 0; s < state.nPackets; s++) state.launchQueue.push({ seq: s, at: state.now + s * 0.22, isRetx: false });
  }
  const chunk = (seq) => {
    const m = state.message, n = state.nPackets;
    const a = Math.floor(seq * m.length / n), b = Math.floor((seq + 1) * m.length / n);
    return m.slice(a, b);
  };
  function step(dt) {
    state.now += dt * state.speed;
    const now = state.now;
    for (let i = state.launchQueue.length - 1; i >= 0; i--) {
      const q = state.launchQueue[i];
      if (now >= q.at) { state.launchQueue.splice(i, 1); if (!state.seqDone[q.seq]) { spawn(q.seq); if (q.isRetx) state.retx++; } }
    }
    for (const p of state.packets) {
      if (p.done) { p.age = (p.age || 0) + dt * state.speed; continue; }
      if (p.link) {
        p.t += dt * state.speed / (0.28 * p.link.cost + 0.15);
        if (p.link.down) { p.lost = true; }
        if (p.lost) {
          if (p.t >= 0.5 || p.link.down) { finishLost(p); }
          continue;
        }
        if (p.t >= 1) {
          p.at = p.to; p.path.push(p.to); p.cost += p.link.cost; p.link = null; p.to = null; p.t = 0;
          if (p.at === state.dst) {
            p.done = true; p.delivered = true;
            if (!state.seqDone[p.seq]) { state.seqDone[p.seq] = true; state.delivered++; }
            if (!state.traceroute) state.traceroute = { path: p.path.slice(), cost: p.cost };
          }
        }
      } else {
        const nh = nextHop(p.at, state.dst);
        if (!nh) { p.waitSince ??= now; continue; }       // unreachable: wait at this router
        p.waitSince = null;
        const l = linkBetween(p.at, nh);
        if (!l) continue;
        p.link = l; p.to = nh; p.t = 0;
        if (Math.random() * 100 < state.lossPct) p.lost = true;
      }
    }
  }
  function finishLost(p) {
    p.done = true; p.lostAt = state.now; state.lost++;
    if (state.retransmit && !state.seqDone[p.seq]) state.launchQueue.push({ seq: p.seq, at: state.now + 1.6, isRetx: true });
  }
  function toggleLink(i) {
    const l = links[i];
    l.down = !l.down;
    invalidate();
    state.flashLink = i; state.flashT = 1;
    if (l.down) for (const p of state.packets) if (!p.done && p.link === l) { p.lost = true; finishLost(p); }
  }

  // ---------- geometry ----------
  function geom() {
    const W = cv.width, H = cv.height;
    return { W, H, gx: W * 0.02, gy: H * 0.08, gw: W * 0.62, gh: H * 0.76, px: W * 0.66, pw: W * 0.32 };
  }
  const nodePos = (id, g) => { const n = NODE[id]; return { x: g.gx + n.x * g.gw, y: g.gy + n.y * g.gh }; };
  const linkMid = (l, g) => { const a = nodePos(l.a, g), b = nodePos(l.b, g); return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; };

  // ---------- drawing ----------
  function draw() {
    const ctx = cv.ctx;
    const g = geom();
    const { W, H } = g;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = clamp(W * 0.0145, 7, 14);
    const mono = `${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    ctx.textBaseline = 'middle';
    const R = clamp(W * 0.02, 8, 20);

    // title
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${fs}px system-ui, sans-serif`;
    const sp = pathFrom(state.src, state.dst);
    const spCost = sp ? table(state.src).dist[state.dst] : null;
    ctx.fillText(`${T(NODE[state.src].name.en, NODE[state.src].name.id)} (${NODE[state.src].ip}) → ${T(NODE[state.dst].name.en, NODE[state.dst].name.id)} (${NODE[state.dst].ip})   ·   ${sp ? `${T('cheapest path cost', 'biaya jalur termurah')} ${spCost}, ${sp.length - 1} ${T('hops', 'lompatan')}` : T('UNREACHABLE: no path', 'TAK TERJANGKAU: tidak ada jalur')}`, g.gx, H * 0.035);
    ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(T('Tap a router to see its table · tap a link cost to break / repair it', 'Sentuh router untuk melihat tabelnya · sentuh biaya tautan untuk memutus / memperbaikinya'), g.gx, H * 0.075);

    // links
    for (const l of links) {
      const a = nodePos(l.a, g), b = nodePos(l.b, g);
      const onPath = sp && sp.some((id, i) => i < sp.length - 1 && ((sp[i] === l.a && sp[i + 1] === l.b) || (sp[i] === l.b && sp[i + 1] === l.a)));
      ctx.lineWidth = onPath ? 4 : 2;
      ctx.setLineDash(l.down ? [6, 6] : []);
      ctx.strokeStyle = l.down ? '#ef4444' : onPath ? 'rgba(34,211,238,0.85)' : 'rgba(148,163,184,0.45)';
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.setLineDash([]);
      // cost badge (also the hit target)
      const m = linkMid(l, g);
      const flash = state.flashLink === l.i ? state.flashT : 0;
      ctx.fillStyle = l.down ? '#7f1d1d' : flash > 0 ? `rgba(251,191,36,${0.4 + 0.6 * flash})` : '#1e293b';
      ctx.strokeStyle = l.down ? '#ef4444' : '#64748b'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(m.x, m.y, fs * 0.85, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = l.down ? '#fecaca' : '#e2e8f0'; ctx.font = `700 ${fs * 0.85}px ui-monospace, monospace`; ctx.textAlign = 'center';
      ctx.fillText(l.down ? '✕' : String(l.cost), m.x, m.y + 0.5);
    }

    // nodes
    for (const n of NODES) {
      const p = nodePos(n.id, g);
      const isSel = n.id === state.selected, isSrc = n.id === state.src, isDst = n.id === state.dst;
      ctx.lineWidth = isSel ? 3 : 1.5;
      if (n.kind === 'router') {
        ctx.fillStyle = '#3b2f6b'; ctx.strokeStyle = isSel ? '#fbbf24' : '#a78bfa';
        ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#f1f5f9'; ctx.font = `700 ${fs * 0.9}px system-ui, sans-serif`; ctx.textAlign = 'center';
        ctx.fillText(n.id, p.x, p.y + 0.5);
      } else {
        const active = isSrc || isDst;
        ctx.fillStyle = active ? (isSrc ? '#0e3a4a' : '#14352a') : '#1e293b';
        ctx.strokeStyle = active ? (isSrc ? '#22d3ee' : '#34d399') : '#64748b';
        ctx.beginPath(); ctx.roundRect(p.x - R * 1.1, p.y - R * 0.85, R * 2.2, R * 1.7, 4); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#f1f5f9'; ctx.font = `700 ${fs * 0.8}px system-ui, sans-serif`; ctx.textAlign = 'center';
        ctx.fillText(n.kind === 'host' && (n.id === 'H' || n.id === 'S') ? 'PC' : 'SRV', p.x, p.y + 0.5);
      }
      ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
      const below = n.y > 0.5;
      ctx.fillText(T(n.name.en, n.name.id), p.x, p.y + (below ? R + fs * 0.9 : -R - fs * 1.7));
      ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.78}px ui-monospace, monospace`;
      ctx.fillText(n.ip, p.x, p.y + (below ? R + fs * 1.9 : -R - fs * 0.75));
    }

    // packets
    for (const p of state.packets) {
      if (p.done && (!p.lost || p.age > 1.2)) continue;
      let x, y;
      if (p.link) {
        const a = nodePos(p.link.a === p.at ? p.link.a : p.link.b, g), b = nodePos(p.to, g);
        x = a.x + (b.x - a.x) * Math.min(1, p.t); y = a.y + (b.y - a.y) * Math.min(1, p.t);
      } else { const q = nodePos(p.at, g); x = q.x; y = q.y - R - 2; }
      const s = fs * 1.3;
      if (p.lost) {
        const alpha = p.done ? Math.max(0, 1 - p.age / 1.2) : 1;
        ctx.strokeStyle = `rgba(239,68,68,${alpha})`; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(x - s / 2, y - s / 2); ctx.lineTo(x + s / 2, y + s / 2); ctx.moveTo(x + s / 2, y - s / 2); ctx.lineTo(x - s / 2, y + s / 2); ctx.stroke();
        continue;
      }
      ctx.fillStyle = p.waitSince != null ? '#f59e0b' : '#22d3ee';
      ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.roundRect(x - s / 2, y - s / 2, s, s, 3); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0b1220'; ctx.font = `700 ${fs * 0.75}px ui-monospace, monospace`; ctx.textAlign = 'center';
      ctx.fillText(String(p.seq + 1), x, y + 0.5);
    }

    // reassembly at the destination (bottom of graph area)
    const ry = g.gy + g.gh + fs * 1.2;
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${fs * 0.9}px system-ui, sans-serif`;
    if (state.message) {
      ctx.fillText(`${T('Reassembled at', 'Disusun kembali di')} ${T(NODE[state.dst].name.en, NODE[state.dst].name.id)}:`, g.gx, ry);
      let x = g.gx + fs * 0.2; const slotH = fs * 1.9, yy = ry + fs * 1.6;
      ctx.font = `700 ${fs * 1.05}px ui-monospace, monospace`;
      for (let s = 0; s < state.nPackets; s++) {
        const txt = chunk(s) || ' ';
        const w = Math.max(fs * 1.2, ctx.measureText(txt).width + fs * 0.6);
        const ok = state.seqDone[s];
        ctx.fillStyle = ok ? 'rgba(52,211,153,0.2)' : 'rgba(148,163,184,0.08)';
        ctx.strokeStyle = ok ? '#34d399' : '#475569'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x, yy - slotH / 2, w, slotH, 4); ctx.fill(); ctx.stroke();
        ctx.fillStyle = ok ? '#f1f5f9' : '#475569'; ctx.textAlign = 'center';
        ctx.fillText(ok ? txt : '·'.repeat(Math.max(1, txt.length)), x + w / 2, yy);
        ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.7}px ui-monospace, monospace`;
        ctx.fillText(`#${s + 1}`, x + w / 2, yy + slotH / 2 + fs * 0.6);
        ctx.font = `700 ${fs * 1.05}px ui-monospace, monospace`;
        x += w + fs * 0.35;
      }
      ctx.textAlign = 'left';
      const complete = state.seqDone.every(Boolean);
      ctx.fillStyle = complete ? '#34d399' : '#94a3b8'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
      ctx.fillText(`${T('sent', 'terkirim')} ${state.sent} · ${T('delivered', 'sampai')} ${state.delivered}/${state.nPackets} · ${T('lost', 'hilang')} ${state.lost} · ${T('retransmitted', 'dikirim ulang')} ${state.retx}${complete ? '  ✓ ' + T('message complete', 'pesan lengkap') : ''}`, Math.min(x + fs, W * 0.4), yy);
    } else {
      ctx.fillText(T('Press "Send message" to split a message into packets.', 'Tekan "Kirim pesan" untuk memecah pesan menjadi paket.'), g.gx, ry);
    }

    // ---------- right panel ----------
    const px = g.px, pw = g.pw;
    let y = H * 0.035;
    const lh = fs * 1.45;
    const sel = NODE[state.selected];
    ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${fs}px system-ui, sans-serif`;
    ctx.fillText(`${T('Routing table of', 'Tabel routing')} ${sel.id} · ${T(sel.name.en, sel.name.id)} (${sel.ip})`, px, y); y += lh;
    ctx.font = `${fs * 0.85}px ui-monospace, monospace`; ctx.fillStyle = '#64748b';
    const c1 = px, c2 = px + pw * 0.46, c3 = px + pw * 0.74, c4 = px + pw * 0.9;
    ctx.fillText(T('destination', 'tujuan'), c1, y); ctx.fillText(T('next hop', 'lompat ke'), c2, y); ctx.fillText(T('cost', 'biaya'), c3, y); ctx.fillText(T('hops', 'lomp.'), c4, y); y += lh * 0.9;
    const tb = table(sel.id);
    ctx.font = mono;
    for (const n of NODES) {
      if (n.id === sel.id) continue;
      const path = pathFrom(sel.id, n.id);
      const hot = n.id === state.dst && (sel.id === state.src || (sp && sp.includes(sel.id)));
      if (hot) { ctx.fillStyle = 'rgba(34,211,238,0.14)'; ctx.fillRect(px - 4, y - lh * 0.45, pw + 8, lh * 0.9); }
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`${n.id.padEnd(3)} ${n.ip}`, c1, y);
      if (path) {
        ctx.fillStyle = '#c4b5fd'; ctx.fillText(path.length > 1 ? path[1] : '—', c2, y);
        ctx.fillStyle = '#e2e8f0'; ctx.fillText(String(tb.dist[n.id]), c3, y); ctx.fillText(String(path.length - 1), c4, y);
      } else { ctx.fillStyle = '#f87171'; ctx.fillText(T('unreachable', 'tak terjangkau'), c2, y); }
      y += lh * 0.9;
    }

    // traceroute
    y += lh * 0.6;
    ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${fs}px system-ui, sans-serif`;
    ctx.fillText(`traceroute ${NODE[state.dst].ip}`, px, y); y += lh;
    ctx.font = mono;
    const tr = state.traceroute;
    const rows = tr ? tr.path : (sp || [state.src]);
    ctx.fillStyle = '#64748b'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(tr ? T('path taken by the first delivered packet', 'jalur paket pertama yang sampai') : (sp ? T('predicted from current tables (nothing sent yet)', 'prediksi dari tabel saat ini (belum ada yang dikirim)') : T('no route to host', 'tidak ada rute ke tujuan')), px, y); y += lh * 0.9;
    ctx.font = mono;
    let cum = 0;
    for (let i = 1; i < rows.length; i++) {
      const l = links.find((k) => (k.a === rows[i - 1] && k.b === rows[i]) || (k.b === rows[i - 1] && k.a === rows[i]));
      cum += l ? l.cost : 0;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`${String(i).padStart(2, ' ')}  ${rows[i].padEnd(3)} ${NODE[rows[i]].ip.padEnd(14)} ${String(cum * MS_PER_COST).padStart(3, ' ')} ms`, px, y);
      y += lh * 0.9;
      if (y > H - lh) break;
    }
    if (rows.length <= 1) { ctx.fillStyle = '#f87171'; ctx.fillText(' *  *  *  ' + T('request timed out', 'waktu habis'), px, y); }
    const waiting = state.packets.filter((p) => !p.done && p.waitSince != null).length;
    if (waiting) { y += lh; ctx.fillStyle = '#f59e0b'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`; ctx.fillText(`${waiting} ${T('packet(s) waiting at a router with no route', 'paket menunggu di router tanpa rute')}`, px, Math.min(y, H - lh)); }
    ctx.textAlign = 'left';
  }

  // ---------- pointer / keyboard: tap routers and link badges ----------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = geom();
      const fs = clamp(g.W * 0.0145, 7, 14);
      for (const l of links) { const m = linkMid(l, g); if (Math.hypot(x - m.x, y - m.y) <= fs * 1.1) return `link:${l.i}`; }
      const R = clamp(g.W * 0.02, 8, 20);
      for (const n of NODES) if (n.kind === 'router') { const p = nodePos(n.id, g); if (Math.hypot(x - p.x, y - p.y) <= R + 4) return `node:${n.id}`; }
      return null;
    },
    onStart(id) {
      if (id.startsWith('link:')) toggleLink(Number(id.slice(5)));
      else { state.selected = id.slice(5); routerSel.value = state.selected; }
    },
    handles: () => {
      const g = geom();
      return [
        ...NODES.filter((n) => n.kind === 'router').map((n) => ({ id: `node:${n.id}`, ...nodePos(n.id, g), label: `${T('Router', 'Router')} ${n.id} ${T(n.name.en, n.name.id)} (${T('arrow key: show routing table', 'tombol panah: tampilkan tabel routing')})` })),
        ...links.map((l) => ({ id: `link:${l.i}`, ...linkMid(l, g), label: `${T('Link', 'Tautan')} ${l.a}–${l.b} ${T('cost', 'biaya')} ${l.cost}${l.down ? ', ' + T('DOWN', 'PUTUS') : ''} (${T('arrow key: break or repair', 'tombol panah: putus atau perbaiki')})` })),
      ];
    },
    cursor: 'default',
    hoverCursor: 'pointer',
  });

  // ---------- controls ----------
  const hostOpts = (ids) => ids.map((id) => ({ value: id, label: `${T(NODE[id].name.en, NODE[id].name.id)} (${NODE[id].ip})` }));
  const srcSel = select({ label: 'Source', key: 'src', options: hostOpts(['H', 'S']), value: state.src, onChange: (v) => { state.src = v; } });
  const dstSel = select({ label: 'Destination', key: 'dst', options: hostOpts(['W', 'V']), value: state.dst, onChange: (v) => { state.dst = v; } });
  const routerSel = select({
    label: 'Routing table of', key: 'router',
    options: NODES.filter((n) => n.kind === 'router').map((n) => ({ value: n.id, label: `${n.id} · ${T(n.name.en, n.name.id)} (${n.ip})` })),
    value: state.selected, onChange: (v) => { state.selected = v; },
  });
  const nS = slider({ label: 'Packets per message', key: 'packets', min: 3, max: 12, step: 1, value: state.nPackets, onInput: (v) => { state.nPackets = v; } });
  const lossS = slider({ label: 'Packet loss per hop (%)', key: 'loss', min: 0, max: 30, step: 5, value: state.lossPct, format: (v) => `${v}%`, onInput: (v) => { state.lossPct = v; } });
  const retxT = toggle({ label: 'Retransmit lost packets (TCP)', key: 'retx', value: true, onChange: (v) => { state.retransmit = v; } });
  const speedS = slider({ label: 'Speed', key: 'speed', min: 0.3, max: 3, step: 0.1, value: 1, format: (v) => `${v.toFixed(1)}×`, onInput: (v) => { state.speed = v; } });
  const sendB = button({ label: 'Send message', primary: true, onClick: sendMessage });
  const breakB = button({
    label: 'Break random link',
    onClick: () => { const up = links.filter((l) => !l.down); if (up.length) toggleLink(up[Math.floor(Math.random() * up.length)].i); },
  });
  const repairB = button({ label: 'Repair all links', onClick: () => { links.forEach((l) => { l.down = false; }); invalidate(); } });
  ctrlPanel.append(srcSel.el, dstSel.el, row(sendB, breakB, repairB), nS.el, lossS.el, retxT.el, routerSel.el, speedS.el);

  const lab = labPanel({
    title: 'Routing lab',
    filename: 'packet-routing-data.csv',
    columns: [
      { key: 'source', label: 'Source' },
      { key: 'destination', label: 'Destination' },
      { key: 'hops', label: 'Hops' },
      { key: 'cost', label: 'Path cost' },
      { key: 'path', label: 'Path' },
      { key: 'packets', label: 'Packets' },
      { key: 'lost', label: 'Lost' },
      { key: 'retx', label: 'Retransmitted' },
      { key: 'delivered', label: 'Delivered' },
      { key: 'brokenLinks', label: 'Broken links' },
    ],
    procedure: [
      'With all links up and 0% loss, send Home → Web. Wait for the message to complete and record.',
      'Break the ISP A – Core 3 link (tap its cost badge). Send again and record. How did hops and cost change?',
      'Repair all. Set loss to 20% and send 10 packets. Record lost and retransmitted counts. Repeat twice: is the count the same?',
      'Turn retransmission off and send at 20% loss. Record how many packets were delivered.',
      'Send School → Video, then break links until the destination is unreachable. Record each attempt.',
    ],
    predict: 'With 20% loss per hop on a 4-hop path, what fraction of packets will arrive on the first try? (Each hop succeeds with probability 0.8.)',
    source: () => {
      if (!state.message) return null;
      const tr = state.traceroute, sp = pathFrom(state.src, state.dst);
      const path = tr ? tr.path : sp;
      return {
        source: `${NODE[state.src].name.en} ${NODE[state.src].ip}`,
        destination: `${NODE[state.dst].name.en} ${NODE[state.dst].ip}`,
        hops: path ? path.length - 1 : 'unreachable',
        cost: tr ? tr.cost : (sp ? table(state.src).dist[state.dst] : 'unreachable'),
        path: path ? path.join(' > ') : 'none',
        packets: state.nPackets,
        lost: state.lost,
        retx: state.retx,
        delivered: `${state.delivered}/${state.nPackets}`,
        brokenLinks: links.filter((l) => l.down).map((l) => `${l.a}-${l.b}`).join(' ') || 'none',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    step(dt);
    state.flashT = Math.max(0, state.flashT - dt * 1.5);
    draw();
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
