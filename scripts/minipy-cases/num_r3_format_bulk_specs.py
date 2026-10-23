# a seeded sweep of format specs over big ints and floats: grouping, zero padding, sign, alternate forms,
# presentation types (ints converted to float for e/g/%/f) and the 'n' type
import random
random.seed(8)
for i in range(30):
    n = random.randint(-10 ** random.randint(1, 40), 10 ** random.randint(1, 40))
    row = []
    for s in ["", ",", "_", "_x", "#_b", "#o", "X", "+,", " 030,", "e", ".3e", "g", ".2%", ",.2f", "n", "^40,", "=+40_", "c", ".0f", "#x", "08_", "010,d"]:
        try:
            row.append(format(n, s))
        except (ValueError, OverflowError) as e:
            row.append(type(e).__name__)
    print(" ".join(row))
for i in range(30):
    x = random.random() * 10 ** random.randint(-10, 25) * random.choice([1, -1])
    row = []
    for s in [",", "_", "+,.3f", ",.0f", " 030,.4f", "=+30,.2e", ",g", ",.10g", ",%", "015.3g", "#,.0f", "_.3f", ".3n", "z.2f", "#.3"]:
        row.append(format(x, s))
    print(" ".join(row))
