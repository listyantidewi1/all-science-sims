# Tebak Output (pembuka kelas): operator, presedensi, dan tipe hasil
print(10 // 3 * 3 + 10 % 3)
print(2 + 3 * 4 ** 2, (2 + 3) * 4, -3 ** 2, (-3) ** 2, 2 ** 3 ** 2)
print(17 / 4, 17 // 4, -17 // 4, 17 % -4, -17 % 4, 17.0 // 4)
print("5" * 3, 5 * "3", "5" + "3", int("5") + int("3"), float("5") + 3)
print(len("Halo Dunia"), "Python"[1:4], "Python"[-1], "Python"[::2], "Python"[10:])
print(True + True, True and not False, 3 == 3.0, type(3 == 3.0), 0.1 + 0.2, round(0.1 + 0.2, 2))
print(1 / 3 * 3, 10 / 5, 9 ** 0.5, int(9 ** 0.5), 8 ** (1 / 3), 27 ** (1 / 3), 2 ** -2)
print("abc" < "abd", "Z" < "a", "10" < "9", bool("False"), bool(0.0), not "")
print(round(2.5), round(3.5), round(-2.5), round(2.675, 2), int(-3.9), abs(-7) % 4)
a = 10
b = 3
print(a / b, a // b, a % b, a ** b, str(a) + str(b))
x = 5
x = x + 1
x = x * x
x -= 6
print(x, x // 7, x / 7)
