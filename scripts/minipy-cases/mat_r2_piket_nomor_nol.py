# Bab 4.6 Contoh Kasus 3: nomor urut 0 dan negatif TIDAK memicu IndexError (indeks negatif) - kesalahan logika
siswa_piket = ["Andi", "Budi", "Cici", "Dina"]
for _ in range(7):
    try:
        nomor = int(input("Nomor urut petugas (1-4): "))
        print("Petugas piket:", siswa_piket[nomor - 1])
    except IndexError:
        print("Nomor urut di luar jangkauan daftar.")
    except ValueError:
        print("Nomor urut harus angka.")
nomor = int(input("Nomor urut petugas (1-4): "))
if 1 <= nomor <= len(siswa_piket):
    print("Petugas piket:", siswa_piket[nomor - 1])
else:
    print("Nomor", nomor, "tidak valid")
