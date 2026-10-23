# Bab 5.1 Contoh Kasus 3 Keranjang Belanja: barang kembar, remove hanya menghapus yang pertama
keranjang = ["Buku Tulis", "Pulpen", "Tipe-X", "Pulpen", "Penggaris"]
keranjang[1] = "Spidol"
print("Setelah diganti :", keranjang)
keranjang.remove("Pulpen")
print("Setelah dihapus :", keranjang, keranjang.count("Pulpen"))
terakhir = keranjang.pop()
print("Dikeluarkan     :", terakhir, "| sisa:", keranjang)
print("Indeks Spidol   :", keranjang.index("Spidol"), "| ada Pulpen?", "Pulpen" in keranjang)
while keranjang:
    print("Ambil:", keranjang.pop(0), "| sisa", len(keranjang))
keranjang.remove("Tipe-X")
