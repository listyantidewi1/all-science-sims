# str seeds go through sha512; int seeds use abs(); bool is an int
import random
for sd in ["é", "Budi Santoso", "x" * 300, "", "Kelas XI-2", -5, 2 ** 40 + 7, -2 ** 70, 2 ** 200, 12345678901234567890, True, False, 0]:
    random.seed(sd)
    print(repr(sd)[:16], random.random(), random.randint(1, 1000), random.choice("ABCDE"))
try:
    random.seed([1, 2])
except TypeError as e:
    print("TypeError:", e)
