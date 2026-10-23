# round(x, n) is correctly rounded from the exact binary value (ties to even only on exact halves);
# a seeded sweep over decimal-looking floats, extreme magnitudes/ndigits and big ints
import random
random.seed(99)
hasil = []
for i in range(600):
    d = random.randint(1, 6)
    x = random.randint(-10 ** 7, 10 ** 7) / 10 ** d + random.choice([0, 0, 5 * 10 ** -(d + 1)])
    n = random.randint(-3, d + 1)
    hasil.append(repr(round(x, n)) + "/" + repr(round(x)) + "/" + "%.*f" % (max(n, 0), x))
for i in range(0, len(hasil), 12):
    print(" ".join(hasil[i:i + 12]))
for i in range(60):
    x = random.random() * 10 ** random.randint(-320, 308)
    n = random.randint(-310, 330)
    print(repr(x), n, repr(round(x, n)), repr(round(-x, n // 2)))
print([round(random.randint(-10 ** 30, 10 ** 30), random.randint(-32, 2)) for _ in range(8)])
