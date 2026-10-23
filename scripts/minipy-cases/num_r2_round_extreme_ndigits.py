# round() with very large / very small ndigits, subnormals, and values at the edge of the float range
print(round(1.5, 10 ** 20), round(1.5, -10 ** 20), round(-1.5, -10 ** 20), round(15, 10 ** 20), round(1.25, True))
print(round(123.456, 308), round(123.456, 309), round(1e308, -308), round(5e307, -308))
for v in [1.5e308, 9.5e307, -1.7e308]:
    try:
        print(round(v, -308))
    except OverflowError as e:
        print("OverflowError:", e)
print(round(1e-300, 300), round(1.5e-300, 300), round(2.5e-300, 300), round(1.23e-310, 312), round(4.94e-324, 323))
print(round(10 ** 30 + 5 * 10 ** 10, -11), round(-(10 ** 30) - 5 * 10 ** 10, -11), round(10 ** 30 + 15 * 10 ** 10, -11))
print(round(-5, -1), round(-15, -1), round(-25, -1), round(-35, -1), round(250, -2), round(350, -2), round(-250, -2))
print(round(0, -5), round(99999, -5), round(50000, -5), round(150000, -5), round(1234.5, -1), round(1245.0, -1))
print(round(2 ** 53 - 0.5), round(2 ** 52 - 0.5), round(0.49999999999999997), round(1.4999999999999999), round(7.0e-10, 9), round(8.5e-10, 9))
print(round(3.4999999999999996, 0), round(3.5000000000000004, 0), round(0.0625, 3), round(100.5), round(101.5), round(-100.5))
