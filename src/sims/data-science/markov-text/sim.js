import { slider, button, row } from '../../../lib/controls.js';

const SAMPLES = {
  shakespeare: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate.
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date.
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance, or nature's changing course, untrimm'd;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wand'rest in his shade,
When in eternal lines to time thou grow'st:
So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`,
  alice: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"
So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.`,
  pantun: `Berakit-rakit ke hulu, berenang-renang ke tepian.
Bersakit-sakit dahulu, bersenang-senang kemudian.
Asam di gunung, ikan di laut, dalam belanga bertemu jua.
Ada padang ada belalang, ada air ada pula ikannya.
Pisang emas dibawa berlayar, masak sebiji di atas peti.
Hutang emas dapat dibayar, hutang budi dibawa mati.`,
};

function buildChain(text, n) {
  const map = new Map();
  for (let i = 0; i + n < text.length; i++) {
    const key = text.slice(i, i + n);
    const next = text[i + n];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(next);
  }
  return map;
}

function generate(text, n, length) {
  const map = buildChain(text, n);
  if (map.size === 0) return '';
  const keys = [...map.keys()];
  let cur = keys[Math.floor(Math.random() * keys.length)];
  let out = cur;
  for (let i = 0; i < length; i++) {
    const opts = map.get(cur);
    if (!opts || opts.length === 0) {
      cur = keys[Math.floor(Math.random() * keys.length)];
      out += ' ' + cur;
      continue;
    }
    const next = opts[Math.floor(Math.random() * opts.length)];
    out += next;
    cur = (cur + next).slice(-n);
  }
  return out;
}

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const sourceLabel = document.createElement('label');
  sourceLabel.textContent = 'Source text';
  sourceLabel.style.cssText = 'font-size:var(--type-sm);color:var(--color-muted);font-weight:600';
  stage.appendChild(sourceLabel);

  const source = document.createElement('textarea');
  source.value = SAMPLES.shakespeare;
  source.style.cssText = 'width:100%;height:140px;font-family:var(--font-mono);font-size:13px;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-2);color:var(--color-fg);margin:6px 0 var(--space-3);resize:vertical';
  stage.appendChild(source);

  const outLabel = document.createElement('label');
  outLabel.textContent = 'Generated text';
  outLabel.style.cssText = 'font-size:var(--type-sm);color:var(--color-muted);font-weight:600';
  stage.appendChild(outLabel);

  const out = document.createElement('div');
  out.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);min-height:160px;font-family:var(--font-mono);font-size:13px;white-space:pre-wrap;margin-top:6px';
  stage.appendChild(out);

  const params = { n: 4, length: 600 };

  function regenerate() {
    out.textContent = generate(source.value, params.n, params.length);
  }
  regenerate();

  // controls
  const nS = slider({ label: 'n-gram size', min: 1, max: 8, step: 1, value: params.n,
    onInput: (v) => { params.n = v; regenerate(); } });
  const lenS = slider({ label: 'Output length (chars)', min: 100, max: 2000, step: 50, value: params.length,
    onInput: (v) => { params.length = v; } });
  const genB = button({ label: 'Generate', primary: true, onClick: regenerate });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, key] of [['Shakespeare', 'shakespeare'], ['Alice', 'alice'], ['Pantun (ID)', 'pantun']]) {
    const b = button({ label: name, onClick: () => { source.value = SAMPLES[key]; regenerate(); } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(nS.el, lenS.el, row(genB), presetRow);

  return () => {};
}
