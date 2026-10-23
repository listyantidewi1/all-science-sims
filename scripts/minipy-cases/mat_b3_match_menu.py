kode_menu = int(input("Masukkan kode menu (1-3): "))
match kode_menu:
    case 1:
        print("Kamu memesan Nasi Goreng.")
    case 2:
        print("Kamu memesan Mie Ayam.")
    case 3:
        print("Kamu memesan Es Teh Manis.")
    case _:
        print("Kode menu tidak dikenal.")
