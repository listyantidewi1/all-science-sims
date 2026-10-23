lst = [1, 2]
def coba(f):
    try:
        print(f())
    except Exception as e:
        print(type(e).__name__ + ":", e)
coba(lambda: lst[2 ** 70])
coba(lambda: "ab"[2 ** 70])
coba(lambda: lst[1:2 ** 70])
coba(lambda: lst.pop(10 ** 400))
coba(lambda: lst.insert(10 ** 400, 0))
coba(lambda: lst * 2 ** 70)
print(lst)
