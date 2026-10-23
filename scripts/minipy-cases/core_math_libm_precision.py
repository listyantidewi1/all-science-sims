import math
xs = [0.25, 0.75, 1.75, 2.0, 3.25, 4.0, 7.5, 12.5, 33.3, 54.5, 99.9]
for x in xs:
    print(x, math.sin(x), math.cos(x), math.tan(x))
    print(x, math.exp(x), math.log(x), math.log10(x), math.log2(x))
    print(x, math.atan(x), math.sinh(x), math.cosh(x), math.tanh(x / 10), math.cbrt(x))
    print(x, x ** 1.5, x ** (1 / 3), x ** 0.25, x ** -0.5, x ** 2.5, math.pow(x, 1.1))
for d in range(0, 361, 15):
    r = math.radians(d)
    print(d, math.sin(r), math.cos(r))
print(math.atan2(1, 2), math.atan2(-3, 4), math.asin(0.3), math.acos(0.3), math.exp(-2.5), math.log(1e-10))
print(2 ** 0.5, 10 ** 0.3, 1.5 ** 2.5, 100 ** 0.1, math.e ** 2, math.exp(2))
