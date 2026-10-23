def ambil_nilai(i):
    if i < 3:
        return i * 10
nilai = 0
for i in range(5):
    nilai = nilai + ambil_nilai(i)
    print(nilai)
