simpan = None
try:
    1 / 0
except ZeroDivisionError:
    try:
        int("x")
    except ValueError as e:
        simpan = e
print(repr(simpan.__context__))
raise simpan
