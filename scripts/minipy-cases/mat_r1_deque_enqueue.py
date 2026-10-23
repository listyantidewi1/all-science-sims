# Bug Hunt: istilah PP 02 (enqueue/dequeue) dipakai sebagai nama method deque
from collections import deque
antrean = deque()
antrean.append("Tugas Bu Sari")
print("Antrean saat ini:", list(antrean))
antrean.enqueue("Soal Pak Budi")
print("Antrean saat ini:", list(antrean))
