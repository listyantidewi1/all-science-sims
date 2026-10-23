# Latihan 7.1 Undian Kelompok dengan seed; jumlah siswa tidak selalu 8 (kelompok kedua bisa kurang)
import random
random.seed(71)
for nama_nama in ["Ani Bayu Citra Dede Eka Fani Gilang Hana", "Ani Bayu Citra Dede Eka Fani Gilang", "Ani Bayu Citra"]:
    siswa = nama_nama.split()
    hasil = random.shuffle(siswa)
    print("hasil shuffle:", hasil)
    print("Kelompok 1:", siswa[0:4])
    print("Kelompok 2:", siswa[4:8])
    tengah = (len(siswa) + 1) // 2
    print("Dibagi dua rata:", siswa[:tengah], siswa[tengah:])
print("Ketua:", random.choice(siswa), "| nomor:", random.randint(1, len(siswa)), "| dua wakil:", random.sample(siswa, 2))
