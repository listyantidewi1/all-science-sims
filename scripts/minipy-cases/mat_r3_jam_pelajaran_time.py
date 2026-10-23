# Jadwal jam pelajaran: jam masuk 07.00, 1 JP = 45 menit, istirahat 15 menit setelah JP ke-4 (datetime.time dan .time())
from datetime import date, time, datetime, timedelta

masuk = time(7, 0)
print("Jam masuk:", masuk, "|", masuk.strftime("%H.%M"), "| jam:", masuk.hour, "menit:", masuk.minute)
mulai = datetime.combine(date(2026, 10, 20), masuk)
for jp in range(1, 7):
    selesai = mulai + timedelta(minutes=45)
    print(f"JP {jp}: {mulai.time()} - {selesai.time():%H:%M}")
    mulai = selesai
    if jp == 4:
        print("Istirahat sampai", (mulai + timedelta(minutes=15)).time())
        mulai = mulai + timedelta(minutes=15)
print("Pulang:", mulai.time(), mulai.time() > time(11, 30), time(12, 0) == time(12))
