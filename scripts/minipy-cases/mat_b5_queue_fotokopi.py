from collections import deque
antrean = deque()                 # antrean kosong
antrean.append("Tugas Bu Sari")   # masuk antrean (belakang)
antrean.append("Soal Pak Budi")
antrean.append("Surat Kepala Sekolah")
print("Antrean saat ini:", list(antrean))
# Petugas melayani yang terdepan satu per satu
while len(antrean) > 0:
    dokumen = antrean.popleft()   # keluar dari depan
    print("Sedang difotokopi:", dokumen, "| sisa antrean:", len(antrean))
print("Semua dokumen selesai.")
