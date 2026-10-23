t = (1, 2, 3, 2)
print(t.count(2), t.index(3), t[1:], len(t), 2 in t)
koordinat = (3, 4)
x, y = koordinat
print(x, y, koordinat + (5,), koordinat * 2)
s = {3, 1, 2}
s.add(4)
s.add(1)
s.discard(10)
s.remove(3)
print(s, len(s))
a, b = {1, 2, 3}, {2, 3, 4}
print(a.union(b), a.intersection(b), a.difference(b), a.symmetric_difference(b))
print(a.issubset({1, 2, 3, 4}), a.issuperset({1}), a.isdisjoint({9}))
print({x % 3 for x in range(10)}, set("hello") == set("olleh"), sorted({"b", "a"}))
e = set()
e.update([5, 6], (7,))
print(e, e.pop(), e)
print(set(range(10, 0, -1)), {100, 1, 50, 7})
