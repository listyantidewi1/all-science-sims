# Membagi siswa ke kelompok: //, %, math.ceil, dan pengaman pembagi nol
import math
jumlah_siswa = 32
for anggota in [5, 32, 33, 1, 0]:
    try:
        penuh = jumlah_siswa // anggota
        sisa = jumlah_siswa % anggota
        minimal = math.ceil(jumlah_siswa / anggota)
        print(f"{anggota} per kelompok: {penuh} penuh, sisa {sisa}, minimal {minimal} kelompok")
    except ZeroDivisionError as e:
        print("Tidak bisa:", e)
print(math.ceil(7.2), math.floor(7.8), math.ceil(-7.2), math.floor(-7.8), math.ceil(8.0), type(math.ceil(7.2)))
print(-32 // 5, -32 % 5, 32 // -5, 32.0 // 5, 32 % 5.0)
print(math.ceil(jumlah_siswa / 0))
