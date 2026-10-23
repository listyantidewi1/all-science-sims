# Counter's in-place operators (+= -= |= &=) drop zero and negative counts, like the binary operators,
# while update()/subtract() keep them; most_common ties keep insertion order
from collections import Counter
c = Counter(a=-1, b=2, z=0)
c += Counter()
print(c)
c = Counter(a=-1, b=2); c -= Counter(b=1); print(c)
c = Counter(a=-1, b=2); c |= Counter(a=-3); print(c)
c = Counter(a=-1, b=2); c &= Counter(b=5, a=1); print(c)
c = Counter(a=3); c.update(a=2, b=1); c.subtract(b=5); print(c, c.total(), +c, -c)
stok = Counter(apel=3, jeruk=0, mangga=-2)
print(stok, stok + Counter(), stok - Counter(), list(stok.elements()), stok.most_common())
w = Counter("the cat the hat the".split())
print(w, w.most_common(2), max(w, key=w.get), sorted(w, key=w.get, reverse=True), Counter({1: 1, 2: 2, 3: 2, 4: 1}))
