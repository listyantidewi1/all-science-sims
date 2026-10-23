# Latihan 4.3: Rekap Uang Saku yang tangguh terhadap salah ketik; uji nilai batas 15000/15001
jumlah_siswa = int(input("Jumlah siswa yang didata: "))
total_uang_saku = 0
jumlah_hemat = 0
for i in range(jumlah_siswa):
    while True:
        try:
            uang_saku = int(input(f"Uang saku siswa ke-{i + 1}: Rp "))
            break
        except ValueError as e:
            print("   Masukan harus angka, ulangi.", e)
    if uang_saku <= 15000:
        print("   Kategori: Hemat")
        jumlah_hemat = jumlah_hemat + 1
    else:
        print("   Kategori: Boros")
    total_uang_saku = total_uang_saku + uang_saku
rata_rata = total_uang_saku / jumlah_siswa
print("Banyak siswa hemat :", jumlah_hemat, "dari", jumlah_siswa, "siswa")
print(f"Rata-rata uang saku: Rp {rata_rata:.2f}")
