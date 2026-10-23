cases = [("  0x1f  ", 16), ("0X1F", 0), ("-0b101", 0), ("_1", 10), ("1__0", 10), ("0_0", 10), ("00", 0), ("07", 0), ("0_7", 0),
         ("+0o17", 0), ("1_", 10), ("z", 36), ("Z", 36), ("2", 2), ("-", 10), ("0x", 16), ("\t42\n", 10), ("4 2", 10),
         ("٤٢", 10), ("0x1g", 16), ("1e3", 10), ("ff", 15), (" -0x_ff ", 0), ("1010", 2), ("777", 8)]
for s, b in cases:
    try:
        print(repr(s), b, int(s, b))
    except ValueError as e:
        print("ValueError:", e)
for b in [1, 37, -1]:
    try:
        int("5", b)
    except ValueError as e:
        print("ValueError:", e)
try:
    int(12, 10)
except TypeError as e:
    print("TypeError:", e)
