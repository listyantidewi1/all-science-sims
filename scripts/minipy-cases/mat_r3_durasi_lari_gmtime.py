# Catatan waktu lari (detik) diubah ke jam:menit:detik dengan time.strftime + time.gmtime, dibandingkan dengan divmod
import time

for nama, detik in [("Andi", 754), ("Budi", 59), ("Cici", 3600), ("Dina", 0), ("Eko", 86399)]:
    menit, sisa = divmod(detik, 60)
    jam, menit = divmod(menit, 60)
    print(f"{nama:<5} {detik:>5} dtk = {jam:02d}:{menit:02d}:{sisa:02d} | {time.strftime('%H:%M:%S', time.gmtime(detik))}")
