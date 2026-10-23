# random.seed(str, version=1) uses the old Python 2 string hash; int seeds ignore version
import random
for s in ["abc", "Budi", "", "kelas XI"]:
    random.seed(s, version=1)
    print(repr(s), random.random(), random.randint(1, 100))
random.seed(10, version=1)
print(random.random())
