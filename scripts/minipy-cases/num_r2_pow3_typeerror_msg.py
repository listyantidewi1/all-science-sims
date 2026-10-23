# TypeError messages for three-argument pow and a float k in random.choices
import random
for args in [(2, 3, "a"), (2, "a", 5), (2.0, 3, 5), (2, 3, 5.0), ("2", 3, 5)]:
    try:
        print(pow(*args))
    except TypeError as e:
        print("TypeError:", e)
random.seed(1)
try:
    print(random.choices([1, 2], k=2.0))
except TypeError as e:
    print("TypeError:", e)
