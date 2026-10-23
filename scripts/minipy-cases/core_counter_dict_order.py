from collections import Counter
suara = ["Andi", "Budi", "Andi", "Citra", "Budi", "Dewi", "Budi", "Citra", "Andi"]
hasil = Counter(suara)
print(hasil)
print(hasil.most_common())
print(hasil.most_common(2), len(hasil), hasil.total(), sorted(hasil.elements())[:4])
for nama, jumlah in hasil.most_common():
    print(f"{nama:<6}{'#' * jumlah} {jumlah}")
c2 = Counter({"a": 3, "b": 1})
c2.subtract({"a": 1, "c": 2})
print(c2, c2 + Counter(a=1), Counter("aab") - Counter("ab"))
huruf = Counter("bananaa")
print(huruf, dict(huruf), list(huruf), huruf["z"])
