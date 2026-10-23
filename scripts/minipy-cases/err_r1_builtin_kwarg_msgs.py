def coba(f):
    try:
        print(f())
    except TypeError as e:
        print("TypeError:", e)
coba(lambda: [3, 1].sort(keys=len))
coba(lambda: max([1, 2], keys=abs))
coba(lambda: round(1.25, digits=1))
coba(lambda: int("101", bas=2))
coba(lambda: "a,b".split(sepp=","))
coba(lambda: "aaa".replace("a", "b", counts=1))
coba(lambda: sum([1, 2], strt=10))
coba(lambda: {"a": 1}.get(key="a"))
coba(lambda: {"a": 1}.pop(k="a"))
coba(lambda: [1, 2].pop(index=0))
coba(lambda: [1, 2].index(value=2))
coba(lambda: enumerate(["x"], begin=1))
coba(lambda: min([1], default=0, key=abs, x=1))
coba(lambda: zip([1], strict=True, x=2))
