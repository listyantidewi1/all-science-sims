# Counter rich comparisons (3.10+) are multiset inclusion; missing keys count as 0
from collections import Counter
a = Counter("aab")
b = Counter("aabbc")
print(a <= b, a < b, b >= a, b > a, a >= b, a <= a, a < a)
print(Counter(a=1) == Counter(a=1, b=0), Counter(a=1, b=0) <= Counter(a=1))
try:
    print(Counter.fromkeys("abc"))
except NotImplementedError as e:
    print("NotImplementedError:", e)
