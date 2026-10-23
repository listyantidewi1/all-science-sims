angka = ["1", "2", "3"]
print(list(map(int, angka)), sum(map(int, angka)))
def kuadrat(x):
    return x * x
print(list(map(kuadrat, [1, 2, 3])), list(map(lambda x: x * 10, range(3))))
print(list(filter(lambda x: x % 2 == 0, range(10))), list(filter(None, [0, 1, "", "a", None])))
def lulus(n):
    return n >= 75
print(list(filter(lulus, [80, 74.9, 75, 60])))
print(list(map(str.upper, ["a", "b"])), list(map(len, ["aa", "b"])))
print(list(map(lambda a, b: a + b, [1, 2], [10, 20, 30])))
a, b = map(int, "3 4".split())
print(a * b)
f = lambda: "tanpa argumen"
g = lambda x, y=2: x ** y
print(f(), g(3), g(2, 10), (lambda *a: len(a))(1, 2, 3))
