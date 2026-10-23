panjang = int(input("Panjang: "))
lebar = int(input("Lebar: "))
luas = panjang * lebar
print("Luas:", luas)
nama = input("Nama: ")
kelas = input("Kelas: ")
absen = int(input("Nomor absen: "))
print(f"Nama: {nama}, Kelas: {kelas}, Absen: {absen}")
celsius = float(input("Suhu (Celsius): "))
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} C = {fahrenheit:.1f} F")
bilangan = int(input("Bilangan: "))
if bilangan % 2 == 0:
    print("Genap")
else:
    print("Ganjil")
for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")
nilai = [68, 92, 75, 88, 79]
tertinggi = nilai[0]
for n in nilai:
    if n > tertinggi:
        tertinggi = n
print("Nilai tertinggi:", tertinggi)
