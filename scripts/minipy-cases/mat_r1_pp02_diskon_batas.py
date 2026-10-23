# PP 02: ALGORITMA HitungDiskon (dengan pengaman harga tidak boleh negatif)
def hitung_diskon(harga_awal, besaran_diskon):
    potongan = harga_awal * besaran_diskon / 100
    harga_diskon = harga_awal - potongan
    if harga_diskon < 0:
        harga_diskon = 0
    return harga_diskon

kasus = int(input("Banyak kasus uji: "))
for _ in range(kasus):
    harga_awal = float(input("Harga awal: "))
    besaran_diskon = float(input("Diskon (%): "))
    hasil = hitung_diskon(harga_awal, besaran_diskon)
    print("Harga setelah diskon:", hasil, type(hasil).__name__)
print(hitung_diskon(100000, 20), hitung_diskon(100000, 100), hitung_diskon(50, 150))
