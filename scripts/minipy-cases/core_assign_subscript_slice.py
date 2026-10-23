nilai = [70, 80, 90, 60]
nilai[0] = 75
nilai[-1] += 5
print(nilai)
nilai[1:3] = [85, 95, 100]
print(nilai)
nilai[:2] = []
print(nilai)
nilai[::2] = [0, 0]
print(nilai)
d = {}
d["x"] = 1
d["x"] += 10
d[(1, 2)] = "tuple key"
print(d)
grid = [[0, 0], [0, 0]]
grid[1][0] = 5
print(grid)
s = [1, 2, 3, 4, 5, 6]
s[1:5:2] = ["a", "b"]
print(s)
