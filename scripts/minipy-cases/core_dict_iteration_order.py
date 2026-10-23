d = {}
d["z"] = 1
d["a"] = 2
d[3] = "tiga"
d[1.5] = "float"
d[True] = "bool"
print(d)
d[1] = "satu menimpa True"
print(d)
del d["z"]
d["z"] = "baru"
print(list(d))
print({1: "a", 1.0: "b"}, {(1, 2): "t"})
counts = {}
for w in "satu dua tiga dua satu dua".split():
    counts[w] = counts.get(w, 0) + 1
print(counts, max(counts, key=counts.get))
