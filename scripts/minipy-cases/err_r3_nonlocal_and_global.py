def luar():
    x = 1
    def dalam():
        global x
        nonlocal x
    dalam()
luar()
