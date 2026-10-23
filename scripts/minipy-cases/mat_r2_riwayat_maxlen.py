# LK 2 Bagian 3 variasi: riwayat halaman hanya menyimpan 3 halaman terakhir (deque dengan maxlen)
from collections import deque
riwayat = deque(maxlen=3)
for halaman in ["Beranda", "Jadwal Pelajaran", "Nilai Rapor", "Profil", "Pengumuman"]:
    riwayat.append(halaman)
    print("Buka", halaman, "->", list(riwayat), len(riwayat))
print(riwayat)
print("Kembali dari:", riwayat.pop(), "| sisa:", riwayat)
riwayat.appendleft("Beranda")
riwayat.appendleft("Login")
print(riwayat, riwayat.maxlen)
