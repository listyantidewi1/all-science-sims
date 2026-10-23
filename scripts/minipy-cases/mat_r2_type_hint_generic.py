# Bab 7.4 Kualitas Kode: versi refactoring diberi petunjuk tipe (type hints) list[int] dan tuple[int, float]
KKM: int = 75

def hitung_rekap(daftar_nilai: list[int], kkm: int = KKM) -> tuple[int, float]:
    """Mengembalikan (banyak siswa tuntas, rata-rata) dari sebuah list nilai."""
    if len(daftar_nilai) == 0:
        return 0, 0.0
    total = 0
    jumlah_tuntas = 0
    for nilai in daftar_nilai:
        total = total + nilai
        if nilai >= kkm:
            jumlah_tuntas = jumlah_tuntas + 1
    return jumlah_tuntas, total / len(daftar_nilai)

nilai_kelas: list[int] = [80, 75, 90, 65, 85]
rekap_kelas: dict[str, list[int]] = {"X-A": nilai_kelas, "X-B": [74, 74, 76], "X-C": []}
for kelas, daftar in rekap_kelas.items():
    tuntas, rata_rata = hitung_rekap(daftar)
    print(f"{kelas}: tuntas {tuntas} dari {len(daftar)}, rata-rata {rata_rata:.2f}")
