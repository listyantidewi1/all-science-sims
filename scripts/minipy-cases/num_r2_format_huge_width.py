# widths/precisions beyond sys.maxsize are rejected while parsing the spec; precision > INT_MAX is "too big"
tests = [lambda: format(1, "99999999999999999999"), lambda: "{:{}d}".format(5, 10 ** 20), lambda: f"{1:{10 ** 20}}",
         lambda: format(1.5, ".99999999999999999999f"), lambda: format(1.5, ".2147483648f"), lambda: "%.2147483648f" % 1.0,
         lambda: format("abc", ".99999999999999999999"), lambda: "{:.{}f}".format(1.5, 10 ** 20)]
for t in tests:
    try:
        print(repr(t()))
    except (ValueError, OverflowError) as e:
        print(type(e).__name__, e)
