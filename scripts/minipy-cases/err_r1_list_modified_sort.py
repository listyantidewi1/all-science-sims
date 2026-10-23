data = [3, 1, 2]
def kunci(x):
    data.append(x)
    return x
data.sort(key=kunci)
print(data)
