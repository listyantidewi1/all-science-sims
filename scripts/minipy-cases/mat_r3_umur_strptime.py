# Bab 7.2 datetime: menghitung umur dari tanggal lahir yang diketik (dd/mm/yyyy); hari ini dibuat tetap agar dapat diuji
from datetime import datetime, date

hari_ini = date(2026, 10, 20)
for _ in range(6):
    teks = input("Tanggal lahir (dd/mm/yyyy): ")
    try:
        lahir = datetime.strptime(teks, "%d/%m/%Y").date()
    except ValueError as e:
        print("  Format salah:", e)
        continue
    umur = hari_ini.year - lahir.year
    if (hari_ini.month, hari_ini.day) < (lahir.month, lahir.day):
        umur = umur - 1
    print(f"  Lahir {lahir.strftime('%A, %d %B %Y')} -> umur {umur} tahun, sudah {(hari_ini - lahir).days} hari")
    print("  Boleh membuat KTP" if umur >= 17 else "  Belum boleh membuat KTP")
