# %-formatting with a mapping looks keys up with __getitem__, so a Counter answers 0 for a missing key
# (as do c[key], format_map and "{0[key]}")
from collections import Counter
suara = Counter(["Andi", "Budi", "Andi"])
print("Andi: %(Andi)d, Citra: %(Citra)d, Budi: %(Budi)s" % suara)
print("%(x)5.1f|%(y)-3d|" % Counter(x=2), "{Citra}".format_map(suara), "{0[Dewi]}".format(suara), suara["Eko"])
print(suara, len(suara))
try:
    print("%(Citra)d" % dict(suara))
except KeyError as e:
    print("KeyError:", e)
