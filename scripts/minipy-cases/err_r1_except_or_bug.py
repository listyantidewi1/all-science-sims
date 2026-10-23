def ubah(x):
    try:
        return int(x)
    except ValueError or TypeError:
        return "tidak bisa"
print(ubah("12"))
print(ubah("dua belas"))
print(ubah(None))
