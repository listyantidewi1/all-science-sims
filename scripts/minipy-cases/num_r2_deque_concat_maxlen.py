# deque + deque returns a copy of the left deque (same maxlen) extended by the right one,
# so a bounded deque drops items from the left
from collections import deque
riwayat = deque([1, 2, 3], maxlen=3)
print(riwayat + deque([4]), deque([4]) + riwayat, riwayat + riwayat, riwayat * 2)
d4 = deque([1, 2, 3], maxlen=4)
print(d4 + deque([9, 8, 7]), d4 * 2, (d4 + deque()).maxlen, d4)
