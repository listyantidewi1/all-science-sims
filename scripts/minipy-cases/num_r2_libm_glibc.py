# CPython calls glibc's libm: these results are not always correctly rounded, and minipy must reproduce them bit
# for bit (pow, exp/log family, trig, expm1/log1p, hyperbolics) plus float_pow's IEEE special cases
import math
print(7.67 ** 3, 2.31 ** 4, (1 + 0.155) ** 4, 9.26 ** 0.5, math.sqrt(9.26), 3 ** -1, 7 ** -2, (-3) ** -3)
print(math.pow(175.7, 3), math.exp(1.31), math.log(7.67), math.log2(3.3), math.log10(0.07))
print(math.sin(8.85), math.cos(1.31), math.tan(math.radians(72)), math.tan(math.radians(187)))
print(math.asin(0.9737110066257741), math.acos(-0.9735934066728267), math.atan(1.7), math.atan2(-2.5, -0.3))
print(math.expm1(0.71), math.log1p(0.37), math.sinh(3.69), math.tanh(0.11909376074264344), math.sinh(17.58711020781093))
print(math.asinh(-12.081608688024431), math.asinh(3.1932651341597875), math.acosh(3.1942651341597874), math.atanh(0.6))
print(math.exp2(10.5), math.sin(1e22), math.cos(-2.0 ** 100), math.tan(123456789.0))
print(0.0 ** float('-inf'), (-0.0) ** float('-inf'), math.pow(0.0, float('-inf')), 2.0 ** float('-inf'), 0.5 ** float('inf'))
print(float('-inf') ** 3, float('-inf') ** -3, float('-inf') ** 2.5, float('nan') ** 0, 1.0 ** float('nan'), (-1.0) ** 1e300)
print(math.cbrt(1e-310), math.cbrt(-5e-324), math.cbrt(27.0))
total = 0.0
for n in range(1, 41):
    total += 1000 * (1 + 0.05 / 12) ** (12 * n)
print(total)
try:
    print(0.0 ** -1)
except ZeroDivisionError as e:
    print("ZeroDivisionError:", e)
print(10.0 ** 400)
