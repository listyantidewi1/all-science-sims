def cek_umur(u):
    if u < 0:
        raise ValueError("Umur tidak boleh negatif")
    return u
print(cek_umur(17))
try:
    cek_umur(-1)
except ValueError as e:
    print("Tertangkap:", e)
try:
    raise KeyError("kunci")
except KeyError as e:
    print(repr(e), str(e))
try:
    raise IndexError
except IndexError as e:
    print("kosong:", repr(e), str(e) == "")
def ulang():
    try:
        1 / 0
    except ZeroDivisionError:
        print("log dulu")
        raise
try:
    ulang()
except ZeroDivisionError as e:
    print("diteruskan:", e)
cek_umur(-5)
