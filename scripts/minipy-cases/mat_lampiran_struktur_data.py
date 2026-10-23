belanja = ["Buku", "Pensil", "Penghapus"]
belanja.append("Penggaris")
belanja.insert(1, "Pulpen")
belanja.remove("Pensil")
for nomor, barang in enumerate(belanja, start=1):
    print(f"{nomor}. {barang}")
tumpukan = []
tumpukan.append("Matematika")
tumpukan.append("Fisika")
tumpukan.append("Informatika")
while len(tumpukan) > 0:
    print("Diambil:", tumpukan.pop())
from collections import deque
antrean = deque(["Ani", "Bayu", "Citra", "Dede", "Eka"])
print("Awal           :", list(antrean))
antrean.popleft(); antrean.popleft()
print("Setelah 2 dilayani:", list(antrean))
antrean.append("Fani")
print("Setelah Fani datang:", list(antrean))
