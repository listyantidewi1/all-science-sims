for _ in range(3):
    nilai = int(input("Masukkan nilai siswa: "))
    if nilai >= 75:
        status = "Tuntas"
    else:
        status = "Belum Tuntas"
    print("Nilai", nilai, "berstatus", status)
