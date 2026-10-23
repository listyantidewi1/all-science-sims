def luar():
    def dalam():
        return x * 2
    hasil = dalam()
    x = 1
    return hasil
print(luar())
