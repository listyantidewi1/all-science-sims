def aman(d, k):
    try:
        return d[k]
    except KeyError as e:
        print("konteks:", repr(e.__context__))
        return None
try:
    int("x")
except ValueError:
    print(aman({}, "a"))
