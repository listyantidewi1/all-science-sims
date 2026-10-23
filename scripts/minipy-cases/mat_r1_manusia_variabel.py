# Manusia Variabel: siswa memegang kotak a, b, c lalu guru membacakan baris demi baris
a = 3
b = 7
a = b
b = a
print("tukar salah:", a, b)
a = 3
b = 7
temp = a
a = b
b = temp
print("tukar dengan temp:", a, b)
a, b = b, a
print("tukar satu baris:", a, b)
a = b = c = 0
a = a + 1
b = a + 1
c = a + b
print(a, b, c)
x, y = 1, 1
for _ in range(6):
    x, y = y, x + y
print("fibonacci:", x, y)
kotak1 = [1, 2]
kotak2 = kotak1
kotak2.append(3)
kotak3 = kotak1[:]
kotak3.append(4)
print(kotak1, kotak2, kotak3, kotak1 is kotak2, kotak1 == kotak3[:3])
skor = 50
skor += 10
skor *= 2
skor //= 7
skor **= 2
skor %= 10
print(skor)
nama = "Andi"
nama2 = nama
nama += " Saputra"
print(nama, "|", nama2)
