dasar = {"a": 1}
print(dict(dasar, a=2))
print(dict(**dasar, b=2))
data = dict(**dasar, a=2)
print(data)
