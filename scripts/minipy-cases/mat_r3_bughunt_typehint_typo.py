# Bug Hunt Bab 7.4: petunjuk tipe (type hint) salah ketik "flaot" -> error terjadi saat def dijalankan, bukan saat dipanggil
print("Program luas persegi panjang")

def luas_persegi_panjang(panjang: float, lebar: flaot) -> float:
    return panjang * lebar

print("Fungsi sudah didefinisikan")
print(luas_persegi_panjang(8, 5))
