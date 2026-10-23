# repr/str and == of deeply nested containers work far beyond the Python-level recursion limit (CPython's C
# stack limit is ~10000 levels); past it the RecursionError names the operation
a = []
b = []
t = ()
d = {}
for i in range(2500):
    a = [a]
    b = [b]
    t = (t, i)
    d = {i: d}
print(len(repr(a)), len(str(t)), len(str(d)), str(a)[:8], repr(t)[-12:], a == b, t != (t,))
for i in range(20000):
    a = [a]
try:
    print(len(repr(a)))
except RecursionError as e:
    print("RecursionError:", e)
for i in range(20000):
    b = [b]
try:
    print(a == b)
except RecursionError as e:
    print("RecursionError:", e)
