nilai = [70, 85, 90, 60, 85]
print(min(nilai), max(nilai), sum(nilai), sum(nilai) / len(nilai))
print(max(3, 7, 5), min("budi", "andi"), max([1, 2], [1, 3]))
print(max(["apel", "jeruk", "kiwi"], key=len), min(["apel", "jeruk", "kiwi"], key=len))
siswa = [("Andi", 80), ("Budi", 95), ("Citra", 95)]
print(max(siswa, key=lambda s: s[1]), min(siswa, key=lambda s: s[1]))
print(max([], default="kosong"), min([5], default=0))
print(sum([0.1] * 10), sum([0.1, 0.2, 0.3]), sum([1, 2.5]), sum([], 10), sum(range(101)))
print(sum([1e100, 1.0, -1e100]), sum([True, True, False]), sum([[1], [2]], []))
print(max(1, 2.5), min(-1, -1.0), max("a", "B"))
