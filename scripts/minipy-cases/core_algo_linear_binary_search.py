def linear_search(data, target):
    langkah = 0
    for i in range(len(data)):
        langkah += 1
        if data[i] == target:
            return i, langkah
    return -1, langkah
def binary_search(data, target):
    low, high = 0, len(data) - 1
    langkah = 0
    while low <= high:
        mid = (low + high) // 2
        langkah += 1
        if data[mid] == target:
            return mid, langkah
        elif data[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, langkah
angka = list(range(3, 300, 3))
for t in [3, 150, 297, 100]:
    print(t, linear_search(angka, t), binary_search(angka, t))
nama = sorted(["Rina", "Andi", "Budi", "Citra", "Dewi", "Eka"])
print(nama, binary_search(nama, "Dewi"), linear_search(nama, "Zaki"))
import math
for n in [1, 2, 8, 100, 1000, 10 ** 6]:
    print(n, math.floor(math.log2(n)) + 1)
