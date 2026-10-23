# iter(callable, sentinel): callable_iterator semantics
import random
random.seed(3)
def roll():
    return random.randint(1, 6)
print(list(iter(roll, 6)))
n = [0]
def counter():
    n[0] += 1
    print("call", n[0])
    return n[0]
for x in iter(counter, 4):
    print("got", x)
it = iter(counter, 100)
print(type(it).__name__, next(it), next(it))
def stopper():
    raise StopIteration
print(list(iter(stopper, 1)))
data = [3, 1, 4, 1, 5, 9, 2, 6]
pos = [0]
def nxt():
    v = data[pos[0]]
    pos[0] += 1
    return v
print(list(iter(nxt, 9)))
print(sorted(iter(nxt, 6)))
try:
    iter(1, 2)
except TypeError as e:
    print(e)
try:
    iter(len, 2, 3)
except TypeError as e:
    print(e)
def bad():
    return 1 / 0
try:
    list(iter(bad, 0))
except ZeroDivisionError as e:
    print("ZDE", e)
lines = ["a", "b", "", "c"]
li = [0]
def readline():
    li[0] += 1
    return lines[li[0] - 1]
print([s for s in iter(readline, "")])
