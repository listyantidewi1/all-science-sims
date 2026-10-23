# Manusia Variabel: menukar isi list, a = b = [] (satu kotak dua label), dan urutan penugasan i, x[i]
nilai = [80, 75, 90]
nilai[0], nilai[2] = nilai[2], nilai[0]
print(nilai)
a = b = []
a.append("Andi")
b = b + ["Budi"]
print(a, b)
x = [0, 0, 0]
i = 0
i, x[i] = 2, 9
print(i, x)
p = [1, 2]
q = p
p = p + [3]
q += [4]
print(p, q)
m = [[0] * 3] * 2
m[0][1] = 5
print(m)
