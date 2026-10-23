def rata_rata(daftar):
    total = 0
    for n in daftar:
        total += n
    return total / len(daftar)
print(rata_rata([80, 90]))
print(rata_rata([80, "90"]))
