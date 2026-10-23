# string.capwords = sep.join(w.capitalize() for w in s.split(sep)): Python's str.split() whitespace
# (\x1c..\x1f yes, U+FEFF no) and capitalize()'s titlecase/special casing (ß -> Ss, ǆ -> ǅ, ﬁ -> Fi)
import string
for s in ["ßtraße jalan", "ǆemal ǆ", "ﬁsh ﬂow", "a" + chr(0x1C) + "b", chr(0xFEFF) + "x y", "halo" + chr(0xA0) + "dunia", "ŉ test", "  sudah  BESAR  ", "o'neil mc-donald", ""]:
    print(repr(string.capwords(s)), repr(string.capwords(s, " ")), repr(string.capwords(s, "-")))
