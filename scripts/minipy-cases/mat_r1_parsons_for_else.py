# Parsons Puzzle: kartu "else:" diletakkan sejajar dengan for (pengecoh) -> tetap jalan (for-else)
nilai_kelas = [80, 75, 90, 65, 85]
for nilai in nilai_kelas:
    if nilai >= 75:
        print(nilai, "-> Tuntas")
else:
    print(nilai, "-> Belum Tuntas")
total = 0
for nilai in nilai_kelas:
    if nilai < 70:
        print("Ada yang remedial:", nilai)
        break
    total += nilai
else:
    print("Semua tuntas")
print("total sebelum break:", total)
