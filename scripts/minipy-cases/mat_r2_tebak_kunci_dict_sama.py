# Tebak Output: 1, 1.0, dan True dianggap kunci dictionary yang sama
skor = {1: "satu", 1.0: "satu koma nol", True: "benar"}
print(skor, len(skor))
hadir = {0: "tidak", False: "salah"}
print(hadir)
nomor = {1, 1.0, True, 2, 2.0}
print(nomor, len(nomor))
print(skor[1.0], skor[True], 1 in skor, 1.0 == True, [1, True, 1.0].count(True))
