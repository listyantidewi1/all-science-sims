kesalahan = None
for teks in ["10", "dua", "30"]:
    try:
        print(int(teks) * 2)
    except ValueError as e:
        kesalahan = e
print("selesai membaca")
if kesalahan:
    raise kesalahan
