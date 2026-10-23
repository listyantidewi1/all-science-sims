# Tebak Output: apakah x ** 0.5 selalu sama dengan math.sqrt(x)?
import math
data = input("Luas-luas persegi (pisahkan spasi): ").split()
for teks in data:
    luas = float(teks)
    sisi = luas ** 0.5
    print(luas, "->", sisi, math.sqrt(luas), sisi == math.sqrt(luas))
print(2921 ** 0.5, math.sqrt(2921))
