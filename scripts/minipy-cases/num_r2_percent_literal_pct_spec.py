# "%%" only works with nothing between the two percent signs; "%5%" consumes an argument first and
# then reports '%' as an unsupported format character
for fmt, a in [("%5%", ()), ("%5%", (1,)), ("%-5%|", (1,)), ("%.2%", ()), ("%(x)%", {"x": 1}), ("%(x)%", {}), ("%d%%", (5,)), ("%%%d", (5,))]:
    try:
        print(repr(fmt), repr(fmt % a))
    except (TypeError, ValueError, KeyError) as e:
        print(repr(fmt), type(e).__name__, e)
