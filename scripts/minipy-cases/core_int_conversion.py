print(int("42"), int(" 42 "), int("-7"), int("+3"), int("1_000"), int("\t9\n"))
print(int(3.99), int(-3.99), int(True), int(1e20), int("0b101", 0), int("z", 36))
print(int("12", 8), int("FF", 16), int("0o17", 8))
print(int("١٢٣"), int(2.5 + 0.5))
for teks in ["12.5", "abc", "", "1 2", "0x10"]:
    try:
        print(int(teks))
    except ValueError as e:
        print("ValueError:", e)
print(int("7.5"))
