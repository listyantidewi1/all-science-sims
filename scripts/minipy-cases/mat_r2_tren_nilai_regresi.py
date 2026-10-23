# Proyek Grafik Perkembangan Nilai (tanpa grafik): hitung_tren() memakai statistics.linear_regression
import statistics

def hitung_tren(nilai):
    ulangan_ke = list(range(1, len(nilai) + 1))
    garis = statistics.linear_regression(ulangan_ke, nilai)
    return garis.slope, garis.intercept

nilai = [70, 75, 85, 80, 95]
kemiringan, titik_potong = hitung_tren(nilai)
print("Kemiringan:", kemiringan, "| titik potong:", titik_potong)
print(f"Perkiraan ulangan ke-6: {kemiringan * 6 + titik_potong:.1f}")
print("Tren:", "naik" if kemiringan > 0 else "turun atau tetap")
print("Korelasi:", round(statistics.correlation(list(range(1, 6)), nilai), 4))
