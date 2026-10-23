# Proyek Aplikasi Presensi: pesan kesalahan dikirim ke sys.stderr sehingga tidak tercampur dengan laporan (stdout)
import sys

siswa = ["Andi", "Budi", "Cici", "Dina"]
presensi = dict.fromkeys(siswa, "Alpa")
kode = {"H": "Hadir", "S": "Sakit", "I": "Izin", "A": "Alpa"}
for nama in siswa:
    k = input(f"{nama} (H/S/I/A): ").strip().upper()
    if k not in kode:
        print(f"Kode {k!r} tidak dikenal untuk {nama}, dicatat Alpa", file=sys.stderr)
        continue
    presensi[nama] = kode[k]
print()
for nama, status in presensi.items():
    print(f"{nama:<6}: {status}")
hadir = list(presensi.values()).count("Hadir")
print(f"Kehadiran: {hadir}/{len(siswa)} = {hadir / len(siswa):.0%}")
