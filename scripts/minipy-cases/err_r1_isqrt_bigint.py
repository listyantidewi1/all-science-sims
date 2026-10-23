import math
n = 10 ** 400 + 12345
akar = math.isqrt(n)
print(akar == 10 ** 200, akar * akar <= n < (akar + 1) ** 2)
print(math.isqrt(2 ** 1100) == 2 ** 550)
