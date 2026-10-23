# HitungDiskon
harga = float(input("Harga: "))
persen = float(input("Diskon (%): "))
harga_diskon = harga - harga * persen / 100
if harga_diskon < 0:
    harga_diskon = 0
print("Harga setelah diskon:", harga_diskon)
# diskon 10% jika total > 100.000
total = int(input("Total belanja: "))
if total > 100000:
    total = total - total * 10 // 100
print("Bayar:", total)
# PredikatKelulusan dengan data batas
for nilai in [80, 75, 74.9]:
    if nilai >= 75:
        print(nilai, "LULUS")
    else:
        print(nilai, "TIDAK LULUS")
# KonversiSuhu
c = float(input("Celsius: "))
r = 4 / 5 * c
f = 9 / 5 * c + 32
print(f"Reamur: {r}  Fahrenheit: {f}")
# Luas persegi dan jumlah 1..n
sisi = 7
print("Luas persegi:", sisi * sisi)
n = int(input("n: "))
jumlah = 0
i = 1
while i <= n:
    jumlah = jumlah + i
    i = i + 1
print("Jumlah 1 ..", n, "=", jumlah, "=", n * (n + 1) // 2)
