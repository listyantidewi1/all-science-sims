import math
for f, x in [(math.sqrt, -1), (math.log, 0), (math.log, -5), (math.acos, 2), (math.factorial, -1)]:
    try:
        print(f(x))
    except ValueError as e:
        print("ValueError:", e)
try:
    math.factorial(5.5)
except TypeError as e:
    print("TypeError:", e)
try:
    math.exp(1000)
except OverflowError as e:
    print("OverflowError:", e)
print(math.sqrt(-4))
