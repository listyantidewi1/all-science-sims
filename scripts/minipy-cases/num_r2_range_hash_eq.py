# equal ranges (same sequence of values) hash equal, so they collapse in sets and find dict keys
print(hash(range(3)) == hash(range(0, 3)), hash(range(0)) == hash(range(5, 2)), hash(range(1, 5, 2)) == hash(range(1, 4, 2)))
print({range(1, 5, 2), range(1, 4, 2)}, {range(0), range(4, 2)}, range(0, 3) in {range(3)})
print({range(3): "a"}[range(0, 3, 1)], len({range(1, 2), range(1, 2, 5)}))
