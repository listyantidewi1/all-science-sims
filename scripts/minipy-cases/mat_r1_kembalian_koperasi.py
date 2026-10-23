# Bab 2 Kembalian Belanja di Koperasi dengan kasus uji batas
for _ in range(3):
    uang_dibayar = int(input("Uang yang dibayarkan: Rp "))
    harga_buku = 35000
    harga_pulpen = 3000
    jumlah_pulpen = int(input("Jumlah pulpen yang dibeli: "))
    total_belanja = harga_buku + (harga_pulpen * jumlah_pulpen)
    kembalian = uang_dibayar - total_belanja
    print("Total belanja: Rp", total_belanja)
    print("Kembalian belanja kamu adalah: Rp", kembalian)
uang_dibayar = int(input("Uang yang dibayarkan: Rp "))
