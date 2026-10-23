# Latihan 6.3 Rekap Uang Saku dipecah menjadi fungsi; uji batas 15000/15001 dan daftar kosong
def kategori(uang_saku):
    if uang_saku <= 15000:
        return "Hemat"
    return "Boros"

def rata_rata(daftar):
    if len(daftar) == 0:
        return 0
    return sum(daftar) / len(daftar)

for baris in range(3):
    data = [int(x) for x in input("Uang saku (pisahkan spasi): ").split()]
    for u in data:
        print(u, "->", kategori(u))
    print("Rata-rata:", rata_rata(data), "| hemat:", [kategori(u) for u in data].count("Hemat"))
