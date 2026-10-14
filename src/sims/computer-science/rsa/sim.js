import { slider, select, button, row } from '../../../lib/controls.js';

function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }

function modInverse(e, phi) {
  // Extended Euclidean
  let [a, b, x0, x1] = [phi, e, 0, 1];
  while (b > 0) {
    const q = Math.floor(a / b);
    [a, b] = [b, a - q * b];
    [x0, x1] = [x1, x0 - q * x1];
  }
  return a === 1 ? ((x0 % phi) + phi) % phi : null;
}

function modPow(base, exp, mod) {
  // BigInt for safety with toy RSA
  base = BigInt(base) % BigInt(mod);
  let result = 1n;
  let e = BigInt(exp);
  const m = BigInt(mod);
  while (e > 0n) {
    if (e & 1n) result = (result * base) % m;
    e >>= 1n;
    base = (base * base) % m;
  }
  return Number(result);
}

const SMALL_PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const display = document.createElement('div');
  display.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-4);font-family:var(--font-mono);font-size:13px';
  stage.appendChild(display);

  const params = { p: 11, q: 13, message: 42, e: 7 };
  let note = ''; // transient message shown when a prime choice had to be adjusted

  // RSA needs two *distinct* primes: with p = q, φ(n) = (p−1)(q−1) is wrong and
  // decryption breaks. Return the next prime in the list that differs from `avoid`.
  function nextPrimeAvoiding(current, avoid) {
    const i = SMALL_PRIMES.indexOf(current);
    for (let k = 1; k <= SMALL_PRIMES.length; k++) {
      const cand = SMALL_PRIMES[(i + k) % SMALL_PRIMES.length];
      if (cand !== avoid) return cand;
    }
    return current;
  }

  function pickValidE(phi) {
    for (let e = 3; e < phi; e += 2) {
      if (gcd(e, phi) === 1) return e;
    }
    return 3;
  }

  function compute() {
    const p = params.p, q = params.q;
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = params.e;
    if (gcd(e, phi) !== 1) e = pickValidE(phi);
    const d = modInverse(e, phi);
    const tooBig = params.message >= n; // RSA only works for messages m < n
    const m = params.message % n;
    const c = modPow(m, e, n);
    const decrypted = d != null ? modPow(c, d, n) : null;
    return { p, q, n, phi, e, d, m, c, decrypted, tooBig, original: params.message };
  }

  function render() {
    const r = compute();
    const ok = r.decrypted === r.m;
    const warnings = [];
    if (note) warnings.push(note);
    if (r.tooBig) warnings.push(`⚠ Message m = ${r.original} is not smaller than n = ${r.n}. RSA can only encrypt m &lt; n, so the sim encrypts m mod n = ${r.m} instead and that is what comes back — choose a smaller message or larger primes.`);
    const warnHTML = warnings.map((w) => `<div style="margin-top:var(--space-3);padding:8px 10px;border-radius:8px;background:rgba(245,158,11,0.15);border:1px solid #f59e0b;color:#f59e0b;font-size:12px;font-family:var(--font-sans)">${w}</div>`).join('');
    display.innerHTML = `
      <h3 style="margin:0 0 var(--space-3);font-size:var(--type-md);font-family:var(--font-sans)">Step-by-step RSA</h3>
      <div style="display:grid;grid-template-columns:200px 1fr;gap:8px 16px;line-height:1.6">
        <div style="color:var(--color-muted)">p, q (primes)</div>
        <div style="color:#0ea5e9;font-weight:700">${r.p}, ${r.q}</div>
        <div style="color:var(--color-muted)">n = p × q</div>
        <div>${r.n}  <span style="color:var(--color-muted);font-size:11px">(public modulus)</span></div>
        <div style="color:var(--color-muted)">φ(n) = (p−1)(q−1)</div>
        <div>${r.phi}  <span style="color:var(--color-muted);font-size:11px">(secret — derived from p,q)</span></div>
        <div style="color:var(--color-muted)">e (public exponent)</div>
        <div style="color:#0ea5e9;font-weight:700">${r.e}  <span style="color:var(--color-muted);font-size:11px">(coprime with φ)</span></div>
        <div style="color:var(--color-muted)">d = e⁻¹ mod φ(n)</div>
        <div style="color:#ec4899;font-weight:700">${r.d ?? '(no inverse)'}  <span style="color:var(--color-muted);font-size:11px">(secret)</span></div>
      </div>

      <div style="background:#0b1220;border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);margin-top:var(--space-4)">
        <div style="margin-bottom:8px"><strong>Encrypt</strong>: c = m^e mod n</div>
        <div style="font-size:14px;color:var(--color-fg)">${r.m}<sup>${r.e}</sup> mod ${r.n} = <strong style="color:#0ea5e9">${r.c}</strong></div>
      </div>

      <div style="background:#0b1220;border:1px solid var(--color-border);border-radius:8px;padding:var(--space-3);margin-top:var(--space-3)">
        <div style="margin-bottom:8px"><strong>Decrypt</strong>: m = c^d mod n</div>
        <div style="font-size:14px;color:var(--color-fg)">${r.c}<sup>${r.d}</sup> mod ${r.n} = <strong style="color:${ok ? '#10b981' : '#ef4444'}">${r.decrypted ?? '?'}</strong></div>
        <div style="margin-top:8px;font-size:12px;color:${ok ? '#10b981' : '#ef4444'}">${ok ? (r.tooBig ? '✓ Recovered m mod n, not the original message' : '✓ Recovered original message') : '✗ Decryption failed (try a different e)'}</div>
      </div>
      ${warnHTML}
    `;
  }
  render();

  // controls
  const pSel = select({
    label: 'Prime p',
    options: SMALL_PRIMES.map((x) => ({ value: String(x), label: String(x) })),
    value: String(params.p),
    onChange: (v) => {
      params.p = Number(v);
      note = '';
      if (params.p === params.q) {
        params.q = nextPrimeAvoiding(params.q, params.p);
        qSel.value = String(params.q);
        note = `⚠ p and q must be different primes (with p = q, φ(n) = (p−1)(q−1) no longer holds and decryption breaks). q was moved to ${params.q}.`;
      }
      render();
    },
  });
  const qSel = select({
    label: 'Prime q',
    options: SMALL_PRIMES.map((x) => ({ value: String(x), label: String(x) })),
    value: String(params.q),
    onChange: (v) => {
      params.q = Number(v);
      note = '';
      if (params.q === params.p) {
        params.p = nextPrimeAvoiding(params.p, params.q);
        pSel.value = String(params.p);
        note = `⚠ p and q must be different primes (with p = q, φ(n) = (p−1)(q−1) no longer holds and decryption breaks). p was moved to ${params.p}.`;
      }
      render();
    },
  });
  const mS = slider({ label: 'Message m', min: 1, max: 200, step: 1, value: params.message,
    onInput: (v) => { params.message = v; note = ''; render(); } });
  const eS = slider({ label: 'e (public exponent)', min: 3, max: 50, step: 2, value: params.e,
    onInput: (v) => { params.e = v; note = ''; render(); } });
  ctrlPanel.append(pSel.el, qSel.el, mS.el, eS.el);

  return () => {};
}
