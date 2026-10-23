n = 5
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
for i in range(n, 0, -1):
    print(str(i) * i)
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i * j:<3}", end="")
    print()
print("\n".join("".join("#" if (r + c) % 2 == 0 else "." for c in range(6)) for r in range(3)))
