def kuadrat(x):
    return x * x
def jumlah_kuadrat(a, b):
    return kuadrat(a) + kuadrat(b)
def hipotenusa(a, b):
    return jumlah_kuadrat(a, b) ** 0.5
print(hipotenusa(3, 4))
print(kuadrat(kuadrat(2)))
def luar():
    def dalam(y):
        return y * 10
    return dalam(4) + 1
print(luar())
