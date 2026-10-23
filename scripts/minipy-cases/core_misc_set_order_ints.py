s = set()
for n in [5, 3, 100, 8, 1, 64, 33, 2, 1000, 7]:
    s.add(n)
print(s)
s.discard(100)
s.add(17)
print(s, sorted(s), len(s))
print(set([10, 20, 30, 40, 50, 60, 70, 80, 90]), {-1, -2, 0, 1})
print({1.5, 2, 3.0}, set(range(0, 50, 7)))
