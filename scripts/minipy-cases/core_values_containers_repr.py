print([1, 2.5, "tiga", True, None, [4, 5]])
print((1,), (1, 2), (), tuple([3, 4]))
print({"nama": "Andi", "umur": 17, 3: [1, 2]})
print({1, 2, 3}, set(), {})
print(range(5), range(1, 10, 2), list(range(5)))
nested = {"a": [1, {"b": (2, 3)}]}
print(nested)
print(str([1, 'a']), repr(['a', "b'c"]))
x = [1, 2]
x.append(x)
print(x)
