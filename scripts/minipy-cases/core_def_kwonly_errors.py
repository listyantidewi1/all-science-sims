def daftar(nama, *, kelas):
    return nama + kelas
print(daftar("Andi", kelas="X"))
def f(a, b=2, *args, c, d=4, **kw):
    return (a, b, args, c, d, kw)
print(f(1, c=3), f(1, 2, 3, 4, c=5, e=6))
for call in [lambda: daftar("Andi", "X"), lambda: f(1), lambda: f(c=1), lambda: f(1, 2, c=3, a=4)]:
    try:
        call()
    except TypeError as e:
        print(e)
daftar("Budi")
