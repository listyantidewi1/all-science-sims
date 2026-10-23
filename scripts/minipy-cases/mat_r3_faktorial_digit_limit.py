# Faktorial besar: str() menolak bilangan > 4300 digit; siswa mengikuti saran pesan error (sys.set_int_max_str_digits)
import math
import sys

n = int(input("n: "))
hasil = math.factorial(n)
print("Bit:", hasil.bit_length())
try:
    print("Banyak digit:", len(str(hasil)))
except ValueError as e:
    print("ValueError:", e)
    print("Batas sekarang:", sys.get_int_max_str_digits())
    sys.set_int_max_str_digits(20000)
    print("Banyak digit:", len(str(hasil)), "| 10 digit awal:", str(hasil)[:10])
