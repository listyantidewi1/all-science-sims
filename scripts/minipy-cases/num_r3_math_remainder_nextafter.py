# IEEE-754 helpers: math.remainder rounds the quotient to nearest-even (unlike %), nextafter steps to the
# adjacent float (3.12: steps=), fma is a fused multiply-add with a single rounding (3.13)
import math
for x, y in [(10, 3), (11, 3), (5, 2), (7, 2), (-7, 2), (7.5, -2), (1e300, 3), (0.3, 0.1), (5, float("inf"))]:
    print(x, y, math.remainder(x, y), x % y)
print(math.nextafter(1.0, 2.0), math.nextafter(1.0, 0.0), math.nextafter(0.0, 1.0), math.nextafter(0.0, -1.0), math.nextafter(1.0, 1.0))
print(math.nextafter(1.0, 2.0, steps=3), math.nextafter(1e308, math.inf, steps=10 ** 20), math.nextafter(-0.0, 0.0), math.nextafter(1, 0, steps=0))
print(math.fma(2, 3, 4), math.fma(0.1, 10, -1), 0.1 * 10 - 1, math.fma(-0.0, 1.0, 0.0))
print(math.ulp(1.0), math.ulp(1e16), math.ulp(0.0), math.ulp(-2.5), math.ulp(math.inf))
for bad in [lambda: math.remainder(1, 0), lambda: math.remainder(math.inf, 1), lambda: math.nextafter(1.0, 2.0, steps=-1), lambda: math.fma(1e308, 10, 0)]:
    try:
        print(bad())
    except (ValueError, OverflowError) as e:
        print(type(e).__name__, e)
