# Latihan 3.3 Nilai Tertinggi tanpa max(): data dibaca dari satu baris; baris kosong memicu IndexError
for _ in range(3):
    nilai = [int(x) for x in input("Nilai (pisahkan spasi): ").split()]
    tertinggi = nilai[0]
    for n in nilai:
        if n > tertinggi:
            tertinggi = n
    print("Nilai tertinggi:", tertinggi, "| cek max():", max(nilai))
