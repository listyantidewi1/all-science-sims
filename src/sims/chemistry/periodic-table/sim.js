import { ELEMENTS, CATEGORY_COLORS, CATEGORY_LABELS, STATE_COLORS } from './elements.js';
import { select } from '../../../lib/controls.js';

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-3)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const state = { colorBy: 'category', selected: null };

  const tableWrap = document.createElement('div');
  tableWrap.style.cssText = `
    display: grid;
    grid-template-columns: repeat(18, minmax(0, 1fr));
    grid-auto-rows: 1fr;
    gap: 3px;
    aspect-ratio: 18 / 10;
    width: 100%;
    margin-bottom: var(--space-4);
  `;
  stage.appendChild(tableWrap);

  const detail = document.createElement('div');
  detail.style.cssText = `
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2);
    padding: var(--space-3);
    min-height: 80px;
  `;
  stage.appendChild(detail);

  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:var(--space-3)';
  stage.appendChild(legend);

  function colorFor(el) {
    if (state.colorBy === 'state') return STATE_COLORS[el.st] || '#94a3b8';
    if (state.colorBy === 'period') {
      const periodColors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];
      const period = el.row >= 9 ? (el.row === 9 ? 6 : 7) : el.row;
      return periodColors[period - 1] || '#94a3b8';
    }
    return CATEGORY_COLORS[el.cat] || '#94a3b8';
  }

  function renderTable() {
    tableWrap.innerHTML = '';
    for (const el of ELEMENTS) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.style.cssText = `
        grid-column: ${el.col};
        grid-row: ${el.row};
        background: ${colorFor(el)};
        color: white;
        border: 0;
        border-radius: 4px;
        padding: 2px;
        cursor: pointer;
        font-family: var(--font-sans);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;
        min-height: 0;
        font-size: clamp(8px, 1vw, 12px);
        transition: transform 80ms ease;
      `;
      cell.innerHTML = `
        <span style="font-size:0.7em;opacity:0.8">${el.z}</span>
        <span style="font-weight:800;font-size:1.4em">${el.sym}</span>
      `;
      cell.title = `${el.name} (${el.sym}, Z=${el.z})`;
      cell.addEventListener('mouseenter', () => showDetail(el));
      cell.addEventListener('focus', () => showDetail(el));
      cell.addEventListener('click', () => {
        state.selected = el;
        showDetail(el);
        cell.style.outline = '2px solid var(--color-fg)';
      });
      tableWrap.appendChild(cell);
    }
  }

  function showDetail(el) {
    detail.innerHTML = `
      <div style="display:flex;align-items:center;gap:var(--space-3)">
        <div style="
          width:60px;height:60px;background:${colorFor(el)};color:white;border-radius:8px;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          font-weight:800;font-size:24px;line-height:1
        ">
          <div style="font-size:11px;opacity:0.9">${el.z}</div>
          <div>${el.sym}</div>
        </div>
        <div>
          <div style="font-size:var(--type-lg);font-weight:700">${el.name}</div>
          <div style="color:var(--color-muted);font-size:var(--type-sm)">
            Mass: ${el.mass}  ·  ${CATEGORY_LABELS[el.cat]}  ·  State: ${el.st}
          </div>
        </div>
      </div>
    `;
  }

  function renderLegend() {
    legend.innerHTML = '';
    let entries;
    if (state.colorBy === 'category') {
      entries = Object.entries(CATEGORY_LABELS).map(([k, label]) => [CATEGORY_COLORS[k], label]);
    } else if (state.colorBy === 'state') {
      entries = Object.entries(STATE_COLORS).map(([k, c]) => [c, k]);
    } else {
      entries = ['1','2','3','4','5','6','7'].map((p, i) => {
        const periodColors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];
        return [periodColors[i], `Period ${p}`];
      });
    }
    for (const [color, label] of entries) {
      const tag = document.createElement('span');
      tag.style.cssText = `
        display:inline-flex;align-items:center;gap:6px;
        font-size:var(--type-xs);color:var(--color-muted)
      `;
      tag.innerHTML = `<span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${color}"></span>${label}`;
      legend.appendChild(tag);
    }
  }

  const sel = select({
    label: 'Color by',
    options: [
      { value: 'category', label: 'Category' },
      { value: 'state',    label: 'State at 25°C' },
      { value: 'period',   label: 'Period' },
    ],
    value: state.colorBy,
    onChange: (v) => { state.colorBy = v; renderTable(); renderLegend(); },
  });
  ctrlPanel.appendChild(sel.el);

  renderTable();
  renderLegend();
  showDetail(ELEMENTS[0]);

  return () => {};
}
