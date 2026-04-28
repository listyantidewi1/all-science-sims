import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const display = document.createElement('div');
  display.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-4);font-family:var(--font-mono)';
  stage.appendChild(display);

  // Both matrices fixed at 3x3 for simplicity
  const params = {
    A: [[1, 2, 0], [0, 1, 0], [3, 0, 1]],
    B: [[2, 0, 1], [0, 2, 0], [0, 1, 1]],
    highlight: { i: -1, j: -1 },
  };

  function compute() {
    const C = [[0,0,0],[0,0,0],[0,0,0]];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          C[i][j] += params.A[i][k] * params.B[k][j];
        }
      }
    }
    return C;
  }

  function render() {
    const C = compute();
    function mat(name, M, opts = {}) {
      let html = `<div style="display:inline-block;vertical-align:middle;margin:0 12px;text-align:center">`;
      html += `<div style="color:var(--color-muted);font-size:11px;margin-bottom:4px">${name}</div>`;
      html += `<table style="border-collapse:separate;border-spacing:4px">`;
      for (let i = 0; i < M.length; i++) {
        html += '<tr>';
        for (let j = 0; j < M[i].length; j++) {
          let bg = 'var(--color-surface)';
          if (opts.editable) {
            bg = 'var(--color-surface)';
          }
          if (opts.highlightRow === i) bg = 'rgba(14,165,233,0.4)';
          if (opts.highlightCol === j) bg = 'rgba(236,72,153,0.4)';
          if (opts.highlightCell && opts.highlightCell.i === i && opts.highlightCell.j === j) bg = 'rgba(251,191,36,0.5)';
          if (opts.editable) {
            html += `<td style="padding:0"><input data-mat="${opts.editable}" data-i="${i}" data-j="${j}" type="number" step="1" value="${M[i][j]}" style="
              width: 50px; padding: 8px; text-align: center; font-family: var(--font-mono); font-size: 14px;
              border: 1px solid var(--color-border); border-radius: 4px;
              background: ${bg}; color: var(--color-fg);
            "></td>`;
          } else {
            html += `<td style="
              width: 50px; padding: 10px; text-align: center; font-family: var(--font-mono); font-size: 14px;
              border: 1px solid var(--color-border); border-radius: 4px;
              background: ${bg}; color: var(--color-fg); cursor: pointer;
            " data-out-i="${i}" data-out-j="${j}">${M[i][j]}</td>`;
          }
        }
        html += '</tr>';
      }
      html += `</table></div>`;
      return html;
    }

    const hi = params.highlight.i, hj = params.highlight.j;
    let html = '<div style="text-align:center">';
    html += mat('A', params.A, { editable: 'A', highlightRow: hi >= 0 ? hi : undefined });
    html += `<span style="font-size:24px;margin:0 4px">×</span>`;
    html += mat('B', params.B, { editable: 'B', highlightCol: hj >= 0 ? hj : undefined });
    html += `<span style="font-size:24px;margin:0 4px">=</span>`;
    html += mat('C', C, { highlightCell: hi >= 0 ? { i: hi, j: hj } : null });
    html += '</div>';

    if (hi >= 0) {
      const terms = [];
      for (let k = 0; k < 3; k++) {
        terms.push(`${params.A[hi][k]}·${params.B[k][hj]}`);
      }
      html += `<div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-surface);border-radius:8px;text-align:center">`;
      html += `<div style="color:var(--color-muted);font-size:11px;margin-bottom:6px">C[${hi}][${hj}] = (row ${hi} of A) · (column ${hj} of B)</div>`;
      html += `<div style="font-size:16px">${terms.join(' + ')} = <strong style="color:#fbbf24">${C[hi][hj]}</strong></div>`;
      html += `</div>`;
    } else {
      html += `<div style="margin-top:var(--space-4);text-align:center;color:var(--color-muted);font-size:12px;font-family:var(--font-sans)">Click a cell of C to see how it's computed.</div>`;
    }

    display.innerHTML = html;

    // Hook up handlers
    display.querySelectorAll('input[data-mat]').forEach((el) => {
      el.addEventListener('input', () => {
        const m = el.dataset.mat;
        const i = Number(el.dataset.i);
        const j = Number(el.dataset.j);
        params[m][i][j] = Number(el.value) || 0;
        render();
      });
    });
    display.querySelectorAll('td[data-out-i]').forEach((el) => {
      el.addEventListener('click', () => {
        params.highlight = { i: Number(el.dataset.outI), j: Number(el.dataset.outJ) };
        render();
      });
    });
  }
  render();

  // controls
  const idB = button({ label: 'A = identity', primary: true, onClick: () => {
    params.A = [[1,0,0],[0,1,0],[0,0,1]]; render();
  } });
  const id2B = button({ label: 'B = identity', onClick: () => {
    params.B = [[1,0,0],[0,1,0],[0,0,1]]; render();
  } });
  const rotB = button({ label: 'A = 90° rotation (2D)', onClick: () => {
    params.A = [[0,-1,0],[1,0,0],[0,0,1]]; render();
  } });
  const randB = button({ label: 'Randomize both', onClick: () => {
    params.A = params.A.map(() => Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) - 2));
    params.B = params.B.map(() => Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) - 2));
    render();
  } });
  ctrlPanel.append(row(idB, id2B), row(rotB, randB));

  return () => {};
}
