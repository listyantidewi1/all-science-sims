def konversi(s):
    try:
        return int(s)
    except ValueError:
        raise TypeError("bukan angka")
try:
    try:
        1 / 0
    except ZeroDivisionError:
        konversi("x")
except TypeError as t:
    print(repr(t.__context__))
    print(repr(t.__context__.__context__))
try:
    1 / 0
except ZeroDivisionError:
    konversi("y")
