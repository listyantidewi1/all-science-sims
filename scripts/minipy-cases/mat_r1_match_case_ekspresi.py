# Parsons/Bug Hunt: pola case berisi perhitungan, bukan nilai pasti
skor = int(input("Skor: "))
match skor:
    case 5 + 5:
        print("Skor sempurna")
    case _:
        print("Skor:", skor)
