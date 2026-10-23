# Latihan 5.3 Antrean Kasir Koperasi: melihat yang terdepan (antrean[0]) saat antrean sudah kosong
from collections import deque
antrean = deque(["Ani", "Bayu", "Citra", "Dede", "Eka"])
print("Awal :", list(antrean))
antrean.popleft(); antrean.popleft()
print("Setelah 2 dilayani:", list(antrean))
antrean.append("Fani")
print("Setelah Fani datang:", list(antrean), antrean)
print("Terdepan:", antrean[0], "| paling belakang:", antrean[-1], "| posisi Eka:", antrean.index("Eka") + 1)
while antrean:
    antrean.popleft()
print("Antrean:", antrean, len(antrean))
print("Terdepan:", antrean[0])
