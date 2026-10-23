nilai = {"ani": 80, "budi": 90}
putaran = 0
for nama, skor in nilai.items():
    putaran += 1
    if putaran > 5:
        break
    del nilai[nama]
    nilai[nama.title()] = skor
print(putaran, nilai)
