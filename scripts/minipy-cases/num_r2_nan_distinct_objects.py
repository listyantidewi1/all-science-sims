# two different nan objects are not equal and not identical: both stay in a set or dict
a = float("nan")
print({float("nan"), float("nan")}, len({float("nan"), float("nan")}))
print({a: 1, a: 2}, {a, a}, {float("nan"): 1, float("nan"): 2})
s = set()
for teks in ["nan", "NaN", "nan"]:
    s.add(float(teks))
print(len(s), s)
