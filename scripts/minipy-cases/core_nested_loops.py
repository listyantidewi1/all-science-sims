for i in range(1, 4):
    baris = ""
    for j in range(1, 4):
        baris += str(i * j).rjust(4)
    print(baris)
for i in range(1, 5):
    print("*" * i)
total = 0
for i in range(100):
    for j in range(100):
        total += 1
print(total)
