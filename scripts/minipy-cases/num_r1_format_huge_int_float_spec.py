# float presentation types convert the int to float: OverflowError when it does not fit
big = 10 ** 400
print(f"{10 ** 300:.1e}", format(2 ** 1000, ".3g"), "%e" % (2 ** 1000))
for spec in [".2f", "e", "g", ",.1f", "%"]:
    try:
        print(format(big, spec))
    except OverflowError as e:
        print(spec, "OverflowError:", e)
try:
    print("%f" % big)
except OverflowError as e:
    print("OverflowError:", e)
print("%.3e" % (2 ** 1100))
