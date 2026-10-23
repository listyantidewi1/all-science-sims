# PP 02 Array: kursi bioskop A1..A5; penonton baru menyisip di tengah -> semua yang di kanan bergeser (hitung geseran)
kursi = ["Rio", "Dea", "Nia", "Dodo"]
for i, nama in enumerate(kursi):
    print(f"A{i + 1}: {nama}", end="  ")
print()
print("Siapa di A3?", kursi[2], "| paling kanan:", kursi[-1])
for posisi, nama in [(2, "Eka"), (1, "Fani"), (10, "Gita"), (-1, "Hadi"), (0, "Ian")]:
    indeks = posisi - 1
    kursi.insert(indeks, nama)
    geser = len(kursi) - 1 - kursi.index(nama)
    print(f"{nama} masuk ke posisi {posisi} (indeks {indeks}) -> geser {geser}:", kursi)
print("Jumlah penonton:", len(kursi), "| keluar paling kanan:", kursi.pop(), "| keluar A1:", kursi.pop(0))
print(kursi, kursi.index("Eka") + 1)
