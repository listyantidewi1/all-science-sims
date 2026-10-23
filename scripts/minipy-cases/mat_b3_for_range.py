print(list(range(5)), list(range(1, 6)), list(range(0, 10, 2)), list(range(3, 0, -1)))
# i akan bernilai 0, 1, 2, 3, 4 (total 5 kali)
for i in range(5):
    print("Saya berjanji tidak akan mencontek lagi saat ujian.")
print("Memanggil peserta ujian lisan:")
for absen in range(1, 4):
    print("Silakan masuk, siswa dengan nomor absen:", absen)
print("Bersedia... Siap...")
for angka in range(3, 0, -1):
    print(angka)
print("YAA! Lari!")
daftar_piket = ["Andi", "Budi", "Cici", "Dina"]
print("Jadwal piket hari ini:")
for nama in daftar_piket:
    print("-", nama)
print("Total petugas piket:", len(daftar_piket))
playlist = ["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"]
for nomor, judul in enumerate(playlist, start=1):
    print(f"{nomor}. {judul}")
