# PP 02 Contoh algoritma menghitung sejumlah nilai: jumlahkan dan kalikan dua bilangan dari masukan
for _ in range(4):
    a = float(input("Bilangan pertama: "))
    b = float(input("Bilangan kedua: "))
    jumlah = a + b
    kali = a * b
    print("Hasil penjumlahan:", jumlah)
    print("Hasil perkalian:", kali)
    if jumlah.is_integer() and kali.is_integer():
        print("Sebagai bilangan bulat:", int(jumlah), int(kali))
