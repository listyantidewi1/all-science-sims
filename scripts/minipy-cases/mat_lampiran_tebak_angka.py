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
