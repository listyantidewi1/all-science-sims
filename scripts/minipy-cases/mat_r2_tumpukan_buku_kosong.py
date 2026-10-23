# Latihan 5.2 Tumpukan Buku: stack dengan list, lalu diambil sekali lebih banyak dari isinya
tumpukan = []
for judul in input("Judul buku (pisahkan ;): ").split(";"):
    tumpukan.append(judul.strip())
    print("Ditumpuk:", tumpukan[-1], "| tinggi:", len(tumpukan))
print("Paling atas:", tumpukan[-1])
while len(tumpukan) > 0:
    print("Diambil:", tumpukan.pop())
print("Tumpukan:", tumpukan, "| kosong?", tumpukan == [])
print("Diambil:", tumpukan.pop())
