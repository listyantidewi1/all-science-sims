/**
 * minipy — a step-by-step Python 3.13 subset interpreter for the teaching simulations (pure ESM, no DOM, no deps).
 * Parts of minipy are adapted from CPython (PSF-2.0), glibc's libm (LGPL-2.1-or-later), MT19937 (BSD) and the Unicode
 * Character Database; see THIRD-PARTY-NOTICES.md for the files and their licenses.
 *
 * Accuracy target: behave exactly like CPython 3.13 for the SMA teaching subset (output, error type, message and
 * line number), verified by scripts/test-minipy.mjs against /usr/bin/python3.
 *
 * ## API
 *
 *   import { compile, createRun, pyRepr, pyStr, typeName, tokenize, evalExpression, reduceExpression,
 *            KEYWORDS, BUILTIN_NAMES, pyMath } from '../../../lib/minipy.js';
 *
 *   const c = compile(source, { filename: 'main.py' });
 *     c.ok === true  → c.program (opaque), c.lines (source lines)
 *     c.ok === false → c.error: PyError (SyntaxError / IndentationError / TabError, found before running, like CPython)
 *
 *   const run = createRun(c.program, {
 *     inputs: ['12', 'Andi'],   // successive input() values (an entry with newlines is several lines, a trailing
 *                               // newline is dropped, a null / undefined entry means end of input → EOFError);
 *                               // or a function (prompt) => string | null (null = not yet)
 *     echoInput: true,          // console shows prompt + typed value + "\n"; false = like piped stdin
 *     maxSteps: 100000,         // then the run stops with an error of type 'StepLimit' (see "The step limit" below).
 *                               // Only line events are steps; the work inside one step (comprehension and generator
 *                               // expression iterations, the lines of a function that a builtin such as map(f),
 *                               // sorted(key=f) or sum(genexp) runs) has its own budget of max(100 * maxSteps,
 *                               // 1,000,000) iterations (StepLimit with limitKind 'iterations')
 *     locale: 'en',             // extension: language of the simulator's own messages (the step limit): 'en' | 'id'
 *     syncCallEvents: false,    // extension: true → calls made by builtins (sorted(key=f), map(f, ...), max(key=f))
 *                               // also send call / return events (sync: true); see Events
 *     hostArgs: undefined,      // extension: 'typed' → values handed to host functions keep float / tuple (Host modules)
 *     seed: undefined,          // number → random module seeded as if random.seed(seed); undefined → seeded from time
 *     modules: { turtle: hostTurtle, 'matplotlib.pyplot': hostPlt },   // host modules (see below)
 *     eofWhenExhausted: false,  // extension: true → input() raises EOFError when `inputs` (an array) runs out,
 *                               // like piped stdin (used by the test harness); false → status 'waiting-input'
 *     recursionLimit: 1000,     // extension: CPython's default recursion limit
 *   });
 *   run.step()          → next event (see below)
 *   run.runToEnd()      → runs until done / error / waiting-input (respecting maxSteps); returns the last event
 *   run.provideInput(t) → answers a pending input() (status 'waiting-input') and returns true; otherwise queues t for
 *                         later input() calls (also when opts.inputs is a function) and returns false. A t with
 *                         newlines is several answers. provideInput(null) raises EOFError in the program.
 *   run.status          'ready' | 'running' | 'waiting-input' | 'done' | 'error'
 *   run.output          console text so far, like `python3 main.py 2>&1`: includes the traceback text when an error
 *                       ended the run, written straight after the program's output as CPython does (output that does
 *                       not end with a newline runs into it: 'xTraceback (most recent call last):', also after an
 *                       input() prompt that hit the end of input: 'y? Traceback'), and the message of
 *                       sys.exit("message"), which CPython prints to stderr; it also arrives as an output event
 *                       with stderr: true. The step limit adds nothing (python3 has no such limit).
 *   run.stdout          (extension) the program's own output, i.e. output without the final traceback / exit message
 *                       and without what it wrote to sys.stderr (print(..., file=sys.stderr), which is in run.output
 *                       and arrives as an output event with stderr: true)
 *   run.snapshot()      plain deep copy: { status, line, nextLine, steps, output, error,
 *                         frames: [{ name, id, line, locals: [{ name, value: View }] }] }   frames[0] = module
 *                       (also before the first step: [{ name: '<module>', locals: [] }]), last = current.
 *                       line = line of the statement executed last, nextLine = line that runs on the next step
 *                       (null when finished). After an uncaught error, line is the statement that raised it and
 *                       frames show the stack at the moment of the error. A function frame lists its variables like
 *                       CPython's frame.f_locals / locals(): parameters (positional, keyword-only, *args, **kwargs),
 *                       the other locals in the order the compiler first meets them, then variables shared with
 *                       nested functions (sorted), then the free variables it reads from enclosing functions
 *                       (closure / nonlocal, sorted). Frame ids and object ids count per run, so running a program
 *                       again gives the same ids, and taking snapshots does not change id() or the addresses the
 *                       program prints (View ids are numbered separately from id()). steps = number of line events.
 *                       A container that appears more than once in one snapshot (two names for one list, a shared
 *                       sub-list such as [[0] * 3] * 3, the same list in every frame of a recursion) is described
 *                       once: every occurrence is the same View object (===), so a snapshot costs time and memory
 *                       in proportion to the distinct objects shown (JSON.stringify would still repeat it).
 *                       A container that has not changed since an earlier snapshot keeps that snapshot's View object
 *                       (a list that only grew at its end gets a new View built from the old one), so stepping a
 *                       program that holds a long list stays cheap: treat Views as read-only.
 *
 *   View: { type: 'int'|'float'|'str'|'bool'|'NoneType'|'list'|'tuple'|'dict'|'deque'|'set'|'range'|'function'|'module'|'object',
 *           typeName (exact Python type name, e.g. 'Counter'), repr, id (stable identity for objects, 0 for int/float/str/bool/None),
 *           items?: View[] (list/tuple/deque/set, max 200), entries?: [View, View][] (dict family), truncated?: total length,
 *           cyclic?: true (container already shown higher up), reprTruncated?: true (the repr of a container longer
 *           than 5000 characters is cut there and ends with '...') }
 *
 * ## Events (returned by step())
 *   { kind: 'line', line, col, endLine, endCol }  about to run the statement at `line` (one step = one simple statement,
 *                                                or one test of an if/elif/while/for/match-case/except header; `try:` and
 *                                                `def` lines are steps too). col / endLine / endCol (JS string indexes,
 *                                                like tokenize()) span what runs: a simple statement, or a header up to
 *                                                its ':' (`if x > 3`, `for k in "ab"`, `except ValueError as e`), so the
 *                                                steps of one line can be told apart. Compared with sys.settrace 'line'
 *                                                events: `a = 1; b = 2` is two steps, and so is `if x > 3: print(x)` (the
 *                                                test, then the body; settrace reports the line once), a multi-line
 *                                                statement is one step at its first line, comprehension/lambda bodies
 *                                                take no steps of their own, and there is no extra event when a call
 *                                                returns into the middle of a line; like CPython, global/nonlocal
 *                                                declarations and function docstrings take no step.
 *   { kind: 'call', name, qualname, line, defLine, depth, args: [{ name, value: View }], col?, span? }   entering a
 *                                                user function; line = calling line, defLine = def line, args = bound
 *                                                parameters; span = { line, col, endLine, endCol } of the call
 *                                                expression (`f(a)` in `a = f(1); b = f(a)`), col = span.col when the
 *                                                call starts on `line`
 *   { kind: 'return', name, qualname, value: View, line, callLine, depth }   line = the statement that returned (the
 *                                                start of the return statement, or of the last statement run when the
 *                                                function falls off its end; like sys.settrace's f_lineno), or where the
 *                                                exception passed through the frame (unwind: true, value None)
 *   { kind: 'output', text, echo? }              text written to the console (echo: the typed input being echoed)
 *   { kind: 'input', prompt, value? , wait? }     input() called; wait: true → status 'waiting-input' until provideInput()
 *   { kind: 'exception', error: PyError }        uncaught exception; status 'error'
 *   { kind: 'done' }
 *   Calls made by builtins on behalf of the program (sorted(key=f), map(f, ...), filter, min/max(key=...),
 *   iter(f, sentinel), generator expressions) run to completion inside one step: their output still arrives as
 *   events, but an input() inside them cannot wait (it reads queued opts.inputs, else raises RuntimeError). With
 *   opts.syncCallEvents their call and return events arrive too (sync: true, in order with that output, after the
 *   step's work: the frames are gone from snapshots by then).
 *
 * The step limit: when maxSteps is reached the run ends with an 'exception' event (status 'error') whose error is not a
 *   Python exception: { type: 'StepLimit', simulatorLimit: true, limit: N, limitKind: 'steps' | 'iterations',
 *   message, traceback, line, text, frames }. message / traceback are the simulator's own words (no "Traceback (most
 *   recent call last):"; opts.locale 'id' gives Indonesian), nothing is added to run.output, and line is the last step
 *   that ran (the same as snapshot().line).
 *
 * PyError: { type, message, line, col?, endLine?, endCol?, text, traceback, frames: [{ name, line }] }.  message
 *   includes CPython 3.13's "Did you mean" suggestion exactly as the traceback prints it. For runtime errors the
 *   traceback mimics CPython without the ~~~^^^ lines. For SyntaxError / IndentationError / TabError, col / endCol are
 *   CPython's 1-based offset / end_offset (endCol only when CPython has a real end) and the traceback, caret line
 *   included, is what `python3 main.py` prints (rendered like Lib/traceback.py).
 *
 * ## Helpers
 *   pyRepr(View | value), pyStr(...), typeName(...)  (JS numbers: integers count as int, others as float;
 *                                                    { __float: 2 } forces float)
 *   tokenize(src, opts?) → [{ type: 'keyword'|'name'|'builtin'|'number'|'string'|'fstring'|'comment'|'op'|'newline'|'indent'|'dedent'|'error', text, line, col }]
 *     line is 1-based; col is the JS string index (UTF-16) of the token in its line, so line.slice(col) works with
 *     emoji. A name after '.' or 'def' is 'name', not 'builtin' (obj.print, "{}".format, def len). match / case are
 *     'keyword' only as statement headers (`match x:`, `case 1:`), 'name' otherwise (`match += 1`, `match(x)`).
 *     DEDENT tokens at the end of the file are on the line after the last line, col 0 (like Python's tokenize).
 *     opts.fstrings === 'split': an f-string is given as its parts, like Python 3.12+'s tokenize: 'fstring-start'
 *     (f" with its prefix), 'fstring-middle' (literal text as written), op '{', the tokens of the field's expression,
 *     op '=' (debug), op '!' + name (conversion), op ':' + the format spec ('fstring-middle' and nested fields),
 *     op '}', 'fstring-end'; the parts tile the source. Default: one 'fstring' token per f-string.
 *   evalExpression(src, vars = {}, opts = {}) → { ok, value: View, type, repr, output, error?: PyError }
 *     vars: JS numbers/strings/arrays or snapshot Views. A View keeps its type: containers are rebuilt from their
 *     items / entries (shared and self-containing parts stay shared: `C[1] is C`), a defaultdict keeps its
 *     default_factory, and a function / module / type / other object View made in this session gives the object
 *     itself (its repr and id() are the ones the program sees). A container View cut to 200 items (truncated) is
 *     rebuilt whole by reading its repr, which works while the repr is complete; a View whose repr was cut too
 *     (reprTruncated: a container shown with more than 5000 characters) cannot be rebuilt. A View that cannot be
 *     rebuilt (e.g. that one, or a function View that went through JSON) gives ok: false with a TypeError.
 *     Evaluating never changes the program: a function of the program that the expression calls (directly, or
 *     through max(key=f), map(f, ...)...) runs as a copy, with copies of the globals, closures and containers it can
 *     reach (as they are now), the program's random state continued without moving it on, and its output in
 *     result.output. Shared, not copied: host objects and host functions, iterators and generators, objects of library
 *     classes (random.Random(...)). The standard modules of the program given as Views are this evaluation's own.
 *     opts: inputs (feeds input(), like createRun's: an array or a function; at the end of them input() raises
 *     EOFError), echoInput (default false: output shows prompts only, like piped stdin), calls: false (refuse to call
 *     the program's functions and host functions at all: the error is { type: 'CallRefused', callRefused: true, name }).
 *   reduceExpression(src, vars = {}, opts = {}) → { ok, steps: ['2 + 3 * 4 ** 2', '2 + 3 * 16', '2 + 48', '50'], error? }
 *     steps[0] is the expression exactly as typed; then one operator per step in Python's evaluation order (parentheses
 *     the student wrote stay around parts not reduced yet); variables are substituted in one step, and a name that is
 *     not defined stays a name until evaluation reaches it (`x > 0 or undefined_name` short-circuits like Python);
 *     `and`/`or` return an operand; comparison chains become `a < b and b < c` style steps; conditional expressions
 *     test the condition first. Literals are values from the start (`"x" in ["x", "y"]` → `True` in one step; a sign
 *     written on a number, `-3`, is part of it) and keep the spelling the student typed until an operator uses them
 *     (`"5" + 3 * 2` → `"5" + 6`; `0x1F + 2 * 3` → `0x1F + 6`); a sign applied to the result of an operation is a step
 *     of its own (`-2 ** 2` → `-(4)` → `-4`); no step shows a function, type, method, lambda or iterator as a
 *     value (`max([4, -9, 2], key=abs)` → `-9`; `list(map(str, [1, 2]))` → `['1', '2']`), except as the final result.
 *     opts: as for evalExpression (inputs, echoInput, calls: false stops the reduction at the call with a
 *     'CallRefused' error).
 *   pyMath: { sin, cos, tan, asin, acos, atan, atan2, exp, exp2, expm1, log, log2, log10, log1p, pow, sqrt, hypot,
 *     radians, degrees } for JS numbers with python3's exact results (the ports minipy's math module uses).
 *   KEYWORDS (35 hard keywords of 3.13), BUILTIN_NAMES (public names of CPython 3.13's builtins module).
 *
 * ## Host modules
 *   opts.modules maps a module name (dotted names allowed: 'matplotlib.pyplot') to a JS object. Function properties
 *   become Python callables. Arguments → JS: int → Number (BigInt when unsafe), float → Number, str → string, bool,
 *   list/tuple/set → Array, dict → plain object, None → null, host objects → the original JS object, Python functions →
 *   JS functions (called synchronously); keyword arguments arrive as a final { __kwargs: {...} } argument.
 *   Return values → Python: integral Number → int (use { __float: x } for a float), other Number → float,
 *   string → str, Array → list, { __tuple: [...] } → tuple, null/undefined → None, plain data object → dict,
 *   object with function properties (or a class instance) → Python object whose attributes/methods are its properties
 *   (repr from obj.__repr__() or `<${obj.__pyname} object at 0x...>`); a JS class (or a function with prototype
 *   methods) is called with `new` (turtle.Turtle()), and the methods a module object has on its class can be imported
 *   (from matplotlib.pyplot import plot); the same JS object always becomes the same
 *   Python object (`is`, id() and View ids agree), the same JS function the same Python callable, and a Python
 *   function passed to the host comes back as itself. Reading module.attr reads the JS property as it is now, and
 *   `module.attr = v` sets it on the JS object (seen by the host's own methods). Dotted names of any depth work:
 *   { 'a.b.c': obj } makes `import a.b.c`, `a.b.c.v`, `from a.b import c`.
 *   Arguments also convert dict views (d.keys(), d.values(), d.items()) and iterators (map, zip, filter, reversed,
 *   enumerate, generator expressions) to Arrays (consumed, like list()), and a slice to { __slice: [start, stop,
 *   step] }. With createRun's hostArgs: 'typed', every value handed to the host keeps the types a JS number / Array
 *   cannot show, mirroring the return conventions: a float with an integral value (80.0, -0.0) arrives as
 *   { __float: 80 } (other floats stay numbers, ints are numbers) and a tuple as { __tuple: [...] }.
 *   A JS class exposed by a module (turtle.Turtle) is a Python type: <class 'turtle.Turtle'> (module and name from a
 *   static or prototype __pyname, else the module and the class name), called with `new`, and type(obj) / isinstance()
 *   know its instances (subclasses follow the JS class chain); its methods read from the class are functions taking
 *   the instance first (turtle.Turtle.forward(t, 10)). A method read from a host object is a bound method
 *   (<bound method Turtle.forward of ...>). dir(obj) and AttributeError's "Did you mean" (CPython 3.13 wording) see the
 *   object's own properties and the methods of its classes.
 *   Host objects can act as Python values through dunder methods on the JS object: __str__ (str(), print, f-strings;
 *   __repr__ for repr()), __len__, __bool__, __iter__ (an Array, a JS iterator or iterable: unpacking, for, list(), in),
 *   __getitem__ / __setitem__ / __delitem__, __contains__, __eq__ / __ne__ / __lt__ / __le__ / __gt__ / __ge__,
 *   __add__ / __radd__ and the other arithmetic operators (__sub__, __mul__, __truediv__, __floordiv__, __mod__,
 *   __pow__, __matmul__, __and__, __or__, __xor__, __lshift__, __rshift__ and their __r...__ forms), __neg__, __pos__,
 *   __invert__, __abs__ — with Python's fallbacks (a.__eq__(b), then b.__eq__(a), then identity). Arguments arrive
 *   converted to JS and results are converted back; returning undefined (or { __notImplemented: true }) means
 *   NotImplemented. Such an object still is not a tuple for isinstance(), and hashes by identity.
 *   Errors: a thrown Error with e.pyType = 'ValueError' (any builtin exception name) raises that exception; an
 *   instance of a JS class extending Error that a module exposes (turtle.TurtleGraphicsError; base: its static pyBase
 *   name or Exception) raises that exception class, which `except turtle.TurtleGraphicsError:` catches and the
 *   traceback prints as `turtle.TurtleGraphicsError: ...`; e.pyType naming another class ('TurtleGraphicsError',
 *   optional e.pyBase / e.pyModule) raises the module's exception class of that name (made once if the module does not
 *   expose one); other errors raise RuntimeError(e.message). The same holds for attribute getters of host objects and
 *   host modules. A Python function
 *   the host keeps and calls later (an event handler) runs with the run's ids; if it raises, the host gets a JS Error
 *   with name = the exception type, message = its message, pyError = the PyError (traceback included) and pyExc (the
 *   exception, which stays itself if the error travels back into Python through a host call).
 *
 * ## Language subset and deviations from CPython
 *   Supported: everything in PY-SIMS-BRIEF "Language subset" plus lambda, list/set/dict comprehensions, generator
 *   expressions, walrus, *args/**kwargs, keyword-only parameters, nonlocal, closures, try/finally, raise from,
 *   match (literal, capture, wildcard, |, sequence, mapping, class-pattern for builtin types, guards), del, assert,
 *   type annotations (evaluated like CPython: list[int], dict[str, list[int]], tuple[int, ...] are
 *   types.GenericAlias, int | None is a types.UnionType, usable in isinstance()), `if __name__ == "__main__":`,
 *   f-strings with PEP 701 syntax (reused quotes, multi-line fields with comments, `=` debug text, !r/!s/!a, nested
 *   format specs, \N{...} in literal text and specs), help() of the program's functions, of the functions of
 *   builtins / math / random / statistics and of the methods of str / list / dict / tuple / set / int / float /
 *   deque / Counter (help(str.upper), help("x".upper)), globals() / vars() / locals() at module level as live
 *   namespaces (globals()["x"] = 1 creates x).
 *   Text follows CPython 3.13's Unicode 15.1 whatever the JS engine knows (minipy/unidata.js, uninames.js): the str
 *   predicates, case mappings, isidentifier(), repr's escaping and every character name of \N{...} (aliases and
 *   algorithmic CJK / Hangul names included). Strings are code point sequences: lone surrogates (chr(0xD83D))
 *   stay separate characters (kept internally as U+FD800..U+FDFFF, so those Plane-15 private-use characters cannot
 *   be told apart from them), and printing one raises UnicodeEncodeError like python3 with a UTF-8 console.
 *   Not supported (SyntaxError "minipy does not support 'class' yet" etc., reported where CPython would accept the
 *   code): class, with, async def / async for / async with / await (`async` or `await` used as a name is "invalid
 *   syntax" like CPython), yield in a function (generators; at module level it is "'yield' outside
 *   function" like CPython), decorators, type aliases, bytes literals, complex
 *   numbers (also a negative float raised to a fractional power, which gives a complex in CPython, raises ValueError).
 *   open/eval/exec, namedtuple and type(name, bases, dict) raise clear errors.
 *   Modules: math, random (bit-exact Mersenne Twister and Lib/random.py algorithms incl. seed(str) via SHA-512),
 *   statistics (a port of Lib/statistics.py: exact rational sums, mean fmean geometric_mean harmonic_mean (with
 *   weights) median median_low median_high median_grouped mode multimode quantiles variance pvariance stdev pstdev
 *   covariance correlation linear_regression NormalDist), random.Random(seed) instances and every distribution of
 *   random.py, time (sleep is a no-op; time, perf_counter, gmtime / localtime (host time zone) / mktime /
 *   strftime / strptime / asctime / ctime with struct_time), collections (deque, Counter, defaultdict,
 *   OrderedDict), datetime (date, datetime, time, timedelta incl. // % divmod, combine, strptime (Lib/_strptime.py),
 *   strftime, today, now), string (constants, capwords, Template), keyword, sys (exit, argv, maxsize, recursion limit,
 *   stdin.readline / read / iteration, stdout / stderr write / flush, print(file=...), version_info, float_info,
 *   int_info, get / set_int_max_str_digits, modules, byteorder, implementation), copy. Other standard modules →
 *   ModuleNotFoundError "minipy does not
 *   support the 're' module yet"; unknown modules → "No module named 'numpy'" like CPython.
 *   Floating point: repr, formatting, round(x, n), int/float conversion, true division, sum() (CPython's int / float
 *   phases: Neumaier compensation for float items only), math.fsum/sumprod/hypot/dist/sqrt, float.hex/fromhex are
 *   exact/correctly rounded like CPython. The libm functions CPython calls are
 *   bit-exact ports of glibc 2.39 on x86-64 (its FMA code paths, picked on every CPU since ~2013; minipy/libm.js):
 *   ** and pow() on floats (also float ** int and int ** negative int: 7.67 ** 3 == 451.217663, and x ** 0.5 is not
 *   always math.sqrt(x)), math.pow/exp/exp2/expm1/log/log2/log1p/sin/cos/tan/asin/acos/atan/atan2, checked bit for
 *   bit against the system libm on ~20 million arguments. log10, sinh/cosh/tanh, asinh/acosh/atanh, cbrt and erf/erfc
 *   are ports of glibc's algorithms on top of them and gamma/lgamma of CPython's own Lanczos code (minipy/crmath.js);
 *   a 240,000-call sweep of all of these matched python3 exactly. Results are those of python3 on x86-64 Linux; other
 *   platforms' libms (macOS, Windows) differ from it in the last bit for some arguments.
 *   Syntax errors: messages and locations follow CPython's tokenizer and PEG parser, including its invalid_* rules,
 *   PEG backtracking and the rule that a later tokenizer error replaces a parser error (a sweep of ~8,000 mutated
 *   programs matched python3 on 99.7%). Differences remain in rare cases that depend on the PEG memo cache, some
 *   malformed f-strings, and SyntaxWarnings (e.g. "invalid escape sequence"), which minipy does not report.
 *   Known differences: str hashes are deterministic, so iteration order of sets of strings can differ from CPython
 *   (which randomises it per process); hash() of str differs (except hash('') == 0, as in CPython); tracebacks omit frames inside CPython's own library
 *   files (e.g. statistics.py) and the ~~~^^^ caret lines; addresses in reprs like <function f at 0x...> differ.
 *   Sorting is a port of CPython's timsort, so lists with nan and a sort that fails midway (list.sort() keeps the
 *   partial order) come out the same. Floats are JS numbers, so a nan has no object identity of its own: a nan
 *   that an expression has just created (float("nan"), x * 0, a call) counts as a new object where it is used
 *   directly (in a set / dict display, a subscript, `in`, `is`, a set / dict / list method argument), while two
 *   nan values that went through variables or containers count as the same object.
 *   Recursion: the limit is 1000 frames like CPython (the 999th nested call works, the next raises RecursionError);
 *   repr / str / == of nested containers go ~10000 levels deep like CPython's C recursion limit, then RecursionError
 *   "maximum recursion depth exceeded while getting the repr of an object" / "... in comparison".
 *   Performance: ~0.5 µs per simple step in node/Chromium (100k steps ≈ 50–120 ms); deep recursion is flat
 *   (trampolined generators), so the JS stack never overflows for Python-level recursion.
 */
import { scan, KEYWORDS as KW, tokenizeForHighlight } from './minipy/tokenizer.js';
import { parse, parseExpressionSource, PySyntaxError } from './minipy/parser.js';
/**
 * Resolves once the Unicode character-name table for \N{...} escapes has loaded (it is fetched in the background
 * when minipy is imported). Only code that compiles \N{...} right at startup, such as the test scripts, needs to wait.
 */
export { unicodeNamesReady } from './minipy/parser.js';
import { analyze } from './minipy/compiler.js';
import { Interp, StepLimitError, Frame, Driver, annotateLoose } from './minipy/interp.js';
import { makeSandbox } from './minipy/sandbox.js';
import { makeView, frameLocals, LIVE, FACTORY, IDS } from './minipy/views.js';
import {
  PyExc, EXC, T, repr as pyReprValue, str as pyStrValue, shortTypeName as pyTypeName, excStr, PyList, PyTuple, PyDict,
  PySet, PyDeque, PyRange, pyErr, IdSpace, useIdSpaces, setIntMaxStrDigits, forkIdSpaces, PyModule, CallRefusedError,
} from './minipy/values.js';
import { BUILTINS_ORDER } from './minipy/pydata.js';
import { reduceAst } from './minipy/reduce.js';
import { formatSyntaxError, errorLineText } from './minipy/synerr.js';
import { importModule, hypotValues } from './minipy/modules.js';
import * as LIBM from './minipy/libm.js';
import { log10 as crLog10 } from './minipy/crmath.js';

export const KEYWORDS = KW.slice();
/**
 * The float functions of Python's math module for JS numbers, with python3's exact results (minipy's ports of glibc
 * 2.39, the same code math.sin / math.cos / math.atan2 ... and ** use; JS Math differs in the last bit for some
 * arguments). For hosts that must compute what CPython would (turtle's Vec2D.rotate, heading(), distance()). Plain JS
 * functions: no Python errors (NaN where math would raise ValueError).
 */
export const pyMath = Object.freeze({
  sin: LIBM.sin, cos: LIBM.cos, tan: LIBM.tan, asin: LIBM.asin, acos: LIBM.acos, atan: LIBM.atan, atan2: LIBM.atan2,
  exp: LIBM.exp, exp2: LIBM.exp2, expm1: LIBM.expm1, log: LIBM.log, log2: LIBM.log2, log10: crLog10, log1p: LIBM.log1p,
  pow: LIBM.pow, sqrt: Math.sqrt, hypot: (...xs) => hypotValues(xs.map(Number)),
  radians: (x) => x * (Math.PI / 180.0), degrees: (x) => x * (180.0 / Math.PI),
});
export const BUILTIN_NAMES = BUILTINS_ORDER.filter((n) => !n.startsWith('_'));
void scan;

// ------------------------------------------------------------------ compile
function syntaxPyError(err, rawLines, filename) {
  // rawLines: the source split on '\n' (a trailing '' when it ends with a newline), so `text` is CPython's
  const text = errorLineText(rawLines, err.line);
  const out = {
    type: err.type, message: err.msg, line: err.line, col: err.apiCol ?? err.col, text: (text ?? '').replace(/\n$/, ''),
    traceback: formatSyntaxError(err, text, filename), frames: [],
  };
  if (err.endLine != null && err.endLine > 0) out.endLine = err.endLine;
  if (err.endCol != null && err.endCol > 0) out.endCol = err.endCol;
  return out;
}

/**
 * Parse and check a program (syntax errors are found before running, like CPython).
 * @param {string} source
 * @param {{filename?: string}} [opts]
 */
export function compile(source, opts = {}) {
  const filename = opts.filename || 'main.py';
  const src = String(source ?? '').replace(/^\ufeff/, '').replace(/\r\n?/g, '\n');
  const rawLines = src.split('\n');
  const lines = rawLines.slice();
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
  const r = parse(src);
  if (!r.ok) return { ok: false, error: syntaxPyError(r.error, rawLines, filename), lines };
  try { analyze(r.ast); } catch (e) {
    if (e instanceof PySyntaxError) return { ok: false, error: syntaxPyError(e, rawLines, filename), lines };
    throw e;
  }
  return { ok: true, program: { ast: r.ast, lines, filename, source: src }, lines };
}

// ------------------------------------------------------------------ errors
function formatTraceback(I, e) {
  // traceback.TracebackException (compact=True, as the default excepthook uses): follow __cause__, else
  // __context__ unless suppressed, skipping exceptions already shown (its _seen set: `raise e from e`, cycles)
  const seen = new Set([e]);
  const chain = [e];
  for (let x = e; chain.length < 10000;) {
    let next = null, sep = '';
    if (x.cause && !seen.has(x.cause)) { next = x.cause; sep = '\n\nThe above exception was the direct cause of the following exception:\n\n'; }
    else if (!x.cause && x.context && !x.causeSet && !seen.has(x.context)) { next = x.context; sep = '\n\nDuring handling of the above exception, another exception occurred:\n\n'; }
    if (!next) break;
    seen.add(next);
    chain.push(sep, next);
    x = next;
  }
  let s = '';
  for (let i = chain.length - 1; i >= 0; i -= 2) s += formatOneTraceback(I, chain[i]) + (i ? chain[i - 1] : '');
  return s;
}
function formatOneTraceback(I, e) {
  let s = '';
  if (e.tb.length) s += 'Traceback (most recent call last):\n' + formatFrames(I, e.tb);
  if (e.syntaxInfo) {
    // a SyntaxError raised while running (eval): CPython prints its location like a compile-time one
    const si = e.syntaxInfo;
    let msg;
    try { msg = pyStrValue(e.args[0]); } catch (err) { msg = ''; }
    s += formatSyntaxError({ type: e.type.qualName, msg, line: si.line, col: si.col, endLine: si.endLine, endCol: si.endCol }, si.text, si.filename);
    if (e.notes) for (const n of e.notes) s += '\n' + pyStrValue(n);
    return s;
  }
  s += excLineOf(e);
  if (e.notes) for (const n of e.notes) s += '\n' + pyStrValue(n);
  return s;
}
/** frame lines like traceback.StackSummary.format(): runs of an identical frame collapse after 3 repetitions */
function formatFrames(I, frames) {
  let out = '', last = null, count = 0;
  const flush = () => { if (count > 3) { const n = count - 3; out += `  [Previous line repeated ${n} more time${n > 1 ? 's' : ''}]\n`; } };
  for (const t of frames) {
    const key = t.name + ':' + t.line;
    if (key !== last) { flush(); last = key; count = 0; }
    count++;
    if (count > 3) continue;
    out += `  File "${t.file || I.filename}", line ${t.line}, in ${t.name}\n`;
    if (t.file) continue;   // code from eval(): no source to show
    if (t.endLine && t.endLine > t.line) { out += sourceSegment(I.lines, t); continue; }
    const src = I.lines[t.line - 1];
    if (src && src.trim()) out += `    ${src.trim()}\n`;
  }
  flush();
  return out;
}
/**
 * The source lines of a multi-line instruction as CPython 3.13's traceback prints them (StackSummary
 * .format_frame_summary without the caret lines): dedented, only the first / last line and the lines around the
 * operator or brackets, longer gaps shown as "...<N lines>...".
 */
function sourceSegment(lines, t) {
  const raw = lines.slice(t.line - 1, t.endLine);
  if (!raw.length || !raw.join('').trim()) return '';
  const all = dedentLines(raw);
  const last = all.length - 1;
  const sig = new Set([0, last]);
  const a = t.anchors;
  if (a) {
    // find the operator / '(' / '[' after the left operand, function or value (skipping spaces, ')' for operators,
    // and continuing on the next line after a backslash or a comment)
    let ln = a.line - t.line, col = a.col;
    const stop = a.kind === 'binop' ? (c) => !/\s/.test(c) && c !== ')' : a.kind === 'call' ? (c) => c === '(' : (c) => c === '[';
    const valid = () => { while (ln < raw.length && col >= raw[ln].length) { col = 0; ln++; } return ln < raw.length; };
    let found = valid();
    while (found) {
      const c = raw[ln][col];
      if (c === '\\' || c === '#') { ln++; col = 0; found = valid(); } else if (!stop(c)) { col++; found = valid(); } else break;
    }
    if (found) {
      const left = ln, right = a.kind === 'binop' ? ln : a.endLine - t.line;
      for (const x of [left - 1, left, left + 1, right - 1, right, right + 1]) if (x >= 0 && x <= last) sig.add(x);
    }
  }
  const order = [...sig].sort((x, y) => x - y);
  let out = '';
  order.forEach((ln, i) => {
    if (i) {
      const diff = ln - order[i - 1];
      if (diff === 2) out += `    ${all[ln - 1]}\n`;
      else if (diff > 2) out += `    ...<${diff - 1} lines>...\n`;
    }
    out += `    ${all[ln]}\n`;
  });
  return out;
}
/** textwrap.dedent of a list of lines (whitespace-only lines become empty) */
function dedentLines(lines) {
  let margin = null;
  for (const l of lines) {
    if (!l.trim()) continue;
    const ind = /^[ \t]*/.exec(l)[0];
    if (margin === null) margin = ind;
    else { let k = 0; while (k < margin.length && k < ind.length && margin[k] === ind[k]) k++; margin = margin.slice(0, k); }
  }
  return lines.map((l) => (!l.trim() ? '' : l.slice((margin || '').length)));
}
function excLineOf(e) {
  let msg;
  try { msg = excStr(e); } catch (err) { msg = '<exception str() failed>'; }
  const name = e.type.qualName;
  return (msg === '' ? name : name + ': ' + msg) + (e.suggestion || '');
}
function toPyError(I, e) {
  const frames = e.tb.map((t) => (t.file ? { name: t.name, line: t.line, file: t.file } : { name: t.name, line: t.line }));
  // the line is the innermost one of the program itself (not of code run by eval())
  const own = frames.filter((t) => !t.file);
  const last = own[own.length - 1];
  const line = last ? last.line : null;
  let message;
  try { message = (e.syntaxInfo ? pyStrValue(e.args[0]) : excStr(e)) + (e.suggestion || ''); } catch (err) { message = ''; }
  return { type: e.type.name, message, line, text: line ? (I.lines[line - 1] ?? '') : '', traceback: formatTraceback(I, e), frames };
}

// ------------------------------------------------------------------ runs
class Run {
  constructor(program, opts) {
    if (program && program.program && program.ok) program = program.program;
    if (!program || !program.ast) throw new Error('createRun: expected the program from a successful compile()');
    // object numbers (id(), addresses in reprs, View ids) count per run: the same program gives the same numbers
    this._ids = [new IdSpace(), new IdSpace()];
    const prevIds = useIdSpaces(this._ids);
    try { this._I = new Interp(program, opts || {}); } finally { useIdSpaces(prevIds); }
    this._I.viewer = (v) => makeView(v);
    // a Python function the host calls later (an event handler): it runs with this run's object ids and digit
    // limit, and an error reaches the host as a JS Error carrying the PyError
    this._I.enterHost = () => {
      const prevIds = useIdSpaces(this._ids);
      const prevDigits = setIntMaxStrDigits(this._I.intMaxStrDigits);
      return () => { useIdSpaces(prevIds); this._I.intMaxStrDigits = setIntMaxStrDigits(prevDigits); };
    };
    this._I.pyErrorOf = (e) => toPyError(this._I, e);
    this._drv = new Driver(this._I.main());
    this._q = [];
    this.status = 'ready';
    this._last = null;
    this._error = null;
    this._resume = undefined;
    this._hasResume = false;
    this._line = null;
    this._nextLine = null;
    this._errFrames = null;
  }
  get output() { return this._I.out; }
  /** extension: what the program itself wrote (output without the final traceback) */
  get stdout() { return this._I.stdoutText; }
  get steps() { return this._I.steps; }

  step() {
    const prevIds = useIdSpaces(this._ids);
    const prevDigits = setIntMaxStrDigits(this._I.intMaxStrDigits);
    try { return this._step(); } finally { useIdSpaces(prevIds); this._I.intMaxStrDigits = setIntMaxStrDigits(prevDigits); }
  }
  _step() {
    if (this._q.length) return this._deliver(this._q.shift());
    if (this.status === 'done' || this.status === 'error') return this._last;
    if (this.status === 'waiting-input' && !this._hasResume) return this._last;
    const I = this._I;
    let r;
    try {
      const v = this._resume;
      this._resume = undefined; this._hasResume = false;
      this.status = 'running';
      r = this._drv.resume(v);
    } catch (e) {
      this._flushPending();
      this._q.push(this._failEvent(e));
      return this._deliver(this._q.shift());
    }
    this._flushPending();
    this._q.push(r.done ? { kind: 'done' } : r.event);
    return this._deliver(this._q.shift());
  }
  _flushPending() { const p = this._I.pending; while (p.length) this._q.push(p.shift()); }
  _deliver(ev) {
    this._last = ev;
    switch (ev.kind) {
      case 'line': this._line = this._nextLine; this._nextLine = ev.line; this.status = 'running'; break;
      case 'input': this.status = ev.wait ? 'waiting-input' : 'running'; break;
      case 'done': if (!this._q.length) { this.status = 'done'; this._line = this._nextLine ?? this._line; this._nextLine = null; } break;
      case 'exception': {
        // line = the statement that was running when the error was raised (innermost frame of the error)
        const fr = this._errFrames && this._errFrames.length && ev.error.type !== 'StepLimit' ? this._errFrames[this._errFrames.length - 1] : null;
        this._line = (fr && fr.line) || this._nextLine || this._line;
        if (!this._q.length) { this.status = 'error'; }
        break;
      }
      default: if (this.status !== 'waiting-input') this.status = 'running';
    }
    if (ev.kind === 'done' && this._q.length === 0) this.status = 'done';
    return ev;
  }
  _failEvent(e) {
    const I = this._I;
    if (e instanceof PyExc && e.type === EXC.SystemExit) {
      // sys.exit(None / int / bool) ends quietly; any other argument is printed (to stderr in CPython: it shows in
      // the console text, run.output, but not in the program's own output, run.stdout)
      const a = e.args[0];
      if (a !== undefined && a !== null && typeof a !== 'bigint' && typeof a !== 'boolean') {
        let msg;
        try { msg = pyStrValue(a); } catch (err) { msg = ''; }
        const text = msg + '\n';
        I.out += text;
        this._q.push({ kind: 'output', text, stderr: true });
      }
      this._done = true;
      return { kind: 'done' };
    }
    let err;
    if (e instanceof PyExc) {
      err = toPyError(I, e);
      if (e.frameStack) this._errFrames = e.frameStack;
    } else if (e instanceof StepLimitError) {
      // the simulator's own brake, not a Python exception: no CPython-style traceback, nothing added to run.output
      // (python3 would simply keep running), and line = the last step that ran
      const stack = e.frames || I.frames;
      const frames = [];
      stack.forEach((fr, i) => { const ln = e.lines ? e.lines[i] : fr.line; if (ln) frames.push({ name: fr.name, line: ln }); });
      const line = e.lastLine ?? (frames.length ? frames[frames.length - 1].line : null);
      const msg = e.message;
      err = {
        type: 'StepLimit', message: msg, line, text: line ? I.lines[line - 1] ?? '' : '',
        traceback: msg.charAt(0).toUpperCase() + msg.slice(1) + '.', frames,
        simulatorLimit: true, limit: e.steps, limitKind: e.hidden ? 'iterations' : 'steps',
      };
      this._errFrames = stack.slice();
      this._error = err;
      return { kind: 'exception', error: err };
    } else if (e instanceof RangeError && String(e.message).includes('call stack')) {
      err = { type: 'RecursionError', message: 'maximum recursion depth exceeded', line: null, text: '', traceback: 'RecursionError: maximum recursion depth exceeded', frames: [] };
    } else {
      err = { type: 'InternalError', message: 'minipy internal error: ' + (e && e.message ? e.message : String(e)), line: null, text: '', traceback: 'InternalError: ' + (e && e.stack ? e.stack : String(e)), frames: [] };
    }
    this._error = err;
    // like `python3 main.py 2>&1`: CPython flushes stdout and writes the traceback straight after it, so output
    // that does not end with a newline runs into "Traceback" ('xTraceback (most recent call last):')
    I.out += err.traceback + '\n';
    return { kind: 'exception', error: err };
  }

  runToEnd() {
    let ev = this._last;
    for (;;) {
      ev = this.step();
      if (this.status === 'done' || this.status === 'error' || this.status === 'waiting-input') {
        if (this._q.length && this.status !== 'waiting-input') continue;
        return ev;
      }
    }
  }

  provideInput(text) {
    if (this.status === 'waiting-input' && !this._hasResume) {
      // several lines answer this input() and the next ones
      const lines = text === null || text === undefined ? [null] : String(text).split('\n');
      if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
      this._resume = lines[0];
      for (const l of lines.slice(1)) this._I.queueInput(l);
      this._hasResume = true;
      this.status = 'running';
      return true;
    }
    this._I.queueInput(text);
    return false;
  }

  snapshot() {
    const prevIds = useIdSpaces(this._ids);
    const prevDigits = setIntMaxStrDigits(this._I.intMaxStrDigits);
    try { return this._snapshot(); } finally { useIdSpaces(prevIds); setIntMaxStrDigits(prevDigits); }
  }
  _snapshot() {
    const I = this._I;
    const src = this._errFrames && this.status === 'error' ? this._errFrames : I.frames;
    const shown = new Map();   // a container shown again (alias, shared, in several frames) reuses its View object
    const frames = src.map((f, i) => ({ name: f.name, id: f.fid, line: f.line || null, locals: frameLocals(f, i === 0 && f.func === null && f.name === '<module>', shown) }));
    return {
      status: this.status,
      line: this._line,
      nextLine: this.status === 'done' || this.status === 'error' ? null : this._nextLine,
      steps: I.steps,
      output: I.out,
      error: this._error ? JSON.parse(JSON.stringify(this._error)) : null,
      frames,
    };
  }
}

/**
 * Create a run (a paused program) from compile(...).program.
 * @returns {Run}
 */
export function createRun(program, opts = {}) { return new Run(program, opts); }

// ------------------------------------------------------------------ helpers
function fromJs(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Number.isInteger(v) && !Object.is(v, -0) ? BigInt(v) : v;
  if (typeof v === 'bigint' || typeof v === 'string' || typeof v === 'boolean') return v;
  if (Array.isArray(v)) return new PyList(v.map(fromJs));
  if (typeof v === 'object') {
    if ('__float' in v) return Number(v.__float);
    if ('__tuple' in v) return new PyTuple(v.__tuple.map(fromJs));
    if (typeof v.repr === 'string' && typeof v.type === 'string') return viewToValue(v);
    if (v.constructor === Object) { const d = new PyDict(); for (const k of Object.keys(v)) d.set(k, fromJs(v[k])); return d; }
  }
  return v;
}
/**
 * A snapshot View back to a Python value, keeping its type: containers are rebuilt from items / entries (shared
 * and cyclic parts by View id, so `C[1] is C` holds for a list that contains itself), a defaultdict keeps its
 * default_factory; functions, modules, types and other objects come back as the object itself (a View made in this
 * session remembers it). Throws a TypeError PyExc when the View cannot be turned into a value.
 */
function viewToValue(view, memo = new Map()) {
  if (view.id && memo.has(view.id)) return memo.get(view.id);
  const live = view[LIVE];
  const tn = view.typeName || view.type;
  const fromRepr = () => {
    const r = evalInternal(view.repr, {}, true, /\b(deque|Counter|OrderedDict|defaultdict)\(/.test(view.repr));
    if (r.ok) return r.raw;
    if (live !== undefined) return live;
    throw pyErr('TypeError', `cannot use the ${tn} value ${view.repr} here (minipy cannot rebuild it from its View)`);
  };
  switch (view.type) {
    case 'NoneType': return null;
    case 'bool': return view.repr === 'True';
    case 'int': return /^-?\d+$/.test(view.repr) ? BigInt(view.repr) : fromRepr();
    case 'float': {
      if (/^-?(inf|nan)$/.test(view.repr)) return view.repr.startsWith('-') ? -Infinity : view.repr === 'nan' ? NaN : Infinity;
      const x = Number(view.repr);
      return Number.isNaN(x) ? fromRepr() : x;
    }
    case 'str': return fromRepr();
    case 'range': return view.start !== undefined ? new PyRange(BigInt(view.start), BigInt(view.stop), BigInt(view.step)) : fromRepr();
  }
  const kids = view.entries || view.items;
  if (view.cyclic || view.truncated || !kids) {
    if (live !== undefined) return live;
    return fromRepr();
  }
  const add = (v) => { if (view.id) memo.set(view.id, v); return v; };
  switch (view.type) {
    case 'list': { const l = add(new PyList([])); for (const x of view.items) l.items.push(viewToValue(x, memo)); return l; }
    case 'tuple': { const t = add(new PyTuple([])); for (const x of view.items) t.items.push(viewToValue(x, memo)); return t; }
    case 'deque': { const d = add(new PyDeque([], view.maxlen ?? null)); for (const x of view.items) d.items.push(viewToValue(x, memo)); return d; }
    case 'set': { const st = add(new PySet(tn === 'frozenset')); for (const x of view.items) st.add(viewToValue(x, memo)); return st; }
    case 'dict': {
      const ctype = tn === 'Counter' ? T.Counter : tn === 'defaultdict' ? T.defaultdict : tn === 'OrderedDict' ? T.OrderedDict : null;
      const d = add(new PyDict(ctype));
      if (ctype === T.defaultdict) d.factory = view[FACTORY] !== undefined ? view[FACTORY] : defaultFactoryFromRepr(view.repr);
      for (const [k, x] of view.entries) d.set(viewToValue(k, memo), viewToValue(x, memo));
      return d;
    }
  }
  if (live !== undefined) return live;
  return fromRepr();
}
/** default_factory of a defaultdict View made elsewhere: defaultdict(<class 'int'>, {...}) */
function defaultFactoryFromRepr(r) {
  const m = /^defaultdict\(<class '(\w+)'>/.exec(r);
  if (m && T[m[1]] && T[m[1]].module === 'builtins') return T[m[1]];
  return null;
}
const isView = (v) => v && typeof v === 'object' && typeof v.repr === 'string' && typeof v.type === 'string' && 'id' in v;

export function pyRepr(v) { if (isView(v)) return v.repr; return pyReprValue(fromJs(v)); }
export function pyStr(v) {
  if (isView(v)) { if (v.type === 'str') { const raw = viewToValue(v); return typeof raw === 'string' ? raw : v.repr; } return v.repr; }
  return pyStrValue(fromJs(v));
}
export function typeName(v) { if (isView(v)) return v.typeName || v.type; return pyTypeName(fromJs(v)); }
export function tokenize(src, opts = {}) { return tokenizeForHighlight(src, new Set(BUILTIN_NAMES), opts); }

function makeExprInterp(vars, opts = {}) {
  const prog = { ast: { t: 'Module', body: [] }, lines: [], filename: '<stdin>' };
  const I = new Interp(prog, {
    maxSteps: opts.maxSteps ?? 100000, seed: opts.seed ?? 0, inputs: opts.inputs ?? [], eofWhenExhausted: true,
    echoInput: !!opts.echoInput,
  });
  I.viewer = (v) => makeView(v);
  // the program's own functions (function Views) run as copies, so evaluating an expression for display never
  // changes the program (calls: false refuses to run them, and host functions, at all)
  const sb = makeSandbox(I, Frame);
  if (opts.calls === false) { I.callsRefused = true; I.foreignCall = (fn) => { throw new CallRefusedError(fn.qualname || fn.name); }; } else I.foreignCall = (fn) => sb.adopt(fn);
  for (const k of Object.keys(vars || {})) {
    let v = fromJs(vars[k]);
    if (v instanceof PyModule) v = sb.mapModule(v);
    I.globals.set(k, v);
  }
  const f = I.moduleFrame;
  I.syncDepth = 1;
  return { I, f };
}
function exprError(I, e, src) {
  if (e instanceof PyExc) {
    if (!e.tb.length) e.tb.push({ name: '<module>', line: 1 });
    const err = toPyError({ ...I, lines: [src], filename: '<stdin>' }, e);
    err.traceback = formatTraceback({ filename: '<stdin>', lines: [src] }, e);
    return err;
  }
  if (e instanceof StepLimitError) return { type: 'StepLimit', message: e.message, line: 1, text: src, traceback: e.message.charAt(0).toUpperCase() + e.message.slice(1) + '.', frames: [], simulatorLimit: true, limit: e.steps, limitKind: e.hidden ? 'iterations' : 'steps' };
  if (e instanceof CallRefusedError) return { type: 'CallRefused', message: e.message, line: 1, text: src, traceback: 'CallRefused: ' + e.message, frames: [], callRefused: true, name: e.name };
  return { type: 'InternalError', message: String(e && e.message || e), line: 1, text: src, traceback: String(e && e.stack || e), frames: [] };
}
/** a variable passed to evalExpression / reduceExpression that cannot become a Python value */
function varsError(e, src) {
  if (!(e instanceof PyExc)) throw e;
  let message;
  try { message = excStr(e); } catch (err) { message = ''; }
  return { type: e.type.name, message, line: 1, text: src, traceback: `${e.type.name}: ${message}`, frames: [] };
}
/** the id spaces of the run that made a View among vars (so repr / id() of a live object match the program's) */
function viewIdSpaces(vars) {
  for (const k of Object.keys(vars || {})) { const v = vars[k]; if (v && typeof v === 'object' && v[IDS]) return v[IDS]; }
  return null;
}
function evalInternal(src, vars, rawOnly, collections, opts) {
  const base = viewIdSpaces(vars);
  const prevIds = useIdSpaces(base ? forkIdSpaces(base) : [new IdSpace(), new IdSpace()]);
  try { return evalInternal1(src, vars, rawOnly, collections, opts || {}); } finally { useIdSpaces(prevIds); }
}
function evalInternal1(src, vars, rawOnly, collections, opts) {
  const text = String(src ?? '');
  const p = parseExpressionSource(text.trim() ? text.trim() : text);
  if (!p.ok) return { ok: false, error: syntaxPyError(p.error, [text.trim()], '<stdin>') };
  let I, f;
  try { ({ I, f } = makeExprInterp(vars, opts)); } catch (e) { return { ok: false, error: varsError(e, text.trim()), output: '' }; }
  if (collections) {
    const mod = importModule(I, 'collections');
    for (const n of ['deque', 'Counter', 'OrderedDict']) I.globals.set(n, mod.dict.get(n));
  }
  try {
    annotateLoose(p.ast);
    const v = I.ev(p.ast, f);
    if (rawOnly) return { ok: true, raw: v };
    return { ok: true, value: makeView(v), type: pyTypeName(v), repr: pyReprValue(v), output: I.out };
  } catch (e) {
    return { ok: false, error: exprError(I, e, text.trim()), output: I.out };
  }
}
/**
 * Evaluate one expression with optional variables (JS numbers/strings/arrays or Views).
 * @returns {{ok: boolean, value?: object, type?: string, repr?: string, output?: string, error?: object}}
 */
export function evalExpression(src, vars = {}, opts = {}) { return evalInternal(src, vars, false, false, opts); }

/**
 * Step-by-step reduction of an expression (one operator per step).
 * @returns {{ok: boolean, steps: string[], error?: object}}
 */
export function reduceExpression(src, vars = {}, opts = {}) {
  const base = viewIdSpaces(vars);
  const prevIds = useIdSpaces(base ? forkIdSpaces(base) : [new IdSpace(), new IdSpace()]);
  try { return reduceExpression1(src, vars, opts || {}); } finally { useIdSpaces(prevIds); }
}
function reduceExpression1(src, vars, opts) {
  const text = String(src ?? '').trim();
  const p = parseExpressionSource(text);
  if (!p.ok) return { ok: false, steps: [], error: syntaxPyError(p.error, [text], '<stdin>') };
  let I, f;
  try { ({ I, f } = makeExprInterp(vars, opts)); } catch (e) { return { ok: false, steps: [text], error: varsError(e, text) }; }
  return reduceAst(p.ast, I, f, (e) => exprError(I, e, text), text);
}

