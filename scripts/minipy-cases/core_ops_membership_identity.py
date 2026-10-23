buah = ["apel", "jeruk", "mangga"]
print("apel" in buah, "anggur" not in buah, "pel" in "apel", "x" in "apel")
d = {"a": 1, "b": 2}
print("a" in d, 1 in d, 2 in d.values(), ("a", 1) in d.items())
print(3 in range(5), 5 in range(5), 4 in range(0, 10, 2), 3 in (1, 2, 3), 2 in {1, 2})
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a is b, a is c, a == c, a is not c)
x = None
print(x is None, x is not None)
print("" in "abc", [] in [[], 1])
