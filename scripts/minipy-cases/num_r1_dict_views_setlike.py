# dict.keys() and dict.items() are set-like: & | - ^ and comparisons with sets
stok_a = {1: "pensil", 2: "buku", 3: "penggaris"}
stok_b = {2: "buku", 3: "spidol", 4: "map"}
print(stok_a.keys() & stok_b.keys(), stok_a.keys() | stok_b.keys())
print(stok_a.keys() - stok_b.keys(), stok_a.keys() ^ stok_b.keys(), stok_a.keys() - [1])
print(stok_a.items() & stok_b.items())
print(stok_a.keys() == {1, 2, 3}, {3, 2, 1} == stok_a.keys(), stok_a.keys() == [1, 2, 3])
print(stok_a.items() == {(1, "pensil"), (2, "buku"), (3, "penggaris")}, stok_a.keys() <= {1, 2, 3, 4}, stok_a.keys().isdisjoint({7, 8}))
print(sorted(stok_a.keys() | stok_b.keys()), len(stok_a.keys() & stok_b.keys()))
