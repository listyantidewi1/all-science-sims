# iteration order of int sets follows CPython's hash table (deterministic for ints), incl. after removals/resizes
s = set()
for i in range(0, 200, 7):
    s.add(i)
print(s)
for i in range(0, 200, 14):
    s.discard(i)
print(s)
s.add(1000); s.add(-5); print(s)
t = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
print(t.pop(), t.pop(), t)
w = set()
w.update([5, 1, 9], (13, 2), range(20, 25))
print(w, w.pop(), w.pop(), w)
print({1, 2} | {9, 17, 33}, set([65, 1, 129, 33]), {x * x for x in range(-3, 4)}, set(x * 0.5 for x in range(6)), {i * 8 for i in range(6)})
q = set(range(100))
for i in range(0, 100, 3):
    q.discard(i)
q.add(1000); q.add(-1)
print(q)
