#!/usr/bin/env node
// Differential tests for src/lib/minipy.js against CPython 3.13.
//
//   node scripts/test-minipy.mjs                 run every case, compare with the recorded CPython results
//   node scripts/test-minipy.mjs --update        (re)record expected results with /usr/bin/python3 (stdin piped from <name>.in)
//   node scripts/test-minipy.mjs --only core_    only cases whose name starts with the prefix (repeatable)
//   node scripts/test-minipy.mjs -v              show diffs for failures
//   node scripts/test-minipy.mjs --tb            also compare the full traceback text with a live python3 run
//                                                (caret lines and frames inside CPython's own library files ignored)
//
// --update runs `/usr/bin/python3 -I main.py` in a temporary directory (the case copied to main.py) with stdin piped
// from <name>.in and PYTHONHASHSEED=0; the error is parsed from the final traceback on stderr (type without module
// prefix, message as printed after "Type: ", line of the innermost frame in main.py).
//
// Cases: scripts/minipy-cases/<name>.py, optional <name>.in (stdin lines), generated <name>.expected.json
//   { stdout, error: { type, message, line } | null }.
// A first line "# minipy: skip <reason>" excludes a case (out of scope; the reason is printed).
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync, rmSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { compile, createRun, unicodeNamesReady } from '../src/lib/minipy.js';

await unicodeNamesReady;

const here = dirname(fileURLToPath(import.meta.url));
const CASES = join(here, 'minipy-cases');
const PYTHON = '/usr/bin/python3';

const argv = process.argv.slice(2);
const update = argv.includes('--update');
const verbose = argv.includes('-v') || argv.includes('--verbose');
const checkTb = argv.includes('--tb');
const prefixes = [];
for (let i = 0; i < argv.length; i++) if (argv[i] === '--only' && argv[i + 1]) prefixes.push(argv[++i]);

const names = readdirSync(CASES).filter((f) => f.endsWith('.py')).map((f) => f.slice(0, -3)).sort()
  .filter((n) => !prefixes.length || prefixes.some((p) => n.startsWith(p)));

function skipReason(src) {
  const m = /^#\s*minipy:\s*skip\b\s*(.*)$/m.exec(src.split('\n')[0] || '');
  return m ? (m[1].trim() || 'out of scope') : null;
}
function readInput(name) {
  const p = join(CASES, name + '.in');
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
}
function inputLines(text) {
  if (!text) return [];
  const lines = text.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}

/** parse CPython's stderr: final exception type / message / line (innermost frame in main.py) */
export function parsePythonError(stderr) {
  if (!/Traceback \(most recent call last\):|^ {2}File "/m.test(stderr)) return null;
  let block = stderr;
  const tbi = stderr.lastIndexOf('Traceback (most recent call last):');
  if (tbi >= 0) block = stderr.slice(tbi);
  const lines = block.replace(/\n+$/, '').split('\n');
  let lastFile = -1;
  for (let i = 0; i < lines.length; i++) if (lines[i].startsWith('  File "')) lastFile = i;
  let k = lastFile + 1;
  while (k < lines.length && (lines[k].startsWith('    ') || /^ {2}\[Previous line repeated/.test(lines[k]))) k++;
  const text = lines.slice(k).join('\n');
  const m = /^([A-Za-z_][\w.]*)(?:: ([\s\S]*))?$/.exec(text);
  let type = m ? m[1] : text, message = m ? (m[2] ?? '') : '';
  type = type.split('.').pop();
  let line = null;
  const re = /File "([^"]*)", line (\d+)/g;
  let mm;
  while ((mm = re.exec(block))) if (/(^|\/)main\.py$/.test(mm[1])) line = Number(mm[2]);
  return { type, message, line };
}

function runPython(name) {
  const dir = mkdtempSync(join(tmpdir(), 'minipy-'));
  try {
    copyFileSync(join(CASES, name + '.py'), join(dir, 'main.py'));
    const r = spawnSync(PYTHON, ['-I', 'main.py'], {
      cwd: dir, input: readInput(name), encoding: 'utf8', timeout: 60000,
      env: { PATH: process.env.PATH || '/usr/bin:/bin', PYTHONHASHSEED: '0', PYTHONIOENCODING: 'utf-8', LANG: 'C.UTF-8' },
    });
    if (r.error) throw r.error;
    return { stdout: r.stdout, error: parsePythonError(r.stderr), stderr: r.stderr };
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
const CARET = /^\s+[\^~ ]*[\^~][\^~ ]*$/;
/** CPython's traceback text normalised for comparison: path → main.py, no caret lines, no library frames */
const SYNTAX_TYPES = new Set(['SyntaxError', 'IndentationError', 'TabError']);
// SyntaxError reports keep their caret line (minipy reproduces CPython's); runtime tracebacks drop ~~~^^^ lines
function normalizeTb(stderr, keepCarets) {
  let t = stderr.replace(/File "[^"]*\/main\.py"/g, 'File "main.py"');
  let start = t.search(/Traceback \(most recent call last\):|^ {2}File "main\.py", line \d+$/m);
  if (start < 0) return '';
  // a chained exception without frames (e.g. `raise X from KeyError()`) prints only its "Type: msg" line first
  if (/\n\n(The above exception was the direct cause|During handling of the above exception)/.test(t.slice(0, start))) start = 0;
  const lines = t.slice(start).split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!keepCarets && CARET.test(l)) continue;
    if (/^ {2}File "/.test(l) && !/^ {2}File "main\.py"/.test(l)) { while (i + 1 < lines.length && /^ {4}/.test(lines[i + 1])) i++; continue; }
    out.push(l);
  }
  return out.join('\n').trim();
}

function runMinipy(src, input) {
  const c = compile(src, { filename: 'main.py' });
  if (!c.ok) return { stdout: '', error: { type: c.error.type, message: c.error.message, line: c.error.line }, traceback: c.error.traceback };
  const run = createRun(c.program, { inputs: inputLines(input), echoInput: false, eofWhenExhausted: true, maxSteps: 20000000 });
  const ev = run.runToEnd();
  if (run.status === 'waiting-input') return { stdout: run.stdout, error: { type: 'WaitingInput', message: 'program is waiting for input', line: null } };
  const err = ev && ev.kind === 'exception' ? { type: ev.error.type, message: ev.error.message, line: ev.error.line } : null;
  return { stdout: run.stdout, error: err, traceback: ev && ev.kind === 'exception' ? ev.error.traceback : '' };
}

function firstDiff(a, b) {
  const la = a.split('\n'), lb = b.split('\n');
  for (let i = 0; i < Math.max(la.length, lb.length); i++) {
    if (la[i] !== lb[i]) return `  line ${i + 1}:\n    expected: ${JSON.stringify(la[i])}\n    actual:   ${JSON.stringify(lb[i])}`;
  }
  return '';
}

let pass = 0, fail = 0, skip = 0, updated = 0;
const failures = [];
const t0 = Date.now();
for (const name of names) {
  const src = readFileSync(join(CASES, name + '.py'), 'utf8');
  const reason = skipReason(src);
  if (reason) { skip++; if (verbose) console.log(`SKIP ${name}: ${reason}`); continue; }
  const expPath = join(CASES, name + '.expected.json');
  if (update) {
    const exp = runPython(name);
    writeFileSync(expPath, JSON.stringify(exp, null, 2) + '\n');
    updated++;
  }
  if (!existsSync(expPath)) { fail++; failures.push(name); console.log(`FAIL ${name}: no expected file (run with --update)`); continue; }
  const exp = JSON.parse(readFileSync(expPath, 'utf8'));
  let act;
  const c0 = Date.now();
  try { act = runMinipy(src, readInput(name)); } catch (e) { act = { stdout: '', error: { type: 'JSCrash', message: String(e && e.stack || e), line: null } }; }
  const ms = Date.now() - c0;
  const okOut = act.stdout === exp.stdout;
  const okErr = JSON.stringify({ type: act.error && act.error.type, message: act.error && act.error.message, line: act.error && act.error.line }) === JSON.stringify({ type: exp.error && exp.error.type, message: exp.error && exp.error.message, line: exp.error && exp.error.line }) && !!act.error === !!exp.error;
  let okTb = true, pyTb = '', myTb = '';
  if (checkTb && exp.error) {
    const syn = SYNTAX_TYPES.has(exp.error.type);
    pyTb = normalizeTb(runPython(name).stderr, syn);
    myTb = (act.traceback || '').split('\n').filter((l) => syn || !CARET.test(l)).join('\n').trim();
    okTb = pyTb === myTb;
  }
  if (okOut && okErr && okTb) { pass++; if (verbose && ms > 1000) console.log(`slow ${name}: ${ms} ms`); continue; }
  fail++;
  failures.push(name);
  console.log(`FAIL ${name}${okOut ? '' : ' (stdout)'}${okErr ? '' : ' (error)'}${okTb ? '' : ' (traceback)'}`);
  if (verbose && !okTb) console.log(`  traceback expected:\n${pyTb}\n  traceback actual:\n${myTb}`);
  if (verbose) {
    if (!okOut) console.log(firstDiff(exp.stdout, act.stdout));
    if (!okErr) console.log(`  error expected: ${JSON.stringify(exp.error)}\n  error actual:   ${JSON.stringify(act.error)}`);
  }
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\nminipy: ${pass} passed, ${fail} failed, ${skip} skipped${update ? `, ${updated} expected files updated` : ''} (${names.length} cases, ${secs}s)`);
if (fail) process.exit(1);
