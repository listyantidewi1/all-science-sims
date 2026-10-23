# math.trunc() looks up __trunc__ (message names the type), while floor/ceil/sqrt want a real number
import math
for f in [math.trunc, math.floor, math.ceil, math.sqrt, round, abs, int, float, math.isqrt, math.factorial]:
    for v in ["7", None, [1], (2.5,)]:
        try:
            print(f.__name__, repr(f(v)))
        except (TypeError, ValueError) as e:
            print(f.__name__, type(e).__name__, e)
print(math.trunc(-7.9), math.trunc(True), math.trunc(10 ** 20), type(math.trunc(2.5)))
