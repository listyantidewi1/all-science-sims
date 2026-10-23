import random
random.seed(42)
print(random.random())
print(random.randint(1, 10), random.randint(1, 100), random.randint(-5, 5))
print(random.choice(["Andi", "Budi", "Citra", "Dewi"]))
nama = ["Andi", "Budi", "Citra", "Dewi", "Eka"]
random.shuffle(nama)
print(nama)
print(random.sample(range(100), 5), random.sample("abcdef", 3))
print(random.uniform(1, 10), random.randrange(10), random.randrange(0, 100, 5), random.randrange(10, 0, -3))
print([random.randint(1, 6) for _ in range(10)])
random.seed(2024)
print(random.choices(["merah", "hijau", "biru"], k=5))
print(random.choices(["A", "B"], weights=[1, 9], k=6))
print(random.getrandbits(8), random.getrandbits(100))
print(round(random.gauss(0, 1), 12), round(random.normalvariate(10, 2), 12))
random.seed(7)
a = [random.random() for _ in range(3)]
random.seed(7)
b = [random.random() for _ in range(3)]
print(a == b)
