# list.sort() works in place: when a comparison raises midway, the list keeps the partial order
# reached so far (count_run + binary insertion), it is not restored
for L in [[3, 1, "a", 2], [1, 2, 3, 0, "a"], [5, 4, 3, 2, 1, "x", 0], [9, 8, 1, 2, 3, "z", 4], [1, 5, 2, "q", 4, 3]]:
    try:
        L.sort()
    except TypeError as e:
        print("TypeError:", e)
    print(L)
data = [30, 10, 20, None, 5]
try:
    data.sort(reverse=True)
except TypeError as e:
    print("TypeError:", e)
print(data)
M = [3, 1, 2]
try:
    M.sort(key=lambda x: 1 / (x - 2))
except ZeroDivisionError as e:
    print("ZeroDivisionError:", e)
print(M)
