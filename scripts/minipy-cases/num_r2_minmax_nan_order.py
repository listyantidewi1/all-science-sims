# min()/max() keep the current best unless the new item compares strictly better, so nan "wins" only
# when it comes first
nan = float("nan")
print(min([nan, 1, 0]), max([1, nan, 0]), max([nan, 1]), min([1, nan]), max(nan, 5, 3), min(5, nan, 3))
print(max([2, nan, 7], key=lambda v: -v), min([(1, nan), (1, 0)]), max([[nan], [1]]), sorted([[1], [nan]]))
print(max([1, 1.0, True]), max([1.0, 1, True]), min([0.0, 0, False, -0.0]), max([-0.0, 0.0]), max([0.0, -0.0]))
