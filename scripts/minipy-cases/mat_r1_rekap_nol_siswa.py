# Kasus tepi Rekap Uang Saku: jumlah siswa 0 -> rata-rata dibagi nol
jumlah_siswa = int(input("Jumlah siswa yang didata: "))

total_uang_saku = 0
jumlah_hemat = 0

for i in range(jumlah_siswa):
    uang_saku = int(input(f"Uang saku siswa ke-{i + 1}: Rp "))
    if uang_saku <= 15000:
        print("   Kategori: Hemat")
        jumlah_hemat = jumlah_hemat + 1
    else:
        print("   Kategori: Boros")
    total_uang_saku = total_uang_saku + uang_saku

print("=============================")
print("Banyak siswa hemat :", jumlah_hemat, "dari", jumlah_siswa, "siswa")
rata_rata = total_uang_saku / jumlah_siswa
print(f"Rata-rata uang saku: Rp {rata_rata:.2f}")
