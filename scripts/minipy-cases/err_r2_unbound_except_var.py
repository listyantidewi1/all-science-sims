def konversi(teks):
    try:
        hasil = int(teks)
    except ValueError as e:
        print("gagal:", e)
    if teks.isdigit():
        return hasil
    return e
print(konversi("12"))
print(konversi("x"))
