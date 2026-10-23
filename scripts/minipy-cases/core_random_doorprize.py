import random
random.seed(17)
peserta = ["Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gita", "Hana", "Indra", "Joko"]
pemenang = random.sample(peserta, 3)
for i, p in enumerate(pemenang, 1):
    print(f"Pemenang {i}: {p}")
random.seed("doorprize")
print(random.choice(peserta), random.randint(1, 1000))
random.seed(3.5)
print(random.random())
random.seed(10 ** 30)
print(random.randint(1, 10 ** 20))
big = list(range(1000))
random.seed(5)
print(random.sample(big, 10))
random.shuffle(big)
print(big[:10])
