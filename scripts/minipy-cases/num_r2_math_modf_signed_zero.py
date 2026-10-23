# math.modf keeps the sign on both parts: the fractional part of a negative whole number is -0.0
import math
print(math.modf(-3.0), math.modf(-5), math.modf(-2.5), math.modf(-1e300), math.modf(-0.0))
print(math.modf(3.0), math.modf(float("-inf")), math.modf(-7.25))
pecahan, bulat = math.modf(-4.0)
print(pecahan, bulat, pecahan == 0, str(pecahan))
