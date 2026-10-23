def hari(kode):
    match kode:
        case 1:
            return "Senin"
        case 2:
            return "Selasa"
        case 6 | 7:
            return "Akhir pekan"
        case _:
            return "Tidak valid"
for k in [1, 2, 6, 7, 9]:
    print(k, hari(k))
def menu(pilihan):
    match pilihan:
        case "a" | "A":
            print("Nasi goreng")
        case "b":
            print("Mie ayam")
        case lain:
            print("Tidak ada menu", lain)
menu("A"); menu("b"); menu("z")
def titik(p):
    match p:
        case (0, 0):
            return "pusat"
        case (x, 0):
            return f"sumbu x di {x}"
        case [x, y] if x == y:
            return "diagonal"
        case [x, *sisa]:
            return f"awal {x}, sisa {sisa}"
        case {"nama": n}:
            return "dict " + n
        case None:
            return "None"
        case int() | float():
            return "angka"
        case str(s):
            return "teks " + s
    return "lainnya"
for p in [(0, 0), (3, 0), [2, 2], [1, 2, 3], {"nama": "Andi"}, None, 5, 2.5, "hai", {}]:
    print(titik(p))
