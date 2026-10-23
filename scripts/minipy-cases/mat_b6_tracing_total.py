def hitung_total(harga, jumlah, diskon_persen):
    subtotal = harga * jumlah
    potongan = subtotal * diskon_persen / 100
    return subtotal - potongan
print(hitung_total(5000, 4, 10))
print(hitung_total(12000, 2, 0))
