def hitung_bmi(berat, tinggi_meter):
    bmi = berat / (tinggi_meter * tinggi_meter)
    return bmi                      # mesin mengembalikan hasil
bmi_budi = hitung_bmi(60, 1.70)     # hasil disimpan ke variabel
bmi_andi = hitung_bmi(55, 1.65)
print(f"BMI Budi: {bmi_budi:.1f}")
print(f"BMI Andi: {bmi_andi:.1f}")
print("Selisih BMI:", round(bmi_budi - bmi_andi, 2))   # hasil fungsi dipakai dalam hitungan
print(bmi_budi, bmi_andi)
