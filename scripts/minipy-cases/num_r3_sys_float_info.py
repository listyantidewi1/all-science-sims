# sys.float_info describes the IEEE-754 double (machine epsilon for numerical-methods lessons)
import sys
eps = sys.float_info.epsilon
print(eps, 1.0 + eps > 1.0, 1.0 + eps / 2 == 1.0, sys.float_info.max, sys.float_info.min, sys.float_info.dig, sys.float_info.mant_dig)
print(sys.float_info.max_exp, sys.float_info.min_exp, sys.float_info.max_10_exp, sys.float_info.min_10_exp, sys.float_info.radix, sys.float_info.rounds)
print(sys.float_info)
print(sys.float_info[0], len(sys.float_info), sys.float_info.max * 2, sys.maxsize, sys.maxsize == 2 ** 63 - 1)
e = 1.0
while 1.0 + e / 2 > 1.0:
    e /= 2
print(e == sys.float_info.epsilon)
