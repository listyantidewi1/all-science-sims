export const subjectColor = (subject) => `var(--subj-${subject})`;

export function cssVar(name, fallback = '#3b82f6') {
  if (typeof document === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function hsl(h, s, l, a = 1) {
  return `hsl(${h} ${s}% ${l}% / ${a})`;
}

export function lerpColor(c1, c2, t) {
  const a = parseRGB(c1), b = parseRGB(c2);
  const m = (k) => Math.round(a[k] + (b[k] - a[k]) * t);
  return `rgb(${m(0)}, ${m(1)}, ${m(2)})`;
}

function parseRGB(s) {
  if (s.startsWith('#')) {
    const n = s.slice(1);
    const f = n.length === 3
      ? n.split('').map((c) => parseInt(c + c, 16))
      : [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
    return f;
  }
  const m = s.match(/\d+(\.\d+)?/g) || [0, 0, 0];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}
