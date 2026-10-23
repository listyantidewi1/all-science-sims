import math
print(math.isqrt(10 ** 30), math.isqrt(2 ** 1000) == 2 ** 500)
print(math.isqrt(10 ** 400) == 10 ** 200)
n = (10 ** 200 + 3) ** 2
print(math.isqrt(n) - 10 ** 200, math.isqrt(n - 1) - 10 ** 200, math.isqrt(2 ** 2001) % 1000)
