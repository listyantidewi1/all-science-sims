for _ in range(4):
    hari = input("Hari ini hari apa? ")
    match hari:
        case "Senin" | "Selasa":
            print("Gunakan seragam Putih Abu-abu.")
        case "Rabu" | "Kamis":
            print("Gunakan seragam Batik Sekolah.")
        case "Jumat":
            print("Gunakan seragam Pramuka.")
        case _:
            print("Hari libur, berpakaian bebas rapi!")
