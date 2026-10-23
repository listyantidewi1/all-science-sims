def status_ketuntasan(nilai):
    if nilai >= 75:
        return "Tuntas"
    else:
        return "Belum Tuntas"
def hitung_denda(hari_terlambat, denda_per_hari=1000):   # parameter dengan nilai bawaan
    return hari_terlambat * denda_per_hari
print("Nilai 80:", status_ketuntasan(80))
print("Nilai 75:", status_ketuntasan(75))
print("Nilai 60:", status_ketuntasan(60))
print("Denda 5 hari (tarif bawaan):", hitung_denda(5))
print("Denda 5 hari (tarif 2000) :", hitung_denda(5, 2000))
