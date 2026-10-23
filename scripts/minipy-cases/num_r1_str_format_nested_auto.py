# auto-numbered replacement fields nested inside a format spec take the NEXT positional argument
x = 3.14159
print("{:.{}f}".format(x, 2))
print("[{:>{}}]".format("a", 5))
print("[{:{}{}{}}]".format(42, "*", "^", 9))
print("{} {:.{}f} {}".format("pi", x, 3, "end"))
for nama, nilai in [("Andi", 87.456), ("Budi", 9.5)]:
    print("{:<{}}|{:>{}.{}f}|".format(nama, 6, nilai, 8, 1))
