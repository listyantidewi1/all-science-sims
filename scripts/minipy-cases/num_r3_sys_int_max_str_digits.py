# the int<->str digit limit can be read and raised (0 = unlimited), as the ValueError message suggests
import sys, math
print(sys.get_int_max_str_digits())
try:
    print(math.factorial(2000))
except ValueError as e:
    print("ValueError:", e)
sys.set_int_max_str_digits(6000)
print(sys.get_int_max_str_digits(), len(str(math.factorial(2000))), str(math.factorial(2000))[:10])
try:
    print(len(str(10 ** 7000)))
except ValueError as e:
    print("ValueError:", e)
sys.set_int_max_str_digits(0)
print(sys.get_int_max_str_digits(), len(str(10 ** 7000)), int("7" * 8000) % 1000)
for bad in [100, -1]:
    try:
        sys.set_int_max_str_digits(bad)
    except ValueError as e:
        print("ValueError:", e)
sys.set_int_max_str_digits(640)
try:
    print(int("1" * 641))
except ValueError as e:
    print("ValueError:", e)
