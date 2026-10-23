a = [1, 2, 3]
b = a
b.append(4)
print(a, b, a is b)
c = a[:]
c.append(5)
print(a, c, a is c, a == c[:4])
def ubah(lst):
    lst.append("diubah")
    lst = ["baru"]
    return lst
data = ["asli"]
hasil = ubah(data)
print(data, hasil)
x = 5
def coba(n):
    n += 1
    return n
print(coba(x), x)
m = [[0] * 2 for _ in range(2)]
m[0][0] = 1
print(m)
