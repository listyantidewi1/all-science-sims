import random
random.seed(3)
print(random.choices("abc", k=0), random.choices(["x"], k=3))
random.seed(3)
try:
    print(random.choices([], k=2))
except IndexError as e:
    print("IndexError:", e)
random.seed(3)
print(random.choices([], k=1))
