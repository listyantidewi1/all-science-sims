# Antrean dan Tumpukan Hidup: kesalahan umum saat memakai deque, ditangkap satu per satu
from collections import deque
antrean = deque(["Ani", "Bayu", "Citra"])
def coba(judul, aksi):
    try:
        print(judul, "->", aksi())
    except Exception as e:
        print(judul, "->", type(e).__name__ + ":", e)
coba("dequeue()", lambda: antrean.dequeue())
coba("push()", lambda: antrean.push("Dede"))
coba("pop(0)", lambda: antrean.pop(0))
coba("popleft()", lambda: antrean.popleft())
coba("indeks 5", lambda: antrean[5])
coba("sebagai kunci dict", lambda: {antrean: 1})
coba("bandingkan list", lambda: antrean < ["Ani"])
coba("isi akhir", lambda: list(antrean))
