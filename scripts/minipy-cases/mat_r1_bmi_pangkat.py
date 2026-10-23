# Kalkulator BMI: tinggi ** 2 dibandingkan tinggi * tinggi, uji beberapa tinggi
def hitung_bmi(berat, tinggi_meter):
    return berat / tinggi_meter ** 2

def kategori(bmi):
    if bmi < 18.5:
        return "Kurus"
    elif bmi < 25:
        return "Normal"
    return "Berlebih"

for berat, tinggi in [(60, 1.70), (55, 1.65), (45, 1.58), (80, 1.75), (50, 1.645), (92.5, 1.92)]:
    bmi = hitung_bmi(berat, tinggi)
    print(berat, tinggi, bmi, berat / (tinggi * tinggi), f"{bmi:.1f}", round(bmi, 2), kategori(bmi))
print("Selisih BMI:", round(hitung_bmi(60, 1.70) - hitung_bmi(55, 1.65), 2))
print(hitung_bmi(60, 0))
