# PP 02: ALGORITMA PredikatKelulusan dengan nilai bertipe real; uji kasus batas 75 dan 74,9
for _ in range(5):
    nilai = float(input("Nilai akhir: "))
    if nilai >= 75:
        predikat = "LULUS"
    else:
        predikat = "TIDAK LULUS"
    print(nilai, "->", predikat)
