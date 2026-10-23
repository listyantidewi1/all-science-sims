# Antrean kasir koperasi dengan deque; dilayani lebih banyak daripada yang mengantre
from collections import deque
antrean = deque(["Ani", "Bayu"])
print("Awal:", antrean, len(antrean))
antrean.append("Citra")
antrean.appendleft("Guru")
print("Terdepan:", antrean[0], "| terakhir:", antrean[-1], "| Bayu ada?", "Bayu" in antrean)
while antrean:
    print("Dilayani:", antrean.popleft(), "| sisa:", list(antrean))
print("Antrean kosong:", antrean, bool(antrean))
antrean_list = []
try:
    antrean_list.pop(0)
except IndexError as e:
    print("list:", e)
antrean.popleft()
