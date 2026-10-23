for data in [[3, "a", 1], [5, 3, 1, "x", 2], [1, 2, 3, 4, "x", 0], [1, 5, 2, 6, 3, 7, None, 4]]:
    try:
        data.sort()
    except TypeError as e:
        print(e, data)
nilai = [80, "90", 70]
print(sorted(nilai, key=int))
nilai.sort(reverse=True)
