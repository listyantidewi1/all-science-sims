/**
 * Code editor / viewer and console panels for the programming sims.
 *
 *   import { codePanel, consolePanel, highlight } from '../../../lib/codepanel.js';
 *
 *   const cp = codePanel({ value: src, language: 'python', editable: true, minLines: 8, maxLines: 22,
 *                          ariaLabel: 'Python code', onChange(src) {} });
 *   host.appendChild(cp.el);
 *   cp.value = '...'; cp.setActiveLine(3); cp.setMarks([{ line: 3, kind: 'error', note: 'NameError' }]);
 *
 *   cp.title = 'pseudocode';   // header text (adds the header when the panel had no title); cp.actions = its button slot
 *
 *   const out = consolePanel({ minLines: 4, maxLines: 12, ariaLabel: 'Output' });
 *   out.append('Hello\n'); out.appendInput('12\n'); out.appendError(traceback);
 *   out.set(run.output, { error: run.snapshot().error?.traceback, keepPrompt: true });   // see set() for prompts
 *
 * The editor is a transparent <textarea> laid exactly over a highlighted <pre>.
 * Both live in ONE scroll container (with a sticky line-number gutter), so they
 * can never drift apart: that is the "scroll sync". Every token is drawn in the
 * same font, weight and style as the textarea text, so the caret always sits
 * on the glyph it belongs to (also for fallback glyphs such as ← or ×).
 *
 * No dependencies. Styles are injected once (a <style id="cp-styles"> tag,
 * every class prefixed `cp-`). The panel has no intrinsic width
 * (`contain: inline-size`), so a long code line scrolls inside the panel and
 * never widens the page: put it in a block, grid or flex:1 container.
 * The panel is not a CSS container (no `container-type`): a ResizeObserver sets
 * `.cp--narrow` at 480px or less instead.
 */

const STYLE_ID = 'cp-styles';
const INDENT = '    ';
let uid = 0;

// ---------------------------------------------------------------------------
// Highlighting
// ---------------------------------------------------------------------------

const PY_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'try', 'while', 'with', 'yield',
]);
const PY_CONSTANTS = new Set(['True', 'False', 'None']);
const PY_BUILTINS = new Set([
  'print', 'input', 'len', 'range', 'int', 'float', 'str', 'bool', 'list', 'dict', 'tuple', 'set', 'frozenset',
  'type', 'abs', 'round', 'min', 'max', 'sum', 'sorted', 'reversed', 'enumerate', 'zip', 'isinstance', 'chr',
  'ord', 'any', 'all', 'map', 'filter', 'open', 'divmod', 'pow', 'hex', 'bin', 'oct', 'id', 'iter', 'next',
  'repr', 'format', 'help', 'dir', 'object', 'super', 'hash', 'callable', 'getattr', 'setattr', 'hasattr',
  'Exception', 'BaseException', 'ValueError', 'TypeError', 'NameError', 'ZeroDivisionError', 'IndexError',
  'KeyError', 'AttributeError', 'RuntimeError', 'RecursionError', 'SyntaxError', 'IndentationError',
  'UnboundLocalError', 'AssertionError', 'ImportError', 'ModuleNotFoundError', 'StopIteration',
  'FileNotFoundError', 'OverflowError', 'NotImplementedError', 'ArithmeticError', 'LookupError',
]);
const PY_PREFIX = /^(?:[rRuUbBfF]|[rR][bBfF]|[bBfF][rR])$/;
const PY_OPS3 = ['**=', '//=', '>>=', '<<=', '...'];
const PY_OPS2 = ['**', '//', '==', '!=', '<=', '>=', '+=', '-=', '*=', '/=', '%=', '->', ':=', '<<', '>>', '&=', '|=', '^=', '@='];
const PY_OP1 = '+-*/%=<>&|^~@!';
const PY_PUNCT = '()[]{},:;.';

// PP 02 pseudocode notation (English and Indonesian forms).
const PS_HEAD = new Set(['ALGORITMA', 'ALGORITHM', 'DEKLARASI', 'DECLARATION', 'DESKRIPSI', 'DESCRIPTION', 'PROGRAM', 'KAMUS', 'MULAI', 'SELESAI', 'START', 'END', 'BEGIN', 'STOP']);
const PS_IO = new Set(['READ', 'INPUT', 'GET', 'OBTAIN', 'BACA', 'MASUKKAN', 'DISPLAY', 'PRINT', 'OUTPUT', 'WRITE', 'TAMPILKAN', 'TULIS', 'CETAK']);
const PS_KW = new Set([
  'IF', 'THEN', 'ELSE', 'ENDIF', 'ELSEIF', 'WHILE', 'DO', 'ENDWHILE', 'FOR', 'TO', 'DOWNTO', 'STEP', 'ENDFOR', 'EACH', 'IN',
  'REPEAT', 'UNTIL', 'RETURN', 'FUNCTION', 'ENDFUNCTION', 'PROCEDURE', 'ENDPROCEDURE', 'CALL', 'CASE', 'OF', 'OTHERWISE', 'DECLARE',
  'AND', 'OR', 'NOT', 'XOR',
  'JIKA', 'MAKA', 'TIDAK', 'SELAMA', 'UNTUK', 'DARI', 'SAMPAI', 'LAKUKAN', 'KEMBALIKAN', 'ULANGI', 'HINGGA', 'AKHIR',
  'FUNGSI', 'PROSEDUR', 'LANGKAH', 'SETIAP', 'PANGGIL', 'DAN', 'ATAU', 'KASUS', 'LAINNYA',
]);
const PS_OPWORD = new Set(['MOD', 'DIV']);
const PS_CONST = new Set(['TRUE', 'FALSE', 'BENAR', 'SALAH', 'NULL']);
// PP 02 writes the boolean values in lower case too ("benar (true) atau salah (false)"); they are never identifiers
const PS_CONST_LOWER = new Set(['true', 'false', 'benar', 'salah']);
const PS_TYPES = new Set(['integer', 'int', 'real', 'float', 'string', 'char', 'character', 'boolean', 'bool', 'array', 'list', 'larik']);
const PS_OPCHARS = '←→≤≥≠×÷=<>+-*/%^:';

const escHTML = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const span = (cls, text) => (cls ? `<span class="cp-t-${cls}">${escHTML(text)}</span>` : escHTML(text));

/** Index just past the closing quote `q` starting the scan at `i`, or -1 if not closed on this line. */
function scanQuoted(line, i, q) {
  while (i < line.length) {
    if (line[i] === '\\') { i += 2; continue; }
    if (line.startsWith(q, i)) return i + q.length;
    i++;
  }
  return -1;
}

/** Body of a (non f-) string: escapes like \n get their own colour. */
function stringBody(text, raw) {
  if (raw || text.indexOf('\\') < 0) return span('str', text);
  let html = '';
  let last = 0;
  const re = /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|N\{[^}]*\}|[0-7]{1,3}|.|$)/g;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) html += span('str', text.slice(last, m.index));
    html += span('esc', m[0]);
    last = m.index + m[0].length;
    if (!m[0]) re.lastIndex++;
  }
  if (last < text.length) html += span('str', text.slice(last));
  return html;
}

/**
 * Scan the body of an f-string from `i` (just after the opening quote).
 * Returns { end, html, closed }: replacement fields are highlighted as code,
 * with their braces, `!r` conversion and `:.2f` format spec coloured apart.
 */
function scanFString(line, i, q, raw) {
  let html = '';
  let buf = '';
  const flush = () => { if (buf) { html += stringBody(buf, raw); buf = ''; } };
  while (i < line.length) {
    const c = line[i];
    if (c === '\\' && !raw) { buf += line.slice(i, i + 2); i += 2; continue; }
    if (line.startsWith(q, i)) { flush(); return { end: i + q.length, html, closed: true }; }
    if ((c === '{' && line[i + 1] === '{') || (c === '}' && line[i + 1] === '}')) { buf += c + c; i += 2; continue; }
    if (c === '{') {
      flush();
      // Find the matching close brace, skipping nested strings and brackets.
      let j = i + 1;
      let depth = 0;
      let spec = -1;
      let conv = -1;
      while (j < line.length) {
        const d = line[j];
        if (d === '"' || d === "'") {
          const e = scanQuoted(line, j + 1, d);
          if (e < 0 || line.startsWith(q, j)) break;
          j = e;
          continue;
        }
        if ('([{'.includes(d)) depth++;
        else if (')]'.includes(d)) depth--;
        else if (d === '}') { if (depth === 0) break; depth--; }
        else if (depth === 0 && d === '!' && line[j + 1] !== '=' && conv < 0 && spec < 0) conv = j;
        else if (depth === 0 && d === ':' && spec < 0) { spec = j; }
        j++;
        if (spec >= 0) {
          // The rest up to the closing brace is the format spec (may contain nested {width}).
          let k = j;
          let nest = 0;
          while (k < line.length && !(line[k] === '}' && nest === 0)) {
            if (line.startsWith(q, k)) break;
            if (line[k] === '{') nest++;
            else if (line[k] === '}') nest--;
            k++;
          }
          j = k;
          break;
        }
      }
      const exprEnd = conv >= 0 ? conv : spec >= 0 ? spec : j;
      html += span('fb', '{');
      const expr = line.slice(i + 1, exprEnd);
      html += tokensToHTML(tokenizePyLine(expr, { open: null }).tokens);
      if (conv >= 0) html += span('fs', line.slice(conv, spec >= 0 ? spec : j));
      if (spec >= 0) html += span('fs', line.slice(spec, j));
      if (line[j] === '}') { html += span('fb', '}'); i = j + 1; } else { i = j; }
      continue;
    }
    buf += c;
    i++;
  }
  flush();
  return { end: line.length, html, closed: false };
}

function tokensToHTML(tokens) {
  let html = '';
  for (const t of tokens) html += t.html != null ? t.html : span(t.cls, t.text);
  return html;
}

/**
 * Tokenise one physical line of Python. `state.open` carries an unterminated
 * triple-quoted string to the next line: { q, raw, f }.
 */
function tokenizePyLine(line, state) {
  const tokens = [];
  let i = 0;
  const n = line.length;
  if (state.open) {
    const { q, raw, f } = state.open;
    if (f) {
      const r = scanFString(line, 0, q, raw);
      tokens.push({ html: r.html + (r.closed ? span('str', q) : ''), sig: true });
      if (r.closed) { state.open = null; i = r.end; } else return { tokens, state };
    } else {
      const e = scanQuoted(line, 0, q);
      const end = e < 0 ? n : e;
      tokens.push({ html: stringBody(line.slice(0, end), raw), sig: true });
      if (e < 0) return { tokens, state };
      state.open = null;
      i = end;
    }
  }
  let prevSig = null; // previous significant token text
  let firstWord = null;
  const codePart = stripPyComment(line).trimEnd();
  while (i < n) {
    const c = line[i];
    if (c === ' ' || c === '\t') {
      let j = i;
      while (j < n && (line[j] === ' ' || line[j] === '\t')) j++;
      tokens.push({ cls: null, text: line.slice(i, j) });
      i = j;
      continue;
    }
    if (c === '#') { tokens.push({ cls: 'com', text: line.slice(i) }); break; }
    // Identifier, keyword, or string prefix
    if (/[A-Za-z_À-￿]/.test(c) && !/[←→≤≥≠×÷]/.test(c)) {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_À-￿]/.test(line[j]) && !/[←→≤≥≠×÷]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if ((line[j] === '"' || line[j] === "'") && PY_PREFIX.test(word)) {
        i = scanString(line, i, j, word, tokens, state);
        prevSig = 'str';
        if (state.open) break;
        continue;
      }
      let cls = null;
      if (prevSig === 'def' || prevSig === 'class') cls = 'fn';
      else if (prevSig === '.') cls = 'attr';
      else if (PY_CONSTANTS.has(word)) cls = 'con';
      else if (PY_KEYWORDS.has(word)) cls = 'kw';
      else if ((word === 'match' || word === 'case') && firstWord === null && codePart.endsWith(':')
        && !/^\s*(?:[=.,:)\]]|$)/.test(line.slice(j))) cls = 'kw';
      else if (word === '_' && firstWord === 'case') cls = 'kw';
      else if (PY_BUILTINS.has(word)) cls = 'bi';
      tokens.push({ cls, text: word });
      if (firstWord === null) firstWord = word;
      prevSig = word;
      i = j;
      continue;
    }
    if (c === '"' || c === "'") {
      i = scanString(line, i, i, '', tokens, state);
      prevSig = 'str';
      if (state.open) break;
      continue;
    }
    const num = /^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*(?:\.[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d[\d_]*)?[jJ]?)/.exec(line.slice(i));
    if (num && (c !== '.' || /\d/.test(line[i + 1] || ''))) {
      tokens.push({ cls: 'num', text: num[0] });
      i += num[0].length;
      prevSig = 'num';
      if (firstWord === null) firstWord = '';
      continue;
    }
    const op3 = PY_OPS3.find((o) => line.startsWith(o, i));
    const op2 = !op3 && PY_OPS2.find((o) => line.startsWith(o, i));
    if (op3 || op2) {
      const o = op3 || op2;
      tokens.push({ cls: 'op', text: o });
      i += o.length;
      prevSig = o;
      if (firstWord === null) firstWord = '';
      continue;
    }
    if (PY_OP1.includes(c)) { tokens.push({ cls: 'op', text: c }); prevSig = c; i++; if (firstWord === null) firstWord = ''; continue; }
    if (PY_PUNCT.includes(c)) { tokens.push({ cls: 'pun', text: c }); prevSig = c; i++; if (firstWord === null) firstWord = ''; continue; }
    tokens.push({ cls: null, text: c });
    if (firstWord === null) firstWord = '';
    i++;
  }
  return { tokens, state };
}

/** Push a string token starting at `start` (prefix) / `qAt` (quote). Returns the index after it. */
function scanString(line, start, qAt, prefix, tokens, state) {
  const p = prefix.toLowerCase();
  const raw = p.includes('r');
  const f = p.includes('f');
  const q3 = line.startsWith(line[qAt].repeat(3), qAt) ? line[qAt].repeat(3) : null;
  const q = q3 || line[qAt];
  const bodyStart = qAt + q.length;
  let html = span('str', line.slice(start, bodyStart));
  let end;
  let closed;
  if (f) {
    const r = scanFString(line, bodyStart, q, raw);
    end = r.end; closed = r.closed;
    // r.html contains the body and, when closed, not the closing quote: add it.
    html += r.html + (closed ? span('str', q) : '');
  } else {
    const e = scanQuoted(line, bodyStart, q);
    closed = e >= 0;
    end = closed ? e : line.length;
    html += stringBody(line.slice(bodyStart, closed ? end - q.length : end), raw) + (closed ? span('str', q) : '');
  }
  tokens.push({ html, sig: true });
  if (!closed && q3) state.open = { q, raw, f };
  return end;
}

/** The line without a trailing # comment (strings respected, approximately). */
function stripPyComment(line) {
  let i = 0;
  while (i < line.length) {
    const c = line[i];
    if (c === '#') return line.slice(0, i);
    if (c === '"' || c === "'") {
      const q = line.startsWith(c.repeat(3), i) ? c.repeat(3) : c;
      const e = scanQuoted(line, i + q.length, q);
      if (e < 0) return line;
      i = e;
      continue;
    }
    i++;
  }
  return line;
}

function highlightPython(src) {
  const state = { open: null };
  return src.split('\n').map((line) => tokensToHTML(tokenizePyLine(line, state).tokens));
}

function psWordClass(word) {
  const up = word.toUpperCase();
  if (PS_TYPES.has(word.toLowerCase()) && (word === word.toLowerCase() || word === up)) return 'ty';
  if (PS_CONST_LOWER.has(word)) return 'con';
  // Keywords are written in capitals (IF, JIKA) or capitalised (Input, Output).
  const capital = word === up || (word[0] === up[0] && word.slice(1) === word.slice(1).toLowerCase());
  if (!capital || word.length < 2) return null;
  if (PS_HEAD.has(up)) return 'hd';
  if (PS_IO.has(up)) return 'bi';
  if (PS_CONST.has(up)) return 'con';
  if (PS_OPWORD.has(up)) return 'op';
  if (PS_KW.has(up) && (word === up || up.length > 3 || up === 'FOR')) return 'kw';
  return null;
}

function highlightPseudo(src) {
  let inBrace = false;
  return src.split('\n').map((line) => {
    let html = '';
    let i = 0;
    const n = line.length;
    if (inBrace) {
      const e = line.indexOf('}');
      const end = e < 0 ? n : e + 1;
      html += span('com', line.slice(0, end));
      if (e < 0) return html;
      inBrace = false;
      i = end;
    }
    while (i < n) {
      const c = line[i];
      if (c === '{') {
        const e = line.indexOf('}', i);
        const end = e < 0 ? n : e + 1;
        html += span('com', line.slice(i, end));
        if (e < 0) inBrace = true;
        i = end;
        continue;
      }
      if (c === '/' && line[i + 1] === '/') { html += span('com', line.slice(i)); break; }
      if (c === '"' || c === "'" || c === '“' || c === '‘') {
        const close = c === '“' ? '”' : c === '‘' ? '’' : c;
        const e = line.indexOf(close, i + 1);
        const end = e < 0 ? n : e + 1;
        html += span('str', line.slice(i, end));
        i = end;
        continue;
      }
      if (/[0-9]/.test(c)) {
        const m = /^\d+(?:[.,]\d+)?/.exec(line.slice(i));
        html += span('num', m[0]);
        i += m[0].length;
        continue;
      }
      if (/[A-Za-z_À-ɏ]/.test(c)) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_À-ɏ]/.test(line[j])) j++;
        const word = line.slice(i, j);
        html += span(psWordClass(word), word);
        i = j;
        continue;
      }
      if (c === '<' && line[i + 1] === '-') { html += span('op', '<-'); i += 2; continue; }
      if (PS_OPCHARS.includes(c)) { html += span('op', c); i++; continue; }
      if ('()[],;.'.includes(c)) { html += span('pun', c); i++; continue; }
      html += escHTML(c);
      i++;
    }
    return html;
  });
}

/**
 * Highlight `src` and return one HTML string per line (no wrapping element).
 * Exported so sims can colour code shown elsewhere (tables, cards) the same
 * way; wrap the result in an element inside `.cp-hl` (or a codePanel) to get
 * the token colours.
 */
export function highlight(src, language = 'python') {
  injectStyles();
  const text = String(src ?? '').replace(/\r\n?/g, '\n');
  if (language === 'python') return highlightPython(text);
  if (language === 'pseudo') return highlightPseudo(text);
  return text.split('\n').map(escHTML);
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const CSS = `
.cp, .cp *, .cp-con, .cp-con * { box-sizing: border-box; }
.cp, .cp-con, .cp-hl {
  --cp-bg: #0b1220; --cp-bg2: #0f182c; --cp-line: #1e2a44; --cp-fg: #e2e8f0; --cp-muted: #8a99b3;
  --cp-fs: 14px; --cp-lh: 21px; --cp-pad: 8px;
  --cp-mono: var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace);
  --cp-sans: var(--font-sans, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
}
@media (max-width: 480px) {
  .cp, .cp-con, .cp-hl { --cp-fs: 13px; --cp-lh: 20px; --cp-pad: 6px; --cp-gm: 14px; }
}
/* iOS Safari zooms the page when a field under 16px gets focus: editable panels use 16px there. */
@supports (-webkit-touch-callout: none) {
  .cp:not(.cp--ro) { --cp-fs: 16px; --cp-lh: 23px; }
  .cp-con-in { font-size: 16px; }
}
.cp, .cp-con {
  position: relative; display: block; width: 100%; max-width: 100%; min-width: 0;
  contain: inline-size;
  background: var(--cp-bg); color: var(--cp-fg);
  border: 1px solid var(--cp-line); border-radius: 10px; overflow: hidden;
  font-family: var(--cp-mono); font-size: var(--cp-fs); line-height: var(--cp-lh);
  font-weight: 400; font-style: normal; letter-spacing: normal; text-align: left;
  font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; font-kerning: none;
  text-rendering: auto; text-transform: none; word-spacing: normal;
  -webkit-text-size-adjust: 100%; text-size-adjust: 100%;
  color-scheme: dark;
}
.cp:focus-within, .cp-con:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 1px #3b82f6; }
.cp-head {
  display: flex; align-items: center; gap: 8px; min-height: 30px; padding: 3px 6px 3px 10px;
  background: var(--cp-bg2); border-bottom: 1px solid var(--cp-line);
  font-family: var(--cp-sans); font-size: 12px; line-height: 1.3; color: #b6c2d6;
}
.cp-title { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; letter-spacing: .02em; }
.cp-actions { display: flex; flex-wrap: wrap; gap: 4px; justify-content: flex-end; }
.cp-actions:empty { display: none; }
.cp-actions button, .cp-actions .btn {
  display: inline-flex; align-items: center; gap: 4px; min-height: 24px; margin: 0; padding: 2px 9px;
  border: 1px solid #2b3a5a; border-radius: 6px; background: #18233b; color: #dbe4f3;
  font: 600 12px/1.2 var(--cp-sans); cursor: pointer;
}
.cp-actions button:hover:not(:disabled) { background: #22304d; }
.cp-actions button:disabled, .cp-actions .btn:disabled { opacity: .45; cursor: default; }
.cp-actions .btn--primary { background: #2563eb; border-color: transparent; color: #fff; }
.cp-actions button:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.cp-scroll {
  position: relative; overflow: auto; outline: none;
  max-height: calc(var(--cp-max, 22) * var(--cp-lh) + 2 * var(--cp-pad) + 14px);
  scrollbar-color: #334155 transparent; scrollbar-width: thin;
}
.cp-scroll:focus-visible { outline: none; box-shadow: inset 0 0 0 2px #60a5fa; border-radius: 0; }
.cp-inner { display: flex; align-items: stretch; width: max-content; min-width: 100%; }
.cp-gutter {
  position: sticky; left: 0; z-index: 3; flex: none;
  padding: var(--cp-pad) 0 calc(var(--cp-pad) + 6px);
  background: var(--cp-bg2); border-right: 1px solid var(--cp-line);
  color: #7d8ba6; text-align: right; white-space: pre;
  user-select: none; -webkit-user-select: none;
}
.cp--gclick .cp-gutter { cursor: pointer; }
.cp-gl { position: relative; display: flex; align-items: center; height: var(--cp-lh); padding: 0 8px 0 0; }
.cp-gm { flex: none; width: var(--cp-gm, 18px); height: 100%; display: flex; align-items: center; justify-content: center; }
.cp-gn { flex: none; min-width: var(--cp-gw, 2ch); text-align: right; font-size: 0.92em; }
.cp-gl.is-active { color: #fde68a; background: rgba(251, 191, 36, 0.16); }
.cp-gl.is-active .cp-gm::before {
  content: ""; width: 0; height: 0; border-left: 8px solid #fbbf24;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent; margin-left: 2px;
}
.cp-gl.m-error .cp-gn { color: #fca5a5; }
.cp-gl.m-error:not(.is-active) .cp-gm::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #f87171; }
.cp-gl.m-match:not(.is-active) .cp-gm::before { content: ""; width: 7px; height: 7px; background: #60a5fa; transform: rotate(45deg); }
.cp-gl.m-done:not(.is-active) .cp-gm::before { content: "\\2713"; color: #34d399; font-family: var(--cp-sans); font-size: 12px; font-weight: 700; line-height: 1; }
.cp-gl.m-visited:not(.is-active) .cp-gm::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #94a3b8; }
.cp-code { position: relative; flex: 1 0 auto; min-width: 0; }
.cp-pre {
  display: block; margin: 0; padding: var(--cp-pad) 0 calc(var(--cp-pad) + 6px); border: 0; border-radius: 0;
  min-height: calc(var(--cp-min, 1) * var(--cp-lh) + 2 * var(--cp-pad) + 6px);
  background: transparent; color: var(--cp-fg);
  font: inherit; line-height: var(--cp-lh); white-space: pre; tab-size: 4; -moz-tab-size: 4;
  overflow: visible; word-wrap: normal; overflow-wrap: normal; word-break: normal;
}
.cp-ln { display: block; height: var(--cp-lh); padding: 0 24px 0 10px; white-space: pre; }
.cp-ln.m-visited { background: rgba(148, 163, 184, 0.09); }
.cp-ln.m-done { background: rgba(52, 211, 153, 0.12); box-shadow: inset 3px 0 0 #34d399; }
.cp-ln.m-match { background: rgba(96, 165, 250, 0.18); box-shadow: inset 3px 0 0 #60a5fa; }
.cp-ln.m-error { background: rgba(248, 113, 113, 0.18); box-shadow: inset 3px 0 0 #f87171; }
.cp-ln.is-active { background: rgba(251, 191, 36, 0.20); box-shadow: inset 3px 0 0 #fbbf24, inset 0 1px 0 rgba(251,191,36,.35), inset 0 -1px 0 rgba(251,191,36,.35); }
.cp-note {
  display: inline-block; vertical-align: top; margin: 2px 0 0 2ch; padding: 0 7px; border-radius: 4px;
  height: calc(var(--cp-lh) - 4px); line-height: calc(var(--cp-lh) - 4px);
  font-family: var(--cp-sans); font-size: 12px; font-weight: 600; white-space: pre;
  background: #334155; color: #f1f5f9; user-select: none; -webkit-user-select: none;
}
.cp-note.k-error { background: #7f1d1d; color: #fee2e2; }
.cp-note.k-done { background: #064e3b; color: #d1fae5; }
.cp-note.k-match { background: #1e3a8a; color: #dbeafe; }
.cp-note.k-visited { background: #334155; color: #e2e8f0; }
.cp-note.k-active { background: #78350f; color: #fef3c7; }
.cp-sq {
  position: absolute; z-index: 1; height: 3px; pointer-events: none; border-radius: 2px;
  background: repeating-linear-gradient(135deg, #f87171 0 3px, transparent 3px 5px);
}
.cp-sq.k-match { background: #60a5fa; }
.cp-sq.k-done { background: #34d399; }
.cp-sq.k-visited { background: #94a3b8; }
.cp-notes {
  display: none; max-height: 7.5em; overflow-y: auto; padding: 4px 10px 6px;
  border-top: 1px solid var(--cp-line); background: var(--cp-bg2);
  font: 12px/1.4 var(--cp-sans); color: #e2e8f0;
}
.cp-ni { display: flex; gap: 8px; align-items: baseline; padding: 2px 0; cursor: pointer; }
.cp-ni b { flex: none; min-width: 2.4em; font: 600 12px/1.4 var(--cp-mono); color: #cbd5e1; }
.cp-ni.k-error b { color: #fca5a5; }
.cp-ni.k-done b { color: #6ee7b7; }
.cp-ni.k-match b { color: #93c5fd; }
.cp-ni span { min-width: 0; overflow-wrap: anywhere; }
/* Narrow panels (480px or less; .cp--narrow is set by a ResizeObserver): notes leave the code lines (they would
   sit off-screen) and are listed under the code. Not a container query: in Chromium, container-type on the panel
   could leave its header without a layout box after the parent switched between flex and grid. */
.cp--narrow .cp-note { display: none; }
.cp--narrow .cp-notes:not(:empty) { display: block; }
.cp-ta {
  position: absolute; inset: 0; z-index: 2; display: block;
  width: 100%; height: 100%; min-width: 0; max-width: none; margin: 0; border: 0; border-radius: 0; outline: none; box-shadow: none;
  padding: var(--cp-pad) 8px var(--cp-pad) 10px;
  background: transparent; color: transparent; -webkit-text-fill-color: transparent; caret-color: #ffffff;
  font: inherit; line-height: var(--cp-lh); letter-spacing: inherit; tab-size: 4; -moz-tab-size: 4;
  font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; font-kerning: none;
  text-rendering: auto; text-transform: none; word-spacing: normal; text-indent: 0;
  white-space: pre; word-wrap: normal; overflow-wrap: normal; word-break: normal;
  overflow: hidden; resize: none; appearance: none; -webkit-appearance: none; cursor: text;
}
.cp-ta:focus, .cp-ta:focus-visible { outline: none; box-shadow: none; border-radius: 0; }
.cp-ta::selection { background: rgba(96, 165, 250, 0.38); color: transparent; -webkit-text-fill-color: transparent; }
.cp-ta::placeholder { color: #64748b; -webkit-text-fill-color: #64748b; opacity: 1; }
.cp--ro .cp-ta { display: none; }
.cp--ro .cp-pre { user-select: text; -webkit-user-select: text; }
.cp-measure { position: absolute; left: 0; top: 0; visibility: hidden; white-space: pre; pointer-events: none; font: inherit; tab-size: 4; -moz-tab-size: 4; }
.cp-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.cp-badge {
  position: absolute; right: 8px; bottom: 8px; z-index: 5; max-width: calc(100% - 16px);
  padding: 3px 8px; border-radius: 6px; background: #1d4ed8; color: #fff;
  font-family: var(--cp-sans); font-size: 12px; line-height: 1.35; pointer-events: none;
  box-shadow: 0 2px 8px rgba(0,0,0,.4);
}
.cp-badge[hidden] { display: none; }

/* token colours (all >= 4.5:1 on #0b1220) */
.cp-t-kw { color: #c792ea; }
.cp-t-con { color: #ff9cac; }
.cp-t-bi { color: #82aaff; }
.cp-t-fn { color: #ffcb6b; }
.cp-t-attr { color: #b2ccd6; }
.cp-t-str { color: #c3e88d; }
.cp-t-esc { color: #f2b880; }
.cp-t-fb { color: #ff9e64; }
.cp-t-fs { color: #e0b0ff; }
.cp-t-num { color: #f78c6c; }
.cp-t-com { color: #8a99b3; }
.cp-t-op { color: #89ddff; }
.cp-t-pun { color: #a9b6cc; }
.cp-t-hd { color: #ffcb6b; }
.cp-t-ty { color: #7fdbca; }

/* console */
.cp-con-scroll {
  position: relative; overflow: auto; outline: none;
  min-height: calc(var(--cp-min, 4) * var(--cp-lh) + 2 * var(--cp-pad));
  max-height: calc(var(--cp-max, 12) * var(--cp-lh) + 2 * var(--cp-pad));
  scrollbar-color: #334155 transparent; scrollbar-width: thin;
}
.cp-con-scroll:focus-visible { outline: none; box-shadow: inset 0 0 0 2px #60a5fa; border-radius: 0; }
.cp-con-pre {
  display: block; margin: 0; padding: var(--cp-pad) 10px; border: 0; background: transparent;
  font: inherit; line-height: var(--cp-lh); color: #e5e7eb;
  white-space: pre-wrap; overflow-wrap: anywhere; word-break: normal; tab-size: 4; -moz-tab-size: 4;
}
.cp-con-empty .cp-con-pre::before { content: attr(data-placeholder); color: #7d8ba6; font-family: var(--cp-sans); font-size: 12.5px; }
.cp-k-out { color: #e5e7eb; }
.cp-k-in { color: #86efac; }
.cp-k-err { color: #ff8f8f; }
.cp-k-info { color: #94a3b8; font-family: var(--cp-sans); font-size: 12.5px; }
.cp-con-field { display: inline-block; vertical-align: top; max-width: 100%; }
.cp-con-in {
  width: max(16ch, var(--cp-ph-w, 0ch)); max-width: 100%; min-width: 8ch;
  margin: 0; padding: 0 4px; border: 0; border-bottom: 2px solid #86efac; border-radius: 0; outline: none;
  background: rgba(134, 239, 172, 0.08); color: #86efac; caret-color: #ffffff;
  font: inherit; line-height: calc(var(--cp-lh) - 2px); height: var(--cp-lh);
}
.cp-con-in:focus, .cp-con-in:focus-visible { outline: none; border-radius: 0; background: rgba(134, 239, 172, 0.16); }
/* grows with what is typed; never narrower than 16ch or its placeholder (--cp-ph-w, set by prompt()) */
@supports (field-sizing: content) { .cp-con-in { field-sizing: content; width: auto; min-width: max(16ch, var(--cp-ph-w, 0ch)); } }
`;

function injectStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

const isID = (locale) => (locale || (typeof document !== 'undefined' && document.documentElement.lang) || 'en').toLowerCase().startsWith('id');

// ---------------------------------------------------------------------------
// codePanel
// ---------------------------------------------------------------------------

/** the optional header (title + actions slot) of a panel; created when a title is first given */
function makeHead(el, initial) {
  let headEl = null, titleEl = null, actionsEl = null, text = null;
  const h = {
    get title() { return text; },
    get actions() { return actionsEl; },
    setTitle(v) {
      if (v == null) { text = null; if (titleEl) titleEl.textContent = ''; return; }
      text = String(v);
      if (!headEl) {
        headEl = document.createElement('div');
        headEl.className = 'cp-head';
        titleEl = document.createElement('div');
        titleEl.className = 'cp-title';
        actionsEl = document.createElement('div');
        actionsEl.className = 'cp-actions';
        headEl.append(titleEl, actionsEl);
        el.insertBefore(headEl, el.firstChild);
      }
      titleEl.textContent = text;
    },
  };
  if (initial != null) h.setTitle(initial);
  return h;
}

const MARK_RANK = { visited: 1, done: 2, match: 3, error: 4 };
const MARK_WORD = {
  en: { error: 'error', done: 'done', visited: 'visited', match: 'match' },
  id: { error: 'galat', done: 'selesai', visited: 'dilewati', match: 'cocok' },
};

/**
 * @param {object} o
 * @param {string} [o.value='']
 * @param {'python'|'pseudo'|'plain'} [o.language='python']
 * @param {boolean} [o.editable=true]
 * @param {number} [o.minLines=8]   panel is at least this many lines tall
 * @param {number} [o.maxLines=22]  grows with the code up to this, then scrolls
 * @param {string} [o.ariaLabel]
 * @param {string} [o.title]        optional header text (e.g. 'main.py'); also gives `actions`
 * @param {string} [o.placeholder]  shown when empty (editable mode)
 * @param {boolean} [o.clearOnEdit=true] a user edit clears the active line and marks (they no longer match the code)
 * @param {boolean} [o.autoScroll=true]  setActiveLine scrolls the line into view inside the panel
 * @param {(src:string)=>void} [o.onChange]  user edits only (not programmatic `value =`)
 * @param {(line:number)=>void} [o.onGutterClick]
 * @param {'en'|'id'} [o.locale]   language of the built-in keyboard hint (default: <html lang>)
 */
export function codePanel({
  value = '', language = 'python', editable = true, minLines = 8, maxLines = 22, ariaLabel, title,
  placeholder = '', clearOnEdit = true, autoScroll = true, onChange, onGutterClick, locale,
} = {}) {
  injectStyles();
  const id = ++uid;
  const L = isID(locale) ? 'id' : 'en';
  const label = ariaLabel || (L === 'id' ? 'Editor kode' : 'Code editor');

  const el = document.createElement('div');
  el.className = 'cp';
  el.setAttribute('translate', 'no');
  el.setAttribute('dir', 'ltr');
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', label);
  el.style.setProperty('--cp-min', String(Math.max(1, minLines)));
  el.style.setProperty('--cp-max', String(Math.max(minLines, maxLines)));

  const head = makeHead(el, title);

  const scroll = document.createElement('div');
  scroll.className = 'cp-scroll';
  const inner = document.createElement('div');
  inner.className = 'cp-inner';
  const gutter = document.createElement('div');
  gutter.className = 'cp-gutter';
  gutter.setAttribute('aria-hidden', 'true');
  const code = document.createElement('div');
  code.className = 'cp-code';
  const pre = document.createElement('pre');
  pre.className = 'cp-pre';
  const ta = document.createElement('textarea');
  ta.className = 'cp-ta';
  ta.setAttribute('wrap', 'off');
  ta.setAttribute('spellcheck', 'false');
  ta.setAttribute('autocomplete', 'off');
  ta.setAttribute('autocorrect', 'off');
  ta.setAttribute('autocapitalize', 'off');
  ta.setAttribute('data-gramm', 'false');
  ta.setAttribute('aria-label', label);
  if (placeholder) ta.placeholder = placeholder;
  const measure = document.createElement('span');
  measure.className = 'cp-measure';
  measure.setAttribute('aria-hidden', 'true');

  const hint = document.createElement('div');
  hint.className = 'cp-sr';
  hint.id = `cp-hint-${id}`;
  hint.textContent = L === 'id'
    ? 'Tab menyisipkan 4 spasi, Shift+Tab mengurangi indentasi, Enter mempertahankan indentasi. Untuk keluar dari editor dengan keyboard, tekan Escape lalu Tab.'
    : 'Tab inserts 4 spaces, Shift+Tab removes indentation, Enter keeps the indentation. To leave the editor with the keyboard, press Escape and then Tab.';
  const notesSR = document.createElement('div');
  notesSR.className = 'cp-sr';
  notesSR.id = `cp-notes-${id}`;
  ta.setAttribute('aria-describedby', `${hint.id} ${notesSR.id}`);

  const notesEl = document.createElement('div');
  notesEl.className = 'cp-notes';
  notesEl.setAttribute('aria-hidden', 'true'); // the same notes are in notesSR

  const badge = document.createElement('div');
  badge.className = 'cp-badge';
  badge.hidden = true;
  badge.setAttribute('aria-hidden', 'true');
  badge.textContent = L === 'id' ? 'Tab sekarang keluar dari editor' : 'Tab now leaves the editor';

  code.append(pre, ta, measure);
  inner.append(gutter, code);
  scroll.appendChild(inner);
  el.append(scroll, notesEl, hint, notesSR, badge);

  let lang = language;
  let isEditable = !!editable;
  let active = null;
  let marks = new Map(); // line -> [{ kind, note }]
  let lineCount = 1;
  let escArmed = false;
  let raf = 0;

  const norm = (v) => String(v ?? '').replace(/\r\n?/g, '\n');
  ta.value = norm(value);

  function markInfo(line) {
    const list = marks.get(line);
    if (!list || !list.length) return null;
    let top = list[0];
    for (const m of list) if ((MARK_RANK[m.kind] || 0) > (MARK_RANK[top.kind] || 0)) top = m;
    return { kind: top.kind, notes: list.filter((m) => m.note) };
  }

  function lineClasses(n) {
    const mi = markInfo(n);
    return (mi ? ` m-${mi.kind}` : '') + (active === n ? ' is-active' : '');
  }

  function notesHTML(n) {
    const mi = markInfo(n);
    if (!mi || !mi.notes.length) return '';
    return mi.notes.map((m) => `<span class="cp-note k-${MARK_RANK[m.kind] ? m.kind : 'visited'}">${escHTML(String(m.note))}</span>`).join('');
  }

  function render() {
    const src = ta.value;
    const lines = highlight(src, lang);
    lineCount = lines.length;
    let ph = '';
    let gh = '';
    for (let i = 0; i < lines.length; i++) {
      const n = i + 1;
      const cls = lineClasses(n);
      ph += `<div class="cp-ln${cls}" data-line="${n}"${active === n ? ' aria-current="step"' : ''}>${lines[i]}${notesHTML(n)}</div>`;
      gh += `<div class="cp-gl${cls}" data-line="${n}"><span class="cp-gm"></span><span class="cp-gn">${n}</span></div>`;
    }
    pre.innerHTML = ph;
    gutter.innerHTML = gh;
    el.style.setProperty('--cp-gw', `${Math.max(2, String(lineCount).length)}ch`);
    renderUnderlines(src);
    renderNotesStrip();
    updateSR();
  }

  /** Marks with `col` (0-based, optional `endCol`) get an underline under those characters. */
  function renderUnderlines(src) {
    code.querySelectorAll('.cp-sq').forEach((n) => n.remove());
    const want = [];
    for (const [line, list] of marks) for (const m of list) if (m.col != null && line >= 1 && line <= lineCount) want.push([line, m]);
    if (!want.length) return;
    if (!el.isConnected) { requestAnimationFrame(() => { if (el.isConnected && code.querySelector('.cp-sq') == null) renderUnderlines(ta.value); }); return; }
    const lines = src.split('\n');
    for (const [line, m] of want) {
      const text = lines[line - 1];
      const a = Math.max(0, Math.min(text.length, m.col));
      const b = Math.max(a + 1, Math.min(Math.max(text.length, a + 1), m.endCol ?? a + 1));
      measure.textContent = text.slice(0, a);
      const x0 = measure.getBoundingClientRect().width;
      measure.textContent = (text + ' ').slice(a, b);
      const w = Math.max(6, measure.getBoundingClientRect().width);
      // em / var() units so the underline follows font-size changes (phone media query).
      const fs = parseFloat(getComputedStyle(measure).fontSize) || 14;
      const sq = document.createElement('div');
      sq.className = `cp-sq k-${MARK_RANK[m.kind] ? m.kind : 'error'}`;
      sq.style.cssText = `left:calc(10px + ${(x0 / fs).toFixed(4)}em);width:${(w / fs).toFixed(4)}em;`
        + `top:calc(var(--cp-pad) + ${line} * var(--cp-lh) - 3px)`;
      code.appendChild(sq);
    }
  }

  function renderNotesStrip() {
    let h = '';
    for (const [line, list] of [...marks.entries()].sort((a, b) => a[0] - b[0])) {
      for (const m of list) {
        if (!m.note) continue;
        h += `<div class="cp-ni k-${MARK_RANK[m.kind] ? m.kind : 'visited'}" data-line="${line}"><b>${line}</b><span>${escHTML(m.note)}</span></div>`;
      }
    }
    notesEl.innerHTML = h;
  }

  function updateSR() {
    const W = MARK_WORD[L];
    const parts = [];
    if (active != null) parts.push(L === 'id' ? `Baris aktif: ${active}.` : `Current line: ${active}.`);
    for (const [line, list] of [...marks.entries()].sort((a, b) => a[0] - b[0])) {
      for (const m of list) {
        if (!m.note) continue;
        parts.push(`${L === 'id' ? 'Baris' : 'Line'} ${line} (${W[m.kind] || m.kind}): ${m.note}.`);
      }
    }
    notesSR.textContent = parts.join(' ');
  }

  function refreshLine(n) {
    if (n == null || n < 1 || n > lineCount) return;
    const cls = lineClasses(n);
    const [ln, gl] = [pre.children[n - 1], gutter.children[n - 1]];
    if (ln) {
      ln.className = 'cp-ln' + cls;
      if (active === n) ln.setAttribute('aria-current', 'step'); else ln.removeAttribute('aria-current');
    }
    if (gl) gl.className = 'cp-gl' + cls;
  }

  function lineTop(n) {
    const lh = pre.children[0]?.offsetHeight || 21;
    const padTop = parseFloat(getComputedStyle(pre).paddingTop) || 0;
    return { top: padTop + (n - 1) * lh, lh };
  }

  /** Scroll the panel (never the page) so line n is visible with a line of context. */
  function scrollToLine(n, { center = false } = {}) {
    if (n == null || !Number.isFinite(Number(n))) return;
    const line = Math.max(1, Math.min(lineCount, Math.round(Number(n))));
    if (!scroll.clientHeight) { // not laid out yet (not in the document): try again next frame
      requestAnimationFrame(() => { if (scroll.clientHeight) scrollToLine(line, { center }); });
      return;
    }
    const { top, lh } = lineTop(line);
    const view = scroll.clientHeight;
    const st = scroll.scrollTop;
    const m = Math.min(lh, view / 4);
    if (center || top + lh <= st || top >= st + view) scroll.scrollTop = Math.max(0, top - (view - lh) / 2);
    else if (top - m < st) scroll.scrollTop = Math.max(0, top - m);
    else if (top + lh + m > st + view) scroll.scrollTop = top + lh + m - view;
  }

  /** Keep the caret visible inside the panel (the sticky gutter would otherwise cover column 0). */
  function ensureCaretVisible() {
    if (!isEditable || document.activeElement !== ta) return;
    const v = ta.value;
    const pos = ta.selectionDirection === 'backward' ? ta.selectionStart : ta.selectionEnd;
    const ls = v.lastIndexOf('\n', pos - 1) + 1;
    const lineNo = v.slice(0, ls).split('\n').length;
    measure.textContent = v.slice(ls, pos);
    const x = 10 + measure.getBoundingClientRect().width; // within .cp-code
    const gw = gutter.offsetWidth;
    const { top, lh } = lineTop(lineNo);
    const viewW = scroll.clientWidth - gw;
    const left = scroll.scrollLeft;
    if (x - 10 < left) scroll.scrollLeft = Math.max(0, x - 40);
    else if (x + 16 > left + viewW) scroll.scrollLeft = x + 40 - viewW;
    if (top < scroll.scrollTop) scroll.scrollTop = Math.max(0, top - 4);
    else if (top + lh > scroll.scrollTop + scroll.clientHeight) scroll.scrollTop = top + lh + 8 - scroll.clientHeight;
  }

  function scheduleCaret() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(ensureCaretVisible);
  }

  // execCommand keeps the browser's undo stack (Ctrl+Z) working; setRangeText is the fallback.
  function insertText(text) {
    let ok = false;
    try { ok = document.execCommand('insertText', false, text); } catch { ok = false; }
    if (!ok) {
      ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end');
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function deleteRange(a, b) {
    ta.setSelectionRange(a, b);
    let ok = false;
    try { ok = document.execCommand('delete', false); } catch { ok = false; }
    if (!ok) {
      ta.setRangeText('', a, b, 'end');
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function outdentAmount(line) {
    if (line[0] === '\t') return 1;
    const sp = /^ */.exec(line)[0].length;
    return sp % 4 || Math.min(4, sp);
  }

  function shiftLines(outdent) {
    const v = ta.value;
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    const start = v.lastIndexOf('\n', s - 1) + 1;
    let lastPos = e;
    if (e > s && v[e - 1] === '\n') lastPos = e - 1;
    let end = v.indexOf('\n', lastPos);
    if (end < 0) end = v.length;
    const block = v.slice(start, end);
    const lines = block.split('\n');
    const out = lines.map((l) => (outdent ? l.slice(outdentAmount(l)) : (l.length ? INDENT + l : l)));
    const next = out.join('\n');
    if (next === block) return;
    const d0 = out[0].length - lines[0].length;
    const total = next.length - block.length;
    ta.setSelectionRange(start, end);
    insertText(next);
    if (s === e) {
      const p = Math.max(start, s + d0);
      ta.setSelectionRange(p, p);
    } else {
      const ns = s === start ? start : Math.max(start, s + d0);
      ta.setSelectionRange(ns, Math.max(ns, e + total));
    }
  }

  function opensBlock(before) {
    if (lang === 'python') return stripPyComment(before).trimEnd().endsWith(':');
    if (lang === 'pseudo') return /(?:^|\s)(?:THEN|DO|MAKA|LAKUKAN|ELSE|REPEAT|ULANGI|JIKA TIDAK)\s*$/i.test(before.replace(/\{[^}]*\}\s*$/, ''));
    return false;
  }

  function onKeyDown(e) {
    if (!isEditable || e.isComposing || e.keyCode === 229) return;
    const k = e.key;
    if (k === 'Shift' || k === 'Control' || k === 'Alt' || k === 'Meta' || k === 'CapsLock') return;
    if (k === 'Escape') {
      escArmed = true;
      badge.hidden = false;
      return;
    }
    if (k === 'Tab') {
      if (escArmed || e.ctrlKey || e.altKey || e.metaKey) { disarm(); return; } // let focus move on
      e.preventDefault();
      const v = ta.value;
      const s = ta.selectionStart;
      const en = ta.selectionEnd;
      const multi = v.slice(s, en).includes('\n');
      if (e.shiftKey || multi) shiftLines(e.shiftKey);
      else insertText(INDENT);
      scheduleCaret();
      return;
    }
    disarm();
    if (k === 'Enter' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      const v = ta.value;
      const s = ta.selectionStart;
      const ls = v.lastIndexOf('\n', s - 1) + 1;
      const before = v.slice(ls, s);
      const indent = /^[ \t]*/.exec(before)[0];
      insertText('\n' + indent + (opensBlock(before) ? INDENT : ''));
      scheduleCaret();
      return;
    }
    if (k === 'Backspace' && !e.ctrlKey && !e.metaKey && !e.altKey && ta.selectionStart === ta.selectionEnd) {
      const v = ta.value;
      const s = ta.selectionStart;
      const ls = v.lastIndexOf('\n', s - 1) + 1;
      const before = v.slice(ls, s);
      if (before.length >= 2 && /^ +$/.test(before)) {
        e.preventDefault();
        const kdel = ((before.length - 1) % 4) + 1;
        deleteRange(s - kdel, s);
        scheduleCaret();
        return;
      }
    }
    scheduleCaret();
  }

  function disarm() {
    escArmed = false;
    badge.hidden = true;
  }

  function onInput() {
    if (clearOnEdit && (active != null || marks.size)) {
      active = null;
      marks = new Map();
    }
    render();
    scheduleCaret();
    onChange?.(ta.value);
  }

  function onTaScroll() {
    // The textarea is sized to its content, so it should never scroll itself;
    // if a browser does it anyway the overlay would drift: undo it.
    if (ta.scrollTop || ta.scrollLeft) { ta.scrollTop = 0; ta.scrollLeft = 0; }
  }

  function onNoteClick(e) {
    const it = e.target.closest?.('.cp-ni');
    if (it) scrollToLine(Number(it.dataset.line), { center: true });
  }

  function onGutter(e) {
    const row = e.target.closest?.('.cp-gl');
    if (row && onGutterClick) onGutterClick(Number(row.dataset.line));
  }

  // narrow-panel layout of the notes (see .cp--narrow in the styles)
  const ro = typeof ResizeObserver === 'function'
    ? new ResizeObserver((entries) => { for (const en of entries) el.classList.toggle('cp--narrow', en.contentRect.width > 0 && en.contentRect.width <= 480); })
    : null;
  if (ro) ro.observe(el);

  ta.addEventListener('keydown', onKeyDown);
  ta.addEventListener('input', onInput);
  ta.addEventListener('scroll', onTaScroll);
  ta.addEventListener('blur', disarm);
  ta.addEventListener('focus', scheduleCaret);
  ta.addEventListener('mouseup', scheduleCaret);
  notesEl.addEventListener('click', onNoteClick);
  if (onGutterClick) {
    el.classList.add('cp--gclick');
    gutter.addEventListener('click', onGutter);
  }

  function applyEditable() {
    el.classList.toggle('cp--ro', !isEditable);
    // the editing keys hint means nothing while the code cannot be edited (screen readers would still read it)
    hint.hidden = !isEditable;
    ta.readOnly = !isEditable;
    ta.tabIndex = isEditable ? 0 : -1;
    if (isEditable) {
      pre.setAttribute('aria-hidden', 'true');
      scroll.removeAttribute('tabindex');
      scroll.removeAttribute('role');
      scroll.removeAttribute('aria-label');
      scroll.removeAttribute('aria-describedby');
    } else {
      if (document.activeElement === ta) ta.blur();
      pre.removeAttribute('aria-hidden');
      scroll.tabIndex = 0;
      scroll.setAttribute('role', 'region');
      scroll.setAttribute('aria-label', label);
      scroll.setAttribute('aria-describedby', notesSR.id);
      disarm();
    }
  }

  applyEditable();
  render();

  const api = {
    el,
    /** Header slot for sim buttons (null until the panel has a title: `title` option or `cp.title = ...`). */
    get actions() { return head.actions; },
    /** Header text; setting it (e.g. 'linear_search.py' → 'pseudocode' after setLanguage) adds the header if needed. */
    get title() { return head.title; },
    set title(v) { head.setTitle(v); },
    setTitle(v) { head.setTitle(v); },
    textarea: ta,
    get value() { return ta.value; },
    set value(v) {
      const next = norm(v);
      if (next === ta.value) return;
      ta.value = next;
      if (active != null && active > next.split('\n').length) active = null;
      render();
    },
    get language() { return lang; },
    setLanguage(l) { lang = l; render(); },
    get lineCount() { return lineCount; },
    get activeLine() { return active; },
    get editable() { return isEditable; },
    /** 1-based line of the caret (editable mode). */
    get cursorLine() { return ta.value.slice(0, ta.selectionStart).split('\n').length; },
    setActiveLine(n, opts = {}) {
      const next = n == null || !Number.isFinite(Number(n)) ? null : Math.round(Number(n));
      const prev = active;
      active = next != null && next >= 1 && next <= lineCount ? next : null;
      if (prev !== active) {
        refreshLine(prev);
        refreshLine(active);
        updateSR();
      }
      if (active != null && (opts.scroll ?? autoScroll)) scrollToLine(active);
    },
    setMarks(list = []) {
      marks = new Map();
      for (const m of list || []) {
        if (!m || m.line == null) continue;
        const line = Math.round(Number(m.line));
        if (!Number.isFinite(line)) continue;
        if (!marks.has(line)) marks.set(line, []);
        marks.get(line).push({
          kind: m.kind || 'visited',
          note: m.note == null || m.note === '' ? null : String(m.note),
          col: Number.isFinite(Number(m.col)) && m.col !== null ? Math.max(0, Math.round(Number(m.col))) : null,
          endCol: Number.isFinite(Number(m.endCol)) && m.endCol !== null ? Math.round(Number(m.endCol)) : null,
        });
      }
      render();
    },
    clearMarks() { api.setMarks([]); },
    setEditable(b) { isEditable = !!b; applyEditable(); },
    scrollToLine(n, opts) { scrollToLine(n, opts); },
    focus() {
      if (isEditable) ta.focus({ preventScroll: true });
      else scroll.focus({ preventScroll: true });
    },
    /** Focus and put the caret at (line, col) — 1-based line, 0-based column — or select col..colEnd. */
    select(line, colStart = 0, colEnd = null) {
      const lines = ta.value.split('\n');
      const ln = Math.max(1, Math.min(lines.length, line));
      let off = 0;
      for (let i = 0; i < ln - 1; i++) off += lines[i].length + 1;
      const len = lines[ln - 1].length;
      const a = off + Math.min(len, colStart);
      const b = colEnd == null ? a : off + Math.max(Math.min(len, colStart), Math.min(len, colEnd));
      api.focus();
      ta.setSelectionRange(a, b);
      scrollToLine(ln);
      scheduleCaret();
    },
    destroy() {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      ta.removeEventListener('keydown', onKeyDown);
      ta.removeEventListener('input', onInput);
      ta.removeEventListener('scroll', onTaScroll);
      ta.removeEventListener('blur', disarm);
      ta.removeEventListener('focus', scheduleCaret);
      ta.removeEventListener('mouseup', scheduleCaret);
      gutter.removeEventListener('click', onGutter);
      notesEl.removeEventListener('click', onNoteClick);
      el.remove();
    },
  };
  return api;
}

// ---------------------------------------------------------------------------
// consolePanel
// ---------------------------------------------------------------------------

const KINDS = new Set(['out', 'in', 'err', 'info']);

/**
 * @param {object} o
 * @param {number} [o.minLines=4]
 * @param {number} [o.maxLines=12]
 * @param {string} [o.ariaLabel]
 * @param {string} [o.title]        optional header text (e.g. 'Output'); also gives `actions` (see `title` below)
 * @param {string} [o.placeholder]  muted text while empty
 * @param {number} [o.maxChars=200000] older output is dropped beyond this (runaway loops); it is cut back to 90 % so
 *                                  that a long run does not pay for a cut on every append
 * @param {'en'|'id'} [o.locale]
 *
 * Cost: append() and set() take time in proportion to the text added (text goes into small text nodes, nothing is
 * measured per call); while the view is at the bottom it follows new output, scrolling once per animation frame.
 */
export function consolePanel({ minLines = 4, maxLines = 12, ariaLabel, title, placeholder = '', maxChars = 200000, locale } = {}) {
  injectStyles();
  const L = isID(locale) ? 'id' : 'en';
  const label = ariaLabel || (L === 'id' ? 'Keluaran program' : 'Program output');
  const el = document.createElement('div');
  el.className = 'cp-con cp-con-empty';
  el.setAttribute('translate', 'no');
  el.setAttribute('dir', 'ltr');
  el.style.setProperty('--cp-min', String(Math.max(1, minLines)));
  el.style.setProperty('--cp-max', String(Math.max(minLines, maxLines)));

  const head = makeHead(el, title);
  const scroll = document.createElement('div');
  scroll.className = 'cp-con-scroll';
  scroll.tabIndex = 0;
  scroll.setAttribute('role', 'log');
  scroll.setAttribute('aria-label', label);
  const pre = document.createElement('pre');
  pre.className = 'cp-con-pre';
  pre.dataset.placeholder = placeholder;
  scroll.appendChild(pre);
  el.appendChild(scroll);

  const CHUNK = 4096;   // text node size: appending to a large text node copies all of it
  let segs = []; // { kind, text, node }
  let total = 0;
  let field = null; // { wrap, input, resolve, echo }
  let trimNote = null; // shown once older output has been dropped

  // Following the output: `stuck` says whether the view sits at the bottom. It is updated by scroll events (the
  // user scrolling up stops the following, scrolling back down resumes it), so adding text never reads layout.
  let stuck = true;
  let autoTop = -1;   // the scrollTop the panel itself set last
  let raf = 0;
  const atBottom = () => scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 24;
  const toBottom = () => { scroll.scrollTop = scroll.scrollHeight; autoTop = scroll.scrollTop; stuck = true; };
  scroll.addEventListener('scroll', () => { stuck = atBottom() || (autoTop >= 0 && scroll.scrollTop >= autoTop - 1); });
  function follow() {
    if (!stuck || raf) return;
    if (typeof requestAnimationFrame !== 'function') { toBottom(); return; }
    raf = requestAnimationFrame(() => { raf = 0; if (stuck) toBottom(); });
  }

  function updateEmpty() {
    el.classList.toggle('cp-con-empty', segs.length === 0 && !field && !!placeholder);
  }

  function trim() {
    if (total <= maxChars) return;
    let drop = total - Math.floor(maxChars * 0.9);
    while (drop > 0 && segs.length) {
      const sg = segs[0];
      if (sg.text.length <= drop) {
        drop -= sg.text.length; total -= sg.text.length;
        sg.node.remove(); segs.shift();
        continue;
      }
      // whole text nodes first, then cut the next one at a line start so the first visible line is whole
      let removed = 0;
      for (let t = sg.node.firstChild; t && drop > 0;) {
        const next = t.nextSibling;
        const len = t.data.length;
        if (len <= drop) { t.remove(); drop -= len; removed += len; t = next; continue; }
        const nl = t.data.indexOf('\n', drop);
        const cut = nl < 0 ? drop : nl + 1;
        if (cut >= len) { t.remove(); removed += len; } else { t.deleteData(0, cut); removed += cut; }
        drop = 0;
      }
      sg.text = sg.text.slice(removed); total -= removed;
      if (!sg.text) { sg.node.remove(); segs.shift(); }
      drop = 0;
    }
    if (!trimNote) {
      trimNote = document.createElement('span');
      trimNote.className = 'cp-k-info';
      trimNote.textContent = L === 'id' ? '… (keluaran awal dipotong)\n' : '… (earlier output trimmed)\n';
    }
    pre.insertBefore(trimNote, pre.firstChild);
  }

  function addText(sg, s) {
    const last = sg.node.lastChild;
    if (last && last.nodeType === 3 && last.data.length + s.length <= CHUNK) last.appendData(s);
    else sg.node.appendChild(document.createTextNode(s));
    sg.text += s;
  }

  function add(text, kind = 'out') {
    if (text == null) return;
    const s = String(text);
    if (!s) return;
    const k = KINDS.has(kind) ? kind : 'out';
    const last = segs[segs.length - 1];
    if (last && last.kind === k) addText(last, s);
    else {
      const node = document.createElement('span');
      node.className = `cp-k-${k}`;
      const sg = { kind: k, text: '', node };
      addText(sg, s);
      if (field) pre.insertBefore(node, field.wrap); else pre.appendChild(node);
      segs.push(sg);
    }
    total += s.length;
    trim();
    updateEmpty();
    follow();
  }

  /** empty the console; an active prompt() resolves with null unless keepPrompt (then it stays, after the text) */
  function clearAll(keepPrompt) {
    segs = [];
    total = 0;
    trimNote = null;
    const f = field;
    pre.textContent = '';
    if (f && keepPrompt) pre.appendChild(f.wrap);
    else if (f) { field = null; f.resolve(null); }
    stuck = true; autoTop = -1;
    updateEmpty();
  }

  const api = {
    el,
    /** Header slot for sim buttons (null until the console has a title: `title` option or `out.title = ...`). */
    get actions() { return head.actions; },
    /** Header text; setting it adds the header if needed. */
    get title() { return head.title; },
    set title(v) { head.setTitle(v); },
    setTitle(v) { head.setTitle(v); },
    /**
     * Replace everything. `content` is a string (stdout) or an array of
     * { text, kind: 'out'|'in'|'err'|'info' }. For a plain string:
     *  - opts.error: traceback text; if `content` ends with it, that tail is shown red, exactly as it is in
     *    `content` (minipy's run.output already contains the traceback of an uncaught error, right after the
     *    program's output like python3 2>&1);
     *  - opts.inputs: the values fed to input(), in order; each echo "value\n" is
     *    shown in the input colour (first match after the previous echo).
     * set() empties the console first, so an active prompt() resolves with null, as with clear() and
     * cancelPrompt(), unless opts.keepPrompt is true: then the input field stays, after the new text.
     */
    set(content, { error, inputs, keepPrompt = false } = {}) {
      clearAll(keepPrompt);
      if (Array.isArray(content)) {
        for (const c of content) add(c?.text, c?.kind);
      } else {
        let text = content == null ? '' : String(content);
        let tail = '';
        const err = error == null ? '' : String(error).replace(/\n+$/, '');
        if (err) {
          const at = text.lastIndexOf(err);
          if (at >= 0 && /^\s*$/.test(text.slice(at + err.length))) { tail = text.slice(at); text = text.slice(0, at); }
        }
        let pos = 0;
        for (const raw of inputs || []) {
          const echo = String(raw) + '\n';
          const at = text.indexOf(echo, pos);
          if (at < 0) continue;
          add(text.slice(pos, at), 'out');
          add(echo, 'in');
          pos = at + echo.length;
        }
        add(text.slice(pos), 'out');
        if (tail) add(tail, 'err');
      }
      if (raf && typeof cancelAnimationFrame === 'function') { cancelAnimationFrame(raf); raf = 0; }
      toBottom();
    },
    append(text, kind = 'out') { add(text, kind); },
    appendInput(text) { add(text, 'in'); },
    /** traceback text in red, on a line of its own (a newline is added first when the console's last line is unfinished) */
    appendError(text) {
      const s = String(text ?? '');
      const last = segs[segs.length - 1];
      if (s && last && !last.text.endsWith('\n')) add('\n', 'out');
      add(s.endsWith('\n') || !s ? s : s + '\n', 'err');
    },
    appendInfo(text) { add(text, 'info'); },
    clear() { clearAll(false); },
    /** Plain text of everything shown (stdout, echoed input, errors, info). */
    get text() { return segs.map((sg) => sg.text).join(''); },
    get segments() { return segs.map(({ kind, text }) => ({ kind, text })); },
    scrollToBottom: toBottom,
    /**
     * Ask for a line of input inside the console (an inline field after the
     * current output). Resolves with the typed text on Enter, or null if the
     * console is cleared (clear(), or set() without keepPrompt) or cancelPrompt()
     * is called. With echo (default) the typed text + "\n" is appended in the input colour.
     */
    prompt({ placeholder: ph = '', echo = true, focus = true, ariaLabel: al } = {}) {
      if (field) { const f = field; field = null; f.wrap.remove(); f.resolve(null); }
      return new Promise((resolve) => {
        const wrap = document.createElement('span');
        wrap.className = 'cp-con-field';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cp-con-in';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('aria-label', al || (L === 'id' ? 'Ketik masukan lalu tekan Enter' : 'Type input and press Enter'));
        if (ph) {
          input.placeholder = ph;
          // room for the whole placeholder (the field is otherwise at least 16 characters wide)
          input.style.setProperty('--cp-ph-w', `${Array.from(String(ph)).length + 2}ch`);
        }
        wrap.appendChild(input);
        pre.appendChild(wrap);
        field = { wrap, input, resolve, echo };
        updateEmpty();
        input.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' || e.isComposing) return;
          e.preventDefault();
          const v = input.value;
          const f = field;
          field = null;
          wrap.remove();
          if (f?.echo) add(v + '\n', 'in');
          updateEmpty();
          resolve(v);
        });
        toBottom();
        if (focus) input.focus({ preventScroll: true });
      });
    },
    cancelPrompt() {
      if (!field) return;
      const f = field;
      field = null;
      f.wrap.remove();
      updateEmpty();
      f.resolve(null);
    },
    get waiting() { return !!field; },
    destroy() { api.cancelPrompt(); if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf); el.remove(); },
  };
  updateEmpty();
  return api;
}
