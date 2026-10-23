def f(x):
    x = 1
    def g():
        nonlocal x
        del x
        print(x)
    g()
f(5)
