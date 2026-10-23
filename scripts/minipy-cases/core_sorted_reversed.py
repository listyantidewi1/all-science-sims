data = [5, 2, 9, 1, 5, 6]
print(sorted(data), sorted(data, reverse=True), data)
kata = ["pisang", "Apel", "jeruk", "anggur"]
print(sorted(kata), sorted(kata, key=str.lower), sorted(kata, key=len))
print(sorted(kata, key=len, reverse=True))
siswa = [("Budi", 80), ("Andi", 90), ("Citra", 80)]
print(sorted(siswa, key=lambda s: s[1]))
print(sorted(siswa, key=lambda s: (-s[1], s[0])))
print(sorted("python"), sorted({3: "a", 1: "b"}), sorted((3, 1, 2)))
print(list(reversed("abc")), list(reversed(range(4))), list(reversed((1, 2))))
data.sort()
print(data)
data.sort(reverse=True)
print(data)
print(sorted([3.5, 1, 2.25, -1]), sorted([[2, 1], [1, 2], [1, 1]]))
