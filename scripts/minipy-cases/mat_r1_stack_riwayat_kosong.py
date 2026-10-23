# Pembaca berita: tombol "Sebelumnya" ditekan lebih sering daripada riwayat yang ada
riwayat = []

def baca(judul):
    riwayat.append(judul)
    print("Membaca :", judul)

def artikel_sebelumnya():
    if len(riwayat) < 2:
        print("Belum ada artikel sebelumnya.")
        return
    riwayat.pop()
    sebelumnya = riwayat.pop()
    baca(sebelumnya)

artikel_sebelumnya()
baca("Juara OSN")
artikel_sebelumnya()
baca("Pentas Seni")
baca("Kantin Sehat")
artikel_sebelumnya()
artikel_sebelumnya()
print("Riwayat:", riwayat, "| kosong?", not riwayat)
riwayat.pop()
print("Riwayat:", riwayat, "| kosong?", not riwayat)
riwayat.pop()
