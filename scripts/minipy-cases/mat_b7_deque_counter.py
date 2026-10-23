from collections import deque, Counter
antrean = deque(["Lagu A", "Lagu B"])
antrean.append("Lagu C")
print("Diputar berikutnya:", antrean.popleft(), "| sisa:", list(antrean))
ekskul = ["Pramuka", "Futsal", "Pramuka", "PMR", "Futsal", "Pramuka"]
hitung = Counter(ekskul)
print("Peminat tiap ekskul:", dict(hitung))
print("Paling diminati   :", hitung.most_common(1))
