total = 0
try:
    while True:
        total += int(input("Angka: "))
except EOFError:
    print()
    print("total", total)
print(int(input("Lagi: ")))
