tumpukan = []
for piring in ["piring 1", "piring 2", "piring 3"]:
    tumpukan.append(piring)
    print("push:", piring, tumpukan)
while tumpukan:
    print("pop:", tumpukan.pop(), "sisa", tumpukan)
from collections import deque
antrean = deque()
for pesan in ["Hai", "Apa kabar?", "Sampai jumpa"]:
    antrean.append(pesan)
print(antrean, len(antrean))
while antrean:
    print("diproses:", antrean.popleft())
print(antrean)
