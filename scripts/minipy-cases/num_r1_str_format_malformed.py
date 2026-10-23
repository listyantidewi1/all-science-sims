# malformed str.format templates: CPython's exact ValueError messages
templates = ["Nilai: {:>5", "Halo {nama", "{0", "{:{}", "{!r", "{0[}", "{0!}", "{0.}", "skor {0:{1:{2}}}", "{", "}", "a}b"]
for t in templates:
    try:
        print(repr(t.format(1, 2, 3, nama="Andi")))
    except (ValueError, KeyError, IndexError) as e:
        print(repr(t), type(e).__name__, e)
