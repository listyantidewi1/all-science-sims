# containment and sequence equality check identity first ("x is e or x == e"), so the same nan object is found
x = float("nan")
data = [x, 1.0]
print(x == x, x is x, x is not x)
print(x in data, data.count(x), data.index(x), [x] == [x], (x,) == (x,))
print({x: "nilai"}.get(x), x in {x}, x in (x,))
s = {x}
s.add(x)
print(len(s), float("nan") in data, float("nan") == float("nan"))
