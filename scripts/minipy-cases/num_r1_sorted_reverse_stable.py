# reverse=True keeps equal elements in their original order (it is not sort-then-reverse)
kata = ["bb", "aa", "c", "dd", "e"]
print(sorted(kata, key=len, reverse=True), sorted(kata, key=len))
data = [("Andi", 80), ("Budi", 90), ("Citra", 80), ("Dewi", 90), ("Eka", 70)]
print(sorted(data, key=lambda t: t[1], reverse=True))
kata.sort(key=len, reverse=True)
print(kata)
print(max(data, key=lambda t: t[1]), min(data, key=lambda t: t[1]), max([1, 1.0, True]), min([0, False, 0.0]))
print(sorted([2, 1.5, True, False, -0.0, 0]), sorted(["b", "A", "c", "a"], key=str.lower, reverse=True))
