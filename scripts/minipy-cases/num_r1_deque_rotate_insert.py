from collections import deque
d = deque([1, 2, 3])
d.rotate(10); print(d); d.rotate(-7); print(d)
d.insert(-1, 9); print(d); d.insert(100, 8); print(d); d.insert(-100, 0); print(d)
print(d.index(2, 1), d.index(8, -3, len(d)), d.count(9), d[-2], len(d))
e = deque([], maxlen=0); e.append(1); print(e)
f = deque("abc", 2); print(f, f.maxlen)
f.extendleft("xyz"); print(f)
g = deque([1, 2, 3], maxlen=3)
for bad in [lambda: g.insert(0, 9), lambda: g[5], lambda: g.index(99), lambda: g.remove(99), lambda: g[0:1], lambda: deque().pop()]:
    try:
        print(bad())
    except (IndexError, ValueError, TypeError) as ex:
        print(type(ex).__name__, ex)
print(deque([1, 2]) * 2, deque([1]) + deque([2]), deque([1, 2]) == [1, 2], deque(maxlen=3), deque([1, 2, 3]) < deque([1, 3]))
