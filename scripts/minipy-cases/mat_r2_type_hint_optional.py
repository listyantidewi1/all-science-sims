# Latihan 7.3 (refactoring nilai tertinggi) dengan type hints: hasil bisa int atau None (int | None)
def nilai_tertinggi(daftar_nilai: list, kosong: int | None = None) -> int | None:
    """Mengembalikan nilai terbesar dalam list; `kosong` jika list kosong."""
    if len(daftar_nilai) == 0:
        return kosong
    tertinggi = daftar_nilai[0]
    for nilai in daftar_nilai:
        if nilai > tertinggi:
            tertinggi = nilai
    return tertinggi

print(nilai_tertinggi([68, 92, 75, 88, 79]))
print(nilai_tertinggi([]))
print(nilai_tertinggi([], 0))
print(nilai_tertinggi([-5, -2, -9]))
