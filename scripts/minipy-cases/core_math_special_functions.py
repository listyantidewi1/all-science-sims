# math.erf / erfc (glibc algorithms) and math.gamma / lgamma (CPython's Lanczos code), incl. error cases
import math
for v in [0.0, -0.0, 1e-30, 0.1, 0.5, 0.84375, 0.9, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.5, 5.9, 6.0, 10.0, 27.5, 30.0, -0.3, -1.1, -2.7, -7.0]:
    print(v, math.erf(v), math.erfc(v))
print(math.erf(float("inf")), math.erf(float("-inf")), math.erfc(float("inf")), math.erfc(float("-inf")))
for v in [0.5, 1.5, 2.5, 3.0, 5.0, 10.5, 23.0, 24.0, 50.25, 100.5, 141.2, 170.5, 171.0, -0.5, -1.5, -2.5, -10.25, -100.5, -170.5, 1e-25, -1e-25]:
    print(v, math.gamma(v), math.lgamma(v))
print(math.lgamma(1), math.lgamma(2), math.lgamma(1e300), math.gamma(-200.5), math.gamma(-201.5))
for bad in [0, -1, -2.0, 172, 1000, float("-inf")]:
    for fn in (math.gamma, math.lgamma):
        try:
            print(fn.__name__, bad, fn(bad))
        except (ValueError, OverflowError) as e:
            print(fn.__name__, bad, type(e).__name__, e)
# normal distribution table with erf (common in statistics lessons)
for z in [0, 0.5, 1, 1.5, 1.96, 2, 2.58, 3]:
    print(f"z = {z:4}: P(Z < z) = {0.5 * (1 + math.erf(z / math.sqrt(2))):.6f}")
