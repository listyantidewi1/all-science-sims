# PP 02 (translasi masalah): diskon 10% jika total belanja MELEBIHI Rp100.000
while True:
    teks = input("Total belanja (ketik selesai untuk berhenti): ")
    if teks == "selesai":
        break
    total_belanja = float(teks)
    if total_belanja > 100000:
        diskon = 10 / 100 * total_belanja
    else:
        diskon = 0
    bayar = total_belanja - diskon
    print(f"Diskon: Rp {diskon:,.2f} | Bayar: Rp {bayar:,.2f} | {bayar}")
