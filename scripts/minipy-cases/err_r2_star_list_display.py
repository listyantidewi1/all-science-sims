def coba(f):
    try:
        print(f())
    except TypeError as e:
        print("TypeError:", e)
coba(lambda: [*"ab", *range(2)])
coba(lambda: [*5])
coba(lambda: (*None,))
coba(lambda: [0, *3.5])
coba(lambda: {*5})
data = 5
semua = [*data]
