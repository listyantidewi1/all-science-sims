# Bug Hunt: harga ditulis dengan koma ribuan (10,000) sehingga menjadi tuple, bukan bilangan
harga_buku = 10,000
harga_pulpen = 3000
print("Harga buku:", harga_buku, type(harga_buku))
print("Dua buku:", harga_buku * 2)
print("Banyak bagian:", len(harga_buku), harga_buku[0], harga_buku[1])
total = harga_buku + harga_pulpen
print("Total:", total)
