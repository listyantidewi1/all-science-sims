def coba(f):
    try:
        f()
    except Exception as e:
        print(type(e).__name__ + ":", e)
nilai = 80
coba(lambda: nilal)
coba(lambda: "Nilai: " + 80)
coba(lambda: int("abc"))
coba(lambda: [70, 80][2])
coba(lambda: 10 / 0)
coba(lambda: {"Cerah": 1}["Hujan"])
