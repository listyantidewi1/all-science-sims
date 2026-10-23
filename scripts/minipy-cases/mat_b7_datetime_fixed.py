from datetime import datetime, date
sekarang = datetime(2026, 10, 20, 16, 40)     # tanggal tetap agar hasil dapat diuji
print("Sekarang:", sekarang.strftime("%d-%m-%Y %H:%M"))
ujian = date(2026, 11, 16)
sisa = ujian - date(2026, 10, 20)
print("Hari menuju ujian:", sisa.days)
