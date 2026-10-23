# ints that fit a double are converted (then the libm function); larger ints use frexp: log(m) + log(2)*e
import math
print(math.log2(2 ** 1000), math.log2(2 ** 1023), math.log10(10 ** 302), math.log(2 ** 1010, 2))
print(math.log10(10 ** 400), math.log2(2 ** 2000), math.log(2 ** 2000, 2), math.log(10 ** 400), math.log(10 ** 400, 10))
print(math.log2(2 ** 60), math.log10(10 ** 22), math.log2(2.0 ** 1023), math.log10(1e302))
