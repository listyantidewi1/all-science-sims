for s in ["1_0.5", "1.5_", "  ", "nan ", "-iNF", "1e500", ".", "e5", "0x1p3", "1.e2", "+.5e-2", "1e-500", "-0.0", "١.٥",
          "1__0", "_1", "1_e5", "1e_5", "infinit", "+nan", "-nan", "1.2.3", "\n3.5\t", "1,5", "Infinity", "1E+3"]:
    try:
        print(repr(s), float(s))
    except ValueError as e:
        print("ValueError:", e)
print(float("1" * 30), float("0." + "0" * 30 + "1"), float("1" + "0" * 400), int(float("1e16")), float(10 ** 22), float(-(2 ** 70)))
