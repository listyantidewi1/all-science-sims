for n in range(2, 20):
    for d in range(2, n):
        if n % d == 0:
            break
    else:
        print(n, "prima")
for i in range(10):
    if i % 2 == 0:
        continue
    if i > 7:
        break
    print("ganjil", i)
for i in []:
    print("tidak")
else:
    print("kosong tapi else jalan")
for i in range(3):
    pass
print("i akhir =", i)
