d = {"b": 2, "a": 1, "c": 3}
tests = [lambda: d.pop(), lambda: d.get(), lambda: {}.update(1), lambda: {}.update([1]), lambda: {}.update([(1, 2, 3)]),
         lambda: dict([(1,)]), lambda: dict(["ab", "cd"]), lambda: {}.setdefault("k"), lambda: d.keys()[0], lambda: {[1]: 2},
         lambda: {}.pop("x"), lambda: {}.popitem(), lambda: dict({"a": 1}, b=2), lambda: {1: 1, 1.0: 2, True: 3}, lambda: {0.0: "a", -0.0: "b", 0: "c"}]
for i, t in enumerate(tests):
    try:
        print(i, repr(t()))
    except Exception as e:
        print(i, type(e).__name__, e)
e = {"x": 1}
e |= {"y": 2}; e.update(z=3); del e["x"]; e["x"] = 0
print(e, e.popitem(), e.popitem(), e, d | {"a": 10}, {**d, "z": 0})
