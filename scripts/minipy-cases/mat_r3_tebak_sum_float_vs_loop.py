# Tebak Output: akumulator dengan perulangan vs sum() untuk uang pecahan (Python 3.12+ sum() lebih teliti)
iuran = [0.1] * 10
total = 0
for x in iuran:
    total = total + x
print("Loop  :", total, total == 1.0)
print("sum() :", sum(iuran), sum(iuran) == 1.0)
harga = [1.1, 2.2, 3.3]
t = 0
for h in harga:
    t += h
print(t, sum(harga), round(t, 2) == round(sum(harga), 2))
print(sum([0.1, 0.2, 0.3]), 0.1 + 0.2 + 0.3, sum([1e100, 1.0, -1e100]), sum([1, 2.5, True]), sum(range(5), 0.0))
import math
print(math.fsum(iuran), math.fsum([1e100, 1.0, -1e100]), sum(iuran) / len(iuran))
