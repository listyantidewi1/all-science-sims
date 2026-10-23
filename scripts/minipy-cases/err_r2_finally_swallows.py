def baca():
    try:
        return int("x")
    finally:
        return -1
print(baca())
for i in range(3):
    try:
        print(10 // (1 - i))
    finally:
        if i == 1:
            break
print("setelah", i)
for i in range(2):
    try:
        int("abc")
    finally:
        continue
print("lanjut", i)
print(10 // 0)
