# Bug Hunt: koma terlupa di antara dua nama dalam list -> dua teks digabung otomatis (tanpa error!)
siswa_piket = ["Andi", "Budi" "Cici", "Dina"]
print("Daftar:", siswa_piket)
print("Jumlah petugas:", len(siswa_piket))
for nomor, nama in enumerate(siswa_piket, start=1):
    print(f"{nomor}. {nama}")
print("Cici" in siswa_piket, "BudiCici" in siswa_piket)
print("Petugas ke-4:", siswa_piket[3])
