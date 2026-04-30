import { get as storeGet, set as storeSet } from './store.js';

/**
 * labPanel — a "virtual lab" panel for any sim.
 *
 * Drop it into a sim's controls panel and it provides:
 *   - optional procedure (numbered, check-off-able)
 *   - optional prediction prompt + free-text response
 *   - data table (records measurements as rows)
 *   - Record / Clear / Export-CSV buttons
 *   - auto-save to localStorage so accidental nav away doesn't lose data
 *
 *   const lab = labPanel({
 *     title: 'Pendulum lab',
 *     filename: 'pendulum-data.csv',  // also used as the storage key
 *     columns: [
 *       { key: 'L', label: 'Length (m)', format: (v) => v.toFixed(2) },
 *       { key: 'T', label: 'Period (s)', format: (v) => v.toFixed(3) },
 *     ],
 *     procedure: ['Set L=0.5 m, run, record T', 'Repeat at L=1.0 m', ...],
 *     predict: 'Do you expect T to grow with L? Linearly? T ∝ √L?',
 *     source: () => ({ L: params.L, T: state.measuredT }),
 *   });
 *   ctrlPanel.appendChild(lab.el);
 *   // optional: lab.record() to push a row programmatically
 *
 * The sim is responsible for providing the `source` function. The panel
 * calls source() when "Record" is clicked and adds a row.
 *
 * Persistence: rows, prediction text, and procedure checkbox states are
 * auto-saved to localStorage under `lab.<filename>`. Clear data wipes it.
 */
export function labPanel(opts) {
  const storageKey = opts.filename ? `lab.${opts.filename}` : null;
  const persisted = storageKey ? (storeGet(storageKey, null) || {}) : {};

  // State (loaded from localStorage when available)
  let rows = Array.isArray(persisted.rows) ? persisted.rows : [];
  let predictText = typeof persisted.predict === 'string' ? persisted.predict : '';
  const procLen = (opts.procedure && opts.procedure.length) || 0;
  let checks = Array.isArray(persisted.checks) && persisted.checks.length === procLen
    ? persisted.checks.slice()
    : new Array(procLen).fill(false);
  const hadRestoredData = rows.length > 0 || predictText.length > 0 || checks.some(Boolean);

  const savePersisted = () => {
    if (!storageKey) return;
    storeSet(storageKey, { rows, predict: predictText, checks });
  };

  const wrap = document.createElement('div');
  wrap.className = 'lab-panel';

  const title = document.createElement('h4');
  title.className = 'lab-panel__title';
  title.textContent = opts.title || 'Lab';
  wrap.appendChild(title);

  // Procedure
  if (opts.procedure && opts.procedure.length) {
    const proc = document.createElement('details');
    proc.className = 'lab-section';
    proc.open = true;
    const summary = document.createElement('summary');
    summary.textContent = `Procedure (${opts.procedure.length} steps)`;
    proc.appendChild(summary);
    const ol = document.createElement('ol');
    ol.className = 'lab-procedure';
    opts.procedure.forEach((step, i) => {
      const li = document.createElement('li');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!checks[i];
      if (cb.checked) li.classList.add('done');
      const span = document.createElement('span');
      span.textContent = step;
      cb.addEventListener('change', () => {
        li.classList.toggle('done', cb.checked);
        checks[i] = cb.checked;
        savePersisted();
      });
      li.append(cb, span);
      ol.appendChild(li);
    });
    proc.appendChild(ol);
    wrap.appendChild(proc);
  }

  // Prediction
  if (opts.predict) {
    const det = document.createElement('details');
    det.className = 'lab-section';
    if (predictText) det.open = true;
    const summary = document.createElement('summary');
    summary.textContent = 'Prediction';
    det.appendChild(summary);
    const p = document.createElement('p');
    p.className = 'lab-predict';
    p.textContent = opts.predict;
    det.appendChild(p);
    const ta = document.createElement('textarea');
    ta.rows = 2;
    ta.placeholder = 'Type your prediction before measuring…';
    ta.className = 'lab-predict-input';
    ta.value = predictText;
    ta.addEventListener('input', () => {
      predictText = ta.value;
      savePersisted();
    });
    det.appendChild(ta);
    wrap.appendChild(det);
  }

  // Data table
  const tableWrap = document.createElement('div');
  tableWrap.className = 'lab-table-wrap';
  const table = document.createElement('table');
  table.className = 'lab-table';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const thNum = document.createElement('th'); thNum.textContent = '#';
  headRow.appendChild(thNum);
  for (const col of opts.columns) {
    const th = document.createElement('th');
    th.textContent = col.label;
    headRow.appendChild(th);
  }
  const thDel = document.createElement('th'); thDel.textContent = '';
  headRow.appendChild(thDel);
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);

  function renderRows() {
    tbody.innerHTML = '';
    if (rows.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = opts.columns.length + 2;
      td.className = 'lab-empty';
      td.textContent = 'No measurements yet. Adjust the sim, then click "Record".';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }
    for (let i = 0; i < rows.length; i++) {
      const tr = document.createElement('tr');
      const numTd = document.createElement('td');
      numTd.className = 'lab-num';
      numTd.textContent = i + 1;
      tr.appendChild(numTd);
      for (const col of opts.columns) {
        const td = document.createElement('td');
        const v = rows[i][col.key];
        td.textContent = (col.format && v != null) ? col.format(v) : (v == null ? '–' : String(v));
        tr.appendChild(td);
      }
      const delTd = document.createElement('td');
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'lab-del';
      delBtn.title = 'Delete row';
      delBtn.textContent = '×';
      delBtn.addEventListener('click', () => { rows.splice(i, 1); renderRows(); savePersisted(); });
      delTd.appendChild(delBtn);
      tr.appendChild(delTd);
      tbody.appendChild(tr);
    }
  }
  renderRows();

  // Buttons
  const btnRow = document.createElement('div');
  btnRow.className = 'ctrl-row lab-buttons';

  const recordBtn = document.createElement('button');
  recordBtn.type = 'button';
  recordBtn.className = 'btn btn--primary';
  recordBtn.textContent = '+ Record measurement';
  recordBtn.addEventListener('click', () => {
    if (!opts.source) return;
    let r;
    try {
      r = opts.source();
    } catch (err) {
      console.error('Lab source() threw:', err);
      flashRecordError(err.message || String(err));
      return;
    }
    if (r) { rows.push(r); renderRows(); savePersisted(); }
  });

  function flashRecordError(msg) {
    recordBtn.dataset.origText = recordBtn.dataset.origText || recordBtn.textContent;
    recordBtn.textContent = `! ${msg.slice(0, 40)}`;
    recordBtn.classList.add('btn--error');
    clearTimeout(flashRecordError._t);
    flashRecordError._t = setTimeout(() => {
      recordBtn.textContent = recordBtn.dataset.origText;
      recordBtn.classList.remove('btn--error');
    }, 2400);
  }

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'btn';
  clearBtn.textContent = 'Clear data';
  clearBtn.addEventListener('click', () => { rows = []; renderRows(); savePersisted(); });

  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.className = 'btn';
  exportBtn.textContent = '↓ CSV';
  exportBtn.addEventListener('click', exportCSV);

  btnRow.append(recordBtn, clearBtn, exportBtn);
  wrap.appendChild(btnRow);

  if (storageKey) {
    const hint = document.createElement('div');
    hint.className = 'lab-saved-hint';
    hint.title = 'Measurements, prediction, and procedure progress are saved on this device. Click "Clear data" to wipe.';
    hint.innerHTML = hadRestoredData
      ? '<span aria-hidden="true">💾</span> Restored from your previous session — auto-saved on this device.'
      : '<span aria-hidden="true">💾</span> Auto-saved on this device.';
    wrap.appendChild(hint);
  }

  function exportCSV() {
    if (rows.length === 0) return;
    const headers = ['#', ...opts.columns.map((c) => c.label)];
    const lines = [headers.map(csvCell).join(',')];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const row = [i + 1, ...opts.columns.map((c) => r[c.key])];
      lines.push(row.map(csvCell).join(','));
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = opts.filename || 'lab-data.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  function csvCell(v) {
    if (v == null) return '';
    const s = typeof v === 'number' ? String(v) : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }

  return {
    el: wrap,
    record() {
      if (!opts.source) return;
      let r;
      try { r = opts.source(); } catch (err) { console.error('Lab source() threw:', err); return; }
      if (r) { rows.push(r); renderRows(); savePersisted(); }
    },
    clear() { rows = []; renderRows(); savePersisted(); },
    getRows() { return rows.slice(); },
    setRows(next) { rows = next.slice(); renderRows(); savePersisted(); },
    hadRestoredData,
  };
}
