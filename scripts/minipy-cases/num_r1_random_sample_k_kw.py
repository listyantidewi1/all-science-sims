import random
random.seed(10)
siswa = ["Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar"]
print(random.sample(siswa, k=3))
print(random.sample(range(1, 50), k=6))
print(random.sample(population="ABCDE", k=2))
print(random.sample(siswa, 2), random.randint(1, 6))
