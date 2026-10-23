# Volume kubus dan bunga majemuk dengan operator pangkat **
n = int(input("Banyak kubus: "))
for i in range(n):
    sisi = float(input(f"Sisi kubus ke-{i + 1} (cm): "))
    volume = sisi ** 3
    luas = 6 * sisi ** 2
    print("Volume:", volume, "| Luas permukaan:", luas, "| sisi^4:", sisi ** 4)
tabungan = 1000000
bunga = float(input("Bunga per tahun (desimal): "))
tahun = int(input("Lama menabung (tahun): "))
print("Faktor:", (1 + bunga) ** tahun)
print("Saldo akhir:", tabungan * (1 + bunga) ** tahun)
