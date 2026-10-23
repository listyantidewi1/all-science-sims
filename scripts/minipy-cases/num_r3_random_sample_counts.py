# random.sample(population, k, counts=...) samples from the population with repeated elements (3.9+)
import random
random.seed(11)
print(random.sample(["merah", "biru"], counts=[3, 2], k=4))
print(random.sample("ABC", 5, counts=[1, 2, 2]), random.sample(range(3), k=2, counts=[0, 5, 1]))
for args, kw in [(("ab", 2), {"counts": [1]}), (("ab", 4), {"counts": [1, 2]}), (("ab", 1), {"counts": [0, 0]}), (("ab", 1), {"counts": [1, -1]}), (("ab", 1), {"counts": [1.5, 1]})]:
    try:
        print(random.sample(*args, **kw))
    except (ValueError, TypeError) as e:
        print(type(e).__name__, e)
