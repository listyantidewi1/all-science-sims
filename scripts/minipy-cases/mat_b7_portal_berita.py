import random
from collections import deque
random.seed(1)   # ditambahkan agar rekomendasi acak dapat diuji ulang

artikel = ["Juara OSN", "Pentas Seni", "Kantin Sehat", "Beasiswa 2026"]
riwayat = []            # struktur data: STACK (LIFO) -> "Sebelumnya"
baca_nanti = deque()    # struktur data: QUEUE (FIFO) -> "Baca Nanti"

def baca(judul):
    riwayat.append(judul)                      # catat ke riwayat (push)
    print("Membaca   :", judul)

def artikel_sebelumnya():
    if len(riwayat) < 2:
        print("Belum ada artikel sebelumnya.")
        return
    riwayat.pop()                              # buang artikel yang sedang dibaca
    sebelumnya = riwayat.pop()                 # ambil yang terakhir sebelum itu
    baca(sebelumnya)                           # baca ulang (otomatis tercatat lagi)

def simpan_nanti(judul):
    baca_nanti.append(judul)                   # masuk antrean (belakang)
    print("Disimpan  :", judul, "| antrean:", list(baca_nanti))

def baca_berikutnya():
    if len(baca_nanti) == 0:
        print("Antrean 'Baca Nanti' kosong.")
        return
    baca(baca_nanti.popleft())                 # keluar dari depan

def rekomendasi_acak():
    print("Rekomendasi:", random.choice(artikel))

# --- simulasi penggunaan ---
baca("Juara OSN")
baca("Pentas Seni")
artikel_sebelumnya()        # kembali ke "Juara OSN"
simpan_nanti("Kantin Sehat")
simpan_nanti("Beasiswa 2026")
baca_berikutnya()           # "Kantin Sehat" lebih dulu masuk, lebih dulu dibaca
rekomendasi_acak()
print("Riwayat akhir:", riwayat)
baca_berikutnya()
baca_berikutnya()
