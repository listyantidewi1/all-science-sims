# Counter's | & + - only accept another Counter; with a plain dict on the right Counter.__or__ returns
# NotImplemented and dict.__ror__ builds a plain dict (dict merge, not multiset union)
from collections import Counter
a = Counter("aab")
print(a | {"b": 5}, type(a | {"b": 5}).__name__, a | {"a": 1}, {"a": 1} | a, type({"a": 1} | a).__name__)
print(a | Counter(b=5), a | Counter(a=1))
for op in ["a & {'a': 1}", "a + {'b': 5}", "a - {'a': 1}", "{'a': 1} + a"]:
    try:
        print(eval(op))
    except TypeError as e:
        print("TypeError:", e)
b = Counter(x=1)
b |= {"x": 7, "y": 2}
print(b, type(b).__name__)
