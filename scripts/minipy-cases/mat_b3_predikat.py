for _ in range(5):
    nilai = int(input("Masukkan nilai: "))
    if nilai >= 90:
        print("Predikat: A (Sangat Baik)")
    elif nilai >= 80:
        print("Predikat: B (Baik)")
    elif nilai >= 70:
        print("Predikat: C (Cukup)")
    else:
        print("Predikat: D (Perlu Remedial)")
