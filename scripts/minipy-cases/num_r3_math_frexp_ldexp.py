# math.frexp splits a float into mantissa in [0.5, 1) and a power of two; math.ldexp is its inverse
import math
for x in [8.0, 0.1, -3.5, 1.0, 0.0, -0.0, 5e-324, 1e308, 3, 2 ** 70, True]:
    m, e = math.frexp(x)
    print(x, (m, e), math.ldexp(m, e), math.ldexp(m, e) == x)
print(math.frexp(float("inf")), math.frexp(float("-inf")), math.frexp(float("nan")))
print(math.ldexp(1.0, -1074), math.ldexp(1.0, -1075), math.ldexp(0.75, 1024), math.ldexp(-0.0, 5), math.ldexp(3, 2), math.ldexp(1.5, -10 ** 30))
for bad in [lambda: math.ldexp(1.0, 1024), lambda: math.ldexp(1.0, 10 ** 30), lambda: math.ldexp(1.0, 2.0), lambda: math.frexp("1"), lambda: math.frexp(10 ** 400)]:
    try:
        print(bad())
    except (OverflowError, TypeError) as e:
        print(type(e).__name__, e)
