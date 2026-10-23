def angka():
    return [1, 2, 3, 4]
g = (x * 2 for x in angka())
print(next(g), next(g), list(g), list(g))
print(any(x > 2 for x in [1, 3, 5]), all(x % 2 for x in [1, 3, 4]))
print(sum(x * x for x in range(1, 11)), max(len(k) for k in ["a", "abc", "ab"]))
print(", ".join(str(n) for n in range(5)), tuple(c for c in "abc"))
it = iter([1, 2, 3])
print(list(zip(it, it)))
print(sum(int(x) for x in ["1", "2", "b"]))
