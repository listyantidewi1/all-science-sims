# CPython 3.13's timsort starts with count_run (ascending run, or a descending run that may contain
# "equal" elements, reversed in place) before binary insertion; with nan every comparison is False,
# so the exact algorithm decides where nan ends up
nan = float("nan")
for data in [[nan, 1, 0], [3, 1, nan, 2], [1, nan, 0, 2], [2, nan, 1], [5, 1, nan, 4, 2, 3],
             [nan, nan, 1, 0], [0, 2, nan, 1, 3], [4, 3, nan, 2, 1], [7, 7, 3, nan, 5]]:
    print(sorted(data), sorted(data, reverse=True))
nilai = [80.5, nan, 75.0, 90.0, 60.0]
nilai.sort()
print(nilai)
