# match-case dengan pola | untuk konversi nilai ke huruf (nilai // 10), diuji pada batas
def huruf(nilai):
    match nilai // 10:
        case 10 | 9:
            return "A"
        case 8:
            return "B"
        case 7:
            return "C"
        case 6 | 5:
            return "D"
        case _:
            return "E"

for teks in input("Nilai: ").split():
    nilai = float(teks) if "." in teks else int(teks)
    print(teks, nilai // 10, huruf(nilai))
