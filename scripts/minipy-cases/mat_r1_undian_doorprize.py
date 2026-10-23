# Proyek Undian Doorprize Class Meeting (random dengan seed agar dapat diuji)
import random
peserta = []

def tambah_peserta(nama):
    if nama in peserta:
        print(f"{nama} sudah terdaftar.")
    else:
        peserta.append(nama)

def undi_pemenang(jumlah):
    if jumlah > len(peserta):
        print("Peserta kurang!")
        return []
    return random.sample(peserta, jumlah)

random.seed(2026)
for nama in ["Ani", "Bayu", "Citra", "Dede", "Eka", "Ani", "Fani", "Gilang", "Hana"]:
    tambah_peserta(nama)
print("Peserta:", peserta)
print("Pemenang:", undi_pemenang(3))
print("Hadiah utama:", random.choice(peserta), "| nomor undian:", random.randint(1, 30))
random.shuffle(peserta)
print("Urutan tampil:", peserta)
print("Kelompok 1:", peserta[0:4], "Kelompok 2:", peserta[4:8])
print(undi_pemenang(10))
print("Angka acak:", round(random.random(), 4), round(random.uniform(1, 10), 2), random.randrange(0, 100, 5))
