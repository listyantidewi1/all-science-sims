x = 10
del x
lst = [1, 2, 3, 4, 5, 6]
del lst[0]
print(lst)
del lst[1:3]
print(lst)
del lst[-1]
print(lst)
d = {"a": 1, "b": 2}
del d["a"]
print(d)
a, b = 1, 2
del a, b
try:
    print(x)
except NameError as e:
    print("NameError:", e)
