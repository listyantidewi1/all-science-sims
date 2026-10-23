# Sistem bilangan: desimal -> biner dengan perulangan sisa bagi; kasus batas 0 (perulangan tidak berjalan) dan 1
def ke_biner(desimal):
    biner = ""
    while desimal > 0:
        biner = str(desimal % 2) + biner
        desimal = desimal // 2
    return biner

for teks in input("Bilangan: ").split():
    n = int(teks)
    hasil = ke_biner(n)
    print(f"{n:>4} -> {hasil!r:>12} | bin(): {bin(n):>12} | format: {n:08b} | kembali: {int(hasil or '0', 2)}")
