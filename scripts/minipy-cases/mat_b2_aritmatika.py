print(7 + 3, 7 - 3, 7 * 3, 7 / 2, 7 // 2, 7 % 2, 7 ** 2)
uang_awal = 50000
iuran_minggu_ini = 15000
beli_spidol = 5000
sisa_uang = uang_awal + iuran_minggu_ini - beli_spidol
print("Sisa uang kas adalah: Rp", sisa_uang)
nilai_mtk = 80
nilai_fisika = 75
nilai_kimia = 90
rata_rata = (nilai_mtk + nilai_fisika + nilai_kimia) / 3
print("Nilai rata-rata IPA kamu adalah:", rata_rata)
print("Dibulatkan dua desimal:", round(rata_rata, 2))
uang_dibayar = int(input("Uang yang dibayarkan: Rp "))
harga_buku = 35000
harga_pulpen = 3000
jumlah_pulpen = int(input("Jumlah pulpen yang dibeli: "))
total_belanja = harga_buku + (harga_pulpen * jumlah_pulpen)
kembalian = uang_dibayar - total_belanja
print("Total belanja: Rp", total_belanja)
print("Kembalian belanja kamu adalah: Rp", kembalian)
jumlah_siswa = 32
anggota_per_kelompok = 5
kelompok_penuh = jumlah_siswa // anggota_per_kelompok
sisa_siswa = jumlah_siswa % anggota_per_kelompok
print("Kelompok penuh yang terbentuk:", kelompok_penuh)
print("Siswa yang belum mendapat kelompok:", sisa_siswa)
