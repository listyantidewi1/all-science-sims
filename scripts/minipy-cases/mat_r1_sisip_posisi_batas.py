# Contoh kerja Daftar Piket: sisip_petugas diuji dengan posisi batas (posisi dihitung mulai 1)
def tampilkan_piket(daftar):
    for nomor, nama in enumerate(daftar, start=1):
        print(f"  {nomor}. {nama}")

def sisip_petugas(daftar, posisi, nama):
    daftar.insert(posisi - 1, nama)
    print(f"-> {nama} disisipkan di posisi {posisi}.")

piket = ["Andi", "Budi", "Cici"]
for posisi, nama in [(1, "Awal"), (len(piket) + 2, "Akhir"), (0, "Nol"), (99, "Jauh"), (-1, "Minus")]:
    sisip_petugas(piket, posisi, nama)
    tampilkan_piket(piket)
print(piket.index("Nol") + 1, len(piket))
