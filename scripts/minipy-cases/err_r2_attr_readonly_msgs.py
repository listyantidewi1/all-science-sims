def coba(f):
    try:
        f()
    except AttributeError as e:
        print("AttributeError:", e)
data = [1, 2]
x = 5
def hapus_append():
    del data.append
def hapus_lain():
    del data.tidak_ada
def ubah_real():
    x.real = 3
coba(lambda: setattr(data, "append", 5))
coba(hapus_append)
coba(hapus_lain)
coba(ubah_real)
coba(lambda: setattr(x, "nilai", 3))
del data.append
