import time
mulai = time.time()
time.sleep(0.01)
print(type(mulai).__name__, time.time() >= mulai)
import datetime
d = datetime.date(2026, 8, 17)
print(d, d.year, d.month, d.day, d.weekday(), d.isoweekday())
print(d.strftime("%d/%m/%Y"), d.strftime("%A, %d %B %Y"), repr(d))
d2 = d + datetime.timedelta(days=30)
print(d2, d2 - d, (d2 - d).days)
dt = datetime.datetime(2026, 1, 2, 7, 30, 5)
print(dt, dt.hour, dt.minute, dt.strftime("%H:%M"), repr(dt))
print(datetime.date(2024, 3, 1) - datetime.date(2024, 2, 1), datetime.timedelta(hours=36))
print(datetime.date(2026, 1, 1) < datetime.date(2026, 6, 1))
from datetime import date
print(date(2000, 2, 29).strftime("%j %a %b"))
