inf = float("inf")
nan = float("nan")
for spec in ["", ".2f", "010", "08.3f", "+", ">8", "<8|", "^9", ".1%", "e", "g", ",.2f"]:
    print(repr(format(inf, spec)), repr(format(-inf, spec)), repr(format(nan, spec)))
for spec in ["d", "x", "b", "c"]:
    try:
        format(inf, spec)
    except ValueError as e:
        print(e)
print(inf % 10, inf // 3.5, divmod(inf, 2), divmod(5.0, inf), divmod(-5.0, inf), 5.0 % inf, -5.0 % inf)
print(nan + 1, nan == nan, nan != nan, inf - inf, inf * 0, -inf < inf, max(1, inf))
print("%c|%c|%5c|" % (65, "Z", 97))
for bad in [2.5, "ab", None, [1], -1, 1114112]:
    try:
        print("%c" % (bad,))
    except (TypeError, OverflowError) as e:
        print(type(e).__name__, e)
