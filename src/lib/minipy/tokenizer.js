// minipy — tokenizer modelled on CPython 3.13's C tokenizer (Parser/lexer).
//   scan(src)            → { tokens, error, openParens }  (strict: stops at the first tokenizer error)
//   scan(src, {lenient}) → same, but never stops: bad input becomes ERRORTOKEN entries (used for highlighting)
// Token: { type, string, line, col, endLine, endCol, ...extra }
//   type: NAME NUMBER STRING OP NEWLINE NL INDENT DEDENT COMMENT ENDMARKER ERRORTOKEN
//   STRING tokens carry { prefix, quote, triple, body, fstring, bytes, raw, bodyLine, bodyCol }.
// Lines are 1-based, columns 0-based (in code points of the line, like CPython's col_offset for ASCII).

import { uflags, U_XID_START, U_XID_CONT, U_PRINTABLE } from './unidata.js';

export const KEYWORDS = ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del',
  'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'try', 'while', 'with', 'yield'];
export const SOFT_KEYWORDS = ['_', 'case', 'match', 'type'];
const KW = new Set(KEYWORDS);

const ID_START = /[\p{L}\p{Nl}_ᢅᢆ℘℮゛゜]/u;
const ID_CONT = /[\p{L}\p{Nl}\p{Mn}\p{Mc}\p{Nd}\p{Pc}_··፩-፱᧚ᢅᢆ℘℮゛゜]/u;
const isIdStart = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || (c > '\x7f' && ID_START.test(c));
const isIdCont = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || (c >= '0' && c <= '9') || (c > '\x7f' && ID_CONT.test(c));
const isDigit = (c) => c >= '0' && c <= '9';
const PRINTABLE_BAD = /[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Cn}\p{Zl}\p{Zp}\p{Zs}]/u;   // not Py_UNICODE_ISPRINTABLE (non-ASCII only)

const OPS3 = ['**=', '//=', '>>=', '<<=', '...', '!=='];
// '<>' is not a token: since 3.13.x the lexer returns '<' and '>' (the parser's invalid_noteq rule reports it)
const OPS2 = ['!=', '%=', '&=', '**', '*=', '+=', '-=', '->', '//', '/=', ':=', '<<', '<=', '==', '>=', '>>', '@=', '^=', '|='];
const OPS1 = '%&()*+,-./:;<=>@[]^{|}~!';
const STRING_PREFIXES = new Set(['r', 'u', 'f', 'b', 'br', 'rb', 'fr', 'rf']);

// E_TABSPACE / E_TOODEEP errors: CPython reports offset 1 and end_offset 0 (no caret)
const TAB_POS = { offset: 1, endOffset: 0, done: true };
export class TokError {
  constructor(type, msg, line, col, extra) { this.type = type; this.msg = msg; this.line = line; this.col = col; Object.assign(this, extra || {}); }
}

/**
 * Tokenize Python source.
 * @param {string} src
 * @param {{lenient?: boolean}} [opts]
 */
export function scan(src, opts = {}) {
  const lenient = !!opts.lenient;
  // split into lines keeping line ends; normalise \r\n and \r to \n
  src = src.replace(/\r\n?/g, '\n');
  const chars = Array.from(src);  // code points, so columns count characters
  const n = chars.length;
  const tokens = [];
  let error = null;
  let pos = 0, line = 1, lineStart = 0;      // lineStart: index of first char of the current line
  const indents = [0], altIndents = [0];
  const parens = [];                           // [{ch, line, col}]
  let atBol = true;                            // at beginning of a logical line
  let contLine = false;                        // previous physical line ended with a backslash
  let lastSignificant = null;                  // last token that is not NL/COMMENT
  let specUnclosed = false;                    // the f-string being read ended inside a format spec
  let fexprFail = 'reported';                  // why skipFExpr gave up: reported | eof | unterminated
  let fRaw = false;                            // the f-string being read is raw (no \N{...} escapes)

  const col = (p) => p - lineStart;
  function push(type, string, sl, sc, el, ec, extra) {
    const t = { type, string, line: sl, col: sc, endLine: el, endCol: ec };
    if (extra) Object.assign(t, extra);
    tokens.push(t);
    if (type !== 'NL' && type !== 'COMMENT') lastSignificant = t;
    return t;
  }
  function fail(type, msg, l, c, extra) {
    if (!error) error = new TokError(type, msg, l, c, extra);
    if (!lenient) throw STOP_SCAN;
  }

  try {
    while (pos <= n) {
      // ---------------------------------------------------------- beginning of a line: indentation
      if (atBol) {
        atBol = false;
        let c = 0, alt = 0, p = pos, contCol = 0;
        for (; p < n; p++) {
          const ch = chars[p];
          if (ch === ' ') { c++; alt++; } else if (ch === '\t') { c = (Math.floor(c / 8) + 1) * 8; alt++; } else if (ch === '\f') { c = alt = 0; } else if (ch === '\\' && chars[p + 1] === '\n' && p + 2 < n) {
            // CPython: indentation is not split over lines with backslashes; the column of the first backslash
            // decides it, except that a backslash in column 0 counts as "none" and the next line's spaces count on
            contCol = contCol || c;
            p++; line++; lineStart = p + 1;
          } else break;
        }
        if (contCol) { c = contCol; alt = contCol; }
        const ch = p < n ? chars[p] : '';
        const blank = ch === '#' || ch === '\n' || ch === '';
        if (!blank && parens.length === 0 && !contLine) {
          const top = indents[indents.length - 1];
          if (c === top) {
            if (alt !== altIndents[altIndents.length - 1]) fail('TabError', 'inconsistent use of tabs and spaces in indentation', line, 0, TAB_POS);
          } else if (c > top) {
            if (alt <= altIndents[altIndents.length - 1]) fail('TabError', 'inconsistent use of tabs and spaces in indentation', line, 0, TAB_POS);
            if (indents.length >= 100) fail('IndentationError', 'too many levels of indentation', line, 0, TAB_POS);
            indents.push(c); altIndents.push(alt);
            push('INDENT', chars.slice(pos, p).join(''), line, 0, line, col(p));
          } else {
            // CPython checks the dedent target before emitting any DEDENT, so the error comes first
            let k = indents.length - 1;
            while (k > 0 && c < indents[k]) k--;
            if (c !== indents[k]) {
              let e0 = p; while (e0 < n && chars[e0] !== '\n') e0++;
              fail('IndentationError', 'unindent does not match any outer indentation level', line, col(p), { dedent: true, done: true, offset: col(e0) + 1, endOffset: -1 });
            }
            while (indents.length > 1 && c < indents[indents.length - 1]) {
              indents.pop(); altIndents.pop();
              push('DEDENT', '', line, col(p), line, col(p));
            }
            if (c !== indents[indents.length - 1]) {
              // CPython (E_DEDENT): offset just past the end of the line, no end column
              let e = p; while (e < n && chars[e] !== '\n') e++;
              fail('IndentationError', 'unindent does not match any outer indentation level', line, col(p), { dedent: true, done: true, offset: col(e) + 1, endOffset: -1 });
              // lenient: accept as new level
              indents.push(c); altIndents.push(alt);
            } else if (alt !== altIndents[altIndents.length - 1]) fail('TabError', 'inconsistent use of tabs and spaces in indentation', line, 0, TAB_POS);
          }
        }
        contLine = false;
        pos = p;
      }
      if (pos >= n) break;
      const ch = chars[pos];
      // ---------------------------------------------------------- whitespace
      if (ch === ' ' || ch === '\t' || ch === '\f') { pos++; continue; }
      // ---------------------------------------------------------- comment
      if (ch === '#') {
        let p = pos; while (p < n && chars[p] !== '\n') p++;
        push('COMMENT', chars.slice(pos, p).join(''), line, col(pos), line, col(p));
        pos = p; continue;
      }
      // ---------------------------------------------------------- newline
      if (ch === '\n') {
        const significant = lastSignificant && lastSignificant.type !== 'NEWLINE' && lastSignificant.type !== 'INDENT' && lastSignificant.type !== 'DEDENT';
        const logical = parens.length === 0 && significant;
        push(logical ? 'NEWLINE' : 'NL', '\n', line, col(pos), line, col(pos) + 1);
        pos++; line++; lineStart = pos;
        if (parens.length === 0) atBol = true;
        continue;
      }
      // ---------------------------------------------------------- line continuation
      if (ch === '\\') {
        if (pos + 1 < n && chars[pos + 1] === '\n') {
          // CPython: EOF right after a continuation is "unexpected EOF while parsing", located past the end of the
          // line (offset 0 when nothing precedes the backslash on its line), without an end column
          const eofPos = { offset: lastSignificant && lastSignificant.line === line && lastSignificant.type !== 'NEWLINE' ? col(pos) + 2 : 0, endOffset: -1 };
          pos += 2; line++; lineStart = pos;
          if (pos >= n) {
            // E_EOF: inside brackets CPython reports the innermost one as never closed
            if (parens.length) { const o = parens[parens.length - 1]; fail('SyntaxError', `'${o.ch}' was never closed`, o.line, o.col, { endOffset: 0 }); }
            fail('SyntaxError', 'unexpected EOF while parsing', line - 1, 0, { ...eofPos, done: true });
          }
          contLine = true; atBol = parens.length === 0; // indentation of continuation lines is ignored
          continue;
        }
        if (pos + 1 >= n) {
          const eofPos = { offset: lastSignificant && lastSignificant.line === line && lastSignificant.type !== 'NEWLINE' ? col(pos) + 2 : 0, endOffset: -1 };
          if (parens.length) { const o = parens[parens.length - 1]; fail('SyntaxError', `'${o.ch}' was never closed`, o.line, o.col, { endOffset: 0 }); }
          fail('SyntaxError', 'unexpected EOF while parsing', line, col(pos), { ...eofPos, done: true }); pos++; continue;
        }
        fail('SyntaxError', 'unexpected character after line continuation character', line, col(pos) + 1, { done: true, endOffset: 0 });
        push('ERRORTOKEN', '\\', line, col(pos), line, col(pos) + 1); pos++; continue;
      }
      // ---------------------------------------------------------- identifiers / string prefixes
      if (isIdStart(ch)) {
        let p = pos + 1; while (p < n && isIdCont(chars[p])) p++;
        const word = chars.slice(pos, p).join('');
        if (p < n && (chars[p] === '"' || chars[p] === "'") && STRING_PREFIXES.has(word.toLowerCase())) { pos = readString(pos, p, word); continue; }
        push('NAME', word, line, col(pos), line, col(p));
        pos = p; continue;
      }
      // ---------------------------------------------------------- numbers
      if (isDigit(ch) || (ch === '.' && pos + 1 < n && isDigit(chars[pos + 1]))) { pos = readNumber(pos); continue; }
      // ---------------------------------------------------------- strings
      if (ch === '"' || ch === "'") { pos = readString(pos, pos, ''); continue; }
      // ---------------------------------------------------------- operators
      let op = null;
      const s3 = chars.slice(pos, pos + 3).join('');
      if (s3 === '...' || OPS3.includes(s3) && s3 !== '!==') op = s3;
      else { const s2 = s3.slice(0, 2); if (OPS2.includes(s2)) op = s2; else if (OPS1.includes(ch)) op = ch; }
      if (op) {
        const sc = col(pos);
        if (op === '(' || op === '[' || op === '{') {
          if (parens.length >= 200) fail('SyntaxError', 'too many nested parentheses', line, sc);
          parens.push({ ch: op, line, col: sc });
        } else if (op === ')' || op === ']' || op === '}') {
          if (!parens.length) { fail('SyntaxError', `unmatched '${op}'`, line, sc); push('ERRORTOKEN', op, line, sc, line, sc + 1); pos++; continue; }
          const open = parens[parens.length - 1];
          const want = open.ch === '(' ? ')' : open.ch === '[' ? ']' : '}';
          if (op !== want) {
            const msg = open.line !== line
              ? `closing parenthesis '${op}' does not match opening parenthesis '${open.ch}' on line ${open.line}`
              : `closing parenthesis '${op}' does not match opening parenthesis '${open.ch}'`;
            fail('SyntaxError', msg, line, sc);
          }
          parens.pop();
          if (!parens.length) { /* back to normal line processing */ }
        }
        push('OP', op, line, sc, line, sc + op.length);
        pos += op.length; continue;
      }
      // ---------------------------------------------------------- anything else
      const sc = col(pos);
      const code = ch.codePointAt(0);
      if (code > 127) {
        if (!(uflags(code) & U_PRINTABLE)) fail('SyntaxError', `invalid non-printable character U+${code.toString(16).toUpperCase().padStart(4, '0')}`, line, sc);
        else fail('SyntaxError', `invalid character '${ch}' (U+${code.toString(16).toUpperCase().padStart(4, '0')})`, line, sc);
      } else if (code < 32 && code !== 12) {
        fail('SyntaxError', `invalid non-printable character U+${code.toString(16).toUpperCase().padStart(4, '0')}`, line, sc);
      }
      // ASCII junk ($ ? `) is an ERRORTOKEN for the parser ("invalid syntax")
      push('ERRORTOKEN', ch, line, sc, line, sc + 1);
      pos++;
    }
    // ------------------------------------------------------------ end of input
    const eofLine = (n > 0 && chars[n - 1] === '\n' && line > 1) ? line - 1 : line;
    if (parens.length) {
      // CPython: at EOF inside brackets the tokenizer returns an ERRORTOKEN; the parser reports "'(' was never closed"
      const open = parens[parens.length - 1];
      if (!error) error = new TokError('SyntaxError', `'${open.ch}' was never closed`, open.line, open.col, { unclosed: true, eof: true, endOffset: 0 });
      push('ERRORTOKEN', '', line, col(pos), line, col(pos), { eofUnclosed: true });
    } else if (lastSignificant && lastSignificant.type !== 'NEWLINE' && lastSignificant.type !== 'DEDENT' && lastSignificant.type !== 'INDENT') {
      // implicit NEWLINE at EOF (CPython adds one when the file does not end with '\n')
      push('NEWLINE', '', line, col(pos), line, col(pos), { implicit: true });
    }
    while (indents.length > 1) { indents.pop(); push('DEDENT', '', eofLine, 0, eofLine, 0, { eof: true }); }
    push('ENDMARKER', '', eofLine, 0, eofLine, 0, { eof: true });
  } catch (e) {
    if (e !== STOP_SCAN) throw e;
    tokens.push({ type: 'ERRORTOKEN', string: '', line: error.line, col: error.col, endLine: error.line, endCol: error.col, tokError: true });
  }
  return { tokens, error, openParens: parens.slice() };

  // Number literals, following CPython's tokenizer (tok_get_normal_mode / tok_decimal_tail /
  // verify_end_of_number) so that errors carry CPython's offsets (the index its `cur` points at).
  function readNumber(start) {
    let p = start;                                  // next unread char (CPython's tok->cur)
    const sl = line, sc = col(start);
    const c = (i) => (i < n ? chars[i] : '\n');     // CPython sees a newline at the end of the file
    let failed = false, kind = 'dec';
    const err = (msg, curIdx, extra) => { fail('SyntaxError', msg, sl, col(curIdx) - 1, extra); failed = true; };
    const asciiId = (ch) => /^[A-Za-z0-9_]$/.test(ch);
    const decimalTail = () => {
      for (;;) {
        while (isDigit(c(p))) p++;
        if (c(p) !== '_') return true;
        p++;
        if (!isDigit(c(p))) { err('invalid decimal literal', p); return false; }
      }
    };
    const verifyEnd = (name) => {
      const ch = c(p);
      if (!asciiId(ch)) return true;
      // a keyword right after a number only warns in CPython: "1if x else y" (for 'i' it only checks the next
      // character: "0.isdigit" is NUMBER + NAME)
      if (ch === 'i' && 'fns'.includes(c(p + 1))) return true;
      for (const kw of ['and', 'else', 'for', 'not', 'or']) {
        if (chars.slice(p, p + kw.length).join('') === kw && !asciiId(c(p + kw.length))) return true;
      }
      err(`invalid ${name} literal`, p);
      return false;
    };
    const finish = () => {
      if (failed) { while (p < n && isIdCont(chars[p])) p++; kind = 'dec'; }
      push('NUMBER', chars.slice(start, p).join(''), sl, sc, line, col(p), { numKind: kind });
      return p;
    };
    if (c(p) === '0' && 'xXoObB'.includes(c(p + 1))) {
      const t = c(p + 1).toLowerCase();
      p += 2;
      const name = t === 'x' ? 'hexadecimal' : t === 'o' ? 'octal' : 'binary';
      const test = t === 'x' ? (ch) => /^[0-9a-fA-F]$/.test(ch) : t === 'o' ? (ch) => ch >= '0' && ch <= '7' : (ch) => ch === '0' || ch === '1';
      do {
        if (c(p) === '_') p++;
        if (!test(c(p))) {
          if (t !== 'x' && isDigit(c(p))) err(`invalid digit '${c(p)}' in ${name} literal`, p + 1);
          else err(`invalid ${name} literal`, p);
          return finish();
        }
        while (test(c(p))) p++;
      } while (c(p) === '_');
      if (t !== 'x' && isDigit(c(p))) { err(`invalid digit '${c(p)}' in ${name} literal`, p + 1); return finish(); }
      if (verifyEnd(name)) kind = t;
      return finish();
    }
    let isFloat = false, fraction = false;
    if (c(p) === '.') { p++; fraction = true; }
    else if (c(p) === '0') {
      p++;
      let nonzero = false;
      for (;;) {
        if (c(p) === '_') { p++; if (!isDigit(c(p))) { err('invalid decimal literal', p); return finish(); } }
        if (c(p) !== '0') break;
        p++;
      }
      const zerosEnd = p + 1;                       // CPython: cur after reading the first non-'0' char
      if (isDigit(c(p))) { nonzero = true; if (!decimalTail()) return finish(); }
      if (c(p) === '.') { p++; fraction = true; }
      else if (c(p) === 'e' || c(p) === 'E' || c(p) === 'j' || c(p) === 'J') { /* exponent / imaginary below */ }
      else if (nonzero) {
        err('leading zeros in decimal integer literals are not permitted; use an 0o prefix for octal integers', start + 1, { endOffset: col(zerosEnd) });
        return finish();
      }
    } else {
      if (!decimalTail()) return finish();
      if (c(p) === '.') { p++; fraction = true; }
    }
    if (fraction) { isFloat = true; if (isDigit(c(p)) && !decimalTail()) return finish(); }
    if (c(p) === 'e' || c(p) === 'E') {
      const e = p;
      p++;
      if (c(p) === '+' || c(p) === '-') {
        p++;
        if (!isDigit(c(p))) { err('invalid decimal literal', p); return finish(); }
      } else if (!isDigit(c(p))) {
        p = e;                                       // the number ends before the 'e' ("1else" is allowed)
        if (verifyEnd('decimal') && isFloat) kind = 'float';
        return finish();
      }
      if (!decimalTail()) return finish();
      isFloat = true;
    }
    if (c(p) === 'j' || c(p) === 'J') {
      p++;
      if (verifyEnd('imaginary')) kind = 'imag';
      return finish();
    }
    if (verifyEnd('decimal') && isFloat) kind = 'float';
    return finish();
  }

  /** end of a \N{NAME} escape at p in a non-raw f-string (or -1): the '{' is consumed and the next '}' is literal */
  function fNamedEscapeEnd(p) {
    if (fRaw || chars[p + 1] !== 'N' || chars[p + 2] !== '{') return -1;
    let k = p + 3;
    while (k < n) {
      const c = chars[k];
      if (c === '}') return k + 1;
      if (c === '{' || c === '\n' || c === '"' || c === "'") return k;
      if (c === '\\') {
        if (chars[k + 1] === 'N' && chars[k + 2] === '{') { k += 3; continue; }
        if (chars[k + 1] === '}') return k + 2;
        if (chars[k + 1] === '{' || chars[k + 1] === '\n') return k + 1;
        k += 2; continue;
      }
      k++;
    }
    return k;
  }

  function readString(start, qpos, prefix) {
    const sl = line, sc = col(start);
    const pfx = prefix.toLowerCase();
    const q = chars[qpos];
    const triple = chars[qpos + 1] === q && chars[qpos + 2] === q;
    const raw = pfx.includes('r');
    const fstring = pfx.includes('f');
    let p = qpos + (triple ? 3 : 1);
    const bodyStart = p, bodyLine = line, bodyCol = col(p);
    const kindName = fstring ? 'f-string' : 'string';
    specUnclosed = false;
    fRaw = raw;
    let escapedQuote = false;
    for (;;) {
      if (p >= n) {
        const dl = Math.max(sl, (n > 0 && chars[n - 1] === '\n') ? line - 1 : line);
        if (triple) fail('SyntaxError', `unterminated triple-quoted ${kindName} literal (detected at line ${dl})`, sl, sc);
        else fail('SyntaxError', `unterminated ${kindName} literal (detected at line ${dl})${escapedQuote && !fstring ? '; perhaps you escaped the end quote?' : ''}`, sl, sc);
        // lenient: emit what we have
        push('ERRORTOKEN', chars.slice(start, p).join(''), sl, sc, line, col(p), { badString: true });
        return p;
      }
      const c = chars[p];
      if (c === '\\') {
        if (p + 1 < n && chars[p + 1] === '\n') { p += 2; line++; lineStart = p; continue; }
        if (chars[p + 1] === q) escapedQuote = true;
        if (fstring) {
          // CPython's f-string lexer: a backslash right before '{' / '}' does not escape it (the brace is read
          // next, as a replacement field or '{{'), and \N{...} is one escape whose '}' is literal text
          if (chars[p + 1] === '{' || chars[p + 1] === '}') { p++; continue; }
          const k = fNamedEscapeEnd(p);
          if (k > 0) { p = k; continue; }
        }
        p += 2; continue;
      }
      if (c === '\n') {
        if (!triple) {
          const hint = escapedQuote && !fstring ? '; perhaps you escaped the end quote?' : '';
          fail('SyntaxError', `unterminated ${kindName} literal (detected at line ${line})${hint}`, sl, sc);
          push('ERRORTOKEN', chars.slice(start, p).join(''), sl, sc, line, col(p), { badString: true });
          return p;
        }
        p++; line++; lineStart = p; continue;
      }
      if (fstring && c === '{') {
        if (chars[p + 1] === '{') { p += 2; continue; }
        const fieldLine = line, fieldCol = col(p);
        const r = skipFExpr(p + 1, q, triple, { line, col: col(p) });
        if (r < 0) {
          // end of file inside the replacement field: CPython reports the field's '{' as never closed
          if (fexprFail === 'eof') fail('SyntaxError', "'{' was never closed", fieldLine, fieldCol, { endOffset: 0 });
          else if (fexprFail === 'unterminated') {
            const dl = Math.max(sl, (n > 0 && chars[n - 1] === '\n' && p >= n) ? line - 1 : line);
            fail('SyntaxError', triple ? `unterminated triple-quoted f-string literal (detected at line ${dl})` : `unterminated f-string literal (detected at line ${line})`, sl, sc);
          }
          push('ERRORTOKEN', chars.slice(start, n).join(''), sl, sc, line, col(n), { badString: true });
          return n;
        }
        p = r; continue;
      }
      if (c === q) {
        if (!triple) break;
        if (chars[p + 1] === q && chars[p + 2] === q) break;
      }
      p++;
    }
    const body = chars.slice(bodyStart, p).join('');
    p += triple ? 3 : 1;
    push('STRING', chars.slice(start, p).join(''), sl, sc, line, col(p), {
      prefix, quote: q, triple, raw, fstring, bytes: pfx.includes('b'), body, bodyLine, bodyCol, specUnclosed,
    });
    return p;
  }

  // skip an f-string replacement field starting after '{'; returns index after the matching '}' (or -1 at EOF)
  function skipFExpr(p, q, triple, open) {
    let depth = 0, specNested = false;
    const stack = [];
    fexprFail = 'reported';
    let inSpec = false;
    while (p < n) {
      const c = chars[p];
      if (inSpec) {
        // after a nested field closes CPython leaves format-spec mode (in_format_spec = 0)
        if (c === '{') { const r = skipFExpr(p + 1, q, triple, { line, col: col(p) }); if (r < 0) return -1; p = r; specNested = true; continue; }
        if (c === '}') return p + 1;
        if (c === '\\') {
          // as in the literal part: '\{' / '\}' leave the brace to be read next, \N{...} is one escape
          if (chars[p + 1] === '{' || chars[p + 1] === '}') { p++; continue; }
          const k = fNamedEscapeEnd(p);
          if (k > 0) { p = k; continue; }
          if (p + 1 < n && chars[p + 1] !== '\n') { p += 2; continue; }
        }
        if (c === q && (!triple || (chars[p + 1] === q && chars[p + 2] === q))) {
          // CPython 3.12+: the closing quote ends the f-string even inside a format spec, and the replacement
          // field's '{' stays open, so the rest of the line is tokenized as if inside brackets
          if (open) { parens.push({ ch: '{', line: open.line, col: open.col }); specUnclosed = true; }
          return p;
        }
        if (c === '\n') {
          if (!triple) {
            if (specNested) { fexprFail = 'unterminated'; return -1; }
            fail('SyntaxError', 'f-string: newlines are not allowed in format specifiers for single quoted f-strings', line, col(p));
            fexprFail = 'reported'; return -1;
          }
          line++; lineStart = p + 1;
        }
        p++; continue;
      }
      // expression part: like ordinary code inside brackets (PEP 701), so it may span lines
      if (c === '\n') { line++; lineStart = p + 1; p++; continue; }
      if (c === '#') { while (p < n && chars[p] !== '\n') p++; continue; }
      if (c === '"' || c === "'") {
        // nested string literal: PEP 701 allows any quotes, including the f-string's own
        const tq = chars[p + 1] === c && chars[p + 2] === c;
        let ps = p;                                   // token start including a string prefix
        while (ps > 0 && /[rRbBuUfF]/.test(chars[ps - 1])) ps--;
        if (ps > 0 && isIdCont(chars[ps - 1])) ps = p;
        let k = p + (tq ? 3 : 1);
        let closed = false;
        const nsLine = line, nsCol = col(ps);
        while (k < n) {
          if (chars[k] === '\\') { k += 2; continue; }
          if (chars[k] === c && (!tq || (chars[k + 1] === c && chars[k + 2] === c))) { k += tq ? 3 : 1; closed = true; break; }
          if (chars[k] === '\n' && !tq) break;
          if (chars[k] === '\n') { line++; lineStart = k + 1; }
          k++;
        }
        if (!closed) {
          // CPython: an unterminated nested string with the f-string's own quote means a missing '}'
          if (c === q && tq === triple) fail('SyntaxError', "f-string: expecting '}'", nsLine, nsCol);
          else fail('SyntaxError', tq ? `unterminated triple-quoted string literal (detected at line ${line})` : `unterminated string literal (detected at line ${line})`, nsLine, nsCol);
          return -1;
        }
        p = k; continue;
      }
      if (c === '(' || c === '[' || c === '{') { stack.push({ ch: c, line }); depth++; p++; continue; }
      if (c === ')' || c === ']' || (c === '}' && depth > 0)) {
        // the tokenizer's bracket checks (the field's own '{' is the bottom of the stack)
        if (!stack.length) { fail('SyntaxError', `f-string: unmatched '${c}'`, line, col(p)); return -1; }
        const o = stack.pop();
        if ((o.ch === '(') !== (c === ')') || (o.ch === '[') !== (c === ']')) {
          fail('SyntaxError', o.line !== line ? `closing parenthesis '${c}' does not match opening parenthesis '${o.ch}' on line ${o.line}` : `closing parenthesis '${c}' does not match opening parenthesis '${o.ch}'`, line, col(p));
          return -1;
        }
        depth--; p++; continue;
      }
      if (c === '}') return p + 1;
      if (c === ':' && depth === 0) { inSpec = true; p++; continue; }
      if (c === '!' && depth === 0 && chars[p + 1] !== '=') { p++; continue; }
      p++;
    }
    // end of file (CPython sees a final newline)
    if (!inSpec) fexprFail = 'eof';
    else if (triple || specNested) fexprFail = 'unterminated';
    else { fail('SyntaxError', 'f-string: newlines are not allowed in format specifiers for single quoted f-strings', line, col(n)); fexprFail = 'reported'; }
    return -1;
  }
}
const STOP_SCAN = { stop: true };

// ------------------------------------------------------------------ highlighting tokens (public tokenize())
/**
 * Highlighting-oriented tokenizer: never throws.
 * opts.fstrings === 'split': an f-string becomes its parts, like Python 3.12+'s tokenize: 'fstring-start' (prefix and
 * opening quote), 'fstring-middle' (literal text, as written: {{ stays {{), op '{', the tokens of the expression, an
 * optional op '=' (debug), op '!' with the conversion name, op ':' with the format spec ('fstring-middle' text and
 * nested fields), op '}', and 'fstring-end' (closing quote). The parts tile the source exactly.
 * @returns {{type: string, text: string, line: number, col: number}[]}
 */
export function tokenizeForHighlight(src, builtinNames, opts = {}) {
  const text = String(src ?? '');
  const B = builtinNames instanceof Set ? builtinNames : new Set(builtinNames || []);
  const out = hlTokens(text, B, opts.fstrings === 'split');
  // the scanner counts columns in code points; highlighters slice JS strings, so col is turned into a UTF-16 index
  // on lines with characters outside the BMP (emoji)
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const astral = /[\uD800-\uDBFF]/;
  for (const t of out) {
    const l = lines[t.line - 1];
    if (!l || !astral.test(l)) continue;
    let i = 0;
    for (let k = 0; k < t.col && i < l.length; k++) i += l.codePointAt(i) > 0xffff ? 2 : 1;
    t.col = i;
  }
  return out;
}
/** highlighting tokens with code point columns */
function hlTokens(text, B, splitF) {
  const { tokens } = scan(text, { lenient: true });
  const out = [];
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  let prev = null;   // previous significant token
  // DEDENTs at the end of the file sit on the line after the last one, like Python's tokenize module
  const eofLine = text.length ? (text.replace(/\r\n?/g, '\n').endsWith('\n') ? lines.length : lines.length + 1) : 1;
  for (const t of tokens) {
    let type;
    switch (t.type) {
      case 'NAME':
        if (KW.has(t.string)) type = 'keyword';
        else if (SOFT_KEYWORDS.includes(t.string) && t.string !== '_' && t.string !== 'type' && isSoftKwUse(tokens, t)) type = 'keyword';
        // an attribute (obj.print, "{}".format) or the name being defined (def len) is not the builtin (like IDLE)
        else if (prev && ((prev.type === 'OP' && prev.string === '.') || (prev.type === 'NAME' && (prev.string === 'def' || prev.string === 'class')))) type = 'name';
        else type = B.has(t.string) ? 'builtin' : 'name';
        break;
      case 'NUMBER': type = 'number'; break;
      case 'STRING': type = t.fstring ? 'fstring' : 'string'; break;
      case 'COMMENT': type = 'comment'; break;
      case 'OP': type = 'op'; break;
      case 'NEWLINE': case 'NL': type = 'newline'; break;
      case 'INDENT': type = 'indent'; break;
      case 'DEDENT': type = 'dedent'; break;
      case 'ENDMARKER': continue;
      default: type = 'error';
    }
    if (t.type === 'ERRORTOKEN' && t.string === '') continue;
    if (t.type === 'DEDENT' && t.eof) { out.push({ type, text: t.string, line: eofLine, col: 0 }); prev = t; continue; }
    if (splitF && type === 'fstring') splitFString(t.string, t.line, t.col, B, out);
    else out.push({ type, text: t.string, line: t.line, col: t.col });
    if (t.type !== 'COMMENT' && t.type !== 'NL') prev = t;
  }
  return out;
}
/** the parts of one f-string token (code point columns), appended to out */
function splitFString(src, line0, col0, B, out) {
  const ch = Array.from(src);
  let line = line0, col = col0, i = 0;
  const advance = (k) => { for (let j = 0; j < k && i < ch.length; j++, i++) { if (ch[i] === '\n') { line++; col = 0; } else col++; } };
  const emit = (type, k) => { const t = { type, text: ch.slice(i, i + k).join(''), line, col }; if (k > 0) out.push(t); advance(k); };
  let p = 0;
  while (p < ch.length && ch[p] !== '"' && ch[p] !== "'") p++;
  const q = ch[p];
  const triple = ch[p + 1] === q && ch[p + 2] === q;
  const ql = triple ? 3 : 1;
  const raw = /r/i.test(ch.slice(0, p).join(''));
  emit('fstring-start', p + ql);
  const bodyEnd = ch.length - ql;
  const closing = ch.slice(bodyEnd).join('') === q.repeat(ql);
  const end = closing ? bodyEnd : ch.length;
  // literal text up to a field (or the end); stopAtClose: inside a format spec, which ends at its '}'
  const literal = (stopAtClose) => {
    let k = i;
    while (k < end) {
      const c = ch[k];
      if (c === '\\' && !raw) { k += 2; continue; }
      if ((c === '{' || c === '}') && ch[k + 1] === c && !stopAtClose) { k += 2; continue; }
      if (c === '{' || c === '}') break;
      k++;
    }
    emit('fstring-middle', Math.min(k, end) - i);
  };
  const field = () => {
    emit('op', 1);   // {
    // the expression: up to a top-level !, :, = (debug) or }
    let k = i, depth = 0;
    while (k < end) {
      const c = ch[k];
      if (c === '"' || c === "'") {
        const tq = ch[k + 1] === c && ch[k + 2] === c ? c.repeat(3) : c;
        let m = k + tq.length;
        while (m < end && ch.slice(m, m + tq.length).join('') !== tq) m += ch[m] === '\\' ? 2 : 1;
        k = m + tq.length; continue;
      }
      if (c === '#') { while (k < end && ch[k] !== '\n') k++; continue; }
      if ('([{'.includes(c)) { depth++; k++; continue; }
      if (')]'.includes(c)) { depth--; k++; continue; }
      if (c === '}') { if (depth <= 0) break; depth--; k++; continue; }
      if (depth <= 0) {
        if (c === '!' && ch[k + 1] !== '=') break;
        if (c === ':') break;
        if (c === '=' && ch[k + 1] !== '=' && !'=!<>:'.includes(ch[k - 1] || '')) {
          // debug '=': only when what follows (after spaces) is the end of the field, '!' or ':'
          let m = k + 1;
          while (m < end && /\s/.test(ch[m])) m++;
          if (ch[m] === '}' || ch[m] === ':' || (ch[m] === '!' && ch[m + 1] !== '=')) break;
        }
      }
      k++;
    }
    const exprText = ch.slice(i, k).join('');
    if (exprText.length) {
      const fl = line, fc = col;
      // tokenised inside brackets (no indentation rules), then the wrapper's '(' and ')' are dropped
      const inner = hlTokens('(' + exprText + ')', B, true).filter((t) => t.type !== 'newline' && t.type !== 'indent' && t.type !== 'dedent');
      const lastLine = exprText.split('\n').length, lastCol = Array.from(exprText.split('\n').pop()).length + (lastLine === 1 ? 1 : 0);
      const tail = inner[inner.length - 1];
      if (tail && tail.type === 'op' && tail.text === ')' && tail.line === lastLine && tail.col === lastCol) inner.pop();
      for (const t of inner.slice(1)) out.push({ ...t, line: fl + t.line - 1, col: t.line === 1 ? fc + t.col - 1 : t.col });
      advance(k - i);
    }
    if (ch[i] === '=') { emit('op', 1); while (i < end && /\s/.test(ch[i])) advance(1); }
    if (ch[i] === '!') { emit('op', 1); let m = i; while (m < end && /\w/.test(ch[m])) m++; emit('name', m - i); }
    if (ch[i] === ':') {
      emit('op', 1);
      for (;;) {
        literal(true);
        if (i < end && ch[i] === '{') { field(); continue; }
        break;
      }
    }
    if (i < end && ch[i] === '}') emit('op', 1);
  };
  while (i < end) {
    literal(false);
    if (i >= end) break;
    if (ch[i] === '{') field();
    else emit('fstring-middle', 1);   // a lone '}' (an error in Python): keep the text
  }
  if (closing) emit('fstring-end', ql);
}
function isSoftKwUse(tokens, t) {
  // 'match x:' / 'case 1:' → keyword: at the start of a statement, with something after it, and the logical line
  // ends with a ':' outside brackets (match_stmt / case_block). match += 1, match[0] = 2, case: int = 3 and
  // match(x) are ordinary names.
  const i = tokens.indexOf(t);
  const prev = tokens[i - 1];
  if (prev && !(prev.type === 'NEWLINE' || prev.type === 'NL' || prev.type === 'INDENT' || prev.type === 'DEDENT')) return false;
  let depth = 0, last = null, count = 0;
  for (let j = i + 1; j < tokens.length; j++) {
    const x = tokens[j];
    if (x.type === 'NEWLINE' || x.type === 'ENDMARKER') break;
    if (x.type === 'COMMENT' || x.type === 'NL') continue;
    if (x.type === 'OP') {
      if ('([{'.includes(x.string)) depth++;
      else if (')]}'.includes(x.string)) depth--;
    }
    last = { tok: x, depth };
    count++;
  }
  return count >= 2 && last !== null && last.depth === 0 && last.tok.type === 'OP' && last.tok.string === ':';
}
