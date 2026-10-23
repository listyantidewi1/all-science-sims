from collections import deque
tumpukan = deque([1, 2])
try:
    tumpukan - deque([1])
except TypeError as e:
    print(e)
tumpukan(0)
