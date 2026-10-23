# Bug Hunt (kesalahan logika): menghapus anggota list saat sedang ditelusuri
nilai = [60, 70, 80, 65, 90, 50, 74]
for n in nilai:
    if n < 75:
        nilai.remove(n)
print("Yang tersisa (seharusnya hanya >= 75):", nilai)
nilai = [60, 70, 80, 65, 90, 50, 74]
tuntas = []
for n in nilai:
    if n >= 75:
        tuntas.append(n)
print("Perbaikan:", tuntas)
nilai = [60, 70, 80, 65, 90, 50, 74]
for n in nilai[:]:
    if n < 75:
        nilai.remove(n)
print("Perbaikan dengan salinan:", nilai)
harga = {"Es Teh": 3000, "Bakso": 11000, "Soto": 9000}
for menu in harga:
    if harga[menu] < 5000:
        del harga[menu]
print(harga)
