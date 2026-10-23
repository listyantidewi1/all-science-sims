# Tebak Output: method dipanggil lewat nama tipenya (str.upper) dan dicetak tanpa dipanggil
nama = "budi santoso"
print(str.upper(nama), str.title(nama))
daftar = ["Andi"]
list.append(daftar, "Budi")
print(daftar)
print(str.upper)
print(list.append)
print(type(str.upper).__name__)
print(sorted(["cici", "Budi", "andi"], key=str.lower))
