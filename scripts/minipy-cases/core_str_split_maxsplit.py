for s in [' a b  c  ', 'a b c', '  a  ', ' a b ', 'a  b  ', '', '   ', 'x\ty\nz  ']:
    print(repr(s), s.split(None, 1), s.split(None, 0), s.rsplit(None, 1), s.rsplit(None, 0), s.split(maxsplit=5), s.rsplit(None, 2))
for s in ['a,b,,c,', ',a', 'a', '']:
    print(repr(s), s.split(','), s.split(',', 1), s.rsplit(',', 1), s.split(',', 0), s.rsplit(',', 0))
nama, sisa = "Andi Budi Citra".split(maxsplit=1)
print(nama, "|", sisa)
