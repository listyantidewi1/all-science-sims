# Pertanyaan siswa: "bisakah membuat variabel siswa1, siswa2, ... di dalam perulangan?" -> globals() (lalu dibandingkan dengan list)
nama_nama = ["Andi", "Budi", "Cici"]
for i in range(len(nama_nama)):
    globals()["siswa" + str(i + 1)] = nama_nama[i]
print(siswa1, siswa2, siswa3)
print("siswa2" in globals(), globals()["siswa3"])
siswa = list(nama_nama)
print("Cara yang dianjurkan:", siswa[0], siswa[1], siswa[2])
