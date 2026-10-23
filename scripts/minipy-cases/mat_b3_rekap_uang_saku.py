# --- Tahap 1: masukan jumlah data ---
jumlah_siswa = int(input("Jumlah siswa yang didata: "))

# --- Tahap 2: siapkan akumulator ---
total_uang_saku = 0
jumlah_hemat = 0

# --- Tahap 3: baca data satu per satu, putuskan, tabung ---
for i in range(jumlah_siswa):
    uang_saku = int(input(f"Uang saku siswa ke-{i + 1}: Rp "))
    if uang_saku <= 15000:
        print("   Kategori: Hemat")
        jumlah_hemat = jumlah_hemat + 1
    else:
        print("   Kategori: Boros")
    total_uang_saku = total_uang_saku + uang_saku

# --- Tahap 4: laporan akhir ---
rata_rata = total_uang_saku / jumlah_siswa
print("=============================")
print("Banyak siswa hemat :", jumlah_hemat, "dari", jumlah_siswa, "siswa")
print(f"Rata-rata uang saku: Rp {rata_rata:.2f}")
