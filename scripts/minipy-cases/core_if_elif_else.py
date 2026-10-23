def predikat(nilai):
    if nilai >= 90:
        return "A"
    elif nilai >= 80:
        return "B"
    elif nilai >= 70:
        return "C"
    else:
        return "D"
for n in [95, 90, 85, 80, 75, 70, 69.9, 0]:
    print(n, predikat(n))
x = 5
if x > 3: print("besar")
if x < 3:
    print("kecil")
if x:
    pass
else:
    print("tidak")
if 0 <= x < 10 and x != 7:
    print("satu digit")
