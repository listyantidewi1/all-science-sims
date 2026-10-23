siswa = [
    {"nama": "Andi", "nilai": [80, 90, 85]},
    {"nama": "Budi", "nilai": [70, 65, 75]},
    {"nama": "Citra", "nilai": [95, 92, 98]},
]
for s in siswa:
    rata = sum(s["nilai"]) / len(s["nilai"])
    s["rata"] = round(rata, 2)
    print(f'{s["nama"]:<6} {rata:6.2f} {"Tuntas" if rata >= 75 else "Remedial"}')
terbaik = max(siswa, key=lambda s: s["rata"])
print("Terbaik:", terbaik["nama"], terbaik)
kelas = {"X-A": ["Andi", "Budi"], "X-B": ["Citra"]}
kelas["X-B"].append("Dewi")
kelas.setdefault("X-C", []).append("Eka")
print(kelas, sum(len(v) for v in kelas.values()))
matriks = [[1, 2, 3], [4, 5, 6]]
transpos = [[matriks[r][c] for r in range(2)] for c in range(3)]
print(transpos, [sum(b) for b in matriks], [sum(k) for k in zip(*matriks)])
