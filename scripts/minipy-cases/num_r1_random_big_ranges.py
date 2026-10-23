# randbelow on ranges wider than 32 bits draws several 32-bit words; sample() switches to set-based selection
import random
random.seed(3)
print([random.randrange(0, 2 ** 33) for _ in range(3)], [random.randrange(3 ** 25) for _ in range(2)])
print(random.randint(2 ** 31, 2 ** 32), random.randrange(-2 ** 40, 0), random.randrange(2 ** 40, 2 ** 41, 3), random.randint(-10 ** 15, 10 ** 15))
random.seed(1)
print(random.sample(range(1000), 30))
print(random.sample(range(10 ** 9), 4), random.sample(range(5, 50, 5), 4))
random.seed(5)
deret = list(range(40))
random.shuffle(deret)
print(deret)
print([random.randrange(1, 100, 7) for _ in range(5)], random.randrange(-10, -1), random.randrange(10, 2, -2), random.uniform(5, 1))
