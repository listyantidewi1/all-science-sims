# Latihan 4.2 Kasus uji predikat (A >= 90, B >= 80, C >= 70, selain itu D) pada semua nilai batas
def predikat(nilai):
    if nilai >= 90:
        return "A (Sangat Baik)"
    elif nilai >= 80:
        return "B (Baik)"
    elif nilai >= 70:
        return "C (Cukup)"
    else:
        return "D (Perlu Remedial)"

print(f"{'Nilai':>5} | Predikat")
for teks in input("Nilai uji: ").split(","):
    nilai = int(teks)
    print(f"{nilai:>5} | {predikat(nilai)}")
nilai = int(input("Masukkan nilai: "))
print("Predikat:", predikat(nilai))
