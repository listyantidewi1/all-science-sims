// minipy — compile-time analysis after parsing:
//   1. symtable pass (CPython order): duplicate arguments, global/nonlocal declaration errors
//   2. codegen-like pass: 'return' outside function, 'break' outside loop, repeated keyword arguments, starred targets,
//      unreachable match patterns
//   3. annotation: name resolution (local / global / free / comprehension), purity (no calls → evaluated without
//      generators), multi-line markers for exact traceback lines, per-function local variable lists.
import { PySyntaxError } from './parser.js';
import { PySet, PyTuple, PyExc, bitLen } from './values.js';
import { binop, unary } from './ops.js';

class Scope {
  constructor(kind, node, parent) {
    this.kind = kind;           // 'module' | 'function' | 'comp'
    this.node = node;
    this.parent = parent;
    this.flags = new Map();     // name → bit flags
    this.order = [];            // names in order of first binding (params first)
    this.names = [];            // Name nodes to resolve
    this.children = [];
    this.compLevel = kind === 'comp' ? (parent.kind === 'comp' ? parent.compLevel + 1 : 0) : -1;
    this.func = kind === 'comp' ? parent.func : this;   // nearest function/module scope
    if (parent) parent.children.push(this);
  }
  get(n) { return this.flags.get(n) || 0; }
  add(n, f) {
    const cur = this.flags.get(n) || 0;
    if ((f & (DEF_LOCAL | DEF_PARAM)) && !(cur & (DEF_LOCAL | DEF_PARAM))) this.order.push(n);
    this.flags.set(n, cur | f);
  }
}
const DEF_LOCAL = 1, DEF_PARAM = 2, USE = 4, DEF_GLOBAL = 8, DEF_NONLOCAL = 16;

function err(msg, node) { return new PySyntaxError('SyntaxError', msg, node.line, (node.col || 0) + 1, { endLine: node.endLine ?? node.line, endCol: (node.endCol ?? node.col ?? 0) + 1 }); }

export function analyze(mod) {
  const top = new Scope('module', mod, null);
  mod.scope = top;
  // ------------------------------------------------------------------ pass 1: symtable
  const visitStmts = (stmts, sc) => { for (const s of stmts) visitStmt(s, sc); };
  function bindTarget(t, sc) {
    switch (t.t) {
      case 'Name': sc.add(t.id, DEF_LOCAL); sc.names.push(t); break;
      case 'Tuple': case 'List': for (const e of t.elts) bindTarget(e, sc); break;
      case 'Starred': bindTarget(t.value, sc); break;
      case 'Attribute': visitExpr(t.value, sc); break;
      case 'Subscript': visitExpr(t.value, sc); visitExpr(t.slice, sc); break;
      default: visitExpr(t, sc);
    }
  }
  function bindName(name, sc) { sc.add(name, DEF_LOCAL); }
  function declare(s, sc, kindFlag) {
    for (const name of s.names) {
      const cur = sc.get(name);
      const what = kindFlag === DEF_GLOBAL ? 'global' : 'nonlocal';
      if (cur & (DEF_PARAM | DEF_LOCAL | USE)) {
        let msg;
        if (cur & DEF_PARAM) msg = `name '${name}' is parameter and ${what}`;
        else if (cur & USE) msg = `name '${name}' is used prior to ${what} declaration`;
        else msg = `name '${name}' is assigned to before ${what} declaration`;
        throw err(msg, s);
      }
      // "is nonlocal and global" and "nonlocal declaration not allowed at module level" come later, from the
      // analysis of the scope (CPython's analyze_name), located at the first declaration of the name
      sc.flags.set(name, cur | kindFlag);
    }
  }
  function visitStmt(s, sc) {
    switch (s.t) {
      case 'Expr': visitExpr(s.value, sc); break;
      case 'Assign': visitExpr(s.value, sc); for (const t of s.targets) bindTarget(t, sc); break;
      case 'AugAssign':
        visitExpr(s.value, sc);
        if (s.target.t === 'Name') { sc.add(s.target.id, DEF_LOCAL); sc.names.push(s.target); } else bindTarget(s.target, sc);
        break;
      case 'AnnAssign':
        if (s.value) visitExpr(s.value, sc);
        visitExpr(s.annotation, sc);
        bindTarget(s.target, sc);
        break;
      case 'If': case 'While': visitExpr(s.test, sc); visitStmts(s.body, sc); visitStmts(s.orelse, sc); break;
      case 'For': visitExpr(s.iter, sc); bindTarget(s.target, sc); visitStmts(s.body, sc); visitStmts(s.orelse, sc); break;
      case 'FunctionDef': {
        const p = s.params;
        for (const d of p.defaults) visitExpr(d, sc);
        for (const d of p.kwdefaults) if (d) visitExpr(d, sc);
        const anns = [...p.args, ...p.kwonly, p.vararg, p.kwarg].filter((a) => a && a.annotation);
        for (const a of anns) visitExpr(a.annotation, sc);
        if (s.returns) visitExpr(s.returns, sc);
        bindName(s.name, sc);
        visitFunction(s, sc);
        break;
      }
      case 'Return': if (s.value) visitExpr(s.value, sc); break;
      case 'Delete': for (const t of s.targets) bindTarget(t, sc); break;
      case 'Global': declare(s, sc, DEF_GLOBAL); break;
      case 'Nonlocal': declare(s, sc, DEF_NONLOCAL); break;
      case 'Raise': if (s.exc) visitExpr(s.exc, sc); if (s.cause) visitExpr(s.cause, sc); break;
      case 'Assert': visitExpr(s.test, sc); if (s.msg) visitExpr(s.msg, sc); break;
      case 'Import': for (const a of s.names) bindName(a.asname || a.name.split('.')[0], sc); break;
      case 'ImportFrom': for (const a of s.names) if (a.name !== '*') bindName(a.asname || a.name, sc); break;
      case 'Try':
        visitStmts(s.body, sc);
        for (const h of s.handlers) { if (h.type) visitExpr(h.type, sc); if (h.name) bindName(h.name, sc); visitStmts(h.body, sc); }
        visitStmts(s.orelse, sc);
        if (s.finalbody) visitStmts(s.finalbody, sc);
        break;
      case 'Match':
        visitExpr(s.subject, sc);
        for (const c of s.cases) { visitPattern(c.pattern, sc); if (c.guard) visitExpr(c.guard, sc); visitStmts(c.body, sc); }
        break;
      case 'Pass': case 'Break': case 'Continue': break;
    }
  }
  function visitPattern(p, sc) {
    switch (p.t) {
      case 'MatchValue': visitExpr(p.value, sc); break;
      case 'MatchAs': if (p.pattern) visitPattern(p.pattern, sc); if (p.name) bindName(p.name, sc); break;
      case 'MatchOr': for (const q of p.patterns) visitPattern(q, sc); break;
      case 'MatchSequence': for (const q of p.patterns) visitPattern(q, sc); break;
      case 'MatchStar': if (p.name) bindName(p.name, sc); break;
      case 'MatchMapping': for (const k of p.keys) visitExpr(k, sc); for (const q of p.patterns) visitPattern(q, sc); if (p.rest) bindName(p.rest, sc); break;
      case 'MatchClass': visitExpr(p.cls, sc); for (const q of p.patterns) visitPattern(q, sc); for (const q of p.kwdPatterns) visitPattern(q, sc); break;
    }
  }
  function visitFunction(node, sc) {
    const fs = new Scope('function', node, sc);
    node.scope = fs;
    const p = node.params;
    const all = [...p.args, ...(p.vararg ? [p.vararg] : []), ...p.kwonly, ...(p.kwarg ? [p.kwarg] : [])];
    for (const a of all) {
      if (fs.get(a.name) & DEF_PARAM) throw err(`duplicate argument '${a.name}' in function definition`, a);
      fs.add(a.name, DEF_PARAM);
    }
    if (node.t === 'Lambda') visitExpr(node.body, fs); else visitStmts(node.body, fs);
  }
  function visitComp(n, sc) {
    // first iterable in the enclosing scope
    visitExpr(n.generators[0].iter, sc);
    let cs = sc;
    n.compScopes = [];
    n.generators.forEach((g, i) => {
      cs = new Scope('comp', n, cs);
      n.compScopes.push(cs);
      if (i > 0) visitExpr(g.iter, cs);
      bindTarget(g.target, cs);
      for (const c of g.ifs) visitExpr(c, cs);
    });
    if (n.t === 'DictComp') { visitExpr(n.key, cs); visitExpr(n.value, cs); } else visitExpr(n.elt, cs);
  }
  function visitExpr(e, sc) {
    if (!e) return;
    switch (e.t) {
      case 'Name':
        if (e.ctx === 'load') sc.add(e.id, USE);
        sc.names.push(e);
        break;
      case 'Const': break;
      case 'BinOp': visitExpr(e.left, sc); visitExpr(e.right, sc); break;
      case 'UnaryOp': visitExpr(e.operand, sc); break;
      case 'BoolOp': for (const v of e.values) visitExpr(v, sc); break;
      case 'Compare': visitExpr(e.left, sc); for (const c of e.comparators) visitExpr(c, sc); break;
      case 'IfExp': visitExpr(e.test, sc); visitExpr(e.body, sc); visitExpr(e.orelse, sc); break;
      case 'Call': visitExpr(e.func, sc); for (const a of e.args) visitExpr(a, sc); for (const k of e.keywords) visitExpr(k.value, sc); break;
      case 'Attribute': visitExpr(e.value, sc); break;
      case 'Subscript': visitExpr(e.value, sc); visitExpr(e.slice, sc); break;
      case 'Slice': visitExpr(e.lower, sc); visitExpr(e.upper, sc); visitExpr(e.step, sc); break;
      case 'List': case 'Tuple': case 'Set': for (const x of e.elts) visitExpr(x, sc); break;
      case 'Dict': for (let i = 0; i < e.keys.length; i++) { if (e.keys[i]) visitExpr(e.keys[i], sc); visitExpr(e.values[i], sc); } break;
      case 'JoinedStr': for (const v of e.values) if (typeof v !== 'string') visitExpr(v, sc); break;
      case 'FormattedValue': visitExpr(e.value, sc); if (e.spec) visitExpr(e.spec, sc); break;
      case 'Starred': visitExpr(e.value, sc); break;
      case 'NamedExpr': {
        visitExpr(e.value, sc);
        // binds in the nearest function/module scope (PEP 572)
        let ts = sc; while (ts.kind === 'comp') ts = ts.parent;
        ts.add(e.target.id, DEF_LOCAL);
        e.target.bindScope = ts;
        sc.names.push(e.target);
        break;
      }
      case 'Lambda': {
        for (const d of e.params.defaults) visitExpr(d, sc);
        for (const d of e.params.kwdefaults) if (d) visitExpr(d, sc);
        visitFunction(e, sc);
        break;
      }
      case 'ListComp': case 'SetComp': case 'DictComp': case 'GenExp': visitComp(e, sc); break;
      case 'Yield': case 'YieldFrom':
        if (sc.kind === 'comp') throw err(`'yield' inside ${{ ListComp: 'list comprehension', SetComp: 'set comprehension', DictComp: 'dict comprehension', GenExp: 'generator expression' }[sc.node.t]}`, e);
        visitExpr(e.value, sc);
        break;
    }
  }
  visitStmts(mod.body, top);

  // nonlocal bindings must exist in an enclosing function
  (function checkNonlocal(sc) {
    for (const [name, f] of sc.flags) {
      if ((f & DEF_GLOBAL) && (f & DEF_NONLOCAL)) throw err(`name '${name}' is nonlocal and global`, findDirective(sc.node, name));
      if ((f & DEF_NONLOCAL) && sc.kind === 'module') throw err('nonlocal declaration not allowed at module level', findDirective(sc.node, name));
      if (f & DEF_NONLOCAL) {
        let p = sc.parent; let ok = false;
        while (p) { if (p.kind === 'function' && (p.get(name) & (DEF_LOCAL | DEF_PARAM)) && !(p.get(name) & DEF_GLOBAL)) { ok = true; break; } p = p.parent; }
        if (!ok) { const decl = findDecl(sc.node, name); throw err(`no binding for nonlocal '${name}' found`, decl || sc.node); }
      }
    }
    for (const c of sc.children) checkNonlocal(c);
  })(top);

  // ------------------------------------------------------------------ pass 2: codegen errors (source order)
  let cgCtx = null;
  function cg(stmts, ctx) { for (const s of stmts) { cgCtx = ctx; cgStmt(s, ctx); } }
  function cgStmt(s, ctx) {
    switch (s.t) {
      case 'Return': if (!ctx.inFunc) throw err("'return' outside function", s); if (s.value) cgExpr(s.value); break;
      case 'Break': if (!ctx.inLoop) throw err("'break' outside loop", s); break;
      case 'Continue': if (!ctx.inLoop) throw err("'continue' not properly in loop", s); break;
      case 'Expr':
        if (s.value.t === 'Starred') throw err("can't use starred expression here", s.value);
        cgExpr(s.value); break;
      case 'Assign':
        for (const t of s.targets) checkStarTarget(t);
        cgExpr(s.value); for (const t of s.targets) cgExpr(t); break;
      case 'AugAssign': cgExpr(s.target); cgExpr(s.value); break;
      case 'AnnAssign': cgExpr(s.target); cgExpr(s.annotation); if (s.value) cgExpr(s.value); break;
      case 'If': cgExpr(s.test); cg(s.body, ctx); cg(s.orelse, ctx); break;
      case 'While': cgExpr(s.test); cg(s.body, { ...ctx, inLoop: true }); cg(s.orelse, ctx); break;
      case 'For': checkStarTarget(s.target); cgExpr(s.iter); cg(s.body, { ...ctx, inLoop: true }); cg(s.orelse, ctx); break;
      case 'FunctionDef':
        for (const d of s.params.defaults) cgExpr(d);
        cg(s.body, { inFunc: true, inLoop: false }); break;
      case 'Delete': for (const t of s.targets) cgExpr(t); break;
      case 'Raise': if (s.exc) cgExpr(s.exc); if (s.cause) cgExpr(s.cause); break;
      case 'Assert': cgExpr(s.test); if (s.msg) cgExpr(s.msg); break;
      case 'Try':
        cg(s.body, ctx);
        s.handlers.forEach((h, i) => {
          if (!h.type && i !== s.handlers.length - 1) throw err("default 'except:' must be last", h);
          if (h.type) cgExpr(h.type);
          cg(h.body, ctx);
        });
        cg(s.orelse, ctx); if (s.finalbody) cg(s.finalbody, ctx); break;
      case 'Match':
        cgExpr(s.subject);
        s.cases.forEach((c, i) => {
          checkPattern(c.pattern, new Set());
          if (i < s.cases.length - 1 && !c.guard) {
            const irr = irrefutable(c.pattern);
            if (irr) throw err(irr === '_' ? 'wildcard makes remaining patterns unreachable' : `name capture '${irr}' makes remaining patterns unreachable`, c.pattern);
          }
          if (c.guard) cgExpr(c.guard);
          cg(c.body, ctx);
        });
        break;
    }
  }
  function checkStarTarget(t) {
    if (t.t === 'Starred') throw err('starred assignment target must be in a list or tuple', t);
    if (t.t === 'Tuple' || t.t === 'List') {
      let n = 0;
      for (const e of t.elts) { if (e.t === 'Starred') n++; }
      if (n > 1) throw err('multiple starred expressions in assignment', t);
      for (const e of t.elts) { if (e.t === 'Tuple' || e.t === 'List') checkStarTarget(e); else if (e.t === 'Starred' && (e.value.t === 'Tuple' || e.value.t === 'List')) checkStarTarget(e.value); }
    }
  }
  function cgExpr(e) {
    if (!e || typeof e !== 'object') return;
    switch (e.t) {
      case 'Call': {
        cgExpr(e.func);
        for (const a of e.args) cgExpr(a);
        const seen = new Set();
        for (const k of e.keywords) {
          if (k.arg !== null) {
            if (seen.has(k.arg)) throw err(`keyword argument repeated: ${k.arg}`, k);
            seen.add(k.arg);
          }
          cgExpr(k.value);
        }
        return;
      }
      case 'Lambda': { const saved = cgCtx; cgCtx = { inFunc: true, inLoop: false }; cgExpr(e.body); cgCtx = saved; return; }
      case 'Yield': case 'YieldFrom':
        if (!cgCtx || !cgCtx.inFunc) throw err(e.t === 'Yield' ? "'yield' outside function" : "'yield from' outside function", e);
        throw err("minipy does not support 'yield' (generators) yet", e);
      case 'Starred':
        cgExpr(e.value); return;
    }
    for (const key in e) {
      if (key === 'scope' || key === 'compScopes' || key === 'bindScope') continue;
      const v = e[key];
      if (Array.isArray(v)) { for (const x of v) if (x && typeof x === 'object' && x.t) cgExpr(x); else if (x && typeof x === 'object' && x.target) { cgExpr(x.iter); for (const c of x.ifs) cgExpr(c); } } else if (v && typeof v === 'object' && v.t) cgExpr(v);
    }
  }
  function checkPattern(p, names) {
    const bind = (n, node) => { if (names.has(n)) throw err(`multiple assignments to name '${n}' in pattern`, node); names.add(n); };
    switch (p.t) {
      case 'MatchAs': if (p.pattern) checkPattern(p.pattern, names); if (p.name) bind(p.name, p); break;
      case 'MatchStar': if (p.name) bind(p.name, p); break;
      case 'MatchSequence': {
        let stars = 0;
        for (const q of p.patterns) { if (q.t === 'MatchStar') stars++; checkPattern(q, names); }
        if (stars > 1) throw err('multiple starred names in sequence pattern', p);
        break;
      }
      case 'MatchMapping': for (const q of p.patterns) checkPattern(q, names); if (p.rest) bind(p.rest, p); break;
      case 'MatchClass': for (const q of p.patterns) checkPattern(q, names); for (const q of p.kwdPatterns) checkPattern(q, names); break;
      case 'MatchOr': {
        let first = null;
        p.patterns.forEach((q, i) => {
          const s = new Set();
          checkPattern(q, s);
          if (i < p.patterns.length - 1) {
            const irr = irrefutable(q);
            if (irr) throw err(irr === '_' ? 'wildcard makes remaining patterns unreachable' : `name capture '${irr}' makes remaining patterns unreachable`, q);
          }
          if (first === null) first = s;
          else if (s.size !== first.size || [...s].some((x) => !first.has(x))) throw err('alternative patterns bind different names', p);
        });
        for (const n of first) bind(n, p);
        break;
      }
    }
  }
  function irrefutable(p) {
    if (p.t === 'MatchAs') { if (!p.pattern) return p.name || '_'; return irrefutable(p.pattern); }
    if (p.t === 'MatchOr') { for (const q of p.patterns) { const r = irrefutable(q); if (r) return r; } }
    return null;
  }
  cg(mod.body, { inFunc: false, inLoop: false });

  // ------------------------------------------------------------------ pass 3: resolve names
  (function resolve(sc) {
    for (const n of sc.names) resolveName(n, sc);
    // free variables of a function (part of f_locals in CPython, so NameError suggestions offer them)
    if (sc.kind !== 'module') {
      const fnode = sc.func.node;
      const free = fnode.freeNames || (fnode.freeNames = []);
      for (const n of sc.names) if (n.kind === 'F' && sc.kind === 'function' && !free.some((x) => x.id === n.id)) free.push({ id: n.id, depth: n.depth });
    }
    if (sc.kind === 'function') {
      const fn = sc.node;
      const locals = [];
      for (const name of sc.order) {
        const f = sc.get(name);
        if (!(f & (DEF_GLOBAL | DEF_NONLOCAL))) locals.push(name);
      }
      fn.localNames = locals;
      fn.localSet = new Set(locals);
    }
    for (const c of sc.children) resolve(c);
  })(top);

  function resolveName(n, sc) {
    const name = n.id;
    let s = n.bindScope || sc;
    // comprehension scopes first
    while (s.kind === 'comp') {
      if (s.get(name) & DEF_LOCAL) { n.kind = 'C'; n.level = s.compLevel; return; }
      s = s.parent;
    }
    if (s.kind === 'module') { n.kind = 'G'; return; }
    const f = s.get(name);
    if (f & DEF_GLOBAL) { n.kind = 'G'; return; }
    if (f & DEF_NONLOCAL || !(f & (DEF_LOCAL | DEF_PARAM))) {
      // free or implicit global: search enclosing function scopes
      let depth = 0;
      let p = s.parent;
      let inCompOfParent = null;
      while (p) {
        if (p.kind === 'comp') { if (p.get(name) & DEF_LOCAL) { inCompOfParent = p; break; } p = p.parent; continue; }
        depth++;
        if (p.kind === 'module') break;
        const pf = p.get(name);
        if (pf & DEF_GLOBAL) break;
        if (pf & (DEF_LOCAL | DEF_PARAM)) { n.kind = 'F'; n.depth = depth; return; }
        p = p.parent;
      }
      if (inCompOfParent && depth === 0) { n.kind = 'CF'; n.level = inCompOfParent.compLevel; return; }
      n.kind = 'G';
      return;
    }
    n.kind = 'L';
  }

  // ------------------------------------------------------------------ pass 4: purity + multi-line markers + sync statements
  annotateStmts(mod.body);
  assignConstSets(mod);
  // ------------------------------------------------------------------ pass 5: CPython's order of a frame's locals
  (function orders(sc) {
    if (sc.kind === 'function') localsOrder(sc.node);
    for (const c of sc.children) orders(c);
  })(top);
  return mod;
}

/**
 * The order in which CPython 3.13 lists a function frame's locals (frame.f_locals / locals()): co_varnames
 * (parameters as declared: positional, keyword-only, *args, **kwargs; then the other plain locals in the order the
 * compiler first emits them), then cell variables (locals used by nested functions or generator expressions) sorted by
 * name, then free variables (from enclosing functions, also when only passed through to a nested function) sorted
 * by name. Sets def.varOrder (names), def.freeVarList ([{ id, depth }]).
 */
function localsOrder(fn) {
  const p = fn.params;
  const params = [...p.args, ...p.kwonly, ...(p.vararg ? [p.vararg] : []), ...(p.kwarg ? [p.kwarg] : [])].map((a) => a.name);
  const paramSet = new Set(params);
  const seen = new Set(params);
  const plain = [];
  const cells = new Set(), frees = new Map();
  const local = fn.localSet || new Set();
  const rec = (name) => { if (local.has(name) && !seen.has(name)) { seen.add(name); plain.push(name); } };
  // k: function boundaries between fn and the node; gen: inside the body of a generator expression of fn
  function name(n, k, gen) {
    if (n.kind === 'L') { if (k === 0) { if (gen) cells.add(n.id); else rec(n.id); } return; }
    if (n.kind === 'F') {
      if (n.depth === k && k > 0) cells.add(n.id);
      else if (n.depth > k && !frees.has(n.id)) frees.set(n.id, n.depth - k);
    }
  }
  function E(e, k, gen) {
    if (!e || typeof e !== 'object') return;
    switch (e.t) {
      case 'Name': name(e, k, gen); return;
      case 'Const': return;
      case 'NamedExpr': E(e.value, k, gen); name(e.target, k, gen); return;
      case 'Lambda':
        for (const d of e.params.defaults) E(d, k, gen);
        for (const d of e.params.kwdefaults) if (d) E(d, k, gen);
        E(e.body, k + 1, false);
        return;
      case 'ListComp': case 'SetComp': case 'DictComp': case 'GenExp': {
        const g = e.t === 'GenExp';
        e.generators.forEach((c, i) => { E(c.iter, k, i === 0 ? gen : gen || g); E(c.target, k, gen || g); for (const x of c.ifs) E(x, k, gen || g); });
        if (e.t === 'DictComp') { E(e.key, k, gen || g); E(e.value, k, gen || g); } else E(e.elt, k, gen || g);
        return;
      }
      case 'Dict': for (let i = 0; i < e.keys.length; i++) { E(e.keys[i], k, gen); E(e.values[i], k, gen); } return;
      case 'JoinedStr': for (const v of e.values) if (typeof v !== 'string') E(v, k, gen); return;
      case 'FormattedValue': E(e.value, k, gen); if (e.spec) E(e.spec, k, gen); return;
      case 'Call': E(e.func, k, gen); for (const a of e.args) E(a, k, gen); for (const kw of e.keywords) E(kw.value, k, gen); return;
    }
    for (const key in e) {
      if (key === 'scope' || key === 'compScopes' || key === 'bindScope' || key === 'loc' || key === '_loc' || key === 'constSet' || key === 'constIter') continue;
      const v = e[key];
      if (Array.isArray(v)) { for (const x of v) if (x && typeof x === 'object') E(x, k, gen); } else if (v && typeof v === 'object' && v.t) E(v, k, gen);
    }
  }
  function P(pt, k, caps) {
    if (!pt) return;
    switch (pt.t) {
      case 'MatchValue': E(pt.value, k, false); return;
      case 'MatchAs': P(pt.pattern, k, caps); if (pt.name) caps.push(pt.name); return;
      case 'MatchStar': if (pt.name) caps.push(pt.name); return;
      case 'MatchOr': for (const q of pt.patterns) P(q, k, caps); return;
      case 'MatchSequence': for (const q of pt.patterns) P(q, k, caps); return;
      case 'MatchMapping': for (const x of pt.keys) E(x, k, false); for (const q of pt.patterns) P(q, k, caps); if (pt.rest) caps.push(pt.rest); return;
      case 'MatchClass': E(pt.cls, k, false); for (const q of pt.patterns) P(q, k, caps); for (const q of pt.kwdPatterns) P(q, k, caps); return;
    }
  }
  function S(stmts, k) {
    for (const st of stmts || []) {
      const here = (nm) => { if (k === 0) rec(nm); };
      switch (st.t) {
        case 'Assign': E(st.value, k, false); for (const t of st.targets) E(t, k, false); break;
        case 'AugAssign': E(st.target, k, false); E(st.value, k, false); break;
        case 'AnnAssign': if (st.value) { E(st.value, k, false); E(st.target, k, false); } break;
        case 'For': E(st.iter, k, false); E(st.target, k, false); S(st.body, k); S(st.orelse, k); break;
        case 'While': case 'If': E(st.test, k, false); S(st.body, k); S(st.orelse, k); break;
        case 'FunctionDef': {
          const q = st.params;
          for (const d of q.defaults) E(d, k, false);
          for (const d of q.kwdefaults) if (d) E(d, k, false);
          for (const a of [...q.args, ...q.kwonly, q.vararg, q.kwarg]) if (a && a.annotation) E(a.annotation, k, false);
          if (st.returns) E(st.returns, k, false);
          here(st.name);
          S(st.body, k + 1);
          break;
        }
        case 'Try':
          S(st.body, k); S(st.orelse, k);
          for (const h of st.handlers) { if (h.type) E(h.type, k, false); if (h.name) here(h.name); S(h.body, k); }
          if (st.finalbody) S(st.finalbody, k);
          break;
        case 'Match':
          E(st.subject, k, false);
          for (const c of st.cases) { const caps = []; P(c.pattern, k, caps); for (const nm of caps) here(nm); if (c.guard) E(c.guard, k, false); S(c.body, k); }
          break;
        case 'Import': for (const a of st.names) here(a.asname || a.name.split('.')[0]); break;
        case 'ImportFrom': for (const a of st.names) if (a.name !== '*') here(a.asname || a.name); break;
        case 'Global': case 'Nonlocal': case 'Pass': case 'Break': case 'Continue': break;
        default: E(st, k, false);
      }
    }
  }
  if (fn.t === 'Lambda') E(fn.body, 0, false); else S(fn.body, 0);
  const cellList = [...cells].filter((c) => local.has(c) && !paramSet.has(c)).sort();
  const cellSet = new Set(cellList);
  fn.varOrder = [...params, ...plain.filter((x) => !cellSet.has(x)), ...cellList];
  fn.freeVarList = [...frees.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)).map(([id, depth]) => ({ id, depth }));
}

/** the first global / nonlocal statement of a scope naming `name` (CPython's error_at_directive) */
function findDirective(node, name) {
  let found = null;
  (function walk(stmts) {
    for (const s of stmts || []) {
      if (found) return;
      if ((s.t === 'Nonlocal' || s.t === 'Global') && s.names.includes(name)) { found = s; return; }
      if (s.t === 'FunctionDef') continue;
      for (const k of ['body', 'orelse', 'finalbody']) if (Array.isArray(s[k])) walk(s[k]);
      if (s.handlers) for (const h of s.handlers) walk(h.body);
      if (s.cases) for (const c of s.cases) walk(c.body);
    }
  })(node.body);
  return found || node;
}
function findDecl(node, name) {
  let found = null;
  (function walk(stmts) {
    for (const s of stmts || []) {
      if (found) return;
      if (s.t === 'Nonlocal' && s.names.includes(name)) { found = s; return; }
      if (s.t === 'If' || s.t === 'While' || s.t === 'For') { walk(s.body); walk(s.orelse); }
      if (s.t === 'Try') { walk(s.body); for (const h of s.handlers) walk(h.body); walk(s.orelse); walk(s.finalbody); }
    }
  })(node.body);
  return found;
}

// ---------------------------------------------------------------------------------------------- annotation
const SIMPLE = new Set(['Expr', 'Assign', 'AugAssign', 'AnnAssign', 'Pass', 'Delete', 'Global', 'Nonlocal', 'Return', 'Break', 'Continue', 'Raise', 'Assert', 'Import', 'ImportFrom']);

function annotateStmts(stmts) { for (const s of stmts) annotateStmt(s); }
function annotateStmt(s) {
  const line = s.line;
  // In a statement that spans several lines every node gets a traceback location of its own (CPython reports the
  // failing instruction's lines); in a one-line statement only nodes on other lines (none) need one.
  const multi = SIMPLE.has(s.t) && (s.endLine ?? line) > line;
  const ex = (e) => annotateExpr(e, line, multi || (e && (e.endLine ?? e.line) > e.line));
  let pure = true;
  const P = (e) => { if (e) { ex(e); if (!e.pure) pure = false; } };
  switch (s.t) {
    case 'Expr': P(s.value); break;
    case 'Assign': P(s.value); for (const t of s.targets) P(t); break;
    case 'AugAssign': P(s.target); P(s.value); break;
    case 'AnnAssign': P(s.target); P(s.annotation); P(s.value); break;
    case 'Return': P(s.value); break;
    case 'Delete': for (const t of s.targets) P(t); break;
    case 'Raise': P(s.exc); P(s.cause); break;
    case 'Assert': P(s.test); P(s.msg); break;
    case 'If': ex(s.test); annotateStmts(s.body); annotateStmts(s.orelse); break;
    case 'While': ex(s.test); annotateStmts(s.body); annotateStmts(s.orelse); break;
    case 'For': ex(s.iter); ex(s.target); annotateStmts(s.body); annotateStmts(s.orelse); break;
    case 'FunctionDef': {
      for (const d of s.params.defaults) ex(d);
      for (const d of s.params.kwdefaults) if (d) ex(d);
      for (const a of [...s.params.args, ...s.params.kwonly, s.params.vararg, s.params.kwarg]) if (a && a.annotation) ex(a.annotation);
      if (s.returns) ex(s.returns);
      annotateStmts(s.body);
      break;
    }
    case 'Try':
      annotateStmts(s.body);
      for (const h of s.handlers) { if (h.type) ex(h.type); annotateStmts(h.body); }
      annotateStmts(s.orelse); if (s.finalbody) annotateStmts(s.finalbody);
      break;
    case 'Match':
      ex(s.subject);
      for (const c of s.cases) { annotatePattern(c.pattern, c.line); if (c.guard) annotateExpr(c.guard, c.line, (c.guard.endLine ?? c.guard.line) > c.guard.line); annotateStmts(c.body); }
      break;
  }
  if (SIMPLE.has(s.t)) s.sync = pure;
  // fallback traceback location of the statement: a simple statement spans all its lines, a compound one its header line
  s.loc = { line, endLine: multi ? s.endLine : line };
}
function annotatePattern(p, line) {
  if (!p) return;
  if (p.t === 'MatchValue') annotateExpr(p.value, line);
  for (const k of ['pattern']) if (p[k]) annotatePattern(p[k], line);
  for (const k of ['patterns', 'kwdPatterns']) if (p[k]) for (const q of p[k]) annotatePattern(q, line);
  if (p.keys) for (const k of p.keys) annotateExpr(k, line);
  if (p.cls) annotateExpr(p.cls, line);
}

/**
 * sets e.pure (no calls inside) and e.ml (the node needs its own traceback location: it starts on another line than
 * its statement, or the statement spans several lines — `force`)
 */
/** eval(): every node of the expression gets its own traceback location (lines of the evaluated string) */
export function annotateEvalExpr(e) { annotateExpr(e, e.line, true); }
function annotateExpr(e, line, force) {
  if (!e || typeof e !== 'object') return true;
  let pure = true;
  const A = (x) => { if (x && typeof x === 'object') { if (!annotateExpr(x, line, force)) pure = false; } };
  switch (e.t) {
    case 'Name': case 'Const': break;
    case 'Call': A(e.func); for (const a of e.args) A(a); for (const k of e.keywords) A(k.value); pure = false; break;
    case 'BinOp': A(e.left); A(e.right); break;
    case 'UnaryOp': A(e.operand); break;
    case 'BoolOp': for (const v of e.values) A(v); break;
    case 'Compare': A(e.left); for (const c of e.comparators) A(c); break;
    case 'IfExp': A(e.test); A(e.body); A(e.orelse); break;
    case 'Attribute': A(e.value); break;
    case 'Subscript': A(e.value); A(e.slice); break;
    case 'Slice': A(e.lower); A(e.upper); A(e.step); break;
    case 'List': case 'Tuple': case 'Set': for (const x of e.elts) A(x); break;
    case 'Dict': for (let i = 0; i < e.keys.length; i++) { A(e.keys[i]); A(e.values[i]); } break;
    case 'JoinedStr': for (const v of e.values) A(v); break;
    case 'FormattedValue': A(e.value); A(e.spec); break;
    case 'Starred': A(e.value); break;
    case 'NamedExpr': A(e.value); break;
    case 'Lambda': {
      for (const d of e.params.defaults) A(d);
      for (const d of e.params.kwdefaults) A(d);
      annotateExpr(e.body, e.body.line, (e.body.endLine ?? e.body.line) > e.body.line);
      break;
    }
    case 'ListComp': case 'SetComp': case 'DictComp': case 'GenExp': {
      for (const g of e.generators) { A(g.iter); A(g.target); for (const c of g.ifs) A(c); }
      if (e.t === 'DictComp') { A(e.key); A(e.value); } else A(e.elt);
      if (e.t === 'GenExp') pure = e.generators[0].iter.pure !== false;
      break;
    }
  }
  e.pure = pure;
  if (force || e.line !== line) e.ml = true;
  return pure;
}
// ---------------------------------------------------------------------------------------------- frozenset constants
// CPython turns a set display of constants into a frozenset constant: always for `x in {...}` and `for x in {...}`
// (the AST optimizer's fold_iter), and for 3+ elements otherwise (starunpack_helper: BUILD_SET + SET_UPDATE of the
// constant). When codegen adds the constant, merge_consts_recursive rebuilds it from its own iteration order and
// caches it per module: a later equal set display reuses the first one. Iteration order depends on all of this.
function constValue(n) { return foldConst(n); }
// ---------------------------------------------------------------------------------------------- constant folding
// CPython 3.13's AST optimizer (Python/ast_opt.c) folds unary / binary operations on constants and tuples of
// constants, with size limits (safe_multiply, safe_power, safe_lshift); str % x is never folded.
const NOFOLD = Symbol('nofold');
const MAX_INT_SIZE = 128, MAX_COLLECTION_SIZE = 256, MAX_STR_SIZE = 4096;
const isLong = (v) => typeof v === 'bigint' || typeof v === 'boolean';
const big = (v) => (typeof v === 'boolean' ? (v ? 1n : 0n) : v);
function foldSafe(op, a, b) {
  if (op === '*') {
    if (isLong(a) && isLong(b)) { if (big(a) !== 0n && big(b) !== 0n && bitLen(big(a)) + bitLen(big(b)) > MAX_INT_SIZE) return false; }
    else if (isLong(a) || isLong(b)) {
      const n = big(isLong(a) ? a : b), w = isLong(a) ? b : a;
      if (w instanceof PyTuple && w.items.length && (n < 0n || n > BigInt(Math.floor(MAX_COLLECTION_SIZE / w.items.length)))) return false;
      if (typeof w === 'string' && w.length && (n < 0n || n > BigInt(Math.floor(MAX_STR_SIZE / Array.from(w).length)))) return false;
    }
  } else if (op === '**') {
    if (isLong(a) && isLong(b) && big(a) !== 0n && big(b) > 0n) {
      const wb = big(b);
      if (wb > 0xFFFFFFFFFFFFFFFFn) return false;
      if (BigInt(bitLen(big(a))) > BigInt(MAX_INT_SIZE) / wb) return false;
    }
  } else if (op === '<<') {
    if (isLong(a) && isLong(b) && big(a) !== 0n && big(b) !== 0n) {
      const wb = big(b);
      if (wb < 0n || wb > BigInt(MAX_INT_SIZE) || BigInt(bitLen(big(a))) > BigInt(MAX_INT_SIZE) - wb) return false;
    }
  } else if (op === '%' && typeof a === 'string') return false;
  else if (op === '@') return false;
  return true;
}
export function foldConst(n) {
  if (!n) return NOFOLD;
  switch (n.t) {
    case 'Const': return n.ellipsis ? NOFOLD : n.value;
    case 'UnaryOp': {
      const v = foldConst(n.operand);
      if (v === NOFOLD || (typeof v !== 'bigint' && typeof v !== 'number' && typeof v !== 'boolean' && n.op !== 'not')) return NOFOLD;
      try { return unary(n.op, v); } catch (e) { if (e instanceof PyExc) return NOFOLD; throw e; }
    }
    case 'BinOp': {
      const a = foldConst(n.left);
      if (a === NOFOLD) return NOFOLD;
      const b = foldConst(n.right);
      if (b === NOFOLD || !foldSafe(n.op, a, b)) return NOFOLD;
      try { return binop(n.op, a, b); } catch (e) { if (e instanceof PyExc) return NOFOLD; throw e; }
    }
    case 'Tuple': {
      const out = [];
      for (const x of n.elts) { if (x.t === 'Starred') return NOFOLD; const v = foldConst(x); if (v === NOFOLD) return NOFOLD; out.push(v); }
      return new PyTuple(out);
    }
  }
  return NOFOLD;
}
function constKey(v) {
  // _PyCode_ConstantKey: ints and strs are their own key, bool / float carry their type, tuples are ordered
  switch (typeof v) {
    case 'bigint': return 'i' + v;
    case 'boolean': return 'b' + v;
    case 'number': return 'f' + (Object.is(v, -0) ? '-0' : String(v));
    case 'string': return 's' + JSON.stringify(v);
  }
  if (v === null) return 'N';
  return 't(' + v.items.map(constKey).join(',') + ')';
}
function assignConstSets(mod) {
  const cache = new Map();
  const frozen = (n) => {
    const s1 = new PySet(true);
    const vals = n.elts.map(constValue);
    for (const v of vals) s1.add(v);
    const key = vals.map(constKey).sort().filter((k, i, a) => i === 0 || a[i - 1] !== k).join('|');
    let s2 = cache.get(key);
    if (!s2) { s2 = new PySet(true); for (const v of s1.keys()) s2.add(v); cache.set(key, s2); }
    return s2;
  };
  const allConst = (n) => n.t === 'Set' && n.elts.every(isConstNode);
  const iterPos = (n) => { if (n && allConst(n)) { n.constIter = frozen(n); return true; } return false; };
  const E = (n) => {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) { for (const x of n) E(x); return; }
    switch (n.t) {
      case 'Set':
        if (n.elts.length > 2 && allConst(n)) { n.constSet = frozen(n); return; }
        E(n.elts); return;
      case 'Compare':
        E(n.left);
        n.comparators.forEach((c, i) => { if (!(i === n.comparators.length - 1 && (n.ops[i] === 'in' || n.ops[i] === 'not in') && iterPos(c))) E(c); });
        return;
      case 'ListComp': case 'SetComp': case 'DictComp': case 'GenExp':
        n.generators.forEach((g) => { if (!iterPos(g.iter)) E(g.iter); E(g.target); E(g.ifs); });
        if (n.t === 'DictComp') { E(n.key); E(n.value); } else E(n.elt);
        return;
      case 'Lambda': E(n.params.defaults); E(n.params.kwdefaults); E(n.body); return;
      case 'Dict': for (let i = 0; i < n.keys.length; i++) { E(n.keys[i]); E(n.values[i]); } return;
      case 'NamedExpr': E(n.value); return;
    }
    for (const k in n) {
      if (k === 'scope' || k === 'compScopes' || k === 'bindScope' || k === 'loc' || k === '_loc' || k === 'constSet' || k === 'constIter') continue;
      const v = n[k];
      if (v && typeof v === 'object') E(v);
    }
  };
  const S = (st) => {
    for (const s of st) {
      switch (s.t) {
        case 'Assign': E(s.value); E(s.targets); break;
        case 'AnnAssign': E(s.value); E(s.annotation); E(s.target); break;
        case 'For': if (!iterPos(s.iter)) E(s.iter); E(s.target); S(s.body); S(s.orelse); break;
        case 'While': case 'If': E(s.test); S(s.body); S(s.orelse); break;
        case 'FunctionDef': {
          const p = s.params;
          E(p.defaults); E(p.kwdefaults);
          for (const a of [...p.args, ...p.kwonly, p.vararg, p.kwarg]) if (a && a.annotation) E(a.annotation);
          if (s.returns) E(s.returns);
          S(s.body);
          break;
        }
        case 'Try':
          S(s.body); S(s.orelse);
          for (const h of s.handlers) { E(h.type); S(h.body); }
          if (s.finalbody) S(s.finalbody);
          break;
        case 'Match':
          E(s.subject);
          for (const c of s.cases) { E(c.pattern); E(c.guard); S(c.body); }
          break;
        default: E(s);
      }
    }
  };
  S(mod.body);
}
function isConstNode(n) {
  if (n.t === 'Const') return !n.ellipsis;
  if (n.t !== 'UnaryOp' && n.t !== 'BinOp' && n.t !== 'Tuple') return false;
  const v = foldConst(n);
  // the value of a set element must be hashable (a folded tuple of constants always is)
  return v !== NOFOLD;
}
