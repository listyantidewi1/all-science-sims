s = "abc"
for lebar in [10 ** 400, 2 ** 63, -10 ** 400]:
    try:
        print(repr(s.center(lebar)))
    except OverflowError as e:
        print("OverflowError:", e)
print(s.zfill(10 ** 400))
