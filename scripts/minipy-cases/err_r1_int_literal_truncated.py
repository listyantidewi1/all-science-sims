teks = "angka" * 50
try:
    int(teks)
except ValueError as e:
    print(len(str(e)))
    print(str(e)[-12:])
int("9" * 10 + "x" * 300)
