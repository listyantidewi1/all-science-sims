def statistik(data):
    return min(data), max(data), sum(data) / len(data)
mn, mx, rata = statistik([4, 8, 6])
print(mn, mx, rata, statistik([1]))
def tukar(a, b):
    return b, a
x, y = tukar(1, 2)
print(x, y)
def cari(daftar, target):
    for i, v in enumerate(daftar):
        if v == target:
            return i
    return None
print(cari([5, 6, 7], 7), cari([5], 1))
koordinat = [(1, 2), (3, 4)]
for (a, b) in koordinat:
    print(a + b)
print([a * b for a, b in koordinat], dict(koordinat))
