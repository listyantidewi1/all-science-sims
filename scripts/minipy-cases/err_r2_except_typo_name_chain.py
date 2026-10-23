def bagi(a, b):
    try:
        return a / b
    except ZeroDivisonError:
        print("tidak bisa dibagi nol")
        return None
print(bagi(10, 2))
print(bagi(10, 0))
