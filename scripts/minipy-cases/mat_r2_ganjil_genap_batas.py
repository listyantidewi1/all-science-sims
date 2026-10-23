# Latihan 3.1 Ganjil atau Genap dengan kasus uji batas: nol, negatif, bilangan sangat besar, tanda +
while True:
    teks = input("Bilangan (kosong = selesai): ")
    if teks == "":
        break
    bilangan = int(teks)
    if bilangan % 2 == 0:
        print(bilangan, "Genap", bilangan % 2, bilangan // 2)
    else:
        print(bilangan, "Ganjil", bilangan % 2, bilangan // 2)
