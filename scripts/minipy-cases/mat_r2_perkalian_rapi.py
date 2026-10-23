# Latihan 3.2 Tabel Perkalian: angka dan batas dari masukan, kolom rata kanan
angka = int(input("Tabel perkalian berapa? "))
batas = int(input("Sampai berapa? "))
for i in range(1, batas + 1):
    print(f"{angka} x {i:>2} = {angka * i:>4}")
print("Baris tercetak:", len(range(1, batas + 1)))
angka = int(input("Tabel perkalian berapa? "))
batas = int(input("Sampai berapa? "))
for i in range(1, batas + 1):
    print(f"{angka} x {i:>2} = {angka * i:>4}")
print("Baris tercetak:", len(range(1, batas + 1)))
