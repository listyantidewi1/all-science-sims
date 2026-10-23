uang_saku = [10000, 20000, 15000, 25000]
total = 0
for i in range(5):
    total = uang_saku[i]
rata = total / len(uang_saku)
if rata <= 15000:
    print("Rata-rata:", rata, "- Kelas Hemat")
else:
    print("Rata-rata:", rata, "- Kelas Boros")
