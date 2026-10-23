kalimat = "  Belajar Python itu menyenangkan  "
kata = kalimat.strip().lower().split()
print(kata, len(kata), "-".join(kata).title())
print(" ".join(reversed(kata)), " ".join(w[::-1] for w in kata))
frekuensi = {}
for huruf in "".join(kata):
    frekuensi[huruf] = frekuensi.get(huruf, 0) + 1
print(sorted(frekuensi.items(), key=lambda p: (-p[1], p[0]))[:3])
print("Rp " + str(1e6), "Rp " + str(1000000), str(0.1 * 3))
print(" ".join(["%02d" % i for i in range(1, 6)]))
teks = "a,b,,c"
print(teks.split(","), teks.split(",", 2), teks.count(","), teks.find(",,"))
palindrom = "Kasur ini rusak"
bersih = palindrom.replace(" ", "").lower()
print(bersih == bersih[::-1])
