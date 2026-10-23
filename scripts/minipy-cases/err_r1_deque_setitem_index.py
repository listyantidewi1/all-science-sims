from collections import deque
antrean = deque(["Ani", "Budi"])
antrean[1] = "Bayu"
print(antrean)
try:
    del antrean[5]
except IndexError as e:
    print("del:", e)
antrean[2] = "Citra"
