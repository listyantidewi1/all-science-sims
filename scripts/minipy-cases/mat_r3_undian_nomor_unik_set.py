# Proyek Undian: 6 nomor undian unik 1-49 disimpan di set (urutan tampil set bilangan bulat kecil tidak acak)
import random

random.seed(2026)
nomor = set()
percobaan = 0
while len(nomor) < 6:
    nomor.add(random.randint(1, 49))
    percobaan = percobaan + 1
print("Nomor (set)  :", nomor)
print("Nomor urut   :", sorted(nomor), "| percobaan:", percobaan)
print("Ada nomor 7? :", 7 in nomor, "| list:", list(nomor))
nomor.discard(max(nomor))
nomor.add(50)
print("Setelah ganti:", nomor, len(nomor))
