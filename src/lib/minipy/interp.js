// minipy — the interpreter: a step machine built on JS generators.
//   * Statements and expressions that contain calls run as generators and yield events
//     ({kind:'line'|'call'|'return'|'output'|'input'}); call-free ("pure") expressions run synchronously.
//   * Builtins that call back into Python (sorted(key=f), map, ...) drive the callee synchronously (callSync):
//     its output still reaches the console, but no step boundaries happen inside it.
//   * Frames keep their locals in Maps (insertion order = order of first assignment) for snapshots.
import {
  T, EXC, STOP, PyExc, pyErr, typeName, typeOf, truthy, compare, repr, str, isinstance, withFreshNaN,
  PyList, PyTuple, PyDict, PySet, PySlice, PyFunction, PyBuiltin, PyType, PyModule, PyIter, PyHost, PyBoundMethod, PyGenericAlias,
  PyNsDict, ordOf,
} from './values.js';
import { binop, unary, inplace, getitem, setitem, delitem, getIter, toArray, unpack } from './ops.js';
import { formatValue } from './numfmt.js';
import { makeBuiltins, getAttribute, setAttribute, delAttribute, callType, strftime, METHODS, cleanDoc, unexpectedKw, dictFromArgs } from './builtins.js';
import { parseExpressionSource } from './parser.js';
import { analyze, annotateEvalExpr } from './compiler.js';
import { importModule, hostGetAttr, hostSetAttr, hostModuleGetAttr, hostModuleSetAttr, toHost, fromHost, seedRandom, hostDunderCall, hostAttrNames, hostTypeGetAttr } from './modules.js';
import { suggestName } from './suggest.js';
import { BUILTINS_ORDER, STDLIB_MODULE_NAMES } from './pydata.js';
import { MersenneTwister } from './random_mt.js';
const RANDOM_METHODS = new Set(['seed', 'random', 'uniform', 'randint', 'randrange', 'choice', 'choices', 'shuffle', 'sample', 'gauss', 'normalvariate', 'triangular', 'betavariate', 'expovariate', 'lognormvariate', 'vonmisesvariate', 'gammavariate', 'paretovariate', 'weibullvariate', 'getrandbits', 'getstate', 'setstate', 'randbytes', 'binomialvariate']);

export const RET = 1, BRK = 2, CNT = 3;

/** thrown (not a Python exception, cannot be caught by try/except) when maxSteps is exceeded */
export class StepLimitError {
  constructor(n, hidden, locale) {
    this.steps = n;
    this.hidden = !!hidden;
    this.message = stepLimitMessage(n, hidden, locale);
  }
}
/**
 * The simulator's own message for the step limit: not a Python exception (python3 has no step limit), so it is
 * worded as the simulator speaking. English keeps the phrases "N steps" / "N iterations inside one step".
 */
export function stepLimitMessage(n, hidden, locale) {
  const id = typeof locale === 'string' && locale.toLowerCase().startsWith('id');
  if (id) {
    return hidden
      ? `simulator menghentikan program setelah ${n} iterasi di dalam satu langkah (batas simulator, bukan galat Python; python3 tidak punya batas ini): perulangan yang tidak pernah berhenti, atau yang terlalu panjang untuk simulator`
      : `simulator menghentikan program setelah ${n} langkah (batas langkah simulator, bukan galat Python; python3 tidak punya batas ini): perulangan yang tidak pernah berhenti, atau program yang lebih panjang dari batasnya`;
  }
  return hidden
    ? `the simulator stopped the program after ${n} iterations inside one step (the simulator's limit, not a Python error; python3 has no such limit): a loop that never ends, or one too long for the simulator`
    : `the simulator stopped the program after ${n} step${n === 1 ? '' : 's'} (the simulator's step limit, not a Python error; python3 has no such limit): a loop that never ends, or a program longer than the limit`;
}

/**
 * Trampoline for the generator-based interpreter: generators yield either an event (plain object) or a
 * sub-generator to run; the driver keeps an explicit stack so the JS call stack stays shallow.
 */
export class Driver {
  constructor(gen) { this.stack = [gen]; }
  /** resume with a value (or throw err into the top generator); returns { event } or { done: true, value } */
  resume(value, err) {
    const stack = this.stack;
    let hasErr = err !== undefined;
    for (;;) {
      const top = stack[stack.length - 1];
      let r;
      try {
        r = hasErr ? top.throw(err) : top.next(value);
      } catch (e) {
        stack.pop();
        if (!stack.length) throw e;
        err = e; hasErr = true; value = undefined;
        continue;
      }
      hasErr = false; err = undefined;
      if (r.done) {
        stack.pop();
        if (!stack.length) return { done: true, value: r.value };
        value = r.value;
        continue;
      }
      const y = r.value;
      if (y !== null && typeof y === 'object' && typeof y.next === 'function') { stack.push(y); value = undefined; continue; }
      return { event: y };
    }
  }
}

export class Frame {
  constructor(name, func, locals, globals) {
    this.name = name;
    this.func = func;          // PyFunction or null (module)
    this.locals = locals;      // Map
    this.globals = globals;    // Map
    this.line = 0;
    this.stmtLine = undefined; // start line of the statement run last (the 'return' event's line)
    this.cv = [];              // comprehension variable maps
    this.ret = null;
    this.fid = 0;              // set by the interpreter (Interp.nextFid: frame ids count per run)
  }
}

const STDLIB = new Set(STDLIB_MODULE_NAMES);

/** one input() answer per line; null / undefined stays one end-of-input marker */
export function inputLines(v) {
  if (v === null || v === undefined) return [null];
  const parts = String(v).split('\n');
  if (parts.length > 1 && parts[parts.length - 1] === '') parts.pop();
  return parts;
}
export class Interp {
  constructor(program, opts = {}) {
    this.prog = program;
    this.filename = program.filename || 'main.py';
    this.lines = program.lines || [];
    this.out = '';
    this.stdoutText = '';
    this.intMaxStrDigits = 4300;   // sys.set_int_max_str_digits()
    this.pending = [];
    this.steps = 0;
    this.maxSteps = opts.maxSteps == null ? 100000 : opts.maxSteps;
    // work inside one step (comprehension / generator expression iterations, lines of functions that builtins such
    // as sorted(key=f) or map(f) call) is not a step; it has its own budget so an endless one still stops
    this.hidden = 0;
    this.maxHidden = Math.max(100 * this.maxSteps, 1000000);
    this.lastStepLine = null;   // line of the last step (line event), where a StepLimit error points
    this.locale = opts.locale || 'en';   // language of the simulator's own messages (step limit)
    this.frames = [];
    this.echoInput = opts.echoInput !== false;
    // an array (or string) of answers becomes one entry per line: 'Andi\n17' answers two input() calls, a trailing
    // newline is dropped, and a null / undefined entry means end of input (EOFError, like provideInput(null))
    const ins = opts.inputs == null ? [] : opts.inputs;
    this.inputs = typeof ins === 'function' ? ins : (Array.isArray(ins) ? ins : [ins]).flatMap(inputLines);
    this.inputPos = 0;
    this.inputQueue = [];   // answers given early with provideInput() when opts.inputs is a function
    this.hostObjs = new WeakMap();   // host JS object → its Python object (one identity per JS object)
    this.eofWhenExhausted = !!opts.eofWhenExhausted;
    this.syncDepth = 0;
    this.syncCallEvents = !!opts.syncCallEvents;
    this.foreignCall = null;   // evalExpression: (fn of another run) => the function to run instead (sandbox.js)
    this.callsRefused = false; // evalExpression with { calls: false }: host functions are refused too
    this.recLimit = opts.recursionLimit || 1000;
    this.hostModules = opts.modules || {};
    this.hostArgsTyped = opts.hostArgs === 'typed';   // floats with integral values and tuples keep their type for hosts
    this.modules = new Map();
    this.curExc = null;
    this.rng = new MersenneTwister();
    // opts.seed behaves like random.seed(seed): an integral number seeds as an int, any other float via its hash
    const sd = opts.seed;
    if (sd == null) this.rng.seedTime();
    else seedRandom(this.rng, typeof sd === 'number' && Number.isInteger(sd) ? BigInt(sd) : sd);
    this.builtins = makeBuiltins(this);
    const g = new Map();
    g.set('__name__', '__main__'); g.set('__doc__', null); g.set('__package__', null); g.set('__loader__', null);
    g.set('__spec__', null); g.set('__builtins__', this.builtinsModule); g.set('__file__', this.filename); g.set('__cached__', null);
    const first = program.ast && program.ast.body && program.ast.body[0];
    if (first && first.t === 'Expr' && first.value.t === 'Const' && typeof first.value.value === 'string') g.set('__doc__', cleanDoc(first.value.value));
    this.globals = g;
    this.fidSeq = 0;
    // the module frame exists from the start, so a snapshot taken before the first step shows it
    this.moduleFrame = new Frame('<module>', null, this.globals, this.globals);
    this.moduleFrame.fid = this.nextFid();
    this.frames.push(this.moduleFrame);
  }
  nextFid() { return ++this.fidSeq; }

  // ================================================================== top level
  *main() {
    const f = this.moduleFrame;
    yield this.execBlock(this.prog.ast.body, f);
    f.line = 0;
  }

  /** the event for a step at statement / header node s (line, plus col / endLine / endCol of what runs) */
  lineEv(line, f, s) {
    // the limit is checked before the frame moves on, so a StepLimit error points at the last step that ran
    if (this.syncDepth > 0) { this.tick(); f.line = line; f.stmtLine = line; return { kind: 'line', line }; }   // inside callSync: no event, no step
    if (this.steps >= this.maxSteps) this.stepLimit();
    f.line = line;
    f.stmtLine = line;
    this.steps++;
    this.lastStepLine = line;
    const ev = { kind: 'line', line };
    if (s) stepSpan(ev, s, this.lines);
    return ev;
  }
  /** work without a line event: one iteration of a comprehension / generator expression / callable iterator */
  tick() {
    if (this.hidden >= this.maxHidden) this.stepLimit(true);
    this.hidden++;
  }
  stepLimit(hidden) {
    const e = new StepLimitError(hidden ? this.maxHidden : this.maxSteps, hidden, this.locale);
    e.frames = this.frames.slice(); e.lines = this.frames.map((fr) => fr.line);
    e.lastLine = this.lastStepLine;
    throw e;
  }

  /** record frame f in the traceback; loc = { line, endLine } fallback when no node of f marked the exception */
  addTb(e, f, loc) {
    if (!e.ctxSeen) this.noteRaised(e);
    if (!e.frameStack) e.frameStack = this.frames.slice();
    if (e.tbFrame !== f) {
      const l = e.lineFrame === f ? e.nodeLoc : typeof loc === 'number' ? { line: loc, endLine: loc } : loc;
      const ent = { frame: f, name: f.name, line: l.line, endLine: l.endLine ?? l.line, anchors: l.anchors || null };
      if (f.file) ent.file = f.file;   // code run by eval(): "<string>", no source lines
      e.tb.unshift(ent);
      e.tbFrame = f;
    }
  }
  /**
   * CPython sets __context__ when an exception is raised (_PyErr_SetObject), for every exception, built-in ones
   * included: the exception being handled then (an except block or a finally block running for an exception, in this
   * frame or a caller) becomes its context, after cutting a context cycle through it. minipy does this when the
   * exception first reaches an execBlock (addTb), which happens before any handler or finally block is left.
   */
  noteRaised(e) {
    e.ctxSeen = true;
    const cur = this.curExc;
    if (!cur || cur === e || e.context) return;
    for (let o = cur, n = 0; o.context && n < 10000; o = o.context, n++) if (o.context === e) { o.context = null; break; }
    e.context = cur;
  }
  /** the innermost node of frame f whose evaluation raised gives the traceback location (CPython: the instruction) */
  markLine(e, n, f) {
    if (e instanceof PyExc && e.lineFrame !== f && e.tbFrame !== f) { e.lineFrame = f; e.nodeLoc = nodeLoc(n); }
  }
  markLoc(e, loc, f) {
    if (e instanceof PyExc && e.lineFrame !== f && e.tbFrame !== f) { e.lineFrame = f; e.nodeLoc = loc; }
  }

  // ================================================================== statements
  *execBlock(stmts, f) {
    for (let i = 0; i < stmts.length; i++) {
      const s = stmts[i];
      if (s.noStep) continue;   // global/nonlocal declarations and function docstrings run no code (no line event in CPython)
      let c;
      try {
        if (s.sync) {
          yield this.lineEv(s.line, f, s);
          c = this.execSimple(s, f);
        } else c = yield this.execStmt(s, f);
      } catch (e) {
        if (e instanceof PyExc) this.addTb(e, f, s.loc || s.line);
        else if (e instanceof RangeError && String(e.message).includes('call stack')) { const pe = pyErr('RecursionError', 'maximum recursion depth exceeded'); this.addTb(pe, f, s.loc || s.line); throw pe; }
        else if (e instanceof RangeError && /Invalid string length|Invalid array length|Maximum BigInt size|allocation failed/.test(String(e.message))) {
          // a result too big for the JS engine (a huge width, 'x' * 10**10): CPython runs out of memory too
          const pe = new PyExc(EXC.MemoryError, []); this.addTb(pe, f, s.loc || s.line); throw pe;
        }
        throw e;
      }
      if (c) return c;
    }
    return 0;
  }

  execSimple(s, f) {
    switch (s.t) {
      case 'Expr': this.ev(s.value, f); return 0;
      case 'Assign': {
        const v = this.ev(s.value, f);
        const ts = s.targets;
        for (let i = 0; i < ts.length; i++) this.assign(ts[i], v, f);
        return 0;
      }
      case 'AugAssign': return this.augAssign(s, f);
      case 'Pass': case 'Global': case 'Nonlocal': return 0;
      case 'Return': f.ret = s.value ? this.ev(s.value, f) : null; return RET;
      case 'Break': return BRK;
      case 'Continue': return CNT;
      case 'Delete': for (const t of s.targets) this.del(t, f); return 0;
      case 'Raise': this.doRaise(s.exc ? this.ev(s.exc, f) : undefined, s.cause ? this.ev(s.cause, f) : undefined, f); return 0;
      case 'Assert':
        if (!truthy(this.ev(s.test, f))) throw this.assertionError(s.msg ? this.ev(s.msg, f) : undefined, s, f);
        return 0;
      case 'Import': this.doImport(s, f); return 0;
      case 'ImportFrom': this.doImportFrom(s, f); return 0;
      case 'AnnAssign':
        if (s.value) { const v = this.ev(s.value, f); if (!f.func) this.ev(s.annotation, f); this.assign(s.target, v, f); } else if (!f.func) this.ev(s.annotation, f);
        return 0;
    }
    throw new Error('execSimple: ' + s.t);
  }

  *execStmt(s, f) {
    switch (s.t) {
      case 'If': {
        yield this.lineEv(s.line, f, s);
        const t = s.test.pure ? this.ev(s.test, f) : yield this.evg(s.test, f);
        if (truthy(t)) return yield this.execBlock(s.body, f);
        if (s.orelse.length) return yield this.execBlock(s.orelse, f);
        return 0;
      }
      case 'While': {
        for (;;) {
          yield this.lineEv(s.line, f, s);
          const t = s.test.pure ? this.ev(s.test, f) : yield this.evg(s.test, f);
          if (!truthy(t)) {
            if (s.orelse.length) return yield this.execBlock(s.orelse, f);
            return 0;
          }
          const c = yield this.execBlock(s.body, f);
          if (c === BRK) return 0;
          if (c === RET) return c;
        }
      }
      case 'For': {
        yield this.lineEv(s.line, f, s);
        const iterable = s.iter.pure ? this.ev(s.iter, f) : yield this.evg(s.iter, f);
        // GET_ITER and FOR_ITER are located at the iterable expression (LOC(s->v.For.iter))
        const it = this.iterAt(iterable, s.iter, f);
        let first = true;
        for (;;) {
          if (!first) yield this.lineEv(s.line, f, s);
          first = false;
          let x;
          try { x = it.next(); } catch (e) { this.markLoc(e, exprLoc(s.iter), f); throw e; }
          if (x === STOP) {
            if (s.orelse.length) return yield this.execBlock(s.orelse, f);
            return 0;
          }
          if (s.target.t === 'Name') this.storeName(s.target, x, f);
          else if (s.target.pure) this.assign(s.target, x, f);
          else yield this.assignG(s.target, x, f);
          const c = yield this.execBlock(s.body, f);
          if (c === BRK) return 0;
          if (c === RET) return c;
        }
      }
      case 'FunctionDef': {
        yield this.lineEv(s.line, f, s);
        const p = s.params;
        const defaults = [];
        for (const d of p.defaults) defaults.push(d.pure ? this.ev(d, f) : yield this.evg(d, f));
        const kwd = [];
        for (const d of p.kwdefaults) kwd.push(d === null ? undefined : d.pure ? this.ev(d, f) : yield this.evg(d, f));
        for (const a of [...p.args, ...p.kwonly, p.vararg, p.kwarg]) if (a && a.annotation) { if (a.annotation.pure) this.ev(a.annotation, f); else yield this.evg(a.annotation, f); }
        if (s.returns) { if (s.returns.pure) this.ev(s.returns, f); else yield this.evg(s.returns, f); }
        const fn = this.makeFunction(s, f, defaults, kwd);
        this.storeByName(s.name, fn, f, s);
        return 0;
      }
      case 'Try': return yield this.execTry(s, f);
      case 'Match': return yield this.execMatch(s, f);
      default:
        yield this.lineEv(s.line, f, s);
        return yield this.execSimpleG(s, f);
    }
  }

  *execSimpleG(s, f) {
    switch (s.t) {
      case 'Expr': if (s.value.pure) this.ev(s.value, f); else yield this.evg(s.value, f); return 0;
      case 'Assign': {
        const v = s.value.pure ? this.ev(s.value, f) : yield this.evg(s.value, f);
        for (const t of s.targets) { if (t.pure) this.assign(t, v, f); else yield this.assignG(t, v, f); }
        return 0;
      }
      case 'AugAssign': {
        const t = s.target;
        if (t.t === 'Name') {
          const cur = this.loadTarget(t, f);
          const v = s.value.pure ? this.ev(s.value, f) : yield this.evg(s.value, f);
          this.storeName(t, inplace(s.op, cur, v, this), f);
        } else if (t.t === 'Subscript') {
          const o = t.value.pure ? this.ev(t.value, f) : yield this.evg(t.value, f);
          const k = t.slice.pure ? this.evSlice(t.slice, f) : yield this.evSliceG(t.slice, f);
          const cur = this.loadItem(t, o, k, f);
          const v = s.value.pure ? this.ev(s.value, f) : yield this.evg(s.value, f);
          this.storeItem(t, o, k, inplace(s.op, cur, v, this), f, false);
        } else {
          const o = t.value.pure ? this.ev(t.value, f) : yield this.evg(t.value, f);
          const cur = this.loadAttr(t, o, f);
          const v = s.value.pure ? this.ev(s.value, f) : yield this.evg(s.value, f);
          this.storeAttr(t, o, inplace(s.op, cur, v, this), f);
        }
        return 0;
      }
      case 'Return': f.ret = s.value ? (s.value.pure ? this.ev(s.value, f) : yield this.evg(s.value, f)) : null; return RET;
      case 'Delete': for (const t of s.targets) { if (t.pure) this.del(t, f); else { /* rare: del a[f(x)] */ this.del(t, f); } } return 0;
      case 'Raise': {
        const exc = s.exc ? (s.exc.pure ? this.ev(s.exc, f) : yield this.evg(s.exc, f)) : undefined;
        const cause = s.cause ? (s.cause.pure ? this.ev(s.cause, f) : yield this.evg(s.cause, f)) : undefined;
        this.doRaise(exc, cause, f);
        return 0;
      }
      case 'Assert': {
        const t = s.test.pure ? this.ev(s.test, f) : yield this.evg(s.test, f);
        if (!truthy(t)) throw this.assertionError(s.msg ? (s.msg.pure ? this.ev(s.msg, f) : yield this.evg(s.msg, f)) : undefined, s, f);
        return 0;
      }
      case 'AnnAssign': {
        if (s.value) { const v = s.value.pure ? this.ev(s.value, f) : yield this.evg(s.value, f); this.assign(s.target, v, f); }
        return 0;
      }
      default: return this.execSimple(s, f);
    }
  }

  *execTry(s, f) {
    yield this.lineEv(s.line, f, s);
    let code = 0, pending = null;
    try {
      let handled = false;
      try {
        code = yield this.execBlock(s.body, f);
      } catch (e) {
        if (!(e instanceof PyExc)) throw e;
        let h = null;
        for (const hd of s.handlers) {
          yield this.lineEv(hd.line, f, hd);
          if (!hd.type) { h = hd; break; }
          // the exception is already being handled while the except clause is tested: a new error (bad class,
          // NameError...) is chained to it and located at the except line
          let ok, tp, evaluated = false;
          try {
            tp = hd.type.pure ? this.ev(hd.type, f) : yield this.evg(hd.type, f);
            evaluated = true;
            ok = this.excMatches(e, tp);
          } catch (e2) {
            if (e2 instanceof PyExc) {
              if (e2 !== e && !e2.context) e2.context = e;
              // CHECK_EXC_MATCH is located at the whole handler (except line to the end of its body)
              this.markLoc(e2, evaluated ? { line: hd.line, endLine: blockEnd(hd.body, hd.line) } : nodeLoc(hd.type), f);
            }
            throw e2;
          }
          if (ok) { h = hd; break; }
        }
        if (!h) throw e;
        handled = true;
        code = yield this.runHandler(h, e, f);
      }
      if (!handled && code === 0 && s.orelse.length) code = yield this.execBlock(s.orelse, f);
    } catch (e) {
      if (!(e instanceof PyExc) || !s.finalbody) throw e;
      pending = e;
    }
    if (s.finalbody) {
      const saved = this.curExc;
      if (pending) this.curExc = pending;
      let fc;
      try { fc = yield this.execBlock(s.finalbody, f); } catch (e2) {
        if (e2 instanceof PyExc && pending && e2 !== pending && !e2.context) e2.context = pending;
        throw e2;
      } finally { this.curExc = saved; }
      if (fc) return fc;
      if (pending) throw pending;
    }
    return code;
  }

  *runHandler(h, e, f) {
    if (h.name) this.storeByName(h.name, e, f, h);
    const saved = this.curExc;
    this.curExc = e;
    try {
      return yield this.execBlock(h.body, f);
    } catch (e2) {
      if (e2 instanceof PyExc && e2 !== e && !e2.context) e2.context = e;
      throw e2;
    } finally {
      this.curExc = saved;
      if (h.name) this.unbindByName(h.name, f, h);
    }
  }

  excMatches(e, tp) {
    // _PyEval_CheckExceptTypeValid: every member of a tuple must be an exception class (nested tuples are not)
    const bad = () => pyErr('TypeError', 'catching classes that do not inherit from BaseException is not allowed');
    if (tp instanceof PyTuple) {
      for (const t of tp.items) if (!(t instanceof PyType && t.isExc)) throw bad();
      return tp.items.some((t) => e.type.isSubOf(t));
    }
    if (!(tp instanceof PyType && tp.isExc)) throw bad();
    return e.type.isSubOf(tp);
  }

  doRaise(exc, cause, f) {
    if (exc === undefined) {
      if (!this.curExc) throw pyErr('RuntimeError', 'No active exception to reraise');
      // a bare raise (RAISE_VARARGS 0) unwinds without adding a traceback entry for its own frame
      const e = this.curExc;
      e.tbFrame = f; e.lineFrame = null;
      throw e;
    }
    let e = exc;
    if (exc instanceof PyType && exc.isExc) e = new PyExc(exc, []);
    else if (!(exc instanceof PyExc)) throw pyErr('TypeError', 'exceptions must derive from BaseException');
    if (cause !== undefined) {
      if (cause === null) { e.cause = null; e.causeSet = true; } else {
        let c = cause;
        if (cause instanceof PyType && cause.isExc) c = new PyExc(cause, []);
        else if (!(cause instanceof PyExc)) throw pyErr('TypeError', 'exception causes must derive from BaseException');
        e.cause = c; e.causeSet = true;
      }
    }
    const cur = this.curExc;
    if (cur && cur !== e) {
      // CPython _PyErr_SetObject: cut a context cycle through e, then (re)set e.__context__
      for (let o = cur, n = 0; o.context && n < 10000; o = o.context, n++) if (o.context === e) { o.context = null; break; }
      e.context = cur;
    }
    e.tbFrame = null; e.lineFrame = null; e.ctxSeen = true;
    throw e;
  }
  /** CPython 3.13 raises a failed assert at the test expression (RAISE_VARARGS has LOC(test)) */
  assertionError(msg, s, f) {
    const e = msg === undefined ? new PyExc(EXC.AssertionError, []) : new PyExc(EXC.AssertionError, [msg]);
    if (s) this.markLoc(e, exprLoc(s.test), f);
    return e;
  }

  *execMatch(s, f) {
    yield this.lineEv(s.line, f, s);
    const subj = s.subject.pure ? this.ev(s.subject, f) : yield this.evg(s.subject, f);
    for (const c of s.cases) {
      yield this.lineEv(c.line, f, c);
      // errors in a pattern or a guard belong to the case line (or the guard's own lines)
      try {
        // like CPython, the names a pattern captures are bound only when the whole pattern matched
        const binds = [];
        if (!this.matchPattern(c.pattern, subj, f, binds)) continue;
        for (const [name, v, node] of binds) this.storeByName(name, v, f, node);
        if (c.guard) {
          const g = c.guard.pure ? this.ev(c.guard, f) : yield this.evg(c.guard, f);
          if (!truthy(g)) continue;
        }
      } catch (e) {
        this.markLoc(e, c.guard ? nodeLoc(c.guard) : { line: c.line, endLine: c.line }, f);
        throw e;
      }
      return yield this.execBlock(c.body, f);
    }
    return 0;
  }

  /** binds collects [name, value, node] for the captures; they are stored only if the whole pattern matches */
  matchPattern(p, v, f, binds) {
    switch (p.t) {
      case 'MatchValue': return compare('==', v, this.ev(p.value, f));
      case 'MatchSingleton': return v === p.value;
      case 'MatchAs':
        if (p.pattern && !this.matchPattern(p.pattern, v, f, binds)) return false;
        if (p.name) binds.push([p.name, v, p]);
        return true;
      case 'MatchOr':
        for (const q of p.patterns) {
          const alt = [];
          if (this.matchPattern(q, v, f, alt)) { binds.push(...alt); return true; }
        }
        return false;
      case 'MatchSequence': {
        if (!(v instanceof PyList || v instanceof PyTuple || (v && v.constructor && v.constructor.name === 'PyDeque') || (v && v.constructor && v.constructor.name === 'PyRange'))) return false;
        const items = toArray(v, this);
        const pats = p.patterns;
        const si = pats.findIndex((q) => q.t === 'MatchStar');
        if (si < 0) {
          if (items.length !== pats.length) return false;
          for (let i = 0; i < pats.length; i++) if (!this.matchPattern(pats[i], items[i], f, binds)) return false;
          return true;
        }
        if (items.length < pats.length - 1) return false;
        const after = pats.length - si - 1;
        for (let i = 0; i < si; i++) if (!this.matchPattern(pats[i], items[i], f, binds)) return false;
        for (let i = 0; i < after; i++) if (!this.matchPattern(pats[si + 1 + i], items[items.length - after + i], f, binds)) return false;
        if (pats[si].name) binds.push([pats[si].name, new PyList(items.slice(si, items.length - after)), pats[si]]);
        return true;
      }
      case 'MatchMapping': {
        if (!(v instanceof PyDict)) return false;
        const keys = p.keys.map((k) => this.ev(k, f));
        for (let i = 0; i < keys.length; i++) {
          const x = v.get(keys[i]);
          if (x === undefined) return false;
          if (!this.matchPattern(p.patterns[i], x, f, binds)) return false;
        }
        if (p.rest) {
          const r = new PyDict();
          for (const [k, x] of v.entries()) if (!keys.some((kk) => compare('==', kk, k))) r.set(k, x);
          binds.push([p.rest, r, p]);
        }
        return true;
      }
      case 'MatchClass': {
        const cls = this.ev(p.cls, f);
        if (!(cls instanceof PyType)) throw pyErr('TypeError', 'called match pattern must be a class');
        if (!isinstance(v, cls)) return false;
        const selfMatching = ['bool', 'bytearray', 'bytes', 'dict', 'float', 'frozenset', 'int', 'list', 'set', 'str', 'tuple'].includes(cls.name);
        if (p.patterns.length) {
          if (!selfMatching) throw pyErr('TypeError', `${cls.name}() accepts 0 positional sub-patterns (${p.patterns.length} given)`);
          if (p.patterns.length > 1) throw pyErr('TypeError', `${cls.name}() accepts 1 positional sub-pattern (${p.patterns.length} given)`);
          if (!this.matchPattern(p.patterns[0], v, f, binds)) return false;
        }
        for (let i = 0; i < p.kwdNames.length; i++) {
          let a;
          try { a = getAttribute(this, v, p.kwdNames[i]); } catch (e) { if (e instanceof PyExc && e.type === EXC.AttributeError) return false; throw e; }
          if (!this.matchPattern(p.kwdPatterns[i], a, f, binds)) return false;
        }
        return true;
      }
    }
    return false;
  }

  // ================================================================== names
  loadName(n, f) {
    switch (n.kind) {
      case 'L': {
        const v = f.locals.get(n.id);
        if (v === undefined) throw this.unboundLocal(n.id);
        return v;
      }
      case 'G': {
        let v = f.globals.get(n.id);
        if (v === undefined) { v = this.builtins.get(n.id); if (v === undefined) throw this.nameError(n.id, f); }
        return v;
      }
      case 'C': {
        const m = f.cv[n.level];
        const v = m && m.get(n.id);
        if (v === undefined) throw this.unboundLocal(n.id);
        return v;
      }
      case 'F': {
        let fr = f;
        for (let d = 0; d < n.depth; d++) fr = fr.func ? fr.func.closure : fr;
        const v = fr.locals.get(n.id);
        if (v === undefined) throw pyErr('NameError', `cannot access free variable '${n.id}' where it is not associated with a value in enclosing scope`);
        return v;
      }
      case 'CF': {
        const m = f.func && f.func.cv && f.func.cv[n.level];
        const v = m && m.get(n.id);
        if (v === undefined) throw pyErr('NameError', `cannot access free variable '${n.id}' where it is not associated with a value in enclosing scope`);
        return v;
      }
    }
    // unresolved (evalExpression without analysis): globals then builtins
    let v = f.locals.get(n.id);
    if (v === undefined) v = f.globals.get(n.id);
    if (v === undefined) v = this.builtins.get(n.id);
    if (v === undefined) throw this.nameError(n.id, f);
    return v;
  }
  storeName(n, v, f) {
    switch (n.kind) {
      case 'L': f.locals.set(n.id, v); return;
      case 'G': f.globals.set(n.id, v); return;
      case 'C': f.cv[n.level].set(n.id, v); return;
      case 'F': {
        let fr = f;
        for (let d = 0; d < n.depth; d++) fr = fr.func ? fr.func.closure : fr;
        fr.locals.set(n.id, v); return;
      }
      default: f.locals.set(n.id, v);
    }
  }
  /** store by plain name (def / except-as / import / match capture) using the frame's scope rules */
  storeByName(name, v, f) {
    if (!f.func) { f.globals.set(name, v); return; }
    const def = f.func.def;
    if (def.localSet && def.localSet.has(name)) f.locals.set(name, v);
    else if (def.scope && def.scope.get(name) & 16) { // nonlocal
      let fr = f.func.closure;
      while (fr && fr.func && !(fr.func.def.localSet && fr.func.def.localSet.has(name))) fr = fr.func.closure;
      (fr || f).locals.set(name, v);
    } else f.globals.set(name, v);
  }
  unbindByName(name, f) {
    if (!f.func) f.globals.delete(name);
    else if (f.func.def.localSet && f.func.def.localSet.has(name)) f.locals.delete(name);
    else f.globals.delete(name);
  }
  unboundLocal(name) {
    const e = pyErr('UnboundLocalError', `cannot access local variable '${name}' where it is not associated with a value`);
    e.name = name;
    return e;
  }
  nameError(name, f) {
    const e = pyErr('NameError', `name '${name}' is not defined`);
    e.name = name;
    const cands = [];
    for (const k of f.locals.keys()) cands.push(k);
    if (f.func && f.func.def.freeNames) {
      for (const fv of f.func.def.freeNames) {
        let fr = f;
        for (let d = 0; d < fv.depth; d++) fr = fr.func ? fr.func.closure : fr;
        if (fr.locals.has(fv.id)) cands.push(fv.id);
      }
    }
    if (f.locals !== f.globals) for (const k of f.globals.keys()) cands.push(k);
    else for (const k of f.globals.keys()) cands.push(k);
    for (const k of BUILTINS_ORDER) cands.push(k);
    const sug = suggestName(cands, name);
    let s = '';
    if (sug) s = `. Did you mean: '${sug}'?`;
    if (STDLIB.has(name)) s += sug ? ` Or did you forget to import '${name}'?` : `. Did you forget to import '${name}'?`;
    e.suggestion = s || null;
    return e;
  }

  // ================================================================== assignment targets
  assign(t, v, f) {
    switch (t.t) {
      case 'Name': this.storeName(t, v, f); return;
      case 'Tuple': case 'List': {
        const vals = this.unpackAt(t, v, f);
        const elts = t.elts;
        for (let i = 0; i < elts.length; i++) this.assign(elts[i].t === 'Starred' ? elts[i].value : elts[i], vals[i], f);
        return;
      }
      case 'Subscript': {
        const o = this.ev(t.value, f); const k = this.evSlice(t.slice, f);
        this.storeItem(t, o, k, v, f, this.isFreshNaN(t.slice, k, f));
        return;
      }
      case 'Attribute': { const o = this.ev(t.value, f); this.storeAttr(t, o, v, f); return; }
      case 'Starred': this.assign(t.value, v, f); return;
    }
    throw pyErr('SyntaxError', 'cannot assign');
  }
  // CPython locates STORE_SUBSCR / STORE_ATTR / DELETE_* and the loads of an augmented assignment's target at the
  // target node (not the whole statement): `x, \` + `d[[1]] = 1, 2` fails on the second line
  storeItem(t, o, k, v, f, freshNaN) {
    try { if (freshNaN) withFreshNaN(() => setitem(o, k, v, this)); else setitem(o, k, v, this); } catch (e) { this.markLoc(e, exprLoc(t), f); throw e; }
  }
  storeAttr(t, o, v, f) {
    try { setAttribute(this, o, t.attr, v); } catch (e) { this.markLoc(e, nodeLoc(t), f); throw e; }
  }
  loadItem(t, o, k, f) {
    try { return getitem(o, k, this); } catch (e) { this.markLoc(e, exprLoc(t), f); throw e; }
  }
  loadAttr(t, o, f) {
    try { return getAttribute(this, o, t.attr); } catch (e) { this.markLoc(e, nodeLoc(t), f); throw e; }
  }
  loadTarget(t, f) {
    try { return this.loadName(t, f); } catch (e) { this.markLoc(e, exprLoc(t), f); throw e; }
  }
  *assignG(t, v, f) {
    switch (t.t) {
      case 'Tuple': case 'List': {
        const elts = t.elts;
        const vals = this.unpackAt(t, v, f);
        for (let i = 0; i < elts.length; i++) {
          const tt = elts[i].t === 'Starred' ? elts[i].value : elts[i];
          if (tt.pure) this.assign(tt, vals[i], f); else yield this.assignG(tt, vals[i], f);
        }
        return;
      }
      case 'Subscript': {
        const o = t.value.pure ? this.ev(t.value, f) : yield this.evg(t.value, f);
        const k = t.slice.pure ? this.evSlice(t.slice, f) : yield this.evSliceG(t.slice, f);
        this.storeItem(t, o, k, v, f, false); return;
      }
      case 'Attribute': { const o = t.value.pure ? this.ev(t.value, f) : yield this.evg(t.value, f); this.storeAttr(t, o, v, f); return; }
      default: this.assign(t, v, f);
    }
  }
  /** UNPACK_SEQUENCE / UNPACK_EX: located at the target tuple or list */
  unpackAt(t, v, f) {
    const elts = t.elts;
    let star = -1;
    for (let i = 0; i < elts.length; i++) if (elts[i].t === 'Starred') star = i;
    try { return unpack(v, elts.length, star, this); } catch (e) { this.markLoc(e, exprLoc(t), f); throw e; }
  }
  /** GET_ITER located at the iterable expression */
  iterAt(v, node, f) {
    try { return getIter(v, this); } catch (e) { this.markLoc(e, exprLoc(node), f); throw e; }
  }
  augAssign(s, f) {
    const t = s.target;
    if (t.t === 'Name') {
      const cur = this.loadTarget(t, f);
      const v = this.ev(s.value, f);
      this.storeName(t, inplace(s.op, cur, v, this), f);
    } else if (t.t === 'Subscript') {
      const o = this.ev(t.value, f);
      const k = this.evSlice(t.slice, f);
      const cur = this.loadItem(t, o, k, f);
      const v = this.ev(s.value, f);
      this.storeItem(t, o, k, inplace(s.op, cur, v, this), f, false);
    } else {
      const o = this.ev(t.value, f);
      const cur = this.loadAttr(t, o, f);
      const v = this.ev(s.value, f);
      this.storeAttr(t, o, inplace(s.op, cur, v, this), f);
    }
    return 0;
  }
  del(t, f) {
    try { this.del0(t, f); } catch (e) { if (t.t !== 'Tuple' && t.t !== 'List') this.markLoc(e, t.t === 'Attribute' ? nodeLoc(t) : exprLoc(t), f); throw e; }
  }
  del0(t, f) {
    switch (t.t) {
      case 'Name': {
        if (t.kind === 'L') { if (!f.locals.has(t.id)) throw this.unboundLocal(t.id); f.locals.delete(t.id); return; }
        if (t.kind === 'G' || !t.kind) { if (!f.globals.has(t.id)) throw this.nameError(t.id, f); f.globals.delete(t.id); return; }
        if (t.kind === 'C') { f.cv[t.level].delete(t.id); return; }
        if (t.kind === 'F') {
          // del of a nonlocal (free) variable clears the enclosing function's cell
          let fr = f;
          for (let d = 0; d < t.depth; d++) fr = fr.func ? fr.func.closure : fr;
          if (!fr.locals.has(t.id)) throw pyErr('NameError', `cannot access free variable '${t.id}' where it is not associated with a value in enclosing scope`);
          fr.locals.delete(t.id); return;
        }
        throw pyErr('SyntaxError', 'cannot delete');
      }
      case 'Tuple': case 'List': for (const e of t.elts) this.del(e, f); return;
      case 'Subscript': { const o = this.ev(t.value, f); delitem(o, this.evSlice(t.slice, f)); return; }
      case 'Attribute': { const o = this.ev(t.value, f); delAttribute(this, o, t.attr); return; }
    }
  }

  // ================================================================== expressions (synchronous)
  ev(n, f) {
    if (n.ml === true) {
      try { return this.ev0(n, f); } catch (e) { this.markLine(e, n, f); throw e; }
    }
    return this.ev0(n, f);
  }
  ev0(n, f) {
    switch (n.t) {
      case 'Const': return n.value;
      case 'Name': return this.loadName(n, f);
      case 'BinOp': { const a = this.ev(n.left, f); return binop(n.op, a, this.ev(n.right, f)); }
      case 'Compare': {
        let left = this.ev(n.left, f);
        const ops = n.ops, cs = n.comparators;
        for (let i = 0; i < ops.length; i++) {
          const right = this.ev(cs[i], f);
          if (!this.cmpOp(ops[i], left, right, i ? cs[i - 1] : n.left, cs[i], f)) return false;
          left = right;
        }
        return true;
      }
      case 'BoolOp': {
        const vs = n.values;
        let v = null;
        if (n.op === 'and') { for (let i = 0; i < vs.length; i++) { v = this.ev(vs[i], f); if (!truthy(v)) return v; } return v; }
        for (let i = 0; i < vs.length; i++) { v = this.ev(vs[i], f); if (truthy(v)) return v; }
        return v;
      }
      case 'UnaryOp': return unary(n.op, this.ev(n.operand, f));
      case 'IfExp': return truthy(this.ev(n.test, f)) ? this.ev(n.body, f) : this.ev(n.orelse, f);
      case 'Attribute': return getAttribute(this, this.ev(n.value, f), n.attr);
      case 'Subscript': {
        const o = this.ev(n.value, f), k = this.evSlice(n.slice, f);
        return this.isFreshNaN(n.slice, k, f) ? withFreshNaN(() => getitem(o, k, this)) : getitem(o, k, this);
      }
      case 'Slice': return new PySlice(n.lower ? this.ev(n.lower, f) : null, n.upper ? this.ev(n.upper, f) : null, n.step ? this.ev(n.step, f) : null);
      case 'List': return new PyList(this.evElts(n.elts, f, true));
      case 'Tuple': return new PyTuple(this.evElts(n.elts, f, true));
      case 'Set': {
        // a frozenset constant (see compiler.js assignConstSets) copied by BUILD_SET + SET_UPDATE; as a for / `in`
        // operand the constant itself is used
        if (n.constSet) { const r = new PySet(); r.merge(n.constSet); return r; }
        if (n.constIter) return n.constIter;
        const s = new PySet();
        for (const e of n.elts) {
          if (e.t === 'Starred') { for (const x of toArray(this.ev(e.value, f), this)) s.add(x); continue; }
          this.setAdd(s, this.ev(e, f), e, f);
        }
        return s;
      }
      case 'Dict': {
        const d = new PyDict();
        for (let i = 0; i < n.keys.length; i++) {
          if (n.keys[i] === null) { for (const [k, v] of this.toDictEntries(this.ev(n.values[i], f))) d.set(k, v); continue; }
          const k = this.ev(n.keys[i], f);
          this.dictSet(d, k, this.ev(n.values[i], f), n.keys[i], f);
        }
        return d;
      }
      case 'JoinedStr': {
        let s = '';
        for (const p of n.values) s += typeof p === 'string' ? p : this.evFormatted(p, f, this.ev(p.value, f));
        return s;
      }
      case 'FormattedValue': return this.evFormatted(n, f, this.ev(n.value, f));
      case 'Call': {
        const fn = n.func.t === 'Attribute' ? getAttribute(this, this.ev(n.func.value, f), n.func.attr) : this.ev(n.func, f);
        const args = [];
        let kw = null;
        for (const a of n.args) {
          if (a.t === 'Starred') this.pushStar(args, this.ev(a.value, f), fn, n.args.length > 1);
          else args.push(this.ev(a, f));
        }
        for (const k of n.keywords) kw = this.addKw(kw, k, this.ev(k.value, f), fn);
        if (this.freshArgCall(fn, args, n, f)) return withFreshNaN(() => this.callSync(fn, args, kw));
        return this.callSync(fn, args, kw);
      }
      case 'Lambda': {
        const p = n.params;
        return this.makeFunction(n, f, p.defaults.map((d) => this.ev(d, f)), p.kwdefaults.map((d) => d === null ? undefined : this.ev(d, f)));
      }
      case 'ListComp': case 'SetComp': case 'DictComp': return this.evComp(n, f);
      case 'GenExp': return this.makeGenExp(n, f, this.ev(n.generators[0].iter, f));
      case 'NamedExpr': { const v = this.ev(n.value, f); this.storeName(n.target, v, f); return v; }
      case 'Starred': throw pyErr('SyntaxError', "can't use starred expression here");
      case 'Yield': throw pyErr('SyntaxError', "'yield' outside function");
      case 'YieldFrom': throw pyErr('SyntaxError', "'yield from' outside function");
    }
    throw new Error('ev: unknown node ' + n.t);
  }
  /** one comparison; a NaN operand that was just created (float('nan'), arithmetic) is a new object */
  cmpOp(op, a, b, an, bn, f) {
    if ((typeof a === 'number' && a !== a) || (typeof b === 'number' && b !== b)) {
      const fresh = (node, v) => typeof v === 'number' && v !== v && this.freshNode(node, f);
      if ((op === 'in' || op === 'not in') && fresh(an, a)) return withFreshNaN(() => compare(op, a, b));
      if ((op === 'is' || op === 'is not') && (fresh(an, a) || fresh(bn, b))) return op === 'is not';
    }
    return compare(op, a, b);
  }
  /** a NaN that the expression just created is a new float object (distinct from every other NaN) */
  isFreshNaN(node, v, f) { return typeof v === 'number' && v !== v && this.freshNode(node, f); }
  setAdd(s, x, node, f) { if (this.isFreshNaN(node, x, f)) withFreshNaN(() => s.add(x)); else s.add(x); }
  dictSet(d, k, v, node, f) { if (this.isFreshNaN(node, k, f)) withFreshNaN(() => d.set(k, v)); else d.set(k, v); }
  /** a call of a set / dict / list method with a NaN argument that was just created (s.add(float(t))) */
  freshArgCall(fn, args, n, f) {
    if (!(fn instanceof PyBuiltin) || fn.self === undefined || !(fn.self instanceof PySet || fn.self instanceof PyDict || fn.self instanceof PyList)) return false;
    for (let i = 0; i < n.args.length && i < args.length; i++) if (n.args[i].t !== 'Starred' && this.isFreshNaN(n.args[i], args[i], f)) return true;
    return false;
  }
  freshNode(node, f) {
    if (!node) return false;
    if (node.t === 'BinOp') return true;
    if (node.t === 'UnaryOp') return node.op === '-';
    if (node.t === 'Call' && node.func.t === 'Name') { try { return this.loadName(node.func, f) === T.float; } catch (e) { return false; } }
    return false;
  }
  evSlice(s, f) {
    if (s.t === 'Slice') return new PySlice(s.lower ? this.ev(s.lower, f) : null, s.upper ? this.ev(s.upper, f) : null, s.step ? this.ev(s.step, f) : null);
    return this.ev(s, f);
  }
  evElts(elts, f, listExtend) {
    const out = [];
    for (const e of elts) {
      if (e.t === 'Starred') this.extendStar(out, this.ev(e.value, f), listExtend); else out.push(this.ev(e, f));
    }
    return out;
  }
  /** *x in a display: LIST_EXTEND (list / tuple) words a non-iterable as "Value after *", SET_UPDATE does not */
  extendStar(out, v, listExtend) {
    if (v instanceof PyList || v instanceof PyTuple) { for (const x of v.items) out.push(x); return; }
    let arr;
    try { arr = toArray(v, this); } catch (e) {
      if (listExtend && e instanceof PyExc && e.type === EXC.TypeError && /is not iterable/.test(e.args[0])) throw pyErr('TypeError', `Value after * must be an iterable, not ${typeName(v)}`);
      throw e;
    }
    for (const x of arr) out.push(x);
  }
  evFormatted(p, f, v) {
    if (p.conversion === 'r') v = repr(v);
    else if (p.conversion === 's') v = this.toStr(v);
    else if (p.conversion === 'a') v = asciiRepr(repr(v));
    let spec = '';
    if (p.spec) {
      for (const q of p.spec.values) spec += typeof q === 'string' ? q : this.evFormatted(q, f, this.ev(q.value, f));
    }
    return this.formatField(p, v, spec, f);
  }
  /** FORMAT_SIMPLE / FORMAT_WITH_SPEC: located at the replacement field (its '{' to its '}') */
  formatField(p, v, spec, f) {
    try { return this.format(v, spec); } catch (e) {
      if (p.line) this.markLoc(e, { line: p.line, endLine: p.endLine ?? p.line }, f);
      throw e;
    }
  }
  format(v, spec) {
    if (v instanceof PyHost && typeof v.obj.__format__ === 'function') return String(v.obj.__format__(spec));
    return formatValue(v, spec, strftime);
  }
  toStr(v) { return str(v); }
  /** f(*x): CALL_FUNCTION_EX checks x itself when it is the only positional argument; otherwise the arguments are
   * collected with LIST_EXTEND ("Value after * must be an iterable") */
  pushStar(args, v, fn, several) {
    if (several) { this.extendStar(args, v, true); return; }
    if (v instanceof PyList || v instanceof PyTuple) { for (const x of v.items) args.push(x); return; }
    try { for (const x of toArray(v, this)) args.push(x); } catch (e) {
      if (e instanceof PyExc && e.type === EXC.TypeError && /is not iterable/.test(e.args[0])) throw pyErr('TypeError', `${this.calleeName(fn)} argument after * must be an iterable, not ${typeName(v)}`);
      throw e;
    }
  }
  addKw(kw, k, v, fn) {
    if (!kw) kw = Object.create(null);
    if (k.arg !== null) {
      // f(**d, a=1): DICT_MERGE of the explicit keywords after a ** mapping
      if (k.arg in kw) throw pyErr('TypeError', `${this.calleeName(fn)} got multiple values for keyword argument '${k.arg}'`);
      kw[k.arg] = v; return kw;
    }
    if (!(v instanceof PyDict)) throw pyErr('TypeError', `${this.calleeName(fn)} argument after ** must be a mapping, not ${typeName(v)}`);
    for (const [key, val] of v.entries()) {
      if (typeof key !== 'string') throw pyErr('TypeError', 'keywords must be strings');
      if (key in kw) throw pyErr('TypeError', `${this.calleeName(fn)} got multiple values for keyword argument '${key}'`);
      kw[key] = val;
    }
    return kw;
  }
  calleeName(fn) {
    // CPython _PyObject_FunctionStr: "module.qualname()" unless the module is builtins
    if (fn instanceof PyFunction) return `__main__.${fn.qualname}()`;
    if (fn instanceof PyBuiltin) {
      if (fn.module === 'random' && RANDOM_METHODS.has(fn.name)) return `random.Random.${fn.name}()`;
      if (fn.pyKind) return `${fn.module ? fn.module + '.' : ''}${fn.pyQual || fn.name}()`;
      if ((fn.self !== undefined && !(fn.self instanceof PyModule)) || fn.ownerType) {
        let t = fn.ownerType || typeOf(fn.self);
        // methods of C types have no __module__; Counter's own methods are Python code in collections
        if (t === T.Counter && ['most_common', 'elements', 'total', 'subtract', 'update', 'copy', 'fromkeys'].includes(fn.name)) return `collections.Counter.${fn.name}()`;
        for (let x = t; x; x = x.base) if (METHODS[x.name] && METHODS[x.name][fn.name]) { t = x; break; }
        return `${t.name}.${fn.name}()`;
      }
      if (fn.module === 'random' && RANDOM_METHODS.has(fn.name)) return `random.Random.${fn.name}()`;
      return fn.module ? `${fn.module}.${fn.name}()` : `${fn.name}()`;
    }
    if (fn instanceof PyType) return `${fn.module && fn.module !== 'builtins' ? fn.module + '.' : ''}${fn.name}()`;
    return typeName(fn) + ' object';
  }
  toDictEntries(v) {
    if (v instanceof PyDict) return v.entries();
    throw pyErr('TypeError', `'${typeName(v)}' object is not a mapping`);
  }
  iterToArray(v) { return toArray(v, this); }
  dictUpdate(d, v) { dictFromArgs(this, d, [v], null, 'update'); }

  // ------------------------------------------------------------------ comprehensions
  evComp(n, f) {
    const base = f.cv.length;
    const first = this.ev(n.generators[0].iter, f);
    const out = n.t === 'ListComp' ? [] : n.t === 'SetComp' ? new PySet() : new PyDict();
    try { this.compLoop(n, f, 0, base, out, first); } finally { f.cv.length = base; }
    return n.t === 'ListComp' ? new PyList(out) : out;
  }
  compLoop(n, f, gi, base, out, iterable) {
    const g = n.generators[gi];
    const it = this.iterAt(iterable, g.iter, f);
    f.cv[base + gi] = new Map();
    const last = gi === n.generators.length - 1;
    for (let x = this.iterNext(it, g.iter, f); x !== STOP; x = this.iterNext(it, g.iter, f)) {
      this.tick();
      this.assign(g.target, x, f);
      let ok = true;
      for (const c of g.ifs) if (!truthy(this.ev(c, f))) { ok = false; break; }
      if (!ok) continue;
      if (!last) { this.compLoop(n, f, gi + 1, base, out, this.ev(n.generators[gi + 1].iter, f)); continue; }
      if (n.t === 'ListComp') out.push(this.ev(n.elt, f));
      else if (n.t === 'SetComp') this.compAdd(n, out, this.ev(n.elt, f), undefined, f);
      else { const k = this.ev(n.key, f); this.compAdd(n, out, k, this.ev(n.value, f), f); }
    }
  }
  /** FOR_ITER: located at the iterable expression */
  iterNext(it, node, f) {
    try { return it.next(); } catch (e) { this.markLoc(e, exprLoc(node), f); throw e; }
  }
  /** SET_ADD (at the element) / MAP_ADD (from the key to the end of the value) of a comprehension */
  compAdd(n, out, k, v, f) {
    try {
      if (n.t === 'SetComp') out.add(k); else out.set(k, v);
    } catch (e) {
      this.markLoc(e, n.t === 'SetComp' ? exprLoc(n.elt) : { line: n.key.line, endLine: n.value.endLine ?? n.value.line }, f);
      throw e;
    }
  }
  *evCompG(n, f) {
    const base = f.cv.length;
    const g0 = n.generators[0];
    const first = g0.iter.pure ? this.ev(g0.iter, f) : yield this.evg(g0.iter, f);
    const out = n.t === 'ListComp' ? [] : n.t === 'SetComp' ? new PySet() : new PyDict();
    try { yield this.compLoopG(n, f, 0, base, out, first); } finally { f.cv.length = base; }
    return n.t === 'ListComp' ? new PyList(out) : out;
  }
  *compLoopG(n, f, gi, base, out, iterable) {
    const g = n.generators[gi];
    const it = this.iterAt(iterable, g.iter, f);
    f.cv[base + gi] = new Map();
    const last = gi === n.generators.length - 1;
    const E = (e) => e.pure;
    for (let x = this.iterNext(it, g.iter, f); x !== STOP; x = this.iterNext(it, g.iter, f)) {
      this.tick();
      this.assign(g.target, x, f);
      let ok = true;
      for (const c of g.ifs) { const t = E(c) ? this.ev(c, f) : yield this.evg(c, f); if (!truthy(t)) { ok = false; break; } }
      if (!ok) continue;
      if (!last) {
        const nx = n.generators[gi + 1].iter;
        yield this.compLoopG(n, f, gi + 1, base, out, E(nx) ? this.ev(nx, f) : yield this.evg(nx, f));
        continue;
      }
      if (n.t === 'ListComp') out.push(E(n.elt) ? this.ev(n.elt, f) : yield this.evg(n.elt, f));
      else if (n.t === 'SetComp') this.compAdd(n, out, E(n.elt) ? this.ev(n.elt, f) : yield this.evg(n.elt, f), undefined, f);
      else {
        const k = E(n.key) ? this.ev(n.key, f) : yield this.evg(n.key, f);
        this.compAdd(n, out, k, E(n.value) ? this.ev(n.value, f) : yield this.evg(n.value, f), f);
      }
    }
  }
  makeGenExp(n, f, firstIterable) {
    const firstIt = this.iterAt(firstIterable, n.generators[0].iter, f);
    const gf = Object.create(f);
    gf.name = '<genexpr>';
    gf.cv = f.cv.slice();
    gf.line = n.line;
    gf.fid = this.nextFid();
    const self = this;
    const base = n.compScopes ? n.compScopes[0].compLevel : gf.cv.length;
    function* loop(gi, it) {
      const g = n.generators[gi];
      gf.cv[base + gi] = new Map();
      const last = gi === n.generators.length - 1;
      for (let x = self.iterNext(it, g.iter, gf); x !== STOP; x = self.iterNext(it, g.iter, gf)) {
        self.tick();
        self.assign(g.target, x, gf);
        let ok = true;
        for (const c of g.ifs) if (!truthy(self.ev(c, gf))) { ok = false; break; }
        if (!ok) continue;
        if (!last) { const nx = n.generators[gi + 1].iter; yield* loop(gi + 1, self.iterAt(self.ev(nx, gf), nx, gf)); continue; }
        yield self.ev(n.elt, gf);
      }
    }
    const gen = loop(0, firstIt);
    let done = false;
    return new PyIter(T.generator, () => {
      if (done) return STOP;
      if (self.frames.length >= self.recLimit) throw pyErr('RecursionError', 'maximum recursion depth exceeded');
      self.frames.push(gf);
      try {
        const r = gen.next();
        if (r.done) { done = true; return STOP; }
        return r.value;
      } catch (e) {
        done = true;
        if (e instanceof PyExc) self.addTb(e, gf, nodeLoc(n));
        throw e;
      } finally { self.frames.pop(); }
    }, { genFrame: gf });
  }

  // ================================================================== expressions (generator path, for nodes containing calls)
  *evg(n, f) {
    try {
      switch (n.t) {
        case 'Call': return yield this.evCallG(n, f);
        case 'BinOp': {
          const a = n.left.pure ? this.ev(n.left, f) : yield this.evg(n.left, f);
          const b = n.right.pure ? this.ev(n.right, f) : yield this.evg(n.right, f);
          return binop(n.op, a, b);
        }
        case 'Compare': {
          let left = n.left.pure ? this.ev(n.left, f) : yield this.evg(n.left, f);
          for (let i = 0; i < n.ops.length; i++) {
            const c = n.comparators[i];
            const right = c.pure ? this.ev(c, f) : yield this.evg(c, f);
            if (!this.cmpOp(n.ops[i], left, right, i ? n.comparators[i - 1] : n.left, c, f)) return false;
            left = right;
          }
          return true;
        }
        case 'BoolOp': {
          let v = null;
          const isAnd = n.op === 'and';
          for (const x of n.values) {
            v = x.pure ? this.ev(x, f) : yield this.evg(x, f);
            if (isAnd ? !truthy(v) : truthy(v)) return v;
          }
          return v;
        }
        case 'UnaryOp': return unary(n.op, n.operand.pure ? this.ev(n.operand, f) : yield this.evg(n.operand, f));
        case 'IfExp': {
          const t = n.test.pure ? this.ev(n.test, f) : yield this.evg(n.test, f);
          const b = truthy(t) ? n.body : n.orelse;
          return b.pure ? this.ev(b, f) : yield this.evg(b, f);
        }
        case 'Attribute': return getAttribute(this, n.value.pure ? this.ev(n.value, f) : yield this.evg(n.value, f), n.attr);
        case 'Subscript': {
          const o = n.value.pure ? this.ev(n.value, f) : yield this.evg(n.value, f);
          const k = n.slice.pure ? this.evSlice(n.slice, f) : yield this.evSliceG(n.slice, f);
          return getitem(o, k, this);
        }
        case 'Slice': return yield this.evSliceG(n, f);
        case 'List': return new PyList(yield this.evEltsG(n.elts, f, true));
        case 'Tuple': return new PyTuple(yield this.evEltsG(n.elts, f, true));
        case 'Set': {
          const s = new PySet();
          for (const e of n.elts) {
            if (e.t === 'Starred') { for (const x of toArray(e.value.pure ? this.ev(e.value, f) : yield this.evg(e.value, f), this)) s.add(x); continue; }
            this.setAdd(s, e.pure ? this.ev(e, f) : yield this.evg(e, f), e, f);
          }
          return s;
        }
        case 'Dict': {
          const d = new PyDict();
          for (let i = 0; i < n.keys.length; i++) {
            const kn = n.keys[i], vn = n.values[i];
            if (kn === null) { const m = vn.pure ? this.ev(vn, f) : yield this.evg(vn, f); for (const [k, v] of this.toDictEntries(m)) d.set(k, v); continue; }
            const k = kn.pure ? this.ev(kn, f) : yield this.evg(kn, f);
            this.dictSet(d, k, vn.pure ? this.ev(vn, f) : yield this.evg(vn, f), kn, f);
          }
          return d;
        }
        case 'JoinedStr': {
          let s = '';
          for (const p of n.values) {
            if (typeof p === 'string') { s += p; continue; }
            s += yield this.evFormattedG(p, f);
          }
          return s;
        }
        case 'FormattedValue': return yield this.evFormattedG(n, f);
        case 'ListComp': case 'SetComp': case 'DictComp': return yield this.evCompG(n, f);
        case 'GenExp': {
          const it0 = n.generators[0].iter;
          return this.makeGenExp(n, f, it0.pure ? this.ev(it0, f) : yield this.evg(it0, f));
        }
        case 'NamedExpr': { const v = n.value.pure ? this.ev(n.value, f) : yield this.evg(n.value, f); this.storeName(n.target, v, f); return v; }
        case 'Lambda': {
          const p = n.params;
          const defs = []; for (const d of p.defaults) defs.push(d.pure ? this.ev(d, f) : yield this.evg(d, f));
          const kwd = []; for (const d of p.kwdefaults) kwd.push(d === null ? undefined : d.pure ? this.ev(d, f) : yield this.evg(d, f));
          return this.makeFunction(n, f, defs, kwd);
        }
        default: return this.ev0(n, f);
      }
    } catch (e) {
      if (n.ml === true) this.markLine(e, n, f);
      throw e;
    }
  }
  *evFormattedG(p, f) {
    let v = p.value.pure ? this.ev(p.value, f) : yield this.evg(p.value, f);
    if (p.conversion === 'r') v = repr(v);
    else if (p.conversion === 's') v = this.toStr(v);
    else if (p.conversion === 'a') v = asciiRepr(repr(v));
    let spec = '';
    if (p.spec) for (const q of p.spec.values) spec += typeof q === 'string' ? q : yield this.evFormattedG(q, f);
    return this.formatField(p, v, spec, f);
  }
  *evSliceG(s, f) {
    if (s.t !== 'Slice') return s.pure ? this.ev(s, f) : yield this.evg(s, f);
    const g = (x) => x;
    void g;
    const lo = s.lower ? (s.lower.pure ? this.ev(s.lower, f) : yield this.evg(s.lower, f)) : null;
    const up = s.upper ? (s.upper.pure ? this.ev(s.upper, f) : yield this.evg(s.upper, f)) : null;
    const st = s.step ? (s.step.pure ? this.ev(s.step, f) : yield this.evg(s.step, f)) : null;
    return new PySlice(lo, up, st);
  }
  *evEltsG(elts, f, listExtend) {
    const out = [];
    for (const e of elts) {
      if (e.t === 'Starred') this.extendStar(out, e.value.pure ? this.ev(e.value, f) : yield this.evg(e.value, f), listExtend); else out.push(e.pure ? this.ev(e, f) : yield this.evg(e, f));
    }
    return out;
  }
  *evCallG(n, f) {
    let fn;
    if (n.func.t === 'Attribute') {
      const o = n.func.value.pure ? this.ev(n.func.value, f) : yield this.evg(n.func.value, f);
      fn = getAttribute(this, o, n.func.attr);
    } else fn = n.func.pure ? this.ev(n.func, f) : yield this.evg(n.func, f);
    const args = [];
    let kw = null;
    for (const a of n.args) {
      if (a.t === 'Starred') this.pushStar(args, a.value.pure ? this.ev(a.value, f) : yield this.evg(a.value, f), fn, n.args.length > 1);
      else args.push(a.pure ? this.ev(a, f) : yield this.evg(a, f));
    }
    for (const k of n.keywords) kw = this.addKw(kw, k, k.value.pure ? this.ev(k.value, f) : yield this.evg(k.value, f), fn);
    if (this.freshArgCall(fn, args, n, f)) return withFreshNaN(() => this.callSync(fn, args, kw));
    return yield this.callG(fn, args, kw, n);
  }

  // ================================================================== calls
  *callG(fn, args, kw, node) {
    if (fn instanceof PyFunction) return yield this.callFunction(fn, args, kw, node);
    if (fn instanceof PyBuiltin) {
      if (fn.gen) return yield (fn.self === undefined ? fn.fn(this, args, kw) : fn.fn(this, fn.self, args, kw));
      return fn.self === undefined ? fn.fn(this, args, kw) : fn.fn(this, fn.self, args, kw);
    }
    return this.callOther(fn, args, kw);
  }
  callOther(fn, args, kw) {
    if (fn instanceof PyType) return callType(this, fn, args, kw);
    if (fn instanceof PyGenericAlias) return this.callSync(fn.origin, args, kw);
    if (fn instanceof PyBoundMethod) return this.callSync(fn.fn, [fn.self, ...args], kw);
    throw pyErr('TypeError', `'${typeName(fn)}' object is not callable`);
  }
  /** call any callable synchronously (used by builtins such as sorted(key=...), map, filter) */
  callSync(fn, args, kw) {
    if (fn instanceof PyBuiltin && !fn.gen) return fn.self === undefined ? fn.fn(this, args, kw) : fn.fn(this, fn.self, args, kw);
    if (!(fn instanceof PyFunction) && !(fn instanceof PyBuiltin)) return this.callOther(fn, args, kw);
    const d = new Driver(this.callG(fn, args, kw, null));
    this.syncDepth++;
    try {
      let r = d.resume(undefined);
      while (!r.done) {
        const ev = r.event;
        if (ev.kind === 'output' || ev.kind === 'input') this.pending.push(ev);
        r = d.resume(undefined);
      }
      return r.value;
    } finally { this.syncDepth--; }
  }

  makeFunction(def, f, defaults, kwdefaults) {
    const fn = new PyFunction(def, f, this);
    if (def.t === 'Lambda') { fn.name = '<lambda>'; }
    fn.qualname = (f.func ? f.func.qualname + '.<locals>.' : '') + fn.name;
    fn.defaults = defaults;
    fn.kwdefaults = kwdefaults;
    fn.globals = f.globals;
    fn.closure = f;
    if (f.cv.length) fn.cv = f.cv.slice();
    return fn;
  }

  bindArgs(fn, args, kw) {
    const def = fn.def, p = def.params;
    const qn = fn.qualname;
    const locals = new Map();
    const nargs = p.args.length;
    const npos = args.length;
    const take = Math.min(npos, nargs);
    for (let i = 0; i < take; i++) locals.set(p.args[i].name, args[i]);
    let extraKw = null;
    if (p.kwarg) extraKw = new PyDict();
    if (kw) {
      for (const key in kw) {
        let idx = -1;
        for (let i = p.posonly; i < nargs; i++) if (p.args[i].name === key) { idx = i; break; }
        let isKwOnly = false;
        if (idx < 0) for (let i = 0; i < p.kwonly.length; i++) if (p.kwonly[i].name === key) { isKwOnly = true; break; }
        if (idx < 0 && !isKwOnly) {
          if (extraKw) { extraKw.set(key, kw[key]); continue; }
          if (p.posonly) {
            // CPython positional_only_passed_as_keyword(): every keyword of the call naming a positional-only
            // parameter, in parameter order
            const conflicts = [];
            for (let i = 0; i < p.posonly; i++) for (const k2 in kw) if (k2 === p.args[i].name) conflicts.push(k2);
            if (conflicts.length) throw pyErr('TypeError', `${qn}() got some positional-only arguments passed as keyword arguments: '${conflicts.join(', ')}'`);
          }
          const cands = [...p.args.slice(p.posonly).map((a) => a.name), ...p.kwonly.map((a) => a.name)];
          const sug = suggestName(cands, key);
          throw pyErr('TypeError', `${qn}() got an unexpected keyword argument '${key}'` + (sug ? `. Did you mean '${sug}'?` : ''));
        }
        if (locals.has(key)) throw pyErr('TypeError', `${qn}() got multiple values for argument '${key}'`);
        locals.set(key, kw[key]);
      }
    }
    if (npos > nargs && !p.vararg) {
      let kwonlyGiven = 0;
      for (const a of p.kwonly) if (locals.has(a.name)) kwonlyGiven++;
      const defcount = fn.defaults.length;
      let sig, plural;
      if (defcount) { sig = `from ${nargs - defcount} to ${nargs}`; plural = true; } else { sig = String(nargs); plural = nargs !== 1; }
      const kwsig = kwonlyGiven ? ` positional argument${npos !== 1 ? 's' : ''} (and ${kwonlyGiven} keyword-only argument${kwonlyGiven !== 1 ? 's' : ''})` : '';
      throw pyErr('TypeError', `${qn}() takes ${sig} positional argument${plural ? 's' : ''} but ${npos}${kwsig} ${npos === 1 && !kwonlyGiven ? 'was' : 'were'} given`);
    }
    // defaults / missing
    const firstDefault = nargs - fn.defaults.length;
    const missing = [];
    for (let i = 0; i < nargs; i++) {
      const nm = p.args[i].name;
      if (locals.has(nm)) continue;
      if (i >= firstDefault) locals.set(nm, fn.defaults[i - firstDefault]);
      else missing.push(nm);
    }
    if (missing.length) throw pyErr('TypeError', `${qn}() missing ${missing.length} required positional argument${missing.length === 1 ? '' : 's'}: ${joinNames(missing)}`);
    const kwMissing = [];
    for (let i = 0; i < p.kwonly.length; i++) {
      const nm = p.kwonly[i].name;
      if (locals.has(nm)) continue;
      const d = fn.kwdefaults[i];
      if (d !== undefined) locals.set(nm, d); else kwMissing.push(nm);
    }
    if (kwMissing.length) throw pyErr('TypeError', `${qn}() missing ${kwMissing.length} required keyword-only argument${kwMissing.length === 1 ? '' : 's'}: ${joinNames(kwMissing)}`);
    // order locals like CPython's co_varnames: positional parameters, keyword-only ones, *args, **kwargs
    const ordered = new Map();
    for (const a of p.args) ordered.set(a.name, locals.get(a.name));
    for (const a of p.kwonly) ordered.set(a.name, locals.get(a.name));
    if (p.vararg) ordered.set(p.vararg.name, new PyTuple(args.slice(nargs)));
    if (p.kwarg) ordered.set(p.kwarg.name, extraKw);
    return ordered;
  }

  *callFunction(fn, args, kw, node) {
    // evalExpression / reduceExpression: a function of the program runs as a copy (or is refused, calls: false)
    if (this.foreignCall && fn.interp !== this) fn = this.foreignCall(fn);
    const def = fn.def;
    const locals = this.bindArgs(fn, args, kw);
    if (this.frames.length >= this.recLimit) throw pyErr('RecursionError', 'maximum recursion depth exceeded');
    const fr = new Frame(fn.name, fn, locals, fn.globals);
    fr.fid = this.nextFid();
    fr.line = def.line;
    const caller = this.frames[this.frames.length - 1];
    // the caller is at the line of the call itself (CPython f_lineno), e.g. the 2nd line of `y = (1 +\n  f(2))`
    if (caller && node && node.line) caller.line = nodeLoc(node).line;
    const callLine = caller ? caller.line : 0;
    this.frames.push(fr);
    const quiet = this.syncDepth > 0;
    // opts.syncCallEvents: a call made by a builtin (sorted(key=f), map(f, ...)) also reports call / return events
    // (sync: true), queued like its output events; they arrive after the step, when the frame has already gone
    const report = quiet && this.syncCallEvents;
    try {
      if (!quiet || report) {
        const argViews = [];
        for (const [k, v] of locals) argViews.push({ name: k, value: this.view(v) });
        const ev = { kind: 'call', name: fn.name, qualname: fn.qualname, line: callLine, defLine: def.line, args: argViews, depth: this.frames.length - 1 };
        if (node && node.t === 'Call' && node.col != null) {
          // where the call expression is: col (JS string index on `line`, when it starts there) and its whole span
          const span = { line: node.line, col: jsColumn(this.lines[node.line - 1], node.col) };
          if (node.endLine != null) { span.endLine = node.endLine; span.endCol = jsColumn(this.lines[node.endLine - 1], node.endCol); }
          if (node.line === callLine) ev.col = span.col;
          ev.span = span;
        }
        if (report) { ev.sync = true; this.pending.push(ev); } else yield ev;
      }
      let ret;
      if (def.t === 'Lambda') {
        try { ret = def.body.pure ? this.ev(def.body, fr) : yield this.evg(def.body, fr); } catch (e) { if (e instanceof PyExc) this.addTb(e, fr, nodeLoc(def.body)); throw e; }
      } else {
        const c = yield this.execBlock(def.body, fr);
        ret = c === RET ? fr.ret : null;
      }
      // line: the statement that returned (CPython's f_lineno at RETURN_VALUE: the start of the return statement or of
      // the last statement run, not a call made inside it on a later line)
      if (!quiet) yield { kind: 'return', name: fn.name, qualname: fn.qualname, value: this.view(ret), line: fr.stmtLine ?? fr.line, callLine, depth: this.frames.length - 1 };
      else if (report) this.pending.push({ kind: 'return', name: fn.name, qualname: fn.qualname, value: this.view(ret), line: fr.stmtLine ?? fr.line, callLine, depth: this.frames.length - 1, sync: true });
      return ret;
    } catch (e) {
      // the frame is left because of an exception: like sys.settrace's 'return' event (value None), so a call
      // stack built from call / return events stays balanced; line = where the exception passed through this frame
      if (e instanceof PyExc && (!quiet || report)) {
        const ent = e.tb.find((t) => t.frame === fr);
        const ev = { kind: 'return', name: fn.name, qualname: fn.qualname, value: this.view(null), line: ent ? ent.line : (fr.stmtLine ?? fr.line), callLine, depth: this.frames.length - 1, unwind: true };
        if (report) { ev.sync = true; this.pending.push(ev); } else yield ev;
      }
      throw e;
    } finally {
      this.frames.pop();
    }
  }

  // ================================================================== imports
  doImport(s, f) {
    for (const a of s.names) {
      const mod = importModule(this, a.name);
      if (a.asname) this.storeByName(a.asname, mod, f);
      else {
        const top = a.name.split('.')[0];
        this.storeByName(top, importModule(this, top), f);
      }
    }
  }
  doImportFrom(s, f) {
    if (s.level) throw pyErr('ImportError', 'attempted relative import with no known parent package');
    const mod = importModule(this, s.module);
    for (const a of s.names) {
      if (a.name === '*') {
        for (const [k, v] of mod.dict) if (!k.startsWith('_')) this.storeByName(k, v, f);
        if (mod.hostObj) {
          // the methods of a host module object's class
          for (let p = Object.getPrototypeOf(mod.hostObj); p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
            for (const k of Object.getOwnPropertyNames(p)) {
              if (k === 'constructor' || k.startsWith('_') || mod.dict.has(k)) continue;
              const v = this.hostModuleGetAttr(mod, k);
              if (v !== undefined) this.storeByName(k, v, f);
            }
          }
        }
        continue;
      }
      let v = mod.dict.get(a.name);
      // a host module object may keep its functions on its class (methods on the prototype)
      if (v === undefined && mod.hostObj) v = this.hostModuleGetAttr(mod, a.name);
      if (v === undefined) {
        try { v = importModule(this, s.module + '.' + a.name); } catch (e) { v = undefined; }
      }
      if (v === undefined) {
        const loc = mod.file ? `(${mod.file})` : '(unknown location)';
        const e = pyErr('ImportError', `cannot import name '${a.name}' from '${s.module}' ${loc}`);
        const names = [...mod.dict.keys()].filter((k) => typeof k === 'string' && (a.name.startsWith('_') || !k.startsWith('_'))).sort();
        const sug = suggestName(names, a.name);
        if (sug) e.suggestion = `. Did you mean: '${sug}'?`;
        throw e;
      }
      this.storeByName(a.asname || a.name, v, f);
    }
  }

  // ================================================================== eval()
  /** eval(source[, globals[, locals]]) for an expression string, evaluated in the calling frame's namespaces */
  evalBuiltin(args, kw) {
    const a = args.slice();
    if (kw) for (const k in kw) { if (k === 'globals') a[1] = kw[k]; else if (k === 'locals') a[2] = kw[k]; else throw unexpectedKw('eval', k, ['globals', 'locals']); }
    if (!args.length) throw pyErr('TypeError', 'eval expected at least 1 argument, got 0');
    if (args.length > 3) throw pyErr('TypeError', `eval expected at most 3 arguments, got ${args.length}`);
    const src = a[0];
    if (typeof src !== 'string') throw pyErr('TypeError', 'eval() arg 1 must be a string, bytes or code object');
    const caller = this.frames[this.frames.length - 1];
    const toMap = (d, what) => {
      if (d === undefined || d === null) return null;
      if (!(d instanceof PyDict)) throw pyErr('TypeError', what === 'globals' ? `globals must be a real dict; try eval(expr, {}, mapping)` : 'locals must be a mapping');
      if (d instanceof PyNsDict) return d.ns;
      const m = new Map(); for (const [k, v] of d.entries()) if (typeof k === 'string') m.set(k, v); return m;
    };
    const g = toMap(a[1], 'globals') || caller.globals;
    const l = toMap(a[2], 'locals') || (a[1] != null ? g : caller.locals);
    const text = src.replace(/^[ \t]+/, '');
    // nothing to parse at all: CPython reports line 0 (offset 0, text '')
    const p = text === '' ? { ok: false, error: { type: 'SyntaxError', msg: 'invalid syntax', line: 0, col: 0, endLine: 0, endCol: 0 } } : parseExpressionSource(text);
    if (!p.ok) {
      const err = p.error;
      const e = pyErr(err.type, err.msg);
      const rawLines = text.split('\n');
      e.syntaxInfo = { filename: '<string>', line: err.line, col: err.col, endLine: err.endLine, endCol: err.endCol, text: err.line === 0 ? '' : err.line >= 1 && err.line <= rawLines.length ? rawLines[err.line - 1] + (err.line < rawLines.length ? '\n' : '') : null };
      throw e;
    }
    annotateLoose(p.ast);
    annotateEvalExpr(p.ast);
    const ef = new Frame('<module>', null, l, g);
    ef.fid = this.nextFid();
    ef.file = '<string>';
    ef.line = p.ast.line || 1;
    this.frames.push(ef);
    try { return this.ev(p.ast, ef); } catch (e) {
      // the line inside the evaluated string: eval("\n\n10 // 0") fails in File "<string>", line 3
      if (e instanceof PyExc) this.addTb(e, ef, nodeLoc(p.ast));
      throw e;
    } finally { this.frames.pop(); }
  }

  // ================================================================== input / output
  emitOutput(text) {
    this.out += text;
    this.stdoutText += text;
    return { kind: 'output', text };
  }
  /** text written to sys.stderr: part of the console text (out), not of the program's stdout */
  emitStderr(text) {
    this.out += text;
    return { kind: 'output', text, stderr: true };
  }
  /** next answer for input(): a string, null (EOF) or undefined (none yet: wait) */
  takeInput(prompt) {
    const src = this.inputs;
    if (typeof src === 'function') {
      if (this.inputQueue.length) return this.inputQueue.shift();
      const v = src(prompt);
      if (v === null || v === undefined) return undefined;
      const lines = inputLines(v);
      this.inputQueue.push(...lines.slice(1));
      return lines[0];
    }
    if (this.inputPos < src.length) return src[this.inputPos++];
    return this.eofWhenExhausted ? null : undefined;
  }
  /** queue answers for later input() calls (provideInput before the program asks) */
  queueInput(text) {
    const lines = inputLines(text);
    if (typeof this.inputs === 'function') this.inputQueue.push(...lines); else this.inputs.push(...lines);
  }

  // ================================================================== host values
  hostGetAttr(h, name) { return hostGetAttr(this, h, name); }
  hostDunder(h, name, args) { return hostDunderCall(h, name, args || []); }
  hostAttrNames(h) { return hostAttrNames(h.obj); }
  hostTypeGetAttr(t, name) { return hostTypeGetAttr(this, t, name); }
  hostSetAttr(h, name, v) { hostSetAttr(this, h, name, v); }
  hostModuleGetAttr(m, name) { return hostModuleGetAttr(this, m, name); }
  hostModuleSetAttr(m, name, v) { hostModuleSetAttr(this, m, name, v); }
  toHost(v) { return toHost(this, v); }
  fromHost(v) { return fromHost(this, v); }
  view(v) { return this.viewer ? this.viewer(v) : { type: typeOf(v).name, repr: repr(v), id: 0 }; }
}

/** expressions evaluated outside a compiled module (evalExpression, eval()): names resolve dynamically
 * (locals → globals → builtins); comprehensions and lambdas still get their scopes from the analyzer */
export function annotateLoose(n) {
  if (!n || typeof n !== 'object') return;
  if (Array.isArray(n)) { for (const x of n) annotateLoose(x); return; }
  if (n.t === 'Lambda' || n.t === 'ListComp' || n.t === 'SetComp' || n.t === 'DictComp' || n.t === 'GenExp') {
    const mod = { t: 'Module', body: [{ t: 'Expr', value: n, line: n.line || 1, col: 0 }] };
    analyze(mod);
    return;
  }
  for (const k in n) { if (k !== 'scope') { const v = n[k]; if (v && typeof v === 'object') annotateLoose(v); } }
}
/** last source line of a block of statements */
function blockEnd(stmts, dflt) {
  const last = stmts && stmts[stmts.length - 1];
  if (!last) return dflt;
  for (const k of ['finalbody', 'orelse', 'handlers', 'cases', 'body']) {
    const b = last[k];
    if (Array.isArray(b) && b.length) {
      if (k === 'handlers' || k === 'cases') { const h = b[b.length - 1]; return blockEnd(h.body, h.line); }
      if (k === 'orelse' && last.t === 'If' && b.length === 1 && b[0].t === 'If') return blockEnd(b, last.line);
      return blockEnd(b, last.line);
    }
  }
  return last.endLine ?? last.line;
}
/**
 * CPython's location of the instruction a node compiles to: { line, endLine, anchors }. An attribute (or method
 * call) whose name is on a later line starts at the name (update_start_location_to_match_attr). anchors: where the
 * traceback looks for the operator / '(' / '[' when it abbreviates a long multi-line expression.
 */
const xlocs = new WeakMap();
/** CPython LOC(e): the whole extent of an expression (GET_ITER, an assert's RAISE_VARARGS, UNPACK_SEQUENCE...) */
export function exprLoc(n) {
  let loc = xlocs.get(n);
  if (loc) return loc;
  const end = n.endLine ?? n.line;
  loc = { line: n.line, endLine: end };
  if (end > n.line) {
    if (n.t === 'BinOp') loc.anchors = { kind: 'binop', line: n.left.endLine, col: n.left.endCol };
    else if (n.t === 'Call') loc.anchors = { kind: 'call', line: n.func.endLine, col: n.func.endCol, endLine: end };
    else if (n.t === 'Subscript') loc.anchors = { kind: 'sub', line: n.value.endLine, col: n.value.endCol, endLine: end };
  }
  xlocs.set(n, loc);
  return loc;
}
/** code point column → JS string index (UTF-16) in `text` */
export function jsColumn(text, col) {
  if (!text || col <= 0 || !/[\uD800-\uDFFF]/.test(text)) return col;
  let i = 0;
  for (let k = 0; k < col && i < text.length; k++) i += text.codePointAt(i) > 0xffff ? 2 : 1;
  return i;
}
/**
 * col / endLine / endCol of a step: a simple statement's own span, or a compound statement's header up to its ':'
 * (if / elif / while test, for ... in iterable, def header, except clause, match subject, case pattern and guard)
 */
function stepSpan(ev, s, lines) {
  if (s.col == null) return;
  const el = s.hdEndLine != null ? s.hdEndLine : s.endLine;
  const ec = s.hdEndLine != null ? s.hdEndCol : s.endCol;
  ev.col = jsColumn(lines[s.line - 1], s.col);
  if (el != null && ec != null && el >= s.line) { ev.endLine = el; ev.endCol = jsColumn(lines[el - 1], ec); }
}
export function nodeLoc(n) {
  if (n._loc) return n._loc;
  let loc;
  const end = n.endLine ?? n.line;
  if (n.t === 'Attribute' && end !== n.line) loc = { line: end, endLine: end };
  else if (n.t === 'Call' && n.func.t === 'Attribute' && (n.func.endLine ?? n.func.line) !== n.line) loc = { line: n.func.endLine, endLine: end };
  else loc = { line: n.line, endLine: end };
  if (loc.endLine > loc.line) {
    if (n.t === 'BinOp') loc.anchors = { kind: 'binop', line: n.left.endLine, col: n.left.endCol };
    else if (n.t === 'Call') loc.anchors = { kind: 'call', line: n.func.endLine, col: n.func.endCol, endLine: end };
    else if (n.t === 'Subscript') loc.anchors = { kind: 'sub', line: n.value.endLine, col: n.value.endCol, endLine: end };
  }
  n._loc = loc;
  return loc;
}
function joinNames(names) {
  const q = names.map((n) => `'${n}'`);
  if (q.length === 1) return q[0];
  if (q.length === 2) return q[0] + ' and ' + q[1];
  return q.slice(0, -2).join(', ') + ', ' + q[q.length - 2] + ', and ' + q[q.length - 1];
}
export function asciiRepr(s) {
  let out = '';
  for (const ch of s) {
    const c = ordOf(ch);
    if (c < 128) out += ch;
    else if (c < 0x100) out += '\\x' + c.toString(16).padStart(2, '0');
    else if (c < 0x10000) out += '\\u' + c.toString(16).padStart(4, '0');
    else out += '\\U' + c.toString(16).padStart(8, '0');
  }
  return out;
}
export { typeOf, PyModule };
