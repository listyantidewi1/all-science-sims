// minipy — step-by-step expression reduction for teaching precedence: one operator per step, in Python's
// evaluation order, values printed with repr.
import { repr, truthy, compare, PyExc, PyFunction, PyBuiltin, PyType, PyModule, PySlice, PyList, PyTuple, PySet, PyDict, PyRange } from './values.js';
import { binop, unary, getitem } from './ops.js';
import { getAttribute } from './builtins.js';

const P = { TUPLE: 1, TEST: 3, OR: 4, AND: 5, NOT: 6, CMP: 7, BOR: 9, BXOR: 10, BAND: 11, SHIFT: 12, ARITH: 13, TERM: 14, FACTOR: 15, POWER: 16, ATOM: 18 };
const BINPREC = { '|': P.BOR, '^': P.BXOR, '&': P.BAND, '<<': P.SHIFT, '>>': P.SHIFT, '+': P.ARITH, '-': P.ARITH, '*': P.TERM, '/': P.TERM, '//': P.TERM, '%': P.TERM, '@': P.TERM, '**': P.POWER };

function isNegative(v) { return (typeof v === 'bigint' && v < 0n) || (typeof v === 'number' && (v < 0 || Object.is(v, -0))); }

export function unparse(n, ctx = 0) {
  let s, p;
  switch (n.t) {
    case 'Val':
      // a literal no operator has used yet keeps the text the student typed ("5", 0x1F, 1e3, -3)
      if (n.src != null) { s = n.src; p = /^[-+~]/.test(s) || isNegative(n.value) ? P.FACTOR : P.ATOM; } else { s = repr(n.value); p = isNegative(n.value) ? P.FACTOR : P.ATOM; }
      break;
    case 'Const': s = n.ellipsis ? '...' : repr(n.value); p = isNegative(n.value) ? P.FACTOR : P.ATOM; break;
    case 'Name': s = n.id; p = P.ATOM; break;
    case 'BinOp': {
      p = BINPREC[n.op];
      const right = n.op === '**';
      // the right operand of ** is a "factor" in Python's grammar: 2 ** -1 needs no parentheses
      s = `${unparse(n.left, right ? p + 1 : p)} ${n.op} ${unparse(n.right, right ? P.FACTOR : p + 1)}`;
      break;
    }
    case 'UnaryOp':
      if (n.op === 'not') { p = P.NOT; s = `not ${unparse(n.operand, P.NOT)}`; } else {
        p = P.FACTOR;
        // -(-1) rather than --1 once the inner operand has become a negative value, except when that value is what a
        // sign written in front of a number gave (--5: applying the inner minus changes nothing on screen)
        const neg = (n.operand.t === 'Val' || n.operand.t === 'Const') && isNegative(n.operand.value) && !n.operand.sameText;
        // the value of a binary operation keeps its brackets until the sign is applied: -2 ** 2 → -(4) → -4, so
        // applying the minus is a step of its own
        s = neg || (n.operand.t === 'Val' && n.operand.fromBinOp) ? `${n.op}(${unparse(n.operand, 0)})` : `${n.op}${unparse(n.operand, P.FACTOR)}`;
      }
      break;
    case 'BoolOp': p = n.op === 'and' ? P.AND : P.OR; s = n.values.map((v, i) => unparse(v, i ? p + 1 : p + 1)).join(` ${n.op} `); break;
    case 'Compare': p = P.CMP; s = unparse(n.left, p + 1); n.ops.forEach((op, i) => { s += ` ${op} ${unparse(n.comparators[i], p + 1)}`; }); break;
    case 'IfExp': p = P.TEST; s = `${unparse(n.body, p + 1)} if ${unparse(n.test, p + 1)} else ${unparse(n.orelse, p)}`; break;
    case 'Call': {
      p = P.ATOM;
      const args = n.args.map((a) => unparse(a, P.TEST));
      for (const k of n.keywords) args.push(k.arg === null ? `**${unparse(k.value, P.TEST)}` : `${k.arg}=${unparse(k.value, P.TEST)}`);
      s = `${unparse(n.func, P.ATOM)}(${args.join(', ')})`;
      break;
    }
    case 'Attribute': {
      p = P.ATOM;
      let v = unparse(n.value, P.ATOM);
      if ((n.value.t === 'Val' || n.value.t === 'Const') && typeof n.value.value === 'bigint' && /^\d+$/.test(v)) v += ' ';
      s = `${v}.${n.attr}`;
      break;
    }
    case 'Subscript': p = P.ATOM; s = `${unparse(n.value, P.ATOM)}[${n.slice.t === 'Tuple' ? n.slice.elts.map((e) => unparse(e, P.TEST)).join(', ') : unparse(n.slice, 0)}]`; break;
    case 'Slice': p = P.ATOM; s = `${n.lower ? unparse(n.lower, P.TEST) : ''}:${n.upper ? unparse(n.upper, P.TEST) : ''}${n.step ? ':' + unparse(n.step, P.TEST) : ''}`; break;
    case 'List': p = P.ATOM; s = `[${n.elts.map((e) => unparse(e, P.TEST)).join(', ')}]`; break;
    case 'Tuple': p = P.ATOM; s = n.elts.length === 1 ? `(${unparse(n.elts[0], P.TEST)},)` : `(${n.elts.map((e) => unparse(e, P.TEST)).join(', ')})`; break;
    case 'Set': p = P.ATOM; s = `{${n.elts.map((e) => unparse(e, P.TEST)).join(', ')}}`; break;
    case 'Dict': p = P.ATOM; s = `{${n.keys.map((k, i) => (k === null ? `**${unparse(n.values[i], P.BOR)}` : `${unparse(k, P.TEST)}: ${unparse(n.values[i], P.TEST)}`)).join(', ')}}`; break;
    case 'Starred': p = P.ATOM; s = `*${unparse(n.value, P.BOR)}`; break;
    case 'JoinedStr': {
      p = P.ATOM;
      let body = '';
      for (const v of n.values) {
        if (typeof v === 'string') body += v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\{/g, '{{').replace(/\}/g, '}}');
        else body += `{${unparse(v.value, P.TEST)}${v.conversion ? '!' + v.conversion : ''}${v.spec ? ':' + v.spec.values.map((x) => (typeof x === 'string' ? x : `{${unparse(x.value)}}`)).join('') : ''}}`;
      }
      s = `f'${body}'`;
      break;
    }
    case 'Lambda': p = P.TEST; s = `lambda${n.params.args.length ? ' ' + n.params.args.map((a) => a.name).join(', ') : ''}: ${unparse(n.body, P.TEST)}`; break;
    case 'ListComp': case 'SetComp': case 'GenExp': case 'DictComp': {
      p = P.ATOM;
      const gens = n.generators.map((g) => ` for ${unparse(g.target, P.TUPLE)} in ${unparse(g.iter, P.TEST + 1)}${g.ifs.map((c) => ' if ' + unparse(c, P.TEST + 1)).join('')}`).join('');
      const inner = n.t === 'DictComp' ? `${unparse(n.key, P.TEST)}: ${unparse(n.value, P.TEST)}` : unparse(n.elt, P.TEST);
      s = n.t === 'ListComp' ? `[${inner}${gens}]` : n.t === 'GenExp' ? `(${inner}${gens})` : `{${inner}${gens}}`;
      break;
    }
    case 'NamedExpr': p = 0; s = `${n.target.id} := ${unparse(n.value, P.ATOM)}`; break;
    default: p = P.ATOM; s = '?';
  }
  // the student's own parentheses stay around a part that has not been reduced yet: (2 * 3) + (4 * 5) → 6 + (4 * 5)
  if (n.paren && PAREN_KEEP.has(n.t)) return `(${s})`;
  return p < ctx ? `(${s})` : s;
}
const PAREN_KEEP = new Set(['BinOp', 'UnaryOp', 'BoolOp', 'Compare', 'IfExp', 'Lambda', 'NamedExpr']);

function clone(n) {
  if (Array.isArray(n)) return n.map(clone);
  if (!n || typeof n !== 'object') return n;
  const o = {};
  for (const k in n) { if (k === 'scope' || k === 'compScopes') { o[k] = n[k]; continue; } o[k] = clone(n[k]); }
  return o;
}
const V = (value) => ({ t: 'Val', value });
const isVal = (n) => n.t === 'Val';
const isBase = (n) => n.t === 'Val' || n.t === 'Name';

/**
 * Reduce an expression AST step by step.
 * @returns {{ok:boolean, steps:string[], error?:object}}
 */
export function reduceAst(ast0, I, f, mkErr, source) {
  let root = clone(ast0);
  // steps[0] is the expression exactly as typed (the student's parentheses, 0x1F, 1e3, 10_000 stay)
  const steps = [source != null ? source : unparse(root)];
  // the source text of a node (columns count code points), so a literal keeps its spelling until it is used
  const srcLines = source != null ? String(source).split('\n').map((l) => Array.from(l)) : null;
  const srcOf = (n) => {
    if (!srcLines || n.line == null || n.col == null || n.endLine == null || n.endCol == null) return null;
    const a = n.line - 1, b = n.endLine - 1;
    if (a < 0 || b >= srcLines.length || b < a) return null;
    if (a === b) return srcLines[a].slice(n.col, n.endCol).join('');
    const parts = [srcLines[a].slice(n.col).join('')];
    for (let i = a + 1; i < b; i++) parts.push(srcLines[i].join(''));
    parts.push(srcLines[b].slice(0, n.endCol).join(''));
    return parts.join('\n');
  };
  const lit = (value, n, extra) => {
    const v = { t: 'Val', value, lit: true, ...extra };
    const t = srcOf(n);
    if (t != null && t.trim() === t && t) v.src = t;
    return v;
  };
  // a step must be valid Python that applied one operator: an intermediate state that shows a function, type,
  // method, lambda or iterator as a value (<built-in function abs>, <map object at ...>) is not shown
  const push = () => {
    if (!isVal(root) && hasOpaque(root)) return;
    const s = unparse(root);
    if (s !== steps[steps.length - 1]) steps.push(s);
  };
  try {
    // constants → values; variables substituted in one step
    let subst = false;
    const prep = (n) => {
      if (!n || typeof n !== 'object') return n;
      if (Array.isArray(n)) return n.map(prep);
      if (n.t === 'Const') return n.ellipsis ? n : lit(n.value, n);
      if (n.t === 'Name') {
        // a name that cannot be loaded stays a name: it raises NameError only if the evaluation reaches it
        // (x > 0 or undefined_name is True, like Python's short-circuit evaluation)
        let v;
        try { v = I.loadName(n, f); } catch (e) { if (e instanceof PyExc) return n; throw e; }
        if (v instanceof PyFunction || v instanceof PyBuiltin || v instanceof PyType || v instanceof PyModule) return n;
        subst = true;
        return V(v);
      }
      if (n.t === 'Lambda' || n.t === 'ListComp' || n.t === 'SetComp' || n.t === 'DictComp' || n.t === 'GenExp') return n;
      if ((n.t === 'Subscript' || n.t === 'Attribute') && n.value.t === 'Name') {
        // nilai[0] / teks.upper: looked up in one step later, the container itself is not substituted
        if (n.t === 'Subscript') n.slice = prep(n.slice);
        return n;
      }
      for (const k in n) { if (k === 'scope' || k === 'compScopes') continue; const v = n[k]; if (v && typeof v === 'object') n[k] = prep(v); }
      return literal(n);
    };
    // literals are values from the start (no step that only reformats them): a negated number literal (-3) and
    // list / tuple / set / dict displays made of literals ("x" in ["x", "y"] → True in one step)
    const isLit = (x) => x && x.t === 'Val' && x.lit;
    const literal = (n) => {
      if (n.t === 'UnaryOp' && (n.op === '-' || n.op === '+') && isLit(n.operand) && !n.operand.signed && (typeof n.operand.value === 'bigint' || typeof n.operand.value === 'number')) {
        // only the sign written directly on a number: in - -3 the outer minus is an operator step
        return lit(unary(n.op, n.operand.value), n, { signed: true });
      }
      if ((n.t === 'List' || n.t === 'Tuple' || n.t === 'Set') && n.elts.every(isLit)) return lit(I.ev({ t: n.t, elts: n.elts.map(toConst) }, f), n);
      if (n.t === 'Dict' && n.keys.every(isLit) && n.values.every(isLit)) return lit(I.ev({ t: 'Dict', keys: n.keys.map(toConst), values: n.values.map(toConst) }, f), n);
      return n;
    };
    root = prep(root);
    if (subst) push();
    for (let guard = 0; guard < 500 && !isVal(root); guard++) {
      root = reduceOnce(root, I, f);
      push();
    }
    return { ok: true, steps };
  } catch (e) {
    if (e instanceof PyExc || (e && e.steps !== undefined) || (e && e.callRefused) || (e && e.constructor && e.constructor.name === 'StepLimitError')) return { ok: false, steps, error: mkErr(e) };
    throw e;
  }
}

/** a value that has no Python literal form (function, type, method, iterator...), possibly inside a container */
function opaqueValue(v, seen) {
  if (v === null || typeof v !== 'object') return false;
  if (v instanceof PyRange || v instanceof PySlice) return false;
  if (v instanceof PyList || v instanceof PyTuple || v instanceof PySet || v instanceof PyDict) {
    if (seen.has(v)) return false;
    seen.add(v);
    if (v instanceof PyDict) return v.entries().some(([k, x]) => opaqueValue(k, seen) || opaqueValue(x, seen));
    return (v instanceof PySet ? v.keys() : v.items).some((x) => opaqueValue(x, seen));
  }
  return true;
}
function hasOpaque(n) {
  if (!n || typeof n !== 'object') return false;
  if (Array.isArray(n)) return n.some(hasOpaque);
  if (n.t === 'Val') return opaqueValue(n.value, new Set());
  for (const k in n) { if (k === 'scope' || k === 'compScopes') continue; const v = n[k]; if (v && typeof v === 'object' && hasOpaque(v)) return true; }
  return false;
}
// silently convert containers / names whose parts are values
function settle(n, I, f) {
  switch (n.t) {
    case 'Name': return V(I.loadName(n, f));
    case 'List': if (n.elts.every((e) => isVal(e) && e.t !== 'Starred')) return V(I.ev({ t: 'List', elts: n.elts.map(toConst) }, f)); break;
    case 'Tuple': if (n.elts.every(isVal)) return V(I.ev({ t: 'Tuple', elts: n.elts.map(toConst) }, f)); break;
    case 'Set': if (n.elts.every(isVal)) return V(I.ev({ t: 'Set', elts: n.elts.map(toConst) }, f)); break;
    case 'Dict': if (n.keys.every((k) => k && isVal(k)) && n.values.every(isVal)) return V(I.ev({ t: 'Dict', keys: n.keys.map(toConst), values: n.values.map(toConst) }, f)); break;
  }
  return n;
}
/** an operand an operator has returned as its result: a literal now shows as its value (repr) */
const used = (n) => (n.t === 'Val' && n.src != null ? { t: 'Val', value: n.value } : n);
const toConst = (n) => (n.t === 'Val' ? { t: 'Const', value: n.value, pure: true } : n);
function sliceReady(s) { return s.t === 'Slice' ? [s.lower, s.upper, s.step].every((x) => !x || isVal(x)) : isVal(s); }
function sliceValue(s) { return s.t === 'Slice' ? new PySlice(s.lower ? s.lower.value : null, s.upper ? s.upper.value : null, s.step ? s.step.value : null) : s.value; }

/** perform exactly one visible reduction somewhere in n; returns the new node */
function reduceOnce(n, I, f) {
  const r = step(n);
  return r;
  function step(node) {
    node = settle(node, I, f);
    if (isVal(node)) return node;
    switch (node.t) {
      case 'BinOp':
        if (!isVal(node.left)) { node.left = sub(node.left); return node; }
        if (!isVal(node.right)) { node.right = sub(node.right); return node; }
        return { t: 'Val', value: binop(node.op, node.left.value, node.right.value), fromBinOp: true };
      case 'UnaryOp': {
        if (!isVal(node.operand)) { node.operand = sub(node.operand); return node; }
        const r = V(unary(node.op, node.operand.value));
        if (!node.paren && unparse(node) === repr(r.value)) r.sameText = true;
        return r;
      }
      case 'BoolOp': {
        const first = node.values[0];
        if (!isVal(first)) { node.values[0] = sub(first); return node; }
        const t = truthy(first.value);
        if (node.op === 'and' ? !t : t) return used(first);
        return node.values.length > 2 ? { ...node, values: node.values.slice(1) } : used(node.values[1]);
      }
      case 'Compare': {
        if (!isVal(node.left)) { node.left = sub(node.left); return node; }
        if (!isVal(node.comparators[0])) { node.comparators[0] = sub(node.comparators[0]); return node; }
        const res = compare(node.ops[0], node.left.value, node.comparators[0].value);
        if (node.ops.length === 1 || !res) return V(res);
        return { t: 'BoolOp', op: 'and', values: [V(true), { t: 'Compare', left: node.comparators[0], ops: node.ops.slice(1), comparators: node.comparators.slice(1) }] };
      }
      case 'IfExp':
        if (!isVal(node.test)) { node.test = sub(node.test); return node; }
        return used(truthy(node.test.value) ? node.body : node.orelse);
      case 'Call': {
        if (node.func.t === 'Attribute') { if (!isBase(node.func.value)) { node.func.value = sub(node.func.value); return node; } } else if (node.func.t !== 'Name' && !isVal(node.func)) { node.func = sub(node.func); return node; }
        for (let i = 0; i < node.args.length; i++) {
          const a = node.args[i];
          if (a.t === 'Starred') { if (!isVal(a.value)) { a.value = sub(a.value); return node; } continue; }
          if (!isVal(a)) { node.args[i] = sub(a); return node; }
        }
        for (const k of node.keywords) if (!isVal(k.value)) { k.value = sub(k.value); return node; }
        const fn = node.func.t === 'Attribute' ? getAttribute(I, baseValue(node.func.value), node.func.attr) : node.func.t === 'Name' ? I.loadName(node.func, f) : node.func.value;
        const args = [];
        for (const a of node.args) { if (a.t === 'Starred') I.pushStar(args, a.value.value, fn); else args.push(a.value); }
        let kw = null;
        for (const k of node.keywords) kw = I.addKw(kw, k, k.value.value, fn);
        return V(I.callSync(fn, args, kw));
      }
      case 'Attribute':
        if (!isBase(node.value)) { node.value = sub(node.value); return node; }
        return V(getAttribute(I, baseValue(node.value), node.attr));
      case 'Subscript':
        if (!isBase(node.value)) { node.value = sub(node.value); return node; }
        if (!sliceReady(node.slice)) {
          if (node.slice.t === 'Slice') { for (const k of ['lower', 'upper', 'step']) if (node.slice[k] && !isVal(node.slice[k])) { node.slice[k] = sub(node.slice[k]); return node; } } else { node.slice = sub(node.slice); return node; }
        }
        return V(getitem(baseValue(node.value), sliceValue(node.slice), I));
      case 'List': case 'Tuple': case 'Set':
        for (let i = 0; i < node.elts.length; i++) {
          const e = node.elts[i];
          if (e.t === 'Starred') { if (!isVal(e.value)) { e.value = sub(e.value); return node; } continue; }
          if (!isVal(e)) { node.elts[i] = sub(e); return node; }
        }
        return V(I.ev({ t: node.t, elts: node.elts.map((e) => (e.t === 'Starred' ? { t: 'Starred', value: toConst(e.value) } : toConst(e))) }, f));
      case 'Dict':
        for (let i = 0; i < node.keys.length; i++) {
          if (node.keys[i] && !isVal(node.keys[i])) { node.keys[i] = sub(node.keys[i]); return node; }
          if (!isVal(node.values[i])) { node.values[i] = sub(node.values[i]); return node; }
        }
        return V(I.ev({ t: 'Dict', keys: node.keys.map((k) => (k ? toConst(k) : null)), values: node.values.map(toConst) }, f));
      case 'JoinedStr':
        for (const v of node.values) if (typeof v !== 'string' && !isVal(v.value)) { v.value = sub(v.value); return node; }
        return V(I.ev({ t: 'JoinedStr', values: node.values.map((v) => (typeof v === 'string' ? v : { ...v, value: toConst(v.value) })) }, f));
      default:
        // lambdas, comprehensions, walrus...: evaluated as a whole
        return V(I.ev(node, f));
    }
  }
  function baseValue(n) { return n.t === 'Name' ? I.loadName(n, f) : n.value; }
  function sub(child) {
    const settled = settle(child, I, f);
    if (isVal(settled)) return settled;
    return step(settled);
  }
}
