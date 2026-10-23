for i in range(3):
    print("range", i)
for i in range(10, 0, -3):
    print(i, end=" ")
print()
for huruf in "Hai!":
    print(huruf, end="|")
print()
for x in (1, "dua", 3.0):
    print(x)
d = {"Andi": 80, "Budi": 75}
for k in d:
    print(k, d[k])
for k, v in d.items():
    print(f"{k} -> {v}")
for v in d.values():
    print(v)
for i, buah in enumerate(["apel", "jeruk"]):
    print(i, buah)
for i, buah in enumerate(["apel", "jeruk"], start=1):
    print(i, buah)
for a, b in zip([1, 2, 3], "xyz"):
    print(a, b)
for x in reversed([1, 2, 3]):
    print(x, end=" ")
print()
for x in sorted([3, 1, 2], reverse=True):
    print(x, end=" ")
print()
for x in {3, 1, 2}:
    print(x, end=" ")
print()
