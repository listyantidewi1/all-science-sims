# Investigate (PRIMM): membaca dokumentasi fungsi buatan sendiri dengan help()
def luas_persegi_panjang(panjang, lebar=1):
    """Mengembalikan luas persegi panjang."""
    return panjang * lebar

help(luas_persegi_panjang)
print(luas_persegi_panjang(8, 5))
