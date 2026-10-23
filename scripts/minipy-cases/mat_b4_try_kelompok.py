jumlah_siswa = 30
for _ in range(3):
    try:
        jumlah_kelompok = int(input("Mau dibagi menjadi berapa kelompok? "))
        anggota_per_kelompok = jumlah_siswa / jumlah_kelompok
        print("Tiap kelompok berisi", anggota_per_kelompok, "orang.")
    except ZeroDivisionError:
        print("Jumlah kelompok tidak boleh 0.")
    except ValueError:
        print("Masukkan jumlah kelompok dalam bentuk angka.")
