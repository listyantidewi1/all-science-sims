import math
nan = float("nan")
print(math.sin(nan), math.cos(nan), math.tan(nan))
print(math.sqrt(nan), math.exp(nan), math.fabs(nan))
try:
    math.sin(float("inf"))
except ValueError as e:
    print("ValueError:", e)
