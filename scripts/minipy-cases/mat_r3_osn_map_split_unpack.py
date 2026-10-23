# Masukan dua bilangan dalam satu baris: a, b = map(int, input().split()); uji spasi ganda, satu angka, tiga angka
for _ in range(4):
    try:
        a, b = map(int, input("a b: ").split())
        print(a, "+", b, "=", a + b, "| a // b =", a // b if b else "tak terdefinisi")
    except ValueError as e:
        print("ValueError:", e)
a, b = map(int, input("a b: ").split())
