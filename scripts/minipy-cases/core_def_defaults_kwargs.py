def info(nama, kelas="X", *hobi, sekolah="SMA", **lain):
    print(nama, kelas, hobi, sekolah, lain)
info("Andi")
info("Budi", "XI", "futsal", "musik", sekolah="SMK", kota="Malang")
def tambah(item, daftar=[]):
    daftar.append(item)
    return daftar
print(tambah(1))
print(tambah(2))
def f(a, b, /, c, *, d):
    return a + b + c + d
print(f(1, 2, 3, d=4), f(1, 2, c=3, d=4))
args = [1, 2]
kw = {"c": 3, "d": 4}
print(f(*args, **kw))
print(max(*[3, 7, 1]))
