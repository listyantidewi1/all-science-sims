kesalahan = [ValueError, ZeroDivisionError]
for teks in ["4", "0"]:
    try:
        print(10 / int(teks))
    except kesalahan:
        print("input salah")
