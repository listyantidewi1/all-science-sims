s = 'Halo\tDunia\n"kutip" dan \'apostrof\' \\ selesai'
print(s)
print(repr(s))
print(repr("it's"), repr('say "hi"'), repr('both \' and "'))
print(len("Python"), "Py" + "thon", "ab" * 3, 3 * "-")
print("baris1\nbaris2")
print(repr("tab\there"), repr("\x00\x07é"), "ñandú")
t = """tiga
baris
teks"""
print(t)
print("abc"[0], "abc"[-1], "abcdef"[1:4], "abcdef"[::2], "abcdef"[::-1])
