besar = 10 ** 400
print(f"{besar:,}"[:20])
try:
    print(f"{besar:.2f}")
except OverflowError as e:
    print("OverflowError:", e)
print("%.1f" % besar)
