# three-argument pow with a negative exponent computes a modular inverse (Python 3.8+)
print(pow(3, -1, 7), pow(38, -1, 97), pow(3, -2, 7), pow(-3, -1, 7), pow(3, -1, -7), pow(5, -1, 1), pow(7, -1, 10 ** 20 + 39))
print(pow(3, 4, 7), pow(-3, 3, 7), pow(3, 4, -5), pow(10, 100, 10 ** 9 + 7), pow(2, 0, 1), pow(0, 0, 5))
for args in [(2, -1, 4), (2, 3, 0), (2.0, 3, 5), (0, -1, 5)]:
    try:
        print(pow(*args))
    except (ValueError, TypeError) as e:
        print(type(e).__name__, e)
