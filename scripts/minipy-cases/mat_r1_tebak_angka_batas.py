# Latihan 3.4 Menebak Angka; masukan terakhir bukan angka (runtime error yang tidak ditangani)
rahasia = 7
percobaan = 0
tebakan = 0
while tebakan != rahasia:
    tebakan = int(input("Tebak angka 1-10: "))
    percobaan = percobaan + 1
    if tebakan > rahasia:
        print("Terlalu besar.")
    elif tebakan < rahasia:
        print("Terlalu kecil.")
print(f"Benar! Kamu menebak {percobaan} kali.")
tebakan = int(input("Main lagi? Tebak angka 1-10: "))
