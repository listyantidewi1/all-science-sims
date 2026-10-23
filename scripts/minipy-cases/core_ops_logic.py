print(True and False, True or False, not True)
print(1 and 2, 0 and 2, 1 or 2, 0 or 2, "" or "default", "x" and "y")
print(None or [] or 0 or "terakhir", [] and None)
def cek(n):
    print("cek", n)
    return n
print(cek(0) and cek(1))
print(cek(1) or cek(2))
print(cek(1) and cek(2) and cek(3))
nilai = 80
print("LULUS" if nilai >= 75 else "BELUM LULUS")
print("genap" if nilai % 2 == 0 else "ganjil", 5 if False else 6 if True else 7)
