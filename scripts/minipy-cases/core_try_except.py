def bagi(a, b):
    try:
        hasil = a / b
    except ZeroDivisionError:
        print("Tidak bisa dibagi nol")
        return None
    else:
        print("berhasil")
        return hasil
    finally:
        print("selesai bagi", a, b)
print(bagi(6, 3))
print(bagi(1, 0))
try:
    n = int(input("Masukkan angka: "))
except ValueError as e:
    print("Error:", e)
try:
    angka = int("12")
    print(angka + "a")
except (ValueError, TypeError) as e:
    print(type(e).__name__, "-", e)
try:
    [][0]
except Exception as e:
    print("Exception:", e)
try:
    {}["x"]
except:
    print("bare except")
try:
    print(undefined_var)
except NameError as err:
    print(err)
try:
    raise ValueError("Nilai tidak boleh negatif")
except ValueError as e:
    print(e, e.args)
try:
    try:
        1 / 0
    finally:
        print("finally dalam")
except ZeroDivisionError:
    print("ditangkap luar")
