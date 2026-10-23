import math
print(math.radians(180), math.degrees(math.pi), math.radians(30), math.degrees(1))
print(math.sin(0), math.cos(0), math.tan(0))
print(math.sin(math.pi / 2), math.cos(math.pi), math.sin(math.radians(30)), math.cos(math.radians(60)))
print(round(math.sin(math.radians(45)), 4), round(math.tan(math.radians(45)), 10))
print(math.asin(1), math.acos(0), math.atan(1), math.atan2(1, 1), math.atan2(-1, -1))
for sudut in [0, 30, 45, 60, 90]:
    r = math.radians(sudut)
    print(sudut, f"{math.sin(r):.4f} {math.cos(r):.4f}")
