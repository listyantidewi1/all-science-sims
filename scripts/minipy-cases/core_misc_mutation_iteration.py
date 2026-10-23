angka = [1, 2, 3, 4, 5, 6]
for n in angka:
    if n % 2 == 0:
        angka.remove(n)
print(angka)
angka = [1, 2, 3, 4, 5, 6]
angka = [n for n in angka if n % 2 != 0]
print(angka)
lst = [1, 2, 3]
for x in lst:
    if len(lst) < 6:
        lst.append(x * 10)
print(lst)
q = ["a", "b", "c"]
while q:
    print("layani", q.pop(0), "sisa", q)
