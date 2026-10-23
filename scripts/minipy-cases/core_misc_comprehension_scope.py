x = 10
nilai = [x for x in range(3)]
print(x, nilai)
def f():
    y = 5
    return [y * i for i in range(3)]
print(f())
data = [[1, 2], [3, 4]]
flat = [n for baris in data for n in baris]
print(flat, [[r[i] for r in data] for i in range(2)])
kata = ["Apel", "jeruk", "Mangga"]
print([k.lower() for k in kata if k[0].isupper()])
print({k: len(k) for k in kata}, {len(k) for k in kata})
print([(i, j) for i in range(3) for j in range(i)])
print([i for i in range(10) if i % 2 if i % 3])
