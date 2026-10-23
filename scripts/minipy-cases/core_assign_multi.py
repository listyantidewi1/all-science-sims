a = b = c = 0
print(a, b, c)
x, y = 1, 2
x, y = y, x
print(x, y)
p, q, r = "abc"
print(p, q, r)
(m, n), o = (1, 2), 3
print(m, n, o)
first, *rest = [1, 2, 3, 4]
print(first, rest)
*init, last = "halo"
print(init, last)
a, *mid, z = range(5)
print(a, mid, z)
[u, v] = (10, 20)
print(u, v)
i = j = []
i.append(1)
print(i, j)
