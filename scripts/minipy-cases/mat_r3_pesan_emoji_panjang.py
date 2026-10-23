# Pesan pengumuman kelas berisi emoji: len(), indeks, slicing, dan rata tengah menghitung per karakter (code point)
pesan = "Selamat 🎉 Juara OSN 🥇!"
print(len(pesan), pesan[8], pesan[-2], pesan[8:10])
print(pesan[::-1])
print(f"[{pesan:^30}]")
print("[" + pesan.center(30, "~") + "]")
print(pesan.upper(), pesan.count("🎉"), pesan.find("🥇"), pesan.split())
kartu = "❤️"
print(len(kartu), [hex(ord(c)) for c in kartu], len("👍🏽"), len("🇮🇩"))
for huruf in "A🎉b":
    print(huruf, ord(huruf), huruf.isalpha(), huruf.isprintable())
print(sorted("b🎉a"), max("a🎉"), chr(127881), "🎉" < "🥇", "x" * 3 + "🎉" * 2)
