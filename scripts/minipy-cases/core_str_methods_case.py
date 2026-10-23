s = "halo dunia PYTHON"
print(s.upper(), s.lower(), s.title(), s.capitalize(), s.swapcase())
print("they're bill's friends".title(), "x1y2 abc".title(), "ÄÖü ß".upper())
print("  spasi  ".strip() + "|", "xxhaloxx".strip("x"), "  kiri".lstrip(), "kanan  ".rstrip() + "|")
print("www.contoh.com".lstrip("w."), "\t\n teks \r\n".strip(), "abcba".strip("ab"))
print("123".isdigit(), "12a".isdigit(), "abc".isalpha(), "ab1".isalpha(), "²".isdigit(), "½".isnumeric(), "Ab1".isalnum())
print("ABC".isupper(), "AbC".isupper(), "abc".islower(), "   ".isspace(), "".isdigit(), "Judul Buku".istitle())
print("Halo".center(10, "*"), "|" + "ab".center(7) + "|", "|" + "abc".center(6) + "|", "7".zfill(3), "-7".zfill(4), "x".ljust(3, "."), "x".rjust(3, "."))
