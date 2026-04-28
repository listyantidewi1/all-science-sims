import { slider, select, button, row } from '../../../lib/controls.js';

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const params = {
    nBuckets: 8,
    method: 'chaining',  // 'chaining' | 'linear'
    table: null,         // either array of arrays (chaining) or array of single slots
  };

  function rebuild() {
    if (params.method === 'chaining') {
      params.table = Array.from({ length: params.nBuckets }, () => []);
    } else {
      params.table = new Array(params.nBuckets).fill(null);
    }
  }
  rebuild();

  const inputRow = document.createElement('div');
  inputRow.style.cssText = 'display:flex;gap:var(--space-2);margin-bottom:var(--space-3)';
  const input = document.createElement('input');
  input.placeholder = 'key';
  input.style.cssText = 'flex:1;padding:8px 10px;font-family:var(--font-mono);background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:6px;color:var(--color-fg)';
  inputRow.appendChild(input);
  const insertBtn = document.createElement('button');
  insertBtn.textContent = 'Insert';
  insertBtn.style.cssText = 'padding:8px 16px;background:var(--color-accent);color:white;border:0;border-radius:6px;font-weight:700;cursor:pointer';
  insertBtn.addEventListener('click', () => {
    const k = input.value.trim();
    if (!k) return;
    insertKey(k);
    input.value = '';
    render();
  });
  inputRow.appendChild(insertBtn);
  stage.appendChild(inputRow);

  const tableWrap = document.createElement('div');
  tableWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);overflow:auto';
  stage.appendChild(tableWrap);

  let probesByKey = new Map(); // remember probes for visualization

  function insertKey(k) {
    const h = hash(k);
    const idx = h % params.nBuckets;
    if (params.method === 'chaining') {
      params.table[idx].push(k);
      probesByKey.set(k, [idx]);
    } else {
      const probes = [];
      for (let i = 0; i < params.nBuckets; i++) {
        const pIdx = (idx + i) % params.nBuckets;
        probes.push(pIdx);
        if (params.table[pIdx] == null) {
          params.table[pIdx] = k;
          break;
        }
      }
      probesByKey.set(k, probes);
    }
  }

  function render() {
    let html = `<div style="display:grid;grid-template-columns:repeat(${Math.min(params.nBuckets, 8)}, 1fr);gap:6px">`;
    for (let i = 0; i < params.nBuckets; i++) {
      html += `<div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:6px;padding:6px;min-height:60px">`;
      html += `<div style="font-family:var(--font-mono);font-size:10px;color:var(--color-muted);margin-bottom:4px">[${i}]</div>`;
      if (params.method === 'chaining') {
        const list = params.table[i];
        if (list.length === 0) html += `<div style="color:var(--color-muted);font-size:11px">empty</div>`;
        else html += list.map((k) => `<div style="background:#0ea5e9;color:white;padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:11px;margin:2px 0">${k}</div>`).join('');
      } else {
        const v = params.table[i];
        if (v == null) html += `<div style="color:var(--color-muted);font-size:11px">empty</div>`;
        else html += `<div style="background:#0ea5e9;color:white;padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:11px">${v}</div>`;
      }
      html += `</div>`;
    }
    html += `</div>`;

    // load + lookup stats
    const filled = params.method === 'chaining'
      ? params.table.reduce((s, b) => s + b.length, 0)
      : params.table.filter((v) => v != null).length;
    const load = filled / params.nBuckets;
    const avgChain = params.method === 'chaining'
      ? filled / params.nBuckets
      : null;

    html += `<div style="margin-top:var(--space-3);font-family:var(--font-mono);font-size:13px">`;
    html += `<strong>Items: ${filled}</strong>   buckets: ${params.nBuckets}   load α = ${load.toFixed(2)}<br>`;
    if (params.method === 'chaining') {
      html += `Avg chain length: ${avgChain.toFixed(2)} (expected lookup ≈ 1 + α/2)<br>`;
    } else {
      const expected = load < 1 ? 0.5 * (1 + 1 / (1 - load)) : Infinity;
      html += `Open addressing: expected probes ≈ ${load < 1 ? expected.toFixed(2) : '∞'}<br>`;
    }
    html += `</div>`;

    tableWrap.innerHTML = html;
  }
  render();

  // controls
  const nS = slider({ label: 'Number of buckets', min: 2, max: 32, step: 1, value: params.nBuckets,
    onInput: (v) => { params.nBuckets = v; rebuild(); render(); } });
  const methodSel = select({
    label: 'Collision handling',
    options: [
      { value: 'chaining', label: 'Chaining (linked list)' },
      { value: 'linear', label: 'Open addressing (linear probe)' },
    ],
    value: params.method,
    onChange: (v) => { params.method = v; rebuild(); render(); },
  });
  const presetB = button({ label: 'Insert 10 sample names', primary: true, onClick: () => {
    const names = ['Anna', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fitri', 'Gita', 'Hari', 'Indra', 'Joko'];
    for (const n of names) insertKey(n);
    render();
  } });
  const clearB = button({ label: 'Clear', onClick: () => { rebuild(); render(); } });
  ctrlPanel.append(nS.el, methodSel.el, row(presetB, clearB));

  return () => {};
}
