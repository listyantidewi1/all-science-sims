# Peminat ekskul dengan Counter: menghapus ekskul yang ditutup, termasuk yang tidak punya peminat
from collections import Counter

pilihan = ["Pramuka", "Futsal", "Pramuka", "PMR", "Futsal", "Pramuka", "Basket"]
hitung = Counter(pilihan)
print(hitung, "| peminat Paskibra:", hitung["Paskibra"])
for ditutup in ["Basket", "Paskibra", "Basket"]:
    del hitung[ditutup]
    print("Ditutup", ditutup, "->", hitung)
print(hitung.most_common(1), len(hitung), "Paskibra" in hitung)
biasa = dict(hitung)
del biasa["Paskibra"]
