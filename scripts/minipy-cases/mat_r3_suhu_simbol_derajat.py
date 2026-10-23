# Latihan 2.2 Konversi Suhu dengan simbol derajat \N{DEGREE SIGN} di f-string; uji 0, -40, 100, 37.5
for _ in range(4):
    celsius = float(input("Suhu (Celsius): "))
    fahrenheit = celsius * 9 / 5 + 32
    reamur = 4 / 5 * celsius
    print(f"{celsius}\N{DEGREE SIGN}C = {fahrenheit:.1f}\N{DEGREE SIGN}F = {reamur:.1f}\N{DEGREE SIGN}R")
print("Titik beku: 0\N{DEGREE SIGN}C", "\N{BULLET} selesai")
