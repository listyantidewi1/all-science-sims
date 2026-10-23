# Peminat ekskul dengan Counter: urutan saat jumlahnya seri
from collections import Counter
ekskul = input("Pilihan ekskul (pisahkan koma): ").split(",")
ekskul = [e.strip().title() for e in ekskul]
hitung = Counter(ekskul)
print("Peminat tiap ekskul:", dict(hitung))
print(hitung)
print("Paling diminati :", hitung.most_common(1))
print("Tiga teratas    :", hitung.most_common(3))
print("Peminat Basket  :", hitung["Basket"], "| total:", sum(hitung.values()))
for nama, jumlah in hitung.most_common():
    print(f"{nama:<8}{'*' * jumlah} ({jumlah})")
