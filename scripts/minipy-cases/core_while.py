tabungan = 0
minggu = 0
while tabungan < 100000:
    tabungan += 15000
    minggu += 1
print("Minggu ke-", minggu, "tabungan", tabungan)
n = 5
while n > 0:
    print(n, end=" ")
    n -= 1
print("Selesai!")
i = 0
while True:
    i += 1
    if i == 3:
        continue
    if i > 5:
        break
    print("i =", i)
k = 0
while k < 3:
    k += 1
else:
    print("else jalan, k =", k)
while k < 10:
    k += 1
    if k == 5:
        break
else:
    print("tidak dicetak")
print(k)
