print("\x41\x42 \u00e9 \101 \N{BULLET} tab\tend")
print(r"C:\folder\new\table", r'\d+\s*', len(r"\n"), len("\n"))
print("""Baris "satu"
Baris 'dua' \\ selesai""")
print('kutip \'tunggal\' dan "ganda"', "a\
b")
print(repr("\\"), repr('\''), repr("\r\n"), "café" == "caf\u00e9")
s = "Mengapa\tpakai\ttab?"
print(s.expandtabs(4), s.split("\t"))
