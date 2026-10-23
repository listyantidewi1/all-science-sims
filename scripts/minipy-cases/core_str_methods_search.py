s = "apel jeruk apel mangga"
print(s.find("apel"), s.find("apel", 1), s.find("anggur"), s.rfind("apel"), s.index("jeruk"))
print(s.count("apel"), s.count("a"), s.count(""), "aaaa".count("aa"))
print(s.startswith("apel"), s.endswith("mangga"), s.startswith(("x", "ap")), s.endswith("apel", 0, 4))
print(s.replace("apel", "pir"), s.replace("apel", "pir", 1), "abc".replace("", "-"))
print("a-b-c".split("-"), "a b  c ".split(), "  x y ".split(" "), "a,b,c".split(",", 1), "a b c".rsplit(" ", 1))
print("1 2 3".split(), "".split(), "".split(","), "baris1\nbaris2\n".splitlines())
print("-".join(["a", "b", "c"]), "".join(list("halo")), ", ".join(map(str, [1, 2, 3])))
print("nama: Andi".partition(": "), "a.b.c".rpartition("."), "test_file.py".removesuffix(".py"), "unduh_ini".removeprefix("unduh_"))
try:
    s.index("anggur")
except ValueError as e:
    print("ValueError:", e)
