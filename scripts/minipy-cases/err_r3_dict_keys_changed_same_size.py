stok = {"apel": 0, "jeruk": 5}
for buah in stok:
    if stok[buah] == 0:
        del stok[buah]
        stok["mangga"] = 3
print(stok)
