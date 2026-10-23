while True:
    try:
        nilai = int(input("Masukkan nilai Matematika (angka): "))
        break                     # keluar dari perulangan jika konversi berhasil
    except ValueError:
        print("Masukan harus berupa angka. Silakan ulangi.")
print("Nilai tersimpan:", nilai)
