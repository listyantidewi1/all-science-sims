target_dana = 100000
dana_terkumpul = 0
jumlah_penyumbang = 0
while dana_terkumpul < target_dana:
    sumbangan = int(input("Masukkan nominal sumbangan baru: Rp "))
    dana_terkumpul = dana_terkumpul + sumbangan
    jumlah_penyumbang = jumlah_penyumbang + 1
    print("Dana saat ini: Rp", dana_terkumpul)
print(f"Target tercapai dari {jumlah_penyumbang} penyumbang. Total: Rp {dana_terkumpul}")
