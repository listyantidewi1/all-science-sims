# CPython 3.13 ships Unicode 15.1: characters added in Unicode 16 are still unassigned (not printable, no
# letters, no case mappings), whatever Unicode version the host JavaScript engine knows
for cp in [0x019B, 0x0264, 0x0897, 0x1C89, 0x1C8A, 0xA7CB, 0xA7CD, 0xA7DC, 0x105C1, 0x1B4E, 0x2427]:
    c = chr(cp)
    print(hex(cp), c.isprintable(), c.isalpha(), c.isupper(), c.islower(), hex(ord(c.upper())), hex(ord(c.lower())), repr(c) == "'" + c + "'")
print(repr(chr(0x0897) + chr(0x105C1)), ascii(chr(0x019B)), chr(0x019B).upper() == chr(0x019B), chr(0x0264).title(), len(chr(0x0897).upper()))
