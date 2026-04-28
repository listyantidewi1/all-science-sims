import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { rows: 14, parity: false };
  let selected = null; // {row, col}

  // Triangle values (BigInt for safety on big rows).
  function buildTriangle(N) {
    const T = [[1n]];
    for (let i = 1; i < N; i++) {
      const row = [1n];
      for (let j = 1; j < i; j++) row.push(T[i - 1][j - 1] + T[i - 1][j]);
      row.push(1n);
      T.push(row);
    }
    return T;
  }

  let T = buildTriangle(params.rows);
  function rebuild() { T = buildTriangle(params.rows); }

  function cellRect(row, col) {
    const W = cv.width, H = cv.height;
    const padX = 30, padY = 50;
    const w = W - padX * 2;
    const h = H - padY - 30;
    const cellSize = Math.min(w / params.rows, h / params.rows);
    const startX = (W - cellSize * params.rows) / 2;
    const x = startX + (params.rows - row - 1) * cellSize / 2 + col * cellSize;
    const y = padY + row * cellSize * 0.85;
    return { x, y, w: cellSize - 4, h: cellSize * 0.85 - 4 };
  }

  function pathHighlight(target) {
    // BFS from (target.row, target.col) backward to (0,0), summing path counts.
    const reach = Array.from({ length: params.rows }, (_, i) => new Array(i + 1).fill(false));
    const stack = [[target.row, target.col]];
    while (stack.length) {
      const [r, c] = stack.pop();
      if (reach[r][c]) continue;
      reach[r][c] = true;
      if (r === 0) continue;
      if (c > 0) stack.push([r - 1, c - 1]);
      if (c < r) stack.push([r - 1, c]);
    }
    return reach;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const reach = selected ? pathHighlight(selected) : null;

    for (let i = 0; i < T.length; i++) {
      for (let j = 0; j <= i; j++) {
        const r = cellRect(i, j);
        const v = T[i][j];
        const isPath = reach && reach[i][j];
        const isOdd = params.parity && (v % 2n === 1n);
        const isSelected = selected && selected.row === i && selected.col === j;

        let bg;
        if (isSelected) bg = '#fbbf24';
        else if (isPath) bg = '#10b981';
        else if (isOdd) bg = '#a855f7';
        else bg = 'rgba(120,130,150,0.18)';
        ctx.fillStyle = bg;
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = 'rgba(120,130,150,0.4)';
        ctx.strokeRect(r.x, r.y, r.w, r.h);

        const txt = String(v);
        const fontSize = Math.max(8, Math.min(14, r.w * 0.4));
        ctx.fillStyle = isSelected ? '#0b1220' : '#fff';
        ctx.font = `bold ${fontSize}px var(--font-mono)`;
        ctx.textAlign = 'center';
        ctx.fillText(txt, r.x + r.w / 2, r.y + r.h / 2 + fontSize / 3);
        ctx.textAlign = 'left';
      }
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText("Pascal's triangle — click any cell", 16, 30);
    if (selected) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '12px var(--font-mono)';
      const v = T[selected.row][selected.col];
      ctx.fillText(`C(${selected.row}, ${selected.col}) = ${v}  (highlighted = ${countPaths(reach)} paths from apex)`, 340, 30);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Each cell = sum of the two cells above it', 16, H - 12);
  }

  function countPaths(reach) {
    if (!reach || !selected) return 0;
    return T[selected.row][selected.col].toString();
  }

  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    for (let i = 0; i < T.length; i++) {
      for (let j = 0; j <= i; j++) {
        const r = cellRect(i, j);
        if (sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h) {
          if (selected && selected.row === i && selected.col === j) selected = null;
          else selected = { row: i, col: j };
          return;
        }
      }
    }
    selected = null;
  });

  // controls
  const rS = slider({ label: 'Rows', min: 4, max: 20, step: 1, value: params.rows,
    onInput: (v) => { params.rows = v; rebuild(); selected = null; } });
  const pT = toggle({ label: 'Highlight odd cells (Sierpinski pattern)', value: params.parity, onChange: (v) => { params.parity = v; } });
  const clearB = button({ label: 'Clear selection', onClick: () => { selected = null; } });
  ctrlPanel.append(rS.el, pT.el, row(clearB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
