# Bab 6.3 BMI dari masukan: tinggi diketik dalam cm (kesalahan logika) dan tinggi 0.0 (ZeroDivisionError float)
def hitung_bmi(berat, tinggi_meter):
    bmi = berat / (tinggi_meter * tinggi_meter)
    return bmi

for _ in range(3):
    berat = float(input("Berat (kg): "))
    tinggi = float(input("Tinggi (m): "))
    bmi = hitung_bmi(berat, tinggi)
    print(f"BMI: {bmi:.1f} | {bmi}")
