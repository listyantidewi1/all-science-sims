# Berapa JP penuh (45 menit) muat dalam durasi kegiatan, dan sisa waktunya (timedelta // dan %)
from datetime import timedelta

jp = timedelta(minutes=45)
for menit in [90, 100, 44, 45, 0, 135]:
    durasi = timedelta(minutes=menit)
    penuh = durasi // jp
    sisa = durasi % jp
    print(f"{menit:>3} menit = {penuh} JP + sisa {sisa} ({sisa.seconds // 60} menit)", divmod(durasi, jp))
