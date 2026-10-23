# Bab 6.5 Menelusuri fungsi hitung_total: diskon 0, 100, pecahan, argumen kata kunci, dan argumen kurang
def hitung_total(harga, jumlah, diskon_persen):
    subtotal = harga * jumlah
    potongan = subtotal * diskon_persen / 100
    return subtotal - potongan

print(hitung_total(5000, 4, 10))
print(hitung_total(12000, 2, 0))
print(hitung_total(3500, 3, 100))
print(hitung_total(7500, 3, 33))
print(hitung_total(9999, 7, 12.5))
print(hitung_total(jumlah=2, diskon_persen=5, harga=15000))
print(hitung_total(5000, 0, 10), hitung_total(5000, -1, 10))
print(hitung_total(5000, 4))
