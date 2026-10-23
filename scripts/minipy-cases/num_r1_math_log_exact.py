# logs of exact powers: the classic "how many halvings" computation
import math
for n in [1, 2, 8, 1024, 2 ** 20, 2 ** 52, 10 ** 6, 1000, 100]:
    print(n, math.log2(n), math.log10(n), math.log(n, 2), math.log(n, 10), math.ceil(math.log2(n)) if n > 1 else 0)
print(math.log(8, 2), math.log(1000, 10), math.log(125, 5), math.log(math.e), math.log(1), math.log(0.5, 2), math.log2(0.125), math.log10(0.001))
for bad in [0, -1]:
    try:
        math.log(bad)
    except ValueError as e:
        print("ValueError:", e)
try:
    math.log(10, 1)
except ZeroDivisionError as e:
    print("ZeroDivisionError:", e)
