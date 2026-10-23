a = list(range(10))
print(a[::-1], a[-3:], a[:-7], a[2:8:3], a[8:2:-2], a[100:], a[-100:2])
a[2:5] = "xyz"
print(a)
b = [0] * 5
b[::2] = [1, 1, 1]
print(b)
print(a.index(7, 5), [1, 2, 3, 2, 1].index(1, 1))
del a[::2]
print(a)
c = [1, 2, 3]
c[1:1] = [9, 9]
print(c, c[:])
c[::2] = [0, 0]
