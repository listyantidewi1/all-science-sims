# math functions convert an int argument to float first: too big -> OverflowError, never inf
import math
big = 10 ** 400
print(math.sqrt(10 ** 300), math.sqrt(2 ** 1000), math.sqrt(4 * 10 ** 300))
for f in [math.sqrt, math.fabs, math.exp, math.sin, math.degrees]:
    try:
        print(f(big))
    except OverflowError as e:
        print("OverflowError:", e)
print(math.sqrt(big))
