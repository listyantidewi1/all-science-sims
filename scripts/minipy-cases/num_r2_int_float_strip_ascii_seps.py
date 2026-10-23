# int()/float() strip only the C whitespace ' \t\n\v\f\r' among ASCII characters (non-ASCII Unicode spaces
# are turned into spaces first); \x1c-\x1f count as whitespace for str.strip()/split() but not here
for ch in ["\x1c", "\x1d", "\x1e", "\x1f", "\x85", "\xa0", " ", "\x0b", "\x0c"]:
    out = []
    for conv in (int, float):
        try:
            out.append(conv(ch + "12" + ch))
        except ValueError as e:
            out.append(str(e))
    print(repr(ch), out, repr((ch + "12" + ch).strip()))
