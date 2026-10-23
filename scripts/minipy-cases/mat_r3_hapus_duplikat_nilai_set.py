# Menghapus nilai kembar dengan set(): urutan tampil BUKAN urutan masukan (Tebak Output)
nilai = [80, 75, 90, 75, 80, 100, 65, 88, 96, 72]
unik = set(nilai)
print(unik)
print(list(unik), len(nilai), "->", len(unik))
print(sorted(unik), sorted(unik, reverse=True))
urut_masuk = []
for n in nilai:
    if n not in urut_masuk:
        urut_masuk.append(n)
print(urut_masuk, list(dict.fromkeys(nilai)))
print({n % 8 for n in nilai}, set([0, 8, 16, 1, 9]), {-1, -2, 7})
