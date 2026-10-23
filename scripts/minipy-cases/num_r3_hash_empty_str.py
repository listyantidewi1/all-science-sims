# hash("") is always 0 (independent of PYTHONHASHSEED), so tuples containing "" hash deterministically and
# "" lands in slot 0 of a set table
print(hash(""), hash(("",)), hash(("", 0)), hash((1.5, "")), hash(("", "")) == hash(("", "")))
s = set()
for x in [5, "", 2, 3]:
    s.add(x)
print(s, set([10, "", 9]), {("", 1), (0, 0)} == {(0, 0), ("", 1)})
d = {}
for x in [7, ""]:
    d[x] = len(str(x))
print(d, set(d))
