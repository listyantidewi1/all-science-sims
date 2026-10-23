# PP 02 ALGORITMA Menghitung_Luas_Persegi diterjemahkan ke Python; sisi pecahan, besar, dan negatif
while True:
    teks = input("Sisi (ketik x untuk berhenti): ")
    if teks.lower() == "x":
        break
    sisi = float(teks)
    luas = sisi * sisi
    print("Luas =", luas, "| sisi ** 2 =", sisi ** 2, "| keliling =", 4 * sisi)
    if sisi <= 0:
        print("  peringatan: sisi harus positif")
