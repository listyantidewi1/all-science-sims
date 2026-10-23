# zero padding interacts with ',' and '_' grouping: the padding zeros are grouped too
vals = [0, 7, -7, 1234567, -1234.5, 12345.678, float("inf")]
for v in vals:
    out = []
    for s in ["010,", "015_", "012,.1f", "_^+15,.2f", "=+12,", "06,", "07,", "08,", "09,", "012,g", "#010x", "#012_b", " 010,.2f"]:
        try:
            out.append(format(v, s))
        except ValueError as e:
            out.append("ValueError:" + str(e))
    print(repr(v), out)
