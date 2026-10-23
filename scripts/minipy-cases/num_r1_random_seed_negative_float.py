# a float seed is hashed; a negative hash is used as an unsigned 64-bit value (not its absolute value)
import random
for s in [3.7, -3.7, 0.5, -0.5, -2.25, -1e10, -123.456]:
    random.seed(s)
    print(s, random.random(), random.randint(1, 100))
