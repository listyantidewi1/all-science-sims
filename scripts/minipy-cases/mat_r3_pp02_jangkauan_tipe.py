# PP 02 2.1.1 Tipe data primitif: "jangkauan integer -2147483648 sampai 2147483647" dibandingkan dengan Python
import sys

batas_int32 = 2147483647
print("int 32-bit maks + 1 :", batas_int32 + 1, type(batas_int32 + 1))
print("2 ** 100            :", 2 ** 100)
print("sys.maxsize         :", sys.maxsize, sys.maxsize == 2 ** 63 - 1)
print("float terbesar      :", sys.float_info.max)
print("float terkecil > 0  :", sys.float_info.min)
print("epsilon             :", sys.float_info.epsilon, 1.0 + sys.float_info.epsilon > 1.0)
print("digit presisi       :", sys.float_info.dig)
print("melewati batas      :", sys.float_info.max * 2, -sys.float_info.max * 2)
print("char (ASCII)        :", ord("A"), chr(65), chr(255), ord("é"), chr(8364))
