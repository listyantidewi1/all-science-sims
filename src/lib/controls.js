/**
 * Tiny DOM control builders. Each returns the wrapping element and exposes
 * a small API for reading/writing the value and listening to changes.
 *
 * Every control registers itself for deep links (see src/lib/params.js)
 * under `key` if given, otherwise a slug of its label — so a sim with a
 * "Length (m)" slider can be opened at `#/subject/sim?length-m=2`.
 */
import { registerParam } from './params.js';

export function slider({ label, key, min, max, step = 1, value, format = (v) => v, onInput }) {
  const wrap = document.createElement('div');
  wrap.className = 'ctrl';
  const lab = document.createElement('label');
  lab.textContent = label;
  const val = document.createElement('span');
  val.className = 'value';
  val.textContent = format(value);
  const input = document.createElement('input');
  input.type = 'range';
  input.min = min; input.max = max; input.step = step;
  input.value = value;
  input.setAttribute('aria-label', label);
  input.addEventListener('input', () => {
    const v = Number(input.value);
    val.textContent = format(v);
    onInput?.(v);
  });
  wrap.append(lab, val, input);
  const api = {
    el: wrap,
    get value() { return Number(input.value); },
    set value(v) { input.value = v; val.textContent = format(Number(v)); },
    /** Set the value AND notify the sim, as if the user moved the slider. */
    apply(v) {
      const n = Number(v);
      if (!Number.isFinite(n)) return;
      input.value = n;                         // the range input clamps to [min, max]
      const clamped = Number(input.value);
      val.textContent = format(clamped);
      onInput?.(clamped);
    },
  };
  registerParam(key ?? label, { get: () => api.value, set: (v) => api.apply(v), initial: Number(value) });
  return api;
}

export function toggle({ label, key, value = false, onChange }) {
  const wrap = document.createElement('label');
  wrap.className = 'toggle';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;
  input.addEventListener('change', () => onChange?.(input.checked));
  const span = document.createElement('span');
  span.textContent = label;
  wrap.append(input, span);
  const api = {
    el: wrap,
    get value() { return input.checked; },
    set value(v) { input.checked = v; },
    apply(v) {
      const on = v === true || v === 'true' || v === '1' || v === 'on' || v === 'yes';
      input.checked = on;
      onChange?.(on);
    },
  };
  registerParam(key ?? label, { get: () => (api.value ? 1 : 0), set: (v) => api.apply(v), initial: value ? 1 : 0 });
  return api;
}

export function button({ label, primary = false, onClick }) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn' + (primary ? ' btn--primary' : '');
  b.textContent = label;
  if (onClick) b.addEventListener('click', onClick);
  return {
    el: b,
    set label(v) { b.textContent = v; },
    get el2() { return b; },
  };
}

export function row(...items) {
  const r = document.createElement('div');
  r.className = 'ctrl-row';
  items.forEach((it) => r.appendChild(it.el ?? it));
  return r;
}

export function select({ label, key, options, value, onChange }) {
  const wrap = document.createElement('div');
  wrap.className = 'ctrl';
  const lab = document.createElement('label');
  lab.textContent = label;
  const sel = document.createElement('select');
  sel.className = 'btn';
  sel.style.gridColumn = '1 / -1';
  sel.setAttribute('aria-label', label);
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = opt.value;
    o.textContent = opt.label;
    if (opt.value === value) o.selected = true;
    sel.appendChild(o);
  }
  sel.addEventListener('change', () => onChange?.(sel.value));
  wrap.append(lab, document.createElement('span'), sel);
  const api = {
    el: wrap,
    get value() { return sel.value; },
    set value(v) { sel.value = v; },
    apply(v) {
      if (![...sel.options].some((o) => o.value === String(v))) return;
      sel.value = String(v);
      onChange?.(sel.value);
    },
  };
  registerParam(key ?? label, { get: () => api.value, set: (v) => api.apply(v), initial: String(value) });
  return api;
}
