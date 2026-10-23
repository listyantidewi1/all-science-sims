# '*' width/precision must be an int that fits a C int/ssize_t
tests = [("%.*f", (2.5, 1.0)), ("%*d", ("x", 5)), ("%*.*f|", (8, 2, 3.14159)), ("%-*d|", (-4, 7)), ("%(a)*d", {"a": 1}),
         ("%.*f", (10 ** 20, 1.0)), ("%*d", (10 ** 20, 1)), ("%.*s|", (True, "abc"))]
for fmt, a in tests:
    try:
        print(repr(fmt), repr(fmt % a))
    except (TypeError, ValueError, OverflowError) as e:
        print(repr(fmt), type(e).__name__, e)
