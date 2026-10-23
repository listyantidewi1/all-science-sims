# str.strip()/split() use Python's isspace(): \x1c-\x1f and \x85 are whitespace, ﻿ and ​ are not
print(repr("﻿x ".strip()), repr("\x1cx\x1f".strip()), repr(" x　".strip()), repr("​x".strip()), repr("\x85x ".strip()))
print("﻿a b".split(), "a\x1cb\x1dc".split(), "a b".split(), "a\x0bb\x0cc".split())
print("﻿".isspace(), "\x1c".isspace(), "​".isspace(), "\x85".isspace(), "᠎".isspace(), "　".isspace())
print("1\n2\r3\r\n4\x0b5\x0c6\x1c7 8\n".splitlines(), "x\n\n".splitlines(), "a\n".split("\n"))
print("  a b c  ".rsplit(None, 1), "  a b  ".split(maxsplit=1), "  x  ".rsplit(maxsplit=0), " a  b ".split(" "))
