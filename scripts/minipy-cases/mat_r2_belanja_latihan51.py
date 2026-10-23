# Latihan 5.1 Daftar Belanja: posisi sisip dari masukan (posisi manusia mulai 1) dan hapus barang yang tidak ada
belanja = ["Buku", "Pensil", "Penghapus"]
belanja.append("Penggaris")
belanja.insert(1, "Pulpen")
belanja.remove("Pensil")
for nomor, barang in enumerate(belanja, start=1):
    print(f"{nomor}. {barang}")
for _ in range(3):
    barang = input("Barang baru: ")
    posisi = int(input("Posisi (mulai 1): "))
    belanja.insert(posisi - 1, barang)
    print(belanja)
hapus = input("Hapus barang: ")
belanja.remove(hapus)
print(belanja)
