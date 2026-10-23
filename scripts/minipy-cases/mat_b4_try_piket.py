siswa_piket = ["Andi", "Budi", "Cici", "Dina"]
for _ in range(3):
    try:
        nomor = int(input("Nomor urut petugas (1-4): "))
        print("Petugas piket:", siswa_piket[nomor - 1])
    except IndexError:
        print("Nomor urut di luar jangkauan daftar.")
    except ValueError:
        print("Nomor urut harus angka.")
