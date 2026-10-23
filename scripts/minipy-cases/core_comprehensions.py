kuadrat = [x * x for x in range(6)]
genap = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
pasangan = [(a, b) for a in range(3) for b in "xy"]
print(kuadrat, genap, pasangan)
matriks = [[i * j for j in range(3)] for i in range(3)]
print(matriks, [baris[1] for baris in matriks])
huruf = {c.upper() for c in "banana"}
print(sorted(huruf))
nilai = {"Andi": 80, "Budi": 60}
lulus = {k: v for k, v in nilai.items() if v >= 75}
print(lulus, {x: x ** 2 for x in range(4)})
x = "luar"
hasil = [x for x in "ab"]
print(x, hasil)
print(sum(x for x in range(5)), max(len(w) for w in ["a", "abc"]))
print(list(x + y for x in [1, 2] for y in [10, 20]))
print([y for y in [3, 1, 2] if y > (lambda: 1)()])
