# '0' before the width sets the fill character to '0' whenever no explicit fill is given,
# even with an explicit alignment, and also for strings (CPython 3.10+).
print(format(12, "<06") + "|", format(12, ">06") + "|", format(12, "^06") + "|", format(-12, "<06") + "|")
print(format("ab", "06") + "|", format("ab", ">06") + "|", format("ab", "^07") + "|")
print(f"{1.5:<08}|{7:^012}|{-3.25:<09.2f}|{'kode':010}|")
print(f"{12:*<06}|{12:x^06}|{12:06}|{-12:06}|{1234:<08,}|")
