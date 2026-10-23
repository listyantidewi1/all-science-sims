fungsi = []
for i in range(3):
    fungsi.append(lambda: i)
print([f() for f in fungsi])
fungsi = [lambda i=i: i for i in range(3)]
print([f() for f in fungsi])
def buat_pengganda(n):
    def pengganda(x):
        return x * n
    return pengganda
dobel = buat_pengganda(2)
tripel = buat_pengganda(3)
print(dobel(5), tripel(5), buat_pengganda(10)(4))
def akumulator():
    total = []
    def tambah(x):
        total.append(x)
        return sum(total)
    return tambah
acc = akumulator()
acc(1); acc(2)
print(acc(10))
urut = sorted(["bb", "a", "ccc"], key=lambda s: -len(s))
print(urut, (lambda a, b: a * b)(6, 7))
