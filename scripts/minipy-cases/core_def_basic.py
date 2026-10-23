def sapa(nama):
    print("Halo,", nama)
sapa("Andi")
def luas(p, l):
    return p * l
print(luas(3, 4), luas(l=2, p=5), luas(2.5, 2))
def kosong():
    pass
print(kosong())
def banyak():
    return 1, 2, 3
a, b, c = banyak()
print(a, b, c, banyak())
def tanpa_return(x):
    x = x + 1
print(tanpa_return(1))
def keliling(p, l=1):
    return 2 * (p + l)
print(keliling(3), keliling(3, 2), keliling(p=1, l=1))
print(callable(luas), luas.__name__)
