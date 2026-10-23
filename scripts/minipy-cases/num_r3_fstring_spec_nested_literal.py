# a nested replacement field in a format spec may hold any expression, including string literals that contain
# braces or colons (PEP 701); escapes in the spec text are decoded
x = 3
print(f"{x:{'{'}^5}|{x:{'}'}<4}|{x:{':'}>4}|{x:{'{:}'[1]}^5}|")
fill = "{"
print(f"{x:{fill}^5}|{'ab':{'}'}^{x + 3}}|{x:{"!"}>{len('{}')}}|")
print(f"{x:\t^5}|{x:\\>4}|{x:\u2500^7}|{x:\x2a^5}|{'kata':\N{FULL BLOCK}<8}|")
