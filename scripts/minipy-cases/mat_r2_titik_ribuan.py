# Bug Hunt: pengguna mengetik harga dengan titik ribuan (gaya Indonesia), "10.000" dibaca float sebagai 10.0
for _ in range(3):
    harga = float(input("Harga buku (Rp): "))
    jumlah = int(input("Jumlah: "))
    print("Total: Rp", harga * jumlah, f"| Rp {harga * jumlah:,.0f}".replace(",", "."))
harga = int(input("Harga buku (Rp): "))
