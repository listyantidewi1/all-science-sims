riwayat = []                      # stack kosong
# Pengguna membuka halaman satu per satu (push)
riwayat.append("Beranda")
riwayat.append("Jadwal Pelajaran")
riwayat.append("Nilai Rapor")
print("Riwayat saat ini   :", riwayat)
print("Halaman paling atas:", riwayat[-1])
# Tombol "Kembali" ditekan dua kali (pop)
halaman = riwayat.pop()
print("Kembali dari       :", halaman, "| sisa:", riwayat)
halaman = riwayat.pop()
print("Kembali dari       :", halaman, "| sisa:", riwayat)
# Pengaman: jangan pop jika stack kosong
if len(riwayat) == 0:
    print("Riwayat kosong, tidak bisa kembali lagi.")
