# Tebak Output: {rata:.2} BUKAN dua angka di belakang koma (presisi tanpa huruf f)
nilai_mtk, nilai_fisika, nilai_kimia = 80, 75, 90
rata_rata = (nilai_mtk + nilai_fisika + nilai_kimia) / 3
print(f"Rata-rata: {rata_rata:.2f}")
print(f"Rata-rata: {rata_rata:.2}")
print(f"Rata-rata: {rata_rata:.3}")
print(f"Rata-rata: {rata_rata:.4}")
for nilai in [8.25, 99.5, 100.0, 0.5, 7.0]:
    print(f"{nilai:.2f} | {nilai:.2} | {nilai:.1}")
jumlah_siswa = 32
print(f"Siswa: {jumlah_siswa:.2}")
