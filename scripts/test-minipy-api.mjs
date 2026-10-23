#!/usr/bin/env node
// API tests for src/lib/minipy.js: stepping events, snapshots (frames, locals, ids), input waiting, step limit,
// host modules, seeding, evalExpression / reduceExpression / tokenize helpers.
//   node scripts/test-minipy-api.mjs [-v]
import {
  compile, createRun, pyRepr, pyStr, typeName, tokenize, evalExpression, reduceExpression, KEYWORDS, BUILTIN_NAMES, pyMath,
  unicodeNamesReady,
} from '../src/lib/minipy.js';
import { setViewCache } from '../src/lib/minipy/views.js';
import { highlight as cpHighlight } from '../src/lib/codepanel.js';

const verbose = process.argv.includes('-v');
let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(); pass++; if (verbose) console.log('ok  ', name); } catch (e) { fail++; console.log('FAIL', name, '\n     ', e && e.message ? e.message : e); }
}
function eq(actual, expected, msg = '') {
  const a = JSON.stringify(actual), b = JSON.stringify(expected);
  if (a !== b) throw new Error(`${msg} expected ${b} but got ${a}`);
}
function ok(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }
// \N{...} before the name table has loaded: a clear SyntaxError, never a wrong "unknown name"; afterwards it works.
// (Runs before any await, so the background import cannot have finished yet.)
const nEscapeEarly = compile('print("\\N{BULLET}")\n');
await unicodeNamesReady;
const nEscapeLate = compile('print("\\N{BULLET}")\n');

function prog(src) { const c = compile(src); if (!c.ok) throw new Error('compile failed: ' + c.error.message); return c.program; }
function brief(ev) {
  switch (ev.kind) {
    case 'line': return 'L' + ev.line;
    case 'call': return `call ${ev.name}`;
    case 'return': return `return ${ev.name} ${ev.value.repr}`;
    case 'output': return `out ${JSON.stringify(ev.text)}`;
    case 'input': return `input${ev.wait ? ' wait' : ''}`;
    case 'exception': return `exc ${ev.error.type}`;
    default: return ev.kind;
  }
}
function allEvents(run, limit = 10000) {
  const out = [];
  for (let i = 0; i < limit; i++) {
    const ev = run.step();
    out.push(ev);
    if (ev.kind === 'done' || ev.kind === 'exception' || run.status === 'waiting-input') break;
  }
  return out;
}

// ------------------------------------------------------------------ compile
test('compile ok exposes program and lines', () => {
  const c = compile('x = 1\nprint(x)\n');
  ok(c.ok && c.program, 'ok'); eq(c.lines, ['x = 1', 'print(x)']);
});
test('compile reports SyntaxError like CPython', () => {
  const c = compile('nilai = 80\nif nilai >= 75\n    print("Lulus")\n');
  eq([c.ok, c.error.type, c.error.message, c.error.line], [false, 'SyntaxError', "expected ':'", 2]);
  ok(c.error.traceback.includes('File "main.py", line 2') && c.error.traceback.endsWith("SyntaxError: expected ':'"), c.error.traceback);
  eq(c.error.text, 'if nilai >= 75');
});
test('compile reports IndentationError', () => {
  const c = compile('if True:\nprint(1)\n');
  eq([c.error.type, c.error.message, c.error.line], ['IndentationError', "expected an indented block after 'if' statement on line 1", 2]);
});
test('unsupported syntax gives a clear SyntaxError', () => {
  const c = compile('class Siswa:\n    pass\n');
  eq([c.error.type, c.error.message], ['SyntaxError', "minipy does not support 'class' yet"]);
});
test('custom filename appears in tracebacks', () => {
  const c = compile('x = = 1', { filename: 'latihan.py' });
  ok(c.error.traceback.includes('File "latihan.py", line 1'), c.error.traceback);
});

// ------------------------------------------------------------------ stepping
test('line events: one per simple statement and per loop/if test', () => {
  const run = createRun(prog('x = 1\nfor i in range(2):\n    x += i\nif x > 0:\n    print(x)\nwhile x > 0:\n    x -= 1\n'));
  eq(run.status, 'ready');
  const evs = allEvents(run).map(brief);
  eq(evs, ['L1', 'L2', 'L3', 'L2', 'L3', 'L2', 'L4', 'L5', 'out "2\\n"', 'L6', 'L7', 'L6', 'L7', 'L6', 'done']);
  eq(run.status, 'done');
});
test('elif/else and match-case tests are steps', () => {
  const run = createRun(prog('n = 2\nif n == 1:\n    a = 1\nelif n == 2:\n    a = 2\nelse:\n    a = 3\nmatch n:\n    case 1:\n        b = 1\n    case 2:\n        b = 2\n'));
  eq(allEvents(run).map(brief), ['L1', 'L2', 'L4', 'L5', 'L8', 'L9', 'L11', 'L12', 'done']);
});
test('call and return events with bound arguments', () => {
  const run = createRun(prog('def luas(p, l=2):\n    hasil = p * l\n    return hasil\ny = luas(3)\n'));
  const evs = allEvents(run);
  eq(evs.map(brief), ['L1', 'L4', 'call luas', 'L2', 'L3', 'return luas 6', 'done']);
  const call = evs[2];
  eq([call.line, call.defLine, call.depth, call.args.map((a) => [a.name, a.value.repr, a.value.type])], [4, 1, 1, [['p', '3', 'int'], ['l', '2', 'int']]]);
  eq([evs[5].line, evs[5].callLine], [3, 4]);
});
test('snapshot frames, locals order and line/nextLine', () => {
  const run = createRun(prog('a = 5\ndef f(x):\n    y = x + 1\n    return y\nb = f(a)\n'));
  let snap = null;
  for (;;) { const ev = run.step(); if (ev.kind === 'line' && ev.line === 4) { snap = run.snapshot(); break; } }
  eq(snap.frames.map((f) => f.name), ['<module>', 'f']);
  eq(snap.frames[0].line, 5);
  eq(snap.frames[1].locals.map((l) => [l.name, l.value.repr]), [['x', '5'], ['y', '6']]);
  eq(snap.frames[0].locals.map((l) => l.name), ['a', 'f']);
  eq([snap.line, snap.nextLine, snap.status], [3, 4, 'running']);
  run.runToEnd();
  const end = run.snapshot();
  eq([end.status, end.nextLine, end.frames.length, end.frames[0].locals.find((l) => l.name === 'b').value.repr], ['done', null, 1, '6']);
});
test('snapshot is a deep copy and ids show aliasing', () => {
  const run = createRun(prog('a = [1, 2]\nb = a\nc = [1, 2]\na.append(3)\n'));
  run.step(); run.step(); run.step(); run.step();
  const s1 = run.snapshot();
  run.runToEnd();
  const s2 = run.snapshot();
  const get = (s, n) => s.frames[0].locals.find((l) => l.name === n).value;
  eq(get(s1, 'a').repr, '[1, 2]');
  eq(get(s2, 'a').repr, '[1, 2, 3]');
  ok(get(s2, 'a').id === get(s2, 'b').id && get(s2, 'a').id !== get(s2, 'c').id && get(s2, 'a').id > 0, 'ids');
  eq(get(s1, 'a').id, get(s2, 'a').id, 'stable id');
  eq(get(s2, 'b').items.map((v) => v.repr), ['1', '2', '3']);
  ok(JSON.parse(JSON.stringify(s2)).frames.length === 1, 'serialisable');
});
test('views of dicts, deques and scalars', () => {
  const run = createRun(prog('from collections import deque, Counter\nd = {"a": 1}\nq = deque([1])\nc = Counter("aab")\nx = None\nf = 2.5\n'));
  run.runToEnd();
  const L = Object.fromEntries(run.snapshot().frames[0].locals.map((l) => [l.name, l.value]));
  eq([L.d.type, L.d.entries.map(([k, v]) => [k.repr, v.repr])], ['dict', [["'a'", '1']]]);
  eq([L.q.type, L.q.repr], ['deque', 'deque([1])']);
  eq([L.c.type, L.c.typeName, L.c.repr], ['dict', 'Counter', "Counter({'a': 2, 'b': 1})"]);
  eq([L.x.type, L.x.id, L.f.type, L.deque.type], ['NoneType', 0, 'float', 'object']);
});
test('output events and output text', () => {
  const run = createRun(prog('print("a", end="")\nprint("b")\n'));
  const evs = allEvents(run).map(brief);
  eq(evs, ['L1', 'out "a"', 'L2', 'out "b\\n"', 'done']);
  eq(run.output, 'ab\n');
});

// ------------------------------------------------------------------ input
test('input from array, echoInput true (terminal look)', () => {
  const run = createRun(prog('n = input("Nama: ")\nprint("Halo", n)\n'), { inputs: ['Andi'] });
  run.runToEnd();
  eq(run.output, 'Nama: Andi\nHalo Andi\n');
});
test('input with echoInput false (piped stdin look)', () => {
  const run = createRun(prog('n = input("Nama: ")\nprint("Halo", n)\n'), { inputs: ['Andi'], echoInput: false });
  run.runToEnd();
  eq(run.output, 'Nama: Halo Andi\n');
});
test('waiting-input then provideInput', () => {
  const run = createRun(prog('a = int(input("A: "))\nb = int(input("B: "))\nprint(a + b)\n'));
  let ev = run.runToEnd();
  eq([ev.kind, ev.prompt, ev.wait, run.status], ['input', 'A: ', true, 'waiting-input']);
  eq(run.step().kind, 'input', 'step while waiting returns the same event');
  ok(run.provideInput('2'));
  ev = run.runToEnd();
  eq([ev.kind, run.status], ['input', 'waiting-input']);
  run.provideInput('40');
  ev = run.runToEnd();
  eq([ev.kind, run.output], ['done', 'A: 2\nB: 40\n42\n']);
});
test('inputs as a function; null means wait', () => {
  const answers = ['7'];
  const run = createRun(prog('x = input("x? ")\ny = input("y? ")\nprint(x, y)\n'), { inputs: (p) => (answers.length ? answers.shift() : null) });
  run.runToEnd();
  eq(run.status, 'waiting-input');
  run.provideInput('8');
  run.runToEnd();
  eq(run.output, 'x? 7\ny? 8\n7 8\n');
});
test('eofWhenExhausted raises EOFError like piped stdin', () => {
  const run = createRun(prog('a = input()\nb = input()\n'), { inputs: ['1'], eofWhenExhausted: true });
  const ev = run.runToEnd();
  eq([ev.kind, ev.error.type, ev.error.message, ev.error.line], ['exception', 'EOFError', 'EOF when reading a line', 2]);
});
test('provideInput(null) raises EOFError', () => {
  const run = createRun(prog('a = input()\n'));
  run.runToEnd();
  run.provideInput(null);
  eq(run.runToEnd().error.type, 'EOFError');
});

// ------------------------------------------------------------------ errors and limits
test('exception event, PyError fields and traceback text', () => {
  const run = createRun(prog('def bagi(a, b):\n    return a / b\nprint("mulai")\nprint(bagi(1, 0))\n'));
  const ev = run.runToEnd();
  eq([ev.kind, run.status, ev.error.type, ev.error.message, ev.error.line, ev.error.text], ['exception', 'error', 'ZeroDivisionError', 'division by zero', 2, '    return a / b']);
  eq(ev.error.frames, [{ name: '<module>', line: 4 }, { name: 'bagi', line: 2 }]);
  eq(ev.error.traceback, 'Traceback (most recent call last):\n  File "main.py", line 4, in <module>\n    print(bagi(1, 0))\n  File "main.py", line 2, in bagi\n    return a / b\nZeroDivisionError: division by zero');
  ok(run.output.startsWith('mulai\nTraceback') && run.output.endsWith('division by zero\n'), run.output);
  eq(run.stdout, 'mulai\n');
  const s = run.snapshot();
  eq([s.status, s.error.type, s.frames.map((f) => f.name)], ['error', 'ZeroDivisionError', ['<module>', 'bagi']]);
  eq(s.frames[1].locals.map((l) => l.name + '=' + l.value.repr), ['a=1', 'b=0']);
});
test('NameError message includes the 3.13 suggestion', () => {
  const run = createRun(prog('total = 0\ntotal = totl + 1\n'));
  const ev = run.runToEnd();
  eq(ev.error.message, "name 'totl' is not defined. Did you mean: 'total'?");
  ok(ev.error.traceback.endsWith("NameError: name 'totl' is not defined. Did you mean: 'total'?"));
});
test('maxSteps stops infinite loops with StepLimit', () => {
  const run = createRun(prog('n = 0\nwhile True:\n    n += 1\n'), { maxSteps: 1000 });
  const ev = run.runToEnd();
  eq([ev.kind, ev.error.type, ev.error.message, run.status], ['exception', 'StepLimit', "the simulator stopped the program after 1000 steps (the simulator's step limit, not a Python error; python3 has no such limit): a loop that never ends, or a program longer than the limit", 'error']);
  eq([ev.error.simulatorLimit, ev.error.limit, ev.error.limitKind], [true, 1000, 'steps']);
  ok(ev.error.line === 2 || ev.error.line === 3, 'line');
});
test('StepLimit cannot be caught by try/except', () => {
  const run = createRun(prog('while True:\n    try:\n        pass\n    except:\n        pass\n'), { maxSteps: 500 });
  eq(run.runToEnd().error.type, 'StepLimit');
});
test('exit() ends the run normally', () => {
  const run = createRun(prog('print(1)\nexit()\nprint(2)\n'));
  eq([run.runToEnd().kind, run.status, run.output], ['done', 'done', '1\n']);
});
test('RecursionError at depth 1000 like CPython', () => {
  const run = createRun(prog('def f(n):\n    return f(n + 1)\nf(0)\n'), { maxSteps: 1e6 });
  const ev = run.runToEnd();
  eq([ev.error.type, ev.error.message, ev.error.line, ev.error.frames.length], ['RecursionError', 'maximum recursion depth exceeded', 2, 1000]);
});
test('100k simple steps run well under 2 s', () => {
  const run = createRun(prog('total = 0\nfor i in range(50000):\n    total += i\nprint(total)\n'), { maxSteps: 200000 });
  const t = Date.now();
  run.runToEnd();
  const ms = Date.now() - t;
  eq([run.status, run.output], ['done', '1249975000\n']);
  ok(run.snapshot().steps >= 100000, 'steps');
  ok(ms < 2000, `took ${ms} ms`);
});

// ------------------------------------------------------------------ seed and host modules
test('seed option seeds random like random.seed(seed)', () => {
  const run = createRun(prog('import random\nprint(random.random(), random.randint(1, 10))\n'), { seed: 42 });
  run.runToEnd();
  eq(run.output, '0.6394267984578837 1\n');
});
test('host module: functions, kwargs, objects with methods, return conversion', () => {
  const log = [];
  const turtle = {
    Turtle() {
      const t = { x: 0, __pyname: 'turtle.Turtle' };
      t.forward = (d) => { log.push(['fd', d]); t.x += d; };
      t.left = (a) => { log.push(['lt', a]); };
      t.position = () => ({ __tuple: [{ __float: t.x }, { __float: 0 }] });
      t.xcor = () => ({ __float: t.x });
      t.color = (...args) => { log.push(['color', ...args]); };
      return t;
    },
    done() { log.push(['done']); },
    speed(s) { log.push(['speed', s]); return null; },
  };
  const run = createRun(prog('import turtle\nt = turtle.Turtle()\nt.color("green", fill="red")\nfor i in range(2):\n    t.forward(100.5)\n    t.left(90)\nprint(t.position(), t.xcor(), t.x, type(t).__name__)\nturtle.speed(3)\nturtle.done()\n'), { modules: { turtle } });
  const ev = run.runToEnd();
  eq(ev.kind, 'done', ev.error && ev.error.traceback);
  eq(log, [['color', 'green', { __kwargs: { fill: 'red' } }], ['fd', 100.5], ['lt', 90], ['fd', 100.5], ['lt', 90], ['speed', 3], ['done']]);
  eq(run.output, '(201.0, 0.0) 201.0 201 Turtle\n');
});
test('host module with dotted name (matplotlib.pyplot)', () => {
  const calls = [];
  const plt = {
    plot: (...a) => { calls.push(['plot', ...a]); },
    title: (s) => { calls.push(['title', s]); },
    show: () => { calls.push(['show']); },
  };
  const run = createRun(prog('import matplotlib.pyplot as plt\nfrom matplotlib import pyplot\nimport matplotlib\nplt.plot(["U-1", "U-2"], [70, 75.5], marker="o")\npyplot.title("Nilai")\nmatplotlib.pyplot.show()\n'), { modules: { 'matplotlib.pyplot': plt } });
  const ev = run.runToEnd();
  eq(ev.kind, 'done', ev.error && ev.error.traceback);
  eq(calls, [['plot', ['U-1', 'U-2'], [70, 75.5], { __kwargs: { marker: 'o' } }], ['title', 'Nilai'], ['show']]);
});
test('host errors become Python exceptions', () => {
  const mod = { cek(x) { const e = new Error('nilai harus positif'); e.pyType = 'ValueError'; if (x < 0) throw e; return x; }, crash() { throw new Error('boom'); } };
  const run = createRun(prog('import alat\ntry:\n    alat.cek(-1)\nexcept ValueError as e:\n    print("tertangkap:", e)\nalat.crash()\n'), { modules: { alat: mod } });
  const ev = run.runToEnd();
  eq([run.stdout, ev.error.type, ev.error.message, ev.error.line], ['tertangkap: nilai harus positif\n', 'RuntimeError', 'boom', 6]);
});
test('unknown module gives ModuleNotFoundError', () => {
  const run = createRun(prog('import numpy\n'));
  const ev = run.runToEnd();
  eq([ev.error.type, ev.error.message], ['ModuleNotFoundError', "No module named 'numpy'"]);
});

// ------------------------------------------------------------------ helpers
test('evalExpression values, types and errors', () => {
  let r = evalExpression('"5" + "3"');
  eq([r.ok, r.repr, r.type, r.value.type], [true, "'53'", 'str', 'str']);
  r = evalExpression('"5" + 3');
  eq([r.ok, r.error.type, r.error.message], [false, 'TypeError', 'can only concatenate str (not "int") to str']);
  r = evalExpression('int("7.5")');
  eq([r.error.type, r.error.message], ['ValueError', "invalid literal for int() with base 10: '7.5'"]);
  r = evalExpression('type(165.5)');
  eq(r.repr, "<class 'float'>");
  r = evalExpression('x * 2 + y', { x: 21, y: { __float: 0.5 } });
  eq([r.repr, r.type], ['42.5', 'float']);
  r = evalExpression('nilai[1:]', { nilai: [80, 75, 90] });
  eq(r.repr, '[75, 90]');
  r = evalExpression('1 +');
  eq([r.ok, r.error.type], [false, 'SyntaxError']);
});
test('reduceExpression one operator per step', () => {
  eq(reduceExpression('2 + 3 * 4 ** 2').steps, ['2 + 3 * 4 ** 2', '2 + 3 * 16', '2 + 48', '50']);
  eq(reduceExpression('-2 ** 2').steps, ['-2 ** 2', '-(4)', '-4']);
  eq(reduceExpression('2 ** 3 ** 2').steps, ['2 ** 3 ** 2', '2 ** 9', '512']);
  eq(reduceExpression('0 <= x < 10', { x: 5 }).steps, ['0 <= x < 10', '0 <= 5 < 10', 'True and 5 < 10', '5 < 10', 'True']);
  eq(reduceExpression('7 / 2 + 7 // 2 + 7 % 2').steps, ['7 / 2 + 7 // 2 + 7 % 2', '3.5 + 7 // 2 + 7 % 2', '3.5 + 3 + 7 % 2', '6.5 + 7 % 2', '6.5 + 1', '7.5']);
  eq(reduceExpression('0 or "kosong"').steps, ['0 or "kosong"', "'kosong'"]);
  const r = reduceExpression('10 / (5 - 5)');
  eq([r.ok, r.steps, r.error.type], [false, ['10 / (5 - 5)', '10 / 0'], 'ZeroDivisionError']);
});
test('tokenize for highlighting never throws', () => {
  const toks = tokenize('def f(x):  # c\n    return f"{x}" + \'s\' * 2.5\n$ "oops');
  const types = toks.map((t) => t.type);
  ok(types.includes('keyword') && types.includes('fstring') && types.includes('string') && types.includes('number') && types.includes('comment') && types.includes('error'), types.join(','));
  eq(toks.find((t) => t.text === 'def'), { type: 'keyword', text: 'def', line: 1, col: 0 });
  eq(tokenize('print(len(x))').filter((t) => t.type === 'builtin').map((t) => t.text), ['print', 'len']);
  eq(tokenize('match x:\n    case 1:\n        pass\n').filter((t) => t.type === 'keyword').map((t) => t.text), ['match', 'case', 'pass']);
});
test('pyRepr / pyStr / typeName', () => {
  eq([pyRepr(5), pyRepr(2.5), pyRepr('a'), pyRepr([1, 'b', null, true]), pyRepr({ __float: 2 })], ['5', '2.5', "'a'", "[1, 'b', None, True]", '2.0']);
  eq([pyStr('a'), pyStr(0.1 + 0.2), typeName(5), typeName(2.5), typeName('x'), typeName(null), typeName([1])], ['a', '0.30000000000000004', 'int', 'float', 'str', 'NoneType', 'list']);
  const run = createRun(prog('s = "hai"\n')); run.runToEnd();
  const v = run.snapshot().frames[0].locals[0].value;
  eq([pyRepr(v), pyStr(v), typeName(v)], ["'hai'", 'hai', 'str']);
});
test('KEYWORDS and BUILTIN_NAMES', () => {
  eq(KEYWORDS.length, 35);
  ok(KEYWORDS.includes('match') === false && KEYWORDS.includes('True') && KEYWORDS.includes('lambda'), 'keywords');
  ok(['print', 'input', 'len', 'range', 'ValueError'].every((n) => BUILTIN_NAMES.includes(n)), 'builtins');
});

// ------------------------------------------------------------------ regression checks (review round 1)
test('maxSteps also stops infinite comprehensions and generator expressions', () => {
  for (const src of ['xs = [1]\nys = [xs.append(x) for x in xs]\n', 'n = sum(1 for _ in iter(int, 1))\n', 'xs = [i for i in iter(int, 1)]\n', 'ys = [i for i in range(10**9)]\n', 'd = {i: i for i in range(10**9)}\n']) {
    const run = createRun(prog(src), { maxSteps: 1000 });
    const t = Date.now();
    const ev = run.runToEnd();
    eq([ev.kind, ev.error && ev.error.type, run.status], ['exception', 'StepLimit', 'error'], src);
    ok(Date.now() - t < 3000, `${src} took ${Date.now() - t} ms`);
  }
});
test('an exception that unwinds a user frame sends a return event (value None, unwind: true)', () => {
  const run = createRun(prog('def f(x):\n    return 10 / x\ntry:\n    f(0)\nexcept ZeroDivisionError:\n    print("caught")\nprint("end")\n'));
  const evs = allEvents(run);
  eq(evs.map(brief), ['L1', 'L3', 'L4', 'call f', 'L2', 'return f None', 'L5', 'L6', 'out "caught\\n"', 'L7', 'out "end\\n"', 'done']);
  const r = evs.find((e) => e.kind === 'return');
  eq([r.unwind, r.line, r.callLine], [true, 2, 4]);
  const run2 = createRun(prog('def g():\n    raise ValueError("x")\ndef h():\n    g()\nh()\n'));
  eq(allEvents(run2).map(brief), ['L1', 'L3', 'L5', 'call h', 'L4', 'call g', 'L2', 'return g None', 'return h None', 'exc ValueError']);
});
test('reduceExpression does not evaluate short-circuited operands', () => {
  let r = reduceExpression('x > 0 or undefined_name', { x: 10 });
  eq([r.ok, r.steps[r.steps.length - 1]], [true, 'True']);
  r = reduceExpression('x if x > y else undefined_name', { x: 10, y: 3 });
  eq([r.ok, r.steps[r.steps.length - 1]], [true, '10']);
  r = reduceExpression('x < 0 and undefined_name', { x: 10 });
  eq([r.ok, r.steps[r.steps.length - 1]], [true, 'False']);
  r = reduceExpression('x > 0 and undefined_name', { x: 10 });
  eq([r.ok, r.error.type], [false, 'NameError']);
});
test('evalExpression keeps the type of deque / Counter / OrderedDict Views', () => {
  const run = createRun(prog('from collections import deque, Counter, OrderedDict\nq = deque([1, 2])\nc = Counter("aab")\no = OrderedDict(a=1)\n'));
  run.runToEnd();
  const L = run.snapshot().frames[0].locals;
  const v = (n) => L.find((l) => l.name === n).value;
  eq(evalExpression('type(v).__name__ + repr(v)', { v: v('q') }).value.repr, "'dequedeque([1, 2])'");
  eq(evalExpression('type(v).__name__', { v: v('c') }).value.repr, "'Counter'");
  eq(evalExpression('v.most_common(1)', { v: v('c') }).value.repr, "[('a', 2)]");
  eq(evalExpression('type(v).__name__', { v: v('o') }).value.repr, "'OrderedDict'");
});
test('a host object returned twice is one Python object', () => {
  const S = { __pyname: 'Screen', bgcolor() {} };
  const m = { Screen: () => S, same: (x) => x, Turtle: () => ({ __pyname: 'Turtle', fd() {} }) };
  const run = createRun(prog('import turtle\na = turtle.Screen()\nb = turtle.Screen()\nt = turtle.Turtle()\nprint(a is b, id(a) == id(b), t is turtle.same(t), a is t)\n'), { modules: { turtle: m } });
  run.runToEnd();
  eq(run.output, 'True True True False\n');
  const L = run.snapshot().frames[0].locals;
  const id = (n) => L.find((l) => l.name === n).value.id;
  ok(id('a') === id('b') && id('a') !== id('t'), 'view ids');
});
test('call events and the caller frame use the line of the call', () => {
  const run = createRun(prog('def f(x):\n    return x\ndata = [\n    f(1),\n    f(2),\n]\ny = (1 +\n     f(3))\n'));
  const lines = [], callerLines = [];
  for (;;) {
    const ev = run.step();
    if (ev.kind === 'call') { lines.push(ev.line); callerLines.push(run.snapshot().frames[0].line); }
    if (ev.kind === 'done' || ev.kind === 'exception') break;
  }
  eq([lines, callerLines], [[4, 5, 8], [4, 5, 8]]);
});
test('snapshot().line after an uncaught error is the statement that raised it', () => {
  let run = createRun(prog('x = 1\ny = x / 0\n'));
  run.runToEnd();
  eq([run.snapshot().line, run.snapshot().nextLine, run.snapshot().error.line], [2, null, 2]);
  run = createRun(prog('def f():\n    a = 1\n    return a / 0\nf()\n'));
  run.runToEnd();
  eq([run.snapshot().line, run.snapshot().error.line], [3, 3]);
});
test('snapshot().steps equals maxSteps after StepLimit', () => {
  for (const n of [1, 5, 10, 1000]) {
    const run = createRun(prog('while True:\n    pass\n'), { maxSteps: n });
    const ev = run.runToEnd();
    eq([run.snapshot().steps, ev.error.message.slice(0, 50)], [n, `the simulator stopped the program after ${n} step${n === 1 ? '' : 's'} (the simulator's`.slice(0, 50)]);
  }
});
test('slice assignment of a non-iterable', () => {
  const run = createRun(prog('x = [1, 2, 3]\nx[1:2] = 5\n'));
  const ev = run.runToEnd();
  eq([ev.error.type, ev.error.message, ev.error.line], ['TypeError', 'must assign iterable to extended slice', 2]);
});
test('tracebacks show every line of a multi-line expression; attribute errors at the attribute line', () => {
  let run = createRun(prog('result = (10 /\n          0)\n'));
  let ev = run.runToEnd();
  ok(ev.error.traceback.includes('    result = (10 /\n              0)\nZeroDivisionError'), ev.error.traceback);
  run = createRun(prog('x = 1\nwhile (x <\n       "a"):\n    pass\n'));
  ev = run.runToEnd();
  ok(ev.error.traceback.includes('    while (x <\n           "a"):\nTypeError'), ev.error.traceback);
  run = createRun(prog('s = ("abc"\n     .upper()\n     .foo())\n'));
  ev = run.runToEnd();
  eq(ev.error.line, 3);
  ok(ev.error.traceback.includes('line 3, in <module>\n    .foo())\nAttributeError'), ev.error.traceback);
});
test('seed option with a non-integer number seeds like random.seed(seed)', () => {
  const run = createRun(prog('import random\nprint(random.random())\n'), { seed: 3.5 });
  run.runToEnd();
  eq(run.output, '0.3039190124834461\n');
});
test('reduceExpression steps[0] is the expression as typed', () => {
  for (const src of ['(2 * 3) + 4', '((1 + 2))', '-(-(-1))', '0x1F + 0o17 + 0b11', '1e3 // 7', '10_000 + 1']) eq(reduceExpression(src).steps[0], src);
  eq(reduceExpression('(2 * 3) + 4').steps, ['(2 * 3) + 4', '6 + 4', '10']);
});
test('tokenize: names after "." or "def" are not builtins; col is a JS string index', () => {
  const last = (src) => tokenize(src).filter((t) => t.text === 'print' || t.text === 'format' || t.text === 'len').map((t) => t.type);
  eq(last('obj.print'), ['name']);
  eq(last('"{}".format(x)'), ['name']);
  eq(last('def len(): pass'), ['name']);
  eq(last('print(len(x))'), ['builtin', 'builtin']);
  const src = 's = "😀"; t = 1\n';
  eq(tokenize(src).find((t) => t.text === 't').col, src.indexOf('t ='));
});
test('sys.exit(message) prints the message', () => {
  const run = createRun(prog('import sys\nprint("a")\nsys.exit("bye")\nprint("b")\n'));
  eq([run.runToEnd().kind, run.status, run.output], ['done', 'done', 'a\nbye\n']);
  const run2 = createRun(prog('import sys\nsys.exit(3)\n'));
  eq([run2.runToEnd().kind, run2.output], ['done', '']);
});
test('OrderedDict is its own type', () => {
  const run = createRun(prog('from collections import OrderedDict\nd = OrderedDict([("k", 2)])\nprint(repr(d), type(d).__name__)\n'));
  run.runToEnd();
  eq(run.output, "OrderedDict({'k': 2}) OrderedDict\n");
  eq(run.snapshot().frames[0].locals.find((l) => l.name === 'd').value.typeName, 'OrderedDict');
});
test('inputs: null / undefined entries mean EOF; an entry with newlines is several lines', () => {
  let run = createRun(prog('a = input()\nprint(repr(a))\n'), { inputs: [null], echoInput: false });
  eq(run.runToEnd().error.type, 'EOFError');
  run = createRun(prog('a = input()\n'), { inputs: [undefined], echoInput: false });
  eq(run.runToEnd().error.type, 'EOFError');
  run = createRun(prog('a = input()\nb = input()\nprint(repr(a), repr(b))\n'), { inputs: ['1\n2'], echoInput: false });
  run.runToEnd();
  eq(run.output, "'1' '2'\n");
  run = createRun(prog('a = input()\nprint(repr(a))\n'), { inputs: ['5\n'], echoInput: false });
  run.runToEnd();
  eq(run.output, "'5'\n");
});
test('provideInput() before input() is queued when opts.inputs is a function', () => {
  const run = createRun(prog('a = input()\nprint(a)\n'), { inputs: () => null, echoInput: false });
  run.provideInput('early');
  run.runToEnd();
  eq([run.status, run.output], ['done', 'early\n']);
});
test('provideInput() with several lines answers several input() calls', () => {
  const run = createRun(prog('a = input()\nb = input()\nprint(a + b)\n'), { echoInput: false });
  eq(run.runToEnd().kind, 'input');
  eq(run.provideInput('x\ny\n'), true);
  run.runToEnd();
  eq([run.status, run.output], ['done', 'xy\n']);
});
test('snapshot().line after an error raised in the caller after a call returned', () => {
  const run = createRun(prog('def f():\n    return 0\ny = 1 / f()\n'));
  run.runToEnd();
  eq([run.snapshot().line, run.snapshot().error.line], [3, 3]);
});
test('compile() col is CPython\'s offset for errors at the end of the input', () => {
  const c = compile('try:\n    pass\n');
  eq([c.error.message, c.error.line, c.error.col], ["expected 'except' or 'finally' block", 2, 9]);
  ok(!c.error.traceback.includes('^'), c.error.traceback);
});


// ------------------------------------------------------------------ regressions (review round 2)
/** step until the nth 'line' event at `line`; returns run.snapshot() there */
function snapAt(src, line, nth = 1, opts = {}) {
  const run = createRun(prog(src), opts);
  let k = 0;
  for (let i = 0; i < 10000; i++) {
    const ev = run.step();
    if (ev.kind === 'line' && ev.line === line && ++k === nth) return run.snapshot();
    if (ev.kind === 'done' || ev.kind === 'exception') break;
  }
  throw new Error(`no line event ${line} #${nth}`);
}
const localsOf = (frame) => frame.locals.map((l) => [l.name, l.value.repr]);
test('match: names captured by a failed pattern stay unbound (module and function)', () => {
  let ev = createRun(prog('p = [1, 2]\nmatch p:\n    case (x, 0):\n        print("a")\n    case _:\n        print(x)\n')).runToEnd();
  eq([ev.kind, ev.error.type, ev.error.message, ev.error.line], ['exception', 'NameError', "name 'x' is not defined", 6]);
  ev = createRun(prog('def g(p):\n    match p:\n        case (x, 0):\n            return 1\n        case _:\n            return x\nprint(g([1, 2]))\n')).runToEnd();
  eq([ev.error.type, ev.error.message], ['UnboundLocalError', "cannot access local variable 'x' where it is not associated with a value"]);
  ev = createRun(prog('match {"k": 5, "j": 1}:\n    case {"k": a, "j": 2}:\n        pass\n    case _:\n        print(a)\n')).runToEnd();
  eq([ev.error.type, ev.error.message], ['NameError', "name 'a' is not defined"]);
  const snap = snapAt('p = [1, 2]\nmatch p:\n    case (x, 0):\n        pass\n    case [x, y]:\n        print(x, y)\n', 5);
  eq(snap.frames[0].locals.map((l) => l.name), ['p']);
  // a guard sees (and keeps) the names of a pattern that matched
  const run = createRun(prog('match [7, 8]:\n    case [x, y] if x > 9:\n        pass\n    case _:\n        print(x, y)\n'));
  run.runToEnd();
  eq(run.output, '7 8\n');
});
test('reduceExpression: no step for looking up a builtin, type, method or lambda', () => {
  eq(reduceExpression('max([4, -9, 2], key=abs)').steps, ['max([4, -9, 2], key=abs)', '-9']);
  eq(reduceExpression('(lambda v: v + 1)(2)').steps, ['(lambda v: v + 1)(2)', '3']);
  eq(reduceExpression('list(map(str, [1, 2]))').steps, ['list(map(str, [1, 2]))', "['1', '2']"]);
  eq(reduceExpression('sorted(["b", "A", "c"], key=str.lower)').steps, ['sorted(["b", "A", "c"], key=str.lower)', "['A', 'b', 'c']"]);
});
test('reduceExpression: no step that only reformats a literal', () => {
  eq(reduceExpression('"x" in ["x", "y"]').steps, ['"x" in ["x", "y"]', 'True']);
  eq(reduceExpression('len(["a", "b"]) + 1').steps, ['len(["a", "b"]) + 1', '2 + 1', '3']);
  eq(reduceExpression('[1,2]+[3]').steps, ['[1,2]+[3]', '[1, 2, 3]']);
  eq(reduceExpression('{"a": 1}["a"] + 1').steps, ['{"a": 1}["a"] + 1', '1 + 1', '2']);
  eq(reduceExpression('(1,2)[0]').steps, ['(1,2)[0]', '1']);
  eq(reduceExpression('abs(- 3)').steps, ['abs(- 3)', '3']);
  eq(reduceExpression('- -3 + 1').steps, ['- -3 + 1', '3 + 1', '4']);
  eq(reduceExpression('"-".join(["a", "b"])').steps, ['"-".join(["a", "b"])', "'a-b'"]);
  eq(reduceExpression('-2 ** 2').steps, ['-2 ** 2', '-(4)', '-4']);
});
test('snapshot() before the first step() shows the module frame', () => {
  const s = createRun(prog('x = 1\n'), {}).snapshot();
  eq([s.frames.length, s.frames[0].name, s.frames[0].locals], [1, '<module>', []]);
});
test('snapshot: a nested function frame lists the free (closure / nonlocal) variables it reads', () => {
  const src = 'def outer():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    inc()\n    inc()\n    return count\nr = outer()\n';
  eq(localsOf(snapAt(src, 5).frames[2]), [['count', '0']]);
  eq(localsOf(snapAt('def a():\n    x = 1\n    def b():\n        return x\n    return b()\na()\n', 4).frames[2]), [['x', '1']]);
});
test('snapshot: function locals in CPython locals() order (co_varnames, then cells, then free variables)', () => {
  eq(localsOf(snapAt('def f(n):\n    if n > 0:\n        b = 1\n    a = 2\n    b = 3\n    return a + b\nf(0)\n', 6).frames[1]), [['n', '0'], ['b', '3'], ['a', '2']]);
  const outer = 'def outer():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    inc()\n    inc()\n    return count\nr = outer()\n';
  eq(snapAt(outer, 9).frames[1].locals.map((l) => l.name), ['inc', 'count']);
  eq(snapAt('def f(a, *args, b, **kw):\n    z = 1\n    return z\nf(1, 2, b=3, c=4)\n', 3).frames[1].locals.map((l) => l.name), ['a', 'b', 'args', 'kw', 'z']);
});
test('evalExpression: a View whose repr is not a literal keeps its type (or gives a clear error)', () => {
  const run = createRun(prog('from collections import defaultdict\nDD = defaultdict(int, {"a": 1})\nC = [1]\nC.append(C)\ndef fn():\n    return 1\nz = 0\n'));
  run.runToEnd();
  const V = Object.fromEntries(run.snapshot().frames[0].locals.map((l) => [l.name, l.value]));
  let r = evalExpression('DD["zz"]', { DD: V.DD });
  eq([r.ok, r.repr], [true, '0']);
  r = evalExpression('fn', { fn: V.fn });
  eq([r.ok, r.type], [true, 'function']);
  r = evalExpression('C[1] is C', { C: V.C });
  eq([r.ok, r.repr], [true, 'True']);
  // a View that went through JSON has no link to the function: a clear error, not a str
  r = evalExpression('fn', { fn: JSON.parse(JSON.stringify(V.fn)) });
  eq([r.ok, r.error.type], [false, 'TypeError']);
});
test('host module: assigning an attribute on the module reaches the JS object', () => {
  const m = { pos: 0, forward(d) { this.pos += d; return this.pos; } };
  const run = createRun(prog('import m\nm.pos = 10\nprint(m.pos, m.forward(1), m.pos)\n'), { modules: { m } });
  run.runToEnd();
  eq([run.output, m.pos], ['10 11 11\n', 11]);
});
test('host interop: functions keep their identity', () => {
  const fnObj = (x) => x + 1;
  const run = createRun(prog('import m\nprint(m.get() is m.get())\ndef p(v):\n    return v\nprint(m.call(p) is p)\n'), { modules: { m: { get: () => fnObj, call: (f) => f } } });
  run.runToEnd();
  eq(run.output, 'True\nTrue\n');
});
test('host modules with 3-level dotted names: import a.b.c reaches a.b.c', () => {
  for (const src of ['import a.b.c\nprint(a.b.c.v)\n', 'import a.b\nprint(a.b.c.v)\n', 'import a.b.c as x\nprint(x.v)\n', 'from a.b import c\nprint(c.v)\n', 'from a.b.c import v\nprint(v)\n']) {
    const run = createRun(prog(src), { modules: { 'a.b.c': { v: 3 } } });
    run.runToEnd();
    eq(run.output, '3\n', src);
  }
});
test('tokenize: match / case used as variable names are names', () => {
  const kind = (src, word) => tokenize(src).filter((t) => t.text === word).map((t) => t.type);
  eq(kind('match += 1\n', 'match'), ['name']);
  eq(kind('match = [1]\nmatch[0] = 2\n', 'match'), ['name', 'name']);
  eq(kind('case: int = 3\n', 'case'), ['name']);
  eq(kind('match(x)\n', 'match'), ['name']);
  eq(kind('match x:\n    case 1:\n        pass\n', 'match'), ['keyword']);
  eq(kind('match (x):\n    case [1, 2] if y:  # c\n        pass\n', 'case'), ['keyword']);
});
test('tokenize: DEDENT tokens at the end of the file are on the line after the last one', () => {
  const ded = (src) => tokenize(src).filter((t) => t.type === 'dedent').map((t) => [t.line, t.col]);
  eq(ded('while True:\n    break\n'), [[3, 0]]);
  eq(ded('if a:\n    b\n\n# c\n'), [[5, 0]]);
  eq(ded('while True:\n    break'), [[3, 0]]);
});
test('object ids and repr addresses are the same in every run, with or without snapshots', () => {
  const src = 'a = [1]\nb = [2]\ndef f():\n    pass\nprint(f, id(b) - id(a))\n';
  const outs = [], ids = [];
  for (const snap of [false, false, true]) {
    const run = createRun(prog(src), {});
    for (;;) { const e = run.step(); if (snap) run.snapshot(); if (e.kind === 'done') break; }
    outs.push(run.output);
    ids.push(run.snapshot().frames[0].locals.map((l) => l.name + ':' + l.value.id).join(','));
  }
  eq(new Set(outs).size, 1, JSON.stringify(outs));
  eq(ids[0], ids[1]);
});

// ------------------------------------------------------------------ regression checks (review round 3)
test('comprehension / generator iterations are not steps (they have their own budget)', () => {
  let run = createRun(prog('total = sum(x * x for x in range(1, 1000001))\nprint(total)\n'));
  run.runToEnd();
  eq([run.status, run.output, run.snapshot().steps], ['done', '333333833333500000\n', 2]);
  run = createRun(prog('genap = [x for x in range(200000) if x % 2 == 0]\nprint(len(genap))\n'));
  run.runToEnd();
  eq([run.status, run.output], ['done', '100000\n']);
  run = createRun(prog('xs = [i for i in range(5)]\n'));
  const lines = allEvents(run).filter((e) => e.kind === 'line').length;
  eq([lines, run.snapshot().steps], [1, 1]);
  // a def called by a builtin runs inside one step like a lambda: its lines are not steps either
  for (const [src, steps] of [['def f(v):\n    return v\nxs = list(map(f, range(5000)))\nprint(len(xs))\n', 3], ['xs = sorted(range(5000), key=lambda v: -v)\nprint(xs[0])\n', 2]]) {
    run = createRun(prog(src), { maxSteps: 1000 });
    run.runToEnd();
    eq(run.status, 'done', src);
    eq(run.snapshot().steps, steps, src);
  }
});
test('snapshot cost follows the distinct objects shown (shared lists, deep recursion, aliasing)', () => {
  const time = (src, opts) => {
    const run = createRun(prog(src), { maxSteps: 1e6, ...opts });
    const t = Date.now();
    let n = 0;
    for (;;) { const e = run.step(); if (e.kind === 'line') { run.snapshot(); n++; } if (e.kind === 'done' || e.kind === 'exception') break; }
    return [Date.now() - t, n, run];
  };
  const [t1, n1] = time('def jumlah(xs, i):\n    if i == len(xs):\n        return 0\n    return xs[i] + jumlah(xs, i + 1)\nprint(jumlah(list(range(200)), 0))\n');
  eq(n1, 404);
  ok(t1 < 2000, `recursion over a shared list: ${t1} ms for ${n1} snapshots`);
  const [t2, , r2] = time('g = [[[0] * 100] * 100] * 100\ny = 1\n');
  ok(t2 < 1000, `[[[0] * 100] * 100] * 100: ${t2} ms`);
  const g = r2.snapshot().frames[0].locals.find((l) => l.name === 'g').value;
  ok(g.items[0] === g.items[99] && g.items[0].items[0] === g.items[0].items[1], 'a shared list is one View object');
  eq(g.items[5].items.length, 100);
  const [t3] = time('a = [0]\nfor i in range(20):\n    a = [a, a]\ny = 1\n');
  ok(t3 < 1000, `a = [a, a] x 20: ${t3} ms`);
  // the same list in every frame of a deep recursion
  const run = createRun(prog('def d(n, xs):\n    if n == 0:\n        return 0\n    return d(n - 1, xs)\nprint(d(990, list(range(300))))\n'), { maxSteps: 1e6 });
  for (let i = 0; i < 2900; i++) run.step();
  const t = Date.now();
  const s = run.snapshot();
  ok(Date.now() - t < 100, `deep snapshot ${Date.now() - t} ms`);
  ok(s.frames.length > 900 && s.frames[5].locals.find((l) => l.name === 'xs').value === s.frames[900].locals.find((l) => l.name === 'xs').value, 'shared View across frames');
});
test('the View repr of a large container is cut (reprTruncated), items stay capped', () => {
  const run = createRun(prog('xs = list(range(1000000))\ny = 1\n'), { maxSteps: 1e7 });
  run.step(); run.step(); run.step();
  const t = Date.now();
  const v = run.snapshot().frames[0].locals.find((l) => l.name === 'xs').value;
  ok(Date.now() - t < 200, `snapshot of a 1e6 list took ${Date.now() - t} ms`);
  eq([v.reprTruncated, v.repr.slice(0, 12), v.repr.endsWith('...'), v.repr.length <= 5003, v.items.length, v.truncated], [true, '[0, 1, 2, 3,', true, true, 200, 1000000]);
  const small = createRun(prog('xs = [1, 2]\n'));
  small.runToEnd();
  const sv = small.snapshot().frames[0].locals[0].value;
  eq([sv.repr, sv.reprTruncated], ['[1, 2]', undefined]);
});
test('return event line: the return statement, not a call on a later line of it; while unwinding: where it raised', () => {
  const rets = (src) => allEvents(createRun(prog(src))).filter((e) => e.kind === 'return').map((e) => `${e.name}:${e.line}`);
  eq(rets('def g(v):\n    return v\ndef f(a, b):\n    return [a,\n            g(b),\n            3]\nx = f(1, 2)\n'), ['g:2', 'f:4']);
  eq(rets('def g():\n    s = "ab"\n    t = (1,\n         s[5])\n    return t\ng()\n'), ['g:4']);
  // falling off the end: the start of the last statement run (CPython's implicit return)
  eq(rets('def g(v):\n    return v\ndef h():\n    y = (2,\n         g(3))\nh()\n'), ['g:2', 'h:4']);
});
test('host modules: from-import of methods of a class instance, host classes called like turtle.Turtle()', () => {
  class Pyplot { constructor() { this.lines = []; } plot(...a) { this.lines.push(a); } show() {} }
  const plt = new Pyplot();
  let run = createRun(prog('from matplotlib.pyplot import plot, show\nplot([1], [2])\nshow()\n'), { modules: { 'matplotlib.pyplot': plt } });
  eq(run.runToEnd().kind, 'done');
  eq(plt.lines, [[[1], [2]]]);
  const plt2 = new Pyplot();
  run = createRun(prog('from matplotlib.pyplot import *\nplot([3], [4])\n'), { modules: { 'matplotlib.pyplot': plt2 } });
  run.runToEnd();
  eq(plt2.lines, [[[3], [4]]]);
  class Pen { constructor(n) { this.x = 0; this.name = n; } forward(d) { this.x += d; return this; } }
  run = createRun(prog('import turtle\np = turtle.PenClass("x")\np.forward(3)\nprint(p.x, p.name)\n'), { modules: { turtle: { PenClass: Pen } } });
  run.runToEnd();
  eq(run.output, '3 x\n');
});
test('sys.stdout / sys.stderr / sys.stdin work like python3', () => {
  const run = createRun(prog('import sys\nn = sys.stdout.write("a\\n")\nprint(n)\nprint("e", file=sys.stderr)\nx = sys.stdin.readline()\nprint(repr(x), repr(sys.stdin.readline()))\n'), { inputs: ['hi'], echoInput: false, eofWhenExhausted: true });
  const evs = allEvents(run);
  eq(run.status, 'done');
  eq(run.stdout, "a\n2\n'hi\\n' ''\n");
  eq(run.output, "a\n2\ne\n'hi\\n' ''\n");
  ok(evs.some((e) => e.kind === 'output' && e.text === 'e\n' && e.stderr === true), 'stderr output event');
});
test('reduceExpression: a sign applied to a number that already shows it is not a step of its own', () => {
  eq(reduceExpression('--x < 0', { x: 5 }).steps, ['--x < 0', '--5 < 0', '5 < 0', 'False']);
  eq(reduceExpression('+-+x', { x: 3 }).steps, ['+-+x', '+-+3', '+-3', '-3']);
  eq(reduceExpression('-x', { x: -5 }).steps, ['-x', '-(-5)', '5']);
});
test('SyntaxError: doubled name in a tuple target, missing comma in a match subject', () => {
  const err = (src) => { const c = compile(src); return [c.error.message, c.error.line, c.error.col]; };
  eq(err('x, y y = 1, 2\n'), ["invalid syntax. Maybe you meant '==' or ':=' instead of '='?", 1, 6]);
  eq(err('b, a a = a, b\n'), ["invalid syntax. Maybe you meant '==' or ':=' instead of '='?", 1, 6]);
  eq(err('match f(1  2):\n    case 1:\n        pass\n'), ['invalid syntax. Perhaps you forgot a comma?', 1, 9]);
  eq(err('match b % 4(:\n    case 1:\n        pass\n'), ['invalid syntax', 1, 13]);
  eq(err('match x y:\n    case 1:\n        pass\n'), ['invalid syntax', 1, 9]);
});
test('evalExpression on a function View uses the program\'s address and id()', () => {
  const run = createRun(prog('def g():\n    pass\ndef fn(x):\n    return x\nprint(fn, id(fn))\nz = 0\n'));
  let e;
  do { e = run.step(); } while (!(e.kind === 'line' && e.line === 6));
  const v = run.snapshot().frames[0].locals.find((l) => l.name === 'fn').value;
  const printed = run.output.trim().split(' ');
  eq(evalExpression('repr(fn)', { fn: v }).value.repr, `'${v.repr}'`);
  eq(evalExpression('id(fn)', { fn: v }).repr, printed[printed.length - 1]);
  ok(v.repr === printed.slice(0, -1).join(' '), v.repr);
});
test('a Python callback the host calls after the run ended throws a JS Error carrying the PyError', () => {
  let saved;
  const host = { onclick: (f) => { saved = f; } };
  const run = createRun(prog('import host\ndef klik(x, y):\n    return x / y\nhost.onclick(klik)\n'), { modules: { host } });
  run.runToEnd();
  eq(saved(6, 3), 2);
  let err = null;
  try { saved(1, 0); } catch (e) { err = e; }
  ok(err instanceof Error, 'an Error');
  eq([err.name, err.message, err.pyError.type, err.pyError.line], ['ZeroDivisionError', 'division by zero', 'ZeroDivisionError', 3]);
  ok(err.pyError.traceback.endsWith('ZeroDivisionError: division by zero'), err.pyError.traceback);
  // called by the host while the program runs, the error stays a Python exception the program can catch
  const host2 = { call: (f) => f(0) };
  const run2 = createRun(prog('import host2\ndef bad(x):\n    return 1 / x\ntry:\n    host2.call(bad)\nexcept ZeroDivisionError as e:\n    print("caught", e)\n'), { modules: { host2 } });
  run2.runToEnd();
  eq(run2.output, 'caught division by zero\n');
});

// ------------------------------------------------------------------ regression checks (sim reports, round 4)
test('run.output: the traceback follows output that has no final newline directly, like python3 2>&1', () => {
  let run = createRun(prog('print("x", end="")\ny = 1/0\n'));
  run.runToEnd();
  ok(run.output.startsWith('xTraceback (most recent call last):\n'), run.output);
  eq(run.stdout, 'x');
  for (const [echoInput, want] of [[false, 'x? y? Traceback'], [true, 'x? 1\ny? Traceback']]) {
    run = createRun(prog('a = input("x? ")\nb = input("y? ")\n'), { inputs: ['1'], eofWhenExhausted: true, echoInput });
    run.runToEnd();
    ok(run.output.startsWith(want), JSON.stringify(run.output));
  }
});
test('StepLimit: flagged as the simulator\'s limit, no Python traceback, nothing added to run.output', () => {
  const run = createRun(prog('for i in range(3000):\n    print(i)\n'), { maxSteps: 5000 });
  const ev = run.runToEnd();
  const e = ev.error;
  eq([e.type, e.simulatorLimit, e.limit, e.limitKind, run.status], ['StepLimit', true, 5000, 'steps', 'error']);
  ok(!e.traceback.includes('Traceback') && !/infinite loop\?/.test(e.message), e.traceback);
  eq(run.output, run.stdout);
  ok(run.output.endsWith('2499\n'), run.output.slice(-20));
  // the iterations-inside-one-step budget, and the Indonesian wording
  const r2 = createRun(prog('x = [i for i in iter(int, 1)]\n'), { maxSteps: 50, locale: 'id' });
  const e2 = r2.runToEnd().error;
  eq([e2.type, e2.limitKind, e2.line], ['StepLimit', 'iterations', 1]);
  ok(e2.message.startsWith('simulator menghentikan program setelah 1000000 iterasi'), e2.message);
});
test('StepLimit: error.line is the last step that ran (same as snapshot().line)', () => {
  const run = createRun(prog('x = 0\nwhile x < 10:\n    x = x * 2\n'), { maxSteps: 3000 });
  const ev = run.runToEnd();
  eq([ev.error.line, run.snapshot().line, ev.error.frames], [2, 2, [{ name: '<module>', line: 2 }]]);
});
test('line events carry col / endLine / endCol: one-line compound statements and ";" can be told apart', () => {
  const run = createRun(prog('x = 5\nif x > 3: print("big")\nfor k in "ab": print(k)\na = abs(1); b = abs(a)\ns = "😀"; t = 1\n'));
  const spans = allEvents(run).filter((e) => e.kind === 'line').map((e) => `${e.line}:${e.col}-${e.endLine}:${e.endCol}`);
  eq(spans, ['1:0-1:5', '2:0-2:8', '2:10-2:22', '3:0-3:13', '3:15-3:23', '3:0-3:13', '3:15-3:23', '3:0-3:13',
    '4:0-4:10', '4:12-4:22', '5:0-5:8', '5:10-5:15']);
});
test('call events carry the column and span of the call expression', () => {
  const run = createRun(prog('def f(x):\n    return x + 1\n\na = f(1); b = f(a)\n'));
  const calls = allEvents(run).filter((e) => e.kind === 'call');
  eq(calls.map((c) => [c.line, c.col, c.span]), [[4, 4, { line: 4, col: 4, endLine: 4, endCol: 8 }], [4, 14, { line: 4, col: 14, endLine: 4, endCol: 18 }]]);
});
test('syncCallEvents: calls made by builtins report call / return events (sync: true)', () => {
  const src = 'def panjang(s):\n    return len(s)\n\nprint(sorted(["Budi", "Al", "Cici"], key=panjang))\n';
  eq(allEvents(createRun(prog(src))).map(brief), ['L1', 'L4', 'out "[\'Al\', \'Budi\', \'Cici\']\\n"', 'done']);
  const evs = allEvents(createRun(prog(src), { syncCallEvents: true }));
  eq(evs.map(brief), ['L1', 'L4', 'call panjang', 'return panjang 4', 'call panjang', 'return panjang 2', 'call panjang', 'return panjang 4', 'out "[\'Al\', \'Budi\', \'Cici\']\\n"', 'done']);
  ok(evs.filter((e) => e.kind === 'call' || e.kind === 'return').every((e) => e.sync === true && e.depth === 1), 'sync flag');
  eq(evs[2].callLine === undefined ? evs[2].line : evs[2].callLine, 4);
});

test('snapshot View cache: an unchanged container keeps its View object; cached and fresh snapshots agree', () => {
  const run = createRun(prog('a = [1, [2]]\nb = {"k": a}\nx = 0\nx = 1\na[1].append(3)\nx = 2\n'));
  for (let i = 0; i < 4; i++) run.step();
  const s1 = run.snapshot(); run.step();
  const s2 = run.snapshot();
  const get = (s, n) => s.frames[0].locals.find((l) => l.name === n).value;
  ok(get(s1, 'a') === get(s2, 'a') && get(s1, 'b') === get(s2, 'b'), 'unchanged containers reuse their Views');
  run.step(); run.step();
  const s3 = run.snapshot();
  eq([get(s3, 'a').repr, get(s3, 'b').repr, get(s2, 'a').repr], ['[1, [2, 3]]', "{'k': [1, [2, 3]]}", '[1, [2]]']);
  ok(get(s3, 'b').entries[0][1] === get(s3, 'a'), 'aliases share one View');
  // a mutation-heavy program: every snapshot equals one built without the cache
  const src = 'import random\nrandom.seed(3)\nfrom collections import Counter, deque\na = [0] * 30\nc = [a, a]\nd = {}\nq = deque(maxlen=12)\nct = Counter()\ns = set()\n'
    + 'while True:\n    i = random.randrange(30)\n    a[i] = random.choice([1, 2.5, "s", None, (1, [2]), [3], -0.0])\n    d[i % 9] = a[i]\n    q.append(i)\n    ct[i % 4] += 1\n'
    + '    s.add(i % 6)\n    if i % 5 == 0:\n        a.append(len(a))\n    if i % 7 == 0:\n        s.discard(3)\n    if i == 13:\n        c.append(c)\n';
  const r2 = createRun(prog(src), { maxSteps: 1500 });
  for (;;) {
    const ev = r2.step();
    setViewCache(true); const x = JSON.stringify(r2.snapshot().frames);
    setViewCache(false); const y = JSON.stringify(r2.snapshot().frames);
    setViewCache(true);
    if (x !== y) throw new Error('cached snapshot differs at step ' + r2.steps);
    if (ev.kind === 'exception' || ev.kind === 'done') break;
  }
});
test('snapshot after every step of a program holding a long list stays fast', () => {
  const run = createRun(prog('a = []\nwhile True:\n    a.append(len(a))\n'), { maxSteps: 5000 });
  const t = Date.now();
  for (;;) { const ev = run.step(); if (ev.kind === 'line') run.snapshot(); if (run.status === 'error') break; }
  const ms = Date.now() - t;
  ok(ms < 1000, `took ${ms} ms (about 2300 ms without the View cache)`);
});

test('reduceExpression: an unused literal keeps its spelling; the sign after ** is a step of its own', () => {
  eq(reduceExpression('"5" + 3 * 2').steps, ['"5" + 3 * 2', '"5" + 6']);
  eq(reduceExpression('print("x =", x)', { x: 6 }).steps, ['print("x =", x)', 'print("x =", 6)', 'None']);
  eq(reduceExpression('0x1F + 2 * 3').steps, ['0x1F + 2 * 3', '0x1F + 6', '37']);
  eq(reduceExpression('1 - -2 ** 2').steps, ['1 - -2 ** 2', '1 - -(4)', '1 - -4', '5']);
  eq(reduceExpression('-(2 + 3)').steps, ['-(2 + 3)', '-(5)', '-5']);
});
test('evalExpression / reduceExpression run the program\'s functions as copies: the run is not changed', () => {
  const run = createRun(prog('log = []\ndef f(x):\n    log.append(x)\n    return x\nxs = [3, 1, 2]\nm = max(xs, key=f)\nprint(log)\n'));
  for (;;) { const ev = run.step(); if (ev.kind === 'line' && ev.line === 6) break; }
  const L = Object.fromEntries(run.snapshot().frames[0].locals.map((l) => [l.name, l.value]));
  eq(reduceExpression('max(xs, key=f) > 2', { xs: L.xs, f: L.f }).steps, ['max(xs, key=f) > 2', 'max([3, 1, 2], key=f) > 2', '3 > 2', 'True']);
  eq(evalExpression('(f(5), log)', { f: L.f, log: L.log }).repr, '(5, [])');
  run.runToEnd();
  eq(run.output, '[3, 1, 2]\n');
  // the random module of the copy continues from the program's state, without moving it on
  const r2 = createRun(prog('import random\nrandom.seed(5)\ndef roll():\n    return random.randint(1, 6)\na = roll()\nb = roll()\nprint(a, b)\n'));
  for (;;) { const ev = r2.step(); if (ev.kind === 'line' && ev.line === 6) break; }
  const L2 = Object.fromEntries(r2.snapshot().frames[0].locals.map((l) => [l.name, l.value]));
  eq([evalExpression('roll()', { roll: L2.roll }).repr, evalExpression('random.randint(1, 6)', { random: L2.random }).repr], ['3', '3']);
  r2.runToEnd();
  eq(r2.output, '5 3\n');
});
test('evalExpression / reduceExpression with calls: false refuse to run the program\'s functions', () => {
  const run = createRun(prog('def f(x):\n    return x\ny = 1\n'));
  run.runToEnd();
  const f = run.snapshot().frames[0].locals.find((l) => l.name === 'f').value;
  const r = evalExpression('f(1) + 1', { f }, { calls: false });
  eq([r.ok, r.error.type, r.error.callRefused, r.error.name], [false, 'CallRefused', true, 'f']);
  const red = reduceExpression('abs(-2) + max([1, 5], key=f)', { f }, { calls: false });
  eq([red.ok, red.steps, red.error.type], [false, ['abs(-2) + max([1, 5], key=f)', '2 + max([1, 5], key=f)'], 'CallRefused']);
  eq(evalExpression('(lambda v: v * 2)(4)', {}, { calls: false }).repr, '8');
});
test('evalExpression / reduceExpression: inputs feed input() like createRun', () => {
  const r = evalExpression('int(input()) + 1', {}, { inputs: ['17'] });
  eq([r.repr, r.type], ['18', 'int']);
  eq(evalExpression('int(input()) + 1').error.type, 'EOFError');
  const t = evalExpression('type(input("x? "))', {}, { inputs: ['a'], echoInput: true });
  eq([t.repr, t.output], ["<class 'str'>", 'x? a\n']);
  eq(reduceExpression('int(input()) + 1', {}, { inputs: ['17'] }).steps, ['int(input()) + 1', "int('17') + 1", '17 + 1', '18']);
});

test('tokenize { fstrings: "split" } gives the tokens inside f-string fields (Python 3.12 style)', () => {
  const brief = (src) => tokenize(src, { fstrings: 'split' }).filter((t) => t.type !== 'newline').map((t) => [t.type, t.text, t.col]);
  eq(brief('print(f"{d[k]}")'), [['builtin', 'print', 0], ['op', '(', 5], ['fstring-start', 'f"', 6], ['op', '{', 8], ['name', 'd', 9], ['op', '[', 10],
    ['name', 'k', 11], ['op', ']', 12], ['op', '}', 13], ['fstring-end', '"', 14], ['op', ')', 15]]);
  eq(brief('f"{x=}, {y!r:>{w}} {{z}}"').map((t) => t[1]).join('|'), 'f"|{|x|=|}|, |{|y|!|r|:|>|{|w|}|}| {{z}}|"');
  // the default stays one 'fstring' token
  eq(tokenize('f"{a}"').filter((t) => t.type !== 'newline').map((t) => t.type), ['fstring']);
  // parts tile the source, also over several lines and after an emoji
  for (const src of ["f'''a{\n  x +\n  (1)\n}b'''", 'f"😀{e:.2f}"']) {
    const lines = src.split('\n');
    for (const t of tokenize(src, { fstrings: 'split' })) if (t.type !== 'newline') eq(lines[t.line - 1].slice(t.col, t.col + t.text.length), t.text);
  }
});
test('async / await used as names are invalid syntax (like CPython), async def is unsupported', () => {
  for (const src of ['async = 1\n', 'await = 1\n', 'print(async)\n', 'x = 1 + await\n']) {
    const c = compile(src);
    eq([c.error.type, c.error.message], ['SyntaxError', 'invalid syntax'], src);
  }
  eq([compile('async = 1\n').error.col, compile('async = 1\n').error.endCol], [7, 8]);
  eq(compile('async def f():\n    pass\n').error.message, "minipy does not support 'async' yet");
  eq(compile('await x\n').error.message, "minipy does not support 'await' yet");
});

// a turtle-like host: Vec2D emulates turtle's tuple subclass through dunder methods
function hostTurtle() {
  const unf = (v) => (v && typeof v === 'object' && '__float' in v ? v.__float : v);
  const pair = (o) => (o instanceof Vec2D ? [o.x, o.y] : Array.isArray(o) ? o : o && o.__tuple ? o.__tuple : null);
  class Vec2D {
    constructor(x, y) { this.x = unf(x); this.y = unf(y); }
    __repr__() { return `(${this.x.toFixed(2)},${this.y.toFixed(2)})`; }
    __len__() { return 2; }
    __getitem__(i) { if (i < -2 || i > 1) { const e = new Error('tuple index out of range'); e.pyType = 'IndexError'; throw e; } return { __float: [this.x, this.y][(i + 2) % 2] }; }
    __iter__() { return [{ __float: this.x }, { __float: this.y }]; }
    __eq__(o) { const t = pair(o); return t ? t.length === 2 && unf(t[0]) === this.x && unf(t[1]) === this.y : undefined; }
    __add__(o) { const t = pair(o); return t ? new Vec2D(this.x + unf(t[0]), this.y + unf(t[1])) : undefined; }
    __radd__(o) { return this.__add__(o); }
    __neg__() { return new Vec2D(-this.x, -this.y); }
    __abs__() { return { __float: Math.hypot(this.x, this.y) }; }
  }
  Vec2D.prototype.__pyname = 'turtle.Vec2D';
  class TurtleGraphicsError extends Error {}
  class TNavigator { forward(d) { this.px += unf(d); } xcor() { return { __float: this.px }; } pos() { return new Vec2D(this.px, 0); } }
  class Turtle extends TNavigator {
    constructor() { super(); this.px = 0; }
    color(c) { if (c !== 'red') throw new TurtleGraphicsError(`bad color string: ${c}`); }
    get spines() { const e = new Error('nope'); e.pyType = 'NotImplementedError'; throw e; }
    __str__() { return 'a turtle'; }
  }
  Turtle.prototype.__pyname = 'turtle.Turtle';
  const seen = [];
  return { seen, module: { Turtle, Vec2D, TurtleGraphicsError, take(...a) { seen.push(a); return null; }, oops() { const e = new Error('custom'); e.pyType = 'TurtleGraphicsError'; throw e; } } };
}
test('host objects: __len__ / __iter__ / __getitem__ / __eq__ / __add__ / __neg__ / __abs__ / __str__ act like Python', () => {
  const h = hostTurtle();
  const run = createRun(prog('import turtle\nt = turtle.Turtle()\nt.forward(100)\n'
    + 'print(t.pos() == (100, 0), (100, 0) == t.pos(), t.pos() != (1, 2))\n'
    + 'print(t.pos() + (1, 1), (1, 1) + t.pos(), -t.pos(), abs(t.pos()))\n'
    + 'print(len(t.pos()), t.pos()[0], t.pos()[-1], list(t.pos()))\n'
    + 'x, y = t.pos()\nprint(x, y, 100.0 in t.pos(), bool(t.pos()))\nprint(t, str(t), f"{t}")\n'), { modules: { turtle: h.module } });
  run.runToEnd();
  eq(run.output, 'True True True\n(101.00,1.00) (101.00,1.00) (-100.00,0.00) 100.0\n2 100.0 0.0 [100.0, 0.0]\n100.0 0.0 True True\na turtle a turtle a turtle\n');
});
test('host classes are Python types; methods are bound methods; dir() and "Did you mean" see class methods', () => {
  const h = hostTurtle();
  const run = createRun(prog('import turtle\nt = turtle.Turtle()\nprint(turtle.Turtle, type(t) is turtle.Turtle, isinstance(t, turtle.Turtle), type(t))\n'
    + 'print(t.forward)\nprint("forward" in dir(t), "constructor" in dir(t))\nturtle.Turtle.forward(t, 5)\nprint(t.xcor())\n'
    + 'try:\n    turtle.Turtle.forward(100)\nexcept TypeError as e:\n    print(e)\nt.forwad(1)\n'), { modules: { turtle: h.module } });
  run.runToEnd();
  const lines = run.output.split('\n');
  eq(lines[0], "<class 'turtle.Turtle'> True True <class 'turtle.Turtle'>");
  ok(/^<bound method TNavigator\.forward of <turtle\.Turtle object at 0x[0-9a-f]+>>$/.test(lines[1]), lines[1]);
  eq(lines.slice(2, 5), ['True False', '5.0', "descriptor 'forward' for 'Turtle' objects doesn't apply to a 'int' object"]);
  eq(run.snapshot().error.message, "'Turtle' object has no attribute 'forwad'. Did you mean: 'forward'?");
  const r2 = createRun(prog('import turtle\nturtle.Turtel()\n'), { modules: { turtle: h.module } });
  eq(r2.runToEnd().error.message, "module 'turtle' has no attribute 'Turtel'. Did you mean: 'Turtle'?");
});
test('host exceptions: a JS Error class on the module, e.pyType of the host\'s own class, pyType from a getter', () => {
  const h = hostTurtle();
  const run = createRun(prog('import turtle\nt = turtle.Turtle()\ntry:\n    t.color("merah")\nexcept turtle.TurtleGraphicsError as e:\n    print("caught", type(e).__name__, e)\n'
    + 'try:\n    turtle.oops()\nexcept turtle.TurtleGraphicsError as e:\n    print("caught", e)\ntry:\n    t.spines\nexcept NotImplementedError as e:\n    print("NIE", e)\n'
    + 'try:\n    t.color("hijau")\nexcept RuntimeError:\n    print("wrong")\nexcept Exception as e:\n    print("Exception", e)\nt.color("green")\n'), { modules: { turtle: h.module } });
  const ev = run.runToEnd();
  ok(run.output.startsWith('caught TurtleGraphicsError bad color string: merah\ncaught custom\nNIE nope\nException bad color string: hijau\n'), run.output);
  ok(ev.error.traceback.endsWith('turtle.TurtleGraphicsError: bad color string: green'), ev.error.traceback);
  eq(ev.error.type, 'TurtleGraphicsError');
});
test('host arguments: dict views and iterators arrive as Arrays; hostArgs: "typed" keeps floats and tuples', () => {
  const h = hostTurtle();
  const src = 'import turtle\nd = {"a": 1}\nturtle.take(d.keys(), d.values(), d.items(), map(str, [1]), (x for x in [2]), zip([1], [2]), reversed([1, 2]))\nturtle.take(80.0, 80, (1, 2), [1.0, 2.5], -0.0)\n';
  createRun(prog(src), { modules: { turtle: h.module } }).runToEnd();
  eq(h.seen, [[['a'], [1], [['a', 1]], ['1'], [2], [[1, 2]], [2, 1]], [80, 80, [1, 2], [1, 2.5], -0]]);
  h.seen.length = 0;
  createRun(prog(src), { modules: { turtle: h.module }, hostArgs: 'typed' }).runToEnd();
  eq(h.seen, [[['a'], [1], [{ __tuple: ['a', 1] }], ['1'], [2], [{ __tuple: [1, 2] }], [2, 1]],
    [{ __float: 80 }, 80, { __tuple: [1, 2] }, [{ __float: 1 }, 2.5], { __float: -0 }]]);
});
test('pyMath gives python3\'s math results for JS numbers', () => {
  eq([pyMath.cos(pyMath.radians(-681)), Math.cos(-681 * Math.PI / 180) !== pyMath.cos(pyMath.radians(-681))], [0.7771459614569705, true]);
  const run = createRun(prog('import math\nprint(math.sin(1.2), math.atan2(3, -7), math.hypot(3.5, 7.25), math.log10(2))\n'));
  run.runToEnd();
  eq(run.output, [pyMath.sin(1.2), pyMath.atan2(3, -7), pyMath.hypot(3.5, 7.25), pyMath.log10(2)].join(' ') + '\n');
});

test('\\N{...} escapes: SyntaxError while the name table loads, then the character', () => {
  eq([nEscapeEarly.ok, nEscapeEarly.error.type, /still loading/.test(nEscapeEarly.error.message)], [false, 'SyntaxError', true]);
  const run = createRun(nEscapeLate.program);
  run.runToEnd();
  eq(run.output, '\u2022\n');
});

// ------------------------------------------------------------------ codepanel.js highlighting (no DOM needed)
test('codepanel pseudocode: DECLARATION / DESCRIPTION are headings, lower-case booleans are constants', () => {
  const highlight = cpHighlight;
  eq(highlight('DECLARATION\nDESCRIPTION\nDEKLARASI\nDESKRIPSI', 'pseudo'), ['DECLARATION', 'DESCRIPTION', 'DEKLARASI', 'DESKRIPSI'].map((w) => `<span class="cp-t-hd">${w}</span>`));
  eq(highlight('ketemu ← false\nok ← benar', 'pseudo'), ['ketemu <span class="cp-t-op">←</span> <span class="cp-t-con">false</span>', 'ok <span class="cp-t-op">←</span> <span class="cp-t-con">benar</span>']);
});

console.log(`\nminipy API: ${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
