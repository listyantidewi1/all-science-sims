a = 2 ** 100
print(a)
print(-2 ** 100, (-2) ** 101)
f = 1
for i in range(1, 26):
    f = f * i
print("25! =", f)
print(10 ** 30 // 7, 10 ** 30 % 7)
print(-7 // 2, -7 % 2, 7 // -2, 7 % -2)
print(1_000_000 + 0x1F + 0o17 + 0b101)
print(type(a), type(True + 1), True + True, False * 3)
print(int(True), 3 - True)
