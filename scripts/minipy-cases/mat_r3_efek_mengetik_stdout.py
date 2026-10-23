# Efek mengetik (typewriter) untuk pesan pembuka kuis: sys.stdout.write + flush, jeda time.sleep(0)
import sys
import time

def ketik(teks, jeda=0):
    for huruf in teks:
        sys.stdout.write(huruf)
        sys.stdout.flush()
        time.sleep(jeda)
    sys.stdout.write("\n")

ketik("Selamat datang di Kuis Python!")
n = sys.stdout.write("Siap? ")
print("(", n, "karakter )")
ketik("")
print("Selesai", file=sys.stdout)
