# Tebak Output: peringkat dengan sorted(..., reverse=True) - siswa bernilai sama tetap dalam urutan aslinya (stabil)
siswa = [("Andi", 85), ("Budi", 90), ("Cici", 85), ("Dina", 90), ("Eko", 70), ("Fani", 85)]
urut = sorted(siswa, key=lambda s: s[1], reverse=True)
for i, (nama, nilai) in enumerate(urut, 1):
    print(i, nama, nilai)
print([n for n, _ in sorted(siswa, key=lambda s: -s[1])])
print([n for n, _ in sorted(siswa, key=lambda s: s[1])[::-1]])
print(max(siswa, key=lambda s: s[1]), min(siswa, key=lambda s: s[1]))
nama_urut = sorted(["budi", "Andi", "cici", "Budi"], key=str.lower, reverse=True)
print(nama_urut, sorted(["budi", "Andi", "cici", "Budi"], reverse=True))
siswa.sort(key=lambda s: s[1], reverse=True)
print(siswa == urut)
