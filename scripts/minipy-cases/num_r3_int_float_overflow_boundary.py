# int -> float conversion rounds to nearest-even: 2**1024 - 2**970 is exactly halfway above the largest
# double and overflows, one less rounds down; mixed int/float arithmetic and comparisons stay exact
import math
for n in [2 ** 1024 - 2 ** 970, 2 ** 1024 - 2 ** 970 - 1, 2 ** 1024 - 2 ** 971, 2 ** 53 + 1, 2 ** 53 + 3, 2 ** 54 + 2, 2 ** 54 + 6, -(2 ** 1024 - 2 ** 970 - 1)]:
    out = []
    for f in [float, lambda v: v * 1.0, lambda v: v + 0.0, lambda v: v / 1, math.sqrt, math.log, lambda v: v == 1.7976931348623157e308, lambda v: v < float("inf")]:
        try:
            out.append(repr(f(n)))
        except (OverflowError, ValueError) as e:
            out.append(type(e).__name__ + ": " + str(e))
    print(" | ".join(out))
print(1.7976931348623157e308 + 9.9792015476736e291, 1.7976931348623157e308 + 9.979201547673598e291, 1 / 2 ** 1074, 1 / 2 ** 1075, 3 / 2 ** 1076)
