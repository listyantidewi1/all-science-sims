# Bab 6.3 hitung_denda dengan parameter bawaan: cara memanggil yang benar dan salah
def hitung_denda(hari_terlambat, denda_per_hari=1000):
    return hari_terlambat * denda_per_hari

print(hitung_denda(5), hitung_denda(5, 2000), hitung_denda(denda_per_hari=500, hari_terlambat=3), hitung_denda(0))
for panggil in ["tarif", "ganda", "lebih"]:
    try:
        if panggil == "tarif":
            hitung_denda(5, tarif=2000)
        elif panggil == "ganda":
            hitung_denda(5, hari_terlambat=3)
        else:
            hitung_denda(5, 2000, 3)
    except TypeError as e:
        print(panggil, "->", e)
print(hitung_denda())
