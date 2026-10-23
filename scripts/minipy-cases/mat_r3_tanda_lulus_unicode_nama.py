# Laporan ketuntasan dengan simbol Unicode bernama (\N{...}): tanda centang / silang dan garis tabel
KKM = 75
nilai_kelas = {"Andi": 80, "Budi": 74.9, "Cici": 75, "Dina": 60}
garis = "\N{BOX DRAWINGS LIGHT HORIZONTAL}" * 20
print(garis)
for nama, nilai in nilai_kelas.items():
    tanda = "\N{HEAVY CHECK MARK}" if nilai >= KKM else "\N{CROSS MARK}"
    print(f"{nama:<6}\N{BOX DRAWINGS LIGHT VERTICAL} {nilai:>5} {tanda}")
print(garis)
print("Tuntas:", sum(1 for n in nilai_kelas.values() if n >= KKM), "\N{MIDDLE DOT} KKM", KKM, "\N{TROPHY}")
