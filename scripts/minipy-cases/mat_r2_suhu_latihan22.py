# Latihan 2.2 Konversi Suhu dengan kasus uji batas (termasuk masukan dengan koma desimal)
n = int(input("Banyak data: "))
for _ in range(n):
    celsius = float(input("Suhu (Celsius): "))
    fahrenheit = celsius * 9 / 5 + 32
    print(f"{celsius} C = {fahrenheit:.1f} F", "|", fahrenheit, round(fahrenheit, 1))
