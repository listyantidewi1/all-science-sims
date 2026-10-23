# sum() keeps Neumaier compensation only for float items; ints met after the first float are added
# with plain float addition (CPython 3.12+ builtin_sum), so mixed int/float carts round differently
belanja = [0.1, 10, 0.2]
print(sum(belanja), sum([4.35, 100, 19.99]), sum([0.7, 2, 0.1]), sum([0.2, 1.1, 1]))
print(sum([2.2, 1000, 1.1]), sum([0.05, 10, 3.3]), sum([0.01, 10, 10]), sum([0.3, 5, 0.1]))
print(sum([1, 1e100, 1, -1e100]), sum([1e100, 1, -1e100, 1]), sum([1.0, 2 ** 53, 1.0]), sum([2 ** 53, 1.0, 1.0]))
print(sum([0.1, True, 0.2]), sum([0.1, 0.2], 10), sum([0.1, 10, 0.2], 0.0))
total = 0
for harga in [0.1, 10, 0.2]:
    total += harga
print(total, total == sum([0.1, 10, 0.2]))
