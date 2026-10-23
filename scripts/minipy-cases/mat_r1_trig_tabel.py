# Tabel trigonometri sudut 0..90 derajat dengan modul math
import math
print("sudut | sin | cos | tan")
for sudut in range(0, 91, 3):
    r = math.radians(sudut)
    print(sudut, math.sin(r), math.cos(r), math.tan(r))
jarak = float(input("Jarak ke pohon (m): "))
sudut = float(input("Sudut elevasi (derajat): "))
tinggi = jarak * math.tan(math.radians(sudut))
print("Tinggi pohon:", tinggi, "m")
print(f"Dibulatkan: {tinggi:.2f} m")
