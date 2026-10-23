# random's module functions are bound methods of a hidden Random instance; statistics functions are
# plain Python functions; math functions are builtins
import random, statistics, math
from collections import Counter, deque
for f in [random.random, random.randint, random.choice, random.shuffle, random.seed, random.uniform, statistics.mean,
          statistics.median, math.sqrt, math.floor, Counter().most_common, Counter.most_common, deque().append, [].sort, "".join, str.upper, len]:
    print(type(f).__name__, f.__name__, callable(f))
