buah = ["apel", "jeruk", "mangga"]
print(list(enumerate(buah)), list(enumerate(buah, 1)))
for i, b in enumerate(buah, start=10):
    print(i, b)
nama = ["Andi", "Budi"]
nilai = [80, 90, 100]
print(list(zip(nama, nilai)), dict(zip(nama, nilai)))
print(list(zip()), list(zip("ab", [1, 2], (True, False))))
pasangan = [(1, "a"), (2, "b")]
angka, huruf = zip(*pasangan)
print(angka, huruf)
print(enumerate(buah).__class__.__name__ if False else "ok")
