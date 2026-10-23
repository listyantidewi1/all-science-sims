def bubble_sort(data):
    a = data[:]
    n = len(a)
    tukar = 0
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                tukar += 1
    return a, tukar
def selection_sort(data):
    a = list(data)
    for i in range(len(a)):
        m = i
        for j in range(i + 1, len(a)):
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]
    return a
def insertion_sort(a):
    a = a.copy()
    for i in range(1, len(a)):
        kunci = a[i]
        j = i - 1
        while j >= 0 and a[j] > kunci:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = kunci
    return a
data = [64, 34, 25, 12, 22, 11, 90, 5]
print(bubble_sort(data), selection_sort(data), insertion_sort(data), data)
print(bubble_sort(["jeruk", "apel", "mangga"]))
