print(float("3.14"), float(" 2.5 "), float("1e3"), float("-0.5"), float("inf"), float("-Infinity"), float("nan"))
print(float(7), float("1_000.5"), float(True), float(".5"), float("5."))
print(float(10 ** 20), float("1e-400"), float("1e400"))
for teks in ["74,9", "abc", "", "1.2.3"]:
    try:
        print(float(teks))
    except ValueError as e:
        print("ValueError:", e)
print(float(None))
