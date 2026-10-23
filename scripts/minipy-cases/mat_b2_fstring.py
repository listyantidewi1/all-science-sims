nama = "Siti"
nilai = 85
rata = 79.33333
print("Halo", nama, ", nilaimu", nilai)          # cara biasa: ada spasi sebelum koma
print(f"Halo {nama}, nilaimu {nilai}")            # f-string: rapi
print(f"Rata-rata kelas: {rata:.2f}")             # .2f = dua angka di belakang koma
print(f"Nilai {nama} setelah remedial: {nilai + 5}")   # boleh berisi perhitungan
a = 10
b = 3
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
print(str(a) + str(b))
