# Bab 6.3 parameter adalah salinan lokal; Bug Hunt: mengubah variabel global tanpa kata kunci global
def tambah_poin(skor):
    skor = skor + 10
    return skor

skor_tim = 50
skor_baru = tambah_poin(skor_tim)
print("Skor lama:", skor_tim)
print("Skor baru:", skor_baru)

def tambah_poin_global():
    global skor_tim
    skor_tim = skor_tim + 10

tambah_poin_global()
tambah_poin_global()
print("Skor setelah dua kali tambah:", skor_tim)

def tambah_poin_salah():
    skor_tim = skor_tim + 10
    return skor_tim

print(tambah_poin_salah())
