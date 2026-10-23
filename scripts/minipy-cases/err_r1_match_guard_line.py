def kategori(nilai, pembagi):
    match nilai:
        case 0:
            return "nol"
        case n if n / pembagi > 1:
            return "besar"
        case _:
            return "kecil"
print(kategori(0, 0))
print(kategori(10, 5))
print(kategori(10, 0))
