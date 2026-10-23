stok = {"apel": 1, "jeruk": 2}
for jumlah in stok.values():
    stok.pop("apel", None)
    stok["mangga"] = 9
print(stok)
