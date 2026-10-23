# float // % divmod follow CPython's float_divmod (fmod-based, not floor(a/b)); ** and math.pow/fmod/hypot/atan2
# reproduce libm results and CPython's error cases over a seeded sweep of magnitudes and signs
import random, math
random.seed(5)
def acak():
    k = random.choice([0, 0, 1, 2, 5, 10, 20, 100, 300, -5, -20, -300])
    x = random.random() * 10 ** k
    if random.random() < 0.2:
        x = float(random.randint(-50, 50))
    return -x if random.random() < 0.5 else x
for i in range(150):
    a, b = acak(), acak()
    out = []
    for f in [lambda: divmod(a, b), lambda: (a // b, a % b), lambda: abs(a) ** b, lambda: a ** random.randint(-5, 5),
              lambda: (math.fmod(a, b), math.pow(abs(a), b), math.hypot(a, b), math.atan2(a, b))]:
        try:
            out.append(repr(f()))
        except (ZeroDivisionError, OverflowError, ValueError) as e:
            out.append(type(e).__name__ + ":" + str(e))
    print(i, " ".join(out))
