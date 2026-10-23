# Tebak Output: judul laporan dirata-tengah; sisa spasi ganjil diletakkan berbeda oleh str.center dan f"{:^}"
for judul in ["RAPOR", "NILAI", "IPA", "XI-2", "Ab"]:
    for lebar in [8, 9]:
        print(f"[{judul.center(lebar, '*')}] [{judul:*^{lebar}}] [{'{:*^{}}'.format(judul, lebar)}]")
print("[" + "abc".center(2) + "]", "[" + "".center(3, "-") + "]", "[" + "x".center(4) + "]")
