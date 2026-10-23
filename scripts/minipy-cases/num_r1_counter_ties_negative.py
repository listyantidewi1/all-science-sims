from collections import Counter
c = Counter({"x": 3, "y": 3, "z": 5}); c.update({"y": 1}); print(c.most_common(), c.most_common(2))
c2 = Counter(); c2["b"] += 1; c2["a"] += 1; c2["b"] += 1; print(c2, list(c2.elements()))
c3 = Counter("abc"); c3["a"] -= 2; c3["z"] += 0; print(c3, +c3, -c3)
c4 = Counter("mississippi"); c4.subtract({"s": 10, "q": 1}); print(c4, c4.total())
print(Counter("aab") - Counter("abbb"), Counter("abracadabra").most_common(3), list(Counter("abracadabra").elements()))
print(Counter([True, 1, 1.0]), Counter([0, False]), Counter({"b": 2, "a": 2, "c": 3}), Counter("zyzx").most_common(), Counter({"a": 1.5, "b": 2}))
print(Counter("hello").most_common(0), Counter("hello").most_common(-1), dict(Counter("hello")), max(Counter("hello").items(), key=lambda kv: kv[1]))
