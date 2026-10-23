d = {"a": 1}
d |= [("b", 2)]
print(d)
try:
    d | [("c", 3)]
except TypeError as e:
    print("TypeError:", e)
d |= 5
