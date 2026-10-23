def f():
    print("f dipanggil")
    return 5
print(1 < f() < 10)
print(10 < f() < 20)
def g(x):
    print("g", x)
    return x
print(g(1) < g(2) > g(0) == g(0))
print(g(3) if g(True) else g(4))
x = [g(i) for i in range(2)]
