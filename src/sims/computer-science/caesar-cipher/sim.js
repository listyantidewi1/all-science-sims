import { slider, button, row } from '../../../lib/controls.js';

const ALPH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function shiftChar(c, k) {
  const upper = c.toUpperCase();
  const idx = ALPH.indexOf(upper);
  if (idx < 0) return c;
  const shifted = ALPH[(idx + k + 26 * 10) % 26];
  return c === upper ? shifted : shifted.toLowerCase();
}

function shiftStr(s, k) {
  let out = '';
  for (const c of s) out += shiftChar(c, k);
  return out;
}

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const state = { text: 'HELLO WORLD', shift: 3 };

  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'Plaintext';
  inputLabel.style.cssText = 'font-size:var(--type-sm);color:var(--color-muted);font-weight:600';
  stage.appendChild(inputLabel);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = state.text;
  input.spellcheck = false;
  input.style.cssText = 'width:100%;font-family:var(--font-mono);font-size:16px;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-2);color:var(--color-fg);margin:6px 0 var(--space-3);letter-spacing:2px';
  input.addEventListener('input', () => { state.text = input.value; render(); });
  stage.appendChild(input);

  const wheelWrap = document.createElement('div');
  wheelWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);margin-bottom:var(--space-3);text-align:center';
  stage.appendChild(wheelWrap);

  const cipherWrap = document.createElement('div');
  stage.appendChild(cipherWrap);

  const bruteWrap = document.createElement('div');
  bruteWrap.style.cssText = 'margin-top:var(--space-4);background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);max-height:300px;overflow:auto';
  stage.appendChild(bruteWrap);

  function render() {
    const cipher = shiftStr(state.text, state.shift);

    // Letter wheel: two rows of 26 with shift
    let wheel = `
      <div style="display:flex;justify-content:center;gap:1px;font-family:var(--font-mono);font-size:13px;flex-wrap:nowrap;overflow-x:auto">
        <div style="display:flex">
    `;
    for (let i = 0; i < 26; i++) {
      wheel += `<span style="display:inline-block;width:22px;text-align:center;padding:6px 0;background:#1e293b;color:#fff;border-radius:4px;margin-right:1px">${ALPH[i]}</span>`;
    }
    wheel += '</div></div>';
    wheel += `<div style="text-align:center;font-size:11px;color:var(--color-muted);margin:4px 0">↓ shift +${state.shift}</div>`;
    wheel += `<div style="display:flex;justify-content:center;gap:1px;font-family:var(--font-mono);font-size:13px;flex-wrap:nowrap;overflow-x:auto"><div style="display:flex">`;
    for (let i = 0; i < 26; i++) {
      const c = ALPH[(i + state.shift + 260) % 26];
      wheel += `<span style="display:inline-block;width:22px;text-align:center;padding:6px 0;background:#8b5cf6;color:#fff;border-radius:4px;margin-right:1px">${c}</span>`;
    }
    wheel += '</div></div>';
    wheelWrap.innerHTML = wheel;

    cipherWrap.innerHTML = `
      <label style="font-size:var(--type-sm);color:var(--color-muted);font-weight:600">Ciphertext</label>
      <div style="font-family:var(--font-mono);font-size:18px;padding:12px 14px;border:1px solid var(--color-border);border-radius:8px;background:#8b5cf6;color:white;margin-top:6px;letter-spacing:2px;word-break:break-all">${cipher}</div>
    `;

    // Brute force table
    let html = '<h3 style="margin:0 0 8px;font-size:var(--type-md)">All 25 shifts (brute force)</h3>';
    html += '<table style="width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:13px">';
    for (let k = 0; k <= 25; k++) {
      const cur = k === state.shift;
      html += `<tr style="${cur ? 'background:rgba(139,92,246,0.18)' : ''}">
        <td style="padding:3px 8px;color:var(--color-muted);width:60px">shift ${k}</td>
        <td style="padding:3px 8px;letter-spacing:1px">${shiftStr(state.text, k)}</td>
      </tr>`;
    }
    html += '</table>';
    bruteWrap.innerHTML = html;
  }

  // controls
  const shiftS = slider({
    label: 'Shift', min: -25, max: 25, step: 1, value: state.shift,
    onInput: (v) => { state.shift = v; render(); },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, k, txt] of [['ROT13', 13, null], ['Decrypt previous', -state.shift, null], ['Brutus quote', 3, 'ET TU BRUTE']]) {
    const b = button({ label: name, onClick: () => {
      state.shift = k;
      shiftS.value = k;
      if (txt) { state.text = txt; input.value = txt; }
      render();
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(shiftS.el, presetRow);

  render();
  return () => {};
}
