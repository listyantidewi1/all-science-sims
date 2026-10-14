import { slider, button, row } from '../../../lib/controls.js';
import { getLocale } from '../../../i18n/index.js';

// Ground-state exceptions to the strict diagonal rule within Z <= 36:
// value = the configuration the strict rule would have given.
const EXCEPTIONS = { 24: '4s² 3d⁴', 29: '4s² 3d⁹' };

// Aufbau order up to ~36
const ORBITAL_ORDER = [
  { name: '1s', cap: 2, n: 1, l: 0 },
  { name: '2s', cap: 2, n: 2, l: 0 },
  { name: '2p', cap: 6, n: 2, l: 1 },
  { name: '3s', cap: 2, n: 3, l: 0 },
  { name: '3p', cap: 6, n: 3, l: 1 },
  { name: '4s', cap: 2, n: 4, l: 0 },
  { name: '3d', cap: 10, n: 3, l: 2 },
  { name: '4p', cap: 6, n: 4, l: 1 },
];

const ELEMENTS = [
  null, 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
  'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
  'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
  'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr',
];

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const display = document.createElement('div');
  display.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-4)';
  stage.appendChild(display);

  const state = { Z: 11 };

  function fillOrbitals(Z) {
    // Returns array of {orbital, fills: [up, dn] per box}
    const result = ORBITAL_ORDER.map((o) => {
      const boxes = o.cap / 2;
      const fills = Array.from({ length: boxes }, () => ({ up: false, down: false }));
      return { ...o, fills };
    });
    let remaining = Z;
    for (const orb of result) {
      // Hund: fill all up first, then pair
      const boxes = orb.fills.length;
      for (let i = 0; i < boxes && remaining > 0; i++) {
        orb.fills[i].up = true; remaining--;
      }
      for (let i = 0; i < boxes && remaining > 0; i++) {
        orb.fills[i].down = true; remaining--;
      }
      if (remaining === 0) break;
    }
    // Ground-state exceptions: Cr and Cu promote one 4s electron into 3d
    // (half-filled / filled d subshell): [Ar] 4s¹ 3d⁵ and [Ar] 4s¹ 3d¹⁰.
    if (EXCEPTIONS[Z]) {
      const s4 = result.find((o) => o.name === '4s');
      const d3 = result.find((o) => o.name === '3d');
      s4.fills[0].down = false;
      const empty = d3.fills.find((b) => !b.up) || d3.fills.find((b) => !b.down);
      if (empty) { if (!empty.up) empty.up = true; else empty.down = true; }
    }
    return result;
  }

  function configString(Z) {
    const orbs = fillOrbitals(Z);
    return orbs.filter((o) => o.fills.some((b) => b.up || b.down))
      .map((o) => {
        const count = o.fills.reduce((s, b) => s + (b.up ? 1 : 0) + (b.down ? 1 : 0), 0);
        return `${o.name}${count === 1 ? '¹' : count === 2 ? '²' : count === 3 ? '³' : count === 4 ? '⁴' : count === 5 ? '⁵' : count === 6 ? '⁶' : count === 7 ? '⁷' : count === 8 ? '⁸' : count === 9 ? '⁹' : count === 10 ? '¹⁰' : '?'}`;
      })
      .join(' ');
  }

  function render() {
    const orbs = fillOrbitals(state.Z);
    let html = '';
    html += `<h3 style="margin:0 0 var(--space-3);font-size:var(--type-md)">${ELEMENTS[state.Z] || '?'} (Z=${state.Z})</h3>`;
    html += `<div style="font-family:var(--font-mono);font-size:14px;margin-bottom:var(--space-4);color:var(--color-accent)">${configString(state.Z)}</div>`;
    if (EXCEPTIONS[state.Z]) {
      const note = getLocale() === 'id'
        ? `Pengecualian: aturan diagonal memprediksi ${EXCEPTIONS[state.Z]}, tetapi subkulit 3d yang ${state.Z === 24 ? 'setengah penuh' : 'penuh'} lebih stabil, sehingga satu elektron 4s pindah ke 3d.`
        : `Exception: the diagonal rule predicts ${EXCEPTIONS[state.Z]}, but a ${state.Z === 24 ? 'half-filled' : 'filled'} 3d subshell is more stable, so one 4s electron moves into 3d.`;
      html += `<div style="font-size:12px;margin:calc(-1 * var(--space-3)) 0 var(--space-4);color:var(--color-muted)">${note}</div>`;
    }

    // Orbital diagram
    html += '<div style="display:flex;flex-wrap:wrap;gap:var(--space-3);align-items:flex-end">';
    for (const orb of orbs) {
      const inUse = orb.fills.some((b) => b.up || b.down);
      if (!inUse) continue;
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:6px">';
      html += '<div style="display:flex;gap:2px">';
      for (const box of orb.fills) {
        html += `<div style="
          width: 28px; height: 36px; border: 1.5px solid var(--color-border);
          border-radius: 4px; background: var(--color-surface);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          line-height: 1; font-size: 18px;
        ">`;
        html += `<span style="color:${box.up ? '#10b981' : 'transparent'};margin-bottom:-4px">↑</span>`;
        html += `<span style="color:${box.down ? '#ef4444' : 'transparent'};margin-top:-4px">↓</span>`;
        html += '</div>';
      }
      html += '</div>';
      html += `<div style="font-family:var(--font-mono);font-size:12px;color:var(--color-muted)">${orb.name}</div>`;
      html += '</div>';
    }
    html += '</div>';

    display.innerHTML = html;
  }

  // controls
  const zS = slider({
    label: 'Atomic number Z', min: 1, max: 36, step: 1, value: state.Z,
    onInput: (v) => { state.Z = v; render(); },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, z] of [['H', 1], ['C', 6], ['N', 7], ['O', 8], ['Ne', 10], ['Na', 11], ['Fe', 26], ['Cu', 29], ['Br', 35]]) {
    const b = button({ label: name, onClick: () => { state.Z = z; zS.value = z; render(); } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(zS.el, presetRow);

  render();
  return () => {};
}
