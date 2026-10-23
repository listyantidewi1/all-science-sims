// minipy — recursive-descent parser producing a small Python AST.
// Error messages emulate CPython 3.13's PEG parser (first pass + "invalid_*" second-pass rules) for the
// mistakes students make: missing ':', missing indented block, '=' vs '==', missing comma, unclosed brackets...
import { scan, KEYWORDS } from './tokenizer.js';
import { ELLIPSIS, chrOf } from './values.js';

// The Unicode name table (~130 KB gzipped) is only needed for \N{...} escapes, so it loads in the background instead
// of delaying every Python sim. Until it arrives, a \N{...} escape is reported as a SyntaxError that says so.
let lookupUnicodeName = null;
export const unicodeNamesReady = import('./uninames.js').then((m) => { lookupUnicodeName = m.lookupUnicodeName; }, () => {});

const KW = new Set(KEYWORDS);
const AUGOPS = new Set(['+=', '-=', '*=', '/=', '//=', '%=', '**=', '>>=', '<<=', '&=', '^=', '|=', '@=']);
const COMPOPS = new Set(['<', '>', '==', '>=', '<=', '!=', 'in', 'not in', 'is', 'is not']);

export class PySyntaxError {
  constructor(type, msg, line, col, extra) { this.type = type; this.msg = msg; this.line = line; this.col = col; Object.assign(this, extra || {}); }
}

/** Expression "kind" names used in CPython's messages (_PyPegen_get_expr_name) */
export function exprName(e) {
  switch (e.t) {
    case 'Attribute': return 'attribute';
    case 'Subscript': return 'subscript';
    case 'Starred': return 'starred';
    case 'Name': return 'name';
    case 'List': return 'list';
    case 'Tuple': return 'tuple';
    case 'Lambda': return 'lambda';
    case 'Yield': case 'YieldFrom': return 'yield expression';
    case 'Call': return 'function call';
    case 'BoolOp': case 'BinOp': case 'UnaryOp': return 'expression';
    case 'GenExp': return 'generator expression';
    case 'ListComp': return 'list comprehension';
    case 'SetComp': return 'set comprehension';
    case 'DictComp': return 'dict comprehension';
    case 'Dict': return 'dict literal';
    case 'Set': return 'set display';
    case 'JoinedStr': case 'FormattedValue': return 'f-string expression';
    case 'Const': {
      const v = e.value;
      if (v === null) return 'None';
      if (v === true) return 'True';
      if (v === false) return 'False';
      if (e.ellipsis) return 'ellipsis';
      return 'literal';
    }
    case 'Compare': return 'comparison';
    case 'IfExp': return 'conditional expression';
    case 'NamedExpr': return 'named expression';
  }
  return 'expression';
}

// --------------------------------------------------------------------------------------------- string literals
/**
 * Escapes of a (non-raw) string literal, like CPython's decode_unicode_with_escapes + unicode_escape decoder.
 * Error positions are offsets in CPython's intermediate buffer, where every non-ASCII character is written as a
 * 10-byte \UXXXXXXXX escape (and a backslash before one as \u005c).
 */
function decodeEscapes(s, raw, onBad) {
  if (raw || s.indexOf('\\') < 0) return s;
  const bufPos = (k) => {
    let p = 0, j = 0;
    while (j < k && j < s.length) {
      if (s[j] === '\\') {
        p++; j++;
        if (j >= s.length || s.codePointAt(j) >= 0x80) p += 5;
        if (j >= s.length || j >= k) continue;
      }
      const cp = s.codePointAt(j);
      if (cp >= 0x80) { p += 10; j += cp > 0xffff ? 2 : 1; } else { p++; j++; }
    }
    return p;
  };
  const fail = (start, endIdx, msg) => {
    const a = bufPos(start), b = bufPos(endIdx);
    onBad(b - a === 1
      ? `(unicode error) 'unicodeescape' codec can't decode byte 0x5c in position ${a}: ${msg}`
      : `(unicode error) 'unicodeescape' codec can't decode bytes in position ${a}-${b - 1}: ${msg}`);
  };
  const isHex = (c) => c !== undefined && /^[0-9a-fA-F]$/.test(c);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c !== '\\') { out += c; continue; }
    const start = i;
    const d = s[++i];
    switch (d) {
      case '\n': break;
      case '\\': out += '\\'; break;
      case "'": out += "'"; break;
      case '"': out += '"'; break;
      case 'a': out += '\x07'; break;
      case 'b': out += '\b'; break;
      case 'f': out += '\f'; break;
      case 'n': out += '\n'; break;
      case 'r': out += '\r'; break;
      case 't': out += '\t'; break;
      case 'v': out += '\v'; break;
      case 'x': case 'u': case 'U': {
        const len = d === 'x' ? 2 : d === 'u' ? 4 : 8;
        let k = i + 1;
        while (k < i + 1 + len && isHex(s[k])) k++;
        if (k < i + 1 + len) { fail(start, k, `truncated \\${d}${'X'.repeat(len)} escape`); return out; }
        const cp = parseInt(s.slice(i + 1, k), 16);
        if (cp > 0x10ffff) { fail(start, k, 'illegal Unicode character'); return out; }
        out += chrOf(cp); i = k - 1; break;
      }
      case 'N': {
        if (s[i + 1] !== '{') { fail(start, i + 1, 'malformed \\N character escape'); return out; }
        const close = s.indexOf('}', i + 2);
        if (close < 0) { fail(start, s.length, 'malformed \\N character escape'); return out; }
        const name = s.slice(i + 2, close);
        if (!name) { fail(start, close, 'malformed \\N character escape'); return out; }
        if (!lookupUnicodeName) { fail(start, close + 1, 'Unicode character names are still loading; run the program again in a moment'); return out; }
        const cp = lookupUnicodeName(name);
        if (cp < 0) { fail(start, close + 1, 'unknown Unicode character name'); return out; }
        out += String.fromCodePoint(cp); i = close; break;
      }
      default:
        if (d >= '0' && d <= '7') {
          let j = i, oct = '';
          while (j < s.length && oct.length < 3 && s[j] >= '0' && s[j] <= '7') oct += s[j++];
          out += String.fromCharCode(parseInt(oct, 8)); i = j - 1;
        } else if (d === undefined) out += '\\';
        else out += '\\' + d;        // invalid escape: kept (CPython only warns)
    }
  }
  return out;
}

/**
 * end of a \N{NAME} escape at i of an f-string body (or -1 when there is none): CPython's lexer keeps the '{' and
 * reads on (another \N{ included) until a '}', which is literal text; a plain '{' starts a replacement field
 */
function fNamedEscape(body, i) {
  if (body[i + 1] !== 'N' || body[i + 2] !== '{') return -1;
  let k = i + 3;
  while (k < body.length) {
    const c = body[k];
    if (c === '}') return k + 1;
    if (c === '{') return k;
    if (c === '\\') {
      if (body[k + 1] === 'N' && body[k + 2] === '{') { k += 3; continue; }
      if (body[k + 1] === '}') return k + 2;
      if (body[k + 1] === '{') return k + 1;
      k += 2; continue;
    }
    k++;
  }
  return k;
}
/** index of the '}' that ends a format spec starting at k (body.length if none): nested replacement fields may
 * hold any expression (string literals with braces or colons), and escapes are skipped like the lexer does */
function fSpecEnd(body, k, raw) {
  while (k < body.length) {
    const c = body[k];
    if (c === '}') return k;
    if (c === '{') { k = fFieldEnd(body, k + 1, raw); if (k >= body.length) return body.length; k++; continue; }
    if (c === '\\') {
      if (body[k + 1] === '{' || body[k + 1] === '}') { k++; continue; }
      const ne = raw ? -1 : fNamedEscape(body, k);
      if (ne > 0) { k = ne; continue; }
      k += 2; continue;
    }
    k++;
  }
  return k;
}
/** index of the '}' closing a replacement field whose expression starts at j (body.length if none) */
function fFieldEnd(body, j, raw) {
  let depth = 0, quote = null;
  while (j < body.length) {
    const d = body[j];
    if (quote) {
      if (d === '\\') { j += 2; continue; }
      if (body.startsWith(quote, j)) { j += quote.length; quote = null; continue; }
      j++; continue;
    }
    if (d === '"' || d === "'") { quote = body.startsWith(d.repeat(3), j) ? d.repeat(3) : d; j += quote.length; continue; }
    if (d === '#') { while (j < body.length && body[j] !== '\n') j++; continue; }
    if (d === '(' || d === '[' || d === '{') { depth++; j++; continue; }
    if (d === ')' || d === ']') { depth--; j++; continue; }
    if (d === '}') { if (depth > 0) { depth--; j++; continue; } return j; }
    if (depth === 0 && d === ':') return fSpecEnd(body, j + 1, raw);
    j++;
  }
  return j;
}

// --------------------------------------------------------------------------------------------- parser
class ParseFail { constructor(err) { this.err = err; } }
const tokLoc = (t) => ({ line: t.line, col: t.col, endLine: t.endLine, endCol: t.endCol });

export function parse(src, opts = {}) {
  const scanned = scan(src);
  const p = new Parser(scanned, src, opts);
  try {
    const body = p.parseFile();
    return { ok: true, ast: { t: 'Module', body, line: 1 } };
  } catch (e) {
    if (!(e instanceof ParseFail)) throw e;
    return { ok: false, error: p.resolveError(e.err) };
  }
}

/** parse a single expression (used by evalExpression / f-strings) */
export function parseExpressionSource(src, opts = {}) {
  const scanned = scan(src);
  const p = new Parser(scanned, src, opts);
  try {
    const e = p.parseEvalInput();
    return { ok: true, ast: e };
  } catch (e) {
    if (!(e instanceof ParseFail)) throw e;
    return { ok: false, error: p.resolveError(e.err) };
  }
}

class Parser {
  constructor(scanned, src, opts) {
    this.scanned = scanned;
    this.src = src;
    this.lineOffset = opts.lineOffset || 0;
    this.colOffset = opts.colOffset || 0;
    this.inFString = !!opts.inFString;
    const toks = [];
    let level = 0;
    for (const t of scanned.tokens) {
      if (t.type === 'COMMENT' || t.type === 'NL') continue;
      if (t.type === 'OP') {
        if (t.string === '(' || t.string === '[' || t.string === '{') { t.level = level; level++; } else if (t.string === ')' || t.string === ']' || t.string === '}') { level = Math.max(0, level - 1); t.level = level; } else t.level = level;
      } else t.level = level;
      if (this.lineOffset) { t.line += this.lineOffset; t.endLine += this.lineOffset; }
      toks.push(t);
    }
    this.toks = toks;
    this.i = 0;
    this.maxI = 0;     // furthest token of the "first pass" (generic error location); speculative parses restore it
    this.fillI = 0;    // furthest token fetched at all (CPython's p->fill), used by the unclosed-bracket rule
    this.funcDepth = 0;
  }

  // ------------------------------------------------------------------ token helpers
  get tok() {
    const t = this.toks[this.i];
    if (this.i > this.maxI) this.maxI = this.i;
    if (this.i > this.fillI) this.fillI = this.i;
    if (t.type === 'ERRORTOKEN') this.onErrorToken(t);
    return t;
  }
  peekTok(k = 1) {
    const j = Math.min(this.i + k, this.toks.length - 1);
    const t = this.toks[j];
    if (j > this.maxI) this.maxI = j;
    if (j > this.fillI) this.fillI = j;
    if (t.type === 'ERRORTOKEN') this.onErrorToken(t);
    return t;
  }
  onErrorToken(t) {
    if (t.tokError) throw new ParseFail({ kind: 'tok', err: this.scanned.error });
    if (t.eofUnclosed) throw new ParseFail({ kind: 'unclosed' });
    // stray ASCII character such as '$' or '?': generic error located at it
  }
  next() { const t = this.tok; this.i++; return t; }
  isOp(s) { const t = this.tok; return t.type === 'OP' && t.string === s; }
  isKw(s) { const t = this.tok; return t.type === 'NAME' && t.string === s; }
  isOpAt(k, s) { const t = this.peekTok(k); return t.type === 'OP' && t.string === s; }
  eatOp(s) { if (this.isOp(s)) { this.i++; return true; } return false; }
  eatKw(s) { if (this.isKw(s)) { this.i++; return true; } return false; }
  expectOp(s) { if (!this.eatOp(s)) this.generic(); }
  expectKw(s) { if (!this.eatKw(s)) this.generic(); }

  // Error locations follow CPython: line/col start, endLine/endCol end (0-based col_offset / end_col_offset).
  // Without an end, the caret covers one character.
  fail(msg, line, col, extra) { throw new ParseFail({ kind: 'specific', type: 'SyntaxError', msg, line, col, endLine: line, endCol: col, ...(extra || {}) }); }
  /** RAISE_SYNTAX_ERROR_KNOWN_LOCATION(node) */
  failAt(msg, node, extra) { this.fail(msg, node.line, node.col, { endLine: node.endLine ?? node.line, endCol: node.endCol ?? node.col, ...(extra || {}) }); }
  /** RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b) */
  failRange(msg, a, b) { this.fail(msg, a.line, a.col, { endLine: b.endLine ?? b.line, endCol: b.endCol ?? b.col }); }
  /** RAISE_SYNTAX_ERROR_STARTING_FROM(a): from a to the tokenizer's current position (end of the furthest token) */
  failFrom(msg, a) {
    const t = this.toks[Math.min(Math.max(this.maxI, this.fillI), this.toks.length - 1)];
    this.fail(msg, a.line, a.col, { endLine: t.endLine, endOffset: t.type === 'NEWLINE' ? t.col + 1 : t.endCol });
  }
  /**
   * PEG ordered choice: run fn(); on a generic failure backtrack to the current position and return null (the
   * furthest-token frontier stays, as in CPython). Specific errors (invalid_* rules) and tokenizer errors propagate.
   */
  attempt(fn) {
    const save = this.i;
    try { return { v: fn() }; } catch (err) {
      if (err instanceof ParseFail && err.err.kind === 'generic') { this.i = save; return null; }
      throw err;
    }
  }
  /** speculative parse: true when fn() succeeds; position and first-pass frontier are restored either way */
  tryParse(fn) {
    const save = this.i, saveMax = this.maxI;
    let ok = false, result = null;
    try { result = fn(); ok = true; } catch (err) { if (!(err instanceof ParseFail) || err.err.kind === 'tok' || err.err.kind === 'unclosed') throw err; }
    const end = this.i;
    this.i = save; this.maxI = saveMax;
    return ok ? { result, end } : null;
  }
  /** RAISE_SYNTAX_ERROR(msg): located at the last token the parser fetched */
  failLast(msg) { this.failTok(msg, this.toks[Math.min(this.maxI, this.toks.length - 1)]); }
  /** error located at token t (RAISE_SYNTAX_ERROR_KNOWN_LOCATION(t)) */
  failTok(msg, t) { this.failAt(msg, t); }
  indentFail(msg, t) { throw new ParseFail({ kind: 'specific', type: 'IndentationError', msg, ...tokLoc(t) }); }
  /** "expected an indented block": at the next token, or (DEDENT / ENDMARKER, which CPython positions at the
   *  tokenizer's cursor) at the start of that line without a caret */
  noIndentFail(msg) { this.failAtTokenOrCursor(msg, this.tok, 'IndentationError'); }
  /** RAISE_*_ERROR at token t; DEDENT/ENDMARKER have no position in CPython, which then uses the tokenizer cursor */
  failAtTokenOrCursor(msg, t, type) {
    if (t.type === 'DEDENT' || t.type === 'ENDMARKER') {
      // at end of input `python3 main.py` reports offset 0 (no caret) while compile() reports the end of that line:
      // the traceback follows the former, PyError.col the latter
      const lineText = t.eof ? (this.src.split('\n')[t.line - 1] ?? '') : null;
      throw new ParseFail({ kind: 'specific', type, msg, line: t.line, offset: t.eof ? 0 : t.col, endOffset: -1, ...(t.eof ? { apiCol: Array.from(lineText).length + 1 } : {}) });
    }
    throw new ParseFail({ kind: 'specific', type, msg, ...tokLoc(t) });
  }
  generic() {
    // generic "invalid syntax" at the furthest token reached (CPython uses the last token of its first pass)
    const t = this.toks[Math.min(this.maxI, this.toks.length - 1)];
    if (t.type === 'INDENT') this.unexpectedIndent(t);
    if (t.type === 'ERRORTOKEN' && t.eofUnclosed) throw new ParseFail({ kind: 'unclosed' });
    throw new ParseFail({ kind: 'generic', type: 'SyntaxError', msg: 'invalid syntax', ...tokLoc(t) });
  }
  unexpectedIndent(t) {
    // CPython: IndentationError located at the end of the indentation, without an end column (no caret)
    throw new ParseFail({ kind: 'indent', type: 'IndentationError', msg: 'unexpected indent', line: t.line, col: t.endCol - 1, endLine: t.line, endOffset: -1 });
  }
  unsupported(what, t) { throw new ParseFail({ kind: 'unsupported', type: 'SyntaxError', msg: `minipy does not support ${what} yet`, ...tokLoc(t) }); }

  /** turn a ParseFail payload into the final error, applying CPython's tokenizer-error priority rules */
  resolveError(f) {
    const tokErr = this.scanned.error;
    // payload → PySyntaxError with CPython's 1-based offset / end_offset
    const mk = (e, type = e.type, msg = e.msg) => {
      const offset = e.offset !== undefined ? e.offset : (e.col || 0) + 1;
      const endLine = e.endLine ?? e.line;
      const endCol = e.endOffset !== undefined ? e.endOffset : e.endCol == null ? offset : e.endCol + 1;
      return new PySyntaxError(type, msg, e.line, offset, e.apiCol ? { endLine, endCol, apiCol: e.apiCol } : { endLine, endCol });
    };
    const shift = (e) => (this.lineOffset ? { ...e, line: e.line + this.lineOffset, endLine: e.endLine > 0 ? e.endLine + this.lineOffset : e.endLine } : e);
    if (f.kind === 'tok') return mk(shift(f.err));
    if (f.kind === 'unclosed') return mk(shift(tokErr), 'SyntaxError');
    if (f.kind === 'indent' || f.kind === 'unsupported' && !tokErr) return mk(f);
    // parser error: a tokenizer error later in the file wins (CPython tokenizes the rest of the source)
    if (tokErr && !this.inFString) {
      // only errors the C tokenizer raises as exceptions win; E_DEDENT / E_TABSPACE / E_EOF / E_LINECONT do not
      if (!tokErr.unclosed && !tokErr.done) return mk(shift(tokErr));
      const furthest = this.toks[Math.min(Math.max(this.maxI, this.fillI), this.toks.length - 1)];
      if (furthest.line > tokErr.line + this.lineOffset) return mk(shift(tokErr), 'SyntaxError');
    }
    return mk(f);
  }

  node(t, tok, props) { const n = { t, line: tok.line, col: tok.col, endLine: tok.endLine, endCol: tok.endCol }; Object.assign(n, props); return n; }
  endAt(n) { const prev = this.toks[this.i - 1]; if (prev) { n.endLine = prev.endLine; n.endCol = prev.endCol; } return n; }
  /** just after a compound statement's ':' — the end of its header (the token before the colon) as hdEndLine / hdEndCol */
  headEnd() { const p = this.toks[this.i - 2]; return p ? { hdEndLine: p.endLine, hdEndCol: p.endCol } : {}; }
  endAtNode(n, last) { n.endLine = last.endLine; n.endCol = last.endCol; return n; }

  // ------------------------------------------------------------------ file / statements
  parseFile() {
    const body = [];
    while (this.tok.type !== 'ENDMARKER') {
      if (this.tok.type === 'NEWLINE') { this.i++; continue; }
      if (this.tok.type === 'INDENT') this.unexpectedIndent(this.tok);
      if (this.tok.type === 'DEDENT') { this.i++; continue; }
      this.parseStatement(body);
    }
    return body;
  }

  parseEvalInput() {
    while (this.tok.type === 'NEWLINE') this.i++;
    const e = this.parseStarExpressions();
    while (this.tok.type === 'NEWLINE') this.i++;
    if (this.tok.type !== 'ENDMARKER') this.generic();
    return e;
  }

  parseStatement(out) {
    const t = this.tok;
    if (t.type === 'NAME') {
      switch (t.string) {
        case 'if': out.push(this.parseIf()); return;
        case 'while': out.push(this.parseWhile()); return;
        case 'for': out.push(this.parseFor()); return;
        case 'def': out.push(this.parseDef()); return;
        case 'try': out.push(this.parseTry()); return;
        case 'class': if (this.peekTok().type === 'NAME' && !KW.has(this.peekTok().string)) this.unsupported("'class'", t); break;
        case 'with': this.unsupported("'with'", t); break;
        case 'async': {
          // async def / for / with are valid Python that minipy does not run; `async` anywhere else is invalid syntax
          const nt = this.peekTok();
          if (nt.type === 'NAME' && (nt.string === 'def' || nt.string === 'for' || nt.string === 'with')) this.unsupported("'async'", t);
          break;
        }
        case 'match': {
          const m = this.tryParseMatch();
          if (m) { out.push(m); return; }
          break;
        }
        case 'elif': case 'else': case 'except': case 'finally': this.generic(); break;
      }
    } else if (t.type === 'OP' && t.string === '@') this.unsupported('decorators', t);
    this.parseSimpleStatements(out);
  }

  parseSimpleStatements(out) {
    for (;;) {
      out.push(this.endAt(this.parseSimpleStatement()));
      if (this.eatOp(';')) {
        if (this.tok.type === 'NEWLINE') { this.i++; return; }
        continue;
      }
      if (this.tok.type === 'NEWLINE') { this.i++; return; }
      this.generic();
    }
  }

  // block after ':'  (kindText e.g. "'if' statement", headerTok = token of the keyword)
  parseBlock(kindText, headerTok) {
    if (this.tok.type === 'NEWLINE') {
      this.i++;
      if (this.tok.type !== 'INDENT') this.noIndentFail(`expected an indented block after ${kindText} on line ${headerTok.line}`);
      this.i++;
      const body = [];
      while (this.tok.type !== 'DEDENT' && this.tok.type !== 'ENDMARKER') {
        if (this.tok.type === 'NEWLINE') { this.i++; continue; }
        if (this.tok.type === 'INDENT') this.unexpectedIndent(this.tok);
        this.parseStatement(body);
      }
      if (this.tok.type === 'DEDENT') this.i++;
      return body;
    }
    // simple statements on the same line
    const body = [];
    this.parseSimpleStatements(body);
    return body;
  }

  // "expected ':'" when the header is directly followed by NEWLINE
  /** a forced token (&&':' in CPython's grammar): any other token is "expected ':'" at that token */
  expectForcedColon() { if (!this.eatOp(':')) this.failTok("expected ':'", this.tok); }
  expectColon() {
    if (this.eatOp(':')) return;
    if (this.tok.type === 'NEWLINE') this.failTok("expected ':'", this.tok);
    this.generic();
  }

  parseIf() {
    const t = this.next();
    const test = this.parseNamedExpression();
    this.expectColon();
    const hd = this.headEnd();
    const body = this.parseBlock("'if' statement", t);
    const n = this.node('If', t, { test, body, orelse: [], ...hd });
    let cur = n;
    for (;;) {
      if (this.isKw('elif')) {
        const et = this.next();
        const etest = this.parseNamedExpression();
        this.expectColon();
        const ehd = this.headEnd();
        const ebody = this.parseBlock("'elif' statement", et);
        const en = this.node('If', et, { test: etest, body: ebody, orelse: [], elif: true, ...ehd });
        cur.orelse = [en];
        cur = en;
        continue;
      }
      if (this.isKw('else')) {
        const et = this.next();
        this.expectForcedColon();
        cur.orelse = this.parseBlock("'else' statement", et);
        cur.elseLine = et.line;
      }
      break;
    }
    return n;
  }

  parseWhile() {
    const t = this.next();
    const test = this.parseNamedExpression();
    this.expectColon();
    const hd = this.headEnd();
    const body = this.parseBlock("'while' statement", t);
    let orelse = [];
    if (this.isKw('else')) { const et = this.next(); this.expectForcedColon(); orelse = this.parseBlock("'else' statement", et); }
    return this.node('While', t, { test, body, orelse, ...hd });
  }

  parseFor() {
    const t = this.next();
    const target = this.parseTargetList('for');
    if (!this.eatKw('in')) {
      this.generic();
    }
    const iter = this.parseStarExpressions();
    this.expectColon();
    const hd = this.headEnd();
    const body = this.parseBlock("'for' statement", t);
    let orelse = [];
    if (this.isKw('else')) { const et = this.next(); this.expectForcedColon(); orelse = this.parseBlock("'else' statement", et); }
    return this.node('For', t, { target, iter, body, orelse, ...hd });
  }

  // targets of for / comprehension: star_targets; invalid → "cannot assign to X"
  parseTargetList(ctx) {
    const start = this.i;
    const first = this.tok;
    const elts = [];
    let trailing = false;
    for (;;) {
      if (this.isOp('*')) { const st = this.next(); const v = this.parseBitOr(); elts.push(this.endAt(this.node('Starred', st, { value: v }))); } else elts.push(this.parseBitOr());
      if (this.isOp(',')) { this.i++; trailing = true; if (this.isKw('in') || this.isOp('=')) break; trailing = false; continue; }
      break;
    }
    const tgt = elts.length === 1 && !trailing ? elts[0] : this.endAt(this.node('Tuple', first, { elts }));
    if (ctx === 'for' && !this.isKw('in')) {
      // e.g. "for x.y + 1 in" is caught below; "for i range(5)" → generic
      if (this.tok.type !== 'NEWLINE') {
        // CPython's invalid_for_target: 'for' star_expressions → invalid target message if any
        const bad = invalidTarget(tgt, 'store');
        if (bad) this.failAt(`cannot assign to ${exprName(bad)}`, bad);
      }
      this.generic();
    }
    const bad = invalidTarget(tgt, 'store');
    if (bad) this.failAt(`cannot assign to ${exprName(bad)}`, bad);
    setCtx(tgt, 'store');
    void start;
    return tgt;
  }

  parseDef() {
    const t = this.next();
    const nameTok = this.tok;
    if (nameTok.type !== 'NAME' || KW.has(nameTok.string)) this.generic();
    this.i++;
    // invalid_def_raw: 'def' NAME &&'(' [params] ')' ['->' expression] &&':'
    if (!this.isOp('(')) this.failTok("expected '('", this.tok);
    this.i++;
    const params = this.parseParams(')', true);
    this.expectOp(')');
    let returns = null;
    if (this.eatOp('->')) returns = this.parseExpression();
    this.expectForcedColon();
    const hd = this.headEnd();
    this.funcDepth++;
    const body = this.parseBlock('function definition', t);
    this.funcDepth--;
    const d0 = body[0];
    if (d0 && d0.t === 'Expr' && d0.value.t === 'Const' && typeof d0.value.value === 'string') d0.noStep = true;   // docstring
    return this.node('FunctionDef', t, { name: nameTok.string, params, body, returns, endLine: this.toks[this.i - 1].line, ...hd });
  }

  // parameters of def (closing ')') or lambda (closing ':')
  parseParams(close, annotations) {
    // emulates CPython's parameters rule plus invalid_parameters / invalid_star_etc / invalid_kwds (and the lambda_
    // variants, where close === ':')
    const params = { args: [], defaults: [], vararg: null, kwonly: [], kwdefaults: [], kwarg: null, posonly: 0 };
    const isLambda = close === ':';
    let seenDefault = false, seenStar = false, slashSeen = false;
    const isClose = () => this.isOp(close);
    const isParamName = (tk) => tk.type === 'NAME' && !KW.has(tk.string);
    while (!isClose()) {
      const t = this.tok;
      if (this.isOp('/')) {
        if (seenStar) this.failTok('/ must be ahead of *', t);
        if (slashSeen) this.failTok('/ may appear only once', t);
        if (params.args.length === 0) {
          if (this.isOpAt(1, ',')) this.failTok('at least one argument must precede /', t);
          this.generic();
        }
        this.i++;
        slashSeen = true;
        params.posonly = params.args.length;
        if (this.isOp('*')) this.failTok('expected comma between / and *', this.tok);
      } else if (this.isOp('**')) {
        this.i++;
        const nt = this.next();
        if (!isParamName(nt)) this.generic();
        params.kwarg = { name: nt.string, line: nt.line, col: nt.col, endLine: nt.endLine, endCol: nt.endCol };
        if (annotations && this.eatOp(':')) params.kwarg.annotation = this.parseExpression();
        if (this.isOp('=')) this.failTok('var-keyword argument cannot have default value', this.tok);
        if (this.eatOp(',') && !isClose()) {
          const nx = this.tok;
          if (isParamName(nx) || (nx.type === 'OP' && ['*', '**', '/'].includes(nx.string))) this.failTok('arguments cannot follow var-keyword argument', nx);
        }
        break;
      } else if (this.isOp('*')) {
        if (seenStar) {
          const saveMax = this.maxI;
          const nx = this.peekTok();
          this.maxI = saveMax;
          if (isParamName(nx) || (nx.type === 'OP' && nx.string === ',')) this.failTok('* argument may appear only once', t);
          this.generic();
        }
        this.i++;
        seenStar = true;
        if (isParamName(this.tok)) {
          const nt = this.next();
          params.vararg = { name: nt.string, line: nt.line, col: nt.col, endLine: nt.endLine, endCol: nt.endCol };
          if (annotations && this.eatOp(':')) params.vararg.annotation = this.parseExpression();
          if (this.isOp('=')) this.failTok('var-positional argument cannot have default value', this.tok);
        } else if (isClose() || (this.isOp(',') && (this.isOpAt(1, close) || this.isOpAt(1, '**')))) {
          // bare '*' without keyword-only parameters
          if (isLambda) this.failLast('named arguments must follow bare *');
          this.failTok('named arguments must follow bare *', t);
        }
      } else if (this.isOp('(') && !seenDefault && !seenStar && !slashSeen) {
        // invalid_parameters: param_no_default* '(' param_no_default+ ','? ')'
        const r = this.tryParse(() => {
          this.i++;
          let n = 0;
          for (;;) {
            if (!isParamName(this.tok)) this.generic();
            this.i++; n++;
            if (annotations && this.eatOp(':')) this.parseExpression();
            if (!this.eatOp(',')) break;
            if (this.isOp(')')) break;
          }
          const ct = this.tok;
          if (!this.isOp(')') || !n) this.generic();
          return ct;
        });
        if (r) this.failRange(isLambda ? 'Lambda expression parameters cannot be parenthesized' : 'Function parameters cannot be parenthesized', t, r.result);
        this.generic();
      } else {
        const nt = this.tok;
        if (!isParamName(nt)) this.generic();
        this.i++;
        const prm = { name: nt.string, line: nt.line, col: nt.col, endLine: nt.endLine, endCol: nt.endCol };
        if (annotations && this.eatOp(':')) { prm.annotation = this.parseExpression(); prm.endLine = prm.annotation.endLine; prm.endCol = prm.annotation.endCol; }
        // invalid_default: '=' &(')'|',')
        if (this.isOp('=') && (this.isOpAt(1, ')') || this.isOpAt(1, ','))) this.failTok('expected default value expression', this.tok);
        if (this.eatOp('=')) {
          const d = this.parseExpression();
          if (seenStar) { params.kwonly.push(prm); params.kwdefaults.push(d); } else { params.args.push(prm); params.defaults.push(d); seenDefault = true; }
        } else if (seenStar) { params.kwonly.push(prm); params.kwdefaults.push(null); } else {
          if (seenDefault) this.failAt('parameter without a default follows parameter with a default', prm);
          params.args.push(prm);
        }
      }
      if (!this.eatOp(',')) break;
    }
    return params;
  }


  parseTry() {
    const t = this.next();
    this.expectForcedColon();
    const body = this.parseBlock("'try' statement", t);
    const handlers = [];
    let orelse = [], finalbody = null;
    while (this.isKw('except')) {
      const et = this.next();
      if (this.isOp('*')) this.unsupported("'except*'", this.tok);
      let type = null, name = null;
      if (this.tok.type === 'NEWLINE') this.failTok("expected ':'", this.tok);   // invalid_except_stmt: 'except' NEWLINE
      if (!this.isOp(':')) {
        type = this.parseExpression();
        if (this.isOp(',')) {
          // invalid_except_stmt: 'except' a=expression ',' expressions ['as' NAME] ':' → STARTING_FROM(a)
          const save = this.i;
          try {
            this.i++;
            this.parseExpression();
            while (this.eatOp(',') && this.canStartExpression()) this.parseExpression();
            if (this.eatKw('as')) this.next();
            if (this.isOp(':')) this.i++;
          } catch (err) { if (!(err instanceof ParseFail) || err.err.kind === 'tok' || err.err.kind === 'unclosed') throw err; this.i = save; }
          this.failFrom('multiple exception types must be parenthesized', type);
        }
        if (this.eatKw('as')) {
          const nt = this.next();
          if (nt.type !== 'NAME' || KW.has(nt.string)) this.generic();
          name = nt.string;
        }
      }
      this.expectColon();
      const hhd = this.headEnd();
      const hbody = this.parseBlock("'except' statement", et);
      // the handler's location runs from 'except' to the end of its body (CPython's ExceptHandler node)
      const h = this.node('ExceptHandler', et, { type, name, body: hbody, ...hhd });
      let k = this.i - 1;
      while (k > 0 && ['NEWLINE', 'NL', 'DEDENT', 'INDENT', 'COMMENT', 'ENDMARKER'].includes(this.toks[k].type)) k--;
      if (this.toks[k] && this.toks[k].endLine >= h.line) { h.endLine = this.toks[k].endLine; h.endCol = this.toks[k].endCol; }
      handlers.push(h);
    }
    if (handlers.length && this.isKw('else')) { const et = this.next(); this.expectForcedColon(); orelse = this.parseBlock("'else' statement", et); }
    if (this.isKw('finally')) { const ft = this.next(); this.expectForcedColon(); finalbody = this.parseBlock("'finally' statement", ft); }
    if (!handlers.length && !finalbody) this.failAtTokenOrCursor("expected 'except' or 'finally' block", this.tok, 'SyntaxError');
    return this.node('Try', t, { body, handlers, orelse, finalbody });
  }

  // ------------------------------------------------------------------ match
  tryParseMatch() {
    const save = this.i, saveMax = this.maxI;
    const t = this.tok;
    const nt = this.peekTok();
    // quick rejections: "match = 1", "match.x", "match(" handled by speculation
    if (nt.type === 'OP' && ['=', '.', ',', ')', ']', ':', ';'].includes(nt.string) || nt.type === 'NEWLINE' || AUGOPS.has(nt.string)) return null;
    this.i++;
    let subject;
    try {
      subject = this.parseStarNamedExpressionsForMatch();
    } catch (e) {
      // CPython tries match_stmt before the simple statements: an invalid_* rule that fires inside the subject
      // ("Perhaps you forgot a comma?") is the error, and the tokens it reached count for the generic error
      if (!(e instanceof ParseFail) || e.err.kind === 'tok' || e.err.kind === 'specific') throw e;
      this.i = save; return null;
    }
    if (!this.isOp(':')) {
      if (this.tok.type === 'NEWLINE') {
        // could still be a valid expression statement such as "match(x)"
        const save2 = this.i;
        this.i = save;
        try { const body = []; this.parseSimpleStatements(body); this.i = save; this.maxI = saveMax; return null; } catch (e) {
          if (!(e instanceof ParseFail)) throw e;
          this.i = save2; this.failTok("expected ':'", this.tok);
        }
      }
      if (this.i > this.maxI) this.maxI = this.i;   // the token after the subject was examined
      this.i = save; return null;
    }
    this.i++;
    const mhd = this.headEnd();
    if (this.tok.type !== 'NEWLINE') this.generic();
    this.i++;
    if (this.tok.type !== 'INDENT') this.noIndentFail(`expected an indented block after 'match' statement on line ${t.line}`);
    this.i++;
    const cases = [];
    while (this.isKw('case')) {
      const ct = this.next();
      const pattern = this.parsePatterns();
      let guard = null;
      if (this.eatKw('if')) guard = this.parseNamedExpression();
      this.expectColon();
      const chd = this.headEnd();
      const body = this.parseBlock("'case' statement", ct);
      cases.push(this.node('MatchCase', ct, { pattern, guard, body, ...chd }));
    }
    if (!cases.length) this.generic();
    if (this.tok.type === 'DEDENT') this.i++;
    else if (this.tok.type !== 'ENDMARKER') this.generic();
    return this.node('Match', t, { subject, cases, ...mhd });
  }
  parseStarNamedExpressionsForMatch() {
    const first = this.tok;
    const e = this.parseNamedExpression();
    if (this.isOp(',')) {
      const elts = [e];
      while (this.eatOp(',')) { if (this.isOp(':')) break; elts.push(this.parseNamedExpression()); }
      return this.endAt(this.node('Tuple', first, { elts }));
    }
    return e;
  }
  parsePatterns() {
    const first = this.tok;
    const p = this.parsePattern();
    if (this.isOp(',')) {
      const pats = [p];
      while (this.eatOp(',')) { if (this.isOp(':') || this.isKw('if')) break; pats.push(this.parsePattern()); }
      return this.node('MatchSequence', first, { patterns: pats });
    }
    return p;
  }
  parsePattern() {
    const first = this.tok;
    let p = this.parseOrPattern();
    if (this.eatKw('as')) {
      const nt = this.next();
      if (nt.type !== 'NAME' || KW.has(nt.string)) this.generic();
      if (nt.string === '_') this.failTok("cannot use '_' as a target", nt);
      p = this.endAt(this.node('MatchAs', first, { pattern: p, name: nt.string }));
    }
    return p;
  }
  parseOrPattern() {
    const first = this.tok;
    const pats = [this.parseClosedPattern()];
    while (this.eatOp('|')) pats.push(this.parseClosedPattern());
    return pats.length === 1 ? pats[0] : this.endAt(this.node('MatchOr', first, { patterns: pats }));
  }
  /** literal_expr for numbers: signed_number !('+' | '-') | complex_number (real '+'/'-' imaginary) */
  parseNumberPattern() {
    const t = this.tok;
    const neg = this.isOp('-');
    if (neg) this.i++;
    const nt = this.tok;
    if (nt.type !== 'NUMBER') this.generic();
    if (this.isOpAt(1, '+') || this.isOpAt(1, '-')) {
      // complex_number: the first number must be real, the second imaginary (checked as soon as it is read)
      if (nt.numKind === 'imag') this.failTok('real number required in complex literal', nt);
      const it = this.toks[this.i + 2];
      if (it && it.type === 'NUMBER') {
        if (it.numKind !== 'imag') this.failTok('imaginary number required in complex literal', it);
        this.unsupported('complex numbers', it);
      }
    }
    const num = this.parseAtom();
    return neg ? this.endAt(this.node('UnaryOp', t, { op: '-', operand: num })) : num;
  }
  parseClosedPattern() {
    const t = this.tok;
    if (t.type === 'NUMBER' || (t.type === 'OP' && t.string === '-')) {
      const e = this.parseNumberPattern();
      return this.node('MatchValue', t, { value: e });
    }
    if (t.type === 'STRING') return this.node('MatchValue', t, { value: this.parseAtom() });
    if (t.type === 'NAME') {
      if (t.string === 'None' || t.string === 'True' || t.string === 'False') { this.i++; return this.node('MatchSingleton', t, { value: t.string === 'None' ? null : t.string === 'True' }); }
      if (KW.has(t.string)) this.generic();
      // dotted name → value pattern; NAME '(' → class pattern; NAME → capture / wildcard
      this.i++;
      let dotted = null;
      if (this.isOp('.')) {
        dotted = this.node('Name', t, { id: t.string, ctx: 'load' });
        while (this.eatOp('.')) { const at = this.next(); if (at.type !== 'NAME' || KW.has(at.string)) this.generic(); dotted = this.node('Attribute', t, { value: dotted, attr: at.string, ctx: 'load' }); }
      }
      if (this.isOp('(')) {
        this.i++;
        const cls = dotted || this.node('Name', t, { id: t.string, ctx: 'load' });
        const patterns = [], kwdNames = [], kwdPatterns = [];
        while (!this.isOp(')')) {
          if (this.tok.type === 'NAME' && !KW.has(this.tok.string) && this.isOpAt(1, '=')) { kwdNames.push(this.next().string); this.i++; kwdPatterns.push(this.parsePattern()); } else {
            if (kwdNames.length) this.failTok('positional patterns follow keyword patterns', this.tok);
            patterns.push(this.parsePattern());
          }
          if (!this.eatOp(',')) break;
        }
        this.expectOp(')');
        return this.node('MatchClass', t, { cls, patterns, kwdNames, kwdPatterns });
      }
      if (dotted) return this.node('MatchValue', t, { value: dotted });
      if (t.string === '_') return this.node('MatchAs', t, { pattern: null, name: null });
      return this.node('MatchAs', t, { pattern: null, name: t.string });
    }
    if (t.type === 'OP' && (t.string === '[' || t.string === '(')) {
      const close = t.string === '[' ? ']' : ')';
      this.i++;
      const pats = [];
      let comma = false;
      while (!this.isOp(close)) {
        if (this.isOp('*')) { const st = this.next(); const nt = this.next(); if (nt.type !== 'NAME') this.generic(); pats.push(this.node('MatchStar', st, { name: nt.string === '_' ? null : nt.string })); } else pats.push(this.parsePattern());
        if (!this.eatOp(',')) break;
        comma = true;
      }
      this.expectOp(close);
      if (close === ')' && pats.length === 1 && !comma && pats[0].t !== 'MatchStar') return pats[0];
      return this.node('MatchSequence', t, { patterns: pats });
    }
    if (t.type === 'OP' && t.string === '{') {
      this.i++;
      const keys = [], patterns = [];
      let rest = null;
      while (!this.isOp('}')) {
        if (this.eatOp('**')) { const nt = this.next(); rest = nt.string; this.eatOp(','); break; }
        const kt = this.tok;
        let key;
        if (kt.type === 'STRING' || kt.type === 'NUMBER' || (kt.type === 'OP' && kt.string === '-')) key = kt.type === 'STRING' ? this.parseAtom() : this.parseNumberPattern();
        else if (kt.type === 'NAME' && (kt.string === 'None' || kt.string === 'True' || kt.string === 'False')) { this.i++; key = this.node('Const', kt, { value: kt.string === 'None' ? null : kt.string === 'True' }); } else if (kt.type === 'NAME') { key = this.parsePrimary(); } else this.generic();
        this.expectOp(':');
        keys.push(key); patterns.push(this.parsePattern());
        if (!this.eatOp(',')) break;
      }
      this.expectOp('}');
      return this.node('MatchMapping', t, { keys, patterns, rest });
    }
    this.generic();
  }

  // ------------------------------------------------------------------ simple statements
  parseSimpleStatement() {
    const t = this.tok;
    if (t.type === 'NAME') {
      switch (t.string) {
        case 'pass': this.i++; return this.node('Pass', t);
        case 'break': this.i++; return this.node('Break', t);
        case 'continue': this.i++; return this.node('Continue', t);
        case 'return': {
          this.i++;
          let value = null;
          if (!this.atStmtEnd()) value = this.parseStarExpressions();
          return this.node('Return', t, { value });
        }
        case 'raise': {
          this.i++;
          let exc = null, cause = null;
          if (!this.atStmtEnd()) {
            exc = this.parseExpression();
            if (this.eatKw('from')) cause = this.parseExpression();
          }
          return this.node('Raise', t, { exc, cause });
        }
        case 'global': case 'nonlocal': {
          this.i++;
          const names = [];
          do {
            const nt = this.next();
            if (nt.type !== 'NAME' || KW.has(nt.string)) this.generic();
            names.push(nt.string);
          } while (this.eatOp(','));
          return this.node(t.string === 'global' ? 'Global' : 'Nonlocal', t, { names, noStep: true });
        }
        case 'del': {
          this.i++;
          const first = this.tok;
          const elts = [];
          do {
            if (this.atStmtEnd()) break;
            elts.push(this.parseBitOrOrComparison());
          } while (this.eatOp(','));
          if (!elts.length) this.generic();
          if (!this.atStmtEnd()) {
            this.generic();
          }
          for (const e of elts) {
            const bad = invalidTarget(e, 'del');
            if (bad) this.failAt(`cannot delete ${exprName(bad)}`, bad);
            setCtx(e, 'del');
          }
          void first;
          return this.node('Delete', t, { targets: elts });
        }
        case 'assert': {
          this.i++;
          const test = this.parseExpression();
          let msg = null;
          if (this.eatOp(',')) msg = this.parseExpression();
          return this.node('Assert', t, { test, msg });
        }
        case 'import': return this.parseImport();
        case 'from': return this.parseFromImport();
        case 'await': if (this.canStartAwaitOperand(this.peekTok())) this.unsupported("'await'", t); break;
        case 'type': {
          const n1 = this.peekTok(), n2 = this.peekTok(2);
          if (n1.type === 'NAME' && !KW.has(n1.string) && n2.type === 'OP' && (n2.string === '=' || n2.string === '[')) this.unsupported("'type' aliases", t);
          break;
        }
      }
    }
    return this.parseExprOrAssign();
  }

  atStmtEnd() { const t = this.tok; return t.type === 'NEWLINE' || (t.type === 'OP' && t.string === ';') || t.type === 'ENDMARKER'; }

  parseImport() {
    const t = this.next();
    if (this.atStmtEnd()) this.failTok("Expected one or more names after 'import'", this.tok);
    const names = [];
    do {
      const nt = this.tok;
      if (nt.type !== 'NAME' || KW.has(nt.string)) this.generic();
      let name = this.next().string;
      while (this.eatOp('.')) { const at = this.next(); if (at.type !== 'NAME') this.generic(); name += '.' + at.string; }
      let asname = null;
      if (this.eatKw('as')) { const at = this.next(); if (at.type !== 'NAME' || KW.has(at.string)) this.generic(); asname = at.string; }
      names.push({ name, asname, line: nt.line });
    } while (this.eatOp(','));
    // invalid_import: 'import' dotted_name+ 'from' dotted_name → STARTING_FROM('import')
    if (this.isKw('from') && names.every((n) => !n.asname)) {
      const r = this.tryParse(() => {
        this.i++;
        const a = this.next(); if (a.type !== 'NAME' || KW.has(a.string)) this.generic();
        while (this.isOp('.')) { this.i++; const b = this.next(); if (b.type !== 'NAME' || KW.has(b.string)) this.generic(); }
        return true;
      });
      if (r) { this.i = r.end; this.failFrom("Did you mean to use 'from ... import ...' instead?", t); }
    }
    return this.node('Import', t, { names });
  }

  parseFromImport() {
    const t = this.next();
    let level = 0;
    while (this.isOp('.') || this.isOp('...')) { level += this.tok.string.length; this.i++; }
    let module = null;
    if (!this.isKw('import')) {
      const nt = this.next();
      if (nt.type !== 'NAME' || KW.has(nt.string)) this.generic();
      module = nt.string;
      while (this.eatOp('.')) { const at = this.next(); if (at.type !== 'NAME') this.generic(); module += '.' + at.string; }
    }
    this.expectKw('import');
    const names = [];
    if (this.eatOp('*')) names.push({ name: '*', asname: null });
    else {
      const paren = this.eatOp('(');
      if (this.atStmtEnd()) this.failTok("Expected one or more names after 'import'", this.tok);
      do {
        if (paren && this.isOp(')')) break;
        if (!paren && names.length && this.atStmtEnd()) this.failTok('trailing comma not allowed without surrounding parentheses', this.tok);
        const nt = this.next();
        if (nt.type !== 'NAME' || KW.has(nt.string)) this.generic();
        let asname = null;
        if (this.eatKw('as')) { const at = this.next(); if (at.type !== 'NAME' || KW.has(at.string)) this.generic(); asname = at.string; }
        names.push({ name: nt.string, asname, line: nt.line });
      } while (this.eatOp(','));
      if (paren) this.expectOp(')');
      else if (!this.atStmtEnd() && this.isOp(',')) this.failTok('trailing comma not allowed without surrounding parentheses', this.tok);
    }
    return this.node('ImportFrom', t, { module, names, level });
  }

  parseExprOrAssign() {
    const t = this.tok;
    const startI = this.i;
    const first = this.isKw('yield') ? this.parseYieldExpr() : this.parseStarExpressions(true);
    if (this.isOp(':=') && first.t !== 'Tuple' && first.t !== 'Name') this.walrusTargetError(first);
    if (first.t === 'Tuple' && !first.paren && this.canStartExpression()) this.invalidTupleStatement();
    if (this.isOp('=')) {
      const targets = [first];
      let value;
      const groupStarts = [startI];
      for (;;) {
        this.i++; // '='
        groupStarts.push(this.i);
        value = this.isKw('yield') ? this.parseYieldExpr() : this.parseStarExpressions(true);
        if (this.isOp('=')) { targets.push(value); continue; }
        break;
      }
      // validate targets like CPython's invalid_assignment / invalid_named_expression
      for (let k = 0; k < targets.length; k++) {
        const tg = targets[k];
        if (tg.t === 'Yield' || tg.t === 'YieldFrom') this.failAt('assignment to yield expression not possible', tg);
        const bad = invalidTarget(tg, 'store');
        if (!bad) continue;
        if (k === 0) this.namedExprAssignError(tg, targets.length > 1 ? targets[1] : value, targets.length > 1);
        this.failAt(`cannot assign to ${exprName(bad)}`, bad);
      }
      for (const tg of targets) setCtx(tg, 'store');
      return this.node('Assign', t, { targets, value, endLine: this.toks[this.i - 1].line });
    }
    if (this.tok.type === 'OP' && AUGOPS.has(this.tok.string)) {
      const op = this.next().string;
      if (!(first.t === 'Name' || first.t === 'Attribute' || first.t === 'Subscript')) this.failAt(`'${exprName(first)}' is an illegal expression for augmented assignment`, first);
      const value = this.isKw('yield') ? this.parseYieldExpr() : this.parseStarExpressions();
      setCtx(first, 'store');
      return this.node('AugAssign', t, { target: first, op: op.slice(0, -1), value });
    }
    if (this.isOp(':')) {
      // annotated assignment; the invalid_assignment alternatives need `':' expression` to match
      if (!(first.t === 'Name' || first.t === 'Attribute' || first.t === 'Subscript')) {
        const save = this.i, saveMax = this.maxI;
        let annOk = false;
        try { this.i++; this.parseExpression(); annOk = true; } catch (err) { if (!(err instanceof ParseFail) || err.err.kind === 'tok' || err.err.kind === 'unclosed') throw err; }
        this.i = save; this.maxI = saveMax;
        if (!annOk) this.generic();
      }
      if (first.t === 'Tuple' && !first.paren) this.failAt('only single target (not tuple) can be annotated', first);
      if (first.t === 'List') this.failAt('only single target (not list) can be annotated', first);
      if (first.t === 'Tuple') this.failAt('only single target (not tuple) can be annotated', first);
      if (!(first.t === 'Name' || first.t === 'Attribute' || first.t === 'Subscript')) this.failAt('illegal target for annotation', first);
      this.i++;
      const annotation = this.parseExpression();
      let value = null;
      if (this.eatOp('=')) value = this.isKw('yield') ? this.parseYieldExpr() : this.parseStarExpressions();
      setCtx(first, 'store');
      return this.node('AnnAssign', t, { target: first, annotation, value, simple: first.t === 'Name' && !first.paren });
    }
    return this.node('Expr', t, { value: first, endLine: this.toks[this.i - 1].line });
  }

  // invalid_named_expression alternatives reached through invalid_assignment for the first target group
  namedExprAssignError(tg, rhs, chained) {
    const elts = tg.t === 'Tuple' && !tg.paren ? tg.elts : [tg];
    const last = elts[elts.length - 1];
    if (last.t === 'Starred') return;
    // b=bitwise_or !('='|':=') must match at the start of the text after the first '='
    const isTupleRhs = rhs.t === 'Tuple' && !rhs.paren;
    const first = isTupleRhs ? rhs.elts[0] : rhs;
    if (!first) return;
    let lm = first;
    while (!lm.paren && (lm.t === 'Compare' || lm.t === 'BoolOp' || lm.t === 'IfExp')) lm = lm.t === 'Compare' ? lm.left : lm.t === 'BoolOp' ? lm.values[0] : lm.body;
    if (!lm.paren && ((lm.t === 'UnaryOp' && lm.op === 'not') || lm.t === 'Lambda' || lm.t === 'Starred')) return;
    const fires = isTupleRhs || !isBitOrLevel(first) || !chained;
    if (!fires) return;
    if (last.t === 'Name' && !last.paren) this.failRange("invalid syntax. Maybe you meant '==' or ':=' instead of '='?", last, lm);
    if (last.t === 'List' || last.t === 'Tuple' || last.t === 'GenExp' || (last.t === 'Const' && !last.paren && (last.value === null || last.value === true || last.value === false) && !last.ellipsis)) return;
    if (isBitOrLevel(last)) this.failAt(`cannot assign to ${exprName(last)} here. Maybe you meant '==' instead of '='?`, last);
  }

  // ------------------------------------------------------------------ expressions
  // star_expressions: tuple without parens allowed; '*' items allowed
  parseStarExpressions(allowStarFirst) {
    const first = this.tok;
    const e = this.parseStarExpression();
    if (this.isOp(',')) {
      const elts = [e];
      while (this.eatOp(',')) {
        if (!this.canStartExpression()) break;
        elts.push(this.parseStarExpression());
      }
      return this.endAt(this.node('Tuple', first, { elts }));
    }
    if (e.t === 'Starred' && !allowStarFirst) this.failAt("can't use starred expression here", e);
    if (e.t === 'Starred' && allowStarFirst && !this.isOp('=')) this.failAt("can't use starred expression here", e);
    return e;
  }
  parseStarExpression() {
    if (this.isOp('*')) {
      const t = this.next();
      const v = this.parseBitOr();
      return this.endAt(this.node('Starred', t, { value: v }));
    }
    return this.parseExpression();
  }
  /**
   * invalid_assignment: star_named_expression ',' star_named_expressions* ':' expression — after an unparenthesised
   * tuple, CPython parses more named expressions (new lists may start without a comma), so their
   * invalid_named_expression checks fire: `x, y y = 1, 2` → "invalid syntax. Maybe you meant '==' or ':=' ..."
   */
  invalidTupleStatement() {
    const save = this.i, saveMax = this.maxI;
    try {
      while (this.canStartExpression()) {
        for (;;) {
          if (this.isOp('*')) this.parseStarExpression(); else this.parseNamedExpression();
          if (!this.eatOp(',') || !this.canStartExpression()) break;
        }
      }
    } catch (e) { if (!(e instanceof ParseFail) || e.err.kind === 'tok' || e.err.kind === 'specific') throw e; }
    this.i = save; this.maxI = saveMax;
  }
  canStartExpression() {
    const t = this.tok;
    if (t.type === 'NAME') return !KW.has(t.string) || ['not', 'lambda', 'None', 'True', 'False', 'await', 'yield'].includes(t.string);
    if (t.type === 'NUMBER' || t.type === 'STRING') return true;
    if (t.type === 'OP') return ['(', '[', '{', '-', '+', '~', '*', '...'].includes(t.string);
    return false;
  }

  // named_expression with CPython's invalid_named_expression checks
  parseNamedExpression() {
    const t = this.tok;
    if (t.type === 'NAME' && !KW.has(t.string) && this.isOpAt(1, ':=')) {
      this.i += 2;
      const value = this.parseExpression();
      return this.endAt(this.node('NamedExpr', t, { target: { t: 'Name', id: t.string, ctx: 'store', line: t.line, col: t.col }, value }));
    }
    const e = this.parseExpression();
    if (this.isOp(':=')) this.walrusTargetError(e);
    if (this.isOp('=')) this.namedExprEqError(e);
    return e;
  }
  /** invalid_named_expression: a=expression ':=' expression */
  walrusTargetError(e) {
    if (this.tryParse(() => { this.i++; return this.parseExpression(); })) this.failAt(`cannot use assignment expressions with ${exprName(e)}`, e);
  }
  namedExprEqError(e) {
    // a=NAME '=' b=bitwise_or !('='|':=')   |   a=bitwise_or '=' bitwise_or !('='|':=')
    const save = this.i, saveMax = this.maxI;
    this.i++;
    let ok = false, b = null;
    try {
      if (this.canStartBitOr()) { b = this.parseBitOr(); ok = !(this.isOp('=') || this.isOp(':=')); }
    } catch (err) { if (!(err instanceof ParseFail) || err.err.kind === 'tok' || err.err.kind === 'unclosed') throw err; }
    this.i = save; this.maxI = saveMax;
    if (!ok) return;
    if (e.t === 'Name' && !e.paren) this.failRange("invalid syntax. Maybe you meant '==' or ':=' instead of '='?", e, b);
    if (e.t === 'List' || e.t === 'Tuple' || e.t === 'GenExp' || (e.t === 'Const' && (e.value === null || e.value === true || e.value === false) && !e.ellipsis)) return;
    if (isBitOrLevel(e)) this.failAt(`cannot assign to ${exprName(e)} here. Maybe you meant '==' instead of '='?`, e);
  }
  canStartBitOr() {
    const t = this.tok;
    if (t.type === 'NAME') return !KW.has(t.string) || ['None', 'True', 'False', 'await'].includes(t.string);
    if (t.type === 'NUMBER' || t.type === 'STRING') return true;
    if (t.type === 'OP') return ['(', '[', '{', '-', '+', '~', '...'].includes(t.string);
    return false;
  }

  parseExpression() {
    const t = this.tok;
    if (this.isKw('lambda')) return this.parseLambda();
    const startI = this.i;
    const a = this.parseDisjunction();
    if (this.isKw('if')) {
      this.i++;
      const test = this.parseDisjunction();
      if (!this.isKw('else')) {
        if (this.isOp(':')) this.generic();
        this.failRange("expected 'else' after 'if' expression", a, test);
      }
      this.i++;
      const orelse = this.parseExpression();
      return this.endAt(this.node('IfExp', t, { test, body: a, orelse }));
    }
    // invalid_expression: two expressions juxtaposed inside brackets → "Perhaps you forgot a comma?"
    if (!this.noJuxta && this.canStartJuxtaposed()) {
      const firstTok = this.toks[startI];
      const isNameString = firstTok.type === 'NAME' && this.toks[startI + 1] && this.toks[startI + 1].type === 'STRING';
      const softKw = firstTok.type === 'NAME' && (firstTok.string === 'match' || firstTok.string === 'case' || firstTok.string === '_' || firstTok.string === 'type');
      const legacy = a.t === 'Name' && (a.id === 'print' || a.id === 'exec');
      if (!isNameString && !softKw && !legacy) {
        const save = this.i, saveMax = this.maxI;
        let bOk = false;
        try { this.parseExpressionNoInvalid(); bOk = true; } catch (err) { if (!(err instanceof ParseFail) || err.err.kind === 'tok' || err.err.kind === 'unclosed') throw err; }
        const bEnd = this.toks[this.i - 1];
        const lastLevel = bEnd.level;
        this.i = save; this.maxI = saveMax;
        if (bOk && lastLevel > 0) this.failRange('invalid syntax. Perhaps you forgot a comma?', a, bEnd);
      }
      // invalid_legacy_expression: a=NAME !'(' b=star_expressions — CPython parses b for any NAME (fetching its
      // tokens, which can surface tokenizer errors) and reports only print/exec
      if (a.t === 'Name' && !a.paren && firstTok.type === 'NAME' && this.toks[startI + 1] === this.tok && !this.isOp('(')) {
        const save = this.i, saveMax = this.maxI;
        let bOk = false;
        try { this.parseStarExpressions(); bOk = true; } catch (err) { if (!(err instanceof ParseFail) || err.err.kind === 'tok' || err.err.kind === 'unclosed') throw err; }
        const bEnd = this.toks[this.i - 1];
        this.i = save; this.maxI = saveMax;
        if (bOk && legacy) this.failRange(`Missing parentheses in call to '${a.id}'. Did you mean ${a.id}(...)?`, a, bEnd);
      }
    }
    return a;
  }
  parseExpressionNoInvalid() {
    if (this.isKw('lambda')) return this.parseLambda();
    const a = this.parseDisjunction();
    if (this.isKw('if')) { this.i++; this.parseDisjunction(); this.expectKw('else'); this.parseExpressionNoInvalid(); }
    return a;
  }
  canStartJuxtaposed() {
    const t = this.tok;
    if (t.type === 'NAME') return !KW.has(t.string) || ['None', 'True', 'False', 'lambda', 'not', 'await'].includes(t.string) && !(t.string === 'not' && this.peekTok().type === 'NAME' && this.peekTok().string === 'in');
    if (t.type === 'NUMBER' || t.type === 'STRING') return true;
    // any token that can start expression_without_invalid (a '(' or '[' here means a call/subscript fell back)
    if (t.type === 'OP') return ['{', '...', '[', '(', '~', '-', '+'].includes(t.string);
    return false;
  }

  parseLambda() {
    const t = this.next();
    const params = this.parseParams(':', false);
    this.expectOp(':');
    this.funcDepth++;
    const body = this.parseExpression();
    this.funcDepth--;
    return this.endAt(this.node('Lambda', t, { params, body }));
  }

  parseDisjunction() {
    const t = this.tok;
    const a = this.parseConjunction();
    if (!this.isKw('or')) return a;
    const values = [a];
    while (this.isKw('or')) {
      const save = this.i;
      this.i++;
      const r = this.attempt(() => this.parseConjunction());
      if (!r) { this.i = save; break; }
      values.push(r.v);
    }
    if (values.length === 1) return a;
    return this.endAtNode(this.node('BoolOp', t, { op: 'or', values }), values[values.length - 1]);
  }
  parseConjunction() {
    const t = this.tok;
    const a = this.parseInversion();
    if (!this.isKw('and')) return a;
    const values = [a];
    while (this.isKw('and')) {
      const save = this.i;
      this.i++;
      const r = this.attempt(() => this.parseInversion());
      if (!r) { this.i = save; break; }
      values.push(r.v);
    }
    if (values.length === 1) return a;
    return this.endAtNode(this.node('BoolOp', t, { op: 'and', values }), values[values.length - 1]);
  }
  parseInversion() {
    const t = this.tok;
    if (this.isKw('not')) {
      this.i++;
      const operand = this.parseInversion();
      return this.endAt(this.node('UnaryOp', t, { op: 'not', operand }));
    }
    return this.parseComparison();
  }
  parseComparison() {
    const t = this.tok;
    const left = this.parseBitOr();
    const ops = [], comparators = [];
    for (;;) {
      const ct = this.tok;
      const ctIndex = this.i;
      let op = null;
      const nt = this.toks[this.i + 1];
      if (ct.type === 'OP' && ct.string === '<' && nt && nt.type === 'OP' && nt.string === '>' && nt.line === ct.endLine && nt.col === ct.endCol) {
        // invalid_noteq: '<' '>' written together (Pascal / Excel habit)
        this.failRange("invalid syntax.  Maybe you meant '!=' instead of '<>'?", ct, nt);
      }
      if (ct.type === 'OP' && COMPOPS.has(ct.string)) { op = ct.string; this.i++; } else if (ct.type === 'NAME' && ct.string === 'in') { op = 'in'; this.i++; } else if (ct.type === 'NAME' && ct.string === 'not' && this.peekTok().type === 'NAME' && this.peekTok().string === 'in') { op = 'not in'; this.i += 2; } else if (ct.type === 'NAME' && ct.string === 'is') {
        this.i++;
        if (this.isKw('not')) { this.i++; op = 'is not'; } else op = 'is';
      }
      if (!op) break;
      const r = this.attempt(() => this.parseBitOr());
      if (!r) { this.i = ctIndex; break; }
      ops.push(op);
      comparators.push(r.v);
    }
    if (!ops.length) return left;
    return this.endAt(this.node('Compare', t, { left, ops, comparators }));
  }
  parseBitOrOrComparison() { return this.parseComparison(); }

  binLevel(next, ops) {
    const t = this.tok;
    let left = next();
    for (;;) {
      const ot = this.tok;
      if (ot.type === 'OP' && ops.includes(ot.string)) {
        const save = this.i;
        this.i++;
        if (this.isKw('not') && ops.some((o) => ['+', '-', '*', '/', '%', '//', '@'].includes(o))) this.notAfterOperator(() => this.parseInversion());
        const r = this.attempt(next);
        if (!r) { this.i = save; return left; }
        const right = r.v;
        left = this.endAt({ t: 'BinOp', op: ot.string, left, right, line: t.line, col: t.col, opLine: ot.line });
        continue;
      }
      return left;
    }
  }
  /** "'not' after an operator must be parenthesized" (KNOWN_RANGE('not', operand)) */
  notAfterOperator(operand) {
    const nt = this.tok;
    const r = this.tryParse(() => { this.i++; return operand(); });
    if (r) this.failRange("'not' after an operator must be parenthesized", nt, r.result);
  }
  parseBitOr() { return this.binLevel(() => this.parseBitXor(), ['|']); }
  parseBitXor() { return this.binLevel(() => this.parseBitAnd(), ['^']); }
  parseBitAnd() { return this.binLevel(() => this.parseShift(), ['&']); }
  parseShift() { return this.binLevel(() => this.parseSum(), ['<<', '>>']); }
  parseSum() { return this.binLevel(() => this.parseTerm(), ['+', '-']); }
  parseTerm() { return this.binLevel(() => this.parseFactor(), ['*', '/', '//', '%', '@']); }
  parseFactor() {
    const t = this.tok;
    if (t.type === 'OP' && (t.string === '-' || t.string === '+' || t.string === '~')) {
      this.i++;
      if (this.isKw('not')) this.notAfterOperator(() => this.parseFactor());
      const operand = this.parseFactor();
      return this.endAt(this.node('UnaryOp', t, { op: t.string, operand }));
    }
    return this.parsePower();
  }
  /** await_primary: 'await' primary — `await x` is valid syntax (unsupported here), `await = 1` is not */
  canStartAwaitOperand(nt) {
    if (!nt) return false;
    if (nt.type === 'NAME') return !KW.has(nt.string) || ['None', 'True', 'False', 'await'].includes(nt.string);
    if (nt.type === 'NUMBER' || nt.type === 'STRING') return true;
    return nt.type === 'OP' && ['(', '[', '{', '...'].includes(nt.string);
  }
  parsePower() {
    const t = this.tok;
    if (this.isKw('await') && this.canStartAwaitOperand(this.peekTok())) this.unsupported("'await'", t);
    const base = this.parsePrimary();
    if (this.isOp('**')) {
      const save = this.i;
      const ot = this.next();
      const r = this.attempt(() => this.parseFactor());
      if (!r) { this.i = save; return base; }
      return this.endAt({ t: 'BinOp', op: '**', left: base, right: r.v, line: t.line, col: t.col, opLine: ot.line });
    }
    return base;
  }

  parsePrimary() {
    const t = this.tok;
    let e = this.parseAtom();
    for (;;) {
      const save = this.i;
      if (this.isOp('.')) {
        this.i++;
        const at = this.tok;
        if (at.type !== 'NAME' || KW.has(at.string)) { this.i = save; break; }
        this.i++;
        e = this.endAt({ t: 'Attribute', value: e, attr: at.string, line: t.line, col: t.col, attrLine: at.line, ctx: 'load' });
      } else if (this.isOp('(')) {
        const pt = this.next();
        const r = this.attempt(() => this.parseCallArgs(e, t, pt));
        if (!r) { this.i = save; break; }
        e = r.v;
      } else if (this.isOp('[')) {
        this.i++;
        const r = this.attempt(() => { const slice = this.parseSlices(); this.expectOp(']'); return slice; });
        if (!r) { this.i = save; break; }
        e = this.endAt({ t: 'Subscript', value: e, slice: r.v, line: t.line, col: t.col, ctx: 'load' });
      } else break;
    }
    return e;
  }

  /** '*' expression '=' b=expression → KNOWN_RANGE(star, b) */
  unpackingAssign(msg, star) {
    const r = this.tryParse(() => { this.i++; return this.parseExpression(); });
    if (r) this.failRange(msg, star, r.result);
  }
  parseCallArgs(func, t, pt) {
    const args = [], keywords = [];
    let seenKw = false, seenKwUnpack = false;
    while (!this.isOp(')')) {
      const at = this.tok;
      if (this.isOp('*')) {
        this.i++;
        if (this.isOp(')') || this.isOp(',')) this.failLast('Invalid star expression');
        const v = this.parseExpression();
        if (this.isOp('=')) this.unpackingAssign('cannot assign to iterable argument unpacking', at);
        if (seenKwUnpack) {
          // KNOWN_RANGE(',' before the starred arguments, last of them)
          let last = v;
          while (this.isOp(',') && this.isOpAt(1, '*') && !this.isOpAt(1, '**')) { this.i += 2; last = this.parseExpression(); }
          this.failRange('iterable argument unpacking follows keyword argument unpacking', this.toks[this.toks.indexOf(at) - 1], last);
        }
        args.push(this.endAt(this.node('Starred', at, { value: v })));
      } else if (this.isOp('**')) {
        this.i++;
        const v = this.parseExpression();
        if (this.isOp('=')) this.unpackingAssign('cannot assign to keyword argument unpacking', at);
        keywords.push({ arg: null, value: v, line: at.line, col: at.col, endLine: v.endLine, endCol: v.endCol });
        seenKwUnpack = true;
      } else if (at.type === 'NAME' && (!KW.has(at.string) || at.string === 'True' || at.string === 'False' || at.string === 'None') && this.isOpAt(1, '=')) {
        if (at.string === 'True' || at.string === 'False' || at.string === 'None') this.failTok(`cannot assign to ${at.string}`, at);
        if (KW.has(at.string)) this.generic();
        this.i += 2;
        if (this.isOp(')') || this.isOp(',')) this.failRange('expected argument value expression', at, this.toks[this.i - 1]);
        const v = this.parseExpression();
        if (this.isKw('for')) this.failAt("invalid syntax. Maybe you meant '==' or ':=' instead of '='?", at);
        keywords.push({ arg: at.string, value: v, line: at.line, col: at.col, endLine: v.endLine, endCol: v.endCol });
        seenKw = true;
      } else {
        let v;
        if (at.type === 'NAME' && !KW.has(at.string) && this.isOpAt(1, ':=')) v = this.parseNamedExpression();
        else v = this.parseExpression();
        if (this.isKw('for')) {
          // generator expression argument
          const gen = this.parseComprehensionTail('GenExp', v, at);
          if (!(args.length === 0 && keywords.length === 0 && this.isOp(')'))) {
            if (this.isOp(',') && args.length === 0 && keywords.length === 0 && this.isOpAt(1, ')')) { this.i++; } else this.failAt('Generator expression must be parenthesized', gen);
          }
          args.push(gen);
          continue;
        }
        if (this.isOp('=')) {
          if (v.t !== 'Name') this.failRange('expression cannot contain assignment, perhaps you meant "=="?', v, this.tok);
        }
        if (seenKwUnpack) this.failLast('positional argument follows keyword argument unpacking');
        if (seenKw) this.failLast('positional argument follows keyword argument');
        args.push(v);
      }
      if (!this.eatOp(',')) break;
    }
    if (!this.isOp(')')) {
      this.generic();
    }
    this.i++;
    return this.endAt({ t: 'Call', func, args, keywords, line: t.line, col: t.col, parenLine: pt.line });
  }

  parseSlices() {
    const first = this.tok;
    const s = this.parseSlice();
    if (this.isOp(',')) {
      const elts = [s];
      while (this.eatOp(',')) { if (this.isOp(']')) break; elts.push(this.parseSlice()); }
      return this.endAt(this.node('Tuple', first, { elts }));
    }
    return s;
  }
  parseSlice() {
    const t = this.tok;
    let lower = null, upper = null, step = null;
    if (!this.isOp(':')) {
      if (this.isOp('*')) return this.parseStarExpression();
      lower = this.parseNamedExpression();
      if (!this.isOp(':')) return lower;
    }
    this.i++;
    if (!this.isOp(':') && !this.isOp(']') && !this.isOp(',')) upper = this.parseExpression();
    if (this.eatOp(':')) { if (!this.isOp(']') && !this.isOp(',')) step = this.parseExpression(); }
    return this.endAt(this.node('Slice', t, { lower, upper, step }));
  }

  parseAtom() {
    const t = this.tok;
    switch (t.type) {
      case 'NAME': {
        if (t.string === 'None') { this.i++; return this.node('Const', t, { value: null }); }
        if (t.string === 'True') { this.i++; return this.node('Const', t, { value: true }); }
        if (t.string === 'False') { this.i++; return this.node('Const', t, { value: false }); }
        if (KW.has(t.string)) {
          if (t.string === 'lambda') return this.parseLambda();
          this.generic();
        }
        this.i++;
        return this.node('Name', t, { id: t.string, ctx: 'load' });
      }
      case 'NUMBER': {
        this.i++;
        const s = t.string.replace(/_/g, '');
        if (t.numKind === 'imag') this.unsupported('complex numbers', t);
        if (t.numKind === 'float') return this.node('Const', t, { value: Number(s), isFloat: true });
        let v;
        if (t.numKind === 'x') v = BigInt('0x' + s.slice(2));
        else if (t.numKind === 'o') v = BigInt('0o' + s.slice(2));
        else if (t.numKind === 'b') v = BigInt('0b' + s.slice(2));
        else v = BigInt(s.replace(/^0+(?=\d)/, ''));
        return this.node('Const', t, { value: v });
      }
      case 'STRING': return this.parseStrings();
      case 'OP':
        switch (t.string) {
          case '(': return this.parseParen();
          case '[': return this.parseList();
          case '{': return this.parseDictOrSet();
          case '...': this.i++; return this.node('Const', t, { value: ELLIPSIS, ellipsis: true });
        }
    }
    this.generic();
  }

  parseStrings() {
    const first = this.tok;
    const parts = [];      // strings and FormattedValue nodes
    let isF = false, isBytes = null;
    while (this.tok.type === 'STRING') {
      const t = this.next();
      if (t.bytes) this.unsupported('bytes literals', t);
      if (isBytes === null) isBytes = t.bytes;
      if (t.fstring) { isF = true; for (const p of this.parseFString(t)) parts.push(p); } else {
        const s = decodeEscapes(t.body, t.raw, (msg) => this.failTok(msg, t));
        parts.push(s);
      }
    }
    if (!isF) return this.endAt(this.node('Const', first, { value: parts.join('') }));
    // merge adjacent literal parts
    const merged = [];
    for (const p of parts) {
      if (typeof p === 'string' && typeof merged[merged.length - 1] === 'string') merged[merged.length - 1] += p;
      else if (p !== '') merged.push(p);
    }
    return this.endAt(this.node('JoinedStr', first, { values: merged }));
  }

  // f-string body → array of literal strings and FormattedValue nodes
  parseFString(t, body = t.body, line0 = t.bodyLine, col0 = t.bodyCol, nested = 0) {
    const out = [];
    let lit = '';
    let i = 0;
    const raw = t.raw;
    let line = line0, col = col0;
    const advanceTo = (j) => { for (; i < j; i++) { if (body[i] === '\n') { line++; col = 0; } else col++; } };
    const err = (msg) => this.fail(msg, line, col);
    // a bad escape in the literal text is reported at the f-string's closing quote (CPython decodes the FSTRING_MIDDLE
    // parts when the whole f-string has been read)
    const ql = t.triple ? 3 : 1;
    const escErr = (msg) => this.fail(msg, t.endLine, t.endCol - ql, { endLine: t.endLine, endCol: t.endCol });
    while (i < body.length) {
      const c = body[i];
      if (c === '{') {
        if (body[i + 1] === '{' && !nested) { lit += '{'; advanceTo(i + 2); continue; }
        if (lit) { out.push(decodeEscapes(lit, raw, escErr)); lit = ''; }
        // find the end of the expression part
        const start = i + 1;
        let j = start, depth = 0, quote = null;
        let exprEnd = -1, bang = -1, specStart = -1, endField = -1, debugEq = false, debugEnd = -1, debugBad = -1;
        while (j < body.length) {
          const d = body[j];
          if (quote) {
            if (d === '\\') { j += 2; continue; }
            if (body.startsWith(quote, j)) { j += quote.length; quote = null; continue; }
            j++; continue;
          }
          if (d === '"' || d === "'") { quote = body.startsWith(d.repeat(3), j) ? d.repeat(3) : d; j += quote.length; continue; }
          if (d === '#') { while (j < body.length && body[j] !== '\n') j++; continue; }   // comment (multi-line fields)
          if (d === '(' || d === '[' || d === '{') { depth++; j++; continue; }
          if (d === ')' || d === ']') { depth--; j++; continue; }
          if (d === '}' && depth > 0) { depth--; j++; continue; }
          if (depth === 0) {
            if (d === '}') { exprEnd = j; endField = j; break; }
            if (d === '=' && body[j + 1] !== '=' && !'=!<>'.includes(body[j - 1])) {
              debugEq = true; exprEnd = j; j++;
              while (j < body.length && /\s/.test(body[j])) j++;
              debugEnd = j;
              // after '=', optional !conv and :spec
              if (body[j] === '!') bang = j;
              else if (body[j] === ':') specStart = j + 1;
              else if (body[j] === '}') endField = j;
              else if (j < body.length) debugBad = j;
              break;
            }
            if (d === '!' && body[j + 1] !== '=') { exprEnd = j; bang = j; break; }
            if (d === ':') { exprEnd = j; specStart = j + 1; break; }
          }
          j++;
        }
        if (exprEnd < 0) { advanceTo(Math.min(j, body.length)); err("f-string: expecting '}'"); }
        // (line, col) of a body index (fields may span lines in triple-quoted f-strings)
        const posAt = (idx) => { let l = line, cc = col; for (let q = i; q < idx; q++) { if (body[q] === '\n') { l++; cc = 0; } else cc++; } return { l, c: cc }; };
        const failBody = (msg, a, b) => { const pa = posAt(a), pb = posAt(b); this.fail(msg, pa.l, pa.c, { endLine: pb.l, endCol: pb.c }); };
        const exprSrc = body.slice(start, exprEnd);
        if (!exprSrc.trim()) {
          advanceTo(exprEnd);
          if (body[exprEnd] === '}' || body[exprEnd] === undefined) err("f-string: valid expression required before '}'");
          if (body[exprEnd] === '!') err("f-string: valid expression required before '!'");
          if (body[exprEnd] === ':') err("f-string: valid expression required before ':'");
          if (body[exprEnd] === '=') err("f-string: valid expression required before '='");
          err("f-string: empty expression not allowed");
        }
        const lam = /^\s*lambda(?![A-Za-z0-9_])/.exec(exprSrc);
        if (lam && specStart >= 0) {
          const ls = start + lam[0].length - 6;
          failBody('f-string: lambda expressions are not allowed without parentheses', ls, specStart);
        }
        // parse the expression (parenthesised so that newlines/tuples are fine)
        const sub = new Parser(scan('(' + exprSrc + ')'), '(' + exprSrc + ')', { lineOffset: line - 1, inFString: true });
        let expr;
        try {
          expr = sub.parseFStringExpr();
        } catch (e) {
          if (!(e instanceof ParseFail)) throw e;
          const r = sub.resolveError(e.err);
          if (r.msg.startsWith("'(' was never closed")) this.fail("f-string: expecting '}'", line, col);
          if (r.msg === 'invalid syntax') this.fstringReplacementFieldError(exprSrc, posAt(start));
          // errors of the expression grammar read as in ordinary code (CPython 3.12+), at the mapped position:
          // the sub-source '(' sits where the '{' is
          const shift = (ln, c) => (ln === line ? c + col : c);
          throw new ParseFail({
            kind: 'specific', type: r.type, msg: r.msg, line: r.line, offset: shift(r.line, r.col),
            endLine: r.endLine, endOffset: r.endCol > 0 ? shift(r.endLine, r.endCol) : r.endCol,
          });
        }
        if (debugBad >= 0) failBody("f-string: expecting '!', or ':', or '}'", debugBad, debugBad + 1);
        let conv = null;
        if (bang >= 0) {
          // fstring_conversion: '!' NAME, directly after the '!'
          const k = bang + 1;
          if (body[k] === ':' || body[k] === '}') failBody('f-string: missing conversion character', k, k + 1);
          if (body[k] !== undefined && /\s/.test(body[k])) failBody('f-string: conversion type must come right after the exclamanation mark', k, k + 1);
          let e = k;
          while (e < body.length && /[A-Za-z0-9_]/.test(body[e])) e++;
          if (e === k || /[0-9]/.test(body[k])) {
            // ON_NEXT_TOKEN: the whole token after '!' (e.g. a number)
            let te = k + 1;
            if (/[0-9]/.test(body[k])) { const m = /^[0-9][0-9_]*(\.[0-9_]*)?([eE][+-]?[0-9_]+)?[jJ]?/.exec(body.slice(k)); te = k + m[0].length; }
            failBody('f-string: invalid conversion character', k, te);
          }
          conv = body.slice(k, e);
          if (!['s', 'r', 'a'].includes(conv)) failBody(`f-string: invalid conversion character '${conv}': expected 's', 'r', or 'a'`, k, e);
          if (body[e] === ':') specStart = e + 1;
          else if (body[e] === '}') endField = e;
          else if (e < body.length) failBody("f-string: expecting ':' or '}'", e, e + 1);
          // f"{x!r" : CPython reads `r"` as the start of a nested string literal and reports from its prefix
          else if ('rRbBuUfF'.includes(conv) && conv.length === 1) failBody("f-string: expecting '}'", k, k);
        }
        let spec = null;
        if (specStart >= 0) {
          // format spec runs to the matching '}' (may contain nested replacement fields with any expression)
          const k = fSpecEnd(body, specStart, raw);
          if (k >= body.length) {
            if (!nested && t.specUnclosed) {
              // invalid_replacement_field: ... ':' fstring_format_spec* !'}' → ON_NEXT_TOKEN (the FSTRING_END quote)
              const ql = t.triple ? 3 : 1;
              this.fail("f-string: expecting '}', or format specs", t.endLine, t.endCol - ql, { endLine: t.endLine, endCol: t.endCol });
            }
            advanceTo(body.length); err("f-string: expecting '}'");
          }
          endField = k;
          const specSrc = body.slice(specStart, k);
          const specParts = this.parseFString(t, specSrc, line, col + (specStart - i), nested + 1);
          spec = { t: 'JoinedStr', values: specParts, line, col };
        }
        if (endField < 0) { advanceTo(body.length); err("f-string: expecting '}'"); }
        fixPositions(expr, line, col + 1);
        const fv = { t: 'FormattedValue', value: expr, conversion: conv, spec, line, col, endLine: posAt(endField).l };
        if (debugEq) {
          out.push(body.slice(start, debugEnd));
          if (conv === null && spec === null) fv.conversion = 'r';
        }
        out.push(fv);
        advanceTo(endField + 1);
        continue;
      }
      if (c === '}') {
        if (body[i + 1] === '}' && !nested) { lit += '}'; advanceTo(i + 2); continue; }
        err("f-string: single '}' is not allowed");
      }
      if (c === '\\') {
        // CPython's f-string lexer: '\{' / '\}' do not escape the brace (it is read next), \N{...} is one escape
        const nx = body[i + 1];
        if (nx === '{' || nx === '}') { lit += c; advanceTo(i + 1); continue; }
        const ne = raw ? -1 : fNamedEscape(body, i);
        if (ne > 0) { lit += body.slice(i, ne); advanceTo(ne); continue; }
        if (!raw) { lit += c + (nx ?? ''); advanceTo(i + 2); continue; }
      }
      lit += c;
      advanceTo(i + 1);
    }
    if (lit) out.push(decodeEscapes(lit, raw, escErr));
    return out;
  }
  /**
   * CPython's invalid_replacement_field for an expression part that does not parse: the longest prefix that is a
   * valid expression must be followed by '=', '!', ':' or '}'.
   */
  fstringReplacementFieldError(exprSrc, at) {
    const toks = scan(exprSrc, { lenient: true }).tokens.filter((t) => !['NEWLINE', 'NL', 'COMMENT', 'INDENT', 'DEDENT', 'ENDMARKER'].includes(t.type));
    const lineStarts = [0];
    for (let q = 0; q < exprSrc.length; q++) if (exprSrc[q] === '\n') lineStarts.push(q + 1);
    const idxOf = (ln, c) => lineStarts[ln - 1] + c;
    const mapPos = (t) => ({ line: at.l + t.line - 1, col: t.line === 1 ? at.c + t.col : t.col, endLine: at.l + t.endLine - 1, endCol: t.endLine === 1 ? at.c + t.endCol : t.endCol });
    for (let k = toks.length - 1; k >= 1; k--) {
      const prefix = exprSrc.slice(0, idxOf(toks[k - 1].endLine, toks[k - 1].endCol));
      const pp = new Parser(scan('(' + prefix + ')', { lenient: true }), '(' + prefix + ')', { inFString: true });
      try { pp.parseFStringExpr(); } catch (e) { if (e instanceof ParseFail) continue; throw e; }
      const m = mapPos(toks[k]);
      this.fail("f-string: expecting '=', or '!', or ':', or '}'", m.line, m.col, { endLine: m.endLine, endCol: m.endCol });
    }
    const m = toks.length ? mapPos(toks[0]) : { line: at.l, col: at.c, endLine: at.l, endCol: at.c };
    this.fail("f-string: expecting a valid expression after '{'", m.line, m.col, { endLine: m.endLine, endCol: m.endCol });
  }
  parseFStringExpr() {
    this.expectOp('(');
    const e = this.parseStarExpressionsOrYield();
    this.expectOp(')');
    if (this.tok.type !== 'NEWLINE' && this.tok.type !== 'ENDMARKER') this.generic();
    return e;
  }
  parseStarExpressionsOrYield() { return this.isKw('yield') ? this.parseYieldExpr() : this.parseStarExpressions(); }
  /** yield_expr: 'yield' 'from' expression | 'yield' [star_expressions] (the compiler then reports it: minipy has no
   * generator functions, and at module level it is "'yield' outside function" like CPython) */
  parseYieldExpr() {
    const t = this.next();
    if (this.isKw('from')) { this.i++; const value = this.parseExpression(); return this.endAt(this.node('YieldFrom', t, { value })); }
    const value = this.canStartExpression() ? this.parseStarExpressions() : null;
    return this.endAt(this.node('Yield', t, { value }));
  }

  parseParen() {
    const t = this.next();
    if (this.isOp(')')) { this.i++; return this.endAt(this.node('Tuple', t, { elts: [], paren: true })); }
    if (this.isKw('yield')) { const y = this.parseYieldExpr(); this.expectOp(')'); y.paren = true; return y; }
    let first;
    if (this.isOp('**')) {
      // invalid_group: '(' '**' expression ')'
      const st = this.tok;
      if (this.tryParse(() => { this.i++; this.parseExpression(); this.expectOp(')'); })) this.failTok('cannot use double starred expression here', st);
    }
    if (this.isOp('*')) first = this.parseStarExpression();
    else first = this.parseNamedExpression();
    if (this.isKw('for')) {
      if (first.t === 'Starred') this.failAt('iterable unpacking cannot be used in comprehension', first);
      const g = this.parseComprehensionTail('GenExp', first, t);
      this.expectOp(')');
      g.paren = true;
      return this.endAt(g);
    }
    if (this.isOp(')')) {
      this.i++;
      if (first.t === 'Starred') this.failAt("cannot use starred expression here", first);
      first.paren = true;
      return first;
    }
    if (!this.isOp(',')) this.generic();
    const elts = [first];
    while (this.eatOp(',')) {
      if (this.isOp(')')) break;
      elts.push(this.isOp('*') ? this.parseStarExpression() : this.parseNamedExpression());
    }
    this.expectOp(')');
    return this.endAt(this.node('Tuple', t, { elts, paren: true }));
  }

  parseList() {
    const t = this.next();
    const elts = [];
    if (this.isOp(']')) { this.i++; return this.endAt(this.node('List', t, { elts })); }
    const first = this.isOp('*') ? this.parseStarExpression() : this.parseNamedExpression();
    if (this.isKw('for')) {
      if (first.t === 'Starred') this.failAt('iterable unpacking cannot be used in comprehension', first);
      const c = this.parseComprehensionTail('ListComp', first, t);
      this.expectOp(']');
      return this.endAt(c);
    }
    elts.push(first);
    while (this.eatOp(',')) {
      if (this.isOp(']')) break;
      if (this.isKw('for')) this.failRange('did you forget parentheses around the comprehension target?', first, this.toks[this.i - 1]);
      elts.push(this.isOp('*') ? this.parseStarExpression() : this.parseNamedExpression());
    }
    if (this.isKw('for') && elts.length > 1) this.forgotParens(first, elts[elts.length - 1]);
    this.expectOp(']');
    return this.endAt(this.node('List', t, { elts }));
  }

  parseDictOrSet() {
    const t = this.next();
    if (this.isOp('}')) { this.i++; return this.endAt(this.node('Dict', t, { keys: [], values: [] })); }
    // first item decides
    if (this.isOp('**')) {
      const st = this.next();
      const v = this.parseBitOr();
      if (this.isKw('for')) this.failTok('dict unpacking cannot be used in dict comprehension', st);
      return this.parseDictRest(t, [null], [v]);
    }
    const first = this.isOp('*') ? this.parseStarExpression() : this.parseNamedExpression();
    if (this.isOp(':') && first.t !== 'Starred') {
      const ct = this.next();
      if (this.isOp('}') || this.isOp(',')) this.failTok("expression expected after dictionary key and ':'", ct);
      this.starredDictValue();
      const v = this.parseExpression();
      if (this.isKw('for')) {
        const c = this.parseComprehensionTail('DictComp', { key: first, value: v }, t);
        this.expectOp('}');
        return this.endAt(c);
      }
      return this.parseDictRest(t, [first], [v]);
    }
    if (this.isKw('for')) {
      if (first.t === 'Starred') this.failAt('iterable unpacking cannot be used in comprehension', first);
      const c = this.parseComprehensionTail('SetComp', first, t);
      this.expectOp('}');
      return this.endAt(c);
    }
    const elts = [first];
    while (this.eatOp(',')) {
      if (this.isOp('}')) break;
      if (this.isKw('for')) this.failRange('did you forget parentheses around the comprehension target?', first, this.toks[this.i - 1]);
      elts.push(this.isOp('*') ? this.parseStarExpression() : this.parseNamedExpression());
    }
    if (this.isKw('for') && elts.length > 1) this.forgotParens(first, elts[elts.length - 1]);
    this.expectOp('}');
    return this.endAt(this.node('Set', t, { elts }));
  }
  parseDictRest(t, keys, values) {
    while (this.eatOp(',')) {
      if (this.isOp('}')) break;
      if (this.eatOp('**')) { keys.push(null); values.push(this.parseBitOr()); continue; }
      this.noJuxta = true;
      let k;
      try { k = this.parseExpression(); } finally { this.noJuxta = false; }
      if (!this.isOp(':')) {
        if (this.isOp('}') || this.isOp(',') || this.canStartExpression()) this.fail("':' expected after dictionary key", k.line, k.endCol - 1, { endLine: k.endLine, endOffset: 0 });
        this.generic();
      }
      this.i++;
      if (this.isOp('}') || this.isOp(',')) this.failAt('expression expected after dictionary key and \':\'', { line: this.toks[this.i - 1].line, col: this.toks[this.i - 1].col });
      this.starredDictValue();
      values.push(this.parseExpression());
      keys.push(k);
    }
    this.expectOp('}');
    return this.endAt(this.node('Dict', t, { keys, values }));
  }

  /** invalid_comprehension: [a, b for x in y] — needs the comprehension clauses to parse */
  forgotParens(first, last) {
    if (this.tryParse(() => this.parseComprehensionTail('ListComp', first, first))) this.failRange('did you forget parentheses around the comprehension target?', first, last);
  }
  /** expression ':' '*' bitwise_or → STARTING_FROM('*') */
  starredDictValue() {
    if (!this.isOp('*')) return;
    const st = this.tok;
    const r = this.tryParse(() => { this.i++; return this.parseBitOr(); });
    if (r) { this.i = r.end; this.failFrom('cannot use a starred expression in a dictionary value', st); }
  }
  parseComprehensionTail(kind, elt, t) {
    const generators = [];
    while (this.isKw('for') || (this.isKw('async'))) {
      if (this.isKw('async')) this.unsupported("'async'", this.tok);
      this.i++;
      const target = this.parseCompTarget();
      this.expectKw('in');
      const iter = this.parseDisjunction();
      const ifs = [];
      while (this.isKw('if')) { this.i++; ifs.push(this.parseDisjunction()); }
      generators.push({ target, iter, ifs });
    }
    const n = this.node(kind, t, { generators });
    if (kind === 'DictComp') { n.key = elt.key; n.value = elt.value; } else n.elt = elt;
    return this.endAt(n);
  }
  parseCompTarget() {
    const first = this.tok;
    const elts = [];
    let trailing = false;
    for (;;) {
      if (this.isOp('*')) { const st = this.next(); elts.push(this.node('Starred', st, { value: this.parseBitOr() })); } else elts.push(this.parseBitOr());
      if (this.isOp(',')) { this.i++; trailing = true; if (this.isKw('in')) break; trailing = false; continue; }
      break;
    }
    const tgt = elts.length === 1 && !trailing ? elts[0] : this.node('Tuple', first, { elts });
    if (!this.isKw('in')) this.failLast("'in' expected after for-loop variables");
    const bad = invalidTarget(tgt, 'store');
    if (bad) this.failAt(`cannot assign to ${exprName(bad)}`, bad);
    setCtx(tgt, 'store');
    return tgt;
  }
}

function isBitOrLevel(e) {
  return !(e.t === 'Compare' || e.t === 'BoolOp' || (e.t === 'UnaryOp' && e.op === 'not') || e.t === 'IfExp' || e.t === 'Lambda' || e.t === 'NamedExpr' || e.t === 'Starred') || e.paren;
}

/** first invalid assignment/deletion target inside e (CPython's _PyPegen_get_invalid_target) */
export function invalidTarget(e, ctx) {
  switch (e.t) {
    case 'Name': case 'Attribute': case 'Subscript': return null;
    case 'Tuple': case 'List':
      for (const x of e.elts) { const b = invalidTarget(x, ctx); if (b) return b; }
      return null;
    case 'Starred':
      if (ctx === 'del') return e;
      return invalidTarget(e.value, ctx);
    case 'Compare':
      // "a in b" in a for target is reported as the left side when it's valid
      if (ctx === 'for' && e.ops[0] === 'in') return invalidTarget(e.left, ctx);
      return e;
  }
  return e;
}
function setCtx(e, ctx) {
  if (e.t === 'Name' || e.t === 'Attribute' || e.t === 'Subscript') e.ctx = ctx;
  else if (e.t === 'Tuple' || e.t === 'List') for (const x of e.elts) setCtx(x, ctx);
  else if (e.t === 'Starred') setCtx(e.value, ctx);
}
function fixPositions(n, line, colBase) {
  // expressions parsed from an f-string get columns relative to the replacement field; good enough for errors
  void n; void line; void colBase;
}
