/**
 * Tiny DOM control builders. Each returns the wrapping element and exposes
 * a small API for reading/writing the value and listening to changes.
 */

export function slider({ label, min, max, step = 1, value, format = (v) => v, onInput }) {
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
  return {
    el: wrap,
    get value() { return Number(input.value); },
    set value(v) { input.value = v; val.textContent = format(Number(v)); },
  };
}

export function toggle({ label, value = false, onChange }) {
  const wrap = document.createElement('label');
  wrap.className = 'toggle';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;
  input.addEventListener('change', () => onChange?.(input.checked));
  const span = document.createElement('span');
  span.textContent = label;
  wrap.append(input, span);
  return {
    el: wrap,
    get value() { return input.checked; },
    set value(v) { input.checked = v; },
  };
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

export function select({ label, options, value, onChange }) {
  const wrap = document.createElement('div');
  wrap.className = 'ctrl';
  const lab = document.createElement('label');
  lab.textContent = label;
  const sel = document.createElement('select');
  sel.className = 'btn';
  sel.style.gridColumn = '1 / -1';
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = opt.value;
    o.textContent = opt.label;
    if (opt.value === value) o.selected = true;
    sel.appendChild(o);
  }
  sel.addEventListener('change', () => onChange?.(sel.value));
  wrap.append(lab, document.createElement('span'), sel);
  return {
    el: wrap,
    get value() { return sel.value; },
    set value(v) { sel.value = v; },
  };
}
