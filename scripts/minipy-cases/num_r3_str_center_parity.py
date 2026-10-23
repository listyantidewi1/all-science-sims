# str.center splits odd padding by CPython's rule left = pad // 2 + (pad & width & 1): the extra fill
# goes left only when the width is odd, while format's '^' alignment always puts it on the right
for w in range(0, 10):
    print(w, repr("ab".center(w, "*")), repr("abc".center(w, "*")), repr("".center(w, "-")), repr("a".center(w)), repr("kata".center(w, ".")))
print(f"[{'ab':^5}][{'abc':^6}][{'ab':*^7}]", "[%s]" % "ab".center(5), format("ab", "^5"), "{:^6}".format("abc"))
