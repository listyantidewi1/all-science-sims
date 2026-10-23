# '#' alternate form on floats keeps the decimal point / trailing zeros; with no type it follows repr rules
specs = ["#.0f", "#.0e", "#g", "#.1g", "#.3g", "#", "#.0", "#.0%", "#%", ".0", "#.2"]
for v in [5, 5.0, 0.0, 1.0, 10.0, 1e-10, 0.5, 1.5, 150.0, 1e22]:
    row = []
    for s in specs:
        try:
            row.append(format(v, s))
        except ValueError as e:
            row.append("VE")
    print(repr(v), row)
print(format(0.1, ".1g"), format(0.15, ".1g"), format(0.25, ".1g"), format(1e-4, "g"), format(1e-5, "G"), format(0.0, ".0g"))
