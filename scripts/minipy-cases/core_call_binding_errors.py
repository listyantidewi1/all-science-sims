# Call-site and binding errors: _PyObject_FunctionStr names, positional-only keyword conflicts
import math, random, statistics
from collections import deque, Counter
def f(a, b=1, **kw): return a
def outer():
    def inner(x): return x
    return inner
g = lambda x: x
for name, fn in [('f', f), ('inner', outer()), ('lambda', g), ('print', print), ('dict', dict), ('sqrt', math.sqrt),
                 ('split', "abc".split), ('sort', [].sort), ('len', len), ('max', max), ('sorted', sorted),
                 ('randint', random.randint), ('str.split', str.split), ('int', int), ('deque', deque), ('Counter', Counter),
                 ('mean', statistics.mean), ('append', deque().append), ('most_common', Counter().most_common)]:
    try:
        fn(1, a=1, **{'a': 2})
    except TypeError as e:
        print(name, '->', e)
    try:
        fn(*5)
    except TypeError as e:
        print(name, '->', e)
    try:
        fn(**5)
    except TypeError as e:
        print(name, '->', e)
    try:
        fn(1, **{1: 2})
    except TypeError as e:
        print(name, '->', e)

def p(a, b, /, c, *, d=0):
    return a, b, c, d
def q(a, /, b=2, **kw):
    return a, b, kw
calls = [
    lambda: p(1, 2, 3, d=4),
    lambda: p(1, 2, c=3),
    lambda: p(1, b=2, c=3),
    lambda: p(a=1, b=2, c=3),
    lambda: p(1, 2, 3, z=5, a=1),
    lambda: p(1, 2, 3, e=1),
    lambda: p(1, 2, cc=3),
    lambda: p(1, 2, 3, 4),
    lambda: p(1, 2, d=3),
    lambda: p(1, 2, 3, c=3),
    lambda: q(1, a=5),
    lambda: q(a=5),
    lambda: q(1, 2, b=3),
    lambda: q(1, **{'b': 7, 'a': 8}),
]
for i, c in enumerate(calls):
    try:
        print(i, c())
    except TypeError as e:
        print(i, 'TypeError:', e)
