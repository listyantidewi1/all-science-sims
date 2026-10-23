siswa_piket = ["Andi", "Budi", "Cici", "Dina"]
print("Daftar lengkap:", siswa_piket)
print("Pembersih papan tulis (indeks 0):", siswa_piket[0])
print("Petugas terakhir (indeks -1):", siswa_piket[-1])
print("Jumlah petugas:", len(siswa_piket))
nilai_harian = [80, 85, 90, 75]
nilai_harian.append(100)        # tambah di akhir
print("Setelah append :", nilai_harian)
nilai_harian.insert(0, 70)      # sisipkan di posisi paling depan
print("Setelah insert :", nilai_harian)
print("Nilai tertinggi:", max(nilai_harian), "| terendah:", min(nilai_harian))
print("Jumlah total   :", sum(nilai_harian), "| rata-rata:", sum(nilai_harian) / len(nilai_harian))
keranjang = ["Buku Tulis", "Pulpen", "Tipe-X", "Penggaris"]
keranjang[1] = "Spidol"          # ganti Pulpen menjadi Spidol
print("Setelah diganti :", keranjang)
keranjang.remove("Tipe-X")       # batal membeli Tipe-X
print("Setelah dihapus :", keranjang)
terakhir = keranjang.pop()       # ambil barang terakhir dari keranjang
print("Dikeluarkan     :", terakhir, "| sisa:", keranjang)
if "Pulpen" in keranjang:
    keranjang.remove("Pulpen")
else:
    print("Pulpen tidak ada di keranjang, tidak perlu dihapus.")
playlist = ["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"]
# Cara 1: dengan indeks
for i in range(len(playlist)):
    print(i + 1, ".", playlist[i])
print("---")
# Cara 2: dengan enumerate (nomor mulai dari 1)
for nomor, judul in enumerate(playlist, start=1):
    print(f"{nomor}. {judul}")
