# a non-tuple right operand that supports __getitem__ (list, range, dict) is treated as a mapping:
# unused arguments are then not an error; positional fields after a %(key) field have no argument left
for fmt, a in [("abc", []), ("abc", [1, 2]), ("abc", range(3)), ("abc %%", []), ("%s", [1, 2]), ("%s %s", [1, 2]),
               ("abc", "x"), ("abc", 5), ("%(a)s", [1]), ("%(x)s %s", {"x": 1}), ("%s %(x)s", {"x": 1})]:
    try:
        print(repr(fmt), repr(a), repr(fmt % a))
    except (TypeError, ValueError, KeyError) as e:
        print(repr(fmt), repr(a), type(e).__name__, e)
