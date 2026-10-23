# Python strings are sequences of code points: two lone surrogates stay two characters (they never merge
# into one astral character the way UTF-16 does), and repr escapes them
hi = chr(0xD83D)
lo = chr(0xDE00)
s = hi + lo
emoji = chr(0x1F600)
print(len(s), repr(s), s == emoji, [hex(ord(c)) for c in s], ascii(s), s.isprintable(), len(s + emoji))
print(repr(s[::-1]), repr(s[0]), repr(s[-1]), s.count(hi), s.find(lo), emoji in s, repr(s.replace(hi, "x")), repr(s.upper()))
print(sorted([emoji, lo, hi, chr(0xFFFF)]) == [hi, lo, chr(0xFFFF), emoji], max(s) == lo, min(emoji, s) == s)
print([len(p) for p in (s * 3).split(lo)], repr(f"{s}|{s!r}|{s:>4}|"), repr("%s" % s), repr(s.center(5, "*")))
