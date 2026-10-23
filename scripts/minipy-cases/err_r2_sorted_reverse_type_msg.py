def coba(f):
    try:
        print(f())
    except TypeError as e:
        print("TypeError:", e)
coba(lambda: sorted([1, "a"]))
coba(lambda: sorted([1, "a"], reverse=True))
coba(lambda: sorted([3, 1, 2, None, 0], reverse=True))
coba(lambda: max([1, None, 3]))
coba(lambda: min([1, None, 3]))
nilai = [80, "90", 75]
nilai.sort(reverse=True)
