# round() with ndigits keeps the float sign (-0.0); without ndigits it returns an int
print(round(-0.4, 0), round(-0.0001, 2), round(-0.4), round(-1e-10, 5), round(0.4, 0), round(-0.5, 0), round(-0.5))
print(round(-4.5, -1), round(-5.0, -1), round(-15.0, -1), round(-25, -1), round(-0.05, 1), round(0.05, 1))
print(round(1e300, -299), round(123.456, -5), round(-123.456, -5), round(2.5, 0), round(3.5, 0), round(1e-320, 400))
print(round(0.1 + 0.2, 1), round(2.675, 2), round(8.875, 2), round(4.35, 1), round(-4.35, 1), round(1234.5, -1), round(1235.0, -1))
print(type(round(2.5)), type(round(2.5, 0)), type(round(25, -1)), round(True, 0), round(7, 3))
