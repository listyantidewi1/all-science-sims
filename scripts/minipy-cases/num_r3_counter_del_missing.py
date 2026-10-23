# Counter.__delitem__ ignores missing keys (unlike dict); reading a missing key gives 0 without inserting it
from collections import Counter
suara = Counter(["Andi", "Budi", "Andi"])
del suara["Citra"]
print(suara, "Citra" in suara, suara["Citra"], len(suara))
del suara["Budi"]
print(suara)
suara["Dewi"] = 0
del suara["Dewi"]
del suara["Dewi"]
print(suara, dict(suara))
d = dict(suara)
try:
    del d["Citra"]
except KeyError as e:
    print("KeyError:", e)
