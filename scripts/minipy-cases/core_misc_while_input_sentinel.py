total = 0
jumlah = 0
while True:
    teks = input("Nilai (kosong = selesai): ")
    if teks == "":
        break
    nilai = float(teks)
    total += nilai
    jumlah += 1
if jumlah > 0:
    print(f"Rata-rata {jumlah} nilai: {total / jumlah:.2f}")
print("maks", max(80, 74.9, 75))
