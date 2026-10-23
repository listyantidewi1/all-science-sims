data = [5, 0]
print(any(10 / x > 1 for x in data))
print(list(zip([1], (10 / x for x in [1, 0]))))
hasil = map(lambda x: 10 / x, data)
print("map dibuat")
saring = filter(lambda x: 10 / x, [0])
print("filter dibuat")
print(next(hasil))
print(all(10 / x > 5 for x in data))
