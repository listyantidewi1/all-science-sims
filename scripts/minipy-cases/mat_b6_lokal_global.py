def tambah_poin(skor):
    skor = skor + 10          # mengubah salinan lokal
    return skor
skor_tim = 50
skor_baru = tambah_poin(skor_tim)
print("Skor lama:", skor_tim)     # tetap 50
print("Skor baru:", skor_baru)    # 60
def ubah(x):
    x = x * 2
    return x + 1
a = 5
b = ubah(a)
print(a, b)
print(ubah(ubah(1)))
