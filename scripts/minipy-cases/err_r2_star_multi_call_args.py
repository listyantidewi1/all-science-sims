def tampil(*nilai):
    return nilai
print(tampil(*[1], *(2, 3)))
try:
    tampil(*[1], *3)
except TypeError as e:
    print("TypeError:", e)
tampil(*5)
