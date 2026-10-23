count = 0
def naik():
    global count
    count = count + 1
for _ in range(3):
    naik()
print(count)
def baca_saja():
    return count * 2
print(baca_saja())
def salah():
    print(count)
    count = 5
salah()
