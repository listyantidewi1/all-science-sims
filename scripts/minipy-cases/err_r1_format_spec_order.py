n = 42
for spec in ["10.3s", "z", ".2", "s", "z.1f"]:
    try:
        print(repr(format(n, spec)))
    except ValueError as e:
        print(spec, "->", e)
print(f"{n:10.3s}")
