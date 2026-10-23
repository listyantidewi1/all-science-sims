# the remaining random distributions follow CPython's algorithms exactly (same draws from random())
import random
random.seed(3)
print(random.lognormvariate(0, 1), random.gammavariate(2, 3), random.gammavariate(0.5, 1), random.gammavariate(1, 2))
print(random.betavariate(2, 5), random.paretovariate(3), random.weibullvariate(1, 1.5), random.vonmisesvariate(1, 2), random.vonmisesvariate(0, 0))
print([random.binomialvariate(10, 0.3) for _ in range(5)], random.binomialvariate(100, 0.5), random.binomialvariate(1000, 0.02), random.binomialvariate(5, 1.0), random.binomialvariate())
for bad in [lambda: random.gammavariate(0, 1), lambda: random.binomialvariate(-1, 0.5), lambda: random.binomialvariate(5, 1.5)]:
    try:
        print(bad())
    except ValueError as e:
        print("ValueError:", e)
