nama = "Andi"          # str (teks)
umur = 17              # int (bilangan bulat)
tinggi = 165.5         # float (bilangan desimal)
status_lulus = True    # bool (logika)
print("Nama:", nama, "| tipe:", type(nama))
print("Umur:", umur, "| tipe:", type(umur))
print("Tinggi:", tinggi, "| tipe:", type(tinggi))
print("Lulus:", status_lulus, "| tipe:", type(status_lulus))
nama_barang = "Spidol Papan Tulis"
jumlah_spidol = 5
print("Stok", nama_barang, "saat ini:", jumlah_spidol)
jumlah_spidol = jumlah_spidol + 3     # ada pembelian 3 spidol baru
print("Stok setelah pembelian:", jumlah_spidol)
jumlah_spidol = jumlah_spidol - 1     # satu spidol habis
print("Stok setelah satu habis:", jumlah_spidol)
tim_tuan_rumah = "SMA 1"
tim_tamu = "SMA 2"
skor_tuan_rumah = 3
skor_tamu = 1
tuan_rumah_menang = skor_tuan_rumah > skor_tamu   # hasil perbandingan adalah bool
print(tim_tuan_rumah, skor_tuan_rumah, "-", skor_tamu, tim_tamu)
print("Apakah tuan rumah menang?", tuan_rumah_menang)
