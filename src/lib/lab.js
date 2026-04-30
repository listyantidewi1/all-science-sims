/**
 * labPanel — a "virtual lab" panel for any sim.
 *
 * Drop it into a sim's controls panel and it provides:
 *   - optional procedure (numbered, check-off-able)
 *   - optional prediction prompt + free-text response
 *   - data table (records measurements as rows)
 *   - Record / Clear / Export-CSV buttons
 *
 *   const lab = labPanel({
 *     title: 'Pendulum lab',
 *     filename: 'pendulum-data.csv',
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
 */
export function labPanel(opts) {
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
    for (const step of opts.procedure) {
      const li = document.createElement('li');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      const span = document.createElement('span');
      span.textContent = step;
      cb.addEventListener('change', () => {
        li.classList.toggle('done', cb.checked);
      });
      li.append(cb, span);
      ol.appendChild(li);
    }
    proc.appendChild(ol);
    wrap.appendChild(proc);
  }

  // Prediction
  if (opts.predict) {
    const det = document.createElement('details');
    det.className = 'lab-section';
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

  // Empty-state row
  let rows = [];
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
      delBtn.addEventListener('click', () => { rows.splice(i, 1); renderRows(); });
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
    const r = opts.source();
    if (r) { rows.push(r); renderRows(); }
  });

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'btn';
  clearBtn.textContent = 'Clear data';
  clearBtn.addEventListener('click', () => { rows = []; renderRows(); });

  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.className = 'btn';
  exportBtn.textContent = '↓ CSV';
  exportBtn.addEventListener('click', exportCSV);

  btnRow.append(recordBtn, clearBtn, exportBtn);
  wrap.appendChild(btnRow);

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
      const r = opts.source();
      if (r) { rows.push(r); renderRows(); }
    },
    clear() { rows = []; renderRows(); },
    getRows() { return rows.slice(); },
    setRows(next) { rows = next.slice(); renderRows(); },
  };
}
