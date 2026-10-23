# -0.0 arises from float products/powers with a negative factor; mixing with int 0 follows IEEE rules
import math
print(-1.0 * 0, 0 * -1.0, -False * 1.0, False * -1.0, -0.0 + 0, 0 + -0.0, -0.0 - 0, 0 - 0.0, -0.0 * 1, 0 / -5, 0.0 / -5)
print((-0.0) ** 1, (-0.0) ** 2, (-0.0) ** 3, (-0.0) ** 0.5, pow(-0.0, 3), -0.0 // 1.0, -0.0 / 5, round(-0.4, 0), round(-0.0))
print(math.sqrt(-0.0), math.sin(-0.0), math.tan(-0.0), math.atan(-0.0), math.radians(-0.0), math.log1p(-0.0), math.expm1(-0.0))
print(math.fsum([-0.0, -0.0]), math.fsum([-0.0]), math.prod([-0.0, 1]), math.fmod(-6, 3), math.copysign(1, -0.0), math.ceil(-0.5))
print(sum([-0.0, -0.0]), sum([-0.0], -0.0), sum([1, 2, 3], -0.0), sum([-0.0, -0.0], 0), max([0.0, -0.0]), min(-0.0, 0.0, key=abs))
print({-0.0, 0.0}, {0.0, -0.0}, {-0.0: 1, 0.0: 2}, [-0.0].index(0), (-0.0).as_integer_ratio(), (-0.0).is_integer())
print(str(-0.0), format(-0.0, "g"), format(-0.0, "e"), format(-0.0, "%"), "%d|%i|%.0f|%s|%r|%g" % (-0.0, -0.0, -0.0, -0.0, -0.0, -0.0))
