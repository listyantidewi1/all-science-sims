def penghitung():
    jumlah = 0
    def tambah():
        jumlah += 1
        return jumlah
    return tambah()
print(penghitung())
