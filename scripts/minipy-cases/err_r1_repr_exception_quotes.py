def coba(f):
    try:
        f()
    except Exception as e:
        print(repr(e))
        print(str(e))
coba(lambda: tidak_ada)
coba(lambda: "a" + 1)
coba(lambda: [].push(1))
coba(lambda: {}["k"])
coba(lambda: int("it's"))
coba(lambda: 1 / 0)
