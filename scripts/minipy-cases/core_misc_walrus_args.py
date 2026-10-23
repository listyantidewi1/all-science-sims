data = []
while (masukan := input("Data: ")) != "selesai":
    data.append(int(masukan))
print(data, sum(data))
def jumlahkan(*angka):
    return sum(angka)
print(jumlahkan(), jumlahkan(1, 2, 3))
def profil(**info):
    for k, v in info.items():
        print(k, "=", v)
profil(nama="Andi", kelas="X")
if (n := len(data)) > 2:
    print("banyak data:", n)
