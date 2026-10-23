# %a uses ascii(): non-ASCII characters are escaped, unlike %r
nama = "André"
print("%r|%a|%s" % (nama, nama, nama))
print("%-12a|%12a|" % ("é", "😀"), "%a" % ["ñ", 1], "%a" % "plain")
print("%(n)a" % {"n": "Ç"}, "%.4a" % "éé")
