# PP 02: konversi suhu Celsius ke Reamur (R = 4/5 x C) dan Fahrenheit (F = 9/5 x C + 32)
n = int(input("Banyak data suhu: "))
for i in range(n):
    c = float(input("Suhu dalam Celsius: "))
    r = 4 / 5 * c
    f = 9 / 5 * c + 32
    print("Reamur:", r, "| Fahrenheit:", f)
    print(f"  dibulatkan: R = {r:.1f}, F = {f:.1f}, round F = {round(f, 1)}")
