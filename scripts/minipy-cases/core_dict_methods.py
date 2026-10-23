nilai = {"Andi": 80, "Budi": 75}
nilai["Citra"] = 90
nilai["Andi"] = 85
print(nilai, len(nilai))
print(nilai.get("Budi"), nilai.get("Dodi"), nilai.get("Dodi", 0))
print(list(nilai.keys()), list(nilai.values()), list(nilai.items()))
print(nilai.keys(), nilai.values())
print(nilai.items())
print(nilai.pop("Budi"), nilai.pop("X", "tidak ada"), nilai)
nilai.update({"Eka": 70, "Andi": 88})
nilai.update(Fajar=65)
print(nilai)
print(nilai.setdefault("Gita", 50), nilai.setdefault("Andi", 0))
salinan = nilai.copy()
salinan.clear()
print(len(nilai), salinan)
print(nilai.popitem(), dict.fromkeys(["a", "b"], 0))
for nama, n in sorted(nilai.items(), key=lambda kv: kv[1], reverse=True):
    print(nama, n)
presensi = {}
for nama in ["Andi", "Budi", "Andi", "Citra", "Andi"]:
    presensi[nama] = presensi.get(nama, 0) + 1
print(presensi)
