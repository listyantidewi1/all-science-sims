def a(x):
    return b(x) + 1
def b(x):
    return c(x) * 2
def c(x):
    return 10 / x
print(a(5))
print(a(0))
