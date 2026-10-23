# PEP 701 f-strings (3.12+): reused quotes, multi-line expressions, comments inside fields
d = {"key": 5, 'k2': 'v'}
print(f"{d["key"]}")
print(f'{d['k2']}')
print(f"{'a' + "b"}")
print(f"{", ".join(["x", "y"])}")
print(f"{f"{1+1}"}")
print(f"""{d["key"]:>5}""")
x = 3.14159
print(f"{x:.{2}f}", f"{x!r:>12}", f"{'q'!r}")
print(f"{d['key']=}")
print(f"{ x = }")
print(f"{x:{'>'}{10}}")
total = 7
print(f"total: {total +
                1}")
print(f"{(total,
         total * 2)}")
print(f"{total  # a comment inside the field
}")
