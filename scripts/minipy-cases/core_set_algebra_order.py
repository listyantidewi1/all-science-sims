# Set iteration order after deletions and mixed set algebra (ints, floats,
# None and tuples only: str hashes are randomised in CPython).
S = {1, 2}
S.add(7)
S.update([10, 10])
S.add((1, 2))
S.discard(2)
print(S, S ^ {0, 1}, S - {5})
S.discard(1)
S.discard(10)
S.discard((1, 2))
S.add(0)
S.update([None, None])
S.update([2, 2])          # reuses the last dummy slot on the probe path
print(S)
print(S | {2.5, -1}, S & {0, 2, 3}, S - {0}, S ^ {7, 8})

A = set(range(0, 40, 3))
B = {x * 0.5 for x in range(10)}
print(A | B)
print(B | A)
print(A & B, B & A)
print(A - B)
print(B - A)
print(A ^ B)
print(B ^ A)

C = set(range(20))
for x in range(0, 20, 2):
    C.discard(x)
C.update([100, -5, 2.5, (0, 0)])
print(C)
D = C.copy()
D -= {1, 3, 5}
print(D)
D |= {64, 32}
print(D)
D &= set(range(-10, 70))
print(D)
D ^= {7, 9, 11, 1000}
print(D)
print(C.union([3, 4], (5, 6)), C.intersection(range(10), [1, 3, 5]))
print(C.difference({1}, [3]), C.symmetric_difference([2, 3]))
E = set(range(50))
while len(E) > 5:
    E.pop()
print(E, E.pop(), E)
