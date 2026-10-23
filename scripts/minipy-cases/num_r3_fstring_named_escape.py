# \N{...} named escapes work in the literal parts of f-strings; the braces are not replacement fields
suhu = 25.5
print(f"Suhu: {suhu}\N{DEGREE SIGN}C")
print(f"\N{DEGREE SIGN}", f"{1}\N{EM DASH}{2}", f"\N{BULLET} {'item'}", f"{suhu:.0f}\N{DEGREE SIGN}F\N{RIGHTWARDS ARROW}")
print(F"\N{GREEK SMALL LETTER PI} = {3.14159:.2f}", f"""\N{CHECK MARK} {"selesai"}""", f'\N{bullet}{{}}')
